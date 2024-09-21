import { mockDestination } from '../mock/mock-destination';

export default class DestinationsModel {
  destinations = mockDestination;

  getDestinations () {
    const convertedDestinations = {};
    this.destinations.forEach((destination)=>{
      convertedDestinations[destination.id] = {
        'description': destination.description,
        'name': destination.name,
        'pictures': destination.pictures
      };
    });
    return convertedDestinations;
  }
}
