
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
          this.currentPiece.moveLeft();
          break;
        }
        case(39): {
          this.currentPiece.moveRight();
          break;
        }
        case(40): {
          this.currentPiece.moveDown();
          break;
        }
      }
      this.placePiece();
      this.renderBoard();
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
      this.board.removePiece(space);
    });
  }

  startGame() {
    this.addClickHandler();
    this.placePiece();
    this.renderBoard();
    // this.removePiece();
    // this.currentPiece.moveRight();
    // this.placePiece();
    // this.renderBoard();

  }

  renderBoard() {
    // this.board.placePiece([0,1], "B");
    this.display.displayGrid();
  }
}

module.exports = Game;
