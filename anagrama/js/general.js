var caches_size = 100;
var actdict = 'disc';
var dicts = {};
var timer = null;
var qryStrCache = '';

var wp2wcMap = {};
wp2wcMap.diac = {'À':'A','Á':'A','Ä':'A','È':'E','É':'E','Ë':'E','Í':'I','Ì':'I','Ï':'I','Ö':'O','Ó':'O','Ò':'O','Ù':'U','Ú':'U','Ü':'U'};
wp2wcMap.toC = {'QU':'Q','Ç':'1','L·L':'2','L\2xEL':'2','ĿL':'2','L-L':'2','NY':'3','Ñ':'3'};
wp2wcMap.toND = {'ĿL':'L·L','L\2xEL':'L·L','L-L':'L·L','Ñ':'NY'};
wp2wcMap.toP = {'Q':'QU','1':'Ç','2':'L·L','3':'NY'};

String.prototype.wp2wc = function(){
    var nw = this.toUpperCase();
    nw = nw.replace(/[^A-Z0-9 \-\.·]/g, function(chr) { return wp2wcMap.diac[chr] || chr; });
    for (var k in wp2wcMap.toC) 
        nw = nw.replace(new RegExp(k,'gm'), wp2wcMap.toC[k]);
    return nw;
};

String.prototype.w2nd = function(){
    var nw = this.toUpperCase();
    nw = nw.replace(/[^A-Z0-9 \-\.·]/g, function(chr) { return wp2wcMap.diac[chr] || chr; });
    for (var k in wp2wcMap.toND) 
        nw = nw.replace(new RegExp(k,'gm'), wp2wcMap.toND[k]);
    return nw;
};

String.prototype.wc2wp = function(){
    var nw = this;
    for (var k in wp2wcMap.toP) nw = nw.replace(new RegExp(k,'gm'), wp2wcMap.toP[k]);
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
    if (typeof histTorns[histPointer+jmp] !== 'undefined') {
        histPointer += jmp;
        document.querySelector('.qry').value = histTorns[histPointer][0];
    } else {
        document.querySelector('.qry').value = '';
    }
};

var qryNorm = function() {
    var str = document.querySelector('.qry').value;
    var qnorm = [];
    
    // Separa en paraules
    str = str.replace(/l\.l/ig,'L·L');
    var wds = str.split(/[\s,;:\.]+/);
    for (var wk in wds) 
        if (wds[wk] !== '') 
            qnorm.push({ c:wds[wk].wp2wc(), nd:wds[wk].w2nd(), o:wds[wk] });
    
    if (qnorm.length > 0)
        return qnorm;
    else
        return false;
};

var qryParse = function(wds) {
    var d = actdict;
    
    if (typeof wds === 'undefined')
        wds = qryNorm();
    
    if (!wds)
        return false;
        
    var isOK = true;
    wds.forEach(function() {
        // Si no està a la cache, consulta i afegeix a la cache, si hi és, utilitza-la
        var wOK = (dicts[d].cacheOK.indexOf(this.nd) > -1);
        
        if (!wOK && dicts[d].cacheKO.indexOf(this.nd) < 0) { // si no es ok a la cache ok i no està a la cache ko
            
            // Consulta i afegeix a la cache
            wOK = !/Q(?!U)/ig.test(this.nd) && dicts[d].frozen.lookup(this.c);
            
            // Actualitza la cache
            var okko = (wOK) ? 'OK' : 'KO'; 
            
            if (dicts[d]['cache'+okko].length === caches_size)
                dicts[d]['cache'+okko].shift();
                
            dicts[d]['cache'+okko].push(this.nd);
        
        }
        isOK = isOK && wOK;
    });
    
    // Si totes les paraules ok, retorna true, sinó false.
    return isOK;
};

