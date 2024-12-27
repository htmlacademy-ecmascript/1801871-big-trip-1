import AbstractView from '../framework/view/abstract-view.js';
import { EmptyListPhrase } from '../const.js';

const createZeroTemplate = (currentFilter) =>
  `<p class="trip-events__msg">${EmptyListPhrase[currentFilter]}</p>
  `;

export default class ZeroPointView extends AbstractView{
  #currentFilterType = null;

  constructor({currentFilter}) {
    super();
    this.#currentFilterType = currentFilter;
  }

  get template() {
    return createZeroTemplate(this.#currentFilterType);
  }
}
