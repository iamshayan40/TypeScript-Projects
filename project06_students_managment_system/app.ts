#! /usr/bin/env node
import inquirer from "inquirer";

function createStudentManagmentSystem(name: string) {
  return {
    name,
    courses: [],
    balance: 0,
    studentID: Math.random().toString(36).substring(2, 7).toUpperCase(),
  };
}

function enroll(student: any, course: string) {
  student.courses.push(course);
}

function payTuition(student: any, amount: number) {
  student.balance -= amount;
}

function showStatus(student: any) {
  console.log(`Student Name: ${student.name}`);
  console.log(`Student ID: ${student.studentID}`);
  console.log(`Enrolled Courses: ${student.courses.join(",")}`);
  console.log(`Balance: ${student.balance}`);
  console.log("Best wishes for your studies!");
}

async function promptUser() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter your Name: ",
    },
    {
      type: "input",
      name: "course1",
      message: "Enter first course: ",
    },
    {
      type: "input",
      name: "course2",
      message: "Enter second course: ",
    },
    {
      type: "input",
      name: "fee",
      message: "Enter tution fee amount: ",
    },
  ]);

  const student = createStudentManagmentSystem(answers.name);
  enroll(student, answers.course1);
  enroll(student, answers.course2);
  payTuition(student, answers.fee);
  showStatus(student);
}
promptUser();
