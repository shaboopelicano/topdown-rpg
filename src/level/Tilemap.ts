import Tile from "./Tile";

const Tilemap : any = {
    floor: new Tile(0, 0, 16, 16),
    grass1: new Tile(17, 0, 16, 16),
    grass2: new Tile(34, 0, 16, 16),
    grass3: new Tile(51, 0, 16, 16),
    grass4: new Tile(68, 0, 16, 16),
    grass5: new Tile(85, 0, 16, 16),
    grass6: new Tile(102, 0, 16, 16),        
    grass7: new Tile(119, 0, 16, 16),
    player:new Tile(425, 0, 16, 16),
    wizard:new Tile(408, 0, 16, 16),
    cursor:new Tile(595, 204, 16, 16),
    blackCursor : new Tile(612, 170, 16, 16),
    bruxo: new Tile(0,373,256,256),
    sword :new Tile(544,136,16,16),
    shield :new Tile(629,51,16,16),
    potion :new Tile(544,221,16,16),
    hourglass :new Tile(714,204,16,16),
    torch :new Tile(714,51,16,16), 
    andre :new Tile(254,374,256,256), 
    galvao :new Tile(509,373,167,253),
    frota :new Tile(0,629,278,341),
    supla :new Tile(273,629,258,331),
    theo :new Tile(530,628,258,286),

}

export default Tilemap;