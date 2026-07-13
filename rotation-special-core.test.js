const test = require("node:test");
const assert = require("node:assert/strict");

const RotationSpecialCore = require("./rotation-special-core");

const ROTATION_STATES = ["0", "R", "2", "L"];

const SHAPES = {
  DOT: [[1]],
  I2: [
    [0, 0],
    [1, 1],
  ],
  I3: [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  L3: [
    [1, 0],
    [1, 1],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
};

function rotate(matrix, direction) {
  const size = matrix.length;
  const rotated = Array.from({ length: size }, () => Array(size).fill(0));
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      rotated[y][x] = direction > 0 ? matrix[size - 1 - x][y] : matrix[x][size - 1 - y];
    }
  }
  return rotated;
}

function createBoard(rows = 20, cols = 10) {
  return Array.from({ length: rows }, () => Array(cols).fill(null));
}

function collides(board, piece, nextX, nextY, matrix) {
  const rows = board.length;
  const cols = board[0].length;
  for (let y = 0; y < matrix.length; y += 1) {
    for (let x = 0; x < matrix[y].length; x += 1) {
      if (!matrix[y][x]) continue;
      const boardX = nextX + x;
      const boardY = nextY + y;
      if (boardX < 0 || boardX >= cols || boardY >= rows) return true;
      if (boardY >= 0 && board[boardY][boardX]) return true;
    }
  }
  return false;
}

function nextRotationState(currentState, direction) {
  const index = ROTATION_STATES.indexOf(currentState);
  const nextIndex = (index + direction + ROTATION_STATES.length) % ROTATION_STATES.length;
  return ROTATION_STATES[nextIndex];
}

function assertRoundTrips(type) {
  let matrix = JSON.parse(JSON.stringify(SHAPES[type]));
  const original = JSON.parse(JSON.stringify(SHAPES[type]));
  for (let i = 0; i < 4; i += 1) {
    matrix = rotate(matrix, 1);
  }
  assert.deepEqual(matrix, original);
}

function attemptRotate(board, piece, direction) {
  const fromState = piece.rotationState;
  const toState = nextRotationState(fromState, direction);
  const nextMatrix = rotate(piece.matrix, direction);
  const kicks = RotationSpecialCore.getKickTests(piece.type, fromState, toState);

  for (const [kickX, kickY] of kicks) {
    if (collides(board, piece, piece.x + kickX, piece.y + kickY, nextMatrix)) {
      continue;
    }
    return {
      ok: true,
      x: piece.x + kickX,
      y: piece.y + kickY,
      matrix: nextMatrix,
      rotationState: toState,
      kick: [kickX, kickY],
    };
  }

  return { ok: false };
}

test("special piece matrices round-trip after four rotations", () => {
  assertRoundTrips("I2");
  assertRoundTrips("I3");
  assertRoundTrips("L3");
  assertRoundTrips("DOT");
});

for (const type of ["I2", "I3", "L3"]) {
  test(`${type} can rotate at the left wall`, () => {
    const board = createBoard();
    const piece = { type, matrix: SHAPES[type], x: 0, y: 2, rotationState: "0" };
    const rotated = attemptRotate(board, piece, 1);
    assert.equal(rotated.ok, true);
    assert.equal(collides(board, piece, rotated.x, rotated.y, rotated.matrix), false);
    assert.equal(rotated.x >= 0, true);
  });

  test(`${type} can rotate at the right wall`, () => {
    const board = createBoard();
    const piece = { type, matrix: SHAPES[type], x: 9 - SHAPES[type].length, y: 2, rotationState: "0" };
    const rotated = attemptRotate(board, piece, 1);
    assert.equal(rotated.ok, true);
    assert.equal(collides(board, piece, rotated.x, rotated.y, rotated.matrix), false);
    assert.equal(rotated.x + rotated.matrix[0].length <= 10, true);
  });

  test(`${type} can rotate on the floor`, () => {
    const board = createBoard();
    const piece = { type, matrix: SHAPES[type], x: 3, y: 18 - SHAPES[type].length + 1, rotationState: "0" };
    const rotated = attemptRotate(board, piece, 1);
    assert.equal(rotated.ok, true);
    assert.equal(collides(board, piece, rotated.x, rotated.y, rotated.matrix), false);
  });

  test(`${type} does not rotate when fully blocked`, () => {
    const board = createBoard();
    for (let y = 0; y < board.length; y += 1) {
      for (let x = 0; x < board[0].length; x += 1) {
        board[y][x] = {};
      }
    }
    const piece = { type, matrix: SHAPES[type], x: 3, y: 3, rotationState: "0" };
    const rotated = attemptRotate(board, piece, 1);
    assert.equal(rotated.ok, false);
  });
}

test("DOT returns a no-op kick list", () => {
  assert.deepEqual(RotationSpecialCore.getKickTests("DOT", "0", "R"), [[0, 0]]);
});

test("standard SRS pieces remain supported", () => {
  assert.deepEqual(RotationSpecialCore.getKickTests("T", "0", "R"), [
    [0, 0],
    [-1, 0],
    [-1, -1],
    [0, 2],
    [-1, 2],
  ]);
  assert.deepEqual(RotationSpecialCore.getKickTests("I", "0", "R"), [
    [0, 0],
    [-2, 0],
    [1, 0],
    [-2, -1],
    [1, 2],
  ]);
});
