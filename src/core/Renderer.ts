import AssetsManager from "./AssetsManager";
import Tilemap from '../level/Tilemap';
import Level from "../level/Level";
import Tile from "../level/Tile";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../utils/constants";
import Game, { GameStates } from "./Game";
import Animation from "../animation/Animation";
import { Colors } from "../utils/colors";
import Character from "../character/Character";

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

    drawIntro() {
        this.clear();
        this.ctx.fillStyle = Colors.WHITE;
        this.ctx.font = "72px Georgia";
        this.ctx.fillText("Big smile!", WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);
    }

    drawAnimation(game: Game) {
        const animation: Animation = game.currentAnimation!;
        animation.update();
        animation.draw(this.ctx);
    }

    drawHUD(game: Game) {
        const hud = game.hud;
        this.ctx.fillStyle = Colors.BLACK;
        // this.ctx.globalAlpha = 0.7;
        this.ctx.fillRect(hud.x, hud.y, hud.w, hud.h);

        if (hud.y < 0) hud.y += 3;

        this.ctx.font = "14px Georgia";
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = Colors.WHITE;
        this.ctx.fillText("TesteasdsadsdadaTesteasdsadsdada TesteasdsadsdadaTesteasdsadsdada TesteasdsadsdadaTesteasdsadsdada", 100, hud.y + 20);
        this.ctx.fillText("TesteasdsadsdadaTesteasdsadsdada TesteasdsadsdadaTesteasdsadsdada TesteasdsadsdadaTesteasdsadsdada", 100, hud.y + 40);
        this.ctx.fillText("TesteasdsadsdadaTesteasdsadsdada TesteasdsadsdadaTesteasdsadsdada TesteasdsadsdadaTesteasdsadsdada", 100, hud.y + 60);
        this.ctx.fillText("TesteasdsadsdadaTesteasdsadsdada TesteasdsadsdadaTesteasdsadsdada TesteasdsadsdadaTesteasdsadsdada", 100, hud.y + 80);

        this.ctx.fillStyle = Colors.BLACK;
        this.ctx.fillRect(hud.xLine1Reveal, hud.y + 7, hud.w, hud.y + 14);
        this.ctx.fillRect(hud.xLine2Reveal, hud.y + 28, hud.w, hud.y + 14);
        this.ctx.fillRect(hud.xLine3Reveal, hud.y + 48, hud.w, hud.y + 14);
        this.ctx.fillRect(hud.xLine4Reveal, hud.y + 68, hud.w, hud.y + 14);

        const VELOCIDADE_TEXTO = 12;

        if (hud.currentLine === 1) {
            hud.xLine1Reveal += VELOCIDADE_TEXTO;
            if (hud.xLine1Reveal >= hud.w) hud.currentLine++;
        }
        else if (hud.currentLine === 2) {
            hud.xLine2Reveal += VELOCIDADE_TEXTO;
            if (hud.xLine2Reveal >= hud.w) hud.currentLine++;
        }
        else if (hud.currentLine === 3) {
            hud.xLine3Reveal += VELOCIDADE_TEXTO;
            if (hud.xLine3Reveal >= hud.w) hud.currentLine++;
        }
        else if (hud.currentLine === 4) {
            hud.xLine4Reveal += VELOCIDADE_TEXTO;
            if (hud.xLine4Reveal >= hud.w) hud.currentLine++;
        }
    }

    draw(game: Game, level: Level): void {
        this.clear();
        this.drawBackground(level);
        this.drawObjects(level);
        this.drawCharacters(level);
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
        const tile: Tile = Tilemap[level.player.tilemapEntry];
        this.ctx.fillRect(level.player.x, level.player.y,
            level.map.levelTileWidth, level.map.levelTileHeight);

        this.ctx.drawImage(this.tileset, tile.x, tile.y, tile.w, tile.h,
            level.player.x, level.player.y,
            level.map.levelTileWidth, level.map.levelTileHeight);
    }
}