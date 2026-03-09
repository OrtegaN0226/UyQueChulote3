/*:
 * @target MZ
 * @plugindesc Tracks number of unlocked quests and total quests from VisuStella Quest System.
 * @author JackHoffx
 *
 * @param unlockedVarId
 * @type variable
 * @text Variable: Unlocked Quests
 * @desc Variable to store number of unlocked quests
 * @default 1
 *
 * @param totalVarId
 * @type variable
 * @text Variable: Total Quests
 * @desc Variable to store total number of quests
 * @default 2
 *
 * @command updateQuestCount
 * @text Update Quest Count
 * @desc Updates the quest count variables
 */

(() => {
  const pluginName = "QuestCounter";

  const params = PluginManager.parameters(pluginName);
  const unlockedVarId = Number(params.unlockedVarId || 1);
  const totalVarId = Number(params.totalVarId || 2);

  function totalQuests() {
    return Object.keys($gameSystem._vsQuests || {}).length;
  }

  function unlockedQuests() {
    let quests = $gameSystem._vsQuests || {};
    return Object.values(quests).filter(q => q && q._unlocked).length;
  }

  function updateQuestCount() {
    $gameVariables.setValue(unlockedVarId, unlockedQuests());
    $gameVariables.setValue(totalVarId, totalQuests());
  }

  PluginManager.registerCommand(pluginName, "updateQuestCount", () => {
    updateQuestCount();
  });

  // Expose for script calls
  window.updateQuestCount = updateQuestCount;

})();
