# Game flow

## Modules defined

## Event listeners applied
- Start button
- SVG cells
- Reset button

## User clicks start
- If either name field is empty, the user is prompted to enter two names
- If both user entry fields are occupied:
### The user names are turned in to players via the player factory
- The first player is assigned to the value `playerTurn`
- They players each have a 'score' of 0
### The first player is underlined
- Look at `playerTurn` variable
- Remove underline class from `player2`
- Add underline class to `player1`
### The player turn variable in the game module is set to player1
### The start button and name entry fields are disabled
### The start button has the 'fade' class toggled on

## User clicks an SVG cell
- The `gameOver` variable is checked (`false`)
- The `playerTurn` variable is checked (`player1`)
- The SVG cell `data-column` and `data-row` values are sent to a function which puts a shape on that value of the game board (X if `player1`'s turn, O if `player2`'s turn)
- Update board from the game board object
- The current game board is sent to the `checkWinner` function

### The game ends
- the `gameOver` variable is alternated (`true`)
- If '9' squares are occupied, a 'tie' is declared
  - The entire board is greyed out
  - A message appears at the bottom saying 'tie'
- If `winner` comes back anything other than empty, there is a winner
  - The winning values are used to access the SVG grid squares
  - Their contents **only** are given a 'red' class
  - A function updates the winning player's score and returns their name and score
  - This name is added to an element at the bottom with ' wins!'
  - The winning player's score object at the bottom of the page is updated

### The game continues
- `checkWinner` doesn't return a winner or 9 squares full
- The `playerTurn` variable is alternated (`player2`)

## User clicks reset
- The entire SVG objects are given a 'fade' class
**AFTER A DELAY:**
- The game board object is made empty again
- All SVG cells are emptied of their contents
- The SVG grid lines are cloned
- The SVG grid lines are deleted
- The clones have their 'fade' class removed
- The clones are inserted