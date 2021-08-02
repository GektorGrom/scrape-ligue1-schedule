import axios from 'axios';
import { addDays } from 'date-fns';
import parseStartDate from './helpers/parseStartDate.js';

// key from
// https://widgets.metabroadcast.com/config/1/btsport_v4.js
const key = 'b5986b31b34243c4be2da2dc8020aaaf';

async function fetchBTSchedule(startDate) {
  const start = parseStartDate(startDate);
  const end = addDays(start, 1);
  return axios
    .get(
      ` https://users-atlas.metabroadcast.com/4/schedules.json?id=hspr,hspc,hspd,hspf,hspg,hspk&annotations=channel,content_detail,content.broadcast_channel&from=${start.toISOString()}&to=${end.toISOString()}&source=api.youview.tv&key=${key}`,
    )
    .then(({ data }) => data);
}
export default fetchBTSchedule;
