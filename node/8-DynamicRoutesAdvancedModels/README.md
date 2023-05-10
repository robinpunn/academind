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

### Passing Data with Post Requests
- We can display product information by getting the informaton out of the url
- We can pass information in the ``req.body`` by using a ``POST`` request
    - This is not possible for ``GET`` requests
- We can use hidden so the element isn't displayed via HTML but it is encoded in the ``POST``
```html
<form action="/cart" method="POST">
  <button class="btn" type="submit">Add to Cart</button>
  <input type="hidden" name="productId" value="<%= product.id %>" />
</form>
```
- We can extract the data from our controller
```js
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId; //productId is the 'name' given in out hidden input
  console.log(prodId);
  res.redirect("/cart");
};
```
- In cases where the ``product`` variable is not available globally such as when using a loop, it can be used like this:
```html
<%- include("../includes/add-to-cart.ejs", {product: product}) %>
```

### Adding a Cart Model
- We don't need to recreate the cart for every new object, so using a constructor isn't the best solution:
```js
module.exports = class Cart {
    constructor() {
        this.products = []
        this.totalPrice = 0
    }
}
```
- Because there will always be a cart in the application and we just want to manage the products, we can use a static method:
```js
    static addProduct(id) {
        // Fetch the previous cart
        // Analyze the cart => find existing products
        // Add new product or Increate quantity
    }
```
- The completed function should look like this:
```js
module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // Analyze the cart => find existing products
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // Add new product or Increate quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty++;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};
```
- Next we need to update the controllers with the new cart information
```js
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};
```

### Using Query Params
- To enable editing, we can add the contents of ``add-product.ejs`` to ``edit-product.ejs``
    - We don't really need ``add-product.ejs`` anymore
- We have to update the ``getAddProduct`` controller so it uses the new ``edit-product.ejs``
```js
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};
```
- And create an edit controller:
```js
exports.getEditProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
    editing: true
  });
};
```
- And add a route:
```js
router.get("/edit-product/:productId", adminController.getEditProduct);
```
- Our goal is to create a url that looks something like this when clicking on a product to edit:
```bash
http://localhost:3000/admin/edit-product/12345?edit=true&title=new
```
- Query parameters are separated by ``&``
- ``req.query`` is created and managed by express
```js
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  res.render("admin/edit-product", {
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
    editing: editMode,
  });
};
```

### Pre-Populating the Edit Product Page with Data
- We can use the ``Product`` model to give the ``getEditProduct`` the functionality we need:
```js
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product,
    });
  });
};
```
- We can add a conditonal to ``edit-product.ejs`` to change the ``Add`` button to ``Edit``:
```html
<button class="btn" type="submit"><% if(editing) { %>Update Product <% } else {%>Add Product<% } %></button>
...
<input type="text" name="title" id="title" value="<% if (editing) { %> <%=product.title%><% } %>"/>
```
- We can link to the edit page by dynamically adding the product id to the url:
```html
<a href="/admin/edit-product/<%= product.id %>?edit=true" class="btn">Edit</a>
```
- We also need a post request for the edit page:
```js
router.post("/edit-product");
```
- In our controllers, we want to replace the existing product, with the new edited product:
```js
exports.postEditProduct = (req,res,next) => {}
```

### Editing Product Data
- For our product class, we add an id argument
```js
module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  ...
}
```
- The save function is updated to check if the id exists
  - if it does, then the edited content will replace it
  - if it doesn't then the code runs as it was before:
```js
 save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
 }
```
- When creating a new Product in ``postAddProduct``, the initial id is set to ``null``:
```js
const product = new Product(null, title, imageUrl, price, description);
```
- We add a hidden input to ``edit-product.ejs`` to store existing product id so our controller can have access to the id:
```html
   <% if (editing) { %>
      <input type="hidden" value="<%= product.id %>" name="productId">
   <% } %>
```
- Update the edit controller to create a "new" Product to replace the edited product:
```js
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedPrice,
    updatedDescription
  );
  updatedProduct.save();
};
```