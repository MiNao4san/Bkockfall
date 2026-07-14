const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

const source = fs.readFileSync("game.js", "utf8");

function extractArrayConst(name) {
  const match = source.match(new RegExp(String.raw`const ${name} = (\[[\s\S]*?\]);`));
  assert.ok(match, `${name} was not found`);
  return Function(`return ${match[1]};`)();
}

function extractFunctionSource(name) {
  const start = source.indexOf(`function ${name}`);
  assert.notEqual(start, -1, `${name} was not found`);
  let depth = 0;
  let started = false;
  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
    if (char === "{") {
      depth += 1;
      started = true;
    } else if (char === "}") {
      depth -= 1;
      if (started && depth === 0) {
        return source.slice(start, index + 1);
      }
    }
  }
  throw new Error(`${name} source was not closed`);
}

const CHAPTER_5_MISSION_POOL = extractArrayConst("CHAPTER_5_MISSION_POOL");
const TUTORIAL_CHAPTER_3_SECTIONS = extractArrayConst("TUTORIAL_CHAPTER_3_SECTIONS");

const chapter5Helpers = Function(`
  const CHAPTER_5_MISSION_POOL = ${JSON.stringify(CHAPTER_5_MISSION_POOL)};
  const CHAPTER_5_MISSION_COUNT = 5;
  function rng() { return 0; }
  function shuffle(values) { return [...values]; }
  ${extractFunctionSource("normalizeChapter5Missions")}
  ${extractFunctionSource("isChapter5SingleSuccess")}
  function isChapter5RotationInsertSuccess() { return false; }
  ${extractFunctionSource("isChapter5MissionSuccess")}
  return {
    normalizeChapter5Missions,
    isChapter5SingleSuccess,
    isChapter5MissionSuccess,
  };
`)();

test("Chapter 5 mission pool excludes Perfect Clear while Chapter 3 keeps it", () => {
  assert.deepEqual(CHAPTER_5_MISSION_POOL, [
    "single",
    "double",
    "triple",
    "tetris",
    "hold",
    "backToBack",
    "combo",
    "tSpin",
    "tSpinDouble",
    "rotationInsert",
  ]);
  assert.equal(CHAPTER_5_MISSION_POOL.includes("perfectClear"), false);
  assert.equal(TUTORIAL_CHAPTER_3_SECTIONS.includes("perfectClear"), true);
});

test("Chapter 5 mission normalization removes saved or debug Perfect Clear missions", () => {
  const missions = chapter5Helpers.normalizeChapter5Missions([
    "single",
    "perfectClear",
    "double",
    "single",
  ]);

  assert.equal(missions.length, 5);
  assert.equal(missions.includes("perfectClear"), false);
  assert.equal(new Set(missions).size, missions.length);
  missions.forEach((mission) => {
    assert.equal(CHAPTER_5_MISSION_POOL.includes(mission), true);
  });
});

test("Chapter 5 mission normalization preserves Back-to-Back dependency", () => {
  const missions = chapter5Helpers.normalizeChapter5Missions(["backToBack"]);

  assert.equal(missions.includes("backToBack"), true);
  assert.equal(missions.includes("tetris") || missions.includes("tSpinDouble"), true);
  assert.equal(missions.includes("perfectClear"), false);
});

test("Chapter 5 Single succeeds with any line clear count", () => {
  assert.equal(chapter5Helpers.isChapter5SingleSuccess({ clearedLines: 0 }), false);
  assert.equal(chapter5Helpers.isChapter5SingleSuccess({ clearedLines: 1 }), true);
  assert.equal(chapter5Helpers.isChapter5SingleSuccess({ clearedLines: 2 }), true);
  assert.equal(chapter5Helpers.isChapter5SingleSuccess({ clearedLines: 3 }), true);
  assert.equal(chapter5Helpers.isChapter5SingleSuccess({ clearedLines: 4 }), true);

  assert.equal(chapter5Helpers.isChapter5MissionSuccess("single", { clearedLines: 2, isTSpin: false }), true);
  assert.equal(chapter5Helpers.isChapter5MissionSuccess("single", { clearedLines: 4, isTSpin: false }), true);
});

test("Chapter 2 Single tutorial still requires an exact Single event", () => {
  assert.match(
    source,
    /case "single":\s+return result\.clearedLines === 1 && result\.eventType === "single";/,
  );
});
