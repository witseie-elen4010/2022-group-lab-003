# SPRINT 1 RETROSPECTIVE MEETING

DATE: 16 May 2022

# Minutes:

-  What was the initial goal for sprint 1?

-  Single user game where the player has 6 guesses to guess a word, thereafter are declared a winner or loser depending if they guessed the word correctly.

-  Sprint 1 was initially set to be due by Friday,13 May.

-  The node application needed to be deployed to Azure.

-  What was the actual outcome of sprint 1?

-  The game was displayed correctly. The web application has a game title, instructions, a 6x5 board where the user inputs the guesses and it also has a virtual keyboard containing the letters of the alphabet as well as an enter and delete button.

-  The game is playable where a player enters a word, the game notifies them if the word is invalid and not within the list. It also notifies them if they win or lose.

-  The due date of sprint 1 was changed to Sunday 15 May.

-  We experienced issues deploying to Azure which resulted in the postponement of the due date.

-  What were the reasons for sprint 1’s outcomes?

-  The due date was delayed due to bad time management as well as overly ambitious goals.

-  When integrating through github several merge conflicts arose which needed to be debugged.

-  The initial deployement to Azure was unsuccessful due to incorrect file paths which delayed the release of sprint 1.

-  As time went by, we started realizing that some of our individual project goals overlapped with others’ goals and had to integrate that with each other. With this there were some miscommunications as to who would do which overlaps in the code which resulted in minor duplications of code which were removed.

-  Loadshedding affected our communication and delayed our meetings which conributed to mistakes in our time management as well as the delay in completing sprint 1.

-  What could have been done to improve the sprint 1 release?

-  A database of words could have been used instead of a list of words.

-  The alert message could have been a popup message instead of a window alert.

-  Once enter is pressed and the word is invalid, the player should be allowed to delete the letters to enter a new valid word.

-  Using bootstrap library and incorporating more CSS.

-  An instruction button can be inserted on the page for more detailed instructions.

-  The about page should contain the release number.

-  It doesn't have a colour change to show which letters are in the chosen word after a guess

-  Can’t delete letters after pressing ENTER key since it goes to the next row

-  How did we work together as a team?

-  We worked well as a team but improvements can be made to increase efficiency.

# Retrospective

## What the team did well:

-  Majority of the goals set were achieved within the time of the sprint 1 deadline.

-  The game works as it was meant to according to what we had specified in the user stories for the 1st sprint.

-  All members made use of separate brunches for the user stories before merging into the master trunk.

-  All members had a change to review at least 1 pull request.

-  Task division was a success as everyone completed the issues they were assigned to.

## What went wrong:

-  The created game was quite simple.

-  The word list that was created was limited (not a database).

-  With regards to when issues/tasks overlap between developers, the communication needs to be more clear and concise.

-  There were no acceptance tests done on any of the functionality.

-  We created some stories as developers, however, were told to write them as users.

-  Time management was a failure as the sprint due date had to be postponed from Friday to Sunday.

## What could be improved:

-  Better time management.

-  Better communication amongst the team members

-  User stories that are made are written “As a player/user” instead of “As a developer”

-  Creating tests for each issue.

-  More features that are included in the original game must be added. This includes colouring of the guesses with yellow or green, if the letters are in the word and/or in the correct order, able to delete letters if a guess is an invalid word and an about page with buttons to navigate between pages.

## The approach for Sprint 2:

-  The USM is completed at the beginning of the sprint.

-  The screenshot of the scrum board is completed at the beginning of the sprint.

-  Split tasks/ issues evenly amongst team members.

-  Discuss details of each issue so that overlaps between code/tasks are clarified and understood.

-  Aim to integrate everyone’s individual tasks by Friday therefore leaving enough time to debug and troubleshoot before the 2nd release on Sunday, 22 May.

-  Complete end of sprint 2 documentation before the 2nd release (ADR, scrum board).

## Sprint velocity achieved for sprint 1:

-  Formula:

   Sum of all story points / no. of sprints
   = 1+6+4+4+9+4+9+2+2+21
   = 43
