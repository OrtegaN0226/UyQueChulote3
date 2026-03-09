/*:
 * @target MZ
 * @plugindesc (v1.1) Arrow sequence mini-game - Press arrows in the correct order!
 * @author JackHoffx
 *
 * @param defaultSequenceLength
 * @type number
 * @text Default Sequence Length
 * @desc Default number of arrows in the sequence
 * @default 10
 * @min 1
 *
 * @param countdownDuration
 * @type number
 * @text Countdown Duration (frames)
 * @desc Frames before game starts (60 = 1 second)
 * @default 180
 *
 * @param inputTimeLimit
 * @type number
 * @text Input Time Limit (frames)
 * @desc Frames player has to press each arrow (60 = 1 second)
 * @default 120
 *
 * @param upArrowImage
 * @type file
 * @dir img/pictures/
 * @text Up Arrow Image
 * @desc Image to display above the up arrow (leave empty for none)
 *
 * @param rightArrowImage
 * @type file
 * @dir img/pictures/
 * @text Right Arrow Image
 * @desc Image to display right of the right arrow (leave empty for none)
 *
 * @param downArrowImage
 * @type file
 * @dir img/pictures/
 * @text Down Arrow Image
 * @desc Image to display below the down arrow (leave empty for none)
 *
 * @param leftArrowImage
 * @type file
 * @dir img/pictures/
 * @text Left Arrow Image
 * @desc Image to display left of the left arrow (leave empty for none)
 *
 * @param imageScale
 * @type number
 * @decimals 2
 * @text Image Scale
 * @desc Scale multiplier for images (1.0 = 100%, 0.5 = 50%, etc)
 * @default 1.0
 * @min 0.1
 * @max 3.0
 *
 * @param bgmName
 * @type file
 * @dir audio/bgm/
 * @text Background Music
 * @desc BGM to play during the minigame (leave empty for no music)
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
 * @param correctArrowSE
 * @type file
 * @dir audio/se/
 * @text Correct Arrow Sound
 * @desc Sound effect when player presses correct arrow (leave empty for default cursor sound)
 *
 * @param correctArrowVolume
 * @type number
 * @text Correct Arrow SE Volume
 * @desc Volume for correct arrow sound (0-100)
 * @default 90
 * @min 0
 * @max 100
 *
 * @param winGameSE
 * @type file
 * @dir audio/se/
 * @text Win Game Sound
 * @desc Sound effect when player wins the minigame (leave empty for default OK sound)
 *
 * @param winGameVolume
 * @type number
 * @text Win Game SE Volume
 * @desc Volume for win game sound (0-100)
 * @default 90
 * @min 0
 * @max 100
 *
 * @help
 * Script calls:
 *
 * $gameSystem.startArrowGame(successEventId, failureEventId, sequenceLength, upImg, rightImg, downImg, leftImg)
 *
 * - successEventId (int) : event to start when player wins (optional)
 * - failureEventId (int) : event to start when player fails (optional)
 * - sequenceLength (int) : number of arrows in sequence (optional, uses default if not provided)
 * - upImg, rightImg, downImg, leftImg (string) : image filenames from img/pictures/ (optional, overrides plugin params)
 *
 * Example:
 *   $gameSystem.startArrowGame(5, 6, 15);
 *   $gameSystem.startArrowGame(5, 6, 10, "option1", "option2", "option3", "option4");
 */

var JackHoffx = JackHoffx || {};
JackHoffx.ArrowGame = JackHoffx.ArrowGame || {};

