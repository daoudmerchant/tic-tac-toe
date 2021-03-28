const gameBoard = (function() {
    let _board = [
        {"a": null, "b": null, "c": null },
        {"a": null, "b": null, "c": null },
        {"a": null, "b": null, "c": null }
    ];
    function updateAndGet(turn, row, col) {
        _board[row][col] = (turn === 1) ? "X" : "O";
        return _board
    }
    function resetBoard() {
        _board = [
            {"a": null, "b": null, "c": null },
            {"a": null, "b": null, "c": null },
            {"a": null, "b": null, "c": null }
        ]
    };
    return { updateAndGet, resetBoard }
})();

const players = (function() {

    let _player1, _player2;
    const getPlayer1 = () => _player1;
    const getPlayer2 = () => _player2;
    const player1entry = document.querySelector("#player1name");
    const player2entry = document.querySelector("#player2name");

    function makePlayer(name, number) {
        const symbol = (number === 1) ? "X" : "O";
        return { name, number, symbol, score: 0 }
    }

    function setPlayers() {
        if (!player1entry.value || !player2entry.value) {
            return false;
        } else {
            _player1 = makePlayer(player1entry.value, 1);
            _player2 = makePlayer(player2entry, 2);
            return true;
        }
    };

    function underline() {
        function removeUnderline(...players) {
            players.forEach(player => {
                player.classList.remove("underline");
                player.classList.remove("winner");
            });
        };
        removeUnderline(player1entry, player2entry);
        if (game.turn() === 1) {
            player1entry.classList.add("underline");
        } else if (game.turn() === 2) { // adaptable for 2+ players
            player2entry.classList.add("underline");
        };
    }

    function underlineWinnerRed() {
        if (game.turn() === 1) {
            player1entry.classList.add("winner");
        } else if (game.turn() === 2) {
            player2entry.classList.add("winner");
        }
    }

    return { setPlayers, underline, underlineWinnerRed, getPlayer1, getPlayer2 }
})();

