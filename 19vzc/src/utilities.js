export function createNumbers(countNumbers) {
    const arrNr = [];  
    for (let i = 0; i < countNumbers; i++) {
      arrNr.push(i + 1)
    }
    return arrNr
  }

  // Zufälliges Array erstellen mit Zahlen zwischen 1 und Anzahl Steine
export function randomNr(countNumbers) {
    const arrNr = createNumbers(countNumbers)
    const ar = [];
    while (arrNr.length > 0) {
      let ri = Math.floor(Math.random() * arrNr.length);
      ar.push(arrNr[ri]);
      arrNr.splice(ri, 1);
    }
    return ar;
  }