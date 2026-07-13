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
const ROTATION_INSERT_VERIFIED_SOLUTIONS = extractConst("ROTATION_INSERT_VERIFIED_SOLUTIONS");
const rotationInsertTypesMatch = source.match(/const ROTATION_INSERT_TYPES = (\[[^\]]+\]);/);
assert.ok(rotationInsertTypesMatch, "ROTATION_INSERT_TYPES was not found");
const ROTATION_INSERT_TYPES = Function(`return ${rotationInsertTypesMatch[1]};`)();
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
        const nextX = current.x + kickX;
        const nextY = current.y + kickY;
        if (collides(board, nextX, nextY, nextMatrix)) {
          continue;
        }
        const next = {
          x: nextX,
          y: nextY,
          rotationState: toState,
          path: [...current.path, direction > 0 ? "CW" : "CCW"],
        };
        const key = `${next.x},${next.y},${next.rotationState}`;
        if (next.y >= -4 && next.y <= rows && !seen.has(key)) {
          seen.set(key, next);
          queue.push(next);
        }
        break;
      }
    }
  }

  return seen;
}

function applyRotation(board, type, state, direction) {
  const toState = nextRotationState(state.rotationState, direction);
  const nextMatrix = matrixFor(type, toState);
  for (const [kickX, kickY] of getKickTests(type, state.rotationState, toState)) {
    const nextX = state.x + kickX;
    const nextY = state.y + kickY;
    if (!collides(board, nextX, nextY, nextMatrix)) {
      return {
        x: nextX,
        y: nextY,
        rotationState: toState,
      };
    }
  }
  throw new Error(`${type} solution rotation failed at ${JSON.stringify(state)}`);
}

function replaySolution(type, board, solution) {
  let state = {
    x: Math.floor((cols - SHAPES[type][0].length) / 2),
    y: 1,
    rotationState: "0",
  };

  for (const action of solution) {
    if (action === "Left" || action === "Right" || action === "Soft Drop") {
      const next = {
        x: state.x + (action === "Left" ? -1 : action === "Right" ? 1 : 0),
        y: state.y + (action === "Soft Drop" ? 1 : 0),
        rotationState: state.rotationState,
      };
      if (collides(board, next.x, next.y, matrixFor(type, next.rotationState))) {
        throw new Error(`${type} solution ${action} failed at ${JSON.stringify(state)}`);
      }
      state = next;
      continue;
    }
    if (action === "Rotate Right") {
      state = applyRotation(board, type, state, 1);
      continue;
    }
    if (action === "Rotate Left") {
      state = applyRotation(board, type, state, -1);
      continue;
    }
    throw new Error(`${type} solution contains unknown action: ${action}`);
  }

  return state;
}

test("all rotation insert tutorial piece types are active in Chapter 3", () => {
  assert.deepEqual(ROTATION_INSERT_TYPES, ["I", "J", "L", "S", "Z"]);
});

for (const type of ROTATION_INSERT_TYPES) {
  test(`${type} rotation insert setup is playable with its verified solution`, () => {
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

    const solution = ROTATION_INSERT_VERIFIED_SOLUTIONS[type];
    assert.ok(solution?.length > 0, `${type} solution is missing`);
    const finalState = replaySolution(type, board, solution);
    assert.deepEqual(finalState, {
      x: expected.x,
      y: expected.y,
      rotationState: expected.rotationState,
    });
    assert.equal(
      solution.some((action) => action === "Rotate Right" || action === "Rotate Left"),
      true,
      `${type} solution does not use rotation`,
    );

    const reachableStates = getReachableStates(type, board);
    assert.ok(
      reachableStates.has(`${expected.x},${expected.y},${expected.rotationState}`),
      `${type} expected placement is not reachable by BFS`,
    );
  });
}
