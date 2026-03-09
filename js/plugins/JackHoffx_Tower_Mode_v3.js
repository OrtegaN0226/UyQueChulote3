/*:
 * @target MZ
 * @plugindesc (v1.1) Tower Mode v3 - Freeform circular portraits with per-page backgrounds
 * @author JackHoffx
 *
 * @param lockedImage
 * @type file
 * @dir img/pictures/
 * @text Locked Circle Image
 * @desc Optional image to show on locked circles (fallback: dark overlay)
 *
 * @param defaultCircleRadius
 * @type number
 * @text Default Circle Radius
 * @desc Radius used when a stage does not specify one
 * @default 60
 * @min 10
 *
 * @param defaultBackgroundImage
 * @type file
 * @dir img/pictures/
 * @text Default Page Background
 * @desc Background used if a page does not provide one
 *
 * @param bgmName
 * @type file
 * @dir audio/bgm/
 * @text Background Music
 * @desc BGM to play in tower mode (leave empty to keep current music)
 *
 * @param bgmVolume
 * @type number
 * @text BGM Volume
 * @desc Volume for the background music (0-100)
 * @default 90
 * @min 0
 * @max 100
 *
 * @param bgmPitch
 * @type number
 * @text BGM Pitch
 * @desc Pitch for the background music (50-150)
 * @default 100
 * @min 50
 * @max 150
 *
 * @param bgmPan
 * @type number
 * @text BGM Pan
 * @desc Pan for the background music (-100 to 100, 0 = center)
 * @default 0
 * @min -100
 * @max 100
 *
 * @param successSe
 * @type file
 * @dir audio/se/
 * @text Success SE
 * @desc Sound effect when clicking an unlocked circle
 *
 * @param failSe
 * @type file
 * @dir audio/se/
 * @text Fail SE
 * @desc Sound effect when clicking a locked circle
 *
 * @command openTowerMode
 * @text Open Tower Mode
 * @desc Opens the Tower Mode scene for a page with custom circles and background
 *
 * @arg pageId
 * @type text
 * @text Page ID
 * @desc Unique identifier for this tower page (e.g., "tower1", "floor1")
 * @default tower1
 *
 * @arg backgroundImage
 * @type file
 * @dir img/pictures/
 * @text Page Background
 * @desc Background image for this tower page (falls back to default background)
 *
 * @arg stages
 * @type struct<TowerStage>[]
 * @text Stages Configuration
 * @desc Configure up to 16 circles with portraits, placement, and events
 * @default []
 *
 * @command resetTowerProgress
 * @text Reset Tower Progress
 * @desc Resets progress for a specific tower page
 *
 * @arg pageId
 * @type text
 * @text Page ID
 * @desc The page ID to reset progress for
 * @default tower1
 *
 * @command unlockTowerStage
 * @text Unlock Tower Stage
 * @desc Manually unlock a specific stage (for testing or special unlocks)
 *
 * @arg pageId
 * @type text
 * @text Page ID
 * @desc The page ID
 * @default tower1
 *
 * @arg stageIndex
 * @type number
 * @text Stage Index
 * @desc Stage to unlock (0-15)
 * @min 0
 * @max 15
 * @default 0
 *
 * @help
 * ============================================================================
 * Tower Mode Plugin
 * ============================================================================
 * 
 * - Displays up to 16 circular portraits per page (free placement, no grid).
 * - Circles unlock sequentially as the player completes each stage.
 * - Each page can define its own background image.
 * - Circles can override position (x, y) and radius individually.
 * 
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 * 
 * Open Tower Mode:
 *   Opens the tower interface for the given page with:
 *     - Page background (optional; falls back to default background param)
 *     - Circles configured via the TowerStage struct
 * 
 * Reset Tower Progress:
 *   Resets the progress for a specific tower page (all circles locked again)
 * 
 * Unlock Tower Stage:
 *   Manually unlocks a specific stage (useful for testing or special events)
 * 
 * ============================================================================
 * Script Calls
 * ============================================================================
 * 
 * Complete current stage:
 *   $gameSystem.completeTowerStage();
 *   Call this after winning a battle to unlock the next stage
 * 
 * Check if stage is unlocked:
 *   $gameSystem.isTowerStageUnlocked(pageId, stageIndex)
 * 
 * Get current stage for a page:
 *   $gameSystem.getCurrentTowerStage(pageId)
 * 
 * ============================================================================
 * How to Use
 * ============================================================================
 * 
 * 1. Create an event that calls the "Open Tower Mode" plugin command
 * 2. Configure circles with portrait, x/y, radius, label, and event ID
 * 3. In each battle event, call $gameSystem.completeTowerStage() when the
 *    player wins to unlock the next stage
 * 4. Create multiple pages by using different Page IDs (each can have its own background)
 */

