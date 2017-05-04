
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
    const piece = this.getPiece();
    const top = piece.defaultPosition.top;
    const middle = piece.defaultPosition.middle;
    const bottom = piece.defaultPosition.bottom;
    top.forEach((space) => {
      this.board.placePiece(space, piece.symbol);
    });
    middle.forEach((space) => {
      this.board.placePiece(space, piece.symbol);
    });
    bottom.forEach((space) => {
      this.board.placePiece(space, piece.symbol);
    });
  }

  startGame() {
    this.renderBoard();
    this.placePiece();
    this.renderBoard();

  }

  renderBoard() {
    // this.board.placePiece([0,1], "B");
    this.display.displayGrid();
  }
}

module.exports = Game;
