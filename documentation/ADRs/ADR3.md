# ADR 3: Multi-Wordle Sprint 3, Inserting a login page, an options menu, implementing the multiplayer functionality and storing the login details into the database

## Context

In this sprint, a multiplayer functionality was implemented in addition to a single player game. When the player opens the website, they have to enter a username and password and only upon entering their details is the player allowed to access an options menu that opens when the player submits the form. The options menu lets the player choose between playing in single-player mode or in multiplayer mode. A database has been created using Azure SQL. Each player's login details and word that is played is stored in the database. Security has also been added to the game with regards to safeguarding the player's passwords and the database login details. Automated testing was completed using Playwright.                                    

## Decisions

We have decided to create a login page that accepts a player's username and password. The login form does not submit if the textbox fields are empty. Once the player enters their details and clicks on submit, the website opens up on the options menu. Here the player has to choose between playing a single-player game or a multiplayer game. After the player has made a selection by clicking on the desired button, they are sent to the corresponding game-mode. The player can now play in single-player mode as before or in multiplayer mode where they can view their opponents grids and masked guesses. 

The SQL database was set up using Azure and it is used to store the player's login details as well as the words they play. Security to the game was implemented by setting up the database with its login details masked and by using HASHBYTES in the SQL table to secure passwords. The 16-byte MD5 algorithm was used to implement hashing. 
                                                                                                  
Playwright and Jest were used to automate the tests for the game's functionality as it provides good support for end-to-end testing. The player now also has the option of either typing their guesses using their keyboard or by clicking on the on-screen keyboard. The game was designed using the Model View and Controller model, which is a design commonly used for controlling user interfaces, logic and data. This model allows us to separate the front end, logic and back end of the game.                            
<br>

## Status

Accepted <br>


## Consequences

There were issues when setting up and connecting to the database, and difficulties in sending the login form data to the database. These issues however, were resolved in time. There were also issues with testing and as a result Playwright were used to carry out automated testing. Most bugs were corrected in this sprint.       
