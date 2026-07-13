const DEFAULT_COLS = 10;
const DEFAULT_ROWS = 20;
const EASY_COLS = 5;
const EASY_ROWS = 10;
const CELL = 30;
const PREVIEW_CELL = 24;
const LOCK_DELAY = 500;
const MAX_LOCK_RESETS = 8;
const DAS_MS = 167;
const ARR_MS = 33;
const SOFT_DROP_INTERVAL_MS = 50;
const ULTRA_DURATION_MS = 180000;
const ZONE_GAUGE_MAX = 100;
const ZONE_ACTIVATE_COST = 50;
const ZONE_DURATION_MS = 10000;
const ZONE_GRAVITY_INTERVAL_MS = 999999;
const HOTLINE_ROWS = [
  { y: 4, points: 1 },
  { y: 9, points: 2 },
  { y: 13, points: 3 },
  { y: 16, points: 4 },
  { y: 18, points: 5 },
  { y: 19, points: 6 },
];
const BGM_LEAD_TIME = 0.18;
const BGM_INTRO_SRC = "korobeiniki.m4a";
const BGM_LOOP_FALLBACK_SRC = "korobeiniki-roop.m4a";
const BGM_LOOP_CANDIDATES = ["korobeiniki2.m4a", BGM_LOOP_FALLBACK_SRC];
const ROTATION_STATES = ["0", "R", "2", "L"];
const GOLD_SQUARE_CREATE_SCORE = 2000;
const SILVER_SQUARE_CREATE_SCORE = 1000;
const GOLD_SQUARE_LINE_SCORE = 400;
const SILVER_SQUARE_LINE_SCORE = 200;
const BEST_RECORDS_STORAGE_KEY = "blockfall.bestRecords.v1";
const PLAYER_STATS_STORAGE_KEY = "blockfall.playerStats.v1";
const PLAYER_PROFILES_STORAGE_KEY = "blockfall.playerProfiles.v1";
const PLAYER_PROFILES_STORAGE_KEY_LEGACY = "blockfall.playerProfiles";
const LAST_PLAYER_STORAGE_KEY = "blockfall.lastPlayer.v1";
const LAST_PLAYER_STORAGE_KEY_LEGACY = "blockfall.lastPlayer";
const SETTINGS_STORAGE_KEY = "blockfall.settings.v1";
const CUSTOM_ACTION_LOG_LIMIT = 1000;
const TUTORIAL_SUCCESS_DELAY_MS = 1200;
const TUTORIAL_CHAPTER_1_SECTIONS = [
  "screenExplanation",
  "moveHorizontal",
  "rotateRight",
  "rotateLeft",
  "softDrop",
  "hardDrop",
];
const TUTORIAL_CHAPTER_2_SECTIONS = [
  "single",
  "double",
  "triple",
  "tetris",
  "hold",
  "backToBack",
  "combo",
];
const TUTORIAL_CHAPTER_3_SECTIONS = [
  "rotationInsert",
  "tSpin",
  "tSpinDouble",
  "perfectClear",
];
const TUTORIAL_CHAPTER_4_SECTIONS = [
  "cascade",
  "square",
  "bombliss",
  "zone",
  "garbage",
];
const CHAPTER_5_MISSION_POOL = [
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
  "perfectClear",
];
const CHAPTER_5_MISSION_COUNT = 5;
const CHAPTER_5_TIME_LIMIT_MS = 300000;
const DEBUG_CHAPTER_5_MISSIONS = null;
const ROTATION_INSERT_TARGETS = ["I", "J", "L", "S", "Z"];
const ROTATION_INSERT_TYPES = ["I", "J", "L", "S", "Z"];
const TUTORIAL_CHAPTER_SECTIONS = {
  1: TUTORIAL_CHAPTER_1_SECTIONS,
  2: TUTORIAL_CHAPTER_2_SECTIONS,
  3: TUTORIAL_CHAPTER_3_SECTIONS,
  4: TUTORIAL_CHAPTER_4_SECTIONS,
  5: [],
};
const TUTORIAL_CHAPTER_COMPLETE = {
  1: {
    title: "Chapter 1 Complete",
    body: "基本操作を覚えました。\n\n・左右移動\n・右回転\n・左回転\n・ソフトドロップ\n・ハードドロップ",
  },
  2: {
    title: "Chapter 2 Complete",
    body: "ライン消去と基本テクニックを覚えました。\n\n・Single\n・Double\n・Triple\n・Tetris\n・Hold\n・Back-to-Back\n・Combo",
  },
  3: {
    title: "Chapter 3 Complete",
    body: "回転入れと上級テクニックを覚えました。\n\n・回転入れ\n・T-Spin\n・T-Spin Double\n・Perfect Clear",
  },
  4: {
    title: "Chapter 4 Complete",
    body: "特殊ルールの基本を体験しました。\n\n・Cascade\n・Square\n・Bombliss\n・ZONE\n・おじゃまブロック",
  },
  5: {
    title: "Chapter 5 Complete",
    body: "実戦ミッションをすべて達成しました。",
  },
};
const TUTORIAL_PROGRESS_DEFAULT = {
  chapter1Completed: false,
  chapter2Completed: false,
  chapter3Completed: false,
  chapter4Completed: false,
  chapter5Completed: false,
};
const TUTORIAL_BOARD_PATTERNS = {
  single: [
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "..........", "XXXX..XXXX",
  ],
  double: [
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "XXXX..XXXX", "XXXX..XXXX",
  ],
  triple: [
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "XXXX.XXXXX", "XXXX.XXXXX", "XXXX.XXXXX",
  ],
  tetris: [
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "..........", "..........",
    "..........", "XXXX.XXXXX", "XXXX.XXXXX", "XXXX.XXXXX", "XXXX.XXXXX",
  ],
  combo: [
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "XXXX..XXXX", "XXXX..XXXX",
  ],
  perfectClear: [
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "XXXX..XXXX", "XXXX..XXXX",
  ],
  garbage: [
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "..........", "..........",
    "..........", "XXXX.XXXXX", "XXXXX.XXXX", "XXX.XXXXXX", "XXXX..XXXX",
  ],
  square: [
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "..........", "..........",
    "..........", "XX........", "XX........", "XXXX......", "XXXX......",
  ],
  bombliss: [
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "..........", "XXXX..XXXX",
  ],
  cascade: [
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "....XX....", "XXXX..XXXX", "XXX....XXX",
  ],
  tSpin: [
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "..........", "..........",
    "..........", "....X.....", "...X.X....", "XXXX.XXXXX", "XXXXX.XXXX",
  ],
  tSpinDouble: [
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "..........", "..........",
    "..........", "..........", "..........", "..........", "..........",
    "..........", "...X.X....", "....X.....", "XXXX.XXXXX", "XXXX.XXXXX",
  ],
};
const TUTORIAL_SECTIONS = {
  single: {
    chapter: 2,
    title: "Single",
    pieceType: "O",
    boardPattern: TUTORIAL_BOARD_PATTERNS.single,
    allowedActions: ["moveLeft", "moveRight", "softDrop", "hardDrop"],
    instruction: "横一列をすべて埋めると、\nそのラインが消えます。\n\nOミノを穴へ置いて、\n1ライン消してみよう。",
    successType: "single",
  },
  double: {
    chapter: 2,
    title: "Double",
    pieceType: "O",
    boardPattern: TUTORIAL_BOARD_PATTERNS.double,
    allowedActions: ["moveLeft", "moveRight", "softDrop", "hardDrop"],
    instruction: "2ラインを同時にそろえると\nDoubleになります。\n\nOミノを穴へ置いてみよう。",
    successType: "double",
  },
  triple: {
    chapter: 2,
    title: "Triple",
    pieceType: "I",
    boardPattern: TUTORIAL_BOARD_PATTERNS.triple,
    allowedActions: ["moveLeft", "moveRight", "rotateLeft", "rotateRight", "softDrop", "hardDrop"],
    instruction: "3ラインを同時にそろえると\nTripleになります。\n\nIミノを縦にして\n穴へ入れてみよう。",
    successType: "triple",
  },
  tetris: {
    chapter: 2,
    title: "Tetris",
    pieceType: "I",
    boardPattern: TUTORIAL_BOARD_PATTERNS.tetris,
    allowedActions: ["moveLeft", "moveRight", "rotateLeft", "rotateRight", "softDrop", "hardDrop"],
    instruction: "4ラインを同時に消すことを\nTetrisと呼びます。\n\nIミノを縦に入れてみよう。",
    successType: "tetris",
  },
  hold: {
    chapter: 2,
    title: "Hold",
    pieceType: "O",
    nextQueue: ["I"],
    holdEnabled: true,
    boardPattern: TUTORIAL_BOARD_PATTERNS.tetris,
    allowedActions: ["moveLeft", "moveRight", "rotateLeft", "rotateRight", "softDrop", "hardDrop", "hold"],
    instruction: "今のOミノでは、\nこの穴をきれいに消せません。\n\nHOLDを使ってIミノへ入れ替え、\nTetrisを決めてみよう。",
    successType: "holdTetris",
  },
  backToBack: {
    chapter: 2,
    title: "Back-to-Back",
    pieceType: "I",
    nextQueue: ["O", "I"],
    holdEnabled: true,
    boardPattern: TUTORIAL_BOARD_PATTERNS.tetris,
    allowedActions: ["moveLeft", "moveRight", "rotateLeft", "rotateRight", "softDrop", "hardDrop", "hold"],
    instruction: "TetrisやT-Spinを続けて決めると、\nBack-to-Backになります。\n\nまず1回目のTetrisを決めよう。",
    successType: "backToBack",
  },
  combo: {
    chapter: 2,
    title: "Combo",
    pieceType: "O",
    nextQueue: ["O"],
    boardPattern: TUTORIAL_BOARD_PATTERNS.combo,
    allowedActions: ["moveLeft", "moveRight", "softDrop", "hardDrop"],
    instruction: "ライン消去を続けて行うと、\nComboになります。\n\n2回続けてラインを消してみよう。",
    successType: "combo",
  },
  rotationInsert: {
    chapter: 3,
    title: "回転入れ",
    pieceType: "I",
    allowedActions: ["moveLeft", "moveRight", "rotateLeft", "rotateRight", "softDrop", "hardDrop"],
    instruction: "回転を使うと、\nそのままでは入らない隙間へ\nミノを入れられます。",
    successType: "rotationInsert",
  },
  tSpin: {
    chapter: 3,
    title: "T-Spin",
    pieceType: "T",
    boardPattern: TUTORIAL_BOARD_PATTERNS.tSpin,
    allowedActions: ["moveLeft", "moveRight", "rotateLeft", "rotateRight", "softDrop", "hardDrop"],
    instruction: "Tミノを回転させて\n隙間へ入れてみよう。\n\n最後の操作が回転になるようにしてください。",
    successType: "tSpin",
  },
  tSpinDouble: {
    chapter: 3,
    title: "T-Spin Double",
    pieceType: "T",
    boardPattern: TUTORIAL_BOARD_PATTERNS.tSpinDouble,
    allowedActions: ["moveLeft", "moveRight", "rotateLeft", "rotateRight", "softDrop", "hardDrop"],
    instruction: "Tミノを回転させて入れ、\n2ライン同時に消してみよう。",
    successType: "tSpinDouble",
  },
  perfectClear: {
    chapter: 3,
    title: "Perfect Clear",
    pieceType: "O",
    boardPattern: TUTORIAL_BOARD_PATTERNS.perfectClear,
    allowedActions: ["moveLeft", "moveRight", "softDrop", "hardDrop"],
    instruction: "ラインを消したあと、\nフィールドにブロックが一つも残らないと\nPerfect Clearになります。",
    successType: "perfectClear",
  },
  cascade: {
    chapter: 4,
    title: "Cascade",
    pieceType: "I",
    specialMode: "cascade",
    boardPattern: TUTORIAL_BOARD_PATTERNS.cascade,
    allowedActions: ["moveLeft", "moveRight", "softDrop", "hardDrop"],
    instruction: "ラインを消すと、\n支えを失ったブロックが落下します。\n\n落下によってもう一度ラインをそろえ、\n連鎖を起こしてみよう。",
    successType: "cascade",
  },
  square: {
    chapter: 4,
    title: "Square",
    pieceType: "O",
    specialMode: "square",
    boardPattern: TUTORIAL_BOARD_PATTERNS.square,
    allowedActions: ["moveLeft", "moveRight", "softDrop", "hardDrop"],
    instruction: "4個のミノで4×4を作ると、\nSquareになります。\n\n最後のミノを置いて、\n正方形を完成させてみよう。",
    successType: "square",
  },
  bombliss: {
    chapter: 4,
    title: "Bombliss",
    pieceType: "O",
    specialMode: "bombliss",
    bombCells: ["0,1"],
    boardPattern: TUTORIAL_BOARD_PATTERNS.bombliss,
    allowedActions: ["moveLeft", "moveRight", "softDrop", "hardDrop"],
    instruction: "爆弾を含むラインをそろえると、\n爆発が起こります。\n\n爆弾入りのミノを置いてみよう。",
    successType: "bombliss",
  },
  zone: {
    chapter: 4,
    title: "ZONE",
    pieceType: "O",
    specialMode: "zone",
    boardPattern: TUTORIAL_BOARD_PATTERNS.single,
    allowedActions: ["zone", "moveLeft", "moveRight", "softDrop", "hardDrop"],
    instruction: "ZONEキーを押して、\nZONEを発動してみよう。",
    successType: "zone",
  },
  garbage: {
    chapter: 4,
    title: "おじゃまブロック",
    pieceType: "O",
    boardPattern: TUTORIAL_BOARD_PATTERNS.garbage,
    allowedActions: ["moveLeft", "moveRight", "softDrop", "hardDrop"],
    instruction: "灰色のブロックは\nおじゃまブロックです。\n\n穴へミノを入れて、\n下から消していきましょう。",
    successType: "garbage",
  },
};
const DEFAULT_CUSTOM_SETTINGS = {
  levelMode: "marathon",
  fixedLevel: "1",
  cascadeEnabled: false,
  zoneEnabled: false,
};
const SAVE_EXPORT_KEYS = [
  PLAYER_PROFILES_STORAGE_KEY,
  LAST_PLAYER_STORAGE_KEY,
  BEST_RECORDS_STORAGE_KEY,
  PLAYER_STATS_STORAGE_KEY,
  SETTINGS_STORAGE_KEY,
];
const JLSTZ_KICKS = {
  "0>R": [
    [0, 0],
    [-1, 0],
    [-1, -1],
    [0, 2],
    [-1, 2],
  ],
  "R>0": [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, -2],
    [1, -2],
  ],
  "R>2": [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, -2],
    [1, -2],
  ],
  "2>R": [
    [0, 0],
    [-1, 0],
    [-1, -1],
    [0, 2],
    [-1, 2],
  ],
  "2>L": [
    [0, 0],
    [1, 0],
    [1, -1],
    [0, 2],
    [1, 2],
  ],
  "L>2": [
    [0, 0],
    [-1, 0],
    [-1, 1],
    [0, -2],
    [-1, -2],
  ],
  "L>0": [
    [0, 0],
    [-1, 0],
    [-1, 1],
    [0, -2],
    [-1, -2],
  ],
  "0>L": [
    [0, 0],
    [1, 0],
    [1, -1],
    [0, 2],
    [1, 2],
  ],
};
const I_KICKS = {
  "0>R": [
    [0, 0],
    [-2, 0],
    [1, 0],
    [-2, -1],
    [1, 2],
  ],
  "R>0": [
    [0, 0],
    [2, 0],
    [-1, 0],
    [2, 1],
    [-1, -2],
  ],
  "R>2": [
    [0, 0],
    [-1, 0],
    [2, 0],
    [-1, 2],
    [2, -1],
  ],
  "2>R": [
    [0, 0],
    [1, 0],
    [-2, 0],
    [1, -2],
    [-2, 1],
  ],
  "2>L": [
    [0, 0],
    [2, 0],
    [-1, 0],
    [2, -1],
    [-1, 2],
  ],
  "L>2": [
    [0, 0],
    [-2, 0],
    [1, 0],
    [-2, 1],
    [1, -2],
  ],
  "L>0": [
    [0, 0],
    [1, 0],
    [-2, 0],
    [1, 2],
    [-2, -1],
  ],
  "0>L": [
    [0, 0],
    [-1, 0],
    [2, 0],
    [-1, -2],
    [2, 1],
  ],
};

const COLORS = {
  I: "#47c9ff",
  I2: "#47c9ff",
  I3: "#47c9ff",
  J: "#5c7cff",
  L: "#ffad4d",
  L3: "#ffad4d",
  O: "#f8db55",
  S: "#59d86f",
  T: "#b56cff",
  Z: "#ff5b6e",
  G: "#6d7780",
  DOT: "#c9d2dd",
  CORE: "#e7f1ff",
};

const SHAPES = {
  DOT: [
    [1],
  ],
  I2: [
    [0, 0],
    [1, 1],
  ],
  I3: [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  L3: [
    [1, 0],
    [1, 1],
  ],
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
};
const STANDARD_PIECES = ["I", "J", "L", "O", "S", "T", "Z"];
const EASY_PIECES = ["I2", "I3", "L3", "O"];
const EASY_NORMAL_PIECES = ["I2", "I3", "L3", "O", "I", "T"];
const SHADOW_PIECES = ["DOT", "I2", "I3", "L3", ...STANDARD_PIECES];
const CATCH_DURATION_MS = 180000;
const SHADOW_STAGES = [
  {
    name: "Box",
    targetPercent: 80,
    skipLimit: 10,
    silhouette: [
      "..........",
      "..........",
      "..........",
      "..XXXXXX..",
      "..XXXXXX..",
      "..XXXXXX..",
      "..XXXXXX..",
      "..XXXXXX..",
      "..XXXXXX..",
      "..........",
      "..........",
      "..........",
      "..........",
      "..........",
      "..........",
      "..........",
      "..........",
      "..........",
      "..........",
      "..........",
    ],
  },
  {
    name: "House",
    targetPercent: 80,
    skipLimit: 10,
    silhouette: [
      "..........",
      "..........",
      "....XX....",
      "...XXXX...",
      "..XXXXXX..",
      "..XXXXXX..",
      "..XX..XX..",
      "..XXXXXX..",
      "..XXXXXX..",
      "..XXXXXX..",
      "..XXXXXX..",
      "..........",
      "..........",
      "..........",
      "..........",
      "..........",
      "..........",
      "..........",
      "..........",
      "..........",
    ],
  },
  {
    name: "Apple",
    targetPercent: 80,
    skipLimit: 10,
    silhouette: [
      "..........",
      "..........",
      "....XX....",
      "...XXXX...",
      "..XXXXXX..",
      "..XXXXXX..",
      ".XXXXXXXX.",
      ".XXXXXXXX.",
      "..XXXXXX..",
      "..XXXXXX..",
      "...XXXX...",
      "....XX....",
      "....XX....",
      "..........",
      "..........",
      "..........",
      "..........",
      "..........",
      "..........",
      "..........",
    ],
  },
  {
    name: "Hamburger",
    targetPercent: 80,
    skipLimit: 10,
    silhouette: [
      "..........",
      "..........",
      "....XX....",
      "...XXXX...",
      "..XXXXXX..",
      ".XXXXXXXX.",
      ".XXXXXXXX.",
      "..XXXXXX..",
      "...XXXX...",
      "....XX....",
      "..XXXXXX..",
      ".XXXXXXXX.",
      ".XXXXXXXX.",
      "..XXXXXX..",
      "...XXXX...",
      "....XX....",
      "..........",
      "..........",
      "..........",
      "..........",
    ],
  },
  {
    name: "Man",
    targetPercent: 80,
    skipLimit: 10,
    silhouette: [
      "..........",
      "....XX....",
      "...XXXX...",
      "...XXXX...",
      "....XX....",
      "....XX....",
      "..XXXXXX..",
      "..XXXXXX..",
      "....XX....",
      "...XXXX...",
      "..XX..XX..",
      ".XX....XX.",
      ".XX....XX.",
      "XX......XX",
      "XX......XX",
      "..........",
      "..........",
      "..........",
      "..........",
      "..........",
    ],
  },
];
const BOMBLISS_STAGES = [
  [
    "..........",
    "..........",
    "..........",
    "..........",
    "..........",
    "..........",
    "..........",
    "..........",
    "..........",
    "..........",
    "..........",
    "..........",
    "..........",
    "..........",
    "..........",
    "...XXXX...",
    "..XXXXXX..",
    "..XX..XX..",
    ".XXX..XXX.",
    "XXXX..XXXX",
  ],
  [
    "..........",
    "..........",
    "..........",
    "..........",
    "..........",
    "..........",
    "..........",
    "..........",
    "..........",
    "..........",
    "..........",
    "..........",
    "..X....X..",
    "..XX..XX..",
    ".XXX..XXX.",
    ".XXXXXXX..",
    "XX..XX..XX",
    "XX..XX..XX",
    "XXXXXXXXXX",
    "XXXX..XXXX",
  ],
  [
    "..........",
    "..........",
    "..........",
    "..........",
    "..........",
    "..........",
    "..........",
    "...XXXX...",
    "...X..X...",
    "..XX..XX..",
    "..X....X..",
    ".XX....XX.",
    ".X......X.",
    "XXX....XXX",
    "X........X",
    "XX......XX",
    "XXX....XXX",
    "XXXX..XXXX",
    "XXXXXXXXXX",
    "XXXX..XXXX",
  ],
  [
    "..........",
    "..........",
    "..........",
    "..........",
    "..........",
    "..X....X..",
    "..X....X..",
    "..XX..XX..",
    "...XXXX...",
    "....XX....",
    "...XXXX...",
    "..XX..XX..",
    ".XX....XX.",
    "XX......XX",
    "XXX....XXX",
    ".XXX..XXX.",
    "..XXXXXX..",
    ".XX.XX.XX.",
    "XXXXXXXXXX",
    "XXX....XXX",
  ],
  [
    "..........",
    "..........",
    "..........",
    "..........",
    ".X......X.",
    ".XX....XX.",
    "..XX..XX..",
    "...XXXX...",
    "..XXXXXX..",
    ".XX.XX.XX.",
    "XX..XX..XX",
    "XXX....XXX",
    "XXXX..XXXX",
    "XX.XXXX.XX",
    "X..XXXX..X",
    "XX......XX",
    "XXX....XXX",
    "XXXXXXXXXX",
    "XXXX..XXXX",
    "XXXXXXXXXX",
  ],
];

const boardCanvas = document.querySelector("#board");
const boardCtx = boardCanvas.getContext("2d");
const nextCtxs = Array.from(document.querySelectorAll(".next-preview"), (canvas) =>
  canvas.getContext("2d"),
);
const holdCtx = document.querySelector("#hold").getContext("2d");
const scoreEl = document.querySelector("#score");
const linesEl = document.querySelector("#lines");
const levelEl = document.querySelector("#level");
const lastEventEl = document.querySelector("#lastEvent");
const timeDisplayEl = document.querySelector("#timeDisplay");
const currentLinesEl = document.querySelector("#currentLines");
const shell = document.querySelector(".shell");
const overlay = document.querySelector("#overlay");
const overlayTitle = document.querySelector("#overlayTitle");
const bombingReveal = document.querySelector("#bombingReveal");
const bombingRevealImage = document.querySelector("#bombingRevealImage");
const modeMenu = document.querySelector("#modeMenu");
const onePlayerMenu = document.querySelector("#onePlayerMenu");
const easyModeMenu = document.querySelector("#easyModeMenu");
const practiceMenu = document.querySelector("#practiceMenu");
const tutorialChapterMenu = document.querySelector("#tutorialChapterMenu");
const globalOptionsButton = document.querySelector("#globalOptionsButton");
const optionMenu = document.querySelector("#optionMenu");
const loginMenu = document.querySelector("#loginMenu");
const globalOptionsMenu = document.querySelector("#globalOptionsMenu");
const globalOptionsBackButton = document.querySelector("#globalOptionsBackButton");
const exportSaveButton = document.querySelector("#exportSaveButton");
const importSaveButton = document.querySelector("#importSaveButton");
const saveImportInput = document.querySelector("#saveImportInput");
const myPageMenu = document.querySelector("#myPageMenu");
const myPageButton = document.querySelector("#myPageButton");
const myPageFromOptionsButton = document.querySelector("#myPageFromOptionsButton");
const myPageBackButton = document.querySelector("#myPageBackButton");
const myPagePlayerNameEl = document.querySelector("#myPagePlayerName");
const myPagePlayerIdEl = document.querySelector("#myPagePlayerId");
const myPagePlayerTypeEl = document.querySelector("#myPagePlayerType");
const myPageBestRecordsEl = document.querySelector("#myPageBestRecords");
const myPageStatsEl = document.querySelector("#myPageStats");
const selectedModeEl = document.querySelector("#selectedMode");
const selectedPlayerNameEl = document.querySelector("#selectedPlayerName");
const playerIndicatorEl = document.querySelector("#playerIndicator");
const playerNameInput = document.querySelector("#playerNameInput");
const createProfileButton = document.querySelector("#createProfileButton");
const guestPlayButton = document.querySelector("#guestPlayButton");
const profileListEl = document.querySelector("#profileList");
const playerSwitchButton = document.querySelector("#playerSwitchButton");
const playerSwitchFromOptionsButton = document.querySelector("#playerSwitchFromOptionsButton");
const modeRulesEl = document.querySelector("#modeRules");
const tsdAssistToggleButton = document.querySelector("#tsdAssistToggleButton");
const keybindMenu = document.querySelector("#keybindMenu");
const keybindMenuButton = document.querySelector("#keybindMenuButton");
const keybindMenuBackButton = document.querySelector("#keybindMenuBackButton");
const shadowStageRow = document.querySelector("#shadowStageRow");
const shadowStageSelect = document.querySelector("#shadowStageSelect");
const fixedLevelToggleRow = document.querySelector("#fixedLevelToggleRow");
const fixedLevelToggle = document.querySelector("#fixedLevelToggle");
const fixedLevelRow = document.querySelector("#fixedLevelRow");
const fixedLevelSelect = document.querySelector("#fixedLevelSelect");
const customLevelModeRow = document.querySelector("#customLevelModeRow");
const customLevelModeSelect = document.querySelector("#customLevelModeSelect");
const customFixedLevelRow = document.querySelector("#customFixedLevelRow");
const customFixedLevelSelect = document.querySelector("#customFixedLevelSelect");
const customCascadeToggleButton = document.querySelector("#customCascadeToggleButton");
const customZoneToggleButton = document.querySelector("#customZoneToggleButton");
const ghostToggleButton = document.querySelector("#ghostToggleButton");
const difficultyToggleButton = document.querySelector("#difficultyToggleButton");
const endlessToggleButton = document.querySelector("#endlessToggleButton");
const sprintGoalRow = document.querySelector("#sprintGoalRow");
const sprintGoalValueEl = document.querySelector("#sprintGoalValue");
const sprintGoalRange = document.querySelector("#sprintGoalRange");
const cheeseGoalRow = document.querySelector("#cheeseGoalRow");
const cheeseGoalSelect = document.querySelector("#cheeseGoalSelect");
const cheesePurifyToggleButton = document.querySelector("#cheesePurifyToggleButton");
const optionStartButton = document.querySelector("#optionStartButton");
const optionBackButton = document.querySelector("#optionBackButton");
const marathonButton = document.querySelector("#marathonButton");
const sprintButton = document.querySelector("#sprintButton");
const ultraButton = document.querySelector("#ultraButton");
const easyTetrisButton = document.querySelector("#easyTetrisButton");
const onePlayerButton = document.querySelector("#onePlayerButton");
const practiceButton = document.querySelector("#practiceButton");
const catchButton = document.querySelector("#catchButton");
const allClearSprintButton = document.querySelector("#allClearSprintButton");
const easyMarathonButton = document.querySelector("#easyMarathonButton");
const bomblissButton = document.querySelector("#bomblissButton");
const cascadeButton = document.querySelector("#cascadeButton");
const hotlineButton = document.querySelector("#hotlineButton");
const zoneButton = document.querySelector("#zoneButton");
const customButton = document.querySelector("#customButton");
const tutorialButton = document.querySelector("#tutorialButton");
const zeroGravityButton = document.querySelector("#zeroGravityButton");
const tutorialChapter1Button = document.querySelector("#tutorialChapter1Button");
const tutorialChapter2Button = document.querySelector("#tutorialChapter2Button");
const tutorialChapter3Button = document.querySelector("#tutorialChapter3Button");
const tutorialChapter4Button = document.querySelector("#tutorialChapter4Button");
const tutorialChapter5Button = document.querySelector("#tutorialChapter5Button");
const tutorialChapterBackButton = document.querySelector("#tutorialChapterBackButton");
const squareButton = document.querySelector("#squareButton");
const easyModeBackButton = document.querySelector("#easyModeBackButton");
const onePlayerBackButton = document.querySelector("#onePlayerBackButton");
const practiceBackButton = document.querySelector("#practiceBackButton");
const cheeseRaceButton = document.querySelector("#cheeseRaceButton");
const shadowButton = document.querySelector("#shadowButton");
const actionMenu = document.querySelector("#actionMenu");
const resultSummaryEl = document.querySelector("#resultSummary");
const startButton = document.querySelector("#startButton");
const restartButton = document.querySelector("#restartButton");
const customSettingsButton = document.querySelector("#customSettingsButton");
const customRestartButton = document.querySelector("#customRestartButton");
const customTimeResetButton = document.querySelector("#customTimeResetButton");
const customScoreResetButton = document.querySelector("#customScoreResetButton");
const customActionLogButton = document.querySelector("#customActionLogButton");
const customPauseSettingsPanel = document.querySelector("#customPauseSettingsPanel");
const pauseCustomLevelModeSelect = document.querySelector("#pauseCustomLevelModeSelect");
const pauseCustomFixedLevelRow = document.querySelector("#pauseCustomFixedLevelRow");
const pauseCustomFixedLevelSelect = document.querySelector("#pauseCustomFixedLevelSelect");
const pauseCustomCascadeToggleButton = document.querySelector("#pauseCustomCascadeToggleButton");
const pauseCustomZoneToggleButton = document.querySelector("#pauseCustomZoneToggleButton");
const customSettingsBackButton = document.querySelector("#customSettingsBackButton");
const customActionLogPanel = document.querySelector("#customActionLogPanel");
const customActionLogCount = document.querySelector("#customActionLogCount");
const customActionLogList = document.querySelector("#customActionLogList");
const customActionLogCloseButton = document.querySelector("#customActionLogCloseButton");
const titleButton = document.querySelector("#titleButton");
const keybindButtons = document.querySelectorAll(".keybind-button");
const moveKeysEl = document.querySelector("#moveKeys");
const softDropKeyEl = document.querySelector("#softDropKey");
const rotateRightKeyEl = document.querySelector("#rotateRightKey");
const rotateLeftKeyEl = document.querySelector("#rotateLeftKey");
const hardDropKeyEl = document.querySelector("#hardDropKey");
const holdKeyEl = document.querySelector("#holdKey");
const pauseKeyEl = document.querySelector("#pauseKey");
const tutorialPanel = document.querySelector("#tutorialPanel");
const tutorialStepLabelEl = document.querySelector("#tutorialStepLabel");
const tutorialTitleEl = document.querySelector("#tutorialTitle");
const tutorialInstructionEl = document.querySelector("#tutorialInstruction");
const tutorialSuccessMessageEl = document.querySelector("#tutorialSuccessMessage");
const tutorialNextButton = document.querySelector("#tutorialNextButton");
const tutorialMissionPanel = document.querySelector("#tutorialMissionPanel");
const tutorialMissionProgressEl = document.querySelector("#tutorialMissionProgress");
const tutorialMissionTitleEl = document.querySelector("#tutorialMissionTitle");
const tutorialMissionDescriptionEl = document.querySelector("#tutorialMissionDescription");

const KEYBIND_LABELS = {
  moveLeft: "Move Left",
  moveRight: "Move Right",
  softDrop: "Soft Drop",
  hardDrop: "Hard Drop",
  rotateRight: "Rotate Right",
  rotateLeft: "Rotate Left",
  hold: "Hold",
  zone: "Zone",
  pause: "Pause",
};

const DEFAULT_KEY_BINDINGS = {
  moveLeft: ["KeyA", "ArrowLeft"],
  moveRight: ["KeyD", "ArrowRight"],
  softDrop: ["KeyS", "ArrowDown"],
  hardDrop: ["KeyW"],
  rotateRight: ["KeyJ"],
  rotateLeft: ["KeyK"],
  hold: ["KeyF"],
  zone: ["Space"],
  pause: ["KeyP"],
};

let board;
let active;
let nextQueue;
let holdType;
let canHold;
let cols = DEFAULT_COLS;
let rows = DEFAULT_ROWS;
let score;
let renStreak;
let backToBackStreak;
let perfectClearCount;
let bomblissStageIndex;
let bomblissPoints;
let nextLargeBombId = 1;
let nextPieceId;
let nextSquareId = 1;
let squareGroups = new Map();
let currentShadowStageIndex = 0;
let selectedShadowStageIndex = 0;
let shadowStage = null;
let shadowSilhouette = new Set();
let shadowShadedCells = 0;
let shadowInsideCells = 0;
let shadowOutsideCells = 0;
let shadowMatchPercent = 0;
let shadowSkipCount = 0;
let hotlinePoints;
let hotlineProgress;
let hotlineTarget;
let catchCore = null;
let fallingCatchPiece = null;
let catchFallTimer = 0;
let catchCombo = 0;
let zoneGauge = 0;
let zoneActive = false;
let zoneTimer = 0;
let zoneConsumedGauge = 0;
let zoneLines = 0;
let zoneMaxLines = 0;
let zoneScoreBuffer = 0;
let zoneExtensionNoticeText = "";
let zoneExtensionNoticeUntil = 0;
let cascadeResolutionActive = false;
let cascadeResolutionPhase = "idle";
let cascadeResolutionClears = [];
let cascadeResolutionUsedZone = false;
let cascadeClearDelay = 0;
let cascadeGravityTimer = 0;
let lines;
let level;
let dropInterval;
let lastTime;
let dropCounter;
let lockCounter;
let lockResetCount;
let softDropDistance;
let activeDirection = null;
let dasTimer = 0;
let arrTimer = 0;
const heldKeyCodes = new Set();
let leftHeld = false;
let rightHeld = false;
let lastPressedDirection = null;
let softDropHeld = false;
let softDropSuppressedUntilKeyup = false;
let selectedGameMode = "マラソン";
let easyModeVariant = null;
let easyDifficulty = "easy";
let fixedLevelEnabled = false;
let fixedLevelValue = "1";
let customSettings = { ...DEFAULT_CUSTOM_SETTINGS };
let customActionLog = [];
let customActionLogVisible = false;
let tutorialChapter = null;
let tutorialSectionIndex = 0;
let tutorialState = null;
let tutorialAdvanceTimer = null;
let tutorialProgress = { ...TUTORIAL_PROGRESS_DEFAULT };
let endlessEnabled = false;
let sprintGoalLines = 40;
let cheeseGoalLines = 18;
let cheeseRacePurifyEnabled = false;
let cheeseClearedLines = 0;
let cheeseGeneratedLines = 0;
let cheeseHoleHistory = [];
let purifyCleansed = 0;
let purifyWave = 0;
let purifySpawnTimer = 0;
let purifyNextSpawnMs = 0;
let purifyCurrentInfections = 0;
let purifyHoleHistory = [];
let ghostAssistEnabled = true;
let tsdAssistEnabled = false;
let tsdAssistCandidate = null;
let tsdAssistDirty = true;
let practiceGravityEnabled = false;
let gameTimeMs = 0;
let waitingForKeybind = null;
let bombingRevealTimer = null;
let gameSeed = "";
let rngState = 0;
let inputBuffer = [];
let currentPlayer = null;
let lastResultInfo = null;
let gameStatsFinalized = false;
let myPageReturnTarget = "title";
let optionMenuReturnTarget = "onePlayer";
const INPUT_BUFFER_MS = 100;
const PURIFY_DURATION_MS = 180000;
const PURIFY_INITIAL_SPAWN_MS = 11000;
const PURIFY_MIN_SPAWN_MS = 5500;
const PURIFY_SPAWN_STEP_MS = 300;
const PURIFY_INITIAL_GARBAGE_LINES = 12;
let keyBindings = {
  moveLeft: ["KeyA", "ArrowLeft"],
  moveRight: ["KeyD", "ArrowRight"],
  softDrop: ["KeyS", "ArrowDown"],
  hardDrop: ["KeyW"],
  rotateRight: ["KeyJ"],
  rotateLeft: ["KeyK"],
  hold: ["KeyF"],
  zone: ["Space"],
  pause: ["KeyP"],
};
let running = false;
let paused = false;
let gameOver = false;
let bgm = {
  enabled: false,
  paused: false,
  generation: 0,
  loopSrc: BGM_LOOP_FALLBACK_SRC,
  segments: [],
};

function createBoard() {
  return Array.from({ length: rows }, () => Array(cols).fill(null));
}

function seedRng(seed) {
  gameSeed = seed;
  const seedText = String(seed);
  let hash = 2166136261;
  for (let i = 0; i < seedText.length; i += 1) {
    hash ^= seedText.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  rngState = hash >>> 0;
  if (rngState === 0) {
    rngState = 0x6d2b79f5;
  }
}

function rng() {
  rngState ^= rngState << 13;
  rngState ^= rngState >>> 17;
  rngState ^= rngState << 5;
  return (rngState >>> 0) / 4294967296;
}

function clearInputBuffer() {
  inputBuffer = [];
}

function bufferInput(action, extra = {}) {
  if (isCatchMode()) return;
  inputBuffer.push({
    action,
    direction: extra.direction ?? null,
    time: performance.now(),
  });
}

function isBufferedAction(action) {
  return action === "moveLeft" || action === "moveRight" || action === "rotateLeft" || action === "rotateRight" || action === "hold";
}

function shouldBufferSpawnInput() {
  return !active;
}

function applyBufferedInputsForSpawn() {
  if (isCatchMode() || inputBuffer.length === 0) return;
  const now = performance.now();
  const recent = inputBuffer.filter((entry) => now - entry.time <= INPUT_BUFFER_MS);
  inputBuffer = [];
  if (recent.length === 0) return;

  recent.sort((a, b) => a.time - b.time);
  recent.forEach((entry) => {
    if (!running || paused || gameOver) return;
    switch (entry.action) {
      case "moveLeft":
        setActiveDirection("left");
        break;
      case "moveRight":
        setActiveDirection("right");
        break;
      case "rotateLeft":
        rotatePiece(-1);
        break;
      case "rotateRight":
        rotatePiece(1);
        break;
      case "hold":
        holdPiece();
        break;
      default:
        break;
    }
  });
}

function createCell(options = {}) {
  return {
    type: options.type ?? null,
    pieceId: options.pieceId ?? null,
    bomb: options.bomb ?? "none",
    largeBombId: options.largeBombId ?? null,
    garbage: Boolean(options.garbage),
    infected: Boolean(options.infected),
    squareId: options.squareId ?? null,
    squareType: options.squareType ?? null,
  };
}

function createBomblissCell(type, bomb = "none", largeBombId = null) {
  return createCell({ type, bomb, largeBombId });
}

function createCascadeCell(type, pieceId) {
  return createCell({ type, pieceId });
}

function createSquareCell(type, pieceId) {
  return createCell({ type, pieceId, squareId: null, squareType: null });
}

function createGarbageCell() {
  return createCell({ type: "G", garbage: true });
}

function createPurifyCell() {
  return createCell({ type: "G", garbage: true, infected: true });
}

function isOccupiedCell(cell) {
  return Boolean(cell);
}

function getCellType(cell) {
  return typeof cell === "string" ? cell : cell?.type;
}

function getCellPieceId(cell) {
  return typeof cell === "object" && cell ? cell.pieceId : null;
}

function getCellBomb(cell) {
  return typeof cell === "object" && cell ? cell.bomb : "none";
}

function getCellLargeBombId(cell) {
  return typeof cell === "object" && cell ? cell.largeBombId ?? null : null;
}

function getCellGarbage(cell) {
  return typeof cell === "object" && cell ? Boolean(cell.garbage || getCellType(cell) === "G") : false;
}

function getCellInfected(cell) {
  return typeof cell === "object" && cell ? Boolean(cell.infected) : false;
}

function getCellSquareType(cell) {
  return typeof cell === "object" && cell ? cell.squareType : null;
}

function loadBomblissStage(index) {
  board = createBoard();
  nextLargeBombId = 1;
  const stage = BOMBLISS_STAGES[index % BOMBLISS_STAGES.length];
  stage.forEach((row, y) => {
    [...row].forEach((value, x) => {
      if (value === "X") {
        board[y][x] = createBomblissCell("Z");
      }
    });
  });
  bomblissPoints = 100;
  score = bomblissPoints;
  lines = index + 1;
}

function shuffle(values) {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function fillQueue() {
  while (nextQueue.length < 7) {
    nextQueue.push(...shuffle(getPieceTypes()));
  }
}

function isEasyTetrisMode() {
  return Boolean(easyModeVariant);
}

function getPieceTypes() {
  if (isBomblissMode()) return STANDARD_PIECES;
  if (isShadowMode()) return SHADOW_PIECES;
  if (isCatchMode()) return STANDARD_PIECES;
  if (!isEasyTetrisMode()) return STANDARD_PIECES;
  return easyDifficulty === "normal" ? EASY_NORMAL_PIECES : EASY_PIECES;
}

function cloneMatrix(matrix) {
  return matrix.map((row) => [...row]);
}

function createPiece(type) {
  const matrix = cloneMatrix(SHAPES[type]);
  const piece = {
    type,
    matrix,
    x: Math.floor((cols - matrix[0].length) / 2),
    y: -1,
    rotationState: "0",
    lastAction: null,
  };
  if (isBomblissMode()) {
    const cells = [];
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) cells.push(`${x},${y}`);
      });
    });
    piece.bombCells = new Set([cells[Math.floor(rng() * cells.length)]]);
  }
  return piece;
}

