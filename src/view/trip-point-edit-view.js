import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import dayjs from 'dayjs';
import { DATE_DAY_MOUNTH_YEAR_HOUR_MINUTE_FORMAT } from '../const.js';

import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const createTripPointEditTemplate = ({point, destinations, offers}) =>
  `
  <li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
          ${Object.keys(offers).map((type) => `
            <div class="event__type-item">
              <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${point.type === type ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type.replace(/^\w/, (match) => match.toUpperCase())}</label>
            </div>`).join('')}
          </fieldset>
        </div>
      </div>
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${point.type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinations[point.destination].name}" list="destination-list-1">
        <datalist id="destination-list-1">
        ${Object.keys(destinations).map((destinationId) => `<option value=${destinations[destinationId].name} data-destination-id=${destinationId}></option> `).join('')}
        </datalist>
      </div>
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(new Date(point.dateFrom)).format(DATE_DAY_MOUNTH_YEAR_HOUR_MINUTE_FORMAT)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(new Date(point.dateTo)).format(DATE_DAY_MOUNTH_YEAR_HOUR_MINUTE_FORMAT)}">
      </div>
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.basePrice}">
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${offers[point.type].map((offer) => `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-1" type="checkbox" name="event-offer-${offer.title}" data-offer-id=${offer.id}
           ${point.offers.includes(offer.id) ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${offer.title}-1">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`).join('')}
        </div>
      </section>
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destinations[point.destination].description}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">
          ${destinations[point.destination].pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}"></img>`).join('')}
          </div>
        </div>
      </section>
    </section>
  </form>
</li>
`;

class TripPointEditView extends AbstractStatefulView {
  #callbacks = {};
  #dateToPicker = null;
  #dateFromPicker = null;

  constructor({point, destinations, offers}) {
    super();
    this._setState(TripPointEditView.parseDataToState(point, destinations, offers));
    this.setTripTypeHandler(this.tripTypeHandler);
    this.setDestinationHandler(this.destinationHandler);
    this.setDatePickers();
  }

  get template() {
    return createTripPointEditTemplate(this._state);
  }

  removeElement() {
    super.removeElement();

    if (this.#dateToPicker) {
      this.#dateToPicker.destroy();
      this.#dateToPicker = null;
    }

    if (this.#dateFromPicker) {
      this.#dateFromPicker.destroy();
      this.#dateFromPicker = null;
    }
  }

  static parseDataToState(point, destinations, offers) {
    return {
      point,
      destinations,
      offers
    };
  }

  parseStateToData = () => this._state.point;


  #submitFormHandler = (evt) => {
    evt.preventDefault();
    this.updateSelectedOffersInState();
    this.#callbacks.submitFormHandler(this.parseStateToData());
  };

  #closeButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#callbacks.closeButtonClickHandler();
  };

  setDatePickers = () => {
    this.#dateFromPicker = flatpickr(this.element.querySelector('#event-start-time-1'), {
      dateFormat: 'd/m/y H:i',
      altFormat: 'Y-m-d',
      defaultDate: this._state.point.dateFrom,
      onClose: this.#dateCloseHandlerTo,
      enableTime: true
    },);
    this.#dateToPicker = flatpickr(this.element.querySelector('#event-end-time-1'),{
      dateFormat: 'd/m/y H:i',
      altFormat: 'Y-m-d',
      defaultDate: this._state.point.dateTo,
      onClose: this.#dateCloseHandlerFrom,
      enableTime: true
    });
  };

  #dateCloseHandlerTo = ([date]) => {
    const updateDate = new Date(date).toISOString();
    this.updateElement({
      point: {
        ...this._state.point,
        dateTo: updateDate
      }
    });
  };

  #dateCloseHandlerFrom = ([date]) => {
    const updateDate = new Date(date).toISOString();
    this.updateElement({
      point: {
        ...this._state.point,
        dateFrom: updateDate
      }
    });
  };

  tripTypeHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      point: {
        ...this._state.point,
        type: evt.target.value,
        offers: []
      }
    });
  };

  destinationHandler = (evt) => {
    evt.preventDefault();
    const optionList = this.element.querySelector('#destination-list-1').querySelectorAll('option');
    for (let i = 0; i < optionList.length; i++) {
      if (optionList[i].value === evt.target.value) {
        this.updateElement({
          point: {
            ...this._state.point,
            destination: optionList[i].dataset.destinationId
          }
        });
      }
    }

  };


  updateSelectedOffersInState = () => {
    const offers = [];
    this.element.querySelectorAll('.event__offer-checkbox:checked').forEach((input) => offers.push(input.dataset.offerId));

    this._setState({
      point: {
        ...this._state.point,
        offers: offers

      }
    });
  };

  _restoreHandlers() {
    this.setTripTypeHandler(this.#callbacks.tripTypeHandler);
    this.setCloseButtonClickHandler(this.#callbacks.closeButtonClickHandler);
    this.setSubmitFormHandler(this.#callbacks.submitFormHandler);
    this.setDestinationHandler(this.#callbacks.destinationHandler);
    this.setDatePickers();
  }

  setDestinationHandler = (callback) => {
    this.#callbacks.destinationHandler = callback;
    this.element.querySelector('#event-destination-1').addEventListener('input', this.#callbacks.destinationHandler);
  };

  setTripTypeHandler(callback) {
    this.#callbacks.tripTypeHandler = callback;
    this.element.querySelector('.event__type-group').addEventListener('change', this.tripTypeHandler);
  }

  setCloseButtonClickHandler(callback) {
    this.#callbacks.closeButtonClickHandler = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeButtonClickHandler);
  }

  setSubmitFormHandler (callback) {
    this.#callbacks.submitFormHandler = callback;
    this.element.querySelector('form').addEventListener('submit', this.#submitFormHandler);
  }
}

export { TripPointEditView };
