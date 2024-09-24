import { mockPoints } from '../mock/mock-points';

export default class TripPointsModel {

  points = mockPoints;

  getPoints () {
    const newPoints = new Map();
    this.points.forEach((point)=>{
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

}
