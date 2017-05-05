const Display = require("./display");
const Board = require("./board");
const StaticPieces = require("./pieces/static_pieces");
const LinePiece = require("./pieces/line_piece");

class Game {
  constructor() {
    this.board = new Board ();
    this.stage = new createjs.Stage("canvas");
    this.display = new Display (this.board, this.stage);
    this.pause = false;
    this.keyPressCallBack = (e) => { this.keyPressCheck(e); };
  }

  pageLoadActions() {
    this.renderBoard();
    const startButton = document.getElementById("start-button");
    const pauseButton = document.getElementById("pause-button");
    startButton.addEventListener("click", (e) => this.startGame());
    pauseButton.addEventListener("click", e => this.pauseGame());
  }

  startGame() {
    this.UserKeyboardInteraction();
    // this.renderBoard();
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
        if (this.board.validLeftMove(this.currentPiece.getLeftPieces())) {
          this.removePiece();
          this.currentPiece.moveLeft();
        }
        break;
      }
      case(39): {
        if (this.board.validRightMove(this.currentPiece.getRightPieces())) {
          this.removePiece();
          this.currentPiece.moveRight();
        }
        break;
      }
      case(40): {
        clearInterval(this.autoDropId);
        this.downLogic();
        this.setAutoDrop();
        return;
      }
    }
    this.placePiece();
    this.renderPiece();
  }

  getPiece() {
    const pieces = {
      0: new StaticPieces(),
      1: new LinePiece(),
    };

    return pieces[1];
  }

  placePiece() {
    this.currentPiece = this.currentPiece || this.getPiece();
    this.currentPiece.allCurrentPositions.forEach((space) => {
      this.board.placePiece(space, this.currentPiece.symbol);
    });
  }

  removePiece() {
    this.currentPiece.allCurrentPositions.forEach((space) => {
      this.display.removePiece(space);
      this.board.removePiece(space);
    });
    this.stage.update();
  }

  setAutoDrop() {
    this.autoDropId = setInterval(() => {
      this.downLogic();
    }, 400);
  }

  downLogic() {
    if (this.board.validDownMove(this.currentPiece.getBottomPieces())) {
      this.removePiece();
      this.currentPiece.moveDown();
    } else {
      this.currentPiece = null;
      if (this.board.checkForFullRows()) {
        this.renderBoard();
      }
    }
    this.placePiece();
    this.renderPiece();
  }

  renderBoard() {
    this.display.displayGrid();
  }

  renderPiece() {
    this.currentPiece.allCurrentPositions.forEach((space) => {
      this.display.displayPiece(space);
    });
    this.stage.update();
  }
}

module.exports = Game;
