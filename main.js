import {draw as drawGrid, update as updateGrid} from "./grid.js"

const grid = document.getElementById("grid");

function render() {
    grid.innerHTML = '';
    grid.appendChild(drawGrid());
}

render();
updateGrid();

