const Products = require('../data/products')

const getAllProducts = () => {
    const allProducts = Products.getAllProducts()
    return allProducts
}
const getOneProduct = (id) => {
    const product = Products.getOneProduct(id)
    return product
}
const deleteOneProduct = (id) => {
    const deletedProduct = Products.deleteOneProduct(id)
    return deletedProduct
}
const updateOneProduct = (id, body) => {
    const updatedProduct = Products.updateOneProduct(id, body)
    return updatedProduct
}
const createOneProduct = (newProduct) => {
    const createdProduct = Products.createOneProduct(newProduct)
    return createdProduct;
}

module.exports = {
    getAllProducts,
    getOneProduct,
    deleteOneProduct,
    updateOneProduct,
    createOneProduct
}