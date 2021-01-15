import HUDManager from "../hud/HUDManager";
import Map from "../level/Map";
import { CLASS_WIZARD } from "../utils/classConstants";
import { Directions } from "../utils/directions";
import Character from "./Character";

export default class Wizard extends Character {

    private _speech:string;

    constructor(map:Map,x: number = 0, y: number = 0, speech : string = "" /* , w: number = 0, h: number = 0 */) {
        super(map,x, y);
        this.tilemapEntry = "wizard";
        this._speech = speech;
        this.class = CLASS_WIZARD;

    }

    setVelocity(direction?: Directions): void {
        throw new Error("Method not implemented.");
    }

    interaction(): void {
        const hud = HUDManager.getHUDInstance();
        hud.dialogBox.setTextSource(this._speech);
    }
}