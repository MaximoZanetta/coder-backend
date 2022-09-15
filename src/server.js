const express = require('express')
const apiRouters = require('./routes/appRoutes')

const PORT = process.env.PORT || 8080

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api',apiRouters)
app.use(express.static('src/public'))




app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})

