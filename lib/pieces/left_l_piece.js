const Piece = require("./piece");

class LeftLPiece extends Piece {
  constructor() {
    super({
      symbol: "LL",
      defaultPosition: [[0,6], [0,7], [1,6], [0,8]],
    });
  }
}

module.exports = LeftLPiece;
