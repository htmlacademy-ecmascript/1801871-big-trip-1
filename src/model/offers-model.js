import { mockOffers } from '../mock/offers';

class OffersModel {
  offers = mockOffers;

  getOffers() {
    return this.offers;
  }

  convertOffers() {
    const convertOffers = {};
    this.offers.forEach((offer) => {
      convertOffers[offer.type] = offer.offers;
    });
    return convertOffers;
  }
}


export { OffersModel };
