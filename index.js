const fs = require('fs')

class Contenedor{
    constructor(path){
        this.path = path;
    }

    async save(data){
        let contenido = await fs.promises.readFile(`./${this.path}`, 'utf-8')
        let contenidojson = JSON.parse(contenido)
        let ultimoIndice = contenidojson.length - 1
        let ultimoid = contenidojson[ultimoIndice].id
        data.id = ultimoid + 1
        contenidojson.push(data)
        await fs.promises.writeFile(`./${this.path}`, JSON.stringify(contenidojson))

        return data.id;
        
    }

    async getById(id){
        let contenido = await fs.promises.readFile(`./${this.path}`, 'utf-8')
        let contenidojson = JSON.parse(contenido)
        let findItem = contenidojson.find((item)=>item.id == id)

        return findItem;
    }

    async getAll(){
        let contenido = await fs.promises.readFile(`./${this.path}`, 'utf-8')
        return JSON.parse(contenido)
        // console.log(contenidojson)
    }

    async deleteById(id){
        let contenido = await fs.promises.readFile(`./${this.path}`, 'utf-8')
        let contenidojson = JSON.parse(contenido)
        let newItems = contenidojson.filter((item)=>item.id !=id)


        console.log(newItems)
    }
}

module.exports = Contenedor


// const contenedor = new Contenedor('products.json')
// let data = {
//     "id":1,
//     "objeto": 'plato',
//     "precio": 150
// }
// contenedor.save(data).then(res=>console.log(res))

// contenedor.getById(1)

// contenedor.getAll()

// contenedor.deleteById(2)


