import ApiService from '../framework/api-service';

const Method = {
  'GET':'GET',
  'PUT':'PUT',
  'POST':'Post'
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
      url:`points/${point.id}`,
      method:Method.PUT,
      body:JSON.stringify(point),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parsedResponse = await PointsApiService.parseResponse(response);

    return parsedResponse;
  }

  async addPoint (point) {
    const response = await this._load({
      url:'points',
      method:Method.POST,
      body:JSON.stringify(point),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parsedResponse = await PointsApiService.parseResponse(response);

    return parsedResponse;
  }

}
