import Game from "../core/Game";

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
    }

    private mouseClicked(): void {
        if (this.game.currentLevel)
            this.game.currentLevel.mouseInteraction(MouseEvents.mouseX, MouseEvents.mouseY);
    }

    public static getMouseCoordinates() {
        return [MouseEvents.mouseX, MouseEvents.mouseY];
    }

}