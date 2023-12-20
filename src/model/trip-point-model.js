import { mockPoints } from '../mock/points.js';
import { mockOffers } from '../mock/offers.js';

class TripPointModel {
  points = Array.from(mockPoints);

  getPoints() {
    return this.points;
  }

  getOffers() {
    this.offers = mockOffers;
    return this.offers;
  }
}

export { TripPointModel };
