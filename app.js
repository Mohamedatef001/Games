
        const game = document.querySelector('.game');
        const scoreDisplay = document.querySelector('.score');
        const overlay = document.querySelector('.overlay');

        let move = 20; // Move the snake 20px each time
        let snakeSegments = [{ x: 0, y: 0 }]; // Array to store all snake segments
        let direction = { x: 1, y: 0 }; // Moving to the right initially
        let growing = false; // Flag for when the snake eats something
        let food = { x: 100, y: 100 }; // Initial food position
        let score = 0; // Initial score
        let gameInterval = null; // To store the interval for moving the snake
        let gameStarted = false; // Flag to indicate if the game has started

        // Function to render the snake
        function renderSnake() {
            game.innerHTML = ''; // Clear the game area

            // Render each segment of the snake
            snakeSegments.forEach(segment => {
                const div = document.createElement('div');
                div.classList.add('snake-segment');
                div.style.left = `${segment.x}px`;
                div.style.top = `${segment.y}px`;
                game.appendChild(div);
            });

            // Render the food
            const foodDiv = document.createElement('div');
            foodDiv.classList.add('food');
            foodDiv.style.left = `${food.x}px`;
            foodDiv.style.top = `${food.y}px`;
            game.appendChild(foodDiv);
        }

        // Function to update the snake's position
        function moveSnake() {
            const newHead = {
                x: snakeSegments[0].x + direction.x * move,
                y: snakeSegments[0].y + direction.y * move
            };

            // Wrap the snake around if it hits the wall
            if (newHead.x < 0) {
                newHead.x = game.clientWidth - move;
            } else if (newHead.x >= game.clientWidth) {
                newHead.x = 0;
            }

            if (newHead.y < 0) {
                newHead.y = game.clientHeight - move;
            } else if (newHead.y >= game.clientHeight) {
                newHead.y = 0;
            }

            // Check if the snake collides with itself
            if (snakeSegments.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
                alert("Game Over! Final Score: " + score);
                resetGame();
                return;
            }

            // Add the new head to the front of the snake
            snakeSegments.unshift(newHead);

            // If the snake isn't growing, remove the last segment
            if (!growing) {
                snakeSegments.pop();
            } else {
                growing = false;
            }

            // Check if the snake eats the food
            if (newHead.x === food.x && newHead.y === food.y) {
                score++;
                scoreDisplay.textContent = "Score: " + score;
                growing = true;
                placeFood(); // Place new food
            }

            renderSnake();
        }

        // Function to handle direction change with arrow keys
        document.addEventListener('keydown', event => {
            if (!gameStarted && event.key === 'Enter') {
                startGame();
            }

            if (gameStarted) {
                switch (event.key) {
                    case "ArrowUp":
                        if (direction.y === 0) direction = { x: 0, y: -1 }; // Move up
                        break;
                    case "ArrowDown":
                        if (direction.y === 0) direction = { x: 0, y: 1 }; // Move down
                        break;
                    case "ArrowRight":
                        if (direction.x === 0) direction = { x: 1, y: 0 }; // Move right
                        break;
                    case "ArrowLeft":
                        if (direction.x === 0) direction = { x: -1, y: 0 }; // Move left
                        break;
                }
            }
        });

        // Function to randomly place food on the grid
        function placeFood() {
            food.x = Math.floor(Math.random() * (game.clientWidth / move)) * move;
            food.y = Math.floor(Math.random() * (game.clientHeight / move)) * move;
        }

        // Function to reset the game after game over
        function resetGame() {
            clearInterval(gameInterval);
            gameStarted = false;
            snakeSegments = [{ x: 0, y: 0 }]; // Reset snake to the initial size
            direction = { x: 1, y: 0 }; // Reset direction
            score = 0; // Reset score
            scoreDisplay.textContent = "Score: " + score;
            placeFood(); // Place food again
            overlay.style.display = 'block'; // Show the "Press Enter to Start" overlay
        }

        // Function to start the game
        function startGame() {
            overlay.style.display = 'none'; // Hide the overlay
            gameStarted = true;
            gameInterval = setInterval(moveSnake, 200); // Start moving the snake
        }

        // Initial setup
        overlay.style.display = 'block'; // Show the "Press Enter to Start" overlay
renderSnake();
        
// ---------------------------------------------------------------------------------------//

