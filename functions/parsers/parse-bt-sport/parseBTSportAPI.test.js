import fs from 'node:fs/promises';
import { test } from 'uvu';
// eslint-disable-next-line import/extensions
import { equal } from 'uvu/assert';

import parseBTSportAPI from './parseBTSportAPI.js';
import expectedArray from './test-data/bt-sport-events-expected.js';

test('Parse matches from BT SPORT api', async () => {
  const BTSportsAPIResponse = await fs.readFile(new URL('./test-data/bt-sport-api-response.json', import.meta.url), 'utf8');
  const matches = await parseBTSportAPI(JSON.parse(BTSportsAPIResponse));
  equal(matches, expectedArray);
});

test.run();
