import Player from "../character/Player";
import Map from "./Map";

export default class Level {

    map: Map;
    player:Player;

    constructor(player?:Player) {
        this.map = new Map();
        this.player = player ? player : new Player();
    }

}