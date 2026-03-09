//=============================================================================
// MessageHideMZ.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v2.2.0 Toggle message window visibility with 'H' key or right click. Shows a small indicator when hidden.
 * @author Jatopian (original), JackHoffx (MZ conversion)
 *
 * @param key
 * @text Toggle Keys
 * @desc Keys/buttons that toggle message window visibility when pressed. Separate values with a space.
 * @default h
 *
 * @param rightClick
 * @text Toggle with Right Click
 * @type boolean
 * @on Yes
 * @off No
 * @desc Whether right click can toggle message window visibility.
 * @default true
 *
 * @param showOnNewPage
 * @text Show on New Page
 * @type boolean
 * @on Yes
 * @off No
 * @desc Whether the message window automatically becomes visible on a new page of dialogue.
 * @default true
 *
 * @param indicatorImage
 * @text Hidden Indicator Image
 * @type file
 * @dir img/pictures
 * @desc Image to show in the corner when the message window is hidden. Leave blank for none.
 * @default messageHideIcon
 *
 * @command ShowMessageWindow
 * @text Show Message Window
 * @desc Forces the message window to be shown again.
 *
 * @help
 * Press "H" or right-click to hide/show the message window.
 * When hidden, a small indicator image will appear in the bottom-right corner.
 *
 * Image Path: img/pictures/messageHideIcon.png (or whatever you set in the plugin parameter)
 *
 * Compatible with:
 *  - VisuMZ Message Core
 *  - Auto-namebox plugins (\n<name> support)
 *
 * Free for commercial and non-commercial use.
 * Credit: Jatopian (original), JackHoffx (MZ conversion)
 */

