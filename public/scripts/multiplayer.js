'use strict'
// Importing list of 5 letter words
import { wordList } from './Wordlist.js'
// Choosing a random word from the list
const len = wordList.length
const chosenWord = wordList[Math.floor(Math.random() * len)]
let colourArray = []
let recieveNum = -1
let recieveCol = []
// keyboard CLICK input
let tries = 6 // number of words that player is allowed to guess
let guess = [] // contains the word that the player guesses
let nextLetter = 0 // keeps track of which letter we are on


const infoDisplay = document.querySelector('#info')
const multiplayerButton = document.querySelector('#linkButton2')
let playerNum = 0 // assume player 0 until told otherwise
let currentPlayer = 'opponent1'

function createWordleBoard1 () {
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
createWordleBoard1()

function createWordleBoard2 ( recieveNum, recieveCol) {
  const board = document.getElementById('wordle-board2')
  if(recieveNum === 1|| recieveNum === 0 || recieveNum === 2) {
    console.log('draw board 2')
      const row = document.createElement('div')
      row.className = 'row-part2'
      for (let j = 0; j < 5; j++) {
        
        const col = document.createElement('div')
        col.className = 'column-piece2'
        row.appendChild(col)
        const delay = 250 * j
        setTimeout(() => {
        row.children[j].style.backgroundColor = recieveCol[j]        
        }, delay)
      }
      board.appendChild(row)
  }
}

function createWordleBoard3 ( recieveNum, recieveCol) {
  const board = document.getElementById('wordle-board3')
  if(recieveNum === 1|| recieveNum === 2) {
    console.log('draw board 3')
      const row = document.createElement('div')
      row.className = 'row-part3'
      for (let j = 0; j < 5; j++) {
        
        const col = document.createElement('div')
        col.className = 'column-piece3'
        row.appendChild(col)
        const delay = 250 * j
        setTimeout(() => {
        row.children[j].style.backgroundColor = recieveCol[j]             
        }, delay)
      }
      board.appendChild(row)
}
}

function creatingOppBoards(recieveNum ,recieveCol , currentPlayer) {
  console.log('in opp board')
  console.log(recieveNum)
  if (currentPlayer === 'opponent1')
  {
    if(recieveNum === 1) {
      createWordleBoard2(recieveNum,recieveCol)
    }
    if(recieveNum === 2) {
      createWordleBoard3(recieveNum,recieveCol)
    }
  }

  if (currentPlayer === 'opponent2')
  {
    if(recieveNum === 0) {
      createWordleBoard2(recieveNum,recieveCol)
    }
    if(recieveNum === 2) {
      createWordleBoard3(recieveNum,recieveCol)
    }
  }

  if (currentPlayer === 'opponent3')
  {
    if(recieveNum === 0) {
      createWordleBoard2(recieveNum,recieveCol)
    }
    if(recieveNum === 1) {
      createWordleBoard3(recieveNum,recieveCol)
    }
  }

}


const socket = io()

// get player number
socket.on('player-number', num => {
  if (num === -1) {
    infoDisplay.innerHTML = 'Sorry the server is full. Please play in single player mode'
  } else {
    playerNum = parseInt(num) // data transmitted is a string
    if (playerNum === 1) {
      currentPlayer = 'opponent2'
    } else if (playerNum === 2) {
      currentPlayer = 'opponent3'
    }
    console.log(playerNum)
    // other players present
    socket.emit('check-players')
  }
})

// another player has connected or disconnected
socket.on('player-connection', num => {
  playerConnectedOrDisconnected(num)
  console.log(`Player number ${num} has connected/disconnected`)
})

// listening for opponents inputs 
socket.on('IdentifyingPlayerColours', ({ playerNum1, colourArray1}) => {
  console.log('i am listening')
  recieveNum = playerNum1
  recieveCol = colourArray1
  console.log(recieveNum,recieveCol)
  const delay = 250 * 5
  setTimeout(() => {
    console.log(currentPlayer)
    creatingOppBoards(recieveNum,recieveCol, currentPlayer)

  }, delay)

  // recieving winner message 
  socket.on('Winner', playerNum => {
    console.log(`Player ${playerNum} is the winner`)
    infoDisplay.innerHTML = 'You Lose!'
    alert('You Lose!')

  })

  
 // createWordleBoard2(recieveNum, recieveCol)
})

function playerConnectedOrDisconnected (num) { // looking for the class in html file
  const player = `.p${parseInt(num)}`
  document.querySelector(`${player} .connected span`).classList.toggle('green')

  if (parseInt(num) === playerNum) document.querySelector(player).style.fontWeight = 'bold'
}

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
  console.log('in change colour')
  colourArray = []
  for (let i = 0; i < 5; i++) {
    let letterColour = ''
    const box = row.children[i]
    const letter = guess[i]
    

    const letterPosition = correctInput.indexOf(guess[i])
    
    if (letterPosition === -1) {
      letterColour = 'grey'
      colourArray.push(letterColour)
    } else {
      if (guess[i] === correctInput[i]) {
        letterColour = 'green'
        colourArray.push(letterColour)
      } else {
        letterColour = 'yellow'
        colourArray.push(letterColour)
      }
      
      correctInput[letterPosition] = '#'
    }
    
    const delay = 250 * i
    setTimeout(() => {
      box.style.backgroundColor = letterColour
      shadeKeyBoard(letter, letterColour)
    }, delay)
    
  }

  return colourArray
  
}

function checkInput () {
  console.log('checkinput')
  const row = document.getElementsByClassName('row-part1')[6 - tries]
  let inputString = ''
  const correctInput = Array.from(chosenWord)
 console.log('chosen word')
 console.log(chosenWord)
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
    socket.emit('IdentifyingPlayer',  { playerNum: playerNum, colourArray: colourArray })
    tries -= 1
    guess = []
    nextLetter = 0

   
    return
  }

  if (inputString === chosenWord) {
    alert('Correct! You win!')
    changeColour(row, correctInput)
    socket.emit('IdentifyingPlayer',  { playerNum: playerNum, colourArray: colourArray })
    console.log("after change colour")
    socket.emit('CheckWinner', playerNum)
    

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
 
