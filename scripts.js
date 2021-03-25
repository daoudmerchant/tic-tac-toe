// element locators

const cells = document.querySelectorAll(".cell");

const insertShape = shapeMaker(); // my first module :)

cells.forEach(cell => cell.addEventListener('click', insertShape.cross));
const reset = document.querySelector("#reset");
reset.addEventListener('click', resetBoard);


function shapeMaker() {
    const cellPixels = 190;
    
    function setAttributes(element, attributes) {
        for (let property in attributes) {
            element.setAttribute(property, attributes[property]);
        }
    };
    function makeAttributeObj(px) {
        return [
            {
                class: "cell",
                height: px,
                width: px,
            },
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

    let svgBox;

    function cellBox() {
        svgBox = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const svgBoxAttributes = makeAttributeObj(cellPixels)[0];
        setAttributes(svgBox, svgBoxAttributes);
    }
    
    return {
        cross() {
            if (this.firstElementChild) {
                return;
            }
            cellBox();
            const diagonal1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
            const diagonal1attributes = makeAttributeObj(cellPixels)[1];
            setAttributes(diagonal1, diagonal1attributes);
            
            const diagonal2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
            const diagonal2attributes = makeAttributeObj(cellPixels)[2];
            setAttributes(diagonal2, diagonal2attributes);
            
            svgBox.appendChild(diagonal1);
            svgBox.appendChild(diagonal2);
            
            this.appendChild(svgBox);
        },
        circle() {
            if (this.firstElementChild) {
                return;
            }
            cellBox();
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            const circleAttributes = makeAttributeObj(cellPixels)[3];
            setAttributes(circle, circleAttributes);
            
            svgBox.appendChild(circle);
            
            this.appendChild(svgBox);
        }
    };
};

function resetBoard() {
    const grid = document.querySelector("#gameboard");
    const gridLines = document.querySelector("#grid");
    const verticalLines = document.querySelectorAll(".vertical");
    const horizontalLines = document.querySelectorAll(".horizontal");
    const allSVG = document.querySelectorAll("svg");
    allSVG.forEach(line => line.classList.add("fade"));
    setTimeout(() => {
        allSVG.forEach(svg => {
            svg.classList.remove("vertical");
            svg.classList.remove("horizontal");
            svg.classList.remove("fade")
            void svg.offsetWidth;
        }, 1000);
    });
    verticalLines.forEach(verticalLine => {
        verticalLine.classList.add("vertical");
    });
    horizontalLines.forEach(horizontalLine => {
        horizontalLine.classList.add("horizontal");
    })
};