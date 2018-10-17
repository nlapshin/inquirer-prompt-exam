const Base = require('inquirer/lib/prompts/base');
const observe = require('inquirer/lib/utils/events');

const chalk = require('chalk');
const { takeUntil } = require('rxjs/operators');

class ExamPrompt extends Base {
    constructor(questions, rl, answers) {
        super(questions, rl, answers);

        if (!this.opt.successAnswer) {
            this.throwParamError('successAnswer');
        };

        this.successAnswer = this.opt.successAnswer;
    }

    _run(cb) {
        this.done = cb;

        var events = observe(this.rl);
        var submit = events.line;

        var validation = this.handleSubmitEvents(submit);
        validation.success.forEach(this.onEnd.bind(this));

        events.keypress
            .pipe(takeUntil(validation.success))
            .forEach(this.render.bind(this));

        this.render();

        return this;
    }

    render() {
        let message = this.getQuestion();

        const isFinal = this.status === 'answered';
        const isSuccess = this.success === true;

        if (isFinal) {
            let messageColor = isSuccess ? 'cyan' : 'red';

            message += chalk[messageColor](this.answer);

            if (!isSuccess) {
                message += chalk.cyan(` (${this.successAnswer})`);
            }
        } else {
            message += this.rl.line;
        }

        this.screen.render(message);
    }

    checkResult(answer) {
        return answer === this.successAnswer;
    }

    onEnd(state) {
        this.answer = state.value;
        this.success = this.checkResult(state.value);
        this.status = 'answered';

        this.render();

        this.screen.done();
        this.done(this.success);
    }
}

module.exports = ExamPrompt;