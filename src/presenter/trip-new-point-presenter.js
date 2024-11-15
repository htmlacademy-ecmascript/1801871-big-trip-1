import TripPointEditView from '../view/trip-point-edit-view';
import { render, RenderPosition } from '../framework/render';

export default class TripNewPointPresenter{
  #offers = null;
  #destinations = null;
  #tripEventsListContainer = null;

  #pointViewComponent = null;

  constructor({
    offers,
    destinations,
    tripEventsListContainer
  }){
    this.#offers = offers;
    this.#destinations = destinations;
    this.#tripEventsListContainer = tripEventsListContainer;
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
  }

  #onSubmitPoint = () =>{
    console.log('submit');
  };

  #onDeleteClick = () =>{
    console.log('delete');
  };


}


