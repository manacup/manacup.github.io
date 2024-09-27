const container = document.querySelector('#swiper');
var listener = SwipeListener(container);
container.addEventListener('swipe', function (e) {
  console.log(e.detail);
  var directions = e.detail.directions;
var x = e.detail.x;
var y = e.detail.y;

if (directions.left) {
  console.log('Swiped left.');
  endavant()
}

if (directions.right) {
  console.log('Swiped right.');
  enrere()
}
});


document.getElementById("anterior").addEventListener("click",enrere)

function enrere(){
    container.classList = "desapareixdreta";
        setTimeout(function () {
            container.classList = "apareixesquerra";
     indexactual --
   
     if(indexactual>0){
   
    mostrapregunta(indexactual)
    }else{    
      indextema = temes.indexOf(tema.innerText)
      canviaTema(indextema==0?temes[indextema]:temes[indextema-1])
    } }, 200);
  }
  
  document.getElementById("seguent").addEventListener("click",endavant)
  
  function endavant(){
    container.classList = "desapareixesquerra";
        setTimeout(function () {
            container.classList = "apareixdreta";
    indexactual++ 
    if(indexactual<totesPreguntes.length+1){
   
    mostrapregunta(indexactual)
    }else{
      indextema = temes.indexOf(tema.innerText)
      canviaTema(indextema==temes.length-1?temes[indextema]:temes[indextema+1])
    }}, 200);
  }