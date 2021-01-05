import Level from "../level/Level";
import { SHRINK_FACTOR, WINDOW_HEIGHT, WINDOW_WIDTH } from "../utils/constants";
import { Directions } from "../utils/directions";
import Character from "./Character";

export default class Player extends Character {
    
    public static PLAYER_VELOCITY: number = 5;
    public currentDirection: Directions;
    public lastDirection: Directions;
    
    constructor() {
        super();
        this.currentDirection = Directions.NONE;
        this.lastDirection = Directions.DOWN;
        this.tilemapEntry = "player";
        this.x = 700;
        this.y = 1400;
    }
    
    setVelocity(direction?: Directions): void {
        this.currentDirection = direction as Directions;
        if (direction !== Directions.NONE) {
            this.lastDirection = direction as Directions;
        }
        
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

        const playerWidth = levelTileWidth / SHRINK_FACTOR;
        const playerHeight = levelTileHeight / SHRINK_FACTOR;
        
        const cXE = Math.floor((this.x + this.vX) / levelTileWidth);
        const cXD = Math.floor((this.x + this.vX + playerWidth) / levelTileWidth);
        
        const cYC = Math.floor((this.y + this.vY) / levelTileHeight);
        const cYB = Math.floor((this.y + this.vY + playerHeight) / levelTileHeight);
        
        if (cYC < 0 || cYC > level.map.height - 1) return true;
        
        if (objMatrix[cYC][cXE] === 1) {
            return false;
        }
        else if (objMatrix[cYC][cXD] === 1) {
            return false;
        }
        else if (objMatrix[cYB][cXE] === 1) {
            return false;
        }
        else if (objMatrix[cYB][cXD] === 1) {
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
    
    interaction(): void {
        throw new Error("Method not implemented.");
    }
}