## Enhancing the App

---
### Table of Contents
1. [Creating the Shop Structure](#creating-the-shop-structure)
1. [Working on the Navigation](#working-on-the-navigation)
1. [Registering the Routes](#registering-the-routes)
1. [Storing Product Data](#storing-product-data)
1. [Editing and Deleting Products](#editing-and-deleting-products)
---

### Creating the Shop Structure
- ``res.render`` is relative to the views folder so here it looks for the ``shop`` file in the ``/views`` directory
```js
Product.fetchAll((products) => {
    res.render("shop", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
```
- This change is looking for the ``product-list`` file in the ``/views/shop`` directory
```js
Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
```
- ``path: "/"`` is related to the url that will be typed in the browser

### Working on the Navigation
- When updating the navigation, the ``path`` and ``href`` don't have to match, but the server will look at the path
```js
 <li class="main-header__item">
  <a class="<%= path === '/shop' ? 'active' : '' %>" href="/">Shop</a>
 </li>
<li class="main-header__item">
  <a class="<%= path === '/products' ? 'active' : '' %>" href="/"
    >Products</a
  >
</li>
<li class="main-header__item">
  <a class="<%= path === '/cart' ? 'active' : '' %>" href="/">Cart</a>
</li>
<li class="main-header__item">
  <a
    class="<%= path === '/admin/add-product' ? 'active' : '' %>"
    href="/admin/add-product"
    >Add Product</a
  >
</li>
<li class="main-header__item">
  <a
    class="<%= path === '/admin/products' ? 'active' : '' %>"
    href="/admin/products"
    >Admin Products</a
  >
</li>
```

### Registering the Routes
- Our goal is to organize files based on their purpose so we can group routes into admin and shop
- We can start by grouping controllers into admin and shop files
```js
// admin.js
const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};

// shop.js
const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", { path: "/cart", pageTitle: "Cart" });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
```
- Then we can use the controllers to create routes
```js
// admin.js
const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/add-product", adminController.getAddProduct);
router.post("/add-product", adminController.postAddProduct);
router.get("/products", adminController.getProducts);

module.exports = router;

// shop.js
const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);
router.get("/products", shopController.getProducts);
router.get("/cart", shopController.getCart);
router.get("/checkout", shopController.getCheckout);

module.exports = router;
```

### Storing Product Data
- We can start by adding more properties to the ``Product`` constructor
```js
module.exports = class Product {
  constructor(title, imageURL, price, description) {
    this.title = title;
    this.imageURL = imageURL;
    this.description = description;
    this.price = price;
  }
```
- Because we're using HTML and the ``name`` selector, all of the form data should be automatically sent to the backend request
```html
<form class="product-form" action="/admin/add-product" method="POST">
      <div class="form-control">
        <label for="title">Title</label>
        <input type="text" name="title" id="title" />
      </div>
      <div class="form-control">
        <label for="imageUrl">Image Url</label>
        <input type="text" name="imageUrl" id="imageUrl" />
      </div>
      <div class="form-control">
        <label for="price">Price</label>
        <input type="number" name="price" id="price" />
      </div>
      <div class="form-control">
        <label for="price">Description</label>
        <textarea name="description" id="description" rows="5"></textarea>
      </div>
      <button class="btn" type="submit">Add Product</button>
</form>
```
- All of the above data should be extractable by the names that have been assigned
```js
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, price, description);
  product.save();
  res.redirect("/");
};
```
- Make sure the order of the arguments is the same or there could be issues when rendering
```js
constructor(title, imageUrl, price, description) {...}
...
const product = new Product(title, imageUrl, price, description);
```

### Editing and Deleting Products
- To start we need to add ``post`` requests to some buttons:
```js
// product-list.ejs
<form action="/add-to-cart" method="POST">
  <button class="btn" type="submit">Add to Cart</button>
</form>

// products.ejs
<form action="/admin/delete-product" method="POST">
  <button class="btn" type="submit">Delete</button>
</form>
```
- We need to implement logic as the ``action`` should be targeting specific items, so this is just to start
- We can also use a link for the ``edit`` button:
```js
<a href="/admin/edit-product" class="btn">Edit</a>
```

