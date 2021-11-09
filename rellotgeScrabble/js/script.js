
let playing = false;
let currentPlayer = 1;
let descompte = true
let jug1 = true
let jug2 = true
let so = true
let vibracio = true
let penalització = document.getElementById("penalització")
const timerPanel = document.querySelector('.player');
const buttons = document.querySelectorAll('.bttn');
const jugador1 = document.querySelector('.player-1');
const jugador2 = document.querySelector('.player-2');
// Sound effects for project.
const timesUp = new Audio('audio/460133__eschwabe3__robot-affirmative.wav');
const click = new Audio('audio/561660__mattruthsound.wav');
const velocitat = 1000


// Add a leading zero to numbers less than 10.
const padZero = (number) => {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}


// Create a class for the timer.
class Timer {
    constructor(player, minutes) {
        this.player = player;
        this.minutes = minutes;
    }
    getMinutes(timeId) {
        return document.getElementById(timeId).textContent;
    }
}

let p1time = new Timer('min1', document.getElementById('min1').textContent);
let p2time = new Timer('min2', document.getElementById('min2').textContent);


// Swap player's timer after a move (player1 = 1, player2 = 2).
/* const swapPlayer = () => {
    if (!playing) return;
    // Toggle the current player.
    //currentPlayer = currentPlayer === 1 ? 2 : 1;
    // Play the click sound.
    if(so){click.play()}
    if(vibracio){window.navigator.vibrate(50)}
    //canvia color lletres
    if (currentPlayer === 1) {
        document.querySelector('.player-2').classList.remove('actiu')
        document.querySelector('.player-1').classList.add('actiu')
    } else {
        document.querySelector('.player-1').classList.remove('actiu')
        document.querySelector('.player-2').classList.add('actiu')
    }


} */


// Warn player if time drops below thirty seconds.
const timeWarning = (player, min, sec) => {
    // Change the numbers to red during the last 30 seconds.
    //if (min < 1 && sec <= 30) {
    if (player === 1) {
        document.querySelectorAll('.player__digits')[0].classList.add("penalty")
    } else {
        document.querySelectorAll(' .player__digits')[1].classList.add("penalty")
    } 
    //}
}

let timerId
// Start timer countdown to zero.
const startTimer = () => {
    playing = true;
    let p1sec = 60;
    let p2sec = 60;

    timerId = setInterval(function () {
        // Player 1.
        if (currentPlayer === 1) {
            if (playing && jug1) {
                // Disable start button.
                //buttons[0].disabled = true;

                p1time.minutes = parseInt(p1time.getMinutes('min1'), 10);
                if (p1sec === 60) {
                    p1time.minutes = p1time.minutes - 1;
                }
                p1sec = p1sec - 1;
                //timeWarning(currentPlayer, p1time.minutes, p1sec);
                document.getElementById('sec1').textContent = padZero(p1sec);
                document.getElementById('min1').textContent = padZero(p1time.minutes);
                if (p1sec === 0) {
                    // If minutes and seconds are zero stop timer with the clearInterval method.
                    if (p1sec === 0 && p1time.minutes === 0) {
                        // Play a sound effect.
                        if(so){timesUp.play();}
                        if(vibracio){window.navigator.vibrate([1000])}
                        // Stop timer.
                        //clearInterval(timerId);
                        //playing = false;
                        jug1 = false
                        if (descompte) { tempsDescompte() }

                    }
                    p1sec = 60;
                }
                if (p1time.minutes === 0 && p1sec<=5){
                    if(vibracio){window.navigator.vibrate([300])}
                    
                }
            }


        } else {
            // Player 2.

            if (playing && jug2) {
                p2time.minutes = parseInt(p2time.getMinutes('min2'), 10);
                if (p2sec === 60) {
                    p2time.minutes = p2time.minutes - 1;
                }
                p2sec = p2sec - 1;
                //timeWarning(currentPlayer, p2time.minutes, p2sec);
                document.getElementById('sec2').textContent = padZero(p2sec);
                document.getElementById('min2').textContent = padZero(p2time.minutes);
                if (p2sec === 0) {
                    // If minutes and seconds are zero stop timer with the clearInterval method.
                    if (p2sec === 0 && p2time.minutes === 0) {
                        // Play a sound effect.
                        if(so){timesUp.play();}
                        if(vibracio){window.navigator.vibrate([1000])}
                        // Stop timer.
                        //clearInterval(timerId);
                        //playing = false;
                        jug2 = false
                        if (descompte) { tempsDescompte() }
                    }
                    p2sec = 60;
                }
                if (p2time.minutes === 0 && p2sec<=5){
                    if(vibracio){window.navigator.vibrate([300])}
                    
                }
            }

        }
    }, velocitat);
}

let descompteID

