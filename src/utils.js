import dayjs from 'dayjs';

// eslint-disable-next-line no-undef
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);


function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomArrayPart(items) {
  return items.slice(Math.floor(Math.random() * items.length));

}

function getRandomInteger(max) {
  return Math.floor(Math.random() * max);
}


function timeDateChanger(date, dateFormat) {
  return date ? dayjs(date).format(dateFormat) : '';
}

function getDateDiff(dateFrom, dateTo) {
  const startDate = dayjs(dateFrom);
  const endDate = dayjs(dateTo);

  const differenceInMilliseconds = endDate.diff(startDate);
  const durations = dayjs.duration(differenceInMilliseconds);


  const days = durations.days();
  const hours = durations.hours();
  const minutes = durations.minutes();

  if (days > 0) {
    return `${days}D ${hours}H ${minutes}M`;
  }
  if (hours > 0) {
    return `${hours}H ${minutes}M`;
  }

  return `${minutes}M`;
}

function getRandomDate(dayMin = 20, dayMax = 21, mounthMin = 10, mounthMax = 10) {
  const start = new Date(2023, mounthMin, dayMin);
  const end = new Date(2023, mounthMax, dayMax);

  const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return dayjs(new Date(randomTime)).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
}


export { getRandomArrayElement, getRandomArrayPart, timeDateChanger, getDateDiff , getRandomInteger , getRandomDate};
