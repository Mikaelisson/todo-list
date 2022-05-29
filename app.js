const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const List = require('./models/List')

mongoose.connect('mongodb://localhost/list')

let db = mongoose.connection;

db.once("open", ()=>{
    console.log('Banco carregado com sucesso!')
})

db.once("error", ()=>{
    console.log('Error ao tentar abrir o banco.')
})



app.get('/', (req, res)=>{
    res.send("Hello World");
});

app.post('/', async (req, res)=>{

    let list = new List({
        title: "Titulo",
        description: "Descrição"
    })
    try {
        let doc = await list.save()
        res.send(doc)
    } catch (error) {
        res.send(error)
    }
})

app.listen(PORT, ()=>{console.log("Server rodando na porta", PORT)});