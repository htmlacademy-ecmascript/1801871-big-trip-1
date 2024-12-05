import Observable from '../framework/observable';
import { UpdateType } from '../const';

export default class DestinationsModel extends Observable {
  #destinationsApiService = null;
  #tripPointsModel = null;
  #convertedDestinations = {};
  #isReady = false;

  constructor({
    destinationsApiService,
    tripPointsModel
  }) {
    super();
    this.#destinationsApiService = destinationsApiService;
    this.#tripPointsModel = tripPointsModel;
  }

  getDestinations () {
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
      this.#tripPointsModel.updateBlankPointDestination(destinations[0].id);
      this._notify('', UpdateType.INIT);

    } catch(err){
      throw new Error('Can\'t download destinations');
    }

  }

  isReady() {
    return this.#isReady;
  }
}
