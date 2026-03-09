/*:
 * @target MZ
 * @plugindesc Auto-update quest summary variable when opening the menu (Escape/Start) or via command.
 * @author Assistant
 *
 * @param Summary Variable ID
 * @type variable
 * @desc Game variable that stores the quest summary text.
 * @default 0
 *
 * @param Escape Newlines
 * @type boolean
 * @desc If true, store newlines as \n escape sequences (helps menus that strip raw newlines).
 * @default false
 *
 * @param Debug Log
 * @type boolean
 * @desc Log updates to the console.
 * @default false
 *
 * @command update
 * @text Update Summary Now
 * @desc Force an update of the q2uest summary variable.
 */
(() => {
  const pluginName = "JackHoffx_Quest_Summary";
  const params = PluginManager.parameters(pluginName);
  const summaryVarId = Number(params["Summary Variable ID"] || 0);
   const escapeNewlines = String(params["Escape Newlines"] || "false") === "true";
  const debugLog = String(params["Debug Log"] || "false") === "true";

  const updateSummaryVar = () => {
    if (!summaryVarId) return;
    try {
      let text = ($gameSystem && $gameSystem.getQuestSummaryText)
        ? $gameSystem.getQuestSummaryText()
        : "";
      if (escapeNewlines) {
        // Convert actual newlines to literal "\n" so windows that strip raw newlines can still render breaks via escape codes.
        text = text.replace(/\r?\n/g, "\\n");
      }
      $gameVariables.setValue(summaryVarId, text);
      if (debugLog) console.log(`[QuestSummary] Var #${summaryVarId} updated.`);
    } catch (err) {
      if (debugLog) console.warn("[QuestSummary] Failed to update variable:", err);
    }
  };

  // Plugin command to force update
  if (PluginManager.registerCommand) {
    PluginManager.registerCommand(pluginName, "update", () => updateSummaryVar());
  }

  // Update when opening the main menu (Escape/Start)
  const _Scene_Map_callMenu = Scene_Map.prototype.callMenu;
  Scene_Map.prototype.callMenu = function() {
    updateSummaryVar();
    _Scene_Map_callMenu.call(this);
  };
})();

