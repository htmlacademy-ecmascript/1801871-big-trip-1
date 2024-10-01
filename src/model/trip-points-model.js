import { mockPoints } from '../mock/mock-points';

export default class TripPointsModel {

  #points = mockPoints;

  get points () {
    const newPoints = new Map();
    this.#points.forEach((point)=>{
      newPoints.set(
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
    return newPoints;
  }


  get blankPoint () {
    return {
      'base_price': '1',
      'date_from': '2029-02-24T08:05:46.876Z',
      'date_to': '2029-02-24T08:05:46.876Z',
      'destination': '2ce7b3bb-ee15-4f13-95f0-550b57a9426f',
      'is_favorite': false,
      'offers': [],
      'type': 'taxi'
    };
  }

}
