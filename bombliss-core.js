(function (global) {
  const DEFAULT_RANGE_TABLE = [
    null,
    { left: 3, right: 3, up: 0, down: 0 },
    { left: 3, right: 3, up: 1, down: 1 },
    { left: 3, right: 3, up: 2, down: 2 },
    { left: 3, right: 3, up: 3, down: 3 },
    { left: 4, right: 4, up: 4, down: 4 },
    { left: 4, right: 4, up: 4, down: 4 },
    { left: 5, right: 5, up: 5, down: 5 },
    { left: 5, right: 5, up: 5, down: 5 },
    { left: 6, right: 6, up: 6, down: 6 },
    { left: 6, right: 6, up: 6, down: 6 },
    { left: 7, right: 7, up: 7, down: 7 },
    { left: 7, right: 7, up: 7, down: 7 },
    { left: 8, right: 8, up: 8, down: 8 },
    { left: 8, right: 8, up: 8, down: 8 },
    { left: 9, right: 9, up: 9, down: 9 },
  ];

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function createSmallBombRange(lineCount) {
    const count = Math.max(1, Math.floor(Number(lineCount) || 0));
    if (count < DEFAULT_RANGE_TABLE.length && DEFAULT_RANGE_TABLE[count]) {
      return { ...DEFAULT_RANGE_TABLE[count] };
    }
    const capped = 9;
    return { left: capped, right: capped, up: capped, down: capped };
  }

  function getCellBomb(cell) {
    return typeof cell === "object" && cell ? cell.bomb ?? "none" : "none";
  }

  function getCellLargeBombId(cell) {
    return typeof cell === "object" && cell ? cell.largeBombId ?? null : null;
  }

  function findFullRows(board, rows, cols) {
    const fullRows = [];
    for (let y = 0; y < rows; y += 1) {
      let full = true;
      for (let x = 0; x < cols; x += 1) {
        if (!board[y][x]) {
          full = false;
          break;
        }
      }
      if (full) fullRows.push(y);
    }
    return fullRows;
  }

  function findBomblissLineBombs(board, rows, cols, getBomb = getCellBomb) {
    const completedRows = findFullRows(board, rows, cols);
    const bombs = [];
    completedRows.forEach((y) => {
      for (let x = 0; x < cols; x += 1) {
        const bomb = getBomb(board[y][x]);
        if (bomb === "small" || bomb === "large") {
          bombs.push({ x, y });
        }
      }
    });
    return {
      bombs,
      lineCount: completedRows.length,
      completedRows,
    };
  }

  function getLargeBombBounds(x, y, rows, cols) {
    const size = 10;
    const left = clamp(x - 4, 0, Math.max(0, cols - size));
    const top = clamp(y - 4, 0, Math.max(0, rows - size));
    return {
      left,
      right: clamp(left + size - 1, 0, cols - 1),
      top,
      bottom: clamp(top + size - 1, 0, rows - 1),
    };
  }

  function getLargeBombAnchor(board, largeBombId) {
    let anchorX = null;
    let anchorY = null;
    for (let y = 0; y < board.length; y += 1) {
      for (let x = 0; x < (board[y]?.length ?? 0); x += 1) {
        if (getCellLargeBombId(board[y][x]) !== largeBombId) continue;
        if (anchorX === null || x < anchorX || (x === anchorX && y < anchorY)) {
          anchorX = x;
          anchorY = y;
        }
      }
    }
    return anchorX === null ? null : { x: anchorX, y: anchorY };
  }

  function getSmallBombBounds(x, y, lineCount, rows, cols) {
    const range = createSmallBombRange(lineCount);
    return {
      left: clamp(x - range.left, 0, cols - 1),
      right: clamp(x + range.right, 0, cols - 1),
      top: clamp(y - range.up, 0, rows - 1),
      bottom: clamp(y + range.down, 0, rows - 1),
    };
  }

  function collectLargeBombCells(board, rows, cols, largeBombId) {
    const cells = [];
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        if (getCellLargeBombId(board[y][x]) === largeBombId) {
          cells.push({ x, y });
        }
      }
    }
    return cells;
  }

  function explodeBomblissBombs(board, rows, cols, initialBombs, options = {}) {
    const queue = [];
    const queueKeys = new Set();
    const exploded = new Set();
    const explodedLargeBombIds = new Set();
    let usedSmall = false;
    let usedLarge = false;
    let minX = cols;
    let minY = rows;
    let maxX = -1;
    let maxY = -1;
    const lineCount = Math.max(1, Math.floor(Number(options.lineCount) || 0));

    const enqueueBomb = (item) => {
      if (!item) return;
      const bomb = item.bomb ?? getCellBomb(board[item.y]?.[item.x]);
      if (bomb !== "small" && bomb !== "large") return;
      const largeBombId = item.largeBombId ?? getCellLargeBombId(board[item.y]?.[item.x]);
      const key = bomb === "large" ? `L:${largeBombId ?? `${item.x},${item.y}`}` : `S:${item.x},${item.y}`;
      if (queueKeys.has(key)) return;
      queueKeys.add(key);
      queue.push({
        x: item.x,
        y: item.y,
        bomb,
        largeBombId: bomb === "large" ? largeBombId : null,
      });
    };

    initialBombs.forEach((item) => enqueueBomb(item));

    while (queue.length > 0) {
      const current = queue.shift();
      const { x, y } = current;
      const key = `${x},${y}`;
      if (exploded.has(key) || (current.bomb === "large" && explodedLargeBombIds.has(current.largeBombId))) continue;

      const cell = board[y]?.[x];
      const bomb = current.bomb === "large" || current.bomb === "small" ? current.bomb : getCellBomb(cell);
      const largeBombId = current.bomb === "large" ? current.largeBombId : getCellLargeBombId(cell);
      let bounds;
      if (bomb === "large" && largeBombId !== null) {
        if (explodedLargeBombIds.has(largeBombId)) continue;
        explodedLargeBombIds.add(largeBombId);
        collectLargeBombCells(board, rows, cols, largeBombId).forEach(({ x: cx, y: cy }) => {
          exploded.add(`${cx},${cy}`);
        });
        const anchor = getLargeBombAnchor(board, largeBombId) ?? { x, y };
        bounds = getLargeBombBounds(anchor.x, anchor.y, rows, cols);
      } else {
        exploded.add(key);
        bounds = getSmallBombBounds(x, y, lineCount, rows, cols);
      }

      usedLarge ||= bomb === "large";
      usedSmall ||= bomb === "small";
      minX = Math.min(minX, bounds.left);
      minY = Math.min(minY, bounds.top);
      maxX = Math.max(maxX, bounds.right);
      maxY = Math.max(maxY, bounds.bottom);

      for (let yy = bounds.top; yy <= bounds.bottom; yy += 1) {
        for (let xx = bounds.left; xx <= bounds.right; xx += 1) {
          const chainBomb = getCellBomb(board[yy][xx]);
          if (chainBomb === "small") {
            enqueueBomb({ x: xx, y: yy, bomb: "small" });
          } else if (chainBomb === "large") {
            const chainLargeBombId = getCellLargeBombId(board[yy][xx]);
            if (chainLargeBombId !== null) {
              const anchor = getLargeBombAnchor(board, chainLargeBombId) ?? { x: xx, y: yy };
              enqueueBomb({
                x: anchor.x,
                y: anchor.y,
                bomb: "large",
                largeBombId: chainLargeBombId,
              });
            }
          }
          board[yy][xx] = null;
        }
      }
    }

    if (maxX >= 0) {
      return {
        usedSmall,
        usedLarge,
        revealRect: {
          x: minX,
          y: minY,
          width: maxX - minX + 1,
          height: maxY - minY + 1,
        },
      };
    }

    return { usedSmall, usedLarge, revealRect: null };
  }

  function findConnectedComponents(board, rows, cols) {
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const components = [];
    const deltas = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        if (!board[y][x] || visited[y][x]) continue;
        const queue = [{ x, y }];
        const cells = [];
        visited[y][x] = true;
        while (queue.length > 0) {
          const current = queue.shift();
          cells.push({ x: current.x, y: current.y, cell: board[current.y][current.x] });
          for (const [dx, dy] of deltas) {
            const nx = current.x + dx;
            const ny = current.y + dy;
            if (nx < 0 || nx >= cols || ny < 0 || ny >= rows) continue;
            if (visited[ny][nx] || !board[ny][nx]) continue;
            visited[ny][nx] = true;
            queue.push({ x: nx, y: ny });
          }
        }
        components.push(cells);
      }
    }
    return components;
  }

  function canComponentMoveDown(board, component, rows, cols) {
    const componentSet = new Set(component.map(({ x, y }) => `${x},${y}`));
    return component.every(({ x, y }) => {
      const ny = y + 1;
      if (ny >= rows) return false;
      const below = board[ny][x];
      if (!below) return true;
      return componentSet.has(`${x},${ny}`);
    });
  }

  function applyBomblissGravity(board, rows, cols) {
    let moved = false;

    while (true) {
      const components = findConnectedComponents(board, rows, cols);
      const movable = components.filter((component) => canComponentMoveDown(board, component, rows, cols));
      if (movable.length === 0) break;

      const nextBoard = Array.from({ length: rows }, () => Array(cols).fill(null));
      const movableKeys = new Set();

      movable.forEach((component) => {
        component.forEach(({ x, y, cell }) => {
          movableKeys.add(`${x},${y}`);
          nextBoard[y + 1][x] = cell;
        });
      });

      components
        .filter((component) => !movable.includes(component))
        .forEach((component) => {
          component.forEach(({ x, y, cell }) => {
            nextBoard[y][x] = cell;
          });
        });

      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          board[y][x] = nextBoard[y][x];
        }
      }
      moved = true;
    }

    return moved;
  }

  function createBomblissLargeBombs(board, rows, cols, getBomb = getCellBomb, getType = (cell) => (typeof cell === "string" ? cell : cell?.type), createCell = null, nextLargeBombId = 1) {
    let created = false;
    const used = Array.from({ length: rows }, () => Array(cols).fill(false));
    let largeBombId = nextLargeBombId;

    for (let y = 0; y < rows - 1; y += 1) {
      for (let x = 0; x < cols - 1; x += 1) {
        const positions = [
          [x, y],
          [x + 1, y],
          [x, y + 1],
          [x + 1, y + 1],
        ];
        if (positions.some(([cx, cy]) => used[cy][cx])) continue;
        const cells = positions.map(([cx, cy]) => board[cy][cx]);
        if (!cells.every((cell) => getBomb(cell) === "small")) continue;
        positions.forEach(([cx, cy]) => {
          used[cy][cx] = true;
        });
        positions.forEach(([cx, cy]) => {
          const cell = board[cy][cx];
          const payload = {
            type: getType(cell),
            bomb: "large",
            largeBombId,
          };
          board[cy][cx] = createCell ? createCell(payload) : payload;
        });
        largeBombId += 1;
        created = true;
      }
    }

    return {
      created,
      nextLargeBombId: largeBombId,
    };
  }

  function processBomblissChains(board, rows, cols, helpers = {}) {
    const getBomb = helpers.getCellBomb ?? getCellBomb;
    const getLargeBombId = helpers.getCellLargeBombId ?? getCellLargeBombId;
    const getType = helpers.getCellType ?? ((cell) => (typeof cell === "string" ? cell : cell?.type));
    const createCell = helpers.createCell ?? null;
    let nextLargeBombId = Number(helpers.nextLargeBombId ?? 1);
    let chainCount = 0;
    let usedSmall = false;
    let usedLarge = false;
    let madeLarge = false;
    let revealRect = null;
    let lastLineCount = 0;

    while (true) {
      const completed = findBomblissLineBombs(board, rows, cols, getBomb);
      if (completed.bombs.length === 0) break;
      chainCount += 1;
      lastLineCount = completed.lineCount;
      const result = explodeBomblissBombs(board, rows, cols, completed.bombs, {
        lineCount: completed.lineCount,
        getCellBomb: getBomb,
        getCellLargeBombId: getLargeBombId,
      });
      usedSmall ||= result.usedSmall;
      usedLarge ||= result.usedLarge;
      revealRect = result.revealRect ?? revealRect;
      applyBomblissGravity(board, rows, cols);
      const largeResult = createBomblissLargeBombs(board, rows, cols, getBomb, getType, createCell, nextLargeBombId);
      nextLargeBombId = largeResult.nextLargeBombId;
      madeLarge ||= largeResult.created;
    }

    return {
      chainCount,
      usedSmall,
      usedLarge,
      madeLarge,
      revealRect,
      lastLineCount,
      nextLargeBombId,
    };
  }

  const api = {
    clamp,
    createSmallBombRange,
    getLargeBombBounds,
    getSmallBombBounds,
    findFullRows,
    findBomblissLineBombs,
    explodeBomblissBombs,
    applyBomblissGravity,
    createBomblissLargeBombs,
    processBomblissChains,
    getCellBomb,
    getCellLargeBombId,
  };

  global.BomblissCore = api;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : window);
