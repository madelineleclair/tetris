import Piece from "./piece";

class StaticPieces extends Piece {
  constructor() {
    super({
      symbol: "B",
      defaultPosition: [[0, 7], [0,8], [1,7], [1,8]],
    });
  }

  rotatePiece() {

  }
}

export default StaticPieces;