const game = (function() {

    let _firstPlayer;
    let _playerTurn = 1;
    const turn = () => _playerTurn;
    let _gameOver = true;
    const _gridCells = document.querySelectorAll(".svgCell");
    _gridCells.forEach(gridCell => {
        gridCell.addEventListener('click', takeTurn)
    });

    function start() {
        if (players.setPlayers()) {
            console.log("Players set");
            domElements.fade(this);
            players.underline();
            _gameOver = false;
            _firstPlayer = 2;
        }
    };
    
    function showGameBoard(gameboard) {
        _gridCells.forEach(cell => {
            let cellValue = gameboard[cell.dataset.row][cell.dataset.column];
            console.log(cellValue);
            drawShape(cellValue, cell);
        })
    }
    
    function drawShape(symbol, cell) {
        if (cell.firstElementChild) { return };
        
        const cellPixels = 200; // derive from DOM?
        
        function setAttributes(element, attributes) {
            for (let property in attributes) {
                element.setAttribute(property, attributes[property]);
            }
        };

        function makeAttributeObj(px) {
            return [
                {
                    class: "crossline topleft",
                    x1: 30,
                    y1: 30,
                    x2: (px - 30),
                    y2: (px - 30),
                },
                {
                    class: "crossline topright",
                    x1: (px - 30),
                    y1: 30,
                    x2: 30,
                    y2: (px - 30),
                },
                {
                    cx: (px / 2),
                    cy: (px / 2),
                    r: (px / 2 - 30),
                    transform: `rotate(-90 ${px / 2} ${px / 2})`
                }
            ]
        };

        if (symbol === "X") {
            
            const diagonal1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
            const diagonal1attributes = makeAttributeObj(cellPixels)[0];
            setAttributes(diagonal1, diagonal1attributes);
            
            const diagonal2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
            const diagonal2attributes = makeAttributeObj(cellPixels)[1];
            setAttributes(diagonal2, diagonal2attributes);
            
            cell.appendChild(diagonal1);
            cell.appendChild(diagonal2);

        } else if (symbol === "O") {

            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            const circleAttributes = makeAttributeObj(cellPixels)[2];
            setAttributes(circle, circleAttributes);
            
            cell.appendChild(circle);
        }
    };

    function takeTurn() {
        if ((_gameOver) || (this.firstElementChild)) { return };
        const currentBoard = gameBoard.updateAndGet(_playerTurn, this.dataset.row, this.dataset.column);
        showGameBoard(currentBoard);
        const currentState = checkBoardState(currentBoard);
        if (!currentState) {
            _playerTurn = (_playerTurn === 1) ? 2 : 1;
            players.underline();
        } else {

            function showWinningLines() {
                if (currentState === "tie") {
                    _gameOver = true;
                    const graphics = document.querySelectorAll("svg");
                    graphics.forEach(graphic => domElements.greyOut(graphic));
                } else { // win state
                    _gameOver = true;
                    const aCode = 61;
                    const lastCode = aCode + Math.sqrt(_gridCells.length) - 1;
                    function redden(...lines) {
                        lines.forEach(line => line.classList.add("redden"));
                    }
                    if (currentState.hasOwnProperty("diagL")) {
                        _gridCells.forEach(gridCell => {
                            const colUnicode = aCode + Number(gridCell.dataset.row);
                            const col = String.fromCodePoint(`0x00${colUnicode}`);
                            console.log("Col: " + col);
                            if (col === gridCell.dataset.column) {
                                redden(gridCell.firstChild, gridCell.lastChild);
                            };
                        });
                    };
                    if (currentState.hasOwnProperty("diagR")) {
                        _gridCells.forEach(gridCell => {
                            const colUnicode = lastCode - Number(gridCell.dataset.row);
                            const col = String.fromCodePoint(`0x00${colUnicode}`);
                            console.log("Col: " + col);
                            if (col === gridCell.dataset.column) {
                                redden(gridCell.firstChild, gridCell.lastChild);
                            };
                        });
                    };
                    for (let winner in currentState) {
                        if (/Row/.test(winner)) {
                            _gridCells.forEach(gridCell => {
                                if (winner.charAt(0) === gridCell.dataset.row) {
                                    redden(gridCell.firstChild, gridCell.lastChild);
                                };
                            });
                        };
                    };
                    for (let winner in currentState) {
                        if (/Col/.test(winner)) {
                            _gridCells.forEach(gridCell => {
                                if (winner.charAt(0) === gridCell.dataset.column) {
                                    redden(gridCell.firstChild, gridCell.lastChild);
                                };
                            });
                        };
                    };
                    players.underlineWinnerRed();
                }
            }
            showWinningLines();
            _firstPlayer = (_playerTurn === 1) ? 2 : 1;
        }
    };

    function checkBoardState(gameboard) {
        let aCol = "", bCol = "", cCol = "",
            diagL = "", diagR = "",
            filledSquares = 0,
            gameState = null;
        const checkedVerticals = { aCol, bCol, cCol, diagL, diagR };
        gameboard.forEach((row, i) => {
            // check rows
            if ((row.a !== null) && (row.a === row.b && row.b === row.c)) {
                const rowProp = `${i}Row`;
                gameState = {};
                gameState[rowProp] = `${row.a}${row.b}${row.c}`;
            };
    
            // fill diagonal values
            const rowPropUnicode = 61 + i; // moves forwards one character each row
            const rowPropDiagL = `0x00${rowPropUnicode}`;
            const diagLprop = String.fromCodePoint(rowPropDiagL);
            checkedVerticals["diagL"] += row[diagLprop];
            const lastPropUnicode = 60 + gameboard.length;
            const rowPropDiagR = `0x00${lastPropUnicode - i}`; // moves back one character each row
            const diagRprop = String.fromCodePoint(rowPropDiagR);
            checkedVerticals["diagR"] += row[diagRprop];
    
            // fill column values
            for (let cell in row) {
                checkedVerticals[`${cell}Col`] += row[cell];
                // count squares filled
                if (row[cell]) { filledSquares++ };
            }
        });
        for (let line in checkedVerticals) {
            if ((checkedVerticals[line] === "XXX") ||
                (checkedVerticals[line] === "OOO")) {
                    if (gameState === null) {
                        gameState = {};
                    };
                    gameState[line] = checkedVerticals[line];
            }
        }
        if (filledSquares === 9 && !gameState) {
            gameState = "tie"
        }
        console.table(gameState);
        return gameState;
    }

    function resetGrid() {
        const graphics = document.querySelectorAll("svg");
        const gridLines = document.querySelectorAll(".gridline");
        
        graphics.forEach(graphic => {
            domElements.fade(graphic);
        });
        
        function emptyCell(cell) {
            while (cell.lastChild) {
                cell.removeChild(cell.lastChild);
            }
        }
        setTimeout(() => {
            _gridCells.forEach(gridCell => {
                emptyCell(gridCell);
            });
            graphics.forEach(graphic => {
                graphic.classList.remove("fade");
                graphic.classList.remove("greyed")
            })
            gridLines.forEach(gridLine => {
                const newGridLine = gridLine.cloneNode();
                const grid = document.querySelector("#grid");
                gridLine.remove();
                grid.appendChild(newGridLine);
            })
        }, 1000);
    }

    function reset() {
        if (!_firstPlayer) { return }; // no first player set means game not yet started
        resetGrid();
        gameBoard.resetBoard();
        _playerTurn = _firstPlayer;
        _firstPlayer = (_firstPlayer === 1) ? 2 : 1;
        setTimeout(players.underline, 1000);
        _gameOver = false;
    }

    return { start, reset, takeTurn, turn }
})();

const domElements = (function() {
    // set event listeners
    
    const startPvp = document.querySelector("#startpvp");
    startPvp.addEventListener('click', game.start);
    
    const reset = document.querySelector("#reset");
    reset.addEventListener('click', game.reset);

    function fade(element) {
        element.classList.add("fade");
    };

    function greyOut(element) {
        element.classList.add("greyed");
    };

    return { fade, greyOut };
})();