(() => {
  const pluginParams = PluginManager.parameters("MZ_JackHoffx_Minigame") || {};
  JackHoffx.ArrowGame.defaultSequenceLength = Number(pluginParams.defaultSequenceLength || 10);
  JackHoffx.ArrowGame.countdownDuration = Number(pluginParams.countdownDuration || 180);
  JackHoffx.ArrowGame.inputTimeLimit = Number(pluginParams.inputTimeLimit || 120);
  JackHoffx.ArrowGame.upArrowImage = pluginParams.upArrowImage || "";
  JackHoffx.ArrowGame.rightArrowImage = pluginParams.rightArrowImage || "";
  JackHoffx.ArrowGame.downArrowImage = pluginParams.downArrowImage || "";
  JackHoffx.ArrowGame.leftArrowImage = pluginParams.leftArrowImage || "";
  JackHoffx.ArrowGame.imageScale = Number(pluginParams.imageScale || 1.0);
  JackHoffx.ArrowGame.bgmName = pluginParams.bgmName || "";
  JackHoffx.ArrowGame.bgmVolume = Number(pluginParams.bgmVolume || 90);
  JackHoffx.ArrowGame.bgmPitch = Number(pluginParams.bgmPitch || 100);
  JackHoffx.ArrowGame.bgmPan = Number(pluginParams.bgmPan || 0);
  JackHoffx.ArrowGame.correctArrowSE = pluginParams.correctArrowSE || "";
  JackHoffx.ArrowGame.correctArrowVolume = Number(pluginParams.correctArrowVolume || 90);
  JackHoffx.ArrowGame.winGameSE = pluginParams.winGameSE || "";
  JackHoffx.ArrowGame.winGameVolume = Number(pluginParams.winGameVolume || 90);
  JackHoffx.ArrowGame.isPlaying = false;

  // Start the arrow game
  Game_System.prototype.startArrowGame = function(successId, failId, sequenceLength, upImg, rightImg, downImg, leftImg) {
    if (!(SceneManager._scene instanceof Scene_Map)) return;
    JackHoffx.ArrowGame.isPlaying = true;
    SceneManager._scene._arrowGameWindow.setup(successId, failId, sequenceLength, upImg, rightImg, downImg, leftImg);
  };

  // Prevent movement while playing
  const _Game_Player_canMove = Game_Player.prototype.canMove;
  Game_Player.prototype.canMove = function() {
    return _Game_Player_canMove.call(this) && !JackHoffx.ArrowGame.isPlaying;
  };

  // Scene integration
  const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
  Scene_Map.prototype.createAllWindows = function() {
    _Scene_Map_createAllWindows.call(this);
    this.createArrowGameWindow();
  };

  Scene_Map.prototype.createArrowGameWindow = function() {
    const size = Math.min(Graphics.boxWidth, Graphics.boxHeight) * 0.6;
    const rect = new Rectangle(
      (Graphics.boxWidth - size) / 2,
      (Graphics.boxHeight - size) / 2,
      size,
      size
    );
    this._arrowGameWindow = new Window_ArrowGame(rect);
    this.addWindow(this._arrowGameWindow);
  };

  // Arrow Game Window
  class Window_ArrowGame extends Window_Base {
    initialize(rect) {
      super.initialize(rect);
      this.visible = false;
      this.hasInitialized = false;
      
      // Arrow box configuration
      this.boxSize = Math.min(this.width, this.height) * 0.25;
      this.boxPadding = this.boxSize * 0.3;
    }

    setup(successId, failId, sequenceLength, upImg, rightImg, downImg, leftImg) {
      this.visible = true;
      this.hasInitialized = true;
      this.successEventId = Number(successId) || 0;
      this.failEventId = Number(failId) || 0;
      this.sequenceLength = Number(sequenceLength) || JackHoffx.ArrowGame.defaultSequenceLength;
      
      // Image filenames (use provided or fall back to plugin params)
      this.arrowImages = [
        upImg || JackHoffx.ArrowGame.upArrowImage,
        rightImg || JackHoffx.ArrowGame.rightArrowImage,
        downImg || JackHoffx.ArrowGame.downArrowImage,
        leftImg || JackHoffx.ArrowGame.leftArrowImage
      ];
      
      // Generate random sequence without consecutive duplicates
      this.sequence = [];
      for (let i = 0; i < this.sequenceLength; i++) {
        let next;
        do {
          next = Math.floor(Math.random() * 4); // 0=up, 1=right, 2=down, 3=left
        } while (i > 0 && next === this.sequence[i - 1]); // avoid back-to-back repeats
        this.sequence.push(next);
      }
      
      // Game state
      this.currentIndex = 0;
      this.gameState = "countdown"; // countdown, playing, success, failure
      this.countdownTimer = JackHoffx.ArrowGame.countdownDuration;
      this.inputTimer = 0;
      this.isPaused = false; // Pause during transitions
      
      // Store current BGM and play minigame BGM if specified
      if (JackHoffx.ArrowGame.bgmName) {
        this._previousBgm = AudioManager.saveBgm();
        AudioManager.playBgm({
          name: JackHoffx.ArrowGame.bgmName,
          volume: JackHoffx.ArrowGame.bgmVolume,
          pitch: JackHoffx.ArrowGame.bgmPitch,
          pan: JackHoffx.ArrowGame.bgmPan
        });
      }
      
      this.createSprites();
      this.refreshDisplay();
    }

    createSprites() {
      // Remove existing children
      this.removeChildren();
      
      // Background
      this._bgSprite = new Sprite(new Bitmap(this.width, this.height));
      this._bgSprite.bitmap.fillRect(0, 0, this.width, this.height, "rgba(0,0,0,0.7)");
      this.addChild(this._bgSprite);

      // Create arrow boxes (up, right, down, left)
      this._arrowBoxes = [];
      const positions = [
        { x: this.width / 2 - this.boxSize / 2, y: this.boxPadding }, // up
        { x: this.width - this.boxSize - this.boxPadding, y: this.height / 2 - this.boxSize / 2 }, // right
        { x: this.width / 2 - this.boxSize / 2, y: this.height - this.boxSize - this.boxPadding }, // down
        { x: this.boxPadding, y: this.height / 2 - this.boxSize / 2 } // left
      ];

      const arrows = ["↑", "→", "↓", "←"];
      
      for (let i = 0; i < 4; i++) {
        const box = {};
        
        // Box background
        box.bg = new Sprite(new Bitmap(this.boxSize, this.boxSize));
        box.bg.x = positions[i].x;
        box.bg.y = positions[i].y;
        this.updateBoxColor(box.bg, false, false);
        this.addChild(box.bg);
        
        // Arrow text
        box.text = new Bitmap(this.boxSize, this.boxSize);
        box.text.fontSize = this.boxSize * 0.6;
        box.text.textColor = "#ffffff";
        box.text.outlineColor = "black";
        box.text.outlineWidth = 4;
        box.text.drawText(arrows[i], 0, 0, this.boxSize, this.boxSize, "center");
        
        box.textSprite = new Sprite(box.text);
        box.textSprite.x = positions[i].x;
        box.textSprite.y = positions[i].y;
        this.addChild(box.textSprite);
        
        // Load and display image if provided
        if (this.arrowImages[i]) {
          const bitmap = ImageManager.loadPicture(this.arrowImages[i]);
          box.imageSprite = new Sprite(bitmap);
          
          // Position images outside the boxes
          const imageGap = 10; // Gap between box and image
          const scale = JackHoffx.ArrowGame.imageScale;
          box.imageSprite.scale.x = scale;
          box.imageSprite.scale.y = scale;
          
          // Wait for bitmap to load to get proper dimensions
          bitmap.addLoadListener(() => {
            const imgWidth = bitmap.width * scale;
            const imgHeight = bitmap.height * scale;
            
            if (i === 0) { // Up - image above
              box.imageSprite.x = positions[i].x + (this.boxSize - imgWidth) / 2;
              box.imageSprite.y = positions[i].y - imgHeight - imageGap;
            } else if (i === 1) { // Right - image to the right
              box.imageSprite.x = positions[i].x + this.boxSize + imageGap;
              box.imageSprite.y = positions[i].y + (this.boxSize - imgHeight) / 2;
            } else if (i === 2) { // Down - image below
              box.imageSprite.x = positions[i].x + (this.boxSize - imgWidth) / 2;
              box.imageSprite.y = positions[i].y + this.boxSize + imageGap;
            } else if (i === 3) { // Left - image to the left
              box.imageSprite.x = positions[i].x - imgWidth - imageGap;
              box.imageSprite.y = positions[i].y + (this.boxSize - imgHeight) / 2;
            }
          });
          
          this.addChild(box.imageSprite);
        }
        
        // Store position for click detection
        box.rect = new Rectangle(positions[i].x, positions[i].y, this.boxSize, this.boxSize);
        
        this._arrowBoxes.push(box);
      }

      // Info text at top (above images)
      this._infoBitmap = new Bitmap(this.width, 60);
      this._infoSprite = new Sprite(this._infoBitmap);
      this._infoSprite.y = -150; // Position higher to avoid image overlap
      this.addChild(this._infoSprite);
      
      // Progress text at bottom
      this._progressBitmap = new Bitmap(this.width, 40);
      this._progressSprite = new Sprite(this._progressBitmap);
      this._progressSprite.y = this.height - 35;
      this.addChild(this._progressSprite);
    }

    updateBoxColor(boxSprite, isActive, isCorrect) {
      const bitmap = boxSprite.bitmap;
      bitmap.clear();
      
      let color;
      if (isCorrect) {
        color = "rgba(0,255,0,0.7)"; // Green for correct
      } else if (isActive) {
        color = "rgba(255,165,0,0.9)"; // Orange for active
      } else {
        color = "rgba(100,100,100,0.5)"; // Gray for inactive
      }
      
      bitmap.fillRect(0, 0, this.boxSize, this.boxSize, color);
      // Border
      bitmap.fillRect(0, 0, this.boxSize, 4, "white");
      bitmap.fillRect(0, 0, 4, this.boxSize, "white");
      bitmap.fillRect(0, this.boxSize - 4, this.boxSize, 4, "white");
      bitmap.fillRect(this.boxSize - 4, 0, 4, this.boxSize, "white");
    }

    refreshDisplay() {
      // Update info text
      this._infoBitmap.clear();
      this._infoBitmap.fontSize = 32;
      this._infoBitmap.textColor = "#ffffff";
      this._infoBitmap.outlineColor = "black";
      this._infoBitmap.outlineWidth = 5;
      
      if (this.gameState === "countdown") {
        const seconds = Math.ceil(this.countdownTimer / 60);
        this._infoBitmap.drawText("Get Ready! " + seconds, 0, 0, this.width, 60, "center");
      }
      // No text during "playing" state - players already know what to do
      
      // Update progress text
      this._progressBitmap.clear();
      this._progressBitmap.fontSize = 24;
      this._progressBitmap.textColor = "#ffffff";
      this._progressBitmap.outlineColor = "black";
      this._progressBitmap.outlineWidth = 4;
      const progress = this.currentIndex + " / " + this.sequenceLength;
      this._progressBitmap.drawText("Progress: " + progress, 0, 0, this.width, 40, "center");
      
      // Update box colors
      if (this.gameState === "playing" && this.currentIndex < this.sequence.length) {
        const activeBox = this.sequence[this.currentIndex];
        for (let i = 0; i < 4; i++) {
          this.updateBoxColor(this._arrowBoxes[i].bg, i === activeBox, false);
        }
      } else {
        for (let i = 0; i < 4; i++) {
          this.updateBoxColor(this._arrowBoxes[i].bg, false, false);
        }
      }
    }

    update() {
      super.update();
      if (!this.hasInitialized) return;
      
      if (this.gameState === "countdown") {
        this.updateCountdown();
      } else if (this.gameState === "playing") {
        this.updatePlaying();
      }
    }

    updateCountdown() {
      this.countdownTimer--;
      if (this.countdownTimer % 60 === 0) {
        this.refreshDisplay();
      }
      
      if (this.countdownTimer <= 0) {
        this.gameState = "playing";
        this.inputTimer = JackHoffx.ArrowGame.inputTimeLimit;
        this.refreshDisplay();
      }
    }

    updatePlaying() {
      if (this.isPaused) return; // Don't update during transitions
      
      this.inputTimer--;
      
      // Check for timeout
      if (this.inputTimer <= 0) {
        this.onFailure();
        return;
      }
      
      // Check for input
      this.checkInput();
    }

    checkInput() {
      let pressedDirection = -1;
      
      // Check keyboard
      if (Input.isTriggered("up")) {
        pressedDirection = 0;
      } else if (Input.isTriggered("right")) {
        pressedDirection = 1;
      } else if (Input.isTriggered("down")) {
        pressedDirection = 2;
      } else if (Input.isTriggered("left")) {
        pressedDirection = 3;
      }
      
      // Check touch/click on boxes or images
      if (TouchInput.isTriggered()) {
        // Convert screen coordinates to window content coordinates
        const x = this.canvasToLocalX(TouchInput.x);
        const y = this.canvasToLocalY(TouchInput.y);
        
        for (let i = 0; i < 4; i++) {
          // Check arrow box
          const rect = this._arrowBoxes[i].rect;
          if (x >= rect.x && x <= rect.x + rect.width &&
              y >= rect.y && y <= rect.y + rect.height) {
            pressedDirection = i;
            break;
          }
          
          // Check image sprite if it exists
          const imgSprite = this._arrowBoxes[i].imageSprite;
          if (imgSprite && imgSprite.bitmap && imgSprite.bitmap.isReady()) {
            const imgX = imgSprite.x;
            const imgY = imgSprite.y;
            const imgW = imgSprite.bitmap.width * imgSprite.scale.x;
            const imgH = imgSprite.bitmap.height * imgSprite.scale.y;
            
            if (x >= imgX && x <= imgX + imgW &&
                y >= imgY && y <= imgY + imgH) {
              pressedDirection = i;
              break;
            }
          }
        }
      }
      
      // Check for cancel
      if (Input.isTriggered("cancel")) {
        this.onCancel();
        return;
      }
      
      // Process input
      if (pressedDirection >= 0) {
        if (pressedDirection === this.sequence[this.currentIndex]) {
          this.onCorrectInput();
        } else {
          this.onWrongInput();
        }
      }
    }

    onCorrectInput() {
      // Play correct arrow sound
      if (JackHoffx.ArrowGame.correctArrowSE) {
        AudioManager.playSe({
          name: JackHoffx.ArrowGame.correctArrowSE,
          volume: JackHoffx.ArrowGame.correctArrowVolume,
          pitch: 100,
          pan: 0
        });
      } else {
        SoundManager.playCursor();
      }
      
      // Pause game during transition
      this.isPaused = true;
      
      // Flash green
      const activeBox = this.sequence[this.currentIndex];
      this.updateBoxColor(this._arrowBoxes[activeBox].bg, false, true);
      
      this.currentIndex++;
      
      if (this.currentIndex >= this.sequence.length) {
        // Won the game!
        setTimeout(() => this.onSuccess(), 300);
      } else {
        // Next arrow - unpause after transition
        setTimeout(() => {
          this.inputTimer = JackHoffx.ArrowGame.inputTimeLimit;
          this.isPaused = false;
          this.refreshDisplay();
        }, 300);
      }
    }

    onWrongInput() {
      SoundManager.playBuzzer();
      this.onFailure();
    }

    onSuccess() {
      // Play win game sound
      if (JackHoffx.ArrowGame.winGameSE) {
        AudioManager.playSe({
          name: JackHoffx.ArrowGame.winGameSE,
          volume: JackHoffx.ArrowGame.winGameVolume,
          pitch: 100,
          pan: 0
        });
      } else {
        SoundManager.playOk();
      }
      
      if (this.successEventId > 0) {
        const ev = $gameMap.event(this.successEventId);
        if (ev) ev.start();
      }
      
      this.end();
    }

    onFailure() {
      SoundManager.playBuzzer();
      
      if (this.failEventId > 0) {
        const ev = $gameMap.event(this.failEventId);
        if (ev) ev.start();
      }
      
      this.end();
    }

    onCancel() {
      // Treat cancel/escape as an immediate failure while the game is active
      this.onFailure();
    }

    end() {
      // Restore previous BGM if we changed it
      if (JackHoffx.ArrowGame.bgmName && this._previousBgm) {
        AudioManager.replayBgm(this._previousBgm);
      }
      
      this.visible = false;
      this.hasInitialized = false;
      JackHoffx.ArrowGame.isPlaying = false;
    }
  }
})();
