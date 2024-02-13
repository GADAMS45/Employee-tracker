drop database if exists employee_tracker;
create database employee_tracker;
use employee_tracker;

create table department(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)
);

create table role(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES  department(id)
);

create table employee(
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES  role(id),
    FOREIGN KEY (manager_id)
    REFERENCES  employee(id)
);