/*:
 * @target MZ
 * @plugindesc (v1.2) Proper map zoom with camera centering and input correction (VisuStella-safe).
 * @author JackHoffx
 */

(() => {
  const defaultZoom = 1.4;

  // --- Initialization Safeguards ---
  const _Game_Map_initialize = Game_Map.prototype.initialize;
  Game_Map.prototype.initialize = function() {
    _Game_Map_initialize.call(this);
    this._zoom = new PIXI.Point(defaultZoom, defaultZoom);
    this._destZoom = new PIXI.Point(defaultZoom, defaultZoom);
  };

  Object.defineProperty(Game_Map.prototype, "zoom", {
    get() {
      if (!this._zoom) this._zoom = new PIXI.Point(defaultZoom, defaultZoom);
      return this._zoom;
    },
  });

  // --- Set zoom and optionally center camera ---
  Game_Map.prototype.setZoom = function(x, y) {
    if (!this._zoom) this._zoom = new PIXI.Point(defaultZoom, defaultZoom);
    this._zoom.x = x;
    this._zoom.y = y;
    this.centerPlayerWithZoom();
  };

  // --- Recenter camera to player after zoom ---
  Game_Map.prototype.centerPlayerWithZoom = function() {
    const pw = $gamePlayer.screenX();
    const ph = $gamePlayer.screenY();
    const cx = (Graphics.width / 2) / this._zoom.x;
    const cy = (Graphics.height / 2) / this._zoom.y;
    const displayX = $gamePlayer.x - cx / $gameMap.tileWidth();
    const displayY = $gamePlayer.y - cy / $gameMap.tileHeight();
    this.setDisplayPos(displayX, displayY);
  };

  // --- Scale rendering safely ---
  const _Spriteset_Map_updatePosition = Spriteset_Map.prototype.updatePosition;
  Spriteset_Map.prototype.updatePosition = function() {
    _Spriteset_Map_updatePosition.call(this);
    const zoom = $gameMap && $gameMap.zoom ? $gameMap.zoom : null;
    this.scale.set(zoom ? zoom.x : 1, zoom ? zoom.y : 1);
  };

  // --- Adjust touch input to account for zoom ---
  const _TouchInput_mapX = TouchInput.mapX;
  const _TouchInput_mapY = TouchInput.mapY;

  TouchInput.mapX = function() {
    const zoom = $gameMap ? $gameMap.zoom.x || 1 : 1;
    const x = _TouchInput_mapX.call(this);
    return $gameMap.displayX() + (x - Graphics.width / 2) / ($gameMap.tileWidth() * zoom);
  };

  TouchInput.mapY = function() {
    const zoom = $gameMap ? $gameMap.zoom.y || 1 : 1;
    const y = _TouchInput_mapY.call(this);
    return $gameMap.displayY() + (y - Graphics.height / 2) / ($gameMap.tileHeight() * zoom);
  };

  console.log("ZoomMap v1.2 loaded (camera and input fix active)");
})();
