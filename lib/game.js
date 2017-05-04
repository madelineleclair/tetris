
const Display = require("./display");
const Board = require("./board");
const StaticPieces = require("./pieces/static_pieces");

class Game {
  constructor() {
    this.board = new Board ();
    this.display = new Display (this.board);
  }

  getPiece() {
    const pieces = {
      0: new StaticPieces()
    };

    return pieces[0];
  }

  placePiece() {
    this.currentPiece = this.currentPiece || this.getPiece();
    const currentPosition = this.currentPiece.currentPosition;

    const allPositions = currentPosition.top
      .concat(currentPosition.middle).concat(currentPosition.bottom);
    allPositions.forEach((space) => {
      this.board.placePiece(space, this.currentPiece.symbol);
    });
  }

  removePiece() {
    const currentPosition = this.currentPiece.currentPosition;
    const allPositions = currentPosition.top
      .concat(currentPosition.middle).concat(currentPosition.bottom);

    allPositions.forEach((space) => {
      this.board.removePiece(space);
    });
  }

  startGame() {
    this.placePiece();
    this.renderBoard();
    this.removePiece();
    this.currentPiece.moveDown();
    this.placePiece();
    this.renderBoard();

  }

  renderBoard() {
    // this.board.placePiece([0,1], "B");
    this.display.displayGrid();
  }
}

module.exports = Game;
