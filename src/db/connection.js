const {Pool} = require('pg')

const db = new Pool({
    user:'postgres',
    host:'localhost',
    database:'sistema_vendas',
    password:'root',
    port:5432
})
db.connect()
module.exports = db