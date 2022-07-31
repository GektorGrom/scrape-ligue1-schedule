import { addDays } from 'date-fns';
import fetchBeInSchedule from '../../functions/fetchers/fetchBeInSchedule/fetchBeInSchedule.js';
import parseBeIn from '../../functions/parsers/parse-bein-sports/parseBeIn.js';

function retrieveAndSave(startDate, iteration = 0) {
  if (iteration > 7) {
    return 'BT Sport events Processed';
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
    .then((data) => {
      console.log(data);
    })
    // .then((BTEvents) => Promise.all(BTEvents.map((eventBT) => saveBTItem(eventBT))))
    .then(() => retrieveAndSave(addDays(startDate, 1), iteration + 1));
}

async function processBeInEvents() {
  return retrieveAndSave(new Date());
}

processBeInEvents();

// export default processBeInEvents;
