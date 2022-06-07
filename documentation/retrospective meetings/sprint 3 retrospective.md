## Multi-Wordle Final Release 
- This release includes the final documentation for the Multi-Wordle game.
- This game has three modes to play in, namely: single-player, multiplayer, and choose word multiplayer.

### Single-player
- This mode allows for a normal single-player Wordle game.
- The colours of the board and the keyboard change depending on if the letter is within the chosen word. 
- The user cannot enter an invalid word and is notified with a popup message if the word is invalid. 

### Multiplayer
- Three players can play this game simultaneously. 
- It allows for three users to play the Wordle game while being able to track each other's progress through a display of their inputs. 
- Each player will have a different word to guess to prevent cheating. 
- The first person to guess the word correctly is declared a winner, however, the other players can continue guessing words after a winner is declared. 

### Multiplayer - Choose Word
- This is also a three-player game where one person chooses a word for the other two players to guess.
- Similar to the multiplayer game, the players can track each other's input through a live display. 
- The player who chooses the guessed word does not partake in the game, but they can see the progress of the other players.
- The first person to guess the word right is declared a winner. 

### Login 
- A player is able to login using a user name and password. 
- A validation check occurs to ensure the user name and password are valid before it gets stored in a database.
- The login button takes a user to the next page within the web application.

### Testing
- Testing was done using Jest and Playwright. 
- The testing covers the login page as well as the login validation.
- In the single-player mode it tests the functionality of the game. 
- The tests covers the buttons on the web pages.


