import { ISize, IPoint, Point } from '../basis';

export class Canvas {
    readonly context: CanvasRenderingContext2D;
    _mouse: IPoint = new Point(0,0)
    get mouse() :IPoint {
        return this._mouse
    }
    set mouse(value:IPoint) {        
        this._mouse = value
    }
    draw: boolean = false
    canvasPos:IPoint    
    private _bgColor = 'beige'
    get bgColor(): string {
        return this._bgColor
    }
    set bgColor(value: string) {
        if (value !== this._bgColor) {
            this._bgColor = value
            this.canvas.style.backgroundColor = this._bgColor
        }
    }
    private _border = 'solid 1px black'
    get border(): string {
        return this._border
    }
    set border(value: string) {
        if (value !== this._border) {
            this._border = value
            this.canvas.style.border = this._border
        }
    }
    constructor(public canvas: HTMLCanvasElement, public size: ISize) {
        this.context = canvas.getContext('2d')
        this.context.canvas.height = this.size.h
        this.context.canvas.width = this.size.w        
        this.bgColor = this.canvas.style.backgroundColor = this.bgColor
        this.border = this.canvas.style.border       
        this.canvasPosition()
        this.createEvents()
    }
    clear(size: ISize) {
        this.context.clearRect(0, 0, size.w, size.h)
        this.draw = false
    }

    animate(clear: boolean) {
    }
  
    mouseDown = (e: MouseEvent) => {
       this.draw = true
    }
    mouseUp = (e: MouseEvent) => {
       this.draw = false
    }
    mouseMove = (e: MouseEvent) => {
        if (this.draw) {
            const mp = new Point(e.clientX,  e.clientY)
            this.mouse = mp.sub(this.canvasPos)            
        }
    }
    private createEvents() {
        let cv = this.canvas
        cv.addEventListener('mousedown', this.mouseDown)
        cv.addEventListener('mouseup', this.mouseUp)
        cv.addEventListener('mousemove', this.mouseMove)
    }

    private mousePosition(e: MouseEvent) {
        const mp = new Point(e.clientX,  e.clientY)
        this.mouse = mp.sub(this.canvasPos)  
    }

    private canvasPosition() {
        const cp = this.canvas.getBoundingClientRect()
        this.canvasPos = new Point(cp.left, cp.top)
    }
}