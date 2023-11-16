import dayjs from 'dayjs';

// eslint-disable-next-line no-undef
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);


function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function timeDateChanger(date, dateFormat) {
  return date ? dayjs(date).format(dateFormat) : '';
}

function dateDiffInMinuts(dateFrom, dateTo) {
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


export { getRandomArrayElement, timeDateChanger, dateDiffInMinuts };
