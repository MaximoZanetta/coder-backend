const socket = io()

//DOM declarations
let formProducts = document.getElementById('form-products')
let formMessages = document.getElementById('form-message')

//Listening the products and then print in the front
socket.on('products',(data)=>{
    showProducts(data)
})


//Listening the messages and then print in the front
socket.on('messages',(data)=>{
    showMessages(data)
})


//This form get the name, price and url for create a new product
formProducts.addEventListener('submit',(e)=>{
    e.preventDefault()
    let name = document.getElementById('name').value
    let price = document.getElementById('price').value
    let url = document.getElementById('url').value
    socket.emit('new-products', {name,price,url})


    document.getElementById('name').value = ''
    document.getElementById('price').value = ''
    document.getElementById('url').value = ''
    
})

formMessages.addEventListener('submit',(e)=>{
    e.preventDefault()
    let author = document.getElementById('email').value
    let message = document.getElementById('message').value

    socket.emit('new-messages', {author, message})

    document.getElementById('message').value = ''
})


//This function print the products on the table
const showProducts = (data)=>{
    let html = ''
    data.map(product=>{
        html += `
        <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Url</th>
        </tr>
        <tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.url}</td>
        </tr>
        `
    })
    document.getElementById('products').innerHTML = html
}


//This function print the messages on the html
const showMessages = (data)=>{
    let html = ''
    data.map(msg=>{
        html += `<li>${msg.author}: <strong>${msg.message}</strong><em>   ${msg.time}</em></li>`
    })
    document.getElementById('messages').innerHTML = html
}
