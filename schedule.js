#!/usr/bin/env node
/* eslint-disable */
import meow from 'meow';
import { Table } from './functions/DynamoDB/saveEvent/scheduleModel.js';
import processBeInEvents from './libs/BeIn/processBeInEvents.js';
import processBTEvents from './libs/BTSport/processBTEvents.js';

const cli = meow(
  `
	Usage
	  $ schedule <input>

	Options
	  --btSport, -bt  Include BT Sport events
	  --beIn  Include BeIN Sport events
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
        default: false,
      },
      'beIn': {
        type: 'boolean',
        default: false,
      },
      'region': {
        type: 'string',
        alias: 'r',
        default: process.env.AWS_DEFAULT_REGION ||  'us-west-2',
      }
    },
  },
);
async function schedule() {
  await Table.initialize();
  if (cli.flags?.btSport) {
    await processBTEvents().then((res) => {
      console.log(res);
      console.log('BT Sport events Saved');
    });
  }
  if (cli.flags?.beIn) {
    await processBeInEvents().then((res) => {
      console.log(res);
      console.log('BeIN sports events Saved');
    });
  }
}
schedule().then(() => {
  console.log('All processed.');
})
