var xmlhttp = new XMLHttpRequest();
url=window.location.origin+'/eventim';


xmlhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
       var myArr = JSON.parse(this.responseText);
       loadev(myArr);
   }
};
xmlhttp.open("GET", url, true); 
xmlhttp.send();



function loadev(eventsobj){
var currentev=0
var topev= 0
var lenev= Object.keys( eventsobj).length
var eventidiv = document.getElementById('eventi');
var newhtml=''
if (eventsobj[currentev]){
    console.log(eventsobj)
    if(currentev+8>lenev){topev= lenev-currentev}
for (i=currentev;i<topev;i++){
    console.log('ok')
    var titolo=eventsobj[i].titolo
    var immagine="assets/uploads/"+eventsobj[i].immagine
    var testo=eventsobj[i].testo
    var date=eventsobj[i].date
 if (i%2==0){
    htmltem = `<div class="card mb-3" id='carta' ><div class="row no-gutters"><div class="col-md-4"><img src=${immagine} class="card-img" alt="..."></div>    <div class="col-md-8">        <div class="card-body">            <h5 class="card-title">${titolo}</h5>            <p class="card-text">${testo}</p>            <p class="card-text" id='small'><small class="text-muted">${date}</small></p>        </div>   </div></div></div>`

 }else{
    htmltem = `<div class="card mb-3" id='carta'><div class="row no-gutters">    <div class="col-md-8">        <div class="card-body">            <h5 class="card-title">${titolo}</h5>            <p class="card-text">${testo}</p>            <p class="card-text" id='small'><small class="text-muted">${date}</small></p>        </div>    </div>    <div class="col-md-4">        <img src=${immagine} class="card-img" alt="...">    </div></div></div>`
 }newhtml+=htmltem
 console.log(newhtml)
}

eventidiv.innerHTML=newhtml}}

