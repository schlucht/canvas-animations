const cv = document.querySelector('#canvas1');
const ctx = cv.getContext('2d');
const cv_H = (ctx.canvas.height = 400);
const cv_W = (ctx.canvas.width = 400);
const rect = cv.getBoundingClientRect();

const counter = document.getElementById('clickCount');
let clicks = 0;
counter.innerText = clicks;
let startTimer = true;

const newPlay = document.getElementById('newPlay');
const clickTimer = document.getElementById('clickTimer');
const newSort = document.getElementById('newSort');
const resolve = document.getElementById('resolve');
let sort = false;

class Rectangle {
  constructor(x, y, w, h, color, nr, pos) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.nr = nr;
    this.pos = pos;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = '#000000';
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeRect(this.x + 1, this.y + 1, this.w - 1, this.h - 1);
    ctx.beginPath();
    ctx.font = '30px Arial';
    ctx.fillStyle = 'gold';
    ctx.textAlign = 'center';
    ctx.fillText(this.nr, this.x + this.w / 2, this.y + this.h / 2 + 15);
  }
  update() {}
}

function randomNr() {
  const arrNr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const ar = [];
  while (arrNr.length > 0) {
    let ri = Math.floor(Math.random() * arrNr.length);
    ar.push(arrNr[ri]);
    arrNr.splice(ri, 1);
  }
  return ar;
}

const count = 4;
let recs = [];
function readRecs() {
  let nums = [];
  if (!sort) {
    nums = randomNr();
  } else {
    nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  }

  let x = 0;
  let y = 0;
  let crl = 'red';
  let nr = 0;
  for (let i = 0; i < nums.length; i++) {
    nr = nums[i];
    let mod = i % count;
    x = mod * 100;
    if (mod === 0) {
      x = 0;
      y += 100;
    }
    crl = nums[i] % 2 === 0 ? 'red' : 'white';
    if (nr === 16) {
      crl = 'black';
      nr = '';
    }
    let o = { x: x, y: y - 100, nr: nr, color: crl, pos: i };
    recs.push(o);
  }
}

let stones = [];
function readAllRect() {
  readRecs();
  let stone = null;
  recs.forEach((r) => {
    stone = new Rectangle(r.x, r.y, 100, 100, r.color, r.nr, r.pos);
    stones.push(stone);
  });
  animate(stones);
}
readAllRect();
function animate(sarr) {
  ctx.clearRect(0, 0, cv_W, cv_H);
  sarr.forEach((rs) => {
    rs.draw();
  });

  // window.requestAnimationFrame(animate)
}
let timerRef;
function clTimer() {
  let s = 0;
  timerRef = setInterval(() => {
    clickTimer.innerText = `${s} s`;
    s++;
  }, 1000);
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
  setInterval(() => {
    if (i === stones.length) return;
    console.log(stones[i]);
    i++;
  }, 1000);
}
cv.addEventListener('mousedown', (e) => {
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
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
    stones[pF].nr = nStones[pA].nr;
    stones[pF].color = nStones[pA].color;
  }

  animate(stones);
  counter.innerText = clicks;
});

newPlay.addEventListener('click', (e) => {
  clearDisplay();
});
newSort.addEventListener('click', (e) => {
  sort = true;
  clearDisplay();
  sort = false;
});
resolve.addEventListener('click', (e) => {
  kiResolve();
});
animate(stones);
