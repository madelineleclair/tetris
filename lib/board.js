class Board {
  constructor() {
    this.numberRows = 18;
    this.rowLength = 16;
    this.grid = this.generateGrid();
    this.numberClearedRows = 0;
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


  checkForFullRows() {
    let rowsToDelete = [];
    for (let i = 0; i < this.numberRows; i++) {
      if (this.rowFull(i)) {
        rowsToDelete.push(i);
      }
    }
    this.numberClearedRows = rowsToDelete.length;
    rowsToDelete.forEach((rowIndex) => {
      this.clearRow(rowIndex);
      this.addRow();
    });


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


  validRotation(currentPiece) {
    const currentPositions = currentPiece.currentPositions;
    const pivot = currentPositions[2];
    const pivotX = pivot[1];
    const pivotY = pivot[0];
    for (let i = 0; i < currentPositions.length; i++) {
      const x = currentPositions[i][1];
      const y = currentPositions[i][0];
      const newPosition = currentPiece.clockwiseRotation(pivotX, pivotY, x, y, 90);
      if(this.includedInArray(currentPositions, newPosition)) {
        continue;
      } else if (newPosition[1] >= this.rowLength || newPosition[0] < 0
        || this.grid[newPosition[0]][newPosition[1]] !== null) {
          return false;
        }
    }
    return true;
  }

validRightMove(currentPositions) {
  for (let i = 0; i < currentPositions.length; i++) {
    const newYPosition = currentPositions[i][1] + 1;
    const currentXPosition = currentPositions[i][0];
    if(this.includedInArray(currentPositions, [currentXPosition, newYPosition])) {
      continue;
    } else if (newYPosition >= this.rowLength || this.grid[currentXPosition][newYPosition] !== null) {
      return false;
    }
  }
  return true;
}

  validLeftMove(currentPositions) {
    for (let i = 0; i < currentPositions.length; i++) {
      const newYPosition = currentPositions[i][1] - 1;
      const currentXPosition = currentPositions[i][0];
      if (this.includedInArray(currentPositions, [currentXPosition, newYPosition])) {
        continue;
      }
      else if (newYPosition >= this.rowLength ||
        this.grid[currentPositions[i][0]][newYPosition] !== null) {
          return false;
      }
    }
    return true;
  }


  validDownMove(currentPositions) {
    for (let i = 0; i < currentPositions.length; i++) {
      const newXPosition = currentPositions[i][0] + 1;
      const yPosition = currentPositions[i][1];
      if (this.includedInArray(currentPositions, [newXPosition, yPosition])) {
        continue;
      }
      else if (newXPosition === this.numberRows || this.grid[newXPosition][currentPositions[i][1]] !== null) {
        return false;
      }
    }
    return true;
  }

  includedInArray(currentPositions, newArray) {
    for (let i = 0; i < currentPositions.length; i++) {
      if (this.equalArrays(currentPositions[i], newArray)) {
        return true;
      }
    }
    return false;
  }

  equalArrays(array1, array2) {
    if (array1[0] === array2[0] && array1[1] === array2[1]) {
      return true;
    }
    return false;
  }

}

export default Board;
