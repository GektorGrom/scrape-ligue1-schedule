import fs from 'node:fs/promises';
import { test } from 'uvu';
// eslint-disable-next-line import/extensions
import { equal } from 'uvu/assert';
import parseBeIn from './parseBeIn.js';

test('Parse matches from BeIN SPORT api/html', async () => {
  const beInHTMLSep11 = await fs.readFile('./__mocks__/bein/beinSchedule-2021-09-11.html', 'utf8');
  const beInJSONSep11 = JSON.parse(await fs.readFile('./__mocks__/bein/beinSchedule-2021-09-11.dynamo', 'utf8'));

  const scheduleForSep11 = await parseBeIn({
    html: beInHTMLSep11,
    meta: {
      iteration: 0,
      date: new Date('2021-09-11 00:00:00 -07:00'),
    },
  });
  equal(scheduleForSep11[0], beInJSONSep11[0]);
});

test.run();
