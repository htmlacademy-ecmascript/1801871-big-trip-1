import AbstractView from '../framework/view/abstract-view.js';

const createZeroTemplate = () =>
  `<p class="trip-events__msg">Click New Event to create your first point</p>
  `;

export default class TripPointZeroView extends AbstractView{
  get templateemplate() {
    return createZeroTemplate();
  }
}
