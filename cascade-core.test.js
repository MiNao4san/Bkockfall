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

test("single T remnant cell falls and can complete a chain", () => {
  const board = boardFrom([
    "....",
    "...X",
    "XXXX",
    "XXX.",
  ], () => cell("T", 10));

  const result = CascadeCore.resolveCascade(board, 4, 4);

  assert.equal(result.chainCount, 2);
  assert.deepEqual(result.clears, [
    { chain: 1, lines: 1 },
    { chain: 2, lines: 1 },
  ]);
});

test("three connected T remnant cells fall independently", () => {
  const board = boardFrom([
    ".X..",
    "XX..",
    "....",
    "....",
  ], () => cell("T", 20));

  CascadeCore.applyCascadeGravityStep(board, 4, 4);

  assert.deepEqual(boardText(board), [
    "....",
    ".X..",
    "XX..",
    "....",
  ]);
});

test("supported cell stops while other T remnant cells fall", () => {
  const board = boardFrom([
    ".X..",
    "XX..",
    ".X..",
    ".X..",
    ".X..",
  ], (value, x, y) => (y >= 2 ? cell("G", 99) : cell("T", 21)));

  CascadeCore.applyCascadeGravityStep(board, 5, 4);

  assert.deepEqual(boardText(board), [
    ".X..",
    ".X..",
    "XX..",
    ".X..",
    ".X..",
  ]);
  assert.equal(board[2][1].pieceId, 99, "supported blocker should stay in place");
});

test("horizontal pair splits when only one side is supported", () => {
  const board = boardFrom([
    "XX.",
    "X..",
    "X..",
    "X..",
  ], (value, x, y) => (y >= 1 && x === 0 ? cell("G", 90) : cell("I", 22)));

  CascadeCore.applyCascadeGravityStep(board, 4, 3);

  assert.deepEqual(boardText(board), [
    "X..",
    "XX.",
    "X..",
    "X..",
  ]);
  assert.equal(board[0][0].pieceId, 22);
  assert.equal(board[1][0].pieceId, 90);
  assert.equal(board[1][1].pieceId, 22);
});

test("vertical pair falls one row per step from bottom to top", () => {
  const board = boardFrom([
    ".X.",
    ".X.",
    "...",
    "...",
  ], () => cell("I", 30));

  CascadeCore.applyCascadeGravityStep(board, 4, 3);
  assert.deepEqual(boardText(board), [
    "...",
    ".X.",
    ".X.",
    "...",
  ]);

  CascadeCore.applyCascadeGravityStep(board, 4, 3);
  assert.deepEqual(boardText(board), [
    "...",
    "...",
    ".X.",
    ".X.",
  ]);
});

test("independent cell gravity preserves pieceId metadata", () => {
  const board = boardFrom([
    ".X.",
    "...",
  ], () => cell("T", 44));

  CascadeCore.applyCascadeGravityStep(board, 2, 3);

  assert.equal(board[1][1].pieceId, 44);
});

test("multiple cells falling independently can complete a second chain", () => {
  const board = boardFrom([
    "....",
    "XX..",
    "..XX",
    "XXXX",
    "XX..",
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

test("floor cell does not fall", () => {
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

test("chapter 4 cascade tutorial setup resolves to at least two chains", () => {
  const board = boardFrom([
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", ".........X", "XXX....XXX", "XXXXXXXXX.",
  ]);

  board[18][3] = cell("I", 100);
  board[18][4] = cell("I", 100);
  board[18][5] = cell("I", 100);
  board[18][6] = cell("I", 100);

  const result = CascadeCore.resolveCascade(board, 20, 10);

  assert.ok(result.chainCount >= 2, "Chapter 4 Cascade should produce a chain");
});
