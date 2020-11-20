import Animation from "../animation/Animation";
import { Directions } from "../utils/directions";
import Game, { GameStates } from "./Game";

export default class EventsManager {
    game: Game;
    constructor(game: Game) {
        this.game = game;
        this.initializeEvents();
    }

    initializeEvents() {
        window.onkeydown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'w': this.game.currentLevel?.player.setVelocity(Directions.UP); break;
                case 's': this.game.currentLevel?.player.setVelocity(Directions.DOWN); break;
                case 'a': this.game.currentLevel?.player.setVelocity(Directions.LEFT); break;
                case 'd': this.game.currentLevel?.player.setVelocity(Directions.RIGHT); break;
                case 'Enter': {
                    if (this.game.currentGameState === GameStates.INTRO){
                        this.game.currentAnimation= new Animation(this.game,1500);
                        this.game.currentGameState = GameStates.ANIMATING;
                    }
                    break;
                }
                case 'Escape': {
                    if (this.game.currentGameState === GameStates.RUNNING){
                        this.game.currentGameState = GameStates.INTRO;
                    }
                    break;
                }
            }
        }

        window.onkeyup = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'w':
                case 's':
                case 'a':
                case 'd': this.game.currentLevel?.player.setVelocity(Directions.NONE); break;
            }
        }
    }

}