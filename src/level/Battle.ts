import Character from "../character/Character";

export default class Battle {

    public characterList: Character[];
    public currentCharacter: Character;
    public nextCharacter: Character;
    public turnCount: number;

    constructor(characterList: Character[]) {
        this.characterList = characterList;
        this.currentCharacter = characterList[0];
        this.nextCharacter = characterList[1];
        this.turnCount = 0;
    }

    updateBattle(){

    }

}