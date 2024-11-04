import { render, remove } from '../framework/render';
import { FilterType, SortType } from '../const';
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

  #points = null;
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

    this.#points = this.#tripPointsModel.points;
    this.#offers = this.#offersModel.offers;
    this.#destinations = this.#destinationsModel.destinations;

    this.#zeroPointsPresenter = new TripPointZeroView();
  }

  init() {
    this.#renderBoard();
  }

  #handelPointChange = (updatePoint) => {
    this.#points.set(updatePoint[0],updatePoint[1]);
    this.#listPresernter.get(updatePoint[0]).replace(updatePoint);
  };


  #createPresernter = (point) => {
    const pointPresenter = new TripPointPresenter({offers:this.#offers, destinations:this.#destinations, tripEventsListContainer:this.#tripEventsListContainer, handelPointChange:this.#handelPointChange, handelTypeChange:this.#handleTypeChange});
    pointPresenter.renderPoint(point);
    this.#listPresernter.set(point[0],pointPresenter);
  };

  removePoint (point) {
    this.#listPresernter.get(point[0]).remove();

  }

  #handleTypeChange = () => {
    this.#points.entries().forEach((point) => {
      if (this.#listPresernter.has(point[0])){
        this.#listPresernter.get(point[0]).resetView(point);
      }
    });

  };

  #clearBoard = () => {
    this.#listPresernter.forEach((element) => element.remove());
    this.#listPresernter.clear();
  };

  #renderBoard () {
    if (this.#points.size === 0) {
      render(this.#zeroPointsPresenter, this.#tripEventsListContainer);
    } else{
      remove(this.#zeroPointsPresenter);
      for (const point of this.#points.entries()) {
        this.#createPresernter(point);
      }
    }
  }

  #renderNewPoint() {
    const blankPoint = this.#tripPointsModel.blankPoint;
    const pointPresenter = new TripPointPresenter({offers:this.#offers, destinations:this.#destinations, tripEventsListContainer:this.#tripEventsListContainer, handelPointChange:this.#handelPointChange, handelTypeChange:this.#handleTypeChange});
    pointPresenter.renderNewPoint(this.#tripPointsModel.blankPoint);
    this.#points.set(blankPoint[0],blankPoint[1]);
    this.#listPresernter.set(blankPoint[0],pointPresenter);
  }


  filterBoard (filterType) {
    this.#clearBoard();

    if(filterType === FilterType.FUTURE){
      this.#points = this.#tripPointsModel.points;
      this.#points = new Map(filterListFuture(this.#points));
    }
    if(filterType === FilterType.PRESENT){
      this.#points = this.#tripPointsModel.points;
      this.#points = new Map(filterListPresent(this.#points));
    }
    if(filterType === FilterType.PAST){
      this.#points = this.#tripPointsModel.points;
      this.#points = new Map(filterListPast(this.#points));
    }
    if(filterType === FilterType.EVERYTHING){
      this.#points = this.#tripPointsModel.points;
    }
    this.#renderBoard();


  }

  sortBoard (sortType) {
    this.#clearBoard();

    if(sortType === SortType.DAY){
      this.#points = this.#tripPointsModel.points;
      this.#points = new Map(sortListDay(this.#points));

    }
    if(sortType === SortType.EVENT){
      this.#points = this.#tripPointsModel.points;
    }
    if(sortType === SortType.OFFERS){
      this.#points = this.#tripPointsModel.points;
    }
    if(sortType === SortType.PRICE){
      this.#points = this.#tripPointsModel.points;
      this.#points = new Map(sortListPrice(this.#points));
    }
    if(sortType === SortType.TIME){
      this.#points = this.#tripPointsModel.points;
      this.#points = new Map(sortListTime(this.#points));
    }
    this.#renderBoard();


  }
}
