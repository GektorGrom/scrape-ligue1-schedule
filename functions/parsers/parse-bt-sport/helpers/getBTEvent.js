function getBTEvent(entry) {
  try {
    const { item, broadcast } = entry;
    const { transmission_time: startTime, transmission_end_time: endTime } = broadcast;
    const { display_title: { title, subtitle }, id } = item;
    if (title === 'French Ligue 1') {
      const [home, away] = subtitle.split(' v ');
      const isLive = home.includes('Live');
      return {
        id,
        start: new Date(startTime).getTime(),
        end: new Date(endTime).getTime(),
        home: home.replace('Live:', '').trim(),
        away,
        competition: title,
        title: subtitle,
        isLigueShow: false,
        isLive,
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
      };
    }
    return null;
  } catch (e) {
    console.log(e);
    console.log('Unable to parse event');
    console.log(entry);
    return null;
  }
}

export default getBTEvent;
