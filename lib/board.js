class Board {
  constructor() {
    this.numberRows = 18;
    this.rowLength = 16;
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

  // //watch the return on this, maybe returning false.
  // rowFull(row) {
  //   let filledSquares = this.countFilledSquares(rowIndex);
  //   if (filledSquares === this.rowLength) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  checkForFullRows() {
    let rowsToDelete = [];
    for (let i = 0; i < this.numberRows; i++) {
      if (this.rowFull(i)) {
        rowsToDelete.push(i);
      }
    }
    rowsToDelete.forEach((rowIndex) => {
      this.clearRow(rowIndex);
      this.addRow();
    });

    // this.addRow(rowsToDelete.length);

    if (rowsToDelete.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  rowFull(rowIndex) {
    const row = this.grid[rowIndex];
    for (let i = 0; i < this.rowLength; i++)
      if (row[i] === null) {
        return false;
      }
    return true;
  }

  // countFilledSquares(rowIndex) {
  //   let filledSquares = 0;
  //   this.grid[rowIndex].forEach((square) => {
  //     if (square !== null) {
  //       filledSquares ++;
  //     }
  //   });
  //   return filledSquares;
  // }

//there is no generateRow anymore
  // addRow() {
  //   this.generateRow();
  // }

  clearRow(rowIndex) {
    this.grid.splice([rowIndex], 1);
  }

  addRow() {
    let grid = new Array();
    for (let i = 0; i < 1; i++) {
      grid[i] = new Array();
      for ( let j = 0; j < this.rowLength; j++) {
        grid[i][j] = null;
      }
      this.grid = grid.concat(this.grid);
    }
  }

  // addRow(numberNewRows) {
  //   let grid = new Array();
  //   for (let i = 0; i < numberNewRows; i++) {
  //     grid[i] = new Array();
  //     for ( let j = 0; j < this.rowLength; j++) {
  //       grid[i][j] = null;
  //     }
  //     this.grid = grid.concat(this.grid);
  //   }
  // }

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
