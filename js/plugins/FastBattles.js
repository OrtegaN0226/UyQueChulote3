/*:
 * @target MZ
 * @plugindesc Speeds up battle motions and animations for faster fights.
 * @author JackHoffx
 *
 * @param Motion Speed Multiplier
 * @type number
 * @decimals 2
 * @min 0.1
 * @default 0.5
 * @desc Multiplier for action motion speed. (Default = 0.5 → twice as fast)
 *
 * @param Animation Speed Multiplier
 * @type number
 * @decimals 2
 * @min 0.1
 * @default 0.5
 * @desc Multiplier for battle animation speed (casting, skills, etc).
 *
 * @help
 * This plugin makes battles faster by reducing the duration of motions
 * and animations. You can tweak multipliers in Plugin Manager.
 *
 * - Motion Speed: affects actor/enemy attack, cast, walk, damage, etc.
 * - Animation Speed: affects visual skill/item animations.
 *
 * Set both to 1.0 for normal speed.
 * Lower values = faster animations.
 */

(() => {
  const params = PluginManager.parameters("FastBattles");
  const motionMultiplier = Number(params["Motion Speed Multiplier"] || 0.5);
  const animationMultiplier = Number(params["Animation Speed Multiplier"] || 0.5);

  // Faster motions (attack, cast, guard, etc.)
  const _Sprite_Battler_motionSpeed = Sprite_Battler.prototype.motionSpeed;
  Sprite_Battler.prototype.motionSpeed = function() {
    const original = _Sprite_Battler_motionSpeed.call(this);
    return Math.max(1, Math.floor(original * motionMultiplier));
  };

  // Faster animations (skill/item animations)
  const _Sprite_Animation_updateFrame = Sprite_Animation.prototype.updateFrame;
  Sprite_Animation.prototype.updateFrame = function() {
    if (animationMultiplier !== 1.0) {
      // Skip frames more quickly
      for (let i = 0; i < Math.round(1 / animationMultiplier); i++) {
        _Sprite_Animation_updateFrame.call(this);
      }
    } else {
      _Sprite_Animation_updateFrame.call(this);
    }
  };
})();
