import { render, remove } from '../framework/render';
import { FilterType, SortType, UserAction, UpdateType } from '../const';
import { filterListFuture, filterListPresent, filterListPast, sortListDay, sortListPrice, sortListTime } from '../utils';

import TripPointPresenter from '../presenter/trip-point-presenter';

import AddNewTripButtonView from '../view/add-new-trip-button-view';


import TripPointZeroView from '../view/zero-point-view';


export default class TripPointBoardPresenter{
  #tripEventsListContainer = null;
  #tripHeaderContainer = null;

  #listPresernter = new Map();
  #zeroPointsPresenter = null;
  #addNewTripButtonView = null;

  #tripPointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterModel = null;


  #offers = null;
  #destinations = null;

  #currentNewPoint = null;


  constructor(
    {
      tripEventsListContainer,
      tripPointsModel,
      offersModel,
      destinationsModel,
      tripHeaderContainer,
      filterModel
    }
  ){
    this.#tripEventsListContainer = tripEventsListContainer;
    this.#tripHeaderContainer = tripHeaderContainer;

    this.#tripPointsModel = tripPointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;

    this.#tripPointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);


    this.#offers = this.#offersModel.offers;
    this.#destinations = this.#destinationsModel.destinations;

    this.#addNewTripButtonView = new AddNewTripButtonView({newPoinHandler:this.#newPoinHandler});
    this.#zeroPointsPresenter = new TripPointZeroView({currentFilter: this.#filterModel.filter});


  }

  init() {
    render(this.#addNewTripButtonView, this.#tripHeaderContainer);
    this.#renderBoard(this.points);
  }

  get points() {
    return this.#filterPoints(this.#filterModel.filter);
  }

  #handleViewAction = (update, actionType, updateType) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#tripPointsModel.updatePoint(update, updateType);
        break;
      case UserAction.ADD_POINT:
        this.#tripPointsModel.addPoint(update, updateType);
        this.#currentNewPoint = null;
        break;
      case UserAction.DELETE_POINT:
        this.#tripPointsModel.deletePoint(update, updateType);
        break;
    }
  };

  #handleModelEvent = (data, updateType) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#listPresernter.get(data[0]).replace(data);
        break;
      case UpdateType.MINOR:
        this.sortBoard(SortType.DAY);
        break;
      case UpdateType.MAJOR:
        this.sortBoard(SortType.DAY);
        break;
    }
  };

  #newPoinHandler = () => {
    this.#filterModel.setFilter(FilterType.EVERYTHING, UpdateType.MINOR);
    this.#renderNewPoint();
  };

  #renderNewPoint = () => {
    const newPointPresenter = new TripPointPresenter(
      {
        offers:this.#offers,
        destinations:this.#destinations,
        tripEventsListContainer:this.#tripEventsListContainer,
        handelPointChange:this.#handleViewAction,
        handelTypeChange:this.#handleTypeChange,
        addNewTripButtonView: this.#addNewTripButtonView
      });
    newPointPresenter.renderNewPoint(this.#tripPointsModel.blankPoint);
    this.#currentNewPoint = newPointPresenter;
    this.#listPresernter.set(this.#tripPointsModel.blankPoint[0],newPointPresenter);

  };

  #createPresernter = (point) => {
    const pointPresenter = new TripPointPresenter(
      {
        offers:this.#offers,
        destinations:this.#destinations,
        tripEventsListContainer:this.#tripEventsListContainer,
        handelPointChange:this.#handleViewAction,
        handelTypeChange:this.#handleTypeChange,
        addNewTripButtonView: this.#addNewTripButtonView
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
      this.#currentNewPoint.remove();
    }

  };

  #clearBoard = () => {
    this.#listPresernter.forEach((element) => element.remove());
    remove(this.#zeroPointsPresenter);
    this.#listPresernter.clear();
  };

  #renderBoard (points) {
    this.#clearBoard();
    if (points.size === 0) {
      this.#zeroPointsPresenter = new TripPointZeroView({currentFilter: this.#filterModel.filter});
      render(this.#zeroPointsPresenter, this.#tripEventsListContainer);
    } else{
      remove(this.#zeroPointsPresenter);
      for (const point of points.entries()) {
        this.#createPresernter(point);
      }
    }
  }


  #filterPoints(filterType) {

    if(filterType === FilterType.FUTURE){
      return new Map(filterListFuture(this.#tripPointsModel.points));

    }
    if(filterType === FilterType.PRESENT){
      return new Map(filterListPresent(this.#tripPointsModel.points));
    }
    if(filterType === FilterType.PAST){
      return new Map(filterListPast(this.#tripPointsModel.points));
    }
    if(filterType === FilterType.EVERYTHING){
      return this.#tripPointsModel.points;
    }
  }

  sortBoard (sortType) {
    this.#clearBoard();

    if(sortType === SortType.DAY){
      this.#renderBoard(new Map(sortListDay(this.points)));
    }
    if(sortType === SortType.EVENT){
      this.#renderBoard(this.points);
    }
    if(sortType === SortType.OFFERS){
      this.#renderBoard(this.points);
    }
    if(sortType === SortType.PRICE){
      this.#renderBoard(new Map(sortListPrice(this.points)));
    }
    if(sortType === SortType.TIME){
      this.#renderBoard(new Map(sortListTime(this.points)));
    }
  }
}
