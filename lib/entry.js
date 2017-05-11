// this file will import the game module and begin the entry.
// tick will be used to make pieces move down probably
import Game from "./game";

document.addEventListener("DOMContentLoaded", () => {
  // debugger
  const game = new Game ();
  game.pageLoadActions();
});