(() => {
  const pluginName = "MessageHideMZ";
  const params = PluginManager.parameters(pluginName);

  // --- PARAMETERS ---
  const pKey = String(params["key"] || "h").toLowerCase().split(" ");
  const pRightClick = params["rightClick"] === "true";
  const pNewPage = params["showOnNewPage"] === "true";
  const indicatorImage = String(params["indicatorImage"] || "messageHideIcon");

  // Ensure "h" is always a valid toggle key even if parameter is empty
  if (!pKey.includes("h")) pKey.push("h");

  const keyIds = {
    tab: 9,
    enter: 13,
    shift: 16,
    ctrl: 17,
    alt: 18,
    space: 32,
    pageup: 33,
    pagedown: 34,
    "0": 48, "1": 49, "2": 50, "3": 51, "4": 52, "5": 53, "6": 54, "7": 55, "8": 56, "9": 57,
    a: 65, b: 66, c: 67, d: 68, e: 69, f: 70, g: 71, h: 72, i: 73, j: 74, k: 75, l: 76, m: 77,
    n: 78, o: 79, p: 80, q: 81, r: 82, s: 83, t: 84, u: 85, v: 86, w: 87, x: 88, y: 89, z: 90,
    semicolon: 186, comma: 188, period: 190, quote: 222
  };

// --- Register toggle keys safely after boot ---
const registerMessageHideKeys = () => {
  const keyIds = {
    tab: 9, enter: 13, shift: 16, ctrl: 17, alt: 18, space: 32,
    pageup: 33, pagedown: 34,
    "0": 48, "1": 49, "2": 50, "3": 51, "4": 52, "5": 53, "6": 54, "7": 55, "8": 56, "9": 57,
    a: 65, b: 66, c: 67, d: 68, e: 69, f: 70, g: 71, h: 72, i: 73, j: 74, k: 75, l: 76, m: 77,
    n: 78, o: 79, p: 80, q: 81, r: 82, s: 83, t: 84, u: 85, v: 86, w: 87, x: 88, y: 89, z: 90,
    semicolon: 186, comma: 188, period: 190, quote: 222
  };

  for (const key of pKey) {
    const code = keyIds[key];
    if (code && !Input.keyMapper[code]) {
      Input.keyMapper[code] = key;
    }
  }
};

// Run key registration once input is initialized
const _Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
  _Scene_Boot_start.call(this);
  registerMessageHideKeys();
};


  // Global visibility flags
  window.MessageHide_messageWindowVisible = true;
  window.MessageHide_messageWindowShowNext = false;
  // null = default(true) on mobile, boolean = forced on/off
  window.MessageHide_touchButtonOverride = null;

  window.MessageHide_setTouchButtonEnabled = function(enabled) {
    window.MessageHide_touchButtonOverride = !!enabled;
  };

  window.MessageHide_clearTouchButtonOverride = function() {
    window.MessageHide_touchButtonOverride = null;
  };

  window.MessageHide_toggleTouchButton = function() {
    const current = MessageHide_shouldShowTouchButton();
    window.MessageHide_touchButtonOverride = !current;
  };

  function MessageHide_isMobileEdition() {
    return typeof window.isMobileEdition === "function" && window.isMobileEdition();
  }

  function MessageHide_shouldShowTouchButton() {
    if (!MessageHide_isMobileEdition()) return false;
    if (window.MessageHide_touchButtonOverride !== null) {
      return !!window.MessageHide_touchButtonOverride;
    }
    return true;
  }

  // Utility: apply hidden/invisible state without disabling interaction
  function MessageHide_applyVisibility(win) {
    if (!win) return;
    if (window.MessageHide_messageWindowVisible) {
      if (win._mhPrevOpacity !== undefined) {
        win.opacity = win._mhPrevOpacity;
        win._mhPrevOpacity = undefined;
      }
      if (win._mhPrevContentsOpacity !== undefined) {
        win.contentsOpacity = win._mhPrevContentsOpacity;
        win._mhPrevContentsOpacity = undefined;
      }
      if (win._windowSpriteContainer) win._windowSpriteContainer.alpha = 1;
      // Restore pause/scroll indicators
      if (win._pauseSignSprite && win._mhPrevPauseVisible !== undefined) {
        win._pauseSignSprite.visible = win._mhPrevPauseVisible;
        win._mhPrevPauseVisible = undefined;
        win._pauseSignSprite.alpha = 1;
      }
      if (win._downArrowSprite && win._mhPrevDownVisible !== undefined) {
        win._downArrowSprite.visible = win._mhPrevDownVisible;
        win._mhPrevDownVisible = undefined;
        win._downArrowSprite.alpha = 1;
      }
      if (win._upArrowSprite && win._mhPrevUpVisible !== undefined) {
        win._upArrowSprite.visible = win._mhPrevUpVisible;
        win._mhPrevUpVisible = undefined;
        win._upArrowSprite.alpha = 1;
      }
    } else {
      if (win._mhPrevOpacity === undefined) win._mhPrevOpacity = win.opacity;
      if (win._mhPrevContentsOpacity === undefined) win._mhPrevContentsOpacity = win.contentsOpacity;
      win.opacity = 0;
      win.contentsOpacity = 0;
      if (win._windowSpriteContainer) win._windowSpriteContainer.alpha = 0;
      // Hide pause/scroll indicators
      if (win._pauseSignSprite) {
        if (win._mhPrevPauseVisible === undefined) win._mhPrevPauseVisible = !!win._pauseSignSprite.visible;
        win._pauseSignSprite.visible = false;
        win._pauseSignSprite.alpha = 0;
      }
      if (win._downArrowSprite) {
        if (win._mhPrevDownVisible === undefined) win._mhPrevDownVisible = !!win._downArrowSprite.visible;
        win._downArrowSprite.visible = false;
        win._downArrowSprite.alpha = 0;
      }
      if (win._upArrowSprite) {
        if (win._mhPrevUpVisible === undefined) win._mhPrevUpVisible = !!win._upArrowSprite.visible;
        win._upArrowSprite.visible = false;
        win._upArrowSprite.alpha = 0;
      }
    }
  }

  //=============================================================================
  // Plugin Command (MZ)
  //=============================================================================
  PluginManager.registerCommand(pluginName, "ShowMessageWindow", () => {
    window.MessageHide_messageWindowShowNext = true;
  });

  //=============================================================================
  // Window_Message
  //=============================================================================
  const _Window_Message_update = Window_Message.prototype.update;
  Window_Message.prototype.update = function() {
    _Window_Message_update.call(this);

    if (window.MessageHide_messageWindowShowNext) {
      window.MessageHide_messageWindowVisible = true;
      window.MessageHide_messageWindowShowNext = false;
    } else if (this._isToggleHide()) {
      window.MessageHide_messageWindowVisible = !window.MessageHide_messageWindowVisible;
    }

    MessageHide_applyVisibility(this);

    if (pRightClick) this._processRightClick();
  };

  Window_Message.prototype._isToggleHide = function() {
    return pKey.some(key => Input.isTriggered(key));
  };

  Window_Message.prototype._processRightClick = function() {
    if (this.isOpen() && this.active && TouchInput.isCancelled()) {
      window.MessageHide_messageWindowVisible = !window.MessageHide_messageWindowVisible;
    }
  };

  if (pNewPage) {
    const _Window_Message_newPage = Window_Message.prototype.newPage;
    Window_Message.prototype.newPage = function(textState) {
      _Window_Message_newPage.call(this, textState);
      window.MessageHide_messageWindowVisible = true;
    };
  }

  //=============================================================================
  // Window_NameBox (VisuMZ + Auto-NameBox compatibility)
  //=============================================================================
  if (typeof Window_NameBox !== "undefined") {
    const _Window_NameBox_update = Window_NameBox.prototype.update;
    Window_NameBox.prototype.update = function() {
      _Window_NameBox_update.call(this);
      const msgWindow = this._parentWindow || SceneManager._scene._messageWindow;
      if (msgWindow) {
        this.visible = msgWindow.visible && window.MessageHide_messageWindowVisible;
      } else {
        this.visible = window.MessageHide_messageWindowVisible;
      }
    };

    const _Window_NameBox_show = Window_NameBox.prototype.show;
    Window_NameBox.prototype.show = function() {
      _Window_NameBox_show.call(this);
      if (!window.MessageHide_messageWindowVisible) {
        this.visible = false;
      }
    };
  }

  //=============================================================================
  // Other dialog windows (Choice, Number Input, Event Item, Scroll Text)
  //=============================================================================
  if (typeof Window_ChoiceList !== "undefined") {
    const _Window_ChoiceList_update = Window_ChoiceList.prototype.update;
    Window_ChoiceList.prototype.update = function() {
      _Window_ChoiceList_update.call(this);
      MessageHide_applyVisibility(this);
    };
  }

  if (typeof Window_NumberInput !== "undefined") {
    const _Window_NumberInput_update = Window_NumberInput.prototype.update;
    Window_NumberInput.prototype.update = function() {
      _Window_NumberInput_update.call(this);
      MessageHide_applyVisibility(this);
    };
  }

  if (typeof Window_EventItem !== "undefined") {
    const _Window_EventItem_update = Window_EventItem.prototype.update;
    Window_EventItem.prototype.update = function() {
      _Window_EventItem_update.call(this);
      MessageHide_applyVisibility(this);
    };
  }

  if (typeof Window_ScrollText !== "undefined") {
    const _Window_ScrollText_update = Window_ScrollText.prototype.update;
    Window_ScrollText.prototype.update = function() {
      _Window_ScrollText_update.call(this);
      MessageHide_applyVisibility(this);
    };
  }

  //=============================================================================
  // Hidden Indicator Sprite
  //=============================================================================
  class Sprite_MessageHideIndicator extends Sprite {
    initialize() {
      super.initialize();
      this.anchor.set(1, 1); // bottom-right anchor
      this.bitmap = null;
      this.loadIndicator();
    }

    loadIndicator() {
      if (indicatorImage) {
        this.bitmap = ImageManager.loadPicture(indicatorImage, 0);
      }
    }

    update() {
      super.update();
      // On mobile, the touch button color (yellow) is the indicator; don't show image sprite
      const hidden = !window.MessageHide_messageWindowVisible;
      this.visible = hidden && !MessageHide_isMobileEdition();
      this.x = Graphics.width - 10;
      this.y = Graphics.height - 10;
      this.scale.x = this.scale.y = 0.5; // smaller size
    }
  }

  //=============================================================================
  // Touch Button (mobile toggle)
  //=============================================================================
  class Sprite_MessageHideTouchButton extends Sprite_Clickable {
    initialize() {
      super.initialize();
      this.anchor.set(0, 1); // bottom-left
      this._buttonWidth = 168;
      this._buttonHeight = 72;
      this._drawnWhenHidden = null; // so first update redraws
      this._setupBitmap(false);
    }

    _setupBitmap(isMessageHidden) {
      const bitmap = new Bitmap(this._buttonWidth, this._buttonHeight);
      bitmap.fontSize = 32;
      bitmap.outlineWidth = 6;
      bitmap.outlineColor = "rgba(0, 0, 0, 0.7)";
      bitmap.textColor = isMessageHidden ? "#ffff00" : "#ffffff"; // yellow when hidden, white otherwise
      bitmap.fillRect(0, 0, this._buttonWidth, this._buttonHeight, "rgba(0, 0, 0, 0.45)");
      bitmap.drawText("HIDE", 0, 0, this._buttonWidth, this._buttonHeight, "center");
      this.bitmap = bitmap;
    }

    update() {
      super.update();
      this.visible = MessageHide_shouldShowTouchButton();
      this.x = 10;
      this.y = Graphics.height - 10;
      // On mobile, redraw button with yellow text when message is hidden, white when visible
      const isHidden = !window.MessageHide_messageWindowVisible;
      if (this.visible && this._drawnWhenHidden !== isHidden) {
        this._drawnWhenHidden = isHidden;
        this._setupBitmap(isHidden);
      }
    }

    onClick() {
      window.MessageHide_messageWindowVisible = !window.MessageHide_messageWindowVisible;
    }
  }

  // Helper: is the current touch/click on top of the touch button?
  function MessageHide_isTouchOnTouchButton() {
    const scene = SceneManager._scene;
    if (!(scene instanceof Scene_Map)) return false;
    const button = scene._messageHideTouchButton;
    if (!button || !button.visible) return false;

    const x = TouchInput.x;
    const y = TouchInput.y;
    const left = button.x - button.anchor.x * button.width;
    const top = button.y - button.anchor.y * button.height;
    const right = left + button.width;
    const bottom = top + button.height;

    return x >= left && x < right && y >= top && y < bottom;
  }

  // Prevent map clicks (movement / event trigger) when the touch is on the button
  const _Scene_Map_processMapTouch = Scene_Map.prototype.processMapTouch;
  Scene_Map.prototype.processMapTouch = function() {
    if (MessageHide_isTouchOnTouchButton()) {
      return;
    }
    _Scene_Map_processMapTouch.call(this);
  };

  // Prevent dialogue advancing when the touch is on the button
  const _Window_Message_isTriggered = Window_Message.prototype.isTriggered;
  Window_Message.prototype.isTriggered = function() {
    if (MessageHide_isTouchOnTouchButton()) {
      return false;
    }
    return _Window_Message_isTriggered.call(this);
  };

  // Add to map scene
  const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
  Scene_Map.prototype.createAllWindows = function() {
    _Scene_Map_createAllWindows.call(this);
    this._messageHideIndicator = new Sprite_MessageHideIndicator();
    this.addChild(this._messageHideIndicator);
    this._messageHideTouchButton = new Sprite_MessageHideTouchButton();
    this.addChild(this._messageHideTouchButton);
  };

})();
