## SQL Introduction

---
### Table of Contents
1. [Choosing a Database](#choosing-a-database)
1. [NoSQL Introduction](#nosql-introduction)
1. [Comparing SQL and NoSQL](#comparing-sql-and-nosql)
1. [Connectig our App to SQL Database](#connectig-our-app-to-sql-database)
1. [Fetching Products](#fetching-products)
1. [Inserting Data Into the Database](#inserting-data-into-the-database)
1. [Fetching a Single Product with the "where" Condition](#fetching-a-single-product-with-the-where-condition)
1. [Wrap up](#wrap-up)
---

### Choosing a Database
- Goal: Store data and make it easily accessible
    - Quicker that accessing a file 
    - We don't have to read the entire file to read one piece of information
- We can use **SQL Databases** or **NoSQL Databases**
**What is SQL**
- A SQL database "thinks in tables"
- SQL databases allow you to related different tables

**Core SQL Databse Characteristics**
- Strong data schema
    - All data in a table has to fit the schema
- Data relations
    - We relate the data in our table with three important kinds of relations:
        - One-to-One
        - One-to-Many
        - Many-to-Many

**SQL Queries**
- SQL: Structured Query Language
- SQL Queries are commands we use to interact with the database
    - ``SELECT * FROM users WHERE age > 28``
        - keywords: ``SELECT`` ``FROM`` ``WHERE``
        - parameters/data: ``*`` ``users`` ``age>28``

### NoSQL Introduction
- Does not follow the approach SQL follows in that it does not use schemas or relations
- In no SQL "tables" are called ``Collections``
- We don't find records but documents in ``Collections``
- We can store multiple documents with different structures in the same collection
- Rather than using relations, we look for duplicate data which is an advantage of NoSQL

**NoSQL Characteristics**
- No strong Data Schema
    - We can have mixed data in the same collection with no structure required
- No data relations 
    - You CAN relate documents but you don't have to (and you shouldn't do it too much or your queries become slow)

### Comparing SQL and NoSQL
**Horizontal vs Vertical Scaling**
- Horizontal Scaling: add more servers and merge data into one database
    - Advantage here is that we can do it "infinitely"
- Vertical Scaling: improve server capacity/hardware

**SQL**
- Data uses schemas
- Relations
- Data is distributed across many tables (connected through relations)
- Horizontal scaling is difficult/impossible 
- Vertical scaling is possible
- Limitations for lots of (thousands) read and write queries per second
- SQL can be perfect if you need to store data where relations are important

**NoSQL**
- Schema-less
- No (or very few) relations
- Data is typically merged/nested in a few collections
- Both horizontal and vertical scaling is possible
- Great performance for mass read and write requests

### Connectig our App to SQL Database
- We need to install a library to work with SQL
```bash
npm install --save mysql2
```
- Create a ``database.js`` file which will hold a connection object that allows us to run queries
```js
const mysql = require("mysql2");
```
- There are two ways to connecting with a SQL database
    1. Setup 1 connection to run queries
        - Close the connection once done with a query
        - Execute code for connection every time a query is run (downside)
    2. Create a connection pool
        - Allows us to run multiple queries simultaneously
        - Pool is finished when application shuts down
```js
const mysql = require("mysql2");

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'node-complete'
})

module.exports = pool.promise()
```
- Import the file to ``app.js``
```js
const db = require('./util/database')
```
- ``db.end()`` is used when we want to end the pool on application close
- ``db.execute()`` will be used for queries when can use SQL commands
```js
db.execute('SELECT * FROM products')
```
- The SQL code can be created in the node app, or using something like MySQL Workbench:
```sql
CREATE TABLE `node-complete`.`products` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `price` DOUBLE NULL,
  `description` TEXT NOT NULL,
  `imageUrl` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
```
- Promises are a javascript object that allow us to work with asynchronous code
    - because we are using a promise (``module.exports = pool.promise()``), we can use ``.then()`` and ``.catch()``
    - ``.then()`` and ``.catch()`` take the place of anonymous functions making our code more readable
```js
db.execute("SELECT * FROM products")
  .then((result) => {
    console.log(result[0], result[1]);
  })
  .catch((err) => {
    console.log(err);
  });
```
- ``.then()`` and ``.catch()`` are functions we can chain onto the result of the ``execute`` call

### Fetching Products
- We no longer need ``fs`` and ``path`` modules since we won't be reading files and using our on paths when working with databases
- We'll be updating our models and controllers:
```js
// models/product.js
const db = require("../util/database");

const Cart = require("./cart");

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {}

  static deleteById(id) {}

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findById(id) {}
};
```
```js
// controllers/shop.js
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows]) => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/index", {
        prods: rows,
        pageTitle: "Shop",
        path: "/shop",
      });
    })
    .catch((err) => console.log(err));
};
```

### Inserting Data Into the Database
```js
  save() {
    return db.execute(
      "INSERT INTO products (title,price,imageUrl, description) VALUES (?,?,?,?)",
      [this.title, this.price, this.imageUrl, this.description]
    );
  }
```
- We use ``VALUES (?,?,?,?)`` to avoid SQL injections using hidden commands on our end as an extra security layer
```js
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, price, description);
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};
```

### Fetching a Single Product with the "where" Condition
```js
  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }
```
- We again use ``?`` to allow MySQL to inject the value
```js
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(([product]) => {
      res.render("shop/product-details", {
        product: product[0],
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};
```

### Wrap up
- Learn more about MySQL/ SQL in General: https://www.w3schools.com/sql/
- Learn more about the Node MySQL Package: https://github.com/sidorares/node-mysql2