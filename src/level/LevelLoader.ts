import Animation from "../animation/Animation";
import Game, { GameStates } from "../core/Game";
import Level from "./Level";

export default class LevelLoader {
    private _game: Game;
    public isLoading = false;
    public hasLoaded = true;
    constructor(game: Game) {
        this._game = game;
    }

    public loadLevel(newLevel?: Level) {

        const animationTime = 2000;
        this._game.currentAnimation = new Animation(this._game, animationTime);
        this._game.currentGameStates = this._game.currentGameStates.filter((state: GameStates) => state !== GameStates.INTRO);
        this._game.gameAnimationState.isTransition = true;
        this._game.gameAnimationState.isIntro = false;
        this._game.isPaused = true;
        this._game.currentGameStates.push(GameStates.ANIMATING);
        
        setTimeout(() => {
            this._game.gameAnimationState.isRunning = true;
        }, animationTime/2);
        setTimeout(() => {
            /* Tirando o intro dos estados */
            this._game.currentGameStates = this._game.currentGameStates.filter((state: GameStates) => state !== GameStates.INTRO);
            this._game.gameAnimationState.isTransition = false;
            this._game.isPaused = false;
        }, animationTime);
    }


}