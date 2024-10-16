import { render } from '../framework/render';

import TripPointPresenter from '../presenter/trip-point-presenter';

import TripPointZeroView from '../view/zero-point-view';


export default class TripPointBoardPresenter{
  #tripEventsListContainer = null;

  #componentList = new Map();

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
    console.log(this.#points);

    if (this.#points.size === 0) {
      render(new TripPointZeroView(), this.#tripEventsListContainer);
    } else{
      for (const point of this.#points.entries()) {
        this.#renderPresenter(point);

      }
    }
  }

  #handelPointChange = (updatePoint) => {
    this.#points.set(updatePoint[0],updatePoint[1]);
    // console.log(this.#points);
    // console.log(updatePoint);
    console.log(this.#points.get(updatePoint[0]));
  };


  #renderPresenter = (point) => {
    const pointPresenter = new TripPointPresenter({offers:this.#offers, destinations:this.#destinations, tripEventsListContainer:this.#tripEventsListContainer, handelPointChange:this.#handelPointChange});
    pointPresenter.renderPoint(point);
    this.#componentList.set(point[0],pointPresenter);
  };

  removePoint (point) {
    this.#componentList.get(point[0]).remove();

  }
}
