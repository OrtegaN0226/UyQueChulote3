/*:
 * @target MZ
 * @plugindesc (v1.0) This plugin is basic, it just sets the default 'Battle Animation Speed' setting in VisuStella plugin to the option 'Fastest'.
 * @author JackHoffx
 *
 *
 */

(() => {
  const _ConfigManager_applyData = ConfigManager.applyData;
  ConfigManager.applyData = function(config) {
    _ConfigManager_applyData.call(this, config);
    // Force battle animation speed to 'Fastest' (3)
    this.battleAniSpeed = 2;
  };
})();