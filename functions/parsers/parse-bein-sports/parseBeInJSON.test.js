import fs from 'node:fs/promises';
import { test } from 'uvu';

// eslint-disable-next-line import/extensions
import { equal } from 'uvu/assert';

import parseBeInJSON from './parseBeInJSON.js';

test('Parse matches from BeIn SPORT from Canadian website', async () => {
  const beInJSON = await fs.readFile('./__mocks__/bein/beinJSON.json', 'utf8');
  const saturdayAssert = await fs.readFile('./__mocks__/bein/beinJSON-saturday.dynamo', 'utf8');
  const noMatches = await parseBeInJSON({});
  const saturdayMatches = await parseBeInJSON({
    json: JSON.parse(beInJSON),
  });
  equal(noMatches, []);
  equal(saturdayMatches, JSON.parse(saturdayAssert));
});

test.run();
