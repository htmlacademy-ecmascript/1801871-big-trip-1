import Observable from '../framework/observable';
import { SortType } from '../const';

export default class SortModel extends Observable {
  #sort = SortType.DAY;

  getSort () {
    return this.#sort;
  }

  setSort (sort, updateType) {
    this.#sort = sort;
    this._notify(sort, updateType);
  }

  reset (){
    this.#sort = SortType.DAY;
  }

}
