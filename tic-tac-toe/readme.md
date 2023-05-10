# Tic-Tac-Toe

This is a simple Tic-Tac-Toe game implemented in JavaScript. The game allows two players to take turns marking squares in a 3x3 grid. The first player to get three of their marks in a row wins the game. If all squares are marked and no player has won, the game is a tie.

## Getting Started

To play the game, simply open the `index.html` file in a web browser. The game will appear in the browser window and you can start playing by clicking on any empty square. The game will automatically switch between players and detect when the game has ended.

## Features

- Two-player game
- Automatic detection of game end (win or tie)
- Reset button to start a new game

## Implementation

The game is implemented using vanilla JavaScript and HTML/CSS. The game board is represented as an array of strings, where each string is either `"X"`, `"O"`, or `""` (empty). The game logic is implemented using a `checkWinner` function that checks all possible winning combinations after each move. The game interface is updated using the `textContent` property of the DOM elements representing the game board and the game status.

## Contributing

This is a simple project that was created for educational purposes. Contributions are welcome, but please keep in mind that the scope of the project is intentionally limited.
