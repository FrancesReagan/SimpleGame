MOD4Lesson4 instructions to build SimpleGame

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

// Step 5: Create an Interface
// Once your game has been completed, build a simple HTML interface to interact with the game, and hook 
// the game’s information and methods into the interface. With any remaining time, style the game using CSS.
