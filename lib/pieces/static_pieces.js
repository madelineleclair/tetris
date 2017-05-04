
class StaticPieces {
  constructor() {
    this.symbol = "B";
    this.defaultPosition = {
      top: [[0, 8], [0,9]],
      middle: [],
      bottom: [[1,8], [1,9]],
    };
    this.currentPosition = this.defaultPosition;
  }

  moveDown() {

    this.currentPosition.top.forEach((space) => {
      space[0] ++;
    });
    this.currentPosition.middle.forEach((space) => {
      space[0] ++;
    });
    this.currentPosition.bottom.forEach((space) => {
      space[0] ++;
    });
  }
}

module.exports = StaticPieces;
