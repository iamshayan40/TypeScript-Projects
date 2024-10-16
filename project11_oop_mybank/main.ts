#! usr/bin/env node
import inquirer from "inquirer";

class CustomerDetail {
  constructor(
    public custFirst: string,
    public custLast: string,
    public custGender: string,
    public custAge: number,
    public custMobile: string,
    public custBalance: number,
    public custAccountNum: number 
  ) {}

  static generateAccountNumber(): number {
    return Math.floor(Math.random() * 899) + 100;
  }
}

const mainQuestions = [
  {
    type: "list",
    name: "questions",
    message: "Select Operation",
    choices: ["Add Customer", "Make Transaction", "View Balance", "Exit"],
  },
];

const addCustomerQuestions = [
  {
    type: "input",
    name: "custFirstName",
    message: "Enter First Name:",
  },
  {
    type: "input",
    name: "custLastName",
    message: "Enter Last Name:",
  },
  {
    type: "list",
    name: "custGender",
    message: "Select Gender:",
    choices: ["Male", "Female", "Transgender"],
  },
  {
    type: "input",
    name: "custAge",
    message: "Enter Age:",
    validate: validNumber,
  },
  {
    type: "input",
    name: "custMobile",
    message: "Enter Mobile Number:",
    validate: validMobile, 
  },
  {
    type: "number",
    name: "custBalance",
    message: "Enter Initial Balance:",
    validate: validNumber,
  },
];

const againAskQuestions = [
  {
    type: "confirm",
    name: "askAgain",
    message: "Do you want to run again?",
  },
];

function validNumber(input: any) {
  if (input) {
    if (isNaN(input)) {
      return "Enter a valid number";
    } else {
      return true;
    }
  } else {
    return "Enter a value";
  }
}

function validMobile(input: string) {
  const isValid = /^\d{10}$/.test(input);
  return isValid || "Enter a valid 10-digit mobile number";
}

async function againAsking() {
  const response = await inquirer.prompt(againAskQuestions);
  return response.askAgain;
}

const customerList: CustomerDetail[] = [];

async function questioning() {
  const answer = await inquirer.prompt(mainQuestions);
  switch (answer.questions) {
    case "Add Customer":
      await addCustomer();
      break;
    case "Make Transaction":
      await custTransaction();
      break;
    case "View Balance":
      await customerBalance();
      break;
    case "Exit":
      process.exit();
  }
}

async function addCustomer() {
  const answers = await inquirer.prompt(addCustomerQuestions);
  const customer = new CustomerDetail(
    answers.custFirstName,
    answers.custLastName,
    answers.custGender,
    parseInt(answers.custAge),
    answers.custMobile,
    parseFloat(answers.custBalance),
    CustomerDetail.generateAccountNumber()
  );
  customerList.push(customer);
  console.log("Customer added:", customer);
}

async function custTransaction() {
  const { custMobile } = await inquirer.prompt([
    {
      type: "input",
      name: "custMobile",
      message: "Enter Customer Mobile Number:",
    },
  ]);

  const accountNum = customerList.find((x) => x.custMobile === custMobile);

  if (!accountNum) {
    console.log("Enter Correct Mobile Number");
    return;
  }

  const { selectMode, transactionAmount } = await inquirer.prompt([
    {
      type: "list",
      name: "selectMode",
      message: "Select Transaction Type",
      choices: ["Debit", "Credit"],
    },
    {
      type: "number",
      name: "transactionAmount",
      message: "Enter Amount",
    },
  ]);

  if (selectMode === "Debit") {
    if (accountNum.custBalance >= transactionAmount) {
      accountNum.custBalance -= transactionAmount;
      console.log("Transaction Successful");
    } else {
      console.log("Transaction Unsuccessful\nNot Enough Balance");
    }
  } else if (selectMode === "Credit") {
    accountNum.custBalance += transactionAmount;
    console.log("Transaction Successful");
  }
}

async function customerBalance() {
  const { custMobile } = await inquirer.prompt([
    {
      type: "input",
      name: "custMobile",
      message: "Enter Customer Mobile Number:",
    },
  ]);

  const customer = customerList.find((x) => x.custMobile === custMobile);

  if (!customer) {
    console.log("Enter Correct Mobile Number");
    return;
  }

  console.log("Balance:", customer.custBalance);
}

async function main() {
  do {
    await questioning();
  } while (await againAsking());
}

main();
