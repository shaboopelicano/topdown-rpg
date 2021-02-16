export default class Projectile{

    public startingX : number;
    public startingY : number;
    public endingX : number;
    public endingY : number;
    public x:number;
    public y:number;
    private vX : number;
    private vY : number; 
    private readonly _VEL = 10;


    constructor(startingX:number,endingX:number,startingY:number,endingY:number){
        this.startingX = startingX;
        this.startingY = startingY;
        this.endingX = endingX;
        this.endingY = endingY;
        this.x = this.startingX;
        this.y = this.startingY;
        this.vX = startingX < endingX ? 1 : -1 ;
        this.vY = startingY < endingY ? 1 : -1 ;
    }

    draw(ctx:CanvasRenderingContext2D){
        this.x = this.x + (this.vX * this._VEL) ;
        this.y = this.y + (this.vY * this._VEL) ;
        ctx.save();
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.x,this.y,10,10);
        ctx.restore();
    }
}