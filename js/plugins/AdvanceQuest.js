/*:
 * @target MZ
 * @plugindesc Adds a custom command to auto-complete the current quest objective and reveal the next one (VisuStella Quest System extension).
 * @author JackHoffx
 *
 * @command AdvanceQuest
 * @text Advance Quest
 * @desc Completes the current objective and reveals the next objective for the given quest.
 *
 * @arg questId
 * @type number
 * @min 0
 * @desc The quest ID to advance.
 */

(() => {
  const pluginName = "AdvanceQuestHelper";

  PluginManager.registerCommand(pluginName, "AdvanceQuest", args => {
    const questId = Number(args.questId);

    // Get all objectives & completed objectives
    const allObjectives = $gameSystem.questObjectives(questId) || [];
    const completed = $gameSystem.questObjectivesCompleted(questId) || [];

    // Current = first incomplete objective
    let currentObj = null;
    for (let i = 0; i < allObjectives.length; i++) {
      if (!completed.includes(allObjectives[i].id)) {
        currentObj = allObjectives[i].id;
        break;
      }
    }

    if (currentObj == null) return; // no objectives left

    // Complete current
    $gameSystem.setQuestObjectives(questId, currentObj, "Complete");

    // Reveal next, if it exists
    const nextObj = currentObj + 1;
    if (allObjectives.some(o => o.id === nextObj)) {
      $gameSystem.setQuestObjectives(questId, nextObj, "Show");
    }
  });
})();
