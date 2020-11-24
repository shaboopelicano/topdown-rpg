import Game, { GameStates } from "../core/Game";
import { Colors } from "../utils/colors";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../utils/constants";
import AnimationState from "./AnimationState";

export default class Animation {

    duration: number;
    state: AnimationState;
    game: Game;

    constructor(game: Game, duration: number = 3000) {
        this.game = game;
        this.duration = duration;
        this.state = new AnimationState();
    }

    update() {
        this.state.elapsedTime = window.performance.now();
        const deltaTime = this.state.elapsedTime - this.state.startTime;
        if (deltaTime > this.duration)
            this.finish();
    }

    draw(ctx: CanvasRenderingContext2D) {
        // ctx.fillStyle = Colors.BLACK;
        // ctx.fillRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT)
        ctx.fillStyle = Colors.RED;
        const deltaTime = (this.state.elapsedTime - this.state.startTime)/this.duration;
        const x = Math.sin(Math.PI * deltaTime) * WINDOW_WIDTH;
        ctx.fillRect( 0 ,0,x,WINDOW_HEIGHT);
    }

    finish() {
        /* Linkar Animacoes */
        this.game.currentGameStates = this.game.currentGameStates.filter((state:GameStates)=>state === GameStates.RUNNING);
    }

}