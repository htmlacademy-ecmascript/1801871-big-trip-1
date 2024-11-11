
const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const SortType = {
  DAY: 'Day',
  EVENT: 'Event',
  TIME: 'Time',
  PRICE: 'Price',
  OFFERS: 'Offers'
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const EmptyListPhrase = {
  'everything':'Click New Event to create your first point',
  'past':'There are no past events now',
  'present':'There are no present events now',
  'future':'There are no future events now'
};


export { FilterType, SortType, UserAction, UpdateType, EmptyListPhrase};
