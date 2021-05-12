import { ISize } from "./isize";

export class Size implements ISize{
    constructor(public w: number, public h: number) {}

    get area(): number {
        return this.w * this.h
    }
    get perimeter(): number {
        return this.w * 2 + this.h * 2
    }
    scale(factor: number): ISize {        
        return new Size(this.w * factor, this.h * factor)
    }
}