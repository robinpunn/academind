## Javascript Refresher

### Table of Contents
1. [Understanding Spread and Rest Operators](#understanding-spread-and-rest-operators)
    - [Mutating an Array](#mutating-an-array)
    - [Copying an Array](#copying-an-array)
    - [Spread Operator](#spread-operator)
    - [Rest Operator](#rest-operator)
2. [Destructuring](#destructuring)
    - [Object Destructuring](#object-destructuring)
    - [Array Destructuring](#array-destructuring)
3. [Async Code & Promises](#async-code-&-promises)
    - [Asynchronous Code](#asynchronous-code)
    - [Callbacks](#callbacks)
    - [Promises](#promises)

---

### Understanding Spread and Rest Operators
- The spread and rest operators allow us to pull out elements and give us a real copy of an array or list of arguments.
- Both have similar syntax using the three dots (...).
    - If we are trying to pull out elements, we use the spread operator.
    - If we are trying to merge a list of arguments into an array, we use the rest operator.
#### Mutating an Array
```js
const person {
    name: 'Robin',
    age: 36,
    greet(){
        console.log('Hi, I am ' + this.name)
    }
}

const hobbies = ['Learning', 'Coding']
hobies.push('Watching Tennis and Mixed Martial Arts')
```
- In the approach above, we are mutating the array. 

#### Copying an Array
```js
const copiedArray = hobbies.slice()
```
- In the approach above, we are copying the array. 

```js
const copiedArray = [hobbies]
console.log(copiedArray) // [[ 'Learning', 'Coding', 'Watching Tennis and Mixed Martial Arts' ]]
```
- The above is not quite what we want. We want to copy the array, not the array inside an array. 

#### Spread Operator
```js
const copiedArray = [...hobbies]
console.log(copiedArray) // [ 'Learning', 'Coding', 'Watching Tennis and Mixed Martial Arts' ]
```
- The spread operator allows us to pull out elements and gives us a real copy of the array. 

```js
const copiedPerson = {...person}
console.log(copiedPerson) // { name: 'Robin', age: 36, greet: [Function: greet] }
```
- The spread operator also works with objects. 

#### Rest Operator
```js
const toArray = (arg1, arg2, arg3) => {
    return [arg1, arg2, arg3]
}

console.log(toArray(1, 2, 3)) // [ 1, 2, 3 ]
console.log(toArray(1, 2, 3, 4)) // [ 1, 2, 3]
``` 
- The above is not a flexible approach as we are limited by the number of arguments we can pass in. 

```js
const toArray = (...args) => {
    return args
}
console.log(toArray(1, 2, 3, 4)) // [ 1, 2, 3, 4 ]
```
- The rest operator allows us to pass in as many arguments as we want and returns an array.

---

### Destructuring
#### Object Destructuring
```js
const person = {
    name: 'Robin',
    age: 36,
    greet(){
        console.log('Hi, I am ' + this.name)
    }
}

const printName = (personData) => {
    console.log(personData.name)
}

printName(person) // Robin
```
- The above approach works if we have a lot of properties in the object.

```js
const printName = ({name}) => {
    console.log(name)
}
printName(person) // Robin

const {name, age} = person
console.log(name, age) // Robin 36
```
- In the function above, the argument specifies the property we want to pull out.
- The behaviour is not limited to functions. We can also use it outside of functions.

#### Array Destructuring
```js
const hobbies = ['Learning', 'Coding']
const [hobby1, hobby2] = hobbies
console.log(hobby1, hobby2) // Learning Coding
```
- With array destructuring, we can name the variables however we want as opposed to objects where we have to use the property names.
    - This is because arrays are ordered.

---

### Async Code & Promises
#### Asynchronous Code
- Asynchronous code is code that is executed after the current code has finished executing.
```js
setTimeout(() => {
    console.log('Timer is done!')
}, 2000) // this will run after 2 seconds
console.log('Hello!')
console.log('Hi!')

// Hello!
// Hi!
// Timer is done!
```
- Even if the timer was set to 0, the timer will still run after the console.log statements.

#### Callbacks
- Callbacks are functions that are executed after another function has finished executing.
```js
const fetchData = callback => {
    setTimeout(() => {
        callback('Done!')
    },1500)
} // create a function that gets a callback

setTimeout(()=> {
    console.log('Timer is done!')
    fetchData(text => {
        console.log(text)
    })
}, 2000)

console.log('Hello!')
console.log('Hi!')

// Hello!
// Hi!
// Timer is done!
// Done!
```
- Even though the setTimeout function is set to a longer time than the fetchData, the console prints setTimeout first because the fetchData function is asynchronous.

#### Promises
- Promises are objects that represent the eventual completion or failure of an asynchronous operation.
```js
const fetchData = () => {
    const promise = new Promise((resolve,reject)=> {
        setTimeout(() => {
            resolve('Done!')
        },1500)
    })
    return promise
}

setTimeout(()=> {
    console.log('Timer is done!')
    fetchData()
        .then(text => {
            console.log(text)
            return fetchData()
        })
        .then(text2 => {
            console.log(text2)
        })
}, 2000)

console.log('Hello!')
console.log('Hi!')

// Hello!
// Hi!
// Timer is done!
// Done!
// Done!
```
- The fetchData function returns a promise.
    - The then method is executed when the promise is resolved.
    - The then method returns a new promise.
    - The second then method is executed when the second promise is resolved.
