const test = require("node:test");
const assert = require("node:assert/strict");

const ZoneCore = require("./zone-core");

test("zone base duration scales with consumed gauge", () => {
  assert.equal(ZoneCore.getZoneBaseDurationMs(50), 10000);
  assert.equal(ZoneCore.getZoneBaseDurationMs(75), 15000);
  assert.equal(ZoneCore.getZoneBaseDurationMs(100), 20000);
});

test("zone event keys map to expected extensions", () => {
  assert.equal(ZoneCore.getZoneEventKey({ cleared: 1 }), "SINGLE");
  assert.equal(ZoneCore.getZoneEventKey({ cleared: 2 }), "DOUBLE");
  assert.equal(ZoneCore.getZoneEventKey({ cleared: 3 }), "TRIPLE");
  assert.equal(ZoneCore.getZoneEventKey({ cleared: 4 }), "TETRIS");
  assert.equal(ZoneCore.getZoneEventKey({ cleared: 1, tSpin: true }), "T_SPIN_SINGLE");
  assert.equal(ZoneCore.getZoneEventKey({ cleared: 2, tSpin: true }), "T_SPIN_DOUBLE");
  assert.equal(ZoneCore.getZoneEventKey({ cleared: 3, tSpin: true }), "T_SPIN_TRIPLE");
  assert.equal(ZoneCore.getZoneEventKey({ perfectClear: true }), "PERFECT_CLEAR");
  assert.equal(ZoneCore.getZoneExtensionMs({ cleared: 4 }), 3000);
  assert.equal(ZoneCore.getZoneExtensionMs({ cleared: 2, tSpin: true }), 4000);
  assert.equal(ZoneCore.getZoneExtensionMs({ cleared: 3, tSpin: true }), 6000);
  assert.equal(ZoneCore.getZoneExtensionMs({ perfectClear: true }), 5000);
});

test("zone extension respects the 30s cap", () => {
  const capped = ZoneCore.applyZoneExtension(28000, 3000);
  assert.equal(capped.before, 28000);
  assert.equal(capped.requested, 3000);
  assert.equal(capped.after, 30000);
  assert.equal(capped.applied, 2000);

  const uncapped = ZoneCore.applyZoneExtension(0, 6000);
  assert.equal(uncapped.after, 6000);
  assert.equal(uncapped.applied, 6000);
});

test("zone formatting stays readable", () => {
  assert.equal(ZoneCore.formatZoneTimer(12400), "12.4s");
  assert.equal(ZoneCore.getZoneStatusText(12400), "ZONE 12.4s");
  assert.equal(ZoneCore.getZoneExtensionText("T_SPIN_DOUBLE", 4000), "T-SPIN DOUBLE  +4.0s");
});

test("zone no longer ends by line count", () => {
  assert.equal(ZoneCore.shouldFinishZoneByLineCount(), false);
});
