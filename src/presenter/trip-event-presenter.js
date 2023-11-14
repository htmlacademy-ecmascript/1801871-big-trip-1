import { render, RenderPosition } from '../render.js';
import { AMOUNT_OF_POINTS } from '../const.js';

import { SortView } from '../view/sort-view.js';

import { TripPointView } from '../view/trip-point-view.js';
import { TripPointEditView } from '../view/trip-point-edit-view.js';
import { TripPointNewView } from '../view/trip-point-new-view.js';

import { CreateEventsView } from '../view/trip-events-view.js';

class EventPresentor {
  eventComponent = new CreateEventsView();

  constructor ({eventContainer, tripPointModel}) {
    this.eventContainer = eventContainer;
    this.tripPointModel = tripPointModel;
  }


  init () {
    this.pointsList = [...this.tripPointModel.getPoints()];
    render(this.eventComponent, this.eventContainer);
    render(new SortView(), this.eventComponent.getElement(), RenderPosition.AFTERBEGIN);
    render(new TripPointNewView(), this.eventComponent.getEventPointsList());
    render(new TripPointEditView(), this.eventComponent.getEventPointsList());
    for (let i = 0; i < this.pointsList.length; i++) {
      render(new TripPointView({point: this.pointsList[i]}), this.eventComponent.getEventPointsList());
    }
  }
}

export { EventPresentor };
