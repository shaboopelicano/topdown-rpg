import Animation from '../animation/Animation';
import Level from '../level/Level';
import LevelLoader from '../level/LevelLoader';
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
    public levelLoader: LevelLoader;
    public currentGameStates: GameStates[];
    public isRunning: boolean = false;
    public currentLevel: Level | null = null;
    public currentAnimation: Animation | null = null;

    constructor() {
        this._assetsLoader = new AssetsLoader();
        this._renderer = new Renderer();
        this._eventsManager = new EventsManager(this);
        this.levelLoader = new LevelLoader(this);
        this.currentGameStates = [GameStates.INTRO];
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
                this.currentLevel = new Level(this.currentLevel?.player);
            }
        }
    }

    draw() {
        this.currentGameStates.forEach((state:GameStates)=>{
            switch (state) {
                case GameStates.INTRO:
                    this._renderer.drawIntro(); break;
                case GameStates.RUNNING:
                    this._renderer.draw(this,this.currentLevel as Level); break;
                case GameStates.ANIMATING:
                    this._renderer.drawAnimation(this); break;

            }
        })
    }

    run() {
        if (this.isRunning) {
            this.update();
            this.draw();
            requestAnimationFrame(this.run.bind(this));
        }
    }
}