
const Display = require("./display");
const Board = require("./board");
const StaticPieces = require("./pieces/static_pieces");

class Game {
  constructor() {
    this.board = new Board ();
    this.stage = new createjs.Stage("canvas");
    this.display = new Display (this.board, this.stage);
  }

  addClickHandler() {

    document.addEventListener("keydown", (e) => {
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
          clearInterval(this.intervalId);
          this.downLogic();
          this.setAutoDrop();
          return;
        }
      }
      this.placePiece();
      this.renderPiece();
    });
  }

  getPiece() {
    const pieces = {
      0: new StaticPieces()
    };

    return pieces[0];
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

  startGame() {
    this.addClickHandler();
    this.renderBoard();
    this.placePiece();
    this.renderPiece();
    // this.setAutoDrop();
  }

  setAutoDrop() {
    this.intervalId = setInterval(() => {
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
