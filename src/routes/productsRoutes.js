const express = require('express')
const route = express.Router()


const productsController = require('../controllers/productsController')



route
    .get('/', productsController.getAllProducts)
    .get('/:productId', productsController.getOneProduct)
    .delete('/:productId',productsController.deleteOneProduct )
    .post('/', productsController.createOneProduct)
    .put('/:productId',productsController.updateOneProduct )


    module.exports = route;
