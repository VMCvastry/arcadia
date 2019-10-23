var express = require('express')
var app=express()
var bodyParser= require('body-parser')
var fs= require('fs')
var Event= require('./jsoncreator.js')
var SelfReloadJSON = require('self-reload-json');
var eventi= new SelfReloadJSON('./eventi.json')
// fs.readFile('./eventi.json', 'utf8', (err, data) => {
//     if (err){
//       console.log(err)}
//     else{
//         eventi=(JSON.parse(data))}
      
//   })


//JSON.parse(fs.readFile("./eventi.json"));

// console.log("casa",eventi)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}));


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
var port = process.env.PORT || 8080;

app.use(express.static(__dirname));
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    
    next()
  });
app.get('/', function (req, res) {
    res.render("index.html")
})



app.post('/eventim', function (req, res) {
    new Event()
    var evento = new Event(req.body.titolo, req.body.immagine, req.body.testo, req.body.date)


    if (typeof evento == 'undefined') {
        res.status(500).send({
            error: 'evento not created'
        })
    } else {
        fs.readFile('./eventi.json', 'utf8', function readFileCallback(err, data) {
            if (err) {
                res.status(500).send({
                    error: 'evento not saved',
                    err
                });
            } else {

                obj = JSON.parse(data);
                obj.unshift(evento);

                json = JSON.stringify(obj);
                fs.writeFile('./eventi.json', json, 'utf8', function callback(err, result) {
                    if (err) {
                        res.status(500).send({
                            error: 'evento not written',
                            err
                        });
                    } else {
                        
                        res.status(200).send(obj)
                    }});
            }
        });
    };
})

app.get('/eventim', function (req, res) {

    if (typeof eventi !== 'undefined' && eventi.length > 0) {
        res.status(200).send(eventi)

    } else {
        res.status(500).send({
            error: 'not find'
        })
    }
})





app.listen(port, function () {
    console.log('app running')
})

