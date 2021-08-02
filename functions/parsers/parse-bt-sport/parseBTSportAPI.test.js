import parseBTSportAPI from './parseBTSportAPI.js';
import BTSportsAPIResponse from './test-data/bt-sport-api-response.json';
import expectedArray from './test-data/bt-sport-events-expected.js';

test('Parse matches from BT SPORT api', async () => {
  const matches = await parseBTSportAPI(BTSportsAPIResponse);
  expect(matches).toEqual(expectedArray);
  return {};
});
