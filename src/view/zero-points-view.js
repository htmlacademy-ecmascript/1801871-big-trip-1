import AbstractView from '../framework/view/abstract-view.js';

const createZeroPointPointTemplate = () =>
  `
  <li class="trip-events__item"><p class="trip-events__msg">Click New Event to create your first point</p>
  `;

class ZeroPointView extends AbstractView {
  get template() {
    return createZeroPointPointTemplate();
  }
}
export { ZeroPointView };
