import { render } from '../framework/render';
import { FilterView } from '../view/filter-view.js';


class FilterPresenter {
  #filterState = {
    EVERYTHING: false,
    FUTURE: false,
    PRESENT: false,
    PAST: false
  };


  constructor ({tripPointModel, tripControlsFilterElement}) {
    this.tripPointModel = tripPointModel;
    this.tripControlsFilterElement = tripControlsFilterElement;
    this.points = [...this.tripPointModel.getPoints()];
  }

  #updateFilterState (points) {
    const date = new Date().toISOString();

    if (points.length > 0) {
      this.#filterState.EVERYTHING = true;
    }

    if (points.some((point) => point.dateFrom > date)) {
      this.#filterState.FUTURE = true;
    }

    if (points.some((point)=> point.dateTo < date)) {
      this.#filterState.PAST = true;
    }

    if (points.some((point)=> point.dateTo > date && point.dateFrom < date)) {
      this.#filterState.PRESENT = true;
    }
  }

  init () {
    this.#updateFilterState(this.points);
    render(new FilterView({filterState: this.#filterState}), this.tripControlsFilterElement);
  }
}

export { FilterPresenter };
