import { render } from '../framework/render';

import FilterCategoryView from '../view/filter-category-view';
import FilterTimeView from '../view/filter-time-view';
import InfoView from '../view/info-view';


import {FilterType, SortType} from '../const.js';


export default class FilterPresenter{
  #tripFilterCategoryContainer = null;
  #tripHeaderContainer = null;

  #tripPointBoardPresenter = null;
  #filterModel = null;


  #currentSortCategory = SortType.DAY;

  constructor(
    {
      tripFilterCategoryContainer,
      tripHeaderContainer,
      tripPointBoardPresenter,
      filterModel
    }
  ){
    this.#tripFilterCategoryContainer = tripFilterCategoryContainer;
    this.#tripHeaderContainer = tripHeaderContainer;
    this.#tripPointBoardPresenter = tripPointBoardPresenter;
    this.#filterModel = filterModel;
  }

  init() {
    render(new InfoView(), this.#tripHeaderContainer);
    render(new FilterCategoryView({handleSortCategoryChange: this.#handleSortCategoryChange}), this.#tripFilterCategoryContainer);
    render(new FilterTimeView({
      activeFilter: this.#filterModel.filter,
      handleFilterTypeChange :this.#handleFilterTypeChange
    }), this.#tripHeaderContainer);
  }

  #handleFilterTypeChange = (af) => {
    console.log(af);
  };

  #handleSortCategoryChange = (sortType) => {
    if(sortType === this.#currentSortCategory) {
      return;
    }
    this.#currentSortCategory = sortType;
    this.#tripPointBoardPresenter.sortBoard(sortType);
  };


}

