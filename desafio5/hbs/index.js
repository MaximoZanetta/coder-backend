const express = require('express')
const app = express()
const path = require('path')
const productsRoutes = require('./routes/productRoutes')
const { engine: handlebars }= require('express-handlebars')

const PORT = process.env.PORT || 8080



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('desafio5/ejs/public'))


app.use('/products', productsRoutes)
app.use('/', productsRoutes)

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/views'))
app.engine(
    'hbs', 
    handlebars({
        layoutsDir: path.join(__dirname, 'views/layouts'),
        partialsDir: path.join(__dirname, 'views/partials'),
        defaultLayout: 'index',
        extname: 'hbs',
}))

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})