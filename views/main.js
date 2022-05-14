"use strict";

function createWordleBoard() {
   let board = document.getElementById("wordle-board");

   //the board creation is the same as how a 2d array is created (nested-for loop).
   //first, the row is created and then each column in that row is made before moving to the next row.
   //the maximum number of tries that a player gets is 6 therefore the number of rows is 6.
   for (let i = 0; i < 6; i++) {
      let row = document.createElement("div");
      row.className = "row";

      //the length of each word can only be 5 hence why only 5 columns are created before the next row.
      for (let j = 0; j < 5; j++) {
         let col = document.createElement("div");
         col.className = "column-piece";
         row.appendChild(col);
      }

      board.appendChild(row);
   }
}

createWordleBoard();

//keyboard CLICK input
let tries = 6 // number of words that player is allowed to guess
let guess = [] //contains the word that the player guesses
let nextLetter = 0 //keeps track of which letter we are on

document.getElementById("keyboard").addEventListener("click", (event) => {
   if (tries === 0) {
      return
   }
    
   const target = event.target
   //if the key that was clicked is not a keyboard button
   if (!target.classList.contains("keyboard-button")) {
      return
   }

   let key = target.textContent
   if (key === "Del") {
      deleteLetter()
      return
   }

   if (key === "Enter") {
      checkLength()
      return
   } 

   //checking if the key is any of the alphabet
   let found = key.match(/[a-z]/gi)
   if (!found || found.length > 1) {//if none of the above or they pressed more than 1 key
      return
   }
   else{
      insertLetter(key)
   }

})

function insertLetter (input) {
   if (nextLetter === 5) {
       return
   }
   input = input.toLowerCase()

   //gets the row of the current guess
   let row = document.getElementsByClassName("row")[6 - tries]
   //getting the column for the current guess
   let box = row.children[nextLetter]

   //adding the letter to the column piece 
   box.textContent = input
   box.classList.add("column-piece")//adding current letter to guess
   guess.push(input)//adds 1 to number of letters in row
   nextLetter += 1
}

function deleteLetter () {
   if (nextLetter === 0) {//can't delete if there are no letters yet
      return
   }
   let row = document.getElementsByClassName("row")[6 - tries]
   //gets the column for the previous letter guess
   let box = row.children[nextLetter - 1]
   box.textContent = ""
   box.classList.remove("column-piece")//this removes the piece entirely
   box.classList.add("column-piece")//need to replace it with a new blank piece
   guess.pop()//remove the letter from the guessed word
   nextLetter -= 1
}

function checkLength(){
   if (guess.length != 5){//checks the length of the array
      //does not allow player to do anything
      return
   }
}