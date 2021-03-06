#!/usr/bin/env node
/* eslint-disable */
import dynamoose from 'dynamoose';
import meow from 'meow';
import processBTEvents from './libs/BTSport/processBTEvents.js';

const cli = meow(
  `
	Usage
	  $ schedule <input>

	Options
	  --btSport, -bt  Include BT Sport events
	  --accessKeyId, -k  AWS Key for DynamoDB access
	  --secretAccessKey, -s  AWS Secret for DynamoDB access
	  --region, -r  AWS Region for DynamoDB access

	Examples
	  $ schedule -bt
	  🇬🇧 Saving BT Sport Events...
`,
  {
    importMeta: import.meta,
    flags: {
      'btSport': {
        type: 'boolean',
        alias: 'bt',
        default: true,
      },
      'region': {
        type: 'string',
        alias: 'r',
        default: 'us-west-2',
      },
      'accessKeyId': {
        type: 'string',
        alias: 'k',
      },
      'secretAccessKey': {
        type: 'string',
        alias: 's',
      },
    },
  },
);
async function schedule() {
  if (cli.flags?.btSport) {
    await processBTEvents().then((res) => {
      console.log(res);
      console.log('BT Sport events Saved');
    });
  }
}
if (cli.flags.accessKeyId && cli.flags.secretAccessKey) {
  dynamoose.aws.sdk.config.update({
    accessKeyId: cli.flags.accessKeyId,
    secretAccessKey: cli.flags.secretAccessKey,
    region: 'us-west-2',
  });
}

schedule().then(() => {
  console.log('All events saved.');
})
