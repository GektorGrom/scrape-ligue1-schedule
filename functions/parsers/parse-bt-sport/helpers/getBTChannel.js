import getBTEvent from './getBTEvent.js';

async function getBTChannel(rawData) {
  try {
    const {
      entries,
      channel: { title },
    } = rawData;
    const events = entries.map(getBTEvent);
    return events
      .filter((item) => item)
      .map((item) => ({
        ...item,
        chanel: title,
        id: `${item.start / 1000}${item.title}${title}`,
      }));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return null;
  }
}

export default getBTChannel;