/*~struct~TowerStage:
 * @param portrait
 * @type file
 * @dir img/pictures/
 * @text Portrait Image
 * @desc Portrait image for this stage
 *
 * @param x
 * @type number
 * @text Circle X
 * @desc X position of the circle (pixels). If empty, auto-placement is used.
 * @default 0
 *
 * @param y
 * @type number
 * @text Circle Y
 * @desc Y position of the circle (pixels). If empty, auto-placement is used.
 * @default 0
 *
 * @param radius
 * @type number
 * @text Circle Radius
 * @desc Radius in pixels for the circle portrait/mask.
 * @default 60
 * @min 10
 *
 * @param eventId
 * @type number
 * @text Event ID
 * @desc Map event ID to start when this stage is selected
 * @min 1
 * @default 1
 *
 * @param label
 * @type text
 * @text Label
 * @desc Optional label to display (e.g., "Wave 1", "Boss")
 * @default
 */

var JackHoffx = JackHoffx || {};
JackHoffx.TowerMode = JackHoffx.TowerMode || {};

(() => {
  // Must match this file's name for MZ to expose commands/params
  const pluginName = "JackHoffx_Tower_Mode_v3";
  const pluginParams = PluginManager.parameters(pluginName) || {};
  
  JackHoffx.TowerMode.lockedImage = pluginParams.lockedImage || "";
  JackHoffx.TowerMode.defaultCircleRadius = Number(pluginParams.defaultCircleRadius || 60);
  JackHoffx.TowerMode.defaultBackgroundImage = pluginParams.defaultBackgroundImage || "";
  JackHoffx.TowerMode.bgmName = pluginParams.bgmName || "";
  JackHoffx.TowerMode.bgmVolume = Number(pluginParams.bgmVolume || 90);
  JackHoffx.TowerMode.bgmPitch = Number(pluginParams.bgmPitch || 100);
  JackHoffx.TowerMode.bgmPan = Number(pluginParams.bgmPan || 0);
  JackHoffx.TowerMode.successSe = pluginParams.successSe || "";
  JackHoffx.TowerMode.failSe = pluginParams.failSe || "";
  
  // Store current page configuration
  JackHoffx.TowerMode.currentPageId = null;
  JackHoffx.TowerMode.currentStageIndex = null;
  JackHoffx.TowerMode.pageConfigs = {};

  //=============================================================================
  // Plugin Commands
  //=============================================================================
  
  PluginManager.registerCommand(pluginName, "openTowerMode", args => {
    const pageId = args.pageId || "tower1";
    const stagesJson = args.stages || "[]";
    const pageBackground = args.backgroundImage || "";
    
    // Parse stages configuration
    let stages = [];
    try {
      const parsed = JSON.parse(stagesJson);
      stages = parsed.map(stageStr => {
        const stage = JSON.parse(stageStr);
        return {
          portrait: stage.portrait || "",
          x: stage.x !== undefined ? Number(stage.x) : null,
          y: stage.y !== undefined ? Number(stage.y) : null,
          radius: stage.radius !== undefined ? Number(stage.radius) : JackHoffx.TowerMode.defaultCircleRadius,
          eventId: Number(stage.eventId) || 1,
          label: stage.label || ""
        };
      });
    } catch (e) {
      console.error("Failed to parse tower stages:", e);
      stages = [];
    }
    
    // Cap to a reasonable maximum to avoid runaway configs
    stages = stages.slice(0, 99);
    
    // Store configuration (per page background + stages)
    JackHoffx.TowerMode.pageConfigs[pageId] = {
      background: pageBackground,
      stages
    };
    
    // Open the tower mode scene
    $gameSystem.openTowerMode(pageId);
  });
  
  PluginManager.registerCommand(pluginName, "resetTowerProgress", args => {
    const pageId = args.pageId || "tower1";
    $gameSystem.resetTowerProgress(pageId);
  });
  
  PluginManager.registerCommand(pluginName, "unlockTowerStage", args => {
    const pageId = args.pageId || "tower1";
    const stageIndex = Number(args.stageIndex) || 0;
    $gameSystem.unlockTowerStage(pageId, stageIndex);
  });

  //=============================================================================
  // Game_System
  //=============================================================================
  
  const _Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    _Game_System_initialize.call(this);
    this.initTowerModeData();
  };
  
  Game_System.prototype.initTowerModeData = function() {
    if (!this._towerModeData) {
      this._towerModeData = {};
    }
  };
  
  Game_System.prototype.getTowerPageData = function(pageId) {
    this.initTowerModeData();
    if (!this._towerModeData[pageId]) {
      this._towerModeData[pageId] = {
        unlockedStages: [true], // Stage 0 is unlocked by default
        completedStages: []
      };
    }
    return this._towerModeData[pageId];
  };

  Game_System.prototype._ensureStageCapacity = function(pageId, stageCount) {
    const data = this.getTowerPageData(pageId);
    if (data.unlockedStages.length === 0) {
      data.unlockedStages[0] = true;
    }
    while (data.unlockedStages.length < stageCount) {
      data.unlockedStages.push(false);
    }
    while (data.completedStages.length < stageCount) {
      data.completedStages.push(false);
    }
  };
  
  Game_System.prototype.isTowerStageUnlocked = function(pageId, stageIndex) {
    const data = this.getTowerPageData(pageId);
    return data.unlockedStages[stageIndex] === true;
  };
  
  Game_System.prototype.isTowerStageCompleted = function(pageId, stageIndex) {
    const data = this.getTowerPageData(pageId);
    return data.completedStages[stageIndex] === true;
  };
  
  Game_System.prototype.unlockTowerStage = function(pageId, stageIndex) {
    const data = this.getTowerPageData(pageId);
    const stageCount = (JackHoffx.TowerMode.pageConfigs[pageId]?.stages?.length) || (stageIndex + 1);
    this._ensureStageCapacity(pageId, Math.max(stageCount, stageIndex + 1));
    data.unlockedStages[stageIndex] = true;
  };
  
  Game_System.prototype.completeTowerStage = function() {
    const pageId = JackHoffx.TowerMode.currentPageId;
    const stageIndex = JackHoffx.TowerMode.currentStageIndex;
    
    if (pageId === null || stageIndex === null) {
      console.warn("No active tower stage to complete");
      return;
    }
    
    const data = this.getTowerPageData(pageId);
    const stageCount = (JackHoffx.TowerMode.pageConfigs[pageId]?.stages?.length) || (stageIndex + 1);
    this._ensureStageCapacity(pageId, stageCount);
    data.completedStages[stageIndex] = true;
    
    // Unlock next stage if it exists
    if (stageIndex + 1 < stageCount) {
      data.unlockedStages[stageIndex + 1] = true;
    }
    
    // Clear current stage
    JackHoffx.TowerMode.currentPageId = null;
    JackHoffx.TowerMode.currentStageIndex = null;
  };
  
  Game_System.prototype.getCurrentTowerStage = function(pageId) {
    const data = this.getTowerPageData(pageId);
    const stageCount = (JackHoffx.TowerMode.pageConfigs[pageId]?.stages?.length) || data.completedStages.length || 1;
    this._ensureStageCapacity(pageId, stageCount);
    for (let i = 0; i < stageCount; i++) {
      if (!data.completedStages[i]) {
        return i;
      }
    }
    return Math.max(0, stageCount - 1); // All completed
  };
  
  Game_System.prototype.resetTowerProgress = function(pageId) {
    this.initTowerModeData();
    this._towerModeData[pageId] = {
      unlockedStages: [true],
      completedStages: []
    };
  };
  
  Game_System.prototype.openTowerMode = function(pageId) {
    if (SceneManager._scene instanceof Scene_Map) {
      SceneManager.push(Scene_TowerMode);
      SceneManager.prepareNextScene(pageId);
    }
  };

  //=============================================================================
  // Scene_TowerMode
  //=============================================================================
  
  class Scene_TowerMode extends Scene_Base {
    prepare(pageId) {
      this._pageId = pageId;
    }

    initialize() {
      super.initialize();
      this._pageId = this._pageId || JackHoffx.TowerMode.currentPageId;
      this._circleSprites = [];
      this._previousBgm = null;
    }

    create() {
      super.create();
      this.createBackground();
      this.createCircles();
      this.createHelpText();
      this.createExitButton();
    }

    start() {
      super.start();
      this.playTowerBgm();
      this.refreshCircles();
    }

    stop() {
      super.stop();
      this.restoreBgm();
    }

    update() {
      super.update();
      if (Input.isTriggered("cancel")) {
        this.exitScene();
      }
    }

    pageConfig() {
      return JackHoffx.TowerMode.pageConfigs[this._pageId] || { background: "", stages: [] };
    }

    stageConfig() {
      return this.pageConfig().stages || [];
    }

    pageBackgroundPath() {
      const pageBg = this.pageConfig().background;
      if (pageBg) return pageBg;
      return JackHoffx.TowerMode.defaultBackgroundImage || "";
    }

    loadBitmapFlexible(path) {
      if (!path) return null;
      if (path.includes("/") || path.includes("\\")) {
        return Bitmap.load(path);
      }
      return ImageManager.loadPicture(path);
    }

    createBackground() {
      const bgPath = this.pageBackgroundPath();
      let bitmap;
      if (bgPath) {
        bitmap = this.loadBitmapFlexible(bgPath);
      }
      if (!bitmap) {
        bitmap = new Bitmap(Graphics.width, Graphics.height);
        bitmap.fillAll("rgba(0,0,0,0.6)");
      }
      this._backgroundSprite = new Sprite(bitmap);
      bitmap.addLoadListener(() => {
        const scaleX = Graphics.width / bitmap.width;
        const scaleY = Graphics.height / bitmap.height;
        const scale = Math.max(scaleX, scaleY);
        this._backgroundSprite.scale.x = scale;
        this._backgroundSprite.scale.y = scale;
        this._backgroundSprite.x = (Graphics.width - bitmap.width * scale) / 2;
        this._backgroundSprite.y = (Graphics.height - bitmap.height * scale) / 2;
      });
      this.addChild(this._backgroundSprite);
    }

    createCircles() {
      const stages = this.stageConfig();
      this._circleSprites = [];
      for (let i = 0; i < stages.length; i++) {
        const cfg = stages[i];
        const sprite = new Sprite_TowerCircle(this._pageId, i, cfg, c => this.onCircleClicked(c));
        this._circleSprites.push(sprite);
        this.addChild(sprite);
      }
    }

    createHelpText() {
      const sprite = new Sprite(new Bitmap(Graphics.width, 48));
      sprite.bitmap.fontSize = 18;
      sprite.bitmap.textColor = ColorManager.textColor(17); 
      sprite.bitmap.drawText("Welcome to Tower Mode! Click an unlocked enemy to battle!", 0, 0, Graphics.width, 48, "center");
      sprite.y = Graphics.height - 48;
      this.addChild(sprite);
    }

    refreshCircles() {
      for (const sprite of this._circleSprites) {
        sprite.refresh();
      }
    }

    onCircleClicked(circleInfo) {
      const pageId = this._pageId;
      const stageIndex = circleInfo.index;
      const stages = this.stageConfig();
      const config = stages[stageIndex];
      if (!config) return;

      JackHoffx.TowerMode.currentPageId = pageId;
      JackHoffx.TowerMode.currentStageIndex = stageIndex;

      SceneManager.pop();

      setTimeout(() => {
        const eventId = config.eventId;
        const event = $gameMap.event(eventId);
        if (event) {
          event.start();
        }
      }, 0);
    }

    playTowerBgm() {
      if (JackHoffx.TowerMode.bgmName) {
        this._previousBgm = AudioManager.saveBgm();
        AudioManager.playBgm({
          name: JackHoffx.TowerMode.bgmName,
          volume: JackHoffx.TowerMode.bgmVolume,
          pitch: JackHoffx.TowerMode.bgmPitch,
          pan: JackHoffx.TowerMode.bgmPan
        });
      }
    }

    restoreBgm() {
      if (JackHoffx.TowerMode.bgmName && this._previousBgm) {
        AudioManager.replayBgm(this._previousBgm);
      }
    }

    createExitButton() {
      const makeExit = () => {
        const width = 96;
        const height = 44;
        const sprite = new Sprite_Clickable();
        const bmp = new Bitmap(width, height);
        const drawState = (bg, textColor) => {
          bmp.clear();
          // simple solid rectangle
          bmp.fillRect(0, 0, width, height, bg);
          bmp.fontSize = 20;
          bmp.textColor = textColor;
          bmp.drawText("Exit", 0, 0, width, height, "center");
        };
        const baseColor = "#2b2b2b";
        const overColor = "#3a3a3a";
        const downColor = "#c62828";
        drawState(baseColor, "#ffffff");
        sprite.bitmap = bmp;
        sprite.x = 16;
        sprite.y = Graphics.height - height - 16;
        sprite.onMouseEnter = () => drawState(overColor, "#ffffff");
        sprite.onMouseExit = () => drawState(baseColor, "#ffffff");
        sprite.onPress = () => drawState(downColor, "#ffffff");
        sprite.onRelease = () => drawState(overColor, "#ffffff");
        sprite.onClick = () => this.exitScene();
        return sprite;
      };

      this._exitButton = makeExit();
      this.addChild(this._exitButton);
    }
    exitScene() {
      // Remove the black overlay picture (#2) if present
      if ($gameScreen) {
        $gameScreen.erasePicture(2);
      }
      SceneManager.pop();
    }
  }
  
  window.Scene_TowerMode = Scene_TowerMode;

  //=============================================================================
  // Sprite_TowerCircle (clickable circular node)
  //=============================================================================
  class Sprite_TowerCircle extends Sprite_Clickable {
    constructor(pageId, index, config, onClick) {
      super();
      this._pageId = pageId;
      this._index = index;
      this._config = config || {};
      this._onClick = onClick;
      this._radius = Math.max(10, Number(this._config.radius || JackHoffx.TowerMode.defaultCircleRadius));
      this._isLocked = false;
      this._clickEffectDuration = 0;
      this.setupVisuals();
      this.refresh();
    }

    setupVisuals() {
      const autoPos = this.computeFallbackPosition();
      const x = this._config.x !== null && this._config.x !== undefined ? Number(this._config.x) : autoPos.x;
      const y = this._config.y !== null && this._config.y !== undefined ? Number(this._config.y) : autoPos.y;
      this.x = x;
      this.y = y;
      this.anchor.set(0.5);

      this._portraitSprite = new Sprite();
      this._portraitSprite.anchor.set(0.5);
      this.addChild(this._portraitSprite);

      this._maskShape = new PIXI.Graphics();
      this._maskShape.beginFill(0xffffff);
      this._maskShape.drawCircle(0, 0, this._radius);
      this._maskShape.endFill();
      this._portraitSprite.mask = this._maskShape;
      this.addChild(this._maskShape);

      this._overlay = new PIXI.Graphics();
      this.addChild(this._overlay);

      this._ring = new PIXI.Graphics();
      this.addChild(this._ring);

      this._lockedSprite = null;
      if (JackHoffx.TowerMode.lockedImage) {
        this._lockedSprite = new Sprite(ImageManager.loadPicture(JackHoffx.TowerMode.lockedImage));
        this._lockedSprite.anchor.set(0.5);
        this.addChild(this._lockedSprite);
        this._lockedSprite.bitmap.addLoadListener(() => {
          const diameter = this._radius * 2;
          const scale = diameter / Math.max(this._lockedSprite.bitmap.width || 1, this._lockedSprite.bitmap.height || 1);
          this._lockedSprite.scale.set(scale, scale);
        });
      }

      this._labelSprite = new Sprite(new Bitmap(this._radius * 2 + 40, 32));
      this._labelSprite.anchor.set(0.5, 0);
      this._labelSprite.y = this._radius + 12;
      this.addChild(this._labelSprite);

      this.loadPortrait();
    }

    computeFallbackPosition() {
      // Distribute circles in a loose spiral as a fallback to avoid grid look
      const angle = (this._index / 16) * Math.PI * 4; // two turns
      const radius = 80 + this._index * 12;
      const centerX = Graphics.width / 2;
      const centerY = Graphics.height / 2;
      return {
        x: Math.floor(centerX + Math.cos(angle) * radius),
        y: Math.floor(centerY + Math.sin(angle) * radius)
      };
    }

    loadPortrait() {
      const portrait = this._config.portrait;
      if (!portrait) return;
      this._portraitBitmap = ImageManager.loadPicture(portrait);
      this._portraitSprite.bitmap = this._portraitBitmap;
      this._portraitBitmap.addLoadListener(() => {
        const diameter = this._radius * 2;
        const scale = diameter / Math.max(this._portraitBitmap.width || 1, this._portraitBitmap.height || 1);
        this._portraitSprite.scale.set(scale, scale);
      });
    }

    refresh() {
      const unlocked = $gameSystem.isTowerStageUnlocked(this._pageId, this._index);
      const defeated = $gameSystem.isTowerStageCompleted(this._pageId, this._index);
      this._isLocked = !unlocked;
      this._portraitSprite.visible = unlocked;
      if (this._lockedSprite) {
        this._lockedSprite.visible = !unlocked;
      }
      this.drawOverlay(!unlocked);
      this.drawRing(unlocked, defeated);
      this.drawLabel(unlocked);
    }

    drawOverlay(locked) {
      this._overlay.clear();
      // If a custom locked image is present, don't cover it
      if (locked && !this._lockedSprite) {
        // Solid black background for locked circles
        this._overlay.beginFill(0x000000, 1);
        this._overlay.drawCircle(0, 0, this._radius);
        this._overlay.endFill();
      }
    }

    drawRing(unlocked, defeated) {
      this._ring.clear();
      const color = defeated ? 0x88ff88 : unlocked ? 0x00ff00 : 0x666666;
      this._ring.lineStyle(4, color, 1);
      this._ring.drawCircle(0, 0, this._radius + 2);
    }

    drawLabel(unlocked) {
      const bmp = this._labelSprite.bitmap;
      bmp.clear();
      if (!unlocked) return; // hide labels for locked circles to prevent spoilers
      const label = this._config.label || `Stage ${this._index + 1}`;
      bmp.fontSize = 18;
      bmp.textColor = "#ffffff";
      bmp.drawText(label, 0, 0, bmp.width, bmp.height, "center");
    }

    hitTest(x, y) {
      return !this._isLocked && Math.sqrt(x * x + y * y) <= this._radius;
    }

    onClick() {
      if (this._isLocked) {
        this.playFailSe();
        return;
      }
      this.triggerClickEffect();
      this.playSuccessSe();
      if (this._onClick) {
        this._onClick({ index: this._index, config: this._config });
      }
    }

    update() {
      super.update();
      this.updateClickEffect();
    }

    triggerClickEffect() {
      this._clickEffectDuration = 18; // ~0.3s at 60fps
    }

    updateClickEffect() {
      if (this._clickEffectDuration <= 0) {
        this.scale.set(1, 1);
        return;
      }
      this._clickEffectDuration--;
      const t = this._clickEffectDuration / 18;
      const scale = 1 + 0.12 * (1 - t); // grows up to +12%, then eases back
      this.scale.set(scale, scale);

      // Light blue glow on ring during effect
      if (this._clickEffectDuration > 0) {
        this._ring.tint = 0x99ccff;
      } else {
        this._ring.tint = 0xffffff;
      }
    }

    playSuccessSe() {
      if (JackHoffx.TowerMode.successSe) {
        AudioManager.playSe({ name: JackHoffx.TowerMode.successSe, volume: 90, pitch: 100, pan: 0 });
      } else {
        SoundManager.playOk();
      }
    }

    playFailSe() {
      if (JackHoffx.TowerMode.failSe) {
        AudioManager.playSe({ name: JackHoffx.TowerMode.failSe, volume: 90, pitch: 100, pan: 0 });
      } else {
        SoundManager.playBuzzer();
      }
    }
  }
})();

