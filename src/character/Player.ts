import Level from "../level/Level";
import { WINDOW_WIDTH } from "../utils/constants";
import { Directions } from "../utils/directions";
import Character from "./Character";

export default class Player extends Character {

    public static PLAYER_VELOCITY: number = 5;
    public currentDirection: Directions;

    constructor() {
        super();
        this.currentDirection = Directions.NONE;
        this.tilemapEntry = "player";
    }

    setVelocity(direction?: Directions): void {
        this.currentDirection = direction as Directions;
        switch (direction) {
            case Directions.UP: this.vY = -Player.PLAYER_VELOCITY; break
            case Directions.DOWN: this.vY = +Player.PLAYER_VELOCITY; break
            case Directions.LEFT: this.vX = -Player.PLAYER_VELOCITY; break
            case Directions.RIGHT: this.vX = +Player.PLAYER_VELOCITY; break
            case Directions.NONE: this.vX = 0; this.vY = 0; break
        }
    }

    checkCollision(level: Level) {
        const objMatrix = level.map.objects;
        const levelTileWidth = level.map.levelTileWidth;
        const cX = Math.floor((this.x + this.vX + level.map.levelTileWidth / 2) / levelTileWidth);
        const cY = Math.floor((this.y + this.vY + level.map.levelTileHeight / 2) / levelTileWidth);

        if (objMatrix[cY][cX] === 1) {
            return false;
        }
        return true;
    }

    checkBoundaries(level: Level): Directions {
        const levelTileWidth = level.map.levelTileWidth;
        const cX = Math.floor((this.x + this.vX + level.map.levelTileWidth / 2) / levelTileWidth);
        const cY = Math.floor((this.y + this.vY + level.map.levelTileHeight / 2) / levelTileWidth);
        if (cX < 0) {
            this.x = WINDOW_WIDTH - levelTileWidth;
            return Directions.LEFT;
        }
        else if (cY < 0) { console.log('Up'); return Directions.UP; }
        else if (cX > level.map.width) { console.log('RI'); return Directions.RIGHT; }
        else if (cY > level.map.height) { console.log('RI'); return Directions.DOWN; }
        return Directions.NONE;
    }

    move(): void {
        this.x += this.vX;
        this.y += this.vY;
    }

}