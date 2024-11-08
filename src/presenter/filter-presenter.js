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
  #filterCategoryViewComponent = null;


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

    this.#filterModel.addObserver(this.#refreshFilterType);
  }

  init() {
    render(new InfoView(), this.#tripHeaderContainer);
    this.#filterCategoryViewComponent = new FilterCategoryView({handleSortCategoryChange: this.#handleSortCategoryChange, activeCategoryType:this.#currentSortCategory});

    this.#filterTimeViewComponent = new FilterTimeView({
      activeFilter: this.#filterModel.filter,
      handleFilterTypeChange :this.#handleFilterTypeChange
    });

    render(this.#filterTimeViewComponent, this.#tripHeaderContainer);
    render(this.#filterCategoryViewComponent, this.#tripFilterCategoryContainer);
  }

  #refreshFilterType = () => {
    const newFilterComponent = new FilterTimeView({
      activeFilter: this.#filterModel.filter,
      handleFilterTypeChange :this.#handleFilterTypeChange
    });
    replace(newFilterComponent, this.#filterTimeViewComponent);
    remove(this.#filterTimeViewComponent);
    this.#filterTimeViewComponent = newFilterComponent;

    this.#currentSortCategory = SortType.DAY;
    const newCategoryComponent = new FilterCategoryView({handleSortCategoryChange: this.#handleSortCategoryChange, activeCategoryType:this.#currentSortCategory});

    replace(newCategoryComponent, this.#filterCategoryViewComponent);
    remove(this.#filterCategoryViewComponent);
    this.#filterCategoryViewComponent = newCategoryComponent;
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

