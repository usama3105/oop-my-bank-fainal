#!/usr/bin/env node
// Install the necessary dependencies:
// npm install inquirer

import inquirer from 'inquirer';

class Customer {
    constructor(public name: string, public balance: number) {}
}

class Bank {
    private customers: Customer[] = [];

    addCustomer(name: string, initialBalance: number) {
        const customer = new Customer(name, initialBalance);
        this.customers.push(customer);
        console.log(`Customer ${name} added with initial balance of ${initialBalance}`);
    }

    findCustomer(name: string): Customer | undefined {
        return this.customers.find(customer => customer.name === name);
    }

    deposit(name: string, amount: number) {
        const customer = this.findCustomer(name);
        if (customer) {
            customer.balance += amount;
            console.log(`Deposited ${amount} to ${name}'s account. New balance: ${customer.balance}`);
        } else {
            console.log(`Customer ${name} not found.`);
        }
    }

    withdraw(name: string, amount: number) {
        const customer = this.findCustomer(name);
        if (customer) {
            if (customer.balance >= amount) {
                customer.balance -= amount;
                console.log(`Withdrew ${amount} from ${name}'s account. New balance: ${customer.balance}`);
            } else {
                console.log(`Insufficient balance.`);
            }
        } else {
            console.log(`Customer ${name} not found.`);
        }
    }

    checkBalance(name: string) {
        const customer = this.findCustomer(name);
        if (customer) {
            console.log(`${name}'s balance: ${customer.balance}`);
        } else {
            console.log(`Customer ${name} not found.`);
        }
    }
}

const bank = new Bank();

const mainMenu = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Choose an action:',
            choices: ['Add Customer', 'Deposit', 'Withdraw', 'Check Balance', 'Exit']
        }
    ]).then(answers => {
        switch (answers.action) {
            case 'Add Customer':
                inquirer.prompt([
                    { type: 'input', name: 'name', message: 'Enter customer name:' },
                    { type: 'number', name: 'initialBalance', message: 'Enter initial balance:' }
                ]).then(answers => {
                    bank.addCustomer(answers.name, answers.initialBalance);
                    mainMenu();
                });
                break;
            case 'Deposit':
                inquirer.prompt([
                    { type: 'input', name: 'name', message: 'Enter customer name:' },
                    { type: 'number', name: 'amount', message: 'Enter deposit amount:' }
                ]).then(answers => {
                    bank.deposit(answers.name, answers.amount);
                    mainMenu();
                });
                break;
            case 'Withdraw':
                inquirer.prompt([
                    { type: 'input', name: 'name', message: 'Enter customer name:' },
                    { type: 'number', name: 'amount', message: 'Enter withdrawal amount:' }
                ]).then(answers => {
                    bank.withdraw(answers.name, answers.amount);
                    mainMenu();
                });
                break;
            case 'Check Balance':
                inquirer.prompt([
                    { type: 'input', name: 'name', message: 'Enter customer name:' }
                ]).then(answers => {
                    bank.checkBalance(answers.name);
                    mainMenu();
                });
                break;
            case 'Exit':
                console.log('Goodbye!');
                break;
        }
    });
};

mainMenu();
