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

// diving into property decorators
function Log(target: any, propertyName: string | Symbol) {
    console.log('Property decorator');
    console.log(target,propertyName);
}

// accessor and parameter decorators
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accessor decorator')
    console.log(target)
    console.log(name)
    console.log(descriptor)
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('Method decorator')
    console.log(target)
    console.log(name)
    console.log(descriptor)
}

function Log4(target: any, name: string | Symbol, position: number) {
    console.log('Parameter decorator')
    console.log(target)
    console.log(name)
    console.log(position)
}

class Product {
    @Log
    title: string;
    private _price: number;

    @Log2
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

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax);
    }
}

// creating an "autobind" decorator
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn
        },
    };
    return adjDescriptor;
}

class Printer {
    message = 'This works!';

    @Autobind
    showMessage() {
        console.log(this.message)
    }
}

const p = new Printer();

const button = document.querySelector('button') as HTMLElement;
button.addEventListener('click', p.showMessage);

// validation with decorators
interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[];
    }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
    };
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive']
    };
}

function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}

class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p:number) {
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);

    if (!validate(createdCourse)) {
        alert('Invalid Input, please try again');
        return
    }

    console.log(createdCourse);
})





















// interface ValidatorConfig {
//     [property: string]: {
//         [validatableProp: string] : string[]
//     }
// }

// const registeredValidators: ValidatorConfig = {}

// function Required(target: any, propName: string) {
//     registeredValidators[target.constructor.name] = {
//         [propName]: ['required']
//     }
// }

// function PositiveNumber(target: any, propName: string) {
//     registeredValidators[target.constructor.name] = {
//         [propName]: ['positive']
//     }
// }

// function validate(obj: object) {
//     const objValidatorsConfig = registeredValidators[obj.constructor.name];
//     if (!objValidatorsConfig) {
//         return true;
//     }
//     for (const prop in objValidatorsConfig) {
//         for (const validator of objValidatorsConfig[prop]) {
//             switch (validator) {
//                 case 'required':
//                     return obj[prop]
//             }
//         }
//     }
// }

// class Course {
//     @Required
//     title: string;
//     @PositiveNumber
//     price: number;

//     constructor(t:string, p:number) {
//         this.title = t;
//         this.price = p;
//     }
// }

// const courseForm = document.querySelector('form') as HTMLElement
// courseForm.addEventListener('submit', event => {
//     event.preventDefault();
//     const titleEl = document.getElementById('title') as HTMLInputElement
//     const priceEl = document.getElementById('price') as HTMLInputElement

//     const title = titleEl.value;
//     const price = +priceEl.value;

//     const createdCourse = new Course(title,price)

//     if (!validate(createdCourse)) {
//         alert('Invalid input');
//         return
//     }
//     console.log(createdCourse)
// })
