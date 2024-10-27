import dayjs from 'dayjs';
// import duration from 'dayjs';

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


  if (days > 0) {
    return durations.format('DD[D] HH[H] mm[M]');
  }
  if (hours > 0) {
    return durations.format('HH[H] mm[M]');
  }

  return durations.format('mm[M]');
}

function formatDate(date, format) {
  return dayjs(new Date(date)).format(format);
}


function sortListFuture (points) {
  const now = Date.now();
  return Array.from(points).filter((point) => Date.parse(point[1].date_from) > now);
}

function sortListPast (points) {
  const now = Date.now();
  return Array.from(points).filter((point) => Date.parse(point[1].date_from) < now);
}

function sortListPresent (points) {
  const now = dayjs();

  return Array.from(points).filter((point) =>{
    const startDate = dayjs(point[1].date_from);
    const differenceInMilliseconds = now.diff(startDate);
    const durations = dayjs.duration(differenceInMilliseconds).days();

    return durations === 0;
  });
}


export { getDateDiff, formatDate, sortListFuture, sortListPast, sortListPresent };
