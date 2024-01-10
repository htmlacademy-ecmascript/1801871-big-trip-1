import { render, RenderPosition } from '../framework/render.js';

import { SortView } from '../view/sort-view.js';

import { TripPointView } from '../view/trip-point-view.js';
// import { TripPointEditView } from '../view/trip-point-edit-view.js';

import { CreateEventsView } from '../view/trip-events-view.js';


class EventPresentor {
  eventComponent = new CreateEventsView();

  constructor ({eventContainer, tripPointModel, tripPointEditModel, destinationsModel, offersModel}) {
    this.eventContainer = eventContainer;
    this.tripPointModel = tripPointModel;
    this.tripPointEditModel = tripPointEditModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
  }

  #renderPoint(point, destinations, offers) {
    const pointComponent = new TripPointView({
      point: point,
      destination: destinations[point.destination],
      offers: offers[point.type] });
    render(pointComponent ,this.eventComponent.getEventPointsList());
  }


  init () {
    this.points = [...this.tripPointModel.getPoints()];
    this.destinations = this.destinationsModel.convertDestinations();
    this.offers = this.offersModel.convertOffers();


    this.pointEdit = this.tripPointEditModel.getPoint();

    render(this.eventComponent, this.eventContainer);
    render(new SortView(), this.eventComponent.element, RenderPosition.AFTERBEGIN);


    // render(new TripPointEditView({
    //   point: this.pointEdit,
    //   destination: this.destinations[this.pointEdit.destination],
    //   offers: this.offers[this.pointEdit.type]

    // }), this.eventComponent.getEventPointsList());

    // for (let i = 0; i < this.points.length; i++) {

    //   render(new TripPointView({
    //     point: this.points[i],
    //     destination: this.destinations[this.points[i].destination],
    //     offers: this.offers[this.points[i].type] }),this.eventComponent.getEventPointsList());
    // }
    this.#renderPoint(this.points[0],this.destinations, this.offers);
  }
}

export { EventPresentor };
