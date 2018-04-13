var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password and mySQL database
  password: "trophy87",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
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
    .then(function(answer) {
      // based on their answer, call the appropriate function.
      if (answer.menuOptions === "View Products") {
        viewProducts();
      } else if (answer.menuOptions === "View Low Inventory") {
        lowInventory();
      } else if (answer.menuOptions === "Add to Inventory") {
        addInventory();
      } else if (answer.menuOptions === "Add New Product") {
        addProduct();
      } else if (answer.menuOptions === "Quit") {
        console.log("=====Goodbye=====");
        quitFunction();
      }
    });
}

function viewProducts() {
  connection.query("SELECT * FROM products", function(err, results) {
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
    console.log("\r\n");
    startManager();
  });
}
//function that loops through the database and console logs all products with their information that have an inventory of 5 or less.
function lowInventory() {
  connection.query("SELECT * FROM products", function(err, results) {
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
    console.log("\r\n");
    startManager();
  });
}
//function that will allow a user to add inventory to the current stock and console logs the amount selected and the new total.
function addInventory() {
  // prompt to ask user to choose a product according to ID, and select an amount.
  inquirer
    .prompt([
      {
        name: "idSelection",
        type: "input",
        message:
          "What product would you like to add stock to?  Please select with ID",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "quantity",
        type: "input",
        message: "Please enter an amount",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      connection.query(
        "SELECT * FROM products WHERE item_id=?",
        answer.idSelection,
        function(err, results) {
          for (var i = 0; i < results.length; i++) {
            // console logs the information about the product the user selected.
            var newQuantity =
              results[i].stock_quantity + parseInt(answer.quantity);
            var purchaseId = answer.idSelection;
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: newQuantity
                },
                {
                  item_id: purchaseId
                }
              ],
              function(err, results) {}
            );
            console.log("\r\n");
            console.log(
              answer.quantity +
                " " +
                results[i].product_name +
                " " +
                "have been added to the stores stock"
            );
            console.log("===");
            console.log(
              "The store's total amount of " +
                results[i].product_name +
                " " +
                "is " +
                newQuantity +
                "\r\n"
            );
            startManager();
          }
        }
      );
    });
}
//function to allow the user to add a new product to the database
function addProduct() {}

//function to allow the user to quit the application
function quitFunction() {
  connection.end();
  return;
}
