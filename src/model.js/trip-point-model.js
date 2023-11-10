import { getRandomPoint } from '../mock/point.js';
import { AMOUNT_OF_POINTS } from '../const.js';

export default class TripPointModel {
  points = Array.from({length: AMOUNT_OF_POINTS}, getRandomPoint);

  getPoints() {
    return this.points;
  }
}
