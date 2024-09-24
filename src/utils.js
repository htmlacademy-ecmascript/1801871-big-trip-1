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


  if (days > 0) {
    return `${durations.format('DD')}D ${durations.format('HH')}H ${durations.format('mm')}M`;
  }
  if (hours > 0) {
    return `${durations.format('HH')}H ${durations.format('mm')}M`;
  }

  return `${durations.format('mm')}M`;
}

export { getDateDiff };
