const program = require('commander');
const npmRun = require('npm-run');

program
  .option('-no-sauce', 'Remove sauce')
  .parse(process.argv);

const child = npmRun.spawn(
  'serverless',
  'deploy'.split(' '),
);
child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);
child.on('close', (code) => {
  console.log(`finishedWithStatus ${code}`);
});
child.on('error', () => {
  console.log('Failed to invoke serverless.  Is it installed?');
});
