import AbstractView from '../framework/view/abstract-view.js';

import { FilterType } from '../const.js';

const filterTimeTemplate = () =>
  `
  <div class="trip-main__trip-controls  trip-controls">
    <div class="trip-controls__filters">
      <h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
        ${Object.values(FilterType).map((element)=>
    `<div class="trip-filters__filter">
          <input id="filter-${element}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${element}">
          <label class="trip-filters__filter-label" for="filter-everything" data-sort-type="${element}">${element}</label>
    </div>`
  ).join('')}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    </div>
  </div>
  `;

export default class FilterTimeView extends AbstractView{

  #handleFilterTypeChange = null;

  constructor (
    {handleFilterTypeChange}
  ) {
    super();
    this.#handleFilterTypeChange = handleFilterTypeChange;
    this.element.querySelector('.trip-filters').addEventListener('click', this.#filterTypeClickHandler);
  }

  get template() {
    return filterTimeTemplate();
  }

  #filterTypeClickHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }
    this.#handleFilterTypeChange(evt.target.dataset.sortType);

  };
}
