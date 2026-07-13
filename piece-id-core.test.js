const test = require("node:test");
const assert = require("node:assert/strict");

const PieceIdCore = require("./piece-id-core");

test("piece ids are assigned uniquely across repeated allocations", () => {
  const a = {};
  const b = {};
  const c = {};
  let nextId = 100;
  nextId = PieceIdCore.allocatePieceIdForSpecialModes(a, nextId, true);
  nextId = PieceIdCore.allocatePieceIdForSpecialModes(b, nextId, true);
  nextId = PieceIdCore.allocatePieceIdForSpecialModes(c, nextId, true);

  assert.equal(a.pieceId, 100);
  assert.equal(b.pieceId, 101);
  assert.equal(c.pieceId, 102);
  assert.equal(nextId, 103);
});

test("piece id allocation can be skipped cleanly", () => {
  const piece = {};
  const nextId = PieceIdCore.allocatePieceIdForSpecialModes(piece, 7, false);
  assert.equal(piece.pieceId, undefined);
  assert.equal(nextId, 7);
});
