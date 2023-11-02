import { render } from './render.js';
import { FilterView } from './view/filter-view.js';
import { TripInfoView } from './view/trip-info-view.js';
import { SortView } from './view/sort-view.js';
import { TripPointsView } from './view/trip-points-view.js';

const siteBodyElement = document.querySelector('.page-body');
const tripHeaderMainElement = siteBodyElement.querySelector('.trip-main');
const tripControlsfilterElement = siteBodyElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteBodyElement.querySelector('.trip-events');

render(new FilterView(), tripControlsfilterElement);
render(new TripInfoView(), tripHeaderMainElement, 'afterbegin');
render(new SortView(), tripEventsElement);
render(new TripPointsView(), tripEventsElement);
render(new TripPointsView(), tripEventsElement);
render(new TripPointsView(), tripEventsElement);

