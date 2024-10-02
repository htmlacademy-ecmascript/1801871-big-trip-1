import { render, replace } from '../framework/render';

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

  #onEditClick = (point) => {
    this.#replaceToEdit(point);
  };

  #onCloseClick = (point) => {
    this.#replaceToEdit(point);
  };


  #replaceToEdit(point) {
    let newPointComnponent;
    if(this.#componentList.get(point[0]) instanceof TripPointView) {
      newPointComnponent = new TripPointEditView({point:point,offers:this.#offers, destination:this.#destinations, onCloseClick:this.#onCloseClick});
    }
    if(this.#componentList.get(point[0]) instanceof TripPointEditView) {
      newPointComnponent = new TripPointView({point:point,offers:this.#offers, destination:this.#destinations, onEditClick:this.#onEditClick});
    }
    replace(newPointComnponent, this.#componentList.get(point[0]));

    this.#componentList.set(point[0], newPointComnponent);
  }


  #renderPoint (point,offers,destinations) {
    const pointComponent = new TripPointView({point:point, offers:offers, destination:destinations, onEditClick:this.#onEditClick});
    this.#componentList.set(point[0], pointComponent);
    render(pointComponent, this.#tripEventsListContainer);
  }


}
