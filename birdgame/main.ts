import { Bird } from './ts/bird'
import { Particle } from './ts/particle'
import { Obstacle } from './ts/obstacle'

const canvas = document.getElementById('canvas1') as HTMLCanvasElement
const ctx = canvas.getContext('2d')
canvas.width = 600
canvas.height = 400
const bird = new Bird(ctx, canvas)
const particlesArray: Particle[] = []
const obstacleArray: Obstacle[] = []

let spacePressed = false
let angel = 0
let hue = 0
let frame = 0
let score = 0
let gamespeed = 2
let p: Particle
let o: Obstacle

let i = 0
function animate(): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    hue += 10
    frame++
    bird.update()
    bird.draw()
    bird.flapping = spacePressed
    bird.angle += 0.12
    handleParticle(
        bird.x,
        bird.y + bird.height / 2,
        `hsla(${hue}, 100%, 50%, .8)`
    )
    handleObstacle()
    handleCollision()
    ctx.fillStyle = 'red'
    ctx.font = '90px Georgia'
    ctx.strokeText(score.toString(), 450, 70)
    ctx.fillText(score.toString(), 450, 70)
    if (handleCollision()) return
    window.requestAnimationFrame(animate)
}
animate()

window.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.code === 'Space') spacePressed = true
})

window.addEventListener('keyup', (event: KeyboardEvent) => {
    if (event.code === 'Space') spacePressed = false
})
function handleParticle(birdX: number, birdY: number, color: string) {
    p = new Particle(ctx, birdX, birdY)
    p.color = color
    particlesArray.unshift(p)
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
    }
    if (particlesArray.length > 200) {
        for (let i = 0; i < 20; i++) {
            particlesArray.pop()
        }
    }
}

function handleObstacle() {
    if (frame % 60 === 0) {
        o = new Obstacle(ctx, canvas, hue)
        obstacleArray.unshift(o)
    }
    for (let i = 0; i < obstacleArray.length; i++) {
        obstacleArray[i].update()
    }
    if (obstacleArray.length > 20) {
        obstacleArray.pop()
    }
}
function handleCollision() {
    for (let i = 0; i < obstacleArray.length; i++) {
        if (obstacleArray[i].counted && obstacleArray[i].x < bird.x) {
            score++
            obstacleArray[i].counted = true
        }
        if (
            bird.x < obstacleArray[i].x + obstacleArray[i].width &&
            bird.x + bird.width > obstacleArray[i].x &&
            ((bird.y < 0 + obstacleArray[i].top && bird.y + bird.height > 0) ||
                (bird.y > canvas.height - obstacleArray[i].bottom &&
                    bird.y + bird.height < canvas.height))
        ) {
            ctx.font = '25px Consolas'
            ctx.fillStyle = 'black'
            ctx.fillText('BANG', bird.x, bird.y)
            ctx.fillText(
                `Game over sie haben ${score} Punkte`,
                160,
                canvas.height / 2 - 10
            )
            return true
        }
    }
}
