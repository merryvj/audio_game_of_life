import {draw as drawGrid, update as updateGrid, toggleCell as cellClicked, update} from "./grid.js"

const grid = document.getElementById("grid");
const stepBtn = document.getElementById("step-btn");

function render() {
    grid.innerHTML = '';
    grid.appendChild(drawGrid());
}

render();

stepBtn.addEventListener('click', () => {
    updateGrid();
    render();
})

grid.addEventListener('click', e => {
    if (e.target.tagName == 'TD') {
        let cell = e.target;
        let row = cell.getAttribute("r");
        let col = cell.getAttribute("c");
        cellClicked(row, col);
    }

    render();
})