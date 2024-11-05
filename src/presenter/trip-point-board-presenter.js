import { render, remove } from '../framework/render';
import { FilterType, SortType, UserAction, UpdateType } from '../const';
import { filterListFuture, filterListPresent, filterListPast, sortListDay, sortListPrice, sortListTime } from '../utils';

import TripPointPresenter from '../presenter/trip-point-presenter';

import TripPointZeroView from '../view/zero-point-view';


export default class TripPointBoardPresenter{
  #tripEventsListContainer = null;

  #listPresernter = new Map();
  #zeroPointsPresenter = null;

  #tripPointsModel = null;
  #offersModel = null;
  #destinationsModel = null;


  #offers = null;
  #destinations = null;


  constructor(
    {
      tripEventsListContainer,
      tripPointsModel,
      offersModel,
      destinationsModel
    }
  ){
    this.#tripEventsListContainer = tripEventsListContainer;

    this.#tripPointsModel = tripPointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#tripPointsModel.addObserver(this.#handleModelEvent);


    this.#offers = this.#offersModel.offers;
    this.#destinations = this.#destinationsModel.destinations;

    this.#zeroPointsPresenter = new TripPointZeroView();
  }

  init() {
    this.#renderBoard(this.points);
  }

  get points() {
    return this.#tripPointsModel.points;
  }

  #handleViewAction = (update, actionType, updateType) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#tripPointsModel.updatePoint(update, updateType);
        break;
      case UserAction.ADD_POINT:
        this.#tripPointsModel.addPoint(update, updateType);
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
        this.#renderBoard(this.points);
        break;
      case UpdateType.MAJOR:

        break;
    }

  };

  // #handelPointChange = (updatePoint) => {
  //   this.#tripPointsModel.updatePoint(updatePoint, 'test');
  //   this.#listPresernter.get(updatePoint[0]).replace(updatePoint);
  // };


  #createPresernter = (point) => {
    const pointPresenter = new TripPointPresenter(
      {offers:this.#offers,
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
    });

  };

  #clearBoard = () => {
    this.#listPresernter.forEach((element) => element.remove());
    this.#listPresernter.clear();
  };

  #renderBoard (points) {
    this.#clearBoard();
    if (points.size === 0) {
      render(this.#zeroPointsPresenter, this.#tripEventsListContainer);
    } else{
      remove(this.#zeroPointsPresenter);
      for (const point of points.entries()) {
        this.#createPresernter(point);
      }
    }
  }

  #renderNewPoint() {
    const blankPoint = this.#tripPointsModel.blankPoint;
    const pointPresenter = new TripPointPresenter(
      {offers:this.#offers,
        destinations:this.#destinations,
        tripEventsListContainer:this.#tripEventsListContainer,
        handelPointChange:this.#handleViewAction,
        handelTypeChange:this.#handleTypeChange
      });

    pointPresenter.renderNewPoint(this.#tripPointsModel.blankPoint);
    this.#tripPointsModel.updatePoint(blankPoint, 'test');
    this.#listPresernter.set(blankPoint[0],pointPresenter);
  }


  filterBoard (filterType) {
    this.#clearBoard();

    if(filterType === FilterType.FUTURE){
      this.#renderBoard(new Map(filterListFuture(this.points)));
    }
    if(filterType === FilterType.PRESENT){
      this.#renderBoard(new Map(filterListPresent(this.points)));
    }
    if(filterType === FilterType.PAST){
      this.#renderBoard(new Map(filterListPast(this.points)));
    }
    if(filterType === FilterType.EVERYTHING){
      this.#renderBoard(this.points);
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
