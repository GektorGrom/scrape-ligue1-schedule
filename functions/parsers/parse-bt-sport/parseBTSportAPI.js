import getBTChannel from './helpers/getBTChannel.js';

async function parseBTSportAPI(apiResponse) {
  return Promise.all(apiResponse.schedules.map(getBTChannel)).then(
    (itemsByChannel) => itemsByChannel.flat(),
  );
}

export default parseBTSportAPI;
