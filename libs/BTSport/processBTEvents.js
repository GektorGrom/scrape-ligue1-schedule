import { addDays } from 'date-fns';
import saveBTItem from '../../functions/DynamoDB/saveBTItem/saveBTItem.js';
import fetchBTSchedule from '../../functions/fetchers/fetchBTSchedule/fetchBTSchedule.js';
import parseBTSportAPI from '../../functions/parsers/parse-bt-sport/parseBTSportAPI.js';

function retrieveAndSave(startDate, iteration = 0) {
  if (iteration > 7) {
    return 'BT Sport events Processed';
  }
  return fetchBTSchedule(startDate)
    .then(parseBTSportAPI)
    .then((BTEvents) => Promise.all(BTEvents.map((eventBT) => saveBTItem(eventBT))))
    .then(() => retrieveAndSave(addDays(startDate, 1), iteration + 1));
}

async function processBTEvents() {
  return retrieveAndSave(new Date());
}

export default processBTEvents;
