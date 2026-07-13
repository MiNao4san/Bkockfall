const test = require("node:test");
const assert = require("node:assert/strict");

const BomblissCore = require("./bombliss-core");

function createCell(type = "T", bomb = "none", largeBombId = null) {
  return { type, bomb, largeBombId };
}

function createBoard(rows, cols, fill = null) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => (typeof fill === "function" ? fill() : fill)),
  );
}

function fillBoard(board, factory) {
  for (let y = 0; y < board.length; y += 1) {
    for (let x = 0; x < board[y].length; x += 1) {
      board[y][x] = factory(x, y);
    }
  }
}

function countNulls(board) {
  return board.flat().filter((cell) => !cell).length;
}

test("findBomblissLineBombs returns completed rows and bomb coordinates", () => {
  const board = createBoard(4, 4, null);
  fillBoard(board, () => createCell("T"));
  board[1][2] = createCell("T", "small");
  board[3][0] = null;

  const result = BomblissCore.findBomblissLineBombs(board, 4, 4);

  assert.equal(result.lineCount, 3);
  assert.deepEqual(result.completedRows, [0, 1, 2]);
  assert.deepEqual(result.bombs, [{ x: 2, y: 1 }]);
});

test("createSmallBombRange matches the requested table through line 6", () => {
  assert.deepEqual(BomblissCore.createSmallBombRange(1), { left: 3, right: 3, up: 0, down: 0 });
  assert.deepEqual(BomblissCore.createSmallBombRange(2), { left: 3, right: 3, up: 1, down: 1 });
  assert.deepEqual(BomblissCore.createSmallBombRange(3), { left: 3, right: 3, up: 2, down: 2 });
  assert.deepEqual(BomblissCore.createSmallBombRange(4), { left: 3, right: 3, up: 3, down: 3 });
  assert.deepEqual(BomblissCore.createSmallBombRange(5), { left: 4, right: 4, up: 4, down: 4 });
  assert.deepEqual(BomblissCore.createSmallBombRange(6), { left: 4, right: 4, up: 4, down: 4 });
});

test("small bomb explosion uses line-count dependent ranges", () => {
  const expectedAreas = new Map([
    [1, 7],
    [2, 21],
    [3, 35],
    [4, 49],
    [5, 81],
    [6, 81],
  ]);

  for (const [lineCount, expectedNulls] of expectedAreas) {
    const board = createBoard(15, 15, () => createCell("T"));
    board[7][7] = createCell("T", "small");

    const result = BomblissCore.explodeBomblissBombs(
      board,
      15,
      15,
      [{ x: 7, y: 7 }],
      { lineCount },
    );

    assert.equal(result.usedSmall, true);
    assert.equal(result.usedLarge, false);
    assert.equal(countNulls(board), expectedNulls, `lineCount ${lineCount}`);
  }
});

test("large bomb explodes as a fixed 10x10 area", () => {
  const board = createBoard(12, 12, () => createCell("T"));
  const largeBombId = 1;

  board[5][6] = createCell("T", "large", largeBombId);
  board[5][7] = createCell("T", "large", largeBombId);
  board[6][6] = createCell("T", "large", largeBombId);
  board[6][7] = createCell("T", "large", largeBombId);
  board[1][2] = createCell("T");
  board[11][11] = createCell("T");

  const result = BomblissCore.explodeBomblissBombs(
    board,
    12,
    12,
    [{ x: 6, y: 5, bomb: "large", largeBombId }],
    { lineCount: 4 },
  );

  assert.equal(result.usedLarge, true);
  assert.equal(result.usedSmall, false);
  assert.notEqual(board[1][1], null);
  assert.equal(board[1][2], null);
  assert.notEqual(board[11][11], null);
  assert.equal(countNulls(board), 100);
});

test("createBomblissLargeBombs converts only one overlapping 2x2 cluster", () => {
  const board = createBoard(3, 3, null);
  fillBoard(board, () => createCell("T", "small"));

  const result = BomblissCore.createBomblissLargeBombs(
    board,
    3,
    3,
    BomblissCore.getCellBomb,
    (cell) => cell.type,
    (payload) => createCell(payload.type, payload.bomb, payload.largeBombId),
    1,
  );

  assert.equal(result.created, true);
  assert.equal(result.nextLargeBombId, 2);
  const largeCells = board.flat().filter((cell) => cell?.bomb === "large");
  assert.equal(largeCells.length, 4);
  assert.equal(board[0][0].largeBombId, 1);
  assert.equal(board[1][1].largeBombId, 1);
  assert.equal(board[0][2].bomb, "small");
});

test("small bomb can trigger a queued large bomb even after its cells are cleared", () => {
  const board = createBoard(12, 12, null);
  fillBoard(board, () => null);

  // Completed line with a small bomb that will trigger the large bomb cells.
  for (let x = 0; x < 12; x += 1) {
    board[6][x] = createCell("T");
  }
  board[6][4] = createCell("T", "small");

  // 2x2 large bomb straddling the same line so one cell is inside the small bomb blast.
  board[5][6] = createCell("T", "large", 7);
  board[5][7] = createCell("T", "large", 7);
  board[6][6] = createCell("T", "large", 7);
  board[6][7] = createCell("T", "large", 7);

  board[1][1] = createCell("T");
  board[1][2] = createCell("T");

  const result = BomblissCore.processBomblissChains(board, 12, 12, {
    nextLargeBombId: 8,
  });

  assert.equal(result.usedSmall, true);
  assert.equal(result.usedLarge, true);
  assert.equal(result.madeLarge, false);
  assert.equal(board[1][1], null);
  assert.equal(board[1][2], null);
  assert.ok(countNulls(board) > 12, "large bomb should clear additional cells");
});

test("sticky gravity can create a second completed line and continue the chain", () => {
  const board = createBoard(8, 10, null);

  // First completed row with a small bomb.
  for (let x = 0; x < 10; x += 1) {
    board[4][x] = createCell("T");
  }
  board[4][4] = createCell("T", "small");

  // A nearly complete row beneath it that becomes full after gravity.
  for (let x = 0; x < 9; x += 1) {
    board[5][x] = createCell("T");
  }
  board[5][0] = createCell("T", "small");

  // Support so the falling block from above settles into the final gap.
  board[6][9] = createCell("T");

  // A single block that drops into the gap after the first explosion.
  board[3][9] = createCell("T");

  const result = BomblissCore.processBomblissChains(board, 8, 10, {
    nextLargeBombId: 1,
  });

  assert.ok(result.chainCount >= 2, "expected a second chain after sticky gravity");
  assert.equal(result.usedSmall, true);
});
