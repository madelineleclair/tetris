// this file will import the game module and begin the entry.
// tick will be used to make pieces move down probably
import Game from "./game";
// import StartScreen from 'start_screen.js';

document.addEventListener("DOMContentLoaded", () => {
    // const startScreen = new StartScreen ();

  const game = new Game ();
  game.pageLoadActions();
});
