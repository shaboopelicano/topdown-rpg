import AssetsManager from "./AssetsManager";
import Tilemap from '../level/Tilemap';
import Level from "../level/Level";
import Tile from "../level/Tile";
import { WINDOW_HEIGHT, WINDOW_WIDTH, SHRINK_FACTOR } from "../utils/constants";
import Game, { GameStates } from "./Game";
import Animation from "../animation/Animation";
import { Colors } from "../utils/colors";
import Character from "../character/Character";
import EventsManager from "./EventsManager";
import MouseEvents from "../event/MouseEvents";
import HUDManager from "../hud/HUDManager";
import { CursorState } from "../hud/Cursor";
export default class Renderer {

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    tileset: HTMLImageElement;

    introAlpha: number = 0.0;

    static readonly CLEAR_COLOR = "#000000"

    constructor() {
        this.canvas = document.querySelector('canvas') as HTMLCanvasElement;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.cursor = 'none';
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.ctx.imageSmoothingEnabled = false;
        this.tileset = AssetsManager.tileset as HTMLImageElement;
    }


    setTileset(tileset: HTMLImageElement) {
        this.tileset = tileset;
    }

    clear(): void {
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    clearAux() {

    }

    drawIntro() {
        this.clear();
        this.ctx.fillStyle = Colors.WHITE;
        this.ctx.save();

        // if(this.introAlpha < 1.0)
        this.introAlpha += .1;

        this.ctx.globalAlpha = (this.introAlpha);

        this.ctx.font = "72px Georgia";
        this.ctx.fillText("Big smile!", WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);
    }

    drawAnimation(game: Game) {
        const animation: Animation = game.currentAnimation!;
        animation.update();
        animation.draw(this.ctx);
    }

    drawHUD(game: Game) {
        game.hud.draw(this.ctx);
    }

    draw(game: Game, level: Level): void {
        this.clear();
        this.drawBackground(level);
        this.drawObjects(level);
        this.drawCharacters(level);
        this.drawPlayer(level);
        this.drawHUD(game);
        this.drawCursor(level);

    }

    drawBackground(level: Level) {
        const keyNames = Object.keys(Tilemap);
        level.map.matrix.forEach((r, i) => {
            r.forEach((c, j) => {
                const prop: string = keyNames[c];
                const tile: Tile = Tilemap[prop];
                this.ctx.drawImage(this.tileset, tile.x, tile.y, tile.w, tile.h,
                    level.map.levelTileWidth * j, level.map.levelTileHeight * i,
                    level.map.levelTileWidth, level.map.levelTileHeight);
            });
        })


    }

    drawObjects(level: Level) {
        level.map.objects.forEach((r, i) => {
            r.forEach((c, j) => {
                if (c === 1) {
                    this.ctx.fillStyle = Colors.WHITE;
                    this.ctx.fillRect(level.map.levelTileWidth * j, level.map.levelTileHeight * i,
                        level.map.levelTileWidth, level.map.levelTileHeight);
                    this.ctx.fillStyle = Colors.BLACK;
                }
            });
        });
    }

    drawCharacters(level: Level) {

        level.characters.forEach((char: Character) => {
            const tile: Tile = Tilemap[char.tilemapEntry];
            this.ctx.fillRect(char.x, char.y,
                level.map.levelTileWidth, level.map.levelTileHeight);

            this.ctx.drawImage(this.tileset, tile.x, tile.y, tile.w, tile.h,
                char.x, char.y,
                level.map.levelTileWidth, level.map.levelTileHeight);
        });
    }

    drawPlayer(level: Level) {
        const shrinkFactor = 1.5;
        const tile: Tile = Tilemap[level.player.tilemapEntry];
        this.ctx.fillRect(level.player.x, level.player.y,
            level.map.levelTileWidth / SHRINK_FACTOR, level.map.levelTileHeight / SHRINK_FACTOR);

        this.ctx.drawImage(this.tileset, tile.x, tile.y, tile.w, tile.h,
            level.player.x, level.player.y,
            level.map.levelTileWidth / SHRINK_FACTOR, level.map.levelTileHeight / SHRINK_FACTOR);
    }

    drawCursor(level: Level) {

        const cursor = HUDManager.getHUDInstance().cursor;
        const tile: Tile = Tilemap[cursor.getCursorSprite()];

        let [x, y] = MouseEvents.getMouseCoordinates();
        
        if (cursor.state === CursorState.TARGET) {
            x = Math.floor(x / level.map.levelTileWidth) * level.map.levelTileWidth;
            y = Math.floor(y / level.map.levelTileHeight) * level.map.levelTileHeight;
        }

        this.ctx.drawImage(this.tileset, tile.x, tile.y, tile.w, tile.h,
            x, y,
            level.map.levelTileWidth, level.map.levelTileHeight);
    }
}