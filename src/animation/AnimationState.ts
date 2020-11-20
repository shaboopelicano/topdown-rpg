export default class AnimationState {

    startTime : number = 0;
    elapsedTime : number = 0;

    constructor() {
        this.startTime = window.performance.now();
    }
}