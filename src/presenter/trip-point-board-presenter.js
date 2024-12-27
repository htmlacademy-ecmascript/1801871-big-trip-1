import { render, remove } from '../framework/render';
import { UserAction, UpdateType } from '../const';


import TripPointPresenter from '../presenter/trip-point-presenter';
import TripNewPointPresenter from './trip-new-point-presenter';

import AddNewTripButtonView from '../view/add-new-trip-button-view';


import TripPointZeroView from '../view/zero-point-view';

import LoadingView from '../view/loading-view';

import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};


export default class TripPointBoardPresenter{
  #tripEventsListContainer = null;
  #tripHeaderContainer = null;

  #listPresernter = new Map();

  #zeroPointsView = null;
  #addNewTripButtonView = null;
  #loadingView = null;

  #tripPointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #filterModel = null;
  #sortModel = null;

  #filterPresenter = null;

  #offers = null;
  #destinations = null;

  #currentNewPoint = null;

  #isLoading = true;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor(
    {
      tripHeaderContainer,
      tripEventsListContainer,

      tripPointsModel,
      offersModel,
      destinationsModel,

      filterModel,
      sortModel,

      filterPresenter
    }
  ){
    this.#tripEventsListContainer = tripEventsListContainer;
    this.#tripHeaderContainer = tripHeaderContainer;

    this.#tripPointsModel = tripPointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#filterModel = filterModel;
    this.#sortModel = sortModel;

    this.#filterPresenter = filterPresenter;

    this.#offers = this.#offersModel.getOffers();
    this.#destinations = this.#destinationsModel.getDestinations();


    this.#tripPointsModel.addObserver(this.#handleModelEvent);
    this.#destinationsModel.addObserver(this.#handleModelEvent);
    this.#offersModel.addObserver(this.#handleModelEvent);
    this.#sortModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#addNewTripButtonView = new AddNewTripButtonView({handleAddNewPoin: this.#newPoinHandler});
    this.#zeroPointsView = new TripPointZeroView({currentFilter: this.#filterModel.getFilter()});
    this.#loadingView = new LoadingView();


  }

  init() {
    render(this.#addNewTripButtonView, this.#tripHeaderContainer);
    this.#renderBoard(this.points);
  }

  get points() {
    return this.#filterPresenter.getPoints();
  }

  #handleViewAction = async (update, actionType, updateType) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#listPresernter.get(update[0]).setSaving();
        try {

          await this.#tripPointsModel.updatePoint(update, updateType);
        } catch(err) {
          this.#listPresernter.get(update[0]).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#currentNewPoint.setSaving();
        try {
          await this.#tripPointsModel.addPoint(update, updateType);
          this.#resetTripPointNew();
        } catch(err) {
          this.#currentNewPoint.setAborting();
        }

        break;
      case UserAction.DELETE_POINT:
        this.#listPresernter.get(update[0]).setDeleting();
        try {
          await this.#tripPointsModel.deletePoint(update, updateType);
        } catch(err) {
          this.#listPresernter.get(update[0]).setAborting();
        }


    }
    this.#uiBlocker.unblock();
  };

  #cancelButtonClickHandler = () => {
    this.#addNewTripButtonView.buttonOn();
    this.#currentNewPoint.remove();
    this.#currentNewPoint = null;
    this.#renderBoard(this.points);
  };

  #handleModelEvent = (data, updateType) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#listPresernter.get(data[0]).replace(data);
        break;
      case UpdateType.MINOR:
      case UpdateType.MAJOR:
        if(this.#currentNewPoint) {
          this.#currentNewPoint.remove();
          this.#currentNewPoint = null;
        }
        this.#addNewTripButtonView.buttonOn();
        this.#renderBoard(this.points);
        break;
      case UpdateType.INIT:
        if(this.#tripPointsModel.isReady() && this.#offersModel.isReady() && this.#destinationsModel.isReady()){
          this.#isLoading = false;
          remove(this.#loadingView);
          this.#filterPresenter.enableCatagory();
          this.#addNewTripButtonView.buttonOn();
          this.#renderBoard(this.points);
          this.#filterPresenter.renderInfo();
        }
        break;
    }
  };

  #newPoinHandler = () => {
    this.#currentNewPoint = '';
    this.#tripPointsModel.update('',UpdateType.MAJOR);
    this.#renderNewPoint();
  };

  #renderNewPoint = () => {
    const newPointPresenter = new TripNewPointPresenter (
      {
        offers:this.#offers,
        destinations:this.#destinations,
        tripEventsListContainer:this.#tripEventsListContainer,
        handelPointChange:this.#handleViewAction,
        handelTypeChange:this.#handleTypeChange,
        addNewTripButtonView: this.#addNewTripButtonView,
        cancelButtonClickHandler: this.#cancelButtonClickHandler
      }
    );
    newPointPresenter.renderPoint(this.#tripPointsModel.blankPoint);
    this.#currentNewPoint = newPointPresenter;
  };

  #createPresernter = (point) => {
    const pointPresenter = new TripPointPresenter(
      {
        offers:this.#offers,
        destinations:this.#destinations,
        tripEventsListContainer:this.#tripEventsListContainer,
        handelPointChange:this.#handleViewAction,
        handelTypeChange:this.#handleTypeChange,
      });

    pointPresenter.renderPoint(point);
    this.#listPresernter.set(point[0],pointPresenter);
  };

  removePoint (point) {
    this.#listPresernter.get(point[0]).remove();

  }

  #handleTypeChange = () => {
    this.points.entries().forEach((point) => {
      if (this.#listPresernter.has(point[0])){
        this.#listPresernter.get(point[0]).resetView(point);
      }
    }
    );
    if(this.#currentNewPoint) {
      this.#resetTripPointNew();
    }

  };

  #resetTripPointNew = () => {
    if(this.#currentNewPoint) {
      this.#currentNewPoint.remove();
      this.#currentNewPoint = null;
      this.#addNewTripButtonView.buttonOn();
    }
  };

  #clearBoard = () => {

    this.#listPresernter.forEach((element) => element.remove());
    remove(this.#zeroPointsView);
    this.#addNewTripButtonView.buttonOn();
    this.#listPresernter.clear();

  };

  #renderBoard = (points) => {
    this.#clearBoard();
    if(this.#isLoading) {
      render(this.#loadingView, this.#tripEventsListContainer);
      this.#addNewTripButtonView.buttonOff();
      return;
    }

    if (points.size === 0 && this.#currentNewPoint === null) {
      this.#zeroPointsView = new TripPointZeroView({currentFilter: this.#filterModel.getFilter()});
      render(this.#zeroPointsView, this.#tripEventsListContainer);
    } else{
      remove(this.#zeroPointsView);
      for (const point of points.entries()) {
        this.#createPresernter(point);
      }
    }
  };
}
