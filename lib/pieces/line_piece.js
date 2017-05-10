import Piece from "./piece";

class LinePiece extends Piece {
  constructor() {
    super({symbol: "S",
    defaultPosition: [[0,6], [0,7], [0,8], [0,9]],
    });
  }

}

export default LinePiece;
