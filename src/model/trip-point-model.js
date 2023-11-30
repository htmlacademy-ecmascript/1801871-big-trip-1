import { getRandomPoint } from '../mock/points.js';
import { mockDestinations } from '../mock/destinations.js';
import { mockOffers } from '../mock/offers.js';
import { AMOUNT_OF_POINTS } from '../const.js';

class TripPointModel {
  points = Array.from({length: AMOUNT_OF_POINTS}, getRandomPoint);

  getPoints() {
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

export { TripPointModel };
