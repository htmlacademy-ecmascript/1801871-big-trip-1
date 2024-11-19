

export default class OffersModel {
  #offers = {};
  #offersApiService = null;
  constructor({offersApiService}) {
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
    } catch(err){
      console.log(err);
    }
    console.log(this.#offers);

  }
}

