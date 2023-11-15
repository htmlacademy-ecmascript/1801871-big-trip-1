import { getRandomPoint } from '../mock/point.js';
import { mockDestination } from '../mock/destination.js';
import { mockOffers } from '../mock/offers.js';
import { AMOUNT_OF_POINTS } from '../const.js';

class TripPointModel {
  points = Array.from({length: AMOUNT_OF_POINTS}, getRandomPoint);

  getPoints() {
    return this.points;
  }

  getDestinations() {
    this.mockDestination = mockDestination;
    return this.mockDestination;
  }

  getOfferse() {
    this.mockOffers = mockOffers;
    return this.mockOffers;
  }
}

export { TripPointModel };
