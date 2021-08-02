import dynamoose from 'dynamoose';
import eventSchema from './eventSchema.js';

const EventModel = dynamoose.model('BeIN_schedule', eventSchema, { create: false });

export default EventModel;
