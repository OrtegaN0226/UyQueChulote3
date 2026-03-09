/*:
 * @target MZ
 * @plugindesc Adds a helper function to auto-complete the current quest objective and reveal the next one (VisuStella Quest System extension).
 * @author JackHoffx
 *
 * @help
 * Usage (inside event -> Script call):
 *   $gameSystem.advanceQuest(questId);
 *
 * Example:
 *   $gameSystem.advanceQuest(5);
 */
 
(() => {
  Game_System.prototype.advanceQuest = function(questId) {
    // Ensure it's a string (VisuStella API expects string IDs)
    const qId = String(questId);

    const allObjectives = this.questObjectives(qId) || [];
    const completed = this.questObjectivesCompleted(qId) || [];

    // Find the first incomplete objective
    let currentObj = null;
    for (let i = 0; i < allObjectives.length; i++) {
      if (!completed.includes(allObjectives[i].id)) {
        currentObj = allObjectives[i].id;
        break;
      }
    }

    if (currentObj == null) return; // no objectives left

    // Mark it complete
    this.setQuestObjectives(qId, currentObj, "Complete");

    // Show the next objective, if any
    const nextObj = currentObj + 1;
    if (allObjectives.some(o => o.id === nextObj)) {
      this.setQuestObjectives(qId, nextObj, "Show");
    }
  };
})();
