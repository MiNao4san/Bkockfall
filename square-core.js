(function (global) {
  const GOLD_SQUARE_CREATE_SCORE = 2000;
  const SILVER_SQUARE_CREATE_SCORE = 1000;
  const GOLD_SQUARE_LINE_SCORE = 400;
  const SILVER_SQUARE_LINE_SCORE = 200;

  function detectAndMarkSquares(board, rows, cols, helpers = {}) {
    const getCellPieceId = helpers.getCellPieceId ?? ((cell) => (typeof cell === "object" && cell ? cell.pieceId : null));
    const getCellType = helpers.getCellType ?? ((cell) => (typeof cell === "object" && cell ? cell.type : cell));
    const getCellSquareType = helpers.getCellSquareType ?? ((cell) => (typeof cell === "object" && cell ? cell.squareType : null));
    const squareGroups = helpers.squareGroups ?? new Map();
    const createSquareId = helpers.createSquareId ?? (() => 1);
    const now = helpers.now ?? (() => Date.now());

    const madeSquares = [];

    for (let top = 0; top <= rows - 4; top += 1) {
      for (let left = 0; left <= cols - 4; left += 1) {
        const cells = [];
        const pieceIds = new Set();
        let valid = true;

        for (let y = top; y < top + 4 && valid; y += 1) {
          for (let x = left; x < left + 4; x += 1) {
            const cell = board[y][x];
            const pieceId = getCellPieceId(cell);
            if (!cell || pieceId === null || getCellSquareType(cell)) {
              valid = false;
              break;
            }
            cells.push(cell);
            pieceIds.add(pieceId);
          }
        }

        if (!valid || pieceIds.size !== 4) continue;

        const pieceCells = new Map();
        for (let y = 0; y < rows; y += 1) {
          for (let x = 0; x < cols; x += 1) {
            const cell = board[y][x];
            const pieceId = getCellPieceId(cell);
            if (pieceId === null) continue;
            if (!pieceCells.has(pieceId)) {
              pieceCells.set(pieceId, []);
            }
            pieceCells.get(pieceId).push({ x, y, cell });
          }
        }

        const ids = [...pieceIds];
        const allPiecesInside = ids.every((pieceId) => {
          const piece = pieceCells.get(pieceId);
          return (
            piece?.length === 4 &&
            piece.every(({ x, y, cell }) => (
              x >= left &&
              x < left + 4 &&
              y >= top &&
              y < top + 4 &&
              !getCellSquareType(cell)
            ))
          );
        });

        if (!allPiecesInside) continue;

        const types = new Set(ids.map((pieceId) => getCellType(pieceCells.get(pieceId)?.[0]?.cell)));
        const squareType = types.size === 1 ? "gold" : "silver";
        const squareId = createSquareId();

        cells.forEach((cell) => {
          cell.squareId = squareId;
          cell.squareType = squareType;
        });

        squareGroups.set(squareId, {
          id: squareId,
          type: squareType,
          createdAt: now(),
          originalCellCount: 16,
          remainingCellCount: 16,
        });

        madeSquares.push({ squareId, squareType });
      }
    }

    return { madeSquares, squareGroups };
  }

  function refreshSquareGroupsAfterLineClear(board, rows, cols, squareGroups, helpers = {}) {
    const getCellSquareType = helpers.getCellSquareType ?? ((cell) => (typeof cell === "object" && cell ? cell.squareType : null));
    const cellsBySquareId = new Map();

    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const cell = board[y][x];
        if (!cell || !cell.squareId || !getCellSquareType(cell)) continue;
        if (!cellsBySquareId.has(cell.squareId)) {
          cellsBySquareId.set(cell.squareId, []);
        }
        cellsBySquareId.get(cell.squareId).push(cell);
      }
    }

    for (const [squareId, group] of [...squareGroups.entries()]) {
      const cells = cellsBySquareId.get(squareId) ?? [];
      group.remainingCellCount = cells.length;
      if (cells.length === 0) {
        squareGroups.delete(squareId);
        continue;
      }
      if (cells.length < group.originalCellCount) {
        cells.forEach((cell) => {
          cell.squareId = null;
          cell.squareType = null;
        });
        squareGroups.delete(squareId);
      }
    }

    return squareGroups;
  }

  function getSquareLineBonus(clearedCells, level) {
    const clearedSquares = new Map();

    for (const cell of clearedCells) {
      if (!cell?.squareId || !cell?.squareType) continue;
      clearedSquares.set(cell.squareId, cell.squareType);
    }

    let bonus = 0;
    for (const squareType of clearedSquares.values()) {
      bonus += squareType === "gold" ? GOLD_SQUARE_LINE_SCORE * level : SILVER_SQUARE_LINE_SCORE * level;
    }

    return bonus;
  }

  function getSquareCreateScore(squareType, level) {
    return (squareType === "gold" ? GOLD_SQUARE_CREATE_SCORE : SILVER_SQUARE_CREATE_SCORE) * level;
  }

  const api = {
    GOLD_SQUARE_CREATE_SCORE,
    SILVER_SQUARE_CREATE_SCORE,
    GOLD_SQUARE_LINE_SCORE,
    SILVER_SQUARE_LINE_SCORE,
    detectAndMarkSquares,
    refreshSquareGroupsAfterLineClear,
    getSquareLineBonus,
    getSquareCreateScore,
  };

  global.SquareCore = api;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : window);
