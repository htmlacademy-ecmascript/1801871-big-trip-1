import { formatDate } from '../utils.js';
import { EventType } from '../const.js';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

const createTripTypeTemplate = (point) =>
  `${Object.values(EventType).map((type)=>
    `
              <div class="event__type-item">
                <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${point.type === type ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type[0].toUpperCase() + type.slice(1)}</label>
              </div>
 `).join('')}
`;


const createOffersTemplate = (point, offers, isDisabled) =>
  `
  ${offers[point.type].map((offer) =>
    `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-1" type="checkbox" name="event-offer-${offer.title}" data-offer-id="${offer.id}"
           ${point.offers.includes(offer.id) ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
        <label class="event__offer-label" for="event-offer-${offer.title}-1">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`).join('')}
`;

const createGalleryTemplate = (destination) =>
  `<div class="event__photos-container">
    <div class="event__photos-tape">
    ${destination.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">
      `).join('')}
    </div>
  </div>
`;

const createDeleteButtonTextTemplate = (isNewPoint, isDeleting) => {
  if(isNewPoint){
    return 'Cancel';
  }
  if(isDeleting) {
    return 'Deleting...';
  }
  return 'Delete';
};

const createTripEditTemplate = ({point, isSaving, isDeleting, isDisabled}, offers, destinations, isNewPoint) =>
  `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${createTripTypeTemplate(point)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${point.type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${point.destination !== 'new-point' ? destinations[point.destination].name : ''}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
          <datalist id="destination-list-1">
          ${Object.values(destinations).map((destination)=>`<option value="${destination.name}" '></option>`
  ).join('')}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${point.dateFrom !== '' ? formatDate(point.dateFrom,'DD/MM/YY HH:mm') : ''}" ${isDisabled ? 'disabled' : ''}>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${point.dateFrom !== '' ? formatDate(point.dateTo,'DD/MM/YY HH:mm') : ''}" ${isDisabled ? 'disabled' : ''}>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" min='1' name="event-price" value="${point.basePrice}" ${isDisabled ? 'disabled' : ''}>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">${isSaving ? 'Saving...' : 'Save'}</button>
        <button class="event__reset-btn" type="reset">${createDeleteButtonTextTemplate(isNewPoint, isDeleting)}</button>
        <button class="event__rollup-btn" style='display:${isNewPoint ? 'none' : 'inline'}' type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers ${offers[point.type].length === 0 ? 'disable' : ''}">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${createOffersTemplate(point, offers, isDisabled)}
        </div>

        </section>

        <section class="event__section  event__section--destination ${point.destination !== 'new-point' ? '' : 'disable'}">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${point.destination !== 'new-point' ? destinations[point.destination].description : ''}</p>
          ${point.destination !== 'new-point' ? createGalleryTemplate(destinations[point.destination]) : ''}
        </section>
      </section>
    </form>
  </li>
  `;

export default class TripPointEditView extends AbstractStatefulView {

  #onCloseClick = null;
  #onSubmitPoint = null;
  #onDeleteClick = null;

  #point = null;

  #offers = null;
  #destinations = null;
  #isNewPoint = null;

  #dateFromFlatpicker = null;
  #dateToFlatpicker = null;

  constructor (
    {point, offers, destinations, onCloseClick, onSubmitPoint, onDeleteClick, isNewPoint = false}
  ) {
    super();
    this.#point = point;

    this.#offers = offers;
    this.#destinations = destinations;
    this.#isNewPoint = isNewPoint;


    this.#onCloseClick = onCloseClick;
    this.#onSubmitPoint = onSubmitPoint;
    this.#onDeleteClick = onDeleteClick;

    this._setState(TripPointEditView.convertDataToState(point));

    this._restoreHandlers();
  }

  #setDatePickers() {
    this.#dateFromFlatpicker = flatpickr(this.element.querySelector('#event-start-time-1'), {
      enableTime: true,
      dateFormat: 'd/m/y H:i',
      altFormat: 'Y-m-d',
      defaultDate: this._state.point.dateFrom,
      maxDate: this._state.point.dateTo,
      onClose: this.#updateSelectedDateFromInState
    });
    this.#dateToFlatpicker = flatpickr(this.element.querySelector('#event-end-time-1'), {
      enableTime: true,
      dateFormat: 'd/m/y H:i',
      altFormat: 'Y-m-d',
      defaultDate: this._state.point.dateTo === '' ? this._state.point.dateFrom : this._state.point.dateTo,
      minDate: this._state.point.dateFrom,
      onClose: this.#updateSelectedDateToInState
    });

  }

  #updateSelectedDateToInState = ([date]) => {
    const updateDate = new Date(date).toISOString();
    this._setState({
      point: {
        ...this._state.point,

        dateTo:updateDate
      }
    });
    this.updateElement(this._state);
  };

  #updateSelectedDateFromInState = ([date]) => {
    const updateDate = new Date(date).toISOString();
    this._setState({
      point: {
        ...this._state.point,

        dateFrom:updateDate
      }
    });
    this.updateElement(this._state);
  };


  removeElement() {
    super.removeElement();

    if (this.#dateToFlatpicker) {
      this.#dateToFlatpicker.destroy();
      this.#dateToFlatpicker = null;
    }

    if (this.#dateFromFlatpicker) {
      this.#dateFromFlatpicker.destroy();
      this.#dateFromFlatpicker = null;
    }
  }

  static convertDataToState = (point) => ({
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
    point: {
      id:point[0],
      ...point[1],
    }
  });

  static convertStateToDate = (state) => {
    const pointData = {};
    Object.assign(pointData, state.point);
    const point = state.point;
    const id = point.id;
    delete pointData.id;
    return [id, pointData];
  };

  #clickHandler = () => {
    this.#onCloseClick(this.#point);
  };

  #submitHandler = (evt) => {
    evt.preventDefault();
    this.#updatePriceInState();
    this.#onSubmitPoint(TripPointEditView.convertStateToDate(this._state), this.#isNewPoint);
  };

  #updateSelectedOffersInState = () => {
    const offers = [];
    this.element.querySelectorAll('.event__offer-checkbox:checked').forEach((offer)=>offers.push(offer.dataset.offerId));
    this._setState({
      point: {
        ...this._state.point,
        offers: offers

      }
    });
  };

  #updatePriceInState = () => {
    const price = this.element.querySelector('.event__input--price').value;
    this._setState({
      point: {
        ...this._state.point,
        basePrice: price
      }
    });
  };

  #onDestinationChange = (evt) => {
    if(Object.entries(this.#destinations).find((destination)=>destination[1].name === evt.target.value) === undefined){
      evt.target.value = this._state.point.destination !== 'new-point' ? this.#destinations[this._state.point.destination].name : '';
    } else{
      const destinationId = Object.entries(this.#destinations).find((destination)=>destination[1].name === evt.target.value)[0];

      this.updateElement({
        point: {
          ...this._state.point,
          destination:destinationId

        }
      });

    }
  };

  #onTypeChange = (evt) => {

    this.updateElement({point: {
      ...this._state.point,
      offers:'',
      type:evt.target.value
    }});
  };

  #onDeletePoint = () => {
    this.#onDeleteClick(TripPointEditView.convertStateToDate(this._state), this.#isNewPoint);
  };

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
    this.element.querySelector('.event--edit').addEventListener('submit', this.#submitHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onDestinationChange);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onTypeChange);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onDeletePoint);
    this.element.querySelector('.event__section').addEventListener('change', this.#updateSelectedOffersInState);
    this.#setDatePickers();
  }

  get template() {
    return createTripEditTemplate(this._state, this.#offers, this.#destinations, this.#isNewPoint);

  }

}
