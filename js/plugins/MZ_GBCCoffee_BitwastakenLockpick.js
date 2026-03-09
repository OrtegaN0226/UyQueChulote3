/*:
 * @target MZ
 * @plugindesc (v1.2) Lockpick mini-game for RPG Maker MZ — keep trying until picks exhausted + show quantity in UI.
 * @author Adapted / JackHoffx
 *
 * @param lockpickItemId
 * @type item
 * @text Lockpick item ID
 * @default 1
 *
 * @param lockpickExpVariableId
 * @type variable
 * @text Lockpick EXP variable
 * @default 1
 *
 * @param lockpickLvlSchema
 * @type text[]
 * @text Lockpick level schema
 *
 * @param ContinueUntilEmpty
 * @type boolean
 * @text Continue Until Empty
 * @desc If true, the lockpicking mini-game will keep reappearing until the party has 0 lockpicks.
 * @default true
 *
 * @help
 * Script calls:
 *
 * $gameSystem.startLockpicking(successEventId, failureEventId, speedMultiplier, targetWidth, continueFlag)
 *
 * - successEventId (int) : event to start when an attempt succeeds (optional)
 * - failureEventId (int) : event to start when player runs out of picks (optional)
 * - speedMultiplier (float) : movement speed multiplier (optional)
 * - targetWidth (int) : width of orange success zone (optional)
 * - continueFlag (boolean) : override plugin parameter. If true, keep running until no picks left.
 *
 * Example:
 *   $gameSystem.startLockpicking(5, 6, 1.2, 80, true);
 *
 * Also exposes player's lockpicking level:
 *   $gamePlayer.lockpickingLevel()
 */

var GBCCoffee = GBCCoffee || {};
GBCCoffee.Lockpick = GBCCoffee.Lockpick || {};

