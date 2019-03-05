const program = require('commander');
const npmRun = require('npm-run');
const uuid = require('uuid/v4');

let cmdValue;
program
  .arguments('<cmd>')
  .action((cmd) => {
    cmdValue = cmd;
  });
program.parse(process.argv);

const run = (command, args, options = {}) => new Promise((resolve, reject) => {
  const child = npmRun.spawn(command, args, options);
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
  child.on('close', code => resolve(code));
  child.on('error', error => reject(error));
});

const main = async () => {
  const stage = uuid().split('-')[0];
  process.env.STAGE = stage;
  // TODO: cmd on windows, otherwise without.  Not sure why this is an issue now.
  try {
    await run('sls.cmd', `deploy --stage ${stage}`.split(' '));
    const argsIndex = process.argv.indexOf(cmdValue) + 1;
    const args = process.argv.slice(argsIndex);
    await run(cmdValue, args);
  } finally {
    await run('sls.cmd', `remove --stage ${stage}`.split(' '));
  }
};

main();
