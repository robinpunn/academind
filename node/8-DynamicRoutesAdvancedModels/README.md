## Dynamic Routes and Advanced Models

---
### Table of Contents
1. [Adding the Product Id to the Path](#adding-the-product-id-to-the-path)
---

### Adding the Product Id to the Path
- We need to create unique IDs for each item so when we try to edit or delete, we do so for the correct item
```js
module.exports = class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString()
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }
```
- For now we use ``Math.random()`` when we save the item. However, this method doesn't exactly garuntee a unique ID
- We can use the created ID in ``ejs`` like this:
```html
<a href="/products/<%= product.id %>" class="btn">Details</a>
```
- The next step is to be able to handle this unique id path in our routes

### Extracting Dynamic Params
- We can tell the express router that there will be some variable segment using ``:``
    - This signals to express that it should not look for a route
    - The part after the colon can be anything
```js
router.get("/products/:productId")
```
- The order is important, if there was a route like ``router.get("/products/delete")`` after ``:prdouctId``, it would never be reached
    - Put specific routes first before dynamic routes
- We have access to a ``params`` object that we can use to math with the ``:productId`` used with the router
```js
exports.getProduct = (req,res,next) => {
  const prodId = req.params.productId
}
```

### Loading Product Detail Data
- We can add a ``static`` function to the ``Product`` class:
```js
  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
```
- ``static`` allows us to call the function without creating a new instance of the class
- We can use the ``findById`` function with our controllers
```js
exports.getProduct = (req, res, next) => {
const prodId = req.params.productId;
Product.findById(prodId, (product) => {
    console.log(product);
});
res.redirect("/");
};
```

### Rendering the Product Detail View
- First we create the ``Ejs`` file:
```html
<%- include("../includes/head.ejs") %>
  </head>
  <body>
    <%- include("../includes/navigation.ejs") %>
    <main class="centered">
      <h1><%= product.title %></h1>
      <hr>
      <div>
        <img src="<%= product.imageUrl %>" alt="<%= product.title %>">
      </div>
      <h2><%= product.price %></h2>
      <p><% product.description %></p>
    </main>
<%- include("../includes/end.ejs") %>
```
- Then we add the path to our controller:
```js
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    res.render("shop/product-details", {
      product,
      pageTitle: product.title,
      path: "/products",
    });
  });
};
```