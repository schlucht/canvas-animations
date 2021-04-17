import { Point } from './src/point'
import { Particle } from './src/particle'
const canvas = document.getElementById('canvas1')! as HTMLCanvasElement
const ctx = canvas.getContext('2d')
const particleArray: Particle[] = []
const mouse: Point = new Point(undefined,undefined)
const colors = ['red', 'blue', 'green', 'gray']
let hue = 0
canvas.width = window.innerWidth
canvas.height = window.innerHeight


window.addEventListener('resize', () => {
    ctx.canvas.width = window.innerWidth
    ctx.canvas.height = window.innerHeight

})
canvas.addEventListener('click', (event: MouseEvent) => {
    mouse.Y = event.y
    mouse.X = event.x
    let p: Particle;
    let pt: Point
    for (let i = 0; i < 10; i++){
        pt = new Point(mouse.X, mouse.Y)
        p = new Particle(ctx, pt)
        p.Color = colors[Math.ceil(Math.random() * colors.length)]
        p.Size = Math.random() * 15 + 1
        p.SpeedY = Math.random() * 4 - 1.5
        p.SpeedX = Math.random() * 4 - 1.5
        particleArray.push(p)
    }
})
canvas.addEventListener('mousemove', (event: MouseEvent) => {    
    mouse.Y = event.y
    mouse.X = event.x
    let p: Particle;
    let pt: Point
    for (let i = 0; i < 5; i++){
        pt = new Point(mouse.X, mouse.Y)
        p = new Particle(ctx, pt)
        p.Color = `hsl(${hue}, 100%, 50%)`
        p.Size = Math.random() * 5 + 1
        p.SpeedY = Math.random() * 4 - 1.5
        p.SpeedX = Math.random() * 4 - 1.5
        particleArray.push(p)
    }
})

// function initParticle() {
//     let p: Particle;
//     for (let i = 0; i < 100; i++) {        
//         p = new Particle(ctx, mouse)
//         p.Color = 'blue'
//         p.Size = Math.random() * 15 + 1
//         p.SpeedX = Math.random() * 3 - 1.5
//         p.SpeedY = Math.random() * 3 - 1.5
//         particleArray.push(p)
//     }
// }
// initParticle()
function handleParicle() {
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update()
        particleArray[i].draw()
        for (let j = i; j < particleArray.length; j++) {
            // ENtfernung X vom Punkt eins zu dem Punkt 2 90° Winkel zum 
            // zweiten Punkt
            const dx = particleArray[i].MousePoint.X - particleArray[j].MousePoint.X

            // ENtfernung y vom Punkt eins zu dem Punkt 2 90° Winkel zum 
            // zweiten Punkt
            const dy = particleArray[i].MousePoint.Y - particleArray[j].MousePoint.Y
            const distance = Math.sqrt(dx * dx + dy * dy)
        }
        if(particleArray[i].Size < .3) {
            particleArray.slice(i, 1)
            i--
        }
    }
}
function animation() {
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    // ctx.fillStyle = 'rgba(0,0,0,.02)'
    // ctx.fillRect(0, 0, canvas.width, canvas.height)
    handleParicle()
    hue+=2
    window.requestAnimationFrame(animation)
    
}

animation()