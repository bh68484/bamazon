var mysql = require("mysql");
var inquirer = require("inquirer");

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
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "buyOrQuit",
      type: "rawlist",
      message: "Would you like to [Buy] something from the store or [Quit]?",
      choices: ["Buy", "Quit"]
    })
    .then(function(answer) {
      // based on their answer, either call the function to allow the user to buy a product or quit the program.
      if (answer.buyOrQuit === "Buy") {
        displayItems();
      } else {
        quitFunction();
      }
    });
}

// function to handle console logging all the products and their information.
function displayItems() {
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
    purchase();
  });

  function purchase() {
    // prompt to ask user to choose a product according to ID, and select an amount.
    inquirer
      .prompt([
        {
          name: "idSelection",
          type: "input",
          message:
            "What product would you like to purchase?  Please select with ID",
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
              if (answer.quantity > results[i].stock_quantity) {
                console.log("===");
                console.log(
                  "Sorry! Not enough in stock. Please try again later."
                );
                console.log("=====");
                start();
              } else {
                // console logs the information about the product the user selected.
                console.log("=====");
                console.log("You've selected:");
                console.log("=====");
                console.log("Item: " + results[i].product_name);
                console.log("Department: " + results[i].department_name);
                console.log("Price: " + results[i].price);
                console.log("Quantity: " + answer.quantity);
                console.log("=====");
                console.log(
                  "Total Cost: " + results[i].price * answer.quantity
                );
                console.log("=====");
                // updates the sql database to reflect the new stock quantity.
                var newQuantity = results[i].stock_quantity - answer.quantity;
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
                start();
              }
            }
          }
        );
      });
  }
}
//function to end connection to database and quit the application
function quitFunction() {
  connection.end();
  return;
}
