import ApiService from './framework/api-service';

export default class Api extends ApiService {
  constructor(endPoint, authorization){
    super(endPoint, authorization);
  }

  parse (url) {
    console.log(this._endPoint);
    console.log(this._authorization);
    let result = this._load({url:url}).then((ApiService.parseResponse));
    console.log(result);


  }
}
