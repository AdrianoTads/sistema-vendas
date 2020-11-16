const { response } = require('express')
const express = require('express')
const nunjucks = require('nunjucks')
const {db} = require('./src/db/connection')

/* db.query('SELECT * FROM cliente',(err,result)=>{
  if(err){
    console.log(`Houve um erro ao conectar: ${err}`)
  }
  console.log(result.rows)
}) */


const app = express()
const port = 3000
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.set('view engine','.html')

nunjucks.configure('./src/views', {
  autoescape: true,
  express: app
});

app.get('/',(req,res)=>{
  res.render('index')
})
app.get('/categoria-produto/listar',(req,res)=>{
  let {categoriasDeProduto} = require('./src/db/fakeData')
  res.render('categoria-produto/listar',{categorias:categoriasDeProduto})
})
app.get('/categoria-produto/adicionar',(req,res)=>{
  res.render('categoria-produto/adicionar')
})
// ROTAS PARA CADASTRO DE CLIENTES

app.get('/cliente/listar',(req,res)=>{
  db.query('SELECT * FROM cliente',(err,result)=>{
    if(err){
      console.log(`Houve um erro ao listar os clientes: ${err}`)
    }
    res.render('cliente/listar',{clientes:result.rows})
  })

  
})
app.get('/cliente/adicionar',(req,res)=>{
  res.render('cliente/adicionar')
})
app.post('/cliente/salvar',(req,res)=>{
  const query = {
    text:'INSERT INTO cliente(nome,cpf) VALUES ($1,$2)',
    values:[req.body.nome,req.body.cpf]
  }
  db.query(query,(err,result)=>{
    if(err){
      console.log(`Houve um erro ao inserir o cliente: ${err}`)
    }
    console.log(result)
  })

  res.redirect('/cliente/listar')
})

// ROTAS PARA CADASTRO DE FORMAS DE PAGAMENTO

app.get('/forma-pagamento/listar',(req,res)=>{
  db.query('SELECT * FROM forma_pagamento',(err,result)=>{
    if(err){
      console.log(`Houve um erro ao listar as formas de pagamento: ${err}`)
    }
    res.render('forma-pagamento/listar',{forma_pagamento:result.rows})
  })

  
})
app.get('/forma-pagamento/adicionar',(req,res)=>{
  res.render('forma-pagamento/adicionar')
})
app.post('/forma-pagamento/salvar',(req,res)=>{
  const query = {
    text:'INSERT INTO forma_pagamento(descricao) VALUES ($1)',
    values:[req.body.descricao]
  }
  db.query(query,(err,result)=>{
    if(err){
      console.log(`Houve um erro ao inserir a forma de pagamento: ${err}`)
    }
    console.log(result)
  })

  res.redirect('/forma-pagamento/listar')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})