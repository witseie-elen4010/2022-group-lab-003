'use strict'

let colourArray = []
let recieveNum = -1
let recieveCol = []
// keyboard CLICK input
let tries = 6 // number of words that player is allowed to guess
let guess = [] // contains the word that the player guesses
let nextLetter = 0 // keeps track of which letter we are on
let chosenWord = ''

const infoDisplay = document.querySelector('#info')
let playerNum = -1 // assume player 0 until told otherwise
let currentPlayer = 'opponent1'

// Creating board where player enters their inputs
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

// Creating the boards of the opponents
function createWordleBoard2 ( recieveNum, recieveCol) {
  const board = document.getElementById('wordle-board2')
  if(recieveNum === 1|| recieveNum === 0 || recieveNum === 2) {
  
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

// Functions for ensuring correct opponent boards are displayed on different pages
function creatingOppBoards(recieveNum ,recieveCol , currentPlayer) {
  
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
    
    // other players present
    socket.emit('check-players')
  }
})
const delay = 250 * 5
setTimeout(() => {
    console.log(playerNum)
    if (playerNum === 0 )
    {
      var inputWord= prompt("Please enter a five letter word");
      console.log(inputWord)
      socket.emit('ChosenWord', inputWord)
     
    }
}, delay)

socket.on('NewWord', chosenWord2 => {
  console.log('recieved broadcast word')
  console.log(chosenWord2)
  chosenWord = chosenWord2
  if (playerNum > 0){
      createWordleBoard1()
  }
  
  
  })

// another player has connected or disconnected
socket.on('player-connection', num => {
  playerConnectedOrDisconnected(num)
})

// listening for opponents inputs 
socket.on('IdentifyingPlayerColours', ({ playerNum1, colourArray1}) => {
  recieveNum = playerNum1
  recieveCol = colourArray1
  
  const delay = 250 * 5
  setTimeout(() => {
   // Drawing opponents boards
    creatingOppBoards(recieveNum,recieveCol, currentPlayer)
  }, delay)

  // recieving winner message 
  socket.on('Winner', playerNum => {
    console.log(`Player ${playerNum} is the winner`)
    // Alerting other players that they lost 
    console.log(currentPlayer)
    if (currentPlayer === 'opponent2' || currentPlayer === 'opponent3'){
      infoDisplay.innerHTML = 'You Lose!'
      alert('You Lose!')
}
  })


})

function playerConnectedOrDisconnected (num) { // looking for the class in html file
  const player = `.p${parseInt(num)}`
  document.querySelector(`${player} .connected span`).classList.toggle('green')

  if (parseInt(num) === playerNum) document.querySelector(player).style.fontWeight = 'bold'
}

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

function changeKeyboardColour(letter, _colour) {
  for (let elem of document.getElementsByClassName('keyboard-button')) {
     if (elem.textContent === letter) {
        const oldColour = window
           .getComputedStyle(elem)
           .getPropertyValue('background-color')
      
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

function changeColour (row, correctInput) {
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
        letterColour = 'blue'
        colourArray.push(letterColour)
      } else {
        letterColour = 'pink'
        colourArray.push(letterColour)
      }
      
      correctInput[letterPosition] = '#'
    }
    
    const delay = 250 * i
    setTimeout(() => {
      box.style.backgroundColor = letterColour
      changeKeyboardColour(letter, letterColour)
    }, delay)
  }

  return colourArray
  
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
    socket.emit('CheckWinner', playerNum)
    

    tries = 0
  } else {
    tries -= 1
    guess = []
    nextLetter = 0
    
    if (tries === 0) {
      changeColour(row, correctInput)
      socket.emit('IdentifyingPlayer',  { playerNum: playerNum, colourArray: colourArray })
      alert('You lose. Guesses ran out.')
      alert(`Correct word: "${chosenWord}"`)
      infoDisplay.innerHTML = 'You Lose!'
    }
  }
   
    
  }