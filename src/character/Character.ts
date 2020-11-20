import { Directions } from "../utils/directions";

export default abstract class Character {

    public x: number;
    public y: number;
    public vX: number = 0;
    public vY: number = 0;
    /*     public w: number;
        public h: number; */
    public tilemapEntry: string = "floor";

    constructor(x: number = 0, y: number = 0/* , w: number = 0, h: number = 0 */) {
        this.x = x;
        this.y = y;
        /*         this.w = w;
                this.h = h; */
    }

    abstract setVelocity(direction?: Directions): void;
    abstract move(): void;

}