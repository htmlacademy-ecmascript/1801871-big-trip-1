import AbstractView from '../framework/view/abstract-view.js';
import { formatDate } from '../utils.js';

const infoTemplate = (destinations, totalPrice) =>
  `
<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${destinations.startPlace.name} ${destinations.middelPlace.name} ${destinations.finalPlace.name}</h1>

    <p class="trip-info__dates">${formatDate(destinations.startPlace.date, 'MMM DD')}&nbsp;&mdash;&nbsp;${formatDate(destinations.finalPlace.date, 'MMM DD')}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
  </p>
</section>
`;

export default class InfoView extends AbstractView{
  #destinations = null;
  #totalPrice = null;
  constructor(
    {
      destinations,
      totalPrice
    }){
    super();
    this.#destinations = destinations;
    this.#totalPrice = totalPrice;
  }

  get template() {
    return infoTemplate(this.#destinations, this.#totalPrice);
  }


}
