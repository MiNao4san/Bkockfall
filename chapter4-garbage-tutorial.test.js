const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

const source = fs.readFileSync("game.js", "utf8");
const rows = 20;
const cols = 10;

function extractConst(name) {
  const match = source.match(new RegExp(String.raw`const ${name} = \{[\s\S]*?\n\};`));
  assert.ok(match, `${name} was not found`);
  return Function(`${match[0]}; return ${name};`)();
}

const SHAPES = extractConst("SHAPES");
const TUTORIAL_BOARD_PATTERNS = extractConst("TUTORIAL_BOARD_PATTERNS");

function boardFromPattern(pattern) {
  return pattern.map((row) =>
    [...row].map((value) => (value === "X" ? { type: "G", garbage: true } : null)),
  );
}

function getMatrixCells(matrix, originX, originY) {
  const cells = [];
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) cells.push({ x: originX + x, y: originY + y });
    });
  });
  return cells;
}

function collides(board, nextX, nextY, matrix) {
  return getMatrixCells(matrix, nextX, nextY).some(({ x, y }) => {
    if (x < 0 || x >= cols || y >= rows) return true;
    return y >= 0 && Boolean(board[y][x]);
  });
}

function hardDrop(board, type, startX, startY) {
  const matrix = SHAPES[type];
  let y = startY;
  while (!collides(board, startX, y + 1, matrix)) {
    y += 1;
  }
  return { x: startX, y };
}

function lockPiece(board, type, x, y) {
  const nextBoard = board.map((row) => [...row]);
  getMatrixCells(SHAPES[type], x, y).forEach((cell) => {
    if (cell.y >= 0) nextBoard[cell.y][cell.x] = { type, garbage: false };
  });
  return nextBoard;
}

function getClearedGarbageLines(board) {
  return board.filter((row) => row.every(Boolean) && row.some((cell) => cell?.garbage)).length;
}

test("Chapter 4 garbage tutorial O piece can reach the two-wide garbage hole", () => {
  const pattern = TUTORIAL_BOARD_PATTERNS.garbage;
  assert.equal(pattern.length, rows);
  pattern.forEach((row) => {
    assert.equal(row.length, cols);
    assert.match(row, /^[.X]+$/);
  });

  const board = boardFromPattern(pattern);
  const startX = 4;
  const startY = 1;
  assert.equal(collides(board, startX, startY, SHAPES.O), false);

  const finalPlacement = hardDrop(board, "O", startX, startY);
  assert.deepEqual(finalPlacement, { x: 4, y: 18 });

  const lockedBoard = lockPiece(board, "O", finalPlacement.x, finalPlacement.y);
  assert.equal(getClearedGarbageLines(lockedBoard), 2);
});
