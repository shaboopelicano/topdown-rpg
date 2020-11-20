import AssetsManager from "./AssetsManager";
import Tilemap from '../level/Tilemap';
import Level from "../level/Level";
import Tile from "../level/Tile";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../utils/constants";

export default class Renderer {

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    tileset: HTMLImageElement;

    constructor() {
        this.canvas = document.querySelector('canvas') as HTMLCanvasElement;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.tileset = AssetsManager.tileset as HTMLImageElement;
    }

    setTileset(tileset: HTMLImageElement) {
        this.tileset = tileset;
    }

    clear(): void {
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    drawIntro(){
        this.clear();
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.font = "72px Georgia";
        this.ctx.fillText("Big smile!", WINDOW_WIDTH/2, WINDOW_HEIGHT/2);
    }

    draw(level: Level): void {
        this.clear();
        this.drawBackground(level);
        this.drawObjects(level);
        this.drawCharacters();
        this.drawPlayer(level);

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
                    this.ctx.fillStyle = "#FFFFFF";
                    this.ctx.fillRect(level.map.levelTileWidth * j, level.map.levelTileHeight * i,
                        level.map.levelTileWidth, level.map.levelTileHeight);
                    this.ctx.fillStyle = "#000000";
                }
            });
        });
    }

    drawCharacters() {

    }

    drawPlayer(level: Level) {
        const tile: Tile = Tilemap[level.player.tilemapEntry];
        this.ctx.fillRect(level.player.x, level.player.y,
            level.map.levelTileWidth, level.map.levelTileHeight);

        this.ctx.drawImage(this.tileset, tile.x, tile.y, tile.w, tile.h,
            level.player.x, level.player.y,
            level.map.levelTileWidth, level.map.levelTileHeight);
    }
}