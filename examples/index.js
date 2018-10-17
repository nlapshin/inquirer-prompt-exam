const inquirer = require('inquirer');
const chalk = require('chalk');

inquirer.registerPrompt('exam', require('../src'));

const questions = [
    {
        type: 'exam',
        name: 'robot',
        message: 'Are you robot?',
        successAnswer: 'no'
    },
    {
        type: 'exam',
        name: 'human',
        message: 'Are you human?',
        successAnswer: 'yes'
    }
];

inquirer.prompt(questions).then(answers => {
    const answersValues = Object.values(answers);

    const allQuestions = answersValues.length;
    const successQuestions = answersValues.filter(ans => ans === true).length;

    const result = chalk.cyan(`${successQuestions}/${allQuestions}`);

    console.log(`result: ${result}`);
});