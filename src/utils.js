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
  return Array.from(points).filter((point) => Date.parse(point[1].date_from) > now);
}

function filterListPast (points) {
  const now = Date.now();
  return Array.from(points).filter((point) => Date.parse(point[1].date_to) < now);
}

function filterListPresent (points) {
  const now = dayjs();

  return Array.from(points).filter((point) =>{
    const startDate = dayjs(point[1].date_from);
    const dateEnd = dayjs(point[1].date_to);


    return now >= startDate && now <= dateEnd;
  });
}

function sortListDay (points) {
  return Array.from(points).sort((a, b) => {
    if (dayjs(a[1].date_from) > dayjs(b[1].date_from)) {
      return 1;
    }
    if (dayjs(a[1].date_from) < dayjs(b[1].date_from)) {
      return -1;
    }
    return 0;
  });
}

function sortListPrice (points) {
  return Array.from(points).sort((a, b) => {
    if (dayjs(a[1].base_price) < dayjs(b[1].base_price)) {
      return 1;
    }
    if (dayjs(a[1].base_price) > dayjs(b[1].base_price)) {
      return -1;
    }
    return 0;
  });
}

function sortListTime (points) {


  return Array.from(points).sort((a, b) => {
    const startDateA = dayjs(a[1].date_from);
    const endDateA = dayjs(a[1].date_to);
    const differenceInMillisecondsA = endDateA.diff(startDateA);

    const startDateB = dayjs(b[1].date_from);
    const endDateB = dayjs(b[1].date_to);
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
