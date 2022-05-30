const express = require("express");
const app = express();
const path = require('path');
const PORT = 3000;
const mongoose = require("mongoose");
const List = require('./models/List');

mongoose.connect('mongodb://localhost/list')

let db = mongoose.connection;

db.once("open", ()=>{
    console.log('Banco carregado com sucesso!')
})

db.once("error", ()=>{
    console.log('Error ao tentar abrir o banco.')
})


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


app.get('/', async (req, res)=>{

    try {
        let doc = await List.find({});        
        console.log('=========IMPRESSÃO DO DOC=========');
        console.log('=========Listando todas anotações=========');
        console.log(doc);
        console.log('==================================');
        res.render('index', {doc})
    } catch (error) {
        res.send(error);
    }
});


app.post('/', express.urlencoded({extended: true}), async (req, res)=>{

    let list = new List({
        title: req.body.title,
        description: req.body.description,
    });
    try {
        let doc = await list.save();        
        console.log('=========IMPRESSÃO DO DOC=========');
        console.log('=========Documento adicionado com sucesso=========');
        console.log(doc);
        console.log('==================================');
        res.send(doc);
    } catch (error) {
        res.send(error);
    }
})
app.post('/edit/:id', express.urlencoded({extended: true}), async (req, res)=>{
    
    let id = req.params.id;
    if(!id){
        id = req.body.id;
    }

    let list = {};
    list.title = req.body.title;
    list.description = req.body.description;

    try {        
        await List.findByIdAndUpdate(id, list);
        let doc = await List.findById(id);
        console.log('=========IMPRESSÃO DO DOC=========');
        console.log('=========Documento editado com sucesso=========');
        console.log(doc);
        console.log('==================================');
        res.send(doc);
    } catch (error) {
        res.send(error);
    }
})


app.delete('/delete/:id', async (req, res)=>{

    let id = req.params.id;
    if(!id){
        id = req.body.id;
    }

    try {        
        let doc = await List.findByIdAndRemove(id);        
        console.log('=========IMPRESSÃO DO DOC=========');
        console.log('=========Documento deletado com sucesso=========');
        console.log(doc);
        console.log('==================================');
        res.send(doc);
    } catch (error) {
        res.send(error);
    }

})

app.listen(PORT, ()=>{console.log("Server rodando na porta", PORT)});