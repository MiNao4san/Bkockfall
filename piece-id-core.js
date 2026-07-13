(function (global) {
  function allocatePieceIdForSpecialModes(piece, nextPieceId, shouldAssign) {
    if (!piece || !shouldAssign) {
      return nextPieceId;
    }
    piece.pieceId = nextPieceId;
    return nextPieceId + 1;
  }

  const api = {
    allocatePieceIdForSpecialModes,
  };

  global.PieceIdCore = api;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : window);
