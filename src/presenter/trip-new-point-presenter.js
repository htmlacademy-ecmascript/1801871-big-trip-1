import TripPointEditView from '../view/trip-point-edit-view';
import { render, remove, RenderPosition } from '../framework/render';

import { UserAction, UpdateType } from '../const';

export default class TripNewPointPresenter{
  #offers = null;
  #destinations = null;
  #tripEventsListContainer = null;

  #pointViewComponent = null;

  #handelPointChange = null;
  #handleTypeChange = null;

  #addNewTripButtonView = null;


  constructor({
    offers,
    destinations,
    tripEventsListContainer,
    handelPointChange,
    addNewTripButtonView,
    handelTypeChange
  }){
    this.#offers = offers;
    this.#destinations = destinations;
    this.#tripEventsListContainer = tripEventsListContainer;

    this.#handelPointChange = handelPointChange;
    this.#handleTypeChange = handelTypeChange;
    this.#addNewTripButtonView = addNewTripButtonView;
  }


  renderPoint(point) {
    this.#pointViewComponent = new TripPointEditView({
      point:point,
      offers:this.#offers,
      destinations:this.#destinations,
      onSubmitPoint:this.#onSubmitPoint,
      onDeleteClick: this.#onDeleteClick,
      isNewPoint:true
    });
    render(this.#pointViewComponent, this.#tripEventsListContainer, RenderPosition.AFTERBEGIN);

    this.#handleTypeChange();
    this.#addNewTripButtonView.buttonOff();

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #onSubmitPoint = (point) =>{
    this.#handelPointChange(point, UserAction.ADD_POINT, UpdateType.MAJOR);
  };


  #onDeleteClick = () =>{
    this.#handelPointChange('', UserAction.DELETE_POINT, UpdateType.MAJOR);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  remove = () => {
    remove(this.#pointViewComponent);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      // this.#addNewTripButtonView.buttonOn();
      // this.remove();
      this.#handelPointChange('', UserAction.DELETE_POINT, UpdateType.MAJOR);
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  setSaving = () =>{
    this.#pointViewComponent.updateElement(
      {
        isSaving:true,
        isDisabled:true
      }
    );
  };

  setAborting() {
    const resetFormState = () => {
      this.#pointViewComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    this.#pointViewComponent.shake(resetFormState);
  }

}


