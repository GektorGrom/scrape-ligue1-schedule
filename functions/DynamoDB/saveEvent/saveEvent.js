import EventModel from './scheduleModel.js';

async function saveEvent(event) {
  return EventModel.create(event, {
    overwrite: true,
  });
}

export default saveEvent;
