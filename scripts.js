// var source= require('./server.js')
// var eventsobj= source.getdata


// function httpGet(theUrl)
// {
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
//     xmlHttp.send( null );
//     return xmlHttp.responseText;
// }
//eventsobj=JSON.parse(httpGet('https://arcadia-test.herokuapp.com/eventim'))
var xmlhttp = new XMLHttpRequest();
url=window.location.origin+'/eventim';

//url="http://localhost:5000/eventim"
xmlhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
       var myArr = JSON.parse(this.responseText);
       loadev(myArr);
   }
};
xmlhttp.open("GET", url, true); 
xmlhttp.send();

// eventsobj=JSON.parse(httpGet('http://localhost:5000/eventim'))
// console.log(eventsobj)
// console.log('got')
function loadev(eventsobj){
var eventidiv = document.getElementById('eventi');
var newhtml=''
for (i=0;i<4;i++){
    var titolo=eventsobj[i].titolo
    var immagine="assets/uploads/"+eventsobj[i].immagine
    var testo=eventsobj[i].testo
    var date=eventsobj[i].date
 if (i==0 || i==2){
    htmltem = `<div class="card mb-3  col-md-12" id='carta' ><div class="row no-gutters"><div class="col-md-4"><img src=${immagine} class="card-img" alt="..."></div>    <div class="col-md-8">        <div class="card-body">            <h5 class="card-title">${titolo}</h5>            <p class="card-text">${testo}</p>            <p class="card-text" id='small'><small class="text-muted">${date}</small></p>        </div>   </div></div></div>`

 }else{
    htmltem = `<div class="card mb-3  col-md-12" id='carta'><div class="row no-gutters">    <div class="col-md-8">        <div class="card-body">            <h5 class="card-title">${titolo}</h5>            <p class="card-text">${testo}</p>            <p class="card-text" id='small'><small class="text-muted">${date}</small></p>        </div>    </div>    <div class="col-md-4">        <img src=${immagine} class="card-img" alt="...">    </div></div></div>`
 }newhtml+=htmltem
}

eventidiv.innerHTML=newhtml}


// {"titolo":"","testo":"","date":"","path":""}
// var htmltem0 = `<div class="card mb-3" ><div class="row no-gutters">    <div class="col-md-8">        <div class="card-body">            <h5 class="card-title">${titolo}</h5>            <p class="card-text">${testo}</p>            <p class="card-text"><small class="text-muted">${date}</small></p>        </div>    </div>    <div class="col-md-4">        <img src=${immagine} class="card-img" alt="...">    </div></div></div>`

// var htmltem1 = `<div class="card mb-3" ><div class="row no-gutters"><div class="col-md-4"><img src=${immagine} class="card-img" alt="..."></div>    <div class="col-md-8">        <div class="card-body">            <h5 class="card-title">${titolo}</h5>            <p class="card-text">${testo}</p>            <p class="card-text"><small class="text-muted">${date}</small></p>        </div>   </div></div></div>`
