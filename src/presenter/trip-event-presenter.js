import { render, RenderPosition } from '../render.js';

import { SortView } from '../view/sort-view.js';

import { TripPointView } from '../view/trip-point-view.js';
import { TripPointEditView } from '../view/trip-point-edit-view.js';

import { CreateEventsView } from '../view/trip-events-view.js';


const getPointOffers = (point, offers) => offers.find((element) => element.type === point.type).offers;
const getPointDestination = (point, destinations) => destinations.find((element) => element.id === point.destination);

class EventPresentor {
  eventComponent = new CreateEventsView();

  constructor ({eventContainer, tripPointModel, tripPointEditModel}) {
    this.eventContainer = eventContainer;
    this.tripPointModel = tripPointModel;
    this.tripPointEditModel = tripPointEditModel;
  }


  init () {
    this.points = [...this.tripPointModel.getPoints()];
    this.destinations = [...this.tripPointModel.getDestinations()];
    this.offers = [...this.tripPointModel.getOffers()];

    this.pointEdit = this.tripPointEditModel.getPoint();


    render(this.eventComponent, this.eventContainer);
    render(new SortView(), this.eventComponent.getElement(), RenderPosition.AFTERBEGIN);


    render(new TripPointEditView({
      point: this.pointEdit,
      destination: getPointDestination(this.pointEdit, this.destinations),
      offers: getPointOffers(this.pointEdit, this.offers),

    }), this.eventComponent.getEventPointsList());

    for (let i = 0; i < this.points.length; i++) {

      render(new TripPointView({
        point: this.points[i],
        destination: getPointDestination(this.points[i], this.destinations),
        offers: getPointOffers(this.points[i], this.offers) }),this.eventComponent.getEventPointsList());
    }
  }
}

export { EventPresentor };
