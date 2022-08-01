import dynamoose from 'dynamoose';

const eventSchema = new dynamoose.Schema(
  {
    id: String,
    away: String,
    home: String,
    title: String,
    competition: String,
    chanel: String,
    start: Number,
    end: Number,
    isLive: Boolean,
    isLigueShow: Boolean,
  },
  {
    saveUnknown: true,
    timestamps: true,
  },
);

export default eventSchema;
