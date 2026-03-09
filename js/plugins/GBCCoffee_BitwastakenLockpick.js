/*:
 * @url https://coffeenahc.itch.io/
 * @target MZ
 * @author coffeenahc
 * @plugindesc (v.1.0) Lockpick system. Commissioned by bitwastaken on fiverr. Do not distribute.
 * 
 * @param lockpickItemId
 * @text Lockpick item id
 * @desc Item id of the lockpick item
 * @type item
 * 
 * @param lockpickExpVariableId
 * @text Lockpick exp variable
 * @desc Variable to use to track lockpicking exp
 * @type variable
 * 
 * @help
 * SCRIPT CALLS: 
 * 
 * $gameSystem.startLockpicking(onSuccessEventId, onFailureEventId, speedMultiplier, targetWidth)
 * 
 * - where onSuccessEventId is the id of the event to run when lockpicking is successful.
 * - where onFailureEventId is the id of the event to run when lockpicking is not successful.
 * - where speedMultiplier is speed at which the red line pans left and right (Default is 1). OPTIONAL PARAMETER.
 * - where targetWidth is the width of the target (Default is 50). OPTIONAL PARAMETER.
 * 
 * $gamePlayer.lockpickingLevel() returns the level of the player. 
 */

var GBCCoffee = GBCCoffee || {};
GBCCoffee.Bitwastaken = {};
GBCCoffee.Bitwastaken.Lockpick = {
    requiredPickingLvl: 0,
    pickingExpGrant: 0,
    speedMultiplier: 1.5,
    targetWidth: 50,
    pickWidth: 10,
    lockpickItemId: parseInt(PluginManager.parameters("GBCCoffee_BitwastakenLockpick")["lockpickItemId"]),
    lockpickExpVariableId: parseInt(PluginManager.parameters("GBCCoffee_BitwastakenLockpick")["lockpickExpVariableId"]) || 19,
    isPickingLocks: false
};

const LOCKPICK_MAX_EXP = 100;
function clampLockpickExp(value) {
    return Math.max(0, Math.min(LOCKPICK_MAX_EXP, value));
}

function addLockpickExp(amount) {
    const varId = GBCCoffee.Bitwastaken.Lockpick.lockpickExpVariableId;
    const current = Number($gameVariables.value(varId) || 0);
    $gameVariables.setValue(varId, clampLockpickExp(current + amount));
}

function currentLockpickExp() {
    const varId = GBCCoffee.Bitwastaken.Lockpick.lockpickExpVariableId;
    return clampLockpickExp(Number($gameVariables.value(varId) || 0));
}

Game_System.prototype.startLockpicking = function(onSuccessEventId, onFailureEventId, speedMultiplier, targetWidth) {
    if (!(SceneManager._scene instanceof Scene_Map)) return;
    GBCCoffee.Bitwastaken.Lockpick.isPickingLocks = true;
    SceneManager._scene._lockpickWindow.setup(onSuccessEventId, onFailureEventId, speedMultiplier, targetWidth);
};

let gbccoffee_bitwastaken_gameplayer_canmove = Game_Player.prototype.canMove;
Game_Player.prototype.canMove = function() {
    return gbccoffee_bitwastaken_gameplayer_canmove.call(this) && !GBCCoffee.Bitwastaken.Lockpick.isPickingLocks;
};

let gbccoffee_bitwastaken_scenemap_createallwindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    gbccoffee_bitwastaken_scenemap_createallwindows.call(this);
    this.createLockpickingWindow();
};

Scene_Map.prototype.createLockpickingWindow = function() {
    this._lockpickWindow = new Window_Lockpick(this.lockpickWindowRect());
    this.addWindow(this._lockpickWindow);
};

let gbccoffee_bitwastaken_scenemap_ismaptouchok = Scene_Map.prototype.isMapTouchOk;
Scene_Map.prototype.isMapTouchOk = function() {
    return gbccoffee_bitwastaken_scenemap_ismaptouchok.call(this) && !this._lockpickWindow.visible;
};

let gbccoffee_bitwastaken_scenemap_ismenuenabled = Scene_Map.prototype.isMenuEnabled;
Scene_Map.prototype.isMenuEnabled = function() {
    return gbccoffee_bitwastaken_scenemap_ismenuenabled.call(this) && !this._lockpickWindow.visible;
};

Scene_Map.prototype.lockpickWindowRect = function() {
    let rect = new Rectangle();
    rect.width = Graphics.boxWidth * 0.9;
    rect.height = Graphics.boxHeight * 0.6;
    rect.x = (Graphics.boxWidth - rect.width) / 2;
    rect.y = (Graphics.boxHeight - rect.height) / 2;
    return rect;
};

function Window_Lockpick() {
    this.initialize.apply(this, arguments);
}

Window_Lockpick.prototype = Object.create(Window_Selectable.prototype);
Window_Lockpick.prototype.constructor = Window_Selectable;

Window_Lockpick.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect.x, rect.y, rect.width, rect.height);
    this.hasInitialized = false;
    this.visible =  false;
};

Window_Lockpick.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    this.updateMovingSprite();
    this.updatePlayerInput();
};

Window_Lockpick.prototype.updateMovingSprite = function() {
    if (!this.hasInitialized) return;
    if (this.tappedLeft) {
        let maxX = this.width - this.pickWidth;
        if (this._movingSprite.x < maxX) {
            this._movingSprite.x = Math.min(this._movingSprite.x + (10*this.effectiveSpeedMultiplier()), maxX);
        } else {
            this._movingSprite.x = maxX;
            this.tappedLeft = false;
            this.tappedRight = true;
        }
    } else if (this.tappedRight) {
        let minX = 0;
        if (this._movingSprite.x > minX) {
            this._movingSprite.x = Math.max(this._movingSprite.x - (10*this.effectiveSpeedMultiplier()), minX);
        } else {
            this._movingSprite.x = minX;
            this.tappedLeft = true;
            this.tappedRight = false;
        }
    }
};

