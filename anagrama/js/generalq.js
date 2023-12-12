var caches_size = 100;
var actdict = 'disc';
var dicts = {};
var timer = null;
let temps = 60; // temps en segons
var qryStrCache = '';
var comptador = 0

let errors = 0;
let incorrectWords = [];
let paraulesUsades = []

var wp2wcMap={};
wp2wcMap.diac = {'À':'A','Á':'A','Ä':'A','È':'E','É':'E','Ë':'E','Í':'I','Ì':'I','Ï':'I','Ö':'O','Ó':'O','Ò':'O','Ù':'U','Ú':'U','Ü':'U'};
wp2wcMap.toC = {'QU':'Q','Ç':'1','L·L':'2','L\2xEL':'2','ĿL':'2','L-L':'2','NY':'3','Ñ':'3'};
wp2wcMap.toND = {'ĿL':'L·L','L\2xEL':'L·L','L-L':'L·L','Ñ':'NY'};
wp2wcMap.toP = {'Q':'QU','1':'Ç','2':'L·L','3':'NY'};

String.prototype.wp2wc = function(){
	var nw = this.toUpperCase();
	nw = nw.replace(/[^A-Z0-9 \-\.·]/g, function(chr) { return wp2wcMap.diac[chr] || chr });
	for (k in wp2wcMap.toC) 
		nw = nw.replace(new RegExp(k,'gm'), wp2wcMap.toC[k]);
	return nw;
};

String.prototype.w2nd = function(){
	var nw = this.toUpperCase();
	nw = nw.replace(/[^A-Z0-9 \-\.·]/g, function(chr) { return wp2wcMap.diac[chr] || chr });
	for (k in wp2wcMap.toND) 
		nw = nw.replace(new RegExp(k,'gm'), wp2wcMap.toND[k]);
	return nw;
};

String.prototype.wc2wp = function(){
	var nw = this;
	for (k in wp2wcMap.toP) nw = nw.replace(new RegExp(k,'gm'), wp2wcMap.toP[k]);
	return nw;
};

if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(elt /*, from*/) {
		var len = this.length >>> 0;
		var from = Number(arguments[1]) || 0;
		from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		if (from < 0) from += len;
		for (; from < len; from++)
			if (from in this && this[from] === elt) 
				return from;
		return -1;
	};
}

var histTorns = [];
var histPointer = 0;
var histMove = function(jmp) { //jmp, 1 o -1
	if (typeof histTorns[histPointer+jmp] != 'undefined') {
		histPointer += jmp;
		jQuery('.qry').val(histTorns[histPointer][0]);
	} else {
		jQuery('.qry').val('')
	}
}


var qryNorm = function() {
	var str = jQuery('.qry').val();
	var qnorm = [];
	
	// Separa en paraules
	str = str.replace(/l\.l/ig,'L·L');
	var wds = str.split(/[\s,;:\.]+/);
	for (var wk in wds) 
		if (wds[wk] != '') 
			qnorm.push({ c:wds[wk].wp2wc(), nd:wds[wk].w2nd(), o:wds[wk] });
	
	if (qnorm.length>0)
		return qnorm;
	else
		return false;
}

var qryParse = function(wds) {
	
	d = actdict;
	
	if (typeof wds == 'undefined')
		var wds = qryNorm();
	
	if (!wds)
		return false;
		
	isOK = true;
	jQuery.each(wds, function() {
							  
		// Si no està a la cache, consulta i afegeix a la cache, si hi és, utilitza-la
		var wOK = (dicts[d].cacheOK.indexOf(this.nd) > -1);
		
		if (!wOK && dicts[d].cacheKO.indexOf(this.nd) < 0) { // si no es ok a la cache ok i no està a la cache ko
			
			// Consulta i afegeix a la cache
			
			wOK = !/Q(?!U)/ig.test(this.nd) && dicts[d].frozen.lookup(this.c);
			
			// Actualitza la cache
			okko = (wOK)? 'OK' : 'KO'; 
			
			if (dicts[d]['cache'+okko].length == caches_size)
				dicts[d]['cache'+okko].shift();
				
			dicts[d]['cache'+okko].push(this.nd);
		
		}
		isOK = isOK && wOK;
	});
	
	// Si totes les paraules ok, retorna true, sinó false.
	return isOK;
	
}

