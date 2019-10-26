// npm run watch


var express = require('express')
var app=express()
var bodyParser= require('body-parser')
var fs= require('fs')
var Event= require('./jsoncreator.js')
var Iscritto= require('./model/submissions.js')
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
var mailer = require('nodemailer')



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
    res.redirect("./index.html")
})
app.get('/admin', function (req, res) {
    res.redirect("./mgm.html")
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
                        
                        // res.status(200).send(obj)
                        res.status(200).redirect("/")
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


app.post('/delevent', function (req, res) {
    var dest=(req.body.todelete)
    
    if (typeof dest == 'undefined') {
        res.status(500).send({
            error: 'evento not deleted'
        })
    } else {
        fs.readFile('./eventi.json', 'utf8', function readFileCallback(err, data) {
            if (err) {
                res.status(500).send({
                    error: 'evento not deleted',
                    err
                });
            } else {
                
                obj = JSON.parse(data);
                console.log(dest)
                console.log(parseInt(dest))
                obj.splice(parseInt(dest),1);
                
                json = JSON.stringify(obj);
                console.log(json)
                fs.writeFile('./eventi.json', json, 'utf8', function callback(err, result) {
                    if (err) {
                        res.status(500).send({
                            error: 'evento not written',
                            err
                        });
                    } else {
                        
                        // res.status(200).send(obj)
                        res.status(200).redirect("/")
                    }});
            }
        });
    };
})

app.post('/submissions', function (req, res) {
    
    var iscritto = new Iscritto(req.body.nome, req.body.email, req.body.messaggio)
    console.log(iscritto)

    if (typeof iscritto == 'undefined') {
        res.status(500).send({
            error: 'iscritto non found'
        })
    } else {
        if (iscritto.messaggio){
            
            let transporter = mailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'vmcompany404@gmail.com',
                    pass: 'Patrino1'
                }
            });
            let mailOptions = {
                from: 'Arcadia Utente ', // sender address
                to: "008valerio@libero.it", // list of receivers
                subject: "messaggio Cliente", // Subject line
                // text:`<b>${JSON.stringify(iscritto)}</b>`, // plain text body
                html: `<b>${JSON.stringify(iscritto.nome)}<br>${(iscritto.email)} <br> <br>${JSON.stringify(iscritto.messaggio)}</b>` // html body
            };
      
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                
                res.send(info);
                });
        }delete iscritto.messaggio
        fs.readFile('./iscritti.json', 'utf8', function readFileCallback(err, data) {
            if (err) {
                res.status(500).send({
                    error: 'iscritto not saved',
                    err
                });
            } else {

                obj = JSON.parse(data);
                obj.unshift(iscritto);

                json = JSON.stringify(obj);
                fs.writeFile('./iscritti.json', json, 'utf8', function callback(err, result) {
                    if (err) {
                        res.status(500).send({
                            error: 'iscritto not written',
                            err
                        });
                    } else {
                        
                        // res.status(200).send(obj)
                        res.status(200).redirect("/success.html")
                    }});
            }
        });
    };
})

app.listen(port, function () {
    console.log('app running')
})

