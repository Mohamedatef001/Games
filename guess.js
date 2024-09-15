let randomNumber = Math.floor(Math.random() * 100) + 1;  // Generate a random number between 1 and 100
let guessCount = 0;  // Keep track of the number of guesses
let gameActive = true;  // To prevent further guesses after the game is over

// Get elements from the HTML
const guessInput = document.getElementById('guessInput');
const submitGuessButton = document.getElementById('submitGuess');
const resetButton = document.getElementById('resetGame');
const message = document.getElementById('message');
const guessCountSpan = document.getElementById('guessCount');

// Handle the guess submission
submitGuessButton.addEventListener('click', () => {
  if (gameActive) {
    let userGuess = Number(guessInput.value);  // Get the user's guess
    guessCount++;  // Increase the guess count
    guessCountSpan.textContent = guessCount;  // Update the guess count on the page

    if (userGuess === randomNumber) {  // Check if the guess is correct
      message.textContent = `Congratulations! You guessed the number ${randomNumber} correctly in ${guessCount} attempts!`;
      gameActive = false;  // End the game
    } else if (userGuess < randomNumber) {
      message.textContent = "Too low! Try again.";
    } else if (userGuess > randomNumber) {
      message.textContent = "Too high! Try again.";
    }
  }
});

// Reset the game
resetButton.addEventListener('click', () => {
  randomNumber = Math.floor(Math.random() * 100) + 1;  // Generate a new random number
  guessCount = 0;  // Reset the guess count
  gameActive = true;  // Reactivate the game
  guessInput.value = '';  // Clear the input field
  message.textContent = '';  // Clear the message
  guessCountSpan.textContent = '0';  // Reset the guess count display
});
