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
}

export default Tilemap;