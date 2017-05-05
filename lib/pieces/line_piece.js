const Piece = require("./piece");

class LinePiece extends Piece {
  constructor() {
    super({symbol: "L",
      defaultPosition: {
        top: [],
        middle: [],
        bottom: [[0,6], [0,7], [0,8], [0,9]],
      },
    });
  }

}

module.exports = LinePiece;
