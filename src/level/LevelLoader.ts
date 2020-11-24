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
        const animationTime = 1500;
        this._game.currentGameStates.push(GameStates.ANIMATING);
        this._game.currentAnimation = new Animation(this._game, animationTime);
        setTimeout(() => {
            this._game.currentGameStates = this._game.currentGameStates.filter((state: GameStates) => state !== GameStates.INTRO);
            this._game.currentGameStates.push(GameStates.RUNNING);
            
        }, animationTime / 2);
    }


}