function spawnPiece() {
  fillQueue();
  active = createPiece(nextQueue.shift());
  if ((isZeroGravityMode() || (isCustomMode() && customSettings.levelMode === "fixed" && customSettings.fixedLevel === "zeroGravity")) && active) {
    active.y = 0;
  }
  tsdAssistDirty = true;
  if (isBomblissMode()) {
    bomblissPoints -= 1;
    score = bomblissPoints;
    updateStats();
    if (bomblissPoints <= 0) {
      finishGame("Game Over");
      return;
    }
  }
  canHold = true;
  if (isCascadeEnabledForCurrentGame() || isSquareMode()) {
    if (globalThis.PieceIdCore?.allocatePieceIdForSpecialModes) {
      nextPieceId = globalThis.PieceIdCore.allocatePieceIdForSpecialModes(active, nextPieceId, true);
    } else {
      active.pieceId = nextPieceId;
      nextPieceId += 1;
    }
  }
  lockCounter = 0;
  lockResetCount = 0;
  softDropDistance = 0;
  applyBufferedInputsForSpawn();
  if (collides(active, active.x, active.y, active.matrix)) {
    finishGame();
  }
}

function canLoadAudio(src) {
  return new Promise((resolve) => {
    const audio = new Audio(src);
    const done = (result) => {
      audio.removeAttribute("src");
      audio.load();
      resolve(result);
    };
    audio.preload = "metadata";
    audio.addEventListener("loadedmetadata", () => done(true), { once: true });
    audio.addEventListener("error", () => done(false), { once: true });
    audio.src = src;
    audio.load();
  });
}

async function resolveBgmLoopSource(generation) {
  for (const src of BGM_LOOP_CANDIDATES) {
    if (generation !== bgm.generation) return;
    if (await canLoadAudio(src)) {
      bgm.loopSrc = src;
      return;
    }
  }
}

function removeBgmSegment(segment) {
  window.clearTimeout(segment.timerId);
  bgm.segments = bgm.segments.filter((item) => item !== segment);
}

function scheduleBgmNext(segment) {
  window.clearTimeout(segment.timerId);
  if (
    !bgm.enabled ||
    bgm.paused ||
    segment.nextStarted ||
    segment.generation !== bgm.generation ||
    !Number.isFinite(segment.audio.duration)
  ) {
    return;
  }

  const wait = Math.max(
    0,
    (segment.audio.duration - BGM_LEAD_TIME - segment.audio.currentTime) * 1000,
  );
  segment.timerId = window.setTimeout(() => {
    if (
      !bgm.enabled ||
      bgm.paused ||
      segment.nextStarted ||
      segment.generation !== bgm.generation
    ) {
      return;
    }
    segment.nextStarted = true;
    playBgmSegment(bgm.loopSrc, segment.generation);
  }, wait);
}

function playBgmSegment(src, generation) {
  if (!bgm.enabled || bgm.paused || generation !== bgm.generation) return;

  const audio = new Audio(src);
  const segment = {
    audio,
    generation,
    nextStarted: false,
    timerId: null,
  };

  audio.preload = "auto";
  audio.volume = 0.52;
  audio.addEventListener("loadedmetadata", () => scheduleBgmNext(segment));
  audio.addEventListener("ended", () => removeBgmSegment(segment), { once: true });
  audio.addEventListener("error", () => removeBgmSegment(segment), { once: true });
  bgm.segments.push(segment);
  audio.play().catch(() => {
    removeBgmSegment(segment);
  });
}

function startBgm() {
  stopBgm();
  bgm.enabled = true;
  bgm.paused = false;
  bgm.generation += 1;
  bgm.loopSrc = BGM_LOOP_FALLBACK_SRC;
  resolveBgmLoopSource(bgm.generation);
  playBgmSegment(BGM_INTRO_SRC, bgm.generation);
}

function pauseBgm() {
  if (!bgm.enabled || bgm.paused) return;
  bgm.paused = true;
  bgm.segments.forEach((segment) => {
    window.clearTimeout(segment.timerId);
    segment.audio.pause();
  });
}

function resumeBgm() {
  if (!bgm.enabled || !bgm.paused) return;
  bgm.paused = false;
  bgm.segments.forEach((segment) => {
    segment.audio.play().catch(() => {});
    scheduleBgmNext(segment);
  });
}

function stopBgm() {
  bgm.enabled = false;
  bgm.paused = false;
  bgm.generation += 1;
  bgm.segments.forEach((segment) => {
    window.clearTimeout(segment.timerId);
    segment.audio.pause();
    segment.audio.removeAttribute("src");
    segment.audio.load();
  });
  bgm.segments = [];
}

function rotate(matrix, direction) {
  const size = matrix.length;
  const rotated = Array.from({ length: size }, () => Array(size).fill(0));
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      rotated[y][x] =
        direction > 0 ? matrix[size - 1 - x][y] : matrix[x][size - 1 - y];
    }
  }
  return rotated;
}

function rotateBombCells(bombCells, size, direction) {
  if (!bombCells) return null;
  const rotated = new Set();
  bombCells.forEach((key) => {
    const [x, y] = key.split(",").map(Number);
    const nextX = direction > 0 ? size - 1 - y : y;
    const nextY = direction > 0 ? x : size - 1 - x;
    rotated.add(`${nextX},${nextY}`);
  });
  return rotated;
}

function nextRotationState(currentState, direction) {
  const index = ROTATION_STATES.indexOf(currentState);
  const nextIndex = (index + direction + ROTATION_STATES.length) % ROTATION_STATES.length;
  return ROTATION_STATES[nextIndex];
}

function getKickTests(type, fromState, toState) {
  if (globalThis.RotationSpecialCore?.getKickTests) {
    return globalThis.RotationSpecialCore.getKickTests(type, fromState, toState);
  }
  if (type === "O") {
    return [[0, 0]];
  }
  if (type === "I") {
    return I_KICKS[`${fromState}>${toState}`] ?? [[0, 0]];
  }
  if (type === "I2" || type === "I3" || type === "L3" || type === "DOT") {
    return [[0, 0]];
  }
  if ("TJLSZ".includes(type)) {
    return JLSTZ_KICKS[`${fromState}>${toState}`] ?? [[0, 0]];
  }
  return [[0, 0]];
}

function collides(piece, nextX, nextY, matrix) {
  for (let y = 0; y < matrix.length; y += 1) {
    for (let x = 0; x < matrix[y].length; x += 1) {
      if (!matrix[y][x]) continue;
      const boardX = nextX + x;
      const boardY = nextY + y;
      if (boardX < 0 || boardX >= cols || boardY >= rows) return true;
      if (boardY >= 0 && board[boardY][boardX]) return true;
    }
  }
  return false;
}

function createLockedCell(type, pieceId, bomb) {
  if (isBomblissMode()) return createBomblissCell(type, bomb);
  if (isSquareMode()) return createSquareCell(type, pieceId);
  if (isCascadeEnabledForCurrentGame()) return createCascadeCell(type, pieceId);
  return type;
}

function mergePiece() {
  active.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      const boardY = active.y + y;
      if (value && boardY >= 0) {
        const bomb = active.bombCells?.has(`${x},${y}`) ? "small" : "none";
        board[boardY][active.x + x] = createLockedCell(active.type, active.pieceId, bomb);
      }
    });
  });
}

function clearLines() {
  let cleared = 0;
  for (let y = rows - 1; y >= 0; y -= 1) {
    if (board[y].every(Boolean)) {
      board.splice(y, 1);
      board.unshift(Array(cols).fill(null));
      cleared += 1;
      y += 1;
    }
  }
  return cleared;
}

function clearLinesWithRows() {
  const clearedRows = [];
  const remainingRows = [];
  for (let y = 0; y < rows; y += 1) {
    if (board[y].every(Boolean)) {
      clearedRows.push(y);
    } else {
      remainingRows.push(board[y]);
    }
  }
  while (remainingRows.length < rows) {
    remainingRows.unshift(Array(cols).fill(null));
  }
  board = remainingRows;
  return { cleared: clearedRows.length, clearedRows };
}

function clearLinesWithCellData() {
  const clearedRows = [];
  const clearedCells = [];
  const remainingRows = [];
  for (let y = 0; y < rows; y += 1) {
    if (board[y].every(Boolean)) {
      clearedRows.push(y);
      clearedCells.push(...board[y]);
    } else {
      remainingRows.push(board[y]);
    }
  }
  while (remainingRows.length < rows) {
    remainingRows.unshift(Array(cols).fill(null));
  }
  board = remainingRows;
  return { cleared: clearedRows.length, clearedRows, clearedCells };
}

function clearLinesWithRowsAndCells() {
  const clearedRows = [];
  const clearedRowCells = [];
  const remainingRows = [];
  for (let y = 0; y < rows; y += 1) {
    if (board[y].every(Boolean)) {
      clearedRows.push(y);
      clearedRowCells.push(board[y].map((cell) => cell));
    } else {
      remainingRows.push(board[y]);
    }
  }
  while (remainingRows.length < rows) {
    remainingRows.unshift(Array(cols).fill(null));
  }
  board = remainingRows;
  return { cleared: clearedRows.length, clearedRows, clearedRowCells };
}

function createCatchCore() {
  return {
    x: 5,
    y: 14,
    cells: [
      { x: 0, y: 0, type: "CORE" },
      { x: -1, y: 0, type: "CORE" },
      { x: 1, y: 0, type: "CORE" },
      { x: 0, y: -1, type: "CORE" },
      { x: 0, y: 1, type: "CORE" },
    ],
  };
}

function createCatchFallingPiece(type) {
  const matrix = cloneMatrix(SHAPES[type]);
  const width = matrix[0].length;
  return {
    type,
    matrix,
    x: Math.floor(rng() * Math.max(1, cols - width + 1)),
    y: -2,
    fallTimer: 0,
  };
}

function spawnCatchPiece() {
  fillQueue();
  const type = nextQueue.shift();
  fallingCatchPiece = createCatchFallingPiece(type);
  catchFallTimer = 0;
  if (checkCatchCollision(fallingCatchPiece)) {
    absorbFallingCatchPiece();
    return;
  }
  drawNextPreviews();
  updateStats();
}

function getCatchAbsoluteCells(core = catchCore) {
  return core.cells.map((cell) => ({
    x: core.x + cell.x,
    y: core.y + cell.y,
    type: getCellType(cell),
  }));
}

function isCatchInsideBounds(cells, x, y) {
  return cells.every((cell) => {
    const boardX = x + cell.x;
    const boardY = y + cell.y;
    return boardX >= 0 && boardX < cols && boardY >= 0 && boardY < rows;
  });
}

function canPlaceCatchCoreAt(x, y, cells = catchCore.cells) {
  return isCatchInsideBounds(cells, x, y);
}

function moveCatchCore(dx, dy) {
  if (!catchCore) return false;
  const nextX = catchCore.x + dx;
  const nextY = catchCore.y + dy;
  if (!canPlaceCatchCoreAt(nextX, nextY)) return false;
  catchCore.x = nextX;
  catchCore.y = nextY;
  if (fallingCatchPiece && checkCatchCollision(fallingCatchPiece)) {
    absorbFallingCatchPiece();
  }
  resolveCatchSquares();
  updateStats();
  return true;
}

function rotateCatchCells(cells, direction) {
  return cells.map((cell) => {
    if (direction > 0) {
      return { x: -cell.y, y: cell.x, type: getCellType(cell) };
    }
    return { x: cell.y, y: -cell.x, type: getCellType(cell) };
  });
}

function rotateCatchCore(direction) {
  if (!catchCore) return false;
  const rotated = rotateCatchCells(catchCore.cells, direction);
  const kicks = [
    [0, 0],
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [2, 0],
    [-2, 0],
    [0, 2],
    [0, -2],
  ];
  for (const [dx, dy] of kicks) {
    if (canPlaceCatchCoreAt(catchCore.x + dx, catchCore.y + dy, rotated)) {
      catchCore.cells = rotated;
      catchCore.x += dx;
      catchCore.y += dy;
      if (fallingCatchPiece && checkCatchCollision(fallingCatchPiece)) {
        absorbFallingCatchPiece();
      }
      resolveCatchSquares();
      updateStats();
      return true;
    }
  }
  return false;
}

function getCatchCoreCellSet() {
  return new Set(getCatchAbsoluteCells().map((cell) => `${cell.x},${cell.y}`));
}

function checkCatchCollision(piece = fallingCatchPiece) {
  if (!piece || !catchCore) return false;
  const fallingCells = getCatchPieceAbsCells(piece);
  const coreCells = getCatchAbsoluteCells();
  for (const fallingCell of fallingCells) {
    for (const coreCell of coreCells) {
      const dx = Math.abs(fallingCell.x - coreCell.x);
      const dy = Math.abs(fallingCell.y - coreCell.y);
      const overlaps = dx === 0 && dy === 0;
      const orthogonallyAdjacent = dx + dy === 1;
      if (overlaps || orthogonallyAdjacent) {
        return true;
      }
    }
  }
  return false;
}

function getCatchPieceAbsCells(piece = fallingCatchPiece) {
  const cells = [];
  if (!piece) return cells;
  for (let y = 0; y < piece.matrix.length; y += 1) {
    for (let x = 0; x < piece.matrix[y].length; x += 1) {
      if (piece.matrix[y][x]) {
        cells.push({ x: piece.x + x, y: piece.y + y, type: piece.type });
      }
    }
  }
  return cells;
}

function checkCatchCoreLimits() {
  if (!catchCore) return false;
  if (catchCore.cells.length > 80) {
    finishGame("Game Over");
    return true;
  }
  const cells = getCatchAbsoluteCells();
  if (!cells.length) {
    finishGame("Game Over");
    return true;
  }
  const xs = cells.map((cell) => cell.x);
  const ys = cells.map((cell) => cell.y);
  const width = Math.max(...xs) - Math.min(...xs) + 1;
  const height = Math.max(...ys) - Math.min(...ys) + 1;
  if (width > cols || height > rows) {
    finishGame("Game Over");
    return true;
  }
  return false;
}

function detectCatchSquares() {
  if (!catchCore) return null;
  const coreSet = getCatchCoreCellSet();
  for (let top = 0; top <= rows - 4; top += 1) {
    for (let left = 0; left <= cols - 4; left += 1) {
      let valid = true;
      for (let y = top; y < top + 4 && valid; y += 1) {
        for (let x = left; x < left + 4; x += 1) {
          if (!coreSet.has(`${x},${y}`)) {
            valid = false;
            break;
          }
        }
      }
      if (valid) {
        return { x: left, y: top };
      }
    }
  }
  return null;
}

function explodeCatchSquare(squareX, squareY) {
  if (!catchCore) return;
  const removedKeys = new Set();
  catchCore.cells = catchCore.cells.filter((cell) => {
    const absX = catchCore.x + cell.x;
    const absY = catchCore.y + cell.y;
    const inside = absX >= squareX && absX < squareX + 4 && absY >= squareY && absY < squareY + 4;
    if (inside) {
      removedKeys.add(`${cell.x},${cell.y}`);
      return false;
    }
    return true;
  });
  if (!catchCore.cells.length) {
    catchCore.cells.push({ x: 0, y: 0, type: "CORE" });
  }
  catchCombo += 1;
  score += 1600 * level;
  lines += 1;
  recordCatchSquareStat();
  lastEventEl.textContent = catchCombo > 1 ? `Combo x${catchCombo}` : "Catch 4x4";
  if (catchCore.cells.length > 80) {
    finishGame("Game Over");
  }
  updateStats();
}

function resolveCatchSquares() {
  let square = detectCatchSquares();
  if (!square) return false;
  let exploded = false;
  while (square) {
    explodeCatchSquare(square.x, square.y);
    exploded = true;
    if (gameOver) return true;
    square = detectCatchSquares();
  }
  return exploded;
}

function absorbFallingCatchPiece() {
  if (!catchCore || !fallingCatchPiece) return;
  const cells = getCatchPieceAbsCells();
  const merged = new Map();
  catchCore.cells.forEach((cell) => {
    merged.set(`${cell.x},${cell.y}`, { ...cell });
  });
  cells.forEach((cell) => {
    merged.set(`${cell.x - catchCore.x},${cell.y - catchCore.y}`, {
      x: cell.x - catchCore.x,
      y: cell.y - catchCore.y,
      type: getCellType(cell),
    });
  });
  catchCore.cells = Array.from(merged.values());
  score += 100;
  lastEventEl.textContent = "Catch +100";
  catchCombo = 0;
  fallingCatchPiece = null;
  if (checkCatchCoreLimits()) return;
  resolveCatchSquares();
  if (!gameOver && catchCore.cells.length <= 80) {
    spawnCatchPiece();
  }
}

function parseShadowStage(stage) {
  shadowStage = stage;
  shadowSilhouette = new Set();
  shadowShadedCells = 0;
  let maxY = -1;
  stage.silhouette.forEach((row, y) => {
    for (let x = 0; x < cols; x += 1) {
      if (row[x] === "X") {
        maxY = Math.max(maxY, y);
        shadowShadedCells += 1;
      }
    }
  });
  const yOffset = maxY >= 0 ? rows - 1 - maxY : 0;
  stage.silhouette.forEach((row, y) => {
    for (let x = 0; x < cols; x += 1) {
      if (row[x] === "X") {
        shadowSilhouette.add(`${x},${y + yOffset}`);
      }
    }
  });
  shadowInsideCells = 0;
  shadowOutsideCells = 0;
  shadowMatchPercent = 0;
}

function loadShadowStage(index, announce = true) {
  currentShadowStageIndex = index;
  parseShadowStage(SHADOW_STAGES[index]);
  shadowSkipCount = 0;
  if (announce) {
    lastEventEl.textContent = `Skip ${shadowSkipCount}/${shadowStage.skipLimit}`;
  }
}

function populateShadowStageSelect() {
  if (!shadowStageSelect) return;
  shadowStageSelect.innerHTML = "";
  SHADOW_STAGES.forEach((stage, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = stage.name;
    shadowStageSelect.appendChild(option);
  });
  shadowStageSelect.value = String(selectedShadowStageIndex);
}

function evaluateShadowMatch() {
  let inside = 0;
  let outside = 0;
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const cell = board[y][x];
      if (!cell) continue;
      if (shadowSilhouette.has(`${x},${y}`)) {
        inside += 1;
      } else {
        outside += 1;
      }
    }
  }
  const shaded = Math.max(1, shadowShadedCells);
  let matchPercent = Math.floor(((inside - outside) / shaded) * 100);
  matchPercent = Math.max(0, Math.min(100, matchPercent));
  return { inside, outside, shaded, matchPercent };
}

function skipShadowPiece() {
  if (!running || paused || !isShadowMode()) {
    return;
  }
  if (shadowSkipCount >= (shadowStage?.skipLimit ?? 0)) {
    lastEventEl.textContent = `Skip ${shadowSkipCount}/${shadowStage.skipLimit}`;
    return;
  }
  shadowSkipCount += 1;
  lastEventEl.textContent = `Skip ${shadowSkipCount}/${shadowStage.skipLimit}`;
  softDropDistance = 0;
  lockCounter = 0;
  lockResetCount = 0;
  spawnPiece();
  drawNextPreviews();
  drawPreview(holdCtx, holdType);
}

function getHotlinePointsForRows(clearedRows) {
  return clearedRows.reduce((sum, row) => {
    const hotline = HOTLINE_ROWS.find(({ y }) => y === row);
    return sum + (hotline?.points ?? 0);
  }, 0);
}

function getCheeseHoleColumn() {
  let hole = Math.floor(rng() * cols);
  let safety = 0;
  while (
    cheeseHoleHistory.length >= 2 &&
    cheeseHoleHistory[cheeseHoleHistory.length - 1] === hole &&
    cheeseHoleHistory[cheeseHoleHistory.length - 2] === hole &&
    safety < 20
  ) {
    hole = Math.floor(rng() * cols);
    safety += 1;
  }
  cheeseHoleHistory.push(hole);
  if (cheeseHoleHistory.length > 2) {
    cheeseHoleHistory.shift();
  }
  return hole;
}

function createCheeseGarbageRow() {
  const hole = getCheeseHoleColumn();
  return Array.from({ length: cols }, (_, x) => (x === hole ? null : createGarbageCell()));
}

function addCheeseGarbageLine() {
  if (board[0].some(Boolean)) {
    return false;
  }
  board.shift();
  board.push(createCheeseGarbageRow());
  cheeseGeneratedLines += 1;
  return true;
}

function getPurifyHoleColumn() {
  return globalThis.PurifyCore?.getPurifyHoleColumn
    ? globalThis.PurifyCore.getPurifyHoleColumn(cols, rng, purifyHoleHistory)
    : Math.floor(rng() * cols);
}

function createPurifyGarbageRow() {
  if (globalThis.PurifyCore?.createPurifyGarbageRow) {
    const batchRow = globalThis.PurifyCore.createPurifyGarbageRow(cols, rng, purifyHoleHistory);
    return createPurifyGarbageRowFromSpec(batchRow);
  }
  const hole = getPurifyHoleColumn();
  const row = Array.from({ length: cols }, (_, x) => {
    if (x === hole) return null;
    return createPurifyCell();
  });
  return {
    row,
    infectedCount: row.filter((cell) => cell && cell.infected).length,
  };
}

function createPurifyGarbageRowFromSpec(spec) {
  return {
    row: spec.row.map((cell) => {
      if (!cell.filled) return null;
      return createCell({ type: "G", garbage: true, infected: cell.infected });
    }),
    infectedCount: spec.infectedCount,
  };
}

function addPurifyInfectionLine() {
  const helper = globalThis.PurifyCore;
  const batch = helper?.createPurifyGarbageBatch
    ? helper.createPurifyGarbageBatch(cols, rng, purifyHoleHistory)
    : { pattern: "one", rows: [createPurifyGarbageRow()] };
  const count = Math.min(batch.rows.length, rows);
  if (board.slice(0, count).some((row) => row.some(Boolean))) {
    return false;
  }
  for (let i = 0; i < count; i += 1) {
    board.shift();
    const row = batch.rows[i].row.map((cell) => {
      if (!cell.filled) return null;
      return createPurifyCell();
    });
    row.forEach((cell, x) => {
      if (cell && !batch.rows[i].row[x].infected) {
        cell.infected = false;
      }
    });
    board.push(row);
    purifyCurrentInfections += batch.rows[i].infectedCount;
  }
  purifyWave += count;
  purifyNextSpawnMs = Math.max(
    PURIFY_MIN_SPAWN_MS,
    PURIFY_INITIAL_SPAWN_MS - purifyWave * PURIFY_SPAWN_STEP_MS,
  );
  return true;
}

function seedCheeseGarbage() {
  cheeseGeneratedLines = 0;
  cheeseHoleHistory = [];
  const initialGarbage = Math.min(cheeseGoalLines, 18);
  for (let i = 0; i < initialGarbage; i += 1) {
    board[rows - 1 - i] = createCheeseGarbageRow();
    cheeseGeneratedLines += 1;
  }
}

function seedPurifyGarbage() {
  purifyCleansed = 0;
  purifyWave = 0;
  purifySpawnTimer = 0;
  purifyNextSpawnMs = PURIFY_INITIAL_SPAWN_MS;
  purifyCurrentInfections = 0;
  purifyHoleHistory = [];
  const initialGarbage = Math.min(PURIFY_INITIAL_GARBAGE_LINES, rows - 2);
  let placed = 0;
  while (placed < initialGarbage) {
    const helper = globalThis.PurifyCore;
    const batch = helper?.createPurifyGarbageBatch
      ? helper.createPurifyGarbageBatch(cols, rng, purifyHoleHistory)
      : { rows: [createPurifyGarbageRow()] };
    for (const spec of batch.rows) {
      if (placed >= initialGarbage) break;
      const { row, infectedCount } = createPurifyGarbageRowFromSpec(spec);
      board[rows - 1 - placed] = row;
      purifyCurrentInfections += infectedCount;
      placed += 1;
    }
  }
}

function replenishCheeseGarbage(cleared) {
  if (!isCheeseRaceMode() || cheeseGeneratedLines >= cheeseGoalLines) return;
  const refillCount = Math.min(cleared, 4, cheeseGoalLines - cheeseGeneratedLines);
  for (let i = 0; i < refillCount; i += 1) {
    if (!addCheeseGarbageLine()) {
      finishGame("Game Over");
      return;
    }
  }
}

function collectPieceCells() {
  const pieces = new Map();
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const cell = board[y][x];
      const pieceId = getCellPieceId(cell);
      if (pieceId === null) continue;
      if (!pieces.has(pieceId)) {
        pieces.set(pieceId, { type: getCellType(cell), cells: [] });
      }
      pieces.get(pieceId).cells.push({ x, y, cell });
    }
  }
  return pieces;
}

function detectAndMarkSquares() {
  if (!isSquareMode()) return [];
  const helper = globalThis.SquareCore;
  if (helper?.detectAndMarkSquares) {
    const result = helper.detectAndMarkSquares(board, rows, cols, {
      getCellPieceId,
      getCellType,
      getCellSquareType,
      squareGroups,
      createSquareId: () => {
        const squareId = nextSquareId;
        nextSquareId += 1;
        return squareId;
      },
      now: () => performance.now(),
    });
    squareGroups = result.squareGroups ?? squareGroups;
    return result.madeSquares ?? [];
  }
  return [];
}

