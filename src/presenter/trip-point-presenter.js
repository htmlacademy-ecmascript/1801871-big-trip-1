import { render, replace, remove } from '../framework/render';

import TripPointEditView from '../view/trip-point-edit-view';
import TripPointView from '../view/trip-point-view';


export default class TripPointPresenter{
  #currentComponent = null;
  #currentComponentType = null;


  #tripEventsListContainer = null;

  #offers = null;
  #destinations = null;

  #handelPointChange = null;

  constructor(
    {
      offers,
      destinations,
      tripEventsListContainer,
      handelPointChange
    }
  ){
    this.#tripEventsListContainer = tripEventsListContainer;

    this.#offers = offers;
    this.#destinations = destinations;
    this.#handelPointChange = handelPointChange;
  }

  #onEditClick = (point) => {
    this.#replacePoint(point);
  };

  #onCloseClick = (point) => {
    this.#replacePoint(point);
  };

  #onFavorieClick = (point) => {
    console.log('#onFavorieClick');
    point[1].is_favorite = !point[1].is_favorite;
    this.#handelPointChange(point);
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

    if(this.#currentComponentType === 'View') {
      newPointComnponent = new TripPointEditView({point:point,offers:this.#offers, destination:this.#destinations, onCloseClick:this.#onCloseClick});
      document.addEventListener('keydown', escKeyDownHandler);
    }
    if(this.#currentComponentType === 'Edit') {
      newPointComnponent = new TripPointView({point:point,offers:this.#offers, destination:this.#destinations, onEditClick:this.#onEditClick, onFavoriteClick:this.#onFavorieClick});
      document.removeEventListener('keydown', escKeyDownHandler);
    }
    replace(newPointComnponent, this.#currentComponent);
    this.#currentComponent = newPointComnponent;
    this.#currentComponentType = this.#currentComponentType === 'View' ? 'Edit' : 'View';
  }


  renderPoint (point) {
    const pointComponent = new TripPointView({point:point, offers:this.#offers, destination:this.#destinations, onEditClick:this.#onEditClick, onFavoriteClick:this.#onFavorieClick});
    this.#currentComponentType = 'View';
    this.#currentComponent = pointComponent;
    render(pointComponent, this.#tripEventsListContainer);
  }

  remove() {
    remove(this.#currentComponent);
  }
}
