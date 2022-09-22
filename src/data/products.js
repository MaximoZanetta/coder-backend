const products = require('./database.json')
const { saveToDatabase } = require('./utils')

const getAllProducts = ()=>{
    return products;
}

const getOneProduct = (productId)=>{
    const productFound = products.find(product => product.id ==productId)
    return productFound;
}

const deleteOneProduct = (productId)=>{
    const productDeleted = products.findIndex(product =>product.id == productId)
    if(productDeleted == -1){
        return productDeleted
    }
    
    products.splice(productDeleted,1)
    saveToDatabase(products)

    return productDeleted;
}

const updateOneProduct = (productId, body)=>{
    const findIndex = products.findIndex(product => product.id == productId)
    if(findIndex == -1){
        return findIndex
    }
    
    const productUpdated = {
        ...products[findIndex],
        ...body
    }
    console.log(productUpdated)
    products[findIndex]=productUpdated;
    
    saveToDatabase(products)

    return productUpdated;
    
}

const createOneProduct = (newProduct) => {
    products.push(newProduct)
    saveToDatabase(products)
    return newProduct
}

module.exports = {
    getAllProducts,
    getOneProduct,
    deleteOneProduct,
    updateOneProduct,
    createOneProduct
}