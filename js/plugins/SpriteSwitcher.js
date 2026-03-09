/*:
 * @target MZ
 * @plugindesc Simple actor sprite changer
 * @command ChangeActorSprite
 * @arg actorId
 * @type actor
 * @arg characterName
 * @type string
 * @arg characterIndex
 * @type number
 */
(() => {
  PluginManager.registerCommand("SimpleActorSprite", "ChangeActorSprite", args => {
    const actor = $gameActors.actor(Number(args.actorId));
    if (actor) {
      actor.setCharacterImage(args.characterName, Number(args.characterIndex));
      actor.refresh();
    }
  });
})();
