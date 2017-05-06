const Piece = require("./piece");

class RightZPiece extends Piece {
  constructor() {
    super({
      symbol: "RZ",
      defaultPosition: [[0,7], [0,8], [1,7], [1,6]],
    });
  }
}

module.exports = RightZPiece;
