'use strict'
// Importing list of 5 letter words
import { wordList } from './Wordlist.js'
function createWordleBoard() {
   const board = document.getElementById('wordle-board')
   // the board creation is the same as how a 2d array is created (nested-for loop).
   // first, the row is created and then each column in that row is made before moving to the next row.
   // the maximum number of tries that a player gets is 6 therefore the number of rows is 6.
   for (let i = 0; i < 6; i++) {
      const row = document.createElement('div')
      row.className = 'row-part'

      // the length of each word can only be 5 hence why only 5 columns are created before the next row.
      for (let j = 0; j < 5; j++) {
         const col = document.createElement('div')
         col.className = 'column-piece'
         row.appendChild(col)
      }

      board.appendChild(row)
   }
}

createWordleBoard()
// Choosing a random word from the list
const len = wordList.length
const chosenWord = wordList[Math.floor(Math.random() * len)]

// keyboard CLICK input
let tries = 6 // number of words that player is allowed to guess
let guess = [] // contains the word that the player guesses
let nextLetter = 0 // keeps track of which letter we are on

document.addEventListener('keyup', (event) => {
   if (tries === 0) {
      return
   }

   let keyInput = String(event.key)
   if (keyInput === 'Backspace' && nextLetter !== 0) {
      deleteLetter()
      return
   }

   if (keyInput === 'Enter') {
      checkInput()
      return 
   }

   let found = keyInput.match(/[a-z]/gi)
   if (!found || found.length > 1) {
      return
   } else {
      insertLetter(keyInput)
   }
})

document.getElementById('keyboard').addEventListener('click', (event) => {
   const target = event.target

   if (!target.classList.contains('keyboard-button')) {
      return
   }
   let key = target.textContent

   if (key === 'Del') {
      key = 'Backspace'
   }

   document.dispatchEvent(new KeyboardEvent('keyup', { key: key }))
})

function insertLetter(input) {
   if (nextLetter === 5) {
      return
   }
   input = input.toLowerCase()

   // gets the row of the current guess
   const row = document.getElementsByClassName('row-part')[6 - tries]
   // getting the column for the current guess
   const square = row.children[nextLetter]

   // adding the letter to the column piece
   square.textContent = input
   square.classList.add('column-piece') // adding current letter to guess
   guess.push(input) // adds 1 to number of letters in row
   nextLetter += 1
   
   //using sessionStorage to store user input
   sessionStorage.setItem('word', JSON.stringify(`${guess}`))
  // console.log(sessionStorage.getItem('word'))
}

function deleteLetter() {
   if (nextLetter === 0) {
      // can't delete if there are no letters yet
      return
   }
   const row = document.getElementsByClassName('row-part')[6 - tries]
   // gets the column for the previous letter guess
   const square = row.children[nextLetter - 1]

   square.textContent = ''
   square.classList.remove('column-piece') // this removes the piece entirely
   square.classList.add('column-piece') // need to replace it with a new blank piece
   guess.pop() // remove the letter from the guessed word
   nextLetter -= 1
}

function changeKeyboardColour(letter, _colour) {
   for (let elem of document.getElementsByClassName('keyboard-button')) {
      if (elem.textContent === letter) {
         const oldColour = window
            .getComputedStyle(elem)
            .getPropertyValue('background-color')
         console.log(oldColour)
         if (oldColour === 'blue') {
            return
         }

         if (oldColour === 'pink' && _colour !== 'blue') {
            return
         }
         elem.style.background = _colour
         break
      }
   }
}

function changeColour(row, correctInput) {
   for (let i = 0; i < 5; i++) {
      let letterColour = ''
      const square = row.children[i]
      const letter = guess[i]

      const letterPosition = correctInput.indexOf(guess[i])
      if (letterPosition === -1) {
         letterColour = 'grey'
      } else {
         if (guess[i] === correctInput[i]) {
            letterColour = 'blue'
         } else {
            letterColour = 'pink'
         }

         correctInput[letterPosition] = '#'
      }

      const delay = 150 * i
      setTimeout(() => {
         square.style.backgroundColor = letterColour
         changeKeyboardColour(letter, letterColour)
      }, delay)
   }
}

function checkInput() {
   const row = document.getElementsByClassName('row-part')[6 - tries]
   let inputString = ''
   const correctInput = Array.from(chosenWord)

   for (const val of guess) {
      inputString += val
   }

   if (inputString.length != 5) {
      alert('Invalid: The word must be 5 letters long.')
      return
   }

   if (
      !wordList.includes(inputString) &&
      inputString !== chosenWord &&
      tries > 1
   ) {
      alert('Invalid: the word is not on the list')
      return
   }

   if (
      wordList.includes(inputString) &&
      inputString !== chosenWord &&
      tries > 1
   ) {
      changeColour(row, correctInput)
      tries -= 1
      guess = []
      nextLetter = 0

      return
   }

   if (inputString === chosenWord) {
      alert('Correct! You win!')
      changeColour(row, correctInput)
      tries = 0
   } else {
      tries -= 1
      guess = []
      nextLetter = 0

      if (tries === 0) {
         alert('You lose. Guesses ran out.')
         alert(`Correct word: "${chosenWord}"`)
      }
   }
}

