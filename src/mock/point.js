import { getRandomArrayElement, getRandomInteger, getRandomDate, getRandomArrayPart } from '../utils.js';
import { mockDestination } from './destination.js';
import { mockOffers } from './offers.js';
import { TYPES, TRUE_FALSE} from './mock-const.js';


const destinationsIds = Array.from(mockDestination, (element)=> element.id);

// const mockPoints = [
//   {
//     id: 'f6138082-e722-48cc-abd3-15716cc7d602',
//     type: 'train',
//     dateFrom: '2023-11-20T10:51:34.462Z',
//     dateTo: '2023-11-21T09:06:06.204Z',
//     destination: '1',
//     basePrice: 700,
//     isFavorite: true,
//     offers: [
//       '1',
//       '2',
//       '3'
//     ]
//   },
//   {
//     id: 'f6138082-e722-48cc-abd3-15716cc7d502',
//     type: 'ship',
//     dateFrom: '2023-11-13T01:04:03.958Z',
//     dateTo: '2023-11-13T23:24:18.673Z',
//     destination: '2',
//     basePrice: 800,
//     isFavorite: false,
//     offers: [
//       '1',
//       '2'
//     ]
//   },
//   {
//     id: 'f6138082-e722-48cc-abd3-13716cc7d602',
//     type: 'bus',
//     dateFrom: '2023-11-22T12:53:29.248Z',
//     dateTo: '2023-11-23T08:04:46.633Z',
//     destination: '3',
//     basePrice: 300,
//     isFavorite: true,
//     offers: [
//       '1',
//     ]
//   },
//   {
//     id: 'f6138082-e722-48cc-abe3-15716cc7d602',
//     type: 'train',
//     dateFrom: '2023-11-23T08:04:46.633Z',
//     dateTo: '2023-11-23T13:50:32.367Z',
//     destination: '4',
//     basePrice: 800,
//     isFavorite: false,
//     offers: [
//       '2'
//     ]
//   },

// ];

const getRandomOffersId = (offers, type) => {
  const offer = offers.find((element)=>element.type === type);

  const offerIds = Array.from(offer.offers, (element)=> element.id);
  return getRandomArrayPart(offerIds);
};

const getMockPoints = (amount, type, favorite) => Array.from({length: amount }, () => {
  const point = {
    id: crypto.randomUUID(),
    type: getRandomArrayElement(type),
    dateFrom: getRandomDate(10,11),
    dateTo: getRandomDate(12,13),
    destination: getRandomArrayElement(destinationsIds),
    basePrice: getRandomInteger(1000),
    isFavorite: getRandomArrayElement(favorite),
  };
  point.offers = getRandomOffersId(mockOffers, point.type);
  return point;
});

const mockPoints = getMockPoints(5, TYPES, TRUE_FALSE);


function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export { getRandomPoint };
