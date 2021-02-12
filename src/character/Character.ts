import Map from "../level/Map";
import { Directions } from "../utils/directions";
import { CLASS_CHARACTER } from '../utils/classConstants';

export enum CharacterState { IDLE , START , MOVING , END_MOVE }

export default abstract class Character {

    public x: number;
    public y: number;
    public vX: number = 0;
    public vY: number = 0;
    public uuid: string;
    public isMoving: boolean;
    public isCurrentTurn : boolean = false;
    public isActive : boolean = false;
    public currentMovingTargetY: number = 0;
    public currentMovingTargetX: number = 0;
    public state :CharacterState = CharacterState.IDLE;
    public picture : string;
    protected readonly _MOVE_TOWARDS_SPEED: number = 5;
    protected currentPath: any[];
    protected currentMap: Map;
    protected class : string = CLASS_CHARACTER;

    /*     public w: number;
        public h: number; */
    public tilemapEntry: string = "floor";

    constructor(map: Map, x: number = 0, y: number = 0, isMoving = false /* , w: number = 0, h: number = 0 */) {
        this.x = x;
        this.y = y;
        this.uuid = this.generateUUID();
        this.isMoving = isMoving;
        this.currentPath = [];
        this.currentMap = map;

        const fotos = ['bruxo','andre','galvao','frota','supla','theo'];
        const index = Math.floor(Math.random()*(fotos.length));
        this.picture = fotos[index];

        /*         this.w = w;
                this.h = h; */
    }

    public generateUUID(): string {
        let sGuid = "";
        for (let i = 0; i < 32; i++) {
            sGuid += Math.floor(Math.random() * 0xF).toString(0xF);
        }
        return sGuid;
    }
    abstract setVelocity(direction?: Directions): void;

    public move(): void {
        if (this.isMoving) {
            this.moveTowards();
        }
    }

    protected moveTowards(/* x: number, y: number */): void {
        if (this.currentPath.length > 0) {
            this.state = CharacterState.MOVING;
            const target = this.currentPath[0];
            this.targetVelocity(target);

            const xPosition = Math.floor(this.x / this.currentMap.levelTileWidth);
            const yPosition = Math.floor(this.y / this.currentMap.levelTileHeight);

            this.y += this.vY;
            this.x += this.vX;

            this.vX = 0;
            this.vY = 0;

            if (xPosition === target[0] && yPosition === target[1]) {
                this.currentPath.shift();
            }
        }
        else {
            this.isMoving = false;
            this.state = CharacterState.END_MOVE;
        }
    }

    protected targetVelocity(target: any[]) {
        switch (target[2]) {/* é a direção */
            case Directions.UP: this.vY = -this._MOVE_TOWARDS_SPEED; break;
            case Directions.DOWN: this.vY = +this._MOVE_TOWARDS_SPEED; break;
            case Directions.LEFT: this.vX = -this._MOVE_TOWARDS_SPEED; break;
            case Directions.RIGHT: this.vX = +this._MOVE_TOWARDS_SPEED; break;
            case Directions.NONE: this.vX = 0; this.vY = 0; break;
        }
    }

    protected calculatePath(map: Map) {

        /* Limpando o caminho */
        this.currentPath = [];

        const targetCoords: [number, number] = [
            Math.floor(this.currentMovingTargetX / map.levelTileWidth),
            Math.floor(this.currentMovingTargetY / map.levelTileHeight)
        ];

        const playerCoords: [number, number] = [
            Math.floor(this.x / map.levelTileWidth),
            Math.floor(this.y / map.levelTileHeight)
        ];

        let currentTile: [number, number] = playerCoords;

        /* 
        Vai caminhando conforme a diferença entre os eixos 
        Vai diminuindo a diferença a partir dos maiores
        */
        do {
            const targetX = targetCoords[0];
            const targetY = targetCoords[1];
            const currentX = currentTile[0];
            const currentY = currentTile[1];
            const diffX = Math.abs(targetX - currentX);
            const diffY = Math.abs(targetY - currentY);
            let direction: Directions = Directions.NONE;

            if (diffX > diffY) {
                if (targetCoords[0] > currentTile[0]) {
                    currentTile = [currentTile[0] + 1, currentTile[1]];
                    direction = Directions.RIGHT;
                }
                else {
                    currentTile = [currentTile[0] - 1, currentTile[1]];
                    direction = Directions.LEFT;
                }
            }
            else {
                if (targetCoords[1] > currentTile[1]) {
                    currentTile = [currentTile[0], currentTile[1] + 1];
                    direction = Directions.DOWN;
                }
                else {
                    currentTile = [currentTile[0], currentTile[1] - 1];
                    direction = Directions.UP;
                }
            }

            this.currentPath.push([currentTile[0], currentTile[1], direction]);

        }
        while (currentTile[0] !== targetCoords[0] || currentTile[1] !== targetCoords[1])

    }

    public startMovingTo(x: number, y: number, map: Map) {
        this.state = CharacterState.MOVING;
        this.isMoving = true;
        this.currentMovingTargetX = x;
        this.currentMovingTargetY = y;
        this.calculatePath(map);
    }

    public getCharacterClass(){
        return this.class;
    }

    abstract interaction(): void;

}