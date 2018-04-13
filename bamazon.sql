CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (

	item_id INTEGER NOT NULL AUTO_INCREMENT,
	product_name VARCHAR (100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
    price DECIMAL(8,2) NOT NULL,
    stock_quantity INTEGER(5) NOT NULL,
    PRIMARY KEY
    (item_id)
    );
    
    SELECT * FROM products;
    
	INSERT INTO products
        (product_name, department_name, price, stock_quantity)
	VALUES
        ('Jeans', 'Clothing', 29.99, 45);
        
	INSERT INTO products
        (product_name, department_name, price, stock_quantity)
	VALUES
        ('T-Shirt', 'Clothing', 19.99, 55);
 
 	INSERT INTO products
        (product_name, department_name, price, stock_quantity)
	VALUES
        ('Shoes', 'Clothing', 49.99 , 35);
        
	INSERT INTO products
        (product_name, department_name, price, stock_quantity)
	VALUES
        ('Shampoo', 'Healthcare', 4.99, 60);
        
	INSERT INTO products
        (product_name, department_name, price, stock_quantity)
	VALUES
        ('Toothpaste', 'Healthcare', 2.99, 40);
        
	INSERT INTO products
        (product_name, department_name, price, stock_quantity)
	VALUES
        ('TV_Stand', 'Living_Room', 49.99, 20);
        
	INSERT INTO products
        (product_name, department_name, price, stock_quantity)
	VALUES
        ('Pillow', 'Living_Room', 19.99, 30);
        
	INSERT INTO products
        (product_name, department_name, price, stock_quantity)
	VALUES
        ('Sofa', 'Living_Room', 185.99, 5);
        
	INSERT INTO products
        (product_name, department_name, price, stock_quantity)
	VALUES
        ('Television', 'Electronics', 399.99, 20);
        
	INSERT INTO products
        (product_name, department_name, price, stock_quantity)
	VALUES
        ('Laptop', 'Electronics', 599.99, 15);
        
	INSERT INTO products
        (product_name, department_name, price, stock_quantity)
	VALUES
        ('Digital_Camera', 'Electronics', 99.99, 25);
        
	INSERT INTO products
        (product_name, department_name, price, stock_quantity)
	VALUES
        ('Dog_Food', 'Pets', 9.99, 40);
        INSERT INTO products
        (product_name, department_name, price, stock_quantity)
	VALUES
        ('Cat_Food', 'Pets', 9.99, 35);
        INSERT INTO products
        (product_name, department_name, price, stock_quantity)
	VALUES
        ('Pet_Crate', 'Pets', 29.99, 15);
        
        UPDATE products SET stock_quantity = 15 WHERE item_id = 1;
        