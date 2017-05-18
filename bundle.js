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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (Piece);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Board {
  constructor() {
    this.numberRows = 18;
    this.rowLength = 16;
    this.grid = this.generateGrid();
    this.numberClearedRows = 0;
  }

  generateGrid() {
    let grid = [];
    for (let i = 0; i < this.numberRows; i++) {
      grid[i] = [];
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

/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__display__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__board__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__next_piece_board__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pieces_static_pieces__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pieces_line_piece__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pieces_left_l_piece__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pieces_right_l_piece__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pieces_left_z_piece__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pieces_right_z_piece__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pieces_t_piece__ = __webpack_require__(12);











class Game {
  constructor() {
    this.board = new __WEBPACK_IMPORTED_MODULE_1__board__["a" /* default */] ();
    this.nextPieceBoard = new __WEBPACK_IMPORTED_MODULE_2__next_piece_board__["a" /* default */] ();
    this.boardStage = new createjs.Stage("canvas");
    this.nextPieceStage = new createjs.Stage("next-piece-canvas");
    this.display = new __WEBPACK_IMPORTED_MODULE_0__display__["a" /* default */] (this.board, this.boardStage, this.nextPieceBoard,
      this.nextPieceStage);
    this.score = 0;
    this.dropSpeed = 700;
    this.pause = false;
    this.keyPressCallBack = (e) => { this.pieceMovement(e); };
    this.continueGame = false;
    this.scoreBoard = document.getElementById("score-container");
    this.startButton = document.getElementById("start-button");
  }

  pageLoadActions() {
    this.displayStartScreen();
    this.display.displayGrid("nextPieceBoard");
    document.addEventListener('keydown', (e) => this.gameKeys(e));
  }

  displayStartScreen() {
    this.display.displayStartScreen();
  }

  displayScore() {
    this.scoreBoard.innerHTML = `<p>${this.score}</p>`;
  }

  displayGameOverScreen() {
    this.display.displayGameOverScreen();
  }

  resetScore() {
    this.scoreBoard.innerHTML = '<p></p>';
    this.score = 0;
  }

  startGame() {
    this.boardStage.removeAllChildren();
    this.renderBoard();
    this.continueGame = true;
    this.UserKeyboardInteraction();
    this.newCurrentPiece();
    this.placePiece();
    this.renderPiece();
    this.setAutoDrop();
    this.nextPieceBoard.nextPiece = this.generateRandomNumber();
    this.nextPieceBoard.setPiece();
    this.nextPieceStage.update();
    this.display.displayGrid("nextPieceStage");
    this.displayScore();
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

  pieceMovement(e) {
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
        if (this.continueGame) {
          this.downLogic();
        }
          return;
      }
    }
    this.placePiece();
    this.renderPiece();
  }

  gameKeys(e) {
    switch(e.keyCode) {
      case(80): {
        if (this.continueGame) {
          this.pauseGame();
        }
        break;
      }
      case(81): {
        this.continueGame = false;
        this.gameOver();
        return;
      }
      case(13): {
        if (!this.continueGame) {
          this.startGame();
        }
        break;
      }
    }
  }

  generateRandomNumber() {
    return Math.floor(Math.random() * (7 - 1 + 1)) + 1;
  }

  getPiece() {
    const pieces = {
      1: new __WEBPACK_IMPORTED_MODULE_3__pieces_static_pieces__["a" /* default */](),
      2: new __WEBPACK_IMPORTED_MODULE_4__pieces_line_piece__["a" /* default */](),
      3: new __WEBPACK_IMPORTED_MODULE_5__pieces_left_l_piece__["a" /* default */](),
      4: new __WEBPACK_IMPORTED_MODULE_6__pieces_right_l_piece__["a" /* default */](),
      5: new __WEBPACK_IMPORTED_MODULE_7__pieces_left_z_piece__["a" /* default */](),
      6: new __WEBPACK_IMPORTED_MODULE_8__pieces_right_z_piece__["a" /* default */](),
      7: new __WEBPACK_IMPORTED_MODULE_9__pieces_t_piece__["a" /* default */](),
    };
    const key = this.nextPieceBoard.nextPiece || this.generateRandomNumber();
    return pieces[key];
  }

  newCurrentPiece() {
    this.currentPiece = this.getPiece();
  }

  placePiece() {
    this.currentPiece.currentPositions.forEach((space) => {
      this.board.placePiece(space, this.currentPiece.symbol);
    });
  }

  removePiece() {
    this.currentPiece.currentPositions.forEach((space) => {
      this.display.removePiece(space);
      this.board.removePiece(space);
    });
    this.boardStage.update();
  }

  setAutoDrop() {
    if (this.continueGame) {
      this.autoDropId = setInterval(() => {
          this.downLogic();
      }, this.dropSpeed);
    }
  }

  AutoDropSpeed() {
    clearInterval(this.autoDropId);
    if (this.dropSpeed >= 100) {
      this.dropSpeed -= 10;
    }
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

  updateScore() {
      this.score = this.score + 1 + this.board.numberClearedRows * 10;
      this.displayScore();
      this.board.numberClearedRows = 0;
  }

  gameOver() {
    clearInterval(this.autoDropId);
    document.removeEventListener("keydown", this.keyPressCallBack);
    this.currentPiece = null;
    this.board.grid = this.board.generateGrid();
    this.boardStage.removeAllChildren();
    this.displayGameOverScreen();
    this.nextPieceBoard.resetGrid();
    this.nextPieceStage.removeAllChildren();
    this.display.displayGrid("nextPieceStage");
    this.dropSpeed = 700;
    this.resetScore();
    this.startButton.addEventListener("click", this.startButtonCallBack);
  }

  downLogic() {
    clearInterval(this.autoDropId);
    if (this.board.validDownMove(this.currentPiece.currentPositions)) {
      this.removePiece();
      this.currentPiece.moveDown();
      this.placePiece();
      this.renderPiece();
    } else {
      this.currentPiece = null;
      if (this.board.checkForFullRows()) {
        this.AutoDropSpeed();
        this.renderBoard();
      }

      this.newCurrentPiece();
      this.nextPieceBoard.nextPiece = this.generateRandomNumber();
      this.nextPieceBoard.update();
      this.nextPieceStage.update();
      this.nextPieceStage.removeAllChildren();
      this.display.displayGrid("nextPieceStage");

      if (this.checkGameOver()) {
        this.continueGame = false;
        this.gameOver();
      } else {
        this.placePiece();
        this.renderPiece();
      }

      if (this.continueGame) {
        this.updateScore();
      }
    }
    this.setAutoDrop();
  }

  renderBoard() {
    this.boardStage.removeAllChildren();
    this.display.displayGrid("boardStage");
  }

  renderPiece() {
    this.currentPiece.currentPositions.forEach((space) => {
      this.display.displayPiece(space);
    });
    this.boardStage.update();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__(1);


class Display {
  constructor(board, boardStage, nextPieceBoard, nextPieceStage) {
    this.board = board;
    this.boardStage = boardStage;
    this.nextPieceBoard = nextPieceBoard;
    this.nextPieceStage = nextPieceStage;
    this.squareSize = 25;
  }

  displayStartScreen(displayType) {
    var rectangle = new createjs.Shape();
    const numberRows = this.board.numberRows;
    const rowLength = this.board.rowLength;
    rectangle.graphics.beginFill('Black').drawRect(0, 0, rowLength * this.squareSize, numberRows * this.squareSize);
    this.boardStage.addChild(rectangle);
    const text = new createjs.Text("Press Enter to Begin", "22px Monaco", "#ffffff");
    text.x = 110;
    text.y = 200;
    this.boardStage.addChild(text);
    this.boardStage.update();
  }

  displayGameOverScreen(displayType) {
    var rectangle = new createjs.Shape();
    const numberRows = this.board.numberRows;
    const rowLength = this.board.rowLength;
    rectangle.graphics.beginFill('Black').drawRect(0, 0, rowLength * this.squareSize, numberRows * this.squareSize);
    this.boardStage.addChild(rectangle);
    const text = new createjs.Text("Press Enter to Play Again", "22px Monaco", "#ffffff");
    text.Align = 'center';
    const bounds = text.getBounds();
    text.x = 85;
    text.y = 200;
    this.boardStage.addChild(text);
    this.boardStage.update();
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

/* harmony default export */ __webpack_exports__["a"] = (Display);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(2);


document.addEventListener("DOMContentLoaded", () => {
  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */] ();
  game.pageLoadActions();
});


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class NextPieceBoard {
  constructor() {
    this.grid = [[null, null, null, null], [null, null, null, null]];
    this.numberRows = this.grid.length;
    this.rowLength = this.grid[0].length;
    this.nextPiece = null;
    this.pieces = {
      1: { symbol: "B",
           positions: [[0, 1], [0,2], [1,1], [1,2]]
         },
      2: { symbol: "S",
           positions: [[0,0], [0,1], [0,2], [0,3]]
         },
      3: { symbol: "LL",
           positions: [[0,0], [0,1], [1,0], [0,2]],
         },
      4: { symbol: "RL",
           positions: [[0,1], [0,0], [1,2], [0,2]],
         },
      5: { symbol: "LZ",
           positions: [[0,0], [0,1], [1,1],[1,2]],
         },
      6: { symbol: "RZ",
           positions: [[0,1], [0,2], [1,1], [1,0]]
         },
      7: { symbol: "T",
           positions: [[0,0], [0,2], [1,1], [0,1]]
         },
    };
  }

  resetGrid() {
    this.grid = [[null, null, null, null],[null, null, null, null]];
  }

  setPiece() {
    const nextPieceInfo = this.pieces[this.nextPiece];
    nextPieceInfo.positions.forEach((position) => {
      this.grid[position[0]][position[1]] = nextPieceInfo.symbol;
    });
  }

  update() {
    this.resetGrid();
    this.setPiece();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (NextPieceBoard);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(0);


class LeftLPiece extends __WEBPACK_IMPORTED_MODULE_0__piece__["a" /* default */] {
  constructor() {
    super({
      symbol: "LL",
      defaultPosition: [[0,6], [0,7], [1,6], [0,8]],
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (LeftLPiece);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(0);


class LeftZPiece extends __WEBPACK_IMPORTED_MODULE_0__piece__["a" /* default */] {
  constructor() {
    super({
      symbol: "LZ",
      defaultPosition: [[0,6], [0,7], [1,7],[1,8]],
    });
  }

}

/* harmony default export */ __webpack_exports__["a"] = (LeftZPiece);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(0);


class LinePiece extends __WEBPACK_IMPORTED_MODULE_0__piece__["a" /* default */] {
  constructor() {
    super({symbol: "S",
    defaultPosition: [[0,6], [0,7], [0,8], [0,9]],
    });
  }

}

/* harmony default export */ __webpack_exports__["a"] = (LinePiece);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(0);


class RightLPiece extends __WEBPACK_IMPORTED_MODULE_0__piece__["a" /* default */] {
  constructor() {
    super({
      symbol: "RL",
      defaultPosition: [[0,7], [0,6], [1,8], [0,8]],
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (RightLPiece);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(0);


class RightZPiece extends __WEBPACK_IMPORTED_MODULE_0__piece__["a" /* default */] {
  constructor() {
    super({
      symbol: "RZ",
      defaultPosition: [[0,7], [0,8], [1,7], [1,6]],
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (RightZPiece);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(0);


class StaticPieces extends __WEBPACK_IMPORTED_MODULE_0__piece__["a" /* default */] {
  constructor() {
    super({
      symbol: "B",
      defaultPosition: [[0, 7], [0,8], [1,7], [1,8]],
    });
  }

  rotatePiece() {

  }
}

/* harmony default export */ __webpack_exports__["a"] = (StaticPieces);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(0);


class TPiece extends __WEBPACK_IMPORTED_MODULE_0__piece__["a" /* default */] {
  constructor() {
    super({
      symbol: "T",
      defaultPosition: [[0,6], [0,8], [1,7], [0,7]],
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (TPiece);


/***/ })
/******/ ]);