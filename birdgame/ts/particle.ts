import { IDraw } from './IDraw'
export class Particle {
    private _ctx: CanvasRenderingContext2D
    public gamespeed = 2
    constructor(
        ctx: CanvasRenderingContext2D,
        public x: number,
        public y: number,
        public size = Math.random() * 5 + 1,
        public speedY = Math.random() * 1 - 0.5,
        public color = 'red'
    ) {
        this._ctx = ctx
    }
    draw(): void {
        this._ctx.fillStyle = this.color
        this._ctx.beginPath()
        this._ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        this._ctx.fill()
    }
    update(): void {
        this.x -= this.gamespeed
        this.y += this.speedY
    }
}
