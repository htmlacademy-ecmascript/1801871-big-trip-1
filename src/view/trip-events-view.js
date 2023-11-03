import {createElement} from '../render.js';

function createEventsTemplate() {
  return `
  <section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>
    <!-- Сортировка -->
    <ul class="trip-events__list"></ul>
    <!-- Контент -->
  </section>`;
}

class CreateEventsView {
  getTemplate() {
    return createEventsTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  getEventPointsList() {
    return this.getElement().querySelector('.trip-events__list');
  }

  removeElement() {
    this.element = null;
  }
}

export { CreateEventsView };

