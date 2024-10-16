#! /usr/bin/env node

import inquirer from "inquirer";
let toDoS = [];
let condition = true;


while(condition) {
let addTask = await inquirer.prompt(
    [
        {
            name:"tasks",
            type:"input",
            message:"What do you want to add in your To-Do List?",
        },

        {
            name:"addMore",
            type:"confirm",
            message:"Do you want to add any more tasks?",
            default:false,
        }
    ]
);

toDoS.push(addTask.tasks)
condition = addTask.addMore
console.log(toDoS)

}

