var express = require('express')
var app=express()
var bodyParser= require('body-parser')

// var Event= require('./jsoncreator.js')
var eventi= require('./eventi.json')


console.log(eventi)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// var port = process.env.PORT || 8080;
var port =  3000;
app.use(express.static(__dirname));

app.get('/',function(req,res){
    res.render("index.html")
})



// app.post('/eventim', function(req,res){
//     var evento = new Eventi()
//     evento.titolo= req.body.titolo
//     evento.immagine= req.body.immagine
//     evento.testo= req.body.testo
//     evento.date= req.body.date
//     evento.save(function(err,saved){
//         if (err){
//             res.status(500).send({error:'not saved'})
//         }else{
            
//             Eventi.find({},function(err,evento){
//                 if (err){
//                     res.status(500).send({error:'not find'})
//                 }else{
//                     // exports.getdata=  evento
                    
//                     res.status(200).send(evento)
//                 }
//             })
//         }
//     })
// })

app.get('/eventim',function(req,res){
    
        if (typeof eventi !== 'undefined' && eventi.length > 0){
            res.status(200).send(eventi)
            
        }else{
            res.status(500).send({error:'not find'})
        }
    })





app.listen(port,function(){
    console.log('app running')
})
