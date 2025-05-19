
const container = document.getElementById("puzzle-container");
const size = 3; // 3x3 grid
let tiles = [];

function initPuzzle() {
  container.innerHTML = "";
  tiles = [];
//group members 1: GISUBIZO divine 2:NTIRENGANYA jean marie vianney3: TUYISHIMIRE blaise :ITANGAZA emerance//
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      let index = row * size + col;
      let tile = document.createElement("div");
      tile.classList.add("tile");

      // Leave the last tile as empty
      if (index === size * size - 1) {
        tile.classList.add("empty");
        tile.dataset.empty = "true";
      } else {
        tile.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
        tile.dataset.index = index;
        tile.addEventListener("click", () => moveTile(tile));
      }

      tile.dataset.row = row;
      tile.dataset.col = col;

      tiles.push(tile);
      container.appendChild(tile);
    }
  }
}

function shuffleTiles() {
  for (let i = 0; i < 100; i++) {
    let neighbors = getMovableTiles();
    let tile = neighbors[Math.floor(Math.random() * neighbors.length)];
    moveTile(tile, false);
  }
}

function getEmptyTile() {
  return tiles.find(tile => tile.classList.contains("empty"));
}

function getMovableTiles() {
  const empty = getEmptyTile();
  const emptyRow = parseInt(empty.dataset.row);
  const emptyCol = parseInt(empty.dataset.col);

  return tiles.filter(tile => {
    let row = parseInt(tile.dataset.row);
    let col = parseInt(tile.dataset.col);
    return (
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow)
    );
  });
}

function moveTile(tile, checkWin = true) {
  const empty = getEmptyTile();

  let tileRow = tile.dataset.row;
  let tileCol = tile.dataset.col;
  let emptyRow = empty.dataset.row;
  let emptyCol = empty.dataset.col;

  // Swap dataset
  [tile.dataset.row, empty.dataset.row] = [emptyRow, tileRow];
  [tile.dataset.col, empty.dataset.col] = [emptyCol, tileCol];

  // Re-render positions
  renderTiles();

  if (checkWin && isSolved()) {
    setTimeout(() => alert("🎉 Puzzle Solved!"), 100);
  }
}

function renderTiles() {
  tiles.forEach(tile => {
    tile.style.order = parseInt(tile.dataset.row) * size + parseInt(tile.dataset.col);
  });
}

function isSolved() {
  return tiles.every((tile, i) => {
    let expectedRow = Math.floor(i / size);
    let expectedCol = i % size;
    return (
      tile.dataset.row == expectedRow && tile.dataset.col == expectedCol
    );
  });
}

// Initialize
initPuzzle();
