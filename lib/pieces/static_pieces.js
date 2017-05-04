
class StaticPieces {
  constructor() {
    this.symbol = "B";
    this.defaultPosition = {
      top: [[0, 8], [0,9]],
      middle: [],
      bottom: [[1,8], [1,9]],
    };
    this.currentPositions = this.defaultPosition;
    this.allCurrentPositions = this.currentPositions.top.concat(this.currentPositions.middle)
      .concat(this.currentPositions.bottom);
  }

  moveDown() {
    this.allCurrentPositions.forEach((space) => {
      space[0] ++;
    });
  }

  moveLeft() {
    this.allCurrentPositions.forEach((space) => {
      space[1] -= 1;
    });
  }

  moveRight() {
    this.allCurrentPositions.forEach((space) => {
      space[1] += 1;
    });
  }

  getLeftPieces() {
    return [this.currentPositions.bottom[0], this.currentPositions.top[0]];
  }

  getRightPieces() {
    return [this.currentPositions.bottom[1], this.currentPositions.top[1]];
  }

  getBottomPieces() {
    return this.currentPositions.bottom
  }
}

module.exports = StaticPieces;
