import { render, RenderPosition } from './render.js';
import { FilterView } from './view/filter-view.js';
import { TripInfoView } from './view/trip-info-view.js';

import { EventPresentor } from './presenter/trip-event-presenter.js';


const siteBodyElement = document.querySelector('.page-body');
const tripHeaderMainElement = siteBodyElement.querySelector('.trip-main');
const tripControlsfilterElement = siteBodyElement.querySelector('.trip-controls__filters');

const tripEventsContainerElement = siteBodyElement.querySelector('.page-body__trip-events-container');

const eventPresentor = new EventPresentor({eventContainer: tripEventsContainerElement});

render(new FilterView(), tripControlsfilterElement);
render(new TripInfoView(), tripHeaderMainElement, RenderPosition.AFTERBEGIN);


eventPresentor.init();
