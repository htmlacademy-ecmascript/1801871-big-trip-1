import AbstractView from '../framework/view/abstract-view.js';

const addNewButtonTemplate = () =>
  `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
`;

export default class AddNewTripButtonView extends AbstractView {
  get template() {
    return addNewButtonTemplate();
  }
}
