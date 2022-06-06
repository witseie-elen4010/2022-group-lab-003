## ADR4: Sprint 3, Improving the multiplayer functionality, changing the colours of the board, and adding players' moves to the database


## Context: 

The multiplayer functionality was improved upon by adding another options page that allows the player to decide between guessing a word with opponents or playing a game where one player submits the word to be guessed by the other players. In Multiplayer mode, the player's grid as well as the opponents grids are displayed. A keyboard is displayed for the player only. The player can view their opponents' masked guesses by looking at their grid and colour changes. A table was created in the database to store each players' moves.

## Decisions:

Multiplayer functionality was achieved using Socket.io. Socket.io allows webapp development in web sockets. In the Multiplayer mode, the player can choose between guessing a word with friends or choosing a word for their friends to guess. If a player chooses to play a game where everyone has to guess the word, they are each given different words to guess. Winning and losing notifications are sent to the respective players and they can view each others' progress in real time. 

Some colour changes were made to the game. A blue tile represents a correct letter, in the correct position while a pink tile represents a correct letter in the incorrect position. Incorrect letters remain grey. The game now ensures that an invalid word cannot be submitted. A separate table was created in the database to store players' usernames and moves. After each guess, the players' input is stored into the local storage and then retrieved from the local storage to be stored in the database.

## Status:

Accepted


## Consequences:

When a player wins in multiplayer mode, their opponents can keep playing the game until they run out of tries. The players' moves are not being stored on the database. 
