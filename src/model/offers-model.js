import Observable from '../framework/observable';
import { UpdateType } from '../const';

export default class OffersModel extends Observable{
  #offers = {};
  #offersApiService = null;
  #isReady = false;

  constructor({offersApiService}) {
    super();
    this.#offersApiService = offersApiService;
  }

  get offers () {
    return this.#offers;
  }

  async init () {
    try {
      const offers = await this.#offersApiService.offers;
      offers.forEach((offer)=>{
        this.#offers[offer.type] = offer.offers;
      });
      this.#isReady = true;
      this._notify('', UpdateType.INIT);
    } catch(err){
      throw new Error('Can\'t download offers');
    }
  }

  isReady() {
    return this.#isReady;
  }
}