Window_Lockpick.prototype.updatePlayerInput = function() {
    if (!this.hasInitialized) return;
    if (Input.isTriggered("ok") || TouchInput.isTriggered()) {
        this.onLockpickAttempt();
    } else if (Input.isTriggered("cancel") || TouchInput.isCancelled()) {
        this.onLockpickCancel();
    }
};

Window_Lockpick.prototype.setup = function(onSuccessEventId, onFailureEventId, speedMultiplier, targetWidth) {
    this.hasInitialized = false;
    this.tappedLeft = true;
    this.tappedRight = false;
    this.baseSpeedMultiplier = speedMultiplier || GBCCoffee.Bitwastaken.Lockpick.speedMultiplier;
    this.targetWidth = Math.min(targetWidth || GBCCoffee.Bitwastaken.Lockpick.targetWidth, this.width);
    this.pickWidth = GBCCoffee.Bitwastaken.Lockpick.pickWidth;
    this.successEventId = parseInt(onSuccessEventId);
    this.failEventId = parseInt(onFailureEventId);
    this.drawBackground();
    this.drawTargetSprite();
    this.drawMovingSprite();
    this.drawLockpickQtyText();
    this.visible = true;
    this.hasInitialized = true;
};

Window_Lockpick.prototype.drawBackground = function() {
    if (this._bgSprite) return;
    this._bgSprite = new Sprite(new Bitmap(this.width, this.height));
    this._bgSprite.bitmap.fillRect(0,0,this.width, this.height, "rgba(0,0,0,0.3)");
    this.addChild(this._bgSprite);
};

Window_Lockpick.prototype.drawTargetSprite = function() {
    if (!this._targetSprite) {
        this._targetSprite = new Sprite();
    } else {
        this._targetSprite.bitmap.clear();
    }
    this._targetSprite.bitmap = new Bitmap(this.targetWidth, this.height);
    this._targetSprite.bitmap.fillRect(0,0,this.targetWidth, this.height, "orange");
    let minX = 0;
    let maxX = (this.width - this.targetWidth);
    this._targetSprite.x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    this.addChild(this._targetSprite);
};

Window_Lockpick.prototype.drawMovingSprite = function() {
    if (!this._movingSprite) {
        this._movingSprite = new Sprite();
        this._movingSprite.bitmap = new Bitmap(this.pickWidth, this.height);
    }  else {
        this._movingSprite.bitmap.clear();
    }
    this._movingSprite.bitmap.fillRect(0,0,this.pickWidth, this.height, "red");
    this._movingSprite.x = 0;
    this.addChild(this._movingSprite);
};

Window_Lockpick.prototype.drawLockpickQtyText = function() {
    if (this._lockpickQtyText) return;
    this._lockpickQtyText = new PIXI.Text("Lockpick(s) in possession: " + $gameParty.numItems($dataItems[GBCCoffee.Bitwastaken.Lockpick.lockpickItemId]), {
        fontFamily: 'GameFont',
        fontSize: 20,
        stroke: 'black',
        fill: 'white',
    });
    this._lockpickQtyText.y = -20;
    this.addChild(this._lockpickQtyText);
};

Window_Lockpick.prototype.effectiveSpeedMultiplier = function() {
    // Slow by up to 50% at max exp (100)
    const exp = currentLockpickExp();
    const slowFactor = 1 - 0.5 * (exp / LOCKPICK_MAX_EXP);
    return this.baseSpeedMultiplier * slowFactor;
};

Window_Lockpick.prototype.onLockpickAttempt = function() {
    if (this._movingSprite.x > this._targetSprite.x && this._movingSprite.x < this._targetSprite.x + this.targetWidth) {
        this.onLockpickSuccess();
    } else {
        this.onLockpickFail();
    }
};

Window_Lockpick.prototype.onLockpickSuccess = function() {
    SoundManager.playOk();
    addLockpickExp(5);
    GBCCoffee.Bitwastaken.Lockpick.isPickingLocks = false;
    this.visible = false;
    let successEvent = $gameMap.event(this.successEventId);
    if (successEvent) {
        successEvent.start();
    } else {
        console.error("Attempt to run success event w/ event id " + this.successEventId + ", but event does not exist.");
    }
    this.hasInitialized = false;
};

Window_Lockpick.prototype.onLockpickFail = function() {
    SoundManager.playBuzzer();
    addLockpickExp(1);
    $gameParty.loseItem($dataItems[GBCCoffee.Bitwastaken.Lockpick.lockpickItemId], 1);
    if ($gameParty.numItems($dataItems[GBCCoffee.Bitwastaken.Lockpick.lockpickItemId]) <= 0) {
        GBCCoffee.Bitwastaken.Lockpick.isPickingLocks = false;
        this.visible = false;
        let failEvent = $gameMap.event(this.failEventId);
        if (failEvent) {
            failEvent.start();
        } else {
            console.error("Attempt to run fail event w/ event id " + this.failEventId + ", but event does not exist.");
        }
        this.hasInitialized = false;
    } else {
        this._lockpickQtyText.text = "Lockpick(s) in possession: " + $gameParty.numItems($dataItems[GBCCoffee.Bitwastaken.Lockpick.lockpickItemId]);
    }
};

Window_Lockpick.prototype.onLockpickCancel = function() {
    SoundManager.playCancel();
    this.hasInitialized = false;
    this.visible = false;
    GBCCoffee.Bitwastaken.Lockpick.isPickingLocks = false;
};