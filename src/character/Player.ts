import Level from "../level/Level";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../utils/constants";
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
        const levelTileHeight = level.map.levelTileHeight;
        const cX = Math.floor((this.x + this.vX + levelTileWidth / 2) / levelTileWidth);
        const cY = Math.floor((this.y + this.vY + levelTileHeight / 2) / levelTileHeight);

        if (cY < 0 || cY > level.map.height - 1) return true;

        if (objMatrix[cY][cX] === 1) {
            return false;
        }
        return true;
    }

    checkBoundaries(level: Level): Directions {

        const levelTileWidth = level.map.levelTileWidth;
        const levelTileHeight = level.map.levelTileHeight;

        const cX = Math.floor((this.x + this.vX + levelTileWidth / 2) / levelTileWidth);
        const cY = Math.floor((this.y + this.vY + levelTileHeight / 2) / levelTileHeight);

        if (cX < 0) {
            this.x = WINDOW_WIDTH - levelTileWidth;
            this.y = level.player.y;
            return Directions.LEFT;
        }
        else if (cY < 0) {
            this.y = WINDOW_HEIGHT - levelTileWidth;
            return Directions.UP;
        }
        else if (cX > level.map.width) {
            this.x = 0;
            this.y = level.player.y;
            return Directions.RIGHT;
        }
        else if (cY > level.map.height) {
            this.y = 0;
            return Directions.DOWN;
        }
        return Directions.NONE;
    }

    move(): void {
        this.x += this.vX;
        this.y += this.vY;
    }

}