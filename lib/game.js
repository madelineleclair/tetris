import Display from "./display";
import Board from "./board";
import NextPieceBoard from "./next_piece_board";
import StaticPieces from "./pieces/static_pieces";
import LinePiece from "./pieces/line_piece";
import LeftLPiece from "./pieces/left_l_piece";
import RightLPiece from "./pieces/right_l_piece";
import LeftZPiece from "./pieces/left_z_piece";
import RightZPiece from "./pieces/right_z_piece";
import TPiece from "./pieces/t_piece";

class Game {
  constructor() {
    this.board = new Board ();
    this.nextPieceBoard = new NextPieceBoard ();
    this.boardStage = new createjs.Stage("canvas");
    this.nextPieceStage = new createjs.Stage("next-piece-canvas");
    this.display = new Display (this.board, this.boardStage, this.nextPieceBoard,
      this.nextPieceStage);
    this.score = 0;
    this.dropSpeed = 700;
    this.pause = false;
    this.keyPressCallBack = (e) => { this.keyPressCheck(e); };
    this.continueGame = true;
    this.scoreBoard = document.getElementById("score-container");
  }

  pageLoadActions() {
    this.renderBoard();
    this.display.displayGrid("nextPieceBoard");
    const startButton = document.getElementById("start-button");
    const pauseButton = document.getElementById("pause-button");
    startButton.addEventListener("click", (e) => this.startGame());
    pauseButton.addEventListener("click", e => this.pauseGame());
  }

  displayScore() {
    this.scoreBoard.innerHTML = `<p>${this.score}</p>`;
  }

  resetScore() {
    this.scoreBoard.innerHTML = '<p></p>';
  }

  startGame() {
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
        if (this.continueGame) {
          this.downLogic();
        }
          return;
      }
    }
    this.placePiece();
    this.renderPiece();
  }

  generateRandomNumber() {
    return Math.floor(Math.random() * (7 - 1 + 1)) + 1;
  }

  getPiece() {
    const pieces = {
      1: new StaticPieces(),
      2: new LinePiece(),
      3: new LeftLPiece(),
      4: new RightLPiece(),
      5: new LeftZPiece(),
      6: new RightZPiece(),
      7: new TPiece(),
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
    this.display.displayGrid("boardStage");
    this.nextPieceBoard.resetGrid();
    this.nextPieceStage.removeAllChildren();
    this.display.displayGrid("nextPieceStage");
    this.dropSpeed = 700;
    this.resetScore();
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

export default Game;