function getSquareLineBonus(clearedCells) {
  const helper = globalThis.SquareCore;
  if (helper?.getSquareLineBonus) {
    return helper.getSquareLineBonus(clearedCells, level);
  }
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

function refreshSquareGroupsAfterLineClear() {
  const helper = globalThis.SquareCore;
  if (!helper?.refreshSquareGroupsAfterLineClear) return;
  const result = helper.refreshSquareGroupsAfterLineClear(board, rows, cols, squareGroups, {
    getCellSquareType,
  });
  squareGroups = result ?? squareGroups;
}

function getDominantSquareType(clearedCells) {
  if (clearedCells.some((cell) => getCellSquareType(cell) === "gold")) return "gold";
  if (clearedCells.some((cell) => getCellSquareType(cell) === "silver")) return "silver";
  return null;
}

function findFullCascadeLines() {
  const fullLines = [];
  for (let y = 0; y < rows; y += 1) {
    if (board[y].every(isOccupiedCell)) {
      fullLines.push(y);
    }
  }
  return fullLines;
}

function clearCascadeLines(fullLines) {
  fullLines.forEach((y) => {
    board[y] = Array(cols).fill(null);
  });
}

function getCascadeGroups() {
  const groups = new Map();
  let fallbackId = -1;
  for (let y = rows - 1; y >= 0; y -= 1) {
    for (let x = 0; x < cols; x += 1) {
      const cell = board[y][x];
      if (!cell) continue;
      const pieceId = typeof cell === "object" && Number.isFinite(cell.pieceId) ? cell.pieceId : fallbackId--;
      if (!groups.has(pieceId)) groups.set(pieceId, []);
      groups.get(pieceId).push({ x, y, cell });
    }
  }
  return groups;
}

function canMoveCascadeGroupDown(cells, occupiedSet = null) {
  const ownCells = new Set(cells.map(({ x, y }) => `${x},${y}`));
  return cells.every(({ x, y }) => {
    const nextY = y + 1;
    if (nextY >= rows) return false;
    if (occupiedSet) {
      return !occupiedSet.has(`${x},${nextY}`) || ownCells.has(`${x},${nextY}`);
    }
    return !board[nextY][x] || ownCells.has(`${x},${nextY}`);
  });
}

function moveCascadeGroupDown(cells) {
  cells.forEach(({ x, y }) => {
    board[y][x] = null;
  });
  cells.forEach(({ x, y, cell }) => {
    board[y + 1][x] = cell;
  });
}

function applyCascadeGravityStep() {
  const groups = Array.from(getCascadeGroups().values()).sort(
    (a, b) => Math.max(...b.map((cell) => cell.y)) - Math.max(...a.map((cell) => cell.y)),
  );
  const occupiedSet = new Set();
  groups.forEach((cells) => {
    cells.forEach(({ x, y }) => occupiedSet.add(`${x},${y}`));
  });

  const movableGroups = groups.filter((cells) => canMoveCascadeGroupDown(cells, occupiedSet));
  if (movableGroups.length === 0) return false;

  movableGroups.forEach((cells) => {
    cells.forEach(({ x, y }) => {
      board[y][x] = null;
    });
  });
  movableGroups.forEach((cells) => {
    cells.forEach(({ x, y, cell }) => {
      board[y + 1][x] = cell;
    });
  });
  return true;
}

function resolveCascadeClears() {
  const clears = [];
  let chainCount = 0;

  while (true) {
    const fullLines = findFullCascadeLines();
    if (fullLines.length === 0) break;
    chainCount += 1;
    clears.push({ chain: chainCount, lines: fullLines.length });
    clearCascadeLines(fullLines);
    while (applyCascadeGravityStep()) {}
  }

  return { chainCount, clears, totalLines: clears.reduce((sum, clear) => sum + clear.lines, 0) };
}

const CASCADE_CLEAR_DELAY_MS = 120;
const CASCADE_FALL_STEP_MS = 48;

function startCascadeResolution() {
  const fullLines = findFullCascadeLines();
  cascadeResolutionClears = [];
  if (fullLines.length === 0) {
    return false;
  }
  cascadeResolutionActive = true;
  cascadeResolutionPhase = "clear";
  cascadeResolutionUsedZone = false;
  cascadeClearDelay = CASCADE_CLEAR_DELAY_MS;
  cascadeGravityTimer = 0;
  cascadeResolutionClears.push({ chain: 1, lines: fullLines.length });
  clearCascadeLines(fullLines);
  applyZoneCascadeClear(fullLines.length);
  lines += fullLines.length;
  recordLineClearStats(fullLines.length);
  recordCustomLineEvents(fullLines.length, false);
  updateStats();
  return true;
}

function applyZoneCascadeClear(cleared) {
  if (!zoneActive || cleared <= 0) return;
  cascadeResolutionUsedZone = true;
  zoneLines += cleared;
  zoneMaxLines = Math.max(zoneMaxLines, zoneLines);
  zoneScoreBuffer += getNormalLineScore(Math.min(cleared, 4));
  const zoneEventKey = globalThis.ZoneCore ? ZoneCore.getZoneEventKey({ cleared, tSpin: false, perfectClear: false }) : null;
  const extensionMs = globalThis.ZoneCore ? ZoneCore.getZoneExtensionMs({ cleared, tSpin: false, perfectClear: false }) : 0;
  const applied = globalThis.ZoneCore ? ZoneCore.applyZoneExtension(zoneTimer, extensionMs) : { after: zoneTimer, applied: 0 };
  zoneTimer = applied.after;
  if (applied.applied > 0) {
    zoneExtensionNoticeText = globalThis.ZoneCore ? ZoneCore.getZoneExtensionText(zoneEventKey, applied.applied) : `${zoneEventKey ?? "ZONE"}  +${(applied.applied / 1000).toFixed(1)}s`;
    zoneExtensionNoticeUntil = performance.now() + 900;
  }
}

function finalizeCascadeResolution() {
  const totalLines = cascadeResolutionClears.reduce((sum, clear) => sum + clear.lines, 0);
  const perfectClear = totalLines > 0 && isPerfectClear();
  const result = {
    chainCount: cascadeResolutionClears.length,
    clears: [...cascadeResolutionClears],
    totalLines,
  };
  if (!cascadeResolutionUsedZone) {
    applyCascadeScore(result, perfectClear);
  } else {
    updateStats();
  }
  updateCascadeLastEvent(result, perfectClear);
  if (perfectClear) {
    recordPerfectClearStat();
  }
  if (isCascadeMode() && !endlessEnabled && lines >= 150) {
    finishGame("Cascade Complete");
    return;
  }
  cascadeResolutionActive = false;
  cascadeResolutionPhase = "idle";
  cascadeClearDelay = 0;
  cascadeGravityTimer = 0;
  cascadeResolutionClears = [];
  cascadeResolutionUsedZone = false;
  if (evaluateTutorialLockResult({
    mode: "cascade",
    cascadeChain: result.chainCount,
    cascadeClears: result.clears,
    clearedLines: result.totalLines,
    isPerfectClear: perfectClear,
  })) {
    return;
  }
  spawnPiece();
  drawNextPreviews();
  drawPreview(holdCtx, holdType);
}

function processCascadeResolutionFrame(delta) {
  if (!cascadeResolutionActive) return;
  if (cascadeResolutionPhase === "clear") {
    cascadeClearDelay -= delta;
    if (cascadeClearDelay > 0) return;
    cascadeResolutionPhase = "gravity";
    cascadeGravityTimer = 0;
  }

  if (cascadeResolutionPhase !== "gravity") return;

  cascadeGravityTimer += delta;
  while (cascadeGravityTimer >= CASCADE_FALL_STEP_MS) {
    cascadeGravityTimer -= CASCADE_FALL_STEP_MS;
    const moved = applyCascadeGravityStep();
    if (moved) {
      return;
    }

    const fullLines = findFullCascadeLines();
    if (fullLines.length > 0) {
      cascadeResolutionClears.push({
        chain: cascadeResolutionClears.length + 1,
        lines: fullLines.length,
      });
      clearCascadeLines(fullLines);
      applyZoneCascadeClear(fullLines.length);
      lines += fullLines.length;
      recordLineClearStats(fullLines.length);
      recordCustomLineEvents(fullLines.length, false);
      updateStats();
      cascadeResolutionPhase = "clear";
      cascadeClearDelay = CASCADE_CLEAR_DELAY_MS;
      cascadeGravityTimer = 0;
      return;
    }

    finalizeCascadeResolution();
    return;
  }
}

function findBomblissLineBombs() {
  return BomblissCore.findBomblissLineBombs(board, rows, cols, getCellBomb);
}

function applyBomblissGravity() {
  return BomblissCore.applyBomblissGravity(board, rows, cols);
}

function createBomblissLargeBombs() {
  const result = BomblissCore.createBomblissLargeBombs(
    board,
    rows,
    cols,
    getCellBomb,
    getCellType,
    (payload) => createBomblissCell(payload.type, payload.bomb, payload.largeBombId),
    nextLargeBombId,
  );
  nextLargeBombId = result.nextLargeBombId;
  return result.created;
}

function processBomblissChains() {
  const result = BomblissCore.processBomblissChains(board, rows, cols, {
    getCellBomb,
    getCellLargeBombId,
    getCellType,
    createCell: (payload) => createBomblissCell(payload.type, payload.bomb, payload.largeBombId),
    nextLargeBombId,
  });
  nextLargeBombId = result.nextLargeBombId;
  return result;
}

function isBackToBackEligible(cleared, tSpin) {
  return cleared === 4 || (tSpin && cleared > 0);
}

function getRenBonus() {
  return Math.min(50 * renStreak, 1000);
}

function getNormalLineScore(cleared) {
  const lineScores = [0, 100, 300, 500, 800];
  return lineScores[cleared] * level;
}

function getTSpinScore(cleared) {
  const tSpinScores = [400, 800, 1200, 1600];
  return tSpinScores[cleared] * level;
}

function isZoneBonusLineClear(cleared, tSpin) {
  return cleared === 4 || (tSpin && cleared > 0);
}

function getZoneGaugeGain(cleared, tSpin) {
  return isZoneBonusLineClear(cleared, tSpin) ? 15 : cleared * 10;
}

function getZoneClearName(cleared) {
  if (cleared >= 20) return "Ultimatris";
  if (cleared >= 18) return "Perfectris";
  if (cleared >= 16) return "Decahexatris";
  if (cleared >= 12) return "Dodecatris";
  if (cleared >= 8) return "Octoris";
  if (cleared >= 4) return "Tetris";
  return `Zone ${cleared}`;
}

function getZoneMultiplier(cleared) {
  if (cleared >= 16) return 3;
  if (cleared >= 8) return 2;
  return 1;
}

function getCurrentPlayerId() {
  return currentPlayer?.id ?? "guest";
}

function loadBestRecords() {
  try {
    return JSON.parse(window.localStorage.getItem(BEST_RECORDS_STORAGE_KEY)) ?? {};
  } catch {
    return {};
  }
}

function saveBestRecords(records) {
  try {
    window.localStorage.setItem(BEST_RECORDS_STORAGE_KEY, JSON.stringify(records));
  } catch {
    // ignore
  }
}

function getBestRecord(modeKey, playerId = getCurrentPlayerId()) {
  const records = loadBestRecords();
  return records[playerId]?.[modeKey] ?? null;
}

function setBestRecord(modeKey, record, playerId = getCurrentPlayerId()) {
  const records = loadBestRecords();
  if (!records[playerId]) records[playerId] = {};
  records[playerId][modeKey] = record;
  saveBestRecords(records);
}

function clearBestRecordsForCurrentPlayer() {
  const playerId = getCurrentPlayerId();
  const records = loadBestRecords();
  delete records[playerId];
  saveBestRecords(records);
}

function getModeBestKey() {
  const modeName = getEffectiveModeName();

  if (modeName === "スプリント") {
    return `sprint:${sprintGoalLines}`;
  }

  if (modeName === "Cheese Race") {
    return `cheese:${cheeseGoalLines}`;
  }

  if (modeName === "浄化") {
    return "purify";
  }

  if (modeName === "ウルトラ") {
    return "ultra";
  }

  if (modeName === "Catch") {
    return "catch";
  }

  if (modeName === "Shadow") {
    return `shadow:${currentShadowStageIndex}`;
  }

  if (modeName === "ボンブリス") {
    return "bombliss";
  }

  if (modeName === "ホットライン") {
    return "hotline";
  }

  if (modeName === "カスケード") {
    return "cascade";
  }

  if (modeName === "ゾーン") {
    return "zone";
  }

  if (modeName === "スクエア") {
    return "square";
  }

  if (modeName === "オールクリアスプリント") {
    return "allClearSprint";
  }

  if (modeName === "やさしいマラソン") {
    return `easyMarathon:${easyDifficulty}`;
  }

  return modeName;
}

function getModeResult() {
  const modeName = getEffectiveModeName();
  const base = {
    mode: modeName,
    modeKey: getModeBestKey(),
    playerId: getCurrentPlayerId(),
    score,
    lines,
    level,
    timeMs: gameTimeMs,
    date: new Date().toISOString(),
  };

  if (modeName === "スプリント") {
    return {
      ...base,
      type: "time",
      timeMs: gameTimeMs,
      goalLines: sprintGoalLines,
    };
  }

  if (modeName === "Cheese Race") {
    return {
      ...base,
      type: "time",
      timeMs: gameTimeMs,
      cheeseClearedLines,
      cheeseGoalLines,
    };
  }

  if (modeName === "オールクリアスプリント") {
    return {
      ...base,
      type: "time",
      timeMs: gameTimeMs,
      perfectClearCount,
    };
  }

  if (modeName === "ウルトラ") {
    return {
      ...base,
      type: "score",
      score,
      lines,
    };
  }

  if (modeName === "Catch") {
    return {
      ...base,
      type: "score",
      score,
      catchClears: lines,
      coreSize: catchCore?.cells.length ?? 0,
    };
  }

  if (modeName === "Shadow") {
    return {
      ...base,
      type: "percent",
      stageIndex: currentShadowStageIndex,
      stageName: shadowStage?.name,
      matchPercent: shadowMatchPercent,
      score,
    };
  }

  if (modeName === "ボンブリス") {
    return {
      ...base,
      type: "stage",
      stageIndex: bomblissStageIndex,
      stageReached: bomblissStageIndex + 1,
      bomblissPoints,
      score,
    };
  }

  if (modeName === "浄化") {
    return {
      ...base,
      type: "score",
      score,
      lines,
    };
  }

  return {
    ...base,
    type: "score",
    score,
    lines,
  };
}

function isCompletedResult(result) {
  if (!result) return false;
  if (result.mode === "スプリント") {
    return lines >= sprintGoalLines;
  }
  if (result.mode === "Cheese Race") {
    return cheeseClearedLines >= cheeseGoalLines;
  }
  if (result.mode === "浄化") {
    return true;
  }
  if (result.mode === "オールクリアスプリント") {
    return perfectClearCount >= 20;
  }
  if (result.mode === "Shadow") {
    return shadowMatchPercent >= (shadowStage?.targetPercent ?? 80);
  }
  return true;
}

function isBetterResult(current, best) {
  if (!best) return true;

  if (current.type === "time") {
    return Number(current.timeMs) < Number(best.timeMs);
  }

  if (current.type === "score") {
    return Number(current.score) > Number(best.score);
  }

  if (current.type === "percent") {
    if (Number(current.matchPercent) !== Number(best.matchPercent)) {
      return Number(current.matchPercent) > Number(best.matchPercent);
    }
    return Number(current.timeMs) < Number(best.timeMs);
  }

  if (current.type === "stage") {
    if (Number(current.stageReached) !== Number(best.stageReached)) {
      return Number(current.stageReached) > Number(best.stageReached);
    }
    return Number(current.score) > Number(best.score);
  }

  return Number(current.score) > Number(best.score);
}

function shouldSaveBestForCurrentPlayer() {
  if (isTutorialMode()) return false;
  if (isZeroGravityMode()) return false;
  return true;
}

function finalizeResultRecord() {
  const result = getModeResult();
  const previousBest = getBestRecord(result.modeKey, result.playerId);
  const completed = isCompletedResult(result);
  const saveable = shouldSaveBestForCurrentPlayer();
  const newBest = saveable && completed && isBetterResult(result, previousBest);

  if (newBest) {
    setBestRecord(result.modeKey, result, result.playerId);
  }

  lastResultInfo = {
    result,
    previousBest,
    newBest,
    completed,
  };

  return lastResultInfo;
}

function updateBestRecordIfNeeded() {
  const info = finalizeResultRecord();
  return info.newBest;
}

function formatBestRecordValue(result) {
  if (!result) return "-";
  if (result.type === "time") {
    return formatTime(result.timeMs ?? 0);
  }
  if (result.type === "percent") {
    return `${result.matchPercent ?? 0}%`;
  }
  if (result.type === "stage") {
    return `Stage ${result.stageReached ?? result.stageIndex ?? 0}`;
  }
  return (Number(result.score ?? 0)).toLocaleString("ja-JP");
}

function getPlayerProfiles() {
  try {
    const raw =
      window.localStorage.getItem(PLAYER_PROFILES_STORAGE_KEY) ??
      window.localStorage.getItem(PLAYER_PROFILES_STORAGE_KEY_LEGACY);
    const profiles = raw ? JSON.parse(raw) : [];
    if (raw && !window.localStorage.getItem(PLAYER_PROFILES_STORAGE_KEY)) {
      window.localStorage.setItem(PLAYER_PROFILES_STORAGE_KEY, raw);
    }
    return Array.isArray(profiles) ? profiles.filter((profile) => profile && typeof profile.id === "string" && typeof profile.name === "string") : [];
  } catch {
    return [];
  }
}

function savePlayerProfiles(profiles) {
  try {
    const serialized = JSON.stringify(profiles);
    window.localStorage.setItem(PLAYER_PROFILES_STORAGE_KEY, serialized);
  } catch {
    // ignore
  }
}

function getLastPlayerId() {
  try {
    const value =
      window.localStorage.getItem(LAST_PLAYER_STORAGE_KEY) ??
      window.localStorage.getItem(LAST_PLAYER_STORAGE_KEY_LEGACY);
    if (value && !window.localStorage.getItem(LAST_PLAYER_STORAGE_KEY)) {
      window.localStorage.setItem(LAST_PLAYER_STORAGE_KEY, value);
    }
    return value;
  } catch {
    return null;
  }
}

function setLastPlayerId(playerId) {
  try {
    if (!playerId) {
      window.localStorage.removeItem(LAST_PLAYER_STORAGE_KEY);
      window.localStorage.removeItem(LAST_PLAYER_STORAGE_KEY_LEGACY);
    } else {
      window.localStorage.setItem(LAST_PLAYER_STORAGE_KEY, playerId);
      window.localStorage.setItem(LAST_PLAYER_STORAGE_KEY_LEGACY, playerId);
    }
  } catch {
    // ignore
  }
}

function exportSaveData() {
  const data = {};

  SAVE_EXPORT_KEYS.forEach((key) => {
    if (key === PLAYER_PROFILES_STORAGE_KEY) {
      data[key] =
        window.localStorage.getItem(PLAYER_PROFILES_STORAGE_KEY) ??
        window.localStorage.getItem(PLAYER_PROFILES_STORAGE_KEY_LEGACY);
      return;
    }

    if (key === LAST_PLAYER_STORAGE_KEY) {
      data[key] =
        window.localStorage.getItem(LAST_PLAYER_STORAGE_KEY) ??
        window.localStorage.getItem(LAST_PLAYER_STORAGE_KEY_LEGACY);
      return;
    }

    data[key] = window.localStorage.getItem(key);
  });

  const payload = {
    app: "Blockfall",
    version: 1,
    exportedAt: new Date().toISOString(),
    data,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const date = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `blockfall-save-${date}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);

  lastEventEl.textContent = "Exported";
}

function importSaveDataFromFile(file) {
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    try {
      const payload = JSON.parse(String(reader.result));

      if (!payload || payload.app !== "Blockfall" || !payload.data) {
        throw new Error("Invalid save data");
      }

      const importedKeys = Object.keys(payload.data).filter((key) =>
        SAVE_EXPORT_KEYS.includes(key),
      );

      if (importedKeys.length === 0) {
        throw new Error("No supported save keys");
      }

      const confirmed = window.confirm(
        "現在のローカル保存データを、読み込んだセーブデータで上書きします。続行しますか？",
      );

      if (!confirmed) return;

      importedKeys.forEach((key) => {
        const value = payload.data[key];

        if (value === null || value === undefined) {
          window.localStorage.removeItem(key);
          if (key === PLAYER_PROFILES_STORAGE_KEY) {
            window.localStorage.removeItem(PLAYER_PROFILES_STORAGE_KEY_LEGACY);
          }
          if (key === LAST_PLAYER_STORAGE_KEY) {
            window.localStorage.removeItem(LAST_PLAYER_STORAGE_KEY_LEGACY);
          }
        } else if (typeof value === "string") {
          window.localStorage.setItem(key, value);
          if (key === PLAYER_PROFILES_STORAGE_KEY) {
            window.localStorage.setItem(PLAYER_PROFILES_STORAGE_KEY_LEGACY, value);
          }
          if (key === LAST_PLAYER_STORAGE_KEY) {
            window.localStorage.setItem(LAST_PLAYER_STORAGE_KEY_LEGACY, value);
          }
        }
      });

      lastEventEl.textContent = "Imported";

      window.alert("セーブデータを読み込みました。反映のためページを再読み込みします。");
      window.location.reload();
    } catch (error) {
      console.error(error);
      window.alert("セーブデータの読み込みに失敗しました。");
    }
  });

  reader.readAsText(file);
}

function normalizePlayerName(name) {
  return String(name ?? "").trim().slice(0, 16);
}

function makeProfileId() {
  return `profile_${Date.now()}_${String(performance.now()).replace(/\D/g, "")}`;
}

function isGuestPlayer() {
  return currentPlayer?.isGuest ?? true;
}

function updatePlayerIndicator() {
  const name = currentPlayer?.name ?? "Guest";
  if (playerIndicatorEl) {
    playerIndicatorEl.textContent = `Player: ${name}`;
  }
  if (selectedPlayerNameEl) {
    selectedPlayerNameEl.textContent = name;
  }
}

function setCurrentPlayer(player) {
  currentPlayer = player;
  if (player?.isGuest) {
    setLastPlayerId("guest");
  } else if (player?.id) {
    setLastPlayerId(player.id);
  }
  updatePlayerIndicator();
}

function createGuestPlayer() {
  setCurrentPlayer({
    id: "guest",
    name: "Guest",
    isGuest: true,
  });
}

function selectProfileById(profileId) {
  const profile = getPlayerProfiles().find((item) => item.id === profileId);
  if (!profile) return false;
  setCurrentPlayer({
    id: profile.id,
    name: profile.name,
    isGuest: false,
  });
  return true;
}

function renderProfileList() {
  if (!profileListEl) return;
  const profiles = getPlayerProfiles();
  profileListEl.innerHTML = "";
  if (profiles.length === 0) {
    const empty = document.createElement("div");
    empty.className = "option-row";
    empty.textContent = "プロフィールなし";
    profileListEl.appendChild(empty);
    return;
  }

  profiles.forEach((profile) => {
    const item = document.createElement("div");
    item.className = "profile-item";

    const selectButton = document.createElement("button");
    selectButton.type = "button";
    selectButton.textContent = profile.name;
    selectButton.addEventListener("click", () => {
      selectProfileById(profile.id);
      showTitleMenu();
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "削除";
    deleteButton.addEventListener("click", () => {
      const nextProfiles = getPlayerProfiles().filter((item) => item.id !== profile.id);
      savePlayerProfiles(nextProfiles);
      if (currentPlayer?.id === profile.id) {
        currentPlayer = null;
      }
      if (getLastPlayerId() === profile.id) {
        setLastPlayerId(null);
      }
      updatePlayerIndicator();
      renderProfileList();
    });

    item.append(selectButton, deleteButton);
    profileListEl.appendChild(item);
  });
}

function showLoginMenu() {
  hideBombingReveal();
  shell.classList.add("menu-screen");
  overlay.classList.remove("hidden");
  overlayTitle.textContent = "Player Select";
  modeMenu.classList.add("hidden");
  if (onePlayerMenu) onePlayerMenu.classList.add("hidden");
  easyModeMenu.classList.add("hidden");
  globalOptionsButton.classList.add("hidden");
  if (myPageButton) myPageButton.classList.add("hidden");
  if (playerSwitchButton) playerSwitchButton.classList.add("hidden");
  optionMenu.classList.add("hidden");
  globalOptionsMenu.classList.add("hidden");
  if (myPageMenu) myPageMenu.classList.add("hidden");
  actionMenu.classList.add("hidden");
  loginMenu.classList.remove("hidden");
  updatePlayerIndicator();
  renderProfileList();
  if (playerNameInput) {
    const lastPlayerId = getLastPlayerId();
    const profiles = getPlayerProfiles();
    const lastProfile = profiles.find((profile) => profile.id === lastPlayerId);
    playerNameInput.value = currentPlayer && !currentPlayer.isGuest ? currentPlayer.name : lastProfile?.name ?? "";
    window.setTimeout(() => playerNameInput.focus(), 0);
  }
}

function openPlayerSwitchMenu() {
  if (running && !gameOver) {
    returnToTitle();
  }
  showLoginMenu();
}

function createEmptyPlayerStats() {
  return {
    gamesPlayed: 0,
    totalPlayTimeMs: 0,
    totalScore: 0,
    totalLines: 0,
    singles: 0,
    doubles: 0,
    triples: 0,
    tetrises: 0,
    tSpinNoLines: 0,
    tSpinSingles: 0,
    tSpinDoubles: 0,
    tSpinTriples: 0,
    backToBacks: 0,
    maxBackToBackStreak: 0,
    perfectClears: 0,
    maxRen: 0,
    zoneActivations: 0,
    maxZoneLines: 0,
    cheeseLinesCleared: 0,
    shadowStagesCleared: 0,
    bomblissStagesCleared: 0,
    catchSquares: 0,
  };
}

function loadPlayerStats() {
  try {
    return JSON.parse(window.localStorage.getItem(PLAYER_STATS_STORAGE_KEY)) ?? {};
  } catch {
    return {};
  }
}

function savePlayerStats(stats) {
  try {
    window.localStorage.setItem(PLAYER_STATS_STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // ignore
  }
}

function getStatsForPlayer(playerId = getCurrentPlayerId()) {
  const allStats = loadPlayerStats();
  return { ...createEmptyPlayerStats(), ...(allStats[playerId] ?? {}) };
}

function updateStatsForCurrentPlayer(updater) {
  const playerId = getCurrentPlayerId();
  const allStats = loadPlayerStats();
  const stats = { ...createEmptyPlayerStats(), ...(allStats[playerId] ?? {}) };
  updater(stats);
  allStats[playerId] = stats;
  savePlayerStats(allStats);
}

function clearStatsForCurrentPlayer() {
  const playerId = getCurrentPlayerId();
  const allStats = loadPlayerStats();
  delete allStats[playerId];
  savePlayerStats(allStats);
}

function finalizePlayerStatsForGame() {
  if (isTutorialMode()) return;
  updateStatsForCurrentPlayer((stats) => {
    stats.gamesPlayed += 1;
    stats.totalPlayTimeMs += gameTimeMs;
    stats.totalScore += score;
    stats.totalLines += lines;
  });
}

function recordLineClearStats(cleared, { tSpin = false, backToBackActive = false, perfectClear = false } = {}) {
  if (isTutorialMode()) return;
  if (cleared > 0) {
    updateStatsForCurrentPlayer((stats) => {
      if (cleared === 1) stats.singles += 1;
      else if (cleared === 2) stats.doubles += 1;
      else if (cleared === 3) stats.triples += 1;
      else if (cleared >= 4) stats.tetrises += 1;
      if (tSpin) {
        if (cleared === 0) stats.tSpinNoLines += 1;
        else if (cleared === 1) stats.tSpinSingles += 1;
        else if (cleared === 2) stats.tSpinDoubles += 1;
        else if (cleared >= 3) stats.tSpinTriples += 1;
      }
      if (backToBackActive) {
        stats.backToBacks += 1;
      }
      stats.maxBackToBackStreak = Math.max(stats.maxBackToBackStreak ?? 0, backToBackStreak);
      stats.maxRen = Math.max(stats.maxRen ?? 0, renStreak);
      if (perfectClear) {
        stats.perfectClears += 1;
      }
    });
  } else if (tSpin) {
    updateStatsForCurrentPlayer((stats) => {
      stats.tSpinNoLines += 1;
      stats.maxBackToBackStreak = Math.max(stats.maxBackToBackStreak ?? 0, backToBackStreak);
      stats.maxRen = Math.max(stats.maxRen ?? 0, renStreak);
    });
  } else {
    updateStatsForCurrentPlayer((stats) => {
      stats.maxBackToBackStreak = Math.max(stats.maxBackToBackStreak ?? 0, backToBackStreak);
      stats.maxRen = Math.max(stats.maxRen ?? 0, renStreak);
    });
  }
}

function recordZoneActivationStat() {
  if (isTutorialMode()) return;
  updateStatsForCurrentPlayer((stats) => {
    stats.zoneActivations += 1;
  });
}

function recordZoneMaxLinesStat(value) {
  if (isTutorialMode()) return;
  updateStatsForCurrentPlayer((stats) => {
    stats.maxZoneLines = Math.max(stats.maxZoneLines ?? 0, value);
  });
}

function recordCheeseLinesStat(cleared) {
  if (isTutorialMode()) return;
  if (cleared > 0) {
    updateStatsForCurrentPlayer((stats) => {
      stats.cheeseLinesCleared += cleared;
    });
  }
}

function recordPerfectClearStat() {
  if (isTutorialMode()) return;
  updateStatsForCurrentPlayer((stats) => {
    stats.perfectClears += 1;
  });
}

function recordShadowStageStat() {
  if (isTutorialMode()) return;
  updateStatsForCurrentPlayer((stats) => {
    stats.shadowStagesCleared += 1;
  });
}

function recordBomblissStageStat() {
  if (isTutorialMode()) return;
  updateStatsForCurrentPlayer((stats) => {
    stats.bomblissStagesCleared += 1;
  });
}

function recordCatchSquareStat() {
  if (isTutorialMode()) return;
  updateStatsForCurrentPlayer((stats) => {
    stats.catchSquares += 1;
  });
}

function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function getBestRecordsForCurrentPlayer() {
  const records = loadBestRecords();
  return records[getCurrentPlayerId()] ?? {};
}

function formatMyPageBestRecordEntry(modeKey, record) {
  if (!record) return null;
  const mode = String(modeKey);
  const [prefix, suffix] = mode.split(":");
  if (record.type === "time") {
    if (prefix === "sprint") {
      return `Sprint ${suffix}: ${formatTime(record.timeMs ?? 0)}`;
    }
    if (prefix === "cheese") {
      return `Cheese ${suffix}: ${formatTime(record.timeMs ?? 0)}`;
    }
    if (mode === "allClearSprint") {
      return `All Clear Sprint: ${formatTime(record.timeMs ?? 0)}`;
    }
    if (mode === "marathon") {
      return `Marathon: ${formatTime(record.timeMs ?? 0)}`;
    }
    if (mode.startsWith("easyMarathon")) {
      return `Easy Marathon (${suffix ?? "easy"}): ${formatTime(record.timeMs ?? 0)}`;
    }
    if (mode === "purify") {
      return `Purify: ${formatTime(record.timeMs ?? 0)}`;
    }
    return `${mode}: ${formatTime(record.timeMs ?? 0)}`;
  }
  if (record.type === "percent") {
    const stageName = record.stageName ? `${record.stageName}` : `Stage ${Number(record.stageIndex ?? 0) + 1}`;
    return `Shadow ${stageName}: ${Number(record.matchPercent ?? 0)}%`;
  }
  if (record.type === "stage") {
    return `Bombliss: Stage ${record.stageReached ?? record.stageIndex ?? 0}`;
  }
  if (mode === "ultra") return `Ultra: ${(Number(record.score ?? 0)).toLocaleString("ja-JP")}`;
  if (mode === "catch") return `Catch: ${(Number(record.score ?? 0)).toLocaleString("ja-JP")}`;
  if (mode === "hotline") return `Hotline: ${(Number(record.score ?? 0)).toLocaleString("ja-JP")}`;
  if (mode === "cascade") return `Cascade: ${(Number(record.score ?? 0)).toLocaleString("ja-JP")}`;
  if (mode === "zone") return `Zone: ${(Number(record.score ?? 0)).toLocaleString("ja-JP")}`;
  if (mode === "square") return `Square: ${(Number(record.score ?? 0)).toLocaleString("ja-JP")}`;
  if (mode === "bombliss") return `Bombliss: ${(Number(record.score ?? 0)).toLocaleString("ja-JP")}`;
  if (mode === "purify") return `Purify: ${(Number(record.score ?? 0)).toLocaleString("ja-JP")}`;
  return `${mode}: ${(Number(record.score ?? 0)).toLocaleString("ja-JP")}`;
}

function renderMyPageBestRecords(records) {
  if (!myPageBestRecordsEl) return;
  const entries = Object.entries(records);
  myPageBestRecordsEl.innerHTML = "";
  if (entries.length === 0) {
    const row = document.createElement("div");
    row.className = "mypage-item";
    row.textContent = "No records yet";
    myPageBestRecordsEl.appendChild(row);
    return;
  }

  entries
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([modeKey, record]) => {
      const row = document.createElement("div");
      row.className = "mypage-item";
      row.textContent = formatMyPageBestRecordEntry(modeKey, record) ?? `${modeKey}: -`;
      myPageBestRecordsEl.appendChild(row);
    });
}

function renderMyPageStats(stats) {
  if (!myPageStatsEl) return;
  const lines = [
    `Games: ${stats.gamesPlayed ?? 0}`,
    `Play Time: ${formatDuration(stats.totalPlayTimeMs ?? 0)}`,
    `Total Score: ${(Number(stats.totalScore ?? 0)).toLocaleString("ja-JP")}`,
    `Total Lines: ${stats.totalLines ?? 0}`,
    `Singles: ${stats.singles ?? 0}`,
    `Doubles: ${stats.doubles ?? 0}`,
    `Triples: ${stats.triples ?? 0}`,
    `Tetrises: ${stats.tetrises ?? 0}`,
    `T-Spin No Line: ${stats.tSpinNoLines ?? 0}`,
    `T-Spin Single: ${stats.tSpinSingles ?? 0}`,
    `T-Spin Double: ${stats.tSpinDoubles ?? 0}`,
    `T-Spin Triple: ${stats.tSpinTriples ?? 0}`,
    `B2B: ${stats.backToBacks ?? 0}`,
    `Max B2B: ${stats.maxBackToBackStreak ?? 0}`,
    `Perfect Clear: ${stats.perfectClears ?? 0}`,
    `Max REN: ${stats.maxRen ?? 0}`,
    `Zone Activations: ${stats.zoneActivations ?? 0}`,
    `Max Zone Lines: ${stats.maxZoneLines ?? 0}`,
    `Cheese Lines: ${stats.cheeseLinesCleared ?? 0}`,
    `Shadow Stages: ${stats.shadowStagesCleared ?? 0}`,
    `Bombliss Stages: ${stats.bomblissStagesCleared ?? 0}`,
    `Catch 4x4: ${stats.catchSquares ?? 0}`,
  ];
  myPageStatsEl.innerHTML = "";
  lines.forEach((text) => {
    const row = document.createElement("div");
    row.className = "mypage-item";
    row.textContent = text;
    myPageStatsEl.appendChild(row);
  });
}

function showMyPage(source = "title") {
  hideBombingReveal();
  hideTutorialPanel();
  hideTutorialMenus();
  myPageReturnTarget = source;
  shell.classList.add("menu-screen");
  overlay.classList.remove("hidden");
  overlayTitle.textContent = "My Page";
  modeMenu.classList.add("hidden");
  easyModeMenu.classList.add("hidden");
  globalOptionsButton.classList.add("hidden");
  optionMenu.classList.add("hidden");
  globalOptionsMenu.classList.add("hidden");
  if (keybindMenu) keybindMenu.classList.add("hidden");
  loginMenu.classList.add("hidden");
  actionMenu.classList.add("hidden");
  if (myPageMenu) {
    myPageMenu.classList.remove("hidden");
  }
  const player = currentPlayer ?? { id: "guest", name: "Guest", isGuest: true };
  if (myPagePlayerNameEl) myPagePlayerNameEl.textContent = player.name ?? "Guest";
  if (myPagePlayerIdEl) myPagePlayerIdEl.textContent = player.id ?? "guest";
  if (myPagePlayerTypeEl) myPagePlayerTypeEl.textContent = player.isGuest ? "Guest" : "Local Profile";
  renderMyPageBestRecords(getBestRecordsForCurrentPlayer());
  renderMyPageStats(getStatsForPlayer());
}

function getLevelGravityInterval(levelValue) {
  return Math.max(90, 760 - (levelValue - 1) * 58);
}

function calculateMarathonLevel(lineCount) {
  return Math.floor(Math.max(0, lineCount) / 10) + 1;
}

function calculateDropInterval(levelValue) {
  return getLevelGravityInterval(levelValue);
}

function getCustomFixedLevelNumber(value = customSettings.fixedLevel) {
  if (value === "master") return 15;
  if (value === "zeroGravity") return 1;
  return Math.max(1, Number(value) || 1);
}

function normalizeCustomSettings(value = {}) {
  const source = value && typeof value === "object" ? value : {};
  const fixedLevel = String(source.fixedLevel ?? DEFAULT_CUSTOM_SETTINGS.fixedLevel);
  const validFixedLevels = new Set([
    "zeroGravity",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "master",
  ]);
  return {
    levelMode: source.levelMode === "fixed" ? "fixed" : "marathon",
    fixedLevel: validFixedLevels.has(fixedLevel) ? fixedLevel : DEFAULT_CUSTOM_SETTINGS.fixedLevel,
    cascadeEnabled: Boolean(source.cascadeEnabled),
    zoneEnabled: Boolean(source.zoneEnabled),
  };
}

function syncCustomSettingsControls() {
  if (customLevelModeSelect) customLevelModeSelect.value = customSettings.levelMode;
  if (customFixedLevelSelect) customFixedLevelSelect.value = customSettings.fixedLevel;
  if (pauseCustomLevelModeSelect) pauseCustomLevelModeSelect.value = customSettings.levelMode;
  if (pauseCustomFixedLevelSelect) pauseCustomFixedLevelSelect.value = customSettings.fixedLevel;
  if (customCascadeToggleButton) customCascadeToggleButton.textContent = `カスケード: ${customSettings.cascadeEnabled ? "ON" : "OFF"}`;
  if (customZoneToggleButton) customZoneToggleButton.textContent = `ZONE: ${customSettings.zoneEnabled ? "ON" : "OFF"}`;
  if (pauseCustomCascadeToggleButton) pauseCustomCascadeToggleButton.textContent = `カスケード: ${customSettings.cascadeEnabled ? "ON" : "OFF"}`;
  if (pauseCustomZoneToggleButton) pauseCustomZoneToggleButton.textContent = `ZONE: ${customSettings.zoneEnabled ? "ON" : "OFF"}`;
  if (customFixedLevelRow) customFixedLevelRow.classList.toggle("hidden", !isCustomMode() || customSettings.levelMode !== "fixed");
  if (pauseCustomFixedLevelRow) pauseCustomFixedLevelRow.classList.toggle("hidden", customSettings.levelMode !== "fixed");
}

function applyCustomLevelSettings() {
  if (!isCustomMode()) return;
  if (customSettings.levelMode === "marathon") {
    level = calculateMarathonLevel(lines);
  } else {
    level = getCustomFixedLevelNumber();
  }
  applyGravityInterval();
  dropCounter = 0;
  updateStats();
}

function disableCustomZone() {
  if (zoneActive) {
    finishZone();
  }
  zoneGauge = 0;
  zoneActive = false;
  zoneTimer = 0;
  zoneConsumedGauge = 0;
  zoneLines = 0;
  zoneMaxLines = 0;
  zoneScoreBuffer = 0;
  zoneExtensionNoticeText = "";
  zoneExtensionNoticeUntil = 0;
  if (lastEventEl.textContent.startsWith("Zone") || lastEventEl.textContent.startsWith("ZONE")) {
    lastEventEl.textContent = "-";
  }
  updateStats();
}

function applyCustomSettingsChange(settingName, value) {
  if (!isCustomMode()) return;
  const before = { ...customSettings };
  if (settingName === "levelMode") customSettings.levelMode = value === "fixed" ? "fixed" : "marathon";
  if (settingName === "fixedLevel") customSettings.fixedLevel = normalizeCustomSettings({ ...customSettings, fixedLevel: value }).fixedLevel;
  if (settingName === "cascadeEnabled") customSettings.cascadeEnabled = Boolean(value);
  if (settingName === "zoneEnabled") customSettings.zoneEnabled = Boolean(value);

  customSettings = normalizeCustomSettings(customSettings);
  if (settingName === "levelMode" || settingName === "fixedLevel") {
    applyCustomLevelSettings();
  }
  if (settingName === "zoneEnabled") {
    if (customSettings.zoneEnabled) {
      zoneGauge = 0;
      zoneActive = false;
      zoneTimer = 0;
      zoneLines = 0;
      zoneScoreBuffer = 0;
      lastEventEl.textContent = "Zone 0%";
    } else {
      disableCustomZone();
    }
  }
  syncCustomSettingsControls();
  saveSettings();
  recordCustomAction("customSettingChange", {
    setting: settingName,
    before: before[settingName],
    after: customSettings[settingName],
  });
  draw();
}

function isMarathonMode() {
  return (
    selectedGameMode === "マラソン" ||
    selectedGameMode === "やさしいマラソン" ||
    selectedGameMode === "ゾーン" ||
    selectedGameMode === "スクエア"
  );
}

function isSprintMode() {
  return selectedGameMode === "スプリント" || selectedGameMode === "オールクリアスプリント";
}

function isAllClearSprintMode() {
  return selectedGameMode === "オールクリアスプリント";
}

function isUltraMode() {
  return selectedGameMode === "ウルトラ";
}

function isBomblissMode() {
  return selectedGameMode === "ボンブリス" || tutorialState?.specialMode === "bombliss";
}

function isCascadeMode() {
  return selectedGameMode === "カスケード" || tutorialState?.specialMode === "cascade";
}

function isHotlineMode() {
  return selectedGameMode === "ホットライン";
}

function isZoneMode() {
  return selectedGameMode === "ゾーン" || tutorialState?.specialMode === "zone";
}

function isCustomMode() {
  return selectedGameMode === "カスタム";
}

function isTutorialMode() {
  return selectedGameMode === "チュートリアル";
}

function isCascadeEnabledForCurrentGame() {
  return isCascadeMode() || (isCustomMode() && customSettings.cascadeEnabled);
}

function isZoneEnabledForCurrentGame() {
  return isZoneMode() || (isCustomMode() && customSettings.zoneEnabled);
}

function isSquareMode() {
  return selectedGameMode === "スクエア" || tutorialState?.specialMode === "square";
}

function isZeroGravityMode() {
  return selectedGameMode === "無重力";
}

function isPracticeMode() {
  return selectedGameMode === "Practice" || selectedGameMode === "Free Practice";
}

function isPracticeGravityOff() {
  return isPracticeMode() && practiceGravityEnabled === false;
}

function hasNaturalGravity() {
  if (isTutorialMode()) return tutorialChapter === 5;
  if (isCustomMode() && customSettings.levelMode === "fixed" && customSettings.fixedLevel === "zeroGravity") return false;
  return !isZeroGravityMode() && !isPracticeGravityOff();
}

function shouldUseInstantGravity() {
  if (!hasNaturalGravity()) return false;
  return isMasterMode() || isTenGMode();
}

function getEffectiveModeName() {
  if (selectedGameMode === "Cheese Race" && cheeseRacePurifyEnabled) {
    return "浄化";
  }
  return selectedGameMode;
}

function isCheeseRaceMode() {
  return selectedGameMode === "Cheese Race" && !cheeseRacePurifyEnabled;
}

function isPurifyMode() {
  return selectedGameMode === "浄化" || (selectedGameMode === "Cheese Race" && cheeseRacePurifyEnabled);
}

function isShadowMode() {
  return selectedGameMode === "Shadow";
}

function canUseZone() {
  return isZoneEnabledForCurrentGame();
}

function isMasterMode() {
  if (isCustomMode()) {
    return customSettings.levelMode === "fixed" && customSettings.fixedLevel === "master";
  }
  return isMarathonMode() && fixedLevelEnabled && fixedLevelValue === "master";
}

function isTenGMode() {
  if (!hasNaturalGravity()) return false;
  if (fixedLevelEnabled && fixedLevelValue !== "master") return false;
  return isEasyTetrisMode() && level >= 10;
}

function isCatchMode() {
  return selectedGameMode === "Catch";
}

function getCatchFallInterval(levelValue) {
  return Math.max(120, 700 - (levelValue - 1) * 55);
}

function applyGravityInterval() {
  if (isTutorialMode()) {
    dropInterval = tutorialChapter === 5 ? getLevelGravityInterval(1) : Number.POSITIVE_INFINITY;
    return;
  }
  if (isCatchMode()) {
    dropInterval = getCatchFallInterval(level);
    return;
  }
  if (isCustomMode() && customSettings.levelMode === "fixed" && customSettings.fixedLevel === "zeroGravity") {
    dropInterval = Number.POSITIVE_INFINITY;
    return;
  }
  if (!hasNaturalGravity()) {
    dropInterval = Number.POSITIVE_INFINITY;
    return;
  }
  dropInterval = shouldUseInstantGravity() ? 16 : getLevelGravityInterval(level);
}

function configureBoardForMode() {
  cols = isEasyTetrisMode() ? EASY_COLS : DEFAULT_COLS;
  rows = isEasyTetrisMode() ? EASY_ROWS : DEFAULT_ROWS;
  boardCanvas.width = cols * CELL;
  boardCanvas.height = rows * CELL;
}

function formatTime(milliseconds) {
  const totalMs = Math.max(0, Math.floor(milliseconds));
  const minutes = Math.floor(totalMs / 60000);
  const seconds = Math.floor((totalMs % 60000) / 1000);
  const ms = totalMs % 1000;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(ms).padStart(3, "0")}`;
}

function getCurrentTutorialSection() {
  return TUTORIAL_CHAPTER_SECTIONS[tutorialChapter]?.[tutorialSectionIndex] ?? null;
}

function getTutorialActionKeys(action) {
  return formatKeyCodes(keyBindings[action] ?? []);
}

function getTutorialSectionContent(sectionId) {
  const moveKeys = `${getTutorialActionKeys("moveLeft")} / ${getTutorialActionKeys("moveRight")}`;
  const content = {
    screenExplanation: {
      title: "ゲーム画面",
      instruction:
        "中央の大きな枠がゲーム盤です。\n上から落ちてくる形が現在ミノです。\nNEXTには次に来るミノ、HOLDには一時的に保管したミノが表示されます。\nScoreは得点、Linesは消したライン数、Levelは落下速度です。",
      button: true,
    },
    moveHorizontal: {
      title: "左右移動",
      instruction: `左または右のキー（${moveKeys}）を押して、\nミノを横に動かしてみよう。`,
      button: false,
      success: "できました！\nミノは左右に動かせます。",
    },
    rotateRight: {
      title: "右回転",
      instruction: `右回転キー（${getTutorialActionKeys("rotateRight")}）を押して、\nミノを右向きに回してみよう。`,
      button: false,
      success: "できました！\n右回転では時計回りに回ります。",
    },
    rotateLeft: {
      title: "左回転",
      instruction: `左回転キー（${getTutorialActionKeys("rotateLeft")}）を押して、\nミノを左向きに回してみよう。`,
      button: false,
      success: "できました！\n左回転では反時計回りに回ります。",
    },
    softDrop: {
      title: "ソフトドロップ",
      instruction: `ソフトドロップキー（${getTutorialActionKeys("softDrop")}）を押して、\nミノをゆっくり下へ動かしてみよう。`,
      button: false,
      success: "できました！\nソフトドロップでは位置を調整しながら下ろせます。",
    },
    hardDrop: {
      title: "ハードドロップ",
      instruction: `ハードドロップキー（${getTutorialActionKeys("hardDrop")}）を押して、\nミノを一気に下まで落としてみよう。`,
      button: false,
      success: "できました！\nハードドロップではミノを一気に固定できます。",
    },
  };
  if (content[sectionId]) return content[sectionId];
  const config = TUTORIAL_SECTIONS[sectionId];
  if (!config) return content.screenExplanation;
  if (sectionId === "rotationInsert") {
    const type = tutorialState?.rotationInsertTypes?.[tutorialState?.subStep ?? 0] ?? ROTATION_INSERT_TYPES[0];
    return {
      title: config.title,
      instruction: `${config.instruction}\n\n${type}ミノを回転させて\n隙間へ入れてみよう。`,
      button: false,
      success: "できました！",
    };
  }
  if (sectionId === "backToBack" && tutorialState?.subStep === 1) {
    return {
      title: config.title,
      instruction: "次もTetrisを決めよう。\n\n必要ならHOLDを使ってください。",
      button: false,
      success: "できました！",
    };
  }
  if (sectionId === "zone" && tutorialState?.subStep === 1) {
    return {
      title: config.title,
      instruction: "ZONE中はラインがすぐには消えず、\n下側へためられます。\n\nラインを1回消してみよう。",
      button: false,
      success: "できました！",
    };
  }
  return {
    title: config.title,
    instruction: config.instruction,
    button: false,
    success: "できました！",
  };
}

function isTutorialActionAllowed(action) {
  if (!isTutorialMode()) return true;
  if (action === "pause") return true;
  if (tutorialChapter === 5) {
    if (tutorialState?.completed || tutorialState?.waitingForNext || tutorialState?.waitingForAdvance) return false;
    return ["moveLeft", "moveRight", "rotateLeft", "rotateRight", "softDrop", "hardDrop", "hold", "pause"].includes(action);
  }
  if (tutorialState?.completed || tutorialState?.waitingForNext || tutorialState?.waitingForAdvance) return false;
  const section = getCurrentTutorialSection();
  const config = TUTORIAL_SECTIONS[section];
  if (config?.allowedActions) return config.allowedActions.includes(action);
  switch (section) {
    case "moveHorizontal":
      return action === "moveLeft" || action === "moveRight";
    case "rotateRight":
      return action === "rotateRight";
    case "rotateLeft":
      return action === "rotateLeft";
    case "softDrop":
      return action === "softDrop";
    case "hardDrop":
      return action === "hardDrop";
    default:
      return false;
  }
}

function updateTutorialPanel() {
  if (!tutorialPanel || !isTutorialMode() || !tutorialChapter) return;
  const section = getCurrentTutorialSection();
  const content = getTutorialSectionContent(section);
  const total = TUTORIAL_CHAPTER_SECTIONS[tutorialChapter]?.length ?? 0;
  tutorialPanel.classList.remove("hidden");
  tutorialStepLabelEl.textContent = `Chapter ${tutorialChapter} - ${tutorialSectionIndex + 1}/${total}`;
  tutorialTitleEl.textContent = content.title;
  tutorialInstructionEl.textContent = content.instruction;
  tutorialSuccessMessageEl.textContent = tutorialState?.message ?? content.success ?? "できました！";
  tutorialSuccessMessageEl.classList.toggle("hidden", !tutorialState?.showSuccess);
  tutorialNextButton.classList.toggle("hidden", !content.button || Boolean(tutorialState?.completed));
}

function hideTutorialPanel() {
  window.clearTimeout(tutorialAdvanceTimer);
  tutorialAdvanceTimer = null;
  tutorialPanel?.classList.add("hidden");
  tutorialMissionPanel?.classList.add("hidden");
}

function scheduleTutorialAdvance(callback, delay = TUTORIAL_SUCCESS_DELAY_MS) {
  window.clearTimeout(tutorialAdvanceTimer);
  tutorialAdvanceTimer = window.setTimeout(() => {
    tutorialAdvanceTimer = null;
    if (paused) {
      if (tutorialState) {
        tutorialState.pendingAdvanceCallback = callback;
      }
      return;
    }
    callback();
  }, delay);
}

function resumePendingTutorialAdvance() {
  const callback = tutorialState?.pendingAdvanceCallback;
  if (!callback) return;
  tutorialState.pendingAdvanceCallback = null;
  scheduleTutorialAdvance(callback, 120);
}

function logTutorialSectionStart(sectionId) {
  if (!isTutorialMode()) return;
  console.debug("Tutorial section start", {
    chapter: tutorialChapter,
    section: sectionId,
    board,
    active,
    tutorialState,
  });
}

function logTutorialDecision(result, decision) {
  console.debug("Tutorial result", {
    chapter: tutorialChapter,
    section: getCurrentTutorialSection(),
    subStep: tutorialState?.subStep,
    result,
    decision,
  });
}

function getChapter5MissionTitle(mission) {
  const titles = {
    single: "Single",
    double: "Double",
    triple: "Triple",
    tetris: "Tetris",
    hold: "Hold",
    backToBack: "Back-to-Back",
    combo: "Combo",
    tSpin: "T-Spin",
    tSpinDouble: "T-Spin Double",
    rotationInsert: "回転入れ",
    perfectClear: "Perfect Clear",
  };
  return titles[mission] ?? mission;
}

function getChapter5MissionDescription(mission) {
  if (mission === "single") return "1ラインだけ消そう";
  if (mission === "double") return "2ラインを同時に消そう";
  if (mission === "triple") return "3ラインを同時に消そう";
  if (mission === "tetris") return "4ラインを同時に消そう";
  if (mission === "hold") return "HOLDを使ってから\nミノを1個置こう";
  if (mission === "backToBack") return "TetrisまたはT-Spinを\n2回続けて決めよう";
  if (mission === "combo") return "3回続けてラインを消そう";
  if (mission === "tSpin") return "Tミノを回転で入れて\nT-Spinを決めよう";
  if (mission === "tSpinDouble") return "T-Spinで2ライン同時に消そう";
  if (mission === "rotationInsert") {
    const target = tutorialState?.rotationInsertTarget ?? ROTATION_INSERT_TARGETS[0];
    return `${target}ミノを回転させて\n隙間へ入れよう`;
  }
  if (mission === "perfectClear") return "ライン消去後に\n盤面を空にしよう";
  return "";
}

function formatChapter5Time(milliseconds) {
  const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function getCurrentChapter5Mission() {
  return tutorialState?.chapter5Missions?.[tutorialState.chapter5MissionIndex] ?? null;
}

function chooseChapter5Missions() {
  if (Array.isArray(DEBUG_CHAPTER_5_MISSIONS) && DEBUG_CHAPTER_5_MISSIONS.length > 0) {
    return [...new Set(DEBUG_CHAPTER_5_MISSIONS)].slice(0, CHAPTER_5_MISSION_COUNT);
  }
  const missions = shuffle(CHAPTER_5_MISSION_POOL).slice(0, CHAPTER_5_MISSION_COUNT);
  if (missions.includes("backToBack") && !missions.includes("tetris") && !missions.includes("tSpinDouble")) {
    const dependency = rng() < 0.5 ? "tetris" : "tSpinDouble";
    const replaceIndex = missions.findIndex((mission) => mission !== "backToBack");
    missions[replaceIndex] = dependency;
  }
  return missions;
}

function resetChapter5MissionTemporaryState() {
  if (!tutorialState) return;
  const mission = getCurrentChapter5Mission();
  tutorialState.currentMissionStartedAt = gameTimeMs;
  tutorialState.usedHoldForCurrentMission = false;
  tutorialState.currentMissionProgress = 0;
  tutorialState.lastRotationContext = null;
  tutorialState.rotationInsertTarget = mission === "rotationInsert"
    ? ROTATION_INSERT_TARGETS[Math.floor(rng() * ROTATION_INSERT_TARGETS.length)]
    : null;
}

function showChapter5Mission(message = "", missionOverride = null) {
  if (!tutorialMissionPanel || !tutorialState || tutorialChapter !== 5) return;
  const mission = missionOverride ?? getCurrentChapter5Mission();
  const total = tutorialState.chapter5Missions.length;
  const remaining = tutorialState.chapter5Missions
    .slice(tutorialState.chapter5MissionIndex + 1)
    .map(getChapter5MissionTitle)
    .join("\n");
  tutorialMissionPanel.classList.remove("hidden");
  tutorialPanel?.classList.add("hidden");
  tutorialMissionProgressEl.textContent = message || `Mission ${tutorialState.chapter5MissionIndex + 1} / ${total}   Time ${formatChapter5Time(tutorialState.chapter5TimeRemainingMs)}`;
  tutorialMissionTitleEl.textContent = getChapter5MissionTitle(mission);
  tutorialMissionDescriptionEl.textContent = `${getChapter5MissionDescription(mission)}${remaining ? `\n\n残り:\n${remaining}` : ""}`;
}

function updateChapter5MissionPanel() {
  if (isTutorialMode() && tutorialChapter === 5 && tutorialState && !gameOver) {
    showChapter5Mission(
      tutorialState.waitingForNext ? tutorialState.message : "",
      tutorialState.waitingForNext ? tutorialState.clearedMissionDisplay : null,
    );
  }
}

function isChapter5RotationInsertSuccess(result) {
  if (result.piece !== tutorialState.rotationInsertTarget) return false;
  if (result.lastAction !== "rotate" || result.clearedLines < 1) return false;
  const context = tutorialState.lastRotationContext;
  // Chapter 5は空盤面からの実践なので、回転入れはSRSキック使用+ライン消去を簡易条件にする。
  // 平地での単なる回転ライン消去を避けるため、キックなし回転は成功にしない。
  return Boolean(context?.usedKick && context.type === result.piece);
}

function isChapter5MissionSuccess(mission, result) {
  if (mission === "single") return result.clearedLines === 1 && !result.isTSpin;
  if (mission === "double") return result.clearedLines === 2 && !result.isTSpin;
  if (mission === "triple") return result.clearedLines === 3 && !result.isTSpin;
  if (mission === "tetris") return result.clearedLines === 4;
  if (mission === "hold") return tutorialState.usedHoldForCurrentMission && result.lockedAfterHold;
  if (mission === "backToBack") return Boolean(result.isBackToBack);
  if (mission === "combo") return result.comboCount >= 3;
  if (mission === "tSpin") return result.piece === "T" && result.isTSpin;
  if (mission === "tSpinDouble") return result.piece === "T" && result.isTSpin && result.clearedLines === 2;
  if (mission === "rotationInsert") return isChapter5RotationInsertSuccess(result);
  if (mission === "perfectClear") return result.clearedLines > 0 && result.isPerfectClear;
  return false;
}

function evaluateChapter5LockResult(result) {
  if (!isTutorialMode() || tutorialChapter !== 5 || !tutorialState || tutorialState.completed) return false;
  tutorialState.chapter5PieceCount += 1;
  const mission = getCurrentChapter5Mission();
  if (mission && isChapter5MissionSuccess(mission, result)) {
    completeChapter5Mission();
    return tutorialState.chapter5MissionIndex >= tutorialState.chapter5Missions.length;
  }
  return false;
}

function completeChapter5Mission() {
  const mission = getCurrentChapter5Mission();
  if (!mission || !tutorialState) return;
  tutorialState.chapter5CompletedMissions.push({
    mission,
    title: getChapter5MissionTitle(mission),
  });
  tutorialState.chapter5MissionIndex += 1;
  tutorialState.showSuccess = true;
  tutorialState.message = "Mission Clear!";
  tutorialState.waitingForNext = true;
  tutorialState.clearedMissionDisplay = mission;
  resetAllInputState();
  if (tutorialState.chapter5MissionIndex >= tutorialState.chapter5Missions.length) {
    running = false;
    active = null;
  }
  showChapter5Mission("Mission Clear!", mission);
  window.clearTimeout(tutorialAdvanceTimer);
  tutorialAdvanceTimer = window.setTimeout(() => {
    if (!isTutorialMode() || tutorialChapter !== 5 || !tutorialState) return;
    if (tutorialState.chapter5MissionIndex >= tutorialState.chapter5Missions.length) {
      completeTutorialChapter5();
      return;
    }
    tutorialState.waitingForNext = false;
    tutorialState.clearedMissionDisplay = null;
    resetChapter5MissionTemporaryState();
    showChapter5Mission();
  }, TUTORIAL_SUCCESS_DELAY_MS);
}

function getChapter5ResultSummary() {
  const completedTitles = (tutorialState?.chapter5CompletedMissions ?? []).map(({ title }) => title).join("\n");
  const elapsed = CHAPTER_5_TIME_LIMIT_MS - (tutorialState?.chapter5TimeRemainingMs ?? CHAPTER_5_TIME_LIMIT_MS);
  return [
    `Clear Time ${formatTime(elapsed)}`,
    "",
    completedTitles,
    "",
    `Score ${score.toLocaleString("ja-JP")}`,
    `Lines ${lines}`,
    `Pieces ${tutorialState?.chapter5PieceCount ?? 0}`,
  ].join("\n");
}

function completeTutorialChapter5() {
  if (!tutorialState) return;
  tutorialState.completed = true;
  running = false;
  gameOver = true;
  active = null;
  resetAllInputState();
  tutorialProgress = { ...tutorialProgress, chapter5Completed: true };
  hideTutorialPanel();
  stopBgm();
  const summary = getChapter5ResultSummary();
  tutorialState = null;
  updateStats();
  showActionOverlay("Chapter 5 Complete", "もう一度", true, `実戦ミッションをすべて達成しました。\n\n${summary}`);
}

function failTutorialChapter5() {
  running = false;
  gameOver = true;
  active = null;
  resetAllInputState();
  hideTutorialPanel();
  stopBgm();
  updateStats();
  showActionOverlay("Challenge Failed", "もう一度", true, "もう一度挑戦しよう");
}

function getMatrixCells(matrix) {
  const cells = [];
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) cells.push([x, y]);
    });
  });
  return cells;
}

