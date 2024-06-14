#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
let currency = {
    USD: 1,
    EUR: 0.93,
    GBP: 0.79,
    INR: 83.55,
    PKR: 278.62
};
let currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    INR: '₹',
    PKR: '₨'
};
const answers = await inquirer.prompt([
    {
        name: "from",
        message: chalk.blue.bold("Enter From Currency"),
        type: "list",
        choices: ["USD", "EUR", "GBP", "INR", "PKR"]
    },
    {
        name: "to",
        message: chalk.blue.bold("Enter To Currency"),
        type: "list",
        choices: ["USD", "EUR", "GBP", "INR", "PKR"]
    },
    {
        name: "amount",
        message: chalk.cyan.bold("Enter Your Amount"),
        type: "input", // Use 'input' type to allow custom validation.
        validate: (input) => {
            if (input.trim() === "") {
                return 'Please enter your amount';
            }
            const amount = parseFloat(input);
            if (isNaN(amount) || amount <= 0) {
                return 'Please enter a valid amount greater than 0';
            }
            return true;
        }
    }
]);
let fromAmount = currency[answers.from];
let toAmount = currency[answers.to];
let amount = answers.amount;
let baseAmount = amount / fromAmount;
let convertedAmount = baseAmount * toAmount;
let toSymbol = currencySymbols[answers.to];
console.log(chalk.hex('#FF5733').underline.bold(`${chalk.green.bold(toSymbol)} ${convertedAmount.toFixed(2)}`));
