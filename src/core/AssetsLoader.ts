import { ASSETS_PATH } from "../utils/constants";

export default class AssetsLoader {
    constructor() { }
    
    loadAssets(): HTMLImageElement {
        const img: HTMLImageElement = new Image();
        img.src = `${ASSETS_PATH}/monochrome1.png`;
        return img;
    }
}