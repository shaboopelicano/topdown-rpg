import { Directions } from "../utils/directions";

export default abstract class Character {

    public x: number;
    public y: number;
    public vX: number = 0;
    public vY: number = 0;
    public uuid: string;
    /*     public w: number;
        public h: number; */
    public tilemapEntry: string = "floor";

    constructor(x: number = 0, y: number = 0/* , w: number = 0, h: number = 0 */) {
        this.x = x;
        this.y = y;
        this.uuid = this.generateUUID();

            /*         this.w = w;
                    this.h = h; */
        }

    generateUUID(): string {
        let sGuid = "";
        for (let i = 0; i < 32; i++) {
            sGuid += Math.floor(Math.random() * 0xF).toString(0xF);
        }
        return sGuid;
    }
    abstract setVelocity(direction?: Directions): void;
    abstract move(): void;
    abstract interaction(): void;

}