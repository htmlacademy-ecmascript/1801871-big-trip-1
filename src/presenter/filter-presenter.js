import { render } from '../render';

import FilterCategoryView from '../view/filter/filter-category-view';
import FilterTimeView from '../view/filter/filter-time-view';
import AddNewButtonView from '../view/add-new-trip-button-view';
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
    render(new AddNewButtonView(), this.tripHeaderContainer);
  }
}
