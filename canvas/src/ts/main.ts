import { Point } from "./basis/point"
import { Size } from "./basis/size"
import { Canvas } from './canvas/canvas';

const cv = document.querySelector('canvas')
const dSize = new Size(600, 600)


const c = new Canvas(cv, dSize)
c.border = '5px solid black'
console.log(c.mouse)
