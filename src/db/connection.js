const {Pool} = require('pg')

const db = new Pool({
    user:'postgres',
    host:'localhost',
    database:'sistema_vendas',
    //mudar
    password:'toormundial',
    port:5432
})
db.connect()
module.exports = {db}