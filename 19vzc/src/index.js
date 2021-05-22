
// Spiel Konstanten
const CV = document.querySelector('#canvas1');
const CTX = CV.getContext('2d');
const DISPLAY  = 400;
const CV_RECT = CV.getBoundingClientRect();
const COUNT = 4; // Anzahl Zeilen und Spalten
const COUNTSTONES = COUNT * COUNT
const STONE_SIZE = DISPLAY / COUNT

CTX.canvas.height = DISPLAY
CTX.canvas.width = DISPLAY

// Statistik Konstanten
let startTimer = true;
let clicks = 0;
let sort = false;
const counter = document.getElementById('clickCount');
counter.innerText = clicks;

const newPlay = document.getElementById('newPlay');
const clickTimer = document.getElementById('clickTimer');
const newSort = document.getElementById('newSort');
const resolve = document.getElementById('resolve');

let timerRef;
function clTimer() {
  let s = 0;
  timerRef = setInterval(() => {
    clickTimer.innerText = `${s} s`;
    s++;
  }, 1000);
}

class Rectangle {
  constructor(x, y, w, h, color, nr, pos, fColor = 'gold') {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.nr = nr;
    this.pos = pos;
    this.fontColor = fColor
    this.line = 2
    this.fontSize = Math.floor(this.w / 3)
  }
  draw() {
    CTX.fillStyle = this.color;
    CTX.strokeStyle = '#cccccc';
    CTX.lineWidth = this.line
    CTX.fillRect(this.x + this.line, this.y + this.line, this.w - this.line, this.h - this.line);
    CTX.strokeRect(this.x + this.line, this.y + this.line, this.w - this.line, this.h - this.line);
    CTX.beginPath();    
    CTX.font = `${this.fontSize}px Arial`;   
    CTX.fillStyle = this.fontColor;
    CTX.textAlign = 'center';
    CTX.fillText(this.nr, this.x + this.w / 2, this.y + this.h / 2 + (this.fontSize / 2));
  } 
}
// Zufälliges Array erstellen mit Zahlen zwischen 1 und Anzahl Steine
function randomNr() {
  const arrNr = [];  
  for (let i = 0; i < COUNTSTONES; i++) {
    arrNr.push(i + 1)
  }
  const ar = [];
  while (arrNr.length > 0) {
    let ri = Math.floor(Math.random() * arrNr.length);
    ar.push(arrNr[ri]);
    arrNr.splice(ri, 1);
  }
  return ar;
}
// Steine erstellen
let stones = [];
function readRecs(arrStones) {
  let nums = arrStones; 
  let x = 0;
  let y = 0;
  let clr = 'red';
  let fclr = 'gold'
  let nr = 0;  
  let stone = null

  for (let i = 0; i < nums.length; i++) {
    nr = nums[i];
    let mod = i % COUNT;
    x = mod * STONE_SIZE;    
    if (mod === 0) {
      x = 0;
      y += STONE_SIZE;
    }
    clr = nums[i] % 2 === 0 ? 'red' : 'white';
    if (nr === 16) {
      clr = 'black';
      fclr = 'black'
    } else {
      fclr = 'gold'
    }
    stone = new Rectangle(
      x,
      y - STONE_SIZE,
      STONE_SIZE,
      STONE_SIZE,
      clr,
      nr,
      i,
      fclr
    ) 
    stones.push(stone);
  }
}

// Steine zeichnen
function readAllRect(arrStones) {
  CTX.clearRect(0, 0, DISPLAY, DISPLAY);
  readRecs(arrStones); 
  stones.forEach((r) => {
    r.draw()
  });
}



function clearDisplay() {
  clicks = 0;
  counter.innerText = 0;
  stones = [];
  recs = [];
  startTimer = false;
  clearTimeout(timerRef);
  clickTimer.innerText = '0 s';
  readAllRect();
  animate(stones);
}
function kiResolve() {
  clearDisplay();
  let i = 0;
  alert('Funktioniert noch nicht!')
}

function playCheck(arrStones) {
  let i = 1;  
  let check = false
  arrStones.forEach( s => {
    check = s.pos + 1 === s.nr
    if (!check) return
  })
  alert('bravo')
}
// Spiel ablauf
readAllRect(randomNr());
CV.addEventListener('mousedown', (e) => {
  const mx = e.clientX - CV_RECT.left;
  const my = e.clientY - CV_RECT.top;
  if (startTimer) {
    startTimer = false;
    clTimer();
  }
  const nStones = JSON.parse(JSON.stringify(stones));
  const posFree = nStones.find((f) => {
    return f.color === 'black';
  });

  const posActive = nStones.find((f) => {
    return mx - 100 < f.x && my - 100 < f.y;
  });

  let pF = posFree.pos;
  let pA = posActive.pos;
  if (pA + 1 === pF || pA - 1 === pF || pA - 4 === pF || pA + 4 === pF) {
    clicks++;
    stones[pA].nr = nStones[pF].nr;
    stones[pA].color = nStones[pF].color;
    stones[pA].fontColor = nStones[pF].fontColor;
    stones[pF].nr = nStones[pA].nr;
    stones[pF].color = nStones[pA].color;
    stones[pF].fontColor = nStones[pA].fontColor;
  }


  playCheck(stones)
  counter.innerText = clicks;
});

newPlay.addEventListener('click', (e) => {
  clearDisplay();
});
newSort.addEventListener('click', (e) => {
  sort = true;
  clearDisplay();
  sort = false;

  playCheck(stones)
});
resolve.addEventListener('click', (e) => {
  kiResolve();
});

