import { render, replace, RenderPosition } from '../framework/render.js';

import { SortView } from '../view/sort-view.js';

import { TripPointView } from '../view/trip-point-view.js';
import { TripPointEditView } from '../view/trip-point-edit-view.js';
import { ZeroPointView } from '../view/zero-points-view.js';

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
      offers: offers[point.type]
    });
    pointComponent.setOpenButtonClickHandler(replaceViewToEditPoint);

    const pointEditComponent = new TripPointEditView({
      point: point,
      destination: destinations[point.destination],
      offers: offers[point.type]
    });
    pointEditComponent.setCloseButtonClickHandler(replaceEditToViewPoint);
    pointEditComponent.setSubmiteFormHandler(onSubmitePoint);


    render(pointComponent ,this.eventComponent.getEventPointsList());

    function replaceViewToEditPoint () {
      replace(pointEditComponent, pointComponent);
      document.addEventListener('keydown', escKeyDownHandler);
    }
    function replaceEditToViewPoint () {
      replace(pointComponent, pointEditComponent);
    }

    function onSubmitePoint (evt) {
      evt.preventDefault();
      replaceEditToViewPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    function escKeyDownHandler (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditToViewPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    }
  }


  init () {
    this.points = [...this.tripPointModel.getPoints()];
    this.destinations = this.destinationsModel.convertDestinations();
    this.offers = this.offersModel.convertOffers();


    this.pointEdit = this.tripPointEditModel.getPoint();

    render(this.eventComponent, this.eventContainer);
    render(new SortView(), this.eventComponent.element, RenderPosition.AFTERBEGIN);
    if (this.points.length === 0) {
      render(new ZeroPointView(), this.eventComponent.getEventPointsList());
    }
    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoint(this.points[i],this.destinations, this.offers);
    }
  }
}

export { EventPresentor };
