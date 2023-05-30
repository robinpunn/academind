"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// A first class decorator
function Logger(logString) {
    console.log('Logger factory');
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
// building more useful decorators
function WithTemplate(template, hookId) {
    console.log('Template Factory');
    return function (originalConstructor) {
        // returning and changing a class in a class decorator
        return class extends originalConstructor {
            constructor(...args) {
                super();
                console.log('rendering template');
                const hookEl = document.getElementById(hookId);
                const p = new originalConstructor();
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1').textContent = this.name;
                }
            }
        };
    };
}
// @Logger ('LOGGING - DOG')
let Dog = class Dog {
    constructor() {
        this.name = 'Jasper';
        console.log('Creating dog object...');
    }
};
Dog = __decorate([
    Logger('Logging'),
    WithTemplate('<h1>My Dog Object</h1>', 'app')
], Dog);
const dog = new Dog();
console.log(dog);
// diving into property decorators
function Log(target, propertyName) {
    console.log('Property decorator');
    console.log(target, propertyName);
}
// accessor and parameter decorators
function Log2(target, name, descriptor) {
    console.log('Accessor decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log3(target, name, descriptor) {
    console.log('Method decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log4(target, name, position) {
    console.log('Parameter decorator');
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error('uh oh hotdot!');
        }
    }
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
// creating an "autobind" decorator
function Autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
class Printer {
    constructor() {
        this.message = 'This works!';
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    Autobind
], Printer.prototype, "showMessage", null);
const p = new Printer();
const button = document.querySelector('button');
button.addEventListener('click', p.showMessage);
const registeredValidators = {};
function Required(target, propName) {
    var _a, _b;
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: [...((_b = (_a = registeredValidators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : []), 'required'] });
}
function PositiveNumber(target, propName) {
    var _a, _b;
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: [...((_b = (_a = registeredValidators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : []), 'positive'] });
}
function validate(obj) {
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
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector('form');
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title');
    const priceEl = document.getElementById('price');
    const title = titleEl.value;
    const price = +priceEl.value;
    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        alert('Invalid Input, please try again');
        return;
    }
    console.log(createdCourse);
});
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
