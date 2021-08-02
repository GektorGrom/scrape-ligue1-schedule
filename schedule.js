#!/usr/bin/env node
/* eslint-disable */
import meow from 'meow';
import fetchBTSchedule from './functions/fetchers/fetchBTSchedule/fetchBTSchedule.js';

const cli = meow(
  `
	Usage
	  $ foo <input>

	Options
	  --btSport, -bt  Include BT Sport events

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
    },
  },
);
async function schedule() {
  if (cli.flags?.btSport) {
    await fetchBTSchedule().then((res) => {
      console.log(res);
      console.log('BT Sport events Saved');
    });
  }
}

schedule().then(() => {
  console.log('All events saved.');
})
