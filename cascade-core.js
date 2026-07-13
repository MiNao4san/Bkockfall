// Cascade gravity spec:
// After a line clear, blocks that are currently connected orthogonally
// (up/down/left/right) form one falling group. If a line clear splits a group,
// the split parts fall independently. Color and pieceId are not used.

function countOccupiedBoardCells(board) {
  return board.reduce((sum, row) => sum + row.filter(Boolean).length, 0);
}

function getCascadeConnectedGroups(board, rows, cols) {
  const visited = new Set();
  const groups = [];
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      if (!board[y][x]) continue;
      const startKey = `${x},${y}`;
      if (visited.has(startKey)) continue;

      const queue = [{ x, y }];
      const cells = [];
      visited.add(startKey);

      for (let head = 0; head < queue.length; head += 1) {
        const current = queue[head];
        const cell = board[current.y][current.x];
        cells.push({ x: current.x, y: current.y, cell });

        directions.forEach(([dx, dy]) => {
          const nextX = current.x + dx;
          const nextY = current.y + dy;
          if (nextX < 0 || nextX >= cols || nextY < 0 || nextY >= rows) return;
          if (!board[nextY][nextX]) return;
          const key = `${nextX},${nextY}`;
          if (visited.has(key)) return;
          visited.add(key);
          queue.push({ x: nextX, y: nextY });
        });
      }

      groups.push(cells);
    }
  }

  return groups;
}

function canMoveCascadeGroupDown(cells, rows, occupiedSet) {
  const ownCells = new Set(cells.map(({ x, y }) => `${x},${y}`));
  return cells.every(({ x, y }) => {
    const nextY = y + 1;
    if (nextY >= rows) return false;
    const key = `${x},${nextY}`;
    return !occupiedSet.has(key) || ownCells.has(key);
  });
}

function applyCascadeGravityStepInternal(board, rows, cols) {
  const groups = getCascadeConnectedGroups(board, rows, cols).sort(
    (a, b) => Math.max(...b.map(({ y }) => y)) - Math.max(...a.map(({ y }) => y)),
  );
  const occupiedSet = new Set();
  groups.forEach((cells) => {
    cells.forEach(({ x, y }) => occupiedSet.add(`${x},${y}`));
  });

  const movableGroups = new Set();
  groups.forEach((cells, index) => {
    if (canMoveCascadeGroupDown(cells, rows, occupiedSet)) {
      movableGroups.add(index);
    }
  });
  if (movableGroups.size === 0) return false;

  const nextBoard = Array.from({ length: rows }, () => Array(cols).fill(null));
  const writeCell = (x, y, cell) => {
    if (nextBoard[y][x]) {
      throw new Error(`Cascade gravity duplicate write at ${x},${y}`);
    }
    nextBoard[y][x] = cell;
  };

  groups.forEach((cells, index) => {
    const dy = movableGroups.has(index) ? 1 : 0;
    cells.forEach(({ x, y, cell }) => {
      writeCell(x, y + dy, cell);
    });
  });

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      board[y][x] = nextBoard[y][x];
    }
  }

  return true;
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
  getCascadeConnectedGroups,
  canMoveCascadeGroupDown,
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
