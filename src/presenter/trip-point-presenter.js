import { render, replace } from '../framework/render';

import TripPointEditView from '../view/trip-point-edit-view';
import TripPointView from '../view/trip-point-view';


export default class TripPointPresenter{
  #currentPoint = null;
  #currentPointType = null;


  #tripEventsListContainer = null;

  #offers = null;
  #destinations = null;

  constructor(
    {
      offers,
      destinations,
      tripEventsListContainer
    }
  ){
    this.#tripEventsListContainer = tripEventsListContainer;

    this.#offers = offers;
    this.#destinations = destinations;
  }

  #onEditClick = (point) => {
    this.#replacePoint(point);
  };

  #onCloseClick = (point) => {
    this.#replacePoint(point);
  };

  #replacePoint(point) {
    let newPointComnponent;

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        this.#replacePoint(point);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    if(this.#currentPointType === 'View') {
      newPointComnponent = new TripPointEditView({point:point,offers:this.#offers, destination:this.#destinations, onCloseClick:this.#onCloseClick});
      document.addEventListener('keydown', escKeyDownHandler);
    }
    if(this.#currentPointType === 'Edit') {
      newPointComnponent = new TripPointView({point:point,offers:this.#offers, destination:this.#destinations, onEditClick:this.#onEditClick});
      document.removeEventListener('keydown', escKeyDownHandler);
    }
    replace(newPointComnponent, this.#currentPoint);
    this.#currentPoint = newPointComnponent;
    this.#currentPointType = this.#currentPointType === 'View' ? 'Edit' : 'View';
  }


  renderPoint (point) {
    const pointComponent = new TripPointView({point:point, offers:this.#offers, destination:this.#destinations, onEditClick:this.#onEditClick});
    this.#currentPointType = 'View';
    this.#currentPoint = pointComponent;
    render(pointComponent, this.#tripEventsListContainer);
  }
}
