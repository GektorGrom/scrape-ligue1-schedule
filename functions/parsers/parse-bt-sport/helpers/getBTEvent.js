import { dateToUTCDay } from '../../../../libs/date-helpers/dateToUTC.js';

function getBTEvent(entry) {
  try {
    const { item, broadcast } = entry;
    const { transmission_time: startTime, transmission_end_time: endTime } = broadcast;
    const { display_title: { title, subtitle }, id } = item;
    const startDate = new Date(startTime);
    if (title === 'French Ligue 1') {
      const [home, away] = subtitle.split(' v ');
      const isLive = home.includes('Live');
      return {
        id,
        start: startDate.getTime(),
        end: new Date(endTime).getTime(),
        home: home.replace('Live:', '').trim(),
        away,
        competition: title,
        title: subtitle,
        isLigueShow: false,
        isLive,
        utcDay: dateToUTCDay(startDate),
      };
    }
    if (title === 'Ligue 1 Show') {
      return {
        id,
        start: new Date(startTime).getTime(),
        end: new Date(endTime).getTime(),
        home: 'Ligue 1 Show',
        away: 'Ligue 1 Show',
        competition: 'Ligue 1 Show',
        title: 'Ligue 1 Show',
        isLigueShow: true,
        isLive: true,
        utcDay: dateToUTCDay(startDate),
      };
    }
    return null;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    // eslint-disable-next-line no-console
    console.log('Unable to parse event');
    // eslint-disable-next-line no-console
    console.log(entry);
    return null;
  }
}

export default getBTEvent;
