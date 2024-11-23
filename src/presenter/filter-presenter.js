import { render, remove, RenderPosition } from '../framework/render';

import FilterCategoryView from '../view/filter-category-view';
import FilterTimeView from '../view/filter-time-view';
import InfoView from '../view/info-view';


import { FilterType, SortType, UpdateType} from '../const.js';
import { filterListFuture, filterListPresent, filterListPast, sortListDay, sortListPrice, sortListTime } from '../utils';


export default class FilterPresenter{
  #tripFilterCategoryContainer = null;
  #tripHeaderContainer = null;
  #tripFilterContainer = null;


  #filterModel = null;
  #tripPointsModel = null;
  #sortModel = null;

  #filterTimeViewComponent = null;
  #filterCategoryViewComponent = null;

  constructor(
    {
      tripFilterCategoryContainer,
      tripHeaderContainer,
      tripFilterContainer,

      filterModel,
      tripPointsModel,
      sortModel
    }
  ){

    this.#tripFilterCategoryContainer = tripFilterCategoryContainer;
    this.#tripHeaderContainer = tripHeaderContainer;
    this.#tripFilterContainer = tripFilterContainer;

    this.#filterModel = filterModel;
    this.#tripPointsModel = tripPointsModel;
    this.#sortModel = sortModel;

    this.#tripPointsModel.addObserver(this.#setSortFilterDefault);
    this.#tripPointsModel.addObserver(this.#updateFilterSortView);

    this.#filterModel.addObserver(this.#updateSortView);

  }

  init() {
    render(new InfoView(), this.#tripHeaderContainer, RenderPosition.AFTERBEGIN);
    this.#renderFilterView();
    this.#renderSortView();
  }


  #getHowMAnyPointsInFilter = () => {
    const pointsInFilter = Object.values(FilterType).map((filter)=>({
      length: this.#filterPoints(this.#tripPointsModel.getPoints(), filter).size,
      filter: filter
    }));
    return pointsInFilter;
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.getFilter() === filterType) {
      return;
    }

    this.#filterModel.setFilter(filterType, UpdateType.MAJOR);
  };

  #handleSortCategoryChange = (sortType) => {
    if(this.#sortModel.getSort() === sortType) {
      return;
    }
    this.#sortModel.setSort(sortType, UpdateType.MAJOR);
  };


  #filterPoints(points, filterType) {
    let filteredPoints;
    switch (filterType) {
      case FilterType.FUTURE:
        filteredPoints = new Map(filterListFuture(points));
        break;
      case FilterType.PRESENT:
        filteredPoints = new Map(filterListPresent(points));
        break;
      case FilterType.PAST:
        filteredPoints = new Map(filterListPast(points));
        break;
      case FilterType.EVERYTHING:
        filteredPoints = points;
    }
    return filteredPoints;

  }

  #sortPoints(points, sortType) {
    let sortedPoints;

    switch (sortType) {
      case SortType.DAY:
        sortedPoints = new Map(sortListDay(points));
        break;
      case SortType.EVENT:
        sortedPoints = points;
        break;
      case SortType.OFFERS:
        sortedPoints = points;
        break;
      case SortType.PRICE:
        sortedPoints = new Map(sortListPrice(points));
        break;
      case SortType.TIME:
        sortedPoints = new Map(sortListTime(points));
    }
    return sortedPoints;
  }

  #setSortFilterDefault = (update, updateType) => {
    if (updateType !== UpdateType.MAJOR && updateType !== UpdateType.INIT){
      return;
    }
    this.#sortModel.reset();
    this.#filterModel.reset();

    this.#removeSortView();
    this.#removeFilterView();

    this.#renderFilterView();
    this.#renderSortView();
  };

  #updateFilterSortView = (update, updateType) => {
    if (updateType !== UpdateType.MINOR){
      return;
    }
    this.#removeSortView();
    this.#removeFilterView();

    this.#renderFilterView();
    this.#renderSortView();
  };

  #updateSortView = (update, updateType) => {
    if (updateType !== UpdateType.MAJOR){
      return;
    }
    this.#sortModel.reset();
    this.#removeSortView();
    this.#renderSortView();
  };

  #removeSortView () {
    remove(this.#filterCategoryViewComponent);
  }

  #removeFilterView () {
    remove(this.#filterTimeViewComponent);
  }

  #renderFilterView () {
    this.#filterTimeViewComponent = new FilterTimeView({
      activeFilter: this.#filterModel.getFilter(),
      handleFilterTypeChange :this.#handleFilterTypeChange,
      pointsInFilter: this.#getHowMAnyPointsInFilter()
    });

    render(this.#filterTimeViewComponent, this.#tripFilterContainer);
  }

  #renderSortView () {
    this.#filterCategoryViewComponent = new FilterCategoryView({handleSortCategoryChange: this.#handleSortCategoryChange, activeCategoryType:this.#sortModel.getSort()});
    render(this.#filterCategoryViewComponent, this.#tripFilterCategoryContainer);
  }


  getPoints = () =>{
    let points = this.#tripPointsModel.getPoints();

    points = this.#filterPoints(points, this.#filterModel.getFilter());
    points = this.#sortPoints(points, this.#sortModel.getSort());

    return points;
  };

  enableCatagory = ()=> {
    this.#filterCategoryViewComponent.categoryOn();
  };
}
