#!/usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');

const newCli = require('../lib/new')
const newGenerate = require('../lib/generate')

program.version(pkg.version)
  .option('new', 'new a lefit-cms project')
  .option('n', 'new a lefit-cms project')
  .option('new --no-auto-install', 'new a lefit-cms project')
  .option('n --no-auto-install', 'new a lefit-cms project')
  .option('g', 'new a component')
  .parse(process.argv);

if (program.new || program.n) {
  newCli(process.argv)
}
if (program.g) {
  newGenerate(process.argv)
}
