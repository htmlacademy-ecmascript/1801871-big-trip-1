import { getRandomArrayElement } from '../utils.js';


const mockPoints = [
  {
    id: 'f6138082-e722-48cc-abd3-15716cc7d602',
    type: 'train',
    dateFrom: '2023-11-13T01:04:03.958Z',
    dateTo: '2023-11-13T23:24:18.673Z',
    destination: '1',
    basePrice: 700,
    isFavorite: true,
    offers: [
      '1',
      '2',
      '3'
    ]
  },
  {
    id: 'f6138082-e722-48cc-abd3-15716cc7d502',
    type: 'ship',
    dateFrom: '2023-11-13T01:04:03.958Z',
    dateTo: '2023-11-13T23:24:18.673Z',
    destination: '2',
    basePrice: 800,
    isFavorite: false,
    offers: [
      '1',
      '2'
    ]
  },
  {
    id: 'f6138082-e722-48cc-abd3-13716cc7d602',
    type: 'bus',
    dateFrom: '2023-11-13T01:04:03.958Z',
    dateTo: '2023-11-13T23:24:18.673Z',
    destination: '3',
    basePrice: 300,
    isFavorite: true,
    offers: [
      '1',
    ]
  },
  {
    id: 'f6138082-e722-48cc-abe3-15716cc7d602',
    type: 'train',
    dateFrom: '2023-11-13T01:04:03.958Z',
    dateTo: '2023-11-13T23:24:18.673Z',
    destination: '4',
    basePrice: 800,
    isFavorite: false,
    offers: [
      '2'
    ]
  },

];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export { getRandomPoint };
