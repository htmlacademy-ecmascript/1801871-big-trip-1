import AbstractView from '../framework/view/abstract-view.js';

import { UserAction } from '../const.js';

const addNewButtonTemplate = () =>
  `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
`;

export default class AddNewTripButtonView extends AbstractView {
  #handleAddNewPoint = null;

  constructor({handleAddNewPoint: handleAddNewPoint}) {
    super();
    this.#handleAddNewPoint = handleAddNewPoint;
    this.element.addEventListener('click', this.#addNewPointClickHandler);

  }

  get template() {
    return addNewButtonTemplate();
  }


  #addNewPointClickHandler = () => {
    this.#handleAddNewPoint('',UserAction.ADD_POINT,'');
  };

  buttonOff = () => {
    this.element.setAttribute('disabled', false);
  };

  buttonOn = () => {
    this.element.removeAttribute('disabled', false);
  };
}
