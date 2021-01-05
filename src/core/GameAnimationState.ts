export default class GameAnimationState{

    public isIntro : boolean; 
    public isTransition : boolean;
    public isRunning: boolean;
    public isDialog: boolean;

    constructor(){
        this.isIntro = true;
        this.isTransition = false;
        this.isRunning = false;
        this.isDialog = false;
    }

}