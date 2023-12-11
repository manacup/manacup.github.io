const words = [
    { word: 'gat', correct: true },
    { word: 'taula', correct: true },
    { word: 'finestra', correct: true },
    { word: 'pilot', correct: true },
    { word: 'pastanaga', correct: true },
    { word: 'helicopter', correct: false },
    { word: 'fletxa', correct: true },
    { word: 'piano', correct: true },
    { word: 'lluna', correct: true },
    { word: 'telèfon', correct: true },
    { word: 'sol', correct: true },
    { word: 'robot', correct: false },
    { word: 'orquídia', correct: true },
    { word: 'martell', correct: true },
    { word: 'patata', correct: true },
    { word: 'cotxe', correct: true },
    { word: 'papallona', correct: true },
    { word: 'paraula', correct: true },
    { word: 'pilota', correct: true },
    { word: 'elefant', correct: true },
    { word: 'hamburguesa', correct: true },
    { word: 'teclat', correct: true },
    { word: 'espasa', correct: true },
    { word: 'roca', correct: true },
    { word: 'ovella', correct: true },
    { word: 'avions', correct: false },
    { word: 'corbata', correct: true },
    { word: 'globus', correct: true },
    { word: 'oceà', correct: true },
    { word: 'lletres', correct: true },
    { word: 'pantalons', correct: true },
    { word: 'estrella', correct: true },
    { word: 'ordinador', correct: true },
    { word: 'rínxol', correct: true },
    { word: 'palmera', correct: true },
    { word: 'futbol', correct: true },
    { word: 'esquerda', correct: true },
    { word: 'tigre', correct: true },
    { word: 'bufanda', correct: true },
    { word: 'gegant', correct: true },
    { word: 'parc', correct: true },
    { word: 'pluja', correct: true },
    { word: 'balena', correct: true },
    { word: 'fals', correct: false },
    { word: 'sabata', correct: true },
    { word: 'brúixola', correct: true },
    { word: 'piscina', correct: true },
    { word: 'cerca', correct: true },
    { word: 'dinosaure', correct: true },
    { word: 'drac', correct: true },
    { word: 'vaixell', correct: true },
    { word: 'muntanya', correct: true },
    { word: 'plumari', correct: true },
    { word: 'tractor', correct: true },
    { word: 'parpelles', correct: true },
    { word: 'radio', correct: true },
    { word: 'granota', correct: true },
    { word: 'planeta', correct: true },
    { word: 'navili', correct: false },
    { word: 'maneta', correct: true },
    { word: 'neu', correct: true },
    { word: 'circus', correct: false },
    { word: 'ossos', correct: true },
    { word: 'relogeu', correct: true },
    { word: 'cremallera', correct: true },
    { word: 'sorra', correct: true },
    { word: 'pasta', correct: true },
    { word: 'nuvols', correct: true },
    { word: 'guitarra', correct: true },
    { word: 'gerro', correct: true },
    { word: 'ratolí', correct: true },
    { word: 'buffet', correct: false },
    { word: 'flor', correct: true },
    { word: 'serp', correct: true },
    { word: 'pinta', correct: true },
    { word: 'xocolata', correct: true },
    { word: 'quadrat', correct: true },
    { word: 'pont', correct: true },
    { word: 'videojoc', correct: true },
    { word: 'zigzag', correct: true },
    { word: 'jardí', correct: true },
    { word: 'limona', correct: true },
    { word: 'guaita', correct: true },
    { word: 'pernil', correct: true },
    { word: 'llapis', correct: true },
    { word: 'fiesta', correct: false },
    { word: 'rata', correct: true },
    { word: 'faula', correct: false },
    { word: 'quina', correct: true },
    { word: 'quimera', correct: false },
    { word: 'porta', correct: true },
    { word: 'santuario', correct: false },
    { word: 'somriure', correct: true },
    { word: 'teletubbie', correct: false },
    { word: 'verdura', correct: true },
];
 
 let currentWordIndex = 0;
 let score = 0;
 let temps = 60; // temps en segons
 let errors = 0;
const incorrectWords = [];

 
 function startGame() {
    showWord();
    setInterval(updatetemps, 1000);
 }
 
 function showWord() {
    const wordDisplay = document.getElementById('word-display');
    wordDisplay.textContent = words[currentWordIndex].word;
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

 function updateScoreDisplay() {
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.textContent = `Punts: ${score}`;
 }
 
 
 function handleCorrect() {
    if (words[currentWordIndex].correct) {
        score++;
        showCorrectAnimation()
    }else{
        score--
        errors++;
        incorrectWords.push(words[currentWordIndex].word);
        showIncorrectAnimation()
    }
    showNextWord();
    updateScoreDisplay();
 }

 function showCorrectAnimation() {
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.classList.add('correct');
    setTimeout(() => {
        scoreDisplay.classList.remove('correct');
    }, 300); // Elimina la classe després d'1 segon (ajusta-ho segons la teva preferència)
}
 
 function handleIncorrect() {
    if (!words[currentWordIndex].correct) {
        score++;
        showCorrectAnimation()
    }else{
        score--
        errors++;
        incorrectWords.push(words[currentWordIndex].word);
        showIncorrectAnimation()
    }
    showNextWord();
    updateScoreDisplay();
 }
 function showIncorrectAnimation() {
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.classList.add('incorrect');
    setTimeout(() => {
        scoreDisplay.classList.remove('incorrect');
    }, 300); // Elimina la classe després d'1 segon (ajusta-ho segons la teva preferència)
}
 
 function showNextWord() {
    currentWordIndex = Math.floor(Math.random() * words.length);
    showWord();
}
 
function endGame() {
    const modal = document.getElementById('modal');
    const modalScore = document.getElementById('modal-score');
    const modalErrors = document.getElementById('modal-errors');

    modalScore.textContent = `Puntuació final: ${score}`;
    modalErrors.textContent = `Paraules incorrectes: ${incorrectWords.join(', ')}`;
    modal.style.display = 'block';
}


function restartGame() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';

    // Restaura les variables del joc i reinicia
    currentWordIndex = 0;
    score = 0;
    temps = 60;
    startGame();
}

 
 document.getElementById('correct-btn').addEventListener('click', handleCorrect);
 document.getElementById('incorrect-btn').addEventListener('click', handleIncorrect);
 
 // Inicia el joc quan es carrega la pàgina
 window.onload = startGame;
 