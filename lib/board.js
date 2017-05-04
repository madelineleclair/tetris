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

  // generateGrid() {
  //   const grid = [];
  //   const row = this.generateRow();
  //   for (let i = 0; i < 18; i++) {
  //     grid.push(row);
  //   }
  //   return grid;
  // }
  //
  // generateRow() {
  //   const row = [];
  //   for (let i = 0; i < 15; i++) {
  //     row.push(null);
  //   }
  //   return row;
  // }

  // board (position) {
  //   const row = position[0];
  //   const space = position[1];
  //   return this.grid[row][space];
  // }

  placePiece(position, symbol) {
    const rowPosition = position[0];
    const spacePosition = position[1];
    this.grid[rowPosition][spacePosition] = symbol;
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

  addRow() {
    this.generateRow();
  }

  clearRow(rowIndex) {
    this.grid.splice([rowIndex], 1);
  }

}

module.exports = Board;
