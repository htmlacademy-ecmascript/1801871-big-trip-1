import { mockPoints } from '../mock/points.js';
import { mockOffers } from '../mock/offers.js';


class TripPointEditModel {
  point = mockPoints[0];

  getPoint() {
    return this.point;
  }

  getOffers() {
    this.offers = mockOffers;
    return this.offers;
  }
}

export { TripPointEditModel };
