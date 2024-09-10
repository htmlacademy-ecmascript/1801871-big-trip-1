import {createElement} from '../render.js';

const createZeroTemplate = () =>
  `<p class="trip-events__msg">Click New Event to create your first point</p>
  `;

export default class TripPointZeroView {
  getTemplate() {
    return createZeroTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