function spawnTutorialPiece(type, options = {}) {
  active = createPiece(type);
  if (!active) return;
  active.x = options.x ?? Math.floor((cols - active.matrix[0].length) / 2);
  active.y = options.y ?? 1;
  active.rotationState = options.rotationState ?? "0";
  if (options.rotationState && options.rotationState !== "0") {
    const turns = ROTATION_STATES.indexOf(options.rotationState);
    for (let i = 0; i < turns; i += 1) {
      active.matrix = rotate(active.matrix, 1);
    }
  }
  if (options.bombCells) {
    const occupied = new Set(getMatrixCells(active.matrix).map(([x, y]) => `${x},${y}`));
    active.bombCells = new Set(options.bombCells.filter((cell) => occupied.has(cell)));
  }
  if (isCascadeEnabledForCurrentGame() || isSquareMode()) {
    active.pieceId = nextPieceId;
    nextPieceId += 1;
  }
  active.lastAction = null;
  canHold = true;
  if (collides(active, active.x, active.y, active.matrix)) {
    failTutorialSection("チュートリアルミノの初期位置が衝突しています");
  }
}

function spawnTutorialBomblissPiece(type, bombCells) {
  spawnTutorialPiece(type, { x: type === "O" ? 4 : undefined, y: 1, bombCells });
}

function createTutorialBoard(pattern, options = {}) {
  const nextBoard = createBoard();
  const cellFactory = options.cellFactory ?? (() => createGarbageCell());
  pattern.forEach((row, y) => {
    [...row].forEach((value, x) => {
      if (value === "X" || value === "1") {
        nextBoard[y][x] = cellFactory(x, y);
      }
    });
  });
  return nextBoard;
}

function createTutorialCellForSection(sectionId) {
  const config = TUTORIAL_SECTIONS[sectionId];
  if (config?.specialMode === "bombliss") return createBomblissCell("Z");
  if (config?.specialMode === "square") {
    const pieceId = nextPieceId;
    nextPieceId += 1;
    return createSquareCell("G", pieceId);
  }
  if (config?.specialMode === "cascade") {
    const pieceId = nextPieceId;
    nextPieceId += 1;
    return createCascadeCell("G", pieceId);
  }
  return createGarbageCell();
}

function getRotationInsertBoard(type) {
  const setups = {
    I: [
      "..........", "..........", "..........", "..........", "..........",
      "..........", "..........", "..........", "..........", "..........",
      "..........", "..........", "..........", "..........", "..........",
      "..........", "...X..X...", "...X..X...", "XXX....XXX", "XXX....XXX",
    ],
    J: [
      "..........", "..........", "..........", "..........", "..........",
      "..........", "..........", "..........", "..........", "..........",
      "..........", "..........", "..........", "..........", "..........",
      "..........", "..........", ".....X....", "XXX...XXXX", "XXXX..XXXX",
    ],
    L: [
      "..........", "..........", "..........", "..........", "..........",
      "..........", "..........", "..........", "..........", "..........",
      "..........", "..........", "..........", "..........", "..........",
      "..........", "..........", "....X.....", "XXXX...XXX", "XXXX..XXXX",
    ],
    S: [
      "..........", "..........", "..........", "..........", "..........",
      "..........", "..........", "..........", "..........", "..........",
      "..........", "..........", "..........", "..........", "..........",
      "..........", "..........", "....XX....", "XXX...XXXX", "XXXX..XXXX",
    ],
    Z: [
      "..........", "..........", "..........", "..........", "..........",
      "..........", "..........", "..........", "..........", "..........",
      "..........", "..........", "..........", "..........", "..........",
      "..........", "..........", "....XX....", "XXXX...XXX", "XXXX..XXXX",
    ],
  };
  return setups[type] ?? setups.I;
}

function resetTutorialRuntimeState(options = {}) {
  const preservedBackToBack = options.preserveBackToBack ? backToBackStreak : 0;
  const preservedRen = options.preserveRen ? renStreak : 0;
  if (zoneActive) {
    finishZone();
  }
  board = createBoard();
  active = null;
  holdType = null;
  nextQueue = [];
  score = 0;
  lines = 0;
  level = 1;
  renStreak = preservedRen;
  backToBackStreak = preservedBackToBack;
  perfectClearCount = 0;
  bomblissStageIndex = 0;
  bomblissPoints = 100;
  gameTimeMs = 0;
  softDropDistance = 0;
  dropCounter = 0;
  lockCounter = 0;
  lockResetCount = 0;
  canHold = false;
  zoneGauge = 0;
  zoneActive = false;
  zoneTimer = 0;
  zoneConsumedGauge = 0;
  zoneLines = 0;
  zoneMaxLines = 0;
  zoneScoreBuffer = 0;
  zoneExtensionNoticeText = "";
  zoneExtensionNoticeUntil = 0;
  cascadeResolutionActive = false;
  cascadeResolutionPhase = "idle";
  cascadeResolutionClears = [];
  cascadeResolutionUsedZone = false;
  cascadeClearDelay = 0;
  cascadeGravityTimer = 0;
  nextLargeBombId = 1;
  nextPieceId = 1;
  nextSquareId = 1;
  squareGroups = new Map();
  tsdAssistCandidate = null;
  tsdAssistDirty = true;
  hideBombingReveal();
  clearInputBuffer();
  resetAllInputState();
}

