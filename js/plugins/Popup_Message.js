/*:
 * @target MZ
 * @plugindesc (v1.0) Shows a popup window in the bottom-right corner for quest notifications.
 * @author JackHoffx
 *
 * @command ShowQuestPopup
 * @text Show Quest Popup
 * @desc Show a notification popup with a custom message.
 *
 * @arg message
 * @text Message
 * @type note
 * @default "New quest(s) unlocked!\nCheck the Ninja Path journal."
 * @desc Text to display inside the popup.
 *
 * @arg duration
 * @text Duration (frames)
 * @type number
 * @default 300
 * @desc How long to show the popup (in frames). 300 = 7 seconds.
 *
 * @help
 * Plugin Commands:
 *   - ShowQuestPopup: Displays a popup with custom text.
 *
 * Script Call:
 *   $gameSystem.showQuestPopup("New quest(s) unlocked!\\nCheck the Ninja Path journal.", 300);
 *
 * Notes:
 * - Popup appears in the bottom-right corner of the screen.
 * - Automatically fades out after the duration expires.
 */

var QuestPopup = QuestPopup || {};
const QUEST_POPUP_SE = { name: "success-340660", volume: 69, pitch: 100, pan: 0 };

(() => {
  // Register plugin command
  PluginManager.registerCommand("QuestPopup", "ShowQuestPopup", args => {
    const message = JSON.parse(args.message || "\"New quest(s) unlocked!\\nCheck the Ninja Path journal.\"");
    const duration = Number(args.duration || 300);
    $gameSystem.showQuestPopup(message, duration);
  });

  // Add system method
  Game_System.prototype.showQuestPopup = function(message, duration = 300) {
    if (SceneManager._scene && SceneManager._scene._questPopupWindow) {
      SceneManager._scene._questPopupWindow.showPopup(message, duration);
    }
  };

  // Hook Scene_Map
  const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
  Scene_Map.prototype.createAllWindows = function() {
    _Scene_Map_createAllWindows.call(this);
    this.createQuestPopupWindow();
  };

  Scene_Map.prototype.createQuestPopupWindow = function() {
    const width = Graphics.boxWidth / 2.5;
    const height = 100;
    const x = Graphics.boxWidth - width + 35;
    const y = Graphics.boxHeight - height - 120;
    const rect = new Rectangle(x, y, width, height);
    this._questPopupWindow = new Window_QuestPopup(rect);
    this.addChild(this._questPopupWindow);
  };

  // Popup window class
  class Window_QuestPopup extends Window_Base {
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
		AudioManager.playSe(QUEST_POPUP_SE);
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
