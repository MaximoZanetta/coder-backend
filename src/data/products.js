const products = require('./database.json')

const getAllProducts = ()=>{
    return products;
}

const getOneProduct = (productId)=>{
    const productFound = products.find(product => product.id ==productId)
    return productFound;
}

const deleteOneProduct = (productId)=>{
    // const productDeleted = products.filter(product =>product.id != productId)
    // console.log(productDeleted)
    const productDeleted = products.filter(product =>product.id != productId)
    
    return productDeleted;
}

const updateOneProduct = (productId,body)=>{
    const findIndex = products.findIndex(product => product.id == productId)
    const {name, price, url} = body;
    const productUpdated = {
        ...products[findIndex],
        name,
        price,
        url
    }
    products[findIndex]=productUpdated;

    return productUpdated;
    
}

module.exports = {
    getAllProducts,
    getOneProduct,
    deleteOneProduct,
    updateOneProduct
}