## Improved Development Flow and Debugging

---

### Table of Contents
1. [Understanding NPM Scripts](#understand-npm-scripts)
1. [Installing 3rd Party Packages](#installing-3rd-party-packages)
1. [Global Features vs Core Modules vs Third-Party Modules](#global-features-vs-core-modules-vs-third-party-modules)
1. [Global & Local npm Packages](#global-&-local-npm-packages)
1. [Understanding different Types of Errors](#understanding-different-types-of-errors)
1. [Finding and Fixing Syntax Errors](#finding-and-fixing-syntax-errors)
1. [Dealing with Runtime Errors](#dealing-with-runtime-errors)
1. [Using the Debugger](#using-the-debugger)
1. [Restarting the Debugger Automatically After Editing our App](#restarting-the-debugger-automatically-after-editing-our-app)
    - [Changing Variables](#changing-variables)
1. [Summary](#summary)

---

### Understanding NPM Scripts
- npm: Node Package Manager
    - installed with Node.js
    - allows us to install third party packages
- initialize a project with npm
    ```bash
    npm init
    ```
    - creates a package.json file
    - contains information about the project
    - contains information about the dependencies
    - contains information about the scripts
- package.json:
    ```json
    {
        "name": "server",
        "version": "1.0.0",
        "description": "",
        "main": "app.js",
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "start": "node app.js",
            "start-server": "node app.js"
        },
        "author": "",
        "license": "ISC",
        "devDependencies": {
            "nodemon": "^2.0.22"
        }
    }
    ```
    - scripts are used to run custom commands:
        - start: the default script that is run when we run `npm start`
        - start-server: a custom script that we can run with `npm run start-server`
        - we can use any name for custom scripts without blanks or whitespaces
        - custom scripts require the `run` keyword

### Installing 3rd Party Packages
- Local project has your code and core packages
- Dependencies (3rd party packages) are not written by you, but functionality you add to your project
    - e.g. express, body-parser, mongoose, etc.
- The [npm repository](https://www.npmjs.com/) is cloud package repository
    - dependencies are installed to your project through npm
- install a package
    ```bash
    npm install <package-name>
    ```
- packages can be divided into production and development dependencies
    - production dependencies: packages that are required to run the application
    - development dependencies: packages that are required to develop the application
- install a development dependency
    ```bash
    npm install <package-name> --save-dev
    ```
- installing packages creates a node_modules folder
    - contains all the packages
    - contains all the dependencies
    - folder can be deleted and recreated with `npm install`
- the caret (^) in the package.json file indicates the version of the package
    - ^2.0.22: any version that starts with 2.0.22
    - ^2.0: any version that starts with 2.0
    - ^2: any version that starts with 2
    ```bash
    "devDependencies": {
        "nodemon": "^2.0.22"
    }
    ```

### Global Features vs Core Modules vs Third-Party Modules
- The last lectures contained important concepts about available Node.js features and how to unlock them.
- You can basically differentiate between:
    - **Global features**: Keywords like const or function but also some global objects like process
    - **Core Node.js Modules**: Examples would be the file-system module ("fs"), the path module ("path") or the Http module ("http")
    - **Third-party Modules**: Installed via ``npm install`` - you can add any kind of feature to your app via this way
- **Global features** are **always available**, you don't need to import them into the files where you want to use them.
- **Core Node.js Modules** don't need to be installed (**NO** ``npm install`` is required) but you **need to import them** when you want to use features exposed by them.
    - Example: ``const fs = require('fs');``
    - You can now use the ``fs`` object exported by the "fs" module.
- **Third-party Modules need to be installed** (via ``npm install`` in the project folder) **AND imported**.
    - Example (which you don't need to understand yet - we'll cover this later in the course):
        ```js
        // In terminal/ command prompt
        npm install --save express-session
        // In code file (e.g. app.js)
        const sessions = require('express-session');
        ```
### Global & Local npm Packages
- In the last lecture, we added ``nodemon`` as a local dependency to our project.
- The good thing about local dependencies is that you can share projects **without the node_modules** folder (where they are stored) and you can run ``npm install`` in a project to then re-create that node_modules folder.
    - This allows you to share only your source code, hence reducing the size of the shared project vastly.
- ``nodemon app.js`` would not work in the terminal or command line because we don't use local dependencies there but global packages.
- You could install ``nodemon`` globally if you wanted (this is NOT required though - because we can just run it locally): ``npm install -g nodemon`` would do the trick.
    - Specifically the ``-g`` flag ensures that the package gets added as a global package which you now can use anywhere on your machine, directly from inside the terminal or command prompt.

### Understanding different Types of Errors
- **Syntax Errorrs**
    - Errors related to typos or forgetting curly braces
    - Error should be thrown when trying to run project
- **Runtime Errors**
    - Breaking errors not related to typos
- **Logical Errors**
    - Erorrs related to logic that aren't apparent because they don't trigger errors

### Finding and Fixing Syntax Errors
- Syntax errors are usually not too difficult to fix
```js
cons server = http.createServer(routes.handler)
```
```bash
SyntaxError: Unexpected Identifier
```
- They will generally by typos, missing or extra characters. The nodejs compiler should identify where in the code the error is occuring.

### Dealing with Runtime Errors
- It's helpful to read what the error message is saying.
- It may be hard to understand or decipher what the error at the bottom of the message is saying.
- The start of the error message has a lot of useful information
```bash
node:_http_outgoing:603
    throw new ERR_HTTP_HEADERS_SENT('set');
    ^

Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    at new NodeError (node:internal/errors:387:5)
    at ServerResponse.setHeader (node:_http_outgoing:603:11)
    at Server.requestHandler (D:\Dev\academind\academind\node\3-ImprovedDevelopmentWorkflowAndDebugging\node-server\routes.js:33:7)
    at Server.emit (node:events:513:28)
    at parserOnIncoming (node:_http_server:980:12)
    at HTTPParser.parserOnHeadersComplete (node:_http_common:128:17) {
  code: 'ERR_HTTP_HEADERS_SENT'
}
```

### Logical Errors
- The types of errors will usually not cause an error message but cause the app to behave unexpectedly
- Nodejs has a well integrated debugger with Visual Studio code
    - We can use visial studio code to set points where code should pause when using the debugger

### Using the Debugger
- We can move in and out of code with the debugger options
- we can enter code into the console to view what the value is
    - This can be helpful when trying to figure out why we aren't getting the desired behavior
    ```js
    parsedBody.split('=')
    (2) ['message', 'jk+lol+omh']
    ```

### Restarting the Debugger Automatically After Editing our App
- There are various dropdowns we can access in the debugg menu
    - Local
    - Block
    - Closure
    - Global
- We can run operations on variables in the console to look into its behaviour
- We can add configuration to the debugger so it is conintuous using nodemon:
    ```js
    {
        // Use IntelliSense to learn about possible attributes.
        // Hover to view descriptions of existing attributes.
        // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
        "version": "0.2.0",
        "configurations": [
            {
                "type": "node",
                "request": "launch",
                "name": "Launch Program",
                "skipFiles": [
                    "<node_internals>/**"
                ],
                "program": "${file}",
                "restart": true,
                "runtimeExecutable": "nodemon",
                "console":"integratedTerminal"
            }
        ]
    }
    ```
    - nodemon needs to be installed globally ``npm install nodemon -g``
- This article will be very helpful: https://code.visualstudio.com/docs/nodejs/nodejs-debugging

#### Changing Variables
- Varibles can be manipulated in the debugger with the side menu

### Summary
- **npm**
    - node package manager
    - allows for management of node projects and dependencies
    - initialize a project with ``npm init``
    - npm scripts can be defined in the package.json to give you "shortcuts" to common tasks/commands
- **3rd party packages**
    - node projects don't just use core modules and custom code but also third-party packages
    - you install them via npm
    - you can differentiate between production (``--save``), and development (``--save-dev``), and global (``-g``) dependencies
- **types of errors**
    - syntax, runtime, and logical errors can break your app
    - syntax and runtime errors throw (helpful) error messages (with line numbers)
    - logical errors can be fixed with testing and the help of the debugger
- **debugging**
    - use the VScode Node debugger to step into your code and go through it step by step
    - analyze variable values at runtime
    - look into (and manipulate) variables at runtime
    - set break points cleverly (i.e. respect the async/event driven nature)
- **Useful Resources & Links**
    - More on debugging Node.js: https://nodejs.org/en/docs/guides/debugging-getting-started/
    - Debugging Node in Visual Studio Code: https://code.visualstudio.com/docs/nodejs/nodejs-debugging