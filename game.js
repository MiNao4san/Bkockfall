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
const BEST_RECORDS_STORAGE_KEY = "blockfall.bestRecords.v1";
const PLAYER_STATS_STORAGE_KEY = "blockfall.playerStats.v1";
const PLAYER_PROFILES_STORAGE_KEY = "blockfall.playerProfiles.v1";
const PLAYER_PROFILES_STORAGE_KEY_LEGACY = "blockfall.playerProfiles";
const LAST_PLAYER_STORAGE_KEY = "blockfall.lastPlayer.v1";
const LAST_PLAYER_STORAGE_KEY_LEGACY = "blockfall.lastPlayer";
const SETTINGS_STORAGE_KEY = "blockfall.settings.v1";
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
const catchButton = document.querySelector("#catchButton");
const allClearSprintButton = document.querySelector("#allClearSprintButton");
const easyMarathonButton = document.querySelector("#easyMarathonButton");
const bomblissButton = document.querySelector("#bomblissButton");
const cascadeButton = document.querySelector("#cascadeButton");
const zeroGravityButton = document.querySelector("#zeroGravityButton");
const hotlineButton = document.querySelector("#hotlineButton");
const zoneButton = document.querySelector("#zoneButton");
const squareButton = document.querySelector("#squareButton");
const easyModeBackButton = document.querySelector("#easyModeBackButton");
const onePlayerBackButton = document.querySelector("#onePlayerBackButton");
const cheeseRaceButton = document.querySelector("#cheeseRaceButton");
const shadowButton = document.querySelector("#shadowButton");
const actionMenu = document.querySelector("#actionMenu");
const resultSummaryEl = document.querySelector("#resultSummary");
const startButton = document.querySelector("#startButton");
const restartButton = document.querySelector("#restartButton");
const titleButton = document.querySelector("#titleButton");
const keybindButtons = document.querySelectorAll(".keybind-button");
const moveKeysEl = document.querySelector("#moveKeys");
const softDropKeyEl = document.querySelector("#softDropKey");
const rotateRightKeyEl = document.querySelector("#rotateRightKey");
const rotateLeftKeyEl = document.querySelector("#rotateLeftKey");
const hardDropKeyEl = document.querySelector("#hardDropKey");
const holdKeyEl = document.querySelector("#holdKey");
const pauseKeyEl = document.querySelector("#pauseKey");

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
let zoneLines = 0;
let zoneMaxLines = 0;
let zoneLineLimit = 20;
let zoneLineLimitUnlimited = false;
let zoneScoreBuffer = 0;
let cascadeResolutionActive = false;
let cascadeResolutionPhase = "idle";
let cascadeResolutionClears = [];
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
const INPUT_BUFFER_MS = 100;
const PURIFY_DURATION_MS = 180000;
const PURIFY_INITIAL_SPAWN_MS = 9000;
const PURIFY_MIN_SPAWN_MS = 4500;
const PURIFY_SPAWN_STEP_MS = 250;
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
  if (isZeroGravityMode() && active) {
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
  if (isCascadeMode() || isSquareMode()) {
    active.pieceId = nextPieceId;
    nextPieceId += 1;
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
  if (type === "O") {
    return [[0, 0]];
  }
  if (type === "I") {
    return I_KICKS[`${fromState}>${toState}`] ?? [[0, 0]];
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
  if (isCascadeMode()) return createCascadeCell(type, pieceId);
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
  let hole = Math.floor(rng() * cols);
  let safety = 0;
  while (
    purifyHoleHistory.length >= 2 &&
    purifyHoleHistory[purifyHoleHistory.length - 1] === hole &&
    purifyHoleHistory[purifyHoleHistory.length - 2] === hole &&
    safety < 20
  ) {
    hole = Math.floor(rng() * cols);
    safety += 1;
  }
  purifyHoleHistory.push(hole);
  if (purifyHoleHistory.length > 2) {
    purifyHoleHistory.shift();
  }
  return hole;
}

function createPurifyGarbageRow() {
  const hole = getPurifyHoleColumn();
  const row = Array.from({ length: cols }, (_, x) => {
    if (x === hole) return null;
    return createPurifyCell();
  });
  const infectedSlots = row
    .map((cell, index) => (cell ? index : -1))
    .filter((index) => index >= 0);
  const infectedCount = Math.max(1, Math.min(infectedSlots.length, 2 + Math.floor(rng() * 2)));
  const chosen = new Set();
  while (chosen.size < infectedCount && chosen.size < infectedSlots.length) {
    chosen.add(infectedSlots[Math.floor(rng() * infectedSlots.length)]);
  }
  row.forEach((cell, x) => {
    if (cell && !chosen.has(x)) {
      cell.infected = false;
    }
  });
  return {
    row,
    infectedCount: chosen.size,
  };
}

function addPurifyInfectionLine() {
  if (board[0].some(Boolean)) {
    return false;
  }
  const { row, infectedCount } = createPurifyGarbageRow();
  board.shift();
  board.push(row);
  purifyCurrentInfections += infectedCount;
  purifyWave += 1;
  purifyNextSpawnMs = Math.max(PURIFY_MIN_SPAWN_MS, PURIFY_INITIAL_SPAWN_MS - purifyWave * PURIFY_SPAWN_STEP_MS);
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
  for (let i = 0; i < initialGarbage; i += 1) {
    const { row, infectedCount } = createPurifyGarbageRow();
    board[rows - 1 - i] = row;
    purifyCurrentInfections += infectedCount;
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

      const pieces = collectPieceCells();
      const ids = [...pieceIds];
      const allPiecesInside = ids.every((pieceId) => {
        const piece = pieces.get(pieceId);
        return (
          piece?.cells.length === 4 &&
          piece.cells.every(({ x, y, cell }) => (
            x >= left &&
            x < left + 4 &&
            y >= top &&
            y < top + 4 &&
            !getCellSquareType(cell)
          ))
        );
      });
      if (!allPiecesInside) continue;

      const types = new Set(ids.map((pieceId) => pieces.get(pieceId).type));
      const squareType = types.size === 1 ? "gold" : "silver";
      const squareId = nextSquareId;
      nextSquareId += 1;
      cells.forEach((cell) => {
        cell.squareId = squareId;
        cell.squareType = squareType;
      });
      madeSquares.push({ squareId, squareType });
    }
  }
  return madeSquares;
}

function getSquareLineBonus(clearedCells) {
  return clearedCells.reduce((bonus, cell) => {
    const squareType = getCellSquareType(cell);
    if (squareType === "gold") return bonus + 100 * level;
    if (squareType === "silver") return bonus + 50 * level;
    return bonus;
  }, 0);
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
  cascadeClearDelay = CASCADE_CLEAR_DELAY_MS;
  cascadeGravityTimer = 0;
  cascadeResolutionClears.push({ chain: 1, lines: fullLines.length });
  clearCascadeLines(fullLines);
  lines += fullLines.length;
  recordLineClearStats(fullLines.length);
  updateStats();
  return true;
}

function finalizeCascadeResolution() {
  const totalLines = cascadeResolutionClears.reduce((sum, clear) => sum + clear.lines, 0);
  const perfectClear = totalLines > 0 && isPerfectClear();
  const result = {
    chainCount: cascadeResolutionClears.length,
    clears: [...cascadeResolutionClears],
    totalLines,
  };
  applyCascadeScore(result, perfectClear);
  updateCascadeLastEvent(result, perfectClear);
  if (perfectClear) {
    recordPerfectClearStat();
  }
  if (!endlessEnabled && lines >= 150) {
    finishGame("Cascade Complete");
    return;
  }
  cascadeResolutionActive = false;
  cascadeResolutionPhase = "idle";
  cascadeClearDelay = 0;
  cascadeGravityTimer = 0;
  cascadeResolutionClears = [];
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
      lines += fullLines.length;
      recordLineClearStats(fullLines.length);
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
  const bombs = [];
  for (let y = 0; y < rows; y += 1) {
    if (!board[y].every(Boolean)) continue;
    for (let x = 0; x < cols; x += 1) {
      const bomb = getCellBomb(board[y][x]);
      if (bomb === "small" || bomb === "large") {
        bombs.push({ x, y });
      }
    }
  }
  return bombs;
}

function explodeBomblissBombs(initialBombs) {
  const queue = [...initialBombs];
  const exploded = new Set();
  const explodedLargeBombIds = new Set();
  let usedSmall = false;
  let usedLarge = false;
  let minX = cols;
  let minY = rows;
  let maxX = -1;
  let maxY = -1;

  while (queue.length > 0) {
    const { x, y } = queue.shift();
    const key = `${x},${y}`;
    if (exploded.has(key)) continue;
    const cell = board[y]?.[x];
    const bomb = getCellBomb(cell);
    if (bomb !== "small" && bomb !== "large") continue;
    const largeBombId = getCellLargeBombId(cell);
    if (bomb === "large" && largeBombId !== null) {
      if (explodedLargeBombIds.has(largeBombId)) continue;
      explodedLargeBombIds.add(largeBombId);
      for (let yy = 0; yy < rows; yy += 1) {
        for (let xx = 0; xx < cols; xx += 1) {
          if (getCellLargeBombId(board[yy][xx]) === largeBombId) {
            exploded.add(`${xx},${yy}`);
          }
        }
      }
    } else {
      exploded.add(key);
    }

    usedLarge ||= bomb === "large";
    usedSmall ||= bomb === "small";
    const radius = bomb === "large" ? 2 : 1;
    minX = Math.min(minX, x - radius);
    minY = Math.min(minY, y - radius);
    maxX = Math.max(maxX, x + radius);
    maxY = Math.max(maxY, y + radius);

    for (let yy = y - radius; yy <= y + radius; yy += 1) {
      for (let xx = x - radius; xx <= x + radius; xx += 1) {
        if (xx < 0 || xx >= cols || yy < 0 || yy >= rows || !board[yy][xx]) continue;
        const chainBomb = getCellBomb(board[yy][xx]);
        if ((chainBomb === "small" || chainBomb === "large") && !exploded.has(`${xx},${yy}`)) {
          queue.push({ x: xx, y: yy });
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
        x: Math.max(0, minX),
        y: Math.max(0, minY),
        width: Math.min(cols, maxX) - Math.max(0, minX) + 1,
        height: Math.min(rows, maxY) - Math.max(0, minY) + 1,
      },
    };
  }

  return { usedSmall, usedLarge, revealRect: null };
}

function applyBomblissGravity() {
  for (let x = 0; x < cols; x += 1) {
    const stack = [];
    for (let y = rows - 1; y >= 0; y -= 1) {
      if (board[y][x]) stack.push(board[y][x]);
    }
    for (let y = rows - 1; y >= 0; y -= 1) {
      board[y][x] = stack.shift() ?? null;
    }
  }
}

function createBomblissLargeBombs() {
  let created = false;
  for (let y = 0; y < rows - 1; y += 1) {
    for (let x = 0; x < cols - 1; x += 1) {
      const cells = [board[y][x], board[y][x + 1], board[y + 1][x], board[y + 1][x + 1]];
      if (cells.every((cell) => getCellBomb(cell) === "small")) {
        const largeBombId = nextLargeBombId;
        nextLargeBombId += 1;
        const positions = [
          [x, y],
          [x + 1, y],
          [x, y + 1],
          [x + 1, y + 1],
        ];
        positions.forEach(([cx, cy]) => {
          const cell = board[cy][cx];
          board[cy][cx] = createBomblissCell(getCellType(cell), "large", largeBombId);
        });
        created = true;
      }
    }
  }
  return created;
}

function processBomblissChains() {
  let chainCount = 0;
  let usedSmall = false;
  let usedLarge = false;
  let madeLarge = false;
  let revealRect = null;

  while (true) {
    const bombs = findBomblissLineBombs();
    if (bombs.length === 0) break;
    chainCount += 1;
    const result = explodeBomblissBombs(bombs);
    usedSmall ||= result.usedSmall;
    usedLarge ||= result.usedLarge;
    revealRect = result.revealRect ?? revealRect;
    applyBomblissGravity();
    madeLarge ||= createBomblissLargeBombs();
  }

  return { chainCount, usedSmall, usedLarge, madeLarge, revealRect };
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
  updateStatsForCurrentPlayer((stats) => {
    stats.gamesPlayed += 1;
    stats.totalPlayTimeMs += gameTimeMs;
    stats.totalScore += score;
    stats.totalLines += lines;
  });
}

function recordLineClearStats(cleared, { tSpin = false, backToBackActive = false, perfectClear = false } = {}) {
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
  updateStatsForCurrentPlayer((stats) => {
    stats.zoneActivations += 1;
  });
}

function recordZoneMaxLinesStat(value) {
  updateStatsForCurrentPlayer((stats) => {
    stats.maxZoneLines = Math.max(stats.maxZoneLines ?? 0, value);
  });
}

function recordCheeseLinesStat(cleared) {
  if (cleared > 0) {
    updateStatsForCurrentPlayer((stats) => {
      stats.cheeseLinesCleared += cleared;
    });
  }
}

function recordPerfectClearStat() {
  updateStatsForCurrentPlayer((stats) => {
    stats.perfectClears += 1;
  });
}

function recordShadowStageStat() {
  updateStatsForCurrentPlayer((stats) => {
    stats.shadowStagesCleared += 1;
  });
}

function recordBomblissStageStat() {
  updateStatsForCurrentPlayer((stats) => {
    stats.bomblissStagesCleared += 1;
  });
}

function recordCatchSquareStat() {
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
  return selectedGameMode === "ボンブリス";
}

function isCascadeMode() {
  return selectedGameMode === "カスケード";
}

function isHotlineMode() {
  return selectedGameMode === "ホットライン";
}

function isZoneMode() {
  return selectedGameMode === "ゾーン";
}

function isSquareMode() {
  return selectedGameMode === "スクエア";
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
  return isZoneMode();
}

function isMasterMode() {
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
  if (isCatchMode()) {
    dropInterval = getCatchFallInterval(level);
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

function updateTimeDisplay() {
  if (isCatchMode()) {
    timeDisplayEl.textContent = formatTime(Math.max(0, CATCH_DURATION_MS - gameTimeMs));
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
  const marathonLike = isMarathonMode();
  const sprint = selectedGameMode === "スプリント";
  const easyVariant = Boolean(easyModeVariant);
  shadowStageRow.classList.toggle("hidden", !shadow);
  fixedLevelToggleRow.classList.toggle("hidden", !marathon);
  fixedLevelRow.classList.toggle("hidden", !marathon || !fixedLevelEnabled);
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
      level = Math.floor(lines / 10) + 1;
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
    level = Math.floor(lines / 10) + 1;
    applyGravityInterval();
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
    lastEventEl.textContent = `ZONE ${zoneLines}`;
  } else if (lastEventEl.textContent === "-" || /^Zone \d+%$/.test(lastEventEl.textContent)) {
    lastEventEl.textContent = `Zone ${zoneGauge}%`;
  }
}

function activateZone() {
  if (!running || paused || !canUseZone() || zoneActive || zoneGauge < ZONE_ACTIVATE_COST) return;
  zoneActive = true;
  zoneTimer = ZONE_DURATION_MS;
  zoneLines = 0;
  zoneMaxLines = 0;
  zoneLineLimit = 20;
  zoneLineLimitUnlimited = false;
  zoneScoreBuffer = 0;
  zoneGauge -= ZONE_ACTIVATE_COST;
  dropCounter = 0;
  recordZoneActivationStat();
  lastEventEl.textContent = "ZONE 0";
  draw();
}

function finishZone() {
  if (!zoneActive) return;
  zoneActive = false;
  zoneTimer = 0;
  zoneLineLimit = 20;
  zoneLineLimitUnlimited = false;
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
}

function movePiece(deltaX) {
  if (!running || paused) return;
  if (!collides(active, active.x + deltaX, active.y, active.matrix)) {
    const wasGrounded = isActiveGrounded();
    active.x += deltaX;
    active.lastAction = "move";
    tsdAssistDirty = true;
    resetLockDelayAfterPlayerAction(wasGrounded);
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
    };
  } catch {
    const normalized = {};
    Object.keys(DEFAULT_KEY_BINDINGS).forEach((action) => {
      normalized[action] = [...DEFAULT_KEY_BINDINGS[action]];
    });
    return {
      keyBindings: normalized,
      tsdAssistEnabled: false,
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

function showTitleMenu() {
  hideBombingReveal();
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

function showGlobalOptionsMenu() {
  hideBombingReveal();
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
  restartButton.classList.toggle("hidden", !showRestart);
}

function showCountdownOverlay(text) {
  hideBombingReveal();
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

function hardDrop() {
  if (!running || paused) return;
  let distance = 0;
  while (!collides(active, active.x, active.y + 1, active.matrix)) {
    active.y += 1;
    distance += 1;
  }
  if (!isBomblissMode()) {
    score += distance * 2;
  }
  if (distance > 0) {
    active.lastAction = "hardDrop";
  }
  tsdAssistDirty = true;
  lockPiece();
  updateStats();
  draw();
}

function rotatePiece(direction) {
  if (!running || paused) return;
  const wasGrounded = isActiveGrounded();
  const fromState = active.rotationState;
  const toState = nextRotationState(fromState, direction);
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
    tsdAssistDirty = true;

    console.log("rotate success", {
      kickX,
      kickY,
      x: active.x,
      y: active.y,
      groundedAfter: isActiveGrounded(),
      lockCounter,
      lockResetCount,
    });

    resetLockDelayAfterPlayerAction(wasGrounded);
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
  if (isCatchMode()) {
    return;
  }
  if (isBomblissMode()) {
    lockBomblissPiece();
    return;
  }
  if (isCascadeMode()) {
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
  lockCounter = 0;
  lockResetCount = 0;
  resetSoftDropAfterLock();
  score += softDropDistance;
  const tSpin = isTSpin(active);
  mergePiece();
  const cleared = clearLines();
  const perfectClear = cleared > 0 && isPerfectClear();
  const backToBackActive = isBackToBackEligible(cleared, tSpin) && backToBackStreak > 0;
  applyLockScore(cleared, tSpin, backToBackActive, perfectClear);
  if (perfectClear) {
    perfectClearCount += 1;
    updateStats();
  }
  updateLastEvent(cleared, tSpin, backToBackActive, perfectClear);
  recordLineClearStats(cleared, { tSpin, backToBackActive, perfectClear });
  if (isAllClearSprintMode() && perfectClearCount >= 20) {
    finishGame("All Clear Sprint Complete");
    return;
  }
  if (isSprintMode() && !isAllClearSprintMode() && lines >= sprintGoalLines) {
    finishGame("Sprint Complete");
    return;
  }
  if (isMarathonMode() && !endlessEnabled && lines >= 150) {
    finishGame(isZoneMode() ? "Zone Complete" : "Marathon Complete");
    return;
  }
  spawnPiece();
  drawNextPreviews();
  drawPreview(holdCtx, holdType);
}

function lockCascadePiece() {
  lockCounter = 0;
  lockResetCount = 0;
  resetSoftDropAfterLock();
  if (!isBomblissMode()) {
    score += softDropDistance;
  }
  mergePiece();
  if (!startCascadeResolution()) {
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
  lockCounter = 0;
  lockResetCount = 0;
  resetSoftDropAfterLock();
  score += softDropDistance;
  mergePiece();
  const tSpin = isTSpin(active);
  const cleared = clearLines();
  const perfectClear = cleared > 0 && isPerfectClear();
  if (cleared > 0) {
    zoneLines += cleared;
    zoneMaxLines = Math.max(zoneMaxLines, zoneLines);
    zoneScoreBuffer += getNormalLineScore(Math.min(cleared, 4));
    if (isZoneBonusLineClear(cleared, tSpin)) {
      zoneTimer += 100;
      if (!zoneLineLimitUnlimited) {
        zoneLineLimit += 2;
      }
    }
    if (perfectClear) {
      zoneGauge = ZONE_GAUGE_MAX;
      zoneLineLimitUnlimited = true;
    }
  }
  recordLineClearStats(cleared, { tSpin, perfectClear });
  updateStats();
  updateZoneStatus();
  if (!zoneLineLimitUnlimited && zoneLines >= zoneLineLimit) {
    finishZone();
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
  const squareLineBonus = getSquareLineBonus(clearedCells);
  const lineSquareType = getDominantSquareType(clearedCells);
  const perfectClear = cleared > 0 && isPerfectClear();

  madeSquares.forEach(({ squareType }) => {
    score += (squareType === "gold" ? 2000 : 1000) * level;
  });
  if (cleared > 0) {
    score += getNormalLineScore(Math.min(cleared, 4));
    score += squareLineBonus;
    lines += cleared;
    level = Math.floor(lines / 10) + 1;
    applyGravityInterval();
    if (perfectClear) {
      score += getPerfectClearScore(Math.min(cleared, 4));
    }
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
  lockCounter = 0;
  lockResetCount = 0;
  resetSoftDropAfterLock();
  score += softDropDistance;
  const tSpin = isTSpin(active);
  mergePiece();
  const cleared = clearLines();
  const perfectClear = cleared > 0 && isPerfectClear();
  const backToBackActive = isBackToBackEligible(cleared, tSpin) && backToBackStreak > 0;
  applyLockScore(cleared, tSpin, backToBackActive, perfectClear);
  if (perfectClear) {
    perfectClearCount += 1;
  }
  updateLastEvent(cleared, tSpin, backToBackActive, perfectClear);
  recordLineClearStats(cleared, { tSpin, backToBackActive, perfectClear });
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
  lockCounter = 0;
  lockResetCount = 0;
  resetSoftDropAfterLock();
  mergePiece();
  const result = processBomblissChains();
  if (result.chainCount > 0) {
    showBombingRevealRect(result.revealRect ?? { x: 0, y: 0, width: cols, height: rows });
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
    if (isZeroGravityMode() && active) {
      active.y = 0;
    }
    if (isCascadeMode() || isSquareMode()) {
      active.pieceId = nextPieceId;
      nextPieceId += 1;
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
  drawPreview(holdCtx, holdType);
  drawNextPreviews();
  applyBufferedInputsForSpawn();
  draw();
}

function togglePause() {
  if (!running || gameOver) return;
  paused = !paused;
  if (!paused) {
    hideOverlay();
    resumeBgm();
    lastTime = performance.now();
    requestAnimationFrame(update);
  } else {
    showActionOverlay("Paused", "Resume", true);
    pauseBgm();
  }
}

function returnToTitle() {
  running = false;
  paused = false;
  gameOver = false;
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
  zoneLines = 0;
  zoneMaxLines = 0;
  zoneLineLimit = 20;
  zoneLineLimitUnlimited = false;
  zoneScoreBuffer = 0;
  purifyCleansed = 0;
  purifyWave = 0;
  purifySpawnTimer = 0;
  purifyNextSpawnMs = PURIFY_INITIAL_SPAWN_MS;
  purifyCurrentInfections = 0;
  purifyHoleHistory = [];
  nextLargeBombId = 1;
  cascadeResolutionActive = false;
  cascadeResolutionPhase = "idle";
  cascadeResolutionClears = [];
  cascadeClearDelay = 0;
  cascadeGravityTimer = 0;
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
  if (isCascadeMode() && cascadeResolutionActive) {
    processCascadeResolutionFrame(delta);
    draw();
    updateTimeDisplay();
    requestAnimationFrame(update);
    return;
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
    zoneTimer -= delta;
    if (zoneTimer <= 0) {
      finishZone();
    }
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

function getMatrixForRotation(type, rotationState) {
  const shape = SHAPES[type];
  if (!shape) return [];
  const targetIndex = ROTATION_STATES.indexOf(rotationState);
  if (targetIndex <= 0) {
    return cloneMatrix(shape);
  }
  let matrix = cloneMatrix(shape);
  for (let i = 0; i < targetIndex; i += 1) {
    matrix = rotate(matrix, 1);
  }
  return matrix;
}

function countTOccupiedCorners(boardState, tPlacement) {
  const centerX = tPlacement.x + Math.floor(tPlacement.matrix[0].length / 2);
  const centerY = tPlacement.y + Math.floor(tPlacement.matrix.length / 2);
  const corners = [
    [centerX - 1, centerY - 1],
    [centerX + 1, centerY - 1],
    [centerX - 1, centerY + 1],
    [centerX + 1, centerY + 1],
  ];
  return corners.reduce((count, [x, y]) => {
    if (x < 0 || x >= cols || y >= rows) return count + 1;
    if (y < 0) return count;
    return count + (boardState[y][x] ? 1 : 0);
  }, 0);
}

function getAllTFinalPlacements(boardState) {
  const placements = [];
  const rotationStates = ["0", "R", "2", "L"];

  rotationStates.forEach((rotationState) => {
    const matrix = getMatrixForRotation("T", rotationState);
    for (let y = -4; y < rows + 4; y += 1) {
      for (let x = -4; x < cols + 4; x += 1) {
        if (collidesOnBoard(boardState, x, y, matrix)) continue;
        if (!collidesOnBoard(boardState, x, y + 1, matrix)) continue;
        placements.push({
          x,
          y,
          matrix: cloneMatrix(matrix),
          rotationState,
          type: "T",
        });
      }
    }
  });

  return placements;
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

function sameTsdOpportunity(a, b) {
  return Boolean(a && b) && a.x === b.x && a.y === b.y && a.rotationState === b.rotationState;
}

function canTReachBySrsRotation(boardState, finalPlacement) {
  const targetRotation = finalPlacement.rotationState;
  const directions = [
    { from: "0", to: "R" },
    { from: "R", to: "2" },
    { from: "2", to: "L" },
    { from: "L", to: "0" },
    { from: "0", to: "L" },
    { from: "L", to: "2" },
    { from: "2", to: "R" },
    { from: "R", to: "0" },
  ].filter((rotation) => rotation.to === targetRotation);

  for (const rotation of directions) {
    const fromMatrix = getMatrixForRotation("T", rotation.from);
    const toMatrix = getMatrixForRotation("T", rotation.to);
    const kicks = getKickTests("T", rotation.from, rotation.to);

    for (const [kickX, kickY] of kicks) {
      const preX = finalPlacement.x - kickX;
      const preY = finalPlacement.y - kickY;

      if (collidesOnBoard(boardState, preX, preY, fromMatrix)) {
        continue;
      }

      const kickedX = preX + kickX;
      const kickedY = preY + kickY;

      if (
        kickedX === finalPlacement.x &&
        kickedY === finalPlacement.y &&
        !collidesOnBoard(boardState, kickedX, kickedY, toMatrix)
      ) {
        return true;
      }
    }
  }

  return false;
}

function isRealTsdOpportunity(boardState, tPlacement) {
  const boardWithT = cloneBoard(boardState);
  mergePlacementToBoard(boardWithT, tPlacement);

  if (countFullLines(boardWithT) !== 2) return false;

  const cornerCount = countTOccupiedCorners(boardState, tPlacement);
  if (cornerCount < 3) return false;

  if (!canTReachBySrsRotation(boardState, tPlacement)) return false;

  return true;
}

function findRealTsdOpportunities(boardState) {
  const tPlacements = getAllTFinalPlacements(boardState);

  return tPlacements
    .filter((placement) => isRealTsdOpportunity(boardState, placement))
    .map((placement, order) => ({
      x: placement.x,
      y: placement.y,
      matrix: cloneMatrix(placement.matrix),
      rotationState: placement.rotationState,
      type: placement.type,
      cleared: 2,
      cornerCount: countTOccupiedCorners(boardState, placement),
      order,
    }));
}

function chooseBestTsdAssistCandidate(candidates) {
  if (!candidates.length) return null;
  const center = (cols - 1) / 2;
  return candidates
    .slice()
    .sort((a, b) => {
      if (b.futurePlacement.y !== a.futurePlacement.y) return b.futurePlacement.y - a.futurePlacement.y;
      if (b.currentPlacement.y !== a.currentPlacement.y) return b.currentPlacement.y - a.currentPlacement.y;
      const distanceA = Math.abs(a.futurePlacement.x - center);
      const distanceB = Math.abs(b.futurePlacement.x - center);
      if (distanceA !== distanceB) return distanceA - distanceB;
      const currentDistanceA = Math.abs(a.currentPlacement.x - center);
      const currentDistanceB = Math.abs(b.currentPlacement.x - center);
      if (currentDistanceA !== currentDistanceB) return currentDistanceA - currentDistanceB;
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

function chooseBestTsdOpportunity(candidates) {
  if (!candidates.length) return null;
  const center = (cols - 1) / 2;
  return candidates
    .slice()
    .sort((a, b) => {
      if (b.y !== a.y) return b.y - a.y;
      const distanceA = Math.abs(a.x - center);
      const distanceB = Math.abs(b.x - center);
      if (distanceA !== distanceB) return distanceA - distanceB;
      return a.order - b.order;
    })[0] ?? null;
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
  const beforeOpportunities = findRealTsdOpportunities(board);
  const candidates = [];
  placements.forEach((placement, index) => {
    const boardCopy = cloneBoard(board);
    mergePlacementToBoard(boardCopy, placement);
    if (countFullLines(boardCopy) > 0) {
      return;
    }
    const afterOpportunities = findRealTsdOpportunities(boardCopy);
    const newOpportunities = afterOpportunities.filter(
      (after) => !beforeOpportunities.some((before) => sameTsdOpportunity(before, after)),
    );
    if (!newOpportunities.length) {
      return;
    }

    const futurePlacement = chooseBestTsdOpportunity(newOpportunities);
    if (!futurePlacement) {
      return;
    }

    candidates.push({
      currentPlacement: placement,
      futurePlacement,
      order: index,
    });
  });
  tsdAssistCandidate = chooseBestTsdAssistCandidate(candidates);
  if (window.__TSD_ASSIST_DEBUG__) {
    console.debug("TSD Assist", {
      currentPlacements: placements.length,
      beforeOpportunities: beforeOpportunities.length,
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
  boardCtx.globalAlpha = 0.08;
  drawOverlayMatrix(
    boardCtx,
    tsdAssistCandidate.futurePlacement.matrix,
    tsdAssistCandidate.futurePlacement.x,
    tsdAssistCandidate.futurePlacement.y,
    "#c58bff",
  );
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
  levelEl.textContent = isBomblissMode() ? "-" : isMasterMode() ? "Master" : level;
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
  zoneLines = 0;
  zoneMaxLines = 0;
  zoneLineLimit = 20;
  zoneLineLimitUnlimited = false;
  zoneScoreBuffer = 0;
  nextLargeBombId = 1;
  cascadeResolutionActive = false;
  cascadeResolutionPhase = "idle";
  cascadeResolutionClears = [];
  cascadeClearDelay = 0;
  cascadeGravityTimer = 0;
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
  running = false;
  gameOver = true;
  if (!gameStatsFinalized) {
    finalizePlayerStatsForGame();
    gameStatsFinalized = true;
  }
  zoneActive = false;
  zoneTimer = 0;
  zoneLineLimit = 20;
  zoneLineLimitUnlimited = false;
  nextLargeBombId = 1;
  cascadeResolutionActive = false;
  cascadeResolutionPhase = "idle";
  cascadeResolutionClears = [];
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
  if (paused) {
    togglePause();
  } else {
    startGame();
  }
});

restartButton.addEventListener("click", () => {
  startGame();
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
  showOptionMenu("マラソン");
});

sprintButton.addEventListener("click", () => {
  easyModeVariant = null;
  showOptionMenu("スプリント");
});

ultraButton.addEventListener("click", () => {
  easyModeVariant = null;
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
  showOptionMenu("Catch");
});

easyModeBackButton.addEventListener("click", () => {
  showTitleMenu();
});

easyMarathonButton.addEventListener("click", () => {
  easyModeVariant = "marathon";
  showOptionMenu("やさしいマラソン");
});

cheeseRaceButton.addEventListener("click", () => {
  easyModeVariant = null;
  cheeseRacePurifyEnabled = false;
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
  showOptionMenu("Shadow");
});

allClearSprintButton.addEventListener("click", () => {
  easyModeVariant = "allClearSprint";
  showOptionMenu("オールクリアスプリント");
});

bomblissButton.addEventListener("click", () => {
  easyModeVariant = null;
  showOptionMenu("ボンブリス");
});

cascadeButton.addEventListener("click", () => {
  easyModeVariant = null;
  showOptionMenu("カスケード");
});

zeroGravityButton.addEventListener("click", () => {
  easyModeVariant = null;
  showOptionMenu("無重力");
});

hotlineButton.addEventListener("click", () => {
  easyModeVariant = null;
  showOptionMenu("ホットライン");
});

zoneButton.addEventListener("click", () => {
  easyModeVariant = null;
  showOptionMenu("ゾーン");
});

squareButton.addEventListener("click", () => {
  easyModeVariant = null;
  showOptionMenu("スクエア");
});

optionStartButton.addEventListener("click", () => {
  startGameWithReady();
});

optionBackButton.addEventListener("click", () => {
  showTitleMenu();
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
