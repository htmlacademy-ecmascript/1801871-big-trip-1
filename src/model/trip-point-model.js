import { mockPoints } from '../mock/points.js';


class TripPointModel {
  #points = Array.from(mockPoints);


  getPoints() {
    return this.#points;
  }

  updatePoints (update) {

    return this.#points.map((point)=> point.id === update.id ? update : point);

  }
}

export { TripPointModel };
