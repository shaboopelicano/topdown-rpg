import HUD from "./HUD";

export default class HUDManager {

    private static _hud: HUD;

    public static setHUD(hud: HUD) {
        this._hud = hud;
    }

    public static getHUDInstance(){
        return this._hud;
    }


}