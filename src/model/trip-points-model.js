
import Observable from '../framework/observable';
import { UpdateType } from '../const';

export default class TripPointsModel extends Observable {
  #pointsApiService = null;
  #points = new Map();

  #isReady = false;

  constructor({
    pointsApiService
  }) {
    super();


    this.#pointsApiService = pointsApiService;


  }

  async init () {
    try {
      const points = await this.#pointsApiService.points;
      points.forEach((point)=>this.#points.set(this.#adaptPointToClient(point)[0],this.#adaptPointToClient(point)[1]));
      this.#isReady = true;
    } catch(err){
      throw new Error('Can\'t get points');
    }
    this._notify('', UpdateType.INIT);
  }

  isPointsReady() {
    return this.#isReady;
  }


  #adaptPointToServer (point) {
    return {
      'id':point[0],
      'base_price':Number(point[1].basePrice),
      'date_from':point[1].dateFrom,
      'date_to':point[1].dateTo,
      'is_favorite':point[1].isFavorite,
      'offers': point[1].offers,
      'type': point[1].type,
      'destination': point[1].destination,

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

  async updatePoint (update, updateType) {
    try{
      const response = await this.#pointsApiService.updatePoint(this.#adaptPointToServer(update));
      const updatedPoint = this.#adaptPointToClient(response);
      this.#points.set(updatedPoint[0],updatedPoint[1]);
    }catch{
      throw new Error('Can\'t add points');
    }
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
