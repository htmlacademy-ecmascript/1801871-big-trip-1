import { render, replace, RenderPosition, remove } from '../framework/render.js';
import { sortMoneyUp, sortDurationUp, sortDayUp} from '../utils.js';

import { SortView } from '../view/sort-view.js';

import { TripPointView } from '../view/trip-point-view.js';
import { TripPointEditView } from '../view/trip-point-edit-view.js';
import { TripPointNewView } from '../view/trip-point-new-view.js';
import { ZeroPointView } from '../view/zero-points-view.js';

import { CreateEventsView } from '../view/trip-events-view.js';


class EventPresenter {
  #pointsComponents = new Map();
  #editingPoint = null;
  #pointEditComponent = null;
  #zeroPointComponent = null;
  #sortComponent = null;
  #lastSortType = 'price';

  eventComponent = new CreateEventsView();

  constructor ({eventContainer, tripPointModel, tripPointEditModel, destinationsModel, offersModel}) {
    this.eventContainer = eventContainer;
    this.tripPointModel = tripPointModel;
    this.tripPointEditModel = tripPointEditModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.#zeroPointComponent = new ZeroPointView();
  }

  #createPoint(point, destinations, offers) {
    const pointComponent = new TripPointView ({
      point: point,
      destination: destinations[point.destination],
      offers: offers[point.type]
    });
    pointComponent.setOpenButtonClickHandler(this.#openEditingMode);
    pointComponent.setFavoriteButtonClickHandler(this.#changeFavorite);

    return pointComponent;
  }

  #createEditPoint(point) {
    const destinations = this.destinationsModel.convertDestinations();
    const offers = this.offersModel.getConvertedOffers();

    const pointEditComponent = new TripPointEditView({
      point: point,
      destinations: destinations,
      offers: offers
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

  #onEditPointSubmit = (point)=> {
    this.#closeEditingMode(point);
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #closeEditingMode = (point) => {
    if (this.#editingPoint) {
      replace(this.#pointsComponents.get(this.#editingPoint.id), this.#pointEditComponent);
      this.#pointEditComponent.removeElement();
      this.#pointEditComponent = null;
      this.#editingPoint = null;
      this.#updatePoint(point);
    }
  };

  #openEditingMode = (point) => {
    this.#closeEditingMode();

    this.#editingPoint = point;
    this.#pointEditComponent = this.#createEditPoint(point);

    replace(this.#pointEditComponent, this.#pointsComponents.get(point.id));
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #changeFavorite = (point) => {
    point.isFavorite = !point.isFavorite;
    this.#updatePoint(point);
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#lastSortType);
    this.#sortComponent.setSortTypeHandler(this.#handleSortType);
    render(this.#sortComponent, this.eventComponent.element, RenderPosition.AFTERBEGIN);
  };


  #handleSortType = (type) => {
    const points = this.tripPointModel.getPoints();

    if(type === this.#lastSortType) {
      return;
    }
    this.#lastSortType = type;
    switch(type) {
      case 'time':
        points.sort(sortDurationUp);
        break;
      case 'day':
        points.sort(sortDayUp);
        break;
      case 'price':
        points.sort(sortMoneyUp);
        break;
    }

    this.#clearPoints();
    this.#renderPoints(points);
  };


  #updatePoint = (point) => {
    this.tripPointModel.updatePoints(point);

    const destinations = this.destinationsModel.convertDestinations();
    const offers = this.offersModel.getConvertedOffers();
    const oldPoint = this.#pointsComponents.get(point.id);

    this.#pointsComponents.set(point.id, this.#createPoint(point, destinations, offers));
    replace(this.#pointsComponents.get(point.id), oldPoint);

  };

  #renderPoints = (points) => {
    const destinations = this.destinationsModel.convertDestinations();
    const offers = this.offersModel.getConvertedOffers();

    // render(new TripPointNewView(), this.eventComponent.getEventPointsList());

    if (points.length === 0) {
      render(this.#zeroPointComponent, this.eventComponent.getEventPointsList());
    }

    for (let i = 0; i < points.length; i++) {
      this.#pointsComponents.set(points[i].id, this.#createPoint(points[i], destinations, offers));
      render(this.#pointsComponents.get(points[i].id) ,this.eventComponent.getEventPointsList());
    }
  };

  #clearPoints = () => {
    this.#pointsComponents.forEach((component)=>{
      remove(component);
    });
    this.#pointsComponents.clear();
  };


  init () {
    const points = this.tripPointModel.getPoints();
    render(this.eventComponent, this.eventContainer);
    this.#renderSort();
    this.#renderPoints(points);
  }
}

export { EventPresenter };
