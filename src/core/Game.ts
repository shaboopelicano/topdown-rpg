import Level from '../level/Level';
import { Directions } from '../utils/directions';
import AssetsLoader from './AssetsLoader';
import AssetsManager from './AssetsManager';
import EventsManager from './EventsManager';
import Renderer from './Renderer';

export enum GameStates { INTRO, PAUSED, RUNNING, ANIMATING };

export default class Game {

    private _assetsLoader: AssetsLoader;
    private _renderer: Renderer;
    private _eventsManager: EventsManager
    public currentGameState: GameStates;
    public isRunning: boolean = false;
    public currentLevel: Level | null = null;

    constructor() {
        this._assetsLoader = new AssetsLoader();
        this._renderer = new Renderer();
        this._eventsManager = new EventsManager(this);
        this.currentGameState = GameStates.INTRO;
        this.initializeGame();
    }

    initializeGame() {
        const tileset: HTMLImageElement = this._assetsLoader.loadAssets();
        tileset.onload = () => {
            AssetsManager.tileset = tileset;
            this._renderer.setTileset(tileset);
            this.isRunning = true;
            this.currentLevel = new Level();
            requestAnimationFrame(this.run.bind(this));
        }
    }

    update() {
        /* TODO(tulio) - Melhorar */
        if (this.currentLevel?.player.checkCollision(this.currentLevel)) {
            if (this.currentLevel?.player.checkBoundaries(this.currentLevel) === Directions.NONE)
                this.currentLevel?.player.move();
            else {
                this.currentLevel = new Level();
            }
        }
    }

    draw() {
        switch (this.currentGameState) {
            case GameStates.INTRO:
                this._renderer.drawIntro(); break;
            case GameStates.RUNNING:
                this._renderer.draw(this.currentLevel as Level); break;
        }
    }

    run() {
        if (this.isRunning) {
            this.update();
            this.draw();
            requestAnimationFrame(this.run.bind(this));
        }
    }
}