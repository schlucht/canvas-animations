function createNumbers() {
    const arrNr = [];  
    for (let i = 0; i < 16; i++) {
      arrNr.push(i + 1)
    }
    return arrNr
  }
function randomNr() {
    const arrNr = createNumbers()
    const ar = [];
    while (arrNr.length > 0) {
      let ri = Math.floor(Math.random() * arrNr.length);
      ar.push(arrNr[ri]);
      arrNr.splice(ri, 1);
    }
    return ar;
  }

function read() {
  const arrNumber = createNumbers()
  const size = 100
  const newArr = []
  let x = 0
  let y = 0
  for (let i in arrNumber) {
        x = (i % 4 + 1) * size
        y += (i % 4 === 0) ? size : 0
        newArr.push([arrNumber[i], x, y])
  }
  return newArr
}

function write() {
const arr = read()

const position = arr.findIndex(f => f[1] === 400 && f[2] === 300)
const index = arr.findIndex(f => f[0] === 16)
const nrPos = arr[position][0]
const nrInd = arr[index][0]
console.log(arr[index], arr[position])

if (
    position + 1 === index ||
    position - 1 === index ||
    position - 4 === index ||
    position + 4 === index 
    ) {
        arr[index][0] = nrPos
        arr[position][0] = nrInd
    }
console.log(arr[index], arr[position])
}
const obj = []
for (let i = 0 ; i < 10; i++) {
    obj.push({in: i, io: 2*i, ib: 'hallo'})
}
for (let o in obj) {
    console.log(obj[o]['io'])
}
for (let o of obj) {
    console.log( o)
}