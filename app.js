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
        doc.reverse()
        res.render('index', {doc});
    } catch (error) {
        res.send(error);
    }
});
app.get('/edit/:id', async (req, res) => {
    let id = req.params.id;
    if(!id){
        id = req.body.id;
    }

    try {
        let doc = await List.findById(id);
        res.render('edit', {doc});
    } catch (error) {
        res.send(error);
    }

})
app.get('/add', (req, res)=>{

    try {
        res.render('add')
    } catch (error) {
        res.send(error);
    }
})


app.post('/add', express.urlencoded({extended: true}), async (req, res)=>{

    let list = new List({
        title: req.body.title,
        description: req.body.description,
    });
    try {
        await list.save();
        res.redirect('/');
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
        res.redirect('/');
    } catch (error) {
        res.send(error);
    }
})
app.post('/delete/:id', express.urlencoded({extends: true}), async (req, res)=>{

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
        res.redirect('/');
    } catch (error) {
        res.send(error);
    }

})

app.listen(PORT, ()=>{console.log("Server rodando na porta", PORT)});