function tempsDescompte() {
    descompte = false
    let p1sec = 0;
    let p2sec = 0;

    descompteID = setInterval(function () {
        // Player 1.
        if (currentPlayer === 1) {
            if (playing && !jug1) {

                p1time.minutes = parseInt(p1time.getMinutes('min1'), 10);
                if (p1sec === 59) {
                    p1time.minutes = p1time.minutes + 1;
                    p1sec = 0

                } else {
                    p1sec = p1sec + 1;
                    document.getElementById("penal1").textContent = "Penalització: -" + (p1time.minutes + 1) * 10 +" punts"
                }

                timeWarning(currentPlayer, p1time.minutes, p1sec);
                document.getElementById('sec1').textContent = padZero(p1sec);
                document.getElementById('min1').textContent = padZero(p1time.minutes);

                if (p1sec === 0 && p1time.minutes == penalització.value) {
                    // Play a sound effect.
                    if(so){timesUp.play();}
                    if(vibracio){window.navigator.vibrate([100,50,1000])}
                    // Stop timer.
                    clearInterval(descompteID);
                    //playing = false;
                    


                }


            }


        } else {
            // Player 2.

            if (playing && !jug2) {

                p2time.minutes = parseInt(p2time.getMinutes('min2'), 10);
                if (p2sec === 59) {
                    p2time.minutes = p2time.minutes + 1;
                    p2sec = 0

                } else {
                    p2sec = p2sec + 1;
                    document.getElementById("penal2").textContent = "Penalització: -" + (p2time.minutes + 1) * 10 +" punts"
                }

                timeWarning(currentPlayer, p2time.minutes, p2sec);
                document.getElementById('sec2').textContent = padZero(p2sec);
                document.getElementById('min2').textContent = padZero(p2time.minutes);

                if (p2sec === 0 && p2time.minutes == penalització.value) {
                    // Play a sound effect.
                    if(so){timesUp.play();}
                    if(vibracio){window.navigator.vibrate([100,50,1000])}
                    // Stop timer.
                    clearInterval(descompteID);
                    //playing = false;

                }

            }
        }


    }, velocitat);
}

var botoStart = document.querySelector('.timer__start-bttn')
// Listen for a mouse click or tap on the screen to toggle between timers.
//timerPanel.addEventListener('click', swapPlayer);
jugador1.addEventListener('click', () => {
    if (!playing && botoStart.textContent === 'CONTINUA') {
        currentPlayer = 2
        playing = true
        document.querySelector('.player-2').classList.add('actiu')
        document.getElementById('cont').style.display = "none"

        botoStart.style.color = '#EEEEEE';
        botoStart.style.backgroundColor = '#606060';
        botoStart.textContent = 'PAUSA / VALIDA'
        if (so) { click.play() }
        if (vibracio) { window.navigator.vibrate(50) }

    } else
        if (!playing && botoStart.textContent === 'COMENÇA') {
            currentPlayer = 2
            startTimer();
            document.querySelector('.player-2').classList.add('actiu')

            botoStart.style.color = '#EEEEEE';
            botoStart.style.backgroundColor = '#606060';
            botoStart.textContent = 'PAUSA / VALIDA'
            if (so) { click.play() }
            if (vibracio) { window.navigator.vibrate(50) }

        } else 
            if(currentPlayer != 2){
                currentPlayer = 2
              document.querySelector('.player-1').classList.remove('actiu')
            document.querySelector('.player-2').classList.add('actiu')

            if (so) { click.play() }
            if (vibracio) { window.navigator.vibrate(50) }  
            
            
        }

});
jugador2.addEventListener('click', () => {
    if (!playing && botoStart.textContent === 'CONTINUA') {
        currentPlayer = 1
        playing = true
        document.querySelector('.player-1').classList.add('actiu')
        document.getElementById('cont').style.display = "none"

        botoStart.style.color = '#EEEEEE';
        botoStart.style.backgroundColor = '#606060';
        botoStart.textContent = 'PAUSA / VALIDA'
        if (so) { click.play() }
        if (vibracio) { window.navigator.vibrate(50) }

    } else
        if (!playing && botoStart.textContent === 'COMENÇA') {
            currentPlayer = 1
            startTimer();
            document.querySelector('.player-1').classList.add('actiu')

            botoStart.style.color = '#EEEEEE';
            botoStart.style.backgroundColor = '#606060';
            botoStart.textContent = 'PAUSA / VALIDA'
            if (so) { click.play() }
            if (vibracio) { window.navigator.vibrate(50) }

        } else 
        if(currentPlayer != 1){
            currentPlayer = 1
            document.querySelector('.player-2').classList.remove('actiu')
            document.querySelector('.player-1').classList.add('actiu')
            if (so) { click.play() }
            if (vibracio) { window.navigator.vibrate(50) }

        }

});
let ajust = document.getElementById("ajustaments")
ajust.addEventListener("toggle", () => {
    if (ajust.open === true) {
        document.querySelector(".player").style.display = "none"
        document.querySelector(".full-screen").style.display = "none"
        document.querySelector("summary").textContent = "X"
    } else {
        document.querySelector(".player").style.display = ""
        document.querySelector(".full-screen").style.display = ""
        document.querySelector("summary").textContent = "Ajustaments"
    }
})






