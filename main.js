const grid = document.getElementById("grid");
let cells = [];
let soundStates = [];
let cellsEl = null;
let interval;
const gridSz = 8;


init();

function start() {
  interval = setInterval(update, 300);
}

function reset() {
  clearInterval(interval);
  init();
}


function render() {
  grid.innerHTML = "";
  cellsEl = draw();
  grid.appendChild(cellsEl);
  playSounds(soundStates);
  soundStates = [];
}

grid.addEventListener("click", (e) => {
  if (e.target.tagName == "TD") {
    let cell = e.target;
    cell.classList.add("style");
    let row = cell.getAttribute("r");
    let col = cell.getAttribute("c");
    toggleCell(row, col);
    render();
  }

});



//populate grid with 0
function init() {
  cells = [];
  for (let r = 0; r < gridSz; r++) {
    let row = [];
    for (let c = 0; c < gridSz; c++) {
      row.push(0);
    }

    cells.push(row);
  }

  render();
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
      if (colVal > 0) {
        cell.classList.add("_" + (col + 1));
        soundStates.push(col + 1);
      }
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
      if (cellVal == 1 && nCount < 2) {
        // If live and <2 live neighbors
        cellVal = 0;
      } else if (cellVal == 1 && nCount > 3) {
        // If live and >3 live neighbors
        cellVal = 0;
      } else if (cellVal == 0 && nCount == 3) {
        // If dead and 3 live neighbors
        cellVal = 1;
      }

      newRow.push(cellVal);
    });
    newCells.push(newRow);
  });
  cells = newCells; // Update the grid
  render();

}

function checkNeighbors(row, col) {

  let count = 0;

  for (let i = -1; i < 2; i++) {
    if (col + i >= 0 && col + i < gridSz - 1) {
      if (row > 0 && cells[row - 1][col + i] == 1) {
        count++;
      }
      if (row < gridSz - 1 && cells[row + 1][col + i] == 1) {
        count++;
      }
    }
  }

  if (col - 1 >= 0 && cells[row][col - 1] == 1) {
    count++;
  }
  if (col + 1 < gridSz - 1 && cells[row][col + 1] == 1) {
    count++;
  }

  return count;
}
