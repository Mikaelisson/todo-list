const express = require('express');
const router = express.Router();
const List = require('../models/List');

router.get('/', async (req, res)=>{

    try {
        let doc = await List.find({});
        doc.reverse();
        res.render('index', {doc});
    } catch (error) {
        res.send(error);
    }
});
router.get('/edit/:id', async (req, res) => {
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
router.get('/add', (req, res)=>{

    try {
        res.render('add')
    } catch (error) {
        res.send(error);
    }
})
router.get('/view/:id', async (req, res)=>{
    let id = req.params.id;

    let doc = await List.findById(id)
    res.render('view', {doc});
})


router.post('/add', express.urlencoded({extended: true}), async (req, res)=>{

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
router.post('/edit/:id', express.urlencoded({extended: true}), async (req, res)=>{
    
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
router.post('/delete/:id', express.urlencoded({extended: true}), async (req, res)=>{

    let id = req.params.id;
    if(!id){
        id = req.body.id;
    }

    try {        
        await List.findByIdAndRemove(id);
        res.redirect('/');
    } catch (error) {
        res.send(error);
    }

})

module.exports = router