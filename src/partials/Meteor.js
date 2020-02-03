import { SVG_NS } from "../settings.js";
// import pingSound from '../../public/sounds/pong-01.wav'

export default class Meteor {
    constructor(r, boardWidth, boardHeight) {
        this.r = r;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.meteorArray = [];
        this.color = "pink";  //boardHeight and boardWidth must be a multiple of 32


        for (let i = 0; i <= 256; i += 32) {
            let b = i;
            for (let j = 0; j <= 512; j += 32) {
                this.meteorArray.push({ radius: 8, cx: -i, cy: -j });
            }
        }
        console.log(this.meteorArray)
    }
    render(svg) {


        //https://stackoverflow.com/questions/614126/why-is-array-push-sometimes-faster-than-arrayn-value link for speed test or array assign
        let meteorimages = [];

        for (let i = 0; i < 128; i++) {
            meteorimages.push(document.createElementNS(SVG_NS, "circle"));
            meteorimages[i].setAttributeNS(null, "r", 8);
            meteorimages[i].setAttributeNS(null, "cx", this.meteorArray[i].cx);
            meteorimages[i].setAttributeNS(null, "cy", this.meteorArray[i].cy);
            meteorimages[i].setAttributeNS(null, "fill", this.color);
        }

        // meteorimages[i] = document.createElementNS(SVG_NS, "circle");
        // meteorimages[i].setAttributesNS(null, "r", 8);
        // meteorimages[i].setAttributesNS(null, "cx", this.meteorArray[i][j].cx);
        // meteorimages[i].setAttributesNS(null, "cy", this.meteorArray[i][j].cy);
        // meteorimages[i].setAttributesNS(null, "fill", "pink");
        for (let i = 0; i < 128; i++) {
            this.meteorArray[i].cx += 5;
            // this.meteorArray[i][j].cy+= random Number;
        }

        svg.append(meteorimages);

    }

}



