const Piece = require("./piece");

class LeftLPiece extends Piece {
  constructor() {
    super({
      symbol: "LL",
      defaultPosition: [[0,6], [0,7], [0,8],[1,6]],
    });
  }
}

module.exports = LeftLPiece;
