import { Colors } from "../utils/colors";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../utils/constants";

export default class DialogBox{

    public currentLine:number;
    public x: number;
    public y: number;
    public w: number;
    public h: number;
    public xLine1Reveal : number = 0;
    public xLine2Reveal : number = 0;
    public xLine3Reveal : number = 0;
    public xLine4Reveal : number = 0;
    public isVisible : boolean = false;
    public isAnimating : boolean = false;
    public isFadingIn : boolean = false;
    private _textSource = "";
    private _animationStart = 0;
    private _animationTime = 7000;
    private _textLine1 :string = "";
    private _textLine2 :string = "";
    private _textLine3 :string = "";
    private _textLine4 :string = "";

    private readonly _DIALOG_BOX_HEIGHT = 100;
    private readonly _LINE_SEPARATOR = '/n';
    private readonly _FONT = '14px Georgia';
    private readonly _TEXT_HOR_OFFSET = 100;
    private readonly _TEXT_VERT_OFFSET = 25;
    private readonly _TEXT_LINE_SEPARATION = 20;
    private readonly _DIALOGBOX_TIMEOUT = 7000;
    private readonly _TEXT_SPEED = 12;
    
    constructor(){
        this.x = 0;
        this.y = -this._DIALOG_BOX_HEIGHT;
        this.w = WINDOW_WIDTH;
        this.h = this._DIALOG_BOX_HEIGHT;
        this.currentLine = 1;
    }

    animate(){
        const animationSpeed = 10;
        const ellapsedTime = window.performance.now() - this._animationStart;

        if(ellapsedTime < this._animationTime / 2 ){
            if(this.y < -10)
                this.y += animationSpeed
        }
        else{
            this.y -= animationSpeed
        }

    }

    draw(ctx:CanvasRenderingContext2D){

        if(this.isAnimating){
            this.animate();
        }

        ctx.save();
        ctx.fillStyle = Colors.BLACK;
        ctx.globalAlpha = 0.7;
        ctx.fillRect(this.x, this.y, this.w, this.h);

        if (this.y < 0) this.y += 3;
        
        ctx.font = this._FONT;
        ctx.globalAlpha = 1;
        ctx.fillStyle = Colors.WHITE;

        this.drawLines(ctx);
        this.drawLineRevelation(ctx);

        ctx.restore();
    }

    setTextSource(text:string){
        this._textSource = text;
        const [l1,l2,l3,l4] = this._textSource.split(this._LINE_SEPARATOR);
        this._textLine1 = l1 ? l1 : "";       
        this._textLine2 = l2 ? l2 : "";       
        this._textLine3 = l3 ? l3 : "";       
        this._textLine4 = l4 ? l4 : "";       
        if(!this.isVisible){
            this.revealDialogBox();
        }
    }

    revealDialogBox(){
        this.isVisible = true;
        this.isAnimating = true;
        this._animationStart = window.performance.now();
        setTimeout(()=>{
            this.reset();
        },this._DIALOGBOX_TIMEOUT);
    }

    drawLines(ctx:CanvasRenderingContext2D){
        ctx.fillText(this._textLine1, this.x + this._TEXT_HOR_OFFSET,this.y + this._TEXT_VERT_OFFSET + this._TEXT_LINE_SEPARATION * 0);       
        ctx.fillText(this._textLine2, this.x + this._TEXT_HOR_OFFSET,this.y + this._TEXT_VERT_OFFSET + this._TEXT_LINE_SEPARATION * 1);       
        ctx.fillText(this._textLine3, this.x + this._TEXT_HOR_OFFSET,this.y + this._TEXT_VERT_OFFSET + this._TEXT_LINE_SEPARATION * 2);       
        ctx.fillText(this._textLine4, this.x + this._TEXT_HOR_OFFSET,this.y + this._TEXT_VERT_OFFSET + this._TEXT_LINE_SEPARATION * 3);       
    }

    drawLineRevelation(ctx:CanvasRenderingContext2D){
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = Colors.BLACK;
        ctx.fillRect(this.xLine1Reveal, this.y + 7, this.w, this.y + 14);
        ctx.fillRect(this.xLine2Reveal, this.y + 28, this.w, this.y + 14);
        ctx.fillRect(this.xLine3Reveal, this.y + 48, this.w, this.y + 14);
        ctx.fillRect(this.xLine4Reveal, this.y + 68, this.w, this.y + 14);

        if (this.currentLine === 1) {
            this.xLine1Reveal += this._TEXT_SPEED;
            if (this.xLine1Reveal >= this.w) this.currentLine++;
        }
        else if (this.currentLine === 2) {
            this.xLine2Reveal += this._TEXT_SPEED;
            if (this.xLine2Reveal >= this.w) this.currentLine++;
        }
        else if (this.currentLine === 3) {
            this.xLine3Reveal += this._TEXT_SPEED;
            if (this.xLine3Reveal >= this.w) this.currentLine++;
        }
        else if (this.currentLine === 4) {
            this.xLine4Reveal += this._TEXT_SPEED;
            if (this.xLine4Reveal >= this.w) this.currentLine++;
        }

        ctx.globalAlpha = 1;
    }

    reset(){
        this._textLine1 = "";
        this._textLine2 = "";
        this._textLine3 = "";
        this._textLine4 = "";
        this.xLine1Reveal = 0;
        this.xLine2Reveal = 0;
        this.xLine3Reveal = 0;
        this.xLine4Reveal = 0;
        this.isVisible = false;
        this.isAnimating = false;
        this._animationStart = 0;
        this.currentLine = 1;
    }
    
}