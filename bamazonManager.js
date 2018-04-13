var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();
//attempt to add tax
// var tax = 0.0725;

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "trophy87",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    startManager();
});

// function which prompts the user for what action they should take
function startManager() {
    inquirer
        .prompt({
            name: "menuOptions",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View Products",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "Quit"
            ]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.menuOptions === "View Products") {
                viewProducts();
            } else if (answer.menuOptions === "View Low Inventory") {
                lowInventory();
            } else if (answer.menuOptions === "Add to Inventory") {
                questionToAddToInv();
            } else if (answer.menuOptions === "Add New Product") {
                console.log("add new product");
            } else if (answer.menuOptions === "Quit") {
                console.log("=====Goodbye=====");
                quitFunction();
            }
        });
}

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        for (i = 0; i < results.length; i++) {
            console.log(
                "ID Name: " +
                results[i].item_id +
                "\n" +
                "Product Name: " +
                results[i].product_name +
                "\n" +
                "Department Name: " +
                results[i].department_name +
                "\n" +
                "Price: " +
                results[i].price +
                "\n" +
                "Stock Quantity: " +
                results[i].stock_quantity
            );
        }
        startManager();
    });
}

function lowInventory() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        for (i = 0; i < results.length; i++) {
            if (results[i].stock_quantity <= 5)
                console.log(
                    "ID Name: " +
                    results[i].item_id +
                    "\n" +
                    "Product Name: " +
                    results[i].product_name +
                    "\n" +
                    "Department Name: " +
                    results[i].department_name +
                    "\n" +
                    "Price: " +
                    results[i].price +
                    "\n" +
                    "Stock Quantity: " +
                    results[i].stock_quantity
                );
        }
        startManager();
    });
}

function questionToAddToInv() {
    inquirer
        .prompt({
            name: "addInventory",
            type: "rawlist",
            message: "What would you like to do?",
            choices: ["Add to Inventory", "Return to Main Menu"]
        })
        .then(function (answer) {
            if (answer.addInventory === "Add to Inventory") {
                console.log("want to add");
            } else answer.addInventory === "Return to Main Menu";
            {
                startManager();
            }
        });
}

function quitFunction() {
    connection.end();
    return;
}
