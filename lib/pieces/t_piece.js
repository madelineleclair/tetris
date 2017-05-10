import Piece from "./piece";

class TPiece extends Piece {
  constructor() {
    super({
      symbol: "T",
      defaultPosition: [[0,6], [0,8], [1,7], [0,7]],
    });
  }
}

export default TPiece;
