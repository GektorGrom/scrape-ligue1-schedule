import fs from 'node:fs/promises';
import { suite } from 'uvu';
// eslint-disable-next-line import/extensions
import { equal } from 'uvu/assert';
import parseBeIn from './parseBeIn.js';

const localTZTest = suite('localTZTest');
const UTCTest = suite('UTCTest');

localTZTest('Parse matches from BeIN SPORT api/html', async () => {
  const beInHTMLSep11 = await fs.readFile('./__mocks__/bein/beinSchedule-2021-09-11.html', 'utf8');
  const beInJSONSep11 = JSON.parse(await fs.readFile('./__mocks__/bein/beinSchedule-2021-09-11.dynamo', 'utf8'));
  const scheduleForSep11 = await parseBeIn({
    html: beInHTMLSep11,
    meta: {
      iteration: 0,
      date: new Date('2021-09-11 00:00:00 -07:00'),
    },
  });
  scheduleForSep11.forEach((match, index) => {
    equal(match, beInJSONSep11[index]);
  });
});

UTCTest.before(() => {
  process.env.TZ = 'UTC';
});
UTCTest('Parse matches from BeIN SPORT api/html. Handle UTC TZ', async () => {
  const beInHTMLSep11 = await fs.readFile('./__mocks__/bein/beinSchedule-2021-09-11.html', 'utf8');
  const beInJSONSep11 = JSON.parse(await fs.readFile('./__mocks__/bein/beinSchedule-2021-09-11.dynamo', 'utf8'));
  const scheduleForSep11 = await parseBeIn({
    html: beInHTMLSep11,
    meta: {
      iteration: 0,
      date: new Date('2021-09-11 00:00:00 -07:00'),
    },
  });
  scheduleForSep11.forEach((match, index) => {
    equal(match, beInJSONSep11[index]);
  });
});
localTZTest.run();
UTCTest.run();
