
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
// 1. The Game Object
// The core of our game is the game object, which uses object-oriented principles to manage the game state:
        let game = {
            secretNumber: Math.floor(Math.random() * 10) + 1,
            maxGuesses: 3,
            currentGuesses: 0,
            guessHistory: [],
            
             // Logic for processing a guess
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
            // Logic for resetting the game
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
        

//         Javascript explained 
//         1. The Game Object
// The core of our game is the game object, which uses object-oriented principles to manage the game state:
// javascriptlet game = {
//     secretNumber: Math.floor(Math.random() * 10) + 1,
//     maxGuesses: 3,
//     currentGuesses: 0,
//     guessHistory: [],
    
//     makeGuess: function(guess) {
//         // Logic for processing a guess
//     },
    
//     reset: function() {
//         // Logic for resetting the game
//     }
// };
// This object has:

// Properties (data):

// secretNumber: The randomly generated number players try to guess (1-10)
// maxGuesses: The total guesses allowed (3)
// currentGuesses: How many guesses have been made so far
// guessHistory: An array that stores all previous guesses and results


// Methods (functions):

// makeGuess(): Processes a player's guess and returns the result
// reset(): Resets the game to its initial state



// 2. The makeGuess Method
// javascriptmakeGuess: function(guess) {
//     if (this.currentGuesses >= this.maxGuesses) {
//         return {
//             message: "No more guesses left! The number was " + this.secretNumber,
//             status: "error",
//             gameOver: true
//         };
//     }
    
//     this.currentGuesses++;
    
//     // Store guess history with result
//     let result;
//     if (guess === this.secretNumber) {
//         result = "correct";
//     } else if (guess > this.secretNumber) {
//         result = "high";
//     } else {
//         result = "low";
//     }
    
//     this.guessHistory.push({
//         number: guess,
//         result: result
//     });
    
//     // Return appropriate message
//     if (guess === this.secretNumber) {
//         return {
//             message: "Congratulations! You guessed the secret number.",
//             status: "success",
//             gameOver: true
//         };
//     } else if (guess > this.secretNumber) {
//         return {
//             message: "Too high! Try again.",
//             status: "hint",
//             gameOver: false
//         };
//     } else {
//         return {
//             message: "Too low! Try again.",
//             status: "hint",
//             gameOver: false
//         };
//     }
// }
// // This method:

// First checks if the player has already used all their guesses
// Increments the guess counter
// Determines if the guess is correct, too high, or too low
// Stores the guess and its result in the history
// Returns an object with:

// A message to display to the player
// A status for styling purposes ("success", "hint", or "error")
// A boolean indicating if the game is over



// 3. The reset Method
// javascriptreset: function() {
//     this.secretNumber = Math.floor(Math.random() * 10) + 1;
//     this.currentGuesses = 0;
//     this.guessHistory = [];
// }
// This method:

// Generates a new random secret number
// Resets the guess counter to zero
// Clears the guess history

// 4. The User Interface Setup
// javascript// UI Elements
// const guessInput = document.getElementById('guess-input');
// const guessBtn = document.getElementById('guess-btn');
// const message = document.getElementById('message');
// const guessesLeft = document.getElementById('guesses-left');
// const guessHistory = document.getElementById('guess-history');
// const newGameBtn = document.getElementById('new-game-btn');
// This section gets references to all the HTML elements we need to interact with.
// 5. Helper Functions
// javascript// Update guesses left display
// function updateGuessesLeft() {
//     const remaining = game.maxGuesses - game.currentGuesses;
//     guessesLeft.textContent = `Guesses left: ${remaining}`;
// }

// // Update guess history display
// function updateGuessHistory() {
//     guessHistory.innerHTML = '';
    
//     if (game.guessHistory.length > 0) {
//         game.guessHistory.forEach(guess => {
//             const guessItem = document.createElement('div');
//             guessItem.className = `guess-item ${guess.result} reveal`;
//             guessItem.textContent = guess.number;
//             guessHistory.appendChild(guessItem);
//         });
//     }
// }

// Initialize the game
// function initGame() {
//     updateGuessesLeft();
//     message.textContent = '';
//     message.className = 'message';
//     guessHistory.innerHTML = '';
//     guessInput.value = '';
//     guessInput.focus();
//     newGameBtn.classList.add('hidden');
//     guessBtn.disabled = false;
//     guessInput.disabled = false;
// }
// These functions handle:

// Updating the display of remaining guesses
// Refreshing the visual history of past guesses
// Setting up a new game by resetting all UI elements

// 6. Event Handlers
// javascript// Handle guess submission
// guessBtn.addEventListener('click', function() {
//     const guess = parseInt(guessInput.value);
    
//     // Validate input
//     if (isNaN(guess) || guess < 1 || guess > 10) {
//         message.textContent = 'Please enter a valid number between 1 and 10.';
//         message.className = 'message error';
//         return;
//     }
    
//     // Make guess
//     const result = game.makeGuess(guess);
    
//     // Update UI
//     message.textContent = result.message;
//     message.className = `message ${result.status}`;
    
//     // Update guess history and remaining guesses
//     updateGuessHistory();
//     updateGuessesLeft();
    
//     // Reset input
//     guessInput.value = '';
//     guessInput.focus();
    
//     // Handle game over
//     if (result.gameOver) {
//         guessBtn.disabled = true;
//         guessInput.disabled = true;
//         newGameBtn.classList.remove('hidden');
//     }
// });

// // Handle Enter key press
// guessInput.addEventListener('keypress', function(e) {
//     if (e.key === 'Enter') {
//         guessBtn.click();
//     }
// });

// // Handle new game button
// newGameBtn.addEventListener('click', function() {
//     game.reset();
//     initGame();
// });
// These event listeners:

// Process what happens when a player submits a guess:

// Validate the input
// Call the game's makeGuess method
// Update the UI based on the result
// Handle game over state if needed


// Allow the Enter key to submit a guess
// Reset the game when the "Play Again" button is clicked

// 7. Initialization
// javascript// Initialize game on load
// initGame();
// This calls the initGame function when the page loads to set up the initial game state.
// Key JavaScript Concepts Used

// Object-Oriented Programming

// The game logic is encapsulated in the game object
// Methods use this to refer to the object's own properties


// Event-Driven Programming

// The code responds to user actions through event listeners
// Different events (click, keypress) trigger appropriate responses


// DOM Manipulation

// Accessing elements with getElementById
// Modifying content with properties like textContent
// Adding/removing CSS classes to change styling
// Creating elements dynamically with createElement


// Conditional Logic

// Using if/else statements to determine game outcomes
// Validating user input before processing


// Function Organization

// Breaking code into smaller, focused functions
// Each function handles a specific task (single responsibility principle)



// How It All Fits Together

// When the page loads, initGame() sets up the initial state
// The player enters a number and clicks "Guess" (or presses Enter)
// The click event handler:

// Validates the input
// Calls game.makeGuess() with the player's guess
// Updates the UI based on the result


// If the game ends (win or lose), the UI changes to show the "Play Again" button
// Clicking "Play Again" calls game.reset() and initGame() to start over



// NOTES TO REMEMBER
// Remembering notes:
// PUSH
// The push method in this.guessHistory.push({}) is a fundamental JavaScript array method
//  that adds new items to the end of an array. Let me explain exactly what's happening in this specific line:
// javascriptthis.guessHistory.push({
//     number: guess,
//     result: result
// });
// Breaking it down:

// this.guessHistory refers to the array that's stored as a property of the game object.
// .push() is an array method that adds whatever is inside the parentheses to the end of the array.
// { number: guess, result: result } is creating a new object literal with two properties:

// number: stores the actual number the player guessed
// result: stores whether the guess was "correct", "high", or "low"



// What it accomplishes:
// This line adds a record of each guess to the game's history. For example, if the player guesses 7 and it's too high, this line
//  would add {number: 7, result: "high"} to the guessHistory array.
// After three guesses, the guessHistory array might look something like this:
// javascript[
//   {number: 5, result: "low"},
//   {number: 8, result: "high"},
//   {number: 7, result: "correct"}
// ]

// Why it's useful:

// Tracking: It keeps track of all guesses the player has made
// Display: It allows us to show the guess history in the UI (the colored circles)
// Game state: It provides a complete record of the game's progress

// The push method is one of the most common ways to add items to arrays in JavaScript. 
// It modifies the original array (rather than creating a new one) and returns the new length of the array.

// POP 
// While push adds to the end of an array, pop does the opposite - it removes the last element from an array.
// How pop() works:
// javascriptconst lastItem = myArray.pop();

// The pop() method removes the last element from an array
// It returns the element that was removed
// It modifies the original array (reducing its length by 1)
// If the array is empty, pop() returns undefined

// Example using our game:
// Let's say I wanted to add an "Undo" feature to my game that lets the player take back their last guess. I could implement it like this:
// javascriptfunction undoLastGuess() {
//     // Only undo if there are guesses to undo
//     if (game.guessHistory.length > 0) {
//         // Remove the last guess from history
//         const lastGuess = game.guessHistory.pop();
        
//         // Decrement the guess counter
//         game.currentGuesses--;
        
//         // Update the UI
//         updateGuessHistory();
//         updateGuessesLeft();
        
//         // Tell the player what happened
//         message.textContent = `Undid your guess of ${lastGuess.number}`;
        
//         // If game was over, re-enable inputs
//         guessBtn.disabled = false;
//         guessInput.disabled = false;
//         newGameBtn.classList.add('hidden');
        
//         return lastGuess; // Return the removed guess
//     }
//     return null; // Nothing to undo
// }

// Common array methods related to push and pop:
// JavaScript arrays have several methods for adding and removing elements:

// push(): Adds elements to the end of an array
// pop(): Removes an element from the end of an array
// unshift(): Adds elements to the beginning of an array
// shift(): Removes an element from the beginning of an array

// These methods are often described in terms of data structures:

// push and pop implement a "stack" (last in, first out)
// push and shift implement a "queue" (first in, first out)

// Example with all four methods:
// javascriptconst fruits = ["apple"];

// fruits.push("orange");    // Array is now ["apple", "orange"]
// fruits.unshift("banana"); // Array is now ["banana", "apple", "orange"]

// const lastFruit = fruits.pop();     // lastFruit = "orange", array is now ["banana", "apple"]
// const firstFruit = fruits.shift();  // firstFruit = "banana", array is now ["apple"]
// These methods are fundamental to manipulating arrays in JavaScript and are used extensively in many applications, especially when I need 
// to keep track of ordered collections of data, like this game's history of guesses.


// UNSHIFT
// To add to the beginning of an array in JavaScript, I use the unshift() method!
// How unshift() works:
// javascriptmyArray.unshift(newItem);

// The unshift() method adds one or more elements to the beginning of an array
// It returns the new length of the array
// It modifies the original array
// I can add multiple items at once: myArray.unshift(item1, item2, item3)

// Example with my game:
// Let's say I wanted to modify my game to prioritize the most recent guesses in my display (showing them first). I could use unshift() instead of push():
// javascript// Instead of:
// this.guessHistory.push({
//     number: guess,
//     result: result
// });

// // We could use:
// this.guessHistory.unshift({
//     number: guess,
//     result: result
// });
// Now the newest guesses would appear at the beginning of the array (index 0).
// Visual comparison of array methods:
// Original array: [🍎, 🍐, 🍊]

// push(🍌):    [🍎, 🍐, 🍊, 🍌]  // Adds to end
// pop():       [🍎, 🍐, 🍊]      // Removes from end
// unshift(🍓): [🍓, 🍎, 🍐, 🍊]  // Adds to beginning
// shift():     [🍎, 🍐, 🍊]      // Removes from beginning
// Performance consideration:
// One important thing to know is that unshift() can be slower than push() for large arrays. This is because 
// adding to the beginning requires shifting all existing elements to new positions, while adding to the end 
// only requires modifying one position.
// For small arrays like my game history, this performance difference is negligible, but it's good to keep in 
// mind for larger applications.
// Practical example of using unshift():
// If I  wanted to modify my game to show the most recent guess first in the UI, I could change two parts of my code:

// Change the storage method:

// javascriptthis.guessHistory.unshift({
//     number: guess,
//     result: result
// });

// Then in my updateGuessHistory function, I wouldn't need to change anything since it already iterates 
// through the array and displays each item:

// javascriptfunction updateGuessHistory() {
//     guessHistory.innerHTML = '';
    
//     if (game.guessHistory.length > 0) {
//         game.guessHistory.forEach(guess => {
//             const guessItem = document.createElement('div');
//             guessItem.className = `guess-item ${guess.result} reveal`;
//             guessItem.textContent = guess.number;
//             guessHistory.appendChild(guessItem);
//         });
//     }
// }
// Since I'm using forEach() to iterate through the array and display each guess, the newest guesses 
// (at the beginning of the array) would now appear first in the display.