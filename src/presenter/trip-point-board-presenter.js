import { render } from '../framework/render';

import TripPointPresenter from '../presenter/trip-point-presenter';

import TripPointZeroView from '../view/zero-point-view';


export default class TripPointBoardPresenter{

  #tripEventsListContainer = null;

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
  }

  init() {

    if (this.#points.size === 0) {
      render(new TripPointZeroView(), this.#tripEventsListContainer);
    } else{
      for (const point of this.#points.entries()) {
        this.renderPresenter(point);
      }
    }
  }


  renderPresenter = (point) => {
    const pointPresenter = new TripPointPresenter({offers:this.#offers, destinations:this.#destinations, tripEventsListContainer:this.#tripEventsListContainer});
    pointPresenter.renderPoint(point);
  };
}
