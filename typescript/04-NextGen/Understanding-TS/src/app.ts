// const userName = 'Robin'
// // userName = 'Nibor'

// let age = 36
// age = 99

// function add(a: number, b: number) {
//     let result
//     result = a + b
//     return result
// }

// console.log(result) // Cannot find name 'result'

// if (age > 30) {
//     let isOld = true
// }

// console.log(isOld)

const add = (a:number, b:number = 1) => a + b;

const printOut: (a: number | string) => void = output => console.log(output);

printOut(add(5));

const button = document.querySelector('button');

if (button) {
    button.addEventListener('click', event => console.log(event));
}

// spread operator
const hobbies = ['Jasper', 'Watching MMA'];
const oldHobbies = ['Gaming','Watching Baseball'];

hobbies.push(...oldHobbies);

console.log(hobbies);

const person = {
    firstName: 'Robin',
    age: '36'
}

const copiedPerson = {...person};
copiedPerson.firstName = 'Nibor'

console.log(person.firstName, copiedPerson.firstName)

// Rest Parameters
const sum = (...args: number[]) => {
    return args.reduce((r,a) => r+a)
}

const addNumbers = sum(1,2,3,4)
console.log(addNumbers)

// Destructuring
const [hobby1, hobby2, ...remaingHobbies] = hobbies
console.log(hobby1, hobby2, remaingHobbies)

const {firstName,age} = person;
console.log(firstName,age)