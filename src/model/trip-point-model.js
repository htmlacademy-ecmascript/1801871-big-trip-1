import { mockPoints } from '../mock/points.js';
import { mockDestinations } from '../mock/destinations.js';
import { mockOffers } from '../mock/offers.js';
import { AMOUNT_OF_POINTS } from '../const.js';
import { getRandomArrayElement } from '../utils.js';

class TripPointModel {
  points = Array.from({length: AMOUNT_OF_POINTS}, ()=>getRandomArrayElement(mockPoints));

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
