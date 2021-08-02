import saveEvent from '../saveEvent/saveEvent.js';

async function saveBTItem(eventBT) {
  return saveEvent({
    ...eventBT,
    isLigueShow: eventBT.isLigueShow.toString(),
    isLive: eventBT.isLive.toString(),
  });
}

export default saveBTItem;