function setupTutorialSectionBoard(sectionId) {
  const config = TUTORIAL_SECTIONS[sectionId];
  if (!config) return;
  if (sectionId === "square") {
    board = createBoard();
    const pieces = [
      { id: nextPieceId++, type: "J", cells: [[0, 16], [1, 16], [0, 17], [1, 17]] },
      { id: nextPieceId++, type: "L", cells: [[0, 18], [1, 18], [0, 19], [1, 19]] },
      { id: nextPieceId++, type: "S", cells: [[2, 18], [3, 18], [2, 19], [3, 19]] },
    ];
    pieces.forEach((piece) => {
      piece.cells.forEach(([x, y]) => {
        board[y][x] = createSquareCell(piece.type, piece.id);
      });
    });
    return;
  }
  let pattern = config.boardPattern;
  if (sectionId === "rotationInsert") {
    const type = tutorialState.rotationInsertTypes[tutorialState.subStep];
    pattern = getRotationInsertBoard(type);
  }
  if (pattern) {
    board = createTutorialBoard(pattern, {
      cellFactory: () => createTutorialCellForSection(sectionId),
    });
  }
  if (sectionId === "zone") {
    zoneGauge = ZONE_ACTIVATE_COST;
    lastEventEl.textContent = `Zone ${zoneGauge}%`;
  }
  if (config.nextQueue) {
    nextQueue = [...config.nextQueue];
  }
  holdType = null;
  canHold = Boolean(config.holdEnabled);
}

function setupTutorialActivePiece(sectionId) {
  const config = TUTORIAL_SECTIONS[sectionId];
  if (!config) return;
  let pieceType = config.pieceType;
  if (sectionId === "rotationInsert") {
    pieceType = tutorialState.rotationInsertTypes[tutorialState.subStep];
  }
  const options = { y: 1 };
  if (pieceType === "I") options.x = 3;
  if (pieceType === "O") options.x = 4;
  if (config.bombCells) options.bombCells = config.bombCells;
  if (config.specialMode === "bombliss") {
    spawnTutorialBomblissPiece(pieceType, config.bombCells ?? []);
    return;
  }
  spawnTutorialPiece(pieceType, options);
}

function startTutorialSection(sectionId) {
  window.clearTimeout(tutorialAdvanceTimer);
  tutorialAdvanceTimer = null;
  resetTutorialRuntimeState();
  const config = TUTORIAL_SECTIONS[sectionId];
  tutorialState = {
    sectionId,
    startX: null,
    startY: null,
    startRotationState: "0",
    specialMode: config?.specialMode ?? null,
    subStep: 0,
    completedLocks: 0,
    usedHold: false,
    usedHoldDuringBackToBack: false,
    rotatedSinceSpawn: false,
    lastSuccessfulAction: null,
    rotationInsertTypes: [...ROTATION_INSERT_TYPES],
    completed: false,
    showSuccess: false,
    message: "",
    waitingForAdvance: false,
    waitingForNext: false,
    pendingAdvanceCallback: null,
  };

  if (config) {
    setupTutorialSectionBoard(sectionId);
    setupTutorialActivePiece(sectionId);
  } else if (sectionId === "screenExplanation") {
    spawnTutorialPiece("T", { y: 2 });
  } else if (sectionId === "moveHorizontal") {
    spawnTutorialPiece("O", { y: 2 });
  } else if (sectionId === "rotateRight" || sectionId === "rotateLeft") {
    spawnTutorialPiece("L", { y: 8, rotationState: "0" });
  } else if (sectionId === "softDrop") {
    spawnTutorialPiece("O", { y: 1 });
  } else if (sectionId === "hardDrop") {
    spawnTutorialPiece("I", { y: 1 });
  }

  tutorialState.startX = active?.x ?? null;
  tutorialState.startY = active?.y ?? null;
  tutorialState.startRotationState = active?.rotationState ?? "0";
  if (sectionId !== "zone") {
    lastEventEl.textContent = "-";
  }
  lastTime = performance.now();
  updateStats();
  drawNextPreviews();
  drawPreview(holdCtx, holdType);
  updateTutorialPanel();
  draw();
  logTutorialSectionStart(sectionId);
}

function completeTutorialSection(message = "", options = {}) {
  if (!isTutorialMode() || tutorialState?.completed) return;
  tutorialState.completed = true;
  tutorialState.waitingForAdvance = true;
  tutorialState.message = message || getTutorialSectionContent(getCurrentTutorialSection()).success || "できました！";
  if (options.clearActive) {
    active = null;
  }
  resetAllInputState();
  requestAnimationFrame(() => {
    if (!isTutorialMode() || !tutorialState?.completed) return;
    tutorialState.showSuccess = true;
    updateTutorialPanel();
    scheduleTutorialAdvance(() => {
      advanceTutorialSection();
    });
  });
}

function advanceTutorialSection() {
  if (!isTutorialMode()) return;
  window.clearTimeout(tutorialAdvanceTimer);
  tutorialAdvanceTimer = null;
  tutorialSectionIndex += 1;
  if (tutorialSectionIndex >= (TUTORIAL_CHAPTER_SECTIONS[tutorialChapter]?.length ?? 0)) {
    completeTutorialChapter();
    return;
  }
  startTutorialSection(getCurrentTutorialSection());
}

function failTutorialSection(reason = "条件を満たしていません", result = null) {
  if (!isTutorialMode()) return;
  console.warn("Tutorial failed", {
    section: getCurrentTutorialSection(),
    reason,
    result,
  });
  tutorialState = {
    ...(tutorialState ?? {}),
    waitingForNext: true,
    waitingForAdvance: true,
  };
  resetAllInputState();
  if (tutorialSuccessMessageEl) {
    tutorialSuccessMessageEl.textContent = "もう一度やってみよう";
    tutorialSuccessMessageEl.classList.remove("hidden");
  }
  scheduleTutorialAdvance(() => {
    startTutorialSection(getCurrentTutorialSection());
  });
}

function handleTutorialMove(deltaX) {
  if (getCurrentTutorialSection() !== "moveHorizontal" || !tutorialState || tutorialState.completed) return;
  if (Math.abs((active?.x ?? tutorialState.startX) - tutorialState.startX) >= 1) {
    completeTutorialSection();
  }
}

function handleTutorialRotate(direction, fromState, toState) {
  const section = getCurrentTutorialSection();
  if (!tutorialState || tutorialState.completed || fromState === toState) return;
  if (section === "rotateRight" && direction > 0 && toState === nextRotationState(fromState, 1)) {
    completeTutorialSection();
  }
  if (section === "rotateLeft" && direction < 0 && toState === nextRotationState(fromState, -1)) {
    completeTutorialSection();
  }
}

function handleTutorialSoftDrop() {
  if (getCurrentTutorialSection() !== "softDrop" || !tutorialState || tutorialState.completed) return;
  if (softDropDistance >= 3) {
    completeTutorialSection();
  }
}

function lockTutorialPiece() {
  if (getCurrentTutorialSection() !== "hardDrop" || !tutorialState || tutorialState.completed) {
    failTutorialSection("hardDrop以外で固定されました");
    return;
  }
  mergePiece();
  active = null;
  completeTutorialSection("", { clearActive: true });
  updateStats();
  draw();
}

function getTutorialLineEventType(cleared, tSpin, perfectClear) {
  if (tSpin && cleared === 1) return "tSpinSingle";
  if (tSpin && cleared === 2) return "tSpinDouble";
  if (tSpin && cleared === 3) return "tSpinTriple";
  if (tSpin) return "tSpin";
  if (cleared === 1) return "single";
  if (cleared === 2) return "double";
  if (cleared === 3) return "triple";
  if (cleared === 4) return "tetris";
  if (perfectClear) return "perfectClear";
  return "none";
}

function resetTutorialSectionForSubStep(options = {}) {
  const sectionId = getCurrentTutorialSection();
  const previous = tutorialState;
  resetTutorialRuntimeState({
    preserveBackToBack: options.preserveBackToBack,
    preserveRen: options.preserveRen,
  });
  tutorialState = {
    ...previous,
    completed: false,
    showSuccess: false,
    message: "",
    waitingForNext: false,
    waitingForAdvance: false,
    pendingAdvanceCallback: null,
    rotatedSinceSpawn: false,
    lastSuccessfulAction: null,
  };
  setupTutorialSectionBoard(sectionId);
  setupTutorialActivePiece(sectionId);
  updateStats();
  drawNextPreviews();
  drawPreview(holdCtx, holdType);
  updateTutorialPanel();
  draw();
  logTutorialSectionStart(sectionId);
}

function advanceTutorialSubStep(message = "できました！", options = {}) {
  if (!tutorialState) return;
  tutorialState.waitingForAdvance = true;
  tutorialState.message = message;
  active = null;
  resetAllInputState();
  requestAnimationFrame(() => {
    if (!isTutorialMode() || !tutorialState) return;
    tutorialState.showSuccess = true;
    updateTutorialPanel();
    scheduleTutorialAdvance(() => {
      if (!isTutorialMode() || tutorialState?.completed) return;
      tutorialState.showSuccess = false;
      tutorialState.message = "";
      tutorialState.waitingForAdvance = false;
      if (options.nextSubStep !== undefined) {
        tutorialState.subStep = options.nextSubStep;
      }
      if (options.completedLocks !== undefined) {
        tutorialState.completedLocks = options.completedLocks;
      }
      resetTutorialSectionForSubStep({
        preserveBackToBack: options.preserveBackToBack,
        preserveRen: options.preserveRen,
      });
    });
  });
}

function isTutorialLockSuccess(sectionId, result) {
  switch (sectionId) {
    case "single":
      return result.clearedLines === 1 && result.eventType === "single";
    case "double":
      return result.clearedLines === 2 && result.eventType === "double";
    case "triple":
      return result.piece === "I" && result.clearedLines === 3 && result.eventType === "triple";
    case "tetris":
      return result.clearedLines === 4 && result.eventType === "tetris";
    case "hold":
      return tutorialState.usedHold && result.piece === "I" && result.clearedLines === 4 && result.eventType === "tetris";
    case "tSpin":
      return result.piece === "T" && result.lastAction === "rotate" && result.isTSpin && result.clearedLines === 1;
    case "tSpinDouble":
      return result.piece === "T" && result.lastAction === "rotate" && result.isTSpin && result.clearedLines === 2 && result.eventType === "tSpinDouble";
    case "perfectClear":
      return result.clearedLines > 0 && result.isPerfectClear;
    case "cascade":
      return result.mode === "cascade" && result.cascadeChain >= 2 && result.clearedLines >= 2;
    case "square":
      return result.mode === "square" && result.madeSquareCount >= 1;
    case "bombliss":
      return result.mode === "bombliss" && result.explodedBombCount > 0 && (result.usedSmall || result.usedLarge);
    case "zone":
      return tutorialState.subStep === 1 && result.mode === "zone" && result.zoneActive && result.zoneLines > 0;
    case "garbage":
      return result.clearedGarbageLines > 0 || result.clearedGarbageCells > 0;
    default:
      return false;
  }
}

function evaluateTutorialLockResult(result) {
  if (!isTutorialMode() || tutorialChapter === 1 || !tutorialState || tutorialState.completed) return false;
  if (tutorialChapter === 5) {
    return evaluateChapter5LockResult(result);
  }
  const sectionId = getCurrentTutorialSection();

  if (sectionId === "backToBack") {
    const isEligibleClear = Boolean(result.isB2BEligibleClear || result.clearedLines === 4 || result.isTSpin);
    if (tutorialState.subStep === 0 && isEligibleClear) {
      logTutorialDecision(result, "continue");
      tutorialState.subStep = 1;
      advanceTutorialSubStep("できました！", {
        nextSubStep: 1,
        preserveBackToBack: true,
      });
      return true;
    }
    if (tutorialState.subStep === 1 && isEligibleClear && result.isBackToBackClear) {
      logTutorialDecision(result, "success");
      completeTutorialSection("", { clearActive: true });
      return true;
    }
    const decision = result.pieceLocked === false ? "continue" : "failure";
    logTutorialDecision(result, decision);
    if (decision === "failure") {
      failTutorialSection("Back-to-Back対象技を連続で達成できませんでした", result);
    }
    return true;
  }

  if (sectionId === "combo") {
    if (result.clearedLines > 0) {
      const completedLocks = (tutorialState.completedLocks ?? 0) + 1;
      if (completedLocks >= 2 && result.comboCount >= 2) {
        logTutorialDecision(result, "success");
        completeTutorialSection("", { clearActive: true });
        return true;
      }
      logTutorialDecision(result, "continue");
      advanceTutorialSubStep("できました！", {
        completedLocks,
        preserveRen: true,
      });
      return true;
    }
    logTutorialDecision(result, "failure");
    failTutorialSection("Combo中にライン消去が途切れました", result);
    return true;
  }

  if (sectionId === "rotationInsert") {
    const type = tutorialState.rotationInsertTypes[tutorialState.subStep];
    const context = tutorialState.lastRotationContext;
    if (
      result.piece === type &&
      result.lastAction === "rotate" &&
      tutorialState.rotatedSinceSpawn &&
      (context?.usedKick || context?.fromPlacementBlockedAtFinal) &&
      result.clearedLines > 0
    ) {
      const nextSubStep = tutorialState.subStep + 1;
      if (nextSubStep >= tutorialState.rotationInsertTypes.length) {
        logTutorialDecision(result, "success");
        completeTutorialSection("", { clearActive: true });
        return true;
      }
      logTutorialDecision(result, "continue");
      advanceTutorialSubStep("できました！", { nextSubStep });
      return true;
    }
    logTutorialDecision(result, "failure");
    failTutorialSection("回転入れ条件を満たしていません", result);
    return true;
  }

  if (isTutorialLockSuccess(sectionId, result)) {
    logTutorialDecision(result, "success");
    completeTutorialSection(sectionId === "square" ? "Square完成！\n\n4個とも同じ種類なら\nGold Squareになります。" : "できました！", { clearActive: true });
    return true;
  }

  logTutorialDecision(result, "failure");
  failTutorialSection("成功条件を満たしていません", result);
  return true;
}

function completeTutorialChapter() {
  running = false;
  gameOver = true;
  active = null;
  resetAllInputState();
  const completedKey = `chapter${tutorialChapter}Completed`;
  tutorialProgress = { ...tutorialProgress, [completedKey]: true };
  hideTutorialPanel();
  stopBgm();
  finishZone();
  tutorialState = null;
  updateStats();
  const content = TUTORIAL_CHAPTER_COMPLETE[tutorialChapter] ?? TUTORIAL_CHAPTER_COMPLETE[1];
  showActionOverlay(
    content.title,
    "もう一度",
    true,
    content.body,
  );
}

function startTutorialChapter(chapter) {
  if (chapter === 5) {
    startTutorialChapter5();
    return;
  }
  selectedGameMode = "チュートリアル";
  tutorialChapter = chapter;
  tutorialSectionIndex = 0;
  tutorialState = null;
  seedRng(`tutorial-${Date.now()}`);
  easyModeVariant = null;
  cols = DEFAULT_COLS;
  rows = DEFAULT_ROWS;
  configureBoardForMode();
  board = createBoard();
  nextQueue = [];
  holdType = null;
  score = 0;
  lines = 0;
  level = 1;
  gameTimeMs = 0;
  dropInterval = Number.POSITIVE_INFINITY;
  dropCounter = 0;
  lockCounter = 0;
  lockResetCount = 0;
  softDropDistance = 0;
  tsdAssistCandidate = null;
  tsdAssistDirty = true;
  paused = false;
  gameOver = false;
  running = true;
  clearInputBuffer();
  resetAllInputState();
  stopBgm();
  hideOverlay();
  if (!running) {
    running = true;
  }
  startTutorialSection(getCurrentTutorialSection());
  requestAnimationFrame(update);
}

function startTutorialChapter1() {
  startTutorialChapter(1);
}

function startTutorialChapter5() {
  selectedGameMode = "チュートリアル";
  tutorialChapter = 5;
  tutorialSectionIndex = 0;
  seedRng(`tutorial-5-${Date.now()}`);
  easyModeVariant = null;
  cols = DEFAULT_COLS;
  rows = DEFAULT_ROWS;
  configureBoardForMode();
  board = createBoard();
  nextQueue = [];
  holdType = null;
  canHold = true;
  score = 0;
  lines = 0;
  level = 1;
  renStreak = 0;
  backToBackStreak = 0;
  perfectClearCount = 0;
  gameTimeMs = 0;
  dropCounter = 0;
  lockCounter = 0;
  lockResetCount = 0;
  softDropDistance = 0;
  zoneGauge = 0;
  zoneActive = false;
  zoneTimer = 0;
  zoneConsumedGauge = 0;
  zoneLines = 0;
  zoneMaxLines = 0;
  zoneScoreBuffer = 0;
  cascadeResolutionActive = false;
  cascadeResolutionPhase = "idle";
  cascadeResolutionClears = [];
  cascadeResolutionUsedZone = false;
  cascadeClearDelay = 0;
  cascadeGravityTimer = 0;
  squareGroups = new Map();
  bomblissStageIndex = 0;
  bomblissPoints = 100;
  nextPieceId = 1;
  nextSquareId = 1;
  nextLargeBombId = 1;
  tsdAssistCandidate = null;
  tsdAssistDirty = true;
  paused = false;
  gameOver = false;
  running = true;
  tutorialState = {
    chapter: 5,
    completed: false,
    chapter5Missions: chooseChapter5Missions(),
    chapter5MissionIndex: 0,
    chapter5CompletedMissions: [],
    chapter5TimeRemainingMs: CHAPTER_5_TIME_LIMIT_MS,
    chapter5PieceCount: 0,
    currentMissionStartedAt: 0,
    usedHoldForCurrentMission: false,
    rotationInsertTarget: null,
    currentMissionProgress: 0,
    lastRotationContext: null,
    lastSuccessfulAction: null,
    clearedMissionDisplay: null,
  };
  if (tutorialState.chapter5Missions.length === 0) {
    tutorialState.chapter5Missions = CHAPTER_5_MISSION_POOL.slice(0, CHAPTER_5_MISSION_COUNT);
  }
  console.debug("Chapter 5 missions", tutorialState.chapter5Missions);
  resetChapter5MissionTemporaryState();
  clearInputBuffer();
  resetAllInputState();
  stopBgm();
  hideOverlay();
  hideTutorialPanel();
  applyGravityInterval();
  lastEventEl.textContent = "-";
  lastTime = performance.now();
  updateStats();
  fillQueue();
  spawnPiece();
  drawNextPreviews();
  drawPreview(holdCtx, holdType);
  showChapter5Mission();
  draw();
  requestAnimationFrame(update);
}

function showTutorialChapterMenu() {
  hideBombingReveal();
  hideCustomOverlayPanels();
  hideTutorialPanel();
  hidePracticeMenu();
  shell.classList.add("menu-screen");
  overlay.classList.remove("hidden");
  overlayTitle.textContent = "チュートリアル";
  modeMenu.classList.add("hidden");
  if (myPageButton) myPageButton.classList.add("hidden");
  if (playerSwitchButton) playerSwitchButton.classList.add("hidden");
  if (onePlayerMenu) onePlayerMenu.classList.add("hidden");
  easyModeMenu.classList.add("hidden");
  tutorialChapterMenu?.classList.remove("hidden");
  globalOptionsButton.classList.add("hidden");
  optionMenu.classList.add("hidden");
  globalOptionsMenu.classList.add("hidden");
  if (keybindMenu) keybindMenu.classList.add("hidden");
  if (myPageMenu) myPageMenu.classList.add("hidden");
  loginMenu.classList.add("hidden");
  actionMenu.classList.add("hidden");
}

function recordCustomAction(action, details = {}) {
  if (!isCustomMode()) return;
  customActionLog.push({
    gameTimeMs: Math.max(0, Math.floor(gameTimeMs)),
    action,
    details,
  });
  if (customActionLog.length > CUSTOM_ACTION_LOG_LIMIT) {
    customActionLog.splice(0, customActionLog.length - CUSTOM_ACTION_LOG_LIMIT);
  }
  if (customActionLogVisible) {
    renderCustomActionLog();
  }
}

function formatCustomActionLabel(entry) {
  const details = entry.details ?? {};
  switch (entry.action) {
    case "moveLeft":
      return "Move Left";
    case "moveRight":
      return "Move Right";
    case "softDropStart":
      return "Soft Drop Start";
    case "softDropEnd":
      return "Soft Drop End";
    case "hardDrop":
      return "Hard Drop";
    case "rotateRight":
      return "Rotate Right";
    case "rotateLeft":
      return "Rotate Left";
    case "hold":
      return "Hold";
    case "zoneActivate":
      return "ZONE Activate";
    case "lock":
      return `Lock ${details.piece ?? ""} at x=${details.x ?? "-"}, y=${details.y ?? "-"}, rotation=${details.rotationState ?? "-"}`;
    case "lineClear":
      return `${details.tSpin ? "T-Spin " : ""}${details.cleared === 4 ? "Tetris" : `${details.cleared ?? 0} Line Clear`}`;
    case "tSpin":
      return details.name ?? "T-Spin";
    case "tetris":
      return "Tetris";
    case "restart":
      return "Restart";
    case "timeReset":
      return "Time Reset";
    case "scoreReset":
      return "Score Reset";
    case "customSettingChange":
      return `Custom Setting ${details.setting}: ${details.before} -> ${details.after}`;
    default:
      return entry.action;
  }
}

function renderCustomActionLog() {
  if (!customActionLogList) return;
  customActionLogList.innerHTML = "";
  if (customActionLogCount) customActionLogCount.textContent = String(customActionLog.length);
  const entries = customActionLog.slice(-120);
  if (entries.length === 0) {
    const empty = document.createElement("div");
    empty.className = "custom-log-entry";
    empty.textContent = "ログなし";
    customActionLogList.appendChild(empty);
    return;
  }
  entries.forEach((entry) => {
    const row = document.createElement("div");
    row.className = "custom-log-entry";
    row.textContent = `${formatTime(entry.gameTimeMs)}  ${formatCustomActionLabel(entry)}`;
    customActionLogList.appendChild(row);
  });
  customActionLogList.scrollTop = customActionLogList.scrollHeight;
}

function resetCustomActionLog() {
  customActionLog = [];
  customActionLogVisible = false;
  renderCustomActionLog();
}

function updateTimeDisplay() {
  if (isCatchMode()) {
    timeDisplayEl.textContent = formatTime(Math.max(0, CATCH_DURATION_MS - gameTimeMs));
    return;
  }
  if (canUseZone() && zoneActive) {
    timeDisplayEl.textContent = globalThis.ZoneCore ? ZoneCore.formatZoneTimer(zoneTimer) : `${(Math.max(0, zoneTimer) / 1000).toFixed(1)}s`;
    return;
  }
  if (isUltraMode() || isPurifyMode()) {
    const duration = isUltraMode() ? ULTRA_DURATION_MS : PURIFY_DURATION_MS;
    timeDisplayEl.textContent = formatTime(Math.max(0, duration - gameTimeMs));
    return;
  }
  timeDisplayEl.textContent = formatTime(gameTimeMs);
}

function updateLineGoalDisplay() {
  if (isAllClearSprintMode()) {
    currentLinesEl.textContent = `${perfectClearCount} / 20 PC`;
  } else if (isTutorialMode()) {
    currentLinesEl.textContent = tutorialChapter ? `Chapter ${tutorialChapter}` : "-";
  } else if (isBomblissMode()) {
    currentLinesEl.textContent = `Stage ${bomblissStageIndex + 1}`;
  } else if (isSprintMode()) {
    currentLinesEl.textContent = `${Math.min(lines, sprintGoalLines)} / ${sprintGoalLines}`;
  } else if (isCheeseRaceMode()) {
    currentLinesEl.textContent = `${Math.min(cheeseClearedLines, cheeseGoalLines)} / ${cheeseGoalLines}`;
  } else if (isPurifyMode()) {
    currentLinesEl.textContent = `Purified ${purifyCleansed}`;
  } else if (isShadowMode()) {
    currentLinesEl.textContent = `${shadowMatchPercent}% / ${shadowStage?.targetPercent ?? 80}%`;
  } else if (isCatchMode()) {
    currentLinesEl.textContent = `Core ${catchCore?.cells.length ?? 0}`;
  } else if (isUltraMode()) {
    currentLinesEl.textContent = `${lines}`;
  } else if (isCustomMode()) {
    currentLinesEl.textContent = `Lines ${lines}`;
  } else if (isCascadeMode()) {
    currentLinesEl.textContent = endlessEnabled ? `${lines}` : `${Math.min(lines, 150)} / 150`;
  } else if (isHotlineMode()) {
    currentLinesEl.textContent = `${hotlineProgress} / ${hotlineTarget} HP`;
  } else if (isZeroGravityMode()) {
    currentLinesEl.textContent = `Lines ${lines}`;
  } else {
    currentLinesEl.textContent = endlessEnabled ? `${lines}` : `${Math.min(lines, 150)} / 150`;
  }
}

function updateOptionButtons() {
  selectedModeEl.textContent = getEffectiveModeName();
  ghostToggleButton.textContent = `ゴースト: ${ghostAssistEnabled ? "ON" : "OFF"}`;
  difficultyToggleButton.textContent = `難易度: ${easyDifficulty}`;
  endlessToggleButton.textContent = `エンドレス: ${endlessEnabled ? "ON" : "OFF"}`;
  cheesePurifyToggleButton.textContent = `浄化: ${cheeseRacePurifyEnabled ? "ON" : "OFF"}`;
  if (tsdAssistToggleButton) {
    tsdAssistToggleButton.textContent = `TSD Assist: ${tsdAssistEnabled ? "ON" : "OFF"}`;
  }
  sprintGoalValueEl.textContent = sprintGoalLines;
  cheeseGoalSelect.value = String(cheeseGoalLines);
  syncCustomSettingsControls();
}

function getModeRulesText() {
  const mode =
    easyModeVariant === "marathon"
      ? "やさしいマラソン"
      : easyModeVariant === "allClearSprint"
        ? "オールクリアスプリント"
        : getEffectiveModeName();

  switch (mode) {
    case "マラソン":
      return "150ラインでクリア。\nラインを消すとレベルが上がる通常モードです。\nエンドレスONなら150ライン後も続行します。";
    case "やさしいマラソン":
      return "5x10の小さな盤面で遊ぶマラソンです。\nEasy / Normalのミノセットを選べます。\n150ラインでクリア。エンドレスON対応です。";
    case "スプリント":
      return "選んだライン数まで最速で到達するタイムアタックです。\nレベルは1固定です。";
    case "オールクリアスプリント":
      return "パーフェクトクリアを20回達成するタイムアタックです。\nレベルは1固定です。";
    case "ウルトラ":
      return "3分間でできるだけ高得点を狙うモードです。\nレベルは1固定です。";
    case "Cheese Race":
      return cheeseRacePurifyEnabled
        ? "3分制の感染ガベージ討伐モードです。\n感染ブロックを消して浄化数を伸ばします。"
        : "下から積まれた穴あきガベージを掘るタイムアタックです。\n指定ライン数ぶんのガベージを消すとクリアします。";
    case "浄化":
      return "3分制の感染ガベージ討伐モードです。\n感染ブロックを消して浄化数を伸ばします。";
    case "Shadow":
      return "シルエットをブロックで埋めるモードです。\nSkip回数に制限があります。\nステージを選んで挑戦します。";
    case "Catch":
      return "落ちてくるミノをコアに吸着させるモードです。\n4x4の完成で爆発し、制限時間内の得点を競います。";
    case "ボンブリス":
      return "爆弾入りミノで盤面を消すステージ制モードです。\n盤面を空にして次のステージへ進みます。";
    case "カスケード":
      return "ライン消去後にブロックが落ち、\nさらに揃えば連鎖で消えるモードです。";
    case "ホットライン":
      return "指定されたホットライン上で消したラインだけが進行になります。\nHot-Lineポイントを集めてレベルを上げます。";
    case "ゾーン":
      return "Zoneゲージを溜めて発動し、落下を止めてラインを貯めるモードです。\n終了時にまとめてボーナスが入ります。";
    case "カスタム":
      return "レベル方式、カスケード重力、ZONEを自由に組み合わせて遊ぶモードです。";
    case "スクエア":
      return "4x4の完全な正方形を作って加点するモードです。\n通常ライン消去も行います。";
    case "無重力":
      return "自然落下がない練習用モードです。\nSoft Drop / Hard Dropでだけミノを動かします。";
    default:
      return "通常ルールで遊ぶモードです。";
  }
}

function updateModeRules() {
  if (!modeRulesEl) return;
  modeRulesEl.textContent = getModeRulesText();
}

function updateOptionVisibility() {
  const marathon = selectedGameMode === "マラソン" || selectedGameMode === "やさしいマラソン";
  const cascade = isCascadeMode();
  const hotline = isHotlineMode();
  const cheese = isCheeseRaceMode();
  const purify = isPurifyMode();
  const shadow = isShadowMode();
  const catchMode = isCatchMode();
  const zeroGravity = isZeroGravityMode();
  const custom = isCustomMode();
  const marathonLike = isMarathonMode();
  const sprint = selectedGameMode === "スプリント";
  const easyVariant = Boolean(easyModeVariant);
  shadowStageRow.classList.toggle("hidden", !shadow);
  fixedLevelToggleRow.classList.toggle("hidden", !marathon || custom);
  fixedLevelRow.classList.toggle("hidden", !marathon || !fixedLevelEnabled || custom);
  if (customLevelModeRow) customLevelModeRow.classList.toggle("hidden", !custom);
  if (customFixedLevelRow) customFixedLevelRow.classList.toggle("hidden", !custom || customSettings.levelMode !== "fixed");
  if (customCascadeToggleButton) customCascadeToggleButton.classList.toggle("hidden", !custom);
  if (customZoneToggleButton) customZoneToggleButton.classList.toggle("hidden", !custom);
  endlessToggleButton.classList.toggle("hidden", !marathonLike && !cascade && !hotline);
  sprintGoalRow.classList.toggle("hidden", !sprint);
  cheeseGoalRow.classList.toggle("hidden", !cheese);
  cheesePurifyToggleButton.classList.toggle("hidden", selectedGameMode !== "Cheese Race");
  if (zeroGravity) {
    fixedLevelToggleRow.classList.add("hidden");
    fixedLevelRow.classList.add("hidden");
    endlessToggleButton.classList.add("hidden");
    sprintGoalRow.classList.add("hidden");
    cheeseGoalRow.classList.add("hidden");
    cheesePurifyToggleButton.classList.add("hidden");
  }
  if (custom) {
    endlessToggleButton.classList.add("hidden");
    sprintGoalRow.classList.add("hidden");
    cheeseGoalRow.classList.add("hidden");
    cheesePurifyToggleButton.classList.add("hidden");
  }
  if (purify) {
    endlessToggleButton.classList.add("hidden");
    fixedLevelToggleRow.classList.add("hidden");
    fixedLevelRow.classList.add("hidden");
    sprintGoalRow.classList.add("hidden");
    cheeseGoalRow.classList.add("hidden");
  }
  if (shadow) {
    endlessToggleButton.classList.add("hidden");
  }
  if (catchMode) {
    fixedLevelToggleRow.classList.add("hidden");
    fixedLevelRow.classList.add("hidden");
    endlessToggleButton.classList.add("hidden");
    sprintGoalRow.classList.add("hidden");
    cheeseGoalRow.classList.add("hidden");
    ghostToggleButton.classList.add("hidden");
  } else if (!purify) {
    ghostToggleButton.classList.remove("hidden");
  } else {
    ghostToggleButton.classList.remove("hidden");
  }
  difficultyToggleButton.classList.toggle("hidden", !easyVariant || isBomblissMode());
  syncCustomSettingsControls();
  updateModeRules();
}

function isPerfectClear() {
  return board.every((row) => row.every((cell) => !cell));
}

function getPerfectClearScore(cleared) {
  const perfectClearScores = [0, 800, 1200, 1800, 2000];
  return (perfectClearScores[cleared] ?? 0) * level;
}

function canAutoLevelUp() {
  if (isCustomMode()) return customSettings.levelMode === "marathon";
  if (fixedLevelEnabled) return false;
  if (isZeroGravityMode()) return false;
  if (isPracticeMode()) return false;
  return isMarathonMode();
}

function applyLockScore(cleared, tSpin, backToBackActive, perfectClear) {
  let scoreIncrease = 0;

  if (cleared > 0) {
    if (canUseZone() && !zoneActive) {
      zoneGauge = perfectClear ? ZONE_GAUGE_MAX : Math.min(ZONE_GAUGE_MAX, zoneGauge + getZoneGaugeGain(cleared, tSpin));
    }
    renStreak += 1;
    const clearScore = tSpin ? getTSpinScore(cleared) : getNormalLineScore(cleared);
    scoreIncrease = clearScore + getRenBonus();
    score += backToBackActive ? Math.floor(scoreIncrease * 1.5) : scoreIncrease;
    lines += cleared;
    if (canAutoLevelUp()) {
      level = calculateMarathonLevel(lines);
      if (isEasyTetrisMode()) {
        level = Math.min(level, 10);
      }
      applyGravityInterval();
    }
    if (perfectClear) {
      score += getPerfectClearScore(cleared);
    }
  } else if (tSpin) {
    score += 400 * level;
    renStreak = 0;
  } else {
    renStreak = 0;
  }
  updateStats();
}

function getCascadeLineScore(cleared) {
  return getNormalLineScore(Math.min(cleared, 4));
}

