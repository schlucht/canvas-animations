export class Circle {
    constructor(ctx, x, y, volumn = 10, color = 'red') {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.radius = volumn
        this.color = color
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = this.color
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        this.ctx.fill()
    }
    update(x, y) {
        this.x = x
        this.y = y
        this.draw()
    }
}