const test = require("node:test");
const assert = require("node:assert/strict");

const SquareCore = require("./square-core");

function createCell(type, pieceId, squareId = null, squareType = null) {
  return { type, pieceId, squareId, squareType };
}

function createBoard(rows, cols, fill = null) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => (typeof fill === "function" ? fill() : fill)),
  );
}

function fillRect(board, left, top, rows, cols, builder) {
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      board[top + y][left + x] = builder(x, y);
    }
  }
}

test("4 complete pieces inside a 4x4 become silver", () => {
  const board = createBoard(6, 6, null);
  fillRect(board, 1, 1, 4, 4, (x, y) => {
    const pieceId = y < 2 ? (x < 2 ? 1 : 2) : x < 2 ? 3 : 4;
    const type = pieceId === 1 ? "I" : pieceId === 2 ? "I2" : pieceId === 3 ? "I3" : "L3";
    return createCell(type, pieceId);
  });

  const squareGroups = new Map();
  const result = SquareCore.detectAndMarkSquares(board, 6, 6, {
    squareGroups,
    createSquareId: () => 1,
  });

  assert.equal(result.madeSquares.length, 1);
  assert.equal(result.madeSquares[0].squareType, "silver");
  assert.equal(squareGroups.get(1).type, "silver");
});

test("same-type pieces become gold", () => {
  const board = createBoard(6, 6, null);
  fillRect(board, 1, 1, 4, 4, (x, y) => {
    const pieceId = y < 2 ? (x < 2 ? 1 : 2) : x < 2 ? 3 : 4;
    return createCell("T", pieceId);
  });

  const squareGroups = new Map();
  const result = SquareCore.detectAndMarkSquares(board, 6, 6, {
    squareGroups,
    createSquareId: () => 9,
  });

  assert.equal(result.madeSquares[0].squareType, "gold");
  assert.equal(squareGroups.get(9).type, "gold");
});

test("partially cleared square loses its square attributes", () => {
  const board = createBoard(5, 5, null);
  const squareGroups = new Map([
    [1, { id: 1, type: "silver", createdAt: 0, originalCellCount: 16, remainingCellCount: 16 }],
  ]);
  const cells = [];
  for (let y = 0; y < 4; y += 1) {
    for (let x = 0; x < 4; x += 1) {
      if (x === 0 && y === 0) continue;
      const cell = createCell("I", x + y * 4, 1, "silver");
      board[y][x] = cell;
      cells.push(cell);
    }
  }

  SquareCore.refreshSquareGroupsAfterLineClear(board, 5, 5, squareGroups);

  assert.equal(squareGroups.has(1), false);
  assert.ok(cells.every((cell) => cell.squareId === null && cell.squareType === null));
});

test("five pieceIds in a 4x4 is rejected", () => {
  const board = createBoard(5, 5, null);
  const ids = [
    [1, 1, 2, 2],
    [1, 3, 3, 2],
    [4, 3, 5, 5],
    [4, 4, 5, 5],
  ];
  for (let y = 0; y < 4; y += 1) {
    for (let x = 0; x < 4; x += 1) {
      board[y][x] = createCell("I", ids[y][x]);
    }
  }

  const result = SquareCore.detectAndMarkSquares(board, 5, 5, {
    squareGroups: new Map(),
    createSquareId: () => 1,
  });

  assert.equal(result.madeSquares.length, 0);
});

test("piece extending outside the 4x4 is rejected", () => {
  const board = createBoard(5, 5, null);
  // Four cells of one piece, but one of them sits outside the target 4x4 area.
  board[0][0] = createCell("I", 1);
  board[0][1] = createCell("I", 1);
  board[0][2] = createCell("I", 1);
  board[0][3] = createCell("I", 1);
  board[1][0] = createCell("I", 2);
  board[1][1] = createCell("I", 2);
  board[1][2] = createCell("I", 2);
  board[1][3] = createCell("I", 2);
  board[2][0] = createCell("I", 3);
  board[2][1] = createCell("I", 3);
  board[2][2] = createCell("I", 3);
  board[2][3] = createCell("I", 3);
  board[3][0] = createCell("I", 4);
  board[3][1] = createCell("I", 4);
  board[3][2] = createCell("I", 4);
  board[4][0] = createCell("I", 4); // outside the 4x4 window

  const result = SquareCore.detectAndMarkSquares(board, 5, 5, {
    squareGroups: new Map(),
    createSquareId: () => 1,
  });

  assert.equal(result.madeSquares.length, 0);
});

test("square completion is still detected when a line clears at the same time", () => {
  const board = createBoard(6, 6, null);
  fillRect(board, 1, 1, 4, 4, (x, y) => {
    const pieceId = y < 2 ? (x < 2 ? 1 : 2) : x < 2 ? 3 : 4;
    return createCell("T", pieceId);
  });
  board[5] = Array.from({ length: 6 }, (_, x) => createCell("I", 9 + x));

  const result = SquareCore.detectAndMarkSquares(board, 6, 6, {
    squareGroups: new Map(),
    createSquareId: () => 1,
  });

  assert.equal(result.madeSquares.length, 1);
});

test("square line bonus counts each squareId only once", () => {
  const clearedCells = [
    createCell("T", 1, 7, "gold"),
    createCell("T", 1, 7, "gold"),
    createCell("T", 2, 8, "silver"),
    createCell("T", 2, 8, "silver"),
  ];
  const bonus = SquareCore.getSquareLineBonus(clearedCells, 3);
  assert.equal(bonus, (400 + 200) * 3);
});

test("normal line and perfect clear helpers remain independent", () => {
  const board = createBoard(4, 4, null);
  board[0][0] = createCell("I", 1);
  const result = SquareCore.detectAndMarkSquares(board, 4, 4, {
    squareGroups: new Map(),
    createSquareId: () => 1,
  });
  assert.equal(result.madeSquares.length, 0);
  assert.equal(SquareCore.getSquareLineBonus([], 1), 0);
});

test("piece ids can be assigned uniquely for hold/spawn style flows", () => {
  const pieceA = {};
  const pieceB = {};
  const nextAfterA = require("./piece-id-core").allocatePieceIdForSpecialModes(pieceA, 11, true);
  const nextAfterB = require("./piece-id-core").allocatePieceIdForSpecialModes(pieceB, nextAfterA, true);

  assert.equal(pieceA.pieceId, 11);
  assert.equal(pieceB.pieceId, 12);
  assert.equal(nextAfterB, 13);
});
