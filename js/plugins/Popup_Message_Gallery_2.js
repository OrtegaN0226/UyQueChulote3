/*:
 * @target MZ
 * @plugindesc (v1.0) Automatically shows popup message "New Gallery Scene Unlocked!" when switches 240-290 are turned ON.
 * @author JackHoffx
 *
 * @help
 * Shows a popup message when switches 240-300 are turned from OFF to ON.
 * 
 * Notes:
 * - Popup appears in the bottom-right corner of the screen.
 * - Only triggers when switches are turned ON (not when turned off).
 * - Only triggers when switch changes from OFF → ON (won't trigger if already ON).
 */

var SwitchPopup = SwitchPopup || {};
const SWITCH_POPUP_SE = { name: "success-340660", volume: 69, pitch: 100, pan: 0 };

(() => {
  const pluginName = "Popup_Message_Gallery_2";
  // Use message codes to color the text. \C[17] = yellow in default windowskin.
  // Wrap with \C[0] if you want to reset after the text.
  const MESSAGE = "\\C[27]New Gallery Scene Unlocked!\\C[0]";
  const DEFAULT_DURATION = 300; // 5 seconds
  
  // Configure switches 240-300
  const CONFIGURED_SWITCHES = {};
  for (let i = 240; i <= 300; i++) {
    CONFIGURED_SWITCHES[i] = true;
  }
  
  console.log(`[${pluginName}] Plugin loaded. Monitoring switches 240-300.`);

  // Check if switch is configured
  function shouldShowPopup(switchId) {
    return CONFIGURED_SWITCHES[switchId] === true;
  }

  // Add system method
  Game_System.prototype.showSwitchPopup = function(message, duration = DEFAULT_DURATION) {
    if (SceneManager._scene && SceneManager._scene._switchPopupWindow) {
      SceneManager._scene._switchPopupWindow.showPopup(message, duration);
    }
  };

  // Hook Game_Switches to detect when switches are turned on
  const _Game_Switches_setValue = Game_Switches.prototype.setValue;
  Game_Switches.prototype.setValue = function(switchId, value) {
    // Get state BEFORE the change
    const wasOnBefore = this.value(switchId);
    
    // Apply the change
    _Game_Switches_setValue.call(this, switchId, value);
    
    // Get state AFTER the change
    const isOnAfter = this.value(switchId);
    
    // Only trigger popup if switch was OFF and is now ON, and is configured (240-290)
    if (!wasOnBefore && isOnAfter && shouldShowPopup(switchId)) {
      console.log(`[${pluginName}] Switch ${switchId} changed OFF → ON. Showing popup.`);
      
      if (SceneManager.isSceneMap()) {
        if (SceneManager._scene && SceneManager._scene._switchPopupWindow) {
          $gameSystem.showSwitchPopup(MESSAGE, DEFAULT_DURATION);
        } else {
          console.warn(`[${pluginName}] Popup window not available. Scene: ${SceneManager._scene?.constructor?.name}`);
        }
      } else {
        console.warn(`[${pluginName}] Not on map scene. Current scene: ${SceneManager._scene?.constructor?.name}`);
      }
    }
  };

  // Hook Scene_Map
  const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
  Scene_Map.prototype.createAllWindows = function() {
    _Scene_Map_createAllWindows.call(this);
    this.createSwitchPopupWindow();
  };

  Scene_Map.prototype.createSwitchPopupWindow = function() {
    const width = Graphics.boxWidth / 2.5;
    const height = 60;
    const x = Graphics.boxWidth - width + 35;
    const y = Graphics.boxHeight - height - 60;
    const rect = new Rectangle(x, y, width, height);
    this._switchPopupWindow = new Window_SwitchPopup(rect);
    this.addChild(this._switchPopupWindow);
    console.log(`[${pluginName}] Popup window created and added to scene.`);
  };

  // Popup window class
  class Window_SwitchPopup extends Window_Base {
    initialize(rect) {
      super.initialize(rect);
      this.opacity = 0;
      this.contentsOpacity = 0;
      this._timer = 0;
      this._active = false;
    }

    showPopup(message, duration) {
      this._message = message;
      this._timer = duration;
      this._active = true;
      this.refresh();
      this.show();
	  
      // Play success sound effect
      AudioManager.playSe(SWITCH_POPUP_SE);
    }

    refresh() {
      this.contents.clear();
      if (this._message) {
        this.drawTextEx(this._message, 0, 0, this.contents.width);
      }
    }

    update() {
      super.update();
      if (this._active) {
        if (this._timer > 0) {
          this._timer--;
          this.opacity = 200;
          this.contentsOpacity = 255;
          if (this._timer < 60) {
            // fade out last second
            this.opacity = (this._timer / 60) * 200;
            this.contentsOpacity = (this._timer / 60) * 255;
          }
        } else {
          this._active = false;
          this.hide();
        }
      }
    }
  }
})();