function applyCascadeScore(result, perfectClear) {
  result.clears.forEach(({ chain, lines: cleared }) => {
    const multiplier = chain > 1 ? chain : 1;
    score += getCascadeLineScore(cleared) * multiplier;
  });

  if (result.totalLines > 0) {
    if (canAutoLevelUp()) {
      level = calculateMarathonLevel(lines);
      applyGravityInterval();
    }
  }
  if (perfectClear) {
    score += getPerfectClearScore(Math.min(result.totalLines, 4));
  }
  updateStats();
}

function updateCascadeLastEvent(result, perfectClear) {
  if (perfectClear) {
    lastEventEl.textContent = "Perfect Clear";
  } else if (result.chainCount > 1) {
    lastEventEl.textContent = `Cascade x${result.chainCount}`;
  } else if (result.totalLines === 4) {
    lastEventEl.textContent = "Tetris";
  } else if (result.totalLines > 0) {
    const names = ["", "Single", "Double", "Triple"];
    lastEventEl.textContent = names[result.totalLines] ?? `${result.totalLines} Lines`;
  }
}

function isTSpinCornerFilled(x, y) {
  if (x < 0 || x >= cols || y >= rows) return true;
  if (y < 0) return false;
  return Boolean(board[y][x]);
}

function isTSpin(piece) {
  if (piece.type !== "T" || piece.lastAction !== "rotate") return false;
  const centerX = piece.x + 1;
  const centerY = piece.y + 1;
  const filledCorners = [
    [centerX - 1, centerY - 1],
    [centerX + 1, centerY - 1],
    [centerX - 1, centerY + 1],
    [centerX + 1, centerY + 1],
  ].filter(([x, y]) => isTSpinCornerFilled(x, y)).length;
  return filledCorners >= 3;
}

function getTSpinEventName(cleared) {
  const names = [
    "T-Spin No Line",
    "T-Spin Single",
    "T-Spin Double",
    "T-Spin Triple",
  ];
  return names[cleared] ?? "T-Spin";
}

function recordCustomLineEvents(cleared, tSpin = false) {
  if (!isCustomMode()) return;
  if (cleared > 0) {
    recordCustomAction("lineClear", { cleared, tSpin });
  }
  if (tSpin) {
    recordCustomAction("tSpin", { cleared, name: getTSpinEventName(cleared) });
  }
  if (cleared === 4) {
    recordCustomAction("tetris", { cleared });
  }
}

function updateLastEvent(cleared, tSpin, backToBackActive, perfectClear) {
  const backToBackEligible = isBackToBackEligible(cleared, tSpin);
  const normalLineClear = cleared > 0 && !backToBackEligible;

  if (backToBackEligible) {
    backToBackStreak += 1;
  } else if (normalLineClear) {
    backToBackStreak = 0;
  }

  if (perfectClear) {
    lastEventEl.textContent = "Perfect Clear";
  } else if (backToBackActive) {
    lastEventEl.textContent = "Back to Back";
  } else if (tSpin) {
    lastEventEl.textContent = getTSpinEventName(cleared);
  } else if (cleared === 4) {
    lastEventEl.textContent = "Tetris";
  } else if (cleared > 0) {
    lastEventEl.textContent = `${cleared} Line${cleared > 1 ? "s" : ""}`;
  }
  if (canUseZone() && !zoneActive) {
    lastEventEl.textContent = `Zone ${zoneGauge}%`;
  }
}

function updateZoneStatus() {
  if (!canUseZone()) return;
  if (zoneActive) {
    if (zoneExtensionNoticeText && performance.now() < zoneExtensionNoticeUntil) {
      lastEventEl.textContent = zoneExtensionNoticeText;
      return;
    }
    lastEventEl.textContent = globalThis.ZoneCore ? ZoneCore.getZoneStatusText(zoneTimer) : `ZONE ${(Math.max(0, zoneTimer) / 1000).toFixed(1)}s`;
  } else if (lastEventEl.textContent === "-" || /^Zone \d+%$/.test(lastEventEl.textContent)) {
    lastEventEl.textContent = `Zone ${zoneGauge}%`;
  }
}

function activateZone() {
  if (!running || paused || !canUseZone() || zoneActive || zoneGauge < ZONE_ACTIVATE_COST) return;
  const consumedGauge = zoneGauge;
  zoneActive = true;
  zoneConsumedGauge = consumedGauge;
  zoneTimer = globalThis.ZoneCore ? ZoneCore.getZoneBaseDurationMs(consumedGauge) : consumedGauge * 200;
  zoneLines = 0;
  zoneMaxLines = 0;
  zoneScoreBuffer = 0;
  zoneGauge = 0;
  zoneExtensionNoticeText = "";
  zoneExtensionNoticeUntil = 0;
  dropCounter = 0;
  recordZoneActivationStat();
  recordCustomAction("zoneActivate", { consumedGauge });
  lastEventEl.textContent = globalThis.ZoneCore ? ZoneCore.getZoneStatusText(zoneTimer) : `ZONE ${(Math.max(0, zoneTimer) / 1000).toFixed(1)}s`;
  if (isTutorialMode() && getCurrentTutorialSection() === "zone" && tutorialState?.subStep === 0) {
    tutorialState.subStep = 1;
    tutorialState.showSuccess = true;
    tutorialState.message = "できました！";
    updateTutorialPanel();
    scheduleTutorialAdvance(() => {
      if (isTutorialMode() && getCurrentTutorialSection() === "zone" && tutorialState && !tutorialState.completed) {
        tutorialState.showSuccess = false;
        tutorialState.message = "";
        updateTutorialPanel();
      }
    }, TUTORIAL_SUCCESS_DELAY_MS);
  }
  console.debug("activateZone", {
    zoneTimer,
    zoneConsumedGauge,
    running,
    paused,
    gameOver,
  });
  draw();
}

function finishZone() {
  console.debug("finishZone called", {
    zoneActive,
    zoneTimer,
    zoneLines,
  });
  if (!zoneActive) return;
  zoneActive = false;
  zoneTimer = 0;
  zoneConsumedGauge = 0;
  zoneGauge = 0;
  zoneExtensionNoticeText = "";
  zoneExtensionNoticeUntil = 0;
  if (zoneLines > 0) {
    const zoneBonus = zoneLines * 100 * level;
    const multiplier = getZoneMultiplier(zoneLines);
    score += Math.floor((zoneScoreBuffer + zoneBonus) * multiplier);
    lastEventEl.textContent = getZoneClearName(zoneLines);
    recordZoneMaxLinesStat(zoneLines);
  } else {
    lastEventEl.textContent = `Zone ${zoneGauge}%`;
  }
  zoneLines = 0;
  zoneMaxLines = 0;
  zoneScoreBuffer = 0;
  updateStats();
  console.debug("finishZone complete", {
    zoneActive,
    zoneTimer,
    zoneGauge,
    lastEvent: lastEventEl.textContent,
  });
}

function movePiece(deltaX) {
  if (!running || paused) return;
  if (!collides(active, active.x + deltaX, active.y, active.matrix)) {
    const wasGrounded = isActiveGrounded();
    active.x += deltaX;
    active.lastAction = "move";
    tsdAssistDirty = true;
    if (!isTutorialMode()) {
      resetLockDelayAfterPlayerAction(wasGrounded);
    }
    recordCustomAction(deltaX < 0 ? "moveLeft" : "moveRight", {
      piece: active.type,
      x: active.x,
      y: active.y,
    });
    handleTutorialMove(deltaX);
    draw();
  }
}

function isActiveGrounded() {
  return Boolean(active) && collides(active, active.x, active.y + 1, active.matrix);
}

function resetLockDelayAfterPlayerAction(wasGrounded = false) {
  lockCounter = 0;
  if (wasGrounded || isActiveGrounded()) {
    lockResetCount += 1;
  }
}

function shouldForceLock() {
  return lockResetCount >= MAX_LOCK_RESETS && isActiveGrounded();
}

function resetHorizontalTimers() {
  dasTimer = 0;
  arrTimer = 0;
}

function isActionPhysicallyHeld(action) {
  const codes = keyBindings[action];
  return Array.isArray(codes) && codes.some((code) => heldKeyCodes.has(code));
}

function syncHeldFlags() {
  leftHeld = isActionPhysicallyHeld("moveLeft");
  rightHeld = isActionPhysicallyHeld("moveRight");
  softDropHeld = isActionPhysicallyHeld("softDrop") && !softDropSuppressedUntilKeyup;
}

function isSoftDropActive() {
  return isActionPhysicallyHeld("softDrop") && !softDropSuppressedUntilKeyup;
}

function directionToDelta(direction) {
  return direction === "left" ? -1 : 1;
}

function setActiveDirection(direction) {
  activeDirection = direction;
  lastPressedDirection = direction;
  resetHorizontalTimers();
  movePiece(directionToDelta(direction));
}

function releaseDirection(direction) {
  syncHeldFlags();

  if (activeDirection !== direction) return;

  if (direction === "left" && rightHeld) {
    setActiveDirection("right");
  } else if (direction === "right" && leftHeld) {
    setActiveDirection("left");
  } else {
    activeDirection = null;
    resetHorizontalTimers();
  }
}

function resetHorizontalInput() {
  activeDirection = null;
  dasTimer = 0;
  arrTimer = 0;
  heldKeyCodes.clear();
  syncHeldFlags();
  lastPressedDirection = null;
}

function resetDropInput() {
  softDropSuppressedUntilKeyup = false;
  dropCounter = 0;
  syncHeldFlags();
}

function resetSoftDropAfterLock() {
  softDropSuppressedUntilKeyup = isActionPhysicallyHeld("softDrop");
  softDropHeld = false;
  dropCounter = 0;
}

function resetDropInputAfterLock() {
  resetSoftDropAfterLock();
}

function resetAllInputState() {
  heldKeyCodes.clear();
  clearInputBuffer();
  activeDirection = null;
  dasTimer = 0;
  arrTimer = 0;
  lastPressedDirection = null;
  softDropSuppressedUntilKeyup = false;
  softDropHeld = false;
  leftHeld = false;
  rightHeld = false;
  dropCounter = 0;
}

function normalizeKeyBindingList(value, fallback = []) {
  const list = Array.isArray(value) ? value : value ? [value] : fallback;
  return Array.from(new Set(list.filter((entry) => typeof entry === "string" && entry.length > 0)));
}

function loadSettings() {
  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    const source = parsed && typeof parsed === "object" ? parsed : {};
    const loadedBindings = source.keyBindings && typeof source.keyBindings === "object" ? source.keyBindings : {};
    const normalized = {};
    Object.keys(DEFAULT_KEY_BINDINGS).forEach((action) => {
      normalized[action] = normalizeKeyBindingList(loadedBindings[action], DEFAULT_KEY_BINDINGS[action]);
    });
    if (normalized.hardDrop.includes("Space") && normalized.zone.includes("Space")) {
      normalized.hardDrop = normalized.hardDrop.filter((code) => code !== "Space");
    }
    return {
      keyBindings: normalized,
      tsdAssistEnabled: Boolean(source.tsdAssistEnabled),
      customSettings: normalizeCustomSettings(source.customSettings),
    };
  } catch {
    const normalized = {};
    Object.keys(DEFAULT_KEY_BINDINGS).forEach((action) => {
      normalized[action] = [...DEFAULT_KEY_BINDINGS[action]];
    });
    return {
      keyBindings: normalized,
      tsdAssistEnabled: false,
      customSettings: { ...DEFAULT_CUSTOM_SETTINGS },
    };
  }
}

function saveSettings() {
  try {
    window.localStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify({
        keyBindings,
        tsdAssistEnabled,
        customSettings,
      }),
    );
  } catch {
    // ignore
  }
}

function formatKeyCode(code) {
  if (code.startsWith("Key")) return code.slice(3);
  if (code.startsWith("Digit")) return code.slice(5);
  if (code === "Space") return "Space";
  return code.replace("Arrow", "");
}

function formatKeyCodes(codes) {
  return normalizeKeyBindingList(codes).map(formatKeyCode).join(" / ");
}

function updateKeybindDisplay() {
  keybindButtons.forEach((button) => {
    const action = button.dataset.action;
    button.textContent = `${KEYBIND_LABELS[action]}: ${formatKeyCodes(keyBindings[action])}`;
    button.classList.toggle("waiting", waitingForKeybind === action);
  });
  moveKeysEl.textContent = `${formatKeyCodes(keyBindings.moveLeft)} / ${formatKeyCodes(keyBindings.moveRight)}`;
  softDropKeyEl.textContent = formatKeyCodes(keyBindings.softDrop);
  rotateRightKeyEl.textContent = formatKeyCodes(keyBindings.rotateRight);
  rotateLeftKeyEl.textContent = formatKeyCodes(keyBindings.rotateLeft);
  hardDropKeyEl.textContent = formatKeyCodes(keyBindings.hardDrop);
  holdKeyEl.textContent = formatKeyCodes(keyBindings.hold);
  pauseKeyEl.textContent = formatKeyCodes(keyBindings.pause);
}

function getActionForCode(code) {
  return Object.entries(keyBindings).find(([, boundCodes]) => Array.isArray(boundCodes) && boundCodes.includes(code))?.[0] ?? null;
}

function addKeyBinding(action, code) {
  const current = normalizeKeyBindingList(keyBindings[action], DEFAULT_KEY_BINDINGS[action]);
  if (current.includes(code)) return false;
  Object.keys(keyBindings).forEach((otherAction) => {
    if (otherAction === action) return;
    keyBindings[otherAction] = normalizeKeyBindingList(keyBindings[otherAction], DEFAULT_KEY_BINDINGS[otherAction]).filter((entry) => entry !== code);
  });
  current.push(code);
  keyBindings[action] = current;
  saveSettings();
  return true;
}

function loadKeyBindingsFromSettings() {
  const settings = loadSettings();
  keyBindings = settings.keyBindings;
  tsdAssistEnabled = Boolean(settings.tsdAssistEnabled);
  customSettings = normalizeCustomSettings(settings.customSettings);
}

function clearKeyBinding(action) {
  keyBindings[action] = [];
  saveSettings();
}

function isEditableTarget(target) {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.matches("input, textarea, select") ||
    target.isContentEditable ||
    target.closest("input, textarea, select")
  );
}

function hideCustomOverlayPanels() {
  customActionLogVisible = false;
  if (customPauseSettingsPanel) customPauseSettingsPanel.classList.add("hidden");
  if (customActionLogPanel) customActionLogPanel.classList.add("hidden");
}

function hideTutorialMenus() {
  tutorialChapterMenu?.classList.add("hidden");
}

function hidePracticeMenu() {
  practiceMenu?.classList.add("hidden");
}

function showTitleMenu() {
  hideBombingReveal();
  hideCustomOverlayPanels();
  hideTutorialPanel();
  hideTutorialMenus();
  hidePracticeMenu();
  shell.classList.add("menu-screen");
  overlay.classList.remove("hidden");
  overlayTitle.textContent = "Blockfall";
  updatePlayerIndicator();
  modeMenu.classList.remove("hidden");
  if (myPageButton) myPageButton.classList.remove("hidden");
  if (playerSwitchButton) playerSwitchButton.classList.remove("hidden");
  if (onePlayerMenu) onePlayerMenu.classList.add("hidden");
  easyModeMenu.classList.add("hidden");
  globalOptionsButton.classList.remove("hidden");
  optionMenu.classList.add("hidden");
  globalOptionsMenu.classList.add("hidden");
  if (keybindMenu) keybindMenu.classList.add("hidden");
  if (myPageMenu) myPageMenu.classList.add("hidden");
  loginMenu.classList.add("hidden");
  actionMenu.classList.add("hidden");
}

function showPracticeMenu() {
  hideBombingReveal();
  hideCustomOverlayPanels();
  hideTutorialPanel();
  hideTutorialMenus();
  shell.classList.add("menu-screen");
  overlay.classList.remove("hidden");
  overlayTitle.textContent = "練習";
  modeMenu.classList.add("hidden");
  if (myPageButton) myPageButton.classList.add("hidden");
  if (playerSwitchButton) playerSwitchButton.classList.add("hidden");
  if (onePlayerMenu) onePlayerMenu.classList.add("hidden");
  easyModeMenu.classList.add("hidden");
  practiceMenu?.classList.remove("hidden");
  globalOptionsButton.classList.add("hidden");
  optionMenu.classList.add("hidden");
  globalOptionsMenu.classList.add("hidden");
  if (keybindMenu) keybindMenu.classList.add("hidden");
  if (myPageMenu) myPageMenu.classList.add("hidden");
  loginMenu.classList.add("hidden");
  actionMenu.classList.add("hidden");
}

function showGlobalOptionsMenu() {
  hideBombingReveal();
  hideCustomOverlayPanels();
  hideTutorialPanel();
  hideTutorialMenus();
  hidePracticeMenu();
  updateKeybindDisplay();
  updateOptionButtons();
  shell.classList.add("menu-screen");
  overlay.classList.remove("hidden");
  overlayTitle.textContent = "Options";
  modeMenu.classList.add("hidden");
  if (myPageButton) myPageButton.classList.add("hidden");
  if (playerSwitchButton) playerSwitchButton.classList.add("hidden");
  if (onePlayerMenu) onePlayerMenu.classList.add("hidden");
  easyModeMenu.classList.add("hidden");
  globalOptionsButton.classList.add("hidden");
  optionMenu.classList.add("hidden");
  globalOptionsMenu.classList.remove("hidden");
  if (keybindMenu) keybindMenu.classList.add("hidden");
  if (myPageMenu) myPageMenu.classList.add("hidden");
  loginMenu.classList.add("hidden");
  actionMenu.classList.add("hidden");
}

function showEasyModeMenu() {
  hideBombingReveal();
  hideCustomOverlayPanels();
  hideTutorialPanel();
  hideTutorialMenus();
  hidePracticeMenu();
  easyModeVariant = null;
  shell.classList.add("menu-screen");
  overlay.classList.remove("hidden");
  overlayTitle.textContent = "いろんなテトリス";
  modeMenu.classList.add("hidden");
  if (myPageButton) myPageButton.classList.add("hidden");
  if (playerSwitchButton) playerSwitchButton.classList.add("hidden");
  if (onePlayerMenu) onePlayerMenu.classList.add("hidden");
  easyModeMenu.classList.remove("hidden");
  globalOptionsButton.classList.add("hidden");
  optionMenu.classList.add("hidden");
  globalOptionsMenu.classList.add("hidden");
  if (keybindMenu) keybindMenu.classList.add("hidden");
  if (myPageMenu) myPageMenu.classList.add("hidden");
  loginMenu.classList.add("hidden");
  actionMenu.classList.add("hidden");
}

function showOnePlayerMenu() {
  hideBombingReveal();
  hideCustomOverlayPanels();
  hideTutorialPanel();
  hideTutorialMenus();
  hidePracticeMenu();
  shell.classList.add("menu-screen");
  overlay.classList.remove("hidden");
  overlayTitle.textContent = "一人でテトリス";
  modeMenu.classList.add("hidden");
  if (myPageButton) myPageButton.classList.add("hidden");
  if (playerSwitchButton) playerSwitchButton.classList.add("hidden");
  if (onePlayerMenu) onePlayerMenu.classList.remove("hidden");
  easyModeMenu.classList.add("hidden");
  globalOptionsButton.classList.add("hidden");
  optionMenu.classList.add("hidden");
  globalOptionsMenu.classList.add("hidden");
  if (keybindMenu) keybindMenu.classList.add("hidden");
  loginMenu.classList.add("hidden");
  actionMenu.classList.add("hidden");
}

function showOptionMenu(modeName) {
  hideBombingReveal();
  hideCustomOverlayPanels();
  hideTutorialPanel();
  hideTutorialMenus();
  hidePracticeMenu();
  selectedGameMode = modeName;
  selectedModeEl.textContent = modeName;
  if (isShadowMode()) {
    shadowStageSelect.value = String(selectedShadowStageIndex);
  }
  updateOptionButtons();
  updateOptionVisibility();
  shell.classList.add("menu-screen");
  overlay.classList.remove("hidden");
  overlayTitle.textContent = "Options";
  modeMenu.classList.add("hidden");
  if (myPageButton) myPageButton.classList.add("hidden");
  if (playerSwitchButton) playerSwitchButton.classList.add("hidden");
  if (onePlayerMenu) onePlayerMenu.classList.add("hidden");
  easyModeMenu.classList.add("hidden");
  globalOptionsButton.classList.add("hidden");
  optionMenu.classList.remove("hidden");
  globalOptionsMenu.classList.add("hidden");
  if (keybindMenu) keybindMenu.classList.add("hidden");
  if (myPageMenu) myPageMenu.classList.add("hidden");
  loginMenu.classList.add("hidden");
  actionMenu.classList.add("hidden");
}

function showKeybindMenu() {
  hideBombingReveal();
  hideCustomOverlayPanels();
  hideTutorialPanel();
  hideTutorialMenus();
  hidePracticeMenu();
  updateKeybindDisplay();
  shell.classList.add("menu-screen");
  overlay.classList.remove("hidden");
  overlayTitle.textContent = "キーコン設定";
  modeMenu.classList.add("hidden");
  if (myPageButton) myPageButton.classList.add("hidden");
  if (playerSwitchButton) playerSwitchButton.classList.add("hidden");
  if (onePlayerMenu) onePlayerMenu.classList.add("hidden");
  if (easyModeMenu) easyModeMenu.classList.add("hidden");
  globalOptionsButton.classList.add("hidden");
  optionMenu.classList.add("hidden");
  globalOptionsMenu.classList.add("hidden");
  if (keybindMenu) keybindMenu.classList.remove("hidden");
  if (myPageMenu) myPageMenu.classList.add("hidden");
  loginMenu.classList.add("hidden");
  actionMenu.classList.add("hidden");
}

function showActionOverlay(title, buttonText, showRestart = false, resultText = "") {
  hideBombingReveal();
  hideCustomOverlayPanels();
  hideTutorialMenus();
  hidePracticeMenu();
  shell.classList.remove("menu-screen");
  overlay.classList.remove("hidden");
  overlayTitle.textContent = title;
  modeMenu.classList.add("hidden");
  if (myPageButton) myPageButton.classList.add("hidden");
  if (playerSwitchButton) playerSwitchButton.classList.add("hidden");
  if (onePlayerMenu) onePlayerMenu.classList.add("hidden");
  easyModeMenu.classList.add("hidden");
  globalOptionsButton.classList.add("hidden");
  optionMenu.classList.add("hidden");
  globalOptionsMenu.classList.add("hidden");
  if (keybindMenu) keybindMenu.classList.add("hidden");
  if (myPageMenu) myPageMenu.classList.add("hidden");
  loginMenu.classList.add("hidden");
  actionMenu.classList.remove("hidden");
  resultSummaryEl.textContent = resultText;
  resultSummaryEl.classList.toggle("hidden", !resultText);
  startButton.textContent = buttonText;
  restartButton.textContent = isTutorialMode() && gameOver ? "Chapter選択へ" : "Restart";
  const customPause = paused && isCustomMode() && !gameOver;
  const tutorialPause = paused && isTutorialMode() && !gameOver;
  if (tutorialPause) {
    restartButton.textContent = "現在のセクションを最初から";
  }
  if (customRestartButton) customRestartButton.textContent = tutorialPause ? "Chapter選択へ" : "リスタート";
  customSettingsButton?.classList.toggle("hidden", !customPause);
  customRestartButton?.classList.toggle("hidden", !customPause && !tutorialPause);
  customTimeResetButton?.classList.toggle("hidden", !customPause);
  customScoreResetButton?.classList.toggle("hidden", !customPause);
  customActionLogButton?.classList.toggle("hidden", !customPause);
  restartButton.classList.toggle("hidden", customPause || (!showRestart && !tutorialPause));
}

function showCountdownOverlay(text) {
  hideBombingReveal();
  hideCustomOverlayPanels();
  hideTutorialPanel();
  hideTutorialMenus();
  hidePracticeMenu();
  shell.classList.remove("menu-screen");
  overlay.classList.remove("hidden");
  overlayTitle.textContent = text;
  modeMenu.classList.add("hidden");
  if (myPageButton) myPageButton.classList.add("hidden");
  if (playerSwitchButton) playerSwitchButton.classList.add("hidden");
  if (onePlayerMenu) onePlayerMenu.classList.add("hidden");
  optionMenu.classList.add("hidden");
  if (myPageMenu) myPageMenu.classList.add("hidden");
  loginMenu.classList.add("hidden");
  actionMenu.classList.add("hidden");
  resultSummaryEl.classList.add("hidden");
}

function hideOverlay() {
  hideBombingReveal();
  hideCustomOverlayPanels();
  hideTutorialPanel();
  hideTutorialMenus();
  hidePracticeMenu();
  shell.classList.remove("menu-screen");
  overlay.classList.add("hidden");
  modeMenu.classList.add("hidden");
  if (myPageButton) myPageButton.classList.add("hidden");
  if (playerSwitchButton) playerSwitchButton.classList.add("hidden");
  if (onePlayerMenu) onePlayerMenu.classList.add("hidden");
  easyModeMenu.classList.add("hidden");
  globalOptionsButton.classList.add("hidden");
  optionMenu.classList.add("hidden");
  globalOptionsMenu.classList.add("hidden");
  if (keybindMenu) keybindMenu.classList.add("hidden");
  if (myPageMenu) myPageMenu.classList.add("hidden");
  loginMenu.classList.add("hidden");
  actionMenu.classList.add("hidden");
  resultSummaryEl.classList.add("hidden");
}

function updateHorizontalAutoShift(delta) {
  if (!activeDirection) return;

  if (dasTimer < DAS_MS) {
    dasTimer += delta;
    if (dasTimer < DAS_MS) return;
  }

  arrTimer += delta;
  while (arrTimer >= ARR_MS) {
    movePiece(directionToDelta(activeDirection));
    arrTimer -= ARR_MS;
  }
}

function showBombingRevealRect(rect, durationMs = 1000) {
  if (!bombingReveal || !bombingRevealImage || !rect) return;
  bombingRevealImage.style.left = `${rect.x * CELL}px`;
  bombingRevealImage.style.top = `${rect.y * CELL}px`;
  bombingRevealImage.style.width = `${rect.width * CELL}px`;
  bombingRevealImage.style.height = `${rect.height * CELL}px`;
  bombingReveal.classList.remove("hidden");
  window.clearTimeout(bombingRevealTimer);
  bombingRevealTimer = window.setTimeout(() => {
    hideBombingReveal();
  }, durationMs);
}

function hideBombingReveal() {
  if (!bombingReveal) return;
  window.clearTimeout(bombingRevealTimer);
  bombingRevealTimer = null;
  bombingReveal.classList.add("hidden");
}

function movePieceDown(isSoftDrop = false) {
  if (!collides(active, active.x, active.y + 1, active.matrix)) {
    active.y += 1;
    active.lastAction = "drop";
    if (isSoftDrop) {
      softDropDistance += 1;
      handleTutorialSoftDrop();
    }
    tsdAssistDirty = true;
    return true;
  }
  return false;
}

function movePieceToGround(isSoftDrop = false) {
  let moved = false;
  while (!collides(active, active.x, active.y + 1, active.matrix)) {
    active.y += 1;
    active.lastAction = "drop";
    if (isSoftDrop) {
      softDropDistance += 1;
    }
    moved = true;
  }
  if (moved) {
    tsdAssistDirty = true;
    lockCounter = 0;
  }
  return moved;
}

function updateLockDelay(delta) {
  if (!active || gameOver || paused || tutorialState?.waitingForAdvance || tutorialState?.waitingForNext) return;
  if (collides(active, active.x, active.y + 1, active.matrix)) {
    lockCounter += delta;
    if (lockCounter >= LOCK_DELAY || lockResetCount >= MAX_LOCK_RESETS) {
      console.log("force lock from update", {
        lockCounter,
        lockResetCount,
        max: MAX_LOCK_RESETS,
        x: active?.x,
        y: active?.y,
        grounded: isActiveGrounded(),
      });
      lockPiece();
    }
  } else {
    lockCounter = 0;
  }
}

function hardDrop() {
  if (!running || paused) return;
  const dropPiece = active
    ? { piece: active.type, x: active.x, y: active.y, rotationState: active.rotationState }
    : {};
  let distance = 0;
  while (!collides(active, active.x, active.y + 1, active.matrix)) {
    active.y += 1;
    distance += 1;
  }
  if (!isBomblissMode()) {
    score += distance * 2;
  }
  if (isTutorialMode()) {
    score = 0;
  }
  if (distance > 0) {
    active.lastAction = "hardDrop";
  }
  recordCustomAction("hardDrop", { ...dropPiece, distance });
  tsdAssistDirty = true;
  lockPiece();
  updateStats();
  draw();
}

function rotatePiece(direction) {
  if (!running || paused) return;
  if (active?.type === "DOT" || active?.type === "O") {
    return;
  }
  const wasGrounded = isActiveGrounded();
  const fromState = active.rotationState;
  const toState = nextRotationState(fromState, direction);
  const fromMatrix = cloneMatrix(active.matrix);
  const fromX = active.x;
  const fromY = active.y;
  const nextMatrix = rotate(active.matrix, direction);
  const nextBombCells = rotateBombCells(active.bombCells, active.matrix.length, direction);
  const kicks = getKickTests(active.type, fromState, toState);
  console.log("rotate start", {
    type: active.type,
    fromState,
    toState,
    x: active.x,
    y: active.y,
    wasGrounded,
    lockCounter,
    lockResetCount,
  });
  for (const [kickX, kickY] of kicks) {
    const blocked = collides(active, active.x + kickX, active.y + kickY, nextMatrix);

    if (blocked) {
      console.log("rotate kick failed", { kickX, kickY });
      continue;
    }

    active.x += kickX;
    active.y += kickY;
    active.matrix = nextMatrix;
    active.bombCells = nextBombCells;
    active.rotationState = toState;
    active.lastAction = "rotate";
    if (isTutorialMode() && tutorialState) {
      tutorialState.rotatedSinceSpawn = true;
      tutorialState.lastSuccessfulAction = "rotate";
      tutorialState.lastRotationContext = {
        type: active.type,
        fromMatrix,
        fromX,
        fromY,
        toMatrix: cloneMatrix(nextMatrix),
        toX: active.x,
        toY: active.y,
        usedKick: kickX !== 0 || kickY !== 0,
        fromPlacementBlockedAtFinal: collides(active, active.x, active.y, fromMatrix),
      };
    }
    tsdAssistDirty = true;

    console.log("rotate success", {
      type: active.type,
      transition: `${fromState}>${toState}`,
      kickX,
      kickY,
      x: active.x,
      y: active.y,
      groundedAfter: isActiveGrounded(),
      lockCounter,
      lockResetCount,
    });

    resetLockDelayAfterPlayerAction(wasGrounded);
    recordCustomAction(direction > 0 ? "rotateRight" : "rotateLeft", {
      piece: active.type,
      x: active.x,
      y: active.y,
      rotationState: active.rotationState,
    });
    handleTutorialRotate(direction, fromState, toState);
    draw();
    return;
  }

  console.log("rotate failed all kicks", {
    type: active.type,
    fromState,
    toState,
    x: active.x,
    y: active.y,
    wasGrounded,
  });
}

function lockPiece() {
  if (isTutorialMode() && tutorialChapter === 1) {
    lockTutorialPiece();
    return;
  }
  if (isCatchMode()) {
    return;
  }
  if (isBomblissMode()) {
    lockBomblissPiece();
    return;
  }
  if (isCascadeEnabledForCurrentGame()) {
    lockCascadePiece();
    return;
  }
  if (isHotlineMode()) {
    lockHotlinePiece();
    return;
  }
  if (isSquareMode()) {
    lockSquarePiece();
    return;
  }
  if (isCheeseRaceMode()) {
    lockCheesePiece();
    return;
  }
  if (isPurifyMode()) {
    lockPurifyPiece();
    return;
  }
  if (isZeroGravityMode()) {
    lockZeroGravityPiece();
    return;
  }
  if (isShadowMode()) {
    lockShadowPiece();
    return;
  }
  if (zoneActive) {
    lockZonePiece();
    return;
  }
  const lockedPiece = active
    ? { piece: active.type, x: active.x, y: active.y, rotationState: active.rotationState }
    : {};
  lockCounter = 0;
  lockResetCount = 0;
  resetSoftDropAfterLock();
  score += softDropDistance;
  const tSpin = isTSpin(active);
  mergePiece();
  recordCustomAction("lock", lockedPiece);
  const { cleared, clearedRowCells } = clearLinesWithRowsAndCells();
  const perfectClear = cleared > 0 && isPerfectClear();
  const backToBackBefore = backToBackStreak;
  const isB2BEligibleClear = isBackToBackEligible(cleared, tSpin);
  const backToBackActive = isB2BEligibleClear && backToBackBefore > 0;
  applyLockScore(cleared, tSpin, backToBackActive, perfectClear);
  if (perfectClear) {
    perfectClearCount += 1;
    updateStats();
  }
  updateLastEvent(cleared, tSpin, backToBackActive, perfectClear);
  const backToBackAfter = backToBackStreak;
  recordLineClearStats(cleared, { tSpin, backToBackActive, perfectClear });
  recordCustomLineEvents(cleared, tSpin);
  const lockResult = {
    mode: "normal",
    piece: lockedPiece.piece,
    pieceType: lockedPiece.piece,
    x: lockedPiece.x,
    y: lockedPiece.y,
    finalX: lockedPiece.x,
    finalY: lockedPiece.y,
    rotationState: lockedPiece.rotationState,
    lastAction: active?.lastAction ?? null,
    lastSuccessfulAction: active?.lastAction ?? null,
    pieceLocked: true,
    clearedLines: cleared,
    eventType: getTutorialLineEventType(cleared, tSpin, perfectClear),
    isTSpin: tSpin,
    tSpinType: tSpin ? getTSpinEventName(cleared) : null,
    isTetris: cleared === 4,
    isPerfectClear: perfectClear,
    isBackToBack: backToBackActive,
    isBackToBackClear: backToBackActive,
    isB2BEligibleClear,
    comboCount: renStreak,
    backToBackBefore,
    backToBackAfter,
    backToBackStreak,
    usedHold: Boolean(tutorialState?.usedHoldForCurrentMission),
    lockedAfterHold: Boolean(tutorialState?.usedHoldForCurrentMission),
    clearedGarbageCells: clearedRowCells.flat().filter(getCellGarbage).length,
    clearedGarbageLines: clearedRowCells.filter((row) => row.some(getCellGarbage)).length,
  };
  if (evaluateTutorialLockResult(lockResult)) {
    return;
  }
  if (isAllClearSprintMode() && perfectClearCount >= 20) {
    finishGame("All Clear Sprint Complete");
    return;
  }
  if (isSprintMode() && !isAllClearSprintMode() && lines >= sprintGoalLines) {
    finishGame("Sprint Complete");
    return;
  }
  if (isMarathonMode() && !isCustomMode() && !endlessEnabled && lines >= 150) {
    finishGame(isZoneMode() ? "Zone Complete" : "Marathon Complete");
    return;
  }
  spawnPiece();
  drawNextPreviews();
  drawPreview(holdCtx, holdType);
}

