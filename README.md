# Tetris

Tetris is a JavaScript game based upon the classic puzzle game. It is written using JavaScript, HTML, CSS, and Easel.js. Users move and rotate blocks to fill up a row. Once a row is filled, it is removed from the game. If a user reaches the top, the game is over. To play, load the link to the website and click the start button. Pieces will automatically be generated.

## Controls
* Up arrow key: rotate block
* Down arrow key: move block down
* Left arrow key: move block left
* Right arrow key: move block right

## Technical Features
  ### Board Rendering
  The Tetris board consists of a two dimensional array, which allows for a coordinate system to be used to keep track of a the location of the pieces. The array either contains a null value or a string. The JavaScript library Easel.js is used to render the board and pieces. For the initial render of the board, each row of the array is iterated over and the value of each position is checked. If the position is null, a black square of 25 pixels by 25 pixels is appended to the stage else a colored square is returned. Easel allows users to adjust the x and position of each element being appended to the stage. By modifying the x and y positions of each square being appended depending on its coordinates in the two dimensional array, the stage is given both depth and height.

```js
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
```

  ### Piece Movement
  All pieces consist of four connected positions in the two dimensional array serving as the grid. To provide fast insertion and deletion of pieces, each piece keeps track of its own position on the board. Pieces are constructed with two types of positions: a default position and a current position.
  ```js
  constructor(options) {
    this.symbol = options.symbol;
    this.defaultPosition = options.defaultPosition;
    this.currentPositions = this.defaultPosition;
  }
  ```
The default position is a hard coded position in the board that is used to render a piece's starting position at the top of the screen. Players can move pieces left, right, or down. Pieces also automatically fall to the bottom of the screen due to a set interval function. To create movement, when a player hits the appropriate key or the set interval function moves a piece down, the piece is removed from the board and its new position of each of its four squares is checked to see if they are valid.

```js
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
```

If each new position is valid, the piece's positions are incremented.
```js
moveLeft() {
  this.currentPositions.forEach((space) => {
    space[1] -= 1;
  });
}
```

 Finally, the piece's new positions are set in the two dimensional array and each of the piece's new positions are rendered on the board.  

```js
displayPiece(position) {
  var color = this.getColor([position[0], position[1]]);
  var rectangle = new createjs.Shape();
  rectangle.graphics.beginStroke('#000');
  rectangle.graphics.beginFill(color).drawRect(0, 0, this.squareSize, this.squareSize);
  rectangle.x = position[1] * this.squareSize;
  rectangle.y = position[0] * this.squareSize;
  this.stage.addChild(rectangle);
}
```

If the piece has reached the bottom of the board, a new piece is rendered at the top and the process begins again.

  ### Piece Rotation
A key feature of Tetris is the ability for users to rotate pieces. Rotation is achieve through two dimensional rotation by rotating each piece around a pivot, which is the third index each piece's current position array. Before each piece can be rotated, each new position must be checked to make sure that it is a valid position.

```js
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
```
If a position in the grid is occupied by another piece or any part of the rotated piece is off the board, the piece will not rotate. If all positions return as valid, the piece's currentPositions array is iterated over and each index is set to a new array that has been rotated 90 degrees from its previous position.

## Future Features
  * Score: Allow players to see their score for each line that is removed.
  * High score: Keep track of the player with the highest score.
  * Increasing speed: Make pieces drop faster depending on the length of time that they have been playing.
