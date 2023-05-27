// what are generics?
const names: Array<string> = [] // the same as string[]

const promise: Promise<number> = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve(10)
    }, 2000)
});

// promise.then(data => {
//     data.split(' ')
// })

// creating a generic function (contraints)
function merge<T extends object, U extends object> (objA: T, objB: U) {
    return Object.assign(objA, objB)
}

console.log(merge({name: 'Robin'}, {age:36}))

const mergedObj = merge({name:'Mayhem'}, {age: 16})
const mergedObj2 = merge({name: 'Mayhem', hobbies: ['Sleep', 'Rest']}, {age:16} )
const mergedObj3 = merge<object, object>({name:'Jasper'},{age:0.5})
const mergedObj4 = merge<{name:string, hobbies: string[]}, {age:number}>({name: 'Mayhem', hobbies: ['Sleep', 'Rest']}, {age:16})
mergedObj.name

// another generic function
interface Lengthy {
    length: number
}
function countAndPrint<T extends Lengthy>(element: T): [T,string] {
    let description = 'Got no value.';
    if (element.length > 0) {
        description =  'Got ' + element.length + ' elements.'
    }
    return [element, description];
}

console.log(countAndPrint('Hi there.'))

// the "keyof" constraint
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key]
}

// Generic Classes
class DataStorage<T extends string | number | boolean > {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item)
    }

    removeItem(item: T) {
        // if (this.data.indexOf(item) === -1) {
        //     return
        // }
        this.data.splice(this.data.indexOf(item), 1)
    }

    getItems() {
        return [...this.data]
    }
}

const textStorage = new DataStorage<string>()
textStorage.addItem('Mayhem')
textStorage.addItem('Jasper')
textStorage.addItem('Mungo')
textStorage.removeItem('Mungo')
console.log(textStorage.getItems())

const numberStorage = new DataStorage<number>()
numberStorage.addItem(17)
numberStorage.addItem(33)
numberStorage.addItem(777)
console.log(numberStorage.getItems())

// const objectStorage = new DataStorage<object>()
// objectStorage.addItem({name: 'Mayhem'})
// const jasperObject = {name:'Jasper'}
// objectStorage.addItem(jasperObject)
// const nalaObject = {name: 'Nala'}
// objectStorage.addItem(nalaObject)
// objectStorage.removeItem(jasperObject)
// console.log(objectStorage.getItems())

// generic utility types
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

const pooches: Readonly<string[]> = ['Mayhem', 'Jasper']
// pooches.push('Robin')
// pooches.pop()