import { SVG_NS, KEYS } from "../settings.js";
import Board from "./Board.js"; //common practice to keep partials capitalized
import Paddle from "./Paddle.js";
import Ball from "./Ball.js";
import Score from "./Score.js";
import Meteor from "./Meteor.js"

export default class Game {
  constructor(element, width, height) {

    this.element = element;
    this.width = width;
    this.height = height;
    this.gameElement = document.getElementById(this.element);

    this.board = new Board(this.width, this.height);
    this.paddleWidth = 8;
    this.paddleHeight = 56;
    this.boardGap = 10;

    this.playerNames = [];
    for (let i = 0; i < 2; i++) {
      this.playerNames.push(prompt("Please enter your name", "Your name here"));
    }

    this.meteor = [];

    this.player1 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      (this.height - this.paddleHeight) / 2,
      KEYS.a,
      KEYS.z,
      this.playerNames[0]
    );

    this.player2 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.width - this.boardGap - this.paddleWidth,
      (this.height - this.paddleHeight) / 2,
      KEYS.up,
      KEYS.down,
      this.playerNames[1]
    );

    this.ballRadius = 8;

    for (let x = 0; x <= 30; x++) {
      this.meteor.push(new Ball(this.ballRadius, this.width, this.height, true));
    }


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

  render() {
    // More code goes here....
    // var element = document.createElementNS(namespaceURI, qualifiedName[, options]);

    //ends execution of  render if the test fails
    if (this.pause) {
      this.player1.speed = 0;
      this.player2.speed = 0;
      return;
    }

    this.gameElement.innerHTML = ""; //this clears the screen before redrawing
    let svg = document.createElementNS(SVG_NS, "svg"); ///createElementNS is specifically for SVGs
    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);
    this.gameElement.appendChild(svg);

    //more code
    this.board.render(svg);
    this.player1.render(svg);
    this.player2.render(svg);
    this.score1.render(svg, this.player1.score);
    this.score2.render(svg, this.player2.score);
    this.ball.render(svg, this.player1, this.player2);
    if ((this.player1.score - this.player2.score >= 1) || (this.player2.score - this.player1.score >= 1)) {


      this.meteor.forEach(ball => {
        ball.render(svg, this.player1, this.player2);
      })


    }
  }

}
