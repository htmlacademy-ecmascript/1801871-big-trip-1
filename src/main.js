import TripPointBoardPresenter from './presenter/trip-point-board-presenter';
import FilterPresenter from './presenter/filter-presenter';

import TripPointsModel from './model/trip-points-model';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';

const tripFilterCategoryContainer = document.querySelector('.filter-category-container');


const tripHeaderContainer = document.querySelector('.trip-main');


const tripEventsListContainer = document.querySelector('.trip-events__list');

const tripPointsModel = new TripPointsModel();


const offersModel = new OffersModel();


const destinationsModel = new DestinationsModel();


const tripPointBoardPresenter = new TripPointBoardPresenter ({
  tripEventsListContainer: tripEventsListContainer,
  tripPointsModel: tripPointsModel,
  offersModel: offersModel,
  destinationsModel: destinationsModel
});

const filterPresenter = new FilterPresenter ({
  tripFilterCategoryContainer:tripFilterCategoryContainer,
  tripHeaderContainer:tripHeaderContainer
});


tripPointBoardPresenter.init();
filterPresenter.init();
