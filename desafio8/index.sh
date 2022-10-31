//CRUD MONGO


use ecommerce

db.products.insertMany([
    {title: "Product 1", price: 120, description: "Description 1", url: "https://product1", stock: 0},
    {title: "Product 2", price: 580, description: "Description 2", url: "https://product2", stock: 0},
    {title: "Product 3", price: 900, description: "Description 3", url: "https://product3", stock: 0},
    {title: "Product 4", price: 1280, description: "Description 4", url: "https://product4", stock: 0},
    {title: "Product 5", price: 1700, description: "Description 5", url: "https://product5", stock: 0},
    {title: "Product 6", price: 2300, description: "Description 6", url: "https://product6", stock: 0},
    {title: "Product 7", price: 2860, description: "Description 7", url: "https://product7", stock: 0},
    {title: "Product 8", price: 3350, description: "Description 8", url: "https://product8", stock: 0},
    {title: "Product 9", price: 4320, description: "Description 9", url: "https://product9", stock: 0},
    {title: "Product 10", price: 4990, description: "Description 10", url: "https://product10", stock: 0},
])


db.messages.insertMany([
    {email: "user1@gmail.com", message: "Message 1", date: ISODate()},
    {email: "user2@gmail.com", message: "Message 2", date: ISODate()},
    {email: "user3@gmail.com", message: "Message 3", date: ISODate()},
    {email: "user4@gmail.com", message: "Message 4", date: ISODate()},
    {email: "user5@gmail.com", message: "Message 5", date: ISODate()},
    {email: "user6@gmail.com", message: "Message 6", date: ISODate()},
    {email: "user7@gmail.com", message: "Message 7", date: ISODate()},
    {email: "user8@gmail.com", message: "Message 8", date: ISODate()},
    {email: "user9@gmail.com", message: "Message 9", date: ISODate()},
    {email: "user10@gmail.com", message: "Message 10", date: ISODate()},
])


db.products.countDocuments()

db.messages.countDocuments()

CRUD

db.products.insertOne({title: "Product 11", price: 3000, description: "Description 11", url: "https://product11", stock: 0})


LISTAR PRODUCTOS CON PRECIO MENOR A 1000
db.products.find({"price": {$lte: 1000}})

LISTAR PRODUCTOS CON PRECIO ENTRE 1000 Y 3000
db.products.find({$and: [{"price": {$lte: 1000}}, {"price": {$lte: 3000}}]})

LISTAR PRODUCTOS CON PRECIO MAYOR A 3000 PESOS
db.products.find({"price": {$gt: 3000}})

db.products.updateMany({"stock": 0}, {$set: {"stock": 100}})

db.products.updateMany({"price": {$gt: 3000}}, {$set: {"stock": 0}})

BORRA PRODUCTOS CON PRECIO MENOR A 1000
db.products.deleteMany({"price": {$lte: 1000}})

use admin
db.createUser({
    user: "pepe",
    pwd: "asd456",
    roles: [
        {role: "read", db: "ecommerce"}]
})

ctrl + C para cerras las dos terminales

y se entra con: mongod --auth --dbpath "ruta"
y en la otra terminal: mongosh -u pepe -p asd456