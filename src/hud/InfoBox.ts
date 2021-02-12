import Character from "../character/Character";
import Game from "../core/Game";
import Tilemap from "../level/Tilemap";
import { Colors } from "../utils/colors";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../utils/constants";
import Box from "./Box";

export default class InfoBox extends Box {

    private game: Game;
    public readonly _INFO_BOX_HEIGHT: number = WINDOW_HEIGHT;
    public readonly _INFO_BOX_WIDTH: number = 300;
    private readonly _INFO_BOX_BACKGROUND_COLOR: string = Colors.WHITE;
    private readonly _INFO_BOX_TEXT_COLOR: string = Colors.BLACK;
    private iconMapping : any = null;

    constructor(game: Game) {
        super();
        this.x = WINDOW_WIDTH - this._INFO_BOX_WIDTH;
        this.y = 0;
        this.w = this._INFO_BOX_WIDTH;
        this.h = this._INFO_BOX_HEIGHT
        this.isVisible = true;
        this.game = game;
        this.iconMapping = {
            attack: {
                icon: 'sword',
                callback: this.attack.bind(this)
            },
            defend: {
                icon: 'shield',
                callback: this.defend.bind(this)
            },
            item: {
                icon: 'potion',
                callback: this.defend.bind(this)
            },
            wait: {
                icon: 'hourglass',
                callback: this.defend.bind(this)
            },
            run: {
                icon: 'torch',
                callback: this.defend.bind(this)
            },
        };
    }

    attack() {
        console.log('attack');
    }

    defend() {
        console.log('defend');
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.clearRect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = this._INFO_BOX_BACKGROUND_COLOR;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = Colors.BLACK;
        ctx.fillRect(this.x + 10, this.y, 2, this.h);
        ctx.fillRect(this.x + 15, this.y, 2, this.h);
        ctx.fillRect(this.x + 20, this.y, 2, this.h);
        ctx.fillRect(WINDOW_WIDTH - 10, this.y, 2, this.h);
        ctx.fillRect(WINDOW_WIDTH - 15, this.y, 2, this.h);
        ctx.fillRect(WINDOW_WIDTH - 20, this.y, 2, this.h);
        this.drawText(ctx);
        this.drawIcons(ctx);
        this.drawPicture(ctx);
        ctx.restore();
    }

    drawText(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this._INFO_BOX_TEXT_COLOR;
        ctx.font = "16px Georgia";


        const battle = this.game.currentLevel?.battle;
        battle?.characterList.forEach((char: Character, index: number) => {
            const offsetLeft = 40;
            const offsetTop = 100;
            const lineSeparation = 35;
            ctx.fillText(
                char.isActive ? "-> " + char.getCharacterClass() : "" + char.getCharacterClass(),
                WINDOW_WIDTH - this._INFO_BOX_WIDTH + offsetLeft,
                offsetTop + lineSeparation * index);
        })
    }

    drawIcons(ctx: CanvasRenderingContext2D) {
        const tileSet: HTMLImageElement = this.game.getRenderer().tileset;
        const offsetX = 30;
        const iconWidth = 32;
        const iconHeight = 32;
        const iconMargin = 20;
        const iconNumber = 0;
        for(const item in this.iconMapping){
            const button = this.iconMapping[item];
            const tile = Tilemap[button.icon];
            const imageWidth = iconWidth;
            const imageHeight = iconHeight;
            const imagePosX = this.x + offsetX +  (iconNumber*(iconWidth + iconMargin));
            const imagePosY = 300;
            ctx.drawImage(tileSet, tile.x, tile.y, tile.w, tile.h,
                imagePosX, imagePosY,
                imageWidth, imageHeight
            );

            iconNumber++;
        }

    }

    drawPicture(ctx: CanvasRenderingContext2D) {

        const battle = this.game.currentLevel?.battle;
        const char = battle?.characterList.find((c:Character)=>c.isActive);

        const tileSet: HTMLImageElement = this.game.getRenderer().tileset;
        const tile = Tilemap[char?.picture];
        const imageWidth = 256;
        const imageHeight = 256;
        const imagePosX = this.x + (this.w) / 2 - imageWidth / 2 + 1;
        const imagePosY = (this.h) - imageHeight - 25;
        ctx.drawImage(tileSet, tile.x, tile.y, tile.w, tile.h,
            imagePosX, imagePosY,
            imageWidth, imageHeight
        );
    }

}

