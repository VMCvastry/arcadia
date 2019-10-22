// import 'whatwg-fetch'


// getProducts = function(){  
//     fetch('http://localhost:3000/product').then(res=>{
//         console.log(res.json())
//     })
// }


// export default HttpService
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
console.log(httpGet('http://localhost:3000/eventim'))


// var eventsobj=datafile.slice(0,4)
// console.log(eventsobj[0].titolo)