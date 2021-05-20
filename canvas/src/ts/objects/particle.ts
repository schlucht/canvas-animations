import { IPoint, ISize, Point } from "../basis";
import { PI, PI2 } from '../utilities'

export class Particle {
    public _point: IPoint
    public get MousePoint():IPoint {        
        return this._point
    }
    public set MousePoint(value: IPoint | undefined | null) {
        if (value === undefined || value === null) {
            this._point = new Point(0, 0)
        } else {
            this._point = value
        }
    }
    private _size: number
    public get Size(): number {
        return this._size
    }
    public set Size(value: number | undefined | null) {
        if ( value === null || value === undefined) {
            this._size = 0
        } else {
            this._size = value
        }
    }
    private _speedX: number
    public get SpeedX (): number {
        return this._speedX
    }
    public set SpeedX(value: number | undefined | null) {
        if (value === undefined || value === null) {
            this._speedX =0
        } else {
            this._speedX = value
        }
    }
    private _speedY: number

    public get SpeedY (): number {
        return this._speedY
    }
    public set SpeedY(value: number | undefined | null) {
        if (value === undefined || value === null) {
            this._speedY =0
        } else {
            this._speedY = value
        }
    }
    private _color
    public get Color(): string {
        return this._color
    }
    public set Color(value: string) {
        if (value === "") {
            this._color = 'black'
        } else {
            this._color = value
        }
    }
    constructor(public ctx: CanvasRenderingContext2D, mouse: Point) {
        this.MousePoint = mouse
    }
    draw() {
        this.ctx.fillStyle = this.Color
        this.ctx.beginPath()
        this.ctx.arc(this.MousePoint.x, this.MousePoint.y, this.Size, 0, PI2)
        this.ctx.fill()
    }
    update() {
        this.MousePoint.x += this.SpeedX
        this.MousePoint.y += this.SpeedY
        if (this.Size > 0.2) this.Size -= .1
    }
}