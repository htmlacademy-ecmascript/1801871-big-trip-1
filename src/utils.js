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


function filterListFuture (points) {
  const now = Date.now();
  return Array.from(points).filter((point) => Date.parse(point[1].dateFrom) > now);
}

function filterListPast (points) {
  const now = Date.now();
  return Array.from(points).filter((point) => Date.parse(point[1].dateTo) < now);
}

function filterListPresent (points) {
  const now = dayjs();

  return Array.from(points).filter((point) =>{
    const startDate = dayjs(point[1].dateFrom);
    const dateEnd = dayjs(point[1].dateTo);


    return now >= startDate && now <= dateEnd;
  });
}

function sortListDay (points) {
  return Array.from(points).sort((a, b) => {
    if (dayjs(a[1].dateFrom) > dayjs(b[1].dateFrom)) {
      return 1;
    }
    if (dayjs(a[1].dateFrom) < dayjs(b[1].dateFrom)) {
      return -1;
    }
    return 0;
  });
}

function sortListPrice (points) {
  return Array.from(points).sort((a, b) => {
    if (dayjs(a[1].basePrice) < dayjs(b[1].basePrice)) {
      return 1;
    }
    if (dayjs(a[1].basePrice) > dayjs(b[1].basePrice)) {
      return -1;
    }
    return 0;
  });
}

function sortListTime (points) {


  return Array.from(points).sort((a, b) => {
    const startDateA = dayjs(a[1].dateFrom);
    const endDateA = dayjs(a[1].dateTo);
    const differenceInMillisecondsA = endDateA.diff(startDateA);

    const startDateB = dayjs(b[1].dateFrom);
    const endDateB = dayjs(b[1].dateTo);
    const differenceInMillisecondsB = endDateB.diff(startDateB);

    if (differenceInMillisecondsA < differenceInMillisecondsB) {
      return 1;
    }
    if (differenceInMillisecondsA > differenceInMillisecondsB) {
      return -1;
    }
    return 0;
  });
}


export { getDateDiff, formatDate, filterListFuture, filterListPast, filterListPresent, sortListDay, sortListPrice, sortListTime };
