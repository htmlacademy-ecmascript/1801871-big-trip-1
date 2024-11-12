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

  #isNewPoint = null;

  #addNewTripButtonView = null;


  constructor(
    {
      offers,
      destinations,
      tripEventsListContainer,
      handelPointChange,
      handelTypeChange,
      addNewTripButtonView
    }
  ){
    this.#tripEventsListContainer = tripEventsListContainer;

    this.#offers = offers;
    this.#destinations = destinations;
    this.#handelPointChange = handelPointChange;
    this.#handelTypeChange = handelTypeChange;

    this.#addNewTripButtonView = addNewTripButtonView;


  }

  #onEditClick = (point) => {
    this.#replacePoint(point);
  };

  #onCloseClick = (point) => {
    this.#addNewTripButtonView.buttonOn();
    this.#replacePoint(point);
  };

  #onDeleteClick = (point) => {
    this.#addNewTripButtonView.buttonOn();

    this.#handelPointChange(point, UserAction.DELETE_POINT, UpdateType.MINOR);
  };

  #onFavorieClick = (point) => {
    // eslint-disable-next-line camelcase
    point[1].is_favorite = !point[1].is_favorite;
    this.#handelPointChange(point, UserAction.UPDATE_POINT, UpdateType.PATCH);
  };

  #onSubmitPoint = (point, isNewPoint) => {
    if(!isNewPoint) {
      this.#handelPointChange(point, UserAction.UPDATE_POINT, UpdateType.PATCH);
    } else{
      this.#addNewTripButtonView.buttonOn();
      this.#handelPointChange(point, UserAction.ADD_POINT, UpdateType.MAJOR);
    }
    this.#isNewPoint = false;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      if(this.#isNewPoint) {
        this.#addNewTripButtonView.buttonOn();
        this.remove();
      } else{
        this.#replacePoint(this.#point);
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      }
    }
  };


  #replacePoint(point) {
    let newPointComnponent;
    this.#point = point;
    this.#addNewTripButtonView.buttonOn();


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
    this.#isNewPoint = false;
    render(pointComponent, this.#tripEventsListContainer);
  }

  renderNewPoint (point) {
    const pointComponent = new TripPointEditView(
      {
        point:point,
        offers:this.#offers,
        destinations:this.#destinations,
        onCloseClick:this.#onCloseClick,
        onSubmitPoint:this.#onSubmitPoint,
        onDeleteClick: this.#onDeleteClick,
        isNewPoint:true
      });
    this.#isNewPoint = true;
    this.#addNewTripButtonView.buttonOff();

    this.#handelTypeChange();
    this.#currentComponentType = 'Edit';
    this.#currentComponent = pointComponent;
    this.#point = point;
    document.addEventListener('keydown', this.#escKeyDownHandler);
    render(pointComponent, this.#tripEventsListContainer, 'afterbegin');
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
    this.#addNewTripButtonView.buttonOn();

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
