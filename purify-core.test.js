const test = require("node:test");
const assert = require("node:assert/strict");

const PurifyCore = require("./purify-core");

function makeRng(values) {
  let index = 0;
  return () => values[Math.min(index++, values.length - 1)];
}

test("purify pattern selection splits at 50/25/25", () => {
  assert.equal(PurifyCore.choosePurifySpawnPattern(makeRng([0.0])), "one");
  assert.equal(PurifyCore.choosePurifySpawnPattern(makeRng([0.4999])), "one");
  assert.equal(PurifyCore.choosePurifySpawnPattern(makeRng([0.5])), "twoSame");
  assert.equal(PurifyCore.choosePurifySpawnPattern(makeRng([0.7499])), "twoSame");
  assert.equal(PurifyCore.choosePurifySpawnPattern(makeRng([0.75])), "twoDifferent");
  assert.equal(PurifyCore.choosePurifySpawnPattern(makeRng([0.99])), "twoDifferent");
});

test("one-line purify batch creates a single row with one hole", () => {
  const holeHistory = [];
  const batch = PurifyCore.createPurifyGarbageBatch(10, makeRng([0.1, 0.3, 0.8, 0.2]), holeHistory);
  assert.equal(batch.pattern, "one");
  assert.equal(batch.rows.length, 1);
  assert.equal(batch.rows[0].row.filter((cell) => !cell.filled).length, 1);
  assert.equal(holeHistory.length, 1);
});

test("twoSame batch uses the same hole for both rows", () => {
  const holeHistory = [];
  const batch = PurifyCore.createPurifyGarbageBatch(10, makeRng([0.6, 0.2, 0.9, 0.1, 0.7, 0.4]), holeHistory);
  assert.equal(batch.pattern, "twoSame");
  assert.equal(batch.rows.length, 2);
  assert.equal(batch.rows[0].hole, batch.rows[1].hole);
});

test("twoDifferent batch uses different holes", () => {
  const holeHistory = [];
  const batch = PurifyCore.createPurifyGarbageBatch(10, makeRng([0.9, 0.1, 0.8, 0.6, 0.2, 0.4]), holeHistory);
  assert.equal(batch.pattern, "twoDifferent");
  assert.equal(batch.rows.length, 2);
  assert.notEqual(batch.rows[0].hole, batch.rows[1].hole);
});

test("hole history prevents three identical holes in a row", () => {
  const history = [3, 3];
  const hole = PurifyCore.getPurifyHoleColumn(10, makeRng([0.3, 0.3, 0.4, 0.5]), history);
  assert.notEqual(hole, 3);
  assert.equal(history.length <= 2, true);
});

