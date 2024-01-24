import { render } from '../framework/render';
import { FilterView } from '../view/filter-view.js';
import { currentDate } from '../mock/points.js';
import dayjs from 'dayjs';

class FilterPresentor {
  #filterState = {
    EVERETHYNG: false,
    FUTURE: false,
    PRESENT: false,
    PAST: false
  };

  #currentDate = dayjs(new Date(currentDate));

  constructor ({tripPointModel, tripControlsFilterElement}) {
    this.tripPointModel = tripPointModel;
    this.tripControlsFilterElement = tripControlsFilterElement;
    this.points = [...this.tripPointModel.getPoints()];
  }

  #upadateFilterState (points, date) {

    if(points.length > 0) {
      this.#filterState.EVERETHYNG = true;
    }

    if(points.some((point)=>dayjs(new Date(point.dateFrom)) > date)) {
      this.#filterState.FUTURE = true;
    }

    if(points.some((point)=>dayjs(new Date(point.dateTo)) < date)) {
      this.#filterState.PAST = true;
    }

    if(points.some((point)=>dayjs(new Date(point.dateTo)) > date && dayjs(new Date(point.dateFrom)) < date)) {
      this.#filterState.PRESENT = true;
    }
  }

  init () {
    this.#upadateFilterState(this.points, this.#currentDate);
    render(new FilterView({filterState: this.#filterState}), this.tripControlsFilterElement);
  }
}

export { FilterPresentor };
