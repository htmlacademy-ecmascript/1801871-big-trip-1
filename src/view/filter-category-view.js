import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

const filterCategoryTemplate = (activeCategoryType) =>
  `
<div>
<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--day">
      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" data-sort-type='${SortType.DAY}' ${activeCategoryType === SortType.DAY ? 'checked' : ''} disabled>
      <label class="trip-sort__btn" for="sort-day">Day</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" data-sort-type='${SortType.EVENT}' disabled>
      <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" data-sort-type='${SortType.TIME}' ${activeCategoryType === SortType.TIME ? 'checked' : ''} disabled>
      <label class="trip-sort__btn" for="sort-time">Time</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" data-sort-type='${SortType.PRICE}' ${activeCategoryType === SortType.PRICE ? 'checked' : ''} disabled>
      <label class="trip-sort__btn" for="sort-price" data-filter-type="price">Price</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--offer">
      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" data-sort-type='${SortType.OFFERS}' disabled>
      <label class="trip-sort__btn" for="sort-offer">Offers</label>
    </div>
  </form>
<div>
  `;

export default class FilterCategoryView extends AbstractView{
  #handleSortCategoryChange = null;
  #activeCategoryType = null;
  constructor ({
    handleSortCategoryChange,
    activeCategoryType
  }) {
    super();
    this.#activeCategoryType = activeCategoryType;
    this.#handleSortCategoryChange = handleSortCategoryChange;

    this.element.querySelector('.trip-events__trip-sort').addEventListener('change', this.#sortTypeChangeHandler);


  }

  get template() {
    return filterCategoryTemplate(this.#activeCategoryType);
  }

  #sortTypeChangeHandler = (evt) => {
    this.#handleSortCategoryChange(evt.target.dataset.sortType);
  };

  categoryOn = () => {
    this.element.querySelectorAll('input').forEach((input)=>{
      if(input.dataset.sortType === SortType.DAY || input.dataset.sortType === SortType.TIME || input.dataset.sortType === SortType.PRICE) {
        input.disabled = false;
      }
    });
  };

}
