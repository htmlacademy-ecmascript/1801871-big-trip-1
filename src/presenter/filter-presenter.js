import { render, replace, remove } from '../framework/render';

import FilterCategoryView from '../view/filter-category-view';
import FilterTimeView from '../view/filter-time-view';
import InfoView from '../view/info-view';


import { SortType, UpdateType} from '../const.js';


export default class FilterPresenter{
  #tripFilterCategoryContainer = null;
  #tripHeaderContainer = null;

  #tripPointBoardPresenter = null;
  #filterModel = null;

  #filterTimeViewComponent = null;


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

    this.#filterModel.addObserver(this.#checkFilterType);
  }

  init() {
    render(new InfoView(), this.#tripHeaderContainer);
    render(new FilterCategoryView({handleSortCategoryChange: this.#handleSortCategoryChange}), this.#tripFilterCategoryContainer);
    this.#filterTimeViewComponent = new FilterTimeView({
      activeFilter: this.#filterModel.filter,
      handleFilterTypeChange :this.#handleFilterTypeChange
    });
    render(this.#filterTimeViewComponent, this.#tripHeaderContainer);
  }

  #checkFilterType = () => {
    const newComponent = new FilterTimeView({
      activeFilter: this.#filterModel.filter,
      handleFilterTypeChange :this.#handleFilterTypeChange
    });
    replace(newComponent, this.#filterTimeViewComponent);
    remove(this.#filterTimeViewComponent);
    this.#filterTimeViewComponent = newComponent;
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(filterType, UpdateType.MAJOR);
  };

  #handleSortCategoryChange = (sortType) => {
    if(sortType === this.#currentSortCategory) {
      return;
    }
    this.#currentSortCategory = sortType;
    this.#tripPointBoardPresenter.sortBoard(sortType);
  };


}

