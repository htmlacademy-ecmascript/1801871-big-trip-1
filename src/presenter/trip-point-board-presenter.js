import { render } from '../framework/render';

import TripPointEditView from '../view/trip-point-edit-view';
import TripPointView from '../view/trip-point-view';


export default class TripPointBoardPresenter{
  #componentList = new Map();
  #tripEventsListContainer = null;

  #tripPointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #points = null;
  #offers = null;
  #destinations = null;

  #blankPoint = null;


  #clickHandler = () => {
    console.log(this);
  };

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
      this.#renderPoint(point, this.#offers, this.#destinations);
    }
  }

  #renderPoint (point,offers,destinations) {
    const pointComponent = new TripPointView({point:point[1],offers:offers, destination:destinations[point[1].destination], onEditClick:this.#clickHandler});
    this.#componentList.set(point[0], pointComponent);
    render(pointComponent, this.#tripEventsListContainer);
  }


}
