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

    console.log(this.points);
    console.log(this.offers);
    console.log(this.destinations);
    render(new TripPointEditView(), this.tripEventsListContainer);
    for (let i = 0; i < 3; i++) {
      render(new TripPointView(), this.tripEventsListContainer);
    }
  }

}
