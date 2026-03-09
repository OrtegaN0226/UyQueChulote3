/*:
 * @target MZ
 * @plugindesc v1.1 — Replaces "Game End" on the title screen with a custom-styled "Patreon" button.
 * @author JackHoffx
 *
 * @param PatreonURL
 * @text Patreon URL
 * @desc The Patreon page to open when the player selects the Patreon option.
 * @default https://www.patreon.com/yourpage
 *
 * @param TextColor
 * @text Patreon Text Color
 * @type color
 * @default #ff6699
 *
 * @param OutlineColor
 * @text Outline Color
 * @type color
 * @default #ffd700
 *
 * @param IconIndex
 * @text Icon Index (optional)
 * @type number
 * @min 0
 * @max 3000
 * @desc Icon to display next to Patreon text (optional, 0 = none)
 * @default 85
 *
 * @param PlaySound
 * @text Play SE on Click
 * @type boolean
 * @on Yes
 * @off No
 * @default true
 *
 * @param SoundName
 * @text SE Name
 * @desc Sound effect name to play when Patreon is selected
 * @default Coin
 *
 * @help
 * Living With Tsunade: Patreon Button Plugin
 * 
 * This plugin replaces the "Game End" title menu option with a beautiful
 * "Patreon" button. When clicked, it opens your Patreon page.
 *
 * Features:
 * - Custom text color and outline color
 * - Optional icon next to text
 * - Works in both PC (NW.js) and Web versions
 *
 *Setup:
 * 1. Set your Patreon URL in the Plugin Manager.
 * 2. Customize colors, sound, and icon as desired.
 *
 * © 2025 JackHoffx — Free for personal and commercial use.
 */

(() => {
  const params = PluginManager.parameters("Title_PatreonPlus");
  const patreonUrl = String(params["PatreonURL"] || "https://www.patreon.com/yourpage");
  const textColor = String(params["TextColor"] || "#ff6699");
  const outlineColor = String(params["OutlineColor"] || "#ffd700");
  const iconIndex = Number(params["IconIndex"] || 0);
  const playSound = params["PlaySound"] === "true";
  const soundName = String(params["SoundName"] || "Coin");

  // === Replace Game End with Patreon ===
  const _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
  Window_TitleCommand.prototype.makeCommandList = function() {
    _Window_TitleCommand_makeCommandList.call(this);
    for (let i = 0; i < this._list.length; i++) {
      if (this._list[i].symbol === "gameEnd") {
        this._list[i].name = "Patreon";
        this._list[i].symbol = "patreon";
      }
    }
  };

  // === Handle Patreon command ===
  const _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
  Scene_Title.prototype.createCommandWindow = function() {
    _Scene_Title_createCommandWindow.call(this);
    this._commandWindow.setHandler("patreon", this.commandPatreon.bind(this));
  };

  Scene_Title.prototype.commandPatreon = function() {
    if (playSound) AudioManager.playSe({ name: soundName, pan: 0, pitch: 100, volume: 90 });
    if (Utils.isNwjs()) {
      require("child_process").exec(`start "" "${patreonUrl}"`);
    } else {
      window.open(patreonUrl, "_blank");
    }
  };

  // === Beautify the Patreon text ===
  const _Window_Base_drawItem = Window_Base.prototype.drawItem;
  Window_TitleCommand.prototype.drawItem = function(index) {
    const rect = this.itemLineRect(index);
    const symbol = this.commandSymbol(index);
    let text = this.commandName(index);
    if (symbol === "patreon") {
      this.changeTextColor(textColor);
      this.changeOutlineColor(outlineColor);
      if (iconIndex > 0) {
        const iconWidth = ImageManager.iconWidth;
        this.drawIcon(iconIndex, rect.x, rect.y + 2);
        rect.x += iconWidth + 6;
      }
    } else {
      this.resetTextColor();
      this.changeOutlineColor("rgba(0, 0, 0, 0.5)");
    }
    this.drawText(text, rect.x, rect.y, rect.width, "center");
  };
})();
