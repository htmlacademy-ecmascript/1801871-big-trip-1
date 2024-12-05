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
  #offersModel = null;
  #destinationsModel = null;

  #filterTimeViewComponent = null;
  #filterCategoryViewComponent = null;
  #infoComponent = null;

  constructor(
    {
      tripFilterCategoryContainer,
      tripHeaderContainer,
      tripFilterContainer,

      filterModel,
      tripPointsModel,
      sortModel,
      offersModel,
      destinationsModel
    }
  ){

    this.#tripFilterCategoryContainer = tripFilterCategoryContainer;
    this.#tripHeaderContainer = tripHeaderContainer;
    this.#tripFilterContainer = tripFilterContainer;

    this.#filterModel = filterModel;
    this.#tripPointsModel = tripPointsModel;
    this.#sortModel = sortModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#tripPointsModel.addObserver(this.#setSortFilterDefault);
    this.#tripPointsModel.addObserver(this.#updateFilterSortView);
    this.#tripPointsModel.addObserver(this.renderInfo);

    this.#filterModel.addObserver(this.#updateSortView);

  }

  init() {
    this.renderInfo();
    this.#renderFilterView();
    this.#renderSortView();
  }

  #getTotalTripInfo = () => {
    const points = this.#tripPointsModel.getPoints();
    const offers = this.#offersModel.getOffers();
    const destinaions = this.#destinationsModel.getDestinations();
    const result = {
      startPlace: {
        name: 'loading..',
        date: '0'
      },
      middelPlace: {
        name: 'loading..'
      },
      finalPlace: {
        name: 'loading..',
        date: '0'
      },
      totalPrice:'loading'
    };
    let minDate;
    let maxDate;
    let totalPrice = 0;
    let minDateIndex;
    let maxDateIndex;


    if(points.size !== 0 && Object.keys(offers).length !== 0 && Object.keys(destinaions).length !== 0){

      minDate = Date.parse(points.values().next().value.dateFrom);
      maxDate = Date.parse(points.values().next().value.dateTo);

      points.entries().forEach((point) => {
        if(Date.parse(point[1].dateFrom) <= minDate) {
          minDate = Date.parse(point[1].dateFrom);
          minDateIndex = point[0];
        }

        if(Date.parse(point[1].dateTo) >= maxDate){
          maxDate = Date.parse(point[1].dateTo);
          maxDateIndex = point[0];
        }
        const activeOffers = point[1].offers;
        const allCurrentOffersByType = offers[point[1].type];

        activeOffers.forEach((offerId) => {
          const offer = allCurrentOffersByType.find((offerByAllOffer)=>offerId === offerByAllOffer.id);
          totalPrice = totalPrice + offer.price;
        });
        totalPrice = totalPrice + point[1].basePrice;
      });


      result.startPlace.name = destinaions[points.get(minDateIndex).destination].name;
      result.startPlace.date = points.get(minDateIndex).dateFrom;
      result.finalPlace.name = destinaions[points.get(maxDateIndex).destination].name;
      result.finalPlace.date = points.get(maxDateIndex).dateFrom;
      result.middelPlace.name = '...';
      result.totalPrice = totalPrice;

      if(points.size === 3) {
        for(const point of points) {
          if(point[0] !== minDateIndex && point[0] !== maxDateIndex){
            result.middelPlace.name = destinaions[point[1].destination].name;
            break;
          }
        }
      }
    }

    return result;
  };

  renderInfo = () => {
    remove(this.#infoComponent);
    this.#infoComponent = new InfoView({
      destinations:this.#getTotalTripInfo()
    });
    render(this.#infoComponent, this.#tripHeaderContainer, RenderPosition.AFTERBEGIN);
  };

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
    this.enableCatagory();
  };

  #updateFilterSortView = (update, updateType) => {
    if (updateType !== UpdateType.MINOR){
      return;
    }
    this.#removeSortView();
    this.#removeFilterView();

    this.#renderFilterView();
    this.#renderSortView();
    this.enableCatagory();
  };

  #updateSortView = (update, updateType) => {
    if (updateType !== UpdateType.MAJOR){
      return;
    }
    this.#sortModel.reset();
    this.#removeSortView();
    this.#renderSortView();
    this.enableCatagory();
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

  enableCatagory = () => {
    this.#filterCategoryViewComponent.categoryOn();
  };
}
