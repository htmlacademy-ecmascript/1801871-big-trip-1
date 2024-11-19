import { render, replace, remove } from '../framework/render';

import { UserAction, UpdateType } from '../const';

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
      handelTypeChange,

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

  #onDeleteClick = (point) => {
    this.#handelPointChange(point, UserAction.DELETE_POINT, UpdateType.MINOR);
  };

  #onFavorieClick = (point) => {

    point[1].isFavorite = !point[1].isFavorite;
    this.#handelPointChange(point, UserAction.UPDATE_POINT, UpdateType.PATCH);
  };

  #onSubmitPoint = (point) => {
    this.#handelPointChange(point, UserAction.UPDATE_POINT, UpdateType.PATCH);
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

      newPointComnponent = new TripPointEditView(
        {point:point,
          offers:this.#offers,
          destinations:this.#destinations,
          onCloseClick:this.#onCloseClick,
          onSubmitPoint:this.#onSubmitPoint,
          onDeleteClick: this.#onDeleteClick
        });

      document.addEventListener('keydown', this.#escKeyDownHandler);
      this.#handelTypeChange();
    }
    if(this.#currentComponentType === 'Edit') {
      newPointComnponent = new TripPointView(
        {point:point,
          offers:this.#offers,
          destinations:this.#destinations,
          onEditClick:this.#onEditClick,
          onFavoriteClick:this.#onFavorieClick
        });
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
    replace(newPointComnponent, this.#currentComponent);
    this.#currentComponent.removeElement();
    this.#currentComponent = newPointComnponent;
    this.#currentComponentType = this.#currentComponentType === 'View' ? 'Edit' : 'View';
  }


  renderPoint (point) {
    const pointComponent = new TripPointView(
      {
        point:point,
        offers:this.#offers,
        destinations:this.#destinations,
        onEditClick:this.#onEditClick,
        onFavoriteClick:this.#onFavorieClick
      });
    this.#currentComponentType = 'View';
    this.#currentComponent = pointComponent;
    render(pointComponent, this.#tripEventsListContainer);
  }

  replace(point) {
    const pointComponent = new TripPointView(
      {
        point:point,
        offers:this.#offers,
        destinations:this.#destinations,
        onEditClick:this.#onEditClick,
        onFavoriteClick:this.#onFavorieClick
      });

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
