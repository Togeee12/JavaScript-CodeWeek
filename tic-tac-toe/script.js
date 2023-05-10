let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cells = document.querySelectorAll("td");
const message = document.getElementById("message");
const resetButton = document.createElement("button");
resetButton.textContent = "Reset";
resetButton.addEventListener("click", resetGame);
document.body.appendChild(resetButton);

function handleClick(e) {
  const cell = e.target;
  const index = Array.from(cells).indexOf(cell);

  if (board[index] === "") {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

cells.forEach((cell) => cell.addEventListener("click", handleClick));

function checkWinner() {
  let winner = null;

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      winner = board[a];
      break;
    }
  }

  if (winner) {
    message.textContent = `${winner} has won!`;
    cells.forEach((cell) => cell.removeEventListener("click", handleClick));
    document.body.appendChild(resetButton);
  } else if (!board.includes("")) {
    message.textContent = "It is a tie!";
    document.body.appendChild(resetButton);
  }
}

function resetGame() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.addEventListener("click", handleClick);
  });
  message.textContent = "";
  resetButton.remove();
}