function lockCascadePiece() {
  const lockedPiece = active
    ? { piece: active.type, x: active.x, y: active.y, rotationState: active.rotationState }
    : {};
  lockCounter = 0;
  lockResetCount = 0;
  resetSoftDropAfterLock();
  if (!isBomblissMode()) {
    score += softDropDistance;
  }
  mergePiece();
  recordCustomAction("lock", lockedPiece);
  if (!startCascadeResolution()) {
    if (evaluateTutorialLockResult({
      mode: "cascade",
      piece: lockedPiece.piece,
      x: lockedPiece.x,
      y: lockedPiece.y,
      rotationState: lockedPiece.rotationState,
      clearedLines: 0,
      cascadeChain: 0,
      cascadeClears: [],
    })) {
      return;
    }
    updateCascadeLastEvent({ chainCount: 0, clears: [], totalLines: 0 }, false);
    spawnPiece();
    drawNextPreviews();
    drawPreview(holdCtx, holdType);
  }
}

function lockHotlinePiece() {
  lockCounter = 0;
  lockResetCount = 0;
  resetSoftDropAfterLock();
  score += softDropDistance;
  mergePiece();
  const { cleared, clearedRows } = clearLinesWithRows();
  const earned = getHotlinePointsForRows(clearedRows);
  lines += cleared;

  recordLineClearStats(cleared);

  if (earned > 0) {
    hotlinePoints += earned;
    hotlineProgress += earned;
    score += earned * 100 * level;
    lastEventEl.textContent = `Hot-Line +${earned}`;
    while (hotlineProgress >= hotlineTarget) {
      hotlineProgress -= hotlineTarget;
      if (level >= 15) {
        if (!endlessEnabled) {
          finishGame("Hot-Line Complete");
          return;
        }
        level += 1;
      } else {
        level += 1;
      }
      hotlineTarget = 5 * level;
      applyGravityInterval();
    }
  } else if (cleared > 0) {
    lastEventEl.textContent = "No Hot-Line";
  }
  updateStats();
  spawnPiece();
  drawNextPreviews();
  drawPreview(holdCtx, holdType);
}

function lockZonePiece() {
  const lockedPiece = active
    ? { piece: active.type, x: active.x, y: active.y, rotationState: active.rotationState }
    : {};
  lockCounter = 0;
  lockResetCount = 0;
  resetSoftDropAfterLock();
  score += softDropDistance;
  mergePiece();
  recordCustomAction("lock", lockedPiece);
  const tSpin = isTSpin(active);
  const cleared = clearLines();
  const perfectClear = cleared > 0 && isPerfectClear();
  if (cleared > 0) {
    zoneLines += cleared;
    zoneMaxLines = Math.max(zoneMaxLines, zoneLines);
    zoneScoreBuffer += getNormalLineScore(Math.min(cleared, 4));
    const zoneEventKey = globalThis.ZoneCore ? ZoneCore.getZoneEventKey({ cleared, tSpin, perfectClear }) : null;
    const extensionMs = globalThis.ZoneCore ? ZoneCore.getZoneExtensionMs({ cleared, tSpin, perfectClear }) : 0;
    const applied = globalThis.ZoneCore ? ZoneCore.applyZoneExtension(zoneTimer, extensionMs) : { after: zoneTimer, applied: 0 };
    zoneTimer = applied.after;
    if (applied.applied > 0) {
      zoneExtensionNoticeText = globalThis.ZoneCore ? ZoneCore.getZoneExtensionText(zoneEventKey, applied.applied) : `${zoneEventKey ?? "ZONE"}  +${(applied.applied / 1000).toFixed(1)}s`;
      zoneExtensionNoticeUntil = performance.now() + 900;
    }
  }
  recordLineClearStats(cleared, { tSpin, perfectClear });
  recordCustomLineEvents(cleared, tSpin);
  updateStats();
  updateZoneStatus();
  const lockResult = {
    mode: "zone",
    piece: lockedPiece.piece,
    x: lockedPiece.x,
    y: lockedPiece.y,
    rotationState: lockedPiece.rotationState,
    lastAction: active?.lastAction ?? null,
    clearedLines: cleared,
    eventType: getTutorialLineEventType(cleared, tSpin, perfectClear),
    isTSpin: tSpin,
    isPerfectClear: perfectClear,
    zoneActive,
    zoneLines,
    zoneMaxLines,
  };
  if (evaluateTutorialLockResult(lockResult)) {
    return;
  }
  spawnPiece();
  drawNextPreviews();
  drawPreview(holdCtx, holdType);
}

function lockSquarePiece() {
  lockCounter = 0;
  lockResetCount = 0;
  resetSoftDropAfterLock();
  score += softDropDistance;
  mergePiece();
  const madeSquares = detectAndMarkSquares();
  const { cleared, clearedCells } = clearLinesWithCellData();
  refreshSquareGroupsAfterLineClear();
  const squareCreateScore = madeSquares.reduce(
    (total, { squareType }) =>
      total + (squareType === "gold" ? GOLD_SQUARE_CREATE_SCORE : SILVER_SQUARE_CREATE_SCORE) * level,
    0,
  );
  const normalLineScore = cleared > 0 ? getNormalLineScore(Math.min(cleared, 4)) : 0;
  const squareLineBonus = getSquareLineBonus(clearedCells);
  const lineSquareType = getDominantSquareType(clearedCells);
  const perfectClear = cleared > 0 && isPerfectClear();
  const perfectClearScore = perfectClear ? getPerfectClearScore(Math.min(cleared, 4)) : 0;

  score += squareCreateScore + normalLineScore + squareLineBonus + perfectClearScore;

  console.debug("square score", {
    squareCreateScore,
    normalLineScore,
    squareLineBonus,
    perfectClearScore,
    cleared,
    madeSquares,
  });

  if (cleared > 0) {
    lines += cleared;
    level = Math.floor(lines / 10) + 1;
    applyGravityInterval();
  }
  recordLineClearStats(cleared, { perfectClear });

  if (lineSquareType === "gold") {
    lastEventEl.textContent = "Gold Bonus";
  } else if (lineSquareType === "silver") {
    lastEventEl.textContent = "Silver Bonus";
  } else if (madeSquares.some(({ squareType }) => squareType === "gold")) {
    lastEventEl.textContent = "Gold Square";
  } else if (madeSquares.length > 0) {
    lastEventEl.textContent = "Silver Square";
  } else if (perfectClear) {
    lastEventEl.textContent = "Perfect Clear";
  } else if (cleared === 4) {
    lastEventEl.textContent = "Tetris";
  } else if (cleared > 0) {
    lastEventEl.textContent = `${cleared} Line${cleared > 1 ? "s" : ""}`;
  }

  updateStats();
  if (evaluateTutorialLockResult({
    mode: "square",
    clearedLines: cleared,
    madeSquares,
    madeSquareCount: madeSquares.length,
    squareTypes: madeSquares.map(({ squareType }) => squareType),
    isPerfectClear: perfectClear,
  })) {
    return;
  }
  if (!endlessEnabled && lines >= 150) {
    finishGame("Square Complete");
    return;
  }
  spawnPiece();
  drawNextPreviews();
  drawPreview(holdCtx, holdType);
}

function lockCheesePiece() {
  lockCounter = 0;
  lockResetCount = 0;
  resetSoftDropAfterLock();
  score += softDropDistance;
  const tSpin = isTSpin(active);
  mergePiece();
  const { cleared, clearedRows, clearedRowCells } = clearLinesWithRowsAndCells();
  const perfectClear = cleared > 0 && isPerfectClear();
  const backToBackActive = isBackToBackEligible(cleared, tSpin) && backToBackStreak > 0;
  applyLockScore(cleared, tSpin, backToBackActive, perfectClear);

  const cheeseCleared = clearedRowCells.filter((row) => row.some(getCellGarbage)).length;
  if (cheeseCleared > 0) {
    cheeseClearedLines += cheeseCleared;
    lastEventEl.textContent = cheeseClearedLines >= cheeseGoalLines
      ? "Cheese Clear"
      : `Cheese +${cheeseCleared}`;
    recordCheeseLinesStat(cheeseCleared);
  } else if (cleared > 0) {
    lastEventEl.textContent = "No Cheese";
  }

  recordLineClearStats(cleared, { tSpin, backToBackActive, perfectClear });

  if (cheeseClearedLines >= cheeseGoalLines) {
    finishGame("Cheese Clear");
    return;
  }

  replenishCheeseGarbage(cleared);
  if (gameOver) return;
  updateStats();
  spawnPiece();
  drawNextPreviews();
  drawPreview(holdCtx, holdType);
}

function lockPurifyPiece() {
  lockCounter = 0;
  lockResetCount = 0;
  resetSoftDropAfterLock();
  score += softDropDistance;
  mergePiece();
  const { cleared, clearedRows, clearedRowCells } = clearLinesWithRowsAndCells();
  const infectedCleared = clearedRowCells.reduce(
    (sum, row) => sum + row.filter(getCellInfected).length,
    0,
  );
  if (infectedCleared > 0) {
    purifyCleansed += infectedCleared;
    purifyCurrentInfections = Math.max(0, purifyCurrentInfections - infectedCleared);
    score += infectedCleared * 100 * level;
    lastEventEl.textContent = `Purified +${infectedCleared}`;
  } else if (cleared > 0) {
    lastEventEl.textContent = "No Purify";
  }

  lines += cleared;
  if (purifyCurrentInfections === 0 && infectedCleared > 0) {
    score += 1000 * level;
    lastEventEl.textContent = "All Purified";
  }

  recordLineClearStats(cleared);
  updateStats();
  if (gameTimeMs >= PURIFY_DURATION_MS) {
    finishGame("Purify Complete");
    return;
  }
  spawnPiece();
  drawNextPreviews();
  drawPreview(holdCtx, holdType);
}

function lockZeroGravityPiece() {
  const lockedPiece = active
    ? { piece: active.type, x: active.x, y: active.y, rotationState: active.rotationState }
    : {};
  lockCounter = 0;
  lockResetCount = 0;
  resetSoftDropAfterLock();
  score += softDropDistance;
  const tSpin = isTSpin(active);
  mergePiece();
  recordCustomAction("lock", lockedPiece);
  const cleared = clearLines();
  const perfectClear = cleared > 0 && isPerfectClear();
  const backToBackActive = isBackToBackEligible(cleared, tSpin) && backToBackStreak > 0;
  applyLockScore(cleared, tSpin, backToBackActive, perfectClear);
  if (perfectClear) {
    perfectClearCount += 1;
  }
  updateLastEvent(cleared, tSpin, backToBackActive, perfectClear);
  recordLineClearStats(cleared, { tSpin, backToBackActive, perfectClear });
  recordCustomLineEvents(cleared, tSpin);
  updateStats();
  spawnPiece();
  drawNextPreviews();
  drawPreview(holdCtx, holdType);
}

function lockShadowPiece() {
  lockCounter = 0;
  lockResetCount = 0;
  resetSoftDropAfterLock();
  score += softDropDistance;
  mergePiece();
  const evaluation = evaluateShadowMatch();
  shadowInsideCells = evaluation.inside;
  shadowOutsideCells = evaluation.outside;
  shadowMatchPercent = evaluation.matchPercent;
  lastEventEl.textContent = `Match ${shadowMatchPercent}%`;
  updateStats();

  if (shadowMatchPercent >= (shadowStage?.targetPercent ?? 80)) {
    finishShadowStage();
    return;
  }

  spawnPiece();
  drawNextPreviews();
  drawPreview(holdCtx, holdType);
}

function finishShadowStage() {
  const evaluation = evaluateShadowMatch();
  shadowInsideCells = evaluation.inside;
  shadowOutsideCells = evaluation.outside;
  shadowMatchPercent = evaluation.matchPercent;
  score += shadowMatchPercent * 100;
  recordShadowStageStat();
  if (shadowMatchPercent === 100) {
    score += 5000;
  }
  if (shadowOutsideCells === 0) {
    score += 2000;
  }

  finalizeResultRecord();

  lastEventEl.textContent =
    shadowMatchPercent === 100 && shadowOutsideCells === 0 ? "Perfect Shadow" : "Stage Clear";

  if (currentShadowStageIndex >= SHADOW_STAGES.length - 1) {
    updateStats();
    finishGame("Shadow Complete");
    return;
  }

  currentShadowStageIndex += 1;
  board = createBoard();
  loadShadowStage(currentShadowStageIndex, false);
  updateStats();
  spawnPiece();
  drawNextPreviews();
  drawPreview(holdCtx, holdType);
}

function lockBomblissPiece() {
  const lockedPiece = active
    ? { piece: active.type, x: active.x, y: active.y, rotationState: active.rotationState }
    : {};
  lockCounter = 0;
  lockResetCount = 0;
  resetSoftDropAfterLock();
  mergePiece();
  const result = processBomblissChains();
  if (result.chainCount > 0) {
    showBombingRevealRect(result.revealRect ?? { x: 0, y: 0, width: cols, height: rows });
  }

  if (evaluateTutorialLockResult({
    mode: "bombliss",
    piece: lockedPiece.piece,
    x: lockedPiece.x,
    y: lockedPiece.y,
    rotationState: lockedPiece.rotationState,
    pieceLocked: true,
    chainCount: result.chainCount,
    usedSmall: Boolean(result.usedSmall),
    usedLarge: Boolean(result.usedLarge),
    madeLarge: Boolean(result.madeLarge),
    explodedBombCount: result.usedSmall || result.usedLarge ? 1 : 0,
    clearedLines: result.lastLineCount ?? 0,
  })) {
    return;
  }

  if (isPerfectClear()) {
    lastEventEl.textContent = "Stage Clear";
    recordBomblissStageStat();
    bomblissStageIndex += 1;
    if (bomblissStageIndex >= BOMBLISS_STAGES.length) {
      finishGame("Bombliss Complete");
      return;
    }
    nextQueue = [];
    holdType = null;
    loadBomblissStage(bomblissStageIndex);
  } else if (result.chainCount > 1) {
    lastEventEl.textContent = `Chain x${result.chainCount}`;
  } else if (result.usedLarge || result.madeLarge) {
    lastEventEl.textContent = "Big Bomb";
  } else if (result.usedSmall) {
    lastEventEl.textContent = "Bomb";
  }

  spawnPiece();
  drawNextPreviews();
  drawPreview(holdCtx, holdType);
}

function holdPiece() {
  if (isCatchMode()) {
    return;
  }
  if (isShadowMode()) {
    skipShadowPiece();
    return;
  }
  if (!running || paused || !canHold) return;
  const currentType = active.type;
  if (holdType) {
    active = createPiece(holdType);
    if ((isZeroGravityMode() || (isCustomMode() && customSettings.levelMode === "fixed" && customSettings.fixedLevel === "zeroGravity")) && active) {
      active.y = 0;
    }
    if (isCascadeEnabledForCurrentGame() || isSquareMode()) {
      if (globalThis.PieceIdCore?.allocatePieceIdForSpecialModes) {
        nextPieceId = globalThis.PieceIdCore.allocatePieceIdForSpecialModes(active, nextPieceId, true);
      } else {
        active.pieceId = nextPieceId;
        nextPieceId += 1;
      }
    }
    holdType = currentType;
    softDropDistance = 0;
    resetDropInputAfterLock();
  } else {
    holdType = currentType;
    resetSoftDropAfterLock();
    spawnPiece();
  }
  tsdAssistDirty = true;
  lockCounter = 0;
  lockResetCount = 0;
  canHold = false;
  if (isTutorialMode() && tutorialState) {
    tutorialState.usedHold = true;
    if (tutorialChapter === 5) {
      tutorialState.usedHoldForCurrentMission = true;
    }
    if (getCurrentTutorialSection() === "backToBack") {
      tutorialState.usedHoldDuringBackToBack = true;
    }
  }
  recordCustomAction("hold", { piece: currentType, hold: holdType });
  drawPreview(holdCtx, holdType);
  drawNextPreviews();
  applyBufferedInputsForSpawn();
  draw();
}

function showCustomPauseSettingsPanel() {
  if (!isCustomMode()) return;
  customActionLogVisible = false;
  syncCustomSettingsControls();
  overlayTitle.textContent = "カスタム設定";
  actionMenu.classList.add("hidden");
  if (customActionLogPanel) customActionLogPanel.classList.add("hidden");
  if (customPauseSettingsPanel) customPauseSettingsPanel.classList.remove("hidden");
}

function showCustomActionLogPanel() {
  if (!isCustomMode()) return;
  customActionLogVisible = true;
  renderCustomActionLog();
  overlayTitle.textContent = "操作ログ";
  actionMenu.classList.add("hidden");
  if (customPauseSettingsPanel) customPauseSettingsPanel.classList.add("hidden");
  if (customActionLogPanel) customActionLogPanel.classList.remove("hidden");
}

function showCustomPauseMenu() {
  customActionLogVisible = false;
  overlayTitle.textContent = "Paused";
  if (customPauseSettingsPanel) customPauseSettingsPanel.classList.add("hidden");
  if (customActionLogPanel) customActionLogPanel.classList.add("hidden");
  actionMenu.classList.remove("hidden");
}

function restartCustomGame() {
  if (!isCustomMode()) return;
  startGame();
  recordCustomAction("restart", { settings: { ...customSettings } });
}

function resetCustomTime() {
  if (!isCustomMode()) return;
  gameTimeMs = 0;
  lastTime = performance.now();
  dropCounter = 0;
  lockCounter = 0;
  recordCustomAction("timeReset");
  updateStats();
}

function resetCustomScore() {
  if (!isCustomMode()) return;
  score = 0;
  softDropDistance = 0;
  zoneScoreBuffer = 0;
  recordCustomAction("scoreReset");
  updateStats();
}

function togglePause() {
  if (!running || gameOver) return;
  paused = !paused;
  if (!paused) {
    customActionLogVisible = false;
    hideBombingReveal();
    hideCustomOverlayPanels();
    overlay.classList.add("hidden");
    actionMenu.classList.add("hidden");
    resultSummaryEl.classList.add("hidden");
    if (isTutorialMode()) {
      if (tutorialChapter === 5) {
        showChapter5Mission();
      } else {
        updateTutorialPanel();
      }
    }
    resumeBgm();
    lastTime = performance.now();
    resumePendingTutorialAdvance();
    requestAnimationFrame(update);
  } else {
    showActionOverlay("Paused", isCustomMode() || isTutorialMode() ? "再開" : "Resume", true);
    pauseBgm();
  }
}

function restartCurrentTutorialSection() {
  if (!isTutorialMode() || tutorialChapter === 5) return;
  paused = false;
  gameOver = false;
  hideOverlay();
  startTutorialSection(getCurrentTutorialSection());
  running = true;
  lastTime = performance.now();
  requestAnimationFrame(update);
}

function returnToTitle() {
  running = false;
  paused = false;
  gameOver = false;
  tutorialChapter = null;
  tutorialSectionIndex = 0;
  tutorialState = null;
  hideTutorialPanel();
  lastResultInfo = null;
  tsdAssistCandidate = null;
  tsdAssistDirty = true;
  selectedGameMode = "マラソン";
  easyModeVariant = null;
  configureBoardForMode();
  active = null;
  board = createBoard();
  nextQueue = [];
  holdType = null;
  score = 0;
  renStreak = 0;
  backToBackStreak = 0;
  perfectClearCount = 0;
  lines = 0;
  level = 1;
  gameTimeMs = 0;
  zoneGauge = 0;
  zoneActive = false;
  zoneTimer = 0;
  zoneConsumedGauge = 0;
  zoneLines = 0;
  zoneMaxLines = 0;
  zoneScoreBuffer = 0;
  zoneExtensionNoticeText = "";
  zoneExtensionNoticeUntil = 0;
  purifyCleansed = 0;
  purifyWave = 0;
  purifySpawnTimer = 0;
  purifyNextSpawnMs = PURIFY_INITIAL_SPAWN_MS;
  purifyCurrentInfections = 0;
  purifyHoleHistory = [];
  nextLargeBombId = 1;
  squareGroups = new Map();
  cascadeResolutionActive = false;
  cascadeResolutionPhase = "idle";
  cascadeResolutionClears = [];
  cascadeResolutionUsedZone = false;
  cascadeClearDelay = 0;
  cascadeGravityTimer = 0;
  if (isCustomMode()) {
    resetCustomActionLog();
  }
  catchCore = null;
  fallingCatchPiece = null;
  catchFallTimer = 0;
  catchCombo = 0;
  clearInputBuffer();
  lastEventEl.textContent = "-";
  resetAllInputState();
  stopBgm();
  updateStats();
  draw();
  drawNextPreviews();
  drawPreview(holdCtx, null);
  showTitleMenu();
}

function update(time = 0) {
  if (!running || paused) return;
  const delta = time - lastTime;
  lastTime = time;
  gameTimeMs += delta;
  if (isTutorialMode() && tutorialChapter === 5 && tutorialState) {
    const safeDelta = Number.isFinite(delta) && delta >= 0 ? delta : 0;
    tutorialState.chapter5TimeRemainingMs = Math.max(0, tutorialState.chapter5TimeRemainingMs - safeDelta);
    if (tutorialState.chapter5TimeRemainingMs <= 0) {
      failTutorialChapter5();
      return;
    }
    updateChapter5MissionPanel();
  }
  if (isCatchMode()) {
    updateCatch(delta);
    draw();
    updateTimeDisplay();
    requestAnimationFrame(update);
    return;
  }
  if (isUltraMode() && gameTimeMs >= ULTRA_DURATION_MS) {
    gameTimeMs = ULTRA_DURATION_MS;
    finishGame("Ultra Complete");
    return;
  }
  if (isPurifyMode() && gameTimeMs >= PURIFY_DURATION_MS) {
    gameTimeMs = PURIFY_DURATION_MS;
    finishGame("Purify Complete");
    return;
  }
  if (zoneActive) {
    const safeDelta = Number.isFinite(delta) && delta >= 0 ? delta : 0;
    if (!Number.isFinite(zoneTimer)) {
      console.error("Invalid zoneTimer", zoneTimer);
      finishZone();
    } else {
      zoneTimer = Math.max(0, zoneTimer - safeDelta);
      console.debug("ZONE TIMER", {
        time,
        lastTime,
        delta,
        zoneTimer,
        finiteDelta: Number.isFinite(delta),
        finiteTimer: Number.isFinite(zoneTimer),
      });
      if (zoneTimer === 0) {
        finishZone();
      }
    }
  }
  if (isCascadeEnabledForCurrentGame() && cascadeResolutionActive) {
    processCascadeResolutionFrame(delta);
    draw();
    updateTimeDisplay();
    updateZoneStatus();
    requestAnimationFrame(update);
    return;
  }
  if (isPurifyMode()) {
    purifySpawnTimer += delta;
    if (!Number.isFinite(purifyNextSpawnMs) || purifyNextSpawnMs <= 0) {
      purifyNextSpawnMs = PURIFY_INITIAL_SPAWN_MS;
    }
    while (purifySpawnTimer >= purifyNextSpawnMs && running && !paused && !gameOver) {
      purifySpawnTimer -= purifyNextSpawnMs;
      if (!addPurifyInfectionLine()) {
        finishGame("Game Over");
        return;
      }
    }
  }
  if (isTutorialMode() && tutorialChapter !== 5) {
    updateHorizontalAutoShift(delta);
    if (isSoftDropActive()) {
      dropCounter += delta;
      while (dropCounter >= SOFT_DROP_INTERVAL_MS && running && !paused && !gameOver) {
        if (!movePieceDown(true)) {
          break;
        }
        dropCounter -= SOFT_DROP_INTERVAL_MS;
      }
    } else {
      dropCounter = 0;
    }
    updateLockDelay(delta);
    draw();
    updateTimeDisplay();
    requestAnimationFrame(update);
    return;
  }
  updateHorizontalAutoShift(delta);
  if (isSoftDropActive()) {
    dropCounter += delta;
    while (dropCounter >= SOFT_DROP_INTERVAL_MS && running && !paused && !gameOver) {
      if (!movePieceDown(true)) {
        break;
      }
      dropCounter -= SOFT_DROP_INTERVAL_MS;
    }
  } else if (hasNaturalGravity()) {
    const baseGravityInterval = zoneActive ? ZONE_GRAVITY_INTERVAL_MS : dropInterval;
    dropCounter += delta;
    if (dropCounter >= baseGravityInterval) {
      if (shouldUseInstantGravity()) {
        movePieceToGround(false);
      } else {
        movePieceDown(false);
      }
      dropCounter = 0;
    }
  } else {
    dropCounter = 0;
  }
  updateLockDelay(delta);
  draw();
  updateTimeDisplay();
  updateZoneStatus();
  requestAnimationFrame(update);
}

function updateCatch(delta) {
  if (!catchCore || !fallingCatchPiece) {
    return;
  }

  const elapsedLevel = Math.min(10, Math.floor(gameTimeMs / 30000) + 1);
  if (elapsedLevel !== level) {
    level = elapsedLevel;
    applyGravityInterval();
    updateStats();
  }

  if (gameTimeMs >= CATCH_DURATION_MS) {
    finishGame("Catch Complete");
    return;
  }

  catchFallTimer += delta;
  const interval = dropInterval;
  while (catchFallTimer >= interval && running && !paused && !gameOver) {
    catchFallTimer -= interval;
    if (checkCatchCollision(fallingCatchPiece)) {
      absorbFallingCatchPiece();
      break;
    }
    if (fallingCatchPiece.y + fallingCatchPiece.matrix.length >= rows) {
      finishGame("Game Over");
      break;
    }
    fallingCatchPiece.y += 1;
  }
}

function drawCell(ctx, x, y, color, size = CELL, bomb = "none", squareType = null, infected = false) {
  const inset = Math.max(2, size * 0.08);
  ctx.fillStyle = color;
  ctx.fillRect(x * size + inset, y * size + inset, size - inset * 2, size - inset * 2);
  ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  ctx.fillRect(x * size + inset, y * size + inset, size - inset * 2, Math.max(3, size * 0.16));
  if (squareType) {
    ctx.strokeStyle = squareType === "gold" ? "#ffd45a" : "#d8e2ef";
    ctx.lineWidth = Math.max(2, size * 0.1);
    ctx.strokeRect(
      x * size + inset + 1,
      y * size + inset + 1,
      size - inset * 2 - 2,
      size - inset * 2 - 2,
    );
    ctx.fillStyle = squareType === "gold" ? "rgba(255, 230, 120, 0.22)" : "rgba(235, 245, 255, 0.2)";
    ctx.fillRect(x * size + inset, y * size + inset, size - inset * 2, size - inset * 2);
  }
  if (bomb !== "none") {
    ctx.beginPath();
    ctx.fillStyle = bomb === "large" ? "#fff3a3" : "#101216";
    ctx.strokeStyle = bomb === "large" ? "#ffcf4a" : "#eef3f7";
    ctx.lineWidth = bomb === "large" ? Math.max(2, size * 0.12) : Math.max(1, size * 0.08);
    const radius = bomb === "large" ? size * 0.34 : size * 0.16;
    ctx.arc(x * size + size / 2, y * size + size / 2, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    if (bomb === "large") {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 245, 190, 0.55)";
      ctx.lineWidth = Math.max(1, size * 0.04);
      ctx.arc(x * size + size / 2, y * size + size / 2, radius * 0.62, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  if (infected) {
    ctx.strokeStyle = "rgba(255, 96, 120, 0.8)";
    ctx.lineWidth = Math.max(1.5, size * 0.07);
    ctx.strokeRect(x * size + inset + 2, y * size + inset + 2, size - inset * 2 - 4, size - inset * 2 - 4);
    ctx.fillStyle = "rgba(255, 96, 120, 0.2)";
    ctx.fillRect(x * size + inset, y * size + inset, size - inset * 2, size - inset * 2);
  }
}

function drawGrid() {
  boardCtx.fillStyle = "#0a0d11";
  boardCtx.fillRect(0, 0, boardCanvas.width, boardCanvas.height);
  boardCtx.strokeStyle = zoneActive ? "#2e5268" : "#171d25";
  boardCtx.lineWidth = 1;
  for (let x = 1; x < cols; x += 1) {
    boardCtx.beginPath();
    boardCtx.moveTo(x * CELL + 0.5, 0);
    boardCtx.lineTo(x * CELL + 0.5, rows * CELL);
    boardCtx.stroke();
  }
  for (let y = 1; y < rows; y += 1) {
    boardCtx.beginPath();
    boardCtx.moveTo(0, y * CELL + 0.5);
    boardCtx.lineTo(cols * CELL, y * CELL + 0.5);
    boardCtx.stroke();
  }
}

function drawShadowSilhouette() {
  if (!isShadowMode()) return;
  boardCtx.save();
  shadowSilhouette.forEach((key) => {
    const [x, y] = key.split(",").map(Number);
    boardCtx.fillStyle = "rgba(210, 220, 235, 0.12)";
    boardCtx.fillRect(x * CELL + 2, y * CELL + 2, CELL - 4, CELL - 4);
  });
  boardCtx.restore();
}

function drawHotlines() {
  if (!isHotlineMode()) return;
  boardCtx.save();
  HOTLINE_ROWS.forEach(({ y, points }) => {
    boardCtx.fillStyle = "rgba(84, 210, 183, 0.12)";
    boardCtx.fillRect(0, y * CELL, cols * CELL, CELL);
    boardCtx.strokeStyle = "rgba(84, 210, 183, 0.55)";
    boardCtx.beginPath();
    boardCtx.moveTo(0, y * CELL + 0.5);
    boardCtx.lineTo(cols * CELL, y * CELL + 0.5);
    boardCtx.stroke();
    boardCtx.fillStyle = "rgba(238, 243, 247, 0.72)";
    boardCtx.font = "700 11px sans-serif";
    boardCtx.textAlign = "right";
    boardCtx.textBaseline = "middle";
    boardCtx.fillText(`+${points}`, cols * CELL - 4, y * CELL + CELL / 2);
  });
  boardCtx.restore();
}

function drawShadowWarnings() {
  if (!isShadowMode()) return;
  boardCtx.save();
  boardCtx.strokeStyle = "rgba(255, 92, 92, 0.7)";
  boardCtx.lineWidth = 2;
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const cell = board[y][x];
      if (!cell || shadowSilhouette.has(`${x},${y}`)) continue;
      boardCtx.strokeRect(x * CELL + 1, y * CELL + 1, CELL - 2, CELL - 2);
    }
  }
  boardCtx.restore();
}

function drawZoneOverlay() {
  if (!zoneActive) return;
  boardCtx.save();
  boardCtx.fillStyle = "rgba(160, 220, 255, 0.16)";
  boardCtx.fillRect(0, 0, cols * CELL, rows * CELL);
  boardCtx.strokeStyle = "rgba(210, 245, 255, 0.5)";
  boardCtx.lineWidth = 2;
  boardCtx.strokeRect(1, 1, cols * CELL - 2, rows * CELL - 2);
  boardCtx.restore();
}

function drawCatch() {
  drawGrid();
  boardCtx.save();
  if (catchCore) {
    const square = detectCatchSquares();
    if (square) {
      boardCtx.fillStyle = "rgba(255, 255, 255, 0.08)";
      boardCtx.fillRect(square.x * CELL, square.y * CELL, CELL * 4, CELL * 4);
      boardCtx.strokeStyle = "rgba(210, 235, 255, 0.45)";
      boardCtx.lineWidth = 2;
      boardCtx.strokeRect(square.x * CELL + 1, square.y * CELL + 1, CELL * 4 - 2, CELL * 4 - 2);
    }
    getCatchAbsoluteCells().forEach((cell) => {
      drawCell(boardCtx, cell.x, cell.y, COLORS[getCellType(cell)] ?? COLORS.CORE, CELL);
    });
  }
  if (fallingCatchPiece) {
    drawMatrix(boardCtx, fallingCatchPiece.matrix, fallingCatchPiece.x, fallingCatchPiece.y, fallingCatchPiece.type);
  }
  boardCtx.restore();
}

function drawMatrix(ctx, matrix, offsetX, offsetY, type, size = CELL, bombCells = null) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value && offsetY + y >= 0) {
        const bomb = bombCells?.has(`${x},${y}`) ? "small" : "none";
        drawCell(ctx, offsetX + x, offsetY + y, COLORS[type], size, bomb);
      }
    });
  });
}

function drawOverlayMatrix(ctx, matrix, offsetX, offsetY, color, size = CELL) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value && offsetY + y >= 0) {
        drawCell(ctx, offsetX + x, offsetY + y, color, size);
      }
    });
  });
}

