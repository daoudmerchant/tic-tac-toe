# Brief

To code a functional game of Tic Tac Toe, with player names and the ability to reset.

## Thoughts before beginning

I'm once again setting myself some specific 'long distance' goals to end up with a product which will hopefully be a little different from other Tic Tac Toe projects. Specifically:

- A 'hand-drawn' aesthetic with animated Os and Xs
- Visual indicators for winning icons rather than just a win state alert
- Minimalist design with advanced functionality

## Thoughts after completion

This was by far the most difficult project so far! What made it so difficult was the fact that for the first time I wasn't just asking 'how do I solve this problem' but 'how do I structure the code of the solution'. I understand completely why not to pollute the global scope; if it was a house it would be like making sure everything went in its correct box, drawer, cupboard. For my calculator, I was littering it with variables accessible everywhere, like emptying everything on the floor so I could just grab it when I needed. This time I really worked hard to put everything where it should be, but at one point I was completely stumped. Thus far, the course has shown many different ways to organise code and approach problems, but I'm still completely stumped by where exactly to put things. Do the scissors go in the desk drawer with the stationery, or in the kitchen where I'll need them far more frequently to open packaging? Even something as simple as wondering where to put my event listeners, I just have absolutely no idea about best practice. On the one hand it makes sense to keep them together for maintenance, on the other it makes sense to put them only where they're needed. As such, I've done a little of both in this exercise, putting some functions only within the scope they'll be used and others more accessible if I feel they might be required elsewhere were this project to develop.

The main thinking behind the organisation of code was modules and namespacing: for all a professional might have to say about how I could have better organised my code, I've only introduced 4 names globally: `gameBoard`, `players`, `game` and (in a variable which could probably be distributed across the other three) `domElements`. I don't know if it was correct, but any variable inside one necessary to be accessed by another module had its own return function (e.g. `game.turn`), meaning that most functions were in fact accessible globally but only in a namespaced 'directory' fashion. Whether this is good practice or not I am looking forward to learning.

I am aware of the following flaws in the design:

- More could be done to 'smarten' the appearance while maintaining the minimalist aesthetic
- The design is currently not responsive, but as explained, the time went elsewhere in the code
- I'm aware that disabling inputs to turn them in to displays is probably an accessibility nightmare, but I thought that a) performance-wise it would be quicker and more elegant than deleting each input and instantly replacing it with an inserted element with the same text content and b) for all my inputs I like that they could always have their 'disabled' state toggled off, for example to put in new player names.

I am, however, proud of the following achievements/details:

- Simple animated inline SVG was still quite a challenge.
- By having the game board stored as an array of objects with numerical row references (array indexes) and alphabetical column references (object properties), I created more work for myself than by doing both numerically but I think it's extremely readable as a result. Were this to be scaled to a large grid, I imagine developers would prefer 'row 14 column m' than 'row 14 column 13'.
- **My win state algorithm is ready to go for grids up to 26x26 (properties a-z)!**
- Winning icons appear in red, **including** simultaneous winning icons (e.g. horizontal and diagonal completed by a corner symbol).
- The first player for each new game is the alternate player in the event of ties or restarted games, or the loser in the event of win states.
- Aspects are built in to the code (e.g. score properties for players, symbols always treated as `"X"` or `"O"` strings instead of booleans) to prepare for hypothetical future functionality.

## Areas for improvement

### Knowledge of best practice

Now that I'm aware of the principles and techniques of organised code, I really need to get stuck in to some articles explaining common scoping practices and example perfectly organised code.

### Planning

Part of the reason I ended up stumped was because I'd written pseudo code before starting but should have really diagrammed out the entire JS before beginning to know what goes where. I did subsequently (picture not included because it ended up a complete mess) but it was far easier to drag a box around a picture than to know exactly which function block to cut and paste nearer the code required to access it.

### Code chronology

Function declarations, being hoistable, are not necessarily declared where other developers would most like to see them. Again, more research on best practices needed.

### SVG / Animations

This was really just dipping my toe in the water of SVG graphics and CSS animation. This warrants a deep dive later on, probably for a portfolio project.

## Lessons learned

### Plan visually

Pseudo code is great, but I'm such a visual learner that I need a diagram more than a shopping list.

### Many more lessons to learn regarding best practice!