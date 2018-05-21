#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const pkg = require('../package.json');

const newCli = require('../lib/new')

program.version(pkg.version)
  .option('new', 'new a lefit-cms project')
  .option('new --no-auto-install', 'new a lefit-cms project')
  .parse(process.argv);

if (program.new) {
  newCli(process.argv)
  // console.log(process.argv)
}
