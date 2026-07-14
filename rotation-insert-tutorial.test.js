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
const chapter3SetupsSource = source.slice(
  source.indexOf("const CHAPTER_3_SETUPS"),
  source.indexOf("const TUTORIAL_CHAPTER_SECTIONS"),
);
const CHAPTER_3_SETUPS = Function(
  `${chapter3SetupsSource}; return CHAPTER_3_SETUPS;`,
)();
const chapter3SectionsMatch = source.match(/const TUTORIAL_CHAPTER_3_SECTIONS = (\[[\s\S]*?\]);/);
assert.ok(chapter3SectionsMatch, "TUTORIAL_CHAPTER_3_SECTIONS was not found");
const TUTORIAL_CHAPTER_3_SECTIONS = Function(`return ${chapter3SectionsMatch[1]};`)();

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

function expectedClearedLines(expected) {
  return Number.isFinite(expected.clearedLines)
    ? expected.clearedLines
    : expected.minClearedLines;
}

function lineClearMatchesExpected(actual, expected) {
  return Number.isFinite(expected.clearedLines)
    ? actual === expected.clearedLines
    : actual >= expected.minClearedLines;
}

function countFullLines(board) {
  return board.filter((row) => row.every(Boolean)).length;
}

function getTSpinCorners(expected) {
  const centerX = expected.x + 1;
  const centerY = expected.y + 1;
  return [
    [centerX - 1, centerY - 1],
    [centerX + 1, centerY - 1],
    [centerX - 1, centerY + 1],
    [centerX + 1, centerY + 1],
  ];
}