var qryShow = function() {
    qryStrCache = document.querySelector('.qry').value;
    
    var wds = qryNorm();
    
    if (!wds)
        return false;
    
    var resultat = qryParse(wds);
    
    var qryStr = [];
    var qryHist = [];
    wds.forEach(function() {
        qryStr.push(this.nd);
        qryHist.push(this.o);   
    });
    qryStr = qryStr.join(' ');
    qryHist = qryHist.join(' ');

    // guarda resultat i consulta feta a cache_torn
    if (histTorns.length === caches_size) histTorns.shift(); // Si ha arribat al tope, treu primer        
    histTorns.push([qryHist, resultat]);
    histPointer = histTorns.length;
    
    var sep = (qryStr.length > 25)? '<br />' : '';
    
    if (resultat) {
        // mostra html ok
        document.getElementById('res').classList.remove('tornKO');
        document.getElementById('res').classList.add('tornOK');
        document.getElementById('res_info').innerHTML = 'La jugada '+sep+'<strong>'+qryStr+'</strong>'+sep+' és correcta!';
        
    } else {
        // mostra html ko
        document.getElementById('res').classList.remove('tornOK');
        document.getElementById('res').classList.add('tornKO');
        document.getElementById('res_info').innerHTML = 'La jugada '+sep+'<strong>'+qryStr+'</strong>'+sep+' NO és vàlida.';
        
    }

    document.getElementById('res').style.display = 'block';
    
    // Inicia el timer per esborrar i el compte enrere, amb qryDelete
    var esbCDwn = 5; 
    document.getElementById('res_timer').innerHTML = 'S\'amagarà en <span>'+esbCDwn+'</span> segons.';
    
    if (timer) clearInterval(timer);
    timer = setInterval(qryDelInterval, 1000);
};

var qryDelInterval = function () {
    var v = parseInt(document.getElementById('res_timer').querySelector('span').innerHTML);
    v--;
    if (v === 0) qryDelete(false);
    else document.getElementById('res_timer').querySelector('span').innerHTML = v;
};

var qryDelete = function(force) {
    if (typeof force === 'undefined')
        force = true;
        
    if (timer) clearInterval(timer);
        
    // Esborra la consulta i el resultat
    if (force || qryStrCache == document.querySelector('.qry').value)
        document.querySelector('.qry').value = '';
    
    document.getElementById('res').style.display = 'none';
    document.getElementById('res_info').innerHTML = '';
    document.getElementById('res_timer').innerHTML = '';
    document.getElementById('res').classList.remove('tornOK');
    document.getElementById('res').classList.remove('tornKO');
};

var qryUpdate = function(e) { 
    if (e.which == 32)
        qryParse();
    else if (e.which == 13) // Intro
        qryShow();
    else if (!e.shiftKey && e.which >= 48 && e.which <= 57)
        e.preventDefault();
};

var getDict = function(dict) {
    if (typeof dicts[dict] === 'undefined' && typeof window[dict] !== 'undefined') {
        var ver = window[dict].version;
        if (typeof ver !== 'undefined')
            document.querySelector('.ver').innerHTML = ver;
            
        dicts[dict] = {};
        dicts[dict].cacheOK = [];
        dicts[dict].cacheKO = [];
        dicts[dict].frozen = new FrozenTrie(window[dict].trie, window[dict].directory, window[dict].nodeCount);
    }
    
    return true;
};

document.addEventListener('DOMContentLoaded', function() {
    getDict('disc');
    
    document.querySelector('.qry').focus();
    document.querySelector('.qry').addEventListener('keydown', qryUpdate);
    document.querySelector('.sch').addEventListener('click', qryShow);
    //document.querySelector('.clr').addEventListener('click', qryDelete);
    
    document.querySelector('form').addEventListener('submit', function (e) { 
        e.preventDefault(); 
        qryShow();
        return false; 
    });
    
    document.querySelector('.dictsel').addEventListener('change', function () {
        actdict = this.value;
    });    
    
    window.addEventListener('keydown', function(e) {				  
        if (e.which == 27) qryDelete(); // Esc
        if (e.which == 38) histMove(-1); // Keyup, down: recupera consultes anteriors
        if (e.which == 40) histMove(1);
    });
});
