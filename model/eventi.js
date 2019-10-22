var mongoose= require('mongoose')
var schema= mongoose.Schema
var evento= new schema({
    titolo: String,
    immagine: String,
    testo:String,
    date:String
})

module.exports=mongoose.model('event',evento)
