import { render, RenderPosition } from '../render.js';

import { SortView } from '../view/sort-view.js';

import { TripPointView } from '../view/trip-point-view.js';
import { TripPointEditView } from '../view/trip-point-edit-view.js';
import { TripPointNewView } from '../view/trip-point-new-view.js';

import { CreateEventsView } from '../view/trip-events-view.js';

const getCurrentOffersList = (point, offers) => {
  const offersOftheRightType = offers.find((element) => element.type === point.type).offers;
  return point.offers.map((element) => offersOftheRightType.find((offer) => offer.id === element));
};

class EventPresentor {
  eventComponent = new CreateEventsView();

  constructor ({eventContainer, tripPointModel}) {
    this.eventContainer = eventContainer;
    this.tripPointModel = tripPointModel;
  }


  init () {
    this.pointsList = [...this.tripPointModel.getPoints()];
    this.destinationList = [...this.tripPointModel.getDestinations()];
    this.offersList = [...this.tripPointModel.getOfferse()];
    // console.log(this.offersList);
    render(this.eventComponent, this.eventContainer);
    render(new SortView(), this.eventComponent.getElement(), RenderPosition.AFTERBEGIN);
    render(new TripPointNewView(), this.eventComponent.getEventPointsList());
    render(new TripPointEditView(), this.eventComponent.getEventPointsList());
    for (let i = 0; i < this.pointsList.length; i++) {
      const destination = this.destinationList.find((element) => element.id === this.pointsList[i].destination);

      render(new TripPointView({
        point: this.pointsList[i],
        destination: destination,
        offersList: getCurrentOffersList(this.pointsList[i], this.offersList) }),this.eventComponent.getEventPointsList());
    }
  }
}

export { EventPresentor };
