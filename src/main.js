import { render } from './render.js';
import { FilterView } from './view/filter-view.js';
import { TripInfoView } from './view/trip-info-view.js';

import { EventsPresentor } from './presenter/trip-events-presenter.js';

const siteBodyElement = document.querySelector('.page-body');
const tripHeaderMainElement = siteBodyElement.querySelector('.trip-main');
const tripControlsfilterElement = siteBodyElement.querySelector('.trip-controls__filters');

const tripEventsContainerElement = siteBodyElement.querySelector('.page-body__trip-events-container');

const eventsPresentor = new EventsPresentor({eventContainer: tripEventsContainerElement});

render(new FilterView(), tripControlsfilterElement);
render(new TripInfoView(), tripHeaderMainElement, 'afterbegin');


eventsPresentor.init();
