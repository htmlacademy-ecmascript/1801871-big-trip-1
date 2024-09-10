import TripPointBoardPresenter from './presenter/trip-point-board-presenter';
import FilterPresenter from './presenter/filter-presenter';

const tripFilterCategoryContainer = document.querySelector('.filter-category-container');


const tripHeaderContainer = document.querySelector('.trip-main');


const tripEventsListContainer = document.querySelector('.trip-events__list');

const tripPointBoardPresenter = new TripPointBoardPresenter ({
  tripEventsListContainer:tripEventsListContainer
});

const filterPresenter = new FilterPresenter ({
  tripFilterCategoryContainer:tripFilterCategoryContainer,
  tripHeaderContainer:tripHeaderContainer
});

tripPointBoardPresenter.init();
filterPresenter.init();
