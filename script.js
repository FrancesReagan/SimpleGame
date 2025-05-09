
// //Step 1: Define an Object to Store Game Data
// //  Create an object called game to store properties such as the secret number and the maximum number of guesses.

// // Math.random() generates a random number between 0 and 1.

// // Therefore Math.random()*10 generates a random number between 0 and 10, and (Math.random()*10)+1 a number between 1 and 11.

// // Math.floor() drops the decimal of this number, and makes it an integer from 0 to 10.

// // You can see a sequential progression of the logic here

// let game = {
//   secretNumber: Math.floor(Math.random() * 10) + 1,
//   maxGuesses: 3,
//   currentGuesses: 0,
// };

// // Step 2: Write a Function to Handle User Guesses
// // Write a function called makeGuess that takes a guess as a parameter, compares it to the secret number, and 
// // returns appropriate messages based on whether the guess is correct, too high, or too low.

// function makeGuess(guess) {
//   game.currentGuesses++;
 
//   if (guess === game.secretNumber) {
//     return "Congratulations! You guessed the secret number.";
//   } else if (guess > game.secretNumber) {
//     return "Too high! Try again.";
//   } else {
//     return "Too low! Try again.";
//   }
// }

// // Step 3: Add Logic to Track Guesses
// // Modify the makeGuess function to check if the user has exceeded the maximum number of guesses and display a message when they do.
// function makeGuess(guess) {
//   if (game.currentGuesses >= game.maxGuesses) {
//     return "No more guesses left! Game over.";
//   }
 
//   game.currentGuesses++;
 
//   if (guess === game.secretNumber) {
//     return "Congratulations! You guessed the secret number.";
//   } else if (guess > game.secretNumber) {
//     return "Too high! Try again.";
//   } else {
//     return "Too low! Try again.";
//   }
// }

// // Step 4: Refactor
// // How might one turn the makeGuess function into a method of the game object? Do additional research if 
// // necessary, as is often the case in the workplace, and then complete this task.
// // answer below:

// Step 5: Create an Interface
// Once your game has been completed, build a simple HTML interface to interact with the game, and hook 
// the game’s information and methods into the interface. With any remaining time, style the game using CSS.

// Code given by Mod4lesson4 below
// let game = {
//   secretNumber: Math.floor(Math.random() * 10) + 1,
//   maxGuesses: 3,
//   currentGuesses: 0,
  
//   makeGuess: function(guess) {
//     if (this.currentGuesses >= this.maxGuesses) {
//       return "No more guesses left! Game over.";
//     }
    
//     this.currentGuesses++;
    
//     if (guess === this.secretNumber) {
//       return "Congratulations! You guessed the secret number.";
//     } else if (guess > this.secretNumber) {
//       return "Too high! Try again.";
//     } else {
//       return "Too low! Try again.";
//     }
//   }
// };

// Complete Game below
// Game object with method
        let game = {
            secretNumber: Math.floor(Math.random() * 10) + 1,
            maxGuesses: 3,
            currentGuesses: 0,
            guessHistory: [],
            
            makeGuess: function(guess) {
                if (this.currentGuesses >= this.maxGuesses) {
                    return {
                        message: "No more guesses left! The number was " + this.secretNumber,
                        status: "error",
                        gameOver: true
                    };
                }
                
                this.currentGuesses++;
                
                // Store guess history with result
                let result;
                if (guess === this.secretNumber) {
                    result = "correct";
                } else if (guess > this.secretNumber) {
                    result = "high";
                } else {
                    result = "low";
                }
                
                this.guessHistory.push({
                    number: guess,
                    result: result
                });
                
                // Return appropriate message
                if (guess === this.secretNumber) {
                    return {
                        message: "Congratulations! You guessed the secret number.",
                        status: "success",
                        gameOver: true
                    };
                } else if (guess > this.secretNumber) {
                    return {
                        message: "Too high! Try again.",
                        status: "hint",
                        gameOver: false
                    };
                } else {
                    return {
                        message: "Too low! Try again.",
                        status: "hint",
                        gameOver: false
                    };
                }
            },
            
            reset: function() {
                this.secretNumber = Math.floor(Math.random() * 10) + 1;
                this.currentGuesses = 0;
                this.guessHistory = [];
            }
        };
        
        // UI Elements
        const guessInput = document.getElementById('guess-input');
        const guessBtn = document.getElementById('guess-btn');
        const message = document.getElementById('message');
        const guessesLeft = document.getElementById('guesses-left');
        const guessHistory = document.getElementById('guess-history');
        const newGameBtn = document.getElementById('new-game-btn');
        
        // Update guesses left display
        function updateGuessesLeft() {
            const remaining = game.maxGuesses - game.currentGuesses;
            guessesLeft.textContent = `Guesses left: ${remaining}`;
        }
        
        // Update guess history display
        function updateGuessHistory() {
            guessHistory.innerHTML = '';
            
            if (game.guessHistory.length > 0) {
                game.guessHistory.forEach(guess => {
                    const guessItem = document.createElement('div');
                    guessItem.className = `guess-item ${guess.result} reveal`;
                    guessItem.textContent = guess.number;
                    guessHistory.appendChild(guessItem);
                });
            }
        }
        
        // Initialize the game
        function initGame() {
            updateGuessesLeft();
            message.textContent = '';
            message.className = 'message';
            guessHistory.innerHTML = '';
            guessInput.value = '';
            guessInput.focus();
            newGameBtn.classList.add('hidden');
            guessBtn.disabled = false;
            guessInput.disabled = false;
        }
        
        // Handle guess submission
        guessBtn.addEventListener('click', function() {
            const guess = parseInt(guessInput.value);
            
            // Validate input
            if (isNaN(guess) || guess < 1 || guess > 10) {
                message.textContent = 'Please enter a valid number between 1 and 10.';
                message.className = 'message error';
                return;
            }
            
            // Make guess
            const result = game.makeGuess(guess);
            
            // Update UI
            message.textContent = result.message;
            message.className = `message ${result.status}`;
            
            // Update guess history and remaining guesses
            updateGuessHistory();
            updateGuessesLeft();
            
            // Reset input
            guessInput.value = '';
            guessInput.focus();
            
            // Handle game over
            if (result.gameOver) {
                guessBtn.disabled = true;
                guessInput.disabled = true;
                newGameBtn.classList.remove('hidden');
            }
        });
        
        // Handle Enter key press
        guessInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                guessBtn.click();
            }
        });
        
        // Handle new game button
        newGameBtn.addEventListener('click', function() {
            game.reset();
            initGame();
        });
        
        // Initialize game on load
        initGame();
        