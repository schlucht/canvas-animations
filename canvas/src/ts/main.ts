import { Point } from "./basis/point"
import { Size } from "./basis/size"
import { Rect } from "./geometries.ts/rect"

const cv = document.querySelector('canvas')
const ctx = cv.getContext('2d')
const dSize = new Size(600, 600)
cv.height = dSize.h
cv.width = dSize.w
