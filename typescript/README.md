
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
1. [Next-generation JavaScript & TypeScript](#next-generation-javascript--typescript)
    - [let and const](#let-and-const)
    - [Arrow Functions](#arrow-functions)
    - [Default Function Parameters](#default-function-parameters)
    - [The Spread Operator (...)](#the-spread-operator)
    - [Rest Parameters](#rest-parameters)
    - [Array and Object Destructuring](#array-and-object-destructuring)
1. [Classes and Interface](#classes-and-interfaces)
    - [What are Classes?](#what-are-classes)
    - [Creating a First Class](#creating-a-first-class)
    - [Compiling to JavaScript](#compiling-to-javascript)
    - [Constructor Functions & The "this" Keyword](#constructor-functions--the-this-keyword)
    - ["private" and "public" Access Modifiers](#private-and-public-access-modifiers)
    - [Shorthand Initialization](#shorthand-initialization)
    - ['readonly' Properties](#readonly-properties)
    - [Inheritance](#inheritance)
    - [Overriding Properties & The "protected" Modifier](#overriding-properties--the-protected-modifier)
    - [Getters and Setters](#getters-and-setters)
    - [Static Methods and Properties](#static-methods-and-properties)
    - [Abstract Classes](#abstract-classes)
    - [Singletons and Private Constructors](#singletons-and-private-constructors)
    - [A First Interface](#a-first-interface)
    - [Using Interfaces with Classes](#using-interfaces-with-classes)
    - [Why Interfaces?](#why-interfaces).
    - [Readonly Interface Properties](#readonly-interface-properties)
    - [Extending Intefaces](#extending-intefaces)
    - [Interfaces as Function Types](#interfaces-as-function-types)
1. [Advanced Types](#advanced-types)
    - [Intersection Types](#intersection-types)
    - [More on Type Guards](#more-on-type-guards)
    - [Discriminated Unions](#discriminated-unions)
    - [Type Casting](#type-casting)
    - [Index Properties](#index-properties)
    - [Function Overloads](#function-overloads)
    - [Optional Chaining](#optional-chaining)
    - [Nullish Coalescing](#nullish-coalescing)
1. [Generics](#generics)
    - [Built-in-Generics & What are Generics?](#built-in-generics--what-are-generics)
    - [Creating a Generic Function](#creating-a-generic-function)
    - [Another Generic Function](#another-generic-function)
    - [The "keyof" Constraint](#the-keyof-constraint)
    - [Generic Classes](#generic-classes)
    - [Generic Utiltity Types](#generic-utiltity-types)
    - [Generic Types vs Union Types](#generic-types-vs-union-types)
1. [Decorators](#decorators)
    - [A First Class Decorator](#a-first-class-decorator)
    - [Working with Decorator Factories](#working-with-decorator-factories)
    - [Building more Useful Decorators](#building-more-useful-decorators)
    - [Adding Multiple Decorators](#adding-multiple-decorators)
    - [Diving into Property Decorators](#diving-into-property-decorators)
    - [Accessor & Parameter Decorators](#accessor--parameter-decorators)
    - [When Do Decorators Execute](#when-do-decorators-execute)
    - [Returning (and changing) a Class in a Class Decorator](#returning-and-changing-a-class-in-a-class-decorator)
    - [Other Decorator Return Types](#other-decorator-return-types)
    - [Wrap up](#wrap-up)
1. [Practice Time: Let's Build a Drag & Drop Project](#practice-time-lets-build-a-drag--drop-project)
    - [Getting Started](#getting-started-1)
    - [DOM Element Selection & OOP Rendering](#dom-element-selection--oop-rendering)
    - [Interacting with DOM Elements](#interacting-with-dom-elements)
    - [Creating & Using an "Autobind" Decorator](#creating--using-an-autobind-decorator)
    - [Fetching User Input](#fetching-user-input)
    - [Creating a Re-usable Validation Functionality](#creating-a-re-usable-validation-functionality)
    - [Rendering Project Lists](#rendering-project-lists)
    - [Managing Application State with Singletons](#managing-application-state-with-singletons)
    - [More Classes & Custom Types](#more-classes--custom-types)
    - [Filtering Projects with Enums](#filtering-projects-with-enums)
    - [Adding Inheritance and Generics](#adding-inheritance-and-generics)
    - [Rendering Project Items with a Class](#rendering-project-items-with-a-class)
    - [Using a Getter](#using-a-getter)
    - [Utliziing Interfaces to Implement Drag and Drop](#utliziing-interfaces-to-implement-drag-and-drop)
    - [Drag Events and Reflecting the Current State in the UI](#drag-events-and-reflecting-the-current-state-in-the-ui)
    - [Adding a Droppable Area](#adding-a-droppable-area)
    - [Finishing Drag and Drop](#finishing-drag-and-drop)
1. [Modules and Namespaces](#modules-and-namespaces)
    - [Writing Module Code - Your Options](#writing-module-code---your-options)
    - [Working with Namespace](#working-with-namespace)
    - [Organizing Files & Folders](#organizing-files--folders)
    - [Using ES Modules](#using-es-modules)
    - [Understanding various Import and Export Syntaxes](#understanding-various-import-and-export-syntaxes)
    - [Wrap Up](#wrap-up-1)
1. [Using Webpack with TypeScript](#using-webpack-with-typescript)
    - [What is Webpack and Why do we need it](#what-is-webpack-and-why-do-we-need-it)
    - [Installing Webpack and Installing Dependencies](#installing-webpack-and-installing-dependencies)
    - [Adding Entry & Output Configuration](#adding-entry--output-configuration)
    - [Adding TypeScript Support with the ts-loader Package](#adding-typescript-support-with-the-ts-loader-package)
    - [Finishing the Setup and Adding webpack-dev-server](#finishing-the-setup-and-adding-webpack-dev-server)
    - [Adding a Production Workflow](#adding-a-production-workflow)
1. [Third Party Libraries and TypeScript](#third-party-libraries-and-typescript)
    - [Using JavaScript Libraries with TypeScript](#using-javascript-libraries-with-typescript)
    - [Using "declare" as a "last resort"](#using-declare-as-a-last-resort)
    - [No Types Needed: class-transformer](#no-types-needed-class-transformer)
    - [TypeScript embracing: class-validator](#typescript-embracing-class-validator)
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

### Next-generation JavaScript & TypeScript
#### let and const
- Modern JS features [support](https://kangax.github.io/compat-table/es6/)
- ``const`` variables cannot be reassigned:
```js
const userName = 'Robin'
userName = 'Nibor'
```
```bash
Cannot assign to 'userName' because it is a constant.ts(2588)
```
- ``let`` variabls can be reassigned:
```js
let age = 36
age = 99
```
- ``let`` and ``const`` replace the old keyword ``var``
- one of the key differences is the idea of scope
- ``var`` has a global and function scope
    - variables defined outside of a function are available everywhere wile variables defined in functions are only available in the functions
```js
function add(a: number, b: number) {
    var result
    result = a + b
    return result
}

console.log(result) // Cannot find name 'result'
```
- On the other hand this would work:
```js
var result

function add(a: number, b: number) {
    result = a + b
    return result
}

console.log(result) // result of a + b
```
- JS works by allowing us to access variables on a higher level
- ``let`` works similar to ``var`` with the difference being ``var`` is only scoped globally and within functions
```js
if (age > 30) {
    var isOld = true
}

console.log(isOld) // true (TS will complain, but it still works)
```
```js
if (age > 30) {
    let isOld = true
}

console.log(isOld) // Cannot find name 'isOld'
```
- ``let`` and ``const`` introduced the idea of "block scope"
    - "blocks" are snippets surrounded with curly braces and variables are available inside blocks and below them

#### Arrow Functions
```js
const add = (a:number, b:number) => {
    return a + b;
}

console.log(add(2,5)) // 7
```
- One of the benefits of arrow functions is that it is shorter
    - For a single expression return, the curly braces and return keyword can be omitted
```js
const add = (a:number, b:number) => a + b;
```
- If there is only one parameter, it doesn't need to be surrounded by parantheses
    - This feature is supported by JS but not TS unless we add types to the function:
```js
const printOut: (a: number | string) => void = output => console.log(output);
```

#### Default Function Parameters
```js
const add = (a:number, b:number = 1) => a + b;

const printOut: (a: number | string) => void = output => console.log(output);

printOut(add(5)); //6
```
- Be is 1 by default so we can only add one parameter when we call the function
- In a situation like this, the default parameter should be the last one
    - If we try to call this function with only one parameter, we get an error

#### The Spread Operator (...)
```js
const hobbies = ['Jasper', 'Watching MMA'];
const oldHobbies = ['Gaming','Watching Baseball'];

hobbies.push(...oldHobbies)
console.log(hobbies) // [ "Jasper", "Watching MMA", "Gaming", "Watching Baseball" ]
```
- The spread operator takes all elements of an array
- The spread operator also works with objects
```js
const person = {
    name: 'Robin',
    age: '36'
}

const copiedPerson = person;
copiedPerson.name = 'Nibor'

console.log(person.name, copiedPerson.name) // Nibor Nibor
```
- In the example above, we're not actually creating a copy, as changes to ``copiedPerson`` will also be applied to ``person``
- Using the spread operator will create an actual copy and the orginal won't be changed:
```js
const copiedPerson = {...person};
copiedPerson.name = 'Nibor'

console.log(person.name, copiedPerson.name) // Robin Nibor
```

#### Rest Parameters
- Rest Parameters help us when we want a function to take a variable amount of arguments
```js
const sum = (...args: number[]) => {
    return args.reduce((r,a) => r+a)
}

const addNumbers = sum(1,2,3,4)
console.log(addNumbers) //10
```

#### Array and Object Destructuring
- We use destructuring to pull elements from arrays and objects
- With arrays we use a bracket on the left side with the array we want to destructure from: ``const [] = hobbies``
```js
const [hobby1, hobby2, ...remaingHobbies] = hobbies
```
- The first two elements of hobbies will be assigned to ``hobby1`` and ``hobby2`` while the remaining hobbies will be placed in an array named ``remainingHobbies``
- With objects, we can use destructuring to pull properties and give them variable names:
```js
const {firstName,age} = person;
```
---
### Classes and Interfaces
#### What are Classes?
**OOP**
- To understand classes we need to understand object oriented programming (OOP)
- The idea with OOP is that you work with (rea-life) Entities in you code
    - We work with objects that resemble real life objects as far as possible to make it easier to reason our code
    - We break our project down into logical peices such as a ProductList, Product, and ShoppingCart for an e-commerce app
    - We can acheive this by using objects or classes

**Classes and Instances**
- **Objects** are the concrete things we work with in our code, the data structures we use to store data and methods
    - Objects are **Instances** of classes if they are based on a class
    - Class based creation is an alternative to using object literals
- **Classes** are blueprints for objects
    - classes allow use to define how objects should look like in terms of data and methods
    - Classes make it easier to make multiple smaller objects

#### Creating a First Class
- Classes can serve as 'syntactic sugar' for constructors
- ``constructor() {}`` is a reserved keyword which is tied to a class and any object created based on the class
    - Exectued when the object is created... it allows us to do initialization work
```js
class Blockchain {
    name: string; // this is not a key value pair

    constructor(n: string) {
        this.name = n;
    }
}
```
- Above we have a blueprint and we can create a new object based on it:
```js
new Blockchain('RobChain');
```

#### Compiling to JavaScript
- Classes aren't "new" to JavaScript
- In the past, functions were used to create classes so the example above compiled to older version of JavaScript would look like this:
```js
var Blockchain = /** @class */ (function () {
    function Blockchain(n) {
        this.name = n;
    }
    return Blockchain;
}());
var robCoin = new Blockchain('RobChain');
console.log(robCoin);
```
- Modern JS introduced classes offering cleaner syntax:
```js
class Blockchain {
    constructor(n) {
        this.name = n;
    }
}
const robCoin = new Blockchain('RobChain');
console.log(robCoin);
```

#### Constructor Functions & The "this" Keyword
- ``this`` refers to the instance of the class that was created
- when we add a "method", we have to use the ``this`` keyword to access properties of the class:
```js
describe() {
    console.log('Blockchain: ' + this.name)
}
robCoin.describe() // Blockchain: RobChain

const robCoinCopy = {describe: robCoin.describe}

robCoinCopy.describe() // Blockchain: undefined
```
- ``this`` has tricky behavior so we can pass it in as an argument with the class type to help in certain situations where ``this`` wouldn't be accessible
```js
describe(this: Blockchain) {
    console.log('Blockchain: ' + this.name)
}
const robCoinCopy = {name: 'RobCoinFork', describe: robCoin.describe}

robCoinCopy.describe() // RobCoinFork
```

#### "private" and "public" Access Modifiers
```js
class Blockchain {
    name: string;
    dapps: string[] = [];

    constructor(n: string) {
        this.name = n;
    }

    describe(this: Blockchain) {
        console.log('Blockchain: ' + this.name);
    }

    addDapp(dapp: string) {
        this.dapps.push(dapp);
    }

    printDappInfo() {
        console.log(this.dapps.length);
        console.log(this.dapps);
    }
}

const robCoin = new Blockchain('RobChain');

robCoin.addDapp('UniSwap');
robCoin.addDapp('Aave');

robCoin.describe();
robCoin.printDappInfo();
```
- When building large apps we want avoid doing things like:
```js
robCoin.dapps[2] = 'Curve'
```
- We can use the ``private`` keyword to make things only accessible inside the class
```js
private dapps: string[] = [];
```
- We can also add ``public`` but ``public`` is the default ( it allows access outside of the class)
- Newer versions of JS have access to ``public`` and ``private`` but in older version, everything was ``public`` by default

#### Shorthand Initialization
- Instead of initializing variables and then assigning values inside the constructor, we can use a shorthand version
```js
class Blockchain {
    private dapps: string[] = [];

    constructor(private consensus: string, public name: string) {}

    describe(this: Blockchain) {
        console.log(`The ${this.consensus} Blockchain ${this.name} has won the coin wars`);
    }

    addDapp(dapp: string) {
        this.dapps.push(dapp);
    }

    printDappInfo() {
        console.log(this.dapps.length);
        console.log(this.dapps);
    }
}

const robCoin = new Blockchain('PoS','RobChain');
```

#### 'readonly' Properties
- like ``private`` and ``public``, ``readonly`` is introduced by TS, they don't exist in JS
- ``readonly`` makes sure that you fail if you try to write to the property

#### Inheritance
- We can use inheritance to borrow properties from a main class and add extra ones
- We can only inherit from one class and we do those by using the ``extends`` keyword with the class we want to inherit
```js
class Layer2 extends Blockchain {}
```
- The class that inherits automatically gets everything from the base class and we have to use the keyword ``super`` in the constructor
    - ``super`` calls the constructor of the base class
    - before anything is done with ``this``, ``super`` must be called
```js
class Layer2 extends Blockchain {
    constructor (consensus: string, public memeCoins: string[]) {
        super(consensus, 'ScamChain')
    }
}
```

#### Overriding Properties & The "protected" Modifier
- We can override methods or properties of our base class
- ``private`` properties or only accessible inside the class that they're define
- ``protected`` is similar to private but it is also available to any class that extends the base class

#### Getters and Setters
- A ``getter`` is a property where you execute a function or a method when you retrieve a value which allows a developer to add more complex logic
- We use the ``get`` keyword to create a getter:
```js
private lastGas: number;

get mostRecentGas() {
    if (this.lastGas) {
        return this.lastGas
    }
    throw new Error('whaddamigonnado?')
}

console.log(nibCoin.mostRecentGas)
```
- When calling the getter, we just access it without using parentheses
- We can use the ``set`` keyword to set a value
```js
    get getMostRecentGas() {
        if (this.lastGas) {
           return `The last gas was ${this.lastGas} gas molecules`
        }
        else {throw new Error('whaddamigonnado?')}
    }

    set setMostRecentGas(amount: number) {
        this.removeGasFees(amount)
    }

    nibCoin.setMostRecentGas = 13
    console.log(nibCoin.getMostRecentGas)
```
- Like the ``getter``, the ``setter`` is referenced and not actually called.
    - Under the hood, the ``getter`` and ``setter` are executed by the class after being referenced

#### Static Methods and Properties
- ``static`` methods and properties allow us to add properties and methods to classes which are not accessed on an instance of the class
    - You don't have to use the ``new`` keyword
    - Often used for utility functions that you want to group or map
- An example is the ``Math`` class globally available in JS
    - We can use methods such as ``Math.PI`` or ``Math.pow()`` and don't have to create a ``new Math`` instance
- ``static`` methods exist so you don't have to instantiate a new object just to call a method
```js
static createSideChain(name: string) {
        return name;
    }
```
- ``this`` won't be able to point to ``static`` methods

#### Abstract Classes
- An abstract class is a class that cannot be instantiated directly and is designed to serve as a base class for other classes.
    - It can define abstract methods, which are methods without an implementation, and it can also provide concrete implementations for other methods.
- To define an abstract class in TypeScript, you use the abstract keyword before the class declaration
```js
abstract class AbstractClass {
  abstract abstractMethod(): void;

  concreteMethod(): void {
    console.log("Concrete method implementation");
  }
}

class Subclass extends AbstractClass {
  abstractMethod(): void {
    console.log("Implemented abstract method");
  }
}
```
- Abstracted classes can't be instantiated themselves, they exist just to be inherited from

#### Singletons and Private Constructors
- Useful in situations where you can't or don't want to use static methods and properties
- Adding the ``private`` keyword ensures it is only accessible by the class
- A singleton is a design pattern that ensures a class has only one instance, and provides a global point of access to that instance.
    - In TypeScript, you can implement a singleton using a combination of a private constructor and a static method to access the instance.
- In TypeScript, you can mark a constructor as private to prevent the class from being instantiated directly.
    - This is useful when you want to limit the creation of instances to specific methods or within the class itself.

#### A First Interface
- An interface describes the structure of an object
- An interface is created with the ``interface`` keyword which only exists in TS, not in vanilla JS
- An interface property can't have an initializer
```js
interface Blockchain {
    name: string;
    confirmation: string;
    nonce: number;
    block: number;
    nfts: string[]

    mine(): void;
    getDistributedAmount(): void;
    createNFT(create: string): string;
    seeNFTs(): void
}

let firstChain: Blockchain;

firstChain = {
    name: 'RobChain',
    confirmation: 'PoW',
    nonce: 0,
    block:0,
    nfts: [],
    mine() {
        this.nonce ++
        this.block += 10
    },
    getDistributedAmount() {
        console.log(this.nonce * this.block)
    },
    createNFT(create:string) {
        this.nfts.push(create)
        return `you created a ${create}!`
    },
    seeNFTs() {
        console.log(this.nfts)
    }
}
```

#### Using Interfaces with Classes
- Interfaces are simalar to creating a type, but Interfaces makes it clear that we are creating an object
- Interfaces can be implemented in a class
    - The reason we often work interfaces is because they can be used as a contract a class can implement and adhere to
```js
interface Mineable {
    block: number;
    nonce: number;

    mine(): void;
    getDistributedAmount(): void;
}

interface NFT {
    nfts: string[];

    createNFT(create: string): string;
    seeNFTs(): void
}

class Blockchain implements Mineable, NFT {
    name: string;
    block: number;
    nonce: number;
    nfts: string[] = [];

    constructor(_name: string, _block: number, _nonce:number) {
        this.name = _name
        this.block = _block
        this.nonce = _nonce
    }

    mine () {
        this.block += 5
        this.nonce ++
    }

    getDistributedAmount(): void {
        console.log(this.block*this.nonce)
    }

    createNFT(create: string): string {
        this.nfts.push(create)
        return `you created a ${create}`
    }

    seeNFTs(): void {
        console.log(this.nfts)
    }
}
```
- Anything that interfaces with ``Mineable`` has to have the same properties
- We can use the ``implement`` keyword to interface and we can interface multiple times
- We can add new properties to our class, but we must have the same properties as the interface as well

#### Why Interfaces?
- Interfaces are used to share functionality amongst classes
    - Interfaces enable polymorphism, which means that you can use objects of different classes that implement the same interface interchangeably.
- Interfaces provide a clear structure and separation of concerns.
- Interfaces serve as documentation for your code, describing the expected structure and behavior of objects.
- Interfaces allow you to verify if a class adheres to a specific contract.
- Interfaces provide a foundation for extending functionality.

#### Readonly Interface Properties
- ``private`` and ``public`` are not available for interfaces but ``readonly`` is available
- setting ``readonly`` makes it clear that the property must only be set once and then is readonly thereafter
    - We use it for values we want to stay constant

#### Extending Intefaces
```js
interface Named {
    readonly name: string
}

interface Greetable extends Named {
    greet(phrase: string): void
}

class Person implements Greetable {
    name: string;
    age: number;

    constructor(_name: string, _age: number) {
        this.name = _name;
        this.age = _age
    }

    greet(phrase: string) {
        console.log(`My name is ${this.name}, ${phrase}`)
    }
}
```
- We can use the ``extends`` keyword to combine interfaces

#### Interfaces as Function Types
```js
interface AddFn {
    (a:number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => n1 + n2
```
---
### Advanced Types
#### Intersection Types
- Intersection types allows us to combine other types
```js
type Admin = {
    name: string;
    privelages: string[]
}

type Employee = {
    name: string;
    startDate: Date;
}

type ElevatedEmployee = Admin & Employee;
```
- The result is a new object type that has both
- It must have properties from both types:
```js
const e1: ElevatedEmployee = {
    name: 'Robin',
    privelages: ['Breaks', 'Naps', 'Buffet'],
    startDate: new Date()
};
```
- Alternatively, we could use interfaces:
```js
interface Admin {
    name: string;
    privelages: string[]
}

interface Employee {
    name: string;
    startDate: Date;
}

interface ElevatedEmployee extends Admin, Employee {}

const e1: ElevatedEmployee = {
    name: 'Robin',
    privelages: ['Breaks', 'Naps', 'Buffet'],
    startDate: new Date()
};
```
- Unlike object types, union types are the shard type:
```js
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric; // type Universal = number
```

#### More on Type Guards
- We may have to use extra type checks when using intersection types as TS will question whether the property exists
```js
function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
```
- the ``instanceof`` type guard can be used with classes
```js
class Car {
    drive() {
        console.log('Driving...');
    }
}

class Truck {
    drive() {
        console.log('Driving a truck...');
    }

    loadCargo(amount: number) {
        console.log('Loading cargo ... ' + amount)
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive()
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000)
    }
}

useVehicle(v1); // Driving...
useVehicle(v2); // Driving a truck... Loading Cargo ... 1000
```
- ``instanceof`` is a normal operator built into vanilla JS
- Interfaces don't exist in JS and aren't compiled, so we can't use ``instanceof`` with interfaces

#### Discriminated Unions
- A discriminated union is a special type of type guard
- It is a pattern that can be used when working with union types to make implementing type gaurds easier
- They are available when working with object types
```js
interface Bird {
    type: 'bird';
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    console.log('Moving at speed: ' + speed);
}

moveAnimal({type: 'bird', flyingSpeed: 33})
```
- This is a discriminated union because we have on common property in every object that makes up our union
    - We use that property in our typecheck for extra safety

#### Type Casting
- Helps us tell TS that some value is of a specific type where TS is not able to detect it on its own
- A good example is when accessing something in the DOM
```html
<p></p>
<input type="text" id="user-input" />
```
```js
const paragraph = document.querySelector('p'); // const paragraph: HTMLParagraphElement | null
const userInput = document.getElementById('userInput') //const userInput: HTMLElement | null
```
- TS doesn't read our HTML code so it's only aware of 'some' html element, not a specific element
```js
userInput.value = 'Hi there' // Property 'value' does not exist on type 'HTMLElement'
```
- One way to implement type casting is with the <HTML> tag:
```js
const paragraph = <HTMLParagraphElement>document.querySelector('p');
const userInput = <HTMLInputElement>document.getElementById('userInput');
```
- Alternatively, we can use:
```js
const paragraph = document.querySelector('p') as HTMLParagraphElement;
const userInput = document.getElementById('userInput') as HTMLInputElement;
```
- We can also use ``!``:
```js
const userInput = document.getElementById('userInput')!;
```
- It tells TS that the expression in front of the ``!`` will never yield null
- We can also use an if check:
```js
const paragraph = document.querySelector('p');

if (paragraph) {
 (paragraph as HTMLParagraphElement).innerText = 'Bungo'
}
```

#### Index Properties
- Index types allow us to create objects that are more flexible in relation to the properties they might hold
- Index types are defined by ``[]``
```js
interface ErrorContainer {
    [prop: string]: string;
    [prop: number]: string
}
```
- Using this syntax anove, all props have to be a string and their values have to be strings
- We can add multiple values that follow the same type format
```js
const errorBag: ErrorContainer = {
    email: 'Not a valid email',
    userName: 'Must start with a capital character',
    34: 'ok ok ok',
    manor: "mungo",
    33: 'magic number'
}
```
#### Function Overloads
- A feature that allows us to define multiple function signatures for the same function
    - We can have multiple ways of calling a function with varying parameters
```js
function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

const result = add('Robin','Flobin') as string;
result.split('')
```
- Going back to our combinable, the split will throw an error in TS unless we implement typecasting
- Instead, we can use a function overload in this situation
- We do this by adding another function declaration above the function:
```js
function add(a:number, b: number): number
function add(a:string, b: string): string;
function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

const result = add('Robin','Flobin') as string;
result.split('')
```
- This syntax doesn't work in JS and will be eliminated by the TS compilation process

#### Optional Chaining
- Optional chaining is useful when we don't know with certainty whether an object property is defined
```js
const fetchedUserData = {
    id: 'u1',
    name: 'Robin',
    job: {title: 'CEO', description: 'My own company'}
}

console.log(fetchedUserData.job.title);
```
- If job didn't exist above, we would do something like:
```js
console.log(fetchedUserData.job && fetchedUserData.job.title);
```
- Instead, we can use ``?`` to see if the object exits:
```js
fetchedUserData?.job?.title
```

#### Nullish Coalescing
- Nullish coalescing is loosely related to optional chaining
- It helps us deal with nullish data
```js
const userData = null

const storedData = userInput || 'DEFAULT';
```
- The problem with the approach above is if userData is an empty string, it will still be passed over
- Instead we can use the nullish coalescing operator ``??``:

---
### Generics
#### Built-in-Generics & What are Generics?
- If we try to create an empty array with the array type:
```js
const names: Array = []
```
- We get the following error from TS:
```bash
Generic type 'Array<T>' requires 1 type argument(s)
```
- ``Array<T>`` syntax indicates that we're dealing with a generic type
- A generic type is a type that's somewhat connected to another type and is flexible on what the other type can be
- Along with arrays, another generic type is the [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) type
```js
// const promise: Promise<unknown>
const promise = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve('This is done')
    }, 2000)
})
```
- TS doesn't know they type because it doesn't know how the promise will resolve, so we can give it a type
```js
const promise: Promise<string> = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve('This is done')
    }, 2000)
})
```
```js
const promise: Promise<number> = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve(10)
    }, 2000)
});

promise.then(data => {
    data.split(' ')
})
```
- In the example above, TS will throw an error on the split method since it can't be used with numbers
- Generics help us get additional type information

#### Creating a Generic Function
- In the example below, can't access the property on the merged object:
```js
function merge (objA: object, objB: object) {
    return Object.assign(objA, objB)
}

const mergedObj = merge({name:'Mayhem'}, {age: 17})
mergedObj.name
```
- Because we merged the objects in the function, TS doesn't know
- One solution would be type casting:
```js
const mergedObj = merge({name:'Mayhem'}, {age: 17}) as {name: string, age: number}
```
- Instead we can use generics:
```js
function merge<T,U>(objA: T, objB: U) {
    return {...objA, ...objB}
}

const mergedObj = merge({name:'Mayhem'}, {age: 16})
mergedObj.name
```
- OR
- an example of **contraints**... older versions of TS didn't require this syntax but now it is required.
```js
function merge<T extends object, U extends object> (objA: T, objB: U) {
    return Object.assign(objA, objB)
}

const mergedObj = merge({name:'Mayhem'}, {age: 16})
mergedObj.name
```
- We can also set the types on the function call:
```js
const mergedObj3 = merge<object, object>({name:'Jasper'},{age:0.5})
```
OR more specifically:
```js
const mergedObj4 = merge<{name:string, hobbies: string[]}, {age:number}>({name: 'Mayhem', hobbies: ['Sleep', 'Rest']}, {age:16})
```
- The above examples are redundant and not necessary, but they are examples of what generics are all about

#### Another Generic Function
```js
interface Lengthy {
    length: number
}
function countAndPrint<T extends Lengthy>(element: T) {
    let description = 'Got no value.';
    if (element.length > 0) {
        description =  'Got ' + element.length + ' elements.'
    }
    return [element, description];
}
```
- The idea is we're being a little unspecific about our data

#### The "keyof" Constraint
```js
function extractAndConvert(obj: object, key: string) {
    return obj[key]
}
```
- TS will throw an error
- We can instead use the keyof
```js
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key]
}
```

#### Generic Classes
- Along with generic functions we can create generic classes
```js
class DataStorage<T> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item)
    }

    removeItem(item: T) {
        this.data.splice(this.data.indexOf(item), 1)
    }

    getItems() {
        return [...this.data]
    }
}

const textStorage = new DataStorage<string>()
textStorage.addItem('Mayhem')

const numberStorage = new DataStorage<number>()
numberStorage.addItem(17)
```
- Generics allow us to be flexible but with strong type support
- With objects, it doesn't work as inteded:
```js
const objectStorage = new DataStorage<object>()
objectStorage.addItem({name: 'Mayhem'})
objectStorage.addItem({name: 'Japser'})
objectStorage.addItem({name: 'Nala'})
objectStorage.removeItem({name: 'Nala'})
console.log(objectStorage.getItems()) // [{ name: "Mayhem" }, {name: "Japser" }]
objectStorage.removeItem({name: 'Jasper'})
console.log(objectStorage.getItems()) // [{ name: "Mayhem" }, {name: "Japser" }]
```
- This behavior is due to pass by reference
- One solution would be to store the object in a variable:
```js
const jasperObject = {name:'Jasper'}
objectStorage.addItem(jasperObject)
objectStorage.removeItem(jasperObject)
```
- It would be a better idea to create a storage for objects rather than use the current DataStorage class and keep this storage for primitives:
```js
class DataStorage<T extends string | number | boolean > {...}
```
- Generics give us flexibility combined with type safety

#### Generic Utiltity Types
- There are built in types that are generic types that give certain utility functionality
```js
interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
    return {title:title, description: description, completeUntil:date}
}
```
- The above example would be valid, but we may have situations where we don't return data in that sequence
- We can use the Partial:
```js
interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
    let courseGoal: Partial<CourseGoal> = {}
    courseGoal.title = title
    courseGoal.description = description
    courseGoal.completeUntil = date
    return courseGoal as CourseGoal
}
```
- We can use readonly to limit the size of an array
```js
const pooches: Readonly<string[]> = ['Mayhem', 'Jasper']
pooches.push('Robin') // Property 'push' does not exist on type 'readonly string[]'
pooches.pop() // Property 'pop' does not exist on type 'readonly string[]'
```
- Partials can give us more flexibility and extra precision

#### Generic Types vs Union Types
- Union types are great when you want to be flexible with your types
- Generic types are great when you want to lock in a certain type
- Generics: https://www.typescriptlang.org/docs/handbook/generics.html

---
### Decorators
- Decorators are a feature useful for meta programming
    - Writing code which is easier to use for other developers

#### A First Class Decorator
- First we enable experimental mode in ``tsconfig.json``
```json
"experimentalDecorators": true,                      /* Enable experimental support for legacy experimental decorators. */
```
- A decorator is a function that we apply to something (like a class) in a certain way
- This would be a standard way to create a class:
```js
class Dog {
    name = 'Jasper';

    constructor() {
        console.log('Creating dog object...');
    }
}

const dog = new Dog();

console.log(dog)
```
- We can add decorators but this would not work as is because decorators receive arguments:
```js
function Logger() {
    console.log('Logging...')
}

@Logger
class Dog {
    name = 'Jasper';

    constructor() {
        console.log('Creating dog object...');
    }
}
```
- The amount of arguments for the decorator depends on where the decorator is used
```js
function Logger(constructor: Function) {
    console.log('Logging...');
    console.log(constructor); // class Dog {}
}

@Logger
class Dog {
    name = 'Jasper';

    constructor() {
        console.log('Creating dog object...');
    }
}

const dog = new Dog();

console.log(dog) // Object {name: 'Jasper'}
```
- Decorators execute when your class is defined, not when it's instantiated
    - The decorator runs when JS find your class definition

#### Working with Decorator Factories
- A decorator factory returns a decorator function but allows us to configure it when we assign it as a decorator
```js
function Logger(logString: string) {
    return function(constructor: Function) {
        console.log('Logging...');
        console.log(constructor);
    }
}

@Logger ('LOGGING - DOG')
class Dog {
    name = 'Jasper';

    constructor() {
        console.log('Creating dog object...');
    }
}
```

#### Building more Useful Decorators
```js
function WithTemplate(template: string, hookId: string) {
    return function(_: Function){
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
            hookEl.innerHTML = template;
        }
    }
}
```
- The ``_`` lets TS know we are aware of the argument, but we don't need it
- We can use the decorator above to create dynamic content:
```js
@WithTemplate('<h1>My Dog Object</h1>', 'app')
class Dog {
    name = 'Jasper';

    constructor() {
        console.log('Creating dog object...');
    }
}
```
- We can create extra utilities that can be used ambiguously

#### Adding Multiple Decorators
- We can add more than one decorators to classes or anywhere else we can use a decorator
- Decorators render bottom up, but the creation of the factories occurs in the order they were written
    - The execution of the actual decorators happens bottom up
```js
// A first class decorator
function Logger(logString: string) {
    console.log('Logger factory');
    return function(constructor: Function) {
        console.log(logString);
        console.log(constructor);
    }
}

// building more useful decorators
function WithTemplate(template: string, hookId: string) {
    console.log('Template factory');
    return function(constructor: any){
        console.log('rendering template')
        const hookEl = document.getElementById(hookId);
        const p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = p.name;
        }
    }
}

// @Logger ('LOGGING - DOG')
@Logger('Logging')
@WithTemplate('<h1>My Dog Object</h1>', 'app')
class Dog {
    name = 'Jasper';

    constructor() {
        console.log('Creating dog object...');
    }
}

const dog = new Dog();

console.log(dog)
```
- The code above would execute in this order:
```bash
Logger factory
Template factory
rendering template
Creating dog object...
Logging
class Dog {}
Creating dog object...
Object { name: "Jasper" }
```

#### Diving into Property Decorators
- The arguments a decorator gets depends on where you add it
```js
function Log(target: any, propertyName: string | Symbol) {
    console.log('Property decorator');
    console.log(target,propertyName);
}

class Product {
    @Log
    title: string;
    private _price: number;

    set price(val: number) {
        if (val > 0) {
            this._price = val
        } else {
            throw new Error('uh oh hotdot!')
        }
    }

    constructor(t: string, p:number) {
        this.title = t;
        this._price = p;
    }

    getPriceWithTax(tax: number) {
        return this._price * (1 + tax)
    }
}
```
- This executes when the class definition is registered by JS

#### Accessor & Parameter Decorators
- We can also add decorators to accessors (getters and setters) and it receives three arguments
- ``PropertyDescriptor`` is a type built into JS
```js
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accessor decorator')
    console.log(target)
    console.log(name)
    console.log(descriptor)
}

class Product {
    // ...code
    @Log2
    set price(val: number) {
        if (val > 0) {
            this._price = val
        } else {
            throw new Error('uh oh hotdot!')
        }
    }
    // ...code
}
```
- Method decorators also receive three arguments
```js
function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('Method decorator')
    console.log(target)
    console.log(name)
    console.log(descriptor)
}
```
- We can also add decorators to parameters:
```js
getPriceWithTax(@Log4 tax: number) {...}
```
- The decorator takes three arguments as well, taking the name of the method its attached to and the index of its position
```js
function Log4(target: any, name: string | Symbol, position: number) {
    console.log('Parameter decorator')
    console.log(target)
    console.log(name)
    console.log(position)
}
```

#### When Do Decorators Execute
- The instantiation of classes doesn't matter for decorators
    - Decorators execute when the class is defined
- Decorators don't execute at run time when a method is called
    - Instead decorators allows behind the scenes set up work when a class is defined
- Decorators add extra functionality behind the scenes

#### Returning (and changing) a Class in a Class Decorator
- In order to do more advanced things with decorators it is important to understand that some decorators, like class and method decorators, are capable of returning something
- Syntactic sugar for a constructor functoin which is based on the original constructor:
```js
return class extends constructor {}
```
- This allows us to keep the properties of the original class
```js
function WithTemplate(template: string, hookId: string) {
    console.log('Template Factory');
    return function<T extends {new(...args: any[]): {name:string}}>(originalConstructor: T){
        // returning and changing a class in a class decorator
        return class extends originalConstructor {
            constructor(...args: any[]) {
                super();
                console.log('rendering template')
                const hookEl = document.getElementById(hookId);
                const p = new originalConstructor();
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name;
                }
            }
        }
    }
}
```
- We're creating a class with a constructor function where the logic will be rendered to the DOM only when the object is instantiated

#### Other Decorator Return Types
- Decorators that allows return are the decorators that ared added to methods and accessors
- Decorators on properties and parameters *can* return, but TS ignores it
    - Return values aren't supported, so they're not used here
- [Property Descriptors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) exist in JS and they allow us to define a property in more detail

#### Wrap up
- There is a rich ecosystem of packages and frameworks that rely on decorators
    - [ts class validator](https://github.com/typestack/class-validator)
        - can be added to any project to add validation decorators which can be customized
    - [Angular](https://angular.io/docs) is a framework that heavily relies on docs
    - [Nest.js](https://docs.nestjs.com/) is servrside JS framework for node.js which heavily utilizes TS and decorators

---
### Practice Time: Let's Build a Drag & Drop Project
[Drag and Drop MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
#### Getting Started
- This will be an app that manages projects
- For now, all of the files will be in one ``app.ts`` file
    - We will break it down in the following module

#### DOM Element Selection & OOP Rendering
- Using object oriented programming, we can get access to HTML elements:
```js
class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;

    constructor() {
        this.templateElement = document.getElementById('project-input') as HTMLTemplateElement;
        this.hostElement = document.getElementById('app') as HTMLDivElement;
    }
}
```
- This code imports the content of a template element and creates a copy of it, including all its child nodes.
- The importNode constant holds the copy, which can then be manipulated or inserted into the DOM as needed:
```js
const importNode = document.importNode(this.templateElement.content, true)
```
- The element variable represents a copy of the content from a ``<template>`` element, and the attach method attaches that element as the first child of another specified element in the DOM.
```js
class ProjectInput {
    //...
    element: HTMLFormElement;

    constructor() {
        //...
        this.element = importNode.firstElementChild as HTMLFormElement;
        this.attach();
    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}
```

#### Interacting with DOM Elements
- We can apply and id and the corresponding css:
```js
this.element.id = 'user-input';
```
- We add new elements and populate them in the constructor:
```js
class ProjectInput {
    //..
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        //..

        this.configure();
        //..
    }

    private submitHandler(event: Event) {
        event.preventDefault();
        console.log(this.titleInputElement.value);
    }

    private configure() {
        this.element.addEventListener('submit', this.submitHandler.bind(this))
    }

    //..

}
```
- Keeping the setup in the contructor, we add the private methods to handle the insertion/fine tuning
    - Private methods can only be accessed from inside of the class

#### Creating & Using an "Autobind" Decorator
- rather than using ``.bind(this)``, we can use an autobind decorator
```js
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjustedDescriptor;
}

//..
    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        console.log(this.titleInputElement.value);
    }
//..
```
- We us the ``_`` to let TS know that we're not using those arguments

#### Fetching User Input
```js
//..
    private gatherUserInput(): [string,string,number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        if (
            enteredTitle.trim().length === 0 ||
            enteredDescription.trim().length === 0 ||
            enteredPeople.trim().length === 0
        ) {
            alert('Invalid input');
            return;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople]
        }
    }

    private clearInput() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            console.log(title,desc,people)
        }
        this.clearInput();
    }
//..
```
- The current method of validating information does not scale well

#### Creating a Re-usable Validation Functionality
- Our goal is to create a validate function that we can plug in where needed:
```js
   if (
            validate({value: enteredTitle, required: true, minLength: 5}) &&
            validate({value: enteredDescription, required: true, minLength: 5}) &&
            validate({value: enteredPeople, required: true, minLength: 5})
        ) {
            alert('Invalid input');
            return;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople]
        }
```
- We can start by creating an Interface:
```js
interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}
```
- The question mark allows for optional parameters
- Alternative to the ``?``, we can use undefined:
```js
required: boolean | undefined;
```
- Using ``!= null`` also checks for undefined
```js
function validate(validatableInput: Validatable) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null && typeof validatableInput.value ==='number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null && typeof validatableInput.value ==='number') {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}
```

#### Rendering Project Lists
- At the moment we're just console.logging: ``console.log(title,desc,people)``, but our goal is the render this information
- We create a class responsible for rendering a list of projects
    - It can be split into two classes:
        1. a class for the list
        1. a class for project items in the list
```js
class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;

    constructor(private type: 'active' | 'finished') {
        this.templateElement = document.getElementById('project-list') as HTMLTemplateElement;
        this.hostElement = document.getElementById('app') as HTMLDivElement;

        const importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild as HTMLElement;
        this.element.id = `${this.type}-projects`;
        this.attach();
        this.renderContent();
    }

    private renderContent() {
        const listId = `${this.type}-project-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    private attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
}
```

#### Managing Application State with Singletons
- We can build a class that manages the state of our application
- It will use listeners to listen for changes
```js
class ProjectState {
    private projects: any[] = [];

    addProject(title: string, description:string, numOfPeople: number) {
        const newProject = {
            id: Math.random.toString(),
            title: title,
            description: description,
            people: numOfPeople
        };
        this.projects.push(newProject);
    }
}

const projectState = new ProjectState();
```
- In our ``submiteHandler`` function  we can use ``projectState()``:
```js
    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject(title,desc,people)
            this.clearInput();
        }

    }
```
- We then create a ``ProjectList`` class:
```js
class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;

    constructor(private type: 'active' | 'finished') {
        this.templateElement = document.getElementById('project-list') as HTMLTemplateElement;
        this.hostElement = document.getElementById('app') as HTMLDivElement;

        const importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild as HTMLElement;
        this.element.id = `${this.type}-projects`;
        this.attach();
        this.renderContent();
    }

    private renderContent() {
        const listId = `${this.type}-project-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    private attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
}
```
- We then instantiate the ``ProjectList`` based on active and finished classes:

```js
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
```

#### More Classes & Custom Types
```js
private projects: any[] = [];
```
- We can improve on this and create a Project type
```js
enum ProjectStatus {Active, Finished}

class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus
    ) {}
}
```
- We can now use the ``Project`` class as a type:
```js
private projects: Project[] = [];
```
- We can update the ``addProject`` method:
```js
addProject(title: string, description:string, numOfPeople: number) {
        const newProject = new Project(
            Math.random.toString(),
            title,
            description,
            numOfPeople,
            ProjectStatus.Active
        )
        this.projects.push(newProject);
        // loop through listeners
        for (const listenerFn of this.listeners) {
            // use a copy of projects with slice method
            listenerFn(this.projects.slice())
        }
    }
```
- We can add a ``Listener`` type and use it where we are currently using any types:
```js
type Listener = (items: Project[]) => void;
//..
private listeners: Listener[] = [];
```

#### Filtering Projects with Enums
- In our ``ProjectList`` class, we update the ``projectState`` to add filtering:
```js
//..
        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(project => {
                if (this.type === 'active') {
                    return project.status === ProjectStatus.Active
                }
                return project.status === ProjectStatus.Finished
            })
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        })
//..
```

#### Adding Inheritance and Generics
- We can add components similar to react components by creating a ``Component`` class
```js
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(
        templateId: string,
        hostElementId: string,
        insertAtStart: boolean,
        newElementId?: string, // optional parameters should always be last

    ){
        this.templateElement = document.getElementById(templateId) as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId) as T;

        const importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild as U;
        if (newElementId) {
            this.element.id = newElementId;
        }

        this.attach(insertAtStart);
    }

    private attach(insert: boolean) {
        this.hostElement.insertAdjacentElement(insert ? 'afterbegin' : 'beforeend', this.element);
    }
}
```
- The abstract class ensures that it can't be instantiated
- We can further break down some classes and add generic types
    - we also need to change some private classes so they can be accessible throughout the app... we can use the protected keyword instead
```js
type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn)
    }
}

class ProjectState extends State<Project> {

    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super()
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }


    addProject(title: string, description:string, numOfPeople: number) {
        const newProject = new Project(
            Math.random.toString(),
            title,
            description,
            numOfPeople,
            ProjectStatus.Active
        )
        this.projects.push(newProject);
        // loop through listeners
        for (const listenerFn of this.listeners) {
            // use a copy of projects with slice method
            listenerFn(this.projects.slice())
        }
    }
}
```

#### Rendering Project Items with a Class
- Our goal is to render lists with a class by instantiation rather than our current method:
```js
private renderProjects() {
        //..
        for (const projectItem of this.assignedProjects) {
            const listItem = document.createElement('li');
            //...
        }
    }
```
- Rather than using ``const listItem = document.createElement('li');`` we want to instantiate a class there instead
- First we create the ``ProjectItem`` class:
```js
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
    private project: Project;

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    configure() {}

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.project.people.toString();
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}
```
- We can now use the ``ProjectItem`` class to render:
```js
private renderProjects() {
        const listEl = document.getElementById(`${this.type}-project-list`) as HTMLUListElement;
        //improves performance, prevents first project from being added twice
        listEl.innerHTML= '';
        // loop through project items and render
        for (const projectItem of this.assignedProjects) {
            new ProjectItem(this.element.id, projectItem);
        }
    }
```

#### Using a Getter
- We can use a getter to dynamically display the amount of people in the project
```js
get people() {
        if (this.project.people === 1) {
            return '1 person assigned'
        } else {
            return `{this.project.people} people assigned`
        }
    }
```
- We apply the getter here and access it like a property rather than calling a function:
```js
renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.people;
        this.element.querySelector('p')!.textContent = this.project.description;
    }
```

#### Utliziing Interfaces to Implement Drag and Drop
- We can create a contract for certain classes to sign to force the classes to implement certain methods that will help us with drag and drop
    - To do this, we can use interfaces
- In both TypeScript and JavaScript, the ``DragEvent`` is an interface that represents events related to drag and drop operations.
    - It provides information and methods related to the dragging of an HTML element.
```js
interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}
```

#### Drag Events and Reflecting the Current State in the UI
```js
@autobind
    dragOverHandler(_: DragEvent) {
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.add('droppable');
    }

    dropHandler(_: DragEvent) {}

    @autobind
    dragLeaveHandler(_: DragEvent) {
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable');
    }

    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        //...
    }
```

#### Adding a Droppable Area
- Step one:
```js
@autobind
    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }
```
- Step two:
```js
@autobind
    dragOverHandler(event: DragEvent) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.add('droppable');
        }

    }
```

#### Finishing Drag and Drop
- We need to add a method that will switch the status of a project:
```js
moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(project => project.id === projectId);
        if (project) {
            project.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {
        // loop through listeners
        for (const listenerFn of this.listeners) {
            // use a copy of projects with slice method
            listenerFn(this.projects.slice())
        }
    }
```
- We can now use this in the ``dropHandler``:
```js
@autobind
    dropHandler(event: DragEvent) {
        const projectId = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(projectId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished)
    }
```

---
### Modules and Namespaces
- It is not ideal to have all your code in one file
- Instead you want to write ``Modular Code``... splitting your code into modules
- Split your code into multiple files so each file is easy to manage and maintain
    - We import and expoert to and from these files

#### Writing Module Code - Your Options
- We have different options when splitting code into multiple files
- We could just create multiple files and have the TS compiler do the work
    - This runs into problems of not being able to get the full benefit of types as they can be split into different files
    - Not a great option for bigger projects
- Or, we can use ``Namespaces and File Bundling``
    - "namespaces" is a TS feature that adds special syntax to your code
    - It allows you to group code together below a namespace and import namespaces into other files
    - TS will bundle the different files into one file
- Another option is using ``ES6 Imports/Exports``
    - Modern JS out of the box supports import and export  statements which allows us to state which files depends on another file
    - We use the ES6 import/export syntax which is also supported by TS
    - Per file compilation but single script import
    - Bundling via third party tools such as Webpack so we can have one file

#### Working with Namespace
- We can use the namespaces by using the ``namespaces`` keyword: ``namespace DDInterfaces {}``
```js
// drag-drop-interfaces.ts
namespace DDInterfaces {
    export interface Draggable {
        dragStartHandler(event: DragEvent): void;
        dragEndHandler(event: DragEvent): void;
    }

    export interface DragTarget {
        dragOverHandler(event: DragEvent): void;
        dropHandler(event: DragEvent): void;
        dragLeaveHandler(event: DragEvent): void;
    }
}
```
- We can export features so they're available outside of the namespace
- ``///`` three slashes is syntax that will be picked up by TS
```js
// app.ts
/// <reference path="drag-drop-interfaces.ts" />
```
- We can use it to import files, but we have to do more to actually get the files to work.
    - We can name all of our namespacess ``App`` and use the same namespace in our main file

#### Organizing Files & Folders
- If we only have 3 or 4 files, it may not be neccesary to organize files into folders
- We also have to be careful when using the ``referece`` syntax when importing files
    - Keeping all of the references in the main app.js file could work, but it could lead to bugs when files are chaged or moved
- It is best to import directly to files that have dependencies rather than having all imports in the main file

#### Using ES Modules
- Using the reference syntax to import files will not show errors until runtime
- ``export`` is default JS syntax which is also supported by TS whereas ``namespace`` is a TS convention
```js
// app.ts
import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";

new ProjectInput();
new ProjectList('active');
new ProjectList('finished');
```
```js
// drag-drop.ts
export interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}
```
```js
import { Draggable } from '../models/drag-drop.js'
import { Project } from '../models/project.js';
import {Component} from './base-component.js'
import { autobind } from '../decorators/autobind.js';


// rendering project items with a class
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project;

    get people() {
        if (this.project.people === 1) {
            return '1 person assigned'
        } else {
            return `${this.project.people} people assigned`
        }
    }

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    @autobind
    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    dragEndHandler(_: DragEvent): void {
        console.log('Drag End')
    }

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.people;
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}
```
- In ``tsconfig`` we no longer have to use ``"outFile": "./dist/bundle.js",`` and instead of using ``"module": "amd",`` we use ``"module": "ES2015", ``
- In our html file, we have to import app.js as a module
```html
<script type="module" src="dist/app.js" defer></script>
```

#### Understanding various Import and Export Syntaxes
- One way to import would be to use brackets:
```js
import { Validatable, validate } from '../util/validation.js'

const titleValidatable: Validatable = {...}

 if (
            !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopelValidatable)
        ) {...}
```
- Or we can use ``*``:
```js
import * as Validation from '../util/validation.js'

const titleValidatable: Validation.Validatable = {...}

if (
            !Validation.validate(titleValidatable) ||
            !Validation.validate(descriptionValidatable) ||
            !Validation.validate(peopelValidatable)
        ) {...}
```
- We can also use aliases
```js
import { autobind as Autobin } from '../decorators/autobind.js';
```
- We can use one ``default`` export per file:
```js
export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {...}
```
- We don't need brackets to import the file:
```js
import Component from './base-component.js'
```
- We also don't have to name the file ``Component``, we can name it whatever we want, the default is what gets exported regardless of what we name it

#### Wrap Up
- ES Modules are recommended over namespaces because of the extra type safety
    - With ES modules, every file has to clearly specify what it wants
- However, ES Modules only work on modern browsers as the browser is relied on to import individual files
- To make all of this work on older browsers, we need to use a bundler
- JavaScript Modules (Overview): https://medium.com/computed-comparisons/commonjs-vs-amd-vs-requirejs-vs-es6-modules-2e814b114a0b
- More on ES Modules: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

---
### Using Webpack with TypeScript
- Official Webpack Docs: https://webpack.js.org/
- While using ES6 mades code more managable, it introduces a disadvantage of needing to bundle files
- To fix this issue, we can use webpack
#### What is Webpack and Why do we need it
- The disadvantage we have using ES6 is multiple HTTP requests made by the browser to load our page
- Webpack is a toll that will help us bundle our files together
**What is Webpack**
- It is a bundling and build orchestartion tool
    - It reduces the amount of HTTP requests by bundling code together
- Webpack optimizes our code and allows us to add more build steps

***Normal Setup***
- Multiple files and imports (requires multiple http requests)
- Unoptimized code (not as small as possible)
- External development server needed

***With Webpack***
- Code bundles, less imports required
- Optimized (minified) code, less code to download
- More buld steps can easily be added

#### Installing Webpack and Installing Dependencies
```bash
npm install --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader
```
```json
 "devDependencies": {
    "lite-server": "^2.6.1",
    "ts-loader": "^9.4.3",
    "typescript": "^5.1.3",
    "webpack": "^5.85.1",
    "webpack-cli": "^5.1.3",
    "webpack-dev-server": "^4.15.0"
  }
```

#### Adding Entry & Output Configuration
- Create a ``webpack.config.js`` file
```js
const path = require('path');

module.exports = {
    entry: './src/apps.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
```
- Webpack by default doesn't know what to do with TS files

#### Adding TypeScript Support with the ts-loader Package
```js
const path = require("path");

module.exports = {
  entry: "./src/apps.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
```
#### Finishing the Setup and Adding webpack-dev-server
- For spinning up a local development server that serves our website.
    - When using the latest Webpack version, you must edit the webpack.config.js file slightly.
1. Add a devServer option
```js
devServer: {
  static: [
    {
      directory: path.join(__dirname),
    },
  ],
},
```
1. Set output.publicPath to '/dist/'
```js
output: {
  filename: 'bundle.js',
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/dist/'
},
```
- Finished file:
```js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/app.ts',
  devServer: {
    static: [
      {
        directory: path.join(__dirname),
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
```

#### Adding a Production Workflow
- We typically want a different workflow for production builds
- We can create a ``webpack.config.prod.js``
```bash
npm install --save-dev clean-webpack-plugin
```
- This plug in will clear the dist folder every time a new build is created
- We can update the build command:
```json
"build": "webpack --config webpack.config.prod.js"
```

---
### Third Party Libraries and TypeScript
- Modern web development generally relies on third party libraries
- There are normal libraries that can be used with TS
- There are certain TS specific libraries

#### Using JavaScript Libraries with TypeScript
- [Lodash](https://lodash.com/) is a popular JS utility library
```bash
npm i --save lodash
```
```js
import _ from 'lodash'

console.log(_.shuffle([1,2,3,4]));
```
- The above would not work as this is a library built for JS
    - TS doesn't understand what is in the package as it is all JS files
- If we change the tsconfig, we can still compile the code with error, but the ``console.log()`` will work
```json
"noEmitOnError": false,
```
- Some JS libraries will have a types library for TS: https://www.npmjs.com/package/@types/lodash
```bash
npm install --save @types/lodash
```
- Most popular libraries will have an ``@types/library`` package for TS so JS libraries can be used with TS without throwing console errors
    - Technically the packages still work, but the console will throw TS errors and we have to allow compiling with errors

#### Using "declare" as a "last resort"
- There are some JS libraries that won't have a "types" install

```html
 <body>
    <script>
      var GLOBAL = "THIS IS SET";
    </script>
  </body>
```
```js
console.log(GLOBAL) // Cannot find name 'GLOBAL'. Did you mean 'global'?
```
- Even though we set the global in our HTML, TS does not recognize it
- We can use the ``declare`` variable available to TS
```js
declare const GLOBAL:string;
```
- We can use declare for packages or variables we know will exist but TS will not be aware of

#### No Types Needed: class-transformer
```js
// product.model.ts
export class Product {
    title: string;
    price: number;

    constructor(t:string, p:number) {
        this.title = t;
        this.price = p;
    }

    getInformation() {
        return [this.title, `$${this.price}`];
    }
}
```
```js
// app.ts
import {Product} from './product.model'

const products = [
    {title: 'A Book', price: 29.99},
    {title: 'The Product', price: 5.99}
]

const loadProducts = products.map(product => {
    return new Product(product.title, product.price);
})

for (const product of loadProducts) {
    console.log(product.getInformation())
}
```
- The above could be tedious for bigger projects
- There is a library that can help transform classes: https://www.npmjs.com/package/class-transformer
```bash
npm install class-transformer --save
npm install reflect-metadata --save
```
```js
import 'reflect-metadata'
import { plainToInstance } from 'class-transformer'
```
- In tsconfig, we have to enable a setting to allow this module to work:
```json
 "moduleResolution": "node",                     /* Specify how TypeScript looks up a file from a given module specifier. */
 ```
- We can use the ``plainToInstance`` method instead of mapping like we did eariler:
```js
const loadProducts = plainToInstance(Product, products)
```

#### TypeScript embracing: class-validator
- Allow use of decorator and non-decorator based validation: https://www.npmjs.com/package/class-validator
```bash
npm install class-validator --save
```
```js
import {IsNotEmpty, IsNumber, IsPositive} from 'class-validator';
```
- In tsconfig, we have to allow experimental decorators:
```json
"experimentalDecorators": true, /* Enable experimental support for legacy experimental decorators. */
```

---
### Select and Share a Place App
- Building an app that will allows us to look up addresses and convert it to coordinates
#### Project Setup
```html
<body>
    <div id="map">
        <p>Please Enter an Address</p>
    </div>
    <form>
        <input type="text" id="address" />
        <button type="submit">SEARCH PLACE</button>
    </form>
</body>
```

#### Getting User Input
```js
const form = document.querySelector('form') as HTMLFormElement;
const addressInput = document.getElementById('address') as HTMLInputElement;

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;

    // send this to google's API

}

form.addEventListener('submit', searchAddressHandler);
```

#### Using Axios
- [Axios](https://www.npmjs.com/package/axios) supports TS out of the box so extra libraries don't need to be installed
- Libraries that support TS will autocomplete effects for things such as methods
```js
import axios from "axios";
import dotenv from 'dotenv'

dotenv.config()

const apiKey = process.env.GOOGLE_API

const form = document.querySelector('form') as HTMLFormElement;
const addressInput = document.getElementById('address') as HTMLInputElement;

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;

    // send this to google's API
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${apiKey}`)
}

form.addEventListener('submit', searchAddressHandler);
```
- The ``encodeURI`` method parses a string into a URL compatible string

```js
//...
type GoogleGeocoding = {
    results: {geometry: {location: {lat:number, lng: number}}}[];
    status: 'OK' | 'ZERO_RESULTS';
}

//...

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;

    // send this to google's API
    axios.get<GoogleGeocoding>(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${enteredAddress}&key=${apiKey}`
    )
    .then(response => {
        if (response.data.status !== "OK") {
            throw new Error('Could not fetch location')
        }
        const coordinates = response.data.results[0].geometry.location
    })
    .catch(err =>{
        alert(err.message);
        console.log(err);
    });
}

form.addEventListener('submit', searchAddressHandler);
```
- We can create a custom type for the API return

#### Rendering a Map
```html
<script async
    src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap">
</script>
```