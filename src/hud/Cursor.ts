import HUD from "./HUD";

export enum CursorState { ARROW, TARGET }

export default class Cursor {
    
    private _hud : HUD;
    public state: CursorState;
    
    constructor(hud:HUD) {
        this.state = CursorState.TARGET;
        this._hud = hud;
    }
    
    getCursorSprite() {
        switch(this.state){
            case CursorState.ARROW : return 'blackCursor';
            case CursorState.TARGET : return 'cursor';
        }
    }
    
    updateCoordinates(mouseX: number, mouseY: number) {
        const infoBox = this._hud.infoBox;
        if(mouseX > infoBox.x)
            this.state = CursorState.ARROW;
        else
            this.state = CursorState.TARGET;
    }
}