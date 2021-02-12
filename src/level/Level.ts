import Character, { CharacterState } from "../character/Character";
import Player from "../character/Player";
import Wizard from "../character/Wizard";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../utils/constants";
import { Directions } from "../utils/directions";
import Battle from "./Battle";
import Map from "./Map";

export enum LevelState { NPC_TURN, PLAYER_TURN }

export default class Level {

    map: Map;
    player: Player;
    characters: Character[];
    battle: Battle;
    turnQueue: any[];
    levelState: LevelState;
    currentCharacterTurn: number;

    constructor(player?: Player) {

        this.map = new Map();
        this.player = player ? player : new Player(this.map);
        this.levelState = LevelState.NPC_TURN;

        
        const w1 = new Wizard(this.map, this.map.levelTileWidth * 2, this.map.levelTileHeight * 4, "Hello my name is Wizard fer ");
        const w2 = new Wizard(this.map, this.map.levelTileWidth * 7, this.map.levelTileHeight * 9, "Ha toma no cu viado du carai!");
        
        this.characters = [
            w1,
            w2,
            this.player
        ];
        
        this.turnQueue = this.calculateFirstTurn();
        this.currentCharacterTurn = this.turnQueue.shift();


        this.battle = new Battle(this.characters);

    }

    update() {

        const currentCharacter = this.characters[this.currentCharacterTurn];

        this.characters.forEach((c)=>c.isActive = false);
        currentCharacter.isActive = true;

        if (this.levelState === LevelState.NPC_TURN) {
            
            if (currentCharacter.state === CharacterState.MOVING) {
                currentCharacter.move();
            }
            else if (currentCharacter.state === CharacterState.END_MOVE) {
                this.currentCharacterTurn = this.turnQueue.shift();
                const nextCharacter = this.characters[this.currentCharacterTurn];

                if (nextCharacter instanceof Player) {
                    this.levelState = LevelState.PLAYER_TURN;
                }
                else {
                    this.levelState = LevelState.NPC_TURN;
                }
            }
            else {

                const matrixValueX = Math.floor((Math.random()* (this.player.x) / this.map.levelTileWidth));
                const matrixValueY = Math.floor((Math.random()* (this.player.y) / this.map.levelTileHeight));

                currentCharacter.startMovingTo(
                    matrixValueX * this.map.levelTileWidth,
                    matrixValueY * this.map.levelTileHeight,
                    this.map);
            }
        }
        else {
            if (currentCharacter.state === CharacterState.MOVING) {
                currentCharacter.move();
            }
            else if (currentCharacter.state === CharacterState.END_MOVE) {
                this.turnQueue = this.calculateFirstTurn();
                this.currentCharacterTurn = this.turnQueue.shift();
                this.levelState = LevelState.NPC_TURN;
            }
        }
    }

    calculateFirstTurn(): number[] {
        this.characters.forEach((char:Character)=>char.state=CharacterState.IDLE);
        return [0, 1, 2];
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