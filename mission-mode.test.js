const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

const gameSource = fs.readFileSync("game.js", "utf8");
const htmlSource = fs.readFileSync("index.html", "utf8");

function extractConstObject(name) {
  const start = gameSource.indexOf(`const ${name} = {`);
  assert.notEqual(start, -1, `${name} was not found`);
  let depth = 0;
  let started = false;
  for (let index = start; index < gameSource.length; index += 1) {
    const char = gameSource[index];
    if (char === "{") {
      depth += 1;
      started = true;
    } else if (char === "}") {
      depth -= 1;
      if (started && depth === 0) {
        const statement = gameSource.slice(start, index + 2);
        return Function(`${statement}; return ${name};`)();
      }
    }
  }
  throw new Error(`${name} source was not closed`);
}

function extractConstArray(name) {
  const match = gameSource.match(new RegExp(String.raw`const ${name} = (\[[\s\S]*?\]);`));
  assert.ok(match, `${name} was not found`);
  return Function(`return ${match[1]};`)();
}

const MISSION_MODE_SETS = extractConstObject("MISSION_MODE_SETS");
const TUTORIAL_CHAPTER_3_SECTIONS = extractConstArray("TUTORIAL_CHAPTER_3_SECTIONS");

test("tutorial chapters only expose Chapter 1 through 4", () => {
  const match = gameSource.match(/const TUTORIAL_CHAPTER_SECTIONS = \{([\s\S]*?)\n\};/);
  assert.ok(match, "TUTORIAL_CHAPTER_SECTIONS was not found");
  const keys = [...match[1].matchAll(/^\s*(\d+):/gm)].map((entry) => entry[1]);
  assert.deepEqual(keys, ["1", "2", "3", "4"]);
  assert.equal(htmlSource.includes("tutorialChapter5Button"), false);
  assert.equal(htmlSource.includes("Chapter 5"), false);
});

test("practice menu exposes mission mode and set selection", () => {
  assert.match(htmlSource, /id="missionModeButton"/);
  for (let setNumber = 1; setNumber <= 5; setNumber += 1) {
    assert.match(htmlSource, new RegExp(`id="missionSet${setNumber}Button"`));
  }
});

test("mission mode defines five sets with ten missions each", () => {
  assert.deepEqual(Object.keys(MISSION_MODE_SETS), ["1", "2", "3", "4", "5"]);
  for (let setNumber = 1; setNumber <= 5; setNumber += 1) {
    const missions = MISSION_MODE_SETS[setNumber];
    assert.equal(missions.length, 10, `set ${setNumber} should contain 10 missions`);
    missions.forEach((mission, index) => {
      assert.equal(mission.id, `${setNumber}-${index + 1}`);
      assert.equal(typeof mission.type, "string");
      assert.equal(typeof mission.description, "string");
    });
  }
});

test("set 1 missions match the requested basic requirements", () => {
  const set1 = MISSION_MODE_SETS[1];
  assert.deepEqual(set1[0], { id: "1-1", type: "clearAtLeast", minLines: 1, description: "1ライン以上消そう" });
  assert.equal(set1[1].type, "clearAtLeast");
  assert.equal(set1[1].minLines, 2);
  assert.deepEqual(set1[2].pieces, ["S", "Z"]);
  assert.deepEqual(set1[3].pieces, ["J", "L"]);
  assert.deepEqual(set1[4].pieces, ["O"]);
  assert.equal(set1[4].exactLines, 2);
  assert.deepEqual(set1[8].targetLinesFromBottom, [4]);
  assert.deepEqual(set1[9].garbage, { kind: "fixedHole", rows: 4, holeColumn: 6 });
  assert.equal(set1[9].exactLines, 4);
});

test("Chapter 3 Perfect Clear tutorial remains available", () => {
  assert.equal(TUTORIAL_CHAPTER_3_SECTIONS.includes("perfectClear"), true);
});

test("old Chapter 5 random mission symbols are removed", () => {
  assert.equal(gameSource.includes("CHAPTER_5_MISSION_POOL"), false);
  assert.equal(gameSource.includes("chapter5Completed"), false);
  assert.equal(gameSource.includes("startTutorialChapter5"), false);
});
