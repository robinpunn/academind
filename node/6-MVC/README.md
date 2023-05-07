## The Model View Controller (MVC)

---

### Table of Contents

1. [What is the MVC](#what-is-the-mvc)
1. [Adding Controllers](#adding-controllers)
1. [Adding a Product Model](#adding-a-product-model)
1. [Storing Data in Files via the Model](#storing-data-in-files-via-the-model)
1. [Module Summary](#module-summary)
---

### What is the MVC?

- The idea of MVC is the separation of concerns making sure different parts of
  your code do different things

**Models**

- Represent data in your code and allows you to work with data
  - save, fetch, etc.

**Views**

- What the user sees, content rendered by HTML decoupled from application code

**Controllers**

- Connecting your models and you views.
- Contains the "in between" logic
- **Routes** define which controller code should execute

### Adding Controllers

- The idea is to put logic that connects view and models in controllers
- This code can be split up:

```js
// admin .js
router.get("/add-product", (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
});

router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});
```

- Remove the render logic into a controller, and export it the router

```js
// products.js
const products = [];

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
};

// admin.js
const productsController = require("../controllers/products");

router.get("/add-product", productsController.getAddProduct);
router.post("/add-product", productsController.postAddProduct);
```

### Adding a Product Model

- We can create a constructor function or a class to build off of

```js
// product.js
const products = [];

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    products.push(this);
  }

  static fetchAll() {
    return products;
  }
};

//products.js
const Product = require("../models/product");

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};
```

### Storing Data in Files via the Model

- We can use the `fs` module to store files

```js
const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");
const p = path.join(rootDir, "data", "products.json");

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      }
      cb(JSON.parse(fileContent));
    });
  }
};
```

- We use a call back function with `fetchAll` to avoid getting an error when we try to render the html

```js
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop", {
      prods: products,
      pageTitle: "Shop",
      path: "/shop",
    });
  });
};
```

- The callback function is used when we invoke `Product` in the `getProducts` controller

### Module Summary

**Model**
- Responsible for representing your data
- Responsible for managing your data (saving, fetching, ...)
- Doesn't matter if you manage data in memory, files, databases
- Contains data related logic

**View**
- What the user sees
- Shouldn't contain too much logic

**Controller**
- Connects model and view
- Should only make sure that the two can communicate (in both directions)

More on MVC: https://developer.mozilla.org/en-US/docs/Glossary/MVC