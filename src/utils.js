import dayjs from 'dayjs';

// eslint-disable-next-line no-undef
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

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

function sortMoneyUp (pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}
function sortDurationUp(pointA, pointB) {
  const durationA = new Date(pointA.dateTo) - new Date(pointA.dateFrom);
  const durationB = new Date(pointB.dateTo) - new Date(pointB.dateFrom);

  return durationB - durationA;
}

function sortDayUp (pointA, pointB) {
  return new Date(pointA.dateTo) - new Date(pointB.dateTo);
}

export { getDateDiff, sortMoneyUp, sortDurationUp, sortDayUp };
