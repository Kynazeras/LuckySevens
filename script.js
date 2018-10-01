// Variable to capture total number of rolls
var ticker = 0;
// Array to keep all amounts won
var money = [];
// Selecting the input field to be used in function later
var bet = document.getElementById("bet");
// Casting the value of the input as a number  for comparisons later
var betNum = Number(bet.value);
// Selecting the Play button to be used in a function later
var play = document.getElementById("play");

// Variables for the end game table
var tableDiv = document.getElementById("table-div");
var startBet = document.getElementById("startBet");
var totalRolls = document.getElementById("totalRolls");
var maxAmount = document.getElementById("maxAmount");
var maxAmountCount = document.getElementById("maxAmountCount");

// Variables for reset button and game over alert
var resetButton = document.getElementById("resetButton");
var gameOver = document.getElementById("gameOver");

// Function to generate a dice roll
function rollDice(numSides) {
  return Math.floor(Math.random() * numSides) + 1;
}

// Making sure a user can't press "Play!" if they haven't typed a number
if (bet.value == "") {
  play.disabled = true;
}

// Function that captures the starting bet as well as alerts the user that the bet can't be 0
bet.addEventListener("input", function() {
  betNum = Number(this.value);
  // checking if the bet is 0
  if (betNum === 0) {
    alert("Bet can't be zero");
    // resetting the value as to prevent an infinite loop
    this.value = "";
  }
  // enables the play button when a legitimate amount has been inputted
  play.disabled = false;
});

// function to play the game
function playGame() {
  // once the game has started, players cannot modify the input field
  bet.disabled = true;
  // while loop to play the game until money runs out
  while (betNum > 0) {
    // simulating two dice being rolled
    var dice = rollDice(6) + rollDice(6);
    if (betNum > 0) {
      if (dice === 7) {
        betNum += 4;
      } else {
        betNum -= 1;
      }
      // tracking the total amount or rolls
      ticker += 1;
      console.log(betNum);
      // adding all money amounts to an array to keep track of the maximum value
      money.push(betNum);
      // findinf the maximum amount or money won
      var max = Math.max(...money);
    }
  }
  console.log("Ticker: " + ticker);
  console.log("Max: " + max);

  // making the table appear on the DOM
  tableDiv.style = "";
  // setting the starting bet row in the table
  startBet.textContent = "$" + bet.value;
  // setting the total rolls row in the table
  totalRolls.textContent = ticker;
  // setting the maximum amount won in the table
  maxAmount.textContent = "$" + max;
  // setting the rolls at maximum amount won row in the table
  maxAmountCount.textContent = money.indexOf(max) + 1;
  // making the game over alert appear
  gameOver.style = "";
  // making the reset button appear
  resetButton.style = "";
  // taking away the play button
  play.style = "display:none;";
}

// Function to start the game over
function reset() {
  // setting all variables to empty
  amount = 0;
  ticker = 0;
  money = [];
  // taking way the table
  tableDiv.style = "display: none;";
  // taking away the reset button
  resetButton.style = "display: none;";
  // taking away the game over alert
  gameOver.style = "display: none;";
  // resetting the input field
  bet.value = "";
  // re-enabling the input field
  bet.disabled = false;
  // adding the play button back to the DOM
  play.style = "";
}

// Adding a listener on the reset button
resetButton.addEventListener("click", reset);

// Adding a listener for the play button
play.addEventListener("click", playGame);
