const productsService = require('../services/productsService')
const products = require('../data/database.json')


const getAllProducts = (req,res)=>{
    const allProducts = productsService.getAllProducts()
    return res.send({result: 'OKAY', data: allProducts})
}

const getOneProduct = (req,res)=>{
    const product = productsService.getOneProduct(req.params.productId)
    return res.send({result: 'OKAY', data: product})
}

const deleteOneProduct = (req,res)=>{
    const deletedProduct = productsService.deleteOneProduct(req.params.productId)
    if(deletedProduct == -1){
        return res.send({result: 'THE PRODUCT DOES NOT EXIST'})
    }
    return res.send({result: 'OKAY', result: deletedProduct})
}

const updateOneProduct = (req,res)=>{
        const updatedProduct = productsService.updateOneProduct(req.params.productId, req.body)
        if(updatedProduct == -1){
            return res.send({result: 'THE PRODUCT DOES NOT EXIST'})
        }
        return res.send({result: 'OKAY', data: updatedProduct})
}

const createOneProduct = (req,res)=>{
    const {name,price,url} = req.body;

    if(!name ||
       !price ||
       !url){
        return res.status(400).send({result: 'Not Okay'})
    }
    const newProduct = {
        id: products.length + 1,
        name,
        price: +(price),
        url
    }

    const createdProduct = productsService.createOneProduct(newProduct)

    return res.send({result: 'OK', data: createdProduct})
    

}


module.exports = {
    getAllProducts,
    getOneProduct,
    deleteOneProduct,
    updateOneProduct,
    createOneProduct
}