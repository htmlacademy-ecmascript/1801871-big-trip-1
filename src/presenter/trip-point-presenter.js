import { render, replace } from '../framework/render';

import TripPointEditView from '../view/trip-point-edit-view';
import TripPointView from '../view/trip-point-view';

// import TripPointZeroView from '../view/zero-point-view';

export default class TripPointPresenter{
  #componentList = new Map();
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

    if(this.#componentList.get(point[0]) instanceof TripPointView) {
      newPointComnponent = new TripPointEditView({point:point,offers:this.#offers, destination:this.#destinations, onCloseClick:this.#onCloseClick});
      document.addEventListener('keydown', escKeyDownHandler);
    }
    if(this.#componentList.get(point[0]) instanceof TripPointEditView) {
      newPointComnponent = new TripPointView({point:point,offers:this.#offers, destination:this.#destinations, onEditClick:this.#onEditClick});
      document.removeEventListener('keydown', escKeyDownHandler);
    }
    replace(newPointComnponent, this.#componentList.get(point[0]));
    this.#componentList.set(point[0], newPointComnponent);
  }


  renderPoint (point) {
    const pointComponent = new TripPointView({point:point, offers:this.#offers, destination:this.#destinations, onEditClick:this.#onEditClick});
    this.#componentList.set(point[0], pointComponent);
    render(pointComponent, this.#tripEventsListContainer);
  }
}
