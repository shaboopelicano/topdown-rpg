export default class GameAnimationState{

    public isIntro : boolean; 
    public isTransition : boolean;
    public isRunning: boolean;
    public isDialog: boolean;
    public isCombatAnimation: boolean;

    constructor(){
        this.isIntro = false;
        this.isTransition = false;
        this.isRunning = true;
        this.isDialog = false;
        this.isCombatAnimation = false;
    }

}