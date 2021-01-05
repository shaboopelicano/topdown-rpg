import Character from "../character/Character";
import Player from "../character/Player";
import Wizard from "../character/Wizard";
import { Directions } from "../utils/directions";
import Map from "./Map";

export default class Level {

    map: Map;
    player: Player;
    characters: Character[];

    constructor(player?: Player) {
        this.map = new Map();
        this.player = player ? player : new Player();
        
        this.characters = [
            new Wizard(200, 200,"Hello my name is Wizard fer "),
            new Wizard(400, 400, "Ha toma no cu viado du carai!"),
        ];
    }

    playerInteraction(): void {
        switch (this.player.lastDirection) {
            case Directions.DOWN: this.interact(this.player.x, this.player.y + this.map.levelTileHeight / 2); break;
            case Directions.UP: this.interact(this.player.x, this.player.y - this.map.levelTileHeight / 2); break;
            case Directions.LEFT: this.interact(this.player.x - this.map.levelTileWidth / 2, this.player.y); break;
            case Directions.RIGHT: this.interact(this.player.x + this.map.levelTileWidth / 2, this.player.y); break;
        }

    }

    interact(x: number, y: number) {
        this.characters.forEach((char: Character) => {
            if (x >= char.x && x < char.x + this.map.levelTileWidth) {
                if (y >= char.y && y < char.y + this.map.levelTileHeight) {
                    char.interaction();
                }
            }
        })
    }
}