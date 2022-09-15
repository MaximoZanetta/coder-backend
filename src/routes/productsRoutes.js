const express = require('express')
const route = express.Router()
// const products = JSON.parse(fs.readFileSync('../data/database.json', 'utf-8'))
const Contenedor = require('../../index')
const contenedor = new Contenedor()
const item = require('../data/products')
const products = require('../data/database.json')



route
    .get('/',  (req,res)=>{
        
        res.send(item.getAllProducts());
        // const allProducts = await contenedor.getAll().then( res => res)
        // res.json(allProducts)
        // return res.status(200).send({result: 'OK', data: allProducts})
        // res.send('get all products')
    })
    .get('/:productId', (req,res)=>{
        res.send(item.getOneProduct(req.params.productId))
        // const { id }=req.params.productId;
        // console.log(id)
        // const productFound = contenedor.getById(+id).then()
        // return res.json(productFound)
        // const getProduct = products.find(product=> product.id === req.params.productId)
        // return res.json(getProduct)
        // res.send(`get product by ${req.params.productId}`)
    })
    .delete('/:productId', (req,res)=>{

        // res.send(item.deleteOneProduct(req.params.productId))
        res.json({result: 'OK', productDeleted: item.deleteOneProduct(req.params.productId)})
    })
    .post('/', (req,res)=>{
        const {name,price,url} = req.body;

        if(!name ||
           !price ||
           !url){
            return res.status(400).send({result: 'Not Okay'})
        }
        const newProduct = {
            name,
            price: +(price),
            url,
            id: products.length + 1
        }

        contenedor.save(newProduct)

        return res.send({result: 'OK', data:newProduct})
        
        

    })
    .put('/:productId', (req,res)=>{
        
        return res.json({result:'ok',result: item.updateOneProduct(req.params.productId, req.body)})
    })


    module.exports = route;
