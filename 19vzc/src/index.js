import { Stone, Rectangle } from './object/object.js'
import { Player } from './player.js';
import { createNumbers, randomNr} from './utilities.js'


// Spiel Konstanten
const CV = document.querySelector('#canvas1');
const CTX = CV.getContext('2d');
let DISPLAY  = window.outerWidth < 500 ? 300 : 400;
console.log(DISPLAY)
const COUNT = 4; // Anzahl Zeilen und Spalten
let STONE_SIZE = DISPLAY / COUNT
const COUNTSTONES = COUNT * COUNT


CTX.canvas.height = DISPLAY
CTX.canvas.width = DISPLAY

const CV_RECT = CV.getBoundingClientRect();
// Statistik Konstanten
let clicks = 0;
let playPause = false
let players = [new Player('Spieler 2', 200, 150), new Player('Spieler 3', 100, 10)];
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
const playerName = document.getElementById('pName')
const table = document.querySelector('#tableData tbody')




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
      arrStones[index][1] - STONE_SIZE,
      arrStones[index][2] - STONE_SIZE,
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
  console.log(arr[position])
 
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
  currentStones = arr
  counter.innerText = clicks;
  infoGameOver(arr)
}

function infoGameOver(arrStones) {
  if (gameOver(arrStones)) {
    info.innerHTML = `<p>Game over</p>
            <p class="info__name">Spieler: ${players[0].name}</p>
            <p class="info__count">Clicks: ${counter.innerText}</p>
            <p class="info__count"> Dauer: ${clickTimer.innerText}</p>`
    info.style.display = 'flex'
    newSort.disabled = pause.disabled = resolve.disabled = newPlay.disabled = true
    players[0].clicks = counter.innerText
    players[0].time = clickTimer.innerText
    console.log(players[0])
  }
}

function createScoreList(list) {
  let rank = 1
  let tableString = ``
  for (let li of list) {
    tableString += `
      <tr>
      <td>${rank}.</td>
      <td>${li.name}</td>
      <td>${li.clicks}</td>
      <td>${li.time}</td>
      </tr>   `
    
    rank++

  }
  table.innerHTML = tableString
  
}
function gameStart() {
  pause.disabled = newPlay.disabled = false
}
function gameOver(arrStone) {
  let game = false
  for (let i in arrStone) {
    if ( (i * 1) === arrStone[i][0] - 1) {      
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

window.addEventListener('resize', (e) => {  
    DISPLAY = e.target.outerWidth < 500 ? 300 : 400
    STONE_SIZE = DISPLAY / COUNT
    const stones = [...currentStones]
    const recs = stones.map((val, index) => {
      return val[0]
    })
    CTX.canvas.width = DISPLAY
    CTX.canvas.height = DISPLAY 
    let rdNumbers = readRecs(recs);     
    drawStones(createStones(rdNumbers))
    currentStones = rdNumbers    
    
  
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
  
  if (clicks === 1) {
    let name = playerName.value ? playerName.value : 'Spieler 1'    
    players.unshift(new Player(name, 0, 0))    
  } 
  playing(mx, my)
});

newPlay.addEventListener('click', (e) => {   
 
  const rdNumbers = readRecs(savedStones)
  const stones = createStones(rdNumbers)
  
  drawStones(stones)
  clearDisplay()
});
newSort.addEventListener('click', (e) => {
  const rdNr = readRecs(createNumbers(COUNTSTONES))
  infoGameOver(rdNr)
  drawStones(createStones(rdNr))
  clearDisplay()
});
resolve.addEventListener('click', (e) => {  
    
});
mix.addEventListener('click', (e) => {
  initGame()  
    info.style.display = 'none'
    newSort.disabled = pause.disabled = resolve.disabled = newPlay.disabled = false    
    clearDisplay()
})

pause.addEventListener('click', (e) => {
  playPausing()
  
})
closeList.addEventListener('click', () => {
  dataList.style.display = 'none'
})
ranking.addEventListener('click', (e) => {
  createScoreList(players)
  dataList.style.display = 'flex'  
})
