import saveEvent from '../saveEvent/saveEvent.js';

async function saveBTItem(eventBT) {
  return saveEvent({
    ...eventBT,
  });
}

export default saveBTItem;
