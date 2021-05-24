import { Stone, Rectangle } from './object/object.js'
import { createNumbers, randomNr} from './utilities.js'


// Spiel Konstanten
const CV = document.querySelector('#canvas1');
const CTX = CV.getContext('2d');
const DISPLAY  = 400;

const COUNT = 4; // Anzahl Zeilen und Spalten
const COUNTSTONES = COUNT * COUNT
const STONE_SIZE = DISPLAY / COUNT

CTX.canvas.height = DISPLAY
CTX.canvas.width = DISPLAY
const CV_RECT = CV.getBoundingClientRect();
// Statistik Konstanten
let startTimer = true;
let clicks = 0;
let playPause = false
const counter = document.getElementById('clickCount');
counter.innerText = clicks;

const newPlay = document.getElementById('newPlay');
const clickTimer = document.getElementById('clickTimer');
const newSort = document.getElementById('newSort');
const resolve = document.getElementById('resolve');
const mix = document.getElementById('newMix');
const dataList = document.getElementById('scoreList')
const closeList = document.getElementById('closeScoreList')
const ranking = document.getElementById('ranking')
const pause = document.getElementById('pause')
const info = document.querySelector('.info')

let timerRef;
let seconds = 0;
function clTimer() {
  timerRef = setInterval(() => {
    clickTimer.innerText = `${seconds} s`;
    seconds++;
  }, 1000);
}
function stopTimer() {
  clearInterval(timerRef)
}



// Steine erstellen

let savedStones = [];
let currentStones = [];

// Erstellt ein Array mit den Nummer und den Positionen
// [{nr, x, y}]
function readRecs(arrNumbers) {
  savedStones = arrNumbers
  let newArr = []  
  let x = 0;
  let y = 0;  
  if (arrNumbers.length <= 0 || !arrNumbers) return
  for (let index in arrNumbers) {
    x = (index % 4 + 1) * STONE_SIZE
    y += (index % 4 === 0) ? STONE_SIZE : 0
    newArr.push([arrNumbers[index], x, y])
  }  
  currentStones = [...newArr]
  return newArr
}
// Erstellt ein Array mit den Rechtecken zum Zeichnen
// des Spielfeldes
// arrStone = Objekt von readRecs
function createStones(arrStones) { 
  if (arrStones.length <= 0 || !arrStones) return
 
  let color = 'red'; // Rechteckfarbe
  let fcolor = 'gold' // Schriftfarbe 
  let stone = null
  const stones = []
  for (let index in arrStones) {
    color = arrStones[index][0] % 2 === 0 ? 'red' : 'white';
    if (arrStones[index][0] === 16) {
      color = 'black';
      fcolor = 'black'
    } else {
      fcolor = 'gold'
    }
    stone = new Stone(CTX,
      arrStones[index][1] - 100,
      arrStones[index][2] - 100,
      STONE_SIZE,
      STONE_SIZE,
      color,
      arrStones[index][0],
      index,
      fcolor
    ) 
    stones.push(stone)
    // Spielfeld Zeichnen
    
  }
  
  return stones
}
 
initGame()
// // Steine zeichnen
function drawStones(arrStones) {
  CTX.clearRect(0, 0, DISPLAY, DISPLAY);
  arrStones.forEach((r) => {
    r.draw()
  });
}
function initGame() {
  savedStones = randomNr(COUNTSTONES)
  const rdNumbers = readRecs(savedStones) 
  const stones = createStones(rdNumbers)  
  drawStones(stones)
}

function clearDisplay() {
  clicks = 0;
  counter.innerText = 0;  
  startTimer = false;
  clearTimeout(timerRef);
  clickTimer.innerText = '0 s';  
}

// Spiel ablauf
function playing(mx, my) {
  const arr = currentStones
  const position = arr.findIndex(f => mx  < f[1] && my < f[2])
  const index = arr.findIndex(f => f[0] === 16)
  const nrPos = arr[position][0]
  const nrInd = arr[index][0]
 
  if (
      position + 1 === index ||
      position - 1 === index ||
      position - 4 === index ||
      position + 4 === index 
      ) {
          arr[index][0]= nrPos
          arr[position][0] = nrInd
      }
  drawStones(createStones(arr))
  counter.innerText = clicks;
  infoGameOver(arr)
}

function infoGameOver(arrStones) {
  if (gameOver(arrStones)) {
    info.innerText = 'Game over'
    info.style.display = 'flex'
    newSort.disabled = pause.disabled = resolve.disabled = newPlay.disabled = true
  }
}
function gameStart() {
  pause.disabled = newPlay.disabled = false
}
function gameOver(arrStone) {
  let game = false
  for (let i in arrStone) {
    if ( (i * 1) === arrStone[i][0] - 1) {
      console.log(i)
      if (i === '15'){
        return true
      }  
    } else {      
      break
    }
  }
  return game;
}
function playPausing() {
  if (pause.innerText === 'Pause') {   
    stopTimer()
    playPause = true
    pause.innerText = 'Weiter'
    info.innerText = "Pause"
    info.style.display = 'flex'  
  } else {
      clTimer()
      playPause = false
      pause.innerText = 'Pause'
      info.style.display = 'none'
  }
}

window.addEventListener('resize', () => {  
  CTX.canvas.width = DISPLAY
  CTX.canvas.height = DISPLAY
})

// Spielsteine schieben
CV.addEventListener('click', (e) => {
  if(playPause) return
  gameStart()
  clicks++
  if (!timerRef)
    clTimer()
  const mx = e.clientX - CV_RECT.left;
  const my = e.clientY - CV_RECT.top; 
  playing(mx, my)
});

newPlay.addEventListener('click', (e) => {   
 
  const rdNumbers = readRecs(savedStones)
  const stones = createStones(rdNumbers)
  
  drawStones(stones)
  // currentStones = [...savedStones]
});
newSort.addEventListener('click', (e) => {
  const rdNr = readRecs(createNumbers(COUNTSTONES))
  infoGameOver(rdNr)
  drawStones(createStones(rdNr))
});
resolve.addEventListener('click', (e) => {  
    
});
mix.addEventListener('click', (e) => {
  initGame()  
  info.style.display = 'none'
  newSort.disabled = pause.disabled = resolve.disabled = newPlay.disabled = false
})

closeList.addEventListener('click', () => {
  dataList.style.display = 'none'
})
ranking.addEventListener('click', (e) => {
  dataList.style.display = 'flex'
})
pause.addEventListener('click', (e) => {
  playPausing()
  
})