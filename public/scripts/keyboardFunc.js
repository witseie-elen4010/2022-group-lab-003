'use strict'

let guess = [] // contains the word that the player guesses
let nextLetter = 0 // keeps track of which letter we are on

function insertLetter(input) {
   if (nextLetter === 5) {
      return
   }
   input = input.toLowerCase()

   // gets the row of the current guess
   guess.push(input)
   nextLetter += 1
   return guess
}

function deleteLetter(guess) {
   if (nextLetter === 0) {
      // can't delete if there are no letters yet
      return
   }
   guess.pop() // remove the letter from the guessed word
   nextLetter -= 1
   return guess
}

module.exports = { insertLetter, deleteLetter }
