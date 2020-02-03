import { SVG_NS } from "../settings.js";
import pingSound from '../../public/sounds/pong-01.wav'
import meteorSound from '../../public/sounds/meteor.wav'
import winSound from '../../public/sounds/win.wav'

export default class Ball {
  constructor(r, boardWidth, boardHeight, isGhostBall) {
    this.r = r; // or catch r, cx, cy,  and "this."" them
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.ping = new Audio(pingSound);
    this.gandalf = new Audio(meteorSound);
    this.win = new Audio(winSound);
    this.isGhostBall = isGhostBall;
    this.reset();
  }

  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;
    this.vy = 0;
    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5); //random generate number between -5 and 5
    }
    this.vx = this.direction * (6 - Math.abs(this.vy));

  }

  paddleCollision(player1, player2) {
    if (!this.isGhostBall) {
      if (this.vx > 0) {
        let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height);
        let [leftX, rightX, topY, bottomY] = paddle;
        // console.log(paddle)
        if (
          (this.x + this.r >= leftX)
          && (this.x + this.r <= rightX)
          && (this.y >= topY && this.y <= bottomY)
        ) {
          this.ping.play();
          this.vx = -this.vx;
        }
      }
      else {
        let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height);
        let [leftX, rightX, topY, bottomY] = paddle;
        if (
          (this.x - this.r <= rightX)
          && (this.x + this.r >= leftX)
          && (this.y >= topY && this.y <= bottomY)
        ) {
          this.ping.play();
          this.vx = -this.vx;
        }
      }
    }
    // console.log(player1);
    // console.log(player2);

  }
  wallCollision() {
    if (!this.isGhostBall) {
      const hitLeft = this.x - this.r <= 0;
      const hitRight = this.x + this.r >= this.boardWidth;
      const hitTop = this.y - this.r <= 0;
      const hitBottom = this.y + this.r >= this.boardHeight;

      if (hitLeft || hitRight) {
        this.vx = -this.vx;
      } else if (hitTop || hitBottom) {
        this.vy = -this.vy;
      }
    }
    //if ball hits left or right revers direction

    // else if ball hits top of bottom reverse vy
  }


  goal(playerWhoScored, otherPlayer) {
    playerWhoScored.score++;


    if (playerWhoScored.score >= 10) {
      this.win.play();
      alert(playerWhoScored.name + ' WINS!!! GAGNER!!!');
      playerWhoScored.score = 0;
      otherPlayer.score = 0;

    }
    this.reset();
  }


  render(svg, player1, player2) {
    // if (this.isGhostBall) {
    //   if player1.score > player2.score{
    //     this.direction = -5;
    //   }
    //   else if player2.score > player1.score{
    //     this.direction = 5;
    //   }

    //     this.gandalf.play();
    // }
    this.x += this.vx;
    this.y += this.vy;
    this.wallCollision();
    this.paddleCollision(player1, player2);
    let ball = document.createElementNS(SVG_NS, "circle");
    ball.setAttributeNS(null, "r", this.r);
    ball.setAttributeNS(null, "cx", this.x); //last parameter was this.boardWidth/2 (stationary at center)
    ball.setAttributeNS(null, "cy", this.y);
    ball.setAttributeNS(null, "fill", "pink");
    svg.appendChild(ball);

    const rightGoal = this.x + this.r >= this.boardWidth;
    const leftGoal = this.x - this.r <= 0;

    if (rightGoal && !this.isGhostBall) {
      this.goal(player1, player2);
      this.direction = 1;
    } else if (leftGoal && !this.isGhostBall) {
      this.goal(player2, player1);
      this.direction = -1;
    }

  }
}


