import { getRandomArrayElement } from '../utils.js';


const mockPoints = [
  {
    id: 'f6138082-e722-48cc-abd3-15716cc7d602',
    type: 'train',
    dateFrom: '2023-11-13T01:04:03.958Z',
    dateTo: '2023-11-13T23:24:18.673Z',
    destination: '1',
    basePrice: 700,
    isFavorite: false,
    offers: [
      'c56662ff-2587-4564-8bec-5bc56388ab61',
      '0dc628ee-1ce6-4198-9ae0-6b094a3afb87',
      '96fe2271-d5f5-47aa-8d00-e878e72368b5'
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
      'c56662ff-2587-4564-8bec-5bc56388ab61',
      '0dc628ee-1ce6-4198-9ae0-6b094a3afb87',
      '96fe2271-d5f5-47aa-8d00-e878e72368b5'
    ]
  },
  {
    id: 'f6138082-e722-48cc-abd3-13716cc7d602',
    type: 'bus',
    dateFrom: '2023-11-13T01:04:03.958Z',
    dateTo: '2023-11-13T23:24:18.673Z',
    destination: '3',
    basePrice: 300,
    isFavorite: false,
    offers: [
      'c56662ff-2587-4564-8bec-5bc56388ab61',
      '0dc628ee-1ce6-4198-9ae0-6b094a3afb87',
      '96fe2271-d5f5-47aa-8d00-e878e72368b5'
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
      'c56662ff-2587-4564-8bec-5bc56388ab61',
      '0dc628ee-1ce6-4198-9ae0-6b094a3afb87',
      '96fe2271-d5f5-47aa-8d00-e878e72368b5'
    ]
  },

];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export { getRandomPoint };
