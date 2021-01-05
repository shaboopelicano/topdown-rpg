import HUDManager from "../hud/HUDManager";
import { Directions } from "../utils/directions";
import Character from "./Character";

export default class Wizard extends Character {

    private _speech:string;

    constructor(x: number = 0, y: number = 0, speech : string = "" /* , w: number = 0, h: number = 0 */) {
        super(x, y);
        this.tilemapEntry = "wizard";
        this._speech = speech;

    }

    setVelocity(direction?: Directions): void {
        throw new Error("Method not implemented.");
    }
    move(): void {
        throw new Error("Method not implemented.");
    }

    interaction(): void {
        const hud = HUDManager.getHUDInstance();
        hud.dialogBox.setTextSource(this._speech);
    }
}