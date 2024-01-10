import { mockPoints } from '../mock/points.js';
import { mockOffers } from '../mock/offers.js';

class TripPointModel {
  #points = Array.from(mockPoints);
  #offers = mockOffers;

  getPoints() {
    return this.#points;
  }

  getOffers() {
    return this.#offers;
  }
}

export { TripPointModel };
