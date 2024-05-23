#! usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

class Student {
	ID: string;
	name: string;
	coursesEnrolled: string[];
	balance: number;
	
	constructor(
		name: string,
		ID: string,
		coursesEnrolled: string[],
		balance: number,)
{
	this.ID = ID;
	this.name = name;
	this.coursesEnrolled = coursesEnrolled;
	this.balance = balance;
	
}

enrollCourse(course: string, courseFee: number): void {
	this.coursesEnrolled.push(course);
	this.balance -= courseFee;
}

payFees(amount: number): void {
	this.balance -= amount;
}
depositCash(amount: number): void {
	this.balance += amount;
}
viewBalance(): number {
	return this.balance;
}
showStatus(): void {
	console.log(chalk.bold.yellow("\nStudent Information:"));
	console.log("Name:", this.name);
	console.log("ID:", this.ID);
	console.log("Courses Enrolled:", this.coursesEnrolled.join(", "));
	console.log("Balance:", this.balance);
}
}

let baseID = 10000;
let students: Student[] = [];

async function enrollStudent() {
	let { studentName } = await inquirer.prompt(
		{
			type: "input",
			name: "studentName",
			message: chalk.bold.blueBright("Enter your name:"),
		}
);

let trimmedStudentName: string = studentName.trim().toLowerCase();
let studentNamesCheck: string[] = students.map((obj) => obj.name);

if (!studentNamesCheck.includes(trimmedStudentName) &&trimmedStudentName !== "") {
	baseID++;
	let studentID: string = "STID" + baseID;
	console.log(chalk.green("\n✨ Your account has been created."));

	console.log(chalk.bold.green(`\tWelcome, ${trimmedStudentName}!\n`));

let { course }  = await inquirer.prompt(
	[{
		type: "list",
		name: "course",
		message: chalk.bold.blueBright("Select a course: "),
		choices:[
		{ name: "Typescript ($5000)", value: "Typescript", fee: 5000 },
		{ name: "Javascript ($4000)", value: "Javascript", fee: 4000 },
		{ name: "Python ($3000)", value: "Python", fee: 3000 } ]
	}
]);

let courseFee: number = 0;{
	switch (course.toLowerCase()) {
		case "Typescrit":
			courseFee = 5000;
			break;

			case "javaSript":
				courseFee = 4000;
				break;

				case "python":
					courseFee = 3000;
					break
					default:
						break;
	}
}

let {courseConfirmation} = await inquirer.prompt(
	{
		type: "confirm",
		name: "courseConfirmation",
		message: chalk.bold.blueBright("Are you sure you want to enroll in this course?"),
		
	}
);


if (courseConfirmation === true){

let student = new Student(trimmedStudentName,studentID,[course],0);
students.push(student);

console.log(chalk.bold.magentaBright("\nYou have successfully enrolled!"));
}

}
else {
	 console.log(chalk.red("\nName already exists or invalid name."));
	}
}

async function showStudentStatus() {
	if (students.length !== 0) {
		let studentNames = students.map((student) => student.name);
		let { selectedStudent } = await inquirer.prompt(
		{
			type: "list",
			name: "selectedStudent",
			message: chalk.bold.yellow("\nPlease select a student:"),
			choices: studentNames,
		}
	);
	
	let foundStudent = students.find((student) => student.name === selectedStudent);
	foundStudent!.showStatus();
}

else{
	console.log(chalk.red("\nRecord is Empty, First Enroll a Student."));
}
}



async function depositCash() {
	let { studentName, amount } = await inquirer.prompt(
		[
			{
				type: "list",
				name: "studentName",
				message: chalk.bold.blueBright("Select a student:"),
				choices: students.map((student) => student.name),
		},
			{
				type: "number",
				name: "amount",
				message: chalk.bold.blueBright("Enter amount to deposit:"),
				validate: (value: any) => {
					if (isNaN(value) || value <= 0) {
						return "Please enter a valid amount.";
			}
			return true;
		},
	},
]);

let foundStudent = students.find((student) => student.name === studentName);
foundStudent?.depositCash((amount));

console.log(chalk.green("\nCash deposited successfully.\n"));
console.log(`Now your Blance is ${amount}`);
}

async function payFees() {
	let { studentName, amount } = await inquirer.prompt(
		[
			{
				type: "list",
				name: "studentName",
				message: chalk.bold.blueBright("Select a student:"),
				choices: students.map((student) => student.name),
			},
    {
			type: "number",
			name: "amount",
			message: chalk.bold.blueBright("Enter amount to pay:"),
			validate: (value: any) => {
				if (isNaN(value) || value <= 0) {
					return "Please enter a valid amount.";
		}
				return true;
			},
		},
	]);
	
	let foundStudent = students.find((student) => student.name === studentName);
	foundStudent?.payFees((amount));
	
	console.log(chalk.green("\nFees paid successfully."));
}

async function viewBalance() {
	let { studentName } = await inquirer.prompt(
		{
			type: "list",
			name: "studentName",
			message: chalk.bold.blueBright("Select a student:"),
			choices: students.map((student) => student.name),
		}
);

let foundStudent = students.find((student) => student.name === studentName);

console.log(chalk.yellow(`\nCurrent balance of ${foundStudent?.name}:${foundStudent?.viewBalance()}`));
}

async function addStudent() {
  let { studentName } = await inquirer.prompt({
    type: "input",
    name: "studentName",
    message: chalk.bold.blueBright("Enter student name:"),
  });

  let trimmedStudentName = studentName.trim().toLowerCase();
  let studentNamesCheck = students.map((obj) => obj.name);

  if (!studentNamesCheck.includes(trimmedStudentName) && trimmedStudentName !== "") {
    baseID++;
    let studentID = "STID" + baseID;
    console.log(chalk.green("\n✨ Student account created."));

    console.log(chalk.bold.green(`\tWelcome, ${trimmedStudentName}!\n`));
	
	}
}

async function main() {
	let continueEnrollment: boolean = true;
	do {
    let { action } = await inquirer.prompt({
      type: "list",
      name: "action",
      message: chalk.bold.blueBright("Please select an action:"),
      choices: [
				chalk.cyan("Add Student"),
        chalk.cyan("Enroll a student"),
        chalk.cyan("Show student status"),
        chalk.cyan("Deposit cash"),
        chalk.cyan("Pay fees"),
        chalk.cyan("View balance"),
        chalk.cyan("Exit"),
      ],
    });

    switch (action) {

			case chalk.cyan("Add Student"):
				await addStudent();
				break;

      case chalk.cyan("Enroll a student"):
        await enrollStudent();
        break;

      case chalk.cyan("Show student status"):
        await showStudentStatus();
        break;

      case chalk.cyan("Deposit cash"):
        await depositCash();
        break;

      case chalk.cyan("Pay fees"):
        await payFees();
        break;

      case chalk.cyan("View balance"):
        await viewBalance();
        break;
      default:
        continueEnrollment = false;
        break;
    }

    let { userConfirmation } = await inquirer.prompt({
      type: "confirm",
      name: "userConfirmation",
      message: chalk.bold.yellow("Do you want to continue?"),
    });

    if (userConfirmation === false) {
      continueEnrollment = false;
    }
  }
while (continueEnrollment);
}


main();
