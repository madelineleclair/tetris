const Piece = require("./piece");

class LeftZPiece extends Piece {
  constructor() {
    super({
      symbol: "LZ",
      defaultPosition: [[0,6], [0,7], [1,7],[1,8]],
    });
  }

}

module.exports = LeftZPiece;
