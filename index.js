const program = require('commander');
const npmRun = require('npm-run');

program
  .option('-no-sauce', 'Remove sauce')
  .parse(process.argv);

const run = (command, args, options = {}) => {
  const child = npmRun.spawn(
    `${command}.cmd`, // TODO: cmd on windows, otherwise without.  Not sure why this is an issue now.
    args.split(' '),
    options,
  );
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
  child.on('close', (code) => {
    console.log(`finishedWithStatus ${code}`);
  });
  child.on('error', () => {
    console.log('Failed to invoke serverless.  Is it installed?');
  });
};

run('sls', 'deploy');

run('sls', 'remove');
