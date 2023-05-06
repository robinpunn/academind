## Working with Express.js

---
### Table of Contents
1. [What is Express?](#what-is-express)
    - [Alternatives to Express.js](#alternatives-to-expressjs)
1. [Installing Express.js](#installing-expressjs)
    - [Express Source Code](#express-source-code)
1. [Adding Middleware](#adding-middleware)
1. [How Middleware Works](#how-middleware-works)
1. [Express.js Looking Behind the Scenes](#expressjs-looking-behind-the-scenes)
1. [Handling Different Routes](#handling-different-routes)
1. [Parsing Incoming Requests](#parsing-incoming-requests)
1. [Limiting Middleware Execution to POST Requests](#limiting-middleware-execution-to-post-requests)
1. [Using Express Router](#using-express-router)
1. [Adding a 404 Error Page](#adding-a-404-error-page)
1. [Filtering Paths](#filtering-paths)
1. [Creating HTML Pages](#creating-html-pages)
1. [Using a Helper Function for Navigation](#using-a-helper-function-for-navigation)
1. [Serving Files Statically](#serving-files-statically)
1. [Wrap Up](#wrap-up)
---

### What is Express?
- Server logic is complicated as there are many steps involved in parsing an incoming request
- Express.js makes the process easier by allowing the isntall of other packages
- Express.js allows us to focus on the business logic rather than the nitty-gritty details
- Express.js is a framework of nodejs
    - A framework is a set of helper functions, tools, and rules that help you build your application

#### Alternatives to Express.js
- **Vanilla Node.js** - depending on the complexity of your application, Node.js could be all you need
- **Adonis.js** - a laravel inspired nodejs framework
- **Koa**, **Sails.js**, and many more...
- Express.js is by far the most popular
    - It is very flexible and doesn't add too much functionality out of the box
    - There are many third party libraries built specifically for express which is what makes it very appealing

### Installing Express.js
```bash
npm instal --save express
```
- We use ``--save`` because express will be a production dependency

```js
const express = require("express");

const app = express();

const server = http.createServer(app)
```


#### Express Source Code
- VS Code allows us to ``control + click`` on the express import and takes us to the source code:
```js
// Type definitions for Express 4.17
// Project: http://expressjs.com
// Definitions by: Boris Yankov <https://github.com/borisyankov>
//                 China Medical University Hospital <https://github.com/CMUH>
//                 Puneet Arora <https://github.com/puneetar>
//                 Dylan Frankland <https://github.com/dfrankland>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/* =================== USAGE ===================

    import express = require("express");
    var app = express();

 =============================================== */

/// <reference types="express-serve-static-core" />
/// <reference types="serve-static" />

import * as bodyParser from 'body-parser';
import * as serveStatic from 'serve-static';
import * as core from 'express-serve-static-core';
import * as qs from 'qs';

/**
 * Creates an Express application. The express() function is a top-level function exported by the express module.
 */
declare function e(): core.Express;

declare namespace e {
    /**
     * This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
     * @since 4.16.0
     */
    var json: typeof bodyParser.json;

    /**
     * This is a built-in middleware function in Express. It parses incoming requests with Buffer payloads and is based on body-parser.
     * @since 4.17.0
     */
    var raw: typeof bodyParser.raw;

    /**
     * This is a built-in middleware function in Express. It parses incoming requests with text payloads and is based on body-parser.
     * @since 4.17.0
     */
    var text: typeof bodyParser.text;

    /**
     * These are the exposed prototypes.
     */
    var application: Application;
    var request: Request;
    var response: Response;

    /**
     * This is a built-in middleware function in Express. It serves static files and is based on serve-static.
     */
    var static: serveStatic.RequestHandlerConstructor<Response>;

    /**
     * This is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
     * @since 4.16.0
     */
    var urlencoded: typeof bodyParser.urlencoded;

    /**
     * This is a built-in middleware function in Express. It parses incoming request query parameters.
     */
    export function query(options: qs.IParseOptions | typeof qs.parse): Handler;

    export function Router(options?: RouterOptions): core.Router;

    interface RouterOptions {
        /**
         * Enable case sensitivity.
         */
        caseSensitive?: boolean | undefined;

        /**
         * Preserve the req.params values from the parent router.
         * If the parent and the child have conflicting param names, the child’s value take precedence.
         *
         * @default false
         * @since 4.5.0
         */
        mergeParams?: boolean | undefined;

        /**
         * Enable strict routing.
         */
        strict?: boolean | undefined;
    }

    interface Application extends core.Application {}
    interface CookieOptions extends core.CookieOptions {}
    interface Errback extends core.Errback {}
    interface ErrorRequestHandler<
        P = core.ParamsDictionary,
        ResBody = any,
        ReqBody = any,
        ReqQuery = core.Query,
        Locals extends Record<string, any> = Record<string, any>
    > extends core.ErrorRequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> {}
    interface Express extends core.Express {}
    interface Handler extends core.Handler {}
    interface IRoute extends core.IRoute {}
    interface IRouter extends core.IRouter {}
    interface IRouterHandler<T> extends core.IRouterHandler<T> {}
    interface IRouterMatcher<T> extends core.IRouterMatcher<T> {}
    interface MediaType extends core.MediaType {}
    interface NextFunction extends core.NextFunction {}
    interface Locals extends core.Locals {}
    interface Request<
        P = core.ParamsDictionary,
        ResBody = any,
        ReqBody = any,
        ReqQuery = core.Query,
        Locals extends Record<string, any> = Record<string, any>
    > extends core.Request<P, ResBody, ReqBody, ReqQuery, Locals> {}
    interface RequestHandler<
        P = core.ParamsDictionary,
        ResBody = any,
        ReqBody = any,
        ReqQuery = core.Query,
        Locals extends Record<string, any> = Record<string, any>
    > extends core.RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> {}
    interface RequestParamHandler extends core.RequestParamHandler {}
    interface Response<
        ResBody = any,
        Locals extends Record<string, any> = Record<string, any>
    > extends core.Response<ResBody, Locals> {}
    interface Router extends core.Router {}
    interface Send extends core.Send {}
}

export = e;
```
- This is a typescript file that exports a function allowing us to initialize a new object
    - Express.js stores and manages a lot of things for us behind the scenes

### Adding Middleware
- Express.js is all about middleware
- The app runs from top to bottom
```bash
Request ->

Middleware (req,res,next) => {...} ->
next()

Middleware (req,res,next) => {...} ->
res.send()

Response ->
```
- The nature of Express is that we can add middleware packages that give us middleware functions
```js
app.use()
```
- We call ``app.use`` after invoking express and before creating the server
- ``app.use`` allows us to use middleware functions, it accepts an array of request handlers
```js
app.use(() => {});
```
- The function passed to ``app.use()`` will be executed for every incoming request
```js
app.use((req,res,next) => {});
```
- ``app.use()`` takes three arguments that we can name as we choice
    - request, response, and next
    - next is a function that must be executed in order to travel onto the next middleware

**Calling next allows the request to continue**
```js
app.use((req, res, next) => {
  console.log("In the middleware");
});

app.use((req, res, next) => {
  console.log("In another middleware");
});

// 'In the middleware'
```
```js
app.use((req, res, next) => {
  console.log("In the middleware");
  next(); // Allows the request to continue to the next middleware in line
});

app.use((req, res, next) => {
  console.log("In another middleware");
});

// 'In the middleware'
// 'In another middleware'
```

### How Middleware Works
- We can still use ``res.write`` or ``res.setHeader``, but express gives us a new utility function ``res.send()``
    - We are can now attach a body of type any
```js
res.send(new Buffer('wahoo'));
res.send({ some: 'json' });
res.send('<p>some html</p>');
res.status(404).send('Sorry, cant find that');
```
- Using ``res.send()`` ends the process and won't run another middleware

### Express.js Looking Behind the Scenes
- [Express.js repo](https://github.com/expressjs/express)
- [response.js](https://github.com/expressjs/express/blob/master/lib/response.js)
- [application.js](https://github.com/expressjs/express/blob/master/lib/application.js)

**How express analyzes type of data**
```js
switch (typeof chunk) {
    // string defaulting to html
    case 'string':
      if (!this.get('Content-Type')) {
        this.type('html');
      }
      break;
    case 'boolean':
    case 'number':
    case 'object':
      if (chunk === null) {
        chunk = '';
      } else if (Buffer.isBuffer(chunk)) {
        if (!this.get('Content-Type')) {
          this.type('bin');
        }
      } else {
        return this.json(chunk);
      }
      break;
  }
```

**Shorten code to create server**
```js
const server = http.createServer(app);

server.listen(3000);
```
```js
// shortened code
app.listen(3000);
```

**How listen works under the hood**
```js
app.listen = function listen() {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};
```

### Handling Different Routes
- [``app.use([path,] callback [, callback...])``](http://expressjs.com/en/4x/api.html#app.use)
- optional first argument, ``path``
- default ``'/'`` (root path)
- The path for which the middleware function is invoked; can be any of:
    - A string representing a path.
    - A path pattern.
    - A regular expression pattern to match paths.
    - An array of combinations of any of the above.

- Callback functions; can be:
    A middleware function.
    A series of middleware functions (separated by commas).
    An array of middleware functions.
    A combination of all of the above.

- Because of the way the path argument works in looking for matches, ``/users`` will never be parsed using this order:
```js
app.use("/", (req, res, next) => {
  console.log("the home page");
  res.send("<h1>The title</h1>");
});

app.use("/users", (req, res, next) => {
  console.log("the user page");
  res.send("<ul><li>User 1</li><li>User 2</li><li>User 3</li></ul>");
});
```
- Because there is no ``next()``, ``'/users'`` will never be parsed.
- The path argument also looks for exact matches, and a single ``'/'`` can be applied to any path.
    - in this case, because of the placement of the code, ``'the home page'`` will be the only thing that is parsed
- The order matters and placing users first will produce the expected behavior:
```js
app.use("/users", (req, res, next) => {
  console.log("the user page");
  res.send("<ul><li>User 1</li><li>User 2</li><li>User 3</li></ul>");
});

app.use("/", (req, res, next) => {
  console.log("the home page");
  res.send("<h1>The title</h1>");
});
```

### Parsing Incoming Requests
**redirect(url: string): void**
    - Redirect to the given url with optional response status defaulting to 302.
    - The resulting url is determined by res.location(), so it will play nicely with mounted apps, relative paths, "back" etc.
- Examples:
    - res.redirect('back');
    - res.redirect('/foo/bar');
    - res.redirect('http://example.com');
    - res.redirect(301, 'http://example.com');
    - res.redirect('http://example.com', 301);
    - res.redirect('../login'); // /blog/post/1 -> /blog/login

**body-parser**
- should be available out of the box with express, however; it has been removed before
- recommended approach is to use third party library
```bash
npm install --save body-parser
```
```js
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
```
- best to place this before other middleware
- doesn't parse all types of files, this is used for things like forms
- ``{extended: false}`` due to bodyParser contructor being [deprecated](https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4)

### Limiting Middleware Execution to POST Requests
- ``use()`` works with all http methods
**app.get()**
- just as ``path`` is a form of filtering, ``app.get()`` is a form of filtering for get requests
**app.post()**
- filtering for ``post`` requests

### Using Express Router
- When an app gets large enough, it is a good idea to split routing code into multiple files
- With Express, placing routing logic into a ``routes`` folder is standard practice

```js
// admin.js
const express = require('express');
const router = express.Router();

router.get("/addproduct", (req, res, next) => {
  res.send(...);
});

router.post("/product", (req, res, next) => {
  res.redirect("...");
});

module.exports = router
```
- Router is like a mini express app which can be exported

```js
// app.js
{...}
const adminRoutes = require('./routes/admin');
{...}
app.use(adminRoutes)
{...}
```
- importing the route file requires a relative path to the routes folder (the ``.js`` extension can be omitted)
- router is a valid middleware function so it can be used as an argument in ``app.use()``
- the order matters, so placing ``app.use(adminRoutes)`` after a ``res.send()`` means ``app.use(adminRoutes)`` will never be executed

**exact matching**
- When using paths, ``.use()`` does not use exact matching, so the order is important when arranging code as some code may be skipped if placed incorrectly
- other methods like ``.get()`` and ``.post()`` use exact matching for paths

### Adding a 404 Error Page
- We add a 'catch all' middleware at the bottom that doesn't require a path (default path is ``'/'``)
```js
app.use((req, res, next) => {
  res.status(404).send("<h1>Page not found</h1>");
});
```
- we can change the ``status`` method before any ``send`` method.
    - if chained, ``send`` has to be the last method (it can't be in the middle of a chain)

### Filtering Paths
- The same path can be used with different methods
```js
// admin.js
router.get('/add-product'...)
router.post('/add-product'...)
```
- we can 'strip out' the path from the file and add it to ``app.js`` as a filter
```js
// app.js
app.use('/admin', adminRoutes)
```
- Implicitly, these routes are now reached with ``'/admin'`` path
```js
// admin.js
router.get('/add-product'...) // /admin/add-product => GET
router.post('/add-product'...) // /admin/add-product => POST
```

### Creating HTML Pages
- In the ``Model View Controller`` format, we use a ``views`` folder to manage what we serve to the user
**res.sendFile**
- sendFile(path: string, fn?: Errback | undefined): void
    - Transfer the file at the given path.
    - Automatically sets the Content-Type response header field. The callback fn(err) is invoked when the transfer is complete or when an error occurs.
        - Be sure to check res.headersSent if you wish to attempt responding, as the header and some data may have already been transferred.
- Options:
    - **maxAge** defaulting to 0 (can be string converted by ms)
    - **root** root directory for relative filenames
    - **headers** object of headers to serve with file
    - **dotfiles** serve dotfiles, defaulting to false; can be "allow" to send them
- Other options are passed along to send.
*Examples*
- The following example illustrates how res.sendFile() may be used as an alternative for the static() middleware for dynamic situations.
- The code backing res.sendFile() is actually the same code, so HTTP cache support etc is identical.
```js
app.get('/user/:uid/photos/:file', function(req, res){
  var uid = req.params.uid
    , file = req.params.file;

  req.user.mayViewFilesFrom(uid, function(yes){
    if (yes) {
      res.sendFile('/uploads/' + uid + '/' + file);
    } else {
      res.send(403, 'Sorry! you cant see that.');
    }
  });
});
```
- Using either one of these syntaxes will throw an error:
```js
router.get("/", (req, res, next) => {
  res.sendFile("/views/shop.html");
});

router.get("/", (req, res, next) => {
  res.sendFile("./views/shop.html");
});
```
- We can use a core module from node, ``path``, to help with using a path with send file
```js
const path = require('path');

router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, '../','views', 'shop.html'));
});
```
- ``join(...paths: string[])``: string
    - paths to join.
    - Join all arguments together and normalize the resulting path.
    - @throws - {TypeError} if any of the path segments is not a string.
- ``__dirname`` is a global variable that holds the absolute path on our OS to the project folder

### Using a Helper Function for Navigation
- instead of using ``__dirname``, we can use a helper function that points to the root directory
```js
 const path = require('path')

 module.exports = path.dirname(require.main.filename);
```

- ``dirname(path: string)``: string
    - the path to evaluate.
    - Return the directory name of a path. Similar to the Unix dirname command.
    - @throws - {TypeError} if path is not a string.

- We can import the utility function to the desired file
```js
const rootDir = require('../util/path')

router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});
```
- The helper function is a cleaner approach that using ``__dirname`` and should work on all operating systems

### Serving Files Statically
- Normally, we would point to our css files when app gets served
- the convention is to use a folder call ``public``
```js
app.use(express.static(path.join(__dirname, "public")));
```
- This is a built-in middleware function in Express.
    - It serves static files and is based on serve-static.
    - It allows us to grant read-access to a folder

### Wrap up
**What is Express.js?**
- Express.js is a node framework - a package that adds a bunch of utility functions and tools and a clear set of rules on how the app should be built (middleware)
- It's highly extensible and other packages can be plugged into it (middleware)

**Middleware, next(), and res()**
- Express.js relies heavily on middleware functions - you can easily add them by calling ``use()``
- Middleware functions handle a request and should call ``next()`` to forward the request to the next function in line or send a response
- Unless you're sending a request, you should always call ``next()``
    - if you are calling ``res()``, then don't call ``next()``

**Routing**
- You can filter requests by path and method
- If you filter by method, paths are matched exactly, otherwise, the first segment of a URL is matched
- You can use express.Router to split your routes across files elegantly

**Serve Files**
- You are not limited to serving dummy text as a response
- You can send files to your users - e.g. HTML files
- If a request is directly made for a file (e.g. a .css file is requested), you can enable static serving for such files via ``express.static()``