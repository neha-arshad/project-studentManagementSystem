#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    ID;
    name;
    coursesEnrolled;
    feesAmount;
    constructor(name, ID, coursesEnrolled, feesAmount) {
        this.ID = ID;
        this.name = name;
        this.coursesEnrolled = coursesEnrolled;
        this.feesAmount = feesAmount;
    }
}
;
//variable
let baseID = 10000;
let studentID = "";
let continueEnrollment = true;
let students = [];
do {
    let { action } = await inquirer.prompt({
        type: "list",
        name: "action",
        message: chalk.bold.blueBright(" Please select an action:\n"),
        choices: [
            chalk.cyan("Enroll a student"),
            chalk.cyan("Show student status"),
        ],
    });
    if (action === chalk.cyan("Enroll a student")) {
        let { studentName } = await inquirer.prompt({
            type: "input",
            name: "studentName",
            message: chalk.bold.blueBright(" Enter your name:"),
        });
        let trimmedStudentName = studentName.trim().toLowerCase();
        let studentNamesCheck = students.map((obj) => obj.name); //all studentname
        if (studentNamesCheck.includes(trimmedStudentName) === false) {
            if (trimmedStudentName !== "") {
                baseID++;
                studentID = "STID" + baseID;
                console.log(chalk.green("\n\t✨ Your account has been created."));
                console.log(chalk.bold.green(`\t\tWelcome, ${trimmedStudentName}!\n`));
                let { course } = await inquirer.prompt({
                    type: "list",
                    name: "course",
                    message: chalk.bold.yellow("📖 Please select a course:"),
                    choices: ["TypeScript", "JavaScript", "Node.JS"],
                });
                let courseFees = 0;
                switch (course) {
                    case "TypeScript":
                        courseFees = 500;
                        break;
                    case "JavaSript":
                        courseFees = 1000;
                        break;
                    case "Node.JS":
                        courseFees = 200;
                        break;
                    default:
                        break;
                }
                let { courseConfirmation } = await inquirer.prompt({
                    type: "confirm",
                    name: "courseConfirmation",
                    message: chalk.bold.yellow(`💰 Do you want to enroll in the ${course} course for $${courseFees}?`),
                });
                if (courseConfirmation === true) {
                    let student = new Student(trimmedStudentName, studentID, [course], courseFees);
                    students.push(student);
                    console.log(chalk.bold.magentaBright("\n\t🎉 You have successfully enrolled in the course!\n"));
                }
            }
            else {
                console.log(chalk.red("\n\t❌ Invalid name.\n"));
            }
        }
        else {
            console.log(chalk.red.bold("\n\t ⚠️  Name already exists.\n"));
        }
    }
    else if (action === chalk.cyan("Show student status")) {
        if (students.length !== 0) {
            let studentNames = students.map((student) => student.name);
            let { selectedStudent } = await inquirer.prompt({
                type: "list",
                name: "selectedStudent",
                message: chalk.bold.yellow("\n🔍 Please select a student:"),
                choices: studentNames,
            });
            let foundStudent = students.find((student) => student.name === selectedStudent);
            console.log(chalk.bold.yellow("\n\t📝 Student Information:"));
            console.log(foundStudent);
            console.log("\n");
        }
        else {
            console.log(chalk.red("\n\t❌ Record is Empty, First Enroll a Student.\n"));
        }
    }
    let { userConfirmation } = await inquirer.prompt({
        type: "confirm",
        name: "userConfirmation",
        message: chalk.bold.yellow("🔄 Do you want to continue?"),
    });
    if (userConfirmation === false) {
        continueEnrollment = false;
    }
    ;
} while (continueEnrollment);
