
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