function countTSpinFilledCorners(board, expected) {
  return getTSpinCorners(expected).filter(([x, y]) => (
    x < 0 ||
    x >= cols ||
    y >= rows ||
    (y >= 0 && Boolean(board[y][x]))
  )).length;
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

function getReachableStatesWithRotationLimit(type, board, maxRotations) {
  const startX = Math.floor((cols - SHAPES[type][0].length) / 2);
  const start = { x: startX, y: 1, rotationState: "0", rotationCount: 0, path: [], lastKick: null };
  const queue = [start];
  const seen = new Map([[`${start.x},${start.y},${start.rotationState},${start.rotationCount}`, start]]);

  while (queue.length > 0) {
    const current = queue.shift();
    const movementActions = [
      ["Left", -1, 0],
      ["Right", 1, 0],
      ["Soft Drop", 0, 1],
    ];

    for (const [action, dx, dy] of movementActions) {
      const matrix = matrixFor(type, current.rotationState);
      const next = {
        x: current.x + dx,
        y: current.y + dy,
        rotationState: current.rotationState,
        rotationCount: current.rotationCount,
        path: [...current.path, action],
        lastKick: current.lastKick,
      };
      const key = `${next.x},${next.y},${next.rotationState},${next.rotationCount}`;
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

    if (current.rotationCount >= maxRotations) continue;

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
          rotationCount: current.rotationCount + 1,
          path: [...current.path, direction > 0 ? "Rotate Right" : "Rotate Left"],
          lastKick: {
            from: current.rotationState,
            to: toState,
            kick: [kickX, kickY],
            action: direction > 0 ? "Rotate Right" : "Rotate Left",
          },
        };
        const key = `${next.x},${next.y},${next.rotationState},${next.rotationCount}`;
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
        rotationCount: (state.rotationCount ?? 0) + 1,
        lastKick: {
          from: state.rotationState,
          to: toState,
          kick: [kickX, kickY],
          action: direction > 0 ? "Rotate Right" : "Rotate Left",
        },
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
    rotationCount: 0,
    lastKick: null,
  };

  for (const action of solution) {
    if (action === "Left" || action === "Right" || action === "Soft Drop") {
      const next = {
        x: state.x + (action === "Left" ? -1 : action === "Right" ? 1 : 0),
        y: state.y + (action === "Soft Drop" ? 1 : 0),
        rotationState: state.rotationState,
        rotationCount: state.rotationCount,
        lastKick: state.lastKick,
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

function hardDropFromSpawn(type, board, offsetX = 0) {
  let state = {
    x: Math.floor((cols - SHAPES[type][0].length) / 2) + offsetX,
    y: 1,
    rotationState: "0",
  };
  while (!collides(board, state.x, state.y + 1, matrixFor(type, state.rotationState))) {
    state = { ...state, y: state.y + 1 };
  }
  return state;
}

test("Chapter 3 uses independent tutorial sections in order", () => {
  assert.deepEqual(TUTORIAL_CHAPTER_3_SECTIONS, [
    "rotationInsertI",
    "rotationInsertJ",
    "rotationInsertL",
    "rotationInsertS",
    "rotationInsertZ",
    "tSpin",
    "tSpinDouble",
    "perfectClear",
  ]);
});

test("Chapter 3 does not keep the old single rotationInsert section", () => {
  assert.equal(TUTORIAL_CHAPTER_3_SECTIONS.includes("rotationInsert"), false);
  assert.equal(source.includes("getAvailableRotationInsertTypes"), false);
  assert.equal(source.includes("handleUnavailableRotationInsertSubStep"), false);
});

for (const sectionId of TUTORIAL_CHAPTER_3_SECTIONS) {
  test(`${sectionId} setup has a valid board shape`, () => {
    const pattern = CHAPTER_3_SETUPS[sectionId].board;
    assert.equal(pattern.length, rows);
    pattern.forEach((row) => {
      assert.equal(row.length, cols);
      assert.match(row, /^[.X]+$/);
    });
  });
}

for (const sectionId of [
  "rotationInsertI",
  "rotationInsertJ",
  "rotationInsertL",
  "rotationInsertS",
  "rotationInsertZ",
]) {
  test(`${sectionId} setup is playable with its registered solution`, () => {
    const setup = CHAPTER_3_SETUPS[sectionId];
    const type = setup.pieceType;
    const pattern = setup.board;

    const board = boardFromPattern(pattern);
    const expected = setup.expected;
    const expectedMatrix = matrixFor(type, expected.rotationState);

    assert.equal(countFullLines(board), 0, `${sectionId} starts with a full line`);
    assert.equal(collides(board, expected.x, expected.y, expectedMatrix), false);
    assert.equal(collides(board, expected.x, expected.y + 1, expectedMatrix), true);
    assert.equal(
      lineClearMatchesExpected(countClearedLinesAfterPlacement(board, type, expected), expected),
      true,
    );

    const solution = setup.verifiedSolution;
    assert.ok(solution?.length > 0, `${type} solution is missing`);
    const finalState = replaySolution(type, board, solution);
    assert.deepEqual({
      x: finalState.x,
      y: finalState.y,
      rotationState: finalState.rotationState,
    }, {
      x: expected.x,
      y: expected.y,
      rotationState: expected.rotationState,
    });
    assert.equal(
      finalState.rotationCount >= (setup.minimumRotationCount ?? 1),
      true,
      `${type} solution does not meet minimumRotationCount`,
    );
    assert.equal(
      solution.some((action) => action === "Rotate Right" || action === "Rotate Left"),
      true,
      `${type} solution does not use rotation`,
    );
    if (sectionId === "rotationInsertS" || sectionId === "rotationInsertZ") {
      assert.equal(
        solution.filter((action) => action === "Rotate Right" || action === "Rotate Left").length >= 2,
        true,
        `${type} solution does not use two rotations`,
      );
    }

    const reachableStates = getReachableStates(type, board);
    assert.ok(
      reachableStates.has(`${expected.x},${expected.y},${expected.rotationState}`),
      `${type} expected placement is not reachable by BFS`,
    );
  });
}

test("rotation insert setups cannot satisfy success with too few rotations", () => {
  for (const sectionId of [
    "rotationInsertJ",
    "rotationInsertL",
    "rotationInsertS",
    "rotationInsertZ",
  ]) {
    const setup = CHAPTER_3_SETUPS[sectionId];
    const type = setup.pieceType;
    const board = boardFromPattern(setup.board);
    const expected = setup.expected;
    const maxRotations = (setup.minimumRotationCount ?? 1) - 1;
    const reachableStates = getReachableStatesWithRotationLimit(type, board, maxRotations);
    const invalidSuccess = [...reachableStates.values()].some((state) => (
      state.x === expected.x &&
      state.y === expected.y &&
      state.rotationState === expected.rotationState &&
      lineClearMatchesExpected(countClearedLinesAfterPlacement(board, type, expected), expected)
    ));

    assert.equal(invalidSuccess, false, `${sectionId} can pass with too few rotations`);
  }
});

test("J rotation insert board is the horizontal mirror of the L board", () => {
  const jBoard = CHAPTER_3_SETUPS.rotationInsertJ.board;
  const lBoard = CHAPTER_3_SETUPS.rotationInsertL.board;
  assert.deepEqual(jBoard, lBoard.map((row) => [...row].reverse().join("")));
});

test("J, L, S, and Z registered solutions use the stored non-zero SRS kick into the cavity", () => {
  for (const sectionId of ["rotationInsertJ", "rotationInsertL", "rotationInsertS", "rotationInsertZ"]) {
    const setup = CHAPTER_3_SETUPS[sectionId];
    const board = boardFromPattern(setup.board);
    const finalState = replaySolution(setup.pieceType, board, setup.verifiedSolution);
    assert.ok(finalState.lastKick, `${sectionId} did not rotate`);
    assert.notDeepEqual(finalState.lastKick.kick, [0, 0]);
    assert.deepEqual(finalState.lastKick.kick, [setup.usedKick.x, setup.usedKick.y]);
  }
});

test("Z rotation insert board is the horizontal mirror of the S board", () => {
  const zBoard = CHAPTER_3_SETUPS.rotationInsertZ.board;
  const sBoard = CHAPTER_3_SETUPS.rotationInsertS.board;
  assert.deepEqual(zBoard, sBoard.map((row) => [...row].reverse().join("")));
});

test("T-Spin Single setup is reachable only with rotation and satisfies 3-corner detection", () => {
  const setup = CHAPTER_3_SETUPS.tSpin;
  const board = boardFromPattern(setup.board);
  const expected = setup.expected;

  assert.equal(countFullLines(board), 0);
  assert.equal(collides(board, expected.x, expected.y, matrixFor("T", expected.rotationState)), false);
  assert.equal(collides(board, expected.x, expected.y + 1, matrixFor("T", expected.rotationState)), true);
  assert.equal(countClearedLinesAfterPlacement(board, "T", expected), 1);
  assert.equal(countTSpinFilledCorners(board, expected) >= 3, true);

  const finalState = replaySolution("T", board, setup.verifiedSolution);
  assert.deepEqual({
    x: finalState.x,
    y: finalState.y,
    rotationState: finalState.rotationState,
  }, {
    x: expected.x,
    y: expected.y,
    rotationState: expected.rotationState,
  });

  const noRotationStates = getReachableStatesWithRotationLimit("T", board, 0);
  assert.equal(
    [...noRotationStates.values()].some((state) => (
      state.x === expected.x &&
      state.y === expected.y &&
      state.rotationState === expected.rotationState
    )),
    false,
  );
});

test("T-Spin Double setup is reachable only with rotation and clears exactly two lines", () => {
  const setup = CHAPTER_3_SETUPS.tSpinDouble;
  const board = boardFromPattern(setup.board);
  const expected = setup.expected;

  assert.equal(countFullLines(board), 0);
  assert.equal(collides(board, expected.x, expected.y, matrixFor("T", expected.rotationState)), false);
  assert.equal(collides(board, expected.x, expected.y + 1, matrixFor("T", expected.rotationState)), true);
  assert.equal(countClearedLinesAfterPlacement(board, "T", expected), 2);
  assert.equal(countTSpinFilledCorners(board, expected) >= 3, true);

  const finalState = replaySolution("T", board, setup.verifiedSolution);
  assert.deepEqual({
    x: finalState.x,
    y: finalState.y,
    rotationState: finalState.rotationState,
  }, {
    x: expected.x,
    y: expected.y,
    rotationState: expected.rotationState,
  });
  assert.ok(finalState.lastKick);
  assert.equal(setup.verifiedSolution.at(-1), "Rotate Right");
  assert.notDeepEqual(finalState.lastKick.kick, [0, 0]);
  assert.deepEqual(finalState.lastKick.kick, [setup.usedKick.x, setup.usedKick.y]);

  for (let offsetX = -3; offsetX <= 4; offsetX += 1) {
    const directDropState = hardDropFromSpawn("T", board, offsetX);
    assert.notDeepEqual({
      x: directDropState.x,
      y: directDropState.y,
      rotationState: directDropState.rotationState,
    }, {
      x: expected.x,
      y: expected.y,
      rotationState: expected.rotationState,
    });
  }

  const noRotationStates = getReachableStatesWithRotationLimit("T", board, 0);
  assert.equal(
    [...noRotationStates.values()].some((state) => (
      state.x === expected.x &&
      state.y === expected.y &&
      state.rotationState === expected.rotationState
    )),
    false,
  );
});
