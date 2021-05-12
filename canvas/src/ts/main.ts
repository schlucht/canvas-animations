import { Point } from "./basis/point"
import { Size } from "./basis/size"
import { Rect } from "./geometries.ts/rect"

const cv = document.querySelector('canvas')
const ctx = cv.getContext('2d')
const dSize = new Size(600, 600)
cv.height = dSize.h
cv.width = dSize.w

const s1 = new Size(80, 80)
const s2 = s1.scale(2)
const p1 = new Point(150, 150)
const r1 = new Rect(ctx, new Point(150, 150), s1 , 'red')
console.log(p1)
console.log(s2.perimeter)
const r2 = new Rect(ctx, new Point(50, 20), s2 , 'blue')