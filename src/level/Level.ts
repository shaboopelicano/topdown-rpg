import Player from "../character/Player";
import Map from "./Map";

export default class Level {

    map: Map;
    player:Player;

    constructor() {
        this.map = new Map();
        this.player = new Player();
    }

}