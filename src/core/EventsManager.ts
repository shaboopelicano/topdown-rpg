import Animation from "../animation/Animation";
import { Directions } from "../utils/directions";
import Game, { GameStates } from "./Game";
import MouseEvents from '../event/MouseEvents';
import Level from "../level/Level";

export default class EventsManager {
    game: Game;

    mouseEvent:MouseEvents;

    constructor(game: Game) {
        this.game = game;
        this.mouseEvent = new MouseEvents(game);
        this.initializeEvents();
        /* First mouse event */
        window.document.dispatchEvent(new Event("mousemove"));
    }

    /* TODO(tulio) */
    handleEvents(): never {
        throw new Error("Not Implemented");
    }

    initializeEvents() {
        this.mouseEvent.init();        
        window.onkeydown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'w': this.game.currentLevel?.player.setVelocity(Directions.UP); break;
                case 's': this.game.currentLevel?.player.setVelocity(Directions.DOWN); break;
                case 'a': this.game.currentLevel?.player.setVelocity(Directions.LEFT); break;
                case 'd': this.game.currentLevel?.player.setVelocity(Directions.RIGHT); break;
                case 'Control': this.game.currentLevel?.playerInteraction();break;
                case 'Enter': {
                    if (this.game.gameAnimationState.isIntro) {
                        this.game.isPaused = false;
                        this.game.gameAnimationState.isIntro = false;
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