// FUNCTION: add the formatStringNicely function to String.prototype
String.prototype.formatStringNicely = function() {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase(); // this.charAt() is faster than this[0]
}

// FUNCTION: Get the name of a player, format that name, and greet the player
function greetPlayer(playerName){
  alert("Hi there, " + playerName + "!\n\nWould you like to play a game of Hangman?\n\n" + announceWordSelected(findCategory()));
}

function getName(){
  var name = prompt("Hi! What's your name?");
  if (name === ""){
    return "friend";
  } else {
    return name.formatStringNicely();
  }
}

// FUNCTION: Pick a word randomly from an array chosen at random
var capitals = ["rome", "seoul", "ankara", "paris", "athens", "london", "jakarta", "berlin", "helsinki", "stockholm"];
var morningBeverages = ["tea", "coffee", "water", "oj", "milk", "smoothie", "espresso"];
var aromatherapyScents =["rose", "huckleberry", "jasmine", "bergamont", "vanilla", "lavender", "hyssop", "orange"];
var defaultListArray = [capitals, morningBeverages, aromatherapyScents];

function pickWordList(listArray){
  return listArray[Math.floor(Math.random()* listArray.length)];
}
function pickWord(wordList){
  return wordList[Math.floor(Math.random()* wordList.length)];
}

// FUNCTION: inform player that word has been chosen and what the category is
function announceWordSelected(category){
  return "A random word containing " + selectedWord.length + " letters has been selected from the category " + category + ".";
}

function findCategory(){
  if (selectedList[0] === "rome"){
    return "CAPITALS";
  } else if (selectedList[0] === "tea") {
    return "MORNING BEVERAGES";
  } else {
    "YUMMY AROMATHERAPY SCENTS";
  }
}

// FUNCTION: Translate the selectedWord into blanks
function setupAnswerArray(){
  var answerArr = [];
  for (var i=0; i<selectedWord.length; i++){
    answerArr[i] = "_";
  }
  return answerArr;
}

// FUNCTION: Setting up a counter to show remaining letters within word
function remainingLetters(){ //counter re # of words to be guessed
  return selectedWord.length;
}

// FUNCTION: Show current state of answerArray
function showPlayerProgress(){
  return answerArray.join(" ");  //show player their progress by printing out current state of answerArray
}

// Game time! Code for actual game
function getGuess(){
  while (letterCounter > 0) {
    updateGameState();
    var guess = prompt("Guess a letter or type 'quit' to stop playing");
    if (guess === 'quit' || guess === null){
      alert("OK-let's play next time!");
      break;
    } else if (guess === '..'){
      alert (selectedWord.split(""));
    } else if (guess.length !== 1){
      alert("Please guess only one letter at a time!");
    } else {
      matchLetter(guess);
    }
  }
  endOfGameMessage();
}

//FUNCTION: iterates thru each letter of the selectedWord to see if guessed letter === selectedWord[i]
function matchLetter(guess){
  var notFound = true;
  for (var j=0; j<selectedWord.length; j++){
    if (selectedWord[j] === guess){
      notFound = false;
      answerArray[j] = guess;
      letterCounter--;
    }
  }
  if (notFound) {
    alert("The letter \'" + guess + "\' doesn't exist.");
  }
}

// FUNCTION: alert player of current game state
function updateGameState(){
  alert("Here's the current board: " + showPlayerProgress(answerArray)+ " You have " + letterCounter + " to go!");
}

// FUNCTION: alerts re status of the game after the game is over
function endOfGameMessage(){
  if (letterCounter === 0){
    showAnswerAndCongratulatePlayer(answerKey(selectedWord));
  } else {
    quitGameAndShowAnswer(answerKey(selectedWord));
  }
}

function answerKey(){
  return "The answer was \'" + selectedWord + "\'.";
}
function quitGameAndShowAnswer(revealanswerKey){
  alert(revealanswerKey + " Better luck next time! :D");
}
function showAnswerAndCongratulatePlayer(revealanswerKey){
  alert("Good game! " + revealanswerKey);
}

//**** START: PROGRAM CODE **** //
var selectedList = pickWordList(defaultListArray);
var selectedWord = pickWord(selectedList);
var answerArray = setupAnswerArray(selectedWord);
var letterCounter = remainingLetters();

greetPlayer(getName());
console.log("Value prior to getGuess(): " + selectedList + ", " + selectedWord + ", " + answerArray + ", " + letterCounter);
getGuess();
console.log("Value prior to getGuess(): " + selectedList + ", " + selectedWord + ", " + answerArray + ", " + letterCounter);
//**** END: PROGRAM CODE   **** //
