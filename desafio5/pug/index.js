const express = require('express')
const app = express()
const path = require('path')
const productsRoutes = require('./routes/productRoutes')

const PORT = process.env.PORT || 8080



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('desafio5/ejs/public'))



app.set('views', path.join(__dirname, 'views') )
app.set('view engine', 'pug')


app.use('/products', productsRoutes)
app.use('/', productsRoutes)

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})