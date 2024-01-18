import { render, RenderPosition } from './framework/render.js';
import { TripInfoView } from './view/trip-info-view.js';

import { EventPresentor } from './presenter/trip-event-presenter.js';
import { FilterPresentor } from './presenter/filter-presenter.js';

import { TripPointModel } from './model/trip-point-model.js';
import { TripPointEditModel } from './model/trip-point-edit-model.js';
import { DestinationsModel } from './model/destination-model.js';
import { OffersModel } from './model/offers-model.js';


const siteBodyElement = document.querySelector('.page-body');
const tripHeaderMainElement = siteBodyElement.querySelector('.trip-main');
const tripControlsFilterElement = siteBodyElement.querySelector('.trip-controls__filters');

const tripEventsContainerElement = siteBodyElement.querySelector('.page-body__trip-events-container');


const tripPointModel = new TripPointModel();

const tripPointEditModel = new TripPointEditModel();

const destinationsModel = new DestinationsModel();

const offersModel = new OffersModel();


const eventPresentor = new EventPresentor({
  eventContainer: tripEventsContainerElement,
  tripPointModel: tripPointModel,
  tripPointEditModel: tripPointEditModel,
  destinationsModel: destinationsModel,
  offersModel: offersModel
});

const filterPresentor = new FilterPresentor ({
  tripPointModel: tripPointModel,
  tripControlsFilterElement: tripControlsFilterElement
});

render(new TripInfoView(), tripHeaderMainElement, RenderPosition.AFTERBEGIN);


eventPresentor.init();
filterPresentor.init();
