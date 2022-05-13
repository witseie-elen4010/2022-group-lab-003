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

const wordList = ['abuse', 'above', 'after', 'basic', 'chest', 'dance', 'earth', 'filed', 'grant',
  'house', 'image', 'judge', 'knife', 'light', 'major', 'night', 'other', 'paper', 'phone', 'reply', 'scale',
  'table', 'uncle', 'value', 'waste', 'youth', 'world', 'truth', 'range', 'chief']

const len = wordList.length

const chosenWord = wordList[Math.floor(Math.random() * len)];