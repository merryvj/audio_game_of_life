// import {draw as drawGrid, update as updateGrid, toggleCell as cellClicked, update} from "./grid.js"
// import {playSounds} from "./audio";
const grid = document.getElementById("grid");
const stepBtn = document.getElementById("step-btn");
let cells = [
]
const gridSz = 16;

init();

function init() {
    initGrid();
    render();
}
function render() {
    grid.innerHTML = '';
    grid.appendChild(draw());
}

stepBtn.addEventListener('click', () => {
    update();
    render();
    playSounds();
})

grid.addEventListener('click', e => {
    if (e.target.tagName == 'TD') {
        let cell = e.target;
        let row = cell.getAttribute("r");
        let col = cell.getAttribute("c");
        toggleCell(row, col);
    }
    render();
})





//populate grid with 0
function initGrid() {
    for (let r = 0; r < gridSz; r++){
        let row = [];
        for (let c = 0; c < gridSz; c++){
            row.push(0);
        }

        cells.push(row);
    }
}


function toggleCell(row, col) {
    cells[row][col] = -1 * cells[row][col] + 1;
}

function draw() {
    let table = document.createElement("table");
    cells.forEach((rowArr, row) => {
        let rowEl = document.createElement("tr");
        rowArr.forEach((colVal, col) => {
          let cell = document.createElement("td");
          cell.setAttribute("c", col);
          cell.setAttribute("r", row);
          cell.classList.add("_" + colVal);
          rowEl.append(cell);
        });

        table.append(rowEl);
    });

    return table;
}

function update() {
    let newCells = []; // Upcoming grid
        cells.forEach((rowArr, row) => {
          let newRow = [];
          rowArr.forEach((colVal, col) => {
            let cellVal = colVal;
            let nCount = checkNeighbors(row, col);
            if (cellVal == 1 && nCount < 2) { // If live and <2 live neighbors
              cellVal = 0;
            } else if (cellVal == 1 && nCount > 3) { // If live and >3 live neighbors
              cellVal = 0;
            } else if (cellVal == 0 && nCount == 3) { // If dead and 3 live neighbors
              cellVal = 1;
            }

            newRow.push(cellVal);
          });
          newCells.push(newRow);
        });
        cells = newCells; // Update the grid
}

function checkNeighbors(row, col) {
    // Return number of live neighbors
    
    let count = 0;
    
    for (let i = -1; i < 2; i++) { //This checks the row above and row below
      if (col + i >= 0 && col + i < gridSz - 1) { // Check for valid column
        if (row > 0 && cells[row - 1][col + i] == 1) {
          count++;
        }
        if (row < gridSz - 1 && cells[row + 1][col + i] == 1) { 
          count++;
        }
      }
    }
    
    if (col - 1 >= 0 && cells[row][col - 1] == 1) { // Check left cell
      count++;
    }
    if (col + 1 < gridSz - 1 && cells[row][col + 1] == 1) { // Check right cell
      count++;
    }

    return count;
  }