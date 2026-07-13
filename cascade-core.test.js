const test = require("node:test");
const assert = require("node:assert/strict");

const CascadeCore = require("./cascade-core");

function cell(label = "X", pieceId = null) {
  return { type: label, pieceId };
}

function boardFrom(pattern, factory = (value) => cell(value)) {
  return pattern.map((row, y) =>
    [...row].map((value, x) => (value === "." ? null : factory(value, x, y))),
  );
}

function boardText(board) {
  return board.map((row) => row.map((value) => (value ? "X" : ".")).join(""));
}

function settle(board) {
  const rows = board.length;
  const cols = board[0].length;
  let steps = 0;
  while (CascadeCore.applyCascadeGravityStep(board, rows, cols)) {
    steps += 1;
    assert.ok(steps < 100, "cascade gravity should settle");
  }
  return steps;
}

test("single floating cell falls to the floor", () => {
  const board = boardFrom([
    ".X.",
    "...",
    "...",
    "...",
  ]);

  settle(board);

  assert.deepEqual(boardText(board), [
    "...",
    "...",
    "...",
    ".X.",
  ]);
});

test("orthogonally connected group keeps its shape while falling", () => {
  const board = boardFrom([
    "XX.",
    "X..",
    "...",
    "...",
  ]);

  settle(board);

  assert.deepEqual(boardText(board), [
    "...",
    "...",
    "XX.",
    "X..",
  ]);
});

test("same pieceId split by a line clear becomes independent groups", () => {
  const board = boardFrom([
    ".X.",
    "...",
    ".X.",
    "...",
  ], () => cell("I", 7));

  const groups = CascadeCore.getCascadeConnectedGroups(board, 4, 3);

  assert.equal(groups.length, 2);
  assert.ok(groups.every((group) => group.length === 1));
});

test("floating fragment falls even when another same-piece fragment is supported", () => {
  const board = boardFrom([
    ".X.",
    "...",
    "...",
    "...",
    ".X.",
  ], () => cell("I", 9));

  CascadeCore.applyCascadeGravityStep(board, 5, 3);

  assert.deepEqual(boardText(board), [
    "...",
    ".X.",
    "...",
    "...",
    ".X.",
  ]);
});

test("upper group can use space vacated by a lower group in the same step", () => {
  const board = boardFrom([
    "...",
    ".X.",
    "...",
    ".X.",
    "...",
  ], (value, x, y) => cell(value, y));

  CascadeCore.applyCascadeGravityStep(board, 5, 3);
  assert.deepEqual(boardText(board), [
    "...",
    "...",
    ".X.",
    "...",
    ".X.",
  ]);
});

test("initial cells without pieceId fall by current connectivity", () => {
  const board = boardFrom([
    "XX.",
    "...",
    "...",
  ], () => cell("G", null));

  const groups = CascadeCore.getCascadeConnectedGroups(board, 3, 3);
  assert.equal(groups.length, 1);
  assert.equal(groups[0].length, 2);

  settle(board);
  assert.deepEqual(boardText(board), [
    "...",
    "...",
    "XX.",
  ]);
});

test("multiple independent groups can fall simultaneously without losing cells", () => {
  const board = boardFrom([
    "X..X",
    "....",
    "....",
  ]);
  const before = CascadeCore.countOccupiedBoardCells(board);

  CascadeCore.applyCascadeGravityStep(board, 3, 4);

  assert.equal(CascadeCore.countOccupiedBoardCells(board), before);
  assert.deepEqual(boardText(board), [
    "....",
    "X..X",
    "....",
  ]);
});

test("group touching the floor does not fall", () => {
  const board = boardFrom([
    "...",
    "...",
    ".X.",
  ]);

  const moved = CascadeCore.applyCascadeGravityStep(board, 3, 3);

  assert.equal(moved, false);
  assert.deepEqual(boardText(board), [
    "...",
    "...",
    ".X.",
  ]);
});

test("falling after a clear can complete another line and chain", () => {
  const board = boardFrom([
    "....",
    "....",
    "...X",
    "XXXX",
    "XXX.",
  ]);

  const result = CascadeCore.resolveCascade(board, 5, 4);

  assert.equal(result.chainCount, 2);
  assert.deepEqual(result.clears, [
    { chain: 1, lines: 1 },
    { chain: 2, lines: 1 },
  ]);
});

test("gravity step preserves occupied cell count", () => {
  const board = boardFrom([
    "X..X",
    ".XX.",
    "....",
    "....",
  ]);
  const before = CascadeCore.countOccupiedBoardCells(board);

  const moved = CascadeCore.applyCascadeGravityStep(board, 4, 4);

  assert.equal(moved, true);
  assert.equal(CascadeCore.countOccupiedBoardCells(board), before);
});

test("chapter 4 cascade tutorial setup resolves to at least two chains", () => {
  const board = boardFrom([
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", ".........X", "XXX....XXX", "XXXXXXXXX.",
  ]);

  // Simulate the tutorial I piece completing the first line at row 18.
  board[18][3] = cell("I", 100);
  board[18][4] = cell("I", 100);
  board[18][5] = cell("I", 100);
  board[18][6] = cell("I", 100);

  const result = CascadeCore.resolveCascade(board, 20, 10);

  assert.ok(result.chainCount >= 2, "Chapter 4 Cascade should produce a chain");
});
