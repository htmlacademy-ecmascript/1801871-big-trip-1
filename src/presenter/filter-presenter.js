import { render, replace, remove } from '../framework/render';

import FilterCategoryView from '../view/filter-category-view';
import FilterTimeView from '../view/filter-time-view';
import InfoView from '../view/info-view';


import { FilterType, SortType, UpdateType} from '../const.js';
import { filterListFuture, filterListPresent, filterListPast, sortListDay, sortListPrice, sortListTime } from '../utils';


export default class FilterPresenter{
  #tripFilterCategoryContainer = null;
  #tripHeaderContainer = null;


  #filterModel = null;
  #tripPointsModel = null;
  #sortModel = null;

  #filterTimeViewComponent = null;
  #filterCategoryViewComponent = null;

  constructor(
    {
      tripFilterCategoryContainer,
      tripHeaderContainer,

      filterModel,
      tripPointsModel,
      sortModel
    }
  ){

    this.#tripFilterCategoryContainer = tripFilterCategoryContainer;
    this.#tripHeaderContainer = tripHeaderContainer;

    this.#filterModel = filterModel;
    this.#tripPointsModel = tripPointsModel;
    this.#sortModel = sortModel;

    this.#tripPointsModel.addObserver(this.#setSortFilterDefault);

  }

  init() {
    render(new InfoView(), this.#tripHeaderContainer);
    this.#renderFilterSortView();

  }


  #getHowMAnyPointsInFilter = () => {
    const pointsInFilter = Object.values(FilterType).map((element)=>({
      length: this.#filterPoints(this.#tripPointsModel.points, element).size,
      filter: element
    }));
    return pointsInFilter;
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(filterType, UpdateType.MAJOR);
  };

  #handleSortCategoryChange = (sortType) => {
    if(this.#sortModel.sort === sortType) {
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
    let sortedPoints = null;

    if(sortType === SortType.DAY){
      sortedPoints = new Map(sortListDay(points));
    }
    if(sortType === SortType.EVENT){
      sortedPoints = points;
    }
    if(sortType === SortType.OFFERS){
      sortedPoints = points;
    }
    if(sortType === SortType.PRICE){
      sortedPoints = new Map(sortListPrice(points));
    }
    if(sortType === SortType.TIME){
      sortedPoints = new Map(sortListTime(points));
    }
    return sortedPoints;
  }

  #setSortFilterDefault = (update, updateType) => {
    if (updateType !== UpdateType.MAJOR){
      return;
    }
    this.#sortModel.reset();
    this.#filterModel.reset();

    this.#removeFilterSortView();
    this.#renderFilterSortView();
  };

  #removeFilterSortView () {
    remove(this.#filterTimeViewComponent);
    remove(this.#filterCategoryViewComponent);
  }

  #renderFilterSortView () {
    this.#filterCategoryViewComponent = new FilterCategoryView({handleSortCategoryChange: this.#handleSortCategoryChange, activeCategoryType:this.#sortModel.sort});

    this.#filterTimeViewComponent = new FilterTimeView({
      activeFilter: this.#filterModel.filter,
      handleFilterTypeChange :this.#handleFilterTypeChange,
      pointsInFilter: this.#getHowMAnyPointsInFilter()
    });

    render(this.#filterTimeViewComponent, this.#tripHeaderContainer);
    render(this.#filterCategoryViewComponent, this.#tripFilterCategoryContainer);
  }


  getPoints = () =>{
    let points = this.#tripPointsModel.points;

    points = this.#filterPoints(points, this.#filterModel.filter);
    points = this.#sortPoints(points, this.#sortModel.sort);

    return points;
  };
}
