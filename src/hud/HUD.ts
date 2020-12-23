import Game from "../core/Game";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../utils/constants";
import Lifebar from "./Lifebar";

export default class HUD {

    public x: number;
    public y: number;
    public w: number;
    public h: number;
    public lifebar: Lifebar;

    public xLine1Reveal : number = 0;
    public xLine2Reveal : number = 0;
    public xLine3Reveal : number = 0;
    public xLine4Reveal : number = 0;

    public currentLine = 1;

    constructor(game: Game, x: number = 0, y: number = 0 , w:number = WINDOW_WIDTH , h : number = 100) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.lifebar = new Lifebar();
    }
}