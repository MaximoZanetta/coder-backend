const knex = require('knex')


//FOR PRODUCTS, MARIADB
class SQLClient {
    constructor(config, tableName) {
        this.knex = knex(config)
        this.tableName = tableName
    }

    //IF THE TABLE EXIST DONT CREATE ANOTHER, IF DOESNT EXIST CREATE THE TABLE
    async createTable() {
        const tableExist = await this.knex.schema.hasTable(this.tableName)
        if(!tableExist){
            return await this.knex.schema.createTable(this.tableName, (table)=> {
                table.increments('id').notNullable().primary()
                table.string('name').notNullable()
                table.float('price').notNullable()
                table.string('url').notNullable()
            })
        }
    }

    async getAll(){
        try {
            return await this.knex(this.tableName).select('*')
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            return await this.knex(this.tableName).where({id})
        } catch (error) {
            console.log(error);
        }
    }

    async insert(product) {
        try {
            await this.knex(this.tableName).insert(product)
            console.log('product inserted');
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id){
        try {
            await this.knex(this.tableName).del({id})
            console.log('product deleted');
        } catch (error) {
            console.log(error);
        }
    }

    async updateById(id,payload) {
        try {
            await this.knex(this.tableName).where({id}).update(payload)
            console.log('product updated');
        } catch (error) {
            console.log(error);
        }
    }

    async disconnect() {
        this.knex.destroy()
    }
}

module.exports = SQLClient