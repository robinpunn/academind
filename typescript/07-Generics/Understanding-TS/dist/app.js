"use strict";
// what are generics?
const names = []; // the same as string[]
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(10);
    }, 2000);
});
// promise.then(data => {
//     data.split(' ')
// })
// creating a generic function (contraints)
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
console.log(merge({ name: 'Robin' }, { age: 36 }));
const mergedObj = merge({ name: 'Mayhem' }, { age: 16 });
const mergedObj2 = merge({ name: 'Mayhem', hobbies: ['Sleep', 'Rest'] }, { age: 16 });
const mergedObj3 = merge({ name: 'Jasper' }, { age: 0.5 });
const mergedObj4 = merge({ name: 'Mayhem', hobbies: ['Sleep', 'Rest'] }, { age: 16 });
mergedObj.name;
function countAndPrint(element) {
    let description = 'Got no value.';
    if (element.length > 0) {
        description = 'Got ' + element.length + ' elements.';
    }
    return [element, description];
}
console.log(countAndPrint('Hi there.'));
// the "keyof" constraint
function extractAndConvert(obj, key) {
    return obj[key];
}
// Generic Classes
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        // if (this.data.indexOf(item) === -1) {
        //     return
        // }
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem('Mayhem');
textStorage.addItem('Jasper');
textStorage.addItem('Mungo');
textStorage.removeItem('Mungo');
console.log(textStorage.getItems());
const numberStorage = new DataStorage();
numberStorage.addItem(17);
numberStorage.addItem(33);
numberStorage.addItem(777);
console.log(numberStorage.getItems());
function createCourseGoal(title, description, date) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal;
}
const pooches = ['Mayhem', 'Jasper'];
// pooches.push('Robin')
// pooches.pop()
