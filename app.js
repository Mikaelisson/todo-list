const express = require("express");
const app = express();
const path = require('path');
const PORT = 3000;
const mongoose = require("mongoose");
const router = require('./routes/router')

mongoose.connect('mongodb://localhost/list')

let db = mongoose.connection;

db.once("open", ()=>{
    console.log('Banco carregado com sucesso!')
})

db.once("error", ()=>{
    console.log('Error ao tentar abrir o banco.')
})


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', router)



 
app.listen(PORT, ()=>{console.log("Server rodando na porta", PORT)});