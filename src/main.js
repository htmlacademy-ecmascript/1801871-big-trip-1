import TripPointBoardPresenter from './presenter/trip-point-board-presenter';
import FilterPresenter from './presenter/filter-presenter';

import TripPointsModel from './model/trip-points-model';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';
import FilterModel from './model/filter-model';
import SortModel from './model/sort-model';

import PointsApiService from './api/points-api-service';
import DestinationsApiService from './api/destinations-api-service';
import OffersApiService from './api/offers-api-service';


const END_POINT = 'https://20.objects.htmlacademy.pro/big-trip';

const AUTHORIZATION_TOKEN = 'Basic YWxhZGRpbjpvcGVuc2VzYW1l';

const tripFilterCategoryContainer = document.querySelector('.filter-category-container');

const tripFilterContainer = document.querySelector('.trip-main__trip-controls');


const tripHeaderContainer = document.querySelector('.trip-main');


const tripEventsListContainer = document.querySelector('.trip-events__list');

const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION_TOKEN);
const destinationsApiService = new DestinationsApiService(END_POINT, AUTHORIZATION_TOKEN);
const offersApiService = new OffersApiService(END_POINT, AUTHORIZATION_TOKEN);

const tripPointsModel = new TripPointsModel(
  {
    pointsApiService: pointsApiService,
  }
);


const offersModel = new OffersModel(
  {
    offersApiService:offersApiService,
  }
);


const destinationsModel = new DestinationsModel(
  {
    destinationsApiService:destinationsApiService,
    tripPointsModel:tripPointsModel
  }
);

const filterModel = new FilterModel();
const sortModel = new SortModel();


const filterPresenter = new FilterPresenter ({
  tripFilterCategoryContainer:tripFilterCategoryContainer,
  tripHeaderContainer:tripHeaderContainer,
  tripFilterContainer:tripFilterContainer,

  filterModel: filterModel,
  tripPointsModel: tripPointsModel,
  sortModel:sortModel,
  offersModel: offersModel,
  destinationsModel: destinationsModel
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
destinationsModel.init();
offersModel.init();
tripPointsModel.init();

filterPresenter.init();
tripPointBoardPresenter.init();
