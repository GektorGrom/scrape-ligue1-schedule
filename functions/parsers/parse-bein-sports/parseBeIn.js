import * as cheerio from 'cheerio';
import { format } from 'date-fns';
import getChanelName from './helpers/getChanelName.js';
import getCleanTeamName from './helpers/getCleanTeamName.js';
import isFrenchTeam from './helpers/isFrenchTeam.js';
import splitTIme from './helpers/splitTIme.js';

async function parseBeIn({ html, meta }) {
  const { date } = meta;
  const currentDay = format(date, 'yyyy-MM-dd');
  const $ = cheerio.load(html);
  const beInMatchObjects = [];
  $('li[category="Soccer"], li[category="Intl soccer"], li[category="Sports talk"]').each((i, el) => {
    const scheduleRow = $(el);
    const matchDetails = scheduleRow.find('.format');
    const competition = matchDetails.first().text();
    const title = scheduleRow.find('.title').text();
    const isLigueShow = title === 'The Ligue 1 Show';
    if (
      competition.includes('French')
      || (isFrenchTeam(title.toLowerCase()) && competition !== 'Sports talk')
      || isLigueShow
    ) {
      const matchTime = splitTIme(scheduleRow.find('.time').text());
      const chanel = getChanelName(scheduleRow
        .parent()
        .parent()
        .parent()
        .parent()
        .attr('id'));
      const isLive = scheduleRow
        .find('.image_live_css')
        .hasClass('image_live_css');
      const titleSplit = title.split('vs');
      if (!isLigueShow && titleSplit.length <= 1) {
        return;
      }
      const beInMatchObject = {
        id: `${currentDay}-${matchTime.start}_${title}_${chanel}`,
        title,
        start: new Date(`${currentDay} ${matchTime.start} -7`).getTime(),
        end: new Date(`${currentDay} ${matchTime.end} -7`).getTime(),
        competition,
        isLive,
        chanel,
        home: getCleanTeamName(titleSplit[0]),
        away: isLigueShow ? '' : getCleanTeamName(titleSplit[1]),
        isLigueShow,
      };
      beInMatchObjects.push(beInMatchObject);
    }
  });
  return beInMatchObjects;
}

export default parseBeIn;
