## MVPS

Tetris is a game in which multicolored blocks fall from the top of the screen and accumulate at the bottom of the page. Players try to stack the blocks to make a complete row without any gaps. If a player reaches the top of the screen, he/she looses. Players will be able to:
  1. Start and reset the game
  2. Rotate the blocks to achieve different shapes
  3. See what block will come next
  4. View score

## Technologies and Libraries
  Tretris will be implemented using the following technologies:
  * JavaScript for game logic.
  * Canvis to draw the pieces and board
  * Webpack to bundle everything together

## File Structure
  In addition to an entry file for the HTML, there will also be four scripts:
  * board.js: This script will contain all of the logic needed for generating and updating the board. Functions will include generating and queuing pieces, removing filled rows, keeping track whether a row is filled or not,  
  * static_pieces.js: This script will contain the logic for pieces that do not rotate, such as blocks.
  * rotating_pieces.js: This script will contain the logic for pieces that rotate, such as z and L shaped pieces. A constant will keep track of the possible positions of each piece and a variable will keep track of the current position for the piece. When a player pressed the up key, the constant will add one to it, querying a new position for the piece and causing the screen to rerender.
  * game.js: This file will keep track of all the logic for the game, including a player's current score and whether a game is over or still continuing.

## Wireframes
  ##### Board
  ![board]

  #### Board with Model
  ![board_with_model]

## Implementation Timeline
** Day 1 ** : Complete setup of entry file and webpack file. Write board structure and begin learning canvis.
  - Have webpack up and running
  - Write logic for board, including checking if a row should be cleared, clearing rows, and adding pieces to row.
  - Generate static pieces using canvis

** Day 2 ** : Render board on screen and be able to control static pieces. Start setting up rotating piece logic.
  - Render a board and have static pieces appear on the board
  - Being making rotating pieces and have them appear on the board

** Day 3 ** : Set up game file logic and view next piece logic
  - Create start, and stop buttons
  - Create logic to have game end when pieces reach the top of the board
  - Set up logic to allow player to view upcoming pieces

** Day 4 ** : Style game page and add score
  - Style game using CSS to ensure an attractive design
  - Add a score so players can keep track of their progress

### Bonus Features
  1. Experience increasing difficulty due to increased speed of the blocks appearing
  2. Multiple levels
  3. High score across multiple players

  [board_with_model]: ./wireframes/board_with_model.png
  [board]: ./wireframes/tetris_board.png
