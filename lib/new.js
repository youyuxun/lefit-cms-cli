const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const shell = require('shelljs');
const inquirer = require('inquirer');
const ora = require('ora');
const download = require('download-git-repo');
const which = require('which');
const exists = require('fs').existsSync;

const cwd = process.cwd();
const origin = 'youyuxun/lefit-cms';
const branch = {
  standard: '#master',
};
const npms = ['cnpm', 'yarn', 'npm'];
function findNpm() {
  for (var i = 0; i < npms.length; i++) {
    try {
      which.sync(npms[i]);
      console.log('use npm: ' + npms[i]);
      return npms[i];
    } catch (e) {

    }
  }
  throw new Error('please install npm');
}

module.exports = (args) => {
  const isAutoInstall = !(args[3] === '--no-auto-install');

  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'input project name',
    },
    {
      type: 'input',
      name: 'path',
      message: 'which directory do you want to init to ? (default is current directory ./):',
    }
  ]

  inquirer.prompt(questions).then((answers) => {
    const projectName = answers.name || 'lefit-cms-template'
    const targetPath = path.join(cwd, answers.path || './')
    const destination = path.join(targetPath, projectName)
    if (exists(destination)) {
      console.log(chalk.red('exit: directory is already exists'))
      return
    }

    const spinner = ora('downloading template...')
    spinner.start()

    download(`${origin}${branch.standard}`, destination, { clone: false }, (err) => {
      spinner.stop()
      if (err) {
        console.log(chalk.red(`Failed to download repo https://github.com/${origin}${branch.standard}`, err))
      } else {
        console.log(chalk.green(`Success to download repo https://github.com/${origin}${branch.standard} to ${targetPath}`));

        if (!isAutoInstall) {
          return
        }

        const spinnerInstall = ora('Auto installing...')
        spinnerInstall.start()

        const npm = findNpm()
        shell.exec(`cd ${destination} && ${npm} install`, () => {
          console.log(chalk.green(`${npm} install completed`))
          spinnerInstall.stop()
        })
      }
    })
  })
}