export class Bird {
    private _ctx: CanvasRenderingContext2D
    private _canvas: HTMLCanvasElement

    public flapping = false
    public angle = 0

    constructor(
        ctx: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement,
        public x = 150,
        public y = 200,
        public vy = 0,
        public width = 20,
        public height = 20,
        public weight = 1,
        public color = 'red'
    ) {
        this._ctx = ctx
        this._canvas = canvas
    }
    update() {
        let curve = Math.sin(this.angle) * 20
        if (this.y > this._canvas.height - this.height * 3 + curve) {
            this.y = this._canvas.height - this.height * 3 + curve
            this.vy = 0
        } else {
            this.vy += this.weight
            this.vy *= 0.9
            this.y += this.vy
        }
        if (this.y < 0 + this.height) {
            this.y = 0 + this.height
            this.vy = 0
        }
        if (this.flapping && this.y > this.height * 3) this.flap()
    }
    draw() {
        this._ctx.fillStyle = this.color
        this._ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    flap() {
        this.vy -= 2
    }
}
