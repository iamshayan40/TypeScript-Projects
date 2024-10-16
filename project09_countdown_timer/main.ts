#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";


console.log(chalk.greenBright("Welcome to Countdown Timer!"));

inquirer.prompt([
    {
        type: 'number',
        name: 'minutes',
        message: 'Enter the number of minutes for the timer:',
        validate: (input: number) => input >= 0
    },
    {
        type: 'number',
        name: 'seconds',
        message: 'Enter the number of seconds for the timer:',
        validate: (input: number) => input >= 0 && input < 60
    }
]).then(({ minutes, seconds }) => {
    const endTime = new Date();
    
    endTime.setMinutes(endTime.getMinutes() + minutes);
    endTime.setSeconds(endTime.getSeconds() + seconds);

    const timer = setInterval(() => {
        const currentTime = new Date();
        const remainingTime = Math.max((endTime.getTime() - currentTime.getTime()) / 1000, 0);
        const remainingMinutes = Math.floor(remainingTime / 60);
        const remainingSeconds = Math.floor(remainingTime % 60);

        console.clear();
        console.log(`Time Remaining: ${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`);

        if (remainingTime <= 0) {
            clearInterval(timer);
            console.log(chalk.redBright("Time's up!"));
            process.exit(0);
        }
    }, 1000);
});