var express = require('express')
var app=express()
var bodyParser= require('body-parser')
var fs= require('fs')
var Event= require('./jsoncreator.js')
var SelfReloadJSON = require('self-reload-json');
var multer = require('multer');
// var upload= multer({dest:'assets/uploads'})
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'assets/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
var upload = multer({ storage: storage })



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
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/', function (req, res) {
    res.render("index.html")
})
app.get('/admin', function (req, res) {
    res.render("mgm.html")
})

// app.post('/eventi', upload.single('p'), (req, res) => {
//     if(req.file) {
//         res.json(req.file);
//     }
//     else throw 'error';
// });





app.post('/eventim',upload.single('p'), function (req, res) {
    new Event()
    var evento = new Event(req.body.titolo, req.file.originalname, req.body.testo, req.body.date)


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

