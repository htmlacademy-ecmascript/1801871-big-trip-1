import AbstractView from '../framework/view/abstract-stateful-view.js';


const filterTimeTemplate = (activeFilter, pointsInFilter) =>
  `

<div class="trip-controls__filters">
  <h2 class="visually-hidden">Filter events</h2>
  <form class="trip-filters" action="#" method="get">
    ${Object.values(pointsInFilter).map((element)=>
    `<div class="trip-filters__filter">
      <input id="filter-${element.filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${element.filter}" ${element.filter === activeFilter ? 'checked' : ''}  ${element.length === 0 ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-${element.filter}">${element.filter}</label>
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
  #pointsInFilter = null;

  constructor (
    { activeFilter,
      handleFilterTypeChange,
      pointsInFilter
    }
  ) {
    super();
    this.#activeFilter = activeFilter;
    this.#handleFilterTypeChange = handleFilterTypeChange;
    this.#pointsInFilter = pointsInFilter;

    this.element.querySelector('.trip-filters').addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return filterTimeTemplate(this.#activeFilter, this.#pointsInFilter);
  }

  #filterTypeChangeHandler = (evt) =>{
    this.#handleFilterTypeChange(evt.target.value);
  };


}

