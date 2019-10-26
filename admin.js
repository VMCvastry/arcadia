addeventbtn=document.getElementById('addeventbtn')
deleventbtn=document.getElementById('deleventbtn')
delevent=document.getElementById('delevent')
addevent=document.getElementById('addevent')


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