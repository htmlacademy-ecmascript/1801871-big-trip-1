import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

function createNewSortTemplate({type}) {
  return `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--day">
      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day"
      data-sort-type="day" ${type === 'day' ? 'checked' : ''}>
      <label class="trip-sort__btn" for="sort-day">Day</label>
    </div>
    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" data-sort-type="event" ${type === 'event' ? 'checked' : ''}>
      <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>
    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" data-sort-type="time" ${type === 'time' ? 'checked' : ''}>
      <label class="trip-sort__btn" for="sort-time">Time</label>
    </div>
    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" data-sort-type="price" ${type === 'price' ? 'checked' : ''}>
      <label class="trip-sort__btn" for="sort-price">Price</label>
    </div>
    <div class="trip-sort__item  trip-sort__item--offer">
      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" data-sort-type="offers" ${type === 'offers' ? 'checked' : ''}>
      <label class="trip-sort__btn" for="sort-offer">Offers</label>
    </div>
  </form>
  `;
}


class SortView extends AbstractStatefulView {
  #callbacks = {};

  constructor (type) {
    super();
    this._setState(SortView.parseDataToState(type));
  }

  get template() {
    return createNewSortTemplate(this._state);
  }

  static parseDataToState(type) {
    return {
      type: type
    };
  }

  sortType = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();

    this.updateElement({
      type:evt.target.dataset.sortType
    });

    this.#callbacks.sortTypeHandler(evt.target.dataset.sortType);

  };

  _restoreHandlers() {
    this.setSortTypeHandler(this.#callbacks.sortTypeHandler);
  }

  setSortTypeHandler = (callback) => {
    this.#callbacks.sortTypeHandler = callback;
    this.element.addEventListener('click', this.sortType);
  };
}


export { SortView };
