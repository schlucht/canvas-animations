import { IPoint, ISize } from "../basis";


export class Rect {
    constructor(private ctx: CanvasRenderingContext2D, 
        public pos: IPoint, 
        public dim: ISize, 
        public color: string = 'black'){
            this.draw()
        }
        draw() {
            this.ctx.fillStyle = this.color
            this.ctx.fillRect(this.pos.x, 
                this.pos.y, 
                this.dim.w, 
                this.dim.h)
        }
}