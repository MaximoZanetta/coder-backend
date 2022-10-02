const express = require('express')
const {Server: HttpServer}  = require('http')
const {Server: SocketServer}= require('socket.io')
const PORT = process.env.PORT || 8080;
const app = express()
const httpServer = new HttpServer(app)
const io = new SocketServer(httpServer)
const moment = require('moment');
const { saveProduct, saveMessage } = require('./utils/utils');
const products = require('./data/products.json')
const messages = require('./data/messages.json')


//PRODUCTS
// const products = [
//     {
//       id: 1,
//       name: "tenedor",
//       price: 100,
//       url: "http/tenedor.png"
//     },
//     {
//       id: 2,
//       name: "cuchillo",
//       price: 120,
//       url: "http/cuchillo.png"
//     },
//     {
//       id: 3,
//       name: "vaso",
//       price: 130,
//       url: "http/vaso.png"
//     }
// ]

// const messages = [
    // {
    //   author: "diego.flores@gmail.com",
    //   message: "Hola"
    // },
    // {
    //   author: "jorge.ramos@gmail.com",
    //   message: "Cómo están"
    // },
    // {
    //   author: "analucia.lopez@gmail.com",
    //   message: "Hola grupo"
    // }
// ]


//MIDDLEWARES
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))


//ROUTES
app.get('/',(req,res)=>{
    res.sendFile('index.html')
})

//SOCKETS EVENTS
io.on('connection',(socket)=>{

    //send products to the front
    socket.emit('products', products)

    //send messages to the front
    socket.emit('messages', messages)


    //recibe newProduct
    socket.on('new-products', (data)=>{
        const newProduct = {
            id: products.length + 1,
            name: data.name,
            price: data.price,
            url: data.url
        }
        products.push(newProduct)
        saveProduct(products)

        io.sockets.emit('products', products)
    })

    socket.on('new-messages', (data)=>{
        const newMessage = {
            author: data.author,
            message: data.message,
            time: moment().format('h:mm a')
        }
        messages.push(newMessage)
        saveMessage(messages)

        io.sockets.emit('messages', messages)
    })
})







httpServer.listen(PORT, ()=>{
    console.log('the server is running babyy');
})