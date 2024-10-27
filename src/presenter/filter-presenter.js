import { render } from '../framework/render';

import FilterCategoryView from '../view/filter-category-view';
import FilterTimeView from '../view/filter-time-view';
import AddNewTripButtonView from '../view/add-new-trip-button-view';
import InfoView from '../view/info-view';

import {SortType} from '../const.js';


export default class FilterPresenter{
  #tripFilterCategoryContainer = null;
  #tripHeaderContainer = null;
  #tripPointBoardPresenter = null;

  #currentSortType = SortType.EVERYTHING;

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
    render(new FilterCategoryView(), this.#tripFilterCategoryContainer);
    render(new InfoView(), this.#tripHeaderContainer);
    render(new FilterTimeView({ handleSortTypeChange:this.#handleSortTypeChange}), this.#tripHeaderContainer);
    render(new AddNewTripButtonView(), this.#tripHeaderContainer);
  }


  #handleSortTypeChange = (sortType) => {
    this.#tripPointBoardPresenter.sortBoard(sortType);
  };
}
