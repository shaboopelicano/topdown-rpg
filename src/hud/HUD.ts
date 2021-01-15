import Game from "../core/Game";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../utils/constants";
import DialogBox from "./DialogBox";
import InfoBox from "./InfoBox";
import Lifebar from "./Lifebar";

export default class HUD {

    public x: number;
    public y: number;
    public w: number;
    public h: number;
    public lifebar: Lifebar;
    public dialogBox: DialogBox;
    public infoBox: InfoBox;
    private game :Game;


    constructor(game: Game, x: number = 0, y: number = 0, w: number = WINDOW_WIDTH, h: number = 100) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.lifebar = new Lifebar(this.game);
        this.dialogBox = new DialogBox(this.game);
        this.infoBox = new InfoBox(this.game);
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this.dialogBox.isVisible)
            this.dialogBox.draw(ctx);
        if (this.infoBox.isVisible)
            this.infoBox.draw(ctx);
    }
}