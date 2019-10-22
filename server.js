var express = require('express')
var app=express()
var bodyParser= require('body-parser')
var mongoose= require('mongoose')
mongoose.set('useUnifiedTopology', true)
var db= mongoose.connect('mongodb://localhost:27017/arcadia',{ useNewUrlParser: true })
var Eventi= require('./model/eventi')
// import {showEvent} from './scripts.js'




app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.post('/eventim', function(req,res){
    var evento = new Eventi()
    evento.titolo= req.body.titolo
    evento.immagine= req.body.immagine
    evento.testo= req.body.testo
    evento.date= req.body.date
    evento.save(function(err,saved){
        if (err){
            res.status(500).send({error:'not saved'})
        }else{
            
            Eventi.find({},function(err,evento){
                if (err){
                    res.status(500).send({error:'not find'})
                }else{
                    // exports.getdata=  evento
                    
                    res.status(200).send(evento)
                }
            })
        }
    })
})

app.get('/eventim',function(req,res){
    Eventi.find({},function(err,evento){
        if (err){
            res.status(500).send({error:'not find'})
        }else{
            res.status(200).send(evento)
        }
    })
})





app.listen(3000,function(){
    console.log('api rumming')
})