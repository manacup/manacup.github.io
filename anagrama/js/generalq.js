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


var qryNorm = function(str) {
	//var str = jQuery('.qry').val();
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
	var str = jQuery('.qry').val();

	if (typeof wds == 'undefined')
		var wds = qryNorm(str);
	
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
	//inici()
	let resp=true
	
	
	qryStrCache = jQuery('.qry').val();
	
	var wds = qryNorm(qryStrCache);

	if (!wds)
		return false;

	if(!paraulesUsades.includes(qryStrCache)){

	
	  
	var resultat = qryParse(wds);
	console.log(resultat)
	
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
		jQuery('#res_info').html('La jugada '+sep+'<strong>'+qryStr+'</strong>'+sep+' és correcta!'); */
		comptador++		
		paraulesUsades.push(qryStrCache).flat
		//showWord()
		updateScoreDisplay()
		showCorrectAnimation()
		desaPartida()
	} else {
		// mostra html ko
		/* jQuery('#res').removeClass('tornOK').addClass('tornKO');
		jQuery('#res_info').html('Ohhh! La jugada '+sep+'<strong>'+qryStr+'</strong>'+sep+' NO és vàlida.'); */
		//comptador--
		updateScoreDisplay()
		showIncorrectAnimation()
		incorrectWords.push(qryStr);
		//showWord()
	}
}else{
	jQuery('#res').removeClass('tornKO').addClass('tornOK');
		jQuery('#res_info').html("Aquesta ja l'havies jugat!");
		showExisteixAnimacio()
}

	/* jQuery('#res').slideDown(100);
	
	// Inicia el timer per esborrar i el compte enrere, amb qryDelete
	 var esbCDwn = 1; 
	jQuery('#res_timer').html('S\'amagarà en <span>'+esbCDwn+'</span> segons.');
	
	if (timer) clearInterval(timer);
	timer = setInterval(qryDelInterval, 1000); */
}
function showExisteixAnimacio() {
    
	const tauler = document.getElementById("scrabbleBoard")
	tauler.querySelectorAll(".grid-item").forEach(gi=>{
		if(gi.textContent){
			gi.classList.add("glow-existeix")
			setTimeout(() => {
				gi.classList.remove('glow-existeix');
			}, 300); // Elimina la classe després d'1 segon (ajusta-ho segons la teva preferència)
		}
	})
	
}

function showCorrectAnimation() {
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.classList.add('correct');
    setTimeout(() => {
        scoreDisplay.classList.remove('correct');
    }, 300); // Elimina la classe després d'1 segon (ajusta-ho segons la teva preferència)

	const tauler = document.getElementById("scrabbleBoard")
	var scrabble = 0
	tauler.querySelectorAll(".grid-item").forEach((gi, index)=>{
	
		
		
		if(gi.textContent){
			scrabble++
			gi.classList.add("glow-text")
			gi.style.setProperty('--delay', index + 1);
			
			setTimeout(() => {
				gi.classList.remove('glow-text');
				gi.style.removeProperty('--delay');
			}, 1000); // Elimina la classe després d'1 segon (ajusta-ho segons la teva preferència)
		}
	})
	if(scrabble==7){
		tauler.classList.add("glow-text")
		setTimeout(() => {
			tauler.classList.remove('glow-text');			
		}, 1000)
	}
}
function showIncorrectAnimation() {
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.classList.add('incorrect');
    setTimeout(() => {
        scoreDisplay.classList.remove('incorrect');
    }, 300); // Elimina la classe després d'1 segon (ajusta-ho segons la teva preferència)

	const tauler = document.getElementById("scrabbleBoard")
	tauler.querySelectorAll(".grid-item").forEach(gi=>{
		if(gi.textContent){
			gi.classList.add("glow-error")
			setTimeout(() => {
				gi.classList.remove('glow-error');
			}, 300); // Elimina la classe després d'1 segon (ajusta-ho segons la teva preferència)
		}
	})
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
	
	//$('.qry').focus();
	//$('.qry').keydown(qryUpdate);	
	$('.sch').click(qryShow);
	$('form').submit(function (e) { 
		e.preventDefault(); 
		qryShow();
		return false; 
	});
	$('.dictsel').change(function () {
		actdict = $(this).val();
	});	
			
	/* $(window).keydown(function(e){				  

	  if (e.which == 27) qryDelete(); // Esc
	  if (e.which == 38) histMove(-1); // Keyup, down: recupera consultes anteriors
	  if (e.which == 40) histMove(1);
	  
	}); */
	
});

  function startGame() {

   /*  var interval = setInterval(updatetemps, 1000);

    setTimeout(function () {
        clearInterval(interval);
       // console.log('Interval aturat');
    }, (temps+1) * 1000); */
}


function updateScoreDisplay() {
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.innerHTML = `Paraules vàlides: ${paraulesUsades.length}`;
	const llistaDisplay = document.getElementById('llistavalid');
    llistaDisplay.innerHTML = `Llista: <strong>${paraulesUsades.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).join(", ")}</strong>`;

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
    reinici();
	startGame()
}
//window.onload = startGame;