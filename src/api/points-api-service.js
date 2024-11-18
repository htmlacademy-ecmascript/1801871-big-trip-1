import ApiService from '../framework/api-service';

const Method = {
  'GET':'GET',
  'PUT':'PUT'
};

export default class PointsApiService extends ApiService {
  constructor(endPoint, authorization){
    super(endPoint, authorization);
  }

  get points () {
    return this._load({url:'points'})
      .then((PointsApiService.parseResponse));
  }

  async updatePoint (point) {
    const response = await this._load({
      url:'points/{pointId}',
      method:Method.PUT,
      body:JSON.stringify(point),
    });
    const parsedResponse = await PointsApiService.parseResponse(response);

    return parsedResponse;
  }

}
