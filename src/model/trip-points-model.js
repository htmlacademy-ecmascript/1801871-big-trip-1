import { mockPoints } from '../mock/mock-points';
import Observable from '../framework/observable';

export default class TripPointsModel extends Observable {
  #pointsApiService = null;
  #points = new Map();
  constructor({
    pointsApiService
  }) {
    super();
    mockPoints.forEach((point)=>{
      this.#points.set(this.#adaptPointToClient(point)[0],this.#adaptPointToClient(point)[1]);
    });

    this.#pointsApiService = pointsApiService;
    this.#pointsApiService.points.then((point)=>{
      console.log(point);
    });
  }


  #adaptPointToServer (point) {
    return {
      id:point[0],
      ...point[1]
    };
  }

  #adaptPointToClient (point) {
    return [point.id, {
      'basePrice': point.base_price,
      'dateFrom':  point.date_from,
      'dateTo': point.date_to,
      'destination': point.destination,
      'isFavorite': point.is_favorite,
      'offers': point.offers,
      'type': point.type
    }];
  }


  getPoints () {
    return this.#points;
  }

  updatePoint (update, updateType) {
    console.log(update);
    console.log(this.#adaptPointToServer(update));
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
      'basePrice': '1',
      'date_from': '2029-02-24T08:05:46.876Z',
      'date_to': '2029-02-24T08:05:46.876Z',
      'destination': '2ce7b3bb-ee15-4f13-95f0-550b57a9426f',
      'is_favorite': false,
      'offers': [],
      'type': 'taxi'
    }];
  }

}
