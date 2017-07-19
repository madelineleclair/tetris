import Piece from "./piece";

class LeftLPiece extends Piece {
  constructor() {
    super({
      symbol: "LL",
      defaultPosition: [[0,6], [1,6], [0,7], [0,8]],
    });
  }
}

export default LeftLPiece;
