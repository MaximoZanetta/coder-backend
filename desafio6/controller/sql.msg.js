const knex = require('knex')


class SQLMessages {
    constructor(config, tableName){
        this.knex = knex(config)
        this.tableName = tableName
    }

    async createTable() {
        const tableExist = await this.knex.schema.hasTable(this.tableName)
        if(!tableExist){
            return await this.knex.schema.createTable(this.tableName,(table)=>{
                table.increments('id').notNullable().primary()
                table.string('author').notNullable()
                table.string('message').notNullable()
                table.string('time').notNullable()
            })
        }
    }

    async allMessages(){
        try {
            return await this.knex(this.tableName).select('*')
        } catch (error) {
            console.log(error);
        }
    }

    async addMessage(message){
        try {
            await this.knex(this.tableName).insert(message)
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = SQLMessages