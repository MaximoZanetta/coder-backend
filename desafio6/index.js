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

const {mariaDB, sqlite}= require('./db/config')
const Productos = require('./controller/sql.client')
const Messages = require('./controller/sql.msg')

const productsDB = new Productos(mariaDB, 'productos')
const messagesDB = new Messages(sqlite, 'messages')
productsDB.createTable()
messagesDB.createTable()


//MIDDLEWARES
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))


//ROUTES
app.get('/',(req,res)=>{
    res.sendFile('index.html')
})

//SOCKETS EVENTS
io.on('connection', async (socket)=>{

    //send products to the front
    const products = await productsDB.getAll()
    socket.emit('products', products)

    //send messages to the front
    const messages = await messagesDB.allMessages()
    socket.emit('messages', messages)


    //recibe newProduct
    socket.on('new-products', async  (data)=>{
        const newProduct = {
            name: data.name,
            price: data.price,
            url: data.url
        }
        await productsDB.insert(newProduct)
        const updatedProducts = await productsDB.getAll()
        // products.push(newProduct)
        // saveProduct(products)

        io.sockets.emit('products', updatedProducts)
    })

    socket.on('new-messages', async (data)=>{
        const newMessage = {
            author: data.author,
            message: data.message,
            time: moment().format('h:mm a')
        }

        await messagesDB.addMessage(newMessage)
        const messagesUpdated = await messagesDB.allMessages()
        // messages.push(newMessage)
        // saveMessage(messages)

        io.sockets.emit('messages', messagesUpdated)
    })
})







httpServer.listen(PORT, ()=>{
    console.log('the server is running babyy');
})