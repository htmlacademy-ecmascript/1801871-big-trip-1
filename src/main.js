import { render, RenderPosition } from './render.js';
import { FilterView } from './view/filter-view.js';
import { TripInfoView } from './view/trip-info-view.js';

import { EventPresentor } from './presenter/trip-event-presenter.js';

import { TripPointModel } from './model/trip-point-model.js';
import { TripEditPointModel } from './model/trip-edit-point-model.js';


const siteBodyElement = document.querySelector('.page-body');
const tripHeaderMainElement = siteBodyElement.querySelector('.trip-main');
const tripControlsfilterElement = siteBodyElement.querySelector('.trip-controls__filters');

const tripEventsContainerElement = siteBodyElement.querySelector('.page-body__trip-events-container');


const tripPointModel = new TripPointModel();

const tripEditPointModel = new TripEditPointModel();

const eventPresentor = new EventPresentor({eventContainer: tripEventsContainerElement,tripPointModel: tripPointModel, tripEditPointModel: tripEditPointModel});

render(new FilterView(), tripControlsfilterElement);
render(new TripInfoView(), tripHeaderMainElement, RenderPosition.AFTERBEGIN);


eventPresentor.init();
