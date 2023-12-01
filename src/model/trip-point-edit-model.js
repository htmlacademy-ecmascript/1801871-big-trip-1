import { mockPoints } from '../mock/points.js';
import { mockDestinations } from '../mock/destinations.js';
import { mockOffers } from '../mock/offers.js';


class TripPointEditModel {
  point = mockPoints[0];

  getPoint() {
    return this.point;
  }

  getDestinations() {
    this.destinations = mockDestinations;
    return this.destinations;
  }

  getOffers() {
    this.offers = mockOffers;
    return this.offers;
  }
}

export { TripPointEditModel };
