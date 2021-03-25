// element locators

const cells = document.querySelectorAll(".cell");
cells.forEach(cell => cell.addEventListener('click', insertCross));

function insertCross(e) {
    const cellPixels = 200;

    function setAttributes(element, attributes) {
        for (let property in attributes) {
            element.setAttribute(property, attributes[property]);
        }
    };

    console.log(this); // is element

    const diagonal1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    function drawDiagonals(px) {
        return [
            {
                class: "crossline",
                x1: 30,
                y1: 30,
                x2: (px - 30),
                y2: (px - 30),
            },
            {
                class: "crossline",
                x1: (px - 30),
                y1: 30,
                x2: 30,
                y2: (px - 30),
            }
        ]
    }
    const diagonal1attributes = drawDiagonals(cellPixels)[0];
    setAttributes(diagonal1, diagonal1attributes);

    const diagonal2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    const diagonal2attributes = drawDiagonals(cellPixels)[1];
    setAttributes(diagonal2, diagonal2attributes);
    function setSvgBox(px) {
        return {
            class: "cell",
            height: px,
            width: px
        }
    }
    const svgBox = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const svgBoxAttributes = setSvgBox(cellPixels);
    setAttributes(svgBox, svgBoxAttributes);
    svgBox.appendChild(diagonal1);
    svgBox.appendChild(diagonal2);
    this.appendChild(svgBox);

}