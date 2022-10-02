
const fs = require('fs')


const saveProduct = (newProduct) => {
    fs.writeFileSync('desafio6/data/products.json', JSON.stringify(newProduct, null , 2), {
        encoding: 'utf-8'
    })
}

const saveMessage = (newMessage) => {
    fs.writeFileSync('desafio6/data/messages.json', JSON.stringify(newMessage, null , 2), {
        encoding: 'utf-8'
    })
}

module.exports = {
    saveProduct,
    saveMessage
}