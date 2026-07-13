(function (global) {
  const PURIFY_PATTERN_ONE_LINE = 0.5;
  const PURIFY_PATTERN_TWO_SAME = 0.75;

  function getPurifyHoleColumn(cols, rng, holeHistory) {
    let hole = Math.floor(rng() * cols);
    let safety = 0;
    while (
      holeHistory.length >= 2 &&
      holeHistory[holeHistory.length - 1] === hole &&
      holeHistory[holeHistory.length - 2] === hole &&
      safety < 20
    ) {
      hole = Math.floor(rng() * cols);
      safety += 1;
    }
    holeHistory.push(hole);
    if (holeHistory.length > 2) {
      holeHistory.shift();
    }
    return hole;
  }

  function createPurifyGarbageRow(cols, rng, holeHistory) {
    const hole = getPurifyHoleColumn(cols, rng, holeHistory);
    return createPurifyGarbageRowWithHole(cols, rng, hole, null);
  }

  function createPurifyGarbageRowWithHole(cols, rng, hole, holeHistory) {
    const row = Array.from({ length: cols }, (_, x) => ({ hole, filled: x !== hole }));
    const infectedSlots = row
      .map((cell, index) => (cell.filled ? index : -1))
      .filter((index) => index >= 0);
    const infectedCount = Math.max(1, Math.min(infectedSlots.length, 2 + Math.floor(rng() * 2)));
    const shuffled = [...infectedSlots];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rng() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const chosen = new Set(shuffled.slice(0, infectedCount));
    if (holeHistory) {
      holeHistory.push(hole);
      if (holeHistory.length > 2) holeHistory.shift();
    }
    return {
      hole,
      infectedCount: chosen.size,
      row: row.map((cell, index) => ({
        filled: cell.filled,
        infected: cell.filled ? chosen.has(index) : false,
      })),
    };
  }

  function choosePurifySpawnPattern(rng) {
    const roll = rng();
    if (roll < PURIFY_PATTERN_ONE_LINE) {
      return "one";
    }
    if (roll < PURIFY_PATTERN_TWO_SAME) {
      return "twoSame";
    }
    return "twoDifferent";
  }

  function createPurifyGarbageBatch(cols, rng, holeHistory) {
    const pattern = choosePurifySpawnPattern(rng);
    const rows = [];

    if (pattern === "one") {
      rows.push(createPurifyGarbageRow(cols, rng, holeHistory));
    } else if (pattern === "twoSame") {
      const first = createPurifyGarbageRow(cols, rng, holeHistory);
      const second = createPurifyGarbageRowWithHole(cols, rng, first.hole, holeHistory);
      rows.push(first, second);
    } else {
      const first = createPurifyGarbageRow(cols, rng, holeHistory);
      let second = createPurifyGarbageRow(cols, rng, holeHistory);
      let safety = 0;
      while (second.hole === first.hole && safety < 20) {
        second = createPurifyGarbageRow(cols, rng, holeHistory);
        safety += 1;
      }
      rows.push(first, second);
    }

    return { pattern, rows };
  }

  const api = {
    PURIFY_PATTERN_ONE_LINE,
    PURIFY_PATTERN_TWO_SAME,
    getPurifyHoleColumn,
    createPurifyGarbageRow,
    createPurifyGarbageRowWithHole,
    choosePurifySpawnPattern,
    createPurifyGarbageBatch,
  };

  global.PurifyCore = api;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : window);
