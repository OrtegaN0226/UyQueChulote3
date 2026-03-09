/*:
 * @target MZ
 * @plugindesc Scale the menu button to 2.5x its original size.
 * @help
 * - Scale the menu button to 2.5x its original size.
 */
(() => {

const alias = Scene_Map.prototype.createAllWindows;

Scene_Map.prototype.createAllWindows = function() {
    alias.call(this);
    if (this._menuButton) {
        this._menuButton.scale.set(2.5, 2.5);
    }
};

})();