const Board = require("./board");

class Display {
  constructor() {
    this.board = new Board ();
    this.stage = new createjs.Stage("canvas");
  }

  displayGrid() {
    const numberRows = this.board.numberRows;
    const rowLength = this.board.rowLength;
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

}

module.exports = Display;
