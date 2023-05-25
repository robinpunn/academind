// interface Admin {
//     name: string;
//     privileges: string[]
// }

// interface Employee {
//     name: string;
//     startDate: Date;
// }

// interface ElevatedEmployee extends Admin, Employee {}

type Admin = {
    name: string;
    privileges: string[]
}

type Employee = {
    name: string;
    startDate: Date;
}

type ElevatedEmployee = Admin &Employee;

const e1: ElevatedEmployee = {
    name: 'Robin',
    privileges: ['Breaks', 'Naps', 'Buffet'],
    startDate: new Date()
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// More on Type Guards
//ex1
// function add(a: Combinable, b: Combinable) {
//     if (typeof a === 'string' || typeof b === 'string') {
//         return a.toString() + b.toString();
//     }
//     return a + b;
// }

//ex2
type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
    console.log('Name: ' + emp.name);
    if ('privileges' in emp) {
        console.log('Privileges: ' + emp.privileges);
    };
    if ('startDate' in emp) {
        console.log('Start Date: ' + emp.startDate);
    };
}

printEmployeeInformation(e1);
printEmployeeInformation({name: 'Mungo', startDate:new Date()})

//ex 3
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

useVehicle(v1);
useVehicle(v2);

// Discriminated Unions
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

// Type Casting
// const paragraph = <HTMLParagraphElement>document.querySelector('p');
// const userInput = <HTMLInputElement>document.getElementById('userInput')

const paragraph = document.querySelector('p');
const userInput = document.getElementById('user-input')! as HTMLInputElement;

if (paragraph) {
 (paragraph as HTMLParagraphElement).innerText = 'Bungo'
}

userInput.value = 'Hi there'

// Index Properties
interface ErrorContainer {
    [prop: string]: string;
    [prop: number]: string
}

const errorBag: ErrorContainer = {
    email: 'Not a valid email',
    userName: 'Must start with a capital character',
    34: 'ok ok ok',
    manor: "mungo",
    33: 'magic number'
}

// Function Overloads
function add(a:number, b: number): number
function add(a:string, b: string): string;
function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

const result = add('Robin','Flobin') as string;
result.split('');

// Optional Chaining
const fetchedUserData = {
    id: 'u1',
    name: 'Robin',
    job: {title: 'CEO', description: 'My own company'}
}

console.log(fetchedUserData.job.title);

// Nullish Coalescing
const userData = null

const storedData = userInput ?? 'DEFAULT';