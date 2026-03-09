/*:
 * @target MZ
 * @plugindesc Defines platform (PC/Mobile) and edition (Free/Supporter) flags.
 * @author JackHoffx
 *
 * @param IsSupporter
 * @text Is Supporter Edition?
 * @type boolean
 * @default false
 * @desc Set to TRUE for the paid/supporter build, FALSE for the free build.
 *
 * @param IsMobileEdition
 * @text Is Mobile Edition?
 * @type boolean
 * @default false
 * @desc Set to TRUE for mobile builds, FALSE for PC builds.
 *
 * @param GameVersion
 * @text Game Version
 * @type string
 * @default 0.0.0
 * @desc Version string to expose (e.g., 0.44.1).
 *
 * @help
 * ---------------------------------------------------------------------------
 * This plugin creates permanent project-level flags.
 *
 * Script usage:
 *   isSupporter()
 *   isMobileEdition()
 *   getGameVersion()
 *   getGameVersionText()
 *   getGameVersionTextColored(colorIndex)
 *
 * Event usage:
 *   Switch #690 will always reflect supporter status.
 *   Switch #691 will always reflect the platform edition.
 *
 * These flags exist OUTSIDE save files.
 * ---------------------------------------------------------------------------
 */

(() => {
    const pluginName = "JackHoffx_Build_Configuration";
    const params = PluginManager.parameters(pluginName);

    // === CONFIG ============================================================
    const SUPPORTER_SWITCH_ID = 690;
    const MOBILE_SWITCH_ID = 691;
    // =====================================================================

    const IS_SUPPORTER = params["IsSupporter"] === "true";
    const IS_MOBILE = params["IsMobileEdition"] === "true";
    const GAME_VERSION = String(params["GameVersion"] || "0.0.0");

    // Expose global config
    window.GAME_EDITION = window.GAME_EDITION || {};
    window.GAME_EDITION.IS_SUPPORTER = IS_SUPPORTER;
    window.GAME_EDITION.IS_MOBILE = IS_MOBILE;
    window.GAME_EDITION.VERSION = GAME_VERSION;

    // Helper functions for events
    window.isSupporter = function () {
        return GAME_EDITION.IS_SUPPORTER;
    };

    window.isMobileEdition = function () {
        return GAME_EDITION.IS_MOBILE;
    };

    window.getGameVersion = function () {
        return GAME_EDITION.VERSION;
    };

    window.getGameVersionText = function () {
        return `Game Version: ${GAME_EDITION.VERSION}`;
    };

    window.getGameVersionTextColored = function (colorIndex) {
        const idx = Number.isFinite(colorIndex) ? colorIndex : 0;
        return `\\C[${idx}]Game Version: ${GAME_EDITION.VERSION}\\C[0]`;
    };

    // Always mirror states into switches
    const syncEditionSwitches = () => {
        if ($gameSwitches) {
            $gameSwitches.setValue(
                SUPPORTER_SWITCH_ID,
                GAME_EDITION.IS_SUPPORTER
            );
            $gameSwitches.setValue(
                MOBILE_SWITCH_ID,
                GAME_EDITION.IS_MOBILE
            );
        }
    };

    const _DataManager_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function () {
        _DataManager_setupNewGame.call(this);
        syncEditionSwitches();
    };

    const _DataManager_extractSaveContents =
        DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        _DataManager_extractSaveContents.call(this, contents);
        syncEditionSwitches();
    };
})();
