# inquirer-prompt-exam
Inquirer.js prompt for the test exam

# Installation

`
npm install --save inquirer-prompt-exam
`

# Usage

1. Register the prompt:

`
inquirer.registerPrompt('exam', require('inquirer-prompt-exam'));
`

2. Use it:

`
inquirer.prompt(questions)([
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
]);
`

# Options

* `successAnswer` (string): correct answer value.

# License

MIT

