var id = Math.floor(Math.random() * Date.now())
   
function estadistica(){
document.getElementById('estadistica').src = "https://docs.google.com/forms/d/e/1FAIpQLScMRS7yABr1mP94vvfs7ye49eL1W7lfwdECvxt_3x58Quv-dQ/formResponse?entry.1842180346=CLICK&entry.1220927547="+id
}

 document.addEventListener('DOMContentLoaded', function() {
     M.AutoInit();
    identificador()
});
document.getElementById('divisio').onload = function() {
document.getElementById('spinner').style.display='none';
   
   if(document.getElementById("rec")!= undefined){
      document.getElementById("rec").setAttribute("href",this.contentWindow.location)
      //document.getElementById("rec").setAttribute("href",document.getElementById("divisio").src)
   }
};
//document.getElementById("linkApp").addEventListener("click",estadistica);
  
function identificador(){
 
 var localID = localStorage.getItem("id")
 var nom = localStorage.getItem("jugador")
 
 if(localID) {
     id = localID
 }else{
     localStorage.setItem("id",id)
 }
 document.getElementById("estadistica").src='https://docs.google.com/forms/d/e/1FAIpQLScMRS7yABr1mP94vvfs7ye49eL1W7lfwdECvxt_3x58Quv-dQ/formResponse?entry.1176666344=WEB&entry.1220927547='+id+"&entry.1299550889="+nom
}
  function toggleFullScreen(elem) {
 // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
 if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
     if (elem.requestFullScreen) {
         elem.requestFullScreen({ navigationUI: 'hide' });
     } else if (elem.mozRequestFullScreen) {
         elem.mozRequestFullScreen({ navigationUI: 'hide' });
     } else if (elem.webkitRequestFullScreen) {
         elem.webkitRequestFullScreen({ navigationUI: 'hide' });
     } else if (elem.msRequestFullscreen) {
         elem.msRequestFullscreen({ navigationUI: 'hide' });
     }
 } else {
     if (document.cancelFullScreen) {
         document.cancelFullScreen();
     } else if (document.mozCancelFullScreen) {
         document.mozCancelFullScreen();
     } else if (document.webkitCancelFullScreen) {
         document.webkitCancelFullScreen();
     } else if (document.msExitFullscreen) {
         document.msExitFullscreen();
     }
 }
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
  }
