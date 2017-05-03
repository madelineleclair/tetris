class Board {
  constructor(stage) {
    this.grid = this.generateGrid();
    this.stage = stage;
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

  displayGrid() {
    const numberRows = this.numberRows;
    const rowLength = this.rowLength;
    let yPosition = 0;
    for (let i = 0; i < numberRows; i++) {
      this.displayRow(rowLength, yPosition);
      yPosition += 30;
    }
  }

  displayRow(rowLength, yPosition) {
    let xPosition = 0;
    for (let i = 0; i < rowLength; i++) {
      var rectangle = new createjs.Shape();
      rectangle.graphics.beginFill("Black").drawRect(0, 0, 25, 25);
      rectangle.x = xPosition;
      rectangle.y = yPosition;
      this.stage.addChild(rectangle);
      this.stage.update();
      xPosition += 30;
    }
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
