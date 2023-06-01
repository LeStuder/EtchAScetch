//VARIABLE DECLARATIONS

const inputResolution = document.getElementById("resolution-range")
const inputColorRed = document.getElementById("input-color-red")
const inputColorGreen = document.getElementById("input-color-green")
const inputColorBlue = document.getElementById("input-color-blue")

const colorViewer = document.getElementById("color-viewer")

const resulutionValueDisplay = document.getElementById("resolution-value-display")
const colorValueDisplayRed = document.getElementById("color-value-display-red")
const colorValueDisplayGreen = document.getElementById("color-value-display-green")
const colorValueDisplayBlue = document.getElementById("color-value-display-blue")

const buttonSetResolution = document.getElementById("btn-set-resolution")
const buttonSetBackground = document.getElementById("btn-set-background")
const buttonSaveImage = document.getElementById("btn-save-image")

const grid = document.getElementById("grid")
const cells = document.getElementsByClassName("cell")
const gridSize = getComputedStyle(document.querySelector(":root")).getPropertyValue("--grid-size")

console.log("grid size var: " + gridSize)

let valueColorRed = 0
let valueColorGreen = 0
let valueColorBlue = 0

let drawColorStr = "rgb(0,0,0)"
let backgroundColorStr = "rgb(0,0,0)"

//FUNCTIONS

//resets the grid to the input value and wipes everything
function setResolution() {
    grid.style.gridTemplateColumns = "repeat(" + inputResolution.value + ", " + gridSize / inputResolution.value + "px)"
    grid.style.gridTemplateRows = "repeat(" + inputResolution.value + ", " + gridSize / inputResolution.value + "px)"
    grid.innerHTML = ""
    for (let i = 0; i < inputResolution.value * inputResolution.value; i++) {
        const cellElem = document.createElement("div")
        cellElem.classList.add("cell")
        cellElem.classList.add("empty")
        cellElem.addEventListener("mouseover", () => {
            drawColor(cellElem)
        })
        grid.appendChild(cellElem)
    }
}

//updates the cell with the current color
function drawColor(cell) {
    cell.style.backgroundColor = drawColorStr
    cell.classList.remove("empty")
}

//updates the counter continously
function updateCounter(input, valueDisplay) {
    valueDisplay.textContent = input.value
    return input.value
}

//updates the drawColorStr to the current input
function updateCurrentColor() {
    drawColorStr = "rgb(" + valueColorRed + "," + valueColorGreen + "," + valueColorBlue + ")"
    colorViewer.style.backgroundColor = drawColorStr
}

//sets the background in all cells with the class "emptry" to the current color
function setBackground() {
    backgroundColorStr = drawColorStr
    for (let i in cells) {
        if (cells[i].classList.contains("empty")) {
            cells[i].style.backgroundColor = backgroundColorStr
        }
    }
}

function saveImage() {
    modernScreenshot.domToPng(grid).then((dataUrl) => {
        const link = document.createElement("a")
        link.download = "mySketch.png"
        link.href = dataUrl
        link.click()
    })
}

//EVENT LISTENERS

//Update the counter, the current specific color value and the currentColorStr
inputColorRed.addEventListener("input", () => {
    valueColorRed = updateCounter(inputColorRed, colorValueDisplayRed)
    updateCurrentColor()
})
inputColorGreen.addEventListener("input", () => {
    valueColorGreen = updateCounter(inputColorGreen, colorValueDisplayGreen)
    updateCurrentColor()
})
inputColorBlue.addEventListener("input", () => {
    valueColorBlue = updateCounter(inputColorBlue, colorValueDisplayBlue)
    updateCurrentColor()
})

//Update the counter
inputResolution.addEventListener("input", () => {
    updateCounter(inputResolution, resulutionValueDisplay)
})

//Sets the resolution
buttonSetResolution.addEventListener("click", () => {
    setResolution()
})

//Sets the resolution according to the initial values after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    setResolution()
})

//Sets the background to the current color
buttonSetBackground.addEventListener("click", () => {
    setBackground()
})

buttonSaveImage.addEventListener("click", () => {
    saveImage()
})
