
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
      this.removePiece();
      switch(e.keyCode) {
        case(37): {
          if (this.board.validLeftMove(this.currentPiece.getLeftPieces())) {
            this.currentPiece.moveLeft();
          }
          break;
        }
        case(39): {
          if (this.board.validRightMove(this.currentPiece.getRightPieces())) {
            this.currentPiece.moveRight();
          }
          break;
        }
        case(40): {
          if (this.board.validDownMove(this.currentPiece.getBottomPieces())) {
            this.currentPiece.moveDown();
          } else {
            this.currentPiece = null;
            this.placePiece();
          }
          break;
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
