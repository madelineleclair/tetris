class Board {
  constructor() {
    this.numberRows = 18;
    this.rowLength = 15;
    this.grid = this.generateGrid();
  }

  generateGrid() {
    let grid = new Array();
    for (let i = 0; i < this.numberRows; i++) {
      grid[i] = new Array();
      for ( let j = 0; j < this.rowLength; j++) {
        grid[i][j] = null;
      }
    }
    return grid;
  }

  placePiece(position, symbol) {
    const rowPosition = position[0];
    const spacePosition = position[1];
    this.grid[rowPosition][spacePosition] = symbol;
  }

  removePiece(position) {
    const rowPosition = position[0];
    const spacePosition = position[1];
    this.grid[rowPosition][spacePosition] = null;
  }

  //watch the return on this, maybe returning false.
  rowFull(row) {
    let filledSquares = this.countFilledSquares(rowIndex);
    if (filledSquares === this.rowLength) {
      return true;
    } else {
      return false;
    }
  }

  countFilledSquares(rowIndex) {
    let filledSquares = 0;
    this.grid[rowIndex].forEach((square) => {
      if (square !== null) {
        filledSquares ++;
      }
    });
    return filledSquares;
  }

//there is no generateRow anymore
  // addRow() {
  //   this.generateRow();
  // }

  clearRow(rowIndex) {
    this.grid.splice([rowIndex], 1);
  }

  validRightMove(currentPositions) {
    for (let i = 0; i < currentPositions.length; i++) {
      const newYPosition = currentPositions[i][1] + 1;
      if (newYPosition >= this.rowLength || this.grid[currentPositions[i][0]][newYPosition] !== null) {
        return false;
      }
    }
    return true;
  }

  validLeftMove(currentPositions) {
    for (let i = 0; i < currentPositions.length; i++) {
      const newYPosition = currentPositions[i][1] - 1;
      if (newYPosition >= this.rowLength || this.grid[currentPositions[i][0]][newYPosition] !== null) {
        return false;
      }
    }
    return true;
  }

  validDownMove(currentPositions) {
    // debugger
    for (let i = 0; i < currentPositions.length; i++) {
      const newXPosition = currentPositions[i][0] + 1;
      // debugger
      if (newXPosition === this.numberRows || this.grid[newXPosition][currentPositions[i][1]] !== null) {
        return false;
      }
    }
    return true;
  }

}

module.exports = Board;
