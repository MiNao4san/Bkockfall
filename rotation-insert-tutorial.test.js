const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

const source = fs.readFileSync("game.js", "utf8");
const ROTATION_STATES = ["0", "R", "2", "L"];
const rows = 20;
const cols = 10;

function extractConst(name) {
  const match = source.match(new RegExp(String.raw`const ${name} = \{[\s\S]*?\n\};`));
  assert.ok(match, `${name} was not found`);
  return Function(`${match[0]}; return ${name};`)();
}

const SHAPES = extractConst("SHAPES");
const JLSTZ_KICKS = extractConst("JLSTZ_KICKS");
const I_KICKS = extractConst("I_KICKS");
const ROTATION_INSERT_EXPECTED_PLACEMENTS = extractConst("ROTATION_INSERT_EXPECTED_PLACEMENTS");
const getRotationInsertBoard = Function(
  `${source.slice(
    source.indexOf("function getRotationInsertBoard"),
    source.indexOf("function validateTutorialBoardPattern"),
  )}; return getRotationInsertBoard;`,
)();

function cloneMatrix(matrix) {
  return matrix.map((row) => [...row]);
}

function rotate(matrix) {
  return matrix[0].map((_, x) => matrix.map((row) => row[x]).reverse());
}

function matrixFor(type, rotationState) {
  let matrix = cloneMatrix(SHAPES[type]);
  for (let i = 0; i < ROTATION_STATES.indexOf(rotationState); i += 1) {
    matrix = rotate(matrix);
  }
  return matrix;
}

function nextRotationState(currentState, direction) {
  return ROTATION_STATES[
    (ROTATION_STATES.indexOf(currentState) + direction + ROTATION_STATES.length) %
      ROTATION_STATES.length
  ];
}

function getKickTests(type, fromState, toState) {
  if (type === "I") return I_KICKS[`${fromState}>${toState}`] ?? [[0, 0]];
  return JLSTZ_KICKS[`${fromState}>${toState}`] ?? [[0, 0]];
}

function boardFromPattern(pattern) {
  return pattern.map((row) => [...row].map((value) => (value === "X" ? "G" : null)));
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

function countClearedLinesAfterPlacement(board, type, expected) {
  const nextBoard = board.map((row) => [...row]);
  getMatrixCells(matrixFor(type, expected.rotationState), expected.x, expected.y).forEach(({ x, y }) => {
    if (y >= 0) nextBoard[y][x] = type;
  });
  return nextBoard.filter((row) => row.every(Boolean)).length;
}

function getReachableStates(type, board) {
  const startX = Math.floor((cols - SHAPES[type][0].length) / 2);
  const start = { x: startX, y: 1, rotationState: "0", path: [] };
  const queue = [start];
  const seen = new Map([[`${start.x},${start.y},${start.rotationState}`, start]]);

  while (queue.length > 0) {
    const current = queue.shift();
    const movementActions = [
      ["L", -1, 0],
      ["R", 1, 0],
      ["D", 0, 1],
    ];

    for (const [action, dx, dy] of movementActions) {
      const matrix = matrixFor(type, current.rotationState);
      const next = {
        x: current.x + dx,
        y: current.y + dy,
        rotationState: current.rotationState,
        path: [...current.path, action],
      };
      const key = `${next.x},${next.y},${next.rotationState}`;
      if (
        next.y >= -4 &&
        next.y <= rows &&
        !seen.has(key) &&
        !collides(board, next.x, next.y, matrix)
      ) {
        seen.set(key, next);
        queue.push(next);
      }
    }

    for (const direction of [1, -1]) {
      const toState = nextRotationState(current.rotationState, direction);
      const nextMatrix = matrixFor(type, toState);
      for (const [kickX, kickY] of getKickTests(type, current.rotationState, toState)) {
        const next = {
          x: current.x + kickX,
          y: current.y + kickY,
          rotationState: toState,
          path: [...current.path, direction > 0 ? "CW" : "CCW"],
        };
        const key = `${next.x},${next.y},${next.rotationState}`;
        if (
          next.y >= -4 &&
          next.y <= rows &&
          !seen.has(key) &&
          !collides(board, next.x, next.y, nextMatrix)
        ) {
          seen.set(key, next);
          queue.push(next);
          break;
        }
      }
    }
  }

  return seen;
}

function findFinalRotationIntoExpected(type, board, expected, reachableStates) {
  for (const fromState of ROTATION_STATES) {
    for (const direction of [1, -1]) {
      const toState = nextRotationState(fromState, direction);
      if (toState !== expected.rotationState) continue;

      for (const [kickX, kickY] of getKickTests(type, fromState, toState)) {
        const previousKey = `${expected.x - kickX},${expected.y - kickY},${fromState}`;
        if (
          reachableStates.has(previousKey) &&
          !collides(board, expected.x, expected.y, matrixFor(type, expected.rotationState))
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

for (const type of ["I", "J", "L", "S", "Z"]) {
  test(`${type} rotation insert setup is playable`, () => {
    const pattern = getRotationInsertBoard(type);
    assert.equal(pattern.length, rows);
    pattern.forEach((row) => assert.equal(row.length, cols));

    const board = boardFromPattern(pattern);
    const expected = ROTATION_INSERT_EXPECTED_PLACEMENTS[type];
    const expectedMatrix = matrixFor(type, expected.rotationState);

    assert.equal(collides(board, expected.x, expected.y, expectedMatrix), false);
    assert.equal(collides(board, expected.x, expected.y + 1, expectedMatrix), true);
    assert.equal(
      countClearedLinesAfterPlacement(board, type, expected) >= expected.clearedLines,
      true,
    );

    const reachableStates = getReachableStates(type, board);
    const target = reachableStates.get(`${expected.x},${expected.y},${expected.rotationState}`);
    assert.ok(target, `${type} expected placement is not reachable`);
    assert.equal(
      target.path.some((action) => action === "CW" || action === "CCW"),
      true,
      `${type} expected path does not use rotation`,
    );

    if (type === "J") {
      assert.equal(findFinalRotationIntoExpected(type, board, expected, reachableStates), true);
    }
  });
}
