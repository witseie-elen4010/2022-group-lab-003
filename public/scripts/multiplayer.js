'use strict'
// Importing list of 5 letter words
import { wordList } from './Wordlist.js'

function createWordleBoard1() {
  const board = document.getElementById('wordle-board1')
  // the board creation is the same as how a 2d array is created (nested-for loop).
  // first, the row is created and then each column in that row is made before moving to the next row.
  // the maximum number of tries that a player gets is 6 therefore the number of rows is 6.
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('div')
    row.className = 'row-part1'

    // the length of each word can only be 5 hence why only 5 columns are created before the next row.
    for (let j = 0; j < 5; j++) {
      const col = document.createElement('div')
      col.className = 'column-piece1'
      row.appendChild(col)
    }

    board.appendChild(row)
  }
}

function createWordleBoard2() {
    const board = document.getElementById('wordle-board2')
    // the board creation is the same as how a 2d array is created (nested-for loop).
    // first, the row is created and then each column in that row is made before moving to the next row.
    // the maximum number of tries that a player gets is 6 therefore the number of rows is 6.
    for (let i = 0; i < 6; i++) {
      const row = document.createElement('div')
      row.className = 'row-part2'
  
      // the length of each word can only be 5 hence why only 5 columns are created before the next row.
      for (let j = 0; j < 5; j++) {
        const col = document.createElement('div')
        col.className = 'column-piece2'
        row.appendChild(col)
      }
  
      board.appendChild(row)
    }
  }

  function createWordleBoard3() {
    const board = document.getElementById('wordle-board3')
    // the board creation is the same as how a 2d array is created (nested-for loop).
    // first, the row is created and then each column in that row is made before moving to the next row.
    // the maximum number of tries that a player gets is 6 therefore the number of rows is 6.
    for (let i = 0; i < 6; i++) {
      const row = document.createElement('div')
      row.className = 'row-part3'
  
      // the length of each word can only be 5 hence why only 5 columns are created before the next row.
      for (let j = 0; j < 5; j++) {
        const col = document.createElement('div')
        col.className = 'column-piece3'
        row.appendChild(col)
      }
  
      board.appendChild(row)
    }
  }

createWordleBoard1()
createWordleBoard2()
createWordleBoard3()
// Choosing a random word from the list
const len = wordList.length
const chosenWord = wordList[Math.floor(Math.random() * len)]

// keyboard CLICK input
let tries = 6 // number of words that player is allowed to guess
let guess = [] // contains the word that the player guesses
let nextLetter = 0 // keeps track of which letter we are on

document.getElementById('keyboard').addEventListener('click', (event) => {
  if (tries === 0) {
    return
  }

  const target = event.target
  // if the key that was clicked is not a keyboard button
  if (!target.classList.contains('keyboard-button')) {
    return
  }

  const key = target.textContent
  if (key === 'Del') {
    deleteLetter()
    return
  }

  if (key === 'Enter') {
    checkInput()
    return
  }

  // checking if the key is any of the alphabet
  const found = key.match(/[a-z]/gi)
  if (!found || found.length > 1) {
    // if none of the above or they pressed more than 1 key
  } else {
    insertLetter(key)
  }
})

function insertLetter (input) {
  if (nextLetter === 5) {
    return
  }
  input = input.toLowerCase()

  // gets the row of the current guess
  const row = document.getElementsByClassName('row-part1')[6 - tries]
  // getting the column for the current guess
  const box = row.children[nextLetter]

  // adding the letter to the column piece
  box.textContent = input
  box.classList.add('column-piece1') // adding current letter to guess
  guess.push(input) // adds 1 to number of letters in row
  nextLetter += 1
}

function deleteLetter () {
  if (nextLetter === 0) {
    // can't delete if there are no letters yet
    return
  }
  const row = document.getElementsByClassName('row-part1')[6 - tries]
  // gets the column for the previous letter guess
  const box = row.children[nextLetter - 1]
  box.textContent = ''
  box.classList.remove('column-piece1') // this removes the piece entirely
  box.classList.add('column-piece1') // need to replace it with a new blank piece
  guess.pop() // remove the letter from the guessed word
  nextLetter -= 1
}

function shadeKeyBoard (letter, _colour) {
  for (const elem of document.getElementsByClassName('keyboard-button')) {
    if (elem.textContent === letter) {
      const oldColour = elem.style.backgroundColour
      if (oldColour === 'green') {
        return
      }

      if (oldColour === 'yellow' && _colour !== 'green') {
        return
      }
      elem.style.backgroundColour = _colour
      break
    }
  }
}

function changeColour (row, correctInput) {
  for (let i = 0; i < 5; i++) {
    let letterColour = ''
    const box = row.children[i]
    const letter = guess[i]

    const letterPosition = correctInput.indexOf(guess[i])
    if (letterPosition === -1) {
      letterColour = 'grey'
    } else {
      if (guess[i] === correctInput[i]) {
        letterColour = 'green'
      } else {
        letterColour = 'yellow'
      }

      correctInput[letterPosition] = '#'
    }

    const delay = 250 * i
    setTimeout(() => {
      box.style.backgroundColor = letterColour
      shadeKeyBoard(letter, letterColour)
    }, delay)
  }
}

function checkInput() {
   const row = document.getElementsByClassName('row-part1')[6 - tries]
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
      changeColour(row, correctInput)
      tries -= 1
      guess = []
      nextLetter = 0

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
      return
   }
}
