
---
## Understanding TypeScript
---

---
### Table of Contents
1. [Getting Started](#getting-started)
    - [What is TypeScript and Why Should you Use It?](#what-is-typescript-and-why-should-you-use-it)
    - [Installing and Using TypeScript](#installing-and-using-typescript)
    - [TypeScript Advantages - Overview](#typescript-advantages---overview)
    - [The Course Project setup](#the-course-project-setup)
1. [TypeScript Basics and Basic Types](#typescript-basics-and-basic-types)
    - [Using Types](#using-types)
    - [TypeScript Types vs JavaScript Types](#typescript-types-vs-javascript-types)
    - [Working with numbers, strings, and booleans](#working-with-numbers-strings-and-booleans)
    - [Type Assignment and Type Interface](#type-assignment-and-type-interface)
    - [Object Types](#object-types)
    - [Nested Objects & Types](#nested-objects--types)
    - [Array Types](#array-types)
    - [Working with Tuples](#working-with-tuples)
    - [Working with Enums](#working-with-enums)
    - [The "any" type](#the-any-type)
    - [Union Types](#union-types)
    - [Literal Types](#literal-types)
    - [Type Aliases / Custom Types](#type-aliases--custom-types)
    - [Function Return Types & "void"](#function-return-types--void)
    - [Functions as Types](#functions-as-types)
    - [Function Types & Callbacks](#function-types--callbacks)
    - [The "unknown" type](#the-unknown-type)
    - [The 'never' type](#the-never-type)
1. [The TypeScript Compiler](#the-typescript-compiler)
    - [Using "Watch Mode"](#using-watch-mode)
    - [Compiling the Entire Project/ Multiple Files](#compiling-the-entire-project-multiple-files)
    - [Including and Excluding Files](#including-and-excluding-files)
    - [Setting a Compilation Target](#setting-a-compilation-target)
    - [Understanding TypeScript Core Libraries](#understanding-typescript-core-libraries)
    - [More Configuration and Compilation Options](#more-configuration-and-compilation-options)
    - [Working with Source Maps](#working-with-source-maps)
    - [rootDir and outDir](#rootdir-and-outdir)
    - [Emiting Files on Compilation Errors](#emiting-files-on-compilation-errors)
    - [Strict Compilation](#strict-compilation)
    - [Code Quality Options](#code-quality-options)
    - [Useful Resources and Links](#useful-resources--links)
---

---
### Getting Started

#### What is TypeScript and Why Should you Use It?
- TypeScript is a JavaScript superset
    - A language that builds up on JavaScript
- Adds new features and advantages to JavaScript
- TypeScript can't be executed by JavaScript enviornments like the browser or node
- It is a programming language and a tool
- It is a powerful compiler which you run over your code to compile your Typescript into JavaScript
    - The result of writing TypeScript is JavaScript
- The TypeScript compiler compiles the new features to JavaScript "workarounds"
    - Takes the easier to write syntax of TypeScript and compiles it into more complex JavaScript
- TypeScript adds **types**
    - this helps identify errors in code earlier during compile time rather than run time
```js
// JavaScript
function add(num1, num2) {
    return num1 + num2;
}
console.log(add('2','3')) //'23'
```
- In JavaScript, you can avoid the above by using if checks to make sure inputs are numbers
    - TypeScript can help us write better code without an if check for the example above

#### Installing and Using TypeScript
- In the code example below, the output is not what we want:
```js
const button = document.querySelector("button");
const input1 = document.getElementById("num1");
const input2 = document.getElementById("num2");

function add(num1, num2) {
  return num1 + num2;
}

button.addEventListener("click", function () {
  console.log(add(input1.value, input2.value));
});

// 15 + 15 = 1515
```
- This is because in JavaScript accessing the value of an input (``input.value``) is always a string so we don't get additon but string concatenation
- One solution in JavaScript would be:
```js
function add(num1, num2) {
    if (typeof num1 === "number" && typeof num2 === "number") {
        return num1 + num2
    } else {
        return +num1 + +num2;
    }

}
```
- How to install TypeScript: https://www.typescriptlang.org/
```bash
npm install -g typescript
```
- This allows us to invoke the ``tsc`` command which allows us to compile a JavaScript file to TypeScript
- TypeScript forces us to be more explicit and clearer with our code
- The biggest advantage is the addition of types
```ts
// TypeScript
const buttonts = document.querySelector("button")!;
const input1ts = document.getElementById("num1")! as HTMLInputElement;
const input2ts = document.getElementById("num2")! as HTMLInputElement;

function addts(num1: number, num2: number) {
        return num1 + num2;
    }

buttonts.addEventListener("click", function () {
  console.log(add(+input1ts.value, +input2ts.value));
});
```
- Then we can run to compile to JS and we will get errors when it is compiled:
```bash
tsc filename.ts
```
- The result of the compile:
```js
// JavaScript
var buttonts = document.querySelector("button");
var input1ts = document.getElementById("num1");
var input2ts = document.getElementById("num2");
function addts(num1, num2) {
    return num1 + num2;
}
buttonts.addEventListener("click", function () {
    console.log(addts(+input1ts.value, +input2ts.value));
});
```
- When we import to HTML, we have to be sure to use the ``js`` file as the browser can't render TypeScript

#### TypeScript Advantages - Overview
- Typescript adds
    - Types.. forces us to be more explicit with our code
    - Next gen JavaScript features can be written in TypeScript files which are compiled down for older browsers
    - Understands non JavaScript features like ``Interfaces`` and ``Generics``
    - Meta programming features like Decorators
    - Rich configuration options

#### The Course Project setup
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Understanding TypeScript</title>
    <script src="app.js" defer></script>
  </head>
  <body></body>
</html>
```
- The ``defer`` keyword tells the browser to continue downloading HTML while the script files is downloaded in the background
- We create an ``app.ts`` file that holds our logic... for now we have to run ``tsc app.js`` every time we make changes
- we run ``npm init``
- we use ``lite-server`` for this project which acts as a development server that automatically reloads our changes: ``npm install --save-dev lite-server``
- in our ``packagae.json`` we can add a command to start live server:
```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "lite-server"
  },
```
---
### TypeScript Basics and Basic Types
#### Using Types
- JavaScript knows some data types, but TypeScript adds many more
    - TypeScript also enables you to write your own types

**Core Types**
- number: 1, 5.3, -7
    - both JS and TS just use number... no float, int, etc.
- string: "HI", 'HI', `HI`(backticks ``)
    - both JS and TS know strings as text values encased in quotes or backticks (backticks allows us to inject code)
- boolean: true or false
    - both JS and TS know booleans as "truthy" or "falsy" values

- The following function will run fine in TS:
```js
function add(n1, n2) {
    return n1 + n2
}

const number1 = 5
const number2 = 2.8

const result = add(number1, number2)
console.log(result) //7.8
```
- This function will concatenate rather than add:
```js
function add(n1, n2) {
    return n1 + n2
}

const number1 = '5'
const number2 = 2.8

const result = add(number1, number2)
console.log(result) //52.8
```
- The default type is anything, but we can specify types:
```js
function add(n1: number, n2: number) {
    return n1 + n2
}

const number1 = '5'
const number2 = 2.8

const result = add(number1, number2)
console.log(result)
```
- When this code is compiled to JavaScript, we get the following error:
```bash
error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.

8 const result = add(number1, number2)
                     ~~~~~~~
```
- TypeScript only helps during development, it doesn't change the JavaScript.
    - It provides an extra sanity check that helps find bugs before they occur

#### TypeScript Types vs JavaScript Types
- A JavaScript solution would look like:
```js
function add(n1: number, n2: number) {
    if (typeof n1 !== 'number' || typeof n2 !== "number") {
        throw new Error('Incorrect Input!')
    }
    return n1 + n2
}

const number1 = '5'
const number2 = 2.8

const result = add(number1, number2)
console.log(result)
```
- JavaScript is dynamically typed which is why the ``tyepof`` operator exists
- TypeScrit is statically typed so we define the types of variables/parameters
- So they key difference is JavaScript is resolved at runtime and TypeScript resolves during development

#### Working with numbers, strings, and booleans
- This is just an example to show how TypeScript is written:
```js
function add(n1: number, n2: number, showRestult: boolean, phrase: string) {

    const result = n1 + n2
    if (showRestult) {
        console.log(resultPhrase + result)
    } else {
        return result
    }

}

const number1 = 5
const number2 = 2.8
const printResult = true
const resultPhrase = 'Result is:'

add(number1, number2, printResult, resultPhrase)
```

#### Type Assignment and Type Interface
- TypeScript has a built in feature called type inference
    - Type inference in TypeScript refers to the ability of the TypeScript compiler to automatically determine the types of variables and expressions based on their usage and context, without the need for explicit type annotations.
- In the example above, it would be redundant to assign a type to the variables when it is already done to the parameters of the function
    - However if a variable is not initalized with a value, then it would be a good idea to set its type even when the parameters for the function have been set with a type

#### Object Types
- Another **Core Type** is the object
- object: {age:30}
    - Any JS object is an object in TS but there are more specific versions in TS
```js
const person = {
    name: 'Robin',
    age: 36
}
```
- In JavaScript, we can try to access a property that doesn't exist: ``console.log(person.nickname)``
- for the code above, the object type inferred by TypeScript would look like this:
```js
const person = {
    name: string;
    age: number;
}
```
- Object types are written almost like objects but they have ``key: type`` pairs
- TypeScript has a specialized notation to assign objects ``{}``:
```ts
const person: {
    name: string;
    age: number;
} = {
    name: 'Robin',
    age: 36
}
```
- But we can just create an object and let TypeScript infer the values

#### Nested Objects & Types
- Of course object types can also be created for nested objects.
- Let's say you have this JavaScript object:
```js
const product = {
  id: 'abc1',
  price: 12.99,
  tags: ['great-offer', 'hot-and-new'],
  details: {
    title: 'Red Carpet',
    description: 'A great carpet - almost brand-new!'
  }
}
```
- This would be the type of such an object:
```js
{
  id: string;
  price: number;
  tags: string[];
  details: {
    title: string;
    description: string;
  }
}
```
- So you have an object type in an object type so to say.

#### Array Types
- Another **Core Type** is the array
- arrays: [1,2,3]
    - arrays can store any type of data, and with TypeScript the type can be flexible or strict
- Using array is exactly the same whether on its own or inside an object
```js
const hobbies = ['Walking my Dog', 'Watching MMA']
```
- TypeScript would classify this as ``(property) hobbies: string[]``
- For the example above, TypeScript infers that the array is an array of strings
- In this example, we create an array that's only going to hold strings:
```js
let favoriteHobbies: string[]
favoriteHobbies = ['Learning']
```
- We can also use ``any``, but using it too often will make us lose the benefits of TypeScript:
```js
let randomStuff: any[]
randomStuff = ['Learning', 4, "ok", 99]
```

#### Working with Tuples
**Core Types**
- number
- string
- boolean
- object
- array
- tuple: [1,2]
    - Added by TypeScript... a fixed length and fixed type array
- In this example TypeScript infers mutliple types: ``(property) role: (string | number)[]``:
```js
const role = [1, "web dev"]
```
- Normally with objects, it would be better to let TS infer the values, but when we use a tuple and want specific values, it makes sense to set the types:
```js
const person: {
    name: string;
    age: number;
    hobbies: string[];
    role: [number,string]
} = {
    name: 'Robin',
    age: 36,
    hobbies: ['Walking my Dog', 'Watching MMA'],
    role: [1, "web dev"]
}
```
- With tuples, if were to push, we wouldn't get any errors and TS wouldn't enforce the length of the tuple which we want to be 2 in this example
```js
person.role.push('admin')
console.log(person.role) // [1, 'web dev', 'admin']
```

#### Working with Enums
**Core Types**
- number
- string
- boolean
- object
- array
- tuple
- enum: enum {NEW, OLD}
    - Added by TypeScript: Automatically enumerated global constant identifiers
- We would set up a system like this in JavaScript:
```js
const ADMIN = 0
const READ_ONLY = 1
const AUTHOR = 2

const person = {
    name: 'Robin',
    age: 36,
    hobbies: ['Walking my Dog', 'Watching MMA'],
    role: ADMIN
}
```
- Instead, we can use an ``enum`` and the convention is to use an uppercase character
    - The values are usually all caps, but it isn't a must
```js
enum Role {ADMIN, READ_ONLY, AUTHOR}
```
- behind the scenes each value is assigned a number (0,1,2)
    - Enums essentially assign labels to numbers, but we they dont have to be numbers
- The default for enums is numbers starting from 0 but we can set our own identifiers and they don't have to be numbers:
```js
enum Role {ADMIN = "mungo", READ_ONLY = 9000, AUTHOR = 77}
```

#### The "any" type
- The ``any`` type is the most flexible type you can assign in TS
    - this type doesn't tell TS anything
    - it allows you to store any kind of value
**Core Types**
- number
- string
- boolean
- object
- array
- tuple
- enum
-any: *
    - Any kind of value, no specific type assignement

- Any seems great, but it is a disadvantage and should be avoided when possible
    - ``any`` takes away all adavantages that TS gives and is basically like working with vanilla JS
- ``any`` makes it so the TS compiler can't check anything
- ``any`` can be useful if you don't know what kind of data will be stored

#### Union Types
- In this example, the function only takes numbers as inputs:
```ts
function combine(input1: number, input2: number) {

    const result = input1 + input2

    return result
}

const combinedAges = combine(30,26)
console.log(combinedAges)

const combinedNames = combine('Robin', 'Nibor')
```
- To allow this function to take numbers or strings as inputs, we can use the ``|`` (pipe) symbol
    - we can have as many types as we need:
```js
function example(input1: number | string | boolean)
```
- For our origianl example, TS gives us an error that isn't accurate because it is confused by the :
```bash
Operator '+' cannot be applied to types 'string | number' and 'string | number'.
```
- We have to work around this by making the code explicit:
```js
function combine(input1: number | string, input2: number | string) {
let result

if (typeof input1 === 'number' && typeof input2 === 'number'){
    result = input1 + input2
} else {
    result = input1.toString() + input2.toString()
}
    return result
}
```
- There will be situations where we can use a ``union`` type without a run time typecheck like we have above

#### Literal Types
- ``literal types`` are types where we make it clear what value the type should hold
```js
function combine(input1: number | string, input2: number | string, resultConversion: string) {
    let result

    if (typeof input1 === 'number' && typeof input2 === 'number'){
        result = input1 + input2
    } else {
        result = input1.toString() + input2.toString()
    }

    if (resultConversion === 'as-number') {
        return +result
    } else {
        return result.toString()
    }

    const combinedAges = combine(30,26, 'as-number')
    console.log(combinedAges) // 56

    const combinedStringAges = combine('30', '26', 'as-number')
    console.log(combinedStringAges) // 3026

    const combinedNames = combine('Robin', 'Nibor', 'as-text')
    console.log(combinedNames) // 'RobinNibor'
}
```
- An alternative solution would be:
```js
function combine(input1: number | string, input2: number | string, resultConversion: string) {
    let result

    if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number'){
        result = +input1 + +input2
    } else {
        result = input1.toString() + input2.toString()
    }
    const combinedAges = combine(30,26, 'as-number')
    console.log(combinedAges) // 56

    const combinedStringAges = combine('30', '26', 'as-number')
    console.log(combinedStringAges) // 56

    const combinedNames = combine('Robin', 'Nibor', 'as-text')
    console.log(combinedNames) // 'RobinNibor'
```
- In the alternative solution, the second example is added correctly as the conversion is performed on the inputs rather than the final result
- With the current implementation, ``resultConversion`` can be mistyped leading to unwanted behavior
```js
combine(input1: number | string, input2: number | string, resultConversion: 'as-number' | 'as-text')
```

#### Type Aliases / Custom Types
- We can create new types that do things like store union types
- FOr our example above, we can simplify:
```js
type Combinable = number | string
type ConversionDescriptor = 'as-number' | 'as-text'

function combine(input1: Combinable , input2: Combinable , resultConversion: ConversionDescriptor) {...}
```
- Type aliases can be used to "create" your own types.
    - You're not limited to storing union types though - you can also provide an alias to a (possibly complex) object type.
```js
type User = { name: string; age: number };
const u1: User = { name: 'Max', age: 30 }; // this works!
```
- This allows you to avoid unnecessary repetition and manage types centrally.
- For example, you can simplify this code:
```js
function greet(user: { name: string; age: number }) {
  console.log('Hi, I am ' + user.name);
}

function isOlder(user: { name: string; age: number }, checkAge: number) {
  return checkAge > user.age;
}
```
- To:
```js
type User = { name: string; age: number };

function greet(user: User) {
  console.log('Hi, I am ' + user.name);
}

function isOlder(user: User, checkAge: number) {
  return checkAge > user.age;
}
```

#### Function Return Types & "void"
```js
function add(n1: number, n2: number) {
    return n1 + n2
}
```
- for the function above, the return type (number) is inferred by TS
```js
function add(n1: number, n2: number): number
```
- if we change the function:
```js
function add(n1: number, n2: number) {
    return n1.toString() + n2.toString()
}
```
- TS infers the return will be a string:
```js
function add(n1: number, n2: number): string
```
- we can set the type ourselves:
```js
function add(n1: number, n2: number): number {
    return n1 + n2
}
```
- this function doesn't actually return anything as it just prints to the console:
```js
function printResult(num:number) {
    console.log('Result: ' + num)
}
```
- it has the return type, ``void``:
```js
function printResult(num: number): void
```
- void isn't available in JS, it is a TS convention
- it basically just tells us the function doesn't return anything
- if we were to ``console.log()`` the ``printResult()`` function it would return undefined:
```js
console.log(printResult(add(5, 12))) // undefined
```
- JS returns ``undefined`` for functions that don't have a return value
- ``undefined`` is also a valid type:
```js
let someValue : undefined;
```
- however, TS will show an error if ``undefined`` is used for a function... TS will just expect the function to have an empty return
- with functions, we use ``void`` when setting types

#### Functions as Types
```js
let combineValues: Function;

combineValues = add;

console.log(combineValues(8,8))
```
- we explicity set ``combineValues`` as a ``Function``
- function types are types that describe a function regarding the parameters and return value:
```js
let combineValues: (a:number, b:number) => number;
```
- in the example above, we're setting the types for the parameters and the return
- if we were to assign ``combineValues`` to a function that didn't follow those types, the compiler would produce an error

#### Function Types & Callbacks
- adding ``void`` to a function ensure that we won't get a return value
- here we define the types of a callback function:
```js
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
    const result = n1 + n2;
    cb(result);
}
```
- then we use an anonymous function as the callback:
```js
addAndHandle(20,10, (result => {
    console.log(result);
    return result;
}))
```
- even though we are trying to return a result, we set the return type as void so we won't get a return

#### The "unknown" type
- We can use the ``unknown`` type:
```js
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Robin";
userName = userInput;
```
- The code above would give us this error:
```bash
Type 'unknown' is not assignable to type 'string'.
```
- Had we used ``any`` type, this would not be an error
- We would need to use a type check to make the code work:
```js
if (typeof userInput === 'string') {
    userName = userInput
}
```
- Like ``any``, ``unknown`` is a type that we should not use often

#### The 'never' type
- ``never`` is another type that functions can return
```js
function generateError(message: string, code: number) {
    throw {message: message, errorCode: code};
}
```
- The return type of the above function is listed as ``void`` but it is also ``never``
- We would use ``never`` when if we want to make it clear that the function in question shouldn't be returning anything like in the case of the above function which always throws an error

---
### The TypeScript Compiler
#### Using "Watch Mode"
- Rather than havin to type ``tsc app.js`` every time we want to compile, we can use either of these commands to "watch" a file:
```bash
tsc app.ts --watch

tsc app.ts --w
```
- This file will be "watched" and any changes made will be auto compiled

#### Compiling the Entire Project/ Multiple Files
```bash
tsc --init
```
- This command initializes the project folder as a TS project and creates a ``tsconfig.json`` file
- Now all we need to do is run ``tsc`` without pointing to any files and all ``.ts`` files in the project will be compiled
- We can also combine this with ``-w`` to watch all ``.ts`` files in the project:
```bash
tsc --w
```

#### Including and Excluding Files
- The ``ts.config`` file tells TS how it should compile
- We can add an ``exclude`` array to add paths of files that should not be compiled
```js
  "exclude": [
    "*.dev.ts"
  ]
```
- Using ``"**/*.dev.ts"`` means any file with this pattern in any folder will be ignored
- It's normal to have ``node_modules`` in ``exclude``, but ``node_modules`` is excluded as a default setting
- There is also an ``include`` array
    - If ``include`` is used then all files we want compiled must be placed here
- We can also use a ``files`` array
    - The difference from ``inculde`` is that ``files`` can't add paths

#### Setting a Compilation Target
- We can also configure how files are compiled
```js
"target": "es2016", /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
```
- With ``target``, we can use TS to compile for older browsers

#### Understanding TypeScript Core Libraries
- ``lib`` handles things like DOM apis
```js
"lib": [], /* Specify a set of bundled library declaration files that describe the target runtime environment. */
```
- If ``lib`` is not set, the defaults depend on the JS ``target``

#### More Configuration and Compilation Options
```js
"allowJs": true,  /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
"checkJs": true,  /* Enable error reporting in type-checked JavaScript files. */
```
- The options above can be used if you don't want to use TS but want to use some of its features with JS

#### Working with Source Maps
```js
"sourceMap": true,  /* Create source map files for emitted JavaScript files. */
```
- We can use the browser to check the js files.
- Using source map also allows us to see the TS files

#### rootDir and outDir
- The bigger the project gets, the more you want to organize files
```js
 "rootDir": "./", /* Specify the root folder within your source files. */
 "outDir": "./", /* Specify an output folder for all emitted files. */
 ```
 - Projects usually have a ``src`` folder and a ``dist`` folder so we can use ``rootDir`` and ``outDir`` to specify the root folder and the folder where files should be compiled
 - The folder structure will also be replicated when compiled
 ```js
 "removeComments": true,  /* Disable emitting comments. */
 ```

 #### Emiting Files on Compilation Errors
 ```js
 "noEmitOnError": true, /* Disable emitting files if any type checking errors are reported. */
 ```
 - This is false by default
 - Setting it to true will cause the compiler to ignore compiling files if there are errors

 #### Strict Compilation
 ```json
 /* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,                         /* When type checking, take into account 'null' and 'undefined'. */
    // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictBindCallApply": true,                      /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
    // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
    // "noImplicitThis": true,                           /* Enable error reporting when 'this' is given the type 'any'. */
    // "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
    // "noUnusedLocals": true,                           /* Enable error reporting when local variables aren't read. */
    // "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read. */
    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
    // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
    // "noUncheckedIndexedAccess": true,                 /* Add 'undefined' to a type when accessed using an index. */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type. */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */
```
- Setting ``strict`` to true allows all of the options below it.
- We can disable ``strict`` and chose individual options
- We can use an ``!`` to bypass ``strictNull``:
```js
const button = document.querySelector('button')!;
```
- Or we can check if button is not null:
```js
const button = document.querySelector('button');

if (button) {
    button.addEventListener('click', () => {
        console.log('Clicked');
    })
}
```

#### Code Quality Options
```json
/* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,                         /* When type checking, take into account 'null' and 'undefined'. */
    // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictBindCallApply": true,                      /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
    // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
    // "noImplicitThis": true,                           /* Enable error reporting when 'this' is given the type 'any'. */
    // "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
    // "noUnusedLocals": true,                           /* Enable error reporting when local variables aren't read. */
    // "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read. */
    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
    // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
    // "noUncheckedIndexedAccess": true,                 /* Add 'undefined' to a type when accessed using an index. */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type. */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */
```

#### Useful Resources & Links
- tsconfig Docs: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
- Compiler Config Docs: https://www.typescriptlang.org/docs/handbook/compiler-options.html
- VS Code TS Debugging: https://code.visualstudio.com/docs/typescript/typescript-debugging