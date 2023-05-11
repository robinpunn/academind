## Dynamic Routes and Advanced Models

---
### Table of Contents
1. [Adding the Product Id to the Path](#adding-the-product-id-to-the-path)
1. [Extracting Dynamic Params](#extracting-dynamic-params)
1. [Loading Product Detail Data](#loading-product-detail-data)
1. [Rendering the Product Detail View](#rendering-the-product-detail-view)
1. [Passing Data with Post Requests](#passing-data-with-post-requests)
1. [Adding a Cart Model](#adding-a-cart-model)
1. [Using Query Params](#using-query-params)
1. [Pre-Populating the Edit Product Page with Data](#pre-populating-the-edit-product-page-with-data)
1. [Editing Product Data](#editing-product-data)
1. [Adding the Product-Delete Functionality](#adding-the-product-delete-functionality)
1. [Deleting Cart Items](#deleting-cart-items)
1. [Displaying Cart Items on the Cart Page](#displaying-cart-items-on-the-cart-page)
1. [Module Summary](#module-summary)
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

### Adding the Product-Delete Functionality
- First step is to start with a router
```js
router.post("/delete-product");
```
- We have a form in ``product.ejs`` where we can add a hidden input
```html
   <form action="/admin/delete-product" method="POST">
    <button class="btn" type="submit">Delete</button>
    <input type="hidden" value="<%= product.id %>" name="productId">
   </form>
```
- Next, we can start the controller:
```js
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
};
```
- But the bulk of the work is in creating a delete method in the ``Product`` model:
```js
  static deleteById(id) {
    getProductsFromFile((products) => {
      const updatedProducts = products.filter((prod) => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if (!err) {

        }
      });
    });
  }
```
- The empty if block will contain logic to remove from cart

### Deleting Cart Items
- add a static method to ``Cart``:
```js
  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find((prod) => prod.id === id);
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id !== id
      );
      updatedCart.totalPrice -= productPrice * productQty;

      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }
};
```
- update ``deleteById`` in ``Product``... have to import ``Cart``:
```js
const Cart = require("./cart");
{...}
static deleteById(id) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      const updatedProducts = products.filter((prod) => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }
```
- Create a controller to handle deleting:
```js
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect("/admin/products");
};
```

### Displaying Cart Items on the Cart Page
- Add a static function to ``Cart`` to get products added to cart:
```js
  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
```
- Update ``getCart`` in shop.js:
```js
exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (item of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === item.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: item, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
  });
};
```
- Update the ``cart.ejs`` file:
```html
<%- include("../includes/head.ejs") %>
  </head>
  <body>
    <%- include("../includes/navigation.ejs") %>
    <main>
      <% if (products.length > 0) { %>
        <ul>
          <% products.forEach(p => { %>
            <li><%= p.productData.title %> (<%= p.qty %>)</li>
          <% }) %>
        </ul>
      <% } else {%>
        <h1>No products in cart...</h1>
      <% } %>
    </main>
<%- include("../includes/end.ejs") %>
```
- Add controller to ``shop.js``:
```js
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};
```

### Module Summary
**Dynamic Routing**
- You can pass dynamic path segments by adding a ":" to the Express router path
- The name you add after ":" is the name by which you can extract the data on req.params
- Optional (query) parameters can also be passed
    - (?param=value&b=2) and extracted (req.query.myParam)

**More on Models**
- A cart was added - it holds static methods only
- You can interact between models (e.g. delete cart item if a product is deleted)
- Working with files for data storage is suboptimal for bigger amounts of data

**Official Routing Docs**: https://expressjs.com/en/guide/routing.html