(() => {
  const pluginParams = PluginManager.parameters("MZ_GBCCoffee_BitwastakenLockpick") || {};
  GBCCoffee.Lockpick.lockpickItemId = Number(pluginParams.lockpickItemId || 1);
  GBCCoffee.Lockpick.lockpickExpVariableId = Number(pluginParams.lockpickExpVariableId || 1);
  GBCCoffee.Lockpick.speedMultiplier = 1.5 * 0.34;
  GBCCoffee.Lockpick.targetWidth = 50;
  GBCCoffee.Lockpick.pickWidth = 10;
  GBCCoffee.Lockpick.isPickingLocks = false;
  GBCCoffee.Lockpick.continueUntilEmpty = (pluginParams.ContinueUntilEmpty === "true" || pluginParams.ContinueUntilEmpty === true);

  const LOCKPICK_MAX_EXP = 100;
  const clampLockpickExp = (v) => Math.max(0, Math.min(LOCKPICK_MAX_EXP, Number(v || 0)));
  const currentLockpickExp = () => clampLockpickExp($gameVariables.value(GBCCoffee.Lockpick.lockpickExpVariableId));
  const addLockpickExp = (amount) => {
    const next = clampLockpickExp(currentLockpickExp() + amount);
    $gameVariables.setValue(GBCCoffee.Lockpick.lockpickExpVariableId, next);
  };

  // --- Start lockpicking: accepts optional continue flag at end ---
  Game_System.prototype.startLockpicking = function(successId, failId, speed, targetWidth, continueFlag) {
    if (!(SceneManager._scene instanceof Scene_Map)) return;
    GBCCoffee.Lockpick.isPickingLocks = true;
    // If continueFlag explicitly provided, use it; otherwise use plugin param
    const cont = typeof continueFlag === "boolean" ? continueFlag : GBCCoffee.Lockpick.continueUntilEmpty;
    SceneManager._scene._lockpickWindow.setup(successId, failId, speed, targetWidth, cont);
  };

  // Prevent movement while lockpicking
  const _Game_Player_canMove = Game_Player.prototype.canMove;
  Game_Player.prototype.canMove = function() {
    return _Game_Player_canMove.call(this) && !GBCCoffee.Lockpick.isPickingLocks;
  };

  // Player lockpicking level
  Game_Player.prototype.lockpickingLevel = function() {
    // Legacy compatibility: return capped EXP as a simple level surrogate
    return currentLockpickExp();
  };

  // Scene integration
  const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
  Scene_Map.prototype.createAllWindows = function() {
    _Scene_Map_createAllWindows.call(this);
    this.createLockpickWindow();
  };

  // Block opening the main menu while lockpicking; treat ESC as a loss instead.
  const _Scene_Map_updateCallMenu = Scene_Map.prototype.updateCallMenu;
  Scene_Map.prototype.updateCallMenu = function() {
    if (GBCCoffee.Lockpick.isPickingLocks) {
      this._menuCalled = false;
      return;
    }
    _Scene_Map_updateCallMenu.call(this);
  };

  Scene_Map.prototype.createLockpickWindow = function() {
    const rect = new Rectangle(
      Graphics.boxWidth * 0.05,
      Graphics.boxHeight * 0.2,
      Graphics.boxWidth * 0.9,
      Graphics.boxHeight * 0.6
    );
    this._lockpickWindow = new Window_Lockpick(rect);
    this.addWindow(this._lockpickWindow);
  };

  // Window
  class Window_Lockpick extends Window_Base {
  initialize(rect) {
    super.initialize(rect);
    this.visible = false;
    this.hasInitialized = false;
    this._continueUntilEmpty = GBCCoffee.Lockpick.continueUntilEmpty;
  }

    setup(successId, failId, speed, targetWidth, continueFlag) {
      this.visible = true;
      this.hasInitialized = true;
      this.successEventId = Number(successId) || 0;
      this.failEventId = Number(failId) || 0;
      this.speedMultiplier = Number(speed) || GBCCoffee.Lockpick.speedMultiplier;
      this.baseTargetWidth = Math.min(Number(targetWidth) || GBCCoffee.Lockpick.targetWidth, this.width);
      this.updateTargetWidth(true);
      this.pickWidth = GBCCoffee.Lockpick.pickWidth;
      this.tappedLeft = true;
      this.tappedRight = false;
      this._continueUntilEmpty = (typeof continueFlag === "boolean") ? continueFlag : GBCCoffee.Lockpick.continueUntilEmpty;
      this.createSprites();
      this.refreshQtyText();
      this.refreshLevelText();
    }

    createSprites() {
      // remove existing children (safe reset)
      this.removeChildren();
      
      // Background
      this._bgSprite = new Sprite(new Bitmap(this.width, this.height));
      this._bgSprite.bitmap.fillRect(0, 0, this.width, this.height, "rgba(0,0,0,0.3)");
      this.addChild(this._bgSprite);

      // Target
      this._targetSprite = new Sprite(new Bitmap(this.targetWidth, this.height));
      this._targetSprite.bitmap.fillRect(0, 0, this.targetWidth, this.height, "orange");
      this._targetSprite.x = Math.random() * (this.width - this.targetWidth);
      this.addChild(this._targetSprite);

      // Moving line
      this._movingSprite = new Sprite(new Bitmap(this.pickWidth, this.height));
      this._movingSprite.bitmap.fillRect(0, 0, this.pickWidth, this.height, "red");
      this._movingSprite.x = 0;
      this.addChild(this._movingSprite);

      // Lockpick qty text - positioned above the window
      this._lockpickQtyBitmap = new Bitmap(this.width, 50);
      this._lockpickQtySprite = new Sprite(this._lockpickQtyBitmap);
      this._lockpickQtySprite.y = -55; // Position above the window
      this.addChild(this._lockpickQtySprite);

      // Lockpick level text - positioned below the bar
      this._lockpickLevelBitmap = new Bitmap(this.width, 40);
      this._lockpickLevelSprite = new Sprite(this._lockpickLevelBitmap);
      this._lockpickLevelSprite.y = this.height + 5;
      this.addChild(this._lockpickLevelSprite);
    }

    refreshQtyText() {
      if (!this._lockpickQtyBitmap) return;
      const qty = $gameParty.numItems($dataItems[GBCCoffee.Lockpick.lockpickItemId]);
      this._lockpickQtyBitmap.clear();
      this._lockpickQtyBitmap.fontSize = 28;
      this._lockpickQtyBitmap.textColor = "#ffffff";
      this._lockpickQtyBitmap.outlineColor = "black";
      this._lockpickQtyBitmap.outlineWidth = 6;
      const text = "Lockpicks remaining: " + qty;
      this._lockpickQtyBitmap.drawText(text, 0, 0, this.width, 50, "center");
    }

    refreshLevelText() {
      if (!this._lockpickLevelBitmap) return;
      this._lockpickLevelBitmap.clear();
      this._lockpickLevelBitmap.fontSize = 20;
      this._lockpickLevelBitmap.textColor = "#ffffff";
      this._lockpickLevelBitmap.outlineColor = "black";
      this._lockpickLevelBitmap.outlineWidth = 4;
      const text = "Lock Picking level: " + currentLockpickExp();
      this._lockpickLevelBitmap.drawText(text, 0, 0, this.width, 40, "center");
    }

    update() {
      super.update();
      if (this.hasInitialized) {
        this.updateMovement();
        this.updateInput();
      }
    }

    updateMovement() {
      if (!this._movingSprite) return;
      const effSpeed = this.effectiveSpeedMultiplier();
      if (this.tappedLeft) {
        const maxX = this.width - this.pickWidth;
        this._movingSprite.x += 10 * effSpeed;
        if (this._movingSprite.x >= maxX) {
          this._movingSprite.x = maxX;
          this.tappedLeft = false;
          this.tappedRight = true;
        }
      } else {
        this._movingSprite.x -= 10 * effSpeed;
        if (this._movingSprite.x <= 0) {
          this._movingSprite.x = 0;
          this.tappedLeft = true;
          this.tappedRight = false;
        }
      }
    }

    effectiveSpeedMultiplier() {
      // Slow movement by up to 75% when EXP reaches 100
      const exp = currentLockpickExp();
      const slowFactor = 1 - 0.75 * (exp / LOCKPICK_MAX_EXP);
      return this.speedMultiplier * slowFactor;
    }

    updateTargetWidth(resetTarget = false) {
      const exp = currentLockpickExp();
      const widened = this.baseTargetWidth * (1 + exp / LOCKPICK_MAX_EXP); // up to 2x
      this.targetWidth = Math.min(this.width, Math.floor(widened));
      if (this._targetSprite) {
        this._targetSprite.bitmap = new Bitmap(this.targetWidth, this.height);
        this._targetSprite.bitmap.fillRect(0, 0, this.targetWidth, this.height, "orange");
        if (resetTarget) {
          this._targetSprite.x = Math.random() * (this.width - this.targetWidth);
        } else {
          this._targetSprite.x = Math.min(this._targetSprite.x, this.width - this.targetWidth);
        }
      }
    }

    updateInput() {
      if (Input.isTriggered("ok") || TouchInput.isTriggered()) {
        this.attempt();
      } else if (Input.isTriggered("cancel")) {
        this.failFromMenu();
      }
    }

    attempt() {
      const inside = (this._movingSprite.x > this._targetSprite.x) &&
                     (this._movingSprite.x < this._targetSprite.x + this.targetWidth);
      if (inside) {
        this.onLockpickSuccess();
      } else {
        this.onLockpickFail();
      }
    }

   onLockpickSuccess() {
	  SoundManager.playOk();
	  // Success DOES consume a lockpick
	  $gameParty.loseItem($dataItems[GBCCoffee.Lockpick.lockpickItemId], 1);
      addLockpickExp(5);
      this.updateTargetWidth();
      this.refreshLevelText();
	  
	  if (this.successEventId > 0) {
		const ev = $gameMap.event(this.successEventId);
		if (ev) ev.start();
	  }

	  // Always end the minigame on success
	  this.end();
	}

    onLockpickFail() {
      SoundManager.playBuzzer();
      // consume a lockpick
      $gameParty.loseItem($dataItems[GBCCoffee.Lockpick.lockpickItemId], 1);
      addLockpickExp(1);
      this.updateTargetWidth();
      this.refreshLevelText();
      const picks = $gameParty.numItems($dataItems[GBCCoffee.Lockpick.lockpickItemId]);
      if (picks <= 0) {
        // player out of picks — end and run fail event
        if (this.failEventId > 0) {
          const fev = $gameMap.event(this.failEventId);
          if (fev) fev.start();
        }
        this.end();
      } else {
        // still have picks — update qty text and continue
        this.refreshQtyText();
      this.refreshLevelText();
        this.prepareNextRound();
      }
    }

    prepareNextRound() {
      // Keep target in same position - only reset moving sprite
      this._movingSprite.x = 0;
      this.tappedLeft = true;
      this.tappedRight = false;
      this.refreshQtyText();
      // keep visible and running
      GBCCoffee.Lockpick.isPickingLocks = true;
      this.visible = true;
      this.hasInitialized = true;
    }

    failFromMenu() {
      // Treat opening the menu / pressing ESC as a fail, but refund the pick so net zero loss.
      SoundManager.playCancel();
      const item = $dataItems[GBCCoffee.Lockpick.lockpickItemId];
      const hadPick = $gameParty.numItems(item) > 0;
      if (hadPick) {
        $gameParty.loseItem(item, 1);
      }
      // Do not reward EXP for quitting;
      addLockpickExp(0);
      this.updateTargetWidth();
      this.refreshLevelText();
      if (this.failEventId > 0) {
        const fev = $gameMap.event(this.failEventId);
        if (fev) fev.start();
      }
      this.end();
      if (hadPick) {
        $gameParty.gainItem(item, 1); // refund the consumed pick
      }
    }

    end() {
      this.visible = false;
      this.hasInitialized = false;
      GBCCoffee.Lockpick.isPickingLocks = false;
    }
  }
})();
