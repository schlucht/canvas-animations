export class Obstacle {
    private _ctx: CanvasRenderingContext2D
    top: number
    bottom: number
    x: number
    width: number
    color: string
    canvas: HTMLCanvasElement
    gamespeed = 2
    counted = false
    constructor(
        ctx: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement,
        hue: number
    ) {
        this._ctx = ctx
        this.canvas = canvas
        this.top = (Math.random() * canvas.height) / 3 + 20
        this.bottom = (Math.random() * canvas.height) / 3 + 20
        this.x = canvas.width
        this.width = 20
        this.color = `hsl(${hue}, 100%, 50%)`
    }
    draw() {
        this._ctx.fillStyle = this.color
        this._ctx.fillRect(this.x, 0, this.width, this.top)
        this._ctx.fillRect(
            this.x,
            this.canvas.height - this.bottom,
            this.width,
            this.bottom
        )
    }
    update() {
        this.x -= this.gamespeed
        this.draw()
    }
}
