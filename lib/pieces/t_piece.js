import Piece from "./piece";

class TPiece extends Piece {
  constructor() {
    super({
      symbol: "T",
      defaultPosition: [[0,6], [0,8], [0,7], [1,7]],
    });
  }
}

export default TPiece;
