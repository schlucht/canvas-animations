function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image()
        image.addEventListener('load', () => {
            resolve(image)
        })
        image.src = url
        console.dir(image)
    })
}
const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')

context.fillRect(0,0,50,50)
console.log(loadImage('image/tiles.png'))

loadImage('./image/tiles.png').then(img => {
    context.drawImage(img, 0, 0, 16, 16)
    console.log('Hallo')
})
.catch (err => console.log('Hallo'))