var tempsBtn = document.getElementById("tempsBtn")
tempsBtn.addEventListener("click", () => {
    var temps = document.getElementById("temps").value
    document.getElementById('min1').textContent = padZero(temps)
    document.getElementById('min2').textContent = padZero(temps)
    document.getElementById('sec1').textContent = padZero(0)
    document.getElementById('sec2').textContent = padZero(0)
    playing = false
    clearInterval(timerId)
    clearInterval(descompteID)
    botoStart.textContent = 'COMENÇA'
    botoStart.style.backgroundColor = '#0071D5';

    document.getElementById("ajustaments").open = false
    localStorage.setItem('temps', temps)
    localStorage.setItem('penalització', penalització.value)
    document.getElementById('cont').style.display = "none"
    document.querySelectorAll(' .player__digits').forEach(a => {a.classList.remove("penalty")})
    document.getElementById("penal1").textContent = ""    
    document.getElementById("penal2").textContent = ""
    jug1 = true
    jug2 = true
    descompte = true

})

// Loop through the start and reset buttons.
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
        if (buttons[i].textContent === 'COMENÇA') {
            // Turn the button a gray color to signify a disabled button.
            buttons[i].style.color = '#EEEEEE';
            buttons[i].style.backgroundColor = '#606060';
            buttons[i].textContent = 'PAUSA / VALIDA'
            document.querySelector('.player-' + currentPlayer).classList.add('actiu')
            startTimer();

            buttons[i + 1].style.display = 'none';
        } else
            if (buttons[i].textContent === 'PAUSA / VALIDA') {
                playing = false
                buttons[i].style.color = '#FFFFFF';
                buttons[i].style.backgroundColor = '#0071D5';
                buttons[i].textContent = 'CONTINUA'
                document.querySelector('.player-1').classList.remove('actiu')
                document.querySelector('.player-2').classList.remove('actiu')
                document.getElementById('cont').style.display = ""

            } else
                if (buttons[i].textContent === 'CONTINUA') {
                    playing = true
                    buttons[i].style.color = '#EEEEEE';
                    buttons[i].style.backgroundColor = '#606060';
                    buttons[i].textContent = 'PAUSA / VALIDA'
                    document.querySelector('.player-' + currentPlayer).classList.add('actiu')
                    document.getElementById('cont').style.display = "none"

                }


    });
}
var fullScreen = document.getElementById("checkFullScreen")
fullScreen.addEventListener("change", () => {
    fullScreen.checked ? openFullscreen() : closeFullscreen()
    localStorage.setItem('fullScreen', true);
})
var botoSo = document.getElementById("checkSo")
botoSo.addEventListener("change", () => {
    botoSo.checked ? so = true : so = false
    botoSo.checked ? localStorage.setItem('botoSo', true) : localStorage.setItem('botoSo', false)
    if (so) { click.play() }

})
var botoVibr = document.getElementById("checkVibracio")
botoVibr.addEventListener("change", () => {
    botoVibr.checked ? vibracio = true : vibracio = false
    botoVibr.checked ? localStorage.setItem('botoVibr', true) : localStorage.setItem('botoVibr', false)
    if (vibracio) { window.navigator.vibrate(50) }
})

var elem = document.documentElement;

function toggleFullscreen(){
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
        fullScreen.checked = true
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
        fullScreen.checked = false
    }
}


function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen({ navigationUI: 'hide' });
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen({ navigationUI: 'hide' });
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen({ navigationUI: 'hide' });
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}


if (document.location.search.match(/type=embed/gi)) {
    window.parent.postMessage("resize", "*");
}

var noSleep = new NoSleep().enable();

/* var wakeLockEnabled = true;

var toggleEl = document.querySelector("#toggle");
toggleEl.addEventListener('click', function() {
  if (!wakeLockEnabled) {
    noSleep.enable(); // keep the screen on!
    wakeLockEnabled = true;
    toggleEl.value = "Desactiva la pantalla activa";
document.getElementById('toggle').style.backgroundColor = "red";
  } else {
    noSleep.disable(); // let the screen turn off.
    wakeLockEnabled = false;
    toggleEl.value = "Manté la pantalla activa";
document.getElementById('toggle').style.backgroundColor = "";
  }
}, false); */
document.addEventListener('DOMContentLoaded', function () {
    var temps = localStorage.getItem('temps')
    localStorage.getItem('botoSo') === "true" ? botoSo.checked = true : botoSo.checked = false
    localStorage.getItem('botoVibr') === "true" ? botoVibr.checked = true : botoVibr.checked = false
    localStorage.getItem('botoSo') === "true" ? so = true : so = false
    localStorage.getItem('botoVibr') === "true" ? vibracio = true : vibracio = false
    temps == undefined ? document.getElementById("temps").value = 30 : document.getElementById("temps").value = temps
    localStorage.getItem('penalització') == undefined ? penalització.value = 5 : penalització.value = localStorage.getItem('penalització') 
    document.getElementById('min1').textContent = padZero(temps)
    document.getElementById('min2').textContent = padZero(temps)

});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/rellotgeScrabble/sw.js');
  }