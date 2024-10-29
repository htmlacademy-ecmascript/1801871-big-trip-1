import { render } from '../framework/render';

import FilterCategoryView from '../view/filter-category-view';
import FilterTimeView from '../view/filter-time-view';
import AddNewTripButtonView from '../view/add-new-trip-button-view';
import InfoView from '../view/info-view';

import {FilterType} from '../const.js';


export default class FilterPresenter{
  #tripFilterCategoryContainer = null;
  #tripHeaderContainer = null;
  #tripPointBoardPresenter = null;

  #currentFilterType = FilterType.EVERYTHING;
  #currentSortCategory = null;

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
    render(new FilterCategoryView({ handleSortCategoryChange: this.#handleSortCategoryChange}), this.#tripFilterCategoryContainer);
    render(new InfoView(), this.#tripHeaderContainer);
    render(new FilterTimeView({ handleFilterTypeChange:this.#handleFilterTypeChange}), this.#tripHeaderContainer);
    render(new AddNewTripButtonView(), this.#tripHeaderContainer);
  }


  #handleFilterTypeChange = (filterType) => {
    if(filterType === this.#currentFilterType) {
      return;
    }
    this.#currentFilterType = filterType;
    this.#tripPointBoardPresenter.filterBoard(filterType);
  };

  #handleSortCategoryChange = (sortType) => {
    // this.#tripPointBoardPresenter.sortBoard(sortType);
    console.log(sortType);
  };


}

