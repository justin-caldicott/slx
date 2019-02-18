/* eslint-disable no-undef */
const npmRun = require('npm-run');

describe('slx', () => {
  it('deploys a stack', () => {
    const child = npmRun.spawnSync('node', '../index.js'.split(' '), { cwd: `${__dirname}/test` });
    console.log(child.stdout.toString());
    console.error(child.stderr.toString());
    expect(child.stdout.toString()).toContain('Packaging service...');
  });
});
