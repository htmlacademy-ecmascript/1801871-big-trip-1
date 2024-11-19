

export default class DestinationsModel {
  #destinationsApiService = null;
  #convertedDestinations = {};
  #isReady = false;

  constructor({destinationsApiService}) {
    this.#destinationsApiService = destinationsApiService;
  }

  get destinations () {
    return this.#convertedDestinations;
  }

  async init () {
    try {
      const destinations = await this.#destinationsApiService.destinations;
      destinations.forEach((destination)=>{
        this.#convertedDestinations[destination.id] = {
          'description': destination.description,
          'name': destination.name,
          'pictures': destination.pictures
        };
      });
      this.#isReady = true;
    } catch(err){
      console.log(err);
    }

  }

  isDestinationsReady() {
    return this.#isReady;
  }
}
