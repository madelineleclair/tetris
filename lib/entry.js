// this file will import the game module and begin the entry.
// tick will be used to make pieces move down probably


const Game = require("./game");

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
