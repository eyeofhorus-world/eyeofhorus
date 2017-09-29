/* eslint-disable no-console */

import program from 'commander';

let hasInitialized = false;

export const init = () => {
  program
    .version('0.0.1')
    .option('-p, --port <n>', 'Port to listen on', parseInt)
    .option('-t, --testing', 'Set testing environment on')
    .option('-s, --staging', 'Set staging environment on')
    .parse(process.argv);

  if (program.testing) {
    console.log('Running test environment');
    process.env.TEST = 'true';
  } else {
    process.env.TEST = 'false';
  }

  if (program.staging) {
    console.log('Running staging environment');
    process.env.STAGING = 'true';
  } else {
    process.env.STAGING = 'false';
  }

  hasInitialized = true;
};

const getCommands = () => {
  if (hasInitialized !== true) {
    init();
  }
  return program;
};

export default getCommands;
