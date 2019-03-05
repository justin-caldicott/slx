/* eslint-disable no-undef */
const npmRun = require('npm-run');

describe('slx', () => {
  it('deploys a stack', () => {
    const child = npmRun.spawnSync('node', '../index.js node -v'.split(' '), { cwd: `${__dirname}/test` });
    if (child.stdout && child.stdout.toString()) {
      console.log(child.stdout.toString());
    }
    if (child.stderr && child.stderr.toString()) {
      console.error(child.stderr.toString());
    }
    expect(child.stdout.toString()).toContain('Packaging service...');
  });
});
