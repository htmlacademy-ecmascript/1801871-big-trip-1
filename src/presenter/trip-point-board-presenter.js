import { render } from '../framework/render';

import TripPointEditView from '../view/trip-point-edit-view';
import TripPointView from '../view/trip-point-view';


export default class TripPointBoardPresenter{
  #tripEventsListContainer = null;

  #tripPointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #points = null;
  #offers = null;
  #destinations = null;

  #blankPoint = null;
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

    this.#blankPoint = this.#tripPointsModel.blankPoint;

  }

  init() {
    for (const point of this.#points.entries()) {
      render(new TripPointView({point:point[1],offers:this.#offers, destination:this.#destinations[point[1].destination]}), this.#tripEventsListContainer);
    }
    for (const point of this.#points.entries()) {
      render(new TripPointEditView({point:point[1],offers:this.#offers, destination:this.#destinations[point[1].destination]}), this.#tripEventsListContainer);
    }
  }
}
