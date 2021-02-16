import Character from "../character/Character";
import CollisionBox from "./CollisionBox";

export default class CollisionDetector{

    public static checkCollision(boxA : CollisionBox , boxB : CollisionBox):boolean{

        if(boxA.x <= boxB.x + boxB.w && 
            boxA.x + boxA.w>= boxB.x && 
            boxA.y <= boxB.y + boxB.h &&
            boxA.y + boxA.h <= boxB.y 
            )return true;            

        return false;
    }

}