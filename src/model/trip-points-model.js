
import Observable from '../framework/observable';
import { UpdateType } from '../const';

export default class TripPointsModel extends Observable {
  #pointsApiService = null;
  #points = new Map();

  #isReady = false;
  // new Date(Date.now()).toISOString()
  // new Date(Date.now() + 100000).toISOString()
  #blankPoint = ['',{
    'basePrice': '',
    'dateFrom': '',
    'dateTo': '',
    'isFavorite': false,
    'offers': [],
    'type': 'taxi',
    'destination':'new-point'
  }];

  constructor({
    pointsApiService
  }) {
    super();


    this.#pointsApiService = pointsApiService;


  }

  async init () {
    try {
      const points = await this.#pointsApiService.points;
      points.forEach((point)=>{
        const convertedPoint = this.#adaptPointToClient(point);
        this.#points.set(convertedPoint[0],convertedPoint[1]);
      });

      this.#isReady = true;
    } catch(err){
      throw new Error('Can\'t get points');
    }
    this._notify('', UpdateType.INIT);
  }

  isReady() {
    return this.#isReady;
  }


  #adaptPointToServer ([id, point]) {
    return {
      'id':id,
      'base_price':Number(point.basePrice),
      'date_from': point.dateFrom,
      'date_to':point.dateTo,
      'is_favorite':point.isFavorite,
      'offers': point.offers,
      'type': point.type,
      'destination': point.destination,

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
      this._notify(update, updateType);
    }catch{
      throw new Error('Can\'t update points');
    }
  }

  update (update, updateType) {
    this._notify(update, updateType);
  }

  async addPoint (update, updateType) {
    try{
      const convertedNewPoint = this.#adaptPointToServer(update);
      delete convertedNewPoint.id;
      const response = await this.#pointsApiService.addPoint(convertedNewPoint);
      const newPoint = this.#adaptPointToClient(response);
      this.#points.set(newPoint[0],newPoint[1]);
    }catch{
      throw new Error('Can\'t add points');
    }
    this._notify(update, updateType);
  }

  async deletePoint (update, updateType) {
    try{
      await this.#pointsApiService.deletePoint(update[0]);
      this.#points.delete(update[0]);
    }catch{
      throw new Error('Can\'t delete points');
    }
    this._notify(update, updateType);
  }


  get blankPoint () {
    return this.#blankPoint;
  }


}
