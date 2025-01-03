import ApiService from '../framework/api-service';

export default class OffersApiService extends ApiService {
  constructor(endPoint, authorization){
    super(endPoint, authorization);
  }

  get offers () {
    return this._load({url:'offers'})
      .then((OffersApiService.parseResponse));
  }

}
