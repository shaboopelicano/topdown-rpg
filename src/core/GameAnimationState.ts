export default class GameAnimationState{

    public isIntro : boolean; 
    public isTransition : boolean;
    public isRunning: boolean;
    public isDialog: boolean;

    constructor(){
        this.isIntro = false;
        this.isTransition = false;
        this.isRunning = true;
        this.isDialog = false;
    }

}