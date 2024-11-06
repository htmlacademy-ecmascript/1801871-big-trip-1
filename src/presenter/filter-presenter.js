import { render } from '../framework/render';

import FilterCategoryView from '../view/filter-category-view';
import FilterTimeView from '../view/filter-time-view';
import InfoView from '../view/info-view';


import {FilterType , SortType} from '../const.js';


export default class FilterPresenter{
  #tripFilterCategoryContainer = null;
  #tripHeaderContainer = null;
  #tripPointBoardPresenter = null;


  #currentFilterType = FilterType.EVERYTHING;
  #currentSortCategory = SortType.DAY;

  constructor(
    {
      tripFilterCategoryContainer,
      tripHeaderContainer,
      tripPointBoardPresenter
    }
  ){
    this.#tripFilterCategoryContainer = tripFilterCategoryContainer;
    this.#tripHeaderContainer = tripHeaderContainer;
    this.#tripPointBoardPresenter = tripPointBoardPresenter;
  }

  init() {
    render(new InfoView(), this.#tripHeaderContainer);
    render(new FilterCategoryView({ handleSortCategoryChange: this.#handleSortCategoryChange}), this.#tripFilterCategoryContainer);
    render(new FilterTimeView({ handleFilterTypeChange:this.#handleFilterTypeChange}), this.#tripHeaderContainer);
  }


  #handleFilterTypeChange = (filterType) => {
    if(filterType === this.#currentFilterType) {
      return;
    }
    this.#currentFilterType = filterType;
    this.#tripPointBoardPresenter.filterBoard(filterType);
  };

  #handleSortCategoryChange = (sortType) => {
    if(sortType === this.#currentSortCategory) {
      return;
    }
    this.#currentSortCategory = sortType;
    this.#tripPointBoardPresenter.sortBoard(sortType);
  };


}

