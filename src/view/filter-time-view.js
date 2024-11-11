import AbstractView from '../framework/view/abstract-stateful-view.js';

import { FilterType } from '../const.js';

const filterTimeTemplate = (activeFilter) =>
  `
 <div class="trip-main__trip-controls  trip-controls">
<div class="trip-controls__filters">
  <h2 class="visually-hidden">Filter events</h2>
  <form class="trip-filters" action="#" method="get">
    ${Object.values(FilterType).map((element)=>
    `<div class="trip-filters__filter">
      <input id="filter-${element}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${element}" ${element === activeFilter ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-${element}">${element}</label>
    </div>`
  ).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
</div>
</div>
  `;

export default class FilterTimeView extends AbstractView {

  #activeFilter = null;
  #handleFilterTypeChange = null;

  constructor (
    { activeFilter,
      handleFilterTypeChange
    }
  ) {
    super();
    this.#activeFilter = activeFilter;
    this.#handleFilterTypeChange = handleFilterTypeChange;
    this.element.querySelector('.trip-filters').addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return filterTimeTemplate(this.#activeFilter);
  }

  #filterTypeChangeHandler = (evt) =>{
    this.#handleFilterTypeChange(evt.target.value);
  };


}
