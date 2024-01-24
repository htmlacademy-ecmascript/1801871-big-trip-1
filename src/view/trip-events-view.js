import AbstractView from '../framework/view/abstract-view.js';

function createEventsTemplate() {
  return `
  <section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>
    <!-- Сортировка -->
    <ul class="trip-events__list"></ul>
    <!-- Контент -->
  </section>`;
}

class CreateEventsView extends AbstractView{
  get template() {
    return createEventsTemplate();
  }

  getEventPointsList() {
    return this.element.querySelector('.trip-events__list');
  }


}

export { CreateEventsView };

