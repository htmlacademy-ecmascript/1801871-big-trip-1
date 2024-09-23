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

  }

  init() {
    render(new TripPointEditView({point:this.points.get('4'), offers:this.offers, destination:this.destinations[this.points.get('4').destination]}), this.tripEventsListContainer);

    for (const point of this.points.entries()) {
      // console.log(this.destinations[point[1].destination]);
      render(new TripPointView({point:point[1],offers:this.offers, destination:this.destinations[point[1].destination]}), this.tripEventsListContainer);
    }

    // console.log(this.offers);
    // console.log(this.destinations);


    // render(new TripPointView(), this.tripEventsListContainer);

  }

}
