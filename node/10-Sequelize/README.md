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
- Behind the scenes, Sequelize will do something similar to what we already have in ``database.js``:
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

### Syncing JS Defintions to the Database
- Our goal is to ensure all our Models are transferred into tables whenever we start our app
- First we import sequelize from our ``util`` to ``app.js``:
```js
const sequelize = require("./util/database");
```
- Then we use the ``.sync()`` method which sync our models to the database by creating the appropriate tables
```js
sequelize
  .sync()
  .then((result) => {
    console.log(result);
    app.listen(3000);
  })
  .catch((err) => console.log(err));
```
- We will only start the server if the ``.sync()`` runs without error
- When running the app, under the hood sequelize runs SQL commands:
```bash
Executing (default): SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = 'products' AND TABLE_SCHEMA = 'node-complete'
Executing (default): CREATE TABLE IF NOT EXISTS `products` (`id` INTEGER NOT NULL auto_increment , `title` VARCHAR(255), `price` DOUBLE PRECISION NOT NULL, `imageUrl` VARCHAR(255) NOT NULL, `description` VARCHAR(255) NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `products`
```
- It checks if the table exists, if it does then the table won't be replaced and the app will run. If the table doesn't exist, then one will be created

### Inserting Data and Creating a Product
- We need to update ``postAddProduct`` to change the way we add products
- We were creating a new product from the ``Product`` class:
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
- Instead, we can use sequelize to create a new product with the ``.create()`` method:
```js
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  })
    .then((result) => console.log("Created a Product"))
    .catch((err) => console.log(err));
};
```

### Retrieving Data and Finding Products
- We have to replace our old ``fetchAll()`` method as ``Sequelize`` does not have a ``fetchAll`` method:
```js
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
- Instead we can use ``findAll`` which can be configured with options as the other Sequelize methods have been configured
- For now, we use ``findAll`` without any constraints:
```js
exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/shop",
      });
    })
    .catch((err) => console.log(err));
};
```
- With Sequelize v5, ``findById()`` was replaced by ``findByPk()``.
- You use it in the same way, so you can simply replace all occurrences of ``findById()`` with ``findByPk()``
- We do not get an array, so we don't have to destructure in the ``.then()`` block or use ``product[0]``
```js
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      res.render("shop/product-details", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};
```
- Alternatively, we can use ``.findAll()`` using a ``where`` argument... the return here will be an array:
```js
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findAll({ where: { id: prodId } })
    .then((products) => {
      res.render("shop/product-details", {
        product: products[0],
        pageTitle: products[0].title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};
```
- We make the same changes to ``admin.js``:
```js
exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};
```

### Updating Products
```js
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};
```
- Without ``.save()``, this only changes the product locally and not on the database:
```js
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  Product.findByPk(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDescription;
      return product.save();
    })
    .then((result) => {
      console.log("Updated Product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/admin/products");
    });
};
```
- Adding a return for the first ``then`` block allows a second ``then`` block
    - if ``res.redirect`` is not in the second ``then`` block, the page won't update until refreshed
        - this is because the ``res.redirect`` will happen before the second ``then`` block is executed
    - the ``catch`` block will catch errors for both promises

### Deleting Products
- There is a ``destroy`` method that can be added to ``Product`` which can take arguments, but we can just use ``findByPk`` and then ``destroy`` in the ``then`` block:
```js
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((product) => product.destroy())
    .then((result) => {
      console.log("Destroyed");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
```

### Creating a User Model
```js
const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
});

module.exports = User;
```

### Adding a One-To-Many Relationship
**Associations**
- Associations or relations are a way of connecting models
    - A ``Product`` can belong to multiple ``Carts``
    - A ``User`` can only have 1 ``Cart``
    - A ``Product`` can be a part of multiple ``Orders``
    - A ``User`` can have multiple ``Orders``

- Before we ``sync``, we can import models to ``app.js`` and relate them:
```js
const Product = require('./models/product')
const User = require('./models/user')

Product.belongsTo(User, {contraints:true, onDelete: 'CASCADE'})
User.hasMany(Product)

sequelize
  .sync({force: true})
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
```
- We use ``.sync({force: true})`` to create new tables and override the old information
    - this is not something you want to use in production
```bash
Executing (default): DROP TABLE IF EXISTS `products`;
Executing (default): DROP TABLE IF EXISTS `users`;
Executing (default): SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'products' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='node-complete' AND REFERENCED_TABLE_NAME IS NOT NULL;
Executing (default): SELECT CONSTRAINT_NAME as constraint_name,CONSTRAINT_NAME as constraintName,CONSTRAINT_SCHEMA as constraintSchema,CONSTRAINT_SCHEMA as constraintCatalog,TABLE_NAME as tableName,TABLE_SCHEMA as tableSchema,TABLE_SCHEMA as tableCatalog,COLUMN_NAME as columnName,REFERENCED_TABLE_SCHEMA as referencedTableSchema,REFERENCED_TABLE_SCHEMA as referencedTableCatalog,REFERENCED_TABLE_NAME as referencedTableName,REFERENCED_COLUMN_NAME as referencedColumnName FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'users' AND CONSTRAINT_NAME!='PRIMARY' AND CONSTRAINT_SCHEMA='node-complete' AND REFERENCED_TABLE_NAME IS NOT NULL;
Executing (default): DROP TABLE IF EXISTS `products`;
Executing (default): DROP TABLE IF EXISTS `users`;
Executing (default): DROP TABLE IF EXISTS `users`;
Executing (default): CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(255), `email` VARCHAR(255), `createdAt` DATETIME NOT NULL,
`updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `users`
Executing (default): DROP TABLE IF EXISTS `products`;
Executing (default): CREATE TABLE IF NOT EXISTS `products` (`id` INTEGER NOT NULL auto_increment , `title` VARCHAR(255), `price` DOUBLE PRECISION NOT NULL, `imageUrl` VARCHAR(255) NOT NULL, `description` VARCHAR(255) NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `userId` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `products`
```
- docs: https://sequelize.org/docs/v6/moved/associations/