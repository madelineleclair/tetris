import Board from "./board";

class Display {
  constructor(board, boardStage, nextPieceBoard, nextPieceStage) {
    this.board = board;
    this.boardStage = boardStage;
    this.nextPieceBoard = nextPieceBoard;
    this.nextPieceStage = nextPieceStage;
    this.squareSize = 25;
  }

  displayGrid(generationType) {
    const board = generationType === "boardStage" ? this.board : this.nextPieceBoard;
    const numberRows = board.numberRows;
    const rowLength = board.rowLength;
    let yPosition = 0;
    for (let rowNumber = 0; rowNumber < numberRows; rowNumber++) {
      this.displayRow(rowNumber, rowLength, yPosition, generationType);
      yPosition += this.squareSize;
    }
  }

  displayRow(rowNumber, rowLength, yPosition, generationType) {
    const stage = generationType === "boardStage" ? this.boardStage : this.nextPieceStage;
    let xPosition = 0;
    for (let spaceNumber = 0; spaceNumber < rowLength; spaceNumber++) {
      var color = this.getColor([rowNumber, spaceNumber], generationType);
      var rectangle = new createjs.Shape();
      rectangle.graphics.beginStroke('#000');
      rectangle.graphics.beginFill(color).drawRect(0, 0, this.squareSize, this.squareSize);
      rectangle.x = xPosition;
      rectangle.y = yPosition;
      stage.addChild(rectangle);
      xPosition += this.squareSize;
    }
    stage.update();
  }

  getChild(position) {
    // debugger
    const stageIndex = (16 * position[0] + position[1]);
    return this.boardStage.children[stageIndex];
  }

// the x position is the index inside the inner array and the y positioni is the row number
  displayPiece(position) {
    var color = this.getColor([position[0], position[1]], "boardStage");
    var child = this.getChild(position);
    child.graphics.clear().beginStroke('#000');
    child.graphics.beginFill(color).drawRect(0, 0, this.squareSize, this.squareSize);
  }


// the x position is the index inside the inner array and the y positioni is the row number
  removePiece(position) {
    var child = this.getChild(position);
    child.graphics.clear().beginFill("Black").drawRect(0, 0, this.squareSize, this.squareSize);
  }

  getColor(position, generationType) {
    const board = generationType === "boardStage" ? this.board : this.nextPieceBoard;
    const row = position[0];
    const space = position[1];
    switch(board.grid[row][space]) {
      case("B"): {
        return "Blue";
      }
      case("S"): {
        return "Orange";
      }
      case("LL"): {
        return "Pink";
      }
      case("RL"): {
        return "Red";
      }
      case("RZ"): {
        return "Green";
      }
      case("LZ"): {
        return "Yellow";
      }
      case("T"): {
        return "Purple";
      }
      default: {
        return "Black";
      }
    }
  }
}

export default Display;
