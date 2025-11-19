const size = 4;
let board = [];

function setup() {
  board = Array(size).fill().map(() => Array(size).fill(0));
  addRandomTile();
  addRandomTile();
  drawBoard();
}

function addRandomTile() {
  let empty = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] === 0) empty.push({r, c});
    }
  }
  if (empty.length) {
    let {r, c} = empty[Math.floor(Math.random() * empty.length)];
    board[r][c] = Math.random() < 0.9 ? 2 : 4;
  }
}

function drawBoard() {
  const container = document.getElementById('game-container');
  container.innerHTML = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const tile = document.createElement('div');
      const value = board[r][c];
      tile.className = 'tile';
      if (value) tile.classList.add('tile-' + value);
      tile.textContent = value || '';
      container.appendChild(tile);
    }
  }
}

function slide(row) {
  let arr = row.filter(v => v);
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === arr[i + 1]) {
      arr[i] *= 2;
      arr[i + 1] = 0;
    }
  }
  arr = arr.filter(v => v);
  while (arr.length < size) arr.push(0);
  return arr;
}

function rotateBoard() {
  let newBoard = Array(size).fill().map(() => Array(size).fill(0));
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      newBoard[c][size - 1 - r] = board[r][c];
    }
  }
  board = newBoard;
}

function moveLeft() {
  let moved = false;
  for (let r = 0; r < size; r++) {
    let newRow = slide(board[r]);
    if (board[r].toString() !== newRow.toString()) moved = true;
    board[r] = newRow;
  }
  if (moved) {
    addRandomTile();
    drawBoard();
  }
}

function moveRight() {
  board = board.map(row => row.reverse());
  moveLeft();
  board = board.map(row => row.reverse());
}

function moveUp() {
  rotateBoard();
  rotateBoard();
  rotateBoard();
  moveLeft();
  rotateBoard();
}

function moveDown() {
  rotateBoard();
  moveLeft();
  rotateBoard();
  rotateBoard();
  rotateBoard();
}

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') moveLeft();
  else if (e.key === 'ArrowRight') moveRight();
  else if (e.key === 'ArrowUp') moveUp();
  else if (e.key === 'ArrowDown') moveDown();
});

setup();
