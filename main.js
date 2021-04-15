import { Circle } from './src/circle.js'
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d')

let animationId;

canvas.height = innerHeight
canvas.width = innerWidth

function clear() {
    ctx.beginPath()
    ctx.fillStyle = 'rgba(0,0,0,.1)'
    ctx.fillRect(0, 0, innerWidth, innerHeight)
}

const circle = new Circle(ctx, 10, 10, 50)
const circle2 = new Circle(ctx, 10, 10, 50)
const circle3 = new Circle(ctx, innerWidth - 100, innerHeight - 100, 50)
circle.draw()
circle2.draw()
circle3.draw()
function animate() {
    animationId = window.requestAnimationFrame(animate)
    clear()
    if (circle.x > innerWidth) {
        circle.x = 0
        circle.y += 20
        circle.color = `hsl(${Math.random() * 360}, 50%, 80%)`
    }
    if (circle2.y > innerHeight) {
        circle2.y = 0
        circle2.x += 20
        circle2.color = `hsl(${Math.random() * 360}, 50%, 80%)`
    }
    if (circle3.x < 0 || circle3.Y < 0) {
        circle3.x = Math.random() * innerWidth
        circle3.y = Math.random() * innerHeight
        circle3.color = `hsl(${Math.random() * 360}, 80%, 80%)`
    }
    circle.update(circle.x + 20, circle.y)
    circle2.update(circle2.x, circle2.y + 20)
    circle3.update(circle3.x - 20, circle3.y - 40 * Math.random())
    if (circle.y > innerHeight) {
        window.cancelAnimationFrame(animationId)
    } 
}
animate()