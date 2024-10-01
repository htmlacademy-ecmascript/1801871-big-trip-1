import { render } from '../framework/render';

import FilterCategoryView from '../view/filter-category-view';
import FilterTimeView from '../view/filter-time-view';
import AddNewTripButtonView from '../view/add-new-trip-button-view';
import InfoView from '../view/info-view';


export default class FilterPresenter{
  constructor(
    {
      tripFilterCategoryContainer,
      tripHeaderContainer
    }
  ){
    this.tripFilterCategoryContainer = tripFilterCategoryContainer;
    this.tripHeaderContainer = tripHeaderContainer;
  }

  init() {
    render(new FilterCategoryView(), this.tripFilterCategoryContainer);
    render(new InfoView(), this.tripHeaderContainer);
    render(new FilterTimeView(), this.tripHeaderContainer);
    render(new AddNewTripButtonView(), this.tripHeaderContainer);
  }
}
