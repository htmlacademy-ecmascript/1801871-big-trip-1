import { render, RenderPosition } from '../render.js';

import { SortView } from '../view/sort-view.js';

import { TripPointView } from '../view/trip-point-view.js';
import { TripPointEditView } from '../view/trip-point-edit-view.js';
// import { TripPointNewView } from '../view/trip-point-new-view.js';

import { CreateEventsView } from '../view/trip-events-view.js';

const getActiveOffersList = (point, offers) => {
  const offersOftheRightType = offers.find((element) => element.type === point.type).offers;
  return point.offers.map((element) => offersOftheRightType.find((offer) => offer.id === element));
};

const getOffersList = (point, offers) => offers.find((element) => element.type === point.type).offers;

class EventPresentor {
  eventComponent = new CreateEventsView();

  constructor ({eventContainer, tripPointModel, tripPointEditModel}) {
    this.eventContainer = eventContainer;
    this.tripPointModel = tripPointModel;
    this.tripPointEditModel = tripPointEditModel;
  }


  init () {
    this.pointsList = [...this.tripPointModel.getPoints()];
    this.destinationList = [...this.tripPointModel.getDestinations()];
    this.offersList = [...this.tripPointModel.getOfferse()];


    this.pointEdit = this.tripPointEditModel.getPoint();


    render(this.eventComponent, this.eventContainer);
    render(new SortView(), this.eventComponent.getElement(), RenderPosition.AFTERBEGIN);

    const destinationEditPoint = this.destinationList.find((element) => element.id === this.pointEdit.destination);
    render(new TripPointEditView({
      point: this.pointEdit,
      destination: destinationEditPoint,
      activeOffersList: getActiveOffersList(this.pointEdit, this.offersList),
      offersList: getOffersList(this.pointEdit, this.offersList)
    }), this.eventComponent.getEventPointsList());

    for (let i = 0; i < this.pointsList.length; i++) {
      const destination = this.destinationList.find((element) => element.id === this.pointsList[i].destination);

      render(new TripPointView({
        point: this.pointsList[i],
        destination: destination,
        offersList: getActiveOffersList(this.pointsList[i], this.offersList) }),this.eventComponent.getEventPointsList());
    }
  }
}

export { EventPresentor };
