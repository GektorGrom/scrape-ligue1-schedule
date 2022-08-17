import { dateToUTCDay } from '../../../libs/date-helpers/dateToUTC.js';
import getChanelName from './helpers/getChanelName.js';
import getCleanTeamName from './helpers/getCleanTeamName.js';

// URL
// Request URL: https://us-cdn.bein-massive.com/api/schedules?channels=54525,54524,54521,54523,54518,54517,54522,54519&date=2022-08-08&duration=24&hour=6&intersect=true&lang=en-US&region=ca

async function parseBeInJSON(options) {
  const { json = null } = options;
  if (!json) {
    return [];
  }
  return json
    .map(({ schedules }) => schedules)
    .flat()
    .filter(({ isFake }) => !isFake)
    .filter(
      ({ customFields }) => customFields && customFields.Category === 'Soccer',
    )
    .filter(({ item }) => item && item.title && item.title.includes('Ligue 1'))
    .filter(({ item }) => !item.title.includes('90 in 30'))
    .map((object) => {
      const {
        item: { title },
        startDate,
        endDate,
        channelId,
        live = false,
      } = object;
      const startAsDate = new Date(startDate);
      const [home, away] = title.split('vs');
      return {
        id: `${startDate}_${title}`,
        title,
        start: startAsDate.getTime(),
        end: new Date(endDate).getTime(),
        competition: 'Ligue 1',
        isLive: live,
        chanel: getChanelName(channelId),
        home: getCleanTeamName(home),
        away: getCleanTeamName(away),
        isLigueShow: false,
        utcDay: dateToUTCDay(startAsDate),
      };
    });
}

export default parseBeInJSON;
