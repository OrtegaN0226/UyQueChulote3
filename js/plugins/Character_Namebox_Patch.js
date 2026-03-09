/*:
 * @target MZ
 * @plugindesc Allows use of \n<name> in messages to set the namebox (VisuStella Message Core compatible). Removes trailing space too.
 * @author You
 */

(() => {
  const _convertEscapeCharacters = Window_Message.prototype.convertEscapeCharacters;
  Window_Message.prototype.convertEscapeCharacters = function(text) {
    text = text.replace(/\\n<([^>]+)>\s*/gi, (_, name) => {
      // Set the namebox via VisuStella Message Core
      if ($gameMessage.setNameboxName) {
        $gameMessage.setNameboxName(name);
      } else {
        // Fallback if Message Core is missing
        $gameMessage.setSpeakerName(name);
      }
      return ""; // Remove from message text, plus any space after
    });
    return _convertEscapeCharacters.call(this, text);
  };
})();
