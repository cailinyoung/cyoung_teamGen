// team set up
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// output pathway
const OUTPUT_DIR = path.resolve(__dirname, "./output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// render 
const render = require("./lib/htmlRenderer");
const employees = [];

// team gen starter questions 
inquirer
    .prompt([
        {
            type: 'input',
            message: 'Enter Employee Name',
            name: 'name',
        },
        {
            type: 'list',
            message: 'Enter Job Role',
            name: 'role',
            choices: [
                "Engineer",
                "Intern",
                "Manager"
            ],
        },
        {
            type: 'input',
            message: 'Enter ID Number',
            name: 'id',
        },
        {
            type: 'input',
            message: 'Enter email',
            name: 'email',
        }
    ]).then((response) => {
        switch (response.role) {

        // manager questions
            case "Manager":
                inquirer.prompt({
                    type: 'number',
                    name: 'office',
                    message: "Input your office number",
                }).then((answer) => {
                    employees.push(new Manager(response.name, response.id, response.email, response.role, answer.office));
                    makeTeam();
                });
                break;

        // engineer questions 
            case "Engineer":
                inquirer.prompt({
                    type: 'input',
                    name: 'github',
                    message: 'Enter GITHUB username?',
                    validate: (github) => {
                        if (github) {
                            return true
                        } else {
                            console.log("Enter GITHUB username.")
                            return false
                        }
                    }
                }).then((answer) => {
                    employees.push(new Engineer(response.name, response.id, response.email, response.role, answer.github));
                    makeTeam();
                });
                break;

        // intern questions
            case "Intern":
                inquirer.prompt({
                    type: 'input',
                    name: 'school',
                    message: 'Which University did you attend?',
                    validate: (school) => {
                        if (school) {
                            return true
                        } else {
                            console.log("Enter University name.")
                            return false
                        }
                    }
                }).then((answer) => {
                    employees.push(new Intern(response.name, response.id, response.email, response.role, answer.school));
                    makeTeam();
                })
                break;
        }
    })

// generate team! 
function makeTeam() {
    fs.writeFile(outputPath, render(employees), function (err) {
        if (err) throw err;
        console.log('Congratulations! Your credentials have been saved! Welcome to the team! !');
    });
}