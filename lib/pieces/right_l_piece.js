const Piece = require("./piece");

class RightLPiece extends Piece {
  constructor() {
    super({
      symbol: "RL",
      defaultPosition: [[0,7], [0,6], [1,8], [0,8]],
    });
  }
}

module.exports = RightLPiece;
