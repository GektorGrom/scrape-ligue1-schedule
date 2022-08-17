import { formatInTimeZone } from 'date-fns-tz/esm';

function dateToUTCDay(date) {
  return formatInTimeZone(date, 'UTC', 'yyyy-MM-dd');
}

// eslint-disable-next-line import/prefer-default-export
export { dateToUTCDay };
