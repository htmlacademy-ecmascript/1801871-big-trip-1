import { getRandomPoint } from '../mock/points.js';
import { mockDestinations } from '../mock/destinations.js';
import { mockOffers } from '../mock/offers.js';


class TripPointEditModel {
  points = getRandomPoint();

  getPoint() {
    return this.points;
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
