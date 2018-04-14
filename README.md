# bamazon - Node.js & MySql

## Overview

## bamazonCustomer.js

The bamazonCustomer.js command line application will allow users to buy products from a set database. After the user has selected a product and an amount it will console log out the information to the screen along with the total amount for the user. The amount the user enters will update the database to the new amount left.

## bamazonCustomer.js Example

![bamacustomer.js example](https://raw.githubusercontent.com/bh68484/bamazon/master/gif_examples/bamazonCustomer.gif)

## bamazonManager.js

The bamazonManager.js command line application presents the user with multiple choices on what the user can do.

## Choice 1 - View Products

The first choice allows the user to console log the entire product database along with the information for each item.

## Choice 2 - Low Inventory

The second choice allows the user to see low inventory by console logging an product that equal or less than 5 items left.

## Choice 3 - Add to Inventory

The third choice allows the user to add stock to the inventory that is currently in the database. The user selects the inventory they wish to increase by ID number, and then will prompted for a number to add to the current stock. The number the user enters and current stock will add and update the inventory database.

## Choice 4 - Add New Product

The fourth choice allows the user to add a completely new product into the database. When selected it will prompt the user for the required information (Product name, Department, Quantity, and Price). Once submitted, the program will insert a new row into the database with the information and give it a unique ID to allow the user to interact with that product through the previous options.

## Choice 5 - Quit

The fifth choice allows the user to quit the application. It will disconnect from the database and will return uses to the command line prompt.
