import Tilemap from '../level/Tilemap';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../utils/constants';

export default class Map {

    width: number;
    height: number;
    levelTileWidth: number;
    levelTileHeight: number;
    matrix: number[][];
    objects: number[][];

    constructor() {
        this.width = 20;
        this.height = 10;
        this.levelTileWidth = Math.floor(WINDOW_WIDTH / this.width);
        this.levelTileHeight = Math.floor(WINDOW_HEIGHT / this.height);
        this.matrix = [];
        this.objects = [];
        this.initializeMap();
    }

    private initializeMap() {
        this.initializeBackground();
        this.initializeObjects();
    }

    /* TODO(tulio) - Passar tudo para uma operação só */
    private initializeBackground() {
        const tilemapLength = Object.keys(Tilemap).length - 2 ;
        for (let i = 0; i < this.height; i++) {
            this.matrix.push([]);
            for (let j = 0; j < this.width; j++) {
                this.matrix[i].push(Math.floor(Math.random() * tilemapLength));
            }
        }
    }

    private initializeObjects() {
        for (let i = 0; i < this.height; i++) {
            this.objects.push([]);
            for (let j = 0; j < this.width; j++) {
                if (Math.random() < .1)
                    this.objects[i].push(1);
                else
                    this.objects[i].push(0);
            }
        }
    }
}