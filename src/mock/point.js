import { getRandomArrayElement } from '../utils.js';
import { POINT_TYPES } from '../const.js';


const mockPoints = [
  {
    type: getRandomArrayElement(POINT_TYPES),
    day:  'march 14',
    time: '10:30 — 11:00',
    isFavorite: 'true',
    city: 'Moscow',
    offersID: [1],
  },
  {
    type: getRandomArrayElement(POINT_TYPES),
    day:  'march 14',
    time: '11:30 — 12:00',
    isFavorite: 'false',
    city: 'Moscow',
    offersID: [1, 2],
  },
  {
    type: getRandomArrayElement(POINT_TYPES),
    day:  'march 14',
    time: '13:30 — 14:00',
    isFavorite: 'true',
    city: 'Moscow',
    offersID: [1, 2, 3],
  },
  {
    type: getRandomArrayElement(POINT_TYPES),
    day:  'march 14',
    time: '10:30 — 11:00',
    isFavorite: 'true',
    city: 'Moscow',
    offersID: [3],
  },
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export { getRandomPoint };
