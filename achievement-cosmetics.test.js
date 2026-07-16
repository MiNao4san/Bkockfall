import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const gameSource = readFileSync(new URL("./game.js", import.meta.url), "utf8");
const htmlSource = readFileSync(new URL("./index.html", import.meta.url), "utf8");

function extractConstArray(name) {
  const marker = `const ${name} = `;
  const start = gameSource.indexOf(marker);
  assert.notEqual(start, -1, `${name} not found`);
  const arrayStart = gameSource.indexOf("[", start);
  let depth = 0;
  for (let index = arrayStart; index < gameSource.length; index += 1) {
    const char = gameSource[index];
    if (char === "[") depth += 1;
    if (char === "]") {
      depth -= 1;
      if (depth === 0) {
        return Function(`
          const BGM_INTRO_SRC = "BGM/Koeobeiniki/korobeiniki.m4a";
          const BGM_LOOP_FALLBACK_SRC = "BGM/Koeobeiniki/korobeiniki-roop.m4a";
          return (${gameSource.slice(arrayStart, index + 1)});
        `)();
      }
    }
  }
  throw new Error(`${name} array end not found`);
}

test("achievement and cosmetic storage keys are isolated", () => {
  assert.match(gameSource, /blockfall\.achievements\.v1/);
  assert.match(gameSource, /blockfall\.cosmeticInventory\.v1/);
  assert.match(gameSource, /blockfall\.cosmeticEquipment\.v1/);
  assert.match(gameSource, /blockfall\.gachaCurrency\.v1/);
});

test("first-stage achievement definitions are present", () => {
  const achievements = extractConstArray("ACHIEVEMENTS");
  const ids = achievements.map((item) => item.id);
  assert.deepEqual(ids, [
    "first_line_clear",
    "lines_100",
    "pieces_100",
    "play_10_games",
    "first_tetris",
    "tetris_10",
    "first_tspin",
    "first_tsd",
    "first_perfect_clear",
    "combo_5",
    "tutorial_chapter_1",
    "tutorial_chapter_4",
    "mission_set_1",
    "mission_set_5",
    "cascade_chain_3",
    "zone_lines_10",
  ]);
});

test("cosmetic items include defaults and gacha rewards", () => {
  const items = extractConstArray("COSMETIC_ITEMS");
  const ids = items.map((item) => item.id);
  assert.ok(ids.includes("background_default"));
  assert.ok(ids.includes("mino_default"));
  assert.ok(ids.includes("bgm_default"));
  assert.ok(ids.includes("background_space"));
  assert.ok(ids.includes("mino_neon"));
  assert.ok(ids.includes("bgm_fast"));
});

test("menus expose achievements, gacha, and collection", () => {
  assert.match(htmlSource, /id="achievementButton"/);
  assert.match(htmlSource, /id="gachaButton"/);
  assert.match(htmlSource, /id="collectionButton"/);
  assert.match(htmlSource, /id="achievementMenu"/);
  assert.match(htmlSource, /id="gachaMenu"/);
  assert.match(htmlSource, /id="collectionMenu"/);
});

test("debug cosmetics API is available but not exposed in HTML", () => {
  assert.match(gameSource, /globalThis\.DebugCosmetics/);
  assert.equal(htmlSource.includes("DebugCosmetics"), false);
});

test("configured audio assets exist", () => {
  [
    "BGM/Koeobeiniki/korobeiniki.m4a",
    "BGM/Koeobeiniki/korobeiniki-roop.m4a",
    "SE/キャンセル.mp3",
    "SE/ミノ 回転.mp3",
    "SE/T-spinのTミノを回転させる時の音.mp3",
    "SE/カーソル操作音.mp3",
    "SE/決定音.mp3",
    "SE/ライン消し.mp3",
  ].forEach((path) => {
    assert.equal(existsSync(new URL(`./${path}`, import.meta.url)), true, path);
  });
});
