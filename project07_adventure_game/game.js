#! /usr/bin/env node 
import inquirer from "inquirer";
class Hero {
    name;
    health = 100;
    constructor(name) {
        this.name = name;
    }
    decreaseHealth() {
        this.health -= 25;
    }
    increaseHealth() {
        this.health = 100;
    }
}
class Enemy {
    name;
    health = 100;
    constructor(name) {
        this.name = name;
    }
    decreaseHealth() {
        this.health -= 25;
    }
}
async function main() {
    const { heroName } = await inquirer.prompt({
        type: "input",
        name: "heroName",
        message: "Please enter your hero's name:",
    });
    const { enemyType } = await inquirer.prompt({
        type: "list",
        name: "enemyType",
        message: "Select your enemy",
        choices: ["Vampire", "Werewolf", "Ghost"],
    });
    const hero = new Hero(heroName);
    const enemy = new Enemy(enemyType);
    console.log(`${hero.name} encounters ${enemy.name}`);
    do {
        const { action } = await inquirer.prompt({
            type: "list",
            name: "action",
            message: "Choose your action",
            choices: ["Attack", "Defend", "Flee"],
        });
        switch (action) {
            case "Attack":
                const randomNum = Math.random();
                if (randomNum > 0.5) {
                    hero.decreaseHealth();
                    console.log(`${hero.name} health: ${hero.health}`);
                    console.log(`${enemy.name} health: ${enemy.health}`);
                    if (hero.health <= 0) {
                        console.log("You were defeated! Try again!");
                        return;
                    }
                }
                else {
                    enemy.decreaseHealth();
                    console.log(`${hero.name} health: ${hero.health}`);
                    console.log(`${enemy.name} health: ${enemy.health}`);
                    if (enemy.health <= 0) {
                        console.log("Congratulations! You won!");
                        return;
                    }
                }
                break;
        }
    } while (true);
}
main();
