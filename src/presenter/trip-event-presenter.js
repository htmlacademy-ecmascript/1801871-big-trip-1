import { render, replace, RenderPosition } from '../framework/render.js';
import { TripPointPresenter } from './trip-point-presenter.js';


import { SortView } from '../view/sort-view.js';

// import { TripPointView } from '../view/trip-point-view.js';
// import { TripPointEditView } from '../view/trip-point-edit-view.js';
// import { ZeroPointView } from '../view/zero-points-view.js';

import { CreateEventsView } from '../view/trip-events-view.js';


class EventPresenter {
  eventComponent = new CreateEventsView();

  constructor ({eventContainer, tripPointModel, tripPointEditModel, destinationsModel, offersModel}) {
    this.eventContainer = eventContainer;
    this.tripPointModel = tripPointModel;
    this.tripPointEditModel = tripPointEditModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;

  }

  #renderPoints() {
    const tripPointPresenter = new TripPointPresenter({
      tripPointModel:this.tripPointModel,
      tripPointEditModel:this.tripPointEditModel,
      destinationsModel:this.destinationsModel,
      offersModel:this.offersModel,
      pointContainer:this.eventComponent.getEventPointsList()
    });

    tripPointPresenter.init();
  }

  init () {
    render(this.eventComponent, this.eventContainer);
    render(new SortView(), this.eventComponent.element, RenderPosition.AFTERBEGIN);
    this.#renderPoints();
  }
}
export { EventPresenter };
