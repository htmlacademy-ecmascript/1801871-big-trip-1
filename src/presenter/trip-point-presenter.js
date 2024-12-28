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

  #onFavoriteClick = (point) => {
    const newPoint = Array.from(point);
    newPoint[1] = Object.assign({}, point[1]);
    newPoint[1].isFavorite = !newPoint[1].isFavorite;
    this.#handelPointChange(newPoint, UserAction.UPDATE_POINT, UpdateType.PATCH);
  };

  #onSubmitPoint = (point) => {
    this.#handelPointChange(point, UserAction.UPDATE_POINT, UpdateType.MINOR);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replacePoint(this.#point);
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };


  #replacePoint(point) {
    let newPointComponent;
    this.#point = point;
    if(this.#currentComponentType === 'View') {

      newPointComponent = new TripPointEditView(
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
      newPointComponent = new TripPointView(
        {point:point,
          offers:this.#offers,
          destinations:this.#destinations,
          onEditClick:this.#onEditClick,
          onFavoriteClick:this.#onFavoriteClick
        });
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
    replace(newPointComponent, this.#currentComponent);
    this.#currentComponent.removeElement();
    this.#currentComponent = newPointComponent;
    this.#currentComponentType = this.#currentComponentType === 'View' ? 'Edit' : 'View';
  }


  renderPoint (point) {
    const pointComponent = new TripPointView(
      {
        point:point,
        offers:this.#offers,
        destinations:this.#destinations,
        onEditClick:this.#onEditClick,
        onFavoriteClick:this.#onFavoriteClick
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
        onFavoriteClick:this.#onFavoriteClick
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

  setSaving = () =>{
    if(this.#currentComponentType !== 'View') {
      this.#currentComponent.updateElement(
        {
          isSaving:true,
          isDisabled:true
        }
      );
    }
  };

  setDeleting = () => {
    this.#currentComponent.updateElement(
      {
        isDeleting:true,
        isDisabled:true
      }
    );
  };

  setAborting() {
    const resetFormState = () => {
      if(this.#currentComponentType === 'Edit') {
        this.#currentComponent.updateElement(
          {
            isDeleting:false,
            isDisabled:false,
            isSaving:false
          }
        );
      }
    };
    this.#currentComponent.shake(resetFormState);

  }
}
