addeventbtn=document.getElementById('addeventbtn')
deleventbtn=document.getElementById('deleventbtn')
delevent=document.getElementById('delevent')
addevent=document.getElementById('addevent')
adminbox=document.getElementById('adminbox')
logbox=document.getElementById('logbox')
body= document.getElementsByTagName('body')
var xmlhttp = new XMLHttpRequest();
var url=window.location.origin+'/correct';
addeventbtn.onclick= function(){
    addeventbtn.disabled=true
    deleventbtn.disabled=false
    delevent.style.display="none"
    addevent.style.display="block"
}
deleventbtn.onclick= function(){
    deleventbtn.disabled=true
    addeventbtn.disabled=false
    addevent.style.display="none"
    delevent.style.cssText=""
}

// body.onload= function(){
//     // passwd= document.getElementById('passwd')
//     // console.log(passwd.value)
//     console.log('hey')
//     xmlhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             var status = JSON.parse(this.responseText);
//             console.log('hey',status);
//         }
//      };
//      xmlhttp.open("GET", url, true); 
//      xmlhttp.send();



// }

// function passcheck(bol){
//     if (bol){
//         console.log('ciao')
//         logbox.style.display="none"
//         adminbox.style.display="block"}}
//     // }}
//     // // require(['bcrypt'], function(bcrypt){
        
//     // // })
//     // define(['bcrypt'],function (bcrypt) {
//     //    console.log("ca")
        
        
//     //  });
//     // // bcrypt.compare(bcrypt.hash(passwd.value, 10),'$2y$10$HFEzY9u5xx9FDjndI9cUhuVX3NgZS9lWXUX6d5cQ9AM.ZcI9.j6xO')

    
    
    
   