export interface IPoint {
    x: number
    y: number
    add(p: IPoint): IPoint
    sub(p: IPoint): IPoint
    mulpli(faktor: number): IPoint
    divi(faktor: number): IPoint
    diff(p: IPoint): number
}