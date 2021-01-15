import Character from "../character/Character";
import Player from "../character/Player";
import Wizard from "../character/Wizard";
import { Directions } from "../utils/directions";
import Battle from "./Battle";
import Map from "./Map";

export default class Level {

    map: Map;
    player: Player;
    characters: Character[];
    battle:Battle;

    constructor(player?: Player) {

        this.map = new Map();
        this.player = player ? player : new Player(this.map);

        const w1 = new Wizard(this.map,this.map.levelTileWidth * 2, this.map.levelTileHeight * 4, "Hello my name is Wizard fer ");
        const w2 = new Wizard(this.map,this.map.levelTileWidth * 7, this.map.levelTileHeight * 9, "Ha toma no cu viado du carai!");

        w1.startMovingTo(
            5 * this.map.levelTileWidth,
            5 * this.map.levelTileHeight,
            this.map);

        w2.startMovingTo(
            1 * this.map.levelTileWidth,
            3 * this.map.levelTileHeight,
            this.map);
        

        this.characters = [
            w1,
            w2,
            this.player
        ];

        this.battle = new Battle(this.characters);

    }

    playerInteraction(): void {
        switch (this.player.lastDirection) {
            case Directions.DOWN: this.interact(this.player.x, (this.player.y + this.map.levelTileHeight) + this.map.levelTileHeight / 2); break;
            case Directions.UP: this.interact(this.player.x, this.player.y - this.map.levelTileHeight / 2); break;
            case Directions.LEFT: this.interact(this.player.x - this.map.levelTileWidth / 2, this.player.y); break;
            case Directions.RIGHT: this.interact((this.player.x + this.map.levelTileWidth) + this.map.levelTileWidth / 2, this.player.y); break;
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

    mouseInteraction(x: number, y: number) {

        /* Cálculo repetido */
        const matrixValueX = Math.floor(x / this.map.levelTileWidth);
        const matrixValueY = Math.floor(y / this.map.levelTileHeight);
        
        this.player.startMovingTo(
            matrixValueX * this.map.levelTileWidth,
            matrixValueY * this.map.levelTileHeight,
            this.map);
    }
}