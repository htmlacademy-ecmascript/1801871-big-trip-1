import { render } from './render.js';
import { FilterView } from './view/filter-view.js';
import { TripInfoView } from './view/trip-info-view.js';
import { SortView } from './view/sort-view.js';
import { TripPointView } from './view/trip-point-view.js';
import { TripPointEditView } from './view/trip-point-edit-view.js';
import { TripPointNewView } from './view/trip-point-new-view.js';

const siteBodyElement = document.querySelector('.page-body');
const tripHeaderMainElement = siteBodyElement.querySelector('.trip-main');
const tripControlsfilterElement = siteBodyElement.querySelector('.trip-controls__filters');
const tripEventsListElement = siteBodyElement.querySelector('.trip-events__list');
const tripEventsElement = siteBodyElement.querySelector('.trip-events');

render(new FilterView(), tripControlsfilterElement);
render(new TripInfoView(), tripHeaderMainElement, 'afterbegin');
render(new SortView(), tripEventsElement, 'afterbegin');
render(new TripPointEditView(), tripEventsListElement);
render(new TripPointNewView(), tripEventsListElement);
render(new TripPointView(), tripEventsListElement);
render(new TripPointView(), tripEventsListElement);
render(new TripPointView(), tripEventsListElement);


