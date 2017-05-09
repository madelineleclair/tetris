/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class Piece {

  constructor(options) {
    this.symbol = options.symbol;
    this.defaultPosition = options.defaultPosition;
    this.currentPositions = this.defaultPosition;
  }

  moveDown() {
    this.currentPositions.forEach((space) => {
      space[0] ++;
    });
  }

  moveLeft() {
    this.currentPositions.forEach((space) => {
      space[1] -= 1;
    });
  }

  moveRight() {
    this.currentPositions.forEach((space) => {
      space[1] += 1;
    });
  }

  rotatePiece(){
    const pivot = this.currentPositions[2];
    const pivotX = pivot[1];
    const pivotY = pivot[0];
    for (let i = 0; i < this.currentPositions.length; i++) {
      const x = this.currentPositions[i][1];
      const y = this.currentPositions[i][0];
      this.currentPositions[i] = this.clockwiseRotation(pivotX, pivotY, x, y, 90);
    }

  }

  clockwiseRotation(pivotX, pivotY, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - pivotX)) + (sin * (y - pivotY)) + pivotX,
        ny = (cos * (y - pivotY)) - (sin * (x - pivotX)) + pivotY;
    return [Math.round(ny), Math.round(nx)];
  }

}

module.exports = Piece;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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

module.exports = Board;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Display = __webpack_require__(3);
const Board = __webpack_require__(1);
const StaticPieces = __webpack_require__(10);
const LinePiece = __webpack_require__(7);
const LeftLPiece = __webpack_require__(5);
const RightLPiece = __webpack_require__(8);
const LeftZPiece = __webpack_require__(6);
const RightZPiece = __webpack_require__(9);
const TPiece = __webpack_require__(11);

class Game {
  constructor() {
    this.board = new Board ();
    this.stage = new createjs.Stage("canvas");
    this.display = new Display (this.board, this.stage);
    this.pause = false;
    this.keyPressCallBack = (e) => { this.keyPressCheck(e); };
    // this.gameEnded = false;
  }

  pageLoadActions() {
    this.renderBoard();
    const startButton = document.getElementById("start-button");
    const pauseButton = document.getElementById("pause-button");
    startButton.addEventListener("click", (e) => this.startGame());
    pauseButton.addEventListener("click", e => this.pauseGame());
  }

  startGame() {
    this.gameEneded = false;
    this.UserKeyboardInteraction();
    this.newCurrentPiece();
    this.placePiece();
    this.renderPiece();
    this.setAutoDrop();
  }

  pauseGame() {
    if (this.pause) {
      this.setAutoDrop();
      this.pause = false;
      this.UserKeyboardInteraction();
    } else {
      this.pause = true;
      document.removeEventListener("keydown", this.keyPressCallBack);
      clearInterval(this.autoDropId);
    }
  }

  UserKeyboardInteraction() {
    document.addEventListener("keydown", this.keyPressCallBack);
  }

  keyPressCheck(e) {
    switch(e.keyCode) {
      case(37): {
        if (this.board.validLeftMove(this.currentPiece.currentPositions)) {
          this.removePiece();
          this.currentPiece.moveLeft();
        }
        break;
      }
      case(38): {
        if (this.board.validRotation(this.currentPiece)) {
          this.removePiece();
          this.currentPiece.rotatePiece();
        }
        break;
      }
      case(39): {
        if (this.board.validRightMove(this.currentPiece.currentPositions)) {
          this.removePiece();
          this.currentPiece.moveRight();
        }
        break;
      }
      case(40): {
          clearInterval(this.autoDropId);
          this.downLogic();
          this.setAutoDrop();
          return;
      }
    }
    this.placePiece();
    this.renderPiece();
  }

  generateRandomNumber() {
    return Math.floor(Math.random() * 6);
  }

  getPiece() {
    const pieces = {
      0: new StaticPieces(),
      1: new LinePiece(),
      2: new LeftLPiece(),
      3: new RightLPiece(),
      4: new LeftZPiece(),
      5: new RightZPiece(),
      6: new TPiece(),
    };
    const key = this.generateRandomNumber();
    return pieces[key];
  }

  newCurrentPiece() {
    this.currentPiece = this.getPiece();
  }

  placePiece() {
    // this.currentPiece = this.currentPiece || this.getPiece();
    this.currentPiece.currentPositions.forEach((space) => {
      this.board.placePiece(space, this.currentPiece.symbol);
    });
  }

  removePiece() {
    this.currentPiece.currentPositions.forEach((space) => {
      this.display.removePiece(space);
      this.board.removePiece(space);
    });
    this.stage.update();
  }

  setAutoDrop() {
    this.autoDropId = setInterval(() => {
      this.downLogic();
    }, 400);
  }

  checkGameOver() {
    for(let i = 0; i < this.currentPiece.currentPositions.length; i++) {
      const piecePosition = this.currentPiece.currentPositions[i];
      if (this.board.grid[piecePosition[0]][piecePosition[1]] !== null) {
        return true;
      }
    }
    return false;
  }

  gameOver() {
    // document.location.reload();
    clearInterval(this.autoDropId);
    // // debugger
    document.removeEventListener("keydown", this.keyPressCallBack);
    this.currentPiece = null;
    this.board.grid = this.board.generateGrid();
    this.display.displayGrid();
  }

