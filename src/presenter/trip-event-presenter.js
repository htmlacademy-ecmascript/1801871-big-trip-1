import { render } from '../render.js';
import { AMOUNT_OF_POINTS } from '../const.js';

import { SortView } from '../view/sort-view.js';

import { TripPointView } from '../view/trip-point-view.js';
import { TripPointEditView } from '../view/trip-point-edit-view.js';
import { TripPointNewView } from '../view/trip-point-new-view.js';

import { CreateEventsView } from '../view/trip-events-view.js';

class EventPresentor {
  EventComponent = new CreateEventsView();

  constructor ({eventContainer}) {
    this.eventContainer = eventContainer;
  }


  init () {
    render(this.EventComponent, this.eventContainer);
    render(new SortView(), this.EventComponent.getElement(), 'afterbegin');
    render(new TripPointNewView(), this.EventComponent.getEventPointsList());
    render(new TripPointEditView(), this.EventComponent.getEventPointsList());
    for (let i = 0; i < AMOUNT_OF_POINTS; i++) {
      render(new TripPointView(), this.EventComponent.getEventPointsList());
    }
  }
}

export { EventPresentor };
