/*:
 * @target MZ
 * @plugindesc Automatically refreshes quest summary text variable at the end of every event.
 * @author JackHoffx
 *
 * @param Summary Variable ID
 * @type variable
 * @desc The variable ID to store quest summary text for journal display.
 * @default 80
 *
 * @help
 * This plugin automatically updates the quest summary variable
 * whenever *any event finishes running* (when the interpreter ends).
 *
 * Requirements:
 * - Your quest data and known quest arrays must exist in $gameSystem.
 * - The plugin "Quest Summary Helper" (with getQuestSummaryText) should be active.
 *
 * Recommended usage:
 *   • Set the Summary Variable ID to the variable you use in your journal.
 *   • Use \v[50] (or whichever ID you picked) to display the summary text.
 *
 * No manual calls are needed — it refreshes automatically at the end of each event.
 */

(() => {
  const params = PluginManager.parameters("QuestAutoRefresher");
  const summaryVar = Number(params["Summary Variable ID"] || 80);

  const _Game_Interpreter_terminate = Game_Interpreter.prototype.terminate;
  Game_Interpreter.prototype.terminate = function() {
    _Game_Interpreter_terminate.call(this);

    try {
      if ($gameSystem && $gameSystem.getQuestSummaryText) {
        const text = $gameSystem.getQuestSummaryText();
        $gameVariables.setValue(summaryVar, text);
      }
    } catch (e) {
      console.warn("QuestAutoRefresher: Failed to update quest summary text.", e);
    }
  };
})();
