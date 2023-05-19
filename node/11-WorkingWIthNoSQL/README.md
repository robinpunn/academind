## Working with NoSQL and Using MongoDB

---
### Table of Contents
1. [What is MongoDB](#what-is-mongodb)
1. [Relations in NoSQL](#relations-in-nosql)
1. [Installing MongoDB Driver](#installing-mongodb-driver)
1. [Creating the Database Connection](#creating-the-database-connection)
1. [Fetching all Products](#fetching-all-products)
1. [Fetching a single Product](#fetching-a-single-product)
1. [Working on the Product model to edit our product](#working-on-the-product-model-to-edit-our-product)
1. [Deleting Products](#deleting-products)
1. [Fixing Add Product](#fixing-add-product)
1. [Creating a new user](#creating-a-new-user)
1. [Working on Cart Items and Orders](#working-on-cart-items-and-orders)
1. [Displaying Cart Items](#displaying-cart-items)
1. [Deleting Cart Items](#deleting-cart-items)
1. [Adding an Order](#adding-an-order)
1. [Module Summary](#module-summary)
---


### What is MongoDB
- MongoDB is a database solution/engine
    - it is short for 'Humongous' because it was created to store a large amount of data
**How it works**
- Like SQL, we create a server and the server can have multiple databases
    - In SQL, the database would have multiple tables
- With NoSQL, rather than tables, it uses collections
    - Inside the collections are documents
- MongoDB is schemaless meaning data entries don't have to have the same structure
    - This gives more flexibility as your app grows
- MongoDB uses BSON (binary JSON) to store data in collections:
```json
{
    "name": "Robin",
    "age": 36,
    "address": 
        {
            "City": "17"
        },
    "hobbies":[
        {"name": "Dog walking"},
        {"name": "Watching MMA"}
    ]
}
```
- Nesting is reffered to as embedded
    - City is embedded in address

### Relations in NoSQL
- Collections can contain duplicate data
    - Rather than matching by id like with SQL, relations can be created by embedding documents into other collections
- MongoDB is built to query data in the format that you need it as well as allow you to store in the format that you need it

**Relations - Options**
1. Nesting/Embedding is one option
1. References are another option
- When duplication of data is needed, using an embedded model would require updating every instance of the data
- You can related documents, but you don't have to (and you shouldn't do it too much or your queries become slow)

### Installing MongoDB Driver
- Create a database file
```js
//databse.js
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
require("dotenv").config();

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://robinpunn629:${process.env.PASSWORD}@cluster0.zcxs5hy.mongodb.net/?retryWrites=true&w=majority`
  )
    .then((client) => {
      console.log("connected");
      callback(client);
    })
    .catch((err) => console.log(err));
};

module.exports = mongoConnect;
```
- Create connections in app.js
```js
const mongoConnect = require("./util/database");

mongoConnect((client) => {
  console.log(client);
  app.listen(3000);
});
```

### Creating the Database Connection
- We have to refactor all of our files starting with the admin controller which uses the ``Product`` model
```js
// models/product.js
const mongoConnect = require('../util/database')

class Product {
  constructor(title,price,description,imageUrl) {
    this.title = title
    this.price = price
    this.description = description
    this.imageUrl = imageUrl
  }

  save(){

  }
}
```
- The way we have the connection to mongoDB currently, we would need to connect to it every time we performed an operation
- We adjust the ``database.js`` file so we can dynamically connect to the required database:
```js
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
require("dotenv").config();

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://robinpunn629:${process.env.PASSWORD}@cluster0.zcxs5hy.mongodb.net/?retryWrites=true&w=majority`
  )
    .then((client) => {
      console.log("connected");
      _db = client.db()
      callback(client);
    })
    .catch((err) => console.log(err));
};

const getDb = () => {
  if (_db) {
    return _db
  }
  throw 'No database found'
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb
```
- In our ``Product`` model, we can import the ``getDb`` function:
```js
const getDb = require('../util/database').getDb
```
- and update the ``save`` method:
```js
save() {
    const db = getDb();
    return db.collection("products")
      .insertOne(this)
      .then((results) => {
        console.log(results);
      })
      .catch((err) => console.log(err));
  }
```
- we update the ``postAddProduct`` controller:
```js
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, price, description, imageUrl);
  product
    .save()
    .then((result) => {
      console.log("Created a Product");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
```
- we can specify which database to connect to by adding it to the url which is empty by default and connects to ``test``:
```js
`mongodb+srv://robinpunn629:${process.env.PASSWORD}@cluster0.zcxs5hy.mongodb.net/shop?retryWrites=true&w=majority`
```
- we can also use the ``db`` method to connect to a different database than the one in the url:
```js
_db = client.db('shop2');
```
- docs: https://www.mongodb.com/docs/

### Fetching all Products
- We can use a mongoDB method called ``find`` which can be configured to use a filter to find specific products:
```js
  static fetchAll() {
    return db.collection('products').find()
  }
```
- ``find`` does not return a ``promise`` but a ``cursor``
    - a ``cursor`` is an object provided by mongoDB which allows us to go through our elements/documents step by step
- we can use ``twoArray`` if we know we have a limited amount of documents
```js
  static fetchAll() {
    return db.collection('products').find().toArray()
  }
```
- it is better to use pagination (covered later) for a large amount of documents
- we have to call the db just as in the ``save`` method:
```js
  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => console.log(err));
  }
```

### Fetching a single Product
- We use a similar approach but this time we use an object as an argument in ``find`` and use a function from mongoBD ``next``:
```js
  static findById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: prodId })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => console.log(err));
  }
```
- mongoDB uses an ``Object Id`` in BSON:
```json
_id: ObjectId('64652f4798cc2e2ebefd4f07')
```
- so we need to import mongodb and use the ``ObjectId`` class/method:
```js
.find({ _id: new mongodb.ObjectId(prodId) })
```

### Working on the Product model to edit our product
- We add a fifth optional argument to ``Product``:
```js
class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id
  }
```
- It's optional because whether or not it gets passed is dependant on the other functions created
- the ``save`` method can use two methods ``updateOne``(there's also an ``updateMany``) and ``insertOne``:
```js
    save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db
        .collection("products")
        .updateOne({ _id: new mongoDb.ObjectId(this._id) }, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then((results) => {
        console.log(results);
      })
      .catch((err) => console.log(err));
  }
```
- we use a special property name reserved by mongoDB ``$set`` where we describe the changes we want to make with the filter put in ``updateOne``
- ``$set`` could be used in a more verbose way if we wanted to only target some properties, but since we want to target all properties we use it as above rather than like this(example would only update title):
```js
updateOne({_id: new mongoDb.ObjectId(this._id)}, {$set: {title: this.title}})
```
- We change our old ``postEditProduct`` and use our ``Product`` model with the ``_id`` parameter:
```js
const mongoDb = require("mongodb");
const ObjectId = mongoDb.ObjectId;

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;

  const product = new Product(
    updatedTitle,
    updatedPrice,
     updatedDescription,
    updatedImageUrl,
    new ObjectId(prodId)
  );
  product
    .save()
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
- In ``postEditProduct`` the code can be simplified to only take and id as an argument rather than using the mongoDB class:
```js
  const product = new Product(
    updatedTitle,
    updatedPrice,
    updatedDescription,
    updatedImageUrl,
    prodId
  );
```
- But first, our ``Product`` constructor has to be updated:
```js
class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = new mongoDb.ObjectId(id);
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then((results) => {
        console.log(results);
      })
      .catch((err) => console.log(err));
  }
```

### Deleting Products
- First we add a method to ``Product``:
```js
    static deleteById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongoDb.ObjectId(prodId) })
      .then((result) => {
        console.log("Deleted");
      })
      .catch((err) => console.log(err));
  }
```
- Then update the controller:
```js
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, price, description, imageUrl);
  product
    .save()
    .then((result) => {
      console.log("Created a Product");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
```

### Fixing Add Product
- Because we added to the constructor, the add doesn't function as it should because we always enter the ``if`` block
- To fix it, we use a ternary in the constructor:
```js
this._id = id ? new mongoDb.ObjectId(id) : null;
```

### Creating a new user

```js
 const mongoDb = require("mongodb");
const getDb = require("../util/database").getDb;

const ObjectId = mongoDb.ObjectId;

class User {
  constructor(username, email) {
    (this.name = username), (this.email = email);
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }
}
```

### Working on Cart Items and Orders
- Our goal is to store a cart for every user
- With mongodb, we can use emebedded documents rather than a cart model since we have a 1:1 relation with users and carts
- So we can store cart items in the ``User`` model:
```js
  addToCart(product) {
    const updatedCart = { items: [{ ...product, quantity: 1 }] };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }
```
- Inside ``app.js`` we should create a new ``User`` class:
```js
app.use((req, res, next) => {
  User.findById("646596ff0de61917c652b5a9")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});
```
- We update our ``postCart`` controller:
```js
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
};
```
- With these changes, we don't clear the cart on each update:
```js
  addToCart(product) {
const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    const updatedCart = {
      items: updatedCartItems,
    };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }
```

### Displaying Cart Items
- We retrieve a database connection, extract an array of product IDs from this.cart.items, query the "products" collection in the database to find documents matching those IDs, and transform the retrieved products by adding a quantity property based on the matching productId from this.cart.items.
```js
  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map((i) => {
      return i.productId;
    });
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((i) => {
              return i.productId.toString() === p._id.toString();
            }),
          };
        });
      });
  }
```
- The final result is an array of modified product objects.
- Then we update the ``getCart`` controller:
```js
exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products,
      });
    })
    .catch((err) => console.log(err));
};
```

### Deleting Cart Items
```js
  deleteItemFromCart(productId) {
    const updatedCartItems = this.cart.items.filter(
      (item) => item.productId.toString() !== productId.toString()
    );
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedCartItems } } }
      );
  }
```
```js
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .delteItemFromCart(prodId)
    .then((result) => res.redirect("/cart"))
    .catch((err) => console.log(err));
};
```

### Adding an Order
```js
    addOrder() {
    const db = getDb();
    this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: {
            _id: new ObjectId(this._id),
            name: this.name,
            email: this.email,
          },
        };
        return db.collection("orders").insertOne(order);
      })
      .then((result) => {
        this.cart = { items: [] };
        return db
          .collection("users")
          .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: { items: [] } } }
          );
      });
  }
```
```js
exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .addOrder()
    .then((result) => res.redirect("/orders"))
    .catch((err) => console.log(err));
};
```

### Module Summary
**NoSQL/MongoDB**
- Alternative to SQL database
- No strict schemas, fewer relations
- You can use use schemas and referenced based relations if you want
- Often relations are created by embedding other documents/data

**Working with MongoDB**
- Use the official MongoDB driver
- Commands like ``insertOne()``, ``find()``, ``updateOne()``, and ``deleteOne()`` make CRUD operations very simple
- All operations are promise based so you can easily chain them for more complex flow