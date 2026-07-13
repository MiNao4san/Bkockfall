// Cascade gravity spec:
// After a line clear, each remaining occupied cell falls independently.
// pieceId and shape connectivity are preserved as cell metadata only; they are
// not used to decide whether a cell can fall.

function countOccupiedBoardCells(board) {
  return board.reduce((sum, row) => sum + row.filter(Boolean).length, 0);
}

function applyCascadeGravityStepInternal(board, rows, cols) {
  let moved = false;

  for (let y = rows - 2; y >= 0; y -= 1) {
    for (let x = 0; x < cols; x += 1) {
      const cell = board[y][x];
      if (!cell) continue;
      if (board[y + 1][x] !== null) continue;

      board[y + 1][x] = cell;
      board[y][x] = null;
      moved = true;
    }
  }

  return moved;
}

function applyCascadeGravityStep(board, rows, cols) {
  const beforeCount = countOccupiedBoardCells(board);
  const moved = applyCascadeGravityStepInternal(board, rows, cols);
  const afterCount = countOccupiedBoardCells(board);

  console.assert(
    beforeCount === afterCount,
    "Cascade gravity changed cell count",
    { beforeCount, afterCount },
  );
  if (beforeCount !== afterCount) {
    throw new Error(`Cascade gravity changed cell count: ${beforeCount} -> ${afterCount}`);
  }

  return moved;
}

function findFullCascadeLines(board, rows) {
  const fullLines = [];
  for (let y = 0; y < rows; y += 1) {
    if (board[y].every(Boolean)) fullLines.push(y);
  }
  return fullLines;
}

function clearCascadeLines(board, cols, fullLines) {
  fullLines.forEach((y) => {
    board[y] = Array(cols).fill(null);
  });
}

function resolveCascade(board, rows, cols) {
  const clears = [];
  let chainCount = 0;

  while (true) {
    const fullLines = findFullCascadeLines(board, rows);
    if (fullLines.length === 0) break;
    chainCount += 1;
    clears.push({ chain: chainCount, lines: fullLines.length });
    clearCascadeLines(board, cols, fullLines);
    while (applyCascadeGravityStep(board, rows, cols)) {}
  }

  return {
    chainCount,
    clears,
    totalLines: clears.reduce((sum, clear) => sum + clear.lines, 0),
  };
}

const CascadeCore = {
  countOccupiedBoardCells,
  applyCascadeGravityStep,
  applyCascadeGravityStepInternal,
  findFullCascadeLines,
  clearCascadeLines,
  resolveCascade,
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = CascadeCore;
}

if (typeof globalThis !== "undefined") {
  globalThis.CascadeCore = CascadeCore;
}