var qryShow = function() {
console.log(paraulesUsades)
	updateWordInput()
	inici()
	let resp=true
	
	qryStrCache = jQuery('.qry').val();
	
	var wds = qryNorm();

	if (!wds)
		return false;

	if(!paraulesUsades.includes(qryStrCache)){

	
	  
	var resultat = qryParse(wds);
	
	var qryStr = [];
	var qryHist = [];
	jQuery.each(wds, function() {
		qryStr.push(this.nd);
		qryHist.push(this.o);	 
	});
	qryStr = qryStr.join(' ');
	qryHist = qryHist.join(' ');

	// guarda resultat i consulta feta a cache_torn
	if (histTorns.length == caches_size) histTorns.shift(); // Si ha arribat al tope, treu primer		
	histTorns.push([qryHist, resultat]);
	histPointer = histTorns.length;
	
	var sep = (qryStr.length > 25)? '<br />' : '';
	
	if (resultat==resp) {
		// mostra html ok
		jQuery('#res').removeClass('tornKO').addClass('tornOK');
		jQuery('#res_info').html('La jugada '+sep+'<strong>'+qryStr+'</strong>'+sep+' és correcta!');
		comptador++
		updateScoreDisplay()
		showCorrectAnimation()
		paraulesUsades.push(qryStrCache).flat
		//showWord()
		
	} else {
		// mostra html ko
		jQuery('#res').removeClass('tornOK').addClass('tornKO');
		jQuery('#res_info').html('Ohhh! La jugada '+sep+'<strong>'+qryStr+'</strong>'+sep+' NO és vàlida.');
		comptador--
		updateScoreDisplay()
		showIncorrectAnimation()
		incorrectWords.push(qryStr);
		//showWord()
	}
}else{
	jQuery('#res').removeClass('tornOK').addClass('tornKO');
		jQuery('#res_info').html('Ohhh! La jugada <strong>'+qryStrCache+'</strong> ja havia estat introduida.');
}

	jQuery('#res').slideDown(100);
	
	// Inicia el timer per esborrar i el compte enrere, amb qryDelete
	var esbCDwn = 1; 
	jQuery('#res_timer').html('S\'amagarà en <span>'+esbCDwn+'</span> segons.');
	
	if (timer) clearInterval(timer);
	timer = setInterval(qryDelInterval, 1000);
}

