import { render } from '../render';

import TripPointEditView from '../view/trip-point/trip-point-edit-view';
import TripPointView from '../view/trip-point/trip-point-view';


export default class TripPointBoardPresenter{
  constructor(
    {
      tripEventsListContainer
    }
  ){
    this.tripEventsListContainer = tripEventsListContainer;
  }

  init() {
    render(new TripPointEditView(), this.tripEventsListContainer);
    for (let i = 0; i < 3; i++) {
      render(new TripPointView(), this.tripEventsListContainer);
    }
  }

}
