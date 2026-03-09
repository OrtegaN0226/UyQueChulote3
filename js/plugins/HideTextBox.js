/*:
 * @target MZ
 * @plugindesc Toggle message window visibility with the [H] key.
 * @author JackHoffx
 *
 * @help
 * This plugin lets the player press the "H" key to hide or show
 * the message window during dialogues.
 *
 * - Works on the map and during events.
 * - Does not interfere with menus or other windows.
 */

(() => {
  let hideMessages = false;

  // Extend Input mapper: add "h" key
  Input.keyMapper[72] = "hideText"; // 72 = H key

  // Store original update method
  const _Window_Message_update = Window_Message.prototype.update;
  Window_Message.prototype.update = function() {
    _Window_Message_update.call(this);

    if (Input.isTriggered("hideText")) {
      hideMessages = !hideMessages;
      this.visible = !hideMessages;
    }
  };
})();
