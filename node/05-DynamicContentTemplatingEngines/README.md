<!-- prettier-ignore -->
## Working With Dynamic Content & Adding Templating Engines

---

### Table of Contents

1. [Sharing Data Across Requests & Users](#sharing-data-across-requests--users)
1. [Templating Engines](#templating-engines)
   - [Available Templating Engines](#available-templating-engines)
1. [Installing and Implementing PUG](#installing-and-implementing-pug)
1. [Outputting Dynamic Content](#outputting-dynamic-content)
1. [Adding A Layout](#adding-a-layout)
1. [Working with Handlebars](#working-with-handlebars)
1. [Working with EJS](#working-with-ejs)
1. [Useful Resources & Links](#useful-resources--links)
---

### Sharing Data Across Requests & Users

- We can change the way we export files to make sharing multiple files easier

```js
// admin.js
{...}
const router = express.Router();
{...}
module.exports = router;

// app.js
{...}
const adminRoutes = require("./routes/admin");
{...}
app.use("/admin", adminRoutes);
```

- Here we're just exporting router, so the above works
- To export multiples files, we can use `export.`

```js
// admin.js
{...}
const router = express.Router();
const products = [];

exports.routes = router;
exports.products = products;

// app.js
{...}
const adminData = require("./routes/admin");
{...}
app.use("/admin", adminData.routes);

// shop.js
{...}
const adminData = require("./admin");
{...}
router.get("/", (req, res, next) => {
  console.log(adminData.products);
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});
```

### Templating Engines

- You have an HTML template with blanks or placeholders
  - There is Node/ Express Content such as an array
  - A templating engines which understands a certain syntax scans the HTML
    template
  - The blanks/placeholders are replaced with HTML content such a list created
    from an array
- In the process above, the user never sees the template, just the final
  rendered HTML page

#### Available Templating Engines

- EJS, Pug(Jade), Handlebars... examples of templating engines each of which
  have different syntax and philosophies
- `EJS`: `<p><%= name %></p>`
  - Uses normal HTML and plain JavaScript in your templates
- `Pug`: `p #{name}`
  - Uses minimal HTML and a custom template lanugage
- `Handlebars`: `<p>{{name}}</p>`
  - Uses normal HTML and a custom template language

### Installing and Implementing PUG

```bash
npm install --save ejs pug express-handlebars
```

- [`app.set`](https://expressjs.com/en/5x/api.html#app.set)
  - set(setting: string, val: any): Express
    - Assign setting to val, or return setting's value.
    - app.set('foo', 'bar'); app.get('foo'); // => "bar" app.set('foo', ['bar',
      'baz']); app.get('foo'); // => ["bar", "baz"]
    - Mounted servers inherit their parent server's settings.
- `app.set()` allows us to set any values globally on our express app
- `view engine`
  - String: The default engine extension to use when omitted.
  - NOTE: Sub-apps will inherit the value of this setting.
- `views`
  - String or Array: A directory or an array of directories for the
    application's views. If an array, the views are looked up in the order they
    occur in the array.
  - process.cwd() + '/views'

```js
app.set("views engine", "pug"); // we want to compile dynamic templates with the pug engine
app.set("views", "views"); // where to find the templates
```

- PUG doesn't use HTML tags, but the tags will be added when compiled

```js
doctype html
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(http-equiv="X-UA-Compatible", content="IE=edge")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        title Document
    body
```

- Indentation matters when using PUG

```js
   body
        header.main-header
            nav.main-header__nav
                ul.main-header__item-list
                    li.main-header__item
                        a.active(href="/") Shop
                    li.main-header__item
                        a(href="/admin/add-product") Add Product
```

- `res.render()` is provided by `express.js` and it uses the default templating
  engine

```js
router.get("/", (req, res, next) => {
  res.render("shop"); // don't need to use 'shop.pug' because pug has been declared as templating engine
});
```

### Outputting Dynamic Content

- We can use `res.render` to pass an object to PUG

```js
router.get("/", (req, res, next) => {
  const products = adminData.products;
  res.render("shop", { prods: products, docTitle: "Shop" });
});
```

- The objects can be used in PUG with the following syntax

```js
title #{docTitle}
```

- We can conditionally render with if blocks

```js
    if prods.length > 0
        .grid
            each product in prods
                article.card.product-item
                    header.card__header
                        h1.product__title #{product.title}
                    .card__image
                        img(src="/images/book.png", alt="A Book")
                    .card__content
                        h2.product__price $19.99
                        p.product__description A really good book specifically designed for reading
                    .card__actions
                        button.btn Add to Cart
    else
        h1 No Products
```

- [Pug docs](https://pugjs.org/api/getting-started.html)

### Adding A Layout

- For repeated code, we can create a layout

```js
// layout.pug
doctype html
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(http-equiv="X-UA-Compatible", content="IE=edge")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        title #{pageTitle}
        link(rel="stylesheet", href="/css/main.css")
        block styles
    body
        header.main-header
            nav.main-header__nav
                ul.main-header__item-list
                    li.main-header__item
                        a(href="/") Shop
                    li.main-header__item
                        a(href="/admin/add-product") Add Product
        block content
```

- the `block` keyword is recognized by PUG and can be used as placeholder or
  hooks where other views can enter their content

```js
// 404.pug
extends layouts/main-layout.pug

block content
    main
        h1 Page not found!

// add-product.pug
extends layouts/main-layout.pug

block styles
    link(rel="stylesheet", href="/css/forms.css")
    link(rel="stylesheet", href="/css/product.css")

block content
    main
        form.product-form(action="/admin/add-product", method="POST")
            .form-control
                label(for="title") Title
                input(type="text", name="title")#title
            button.btn(type="submit") Add Product
```

- We can add a path pair to render conditionally based on the path used

```js
// admin.js
res.render("add-product", {
  pageTitle: "Add Product",
  path: "/admin/add-product",
});

// shop.js
res.render("shop", { prods: products, docTitle: "Shop", path: "/shop" });
```

- Then we can add the condition in the layout file

```js
// main-layout.pug
li.main-header__item
    a(href="/" class=(path === '/shop' ? 'active' : '')) Shop
li.main-header__item
    a(href="/admin/add-product" class=(path === '/admin/add-product' ? 'active' : '')) Add Product
```

### Working with Handlebars

- Unlike PUG, Handlebars isn't "built in", so there are extra steps in using it

```js
const expressHbs = require("express-handlebars");

app.engine("handlebars", expresHbs());
```

- They way to pass data into the engine doesn't change

```js
res.status(404).render("404", { pageTitle: "404 Error" });
res.render("add-product", {
  pageTitle: "Add Product",
  path: "/admin/add-product",
});
res.render("shop", { prods: products, pageTitle: "Shop", path: "/shop" });
```

- Invoking in the variable in the document is done with `{{}}`

```js
<title>{{[pageTitle]}}</title>
```

- Handlebars can only handle true or false logic in it's template, you we have
  to add the condition and pass it down

```js
res.render("shop", {
  prods: products,
  pageTitle: "Shop",
  path: "/shop",
  hasProducts: products.length > 0,
});
```

- Handlebars has a philosophy of less logic in the template, more logic in the
  server side code

```js
{{#if hasProducts }}
    <div class="grid">
        {{#each prods}}
            <article class="card product-item">
                <header class="card__header">
                    <h1 class="product__title">{{this.title}}</h1>
                </header>
                <div class="card__image">
                    <img src="/images/book.png" alt="A Book">
                </div>
                <div class="card__content">
                    <h2 class="product__price">$19.99</h2>
                    <p class="product__description">A very interesting book about so many even more interesting things!</p>
                </div>
                <div class="card__actions">
                    <button class="btn">Add to Cart</button>
                </div>
            </article>
        {{each}}
    </div>
{{else}}
    <h1>No Products Found</h1>
{{/if}}
```

- Handlebars doesn't have placeholders in the same way that PUG does

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{ pageTitle }}</title>
    <link rel="stylesheet" href="/css/main.css" />
    {{#if fromsCSS}}
        <link rel="stylesheet" href="/css/forms.css" />
    {{/if}}
    {{#if productCSS}}
        <link rel="stylesheet" href="/css/product.css" />
    {{/if}}
  </head>
  <body>
    <header class="main-header">
      <nav class="main-header__nav">
        <ul class="main-header__item-list">
          <li class="main-header__item"><a href="/">Shop</a></li>
          <li class="main-header__item">
            <a href="/admin/add-product">Add Product</a>
          </li>
        </ul>
      </nav>
    </header>
    {{{body}}}
  </body>
</html>
```

### Working with EJS

- Ejs is similar to PUG in that it is supported out of the box by express so
  there is no need to register the engine

```js
app.set("view engine", "ejs");
```

- Ejs like PUG uses if statements in the template, but it doesn't support
  layouts. Like Handlebars, Ejs uses HTML
- Using variables is similar to the other two with its own syntax

```js
<title><%= pageTitle %></title>
```

- We can write vanilla javacript code inside `<% %>`

```js
<% if (prods.length> 0) { %>
    <div class="grid">
        <article class="card product-item">
            <header class="card__header">
                <h1 class="product__title">Great Book</h1>
            </header>
            <div class="card__image">
                <img src="/images/book.png" alt="A Book" />
            </div>
            <div class="card__content">
                <h2 class="product__price">$19.99</h2>
                <p class="product__description">
                    A very interesting book about so many even more interesting
                    things!
                </p>
            </div>
            <div class="card__actions">
                <button class="btn">Add to Cart</button>
            </div>
        </article>
    </div>
<% } else { %>
    <h1>No Products Found </h1>
<% } %>
```

- While there is no layout feature with Ejs, there is the idea of partials

```html
<!--head.ejs-->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%= pageTitle %></title>
    <link rel="stylesheet" href="/css/main.css" />

    <!--404.ejs-->
    <%- include("includes/head.ejs") %>
  </head>
  <body>
    <header class="main-header">
      <nav class="main-header__nav">
        <ul class="main-header__item-list">
          <li class="main-header__item"><a href="/">Shop</a></li>
          <li class="main-header__item">
            <a href="/admin/add-product">Add Product</a>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <h1>Page not found</h1>
    </main>
  </body>
</html>
```
### Useful Resources & Links
- Pug Docs: https://pugjs.org/api/getting-started.html
- Handlebars Docs: https://handlebarsjs.com/
- EJS Docs: http://ejs.co/#docs