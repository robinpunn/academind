## Understanding Sequelize

---
### Table of Contents
1. [What is Sequelize](#what-is-sequelize)
---

### What is Sequelize
An Object-Relational Mapping Library
- It does all the "heavy lifting" in terms of the SQL code behind the scenes and maps it into JS objects with convenience methods
- We don't have to write SQL code, we just call the methods

**Models** 
- Sequelize allows us to define models

**Instances** 
- We can then instantiate these models and use things like utility methods with them

**Queries** 
- It allows us to run Queries relating back to the model we defined

**Associations**
- We can make associations between models

### Connecting to the Database
```bash
npm install --save sequelize
```
- Sequelize requires the ``mysql2`` library
- Behind the scenes, sequelize will do something similar to what we already have in ``database.js``:
```js
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: "node-complete",
});

module.exports = pool.promise();
```
- We replace the above with the following:
```js
const Sequelize = require("sequelize");

const sequelize = new Sequelize('name of db', 'username', 'password'{
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
```
- This creates a new sequelize object that will automatically connect to the database
- It is more than a database connection... it is a fully configured sequelize enviornment

### Defining a Model
- We will also replace the code in the ``Product`` model
```js
const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;
```
- sequlize docs: https://sequelize.org/docs/v6/getting-started/