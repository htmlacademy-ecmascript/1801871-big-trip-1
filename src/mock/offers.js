import { getRandomArrayElement, getRandomInteger } from '../utils.js';
import { TYPES, OFFERS_TITLE } from './mock-const';


const getMockOffers = (types, title) => {
  const result = [];
  for(const type of types) {
    const offer = {
      type: type,
      offers: Array.from({length: 1 + getRandomInteger(5)}, ()=>({
        id: crypto.randomUUID(),
        title: getRandomArrayElement(title),
        price: getRandomInteger(600)
      }))
    };
    result.push(offer);
  }
  return result;
};

const mockOffers = getMockOffers(TYPES, OFFERS_TITLE);


export { mockOffers };
