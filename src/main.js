import TripPointBoardPresenter from './presenter/trip-point-board-presenter';
import FilterPresenter from './presenter/filter-presenter';

import TripPointsModel from './model/trip-points-model';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';
import FilterModel from './model/filter-model';
import SortModel from './model/sort-model';

const tripFilterCategoryContainer = document.querySelector('.filter-category-container');


const tripHeaderContainer = document.querySelector('.trip-main');


const tripEventsListContainer = document.querySelector('.trip-events__list');

const tripPointsModel = new TripPointsModel();


const offersModel = new OffersModel();


const destinationsModel = new DestinationsModel();

const filterModel = new FilterModel();
const sortModel = new SortModel();


const filterPresenter = new FilterPresenter ({
  tripFilterCategoryContainer:tripFilterCategoryContainer,
  tripHeaderContainer:tripHeaderContainer,
  filterModel: filterModel,
  tripPointsModel: tripPointsModel,
  sortModel:sortModel
});


const tripPointBoardPresenter = new TripPointBoardPresenter ({
  tripEventsListContainer: tripEventsListContainer,

  tripPointsModel: tripPointsModel,
  offersModel: offersModel,
  destinationsModel: destinationsModel,
  filterModel: filterModel,
  sortModel:sortModel,

  filterPresenter:filterPresenter,

  tripHeaderContainer:tripHeaderContainer
});


filterPresenter.init();
tripPointBoardPresenter.init();
