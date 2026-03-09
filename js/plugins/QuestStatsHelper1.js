/*:
 * @target MZ
 * @plugindesc v1.0 - Provides helper functions for counting and displaying quest statistics using _questKnown and _questData.
 * @author JackHoffx
 *
 * @help
 * ============================================================================
 * ■ Overview
 * ============================================================================
 * This plugin provides utility functions for tracking and displaying quest
 * progress in your game.
 *
 * It assumes your game uses two global data structures stored on $gameSystem:
 *
 *   1. _questKnown  → Array of 0/1 values representing whether each quest
 *                     has been unlocked.
 *                     Example: [1, 0, 0, 1, 1, ...]
 *
 *   2. _questData   → Array of objects describing each quest's owner/character.
 *                     Each entry has at least { id, owner }.
 *
 * Example:
 *   $gameSystem._questKnown = Array(34).fill(0);
 *
 *   $gameSystem._questData = [
 *     { id: 0, owner: "Main" },
 *     { id: 1, owner: "Tsunade" },
 *     { id: 2, owner: "Main" },
 *     { id: 3, owner: "Hinata" },
 *     ...
 *   ];
 *
 * ============================================================================
 * ■ Provided Functions
 * ============================================================================
 *
 * 1. $gameSystem.getQuestStats()
 * --------------------------------
 * Returns a structured object containing:
 *   - totalUnlocked:  Total number of unlocked quests
 *   - totalTotal:     Total number of quests in your data
 *   - owners:         An object keyed by owner name, each containing:
 *                       { unlocked: X, total: Y }
 *
 * Example:
 *   const stats = $gameSystem.getQuestStats();
 *   console.log(stats);
 *
 * Output example:
 *   {
 *     totalUnlocked: 10,
 *     totalTotal: 34,
 *     owners: {
 *       Main: { unlocked: 3, total: 6 },
 *       Tsunade: { unlocked: 4, total: 15 },
 *       Shizune: { unlocked: 2, total: 4 },
 *       Side: { unlocked: 1, total: 2 }
 *     }
 *   }
 *
 * You can use this to update custom variables, menu windows, or HUD elements.
 *
 * --------------------------------
 *
 * 2. $gameSystem.getQuestSummaryText()
 * --------------------------------
 * Returns a formatted text summary ready to be displayed in a message window,
 * menu, or journal scene.
 *
 * Example:
 *   console.log($gameSystem.getQuestSummaryText());
 *
 * Output example:
 *   Total quests unlocked: 10/34
 *
 *   Anko: 1/1
 *   Hinata: 2/2
 *   Ino: 1/2
 *   Main: 3/6
 *   Sakura: 2/2
 *   Shizune: 1/3
 *   Side: 0/2
 *   Tenten: 1/1
 *   Tsunade: 4/15
 *
 * You can also show it directly in-game:
 *   $gameMessage.add($gameSystem.getQuestSummaryText());
 *
 * ============================================================================
 * ■ Integration Notes
 * ============================================================================
 * - These functions are safe to call at any point AFTER a new game has started.
 *   If either array (_questKnown or _questData) is missing, the functions
 *   automatically handle it gracefully without crashing.
 *
 * - It’s recommended that you initialize _questKnown and _questData in a
 *   "New Game" common event or similar setup before calling these functions.
 *
 * - You can easily extend the _questData entries later with additional fields,
 *   such as:
 *       { id: 0, owner: "Main", title: "The Beginning", reward: "100 XP" }
 *
 * - These helper methods are read-only utilities. They do not modify data.
 *   You can use them alongside your quest-unlock logic safely.
 *
 * ============================================================================
 * ■ Example Integration
 * ============================================================================
 * // Example: Showing quest stats in a message
 * $gameMessage.add($gameSystem.getQuestSummaryText());
 *
 * // Example: Storing totals in game variables
 * const stats = $gameSystem.getQuestStats();
 * $gameVariables.setValue(10, stats.totalUnlocked);
 * $gameVariables.setValue(11, stats.totalTotal);
 *
 * // Example: Showing per-character data in the console
 * console.table(stats.owners);
 *
 * ============================================================================
 * ■ Terms of Use
 * ============================================================================
 * - Free for commercial and non-commercial use.
 * - Credit appreciated but not required.
 * - You may modify and redistribute this plugin as long as attribution to the
 *   original author remains intact.
 * ============================================================================
 */

(() => {

  //--------------------------------------------------------------------------
  // Core: getQuestStats
  //--------------------------------------------------------------------------
  Game_System.prototype.getQuestStats = function() {
    const known = this._questKnown || [];
    const data = this._questData || [];

    const stats = {};
    let totalUnlocked = 0;

    data.forEach((quest, index) => {
      const owner = quest.owner || "Unknown";
      if (!stats[owner]) stats[owner] = { unlocked: 0, total: 0 };

      stats[owner].total++;
      if (known[index]) {
        stats[owner].unlocked++;
        totalUnlocked++;
      }
    });

    return {
      totalUnlocked,
      totalTotal: data.length,
      owners: stats
    };
  };

  //--------------------------------------------------------------------------
  // Core: getQuestSummaryText
  //--------------------------------------------------------------------------
  Game_System.prototype.getQuestSummaryText = function() {
    const stats = this.getQuestStats();
    let text = `Total quests unlocked: ${stats.totalUnlocked}/${stats.totalTotal}\n\n`;

    const owners = Object.keys(stats.owners).sort();
    owners.forEach(owner => {
      const o = stats.owners[owner];
      text += `${owner}: ${o.unlocked}/${o.total}\n`;
    });

    return text.trim();
  };

})();
