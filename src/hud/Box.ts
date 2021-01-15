export default abstract class Box{
    public x: number = 0;
    public y: number = 0;
    public w: number = 0;
    public h: number = 0;
    public isVisible : boolean;
    public isAnimating : boolean;
    constructor(){
        this.isVisible = false
        this.isAnimating = false
    }

    abstract draw(ctx:CanvasRenderingContext2D):void;

}