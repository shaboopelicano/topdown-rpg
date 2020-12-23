import { Directions } from "../utils/directions";
import Character from "./Character";

export default class Wizard extends Character {

    constructor(x: number = 0, y: number = 0/* , w: number = 0, h: number = 0 */) {
        super(x, y);
        this.tilemapEntry = "wizard";
    }

    setVelocity(direction?: Directions): void {
        throw new Error("Method not implemented.");
    }
    move(): void {
        throw new Error("Method not implemented.");
    }

    interaction(): void {
        console.log(this.uuid);
    }
}