import * as dynamoose from 'dynamoose';
import eventSchema from './eventSchema.js';

const EventModel = dynamoose.model('Ligue1Match', eventSchema);
const Table = new dynamoose.Table('BeIN_schedule', [EventModel], {
  initialize: false,
  create: false,
  waitForActive: false,
});

export { Table };
export default EventModel;
