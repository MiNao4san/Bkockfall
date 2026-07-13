(function (global) {
  const ZONE_MAX_DURATION_MS = 30000;
  const ZONE_EXTENSION_MS = {
    SINGLE: 0,
    DOUBLE: 500,
    TRIPLE: 1000,
    TETRIS: 3000,
    T_SPIN_MINI_SINGLE: 1000,
    T_SPIN_SINGLE: 2000,
    T_SPIN_DOUBLE: 4000,
    T_SPIN_TRIPLE: 6000,
    PERFECT_CLEAR: 5000,
  };

  const ZONE_EVENT_LABELS = {
    SINGLE: "SINGLE",
    DOUBLE: "DOUBLE",
    TRIPLE: "TRIPLE",
    TETRIS: "TETRIS",
    T_SPIN_MINI_SINGLE: "T-SPIN MINI SINGLE",
    T_SPIN_SINGLE: "T-SPIN SINGLE",
    T_SPIN_DOUBLE: "T-SPIN DOUBLE",
    T_SPIN_TRIPLE: "T-SPIN TRIPLE",
    PERFECT_CLEAR: "PERFECT CLEAR",
  };

  function getZoneBaseDurationMs(consumedGauge) {
    return Math.max(0, Math.floor(Number(consumedGauge) || 0)) * 200;
  }

  function getZoneEventKey({ cleared = 0, tSpin = false, perfectClear = false, mini = false } = {}) {
    if (perfectClear) return "PERFECT_CLEAR";
    if (tSpin) {
      if (mini) {
        if (cleared <= 0) return "T_SPIN_MINI_SINGLE";
        if (cleared === 1) return "T_SPIN_MINI_SINGLE";
      }
      if (cleared <= 0) return "T_SPIN_SINGLE";
      if (cleared === 1) return "T_SPIN_SINGLE";
      if (cleared === 2) return "T_SPIN_DOUBLE";
      if (cleared >= 3) return "T_SPIN_TRIPLE";
    }
    if (cleared === 4) return "TETRIS";
    if (cleared === 3) return "TRIPLE";
    if (cleared === 2) return "DOUBLE";
    if (cleared === 1) return "SINGLE";
    return null;
  }

  function getZoneExtensionMs(params = {}) {
    const key = getZoneEventKey(params);
    return key ? (ZONE_EXTENSION_MS[key] ?? 0) : 0;
  }

  function applyZoneExtension(currentTimer, extensionMs) {
    const safeTimer = Math.max(0, Number(currentTimer) || 0);
    const safeExtension = Math.max(0, Math.floor(Number(extensionMs) || 0));
    const nextTimer = Math.min(ZONE_MAX_DURATION_MS, safeTimer + safeExtension);
    return {
      before: safeTimer,
      requested: safeExtension,
      after: nextTimer,
      applied: nextTimer - safeTimer,
    };
  }

  function formatZoneTimer(ms) {
    return `${(Math.max(0, Number(ms) || 0) / 1000).toFixed(1)}s`;
  }

  function getZoneStatusText(zoneTimer) {
    return `ZONE ${formatZoneTimer(zoneTimer)}`;
  }

  function getZoneExtensionText(eventKey, appliedMs) {
    const label = ZONE_EVENT_LABELS[eventKey] ?? eventKey ?? "ZONE";
    return `${label}  +${(Math.max(0, Number(appliedMs) || 0) / 1000).toFixed(1)}s`;
  }

  function shouldFinishZoneByLineCount() {
    return false;
  }

  const api = {
    ZONE_MAX_DURATION_MS,
    ZONE_EXTENSION_MS,
    getZoneBaseDurationMs,
    getZoneEventKey,
    getZoneExtensionMs,
    applyZoneExtension,
    formatZoneTimer,
    getZoneStatusText,
    getZoneExtensionText,
    shouldFinishZoneByLineCount,
  };

  global.ZoneCore = api;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : window);
