## Improved Development Flow and Debugging

---

### Table of Contents
1. [Understanding NPM Scripts](#understand-npm-scripts)
1. [Installing 3rd Party Packages](#installing-3rd-party-packages)
1. [Global Features vs Core Modules vs Third-Party Modules](#global-features-vs-core-modules-vs-third-party-modules)
1. [Global & Local npm Packages](#global-&-local-npm-packages)

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