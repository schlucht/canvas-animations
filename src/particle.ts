import { Point } from './point'

export class Particle {
    public _point: Point
    public get MousePoint(): Point {        
        return this._point
    }
    public set MousePoint(value: Point | undefined | null) {
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
        this.ctx.arc(this.MousePoint.X, this.MousePoint.Y, this.Size, 0, Math.PI * 2)
        this.ctx.fill()
    }
    update() {
        this.MousePoint.X += this.SpeedX
        this.MousePoint.Y += this.SpeedY
        if (this.Size > 0.2) this.Size -= .1
    }
}