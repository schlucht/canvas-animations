export interface ISize {
    h: number
    w: number
    readonly area: number
    readonly perimeter: number

    scale(factor: number): ISize 
}