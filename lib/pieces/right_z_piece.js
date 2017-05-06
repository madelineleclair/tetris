const Piece = require("./piece");

class RightZPiece extends Piece {
  constructor() {
    super({
      symbol: "RZ",
      defaultPosition: [[1,6], [1,7], [0,7],[0,8]],
    });
  }
}

module.exports = RightZPiece;
