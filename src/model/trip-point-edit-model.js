import { mockPoints } from '../mock/points.js';
import { mockOffers } from '../mock/offers.js';


class TripPointEditModel {
  #point = mockPoints[0];
  #offers = mockOffers;

  getPoint() {
    return this.#point;
  }

  getOffers() {
    return this.#offers;
  }
}

export { TripPointEditModel };
