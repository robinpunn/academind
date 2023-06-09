import 'reflect-metadata'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

import {Product} from './product.model'

const products = [
    {title: 'A Book', price: 29.99},
    {title: 'The Product', price: 5.99}
]

// let product = new Product('The Product', 5.99)

// const loadProducts = products.map(product => {
//     return new Product(product.title, product.price);
// })

// const loadProducts = plainToInstance(Product, products)

// for (const product of loadProducts) {
//     console.log(product.getInformation())
// }

const newProd = new Product('', -5.99)
validate(newProd).then(errors => {
    if (errors.length > 0) {
        console.log('ERRORS: ', errors)
    } else {
        console.log(newProd.getInformation())
    }
})