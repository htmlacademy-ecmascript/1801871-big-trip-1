import { mockPoints } from '../mock/mock-points';
import Observable from '../framework/observable';

export default class TripPointsModel extends Observable {
  constructor() {
    super();
    mockPoints.forEach((point)=>{
      this.#points.set(
        point.id, {
          'base_price': point.base_price,
          'date_from':  point.date_from,
          'date_to': point.date_to,
          'destination': point.destination,
          'is_favorite': point.is_favorite,
          'offers': point.offers,
          'type': point.type
        });

    });
  }

  #points = new Map();


  getPoints () {
    return this.#points;
  }

  updatePoint (update, updateType) {

    this.#points.set(update[0],update[1]);
    this._notify(update, updateType);
  }

  addPoint (update, updateType) {

    this.#points.set(update[0],update[1]);
    this._notify(update, updateType);
  }

  deletePoint (update, updateType) {
    this.#points.delete(update[0]);
    this._notify(update, updateType);
  }

  update (update, updateType) {
    this._notify(update, updateType);
  }


  get blankPoint () {
    return ['',{
      'base_price': '1',
      'date_from': '2029-02-24T08:05:46.876Z',
      'date_to': '2029-02-24T08:05:46.876Z',
      'destination': '2ce7b3bb-ee15-4f13-95f0-550b57a9426f',
      'is_favorite': false,
      'offers': [],
      'type': 'taxi'
    }];
  }

}
