import HUD from "./HUD";

export enum CursorState { ARROW, TARGET, ATTACK }

export default class Cursor {

    private _hud: HUD;
    public state: CursorState;

    constructor(hud: HUD) {
        this.state = CursorState.TARGET;
        this._hud = hud;
    }

    getCursorSprite() {
        switch (this.state) {
            case CursorState.ARROW: return 'blackCursor';
            case CursorState.TARGET: return 'cursor';
            case CursorState.ATTACK: return 'sword2';
        }
    }

    updateCoordinates(mouseX: number, mouseY: number) {
        const infoBox = this._hud.infoBox;
        if (mouseX > infoBox.x) {
            if (this.state === CursorState.TARGET)
                this.state = CursorState.ARROW;
        }
        else {
            if (this.state === CursorState.ARROW)
                this.state = CursorState.TARGET;
        }
    }

    setState(state: CursorState) {
        this.state = state;
    }
}