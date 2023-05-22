// const person: {
//     name: string;
//     age: number;
// } = {
// const person: {
//     name: string;
//     age: number;
//     hobbies: string[];
//     role: [number,string]
// } = {
//     name: 'Robin',
//     age: 36,
//     hobbies: ['Walking my Dog', 'Watching MMA'],
//     role: [1, "web dev"]
// }

// const ADMIN = 0
// const READ_ONLY = 1
// const AUTHOR = 2

enum Role {ADMIN, READ_ONLY, AUTHOR}

const person = {
    name: 'Robin',
    age: 36,
    hobbies: ['Walking my Dog', 'Watching MMA'],
    role: Role.AUTHOR
}

// person.role.push('admin')
// person.role[1] = 10

// person.role = [0, 'admin', 'user']

console.log(person.name)

let favoriteHobbies: string[]
favoriteHobbies = ['Learning']

let favoriteAnimals: any[]
favoriteAnimals = [5, 'jeeves', 'dogs']

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase(), person.role) // this works because ts knows hobby is a string
    // console.log(hobby.map()) // this is an error because you can't map over strings
}

if (person.role === Role.AUTHOR) {
    console.log('is author')
}