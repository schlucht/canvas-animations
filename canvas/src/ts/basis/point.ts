import { IPoint } from "./ipoint"

export class Point implements IPoint {
    constructor(public x: number, public y: number) {
    }
    clone(): IPoint {
        return new Point(this.x, this.y)
    }
    add(p: IPoint): IPoint {
        return new Point(this.x + p.x, this.y + p.y)
    }
    sub(p: IPoint): IPoint {
        return new Point(this.x - p.x, this.y - p.y)
    }
    mulpli(factor: number): IPoint {
        return new Point(this.x * factor, this.y * factor)
    }
    divi(factor: number): IPoint {
        if (factor > 0) {
            return new Point(this.x / factor, this.y / factor)
        }
        return new Point(0,0)
    }
    diff(p: IPoint): number {
        let dx = this.x - p.x
        let dy = this.y - p.y
        return Math.sqrt(dx * dx + dy *dy)
    }
    toString(): string {
        return `Point: x: ${this.x}, y: ${this.y}`
    }
}