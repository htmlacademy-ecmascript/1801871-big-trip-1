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
    const points = Array.from(this.#tripPointsModel.getPoints().entries());
    const offers = this.#offersModel.getOffers();
    const destinations = this.#destinationsModel.getDestinations();
    const result = {
      destinations: {
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
      },
      totalPrice:'loading'
    };

    let totalPrice = 0;
    let minDatePoint;
    let maxDatePoint;


    if(this.#tripPointsModel.isReady() && this.#offersModel.isReady() && this.#destinationsModel.isReady()){


      minDatePoint = points[0];
      maxDatePoint = points[points.length - 1];

      const getTotalPrice = (accumulator, point) => {
        let pointPrice = 0;
        const activeOffers = point[1].offers;
        const allCurrentOffersByType = offers[point[1].type];

        activeOffers.forEach((offerId) => {
          const offer = allCurrentOffersByType.find((offerByAllOffer)=>offerId === offerByAllOffer.id);
          pointPrice = pointPrice + offer.price;
        });
        pointPrice = pointPrice + point[1].basePrice;
        return accumulator + pointPrice;
      };

      totalPrice = points.reduce(getTotalPrice, 0);

      if(minDatePoint) {
        result.destinations.startPlace.name = destinations[minDatePoint[1].destination].name;
        result.destinations.startPlace.date = minDatePoint[1].dateFrom;
      }

      if(maxDatePoint) {
        result.destinations.finalPlace.name = destinations[maxDatePoint[1].destination].name;
        result.destinations.finalPlace.date = maxDatePoint[1].dateTo;
      }

      result.destinations.middelPlace.name = '&mdash; ... &mdash;';

      result.totalPrice = totalPrice;

      if(points.length === 3) {
        const middelPlaceDestinationId = points[1][1].destination;
        result.destinations.middelPlace.name = `&mdash; ${destinations[middelPlaceDestinationId].name} &mdash;`;
      }
      if(points.length === 2) {
        result.destinations.middelPlace.name = '&mdash;';
      }
      if(points.length === 1) {
        result.destinations.middelPlace.name = '';
        result.destinations.finalPlace.name = '';
      }
    }
    return result;
  };

  renderInfo = () => {
    remove(this.#infoComponent);
    const totalInfo = this.#getTotalTripInfo();
    this.#infoComponent = new InfoView({
      destinations: totalInfo.destinations,
      totalPrice: totalInfo.totalPrice
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
    this.enableCategory();
  };

  #updateFilterSortView = (update, updateType) => {
    if (updateType !== UpdateType.MINOR){
      return;
    }
    this.#removeSortView();
    this.#removeFilterView();

    this.#renderFilterView();
    this.#renderSortView();
    this.enableCategory();
  };

  #updateSortView = (update, updateType) => {
    if (updateType !== UpdateType.MAJOR){
      return;
    }
    this.#sortModel.reset();
    this.#removeSortView();
    this.#renderSortView();
    this.enableCategory();
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

  enableCategory = () => {
    this.#filterCategoryViewComponent.categoryOn();
  };
}
