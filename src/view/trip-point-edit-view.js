import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import dayjs from 'dayjs';
import { DATE_DAY_MOUNTH_YEAR_HOUR_MINUTE_FORMAT } from '../const.js';

const createTripPointEditTemplate = (point, destination, offers, state) =>
  `
  <li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${state.currentOffersType}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${state.currentOffersType === 'taxi' ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${state.currentOffersType === 'bus' ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${state.currentOffersType === 'train' ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${state.currentOffersType === 'ship' ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${state.currentOffersType === 'drive' ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${state.currentOffersType === 'flight' ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${state.currentOffersType === 'check-in' ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${state.currentOffersType === 'sightseeing' ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>
            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${state.currentOffersType === 'restaurant' ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${point.type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
        <datalist id="destination-list-1">
        ${state.availableDestinations.map((destination) =>
         `<option value=${destination}></option> `).join('')}
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
        ${state[state.currentOffersType].map((offer) => `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-1" type="checkbox" name="event-offer-${offer.title}"
           ${state.checkedOffers.includes(offer.id) ? 'checked' : ''}>
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
        <p class="event__destination-description">${destination.description}</p>
      </section>
    </section>
  </form>
</li>
`;

class TripPointEditView extends AbstractStatefulView {
  #point = null;
  #destinations = null;
  #offers = null;
  #points = null;
  #callbacks = {};

  constructor({point, destinations, offers, points}) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    this.#points = points;

    this._setState(TripPointEditView.parseDataToState(point, destinations, offers, points));
    this.element.querySelector('.event__type-group').addEventListener('change', this.tripTypeHandler)

  }

  get template() {
    return createTripPointEditTemplate(this.#point, this.#destinations[this.#point.destination], this.#offers[this.#point.type], this._state);
  };

  static parseDataToState(point, destinations, offers, points) {
    let a = {
      ...offers,
      ...destinations,
      availableDestinations: points.map((point) => destinations[point.destination].name),
      currentOffersType: point.type,
      checkedOffers: point.offers,
    };
    console.log(a);
    return {
      ...offers,
      ...destinations,
      availableDestinations: points.map((point) => destinations[point.destination].name),
      currentOffersType: point.type,
      checkedOffers: point.offers,
    };
  }

  #submitFormHandler = (evt) => {
    evt.preventDefault();
    this.#callbacks.submitFormHandler();
  };

  tripTypeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      currentOffersType: evt.target.value,
      checkedOffers: []
    });
  };

  _restoreHandlers() {
    this.element.querySelector('.event__type-group').addEventListener('change', this.tripTypeHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#callbacks.closeButtonClickHandler);
    this.element.querySelector('form').addEventListener('submit', this.#submitFormHandler);
  }

  setCloseButtonClickHandler(callback) {
    this.#callbacks.closeButtonClickHandler = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', callback);
  }

  setSubmitFormHandler (callback) {
    this.#callbacks.submitFormHandler = callback;
    this.element.querySelector('form').addEventListener('submit', this.#submitFormHandler);
  }



}

export { TripPointEditView };