function cloneBoard(boardState) {
  return boardState.map((row) => row.slice());
}

function countFullLines(boardState) {
  return boardState.reduce((count, row) => count + (row.every(Boolean) ? 1 : 0), 0);
}

function collidesOnBoard(boardState, nextX, nextY, matrix) {
  for (let y = 0; y < matrix.length; y += 1) {
    for (let x = 0; x < matrix[y].length; x += 1) {
      if (!matrix[y][x]) continue;
      const boardX = nextX + x;
      const boardY = nextY + y;
      if (boardX < 0 || boardX >= cols || boardY >= rows) return true;
      if (boardY >= 0 && boardState[boardY][boardX]) return true;
    }
  }
  return false;
}

function mergePlacementToBoard(boardState, placement) {
  placement.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (!value) return;
      const boardY = placement.y + y;
      const boardX = placement.x + x;
      if (boardY < 0 || boardY >= rows || boardX < 0 || boardX >= cols) return;
      boardState[boardY][boardX] = createCell({ type: placement.type });
    });
  });
}

function getAllLegalPlacementsForPiece(piece, boardState) {
  if (!piece || !piece.matrix) return [];
  const placements = [];
  let matrix = cloneMatrix(piece.matrix);
  let rotationState = piece.rotationState ?? "0";
  const startIndex = ROTATION_STATES.indexOf(rotationState);

  for (let rotationIndex = 0; rotationIndex < 4; rotationIndex += 1) {
    const testMatrix = rotationIndex === 0 ? matrix : rotate(matrix, 1);
    matrix = testMatrix;
    rotationState = ROTATION_STATES[(startIndex + rotationIndex) % ROTATION_STATES.length];
    for (let x = -4; x < cols + 4; x += 1) {
      let y = -4;
      while (!collidesOnBoard(boardState, x, y + 1, testMatrix)) {
        y += 1;
      }
      if (!collidesOnBoard(boardState, x, y, testMatrix)) {
        placements.push({
          x,
          y,
          matrix: cloneMatrix(testMatrix),
          rotationState,
          type: piece.type,
        });
      }
    }
  }

  return placements;
}

function findTsdTemplateSlots(boardState) {
  const slots = [];
  const patterns = [
    {
      roofSide: "left",
      rows: [
        [1, 1, 0, 0, 0],
        [1, 0, 0, 0, 1],
        [1, 1, 0, 1, 1],
      ],
    },
    {
      roofSide: "right",
      rows: [
        [0, 0, 0, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 0, 1, 1],
      ],
    },
  ];

  for (let y = 0; y <= rows - 3; y += 1) {
    for (let x = 0; x <= cols - 5; x += 1) {
      for (const pattern of patterns) {
        let matched = true;
        for (let py = 0; py < 3 && matched; py += 1) {
          for (let px = 0; px < 5; px += 1) {
            const expected = pattern.rows[py][px];
            const occupied = Boolean(boardState[y + py][x + px]);
            if (expected === 1 && !occupied) {
              matched = false;
              break;
            }
            if (expected === 0 && occupied) {
              matched = false;
              break;
            }
          }
        }
        if (matched) {
          slots.push({
            x,
            y,
            roofSide: pattern.roofSide,
            key: `${x},${y},${pattern.roofSide}`,
          });
        }
      }
    }
  }

  return slots;
}

function getBoardHoleCount(boardState) {
  let holes = 0;
  for (let x = 0; x < cols; x += 1) {
    let blockSeen = false;
    for (let y = 0; y < rows; y += 1) {
      if (boardState[y][x]) {
        blockSeen = true;
      } else if (blockSeen) {
        holes += 1;
      }
    }
  }
  return holes;
}

function getBoardMaxHeight(boardState) {
  for (let y = 0; y < rows; y += 1) {
    if (boardState[y].some(Boolean)) {
      return rows - y;
    }
  }
  return 0;
}

function chooseBestTsdAssistCandidate(candidates) {
  if (!candidates.length) return null;
  return candidates
    .slice()
    .sort((a, b) => {
      if (b.slot.y !== a.slot.y) return b.slot.y - a.slot.y;
      if (a.holes !== b.holes) return a.holes - b.holes;
      if (a.maxHeight !== b.maxHeight) return a.maxHeight - b.maxHeight;
      return a.order - b.order;
    })[0] ?? null;
}

function shouldUseTsdAssist() {
  return (
    tsdAssistEnabled &&
    Boolean(active) &&
    running &&
    !paused &&
    !gameOver &&
    !isTutorialMode() &&
    !isCatchMode() &&
    !isShadowMode() &&
    !isBomblissMode() &&
    !isCascadeMode() &&
    !isHotlineMode() &&
    !isZoneMode() &&
    !isSquareMode() &&
    !isCheeseRaceMode() &&
    !isPurifyMode() &&
    !isEasyTetrisMode() &&
    (
      selectedGameMode === "マラソン" ||
      selectedGameMode === "スプリント" ||
      selectedGameMode === "ウルトラ" ||
      selectedGameMode === "無重力" ||
      isPracticeMode()
    )
  );
}

function updateTsdAssistCandidate() {
  if (!shouldUseTsdAssist()) {
    tsdAssistCandidate = null;
    tsdAssistDirty = false;
    return;
  }
  if (!tsdAssistDirty) {
    return;
  }

  const placements = getAllLegalPlacementsForPiece(active, board);
  const beforeSlots = findTsdTemplateSlots(board);
  const beforeSlotKeys = new Set(beforeSlots.map((slot) => slot.key));
  const candidates = [];
  placements.forEach((placement, index) => {
    const boardCopy = cloneBoard(board);
    mergePlacementToBoard(boardCopy, placement);
    if (countFullLines(boardCopy) > 0) {
      return;
    }
    const afterSlots = findTsdTemplateSlots(boardCopy);
    const newSlots = afterSlots.filter((slot) => !beforeSlotKeys.has(slot.key));
    if (!newSlots.length) {
      return;
    }

    newSlots.forEach((slot) => {
      candidates.push({
        currentPlacement: placement,
        slot,
        holes: getBoardHoleCount(boardCopy),
        maxHeight: getBoardMaxHeight(boardCopy),
        order: index,
      });
    });
  });
  tsdAssistCandidate = chooseBestTsdAssistCandidate(candidates);
  if (window.__TSD_ASSIST_DEBUG__) {
    console.debug("TSD Assist", {
      currentPlacements: placements.length,
      beforeSlots: beforeSlots.length,
      afterCandidates: candidates.length,
      finalCandidate: tsdAssistCandidate,
    });
  }
  tsdAssistDirty = false;
}

function drawGhost() {
  if (!ghostAssistEnabled) return;
  const ghost = { ...active, y: active.y };
  while (!collides(active, active.x, ghost.y + 1, active.matrix)) {
    ghost.y += 1;
  }
  boardCtx.globalAlpha = 0.22;
  drawMatrix(boardCtx, active.matrix, active.x, ghost.y, active.type);
  boardCtx.globalAlpha = 1;
}

function drawTsdAssist() {
  if (!shouldUseTsdAssist()) return;
  updateTsdAssistCandidate();
  if (!tsdAssistCandidate) return;
  boardCtx.globalAlpha = 0.14;
  drawOverlayMatrix(
    boardCtx,
    tsdAssistCandidate.currentPlacement.matrix,
    tsdAssistCandidate.currentPlacement.x,
    tsdAssistCandidate.currentPlacement.y,
    "#f58cff",
  );
  boardCtx.globalAlpha = 1;
}

function draw() {
  if (isCatchMode()) {
    drawCatch();
    return;
  }
  drawGrid();
  drawHotlines();
  drawShadowSilhouette();
  board.forEach((row, y) => {
    row.forEach((cell, x) => {
      const type = getCellType(cell);
      if (type) {
        const color = getCellInfected(cell) ? "#8f4b56" : COLORS[type];
        drawCell(boardCtx, x, y, color, CELL, getCellBomb(cell), getCellSquareType(cell), getCellInfected(cell));
      }
    });
  });
  if (active) {
    drawTsdAssist();
    drawGhost();
    drawMatrix(boardCtx, active.matrix, active.x, active.y, active.type, CELL, active.bombCells);
  }
  drawShadowWarnings();
  drawZoneOverlay();
}

function drawPreview(ctx, type) {
  const previewSize = ctx.canvas.width;
  const cellSize = Math.floor(previewSize / 5);
  ctx.clearRect(0, 0, previewSize, previewSize);
  ctx.fillStyle = "#242b36";
  ctx.fillRect(0, 0, previewSize, previewSize);
  if (!type) return;

  const matrix = SHAPES[type];
  const width = matrix[0].length;
  const height = matrix.length;
  const offsetX = Math.floor((previewSize / cellSize - width) / 2);
  const offsetY = Math.floor((previewSize / cellSize - height) / 2);
  drawMatrix(ctx, matrix, offsetX, offsetY, type, cellSize);
}

function drawNextPreviews() {
  nextCtxs.forEach((ctx, index) => {
    drawPreview(ctx, nextQueue[index]);
  });
}

function updateStats() {
  scoreEl.textContent = score.toLocaleString("ja-JP");
  linesEl.textContent = isBomblissMode() ? bomblissStageIndex + 1 : lines;
  levelEl.textContent = isBomblissMode()
    ? "-"
    : isTutorialMode()
      ? tutorialChapter === 5 ? level : "-"
    : isCustomMode() && customSettings.levelMode === "fixed" && customSettings.fixedLevel === "zeroGravity"
      ? "無重力"
      : isMasterMode()
        ? "Master"
        : level;
  if (isShadowMode()) {
    linesEl.textContent = `${currentShadowStageIndex + 1} / ${SHADOW_STAGES.length}`;
    levelEl.textContent = "1";
  }
  updateTimeDisplay();
  updateLineGoalDisplay();
}

function startGame() {
  seedRng(`${Date.now()}-${performance.now().toFixed(3)}`);
  configureBoardForMode();
  board = createBoard();
  nextQueue = [];
  tsdAssistCandidate = null;
  tsdAssistDirty = true;
  clearInputBuffer();
  lastResultInfo = null;
  gameStatsFinalized = false;
  holdType = null;
  canHold = true;
  score = 0;
  renStreak = 0;
  backToBackStreak = 0;
  perfectClearCount = 0;
  lines = 0;
  gameTimeMs = 0;
  bomblissStageIndex = 0;
  bomblissPoints = 100;
  nextPieceId = 1;
  nextSquareId = 1;
  squareGroups = new Map();
  currentShadowStageIndex = selectedShadowStageIndex;
  shadowStage = null;
  shadowSilhouette = new Set();
  shadowShadedCells = 0;
  shadowInsideCells = 0;
  shadowOutsideCells = 0;
  shadowMatchPercent = 0;
  shadowSkipCount = 0;
  cheeseGoalLines = Number(cheeseGoalSelect.value);
  cheeseClearedLines = 0;
  cheeseGeneratedLines = 0;
  cheeseHoleHistory = [];
  purifyCleansed = 0;
  purifyWave = 0;
  purifySpawnTimer = 0;
  purifyNextSpawnMs = PURIFY_INITIAL_SPAWN_MS;
  purifyCurrentInfections = 0;
  purifyHoleHistory = [];
  hotlinePoints = 0;
  hotlineProgress = 0;
  hotlineTarget = 5;
  zoneGauge = 0;
  zoneActive = false;
  zoneTimer = 0;
  zoneConsumedGauge = 0;
  zoneLines = 0;
  zoneMaxLines = 0;
  zoneScoreBuffer = 0;
  zoneExtensionNoticeText = "";
  zoneExtensionNoticeUntil = 0;
  nextLargeBombId = 1;
  squareGroups = new Map();
  cascadeResolutionActive = false;
  cascadeResolutionPhase = "idle";
  cascadeResolutionClears = [];
  cascadeResolutionUsedZone = false;
  cascadeClearDelay = 0;
  cascadeGravityTimer = 0;
  if (isCustomMode()) {
    resetCustomActionLog();
  }
  catchCore = null;
  fallingCatchPiece = null;
  catchFallTimer = 0;
  catchCombo = 0;
  lastEventEl.textContent = canUseZone() ? "Zone 0%" : "-";
  if (
    isSprintMode() ||
    isCheeseRaceMode() ||
    isPurifyMode() ||
    isShadowMode() ||
    isUltraMode() ||
    isCascadeMode() ||
    isHotlineMode() ||
    isZoneMode() ||
    isSquareMode() ||
    isCatchMode()
  ) {
    level = 1;
  } else if (isCustomMode()) {
    level = customSettings.levelMode === "fixed" ? getCustomFixedLevelNumber() : calculateMarathonLevel(lines);
  } else if (fixedLevelEnabled) {
    level = fixedLevelValue === "master" ? 15 : Number(fixedLevelValue);
    if (isEasyTetrisMode()) {
      level = fixedLevelValue === "master" ? 10 : Math.min(level, 10);
    }
  } else {
    level = 1;
  }
  applyGravityInterval();
  dropCounter = 0;
  lockCounter = 0;
  lockResetCount = 0;
  softDropDistance = 0;
  resetAllInputState();
  lastTime = performance.now();
  running = true;
  paused = false;
  gameOver = false;
  startBgm();
  hideOverlay();
  if (isBomblissMode()) {
    loadBomblissStage(bomblissStageIndex);
  }
  if (isCheeseRaceMode()) {
    seedCheeseGarbage();
  }
  if (isPurifyMode()) {
    seedPurifyGarbage();
  }
  if (isShadowMode()) {
    loadShadowStage(selectedShadowStageIndex);
  }
  updateStats();
  fillQueue();
  if (isCatchMode()) {
    catchCore = createCatchCore();
    spawnCatchPiece();
  } else {
    spawnPiece();
  }
  drawNextPreviews();
  drawPreview(holdCtx, holdType);
  draw();
  requestAnimationFrame(update);
}

function startGameWithReady() {
  shell.classList.remove("menu-screen");
  showCountdownOverlay("Ready?");
  window.setTimeout(() => {
    showCountdownOverlay("Go!");
    window.setTimeout(() => {
      startGame();
    }, 650);
  }, 900);
}

function getFinishSummary() {
  const resultInfo = lastResultInfo ?? finalizeResultRecord();
  const result = resultInfo.result;
  const rows = [];
  if (!result) return rows.join("\n");

  switch (result.mode) {
    case "allClearSprint":
    case "sprint":
      rows.push(`Time ${formatTime(result.timeMs ?? gameTimeMs)}`);
      rows.push(`Lines ${result.lines ?? lines}`);
      break;
    case "cheese":
      rows.push(`Time ${formatTime(result.timeMs ?? gameTimeMs)}`);
      rows.push(`Cheese ${result.cheeseClearedLines ?? cheeseClearedLines}/${result.cheeseGoalLines ?? cheeseGoalLines}`);
      break;
    case "purify":
      rows.push(`Time ${formatTime(result.timeMs ?? gameTimeMs)}`);
      rows.push(`Purified ${result.purifyCleansed ?? purifyCleansed}`);
      rows.push(`Score ${result.score ?? score}`);
      break;
    case "ultra":
      rows.push(`Score ${result.score ?? score}`);
      rows.push(`Lines ${result.lines ?? lines}`);
      break;
    case "catch":
      rows.push(`Score ${result.score ?? score}`);
      rows.push(`Explosions ${result.catchClears ?? lines}`);
      rows.push(`Core ${result.coreSize ?? (catchCore?.cells.length ?? 0)}`);
      break;
    case "shadow":
      rows.push(`Stage ${(result.stageIndex ?? currentShadowStageIndex) + 1}/${SHADOW_STAGES.length}`);
      rows.push(`Match ${result.matchPercent ?? shadowMatchPercent}%`);
      rows.push(`Score ${result.score ?? score}`);
      break;
    case "bombliss":
      rows.push(`Stage ${(result.stageIndex ?? bomblissStageIndex) + 1}`);
      rows.push(`Points ${Math.max(0, result.bomblissPoints ?? bomblissPoints)}`);
      rows.push(`Score ${result.score ?? score}`);
      break;
    case "hotline":
      rows.push(`Hot-Line ${result.hotlinePoints ?? hotlinePoints} HP`);
      rows.push(`Level ${result.level ?? level}`);
      rows.push(`Score ${result.score ?? score}`);
      break;
    case "zone":
      rows.push(`Score ${result.score ?? score}`);
      rows.push(`Zone ${result.maxZoneLines ?? zoneMaxLines}`);
      break;
    case "square":
    case "cascade":
    case "marathon":
    default:
      rows.push(`Time ${formatTime(gameTimeMs)}`);
      rows.push(`Score ${result.score ?? score}`);
      rows.push(`Lines ${result.lines ?? lines}`);
      break;
  }

  rows.push(`Best ${formatBestRecordValue(resultInfo.previousBest)}`);
  if (resultInfo.newBest) {
    rows.push("New Best!");
  }
  return rows.join("\n");
}

function finishGame(title = "Game Over") {
  if (isTutorialMode() && tutorialChapter === 5) {
    failTutorialChapter5();
    return;
  }
  running = false;
  gameOver = true;
  if (!gameStatsFinalized) {
    finalizePlayerStatsForGame();
    gameStatsFinalized = true;
  }
  zoneActive = false;
  zoneTimer = 0;
  zoneConsumedGauge = 0;
  zoneExtensionNoticeText = "";
  zoneExtensionNoticeUntil = 0;
  nextLargeBombId = 1;
  cascadeResolutionActive = false;
  cascadeResolutionPhase = "idle";
  cascadeResolutionClears = [];
  cascadeResolutionUsedZone = false;
  cascadeClearDelay = 0;
  cascadeGravityTimer = 0;
  clearInputBuffer();
  updateBestRecordIfNeeded();
  if (isBomblissMode() && title === "Game Over") {
    lastEventEl.textContent = "Game Over";
  }
  resetAllInputState();
  stopBgm();
  updateStats();
  const summary = getFinishSummary();
  showActionOverlay(title, "Restart", false, summary);
}

document.addEventListener("keydown", (event) => {
  if (isEditableTarget(event.target)) {
    return;
  }
  const action = getActionForCode(event.code);
  if (waitingForKeybind) {
    event.preventDefault();
    if (event.code === "Escape") {
      waitingForKeybind = null;
      updateKeybindDisplay();
      return;
    }
    if (event.code === "Backspace" || event.code === "Delete") {
      clearKeyBinding(waitingForKeybind);
      waitingForKeybind = null;
      updateKeybindDisplay();
      return;
    }
    addKeyBinding(waitingForKeybind, event.code);
    waitingForKeybind = null;
    updateKeybindDisplay();
    return;
  }

  if (isTutorialMode() && action) {
    event.preventDefault();
    if (!isTutorialActionAllowed(action)) {
      return;
    }
  }

  if (isCatchMode() && running) {
    switch (event.code) {
      case "KeyA":
        event.preventDefault();
        if (paused) return;
        moveCatchCore(-1, 0);
        draw();
        return;
      case "KeyD":
        event.preventDefault();
        if (paused) return;
        moveCatchCore(1, 0);
        draw();
        return;
      case "KeyS":
        event.preventDefault();
        if (paused) return;
        moveCatchCore(0, 1);
        draw();
        return;
      case "KeyW":
        event.preventDefault();
        if (paused) return;
        moveCatchCore(0, -1);
        draw();
        return;
      case "KeyJ":
        event.preventDefault();
        if (paused) return;
        rotateCatchCore(1);
        draw();
        return;
      case "KeyK":
        event.preventDefault();
        if (paused) return;
        rotateCatchCore(-1);
        draw();
        return;
      case "KeyP":
        event.preventDefault();
        togglePause();
        return;
      default:
        break;
    }
  }

  if (action) {
    const wasAlreadyHeld = heldKeyCodes.has(event.code);
    heldKeyCodes.add(event.code);
    syncHeldFlags();
    event.preventDefault();
    if (event.repeat || wasAlreadyHeld) {
      return;
    }
  }

  if (!action) return;

  if (isBufferedAction(action) && !isCatchMode() && running && !paused && !gameOver && shouldBufferSpawnInput()) {
    if (action === "moveLeft") {
      bufferInput(action, { direction: "left" });
    } else if (action === "moveRight") {
      bufferInput(action, { direction: "right" });
    } else {
      bufferInput(action);
    }
    return;
  }

  switch (action) {
    case "moveLeft":
      setActiveDirection("left");
      break;
    case "moveRight":
      setActiveDirection("right");
      break;
    case "softDrop":
      if (softDropSuppressedUntilKeyup) {
        softDropHeld = false;
        return;
      }
      dropCounter = 0;
      syncHeldFlags();
      if (running && !paused) recordCustomAction("softDropStart", active ? { piece: active.type, x: active.x, y: active.y } : {});
      break;
    case "hardDrop":
      hardDrop();
      break;
    case "rotateLeft":
      rotatePiece(-1);
      break;
    case "rotateRight":
      rotatePiece(1);
      break;
    case "hold":
      holdPiece();
      break;
    case "zone":
      activateZone();
      break;
    case "pause":
      togglePause();
      break;
    default:
      break;
  }
});

document.addEventListener("keyup", (event) => {
  const action = getActionForCode(event.code);
  if (!action) return;

  event.preventDefault();
  heldKeyCodes.delete(event.code);

  if (action === "softDrop" && !isActionPhysicallyHeld("softDrop")) {
    softDropSuppressedUntilKeyup = false;
    dropCounter = 0;
    if (running && !paused) recordCustomAction("softDropEnd", active ? { piece: active.type, x: active.x, y: active.y } : {});
  }

  syncHeldFlags();

  if (isCatchMode()) {
    return;
  }
  switch (action) {
    case "moveLeft":
      releaseDirection("left");
      break;
    case "moveRight":
      releaseDirection("right");
      break;
    default:
      break;
  }
});

window.addEventListener("blur", () => {
  resetAllInputState();
});

startButton.addEventListener("click", () => {
  if (isTutorialMode() && gameOver) {
    startTutorialChapter(tutorialChapter ?? 1);
    return;
  }
  if (paused) {
    togglePause();
  } else {
    startGame();
  }
});

restartButton.addEventListener("click", () => {
  if (isTutorialMode() && gameOver) {
    showTutorialChapterMenu();
    return;
  }
  if (paused && isTutorialMode() && !gameOver) {
    restartCurrentTutorialSection();
    return;
  }
  startGame();
});

customSettingsButton?.addEventListener("click", () => {
  showCustomPauseSettingsPanel();
});

customRestartButton?.addEventListener("click", () => {
  if (paused && isTutorialMode() && !gameOver) {
    running = false;
    paused = false;
    gameOver = false;
    tutorialState = null;
    hideTutorialPanel();
    showTutorialChapterMenu();
    return;
  }
  restartCustomGame();
});

customTimeResetButton?.addEventListener("click", () => {
  resetCustomTime();
});

customScoreResetButton?.addEventListener("click", () => {
  resetCustomScore();
});

customActionLogButton?.addEventListener("click", () => {
  showCustomActionLogPanel();
});

customSettingsBackButton?.addEventListener("click", () => {
  showCustomPauseMenu();
});

customActionLogCloseButton?.addEventListener("click", () => {
  showCustomPauseMenu();
});

titleButton.addEventListener("click", () => {
  returnToTitle();
});

playerSwitchButton.addEventListener("click", () => {
  openPlayerSwitchMenu();
});

playerSwitchFromOptionsButton.addEventListener("click", () => {
  openPlayerSwitchMenu();
});

if (onePlayerButton) {
  onePlayerButton.addEventListener("click", () => {
    showOnePlayerMenu();
  });
}

practiceButton?.addEventListener("click", () => {
  showPracticeMenu();
});

practiceBackButton?.addEventListener("click", () => {
  showTitleMenu();
});

tutorialButton?.addEventListener("click", () => {
  showTutorialChapterMenu();
});

tutorialChapter1Button?.addEventListener("click", () => {
  startTutorialChapter1();
});

tutorialChapter2Button?.addEventListener("click", () => {
  startTutorialChapter(2);
});

tutorialChapter3Button?.addEventListener("click", () => {
  startTutorialChapter(3);
});

tutorialChapter4Button?.addEventListener("click", () => {
  startTutorialChapter(4);
});

tutorialChapter5Button?.addEventListener("click", () => {
  startTutorialChapter(5);
});

tutorialChapterBackButton?.addEventListener("click", () => {
  showPracticeMenu();
});

tutorialNextButton?.addEventListener("click", () => {
  if (!isTutorialMode() || getCurrentTutorialSection() !== "screenExplanation") return;
  advanceTutorialSection();
});

if (myPageButton) {
  myPageButton.addEventListener("click", () => {
    showMyPage("title");
  });
}

if (myPageFromOptionsButton) {
  myPageFromOptionsButton.addEventListener("click", () => {
    showMyPage("options");
  });
}

if (myPageBackButton) {
  myPageBackButton.addEventListener("click", () => {
    if (myPageReturnTarget === "options") {
      showGlobalOptionsMenu();
    } else {
      showTitleMenu();
    }
  });
}

if (tsdAssistToggleButton) {
  tsdAssistToggleButton.addEventListener("click", () => {
    tsdAssistEnabled = !tsdAssistEnabled;
    tsdAssistDirty = true;
    saveSettings();
    updateOptionButtons();
    draw();
  });
}

if (keybindMenuButton) {
  keybindMenuButton.addEventListener("click", () => {
    showKeybindMenu();
  });
}

if (keybindMenuBackButton) {
  keybindMenuBackButton.addEventListener("click", () => {
    waitingForKeybind = null;
    updateKeybindDisplay();
    showGlobalOptionsMenu();
  });
}

keybindButtons.forEach((button) => {
  button.addEventListener("click", () => {
    waitingForKeybind = button.dataset.action;
    updateKeybindDisplay();
  });
});

exportSaveButton?.addEventListener("click", () => {
  exportSaveData();
});

importSaveButton?.addEventListener("click", () => {
  saveImportInput?.click();
});

saveImportInput?.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  importSaveDataFromFile(file);

  event.target.value = "";
});

globalOptionsButton.addEventListener("click", () => {
  showGlobalOptionsMenu();
});

globalOptionsBackButton.addEventListener("click", () => {
  waitingForKeybind = null;
  updateKeybindDisplay();
  showTitleMenu();
});

marathonButton.addEventListener("click", () => {
  easyModeVariant = null;
  optionMenuReturnTarget = "onePlayer";
  showOptionMenu("マラソン");
});

sprintButton.addEventListener("click", () => {
  easyModeVariant = null;
  optionMenuReturnTarget = "onePlayer";
  showOptionMenu("スプリント");
});

ultraButton.addEventListener("click", () => {
  easyModeVariant = null;
  optionMenuReturnTarget = "onePlayer";
  showOptionMenu("ウルトラ");
});

easyTetrisButton.addEventListener("click", () => {
  showEasyModeMenu();
});

if (onePlayerBackButton) {
  onePlayerBackButton.addEventListener("click", () => {
    showTitleMenu();
  });
}

catchButton.addEventListener("click", () => {
  easyModeVariant = null;
  optionMenuReturnTarget = "onePlayer";
  showOptionMenu("Catch");
});

easyModeBackButton.addEventListener("click", () => {
  showTitleMenu();
});

easyMarathonButton.addEventListener("click", () => {
  easyModeVariant = "marathon";
  optionMenuReturnTarget = "onePlayer";
  showOptionMenu("やさしいマラソン");
});

cheeseRaceButton.addEventListener("click", () => {
  easyModeVariant = null;
  cheeseRacePurifyEnabled = false;
  optionMenuReturnTarget = "onePlayer";
  showOptionMenu("Cheese Race");
});

if (cheesePurifyToggleButton) {
  cheesePurifyToggleButton.addEventListener("click", () => {
    cheeseRacePurifyEnabled = !cheeseRacePurifyEnabled;
    updateOptionButtons();
    updateOptionVisibility();
  });
}

shadowButton.addEventListener("click", () => {
  easyModeVariant = null;
  optionMenuReturnTarget = "onePlayer";
  showOptionMenu("Shadow");
});

allClearSprintButton.addEventListener("click", () => {
  easyModeVariant = "allClearSprint";
  optionMenuReturnTarget = "onePlayer";
  showOptionMenu("オールクリアスプリント");
});

bomblissButton.addEventListener("click", () => {
  easyModeVariant = null;
  optionMenuReturnTarget = "onePlayer";
  showOptionMenu("ボンブリス");
});

cascadeButton.addEventListener("click", () => {
  easyModeVariant = null;
  optionMenuReturnTarget = "onePlayer";
  showOptionMenu("カスケード");
});

hotlineButton.addEventListener("click", () => {
  easyModeVariant = null;
  optionMenuReturnTarget = "onePlayer";
  showOptionMenu("ホットライン");
});

zoneButton.addEventListener("click", () => {
  easyModeVariant = null;
  optionMenuReturnTarget = "onePlayer";
  showOptionMenu("ゾーン");
});

customButton?.addEventListener("click", () => {
  easyModeVariant = null;
  customSettings = normalizeCustomSettings(customSettings);
  optionMenuReturnTarget = "practice";
  showOptionMenu("カスタム");
});

zeroGravityButton?.addEventListener("click", () => {
  easyModeVariant = null;
  optionMenuReturnTarget = "practice";
  showOptionMenu("無重力");
});

squareButton.addEventListener("click", () => {
  easyModeVariant = null;
  optionMenuReturnTarget = "onePlayer";
  showOptionMenu("スクエア");
});

optionStartButton.addEventListener("click", () => {
  startGameWithReady();
});

optionBackButton.addEventListener("click", () => {
  if (optionMenuReturnTarget === "practice") {
    showPracticeMenu();
  } else {
    showOnePlayerMenu();
  }
});

createProfileButton.addEventListener("click", () => {
  const name = normalizePlayerName(playerNameInput?.value);
  if (!name) return;
  const profiles = getPlayerProfiles();
  const profile = {
    id: makeProfileId(),
    name,
  };
  profiles.push(profile);
  savePlayerProfiles(profiles);
  setCurrentPlayer({
    id: profile.id,
    name: profile.name,
    isGuest: false,
  });
  if (playerNameInput) {
    playerNameInput.value = "";
  }
  showTitleMenu();
});

guestPlayButton.addEventListener("click", () => {
  createGuestPlayer();
  showTitleMenu();
});

fixedLevelToggle.addEventListener("change", () => {
  fixedLevelEnabled = fixedLevelToggle.checked;
  updateOptionVisibility();
});

fixedLevelSelect.addEventListener("change", () => {
  fixedLevelValue = fixedLevelSelect.value;
});

customLevelModeSelect?.addEventListener("change", () => {
  applyCustomSettingsChange("levelMode", customLevelModeSelect.value);
  updateOptionVisibility();
});

customFixedLevelSelect?.addEventListener("change", () => {
  applyCustomSettingsChange("fixedLevel", customFixedLevelSelect.value);
});

customCascadeToggleButton?.addEventListener("click", () => {
  applyCustomSettingsChange("cascadeEnabled", !customSettings.cascadeEnabled);
  updateOptionVisibility();
});

customZoneToggleButton?.addEventListener("click", () => {
  applyCustomSettingsChange("zoneEnabled", !customSettings.zoneEnabled);
  updateOptionVisibility();
});

pauseCustomLevelModeSelect?.addEventListener("change", () => {
  applyCustomSettingsChange("levelMode", pauseCustomLevelModeSelect.value);
});

pauseCustomFixedLevelSelect?.addEventListener("change", () => {
  applyCustomSettingsChange("fixedLevel", pauseCustomFixedLevelSelect.value);
});

pauseCustomCascadeToggleButton?.addEventListener("click", () => {
  applyCustomSettingsChange("cascadeEnabled", !customSettings.cascadeEnabled);
});

pauseCustomZoneToggleButton?.addEventListener("click", () => {
  applyCustomSettingsChange("zoneEnabled", !customSettings.zoneEnabled);
});

sprintGoalRange.addEventListener("input", () => {
  sprintGoalLines = Number(sprintGoalRange.value);
  updateOptionButtons();
  updateStats();
});

cheeseGoalSelect.addEventListener("change", () => {
  cheeseGoalLines = Number(cheeseGoalSelect.value);
  updateOptionButtons();
  updateStats();
});

shadowStageSelect.addEventListener("change", () => {
  selectedShadowStageIndex = Number(shadowStageSelect.value);
});

difficultyToggleButton.addEventListener("click", () => {
  easyDifficulty = easyDifficulty === "easy" ? "normal" : "easy";
  updateOptionButtons();
});

ghostToggleButton.addEventListener("click", () => {
  ghostAssistEnabled = !ghostAssistEnabled;
  updateOptionButtons();
  draw();
});

endlessToggleButton.addEventListener("click", () => {
  endlessEnabled = !endlessEnabled;
  updateOptionButtons();
  updateStats();
});

board = createBoard();
nextQueue = [];
holdType = null;
score = 0;
perfectClearCount = 0;
nextPieceId = 1;
nextSquareId = 1;
hotlinePoints = 0;
hotlineProgress = 0;
hotlineTarget = 5;
zoneGauge = 0;
zoneActive = false;
zoneTimer = 0;
zoneLines = 0;
zoneScoreBuffer = 0;
lines = 0;
level = 1;
gameTimeMs = 0;
fixedLevelEnabled = fixedLevelToggle.checked;
fixedLevelValue = fixedLevelSelect.value;
sprintGoalLines = Number(sprintGoalRange.value);
loadKeyBindingsFromSettings();
populateShadowStageSelect();
applyGravityInterval();
configureBoardForMode();
draw();
drawNextPreviews();
drawPreview(holdCtx, null);
updateOptionButtons();
updateOptionVisibility();
updateKeybindDisplay();
updateStats();
showLoginMenu();
