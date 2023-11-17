import { getRandomPoint } from '../mock/point.js';
import { mockDestination } from '../mock/destination.js';
import { mockOffers } from '../mock/offers.js';


class TripEditPointModel {
  points = getRandomPoint();

  getPoint() {
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

export { TripEditPointModel };
