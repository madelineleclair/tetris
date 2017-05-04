class Board {
  constructor() {
    this.grid = this.generateGrid();
    this.numberRows = 18;
    this.rowLength = 15;
  }

  generateGrid() {
    const grid = [];
    const row = this.generateRow();
    for (let i = 0; i < 18; i++) {
      grid.push(row);
    }
    return grid;
  }

  generateRow() {
    const row = [];
    for (let i = 0; i < 15; i++) {
      row.push(null);
    }
    return row;
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
