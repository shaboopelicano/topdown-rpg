import Animation from '../animation/Animation';
import Character from '../character/Character';
import Player from '../character/Player';
import HUD from '../hud/HUD';
import HUDManager from '../hud/HUDManager';
import Level from '../level/Level';
import LevelLoader from '../level/LevelLoader';
import { Directions } from '../utils/directions';
import AssetsLoader from './AssetsLoader';
import AssetsManager from './AssetsManager';
import EventsManager from './EventsManager';
import GameAnimationState from './GameAnimationState';
import Renderer from './Renderer';

export enum GameStates { INTRO, PAUSED, RUNNING, ANIMATING };

export class GameManager {

    private static game: Game;

    public static init(game: Game): void {
        this.game = game;
    }

    public static getGameInstance(): Game {
        return this.game;
    }

}

export default class Game {

    private _assetsLoader: AssetsLoader;
    private _renderer: Renderer;
    private _eventsManager: EventsManager
    public hud: HUD;
    public levelLoader: LevelLoader;
    public currentGameStates: GameStates[];
    public isRunning: boolean = true;
    public isPaused: boolean = false; /* TODO(tulio) - tirar futuramente, por conta do carregamento duplo */
    public gameAnimationState: GameAnimationState;
    public currentLevel: Level | null = new Level();
    public currentAnimation: Animation | null = null;

    /* Mudar de lugar */
    public combatAnimations:any[] = [];

    constructor() {
        this._assetsLoader = new AssetsLoader();
        this._renderer = new Renderer();
        this._eventsManager = new EventsManager(this);
        this.hud = new HUD(this);
        this.levelLoader = new LevelLoader(this);
        this.currentGameStates = [GameStates.INTRO];
        this.gameAnimationState = new GameAnimationState();
        this.initializeGame();
    }

    initializeGame() {
        const tileset: HTMLImageElement = this._assetsLoader.loadAssets();
        tileset.onload = () => {
            AssetsManager.tileset = tileset;
            this._renderer.setTileset(tileset);
            this.isRunning = true;
            GameManager.init(this);
            requestAnimationFrame(this.run.bind(this));
        }

        HUDManager.setHUD(this.hud);
    }

    update() {
        /* TODO(tulio) - Melhorar */
        if (!this.isPaused) {
            if (this.gameAnimationState.isIntro) {

            }
            else {
                if (this.currentLevel?.player.checkCollision(this.currentLevel)) {
                    if (this.currentLevel?.player.checkBoundaries(this.currentLevel) === Directions.NONE) {
                        this.currentLevel?.player.move();
                    }
                    else {
                        this.levelLoader.loadLevel();
                        this.currentLevel = new Level(this.currentLevel?.player);
                    }
                }

                this.currentLevel?.update();
            }
        }
    }

    draw() {

        /* A ordem importa */
        if (this.gameAnimationState.isIntro) {
            this._renderer.drawIntro();
        }

        if (this.gameAnimationState.isRunning) {
            this._renderer.draw(this, this.currentLevel as Level);
        }

        /* if (this.gameAnimationState.isDialog) { */
        // this._renderer.drawHUD(this);
        /* } */

        if (this.gameAnimationState.isTransition) {
            this._renderer.drawAnimation(this);
        }

        if (this.gameAnimationState.isCombatAnimation) {
            this._renderer.drawCombatAnimation(this);
        }

    }

    run() {
        if (this.isRunning) {
            this.update();
            this.draw();
            requestAnimationFrame(this.run.bind(this));
        }
    }

    getRenderer() {
        return this._renderer;
    }
}