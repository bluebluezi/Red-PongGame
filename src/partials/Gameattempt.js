import { SVG_NS, KEYS } from "../settings.js";
import Board from "./Board.js"; //common practice to keep partials capitalized
import Paddle from "./Paddle.js";
import Ball from "./Ball.js";
import Score from "./Score.js";
// import Meteor from "./Meteor.js"




export default class Game {

    constructor(element, width, height) {
        this.element = element;
        this.width = width;
        this.height = height;
        // Other code goes here...
        this.gameElement = document.getElementById(this.element);
        this.delayWorker = new Worker('./Counter.js');
        console.log("created worker")
        this.playcount = 0;
        this.game



        this.board = new Board(this.width, this.height);

        this.paddleWidth = 8;
        this.paddleHeight = 56;
        this.boardGap = 10;
        this.player1 = new Paddle(
            this.height,
            this.paddleWidth,
            this.paddleHeight,
            this.boardGap,
            (this.height - this.paddleHeight) / 2,
            KEYS.a,
            KEYS.z
        );

        this.player2 = new Paddle(
            this.height,
            this.paddleWidth,
            this.paddleHeight,
            this.width - this.boardGap - this.paddleWidth,
            (this.height - this.paddleHeight) / 2,
            KEYS.up,
            KEYS.down
        );

        // this.meteor = new Meteor(this.ballRadius, this.width, this.height);
        this.ballRadius = 8;

        this.meteor = [];

        for (let x = 0; x <= 10; x++) {
            this.meteor.push(new Ball(this.ballRadius, this.width, this.height, true));
        }
        console.log(this.meteor)

        // console log objects so you can see which properties can be enhanced
        this.ball = new Ball(this.ballRadius, this.width, this.height, false);

        document.addEventListener("keydown", event => {
            console.log(event.key);
            switch (event.key) {
                case KEYS.spaceBar: //we need KEYS. to prepend the spaceBar because in paddle, the up and down is passed down to be constructed
                    this.pause = !this.pause;
                    this.player1.speed = 10;
                    this.player2.speed = 10;
                    break;
            }
        });

        this.score1 = new Score(this.width / 2 - 50, 30, 30);
        this.score2 = new Score(this.width / 2 + 25, 30, 30);
    }
    // get meteorGetter() {
    //   return this.meteor;
    // }

    render() {
        //deepclone Array  assigning to meteorArray( so there is no reliance on ball.reset())
        let meteorArray = Object.assign(this.meteor);
        // let meteorArray = JSON.parse(JSON.stringify(this.meteor);
        console.log(meteorArray);
        // let meteorArray = this.meteorGetter;
        if (this.pause) {
            this.player1.speed = 0;
            this.player2.speed = 0;
            return;
        }
        // console.log(meteorArray);
        this.gameElement.innerHTML = ""; //this clears the screen before redrawing
        let svg = document.createElementNS(SVG_NS, "svg"); ///createElementNS is specifically for SVGs
        svg.setAttributeNS(null, "width", this.width);
        svg.setAttributeNS(null, "height", this.height);
        this.gameElement.appendChild(svg);

        this.board.render(svg);
        this.player1.render(svg);
        this.player2.render(svg);
        this.ball.render(svg, this.player1, this.player2);
        this.score1.render(svg, this.player1.score);
        this.score2.render(svg, this.player2.score);

        // let delayWorker = new Worker('./Counter.js')
        // let counterMessage = '';
        if ((this.player1.score - this.player2.score >= 1)
            || (this.player2.score - this.player1.score >= 1)) {

            // if (this.player1.score - this.player2.score >= 1)
            //   meteorArray.forEach(ball => {
            //     ball.render(svg, this.player1, this.player2);
            //   })

            meteorArray.forEach(ball => {
                ball.render(svg, this.player1, this.player2);
            })


            // this.delayWorker.postMessage({ 'cmd': 'GO', 'delay': 3 })
            // this.delayWorker.addEventListener('message', function (e) {
            //use webworker to count intervals in the background,
            //it waits for the resetmeteor message, then resets meteor
            //is the intervals at which meteors spawn
            // console.log("message received from worker")
            // if (e.data === 'resetmeteor') {
            //   console.log("executing reset")
            //   meteorArray.forEach(ball => {
            //     ball.reset();
            //   })
            //now meteorArray shall reset at the beginning of render by deep cloning the
            //original

            // });


            // this.delayWorker.onmessage(e => )


            console.log("end of if, dun worry im not stuck");





        }



    }

}