var qryShowfalse = function() {
	let resp=false
	
	qryStrCache = jQuery('.qry').val();
	
	var wds = qryNorm();
	
	if (!wds)
		return false;
	
	var resultat = qryParse(wds);
	
	var qryStr = [];
	var qryHist = [];
	jQuery.each(wds, function() {
		qryStr.push(this.nd);
		qryHist.push(this.o);	 
	});
	qryStr = qryStr.join(' ');
	qryHist = qryHist.join(' ');

	// guarda resultat i consulta feta a cache_torn
	if (histTorns.length == caches_size) histTorns.shift(); // Si ha arribat al tope, treu primer		
	histTorns.push([qryHist, resultat]);
	histPointer = histTorns.length;
	
	var sep = (qryStr.length > 25)? '<br />' : '';
	
	if (resultat==resp) {
		// mostra html ok
		/* jQuery('#res').removeClass('tornKO').addClass('tornOK');
		jQuery('#res_info').html('HAS ENCERTAT! La jugada '+sep+'<strong>'+qryStr+'</strong>'+sep+' NO és correcta!'); */
		comptador++
		updateScoreDisplay()
		showCorrectAnimation()
		//showWord()
		
	} else {
		// mostra html ko
		/* jQuery('#res').removeClass('tornOK').addClass('tornKO');
		jQuery('#res_info').html('OOOHHHH!!! La jugada '+sep+'<strong>'+qryStr+'</strong>'+sep+' SÍ que és vàlida.'); */
		comptador--
		updateScoreDisplay()
		showIncorrectAnimation()
		incorrectWords.push(qryStr);
		//showWord()
	}

	/* jQuery('#res').slideDown(100); */
	
	// Inicia el timer per esborrar i el compte enrere, amb qryDelete
	/* var esbCDwn = 1; 
	jQuery('#res_timer').html('S\'amagarà en <span>'+esbCDwn+'</span> segons.');
	
	if (timer) clearInterval(timer);
	timer = setInterval(qryDelInterval, 1000); */
}
function showCorrectAnimation() {
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.classList.add('correct');
    setTimeout(() => {
        scoreDisplay.classList.remove('correct');
    }, 300); // Elimina la classe després d'1 segon (ajusta-ho segons la teva preferència)
}
function showIncorrectAnimation() {
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.classList.add('incorrect');
    setTimeout(() => {
        scoreDisplay.classList.remove('incorrect');
    }, 300); // Elimina la classe després d'1 segon (ajusta-ho segons la teva preferència)
}

var qryDelInterval = function () {
	var v = jQuery('#res_timer span').html();
	v = parseInt(v);
	v--;
	if (v == 0) qryDelete(false);
	else jQuery('#res_timer span').html(v);
}

function showWord(){
	var numParaules
	if(comptador>0){
		numParaules = Math.ceil(comptador/10)
	}else{
		numParaules = 1
	}
	jQuery('.qry').val(combinarParaules(numParaules))
}
var qryDelete = function(force) {
	
	if (typeof force == 'undefined')
		force = true;
		
	if (timer) clearInterval(timer);
		
	// Esborra la consulta i el resultat
	/* if (force || qryStrCache == jQuery('.qry').val())
		jQuery('.qry').val(combinarParaules(Math.ceil(comptador/10)))	 */
	
	jQuery('#res').slideUp(100, function() {
		jQuery('#res_info').html('');
		jQuery('#res_timer').html('');
		jQuery('#res')
			.removeClass('tornOK')
			.removeClass('tornKO');		
	});
}

var qryUpdate = function(e) { 

	if (e.which == 32)
		qryParse();
	else if (e.which == 13) // Intro
		qryShow();
	else if (!e.shiftKey && e.which >= 48 && e.which <= 57)
		e.preventDefault();
		
}

var getDict = function(dict) {
	
	if (typeof dicts[dict] == 'undefined' && typeof eval(dict) != 'undefined') {
		
		var ver = eval(dict+'.version');
		if (typeof ver != 'undefined')
			$('.ver').html(ver);
			
		dicts[dict] = {};
		dicts[dict].cacheOK = [];
		dicts[dict].cacheKO = [];
		dicts[dict].frozen = new FrozenTrie(eval(dict+'.trie'), eval(dict+'.directory'), eval(dict+'.nodeCount'));
	}
	
	return true;
}

jQuery(function ($) {
	
	getDict('disc');
	
	$('.qry').focus();
	$('.qry').keydown(qryUpdate);	
	$('.sch').click(qryShow);
	$('.schf').click(qryShowfalse);
	//$('.clr').click(qryDelete);
	$('form').submit(function (e) { 
		e.preventDefault(); 
		qryShow();
		return false; 
	});
	$('.dictsel').change(function () {
		actdict = $(this).val();
	});	
			
	$(window).keydown(function(e){				  

	  if (e.which == 27) qryDelete(); // Esc
	  if (e.which == 38) histMove(-1); // Keyup, down: recupera consultes anteriors
	  if (e.which == 40) histMove(1);
	  
	});
	
});

