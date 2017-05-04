const Board = require("./board");

class Display {
  constructor(board, stage) {
    this.board = board;
    this.stage = stage;
    this.squareSize = 25;
  }



  displayGrid() {
    const numberRows = this.board.numberRows;
    const rowLength = this.board.rowLength;
    let yPosition = 0;
    for (let rowNumber = 0; rowNumber < numberRows; rowNumber++) {
      this.displayRow(rowNumber, rowLength, yPosition);
      yPosition += this.squareSize;
    }
  }

  displayRow(rowNumber, rowLength, yPosition) {
    let xPosition = 0;
    for (let spaceNumber = 0; spaceNumber < rowLength; spaceNumber++) {
      var color = this.getColor([rowNumber, spaceNumber]);
      var rectangle = new createjs.Shape();
      rectangle.graphics.beginStroke('#000');
      rectangle.graphics.beginFill(color).drawRect(0, 0, this.squareSize, this.squareSize);
      rectangle.x = xPosition;
      rectangle.y = yPosition;
      this.stage.addChild(rectangle);
      this.stage.update();
      xPosition += this.squareSize;
    }
  }

  displayPiece() {
    
  }

  getColor(position) {
    const row = position[0];
    const space = position[1];
    switch(this.board.grid[row][space]) {
      case("B"): {
        return "Blue";
      }
      default: {
        return "Black";
      }
    }
  }
}

module.exports = Display;
