import Animation from "../animation/Animation";
import { Directions } from "../utils/directions";
import Game, { GameStates } from "./Game";

export default class EventsManager {
    game: Game;
    constructor(game: Game) {
        this.game = game;
        this.initializeEvents();
    }

    /* TODO(tulio) */
    handleEvents(): never {
        throw new Error("Not Implemented");
    }

    initializeEvents() {
        window.onkeydown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'w': this.game.currentLevel?.player.setVelocity(Directions.UP); break;
                case 's': this.game.currentLevel?.player.setVelocity(Directions.DOWN); break;
                case 'a': this.game.currentLevel?.player.setVelocity(Directions.LEFT); break;
                case 'd': this.game.currentLevel?.player.setVelocity(Directions.RIGHT); break;
                case 'Control': this.game.currentLevel?.playerInteraction();
                case 'Enter': {
                    /* Mais fácil fazer um HashMap */
                    if (this.game.currentGameStates.find((state: GameStates) => state === GameStates.INTRO) === GameStates.INTRO) {
                        this.game.levelLoader.loadLevel();
                    }
                    break;
                }
                case 'Escape': {
                    // if (this.game.currentGameState === GameStates.RUNNING) {
                    //     this.game.currentGameState = GameStates.INTRO;
                    // }
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