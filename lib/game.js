const Display = require("./display");
const Board = require("./board");
const StaticPieces = require("./pieces/static_pieces");
const LinePiece = require("./pieces/line_piece");
const LeftLPiece = require("./pieces/left_l_piece");
const RightLPiece = require("./pieces/right_l_piece");
const LeftZPiece = require("./pieces/left_z_piece");
const RightZPiece = require("./pieces/right_z_piece");
const TPiece = require("./pieces/t_piece");

class Game {
  constructor() {
    this.board = new Board ();
    this.stage = new createjs.Stage("canvas");
    this.display = new Display (this.board, this.stage);
    this.pause = false;
    this.keyPressCallBack = (e) => { this.keyPressCheck(e); };
    this.continueGame = true;
  }

  pageLoadActions() {
    this.renderBoard();
    const startButton = document.getElementById("start-button");
    const pauseButton = document.getElementById("pause-button");
    startButton.addEventListener("click", (e) => this.startGame());
    pauseButton.addEventListener("click", e => this.pauseGame());
  }

  startGame() {
    this.continueGame = true;
    this.UserKeyboardInteraction();
    this.newCurrentPiece();
    this.placePiece();
    this.renderPiece();
    this.setAutoDrop();
  }

  pauseGame() {
    if (this.pause) {
      this.setAutoDrop();
      this.pause = false;
      this.UserKeyboardInteraction();
    } else {
      this.pause = true;
      document.removeEventListener("keydown", this.keyPressCallBack);
      clearInterval(this.autoDropId);
    }
  }

  UserKeyboardInteraction() {
    document.addEventListener("keydown", this.keyPressCallBack);
  }

  keyPressCheck(e) {
    switch(e.keyCode) {
      case(37): {
        if (this.board.validLeftMove(this.currentPiece.currentPositions)) {
          this.removePiece();
          this.currentPiece.moveLeft();
        }
        break;
      }
      case(38): {
        if (this.board.validRotation(this.currentPiece)) {
          this.removePiece();
          this.currentPiece.rotatePiece();
        }
        break;
      }
      case(39): {
        if (this.board.validRightMove(this.currentPiece.currentPositions)) {
          this.removePiece();
          this.currentPiece.moveRight();
        }
        break;
      }
      case(40): {
        if (this.continueGame) {
          clearInterval(this.autoDropId);
          this.downLogic();
          this.setAutoDrop();
        }
          return;
      }
    }
    this.placePiece();
    this.renderPiece();
  }

  generateRandomNumber() {
    return Math.floor(Math.random() * 6);
  }

  getPiece() {
    const pieces = {
      0: new StaticPieces(),
      1: new LinePiece(),
      2: new LeftLPiece(),
      3: new RightLPiece(),
      4: new LeftZPiece(),
      5: new RightZPiece(),
      6: new TPiece(),
    };
    const key = this.generateRandomNumber();
    return pieces[key];
  }

  newCurrentPiece() {
    this.currentPiece = this.getPiece();
  }

  placePiece() {
    // this.currentPiece = this.currentPiece || this.getPiece();
    this.currentPiece.currentPositions.forEach((space) => {
      this.board.placePiece(space, this.currentPiece.symbol);
    });
  }

  removePiece() {
    this.currentPiece.currentPositions.forEach((space) => {
      this.display.removePiece(space);
      this.board.removePiece(space);
    });
    this.stage.update();
  }

  setAutoDrop() {
    if (this.continueGame) {
      this.autoDropId = setInterval(() => {
        if (this.continueGame) {
          this.downLogic();
        }
      }, 400);
    }
  }

  checkGameOver() {
    for(let i = 0; i < this.currentPiece.currentPositions.length; i++) {
      const piecePosition = this.currentPiece.currentPositions[i];
      if (this.board.grid[piecePosition[0]][piecePosition[1]] !== null) {
        return true;
      }
    }
    return false;
  }

  gameOver() {
    // document.location.reload();
    clearInterval(this.autoDropId);
    // // debugger
    document.removeEventListener("keydown", this.keyPressCallBack);
    this.currentPiece = null;
    this.board.grid = this.board.generateGrid();
    this.stage.removeAllChildren();
    this.display.displayGrid();
  }

  downLogic() {
    if (this.board.validDownMove(this.currentPiece.currentPositions)) {
      this.removePiece();
      this.currentPiece.moveDown();
      this.placePiece();
      this.renderPiece();
    } else {
      this.currentPiece = null;
      if (this.board.checkForFullRows()) {
        this.renderBoard();
      }
      this.newCurrentPiece();

      if (this.checkGameOver()) {
        this.continueGame = false;
        this.gameOver();
      } else {
        this.placePiece();
        this.renderPiece();
      }
    }
  }

  renderBoard() {
    this.stage.removeAllChildren();
    this.display.displayGrid();
  }

  renderPiece() {
    this.currentPiece.currentPositions.forEach((space) => {
      this.display.displayPiece(space);
    });
    this.stage.update();
  }
}

module.exports = Game;
