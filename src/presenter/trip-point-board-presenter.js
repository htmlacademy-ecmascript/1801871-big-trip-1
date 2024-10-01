import { render } from '../framework/render';

import TripPointEditView from '../view/trip-point-edit-view';
import TripPointView from '../view/trip-point-view';


export default class TripPointBoardPresenter{
  constructor(
    {
      tripEventsListContainer,
      tripPointsModel,
      offersModel,
      destinationsModel
    }
  ){
    this.tripEventsListContainer = tripEventsListContainer;

    this.tripPointsModel = tripPointsModel;
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;

    this.points = tripPointsModel.getPoints();
    this.offers = offersModel.getOffers();
    this.destinations = destinationsModel.getDestinations();

    this.blankPoint = this.tripPointsModel.getBlankPoint();

  }

  init() {
    for (const point of this.points.entries()) {
      render(new TripPointView({point:point[1],offers:this.offers, destination:this.destinations[point[1].destination]}), this.tripEventsListContainer);
    }
    for (const point of this.points.entries()) {
      render(new TripPointEditView({point:point[1],offers:this.offers, destination:this.destinations[point[1].destination]}), this.tripEventsListContainer);
    }
  }
}
