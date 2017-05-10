import Piece from "./piece";

class RightZPiece extends Piece {
  constructor() {
    super({
      symbol: "RZ",
      defaultPosition: [[0,7], [0,8], [1,7], [1,6]],
    });
  }
}

export default RightZPiece;
