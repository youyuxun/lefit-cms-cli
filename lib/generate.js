const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const exists = require('fs').existsSync;
const inquirer = require('inquirer');

// const template = require('./template.js');

const cwd = process.cwd();
const boilerplateDir = path.join(__dirname, '../boilerplate');
console.log(boilerplateDir)
const PageMap = {
  "BasicForm": '../boilerplate/BasicForm',
  "BasicList": '../boilerplate/BasicList',
};

function getPath() {
  if (exists(path.join(cwd, './package.json'))) {
    return 'root';
  }
  if (exists(path.join(cwd, './routes'))) {
    return 'src';
  }
  return '';
}

function normal() {
  const questions = [{
    type: 'list',
    name: 'type',
    message: 'what do you want to generate ?',
    choices: [
      'BasicList',
      'BasicForm',
    ],
  }];

  inquirer.prompt(questions).then((answers) => {
    setTargetPath(answers.type);
  });
}

function setTargetPath(type) {
  const filePath = PageMap[type];
  const fileName = filePath.replace(/.*\//, '');
  const currentPath = getPath();
  const questions = [{
    type: 'input',
    name: 'target',
    message: 'which path do you want to create template to ? (default is current directory ./): ',
  }];

  inquirer.prompt(questions).then(function (answers) {
    if (currentPath === 'root') {
      const target = path.join(cwd, `./src/routes/${answers.target}`)
      writeFiles(target, filePath, fileName)
    } else if (currentPath === 'src') {
      const target = path.join(cwd, `./routes/${answers.target}`)
      writeFiles(target, filePath, fileName)
    } else {
      const target = path.join(cwd, answers.target || './')
      writeFiles(target, filePath, fileName)
    }
  });

}

function writeFiles(target, filePath, fileName) {
  fs.copySync(path.join(boilerplateDir, filePath + '.js'), path.join(target, fileName + '.js'), { overwrite: true });
  console.log(chalk.green(`generated success：${path.join(target, fileName + '.js')}`));
}


module.exports = function (args) {
  const name = args[3];
  if (!name) {
    normal();
    return;
  }

  switch (name) {
    case 'BasicList':
      setTargetPath(name);
      break;
    case 'BasicForm':
      setTargetPath(name);
      break;
    default:
      console.log(chalk.red('none of this type'));
      normal();
      break;
  }

};
