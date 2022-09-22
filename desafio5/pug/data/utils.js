const fs = require('fs')


const saveToDatabase = (products) =>{
    fs.writeFileSync('desafio5/ejs/data/database.json', JSON.stringify(products, null , 2),{
        encoding: 'utf-8'
    })
}

module.exports = {saveToDatabase}