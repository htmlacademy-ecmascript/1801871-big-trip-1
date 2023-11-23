import { getRandomArrayElement, getRandomArrayPart } from '../utils.js';
import { PICTURES, CITES, DESCRIPTIONS, AMOUNT_DESTINATION } from './mock-const.js';


const getMockDestinations = (amount, cites, descriptions, photos) => Array.from({length: amount }, () => ({
  id: crypto.randomUUID(),
  name: getRandomArrayElement(cites),
  description: getRandomArrayElement(descriptions),
  pictures: getRandomArrayPart (photos)
}));

const mockDestination = getMockDestinations(AMOUNT_DESTINATION, CITES, DESCRIPTIONS, PICTURES);


export { mockDestination, getMockDestinations };
