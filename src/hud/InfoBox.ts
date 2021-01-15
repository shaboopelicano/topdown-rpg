import Character from "../character/Character";
import Game from "../core/Game";
import { Colors } from "../utils/colors";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../utils/constants";
import Box from "./Box";

export default class InfoBox extends Box {

    private game: Game;
    private readonly _INFO_BOX_HEIGHT: number = WINDOW_HEIGHT;
    private readonly _INFO_BOX_WIDTH: number = 300;
    private readonly _INFO_BOX_BACKGROUND_COLOR: string = Colors.WHITE;
    private readonly _INFO_BOX_TEXT_COLOR: string = Colors.BLACK;

    constructor(game: Game) {
        super();
        this.x = WINDOW_WIDTH - this._INFO_BOX_WIDTH;
        this.y = 0;
        this.w = this._INFO_BOX_WIDTH;
        this.h = this._INFO_BOX_HEIGHT
        this.isVisible = true;
        this.game = game;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.fillStyle = this._INFO_BOX_BACKGROUND_COLOR;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = Colors.BLACK;
        ctx.fillRect(this.x + 10, this.y, 2 , this.h);
        ctx.fillRect(this.x + 15, this.y, 2 , this.h);
        ctx.fillRect(this.x + 20, this.y, 2 , this.h);
        ctx.fillRect(WINDOW_WIDTH - 10, this.y, 2 , this.h);
        ctx.fillRect(WINDOW_WIDTH - 15, this.y, 2 , this.h);
        ctx.fillRect(WINDOW_WIDTH - 20, this.y, 2 , this.h);
        this.drawText(ctx);
        ctx.restore();
    }

    drawText(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this._INFO_BOX_TEXT_COLOR;
        ctx.font = "16px Georgia";

        const battle = this.game.currentLevel?.battle;
        battle?.characterList.forEach((char: Character, index: number) => {
            const offsetLeft = 40;
            const offsetTop = 100;
            const lineSeparation = 35;
            ctx.fillText(
                char.isCurrentTurn ? "-> " + char.getCharacterClass() : char.getCharacterClass(),
                WINDOW_WIDTH - this._INFO_BOX_WIDTH + offsetLeft,
                offsetTop + lineSeparation * index);
        })
    }


}