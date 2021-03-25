let stateOfBoard = [
    { "a": "", "b": "", "c": "" },
    { "a": "", "b": "", "c": "" },
    { "a": "", "b": "", "c": ""}
];

// make players

function makePlayer(number, name) {
    const symbol = (number === 1) ? "X" : "O";
    return { name, number, symbol }
}

const player1entry = document.querySelector("#player1name");
const player2entry = document.querySelector("#player2name");
const startPvp = document.querySelector("#startpvp");
startPvp.addEventListener('click', playGame);

function playGame() {
    if (!player1entry.value || !player2entry.value) {
        return;
    }
    
    function switchPlayerDisplay() {
        if (!player1entry.classList.contains("playerTurn") ||
            !player2entry.classList.contains("playerTurn")) {
                player1entry.classList.add("playerTurn");
        } else {
            player1entry.classList.toggle("playerTurn");
            player2entry.classList.toggle("playerTurn");
        }
    }
    const player1 = makePlayer(1, player1entry.value);
    const player2 = makePlayer(2, player2entry.value);
    player1entry.disabled = true;
    player2entry.disabled = true;
    startPvp.disabled = true;
    startPvp.classList.add("fade");
    setTimeout(() => switchPlayerDisplay(), 500);

}

// element locators

const gridCells = document.querySelectorAll(".svgCell");
const gridLines = document.querySelectorAll(".gridline");

const insertShape = shapeMaker(); // my first module :)

gridCells.forEach(cell => cell.addEventListener('click', playerTurn));

const reset = document.querySelector("#reset");
reset.addEventListener('click', resetScreen);

function playerTurn() {
    console.log();
    stateOfBoard[this.dataset.row][this.dataset.column] = "X";
    showGameBoard(stateOfBoard);
}

function shapeMaker() {
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
   
    return {
        cross(cell) {
            if (this.firstElementChild) {
                return;
            }
            
            const diagonal1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
            const diagonal1attributes = makeAttributeObj(cellPixels)[0];
            setAttributes(diagonal1, diagonal1attributes);
            
            const diagonal2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
            const diagonal2attributes = makeAttributeObj(cellPixels)[1];
            setAttributes(diagonal2, diagonal2attributes);
            
            cell.appendChild(diagonal1);
            cell.appendChild(diagonal2);
        },
        circle(cell) {
            if (this.firstElementChild) {
                return;
            }
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            const circleAttributes = makeAttributeObj(cellPixels)[2];
            setAttributes(circle, circleAttributes);
            
            cell.appendChild(circle);
        }
    };
};

function showGameBoard(gameboard) {
    const svgCells = document.querySelectorAll(".svgCell");
    svgCells.forEach(cell => {
        if (cell.firstChild) {
            return;
        }
        let cellValue = gameboard[cell.dataset.row][cell.dataset.column];
        console.log(cellValue);
        if (cellValue === "X") {
            insertShape.cross(cell);
        } else if (cellValue === "O") {
            insertShape.circle(cell);
        }
    })
}

showGameBoard(stateOfBoard);

function resetScreen() {
    const graphics = document.querySelectorAll("svg");
    graphics.forEach(graphic => {
        graphic.classList.add("fade");
    });
    const currentGridLines = document.querySelectorAll(".gridline"); // already been queried :(
    setTimeout(() => {
        gridCells.forEach(gridCell => {
            while (gridCell.lastChild) {
                gridCell.removeChild(gridCell.lastChild);
            }
        });
        graphics.forEach(graphic => {
            graphic.classList.remove("fade");
        })
        currentGridLines.forEach(gridLine => {
            const newGridLine = gridLine.cloneNode();
            const grid = document.querySelector("#grid");
            gridLine.remove();
            grid.appendChild(newGridLine);
        })
    }, 1000);
    // PUT BELOW OBJECT RESET IN FUNCTION
    stateOfBoard = [
        { "a": "", "b": "", "c": "" },
        { "a": "", "b": "", "c": "" },
        { "a": "", "b": "", "c": ""}
    ];
}