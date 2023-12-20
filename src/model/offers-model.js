import { mockOffers } from '../mock/offers';

class OffersModel {
  offers = mockOffers;

  getOffers() {
    return this.offers;
  }

  convertOffers(offers = this.offers) {
    const convertOffers = {};
    offers.forEach((offer) => {
      convertOffers[offer.type] = offer.offers;
    });
    return convertOffers;
  }
}


export { OffersModel };
