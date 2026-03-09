/*:
 * @target MZ
 * @plugindesc Auto-hide Quest Tracker during events, auto-show afterward. Updates quest summary variable on event end. ONLY USE THIS WITH VISUSTELLA QUEST SYSTEM PLUGIN.
 * @author JackHoffx
 *
 * @param Summary Variable ID
 * @type variable
 * @desc The variable ID that stores quest summary text (for journal display).
 * @default 80
 */

(() => {
  const params = PluginManager.parameters("AutoHideQuestTracker");
  const summaryVar = Number(params["Summary Variable ID"] || 80);

  // Save original methods
  const _setup = Game_Interpreter.prototype.setup;
  const _terminate = Game_Interpreter.prototype.terminate;

  // When an event starts
  Game_Interpreter.prototype.setup = function(list, eventId) {
    console.log("------------------------------------------------");
    console.log(`[AutoHide] setup called: eventId=${eventId}`);
    console.log(`[AutoHide] depth=${this._depth}, listLength=${list?.length}`);
    if (list && list[0]) {
      console.log(`[AutoHide] first command code=${list[0].code}`);
    }
    console.log("------------------------------------------------");

    _setup.call(this, list, eventId);

    // Only act on top-level interpreters (depth === 0)
    if (this._depth === 0 && $gameSystem.setQuestTrackerVisible) {
      console.log(`[AutoHide] Hiding quest tracker for event ${eventId}`);
      $gameSystem.setQuestTrackerVisible(false);
      if (SceneManager.isSceneMap()) {
        SceneManager._scene.refreshQuestTrackerWindow();
      }
    }
  };

  // When an event ends
  Game_Interpreter.prototype.terminate = function() {
    console.log(`[AutoHide] terminate called: eventId=${this._eventId}, depth=${this._depth}`);
    _terminate.call(this);

    // Show quest tracker again
    if (this._depth === 0 && this._eventId > 0 && $gameSystem.setQuestTrackerVisible) {
      console.log(`[AutoHide] Showing quest tracker for event ${this._eventId}`);
      $gameSystem.setQuestTrackerVisible(true);
      if (SceneManager.isSceneMap()) {
        SceneManager._scene.refreshQuestTrackerWindow();
      }
    }

    // NEW: Automatically update quest summary variable
    try {
      if ($gameSystem && $gameSystem.getQuestSummaryText) {
        const text = $gameSystem.getQuestSummaryText();
        $gameVariables.setValue(summaryVar, text);
        console.log(`[AutoHide] Quest summary variable #${summaryVar} updated.`);
      }
    } catch (err) {
      console.warn("[AutoHide] Failed to update quest summary variable:", err);
    }
  };
})();
