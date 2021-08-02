import { startOfDay } from 'date-fns';

function getDateObject(startDate) {
  if (startDate instanceof Date) {
    return startDate;
  }
  if (!startDate) {
    return new Date();
  }
  return new Date(startDate);
}

function parseStartDate(startDate) {
  return startOfDay(getDateObject(startDate));
}

export default parseStartDate;
