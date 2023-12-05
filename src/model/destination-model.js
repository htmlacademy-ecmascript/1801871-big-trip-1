import { mockDestinations } from '../mock/destinations';

class DestinationsModel {
  destinations = mockDestinations;

  getDestinations() {
    return this.destinations;
  }

  convertDestinations() {
    const convertDestinations = {};
    this.destinations.forEach((destination) => {
      convertDestinations[destination.id] = {
        name: destination.name,
        description: destination.description,
        pictures: destination.pictures
      };
    });
    return convertDestinations;
  }
}

export { DestinationsModel };
