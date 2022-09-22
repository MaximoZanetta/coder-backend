const express = require('express')
const products = require('../data/database.json')
const router = express.Router()
const {saveToDatabase} = require('../data/utils')

router
    .get('/', (req,res) => {
        res.render('main', {products})
    })
    .post('/', (req, res) => {
        const {name, price, url} = req.body;
        const newProduct = {
            id: Number(products.length + 1),
            name,
            price,
            url
        }

        products.push(newProduct)
        saveToDatabase(products)

        res.redirect('/products')
    })

module.exports = router;