import { render, replace, RenderPosition } from '../framework/render.js';

import { TripPointView } from '../view/trip-point-view.js';
import { TripPointEditView } from '../view/trip-point-edit-view.js';
import { ZeroPointView } from '../view/zero-points-view.js';

class TripPointPresenter {
  #points = new Map();
  #editingPoint = null;
  #pointEditComponent = null;
  #zeroPointComponent = null;

  constructor ({tripPointModel, tripPointEditModel, destinationsModel, offersModel, pointContainer}) {
    this.tripPointModel = tripPointModel;
    this.tripPointEditModel = tripPointEditModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.#zeroPointComponent = new ZeroPointView();

    this.pointContainer = pointContainer;
  }

  #createPoint(point, destinations, offers) {
    const pointComponent = new TripPointView ({
      point: point,
      destination: destinations[point.destination],
      offers: offers[point.type]
    });
    pointComponent.setOpenButtonClickHandler(this.#openEditingMode);

    return pointComponent;
  }

  #createEditPoint(point) {
    const destinations = this.destinationsModel.convertDestinations();
    const offers = this.offersModel.convertOffers();

    const pointEditComponent = new TripPointEditView({
      point: point,
      destination: destinations[point.destination],
      offers: offers[point.type]
    });
    pointEditComponent.setCloseButtonClickHandler(this.#closeEditingMode);
    pointEditComponent.setSubmitFormHandler(this.#onEditPointSubmit);

    return pointEditComponent;
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#closeEditingMode();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #onEditPointSubmit = ()=> {
    this.#closeEditingMode();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #closeEditingMode = () => {
    if (this.#editingPoint) {
      replace(this.#points.get(this.#editingPoint.id), this.#pointEditComponent);
      this.#pointEditComponent.removeElement();
      this.#pointEditComponent = null;
      this.#editingPoint = null;
    }
  };

  #openEditingMode = (point) => {
    this.#closeEditingMode();

    this.#editingPoint = point;
    this.#pointEditComponent = this.#createEditPoint(point);

    replace(this.#pointEditComponent, this.#points.get(point.id));
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #renderPoints = () => {
    const points = this.tripPointModel.getPoints();
    const destinations = this.destinationsModel.convertDestinations();
    const offers = this.offersModel.convertOffers();

    if (points.length === 0) {
      render(this.#zeroPointComponent, this.pointContainer);
    }

    for (let i = 0; i < points.length; i++) {
      this.#points.set(points[i].id, this.#createPoint(points[i], destinations, offers));
      render(this.#points.get(points[i].id) ,this.pointContainer);
    }
  };

  init(){
    this.#renderPoints();
  }


}

export { TripPointPresenter };
