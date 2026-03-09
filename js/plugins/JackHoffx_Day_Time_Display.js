/*:
 * @target MZ
 * @plugindesc Show Day/Time (from switches) in a small header window above the main menu.
 * @help
 * - Place below VisuStella MainMenuCore so it overrides its playtime window.
 * - No parameters. Uses hardcoded switch mappings below.
 */
(() => {
  const DAY_SWITCHES = {
    Monday: 154,
    Tuesday: 155,
    Wednesday: 156,
    Thursday: 157,
    Friday: 158,
    Saturday: 159,
    Sunday: 160
  };

  const TIME_SWITCHES = {
    Morning: 122,
    Afternoon: 123,
    Night: 124,
    Midnight: 125
  };

  const getActiveLabel = (map, fallback) => {
    for (const [label, id] of Object.entries(map)) {
      if ($gameSwitches.value(id)) return label;
    }
    return fallback;
  };

  // Position the Day/Time window near the bottom of the main menu area.
  Scene_Menu.prototype.playtimeWindowRect = function() {
    const rows = 1;
    const ww = this.mainCommandWidth();
    const wh = this.calcWindowHeight(rows, false);
    const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
    const gap = 60;
    const wy = Math.min(Graphics.boxHeight - wh, this.mainAreaBottom() - wh - gap);
    return new Rectangle(wx, wy, ww, wh);
  };

  // Replace the playtime window with our Day/Time window
  Scene_Menu.prototype.createPlaytimeWindow = function() {
    this._playtimeWindow = new Window_MenuDayTime(this.playtimeWindowRect());
    this.addWindow(this._playtimeWindow);
  };

  class Window_MenuDayTime extends Window_Base {
    initialize(rect) {
      super.initialize(rect);
      this._lastDay = "";
      this._lastTime = "";
      this.refresh();
    }

    update() {
      super.update();
      const day = getActiveLabel(DAY_SWITCHES, "Day?");
      const time = getActiveLabel(TIME_SWITCHES, "Time?");
      if (day !== this._lastDay || time !== this._lastTime) {
        this.refresh();
      }
    }

    refresh() {
      this.contents.clear();
      const day = getActiveLabel(DAY_SWITCHES, "Day?");
      const time = getActiveLabel(TIME_SWITCHES, "Time?");
      this._lastDay = day;
      this._lastTime = time;
      // Yellow text; changeTextColor accepts any CSS color or ColorManager entry
      this.changeTextColor(ColorManager.textColor(17)); // 17 is yellow in default windowskin
      this.drawText(`${day} ${time}`, 0, 0, this.contentsWidth(), "center");
      this.resetTextColor();
    }
  }
})();