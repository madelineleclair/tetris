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
      var rectangle = new createjs.Shape();
      rectangle.graphics.beginStroke('#000');
      rectangle.graphics.beginFill("Black").drawRect(0, 0, this.squareSize, this.squareSize);
      rectangle.x = xPosition;
      rectangle.y = yPosition;
      this.stage.addChild(rectangle);
      xPosition += this.squareSize;
    }
    this.stage.update();
  }

// the x position is the index inside the inner array and the y positioni is the row number
  displayPiece(position) {
    var color = this.getColor([position[0], position[1]]);
    var rectangle = new createjs.Shape();
    rectangle.graphics.beginStroke('#000');
    rectangle.graphics.beginFill(color).drawRect(0, 0, this.squareSize, this.squareSize);
    rectangle.x = position[1] * this.squareSize;
    rectangle.y = position[0] * this.squareSize;
    this.stage.addChild(rectangle);
  }

// the x position is the index inside the inner array and the y positioni is the row number
  removePiece(position) {
    var rectangle = new createjs.Shape();
    rectangle.graphics.beginFill("Black").drawRect(0, 0, this.squareSize, this.squareSize);
    rectangle.x = position[1] * this.squareSize;
    rectangle.y = position[0] * this.squareSize;
    this.stage.addChild(rectangle);
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
