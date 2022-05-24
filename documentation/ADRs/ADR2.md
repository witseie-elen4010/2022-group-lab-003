
# ADR 2: Multi-Wordle Sprint 2, Enhancing the Single Player Game.

## Context

Enhancements were added to the existing single player game, using Bootstrap and by implementing additional   <br> 
functionalities such as changing the colour of the grid tiles based on the correct letter and position,      <br>
increasing the word list, displaying an alert/notification when the word inserted is invalid/ the incorrect  <br>
length or if it is not on the predefined list. Hyperlinks were added to the main game page to allow the user <br>
to switch to the about page and the instructions page.  <br>
<br>

## Decisions

We have decided to add the Bootstrap library and implement its functionality to improve the responsiveness and <br>
layout of the game. Functions were also created to change the colour of tiles based on another function that   <br>
checks if a letter is correct and in the right position. For this sprint, the tile for the letter that is correct <br>
and in the right position turns green. The tile for the letter that is correct but not in the right position turns <br>
yellow. The incorrect letters in a word turns grey. The number of words in the word list have also increased since <br>
the last sprint. <br>
<br>

An alert/notification appears based on the user input when a word is invalid, not 5 letters long, if it does not <br>
exist on the list and if the player wins or loses/runs out of guesses. Hyperlinks were added to the main game page <br>
to allow the user to go into the instructions page to view the instructions of the game and to view the about page <br>
to view the names of the authors of the game and the version of the game. There are also hyperlinks on the instructions <br>
and about pages to let the user return to the main game page. <br>
<br>

## Status

Accepted <br>

## Consequences

When adding Bootstrap, some functions/code had to be changed to ensure that they still perform as required. The alert <br>
functionality initially had bugs which were then fixed in this sprint. There was also an issue with all the tiles <br>
changing colour when the word was correct and the player wins. This bug was also corrected in this sprint. <br>
<br>