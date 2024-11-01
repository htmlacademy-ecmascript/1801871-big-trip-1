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

  #handelTypeChange = null;
  #point = null;

  constructor(
    {
      offers,
      destinations,
      tripEventsListContainer,
      handelPointChange,
      handelTypeChange
    }
  ){
    this.#tripEventsListContainer = tripEventsListContainer;

    this.#offers = offers;
    this.#destinations = destinations;
    this.#handelPointChange = handelPointChange;
    this.#handelTypeChange = handelTypeChange;
  }

  #onEditClick = (point) => {
    this.#replacePoint(point);
  };

  #onCloseClick = (point) => {
    this.#replacePoint(point);
  };

  #onFavorieClick = (point) => {
    // eslint-disable-next-line camelcase
    point[1].is_favorite = !point[1].is_favorite;
    this.#handelPointChange(point);
  };

  #onSubmitPoint = (point) => {
    this.#handelPointChange(point);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replacePoint(this.#point);
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #replacePoint(point) {
    let newPointComnponent;
    this.#point = point;


    if(this.#currentComponentType === 'View') {

      newPointComnponent = new TripPointEditView({point:point,offers:this.#offers, destinations:this.#destinations, onCloseClick:this.#onCloseClick, onSubmitPoint:this.#onSubmitPoint});
      document.addEventListener('keydown', this.#escKeyDownHandler);
      this.#handelTypeChange();
    }
    if(this.#currentComponentType === 'Edit') {
      newPointComnponent = new TripPointView({point:point,offers:this.#offers, destinations:this.#destinations, onEditClick:this.#onEditClick, onFavoriteClick:this.#onFavorieClick});
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
    replace(newPointComnponent, this.#currentComponent);
    this.#currentComponent = newPointComnponent;
    this.#currentComponentType = this.#currentComponentType === 'View' ? 'Edit' : 'View';
  }


  renderPoint (point) {
    const pointComponent = new TripPointView({point:point, offers:this.#offers, destinations:this.#destinations, onEditClick:this.#onEditClick, onFavoriteClick:this.#onFavorieClick});
    this.#currentComponentType = 'View';
    this.#currentComponent = pointComponent;
    render(pointComponent, this.#tripEventsListContainer);
  }

  renderNewPoint (point) {
    const pointComponent = new TripPointEditView({point:point,offers:this.#offers, destinations:this.#destinations, onCloseClick:this.#onCloseClick, onSubmitPoint:this.#onSubmitPoint, isNewPoint:true});
    this.#handelTypeChange();
    this.#currentComponentType = 'Edit';
    this.#currentComponent = pointComponent;
    this.#point = point;
    document.addEventListener('keydown', this.#escKeyDownHandler);
    render(pointComponent, this.#tripEventsListContainer, 'afterbegin');
  }


  replace(point) {
    const pointComponent = new TripPointView({point:point, offers:this.#offers, destinations:this.#destinations, onEditClick:this.#onEditClick, onFavoriteClick:this.#onFavorieClick});
    this.#currentComponentType = 'View';
    replace(pointComponent, this.#currentComponent);
    this.#currentComponent = pointComponent;
  }

  remove() {
    remove(this.#currentComponent);
  }

  resetView(point) {
    if (this.#currentComponentType !== 'View') {
      this.#replacePoint(point);
    }
  }
}
