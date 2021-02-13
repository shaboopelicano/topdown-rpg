import Game from "../core/Game";
import { CursorState } from "../hud/Cursor";

export default class MouseEvents {

    static mouseX: number = -100;
    static mouseY: number = -100;

    game: Game;

    constructor(game: Game) {
        this.game = game;
    }

    init(): void {
        window.onmousemove = this.updateMouseCoords.bind(this);
        window.onclick = this.mouseClicked.bind(this)
    }

    private updateMouseCoords(e: MouseEvent): void {
        MouseEvents.mouseX = e.x;
        MouseEvents.mouseY = e.y;
        this.game.hud.cursor.updateCoordinates(MouseEvents.mouseX, MouseEvents.mouseY);
    }

    /* Cursor state based click */
    private mouseClicked(): void {

        const cursor = this.game.hud.cursor;

        switch (cursor.state) {
            case CursorState.TARGET:
                if (this.game.currentLevel)
                    this.game.currentLevel.mouseInteraction(MouseEvents.mouseX, MouseEvents.mouseY);
                break;
            case CursorState.ARROW:
                this.game.hud.infoBox.clickHandler(MouseEvents.mouseX, MouseEvents.mouseY);
                break;

        }
    }

    public static getMouseCoordinates() {
        return [MouseEvents.mouseX, MouseEvents.mouseY];
    }

}