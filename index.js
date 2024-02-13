const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    database: "employee_tracker",
    user: "root",
    password: ""
})

db.connect(function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log("DB has been connected")
    }
})

function viewDepartments() {
    // SELECT * FROM department;
    db.query("SELECT * FROM department", function (err, results) {
        console.table(results)
        mainMenu();
    })
}

function viewRoles() {
    db.query("SELECT * FROM role", function (err, results) {
        console.table(results)
        mainMenu();
    })
}
function viewEmployees(){
    db.query("SELECT * FROM employee", function (err, results) {
        console.table(results)
        mainMenu();
    })
}

function addDepartment(){
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the new department?"
        }
    ])
        .then(answers => {
            db.query(`INSERT INTO department (name) VALUES ("${answers.name}");`, function (err, results) {
                console.log(results)
                mainMenu();
            })
        })
}
function addRole(){
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title of the new role?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the new role?"
        }, {
            type: "input",
            name: "department_id",
            message: "What is the department id of the new role?"
        }
    ])
        .then(answers => {
            db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${answers.title}", ${answers.salary},${answers.department_id});`, function (err, results) {
                console.log(results)
                mainMenu()
            })
        })
}

function addEmployee(){
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the first name of the new employee?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the last name of the new employee?"
        },
        {
            type: "input",
            name: "role_id",
            message: "What is the role of the employee?"
        },
        {
            type: "input",
            name: "manager_id",
            message: "Who is the manager of the employee?"
        },
    ])
        .then(answers => {
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.first_name}", "${answers.last_name}",${answers.role_id},${answers.manager_id ? answers.manager_id : null});`, function (err, results) {
                console.log(err)
                mainMenu()
            })
        })

}













function mainMenu() {

    inquirer.prompt([
        {
            type: "list",
            name: "input",
            message: "What would you like to do?",
            choices: [
                "view all departments",
                "view all roles",
                "view all employees",
                "add a department",
                "add a role",
                "add an employee",
                "update an employee role"
            ]
        }
    ])
        .then(answers => {

            if (answers.input == "view all departments") {
                viewDepartments();
            }
            if (answers.input == "view all roles") {
                viewRoles()
            }
            if (answers.input == "view all employees") {
                viewEmployees()
            }
            if (answers.input == "add a department") {
                // INSERT INTO department (name) VALUES ("Test");
                addDepartment()
               


            }
            if (answers.input == "add a role") {
                addRole()



            }
            if (answers.input == "add an employee") {
                addEmployee()
          
            }
            if (answers.input == "update an employee role") {

            }

        })
}


mainMenu()