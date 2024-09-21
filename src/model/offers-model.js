import { mockOffers } from '../mock/mock-offers';

export default class OffersModel {
  offers = mockOffers;

  getOffers () {
    const convertedOffers = {};
    this.offers.forEach((offer)=>{
      convertedOffers[offer.type] = {};
      offer.offers.forEach((singleOffer)=> {
        convertedOffers[offer.type][singleOffer.id] = {
          title:singleOffer.title,
          price:singleOffer.price,
        };
      });
    });
    return convertedOffers;
  }
}

