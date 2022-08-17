import { addDays } from 'date-fns';
import saveEvent from '../../functions/DynamoDB/saveEvent/saveEvent.js';
import fetchBeInCanada from '../../functions/fetchers/fetchBeInSchedule/fetchBeInCanada.js';
import fetchBeInSchedule from '../../functions/fetchers/fetchBeInSchedule/fetchBeInSchedule.js';
import parseBeIn from '../../functions/parsers/parse-bein-sports/parseBeIn.js';
import parseBeInJSON from '../../functions/parsers/parse-bein-sports/parseBeInJSON.js';

function retrieveAndSave(startDate, iteration = 0) {
  if (iteration > 7) {
    return 'BeIN Sport events Processed';
  }
  return fetchBeInSchedule(startDate)
    .then((data) => ({
      html: data,
      meta: {
        iteration,
        date: startDate,
      },
    }))
    .then(parseBeIn)
    .then((events) => Promise.all(events.map((event) => saveEvent(event))))
    .then(() => retrieveAndSave(addDays(startDate, 1), iteration + 1));
}

function retrieveAndSaveCanada(startDate, iteration = 0) {
  if (iteration > 7) {
    return 'BeIN Sport Canada events Processed';
  }
  return fetchBeInCanada(startDate)
    .then((data) => ({
      json: data,
      meta: {
        iteration,
        date: startDate,
      },
    }))
    .then(parseBeInJSON)
    .then((events) => Promise.all(events.map((event) => saveEvent(event))))
    .then(() => retrieveAndSaveCanada(addDays(startDate, 1), iteration + 1));
}

async function processBeInEvents() {
  return Promise.allSettled([
    retrieveAndSave(new Date()),
    retrieveAndSaveCanada(new Date()),
  ]);
}

export default processBeInEvents;
