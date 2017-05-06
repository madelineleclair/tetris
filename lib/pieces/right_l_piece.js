const Piece = require("./piece");

class RightLPiece extends Piece {
  constructor() {
    super({
      symbol: "RL",
      defaultPosition: [[0,6], [0,7], [0,8],[1,8]],
    });
  }
}

module.exports = RightLPiece;
