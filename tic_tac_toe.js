let currentPlayer = "X";  // Player is 'X', computer is 'O'
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];  // The game board
let scoreX = 0;  // Player score
let scoreO = 0;  // Computer score

// Get the elements from the HTML
const cells = document.querySelectorAll('.board');  // The grid cells
const resultDiv = document.getElementById('result');  // To display the result
const startButton = document.getElementById('start');  // Start button
const resetButton = document.getElementById('reset');  // Reset button

// Define the winning combinations
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Horizontal lines
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Vertical lines
  [0, 4, 8], [2, 4, 6]  // Diagonals
];

// Handle player's move
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (gameActive && !cell.textContent && currentPlayer === "X") {  // If cell is empty and game is active
      board[index] = "X";  // Mark the cell with 'X'
      cell.textContent = "X";  // Show 'X' in the cell
      checkWinner();  // Check if player won
      currentPlayer = "O";  // Switch to computer's turn
      if (gameActive) {
        setTimeout(computerMove, 500);  // Delay for computer's move
      }
    }
  });
});

// Computer's move (randomly selects an empty cell)
function computerMove() {
  let emptyCells = board.map((value, index) => value === "" ? index : null).filter(val => val !== null);

  if (emptyCells.length > 0) {
    let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomCell] = "O";  // Mark 'O' on the board
    cells[randomCell].textContent = "O";  // Show 'O' in the grid
    checkWinner();  // Check if computer won
    currentPlayer = "X";  // Switch back to the player
  }
}

// Check if there is a winner
function checkWinner() {
  for (let combo of winningCombinations) {
    let [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {  // If all three cells match
      gameActive = false;  // Stop the game
      if (currentPlayer === "X") {
        scoreX++;  // Increment player score
      } else {
        scoreO++;  // Increment computer score
      }
      if (scoreO > scoreX) {
       
        resultDiv.classList.add('computerWin');
        resultDiv.textContent = `Player ${currentPlayer} wins! Score: X = ${scoreX}, O = ${scoreO}`;  // Show the result

      } else {
        
        resultDiv.classList.add('playerWin');
        resultDiv.textContent = `Player ${currentPlayer} wins! Score: X = ${scoreX}, O = ${scoreO}`;  // Show the result

      }
      return;
    }
  }
  if (!board.includes("")) {  // If no empty cells, it's a tie
    gameActive = false;
    resultDiv.textContent = "It's a tie!";
  }
}

// Reset the game
resetButton.addEventListener('click', () => {
  board = ["", "", "", "", "", "", "", "", ""];  // Clear the board
  cells.forEach(cell => cell.textContent = "");  // Clear the grid
  scoreX = 0;  // Player score
  scoreO = 0;  // Computer score 
  gameActive = true;  // Game is active again
  resultDiv.textContent = "";  // Clear the result
  currentPlayer = "X";  // Player starts first
});

// Start a new game (keep scores)
startButton.addEventListener('click', () => {
  board = ["", "", "", "", "", "", "", "", ""];  // Clear the board
  cells.forEach(cell => cell.textContent = "");  // Clear the grid
  gameActive = true;  // Game is active
  currentPlayer = "X";  // Player always starts first
});
