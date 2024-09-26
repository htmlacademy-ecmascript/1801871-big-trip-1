import { render } from '../render';

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
    render(new TripPointEditView({point:this.blankPoint, offers:this.offers, destination:this.destinations[this.blankPoint.destination], isNewPoint:true}), this.tripEventsListContainer);

    render(new TripPointEditView({point:this.points.get('4'), offers:this.offers, destination:this.destinations[this.points.get('4').destination]}), this.tripEventsListContainer);

    for (const point of this.points.entries()) {
      render(new TripPointView({point:point[1],offers:this.offers, destination:this.destinations[point[1].destination]}), this.tripEventsListContainer);
    }
  }
}
