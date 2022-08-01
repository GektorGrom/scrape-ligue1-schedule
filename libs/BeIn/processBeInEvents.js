import { addDays } from 'date-fns';
import saveEvent from '../../functions/DynamoDB/saveEvent/saveEvent.js';
import fetchBeInSchedule from '../../functions/fetchers/fetchBeInSchedule/fetchBeInSchedule.js';
import parseBeIn from '../../functions/parsers/parse-bein-sports/parseBeIn.js';

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

async function processBeInEvents() {
  return retrieveAndSave(new Date());
}

export default processBeInEvents;
