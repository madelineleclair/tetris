const Piece = require("./piece");

class TPiece extends Piece {
  constructor() {
    super({
      symbol: "T",
      defaultPosition: [[0,6], [0,7], [0,8],[1,7]],
    });
  }
}

module.exports = TPiece;