  downLogic() {
    if (this.board.validDownMove(this.currentPiece.currentPositions)) {
      this.removePiece();
      this.currentPiece.moveDown();
      this.placePiece();
      this.renderPiece();
    } else {
      this.currentPiece = null;
      if (this.board.checkForFullRows()) {
        this.renderBoard();
      }
      this.newCurrentPiece();

      if (this.checkGameOver()) {
        this.gameOver();
      } else {
        this.placePiece();
        this.renderPiece();
      }
    }
  }

  renderBoard() {
    this.display.displayGrid();
  }

  renderPiece() {
    this.currentPiece.currentPositions.forEach((space) => {
      this.display.displayPiece(space);
    });
    this.stage.update();
  }
}

module.exports = Game;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(1);

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
      case("S"): {
        return "Orange";
      }
      case("LL"): {
        return "Purple";
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
        return "Pink";
      }
      default: {
        return "Black";
      }
    }
  }
}

module.exports = Display;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// this file will import the game module and begin the entry.
// tick will be used to make pieces move down probably


const Game = __webpack_require__(2);

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game ();
  // game.startGame();
  game.pageLoadActions();
});
// document.addEventListener("DOMContentLoaded", () => {
//   const stage = new createjs.Stage("canvas");
//   const board = new Board ();
//   var length = 0;
//
//   board.grid.forEach((row, index) => {
//     var rectangle = new createjs.Shape();
//     if (index % 2 === 0) {
//       rectangle.graphics.beginFill("Black").drawRect(0, 0, 25, 25);
//     } else {
//       rectangle.graphics.beginFill("Blue").drawRect(0, 0, 25, 25);
//     }
//     rectangle.x = length;
//     stage.addChild(rectangle);
//     stage.update();
//     length += 25;
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const stage =  new createjs.Stage("canvas");
//   var rectangle = new createjs.Shape();
//   rectangle.graphics.beginFill("Black").drawRect(0, 0, 400, 500);
//   rectangle.x = 300;
//   rectangle.y = 100;
//   stage.addChild(rectangle);
//   stage.update();
// });


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Piece = __webpack_require__(0);

class LeftLPiece extends Piece {
  constructor() {
    super({
      symbol: "LL",
      defaultPosition: [[0,6], [0,7], [1,6], [0,8]],
    });
  }
}

module.exports = LeftLPiece;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Piece = __webpack_require__(0);

class LeftZPiece extends Piece {
  constructor() {
    super({
      symbol: "LZ",
      defaultPosition: [[0,6], [0,7], [1,7],[1,8]],
    });
  }

}

module.exports = LeftZPiece;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const Piece = __webpack_require__(0);

class LinePiece extends Piece {
  constructor() {
    super({symbol: "S",
    defaultPosition: [[0,6], [0,7], [0,8], [0,9]],
    });
  }

}

module.exports = LinePiece;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const Piece = __webpack_require__(0);

class RightLPiece extends Piece {
  constructor() {
    super({
      symbol: "RL",
      defaultPosition: [[0,7], [0,6], [1,8], [0,8]],
    });
  }
}

module.exports = RightLPiece;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const Piece = __webpack_require__(0);

class RightZPiece extends Piece {
  constructor() {
    super({
      symbol: "RZ",
      defaultPosition: [[0,7], [0,8], [1,7], [1,6]],
    });
  }
}

module.exports = RightZPiece;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const Piece = __webpack_require__(0);

class StaticPieces extends Piece {
  constructor() {
    super({
      symbol: "B",
      defaultPosition: [[0, 8], [0,9], [1,8], [1,9]],
    });
    // this.symbol = "B";
    // this.defaultPosition = {
    //   top: [[0, 8], [0,9]],
    //   middle: [],
    //   bottom: [[1,8], [1,9]],
    // };
    // this.currentPositions = this.defaultPosition;
    // this.allCurrentPositions = this.currentPositions.top.concat(this.currentPositions.middle)
    //   .concat(this.currentPositions.bottom);
  }

  // moveDown() {
  //   this.allCurrentPositions.forEach((space) => {
  //     space[0] ++;
  //   });
  // }
  //
  // moveLeft() {
  //   this.allCurrentPositions.forEach((space) => {
  //     space[1] -= 1;
  //   });
  // }
  //
  // moveRight() {
  //   this.allCurrentPositions.forEach((space) => {
  //     space[1] += 1;
  //   });
  // }
  //
  // getLeftPieces() {
  //   return [this.currentPositions.bottom[0], this.currentPositions.top[0]];
  // }
  //
  // getRightPieces() {
  //   return [this.currentPositions.bottom[1], this.currentPositions.top[1]];
  // }
  //
  // getBottomPieces() {
  //   return this.currentPositions.bottom;
  // }

  rotatePiece() {
    
  }
}

module.exports = StaticPieces;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const Piece = __webpack_require__(0);

class TPiece extends Piece {
  constructor() {
    super({
      symbol: "T",
      defaultPosition: [[0,6], [0,8], [1,7], [0,7]],
    });
  }
}

module.exports = TPiece;


/***/ })
/******/ ]);