// Llistes de sil·labes, prefixos i sufixos
const sil·labes = ['ba', 'te', 'li', 'on', 'sa', 'per',   'mi', 'ca','ma','ple','gre','ça','nya','gue','go'];
const prefixos = ['pre', 'post', 'sub', 'trans', 're', 'pro','al','ha'];
const sufixos = ['ment', 'or', 'ar', 'er', 'ir', 'ic','dre','at','o','a','t','tge'];

// Llista de paraules predefinides
//const paraulesPredefinides = ['gat', 'casa', 'arbre', 'cotxe', 'sol', 'mar'];

// Funció per generar una paraula
function generarParaula() {
  // Amb una probabilitat del 80%, retornar una paraula predefinida
  if (Math.random() < 0.8) {
    const paraulaPredefinida = paraulesPredefinides[Math.floor(Math.random() * paraulesPredefinides.length)];
    return paraulaPredefinida;
  }

  const longitud = Math.floor(Math.random() * 3) + 2; // Longitud de la paraula (2 a 4 síl·labes)

  // Generar la paraula combinant sil·labes, prefixos i sufixos aleatòriament
  let paraula = '';
  for (let i = 0; i < longitud && paraula.length < 10; i++) {
    if (i === 0 && Math.random() < 0.3) {
      paraula += prefixos[Math.floor(Math.random() * prefixos.length)];
    } else {
      const sil·laba = sil·labes[Math.floor(Math.random() * sil·labes.length)];
      if (paraula.length + sil·laba.length <= 9) {
        paraula += sil·laba;
      }
    }

    if (i === longitud - 1 && Math.random() < 0.3) {
      const sufix = sufixos[Math.floor(Math.random() * sufixos.length)];
      if (paraula.length + sufix.length <= 9) {
        paraula += sufix;
      }
    }
  }

  return paraula;
}
// Funció per combinar un nombre específic de paraules
function combinarParaules(numParaules) {
	// Verificar si el nombre de paraules és vàlid
	/* if (numParaules < 2) {
	  console.error('Cal com a mínim dues paraules per combinar.');
	  return null;
	} */
  
	const paraulesCombinades = [];
  
	for (let i = 0; i < numParaules; i++) {
	  let paraula;
  
	  // Amb una probabilitat del 50%, seleccionar una paraula predefinida
	  if (Math.random() < 0.5) {
		paraula = paraulesPredefinides[Math.floor(Math.random() * paraulesPredefinides.length)];
	  } else {
		paraula = generarParaula();
	  }
  
	  paraulesCombinades.push(paraula);
	}
  
	// Combinar les paraules amb espais entre elles
	const paraulesCombinadesString = paraulesCombinades.join(' ');
	return paraulesCombinadesString;
  }

  function startGame() {
	

    //showWord();

    var interval = setInterval(updatetemps, 1000);

    setTimeout(function () {
        clearInterval(interval);
        console.log('Interval aturat');
    }, (temps+1) * 1000);
}


function updateScoreDisplay() {
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.textContent = `Punts: ${comptador}`;
 }
 function updatetemps() {
    const tempsDisplay = document.getElementById('temps');
    tempsDisplay.textContent = `Temps: ${temps} segons`;
 
    if (temps === 0) {
        endGame();
    } else {
        temps--;
    }
 }
 function endGame() {
    const modal = document.getElementById('modal');
    const modalScore = document.getElementById('modal-score');
    const modalErrors = document.getElementById('modal-errors');

    modalScore.textContent = `Puntuació final: ${comptador}`;
    modalErrors.textContent = `Has errat en aquestes jugades: ${incorrectWords.join(', ')}`;
    modal.style.display = 'block';
}


function restartGame() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';

    // Restaura les variables del joc i reinicia
    currentWordIndex = 0;
    comptador = 0;
    temps = 60;
	incorrectWords = []
	updateScoreDisplay()
    startGame();
}
window.onload = startGame;