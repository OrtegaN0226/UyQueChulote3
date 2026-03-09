//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.87;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.87] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Auto Save After New Game
 * 
 * Normally, when starting a new game through the "New Game" option, there is
 * no auto save trigger. However, if you start a new game or load a saved game,
 * then go to the Game End screen, return back to the title screen, then start
 * a New Game, the auto save trigger occurs when it shouldn't. The Core Engine
 * will now patch this and prevent the trigger from taking place.
 * 
 * ---
 * 
 * Battle Forced End Action Crash
 * 
 * Depending on various circumstances, currently active battlers can be cleared
 * from the battle system at will due to a number of reasons. However, if it
 * just so happens that the targets are cleared, too, with actions remaining,
 * then a crash will follow up. This plugin will prevent that change. Fix made
 * by Olivia.
 * 
 * ---
 * 
 * Debug Console Refresh Bug
 * 
 * When pressing F5 to refresh while the debug console (DevTools) is open,
 * some graphics will fail to load properly. This started occurring since the
 * RPG Maker MZ 1.5.0 update and the code for loading the images has now been
 * reverted to the 1.4.4 version where it was last stable.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Skill List Active After Party Member Change
 * 
 * If the skill list is active (ie. the player can move the cursor around) and
 * the party member currently being viewed is changed via the button commands,
 * then previously, RPG Maker MZ would still have that window be active despite
 * having the cursor hidden temporarily. Upon pressing direction buttons, the
 * cursor reveals itself and both the skill type window and skill list window
 * are both active, making way for lots of potential problems to happen.
 * 
 * ---
 * 
 * Sprite Removal and Destroy Crash
 * 
 * A texture check will now occur for sprites that are being removed and
 * destroyed in order to prevent crashes. In the off chance that someone
 * creates a sprite through a script call and removes it through such, the
 * likelihood of this occurance becomes higher. This makes the "destroy"
 * property take into account a texture check in order to see if the sprite
 * removal is taking extra steps and will reduce those extra steps.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Water Tile Bug
 * 
 * It seems like there's a new bug that occurs if you create a tileset from
 * scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 * does is it causes many tiles to become water tiles without intending to.
 * You can find this out by turning off all the plugins in your project,
 * putting a Ship or Boat on what are normally ground tiles, and then seeing
 * the Ship or Boat traverse through it.
 * 
 * There are two ways to fix this. We cannot fix it through code in this plugin
 * as it's a problem that involves the tileset json data there are ways to work
 * around it so that you can get the proper water-flags to go where they need
 * to be at.
 * 
 * 1. Copy a working un-bugged tileset onto the currently bugged one and
 *    reapply the tile features like passability, terrain tags, etc. This will
 *    make sure the water-passability tiles get copied over correctly.
 * 
 * 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *    un-bugged tileset (usually a pre-existing tileset when a new project is
 *    made), click the "Copy Page" button, go to the bugged tileset and press
 *    "Paste Page". You'll have to reapply any different properties like
 *    passabilities and terrain tags, but the water tile flags should now be
 *    working properly.
 * 
 * The plugin will not fix the problem itself since flag data is delicate and
 * should not be tampered with midgame as the changes made by the plugin might
 * not match the desired settings.
 * 
 * This plugin, however, will also send out an alert message when coming across
 * such a tile. Pay attention to it and do one of the following two steps above
 * to fix the problem.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 * 
 * ---
 *
 * === Actors-Related Notetags ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes-Related Notetags ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies-Related Notetags ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations-Related Notetags ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life-Related Notetags ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 * 
 * <Scroll Lock X>
 * <Scroll Lock Y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - This will use the display nudge setting found in the Plugin Parameters.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 * 
 * <Scroll Lock X: x>
 * <Scroll Lock Y: y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present and will nudge the map camera slightly.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - Replace 'x' and 'y' with numbers between 0 and 1 to represent how much is
 *   being judged.
 *   - For example, for a 1280x720 resolution, a 27 tile wide map will benefit
 *     from a nudge of 0.15625. Play with these numbers to determine the best
 *     value for your maps.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 *
 * === Basic, X, and S Parameters-Related Notetags ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 * - This does NOT set the max cap to be lower than the default cap.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * 
 * ---
 * 
 * === Tileset-Related Notetags ===
 * 
 * ---
 * 
 * <Taller By x: id>
 * 
 * - Used for: Tileset Notetags
 * - Changes any page B, C, D, E tile marked by terrain tag 'id' to be taller
 *   by 'x' tiles.
 *   - Replace 'x' with a number representing the tiles to be taller by.
 *   - Replace 'id' with a number representing the Terrain Tag you will use to
 *     mark this tile with in the Database editor.
 * - When placing these tiles on the map, all you have to do is just place the
 *   bottom tile.
 *   - ie.: For a tree that's one tile taller, just place the tile at the
 *     bottom where you see the trunk.
 *   - Then, in-game, the tree will appear taller by one tile as marked.
 * - Depending on the priority settings, the tile will appear on different
 *   layers.
 *   - O will place the tile on the below player layer.
 *   - X will place the tile on the same level as the player.
 *   - ★ will place the tile on the above player layer.
 *   - O/X layer tiles have a special property where tall sprites standing in
 *     front of it will no longer clip the top of the sprite, while sprites
 *     standing behind it will be covered by it.
 *   - The X layer sprite will only have a hitbox of 1x1 at the base.
 * - This does not work with events using tiles as graphics. Instead, if you
 *   want to do similar, use the Event & Movement Core's <Tile Expand> notetags
 *   for better control.
 * 
 * ---
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <Grid>
 * <Battle Grid>
 * 
 * <No Grid>
 * <No Battle Grid>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Requires VisuMZ_2_BattleGridSystem!
 * - Changes the battle system to utilize the Battle Grid System or not.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * - If none of these notetags or comment tags are found, refer to the default
 *   settings found in the Plugin Parameters.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Audio Plugin Commands ===
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Volume
 * - Changes the current BGS volume without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Volume:
 *   - Change the current BGS's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pitch
 * - Changes the current BGS pitch without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pitch:
 *   - Change the current BGS's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pan
 * - Changes the current BGS pan without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pan:
 *   - Change the current BGS's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * === Debug Plugin Commands ===
 * 
 * ---
 * 
 * Debug: Current Controller ID
 * - PLAY TEST ONLY.
 * - Shows current controller ID in debug console.
 * - If you press a key on the keyboard, this data will be erased.
 * - Also copies to computer clipboard if possible.
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Rotate by Angle
 * - Rotates target picture by a amount angle over a set duration instead of
 *   continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Adjust Angle:
 *   - What is the angle you wish to rotate the picture by?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Rotate to Angle
 * - Rotates target picture to a certain angle over a set duration
 *   instead of continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Target Angle:
 *   - What is the target angle you wish to rotate the picture?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 * 
 * === Text Popup Command ===
 * 
 * ---
 * 
 * Text Popup: Show Text
 * - Adds text to a text popup window to briefly appear.
 * - Multiple text popups will be queued.
 * - Does not halt the game and works parallel to game activity.
 * 
 *   Text:
 *   - Write the text that you want to appear here.
 *   - You may use text codes.
 * 
 * ---
 * 
 * === Variable Plugin Commands ===
 * 
 * ---
 * 
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 * 
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 * 
 *   CTRL + n: Quick Load:
 *   - CTRL + a number from 1 to 9 will yield a quick load of that safe file.
 *   - Does not count auto saves.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 *   Shift+R: Recover All:
 *   - For Play Test only!
 *   - During battle, pressing SHIFT + R will refill the whole party's HP
 *     and MP and status.
 * 
 *   Shift+T: Full TP
 *   - For Play Test only! 
 *   - During battle, pressing SHIFT + T will refill the whole party's TP.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 * 
 *   Map Name Text Code:
 *   - If on, map names will use text codes.
 *   - If off, only the raw map name will be used.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - If multiple targets are recorded, then the first of the recorded
 *       targets will be set for this variable.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Finish Entry:
 *   - Text used to describe finish entry.
 * 
 *   Page Change:
 *   - Text used to describe character page changing.
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 * 
 *   Blur Strength:
 *   - Strength used for menu background snapshots.
 *   - Default: 8. Higher is stronger. Lower is weaker.
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Split "Escape":
 *   - Used ONLY for those making their own custom keyboard key input maps.
 *     - This means you need to go to your own project's rmmz_core.js and
 *       modify Input.keyMapper to have buttons with "cancel" and "menu"
 *       instead of only "escape".
 *     - If there are none found, an error message will appear telling you to
 *       do so, or set the 'Split "Escape"' option to false.
 *     - If you are using Options Core's Rebind Keyboard option, be sure to
 *       have those have "cancel" and "menu" options inside there, too.
 *   - "Split" option makes separate instances of "Cancel" and "Menu" keys.
 *   - "Don't" option will consolidate both into "Escape" keys.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Controller Button Assist Settings
 * ============================================================================
 *
 * These are sub-settings for the Button Assist Window Plugin Parameters. Where
 * the Button Assist Window Plugin Parameters are focused on keyboard entries,
 * these sections are focused on gamepad controllers.
 * 
 * Add multiple gamepads to the list to give them different button assist text.
 * If a gamepad is being used but not listed here, the button assist text will
 * default to the keyboard version.
 * 
 * For those looking for more information regarding controllers, visit this
 * site: https://gamepad-tester.com/
 *
 * ---
 *
 * ID Information
 * 
 *   Controller ID Name:
 *   - Exact string used for this controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - Example: Xbox 360 Controller (XInput STANDARD GAMEPAD)
 * 
 *   Similarity Match:
 *   - Partial string used to check for controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - This check occurs secondary to the exact name.
 *   - Example: Xbox
 *
 * ---
 *
 * Directions
 * 
 *   Up:
 *   Left:
 *   Right:
 *   Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * Actions
 * 
 *   OK:
 *   Cancel:
 *   Menu:
 *   Shift:
 *   Page Up:
 *   Page Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *   - *NOTE*: Controllers use a different mapping scheme from keyboards.
 *     - The "cancel" button is separate from the "menu" button though, for the
 *       majority of the button assist window help text, we'll be referring to
 *       the cancel button usually.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   Show Actor Level?:
 *   - Show the actor level when displaying actors?
 *   - Affects for most windows in-game.
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 * 
 * Maps
 * 
 *   Scroll Lock Small X?:
 *   Scroll Lock Small Y?:
 *   - Automatically scroll lock X/Y scrolling if the map is too small?
 *   - Useful for 1280x720 resolutions when the map is 27 tiles wide.
 *     - This will get rid of the subtle scrolling when moving from one half of
 *       the screen to the other.
 *   - This setting will be disabled if the map is zoomed in.
 * 
 *   Locked Display X?:
 *   Locked Display Y?:
 *   - What display X/Y value do you want for auto-scroll locked maps?
 *   - Use a number between 0 and 1 for best results.
 * 
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 * 
 *   State Icons Non-Frame:
 *   - Replace sprite frame system for non-frame.
 *   - Better for any instances where icons are zoomed.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 * 
 * These settings also allow you to add scroll bars to scrollable windows,
 * letting the player know how much of the window's contents there are left for
 * scrolling. The scroll bar can be enabled, disabled, have its thickness
 * changed, colors changed, etc.
 *
 * ---
 *
 * Window Defaults
 * 
 *   Enable Masking:
 *   - Enable window masking (windows hide other windows behind them)?
 *   - WARNING: Turning it on can obscure data.
 * 
 *   Correct Skin Bleed:
 *   - Allows you to enable/disable the window skin bleeding correction for
 *     those who wish to use the 95 calculator instead of 96 to augment higher
 *     and larger screen resolutions.
 *   - Read the "Bug Fixes" section if you don't understand what the window
 *     skin bleeding problem is.
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Scroll Bar
 * 
 *   Show Scroll Bar?:
 *   - Show the scroll bar for scrollable windows?
 * 
 *   Thickness:
 *   - How thick do you want the scroll bar to be?
 * 
 *   Offset:
 *   - How much do you want to offset the scroll bar by?
 * 
 *   Bar Body Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Opacity:
 *   - What opacity value do you want the off bar opacity to be?
 *   - Use a number between 0 and 255.
 * 
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
 * 
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 *
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.87: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Removed picture limit of 100 from Picture-related Plugin Commands.
 * *** Better compatibility with different icon sizes.
 * * Documentation Update!
 * ** Under Plugin Parameters: Menu Button Assist Window
 * *** Added text segments under Split "Escape"
 * **** This means you need to go to your own project's rmmz_core.js and
 *      modify Input.keyMapper to have buttons with "cancel" and "menu"
 *      instead of only "escape".
 * **** If there are none found, an error message will appear telling you to
 *      do so, or set the 'Split "Escape"' option to false.
 * **** If you are using Options Core's Rebind Keyboard option, be sure to
 *      have those have "cancel" and "menu" options inside there, too.
 * * Feature Update!
 * ** Plugin Parameters > Button Assist > Split "Escape" will now show an error
 *    message if a custom Input.keyMapper is not found with the "cancel" and
 *    "menu" keys implemented. Update made by Irina.
 * ** Updated Plugin Parameters > Button Assist > Split "Escape" description
 *    for Plugin Parameters to add in the following text: Requires custom
 *    Input.keyMapper with "cancel" and "menu".
 * ** Added better compatibility with WASD controls as to prioritize showing
 *    the arrow keys rather than the W, A, S, D keys. Also applies to any other
 *    rebindings.
 * 
 * Version 1.86: January 16, 2025
 * * Bug Fixes!
 * ** Fixed an issue where certain icons were not aligning properly at
 *    different line height settings. Fix made by Olivia.
 * 
 * Version 1.85: October 17, 2024
 * * Feature Updates!
 * ** Updated to fit RPG Maker MZ's updated 1.8.1 version better.
 * 
 * Version 1.84: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New notetags added by Arisu:
 * *** Tileset Notetag: <Taller By x: id>
 * **** Changes any page B, C, D, E tile marked by terrain tag 'id' to be
 *      taller by 'x' tiles.
 * **** When placing these tiles on the map, all you have to do is just place
 *      the bottom tile.
 * ***** ie.: For a tree that's one tile taller, just place the tile at the
 *       bottom where you see the trunk. Then, in-game, the tree will appear
 *       taller by one tile as marked.
 * **** O/X layer tiles have a special property where tall sprites standing in
 *      front of it will no longer clip the top of the sprite, while sprites
 *      standing behind it will be covered by it.
 * **** This does not work with events using tiles as graphics. Instead, if
 *      you want to do similar, use the Event & Movement Core's <Tile Expand>
 *      notetags for better control.
 * 
 * Version 1.83: June 13, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated documentation for <param Max: x> notetag.
 * *** This does not set the max cap to be lower than the default cap.
 * * New Feature!
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > UI Settings > State Icons Non-Frame
 * **** Replace sprite frame system for non-frame.
 * **** Better for any instances where icons are zoomed.
 * 
 * Version 1.82: April 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added failsafe for $textPopup when some windows have not been initialized
 *    and requesting the text popup.
 * * New Feature!
 * ** New Plugin Parameter and playtest shortcut added by Arisu:
 * *** Plugin Parameters > QoL Settings > Playtest > CTRL + n: Quick Load
 * **** CTRL + a number from 1 to 9 will yield a quick load of that save file.
 * **** Does not count auto saves.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.81: February 15, 2024
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added for future plugin: VisuMZ_2_BattleGridSystem
 * *** <Grid>
 * *** <No Grid>
 * **** Requires the future plugin VisuMZ_2_BattleGridSystem!
 * **** Read the help section for more information on these.
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Window > Correct Skin Bleed
 * **** Allows you to enable/disable the window skin bleeding correction for
 *      those who wish to use the 95 calculator instead of 96 to augment higher
 *      and larger screen resolutions.
 * **** Read the "Bug Fixes" section if you don't understand what the window
 *      skin bleeding problem is.
 * 
 * Version 1.80: January 18, 2024
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Auto Save After New Game
 * **** Normally, when starting a new game through the "New Game" option, there
 *      is no auto save trigger. However, if you start a new game or load a
 *      saved game, then go to the Game End screen, return back to the title
 *      screen, then start a New Game, the auto save trigger occurs when it
 *      shouldn't. The Core Engine will now patch this and prevent the trigger
 *      from taking place.
 * 
 * Version 1.79: November 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Plugin Command added by Arisu:
 * ** Text Popup: Show Text
 * *** Adds text to a text popup window to briefly appear.
 * *** Multiple text popups will be queued.
 * *** Does not halt the game and works parallel to game activity.
 * 
 * Version 1.78: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia and sponsored by AndyL:
 * *** QoL Settings > Battle Test > Shift+R: Recover All
 * **** For Play Test only! During battle, pressing SHIFT + R will refill the
 *      whole party's HP and MP and status.
 * *** QoL Settings > Battle Test > Shift+T: Full TP
 * **** For Play Test only! During battle, pressing SHIFT + T will refill the
 *      whole party's TP.
 * 
 * Version 1.77: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the BGS related Plugin Commands to crash.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Scroll-Linked Pictures now work if the image file are in a folder within
 *    the img/pictures/ folder without the folder needing a ! at the start.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Picture: Rotate by Angle
 * **** Rotates target picture by a amount angle over a set duration instead of
 *      continuously.
 * **** View help file for more information on the Plugin Command.
 * *** Picture: Rotate to Angle
 * **** Rotates target picture to a certain angle over a set duration instead
 *      of continuously.
 * **** View help file for more information on the Plugin Command.
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Menu Button Assist > General > Split "Escape":
 * **** Used ONLY for those making their own custom keyboard key input maps.
 * **** "Split" option makes separate instances of "Cancel" and "Menu" keys.
 * **** "Don't" option will consolidate both into "Escape" keys.
 * 
 * Version 1.76: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a bug that displayed the incorrect button press key for name input
 *    processing's cancel action. Fix made by Olivia.
 * 
 * Version 1.75: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** In Scene_Name, when using the Keyboard Input, the button assist windows
 *    will no longer display the keyboard shortcuts for Ok and Cancel, but
 *    instead, show them for ENTER and BKSP. Update made by Arisu.
 * ** In Scene_Name, when manual inputting, the Page Up/Dn keys are now
 *    displayed to show changing character pages.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by AndyL:
 * *** Params > Keyboard Input > Button Assist > Finish Entry
 * **** Text used to describe finish entry.
 * *** Params > Keyboard Input > Button Assist > Page Change
 * **** Text used to describe changing character pages.
 * *** Params > Window Settings > Scroll Bar
 * **** These settings also allow you to add scroll bars to scrollable windows,
 *      letting the player know how much of the window's contents there are
 *      left for scrolling. The scroll bar can be enabled, disabled, have its
 *      thickness changed, colors changed, etc.
 * 
 * Version 1.74: February 16, 2023
 * * Compatibility Update!
 * ** Plugin Commands for: Audio: Change Current BGM/BGS Volume/Pitch/Pan
 *    should now work properly with the updated RPG Maker MZ version and
 *    WebAudio changes. Update made by Arisu.
 * 
 * Version 1.73: January 20, 2023
 * * Compatibility Update!
 * ** Added better Effekseer version compatibility.
 * 
 * Version 1.72: December 15, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Skill List Active After Party Member Change
 * **** If the skill list is active (ie. the player can move the cursor around)
 *      and the party member currently being viewed is changed via the button
 *      commands, then previously, RPG Maker MZ would still have that window be
 *      active despite having the cursor hidden temporarily. Upon pressing
 *      direction buttons, the cursor reveals itself and both the skill type
 *      window and skill list window are both active, making way for lots of
 *      potential problems to happen.
 * ** Water Tile Bug
 * *** It seems like there's a new bug that occurs if you create a tileset from
 *     scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 *     does is it causes many tiles to become water tiles without intending to.
 *     You can find this out by turning off all the plugins in your project,
 *     putting a Ship or Boat on what are normally ground tiles, and then
 *     seeing the Ship or Boat traverse through it.
 * *** There are two ways to fix this. We cannot fix it through code in this
 *     plugin as it's a problem that involves the tileset json data there are
 *     ways to work around it so that you can get the proper water-flags to go
 *     where they need to be at.
 * **** 1. Copy a working un-bugged tileset onto the currently bugged one and
 *      reapply the tile features like passability, terrain tags, etc. This
 *      will make sure the water-passability tiles get copied over correctly.
 * **** 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *      un-bugged tileset (usually a pre-existing tileset when a new project is
 *      made), click the "Copy Page" button, go to the bugged tileset and press
 *      "Paste Page". You'll have to reapply any different properties like
 *      passabilities and terrain tags, but the water tile flags should now be
 *      working properly.
 * *** The plugin will not fix the problem itself since flag data is delicate
 *     and should not be tampered with midgame as the changes made by the
 *     plugin might not match the desired settings.
 * *** This plugin, however, will also send out an alert message when coming
 *     across such a tile. Pay attention to it and do one of the following two
 *     steps above to fix the problem.
 * * Documentation Update!
 * ** Added "Skill List Active After Party Member Change" section to the
 *    "Important Changes: Bug Fixes" section of the help file.
 * ** Added "Water Tile Bug" section to the "Important Changes: Bug Fixes"
 *    section of the help file.
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Menu Backgrounds > Blur Strength
 * **** Strength used for menu background snapshots.
 * 
 * Version 1.71: November 10, 2022
 * * Bug Fixes!
 * ** Title Command Window should now allow for more than 4 custom commands
 *    without hidden commands. Fix made by Irina.
 * ** Fixed a problem with repeating animations from Visual State Effects
 *    causing softlocks. Fix made by Olivia.
 * 
 * Version 1.70: October 6, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** A texture check will now occur for sprites that are being removed and
 *     destroyed in order to prevent crashes. In the off chance that someone
 *     creates a sprite through a script call and removes it through such, the
 *     likelihood of this occurance becomes higher. This makes the destroy
 *     property take into account a texture check in order to see if the sprite
 *     removal is taking extra steps and will reduce those extra steps.
 * * Documentation Update!
 * ** Added "Sprite Removal and Destroy Crash" section to the "Important
 *    Changes: Bug Fixes" section.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.69: September 8, 2022
 * * Bug Fixes!
 * ** Fixed the combination of Button Assist Location: Top with Help Location:
 *    Bottom combination not working properly. Fix made by Irina.
 * 
 * Version 1.68: August 4, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Olivia and sponsored by Archeia:
 * *** Audio: Change Current BGM Volume
 * *** Audio: Change Current BGM Pitch
 * *** Audio: Change Current BGM Pan
 * *** Audio: Change Current BGS Volume
 * *** Audio: Change Current BGS Pitch
 * *** Audio: Change Current BGS Pan
 * **** Changes the current BGM/BGS volume/pitch/pan without changing any of
 *      the current BGM/BGS's other properties and without restarting BGM/BGS.
 * 
 * Version 1.67: July 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added notes for Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * *** This setting will be disabled if the map is zoomed in.
 * * New Features!
 * ** New map notetags added by Irina and sponsored by AndyL:
 * *** <Scroll Lock X>
 * *** <Scroll Lock X: x>
 * *** <Scroll Lock Y>
 * *** <Scroll Lock Y: y>
 * **** Causes the map to not scroll left/right(x) or up/down(y). Useful for
 *      when maps are just slightly smaller than normal and the tiny scrolling
 *      is distracting.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small X?
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small Y?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display X?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display Y?
 * **** Automatically scroll locks small maps to prevent them from scrolling
 *      horizontally/vertically. Useful for 1280x720 resolutions when the map
 *      is 27 tiles wide. This will get rid of the subtle scrolling when moving
 *      from one half of the screen to the other.
 * **** This setting will be disabled if the map is zoomed in.
 * * Feature Update!
 * ** Warnings added to Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 * Version 1.66: July 14, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Debug Console Refresh Bug
 * **** When pressing F5 to refresh while the debug console (DevTools) is open,
 *      some graphics will fail to load properly. This started occurring since
 *      the RPG Maker MZ 1.5.0 update and the code for loading the images has
 *      now been reverted to the 1.4.4 version where it was last stable.
 * * Documentation Update!
 * ** Help file updated for new major bug fix.
 * 
 * Version 1.65: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Parameter Settings > Show Actor Level?
 * **** Show the actor level when displaying actors?
 * **** Used for most windows in-game.
 * 
 * Version 1.64: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Debug: Current Controller ID
 * **** PLAY TEST ONLY. Shows current controller ID in debug console.
 * **** Also copies to computer clipboard if possible.
 * ** New Plugin Parameters made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Subsettings for Button Assist Window: Controller Button Assist
 * **** These are sub-settings for the Button Assist Window Plugin Parameters.
 *      Where the Button Assist Window Plugin Parameters are focused on
 *      keyboard entries, these sections are focused on gamepad controllers.
 * **** Add multiple gamepads to the list to give them different button assist
 *      text. If a gamepad is being used but not listed here, the button assist
 *      text will default to the keyboard version.
 * 
 * Version 1.63: May 2, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > QoL Settings > Misc > Map Name Text Code
 * **** If on, map names will use text codes.
 * **** If off, only the raw map name will be used.
 * * Feature Update!
 * ** The map name text code change will no longer be on forcefully. It is now
 *    something that can be toggled by Plugin Parameters. Update by Irina.
 * 
 * Version 1.62: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by Archeia:
 * *** Variable: JS Eval
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows one line of code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * *** Variable: JS Block
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows JS block code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * ** Map names can now use text codes. Made by Arisu and sponsored by Archeia.
 * 
 * Version 1.61: April 21, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Battle Forced End Action Crash
 * **** Depending on various circumstances, currently active battlers can be
 *      cleared from the battle system at will due to a number of reasons.
 *      However, if it just so happens that the targets are cleared, too, with
 *      actions remaining, then a crash will follow up. This plugin will
 *      prevent that change. Fix made by Olivia.
 * 
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 * 
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Audio
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmVolume
 * @text Audio: Change Current BGM Volume
 * @desc Changes the current BGM volume without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGM's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPitch
 * @text Audio: Change Current BGM Pitch
 * @desc Changes the current BGM pitch without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGM's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPan
 * @text Audio: Change Current BGM Pan
 * @desc Changes the current BGM pan without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGM's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsVolume
 * @text Audio: Change Current BGS Volume
 * @desc Changes the current BGS volume without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGS's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPitch
 * @text Audio: Change Current BGS Pitch
 * @desc Changes the current BGS pitch without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGS's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPan
 * @text Audio: Change Current BGS Pan
 * @desc Changes the current BGS pan without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGS's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Debug
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugConsoleLastControllerID
 * @text Debug: Current Controller ID
 * @desc PLAY TEST ONLY. Shows current controller ID in debug console.
 * Also copies to computer clipboard if possible.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotateBy
 * @text Picture: Rotate By Angle
 * @desc Rotates target picture by a amount angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg AdjustAngle:eval
 * @text Adjust Angle
 * @desc What is the angle you wish to rotate the picture by?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotate
 * @text Picture: Rotate to Angle
 * @desc Rotates target picture to a certain angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg TargetAngle:eval
 * @text Target Angle
 * @desc What is the target angle you wish to rotate the picture?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_TextPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TextPopupShow
 * @text Text Popup: Show Text
 * @desc Adds text to a text popup window to briefly appear.
 * Multiple text popups will be queued.
 *
 * @arg text:json
 * @text Text
 * @type note
 * @desc Write the text that you want to appear here.
 * You may use text codes.
 * @default "Insert message here."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","BattleTest":"","BTestItems:eval":"true","BTestWeapons:eval":"true","BTestArmors:eval":"true","BTestAddedQuantity:num":"90","ShiftR_Toggle:eval":"true","ShiftT_Toggle:eval":"true","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Pictures":"","AntiZoomPictures:eval":"true","PictureContainers":"","DetachBattlePictureContainer:eval":"false","DetachMapPictureContainer:eval":"false","Misc":"","AnimationMirrorOffset:eval":"false","AutoStretch:str":"default","FontShadows:eval":"false","FontSmoothing:eval":"true","FontWidthFix:eval":"true","KeyItemProtect:eval":"true","MapNameTextCode:eval":"true","ModernControls:eval":"true","MvAnimationRate:num":"4","NewGameCommonEventAll:num":"0","NoTileShadows:eval":"false","PixelateImageRendering:eval":"false","RequireFocus:eval":"false","ShortcutScripts:eval":"true","SmartEventCollisionPriority:eval":"true","SubfolderParse:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param ControllerButtons:arraystruct
 * @text Controller Button Assist
 * @parent ButtonAssist:struct
 * @type struct<ControllerButtons>[]
 * @desc Make different icons appear for the Button Assist window when using different controllers.
 * @default []
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Maps":"","AutoScrollLockX:eval":"true","AutoScrollLockY:eval":"true","DisplayLockX:num":"0.15625","DisplayLockY:num":"0.00000","Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4","ScrollBar":"","ShowScrollBar:eval":"true","BarThickness:num":"2","BarOffset:num":"+2","BarBodyColor:str":"0","OffBarColor:str":"7","OffBarOpacity:num":"128","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","TextPopup":"","DurationPerChat:num":"1.5","MinDuration:num":"90","MaxDuration:num":"300"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomBetween(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param CtrlQuickLoad:eval
 * @text CTRL + n: Quick Load
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc CTRL + a number from 1 to 9 will yield a quick load of
 * that safe file. Does not count auto saves.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param ShiftR_Toggle:eval
 * @text Shift+R: Recover All
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + R will refill the whole party's HP and MP and status.
 * @default true
 *
 * @param ShiftT_Toggle:eval
 * @text Shift+T: Full TP
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + T will refill the whole party's TP.
 * @default true
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param MapNameTextCode:eval
 * @text Map Name Text Code
 * @parent Misc
 * @type boolean
 * @on Text Codes
 * @off Raw Text
 * @desc If on, map names will use text codes.
 * If off, only the raw map name will be used.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Finish:str
 * @text Finish Entry
 * @parent ButtonAssist
 * @desc Text used to describe finish entry.
 * @default Finish
 * 
 * @param PageChange:str
 * @text Page Change
 * @parent ButtonAssist
 * @desc Text used to describe character page changing.
 * @default Page
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 * 
 * @param BlurStrength:num
 * @text Blur Strength
 * @desc Strength used for menu background snapshots.
 * Default: 8. Higher is stronger. Lower is weaker.
 * @default 8
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SplitEscape:eval
 * @text Split "Escape"
 * @parent General
 * @type boolean
 * @on Split
 * @off Don't
 * @desc "Split" makes separate instances of "Cancel" and "Menu".
 * Requires custom Input.keyMapper with "cancel" and "menu".
 * @default false
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Controller Buttons Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ControllerButtons:
 *
 * @param ID
 * @text ID Information
 *
 * @param Name:str
 * @text Controller ID Name
 * @parent ID
 * @desc Exact string used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 *
 * @param Match:str
 * @text Similarity Match
 * @parent ID
 * @desc Similar text used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 * 
 * @param Directions
 *
 * @param up:str
 * @text Up
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param left:str
 * @text Left
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param right:str
 * @text Right
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param down:str
 * @text Down
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 * 
 * @param Actions
 *
 * @param ok:str
 * @text OK
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param cancel:str
 * @text Cancel
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param menu:str
 * @text Menu
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param shift:str
 * @text Shift
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pageup:str
 * @text Page Up
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pagedown:str
 * @text Page Down
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param ShowActorLevel:eval
 * @text Show Actor Level?
 * @parent BasicParameters
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor level when displaying actors?
 * Affects for most windows in-game.
 * @default true
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param StateIconsNonFrame:eval
 * @text State Icons Non-Frame
 * @parent UIArea
 * @type boolean
 * @on Non-Frame
 * @off Normal
 * @desc Replace sprite frame system for non-frame.
 * Better for any instances where icons are zoomed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param CorrectSkinBleeding:eval
 * @text Correct Skin Bleed
 * @parent WindowDefaults
 * @type boolean
 * @on Correct
 * @off Don't Correct
 * @desc Corrects window skin bleeding bug when used with higher
 * screen resolutions?
 * @default true
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36. Avoid using odd numbers.
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param ScrollBar
 * @text Scroll Bar
 *
 * @param ShowScrollBar:eval
 * @text Show Scroll Bar?
 * @parent ScrollBar
 * @type boolean
 * @on Show Scroll Bar
 * @off Don't Show
 * @desc Show the scroll bar for scrollable windows?
 * @default true
 *
 * @param BarThickness:num
 * @text Thickness
 * @parent ScrollBar
 * @type number
 * @min 1
 * @desc How thick do you want the scroll bar to be?
 * @default 2
 *
 * @param BarOffset:num
 * @text Offset
 * @parent ScrollBar
 * @desc How much do you want to offset the scroll bar by?
 * @default +2
 *
 * @param BarBodyColor:str
 * @text Bar Body Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param OffBarColor:str
 * @text Off Bar Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param OffBarOpacity:num
 * @text Off Bar Opacity
 * @parent ScrollBar
 * @type number
 * @min 1
 * @max 255
 * @desc What opacity value do you want the off bar opacity
 * to be? Use a number between 0 and 255.
 * @default 128
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No Backgrounds
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 *
 * @param TextPopup
 * @text Text Popup Window
 *
 * @param DurationPerChat:num
 * @text Duration Per Text
 * @parent TextPopup
 * @desc What is the increase in duration per text character?
 * @default 1.5
 *
 * @param MinDuration:num
 * @text Minimum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Minimum duration for window to stay on the screen.
 * @default 90
 *
 * @param MaxDuration:num
 * @text Maximum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Maximum duration for window to stay on the screen.
 * @default 300
 * 
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Maps
 * 
 * @param AutoScrollLockX:eval
 * @text Scroll Lock Small X?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock X scrolling if the map is too small?
 * @default true
 * 
 * @param AutoScrollLockY:eval
 * @text Scroll Lock Small Y?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock Y scrolling if the map is too small?
 * @default true
 * 
 * @param DisplayLockX:num
 * @text Locked Display X?
 * @parent Maps
 * @desc What display X value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.15625
 * 
 * @param DisplayLockY:num
 * @text Locked Display Y?
 * @parent Maps
 * @desc What display Y value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.00000
 * 
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================
var tier = tier || 0x0;
var dependencies = [];
var pluginData = $plugins.filter(function (_0x34a1f6) {
  return _0x34a1f6.status && _0x34a1f6.description.includes("[CoreEngine]");
})[0x0];
VisuMZ.CoreEngine.Settings = VisuMZ.CoreEngine.Settings || {};
VisuMZ.ConvertParams = function (_0x1eecd6, _0x299f0e) {
  for (const _0x502f7f in _0x299f0e) {
    if (_0x502f7f.match(/(.*):(.*)/i)) {
      const _0x3abc17 = String(RegExp.$1);
      const _0x461c5f = String(RegExp.$2).toUpperCase().trim();
      let _0x2389d5;
      let _0x3c49ae;
      let _0x2d3867;
      switch (_0x461c5f) {
        case 'NUM':
          _0x2389d5 = _0x299f0e[_0x502f7f] !== '' ? Number(_0x299f0e[_0x502f7f]) : 0x0;
          break;
        case "ARRAYNUM":
          _0x3c49ae = _0x299f0e[_0x502f7f] !== '' ? JSON.parse(_0x299f0e[_0x502f7f]) : [];
          _0x2389d5 = _0x3c49ae.map(_0x29fc5 => Number(_0x29fc5));
          break;
        case "EVAL":
          _0x2389d5 = _0x299f0e[_0x502f7f] !== '' ? eval(_0x299f0e[_0x502f7f]) : null;
          break;
        case "ARRAYEVAL":
          _0x3c49ae = _0x299f0e[_0x502f7f] !== '' ? JSON.parse(_0x299f0e[_0x502f7f]) : [];
          _0x2389d5 = _0x3c49ae.map(_0xd594e => eval(_0xd594e));
          break;
        case "JSON":
          _0x2389d5 = _0x299f0e[_0x502f7f] !== '' ? JSON.parse(_0x299f0e[_0x502f7f]) : '';
          break;
        case "ARRAYJSON":
          _0x3c49ae = _0x299f0e[_0x502f7f] !== '' ? JSON.parse(_0x299f0e[_0x502f7f]) : [];
          _0x2389d5 = _0x3c49ae.map(_0x433908 => JSON.parse(_0x433908));
          break;
        case "FUNC":
          _0x2389d5 = _0x299f0e[_0x502f7f] !== '' ? new Function(JSON.parse(_0x299f0e[_0x502f7f])) : new Function("return 0");
          break;
        case 'ARRAYFUNC':
          _0x3c49ae = _0x299f0e[_0x502f7f] !== '' ? JSON.parse(_0x299f0e[_0x502f7f]) : [];
          _0x2389d5 = _0x3c49ae.map(_0x4f5089 => new Function(JSON.parse(_0x4f5089)));
          break;
        case "STR":
          _0x2389d5 = _0x299f0e[_0x502f7f] !== '' ? String(_0x299f0e[_0x502f7f]) : '';
          break;
        case "ARRAYSTR":
          _0x3c49ae = _0x299f0e[_0x502f7f] !== '' ? JSON.parse(_0x299f0e[_0x502f7f]) : [];
          _0x2389d5 = _0x3c49ae.map(_0x22d686 => String(_0x22d686));
          break;
        case 'STRUCT':
          _0x2d3867 = _0x299f0e[_0x502f7f] !== '' ? JSON.parse(_0x299f0e[_0x502f7f]) : {};
          _0x1eecd6[_0x3abc17] = {};
          VisuMZ.ConvertParams(_0x1eecd6[_0x3abc17], _0x2d3867);
          continue;
        case 'ARRAYSTRUCT':
          _0x3c49ae = _0x299f0e[_0x502f7f] !== '' ? JSON.parse(_0x299f0e[_0x502f7f]) : [];
          _0x2389d5 = _0x3c49ae.map(_0x2f48b2 => VisuMZ.ConvertParams({}, JSON.parse(_0x2f48b2)));
          break;
        default:
          continue;
      }
      _0x1eecd6[_0x3abc17] = _0x2389d5;
    }
  }
  return _0x1eecd6;
};
VisuMZ.CoreEngine.SceneManager_exit = SceneManager.exit;
SceneManager.exit = function () {
  VisuMZ.CoreEngine.SceneManager_exit.call(this);
  if (Utils.RPGMAKER_VERSION >= '1.4.4') {
    if (typeof nw === "object") {
      nw.App.quit();
    }
  }
};
(_0x3de3f1 => {
  const _0x343435 = _0x3de3f1.name;
  for (const _0x3b8013 of dependencies) {
    if (!Imported[_0x3b8013]) {
      alert("%1 is missing a required plugin.\nPlease install %2 into the Plugin Manager.".format(_0x343435, _0x3b8013));
      SceneManager.exit();
      break;
    }
  }
  const _0x5d3394 = _0x3de3f1.description;
  if (_0x5d3394.match(/\[Version[ ](.*?)\]/i)) {
    const _0x52c3f7 = Number(RegExp.$1);
    if (_0x52c3f7 !== VisuMZ.CoreEngine.version) {
      alert("%1's version does not match plugin's. Please update it in the Plugin Manager.".format(_0x343435, _0x52c3f7));
      SceneManager.exit();
    }
  }
  if (_0x5d3394.match(/\[Tier[ ](\d+)\]/i)) {
    const _0x4a282e = Number(RegExp.$1);
    if (_0x4a282e < tier) {
      alert("%1 is incorrectly placed on the plugin list.\nIt is a Tier %2 plugin placed over other Tier %3 plugins.\nPlease reorder the plugin list from smallest to largest tier numbers.".format(_0x343435, _0x4a282e, tier));
      SceneManager.exit();
    } else {
      tier = Math.max(_0x4a282e, tier);
    }
  }
  VisuMZ.ConvertParams(VisuMZ.CoreEngine.Settings, _0x3de3f1.parameters);
})(pluginData);
(() => {
  if (VisuMZ.CoreEngine.Settings.QoL.SubfolderParse ?? true) {
    for (const _0x5a59d6 in $plugins) {
      const _0x56cc21 = $plugins[_0x5a59d6];
      if (_0x56cc21.name.match(/(.*)\/(.*)/i)) {
        _0x56cc21.name = String(RegExp.$2.trim());
      }
    }
  }
})();
PluginManager.registerCommand(pluginData.name, "AnimationPoint", _0xe658f0 => {
  if (!SceneManager._scene) {
    return;
  }
  if (!SceneManager._scene._spriteset) {
    return;
  }
  VisuMZ.ConvertParams(_0xe658f0, _0xe658f0);
  const _0x5d682f = Math.round(_0xe658f0.pointX);
  const _0x1da533 = Math.round(_0xe658f0.pointY);
  $gameTemp.requestPointAnimation(_0x5d682f, _0x1da533, _0xe658f0.AnimationID, _0xe658f0.Mirror, _0xe658f0.Mute);
});
PluginManager.registerCommand(pluginData.name, "AudioChangeBgmVolume", _0x402611 => {
  VisuMZ.ConvertParams(_0x402611, _0x402611);
  const _0x5993b3 = Math.round(_0x402611.volume).clamp(0x0, 0x64);
  const _0x3f1aed = AudioManager._currentBgm;
  if (_0x3f1aed) {
    _0x3f1aed.volume = _0x5993b3;
    _0x3f1aed.pos = AudioManager._bgmBuffer.seek();
    AudioManager.updateBgmParameters(_0x3f1aed);
    AudioManager.playBgm(_0x3f1aed, _0x3f1aed.pos);
    AudioManager._bgmBuffer._startPlaying(_0x3f1aed.pos);
  }
});
PluginManager.registerCommand(pluginData.name, "AudioChangeBgmPitch", _0x42b3ec => {
  VisuMZ.ConvertParams(_0x42b3ec, _0x42b3ec);
  const _0x4c28b1 = Math.round(_0x42b3ec.pitch).clamp(0x32, 0x96);
  const _0xc4738b = AudioManager._currentBgm;
  if (_0xc4738b) {
    _0xc4738b.pitch = _0x4c28b1;
    _0xc4738b.pos = AudioManager._bgmBuffer.seek();
    AudioManager.updateBgmParameters(_0xc4738b);
    AudioManager.playBgm(_0xc4738b, _0xc4738b.pos);
    AudioManager._bgmBuffer._startPlaying(_0xc4738b.pos);
  }
});
PluginManager.registerCommand(pluginData.name, "AudioChangeBgmPan", _0x3eec34 => {
  VisuMZ.ConvertParams(_0x3eec34, _0x3eec34);
  const _0x182699 = Math.round(_0x3eec34.pan).clamp(-0x64, 0x64);
  const _0x497470 = AudioManager._currentBgm;
  if (_0x497470) {
    _0x497470.pan = _0x182699;
    _0x497470.pos = AudioManager._bgmBuffer.seek();
    AudioManager.updateBgmParameters(_0x497470);
    AudioManager.playBgm(_0x497470, _0x497470.pos);
    AudioManager._bgmBuffer._startPlaying(_0x497470.pos);
  }
});
PluginManager.registerCommand(pluginData.name, "AudioChangeBgsVolume", _0x164766 => {
  VisuMZ.ConvertParams(_0x164766, _0x164766);
  const _0x4c5f8f = Math.round(_0x164766.volume).clamp(0x0, 0x64);
  const _0x705058 = AudioManager._currentBgs;
  if (_0x705058) {
    _0x705058.volume = _0x4c5f8f;
    _0x705058.pos = AudioManager._bgsBuffer.seek();
    AudioManager.updateBgsParameters(_0x705058);
    AudioManager.playBgs(_0x705058, _0x705058.pos);
    AudioManager._bgsBuffer._startPlaying(_0x705058.pos);
  }
});
PluginManager.registerCommand(pluginData.name, "AudioChangeBgsPitch", _0x308569 => {
  VisuMZ.ConvertParams(_0x308569, _0x308569);
  const _0x4fd842 = Math.round(_0x308569.pitch).clamp(0x32, 0x96);
  const _0x3f618d = AudioManager._currentBgs;
  if (_0x3f618d) {
    _0x3f618d.pitch = _0x4fd842;
    _0x3f618d.pos = AudioManager._bgsBuffer.seek();
    AudioManager.updateBgsParameters(_0x3f618d);
    AudioManager.playBgs(_0x3f618d, _0x3f618d.pos);
    AudioManager._bgsBuffer._startPlaying(_0x3f618d.pos);
  }
});
PluginManager.registerCommand(pluginData.name, "AudioChangeBgsPan", _0x5ac56e => {
  VisuMZ.ConvertParams(_0x5ac56e, _0x5ac56e);
  const _0x1f8b79 = Math.round(_0x5ac56e.pan).clamp(-0x64, 0x64);
  const _0x18fd64 = AudioManager._currentBgs;
  if (_0x18fd64) {
    _0x18fd64.pan = _0x1f8b79;
    _0x18fd64.pos = AudioManager._bgsBuffer.seek();
    AudioManager.updateBgsParameters(_0x18fd64);
    AudioManager.playBgs(_0x18fd64, _0x18fd64.pos);
    AudioManager._bgsBuffer._startPlaying(_0x18fd64.pos);
  }
});
PluginManager.registerCommand(pluginData.name, "DebugConsoleLastControllerID", _0x41e028 => {
  if (!$gameTemp.isPlaytest()) {
    return;
  }
  const _0x3cf2f2 = Input.getLastUsedGamepadType();
  console.log(_0x3cf2f2);
});
PluginManager.registerCommand(pluginData.name, "ExportAllMapText", _0x20d6cc => {
  if (!$gameTemp.isPlaytest()) {
    return;
  }
  if (!Utils.isNwjs()) {
    return;
  }
  SceneManager._scene._active = false;
  VisuMZ.CoreEngine.ExportStrFromAllMaps();
});
PluginManager.registerCommand(pluginData.name, "ExportAllTroopText", _0x1de4e0 => {
  if (!$gameTemp.isPlaytest()) {
    return;
  }
  if (!Utils.isNwjs()) {
    return;
  }
  SceneManager._scene._active = false;
  VisuMZ.CoreEngine.ExportStrFromAllTroops();
});
PluginManager.registerCommand(pluginData.name, 'ExportCurMapText', _0xf6d42 => {
  if (!$gameTemp.isPlaytest()) {
    return;
  }
  if (!Utils.isNwjs()) {
    return;
  }
  if (!$gameMap) {
    return;
  }
  if ($gameMap.mapId() <= 0x0) {
    return;
  }
  VisuMZ.ConvertParams(_0xf6d42, _0xf6d42);
  const _0x34fdd8 = "Map%1".format($gameMap.mapId().padZero(0x3));
  const _0x3532bf = VisuMZ.CoreEngine.ExtractStrFromMap($gameMap.mapId());
  VisuMZ.CoreEngine.ExportString(_0x3532bf, _0x34fdd8, true);
});
PluginManager.registerCommand(pluginData.name, "ExportCurTroopText", _0x3f18ec => {
  if (!$gameTemp.isPlaytest()) {
    return;
  }
  if (!Utils.isNwjs()) {
    return;
  }
  if (!$gameParty.inBattle()) {
    return;
  }
  VisuMZ.ConvertParams(_0x3f18ec, _0x3f18ec);
  const _0x4771bc = "Troop%1".format($gameTroop._troopId.padZero(0x4));
  const _0x258712 = VisuMZ.CoreEngine.ExtractStrFromTroop($gameTroop._troopId);
  VisuMZ.CoreEngine.ExportString(_0x258712, _0x4771bc, true);
});
VisuMZ.CoreEngine.ExportString = function (_0x5c463b, _0x350a0d, _0x567e26) {
  const _0x51a7cf = require('fs');
  let _0x27311e = "Exported_Script_%1.txt".format(_0x350a0d || '0');
  _0x51a7cf.writeFile(_0x27311e, _0x5c463b, _0x3198be => {
    if (_0x3198be) {
      throw err;
    } else if (_0x567e26) {
      alert("Saved file as %1 in project folder.".format(_0x27311e));
    }
  });
};
VisuMZ.CoreEngine.ExportStrFromAllMaps = function () {
  const _0x35ae7e = [];
  for (const _0x18711c of $dataMapInfos) {
    if (!_0x18711c) {
      continue;
    }
    _0x35ae7e.push(_0x18711c.id);
  }
  const _0xcb2537 = _0x35ae7e.length * 0x64 + Math.randomInt(0x64);
  alert("Export Map Text operation will finish in %1 ms(s)".format(_0xcb2537));
  this._storedMapText = [];
  this._currentMap = $dataMap;
  for (const _0x15e7be of _0x35ae7e) {
    VisuMZ.CoreEngine.loadMapData(_0x15e7be);
  }
  setTimeout(VisuMZ.CoreEngine.exportAllMapStrings.bind(this), _0xcb2537);
};
VisuMZ.CoreEngine.loadMapData = function (_0xfe8059) {
  const _0x176b9a = 'Map%1.json'.format(_0xfe8059.padZero(0x3));
  const _0x52dd03 = new XMLHttpRequest();
  const _0x39b052 = 'data/' + _0x176b9a;
  _0x52dd03.open('GET', _0x39b052);
  _0x52dd03.overrideMimeType("application/json");
  _0x52dd03.onload = () => this.storeMapData(_0x52dd03, _0xfe8059, _0x176b9a, _0x39b052);
  _0x52dd03.onerror = () => DataManager.onXhrError("$dataMap", _0x176b9a, _0x39b052);
  _0x52dd03.send();
};
VisuMZ.CoreEngine.storeMapData = function (_0xc4ab1b, _0x1e57f1, _0x461777, _0x2a561b) {
  $dataMap = JSON.parse(_0xc4ab1b.responseText);
  DataManager.onLoad($dataMap);
  this._storedMapText[_0x1e57f1] = VisuMZ.CoreEngine.ExtractStrFromMap(_0x1e57f1);
  $dataMap = this._currentMap;
};
VisuMZ.CoreEngine.exportAllMapStrings = function () {
  this._storedMapText.remove(undefined).remove('').remove(null);
  const _0xf32c1c = this._storedMapText.join("\n\n\n\n\n").trim();
  VisuMZ.CoreEngine.ExportString(_0xf32c1c, "AllMaps", true);
  SceneManager._scene._active = true;
};
VisuMZ.CoreEngine.ExtractStrFromMap = function (_0xafe663) {
  if (!$dataMap) {
    return '';
  }
  let _0x4408c3 = '█'.repeat(0x46) + "\n\n";
  let _0x4a9d5e = '═'.repeat(0x46) + "\n\n";
  let _0x3d06bf = '';
  this._commonEventLayers = 0x0;
  for (const _0x8c31d5 of $dataMap.events) {
    if (!_0x8c31d5) {
      continue;
    }
    let _0x3e8c29 = _0x8c31d5.id;
    let _0x12458a = _0x8c31d5.name;
    let _0x14a4c4 = _0x8c31d5.pages;
    for (const _0x42b8ee of _0x14a4c4) {
      const _0x157038 = _0x14a4c4.indexOf(_0x42b8ee) + 0x1;
      let _0x47d1f1 = _0x4a9d5e + "《《《 Event %1: %2, Page %3 》》》\n%4\n";
      let _0x154606 = VisuMZ.CoreEngine.ExtractStrFromList(_0x42b8ee.list);
      if (_0x154606.length > 0x0) {
        if (_0x3d06bf.length > 0x0) {
          _0x3d06bf += _0x4a9d5e + "\n\n\n\n\n";
        } else {
          const _0xe3f61c = $dataMapInfos[_0xafe663].name;
          _0x3d06bf += _0x4408c3 + "〖〖〖 Map %1: %2 Script 〗〗〗\n\n".format(_0xafe663, _0xe3f61c || 'Unnamed') + _0x4408c3;
        }
        _0x3d06bf += _0x47d1f1.format(_0x3e8c29, _0x12458a, _0x157038, _0x154606);
      }
    }
  }
  if (_0x3d06bf.length > 0x0) {
    _0x3d06bf += _0x4a9d5e;
  }
  return _0x3d06bf;
};
VisuMZ.CoreEngine.ExportStrFromAllTroops = function () {
  const _0xc6f6af = $dataTroops.length * 0xa + Math.randomInt(0xa);
  alert("Export Troop Text operation will finish in %1 ms(s)".format(_0xc6f6af));
  const _0xecb5eb = [];
  for (const _0xb0c0e1 of $dataTroops) {
    if (!_0xb0c0e1) {
      continue;
    }
    const _0x8d13ea = _0xb0c0e1.id;
    _0xecb5eb[_0x8d13ea] = VisuMZ.CoreEngine.ExtractStrFromTroop(_0x8d13ea);
  }
  setTimeout(VisuMZ.CoreEngine.exportAllTroopStrings.bind(this, _0xecb5eb), _0xc6f6af);
};
VisuMZ.CoreEngine.ExtractStrFromTroop = function (_0x3dc192) {
  if (!$dataTroops[_0x3dc192]) {
    return '';
  }
  let _0x639092 = '█'.repeat(0x46) + "\n\n";
  let _0x38e07d = '═'.repeat(0x46) + "\n\n";
  let _0x546f66 = '';
  this._commonEventLayers = 0x0;
  const _0x3c9b68 = $dataTroops[_0x3dc192];
  let _0x163b16 = _0x3c9b68.pages;
  for (const _0x3af970 of _0x163b16) {
    const _0x29675a = _0x163b16.indexOf(_0x3af970) + 0x1;
    let _0xd4dfe8 = _0x38e07d + "《《《 Page %1 》》》\n%2\n";
    let _0x33da8a = VisuMZ.CoreEngine.ExtractStrFromList(_0x3af970.list);
    if (_0x33da8a.length > 0x0) {
      if (_0x546f66.length > 0x0) {
        _0x546f66 += _0x38e07d + "\n\n\n\n\n";
      } else {
        _0x546f66 += _0x639092 + "〖〖〖 Troop %1: %2 Script 〗〗〗\n\n".format(_0x3dc192, _0x3c9b68.name || "Unnamed") + _0x639092;
      }
      _0x546f66 += _0xd4dfe8.format(_0x29675a, _0x33da8a);
    }
  }
  if (_0x546f66.length > 0x0) {
    _0x546f66 += _0x38e07d;
  }
  return _0x546f66;
};
VisuMZ.CoreEngine.exportAllTroopStrings = function (_0x46f386) {
  _0x46f386.remove(undefined).remove('').remove(null);
  const _0x398a3c = _0x46f386.join("\n\n\n\n\n").trim();
  VisuMZ.CoreEngine.ExportString(_0x398a3c, "AllTroops", true);
  SceneManager._scene._active = true;
};
VisuMZ.CoreEngine.ExtractStrFromList = function (_0x56bc02) {
  let _0x53e480 = "\n" + '─'.repeat(0x46) + "\n";
  let _0x7a909c = "\n" + '┄'.repeat(0x46) + "\n";
  let _0x26cceb = '';
  for (const _0x505f26 of _0x56bc02) {
    if (!_0x505f26) {
      continue;
    }
    if (_0x505f26.code === 0x65) {
      _0x26cceb += _0x53e480 + "\n";
      _0x26cceb += "〘Show Text〙\n";
      if (_0x505f26.parameters[0x4] !== '' && _0x505f26.parameters[0x4] !== undefined) {
        _0x26cceb += "【%1】\n".format(_0x505f26.parameters[0x4]);
      }
    } else {
      if (_0x505f26.code === 0x191) {
        _0x26cceb += "%1\n".format(_0x505f26.parameters[0x0]);
      } else {
        if (_0x505f26.code === 0x192) {
          _0x26cceb += _0x53e480;
          _0x26cceb += "%1〘Choice %2〙 %3%1".format(_0x7a909c, _0x505f26.parameters[0x0] + 0x1, _0x505f26.parameters[0x1]);
        } else {
          if (_0x505f26.code === 0x193) {
            _0x26cceb += _0x53e480;
            _0x26cceb += "%1〘Choice Cancel〙%1".format(_0x7a909c);
          } else {
            if (_0x505f26.code === 0x194) {
              _0x26cceb += _0x53e480;
              _0x26cceb += "%1〘End Choice Selection〙%1".format(_0x7a909c);
            } else {
              if (_0x505f26.code === 0x69) {
                _0x26cceb += _0x53e480 + "\n";
                _0x26cceb += "〘Scrolling Text〙\n";
              } else {
                if (_0x505f26.code === 0x6c) {
                  _0x26cceb += _0x53e480 + "\n";
                  _0x26cceb += "》Comment《\n%1\n".format(_0x505f26.parameters[0x0]);
                } else {
                  if (_0x505f26.code === 0x198) {
                    _0x26cceb += "%1\n".format(_0x505f26.parameters[0x0]);
                  } else {
                    if (_0x505f26.code === 0x75) {
                      const _0x391e7c = $dataCommonEvents[_0x505f26.parameters[0x0]];
                      if (_0x391e7c && this._commonEventLayers <= 0xa) {
                        this._commonEventLayers++;
                        let _0x58c8ee = VisuMZ.CoreEngine.ExtractStrFromList(_0x391e7c.list);
                        if (_0x58c8ee.length > 0x0) {
                          _0x26cceb += _0x53e480;
                          _0x26cceb += _0x7a909c;
                          _0x26cceb += "〘Common Event %1: %2〙 Start".format(_0x391e7c.id, _0x391e7c.name);
                          _0x26cceb += _0x7a909c;
                          _0x26cceb += _0x58c8ee;
                          _0x26cceb += _0x7a909c;
                          _0x26cceb += "〘Common Event %1: %2〙 End".format(_0x391e7c.id, _0x391e7c.name);
                          _0x26cceb += _0x7a909c;
                        }
                        this._commonEventLayers--;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  if (_0x26cceb.length > 0x0) {
    _0x26cceb += _0x53e480;
  }
  return _0x26cceb;
};
PluginManager.registerCommand(pluginData.name, 'OpenURL', _0x305cd6 => {
  VisuMZ.ConvertParams(_0x305cd6, _0x305cd6);
  const _0x5a3c70 = _0x305cd6.URL;
  VisuMZ.openURL(_0x5a3c70);
});
PluginManager.registerCommand(pluginData.name, "GoldChange", _0x4d5492 => {
  VisuMZ.ConvertParams(_0x4d5492, _0x4d5492);
  const _0xf49cd8 = _0x4d5492.value || 0x0;
  $gameParty.gainGold(_0xf49cd8);
});
PluginManager.registerCommand(pluginData.name, "MapOnceParallel", _0x44a377 => {
  if (!SceneManager.isSceneMap()) {
    return;
  }
  VisuMZ.ConvertParams(_0x44a377, _0x44a377);
  const _0x4dad13 = _0x44a377.CommonEventID;
  SceneManager._scene.playOnceParallelInterpreter(_0x4dad13);
});
PluginManager.registerCommand(pluginData.name, "PictureCoordinatesMode", _0x2d565a => {
  if (!$gameTemp.isPlaytest()) {
    return;
  }
  if (!Utils.isNwjs()) {
    return;
  }
  VisuMZ.ConvertParams(_0x2d565a, _0x2d565a);
  const _0xa194b3 = _0x2d565a.PictureID || 0x1;
  $gameTemp._pictureCoordinatesMode = _0xa194b3;
});
PluginManager.registerCommand(pluginData.name, "PictureEasingType", _0x4c22cc => {
  VisuMZ.ConvertParams(_0x4c22cc, _0x4c22cc);
  const _0x14c391 = _0x4c22cc.pictureId || 0x1;
  const _0xc26e12 = _0x4c22cc.easingType || 'Linear';
  const _0x8a397e = $gameScreen.picture(_0x14c391);
  if (_0x8a397e) {
    _0x8a397e.setEasingType(_0xc26e12);
  }
});
PluginManager.registerCommand(pluginData.name, "PictureEraseAll", _0x20d61f => {
  for (let _0x223439 = 0x1; _0x223439 <= $gameScreen.maxPictures(); _0x223439++) {
    $gameScreen.erasePicture(_0x223439);
  }
});
PluginManager.registerCommand(pluginData.name, 'PictureEraseRange', _0x4a4fb7 => {
  VisuMZ.ConvertParams(_0x4a4fb7, _0x4a4fb7);
  const _0x33a117 = Math.min(_0x4a4fb7.StartID, _0x4a4fb7.EndingID);
  const _0x52d7f8 = Math.max(_0x4a4fb7.StartID, _0x4a4fb7.EndingID);
  for (let _0x15ecc8 = _0x33a117; _0x15ecc8 <= _0x52d7f8; _0x15ecc8++) {
    $gameScreen.erasePicture(_0x15ecc8);
  }
});
PluginManager.registerCommand(pluginData.name, 'PictureRotateBy', _0x375183 => {
  VisuMZ.ConvertParams(_0x375183, _0x375183);
  const _0x4df7f1 = Math.round(_0x375183.PictureID).clamp(0x1, 0x64);
  const _0x3e6e0b = -Number(_0x375183.AdjustAngle || 0x0);
  const _0xd67a65 = Math.max(_0x375183.Duration || 0x0, 0x0);
  const _0x4fcb43 = _0x375183.easingType || "Linear";
  const _0x23d628 = _0x375183.Wait;
  const _0x297797 = $gameScreen.picture(_0x4df7f1);
  if (!_0x297797) {
    return;
  }
  _0x297797.changeAnglePlusData(_0x3e6e0b, _0xd67a65, _0x4fcb43);
  if (_0x23d628) {
    const _0x4c2188 = $gameTemp.getLastPluginCommandInterpreter();
    if (_0x4c2188) {
      _0x4c2188.wait(_0xd67a65);
    }
  }
});
PluginManager.registerCommand(pluginData.name, "PictureRotate", _0x59a157 => {
  VisuMZ.ConvertParams(_0x59a157, _0x59a157);
  const _0x223e28 = Math.round(_0x59a157.PictureID).clamp(0x1, 0x64);
  const _0x42f61a = -Number(_0x59a157.TargetAngle || 0x0);
  const _0x70dbb7 = Math.max(_0x59a157.Duration || 0x0, 0x0);
  const _0x392726 = _0x59a157.easingType || "Linear";
  const _0x554df2 = _0x59a157.Wait;
  const _0x483de0 = $gameScreen.picture(_0x223e28);
  if (!_0x483de0) {
    return;
  }
  _0x483de0.setAnglePlusData(_0x42f61a, _0x70dbb7, _0x392726);
  if (_0x554df2) {
    const _0x5e1db9 = $gameTemp.getLastPluginCommandInterpreter();
    if (_0x5e1db9) {
      _0x5e1db9.wait(_0x70dbb7);
    }
  }
});
PluginManager.registerCommand(pluginData.name, "PictureShowIcon", _0x5727a0 => {
  VisuMZ.ConvertParams(_0x5727a0, _0x5727a0);
  const _0x387f67 = Math.round(_0x5727a0.PictureID).clamp(0x1, 0x64);
  const _0x517f49 = _0x5727a0.Settings;
  const _0x3da650 = _0x517f49.Origin.clamp(0x0, 0x1);
  const _0x37a5ea = Math.round(_0x517f49.PositionX || 0x0);
  const _0x3a7eac = Math.round(_0x517f49.PositionY || 0x0);
  const _0x7cf39b = Math.round(_0x517f49.ScaleX || 0x0);
  const _0x3a76ab = Math.round(_0x517f49.ScaleY || 0x0);
  const _0x4b35cb = Math.round(_0x517f49.Opacity).clamp(0x0, 0xff);
  const _0x58e519 = _0x517f49.BlendMode;
  const _0x5a5c39 = _0x5727a0.Smooth ? 'Smooth' : "Pixelated";
  const _0x55176a = "VisuMZ CoreEngine PictureIcon %1 %2".format(_0x5727a0.IconIndex, _0x5a5c39);
  $gameScreen.showPicture(_0x387f67, _0x55176a, _0x3da650, _0x37a5ea, _0x3a7eac, _0x7cf39b, _0x3a76ab, _0x4b35cb, _0x58e519);
});
PluginManager.registerCommand(pluginData.name, 'ScreenShake', _0x12179a => {
  VisuMZ.ConvertParams(_0x12179a, _0x12179a);
  const _0x1320d2 = _0x12179a.Type || "random";
  const _0x4acc50 = _0x12179a.Power.clamp(0x1, 0x9);
  const _0x2d99b5 = _0x12179a.Speed.clamp(0x1, 0x9);
  const _0x141763 = _0x12179a.Duration || 0x1;
  const _0x536197 = _0x12179a.Wait;
  $gameScreen.setCoreEngineScreenShakeStyle(_0x1320d2);
  $gameScreen.startShake(_0x4acc50, _0x2d99b5, _0x141763);
  if (_0x536197) {
    const _0x4c6286 = $gameTemp.getLastPluginCommandInterpreter();
    if (_0x4c6286) {
      _0x4c6286.wait(_0x141763);
    }
  }
});
PluginManager.registerCommand(pluginData.name, "SwitchRandomizeOne", _0x87e121 => {
  if ($gameParty.inBattle()) {
    return;
  }
  VisuMZ.ConvertParams(_0x87e121, _0x87e121);
  const _0x104fb6 = _0x87e121.IDs;
  const _0x16d1f2 = (_0x87e121.Chance || 0x0) / 0x64;
  for (const _0x218f76 of _0x104fb6) {
    const _0x2c009a = Math.random() <= _0x16d1f2;
    $gameSwitches.setValue(_0x218f76, _0x2c009a);
  }
});
PluginManager.registerCommand(pluginData.name, "SwitchRandomizeRange", _0x2a893e => {
  if ($gameParty.inBattle()) {
    return;
  }
  VisuMZ.ConvertParams(_0x2a893e, _0x2a893e);
  const _0x22ea1b = Math.min(_0x2a893e.StartID, _0x2a893e.EndingID);
  const _0x156329 = Math.max(_0x2a893e.StartID, _0x2a893e.EndingID);
  const _0x3b13b5 = (_0x2a893e.Chance || 0x0) / 0x64;
  for (let _0x572b23 = _0x22ea1b; _0x572b23 <= _0x156329; _0x572b23++) {
    const _0x28e0fd = Math.random() <= _0x3b13b5;
    $gameSwitches.setValue(_0x572b23, _0x28e0fd);
  }
});
PluginManager.registerCommand(pluginData.name, "SwitchToggleOne", _0x448633 => {
  if ($gameParty.inBattle()) {
    return;
  }
  VisuMZ.ConvertParams(_0x448633, _0x448633);
  const _0x5d7915 = _0x448633.IDs;
  for (const _0x2da82c of _0x5d7915) {
    const _0x2c38ef = $gameSwitches.value(_0x2da82c);
    $gameSwitches.setValue(_0x2da82c, !_0x2c38ef);
  }
});
PluginManager.registerCommand(pluginData.name, "SwitchToggleRange", _0x2bfca8 => {
  if ($gameParty.inBattle()) {
    return;
  }
  VisuMZ.ConvertParams(_0x2bfca8, _0x2bfca8);
  const _0x420c83 = Math.min(_0x2bfca8.StartID, _0x2bfca8.EndingID);
  const _0x3cc68a = Math.max(_0x2bfca8.StartID, _0x2bfca8.EndingID);
  for (let _0x3384c3 = _0x420c83; _0x3384c3 <= _0x3cc68a; _0x3384c3++) {
    const _0x333095 = $gameSwitches.value(_0x3384c3);
    $gameSwitches.setValue(_0x3384c3, !_0x333095);
  }
});
PluginManager.registerCommand(pluginData.name, 'SystemSetFontSize', _0x285364 => {
  VisuMZ.ConvertParams(_0x285364, _0x285364);
  const _0x25fea3 = _0x285364.option || 0x1;
  $gameSystem.setMainFontSize(_0x25fea3);
});
PluginManager.registerCommand(pluginData.name, "SystemSetSideView", _0x98e8ac => {
  if ($gameParty.inBattle()) {
    return;
  }
  VisuMZ.ConvertParams(_0x98e8ac, _0x98e8ac);
  const _0x42a7ea = _0x98e8ac.option;
  if (_0x42a7ea.match(/Front/i)) {
    $gameSystem.setSideView(false);
  } else if (_0x42a7ea.match(/Side/i)) {
    $gameSystem.setSideView(true);
  } else {
    $gameSystem.setSideView(!$gameSystem.isSideView());
  }
});
PluginManager.registerCommand(pluginData.name, "SystemLoadAudio", _0x5a1c8c => {
  if ($gameParty.inBattle()) {
    return;
  }
  VisuMZ.ConvertParams(_0x5a1c8c, _0x5a1c8c);
  const _0x4d193c = ['bgm', "bgs", 'me', 'se'];
  for (const _0x5799fb of _0x4d193c) {
    const _0x89de0b = _0x5a1c8c[_0x5799fb];
    const _0xd232b1 = '%1/'.format(_0x5799fb);
    for (const _0x1eae56 of _0x89de0b) {
      AudioManager.createBuffer(_0xd232b1, _0x1eae56);
    }
  }
});
PluginManager.registerCommand(pluginData.name, "SystemLoadImages", _0x3997ce => {
  if ($gameParty.inBattle()) {
    return;
  }
  VisuMZ.ConvertParams(_0x3997ce, _0x3997ce);
  const _0x91ee6e = ["animations", "battlebacks1", 'battlebacks2', "characters", "enemies", 'faces', 'parallaxes', "pictures", "sv_actors", "sv_enemies", "system", 'tilesets', "titles1", 'titles2'];
  for (const _0xe71c43 of _0x91ee6e) {
    const _0x1a4f74 = _0x3997ce[_0xe71c43];
    const _0x1aeb33 = "img/%1/".format(_0xe71c43);
    for (const _0x103622 of _0x1a4f74) {
      ImageManager.loadBitmap(_0x1aeb33, _0x103622);
    }
  }
});
PluginManager.registerCommand(pluginData.name, 'SystemSetBattleSystem', _0x4b7031 => {
  if ($gameParty.inBattle()) {
    return;
  }
  VisuMZ.ConvertParams(_0x4b7031, _0x4b7031);
  const _0x4db939 = _0x4b7031.option.toUpperCase().trim();
  const _0x167e0a = VisuMZ.CoreEngine.CreateBattleSystemID(_0x4db939);
  $gameSystem.setBattleSystem(_0x167e0a);
});
VisuMZ.CoreEngine.CreateBattleSystemID = function (_0x4aa6a3) {
  _0x4aa6a3 = _0x4aa6a3 || "DATABASE";
  _0x4aa6a3 = String(_0x4aa6a3).toUpperCase().trim();
  switch (_0x4aa6a3) {
    case "DTB":
      return 0x0;
    case "TPB ACTIVE":
      if (Imported.VisuMZ_1_OptionsCore) {
        ConfigManager.atbActive = true;
      }
      return 0x1;
    case "TPB WAIT":
      if (Imported.VisuMZ_1_OptionsCore) {
        ConfigManager.atbActive = false;
      }
      return 0x2;
    case "CTB":
      if (Imported.VisuMZ_2_BattleSystemCTB) {
        return "CTB";
      }
      break;
    case 'STB':
      if (Imported.VisuMZ_2_BattleSystemSTB) {
        return 'STB';
      }
      break;
    case 'BTB':
      if (Imported.VisuMZ_2_BattleSystemBTB) {
        return "BTB";
      }
      break;
    case "FTB":
      if (Imported.VisuMZ_2_BattleSystemFTB) {
        return "FTB";
      }
      break;
    case "OTB":
      if (Imported.VisuMZ_2_BattleSystemOTB) {
        return "OTB";
      }
      break;
    case "ETB":
      if (Imported.VisuMZ_2_BattleSystemETB) {
        return "ETB";
      }
      break;
    case "PTB":
      if (Imported.VisuMZ_2_BattleSystemPTB) {
        return 'PTB';
      }
      break;
  }
  return $dataSystem.battleSystem;
};
PluginManager.registerCommand(pluginData.name, 'SystemSetWindowPadding', _0x3676f6 => {
  VisuMZ.ConvertParams(_0x3676f6, _0x3676f6);
  const _0x1e7d41 = _0x3676f6.option || 0x1;
  $gameSystem.setWindowPadding(_0x1e7d41);
});
PluginManager.registerCommand(pluginData.name, "TextPopupShow", _0x4dd0f3 => {
  VisuMZ.ConvertParams(_0x4dd0f3, _0x4dd0f3);
  const _0x37e7ad = _0x4dd0f3.text || '';
  $textPopup(_0x37e7ad);
});
PluginManager.registerCommand(pluginData.name, "VariableEvalReference", _0x2d2d6c => {
  VisuMZ.ConvertParams(_0x2d2d6c, _0x2d2d6c);
  const _0x5123de = _0x2d2d6c.id || 0x1;
  const _0x5dab5f = _0x2d2d6c.operation;
  const _0x4380a2 = _0x2d2d6c.operand || 0x0;
  let _0xbad1ca = $gameVariables.value(_0x5123de) || 0x0;
  switch (_0x5dab5f) {
    case '=':
      _0xbad1ca = _0x4380a2;
      break;
    case '+':
      _0xbad1ca += _0x4380a2;
      break;
    case '-':
      _0xbad1ca -= _0x4380a2;
      break;
    case '*':
      _0xbad1ca *= _0x4380a2;
      break;
    case '/':
      _0xbad1ca /= _0x4380a2;
      break;
    case '%':
      _0xbad1ca %= _0x4380a2;
      break;
  }
  _0xbad1ca = _0xbad1ca || 0x0;
  $gameVariables.setValue(_0x5123de, _0xbad1ca);
});
PluginManager.registerCommand(pluginData.name, "VariableJsBlock", _0xfacdf3 => {
  VisuMZ.ConvertParams(_0xfacdf3, _0xfacdf3);
  const _0x2fbc07 = _0xfacdf3.id() || 0x1;
  const _0x535898 = _0xfacdf3.operation;
  const _0x35253b = _0xfacdf3.operand() || 0x0;
  let _0x42ecea = $gameVariables.value(_0x2fbc07) || 0x0;
  switch (_0x535898) {
    case '=':
      _0x42ecea = _0x35253b;
      break;
    case '+':
      _0x42ecea += _0x35253b;
      break;
    case '-':
      _0x42ecea -= _0x35253b;
      break;
    case '*':
      _0x42ecea *= _0x35253b;
      break;
    case '/':
      _0x42ecea /= _0x35253b;
      break;
    case '%':
      _0x42ecea %= _0x35253b;
      break;
  }
  _0x42ecea = _0x42ecea || 0x0;
  $gameVariables.setValue(_0x2fbc07, _0x42ecea);
});
VisuMZ.CoreEngine.Scene_Boot_onDatabaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
Scene_Boot.prototype.onDatabaseLoaded = function () {
  VisuMZ.CoreEngine.Scene_Boot_onDatabaseLoaded.call(this);
  this.process_VisuMZ_CoreEngine_RegExp();
  this.process_VisuMZ_CoreEngine_Notetags();
  this.process_VisuMZ_CoreEngine_Settings();
  this.process_VisuMZ_CoreEngine_Functions();
  this.process_VisuMZ_CoreEngine_CustomParameters();
  this.process_VisuMZ_CoreEngine_ControllerButtons();
  VisuMZ.ParseAllNotetags();
};
VisuMZ.CoreEngine.RegExp = {};
Scene_Boot.prototype.process_VisuMZ_CoreEngine_RegExp = function () {
  const _0x542486 = ["MAXHP", 'MAXMP', "ATK", "DEF", "MAT", "MDF", "AGI", 'LUK'];
  const _0x51379d = ['HIT', "EVA", "CRI", "CEV", "MEV", "MRF", "CNT", "HRG", 'MRG', 'TRG'];
  const _0x339569 = ["TGR", 'GRD', 'REC', "PHA", 'MCR', "TCR", "PDR", 'MDR', "FDR", "EXR"];
  const _0xfb2380 = [_0x542486, _0x51379d, _0x339569];
  const _0x27b30b = ["Plus", "Plus1", 'Plus2', "Max", "Rate", "Rate1", "Rate2", "Flat", 'Flat1', "Flat2"];
  for (const _0x5ee071 of _0xfb2380) {
    let _0x9c3172 = '';
    if (_0x5ee071 === _0x542486) {
      _0x9c3172 = 'param';
    }
    if (_0x5ee071 === _0x51379d) {
      _0x9c3172 = 'xparam';
    }
    if (_0x5ee071 === _0x339569) {
      _0x9c3172 = 'sparam';
    }
    for (const _0x38a813 of _0x27b30b) {
      let _0x1886d6 = "%1%2".format(_0x9c3172, _0x38a813);
      VisuMZ.CoreEngine.RegExp[_0x1886d6] = [];
      VisuMZ.CoreEngine.RegExp[_0x1886d6 + 'JS'] = [];
      let _0x166c16 = "<%1 %2:[ ]";
      if (["Plus", 'Flat'].includes(_0x38a813)) {
        _0x166c16 += "([\\+\\-]\\d+)>";
      } else {
        if (["Plus1", "Flat1"].includes(_0x38a813)) {
          _0x166c16 += "([\\+\\-]\\d+)([%％])>";
        } else {
          if (["Plus2", "Flat2"].includes(_0x38a813)) {
            _0x166c16 += "([\\+\\-]\\d+\\.?\\d+)>";
          } else {
            if (_0x38a813 === "Max") {
              _0x166c16 += "(\\d+)>";
            } else {
              if (_0x38a813 === 'Rate1') {
                _0x166c16 += "(\\d+)([%％])>";
              } else if (_0x38a813 === "Rate2") {
                _0x166c16 += "(\\d+\\.?\\d+)>";
              }
            }
          }
        }
      }
      for (const _0x2f43b5 of _0x5ee071) {
        let _0x508cab = _0x38a813.replace(/[\d+]/g, '').toUpperCase();
        const _0x5d51fe = _0x166c16.format(_0x2f43b5, _0x508cab);
        VisuMZ.CoreEngine.RegExp[_0x1886d6].push(new RegExp(_0x5d51fe, 'i'));
        const _0x5a29f9 = "<JS %1 %2:[ ](.*)>".format(_0x2f43b5, _0x508cab);
        VisuMZ.CoreEngine.RegExp[_0x1886d6 + 'JS'].push(new RegExp(_0x5a29f9, 'i'));
      }
    }
  }
};
Scene_Boot.prototype.process_VisuMZ_CoreEngine_Notetags = function () {
  if (VisuMZ.ParseAllNotetags) {
    return;
  }
};
Scene_Boot.prototype.process_VisuMZ_CoreEngine_Settings = function () {
  const _0x3c12b3 = VisuMZ.CoreEngine.Settings;
  if (_0x3c12b3.QoL.OpenConsole) {
    VisuMZ.ShowDevTools(true);
  }
  if (_0x3c12b3.QoL.ModernControls) {
    Input.keyMapper[0x23] = 'end';
    Input.keyMapper[0x24] = "home";
  }
  if (_0x3c12b3.ButtonAssist) {
    const _0x23321e = _0x3c12b3.ButtonAssist;
    _0x23321e.KeySHIFT = _0x23321e.KeySHIFT || "\\}❪SHIFT❫\\{";
    _0x23321e.KeyTAB = _0x23321e.KeyTAB || "\\}❪TAB❫\\{";
  }
  if (_0x3c12b3.KeyboardInput.WASD) {
    Input.keyMapper[0x57] = 'up';
    Input.keyMapper[0x41] = "left";
    Input.keyMapper[0x53] = "down";
    Input.keyMapper[0x44] = 'right';
    Input.keyMapper[0x45] = "pagedown";
  }
  if (_0x3c12b3.KeyboardInput.DashToggleR) {
    Input.keyMapper[0x52] = "dashToggle";
  }
  _0x3c12b3.Param.DisplayedParams = _0x3c12b3.Param.DisplayedParams.map(_0x522bf7 => _0x522bf7.toUpperCase().trim());
  _0x3c12b3.Param.ExtDisplayedParams = _0x3c12b3.Param.ExtDisplayedParams.map(_0x4b1eae => _0x4b1eae.toUpperCase().trim());
  _0x3c12b3.QoL.ShiftR_Toggle = _0x3c12b3.QoL.ShiftR_Toggle ?? true;
  _0x3c12b3.QoL.ShiftT_Toggle = _0x3c12b3.QoL.ShiftT_Toggle ?? true;
  if (_0x3c12b3.ButtonAssist.SplitEscape) {
    VisuMZ.CoreEngine.CheckSplitEscape();
  }
};
VisuMZ.CoreEngine.CheckSplitEscape = function () {
  let _0x253fe6 = false;
  let _0x57aded = false;
  for (let _0x2e62c0 in Input.keyMapper) {
    const _0x2bb86e = Input.keyMapper[_0x2e62c0];
    if (_0x2bb86e === 'menu') {
      _0x253fe6 = true;
    }
    if (_0x2bb86e === "cancel") {
      _0x57aded = true;
    }
    if (_0x253fe6 && _0x57aded) {
      return;
    }
  }
  let _0x5beb8f = "ERROR!\n\nCore Engine > Plugin Parameters > Button Assist > Split Escape\n\n";
  _0x5beb8f += "You do not have a custom Input.keyMapper with \"cancel\" and \"menu\" ";
  _0x5beb8f += "buttons! Go to project's rmmz_core.js and modify Input.keyMapper ";
  _0x5beb8f += "keys for both \"cancel\" and \"menu\"!\n\n";
  _0x5beb8f += "If you don't want this option, set Split Escape option back to false.";
  alert(_0x5beb8f);
  SceneManager.exit();
};
Scene_Boot.prototype.process_VisuMZ_CoreEngine_Functions = function () {
  this.process_VisuMZ_CoreEngine_jsQuickFunctions();
};
Scene_Boot.prototype.process_VisuMZ_CoreEngine_jsQuickFunctions = function () {
  const _0x169c39 = VisuMZ.CoreEngine.Settings.jsQuickFunc;
  for (const _0x6e84c5 of _0x169c39) {
    const _0x33077d = _0x6e84c5.FunctionName.replace(/[ ]/g, '');
    const _0x140f4a = _0x6e84c5.CodeJS;
    VisuMZ.CoreEngine.createJsQuickFunction(_0x33077d, _0x140f4a);
  }
};
VisuMZ.CoreEngine.createJsQuickFunction = function (_0x5a6693, _0x54c3d8) {
  if (!!window[_0x5a6693]) {
    if ($gameTemp.isPlaytest()) {
      console.log("WARNING: %1 has already been declared\nand cannot be used as a Quick JS Function".format(_0x5a6693));
    }
  }
  const _0x2c16ff = "\n        try {\n            %2\n        } catch (e) {\n            if ($gameTemp.isPlaytest()) {\n                console.log('JS Quick Function \"%1\" Error!');\n                console.log(e);\n            }\n            return 0;\n        }\n    ".format(_0x5a6693, _0x54c3d8);
  window[_0x5a6693] = new Function(_0x2c16ff);
};
Scene_Boot.prototype.process_VisuMZ_CoreEngine_CustomParameters = function () {
  const _0xb7ffde = VisuMZ.CoreEngine.Settings.CustomParam;
  if (!_0xb7ffde) {
    return;
  }
  for (const _0x3da0c0 of _0xb7ffde) {
    if (!_0x3da0c0) {
      continue;
    }
    VisuMZ.CoreEngine.createCustomParameter(_0x3da0c0);
  }
};
VisuMZ.CoreEngine.CustomParamNames = {};
VisuMZ.CoreEngine.CustomParamIcons = {};
VisuMZ.CoreEngine.CustomParamType = {};
VisuMZ.CoreEngine.CustomParamAbb = {};
VisuMZ.CoreEngine.createCustomParameter = function (_0x3bea10) {
  const _0x5aa273 = _0x3bea10.Abbreviation;
  const _0x35a813 = _0x3bea10.ParamName;
  const _0x9a8ad = _0x3bea10.Icon;
  const _0x6075a9 = _0x3bea10.Type;
  const _0xc6c098 = new Function(_0x3bea10.ValueJS);
  VisuMZ.CoreEngine.CustomParamNames[_0x5aa273.toUpperCase().trim()] = _0x35a813;
  VisuMZ.CoreEngine.CustomParamIcons[_0x5aa273.toUpperCase().trim()] = _0x9a8ad;
  VisuMZ.CoreEngine.CustomParamType[_0x5aa273.toUpperCase().trim()] = _0x6075a9;
  VisuMZ.CoreEngine.CustomParamAbb[_0x5aa273.toUpperCase().trim()] = _0x5aa273;
  Object.defineProperty(Game_BattlerBase.prototype, _0x5aa273, {
    'get'() {
      const _0x305487 = _0xc6c098.call(this);
      return _0x6075a9 === "integer" ? Math.round(_0x305487) : _0x305487;
    }
  });
};
VisuMZ.CoreEngine.ControllerButtons = {};
VisuMZ.CoreEngine.ControllerMatches = {};
Scene_Boot.prototype.process_VisuMZ_CoreEngine_ControllerButtons = function () {
  const _0x5e57e4 = VisuMZ.CoreEngine.Settings.ControllerButtons;
  for (const _0x574a04 of _0x5e57e4) {
    const _0xff3474 = (_0x574a04.Name || '').toLowerCase().trim();
    const _0x1ddab2 = (_0x574a04.Match || '').toLowerCase().trim();
    VisuMZ.CoreEngine.ControllerButtons[_0xff3474] = _0x574a04;
    VisuMZ.CoreEngine.ControllerMatches[_0x1ddab2] = _0xff3474;
  }
};
VisuMZ.ParseAllNotetags = function () {
  for (const _0x285675 of $dataActors) {
    if (_0x285675) {
      VisuMZ.ParseActorNotetags(_0x285675);
    }
  }
  for (const _0x411de7 of $dataClasses) {
    if (_0x411de7) {
      VisuMZ.ParseClassNotetags(_0x411de7);
    }
  }
  for (const _0x2330ff of $dataSkills) {
    if (_0x2330ff) {
      VisuMZ.ParseSkillNotetags(_0x2330ff);
    }
  }
  for (const _0x4a7344 of $dataItems) {
    if (_0x4a7344) {
      VisuMZ.ParseItemNotetags(_0x4a7344);
    }
  }
  for (const _0x25ae6b of $dataWeapons) {
    if (_0x25ae6b) {
      VisuMZ.ParseWeaponNotetags(_0x25ae6b);
    }
  }
  for (const _0xc41855 of $dataArmors) {
    if (_0xc41855) {
      VisuMZ.ParseArmorNotetags(_0xc41855);
    }
  }
  for (const _0x301c52 of $dataEnemies) {
    if (_0x301c52) {
      VisuMZ.ParseEnemyNotetags(_0x301c52);
    }
  }
  for (const _0x4311e8 of $dataStates) {
    if (_0x4311e8) {
      VisuMZ.ParseStateNotetags(_0x4311e8);
    }
  }
  for (const _0x2a067a of $dataTilesets) {
    if (_0x2a067a) {
      VisuMZ.ParseTilesetNotetags(_0x2a067a);
    }
  }
};
VisuMZ.ParseActorNotetags = function (_0x1c936f) {};
VisuMZ.ParseClassNotetags = function (_0x3e0e92) {};
VisuMZ.ParseSkillNotetags = function (_0x434360) {};
VisuMZ.ParseItemNotetags = function (_0x113bb5) {};
VisuMZ.ParseWeaponNotetags = function (_0x1a0257) {};
VisuMZ.ParseArmorNotetags = function (_0x13656d) {};
VisuMZ.ParseEnemyNotetags = function (_0x1681ff) {};
VisuMZ.ParseStateNotetags = function (_0x2f82f7) {};
VisuMZ.ParseTilesetNotetags = function (_0x1fe81a) {};
VisuMZ.CoreEngine.ParseActorNotetags = VisuMZ.ParseActorNotetags;
VisuMZ.ParseActorNotetags = function (_0xa49945) {
  VisuMZ.CoreEngine.ParseActorNotetags.call(this, _0xa49945);
  const _0x57d7fb = _0xa49945.note;
  if (_0x57d7fb.match(/<MAX LEVEL:[ ](\d+)>/i)) {
    _0xa49945.maxLevel = Number(RegExp.$1);
    if (_0xa49945.maxLevel === 0x0) {
      _0xa49945.maxLevel = Number.MAX_SAFE_INTEGER;
    }
  }
  if (_0x57d7fb.match(/<INITIAL LEVEL:[ ](\d+)>/i)) {
    _0xa49945.initialLevel = Math.min(Number(RegExp.$1), _0xa49945.maxLevel);
  }
};
VisuMZ.CoreEngine.ParseClassNotetags = VisuMZ.ParseClassNotetags;
VisuMZ.ParseClassNotetags = function (_0x424d37) {
  VisuMZ.CoreEngine.ParseClassNotetags.call(this, _0x424d37);
  if (_0x424d37.learnings) {
    for (const _0x17aea9 of _0x424d37.learnings) {
      if (_0x17aea9.note.match(/<LEARN AT LEVEL:[ ](\d+)>/i)) {
        _0x17aea9.level = Math.max(Number(RegExp.$1), 0x1);
      }
    }
  }
};
VisuMZ.CoreEngine.ParseEnemyNotetags = VisuMZ.ParseEnemyNotetags;
VisuMZ.ParseEnemyNotetags = function (_0x3f9fdb) {
  VisuMZ.CoreEngine.ParseEnemyNotetags.call(this, _0x3f9fdb);
  _0x3f9fdb.level = 0x1;
  const _0x50aa94 = _0x3f9fdb.note;
  if (_0x50aa94.match(/<LEVEL:[ ](\d+)>/i)) {
    _0x3f9fdb.level = Number(RegExp.$1);
  }
  if (_0x50aa94.match(/<MAXHP:[ ](\d+)>/i)) {
    _0x3f9fdb.params[0x0] = Number(RegExp.$1);
  }
  if (_0x50aa94.match(/<MAXMP:[ ](\d+)>/i)) {
    _0x3f9fdb.params[0x1] = Number(RegExp.$1);
  }
  if (_0x50aa94.match(/<ATK:[ ](\d+)>/i)) {
    _0x3f9fdb.params[0x2] = Number(RegExp.$1);
  }
  if (_0x50aa94.match(/<DEF:[ ](\d+)>/i)) {
    _0x3f9fdb.params[0x3] = Number(RegExp.$1);
  }
  if (_0x50aa94.match(/<MAT:[ ](\d+)>/i)) {
    _0x3f9fdb.params[0x4] = Number(RegExp.$1);
  }
  if (_0x50aa94.match(/<MDF:[ ](\d+)>/i)) {
    _0x3f9fdb.params[0x5] = Number(RegExp.$1);
  }
  if (_0x50aa94.match(/<AGI:[ ](\d+)>/i)) {
    _0x3f9fdb.params[0x6] = Number(RegExp.$1);
  }
  if (_0x50aa94.match(/<LUK:[ ](\d+)>/i)) {
    _0x3f9fdb.params[0x7] = Number(RegExp.$1);
  }
  if (_0x50aa94.match(/<EXP:[ ](\d+)>/i)) {
    _0x3f9fdb.exp = Number(RegExp.$1);
  }
  if (_0x50aa94.match(/<GOLD:[ ](\d+)>/i)) {
    _0x3f9fdb.gold = Number(RegExp.$1);
  }
};
VisuMZ.CoreEngine.Graphics_defaultStretchMode = Graphics._defaultStretchMode;
Graphics._defaultStretchMode = function () {
  switch (VisuMZ.CoreEngine.Settings.QoL.AutoStretch) {
    case "stretch":
      return true;
    case "normal":
      return false;
    default:
      return VisuMZ.CoreEngine.Graphics_defaultStretchMode.call(this);
  }
};
VisuMZ.CoreEngine.Graphics_printError = Graphics.printError;
Graphics.printError = function (_0x388e64, _0x3116ed, _0x4e7da8 = null) {
  VisuMZ.CoreEngine.Graphics_printError.call(this, _0x388e64, _0x3116ed, _0x4e7da8);
  VisuMZ.ShowDevTools(false);
};
VisuMZ.CoreEngine.Graphics_centerElement = Graphics._centerElement;
Graphics._centerElement = function (_0x124bad) {
  VisuMZ.CoreEngine.Graphics_centerElement.call(this, _0x124bad);
  this._centerElementCoreEngine(_0x124bad);
};
Graphics._centerElementCoreEngine = function (_0x2e3336) {
  if (VisuMZ.CoreEngine.Settings.QoL.FontSmoothing) {
    _0x2e3336.style["font-smooth"] = "none";
  }
  if (VisuMZ.CoreEngine.Settings.QoL.PixelateImageRendering) {
    _0x2e3336.style["image-rendering"] = "pixelated";
  }
  const _0x3c1b86 = Math.max(0x0, Math.floor(_0x2e3336.width * this._realScale));
  const _0x20c62c = Math.max(0x0, Math.floor(_0x2e3336.height * this._realScale));
  _0x2e3336.style.width = _0x3c1b86 + 'px';
  _0x2e3336.style.height = _0x20c62c + 'px';
};
VisuMZ.CoreEngine.Bitmap_initialize = Bitmap.prototype.initialize;
Bitmap.prototype.initialize = function (_0x57269d, _0x2f12dd) {
  VisuMZ.CoreEngine.Bitmap_initialize.call(this, _0x57269d, _0x2f12dd);
  this._smooth = !(VisuMZ.CoreEngine.Settings.QoL.PixelateImageRendering ?? true);
};
Bitmap.prototype.markCoreEngineModified = function () {
  this._customModified = true;
};
VisuMZ.CoreEngine.Sprite_destroy = Sprite.prototype.destroy;
Sprite.prototype.destroy = function () {
  if (this._texture) {
    VisuMZ.CoreEngine.Sprite_destroy.call(this);
  }
  this.destroyCoreEngineMarkedBitmaps();
};
Sprite.prototype.destroyCoreEngineMarkedBitmaps = function () {
  if (!this.bitmap) {
    return;
  }
  if (!this.bitmap._customModified) {
    return;
  }
  if (this.bitmap._baseTexture && !this._bitmap._baseTexture.destroyed) {
    this.bitmap.destroy();
  }
};
VisuMZ.CoreEngine.Bitmap_resize = Bitmap.prototype.resize;
Bitmap.prototype.resize = function (_0x4e670f, _0x5f4198) {
  VisuMZ.CoreEngine.Bitmap_resize.call(this, _0x4e670f, _0x5f4198);
  this.markCoreEngineModified();
};
VisuMZ.CoreEngine.Bitmap_blt = Bitmap.prototype.blt;
Bitmap.prototype.blt = function (_0x30804d, _0x40a9a7, _0x44b201, _0x4929a2, _0x7d7217, _0x202b8a, _0x56d581, _0x414b7d, _0x4d4a09) {
  _0x40a9a7 = Math.round(_0x40a9a7);
  _0x44b201 = Math.round(_0x44b201);
  _0x4929a2 = Math.round(_0x4929a2);
  _0x7d7217 = Math.round(_0x7d7217);
  _0x202b8a = Math.round(_0x202b8a);
  _0x56d581 = Math.round(_0x56d581);
  VisuMZ.CoreEngine.Bitmap_blt.call(this, _0x30804d, _0x40a9a7, _0x44b201, _0x4929a2, _0x7d7217, _0x202b8a, _0x56d581, _0x414b7d, _0x4d4a09);
  this.markCoreEngineModified();
};
VisuMZ.CoreEngine.Bitmap_clearRect = Bitmap.prototype.clearRect;
Bitmap.prototype.clearRect = function (_0x49b56e, _0x2489b5, _0xb80326, _0x40d9d8) {
  VisuMZ.CoreEngine.Bitmap_clearRect.call(this, _0x49b56e, _0x2489b5, _0xb80326, _0x40d9d8);
  this.markCoreEngineModified();
};
VisuMZ.CoreEngine.Bitmap_fillRect = Bitmap.prototype.fillRect;
Bitmap.prototype.fillRect = function (_0x212aef, _0x4a5f3a, _0x3c79ce, _0x591b8c, _0x1f31e4) {
  VisuMZ.CoreEngine.Bitmap_fillRect.call(this, _0x212aef, _0x4a5f3a, _0x3c79ce, _0x591b8c, _0x1f31e4);
  this.markCoreEngineModified();
};
VisuMZ.CoreEngine.Bitmap_strokeRect = Bitmap.prototype.strokeRect;
Bitmap.prototype.strokeRect = function (_0x1dc114, _0x124fbc, _0x1d4865, _0x468bd0, _0x4cf684) {
  VisuMZ.CoreEngine.Bitmap_strokeRect.call(this, _0x1dc114, _0x124fbc, _0x1d4865, _0x468bd0, _0x4cf684);
  this.markCoreEngineModified();
};
VisuMZ.CoreEngine.Bitmap_gradientFillRect = Bitmap.prototype.gradientFillRect;
Bitmap.prototype.gradientFillRect = function (_0x4f9f9c, _0x213a16, _0x2b5edf, _0x33b959, _0x452d78, _0x3163c7, _0x39274d) {
  VisuMZ.CoreEngine.Bitmap_gradientFillRect.call(this, _0x4f9f9c, _0x213a16, _0x2b5edf, _0x33b959, _0x452d78, _0x3163c7, _0x39274d);
  this.markCoreEngineModified();
};
VisuMZ.CoreEngine.Bitmap_drawCircle = Bitmap.prototype.drawCircle;
Bitmap.prototype.drawCircle = function (_0x1160c9, _0x8e8e13, _0x576c6e, _0x113a61) {
  _0x1160c9 = Math.round(_0x1160c9);
  _0x8e8e13 = Math.round(_0x8e8e13);
  _0x576c6e = Math.round(_0x576c6e);
  VisuMZ.CoreEngine.Bitmap_drawCircle.call(this, _0x1160c9, _0x8e8e13, _0x576c6e, _0x113a61);
  this.markCoreEngineModified();
};
VisuMZ.CoreEngine.Bitmap_measureTextWidth = Bitmap.prototype.measureTextWidth;
Bitmap.prototype.measureTextWidth = function (_0x4eb40e) {
  return Math.ceil(VisuMZ.CoreEngine.Bitmap_measureTextWidth.call(this, _0x4eb40e));
};
VisuMZ.CoreEngine.Bitmap_drawText = Bitmap.prototype.drawText;
Bitmap.prototype.drawText = function (_0x21ff41, _0x3ca271, _0x17c013, _0x25dd9b, _0x498a6b, _0x2f05f3) {
  _0x3ca271 = Math.round(_0x3ca271);
  _0x17c013 = Math.round(_0x17c013);
  _0x25dd9b = Math.ceil(_0x25dd9b);
  _0x498a6b = Math.ceil(_0x498a6b);
  VisuMZ.CoreEngine.Bitmap_drawText.call(this, _0x21ff41, _0x3ca271, _0x17c013, _0x25dd9b, _0x498a6b, _0x2f05f3);
  this.markCoreEngineModified();
};
VisuMZ.CoreEngine.Bitmap_drawTextOutline = Bitmap.prototype._drawTextOutline;
Bitmap.prototype._drawTextOutline = function (_0x3fea39, _0x464603, _0x57ace1, _0x245802) {
  if (VisuMZ.CoreEngine.Settings.QoL.FontShadows) {
    this._drawTextShadow(_0x3fea39, _0x464603, _0x57ace1, _0x245802);
  } else {
    VisuMZ.CoreEngine.Bitmap_drawTextOutline.call(this, _0x3fea39, _0x464603, _0x57ace1, _0x245802);
  }
};
Bitmap.prototype._drawTextShadow = function (_0xc1b1a4, _0x66085c, _0x331c63, _0x4bb48c) {
  const _0x1220e1 = this.context;
  _0x1220e1.fillStyle = this.outlineColor;
  _0x1220e1.fillText(_0xc1b1a4, _0x66085c + 0x2, _0x331c63 + 0x2, _0x4bb48c);
};
VisuMZ.CoreEngine.Input_clear = Input.clear;
Input.clear = function () {
  VisuMZ.CoreEngine.Input_clear.call(this);
  this._inputString = undefined;
  this._inputSpecialKeyCode = undefined;
  this._gamepadWait = Input.keyRepeatWait;
};
VisuMZ.CoreEngine.Input_update = Input.update;
Input.update = function () {
  VisuMZ.CoreEngine.Input_update.call(this);
  if (this._gamepadWait) {
    this._gamepadWait--;
  }
};
VisuMZ.CoreEngine.Input_pollGamepads = Input._pollGamepads;
Input._pollGamepads = function () {
  if (this._gamepadWait) {
    return;
  }
  VisuMZ.CoreEngine.Input_pollGamepads.call(this);
};
VisuMZ.CoreEngine.Input_setupEventHandlers = Input._setupEventHandlers;
Input._setupEventHandlers = function () {
  VisuMZ.CoreEngine.Input_setupEventHandlers.call(this);
  document.addEventListener("keypress", this._onKeyPress.bind(this));
};
VisuMZ.CoreEngine.Input_onKeyDown = Input._onKeyDown;
Input._onKeyDown = function (_0x1a8c5d) {
  this._inputSpecialKeyCode = _0x1a8c5d.keyCode;
  VisuMZ.CoreEngine.Input_onKeyDown.call(this, _0x1a8c5d);
  this.setLastGamepadUsed(null);
};
Input._onKeyPress = function (_0x11b6b3) {
  this._registerKeyInput(_0x11b6b3);
};
Input._registerKeyInput = function (_0x516f1b) {
  this._inputSpecialKeyCode = _0x516f1b.keyCode;
  let _0x2daeaa = String.fromCharCode(_0x516f1b.charCode);
  if (this._inputString === undefined) {
    this._inputString = _0x2daeaa;
  } else {
    this._inputString += _0x2daeaa;
  }
};
VisuMZ.CoreEngine.Input_shouldPreventDefault = Input._shouldPreventDefault;
Input._shouldPreventDefault = function (_0x535b7d) {
  if (_0x535b7d === 0x8) {
    return false;
  }
  return VisuMZ.CoreEngine.Input_shouldPreventDefault.call(this, _0x535b7d);
};
Input.isSpecialCode = function (_0x2071b5) {
  if (_0x2071b5.match(/backspace/i)) {
    return this._inputSpecialKeyCode === 0x8;
  }
  if (_0x2071b5.match(/enter/i)) {
    return this._inputSpecialKeyCode === 0xd;
  }
  if (_0x2071b5.match(/escape/i)) {
    return this._inputSpecialKeyCode === 0x1b;
  }
};
Input.isNumpadPressed = function () {
  return [0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39].contains(this._inputSpecialKeyCode);
};
Input.isArrowPressed = function () {
  return [0x25, 0x26, 0x27, 0x28].contains(this._inputSpecialKeyCode);
};
Input.isGamepadConnected = function () {
  if (navigator.getGamepads) {
    const _0x380aa1 = navigator.getGamepads();
    if (_0x380aa1) {
      for (const _0x87f71f of _0x380aa1) {
        if (_0x87f71f && _0x87f71f.connected) {
          return true;
        }
      }
    }
  }
  return false;
};
Input.isGamepadTriggered = function () {
  if (navigator.getGamepads) {
    const _0x1f3eb3 = navigator.getGamepads();
    if (_0x1f3eb3) {
      for (const _0x2531bd of _0x1f3eb3) {
        if (_0x2531bd && _0x2531bd.connected) {
          if (this.isGamepadButtonPressed(_0x2531bd)) {
            return true;
          }
          if (this.isGamepadAxisMoved(_0x2531bd)) {
            return true;
          }
        }
      }
    }
  }
  return false;
};
Input.isGamepadButtonPressed = function (_0x3cd031) {
  const _0x9fabfc = _0x3cd031.buttons;
  for (let _0x22699c = 0x0; _0x22699c < _0x9fabfc.length; _0x22699c++) {
    if (_0x9fabfc[_0x22699c].pressed) {
      return true;
    }
  }
  return false;
};
Input.isGamepadAxisMoved = function (_0x5e3c51) {
  const _0x1b9b85 = _0x5e3c51.axes;
  if (_0x1b9b85[0x0] < -0.5) {
    return true;
  }
  if (_0x1b9b85[0x0] > 0.5) {
    return true;
  }
  if (_0x1b9b85[0x1] < -0.5) {
    return true;
  }
  if (_0x1b9b85[0x1] > 0.5) {
    return true;
  }
  return false;
};
Input.getLastGamepadUsed = function () {
  return this._lastGamepad || null;
};
Input.setLastGamepadUsed = function (_0x483904) {
  this._lastGamepad = _0x483904;
};
VisuMZ.CoreEngine.Input_updateGamepadState = Input._updateGamepadState;
Input._updateGamepadState = function (_0x41cd22) {
  VisuMZ.CoreEngine.Input_updateGamepadState.call(this, _0x41cd22);
  if (this.isGamepadButtonPressed(_0x41cd22) || this.isGamepadAxisMoved(_0x41cd22)) {
    this.setLastGamepadUsed(_0x41cd22);
  }
};
Input.getLastUsedGamepadType = function () {
  return this._lastGamepad ? this._lastGamepad.id : "Keyboard";
};
VisuMZ.CoreEngine.Tilemap_addShadow = Tilemap.prototype._addShadow;
Tilemap.prototype._addShadow = function (_0x44a092, _0x258edf, _0x38832f, _0x42ea7e) {
  if ($gameMap && $gameMap.areTileShadowsHidden()) {
    return;
  }
  VisuMZ.CoreEngine.Tilemap_addShadow.call(this, _0x44a092, _0x258edf, _0x38832f, _0x42ea7e);
};
Tilemap.Renderer.prototype._createInternalTextures = function () {
  this._destroyInternalTextures();
  for (let _0x248641 = 0x0; _0x248641 < Tilemap.Layer.MAX_GL_TEXTURES; _0x248641++) {
    const _0x5c28c7 = new PIXI.BaseTexture();
    _0x5c28c7.setSize(0x800, 0x800);
    if (VisuMZ.CoreEngine.Settings.QoL.PixelateImageRendering) {
      _0x5c28c7.scaleMode = PIXI.SCALE_MODES.NEAREST;
    }
    this._internalTextures.push(_0x5c28c7);
  }
};
WindowLayer.prototype.isMaskingEnabled = function () {
  return SceneManager && SceneManager._scene ? SceneManager._scene.isWindowMaskingEnabled() : true;
};
VisuMZ.CoreEngine.WindowLayer_render = WindowLayer.prototype.render;
WindowLayer.prototype.render = function render(_0x2406db) {
  if (this.isMaskingEnabled()) {
    VisuMZ.CoreEngine.WindowLayer_render.call(this, _0x2406db);
  } else {
    this.renderNoMask(_0x2406db);
  }
};
WindowLayer.prototype.renderNoMask = function render(_0x28ee36) {
  if (!this.visible) {
    return;
  }
  const _0x4c4b48 = new PIXI.Graphics();
  const _0x83475b = _0x28ee36.gl;
  const _0x9e8cd4 = this.children.clone();
  _0x28ee36.framebuffer.forceStencil();
  _0x4c4b48.transform = this.transform;
  _0x28ee36.batch.flush();
  _0x83475b.enable(_0x83475b.STENCIL_TEST);
  while (_0x9e8cd4.length > 0x0) {
    const _0x328d06 = _0x9e8cd4.shift();
    if (_0x328d06._isWindow && _0x328d06.visible && _0x328d06.openness > 0x0) {
      _0x83475b.stencilFunc(_0x83475b.EQUAL, 0x0, -1);
      _0x83475b.stencilOp(_0x83475b.KEEP, _0x83475b.KEEP, _0x83475b.KEEP);
      _0x328d06.render(_0x28ee36);
      _0x28ee36.batch.flush();
      _0x4c4b48.clear();
      _0x83475b.stencilFunc(_0x83475b.ALWAYS, 0x1, -1);
      _0x83475b.stencilOp(_0x83475b.REPLACE, _0x83475b.REPLACE, _0x83475b.REPLACE);
      _0x83475b.blendFunc(_0x83475b.ZERO, _0x83475b.ONE);
      _0x4c4b48.render(_0x28ee36);
      _0x28ee36.batch.flush();
      _0x83475b.blendFunc(_0x83475b.ONE, _0x83475b.ONE_MINUS_SRC_ALPHA);
    }
  }
  _0x83475b.disable(_0x83475b.STENCIL_TEST);
  _0x83475b.clear(_0x83475b.STENCIL_BUFFER_BIT);
  _0x83475b.clearStencil(0x0);
  _0x28ee36.batch.flush();
  for (const _0x4fcd46 of this.children) {
    if (!_0x4fcd46._isWindow && _0x4fcd46.visible) {
      _0x4fcd46.render(_0x28ee36);
    }
  }
  _0x28ee36.batch.flush();
};
DataManager.isKeyItem = function (_0x27f465) {
  return this.isItem(_0x27f465) && _0x27f465.itypeId === 0x2;
};
VisuMZ.CoreEngine.DataManager_setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function () {
  VisuMZ.CoreEngine.DataManager_setupNewGame.call(this);
  this.reservePlayTestNewGameCommonEvent();
  this.reserveNewGameCommonEvent();
};
DataManager.reservePlayTestNewGameCommonEvent = function () {
  if ($gameTemp.isPlaytest()) {
    const _0x33f93c = VisuMZ.CoreEngine.Settings.QoL.NewGameCommonEvent;
    if (_0x33f93c > 0x0) {
      $gameTemp.reserveCommonEvent(_0x33f93c);
    }
  }
};
DataManager.reserveNewGameCommonEvent = function () {
  const _0x3276bc = VisuMZ.CoreEngine.Settings.QoL.NewGameCommonEventAll || 0x0;
  if (_0x3276bc > 0x0) {
    $gameTemp.reserveCommonEvent(_0x3276bc);
  }
};
DataManager.createTroopNote = function (_0x460dd9) {
  const _0x5dbdcd = $dataTroops[_0x460dd9];
  if (!_0x5dbdcd) {
    return '';
  }
  let _0x59645b = '';
  _0x59645b += _0x5dbdcd.name;
  for (const _0x523368 of _0x5dbdcd.pages) {
    for (const _0x493abc of _0x523368.list) {
      if ([0x6c, 0x198].includes(_0x493abc.code)) {
        _0x59645b += "\n";
        _0x59645b += _0x493abc.parameters[0x0];
      }
    }
  }
  return _0x59645b;
};
if (VisuMZ.CoreEngine.Settings.QoL.ShortcutScripts ?? true) {
  $scene = null;
  VisuMZ.CoreEngine.Scene_Base_create = Scene_Base.prototype.create;
  Scene_Base.prototype.create = function () {
    VisuMZ.CoreEngine.Scene_Base_create.call(this);
    $scene = this;
  };
  $spriteset = null;
  VisuMZ.CoreEngine.Scene_Map_createSpriteset = Scene_Map.prototype.createSpriteset;
  Scene_Map.prototype.createSpriteset = function () {
    VisuMZ.CoreEngine.Scene_Map_createSpriteset.call(this);
    $spriteset = this._spriteset;
  };
  VisuMZ.CoreEngine.Scene_Battle_createSpriteset = Scene_Battle.prototype.createSpriteset;
  Scene_Battle.prototype.createSpriteset = function () {
    VisuMZ.CoreEngine.Scene_Battle_createSpriteset.call(this);
    $spriteset = this._spriteset;
  };
  VisuMZ.CoreEngine.Scene_Base_terminate = Scene_Base.prototype.terminate;
  Scene_Base.prototype.terminate = function () {
    VisuMZ.CoreEngine.Scene_Base_terminate.call(this);
    $spriteset = null;
    $subject = null;
    $targets = null;
    $target = null;
  };
  $subject = null;
  $targets = null;
  $target = null;
  VisuMZ.CoreEngine.BattleManager_update = BattleManager.update;
  BattleManager.update = function (_0x40b3c8) {
    VisuMZ.CoreEngine.BattleManager_update.call(this, _0x40b3c8);
    this.updateBattleVariables();
  };
  BattleManager.updateBattleVariables = function () {
    $subject = this._subject;
    $targets = this._targets;
    $target = this._target || this._targets[0x0];
  };
  $event = null;
  VisuMZ.CoreEngine.Game_Event_start = Game_Event.prototype.start;
  Game_Event.prototype.start = function () {
    VisuMZ.CoreEngine.Game_Event_start.call(this);
    $event = this;
  };
  VisuMZ.CoreEngine.Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function () {
    VisuMZ.CoreEngine.Scene_Map_update.call(this);
    $gameMap.updateCurrentEvent();
  };
  Game_Map.prototype.updateCurrentEvent = function () {
    if (!this.isEventRunning() && $event !== null) {
      $event = null;
    }
  };
  $commonEvent = function (_0x380ac0) {
    if ($gameTemp) {
      $gameTemp.reserveCommonEvent(_0x380ac0);
    }
  };
}
;
$onceParallel = function (_0x4a47c7, _0x19c451) {
  if (SceneManager.isSceneMap()) {
    SceneManager._scene.playOnceParallelInterpreter(_0x4a47c7, _0x19c451);
  } else {
    if (SceneManager.isSceneBattle()) {
      if (Imported.VisuMZ_1_BattleCore) {
        SceneManager._scene.playOnceParallelInterpreter(_0x4a47c7);
      } else if ($gameTemp && $gameTemp.isPlaytest()) {
        alert("Once Parallel for Battle requires VisuMZ_1_BattleCore!");
      }
    } else if ($gameTemp && $gameTemp.isPlaytest()) {
      alert("This scene cannot utilize a Once Parallel!");
    }
  }
};
StorageManager.jsonToZip = function (_0x3c47e4) {
  return new Promise((_0x5aac81, _0x3da816) => {
    try {
      const _0x141538 = pako.deflate(_0x3c47e4, {
        'to': "string",
        'level': 0x1
      });
      if (_0x141538.length >= 0xc350) {}
      _0x5aac81(_0x141538);
    } catch (_0x134790) {
      _0x3da816(_0x134790);
    }
  });
};
TextManager.stringKeyMap = ['', '', '', 'CANCEL', '', '', "HELP", '', "BACKSPACE", "TAB", '', '', 'CLEAR', "ENTER", 'ENTER_SPECIAL', '', 'SHIFT', "CTRL", "ALT", "PAUSE", 'CAPSLOCK', "KANA", "EISU", "JUNJA", "FINAL", "HANJA", '', "ESC", 'CONVERT', "NONCONVERT", "ACCEPT", "MODECHANGE", "SPACE", "PGUP", 'PGDN', "END", "HOME", "LEFT", 'UP', 'RIGHT', "DOWN", 'SELECT', 'PRINT', "EXECUTE", "PRINTSCREEN", "INSERT", "DELETE", '', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', "COLON", 'SEMICOLON', "LESS_THAN", "EQUALS", "GREATER_THAN", "QUESTION_MARK", 'AT', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', "OS_KEY", '', 'CONTEXT_MENU', '', "SLEEP", "NUMPAD0", "NUMPAD1", 'NUMPAD2', 'NUMPAD3', "NUMPAD4", "NUMPAD5", "NUMPAD6", "NUMPAD7", "NUMPAD8", "NUMPAD9", 'MULTIPLY', "ADD", "SEPARATOR", 'SUBTRACT', "DECIMAL", 'DIVIDE', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', "F10", "F11", 'F12', "F13", "F14", "F15", "F16", "F17", "F18", "F19", "F20", "F21", "F22", "F23", "F24", '', '', '', '', '', '', '', '', "NUM_LOCK", "SCROLL_LOCK", "WIN_OEM_FJ_JISHO", "WIN_OEM_FJ_MASSHOU", 'WIN_OEM_FJ_TOUROKU', "WIN_OEM_FJ_LOYA", "WIN_OEM_FJ_ROYA", '', '', '', '', '', '', '', '', '', "CIRCUMFLEX", "EXCLAMATION", "DOUBLE_QUOTE", "HASH", "DOLLAR", "PERCENT", "AMPERSAND", "UNDERSCORE", "OPEN_PAREN", "CLOSE_PAREN", "ASTERISK", "PLUS", "PIPE", 'HYPHEN_MINUS', "OPEN_CURLY_BRACKET", "CLOSE_CURLY_BRACKET", 'TILDE', '', '', '', '', "VOLUME_MUTE", "VOLUME_DOWN", "VOLUME_UP", '', '', "SEMICOLON", "EQUALS", "COMMA", 'MINUS', "PERIOD", "SLASH", "BACK_QUOTE", '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', "OPEN_BRACKET", "BACK_SLASH", "CLOSE_BRACKET", "QUOTE", '', 'META', "ALTGR", '', "WIN_ICO_HELP", "WIN_ICO_00", '', 'WIN_ICO_CLEAR', '', '', "WIN_OEM_RESET", "WIN_OEM_JUMP", "WIN_OEM_PA1", "WIN_OEM_PA2", "WIN_OEM_PA3", 'WIN_OEM_WSCTRL', "WIN_OEM_CUSEL", "WIN_OEM_ATTN", 'WIN_OEM_FINISH', "WIN_OEM_COPY", "WIN_OEM_AUTO", 'WIN_OEM_ENLW', "WIN_OEM_BACKTAB", "ATTN", "CRSEL", "EXSEL", "EREOF", "PLAY", "ZOOM", '', "PA1", "WIN_OEM_CLEAR", ''];
TextManager.buttonAssistOk = VisuMZ.CoreEngine.Settings.ButtonAssist.OkText;
TextManager.buttonAssistCancel = VisuMZ.CoreEngine.Settings.ButtonAssist.CancelText;
TextManager.buttonAssistSwitch = VisuMZ.CoreEngine.Settings.ButtonAssist.SwitchActorText;
VisuMZ.CoreEngine.TextManager_param = TextManager.param;
TextManager.param = function (_0x12ea89) {
  return typeof _0x12ea89 === "number" ? VisuMZ.CoreEngine.TextManager_param.call(this, _0x12ea89) : this.paramName(_0x12ea89);
};
TextManager.paramName = function (_0x42f670) {
  _0x42f670 = String(_0x42f670 || '').toUpperCase();
  const _0x403c40 = VisuMZ.CoreEngine.Settings.Param;
  if (_0x42f670 === "MAXHP") {
    return $dataSystem.terms.params[0x0];
  }
  if (_0x42f670 === "MAXMP") {
    return $dataSystem.terms.params[0x1];
  }
  if (_0x42f670 === 'ATK') {
    return $dataSystem.terms.params[0x2];
  }
  if (_0x42f670 === "DEF") {
    return $dataSystem.terms.params[0x3];
  }
  if (_0x42f670 === "MAT") {
    return $dataSystem.terms.params[0x4];
  }
  if (_0x42f670 === "MDF") {
    return $dataSystem.terms.params[0x5];
  }
  if (_0x42f670 === 'AGI') {
    return $dataSystem.terms.params[0x6];
  }
  if (_0x42f670 === "LUK") {
    return $dataSystem.terms.params[0x7];
  }
  if (_0x42f670 === 'HIT') {
    return _0x403c40.XParamVocab0;
  }
  if (_0x42f670 === "EVA") {
    return _0x403c40.XParamVocab1;
  }
  if (_0x42f670 === 'CRI') {
    return _0x403c40.XParamVocab2;
  }
  if (_0x42f670 === "CEV") {
    return _0x403c40.XParamVocab3;
  }
  if (_0x42f670 === 'MEV') {
    return _0x403c40.XParamVocab4;
  }
  if (_0x42f670 === "MRF") {
    return _0x403c40.XParamVocab5;
  }
  if (_0x42f670 === "CNT") {
    return _0x403c40.XParamVocab6;
  }
  if (_0x42f670 === "HRG") {
    return _0x403c40.XParamVocab7;
  }
  if (_0x42f670 === "MRG") {
    return _0x403c40.XParamVocab8;
  }
  if (_0x42f670 === "TRG") {
    return _0x403c40.XParamVocab9;
  }
  if (_0x42f670 === "TGR") {
    return _0x403c40.SParamVocab0;
  }
  if (_0x42f670 === "GRD") {
    return _0x403c40.SParamVocab1;
  }
  if (_0x42f670 === "REC") {
    return _0x403c40.SParamVocab2;
  }
  if (_0x42f670 === 'PHA') {
    return _0x403c40.SParamVocab3;
  }
  if (_0x42f670 === "MCR") {
    return _0x403c40.SParamVocab4;
  }
  if (_0x42f670 === "TCR") {
    return _0x403c40.SParamVocab5;
  }
  if (_0x42f670 === "PDR") {
    return _0x403c40.SParamVocab6;
  }
  if (_0x42f670 === 'MDR') {
    return _0x403c40.SParamVocab7;
  }
  if (_0x42f670 === 'FDR') {
    return _0x403c40.SParamVocab8;
  }
  if (_0x42f670 === "EXR") {
    return _0x403c40.SParamVocab9;
  }
  if (VisuMZ.CoreEngine.CustomParamNames[_0x42f670]) {
    return VisuMZ.CoreEngine.CustomParamNames[_0x42f670];
  }
  return '';
};
TextManager.getInputButtonString = function (_0x3d6052) {
  const _0x32834b = Input.getLastUsedGamepadType();
  return _0x32834b === "Keyboard" ? this.getKeyboardInputButtonString(_0x3d6052) : this.getControllerInputButtonString(_0x32834b, _0x3d6052);
};
TextManager.getKeyboardInputButtonString = function (_0x5e3645) {
  let _0x4ac8bd = VisuMZ.CoreEngine.Settings.ButtonAssist.SplitEscape;
  if (!_0x4ac8bd) {
    if (_0x5e3645 === "cancel") {
      _0x5e3645 = "escape";
    }
    if (_0x5e3645 === "menu") {
      _0x5e3645 = "escape";
    }
  }
  let _0xfcf771 = [];
  for (let _0x2e3991 in Input.keyMapper) {
    _0x2e3991 = Number(_0x2e3991);
    if (_0x2e3991 >= 0x60 && _0x2e3991 <= 0x69) {
      continue;
    }
    if ([0x12, 0x20].includes(_0x2e3991)) {
      continue;
    }
    if (_0x5e3645 === Input.keyMapper[_0x2e3991]) {
      _0xfcf771.push(_0x2e3991);
    }
  }
  for (let _0x29a016 = 0x0; _0x29a016 < _0xfcf771.length; _0x29a016++) {
    _0xfcf771[_0x29a016] = TextManager.stringKeyMap[_0xfcf771[_0x29a016]];
  }
  return this.makeInputButtonString(_0xfcf771);
};
TextManager.makeInputButtonString = function (_0x19c4a2) {
  const _0x464e12 = VisuMZ.CoreEngine.Settings.ButtonAssist;
  const _0x20fdbc = _0x464e12.KeyUnlisted;
  let _0x28c6c7 = '';
  if (_0x19c4a2.includes('UP')) {
    _0x28c6c7 = 'UP';
  } else {
    if (_0x19c4a2.includes('DOWN')) {
      _0x28c6c7 = 'DOWN';
    } else {
      if (_0x19c4a2.includes('LEFT')) {
        _0x28c6c7 = 'LEFT';
      } else if (_0x19c4a2.includes("RIGHT")) {
        _0x28c6c7 = "RIGHT";
      } else {
        _0x28c6c7 = _0x19c4a2.pop();
      }
    }
  }
  const _0x17a58b = 'Key%1'.format(_0x28c6c7);
  return _0x464e12[_0x17a58b] ? _0x464e12[_0x17a58b] : _0x20fdbc.format(_0x28c6c7);
};
TextManager.getInputMultiButtonStrings = function (_0x356351, _0x5a6e5d) {
  const _0x298d66 = VisuMZ.CoreEngine.Settings.ButtonAssist;
  const _0x42a85c = _0x298d66.MultiKeyFmt;
  const _0x2405a1 = this.getInputButtonString(_0x356351);
  const _0x517cc4 = this.getInputButtonString(_0x5a6e5d);
  return _0x42a85c.format(_0x2405a1, _0x517cc4);
};
TextManager.getControllerInputButtonString = function (_0x4d143a, _0x2dfb03) {
  const _0x40137a = _0x4d143a.toLowerCase().trim();
  const _0x4b3d8c = VisuMZ.CoreEngine.ControllerButtons[_0x40137a];
  if (!_0x4b3d8c) {
    return this.getControllerInputButtonMatch(_0x4d143a, _0x2dfb03);
  }
  return _0x4b3d8c[_0x2dfb03] || this.getKeyboardInputButtonString(_0x4d143a, _0x2dfb03);
};
TextManager.getControllerInputButtonMatch = function (_0x5788ca, _0x29447c) {
  const _0x54a09b = _0x5788ca.toLowerCase().trim();
  for (const _0x4834ab in VisuMZ.CoreEngine.ControllerMatches) {
    if (_0x54a09b.includes(_0x4834ab)) {
      const _0x237f27 = VisuMZ.CoreEngine.ControllerMatches[_0x4834ab];
      const _0x38c697 = VisuMZ.CoreEngine.ControllerButtons[_0x237f27];
      return _0x38c697[_0x29447c] || this.getKeyboardInputButtonString(_0x29447c);
    }
  }
  return this.getKeyboardInputButtonString(_0x29447c);
};
VisuMZ.CoreEngine.ColorManager_loadWindowskin = ColorManager.loadWindowskin;
ColorManager.loadWindowskin = function () {
  VisuMZ.CoreEngine.ColorManager_loadWindowskin.call(this);
  this._colorCache = this._colorCache || {};
};
ColorManager.getColorDataFromPluginParameters = function (_0x33acf8, _0x507aeb) {
  _0x507aeb = String(_0x507aeb);
  this._colorCache = this._colorCache || {};
  if (_0x507aeb.match(/#(.*)/i)) {
    this._colorCache[_0x33acf8] = "#%1".format(String(RegExp.$1));
  } else {
    this._colorCache[_0x33acf8] = this.textColor(Number(_0x507aeb));
  }
  return this._colorCache[_0x33acf8];
};
ColorManager.getColor = function (_0x49a7c1) {
  _0x49a7c1 = String(_0x49a7c1);
  return _0x49a7c1.match(/#(.*)/i) ? "#%1".format(String(RegExp.$1)) : this.textColor(Number(_0x49a7c1));
};
ColorManager.clearCachedKeys = function () {
  this._colorCache = {};
};
ColorManager.normalColor = function () {
  this._colorCache = this._colorCache || {};
  if (this._colorCache._stored_normalColor) {
    return this._colorCache._stored_normalColor;
  }
  const _0xd3415d = VisuMZ.CoreEngine.Settings.Color.ColorNormal;
  return this.getColorDataFromPluginParameters('_stored_normalColor', _0xd3415d);
};
ColorManager.systemColor = function () {
  this._colorCache = this._colorCache || {};
  if (this._colorCache._stored_systemColor) {
    return this._colorCache._stored_systemColor;
  }
  const _0x30ef51 = VisuMZ.CoreEngine.Settings.Color.ColorSystem;
  return this.getColorDataFromPluginParameters("_stored_systemColor", _0x30ef51);
};
ColorManager.crisisColor = function () {
  this._colorCache = this._colorCache || {};
  if (this._colorCache._stored_crisisColor) {
    return this._colorCache._stored_crisisColor;
  }
  const _0x4852b0 = VisuMZ.CoreEngine.Settings.Color.ColorCrisis;
  return this.getColorDataFromPluginParameters("_stored_crisisColor", _0x4852b0);
};
ColorManager.deathColor = function () {
  this._colorCache = this._colorCache || {};
  if (this._colorCache._stored_deathColor) {
    return this._colorCache._stored_deathColor;
  }
  const _0x382eb1 = VisuMZ.CoreEngine.Settings.Color.ColorDeath;
  return this.getColorDataFromPluginParameters("_stored_deathColor", _0x382eb1);
};
ColorManager.gaugeBackColor = function () {
  this._colorCache = this._colorCache || {};
  if (this._colorCache._stored_gaugeBackColor) {
    return this._colorCache._stored_gaugeBackColor;
  }
  const _0x4c266c = VisuMZ.CoreEngine.Settings.Color.ColorGaugeBack;
  return this.getColorDataFromPluginParameters("_stored_gaugeBackColor", _0x4c266c);
};
ColorManager.hpGaugeColor1 = function () {
  this._colorCache = this._colorCache || {};
  if (this._colorCache._stored_hpGaugeColor1) {
    return this._colorCache._stored_hpGaugeColor1;
  }
  const _0x425417 = VisuMZ.CoreEngine.Settings.Color.ColorHPGauge1;
  return this.getColorDataFromPluginParameters('_stored_hpGaugeColor1', _0x425417);
};
ColorManager.hpGaugeColor2 = function () {
  this._colorCache = this._colorCache || {};
  if (this._colorCache._stored_hpGaugeColor2) {
    return this._colorCache._stored_hpGaugeColor2;
  }
  const _0x76710c = VisuMZ.CoreEngine.Settings.Color.ColorHPGauge2;
  return this.getColorDataFromPluginParameters("_stored_hpGaugeColor2", _0x76710c);
};
ColorManager.mpGaugeColor1 = function () {
  this._colorCache = this._colorCache || {};
  if (this._colorCache._stored_mpGaugeColor1) {
    return this._colorCache._stored_mpGaugeColor1;
  }
  const _0x285caa = VisuMZ.CoreEngine.Settings.Color.ColorMPGauge1;
  return this.getColorDataFromPluginParameters("_stored_mpGaugeColor1", _0x285caa);
};
ColorManager.mpGaugeColor2 = function () {
  this._colorCache = this._colorCache || {};
  if (this._colorCache._stored_mpGaugeColor2) {
    return this._colorCache._stored_mpGaugeColor2;
  }
  const _0x2ae521 = VisuMZ.CoreEngine.Settings.Color.ColorMPGauge2;
  return this.getColorDataFromPluginParameters("_stored_mpGaugeColor2", _0x2ae521);
};
ColorManager.mpCostColor = function () {
  this._colorCache = this._colorCache || {};
  if (this._colorCache._stored_mpCostColor) {
    return this._colorCache._stored_mpCostColor;
  }
  const _0x1a852e = VisuMZ.CoreEngine.Settings.Color.ColorMPCost;
  return this.getColorDataFromPluginParameters("_stored_mpCostColor", _0x1a852e);
};
ColorManager.powerUpColor = function () {
  this._colorCache = this._colorCache || {};
  if (this._colorCache._stored_powerUpColor) {
    return this._colorCache._stored_powerUpColor;
  }
  const _0x5997ec = VisuMZ.CoreEngine.Settings.Color.ColorPowerUp;
  return this.getColorDataFromPluginParameters('_stored_powerUpColor', _0x5997ec);
};
ColorManager.powerDownColor = function () {
  this._colorCache = this._colorCache || {};
  if (this._colorCache._stored_powerDownColor) {
    return this._colorCache._stored_powerDownColor;
  }
  const _0x42ade0 = VisuMZ.CoreEngine.Settings.Color.ColorPowerDown;
  return this.getColorDataFromPluginParameters("_stored_powerDownColor", _0x42ade0);
};
ColorManager.ctGaugeColor1 = function () {
  this._colorCache = this._colorCache || {};
  if (this._colorCache._stored_ctGaugeColor1) {
    return this._colorCache._stored_ctGaugeColor1;
  }
  const _0x413128 = VisuMZ.CoreEngine.Settings.Color.ColorCTGauge1;
  return this.getColorDataFromPluginParameters("_stored_ctGaugeColor1", _0x413128);
};
ColorManager.ctGaugeColor2 = function () {
  this._colorCache = this._colorCache || {};
  if (this._colorCache._stored_ctGaugeColor2) {
    return this._colorCache._stored_ctGaugeColor2;
  }
  const _0x5b8dfa = VisuMZ.CoreEngine.Settings.Color.ColorCTGauge2;
  return this.getColorDataFromPluginParameters("_stored_ctGaugeColor2", _0x5b8dfa);
};
ColorManager.tpGaugeColor1 = function () {
  this._colorCache = this._colorCache || {};
  if (this._colorCache._stored_tpGaugeColor1) {
    return this._colorCache._stored_tpGaugeColor1;
  }
  const _0x18e9c6 = VisuMZ.CoreEngine.Settings.Color.ColorTPGauge1;
  return this.getColorDataFromPluginParameters('_stored_tpGaugeColor1', _0x18e9c6);
};
ColorManager.tpGaugeColor2 = function () {
  this._colorCache = this._colorCache || {};
  if (this._colorCache._stored_tpGaugeColor2) {
    return this._colorCache._stored_tpGaugeColor2;
  }
  const _0x533eb3 = VisuMZ.CoreEngine.Settings.Color.ColorTPGauge2;
  return this.getColorDataFromPluginParameters("_stored_tpGaugeColor2", _0x533eb3);
};
ColorManager.tpCostColor = function () {
  this._colorCache = this._colorCache || {};
  if (this._colorCache._stored_tpCostColor) {
    return this._colorCache._stored_tpCostColor;
  }
  const _0x5a54ff = VisuMZ.CoreEngine.Settings.Color.ColorTPCost;
  return this.getColorDataFromPluginParameters("_stored_tpCostColor", _0x5a54ff);
};
ColorManager.pendingColor = function () {
  this._colorCache = this._colorCache || {};
  if (this._colorCache._stored_pendingColor) {
    return this._colorCache._stored_pendingColor;
  }
  const _0x772fd9 = VisuMZ.CoreEngine.Settings.Color.ColorTPCost;
  return this.getColorDataFromPluginParameters("_stored_pendingColor", _0x772fd9);
};
ColorManager.expGaugeColor1 = function () {
  this._colorCache = this._colorCache || {};
  if (this._colorCache._stored_expGaugeColor1) {
    return this._colorCache._stored_expGaugeColor1;
  }
  const _0x231b04 = VisuMZ.CoreEngine.Settings.Color.ColorExpGauge1;
  return this.getColorDataFromPluginParameters('_stored_expGaugeColor1', _0x231b04);
};
ColorManager.expGaugeColor2 = function () {
  this._colorCache = this._colorCache || {};
  if (this._colorCache._stored_expGaugeColor2) {
    return this._colorCache._stored_expGaugeColor2;
  }
  const _0x1d144f = VisuMZ.CoreEngine.Settings.Color.ColorExpGauge2;
  return this.getColorDataFromPluginParameters("_stored_expGaugeColor2", _0x1d144f);
};
ColorManager.maxLvGaugeColor1 = function () {
  this._colorCache = this._colorCache || {};
  if (this._colorCache._stored_maxLvGaugeColor1) {
    return this._colorCache._stored_maxLvGaugeColor1;
  }
  const _0x3e6f4c = VisuMZ.CoreEngine.Settings.Color.ColorMaxLvGauge1;
  return this.getColorDataFromPluginParameters("_stored_maxLvGaugeColor1", _0x3e6f4c);
};
ColorManager.maxLvGaugeColor2 = function () {
  this._colorCache = this._colorCache || {};
  if (this._colorCache._stored_maxLvGaugeColor2) {
    return this._colorCache._stored_maxLvGaugeColor2;
  }
  const _0x1aea18 = VisuMZ.CoreEngine.Settings.Color.ColorMaxLvGauge2;
  return this.getColorDataFromPluginParameters("_stored_maxLvGaugeColor2", _0x1aea18);
};
ColorManager.hpColor = function (_0x10162d) {
  return VisuMZ.CoreEngine.Settings.Color.ActorHPColor.call(this, _0x10162d);
};
ColorManager.mpColor = function (_0x5aa4d0) {
  return VisuMZ.CoreEngine.Settings.Color.ActorMPColor.call(this, _0x5aa4d0);
};
ColorManager.tpColor = function (_0xa0334a) {
  return VisuMZ.CoreEngine.Settings.Color.ActorTPColor.call(this, _0xa0334a);
};
ColorManager.paramchangeTextColor = function (_0x1ddee8) {
  return VisuMZ.CoreEngine.Settings.Color.ParamChange.call(this, _0x1ddee8);
};
ColorManager.damageColor = function (_0x4d6397) {
  return VisuMZ.CoreEngine.Settings.Color.DamageColor.call(this, _0x4d6397);
};
ColorManager.outlineColor = function () {
  return VisuMZ.CoreEngine.Settings.Color.OutlineColor;
};
ColorManager.outlineColorDmg = function () {
  return VisuMZ.CoreEngine.Settings.Color.OutlineColorDmg || "rgba(0, 0, 0, 0.7)";
};
ColorManager.outlineColorGauge = function () {
  return VisuMZ.CoreEngine.Settings.Color.OutlineColorGauge || "rgba(0, 0, 0, 1.0)";
};
ColorManager.dimColor1 = function () {
  return VisuMZ.CoreEngine.Settings.Color.DimColor1;
};
ColorManager.dimColor2 = function () {
  return VisuMZ.CoreEngine.Settings.Color.DimColor2;
};
ColorManager.itemBackColor1 = function () {
  return VisuMZ.CoreEngine.Settings.Color.ItemBackColor1;
};
ColorManager.itemBackColor2 = function () {
  return VisuMZ.CoreEngine.Settings.Color.ItemBackColor2;
};
SceneManager._storedStack = [];
SceneManager.isSceneBattle = function () {
  return this._scene && this._scene.constructor === Scene_Battle;
};
SceneManager.isSceneMap = function () {
  return this._scene && this._scene.constructor === Scene_Map;
};
SceneManager.isInstanceOfSceneMap = function () {
  return this._scene && this._scene instanceof Scene_Map;
};
VisuMZ.CoreEngine.SceneManager_initialize = SceneManager.initialize;
SceneManager.initialize = function () {
  VisuMZ.CoreEngine.SceneManager_initialize.call(this);
  this.initVisuMZCoreEngine();
};
VisuMZ.CoreEngine.SceneManager_onKeyDown = SceneManager.onKeyDown;
SceneManager.onKeyDown = function (_0x1587ad) {
  if ($gameTemp) {
    this.onKeyDownKeysF6F7(_0x1587ad);
  }
  VisuMZ.CoreEngine.SceneManager_onKeyDown.call(this, _0x1587ad);
};
SceneManager.onKeyDownKeysF6F7 = function (_0x11743e) {
  if (!_0x11743e.ctrlKey && !_0x11743e.altKey) {
    switch (_0x11743e.keyCode) {
      case 0x52:
        this.playTestShiftR();
        break;
      case 0x54:
        this.playTestShiftT();
        break;
      case 0x75:
        this.playTestF6();
        break;
      case 0x76:
        if (Input.isPressed("shift") || Input.isPressed('ctrl')) {
          return;
        }
        this.playTestF7();
        break;
    }
  } else {
    if (_0x11743e.ctrlKey) {
      let _0x46c987 = _0x11743e.keyCode;
      if (_0x46c987 >= 0x31 && _0x46c987 <= 0x39) {
        const _0x297a50 = _0x46c987 - 0x30;
        return SceneManager.playtestQuickLoad(_0x297a50);
      } else {
        if (_0x46c987 >= 0x61 && _0x46c987 <= 0x69) {
          const _0x12ad15 = _0x46c987 - 0x60;
          return SceneManager.playtestQuickLoad(_0x12ad15);
        }
      }
    }
  }
};
SceneManager.playTestF6 = function () {
  if ($gameTemp.isPlaytest() && VisuMZ.CoreEngine.Settings.QoL.F6key) {
    if (ConfigManager.seVolume !== 0x0) {
      ConfigManager.bgmVolume = 0x0;
      ConfigManager.bgsVolume = 0x0;
      ConfigManager.meVolume = 0x0;
      ConfigManager.seVolume = 0x0;
    } else {
      ConfigManager.bgmVolume = 0x64;
      ConfigManager.bgsVolume = 0x64;
      ConfigManager.meVolume = 0x64;
      ConfigManager.seVolume = 0x64;
    }
    ConfigManager.save();
    if (this._scene.constructor === Scene_Options) {
      if (this._scene._optionsWindow) {
        this._scene._optionsWindow.refresh();
      }
      if (this._scene._listWindow) {
        this._scene._listWindow.refresh();
      }
    }
  }
};
SceneManager.playTestF7 = function () {
  if ($gameTemp.isPlaytest() && VisuMZ.CoreEngine.Settings.QoL.F7key) {
    $gameTemp._playTestFastMode = !$gameTemp._playTestFastMode;
  }
};
SceneManager.playTestShiftR = function () {
  if (!VisuMZ.CoreEngine.Settings.QoL.ShiftR_Toggle) {
    return;
  }
  if (!$gameTemp.isPlaytest()) {
    return;
  }
  if (!SceneManager.isSceneBattle()) {
    return;
  }
  if (!Input.isPressed('shift')) {
    return;
  }
  for (const _0xf834e3 of $gameParty.members()) {
    if (!_0xf834e3) {
      continue;
    }
    _0xf834e3.recoverAll();
  }
};
SceneManager.playTestShiftT = function () {
  if (!VisuMZ.CoreEngine.Settings.QoL.ShiftT_Toggle) {
    return;
  }
  if (!$gameTemp.isPlaytest()) {
    return;
  }
  if (!SceneManager.isSceneBattle()) {
    return;
  }
  if (!Input.isPressed("shift")) {
    return;
  }
  for (const _0x3f67a8 of $gameParty.members()) {
    if (!_0x3f67a8) {
      continue;
    }
    _0x3f67a8.gainSilentTp(_0x3f67a8.maxTp());
  }
};
SceneManager.playtestQuickLoad = function (_0x14fb27) {
  if (!$gameTemp.isPlaytest()) {
    return;
  }
  if (!DataManager.savefileInfo(_0x14fb27)) {
    return;
  }
  if (!(VisuMZ.CoreEngine.Settings.QoL.CtrlQuickLoad ?? true)) {
    return;
  }
  this.push(Scene_QuickLoad);
  this.prepareNextScene(_0x14fb27);
};
SceneManager.initVisuMZCoreEngine = function () {
  this._sideButtonLayout = false;
  this._hideButtons = !VisuMZ.CoreEngine.Settings.UI.ShowButtons;
};
SceneManager.setSideButtonLayout = function (_0x2982f3) {
  if (VisuMZ.CoreEngine.Settings.UI.SideButtons) {
    this._sideButtonLayout = _0x2982f3;
  }
};
SceneManager.isSideButtonLayout = function () {
  return this._sideButtonLayout;
};
SceneManager.areButtonsHidden = function () {
  return this._hideButtons;
};
SceneManager.areButtonsOutsideMainUI = function () {
  return this.areButtonsHidden() || this.isSideButtonLayout();
};
VisuMZ.CoreEngine.SceneManager_isGameActive = SceneManager.isGameActive;
SceneManager.isGameActive = function () {
  return VisuMZ.CoreEngine.Settings.QoL.RequireFocus ? VisuMZ.CoreEngine.SceneManager_isGameActive.call(this) : true;
};
SceneManager.catchException = function (_0x4d0e88) {
  if (_0x4d0e88 instanceof Error) {
    this.catchNormalError(_0x4d0e88);
  } else if (_0x4d0e88 instanceof Array && _0x4d0e88[0x0] === "LoadError") {
    this.catchLoadError(_0x4d0e88);
  } else {
    this.catchUnknownError(_0x4d0e88);
  }
  this.stop();
};
VisuMZ.CoreEngine.BattleManager_processEscape = BattleManager.processEscape;
BattleManager.processEscape = function () {
  return VisuMZ.CoreEngine.Settings.QoL.EscapeAlways ? this.processAlwaysEscape() : VisuMZ.CoreEngine.BattleManager_processEscape.call(this);
};
BattleManager.processAlwaysEscape = function () {
  $gameParty.performEscape();
  SoundManager.playEscape();
  this.onEscapeSuccess();
  return true;
};
BattleManager.isTpb = function () {
  return $gameSystem.getBattleSystem() >= 0x1;
};
BattleManager.isActiveTpb = function () {
  return $gameSystem.getBattleSystem() === 0x1;
};
VisuMZ.CoreEngine.Game_Temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function () {
  VisuMZ.CoreEngine.Game_Temp_initialize.call(this);
  this.forceOutOfPlaytest();
  this.createFauxAnimationQueue();
  this.createPointAnimationQueue();
};
Game_Temp.prototype.forceOutOfPlaytest = function () {
  if (VisuMZ.CoreEngine.Settings.QoL.ForceNoPlayTest) {
    this._isPlaytest = false;
  }
};
Game_Temp.prototype.setLastPluginCommandInterpreter = function (_0x35e941) {
  this._lastPluginCommandInterpreter = _0x35e941;
};
Game_Temp.prototype.getLastPluginCommandInterpreter = function () {
  return this._lastPluginCommandInterpreter;
};
Game_Temp.prototype.clearForcedGameTroopSettingsCoreEngine = function () {
  this._forcedTroopView = undefined;
  this._forcedBattleSys = undefined;
  this._forcedBattleGridSystem = undefined;
};
Game_Temp.prototype.applyForcedGameTroopSettingsCoreEngine = function (_0x4f260c) {
  if ($gameMap && $dataMap && $dataMap.note) {
    this.parseForcedGameTroopSettingsCoreEngine($dataMap.note);
  }
  const _0x32965b = $dataTroops[_0x4f260c];
  if (_0x32965b) {
    let _0x44147f = DataManager.createTroopNote(_0x32965b.id);
    this.parseForcedGameTroopSettingsCoreEngine(_0x44147f);
  }
};
Game_Temp.prototype.parseForcedGameTroopSettingsCoreEngine = function (_0x2139f2) {
  if (!_0x2139f2) {
    return;
  }
  if (_0x2139f2.match(/<(?:FRONTVIEW|FRONT VIEW|FV)>/i)) {
    this._forcedTroopView = 'FV';
  } else {
    if (_0x2139f2.match(/<(?:SIDEVIEW|SIDE VIEW|SV)>/i)) {
      this._forcedTroopView = 'SV';
    } else {
      if (_0x2139f2.match(/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)) {
        const _0x50e5b2 = String(RegExp.$1);
        if (_0x50e5b2.match(/(?:FRONTVIEW|FRONT VIEW|FV)/i)) {
          this._forcedTroopView = 'FV';
        } else if (_0x50e5b2.match(/(?:SIDEVIEW|SIDE VIEW|SV)/i)) {
          this._forcedTroopView = 'SV';
        }
      }
    }
  }
  if (_0x2139f2.match(/<(?:DTB)>/i)) {
    this._forcedBattleSys = 0x0;
  } else {
    if (_0x2139f2.match(/<(?:TPB|ATB)[ ]ACTIVE>/i)) {
      this._forcedBattleSys = 0x1;
    } else {
      if (_0x2139f2.match(/<(?:TPB|ATB)[ ]WAIT>/i)) {
        this._forcedBattleSys = 0x2;
      } else {
        if (_0x2139f2.match(/<(?:TPB|ATB)>/i)) {
          this._forcedBattleSys = 0x2;
        } else {
          if (_0x2139f2.match(/<(?:CTB)>/i)) {
            if (Imported.VisuMZ_2_BattleSystemCTB) {
              this._forcedBattleSys = "CTB";
            }
          } else {
            if (_0x2139f2.match(/<(?:STB)>/i)) {
              if (Imported.VisuMZ_2_BattleSystemSTB) {
                this._forcedBattleSys = "STB";
              }
            } else {
              if (_0x2139f2.match(/<(?:BTB)>/i)) {
                if (Imported.VisuMZ_2_BattleSystemBTB) {
                  this._forcedBattleSys = "BTB";
                }
              } else {
                if (_0x2139f2.match(/<(?:FTB)>/i)) {
                  if (Imported.VisuMZ_2_BattleSystemFTB) {
                    this._forcedBattleSys = 'FTB';
                  }
                } else {
                  if (_0x2139f2.match(/<(?:OTB)>/i)) {
                    if (Imported.VisuMZ_2_BattleSystemOTB) {
                      this._forcedBattleSys = 'OTB';
                    }
                  } else {
                    if (_0x2139f2.match(/<(?:ETB)>/i)) {
                      if (Imported.VisuMZ_2_BattleSystemETB) {
                        this._forcedBattleSys = 'ETB';
                      }
                    } else {
                      if (_0x2139f2.match(/<(?:PTB)>/i)) {
                        if (Imported.VisuMZ_2_BattleSystemPTB) {
                          this._forcedBattleSys = "PTB";
                        }
                      } else {
                        if (_0x2139f2.match(/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)) {
                          const _0x4db314 = String(RegExp.$1);
                          if (_0x4db314.match(/DTB/i)) {
                            this._forcedBattleSys = 0x0;
                          } else {
                            if (_0x4db314.match(/(?:TPB|ATB)[ ]ACTIVE/i)) {
                              this._forcedBattleSys = 0x1;
                            } else {
                              if (_0x4db314.match(/(?:TPB|ATB)[ ]WAIT/i)) {
                                this._forcedBattleSys = 0x2;
                              } else {
                                if (_0x4db314.match(/CTB/i)) {
                                  if (Imported.VisuMZ_2_BattleSystemCTB) {
                                    this._forcedBattleSys = "CTB";
                                  }
                                } else {
                                  if (_0x4db314.match(/STB/i)) {
                                    if (Imported.VisuMZ_2_BattleSystemSTB) {
                                      this._forcedBattleSys = "STB";
                                    }
                                  } else {
                                    if (_0x4db314.match(/BTB/i)) {
                                      if (Imported.VisuMZ_2_BattleSystemBTB) {
                                        this._forcedBattleSys = 'BTB';
                                      }
                                    } else {
                                      if (_0x4db314.match(/FTB/i)) {
                                        if (Imported.VisuMZ_2_BattleSystemFTB) {
                                          this._forcedBattleSys = "FTB";
                                        }
                                      } else {
                                        if (_0x4db314.match(/OTB/i)) {
                                          if (Imported.VisuMZ_2_BattleSystemOTB) {
                                            this._forcedBattleSys = 'OTB';
                                          }
                                        } else {
                                          if (_0x4db314.match(/ETB/i)) {
                                            if (Imported.VisuMZ_2_BattleSystemETB) {
                                              this._forcedBattleSys = "ETB";
                                            }
                                          } else if (_0x4db314.match(/PTB/i)) {
                                            if (Imported.VisuMZ_2_BattleSystemPTB) {
                                              this._forcedBattleSys = "PTB";
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  if (_0x2139f2.match(/<(?:|BATTLE )GRID>/i)) {
    this._forcedBattleGridSystem = true;
  } else if (_0x2139f2.match(/<NO (?:|BATTLE )GRID>/i)) {
    this._forcedBattleGridSystem = false;
  }
};
Game_Temp.prototype.createFauxAnimationQueue = function () {
  this._fauxAnimationQueue = [];
};
Game_Temp.prototype.requestFauxAnimation = function (_0x269059, _0x44a115, _0x304e7c, _0x3fa1ff) {
  if (!this.showFauxAnimations()) {
    return;
  }
  _0x304e7c = _0x304e7c || false;
  _0x3fa1ff = _0x3fa1ff || false;
  if ($dataAnimations[_0x44a115]) {
    const _0x316b1f = {
      'targets': _0x269059,
      'animationId': _0x44a115,
      'mirror': _0x304e7c,
      'mute': _0x3fa1ff
    };
    this._fauxAnimationQueue.push(_0x316b1f);
    for (const _0x2a62ac of _0x269059) {
      if (_0x2a62ac.startAnimation) {
        _0x2a62ac.startAnimation();
      }
    }
  }
};
Game_Temp.prototype.showFauxAnimations = function () {
  return true;
};
Game_Temp.prototype.retrieveFauxAnimation = function () {
  return this._fauxAnimationQueue.shift();
};
Game_Temp.prototype.createPointAnimationQueue = function () {
  this._pointAnimationQueue = [];
};
Game_Temp.prototype.requestPointAnimation = function (_0x348dd4, _0x546edd, _0x47da05, _0x27f9fb, _0x6357a2) {
  if (!this.showPointAnimations()) {
    return;
  }
  _0x27f9fb = _0x27f9fb || false;
  _0x6357a2 = _0x6357a2 || false;
  if ($dataAnimations[_0x47da05]) {
    const _0x11d48f = {
      'x': _0x348dd4,
      'y': _0x546edd,
      'animationId': _0x47da05,
      'mirror': _0x27f9fb,
      'mute': _0x6357a2
    };
    this._pointAnimationQueue.push(_0x11d48f);
  }
};
Game_Temp.prototype.showPointAnimations = function () {
  return true;
};
Game_Temp.prototype.retrievePointAnimation = function () {
  return this._pointAnimationQueue.shift();
};
VisuMZ.CoreEngine.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function () {
  VisuMZ.CoreEngine.Game_System_initialize.call(this);
  this.initCoreEngine();
};
Game_System.prototype.initCoreEngine = function () {
  this._CoreEngineSettings = {
    'SideView': $dataSystem.optSideView,
    'BattleSystem': this.initialBattleSystem(),
    'FontSize': $dataSystem.advanced.fontSize,
    'Padding': 0xc
  };
};
Game_System.prototype.isSideView = function () {
  if ($gameTemp._forcedTroopView === 'SV') {
    return true;
  } else {
    if ($gameTemp._forcedTroopView === 'FV') {
      return false;
    }
  }
  if (this._CoreEngineSettings === undefined) {
    this.initCoreEngine();
  }
  if (this._CoreEngineSettings.SideView === undefined) {
    this.initCoreEngine();
  }
  return this._CoreEngineSettings.SideView;
};
Game_System.prototype.setSideView = function (_0x3a4678) {
  if (this._CoreEngineSettings === undefined) {
    this.initCoreEngine();
  }
  if (this._CoreEngineSettings.SideView === undefined) {
    this.initCoreEngine();
  }
  this._CoreEngineSettings.SideView = _0x3a4678;
};
Game_System.prototype.resetBattleSystem = function () {
  if (this._CoreEngineSettings === undefined) {
    this.initCoreEngine();
  }
  this._CoreEngineSettings.BattleSystem = this.initialBattleSystem();
};
Game_System.prototype.initialBattleSystem = function () {
  const _0x3bdec8 = (VisuMZ.CoreEngine.Settings.BattleSystem || 'DATABASE').toUpperCase().trim();
  return VisuMZ.CoreEngine.CreateBattleSystemID(_0x3bdec8);
};
Game_System.prototype.getBattleSystem = function () {
  if ($gameTemp._forcedBattleSys !== undefined) {
    return $gameTemp._forcedBattleSys;
  }
  if (this._CoreEngineSettings === undefined) {
    this.initCoreEngine();
  }
  if (this._CoreEngineSettings.BattleSystem === undefined) {
    this.resetBattleSystem();
  }
  return this._CoreEngineSettings.BattleSystem;
};
Game_System.prototype.setBattleSystem = function (_0x11314b) {
  if (this._CoreEngineSettings === undefined) {
    this.initCoreEngine();
  }
  if (this._CoreEngineSettings.BattleSystem === undefined) {
    this.resetBattleSystem();
  }
  this._CoreEngineSettings.BattleSystem = _0x11314b;
};
Game_System.prototype.mainFontSize = function () {
  if (this._CoreEngineSettings === undefined) {
    this.initCoreEngine();
  }
  if (this._CoreEngineSettings.FontSize === undefined) {
    this.initCoreEngine();
  }
  return this._CoreEngineSettings.FontSize;
};
Game_System.prototype.setMainFontSize = function (_0x2ecb89) {
  if (this._CoreEngineSettings === undefined) {
    this.initCoreEngine();
  }
  if (this._CoreEngineSettings.TimeProgress === undefined) {
    this.initCoreEngine();
  }
  this._CoreEngineSettings.FontSize = _0x2ecb89;
};
Game_System.prototype.windowPadding = function () {
  if (this._CoreEngineSettings === undefined) {
    this.initCoreEngine();
  }
  if (this._CoreEngineSettings.Padding === undefined) {
    this.initCoreEngine();
  }
  return this._CoreEngineSettings.Padding;
};
Game_System.prototype.setWindowPadding = function (_0x36749f) {
  if (this._CoreEngineSettings === undefined) {
    this.initCoreEngine();
  }
  if (this._CoreEngineSettings.TimeProgress === undefined) {
    this.initCoreEngine();
  }
  this._CoreEngineSettings.Padding = _0x36749f;
};
VisuMZ.CoreEngine.Game_Screen_initialize = Game_Screen.prototype.initialize;
Game_Screen.prototype.initialize = function () {
  VisuMZ.CoreEngine.Game_Screen_initialize.call(this);
  this.initCoreEngineScreenShake();
};
Game_Screen.prototype.initCoreEngineScreenShake = function () {
  const _0x28e12f = VisuMZ.CoreEngine.Settings.ScreenShake;
  this._coreEngineShakeStyle = _0x28e12f?.['DefaultStyle'] || "random";
};
Game_Screen.prototype.getCoreEngineScreenShakeStyle = function () {
  if (this._coreEngineShakeStyle === undefined) {
    this.initCoreEngineScreenShake();
  }
  return this._coreEngineShakeStyle;
};
Game_Screen.prototype.setCoreEngineScreenShakeStyle = function (_0x41de21) {
  if (this._coreEngineShakeStyle === undefined) {
    this.initCoreEngineScreenShake();
  }
  this._coreEngineShakeStyle = _0x41de21.toLowerCase().trim();
};
Game_Picture.prototype.isMapScrollLinked = function () {
  if ($gameParty.inBattle()) {
    return false;
  }
  return this.onlyfilename() && this.onlyfilename().charAt(0x0) === '!';
};
Game_Picture.prototype.onlyfilename = function () {
  return this._name.split('/').pop();
};
VisuMZ.CoreEngine.Game_Picture_x = Game_Picture.prototype.x;
Game_Picture.prototype.x = function () {
  return this.isMapScrollLinked() ? this.xScrollLinkedOffset() : VisuMZ.CoreEngine.Game_Picture_x.call(this);
};
Game_Picture.prototype.xScrollLinkedOffset = function () {
  const _0x2528b3 = $gameMap.displayX() * $gameMap.tileWidth();
  return (this._x - _0x2528b3) * $gameScreen.zoomScale();
};
VisuMZ.CoreEngine.Game_Picture_y = Game_Picture.prototype.y;
Game_Picture.prototype.y = function () {
  return this.isMapScrollLinked() ? this.yScrollLinkedOffset() : VisuMZ.CoreEngine.Game_Picture_y.call(this);
};
Game_Picture.prototype.yScrollLinkedOffset = function () {
  const _0x257f7d = $gameMap.displayY() * $gameMap.tileHeight();
  return (this._y - _0x257f7d) * $gameScreen.zoomScale();
};
VisuMZ.CoreEngine.Game_Picture_scaleX = Game_Picture.prototype.scaleX;
Game_Picture.prototype.scaleX = function () {
  let _0xb6704e = VisuMZ.CoreEngine.Game_Picture_scaleX.call(this);
  if (this.isMapScrollLinked()) {
    _0xb6704e *= $gameScreen.zoomScale();
  }
  return _0xb6704e;
};
VisuMZ.CoreEngine.Game_Picture_scaleY = Game_Picture.prototype.scaleY;
Game_Picture.prototype.scaleY = function () {
  let _0x50496a = VisuMZ.CoreEngine.Game_Picture_scaleY.call(this);
  if (this.isMapScrollLinked()) {
    _0x50496a *= $gameScreen.zoomScale();
  }
  return _0x50496a;
};
Game_Picture.prototype.setEasingType = function (_0x593783) {
  this._coreEasingType = _0x593783;
};
VisuMZ.CoreEngine.Game_Picture_calcEasing = Game_Picture.prototype.calcEasing;
Game_Picture.prototype.calcEasing = function (_0x553bbb) {
  this._coreEasingType = this._coreEasingType || 0x0;
  return [0x0, 0x1, 0x2, 0x3].includes(this._coreEasingType) ? VisuMZ.CoreEngine.Game_Picture_calcEasing.call(this, _0x553bbb) : VisuMZ.ApplyEasing(_0x553bbb, this._coreEasingType);
};
VisuMZ.CoreEngine.Game_Picture_initRotation = Game_Picture.prototype.initRotation;
Game_Picture.prototype.initRotation = function () {
  VisuMZ.CoreEngine.Game_Picture_initRotation.call(this);
  this.initRotationCoreEngine();
};
Game_Picture.prototype.initRotationCoreEngine = function () {
  this._anglePlus = {
    'current': 0x0,
    'target': 0x0,
    'duration': 0x0,
    'wholeDuration': 0x0,
    'easingType': "Linear"
  };
};
VisuMZ.CoreEngine.Game_Picture_angle = Game_Picture.prototype.angle;
Game_Picture.prototype.angle = function () {
  let _0x3104a5 = VisuMZ.CoreEngine.Game_Picture_angle.call(this);
  _0x3104a5 += this.anglePlus();
  return _0x3104a5;
};
Game_Picture.prototype.anglePlus = function () {
  if (this._anglePlus === undefined) {
    this.initRotationCoreEngine();
  }
  return this._anglePlus.current || 0x0;
};
Game_Picture.prototype.setAnglePlusData = function (_0x25bad0, _0x2964f4, _0x306205) {
  if (this._anglePlus === undefined) {
    this.initRotationCoreEngine();
  }
  this._anglePlus.target = _0x25bad0 || 0x0;
  this._anglePlus.duration = _0x2964f4 || 0x0;
  this._anglePlus.wholeDuration = _0x2964f4 || 0x0;
  this._anglePlus.easingType = _0x306205 || 'Linear';
  if (_0x2964f4 <= 0x0) {
    this._anglePlus.current = this._anglePlus.target;
  }
};
Game_Picture.prototype.changeAnglePlusData = function (_0x5a3908, _0x259e9e, _0xfc1eff) {
  if (this._anglePlus === undefined) {
    this.initRotationCoreEngine();
  }
  this._anglePlus.target += _0x5a3908 || 0x0;
  this._anglePlus.duration = _0x259e9e || 0x0;
  this._anglePlus.wholeDuration = _0x259e9e || 0x0;
  this._anglePlus.easingType = _0xfc1eff || "Linear";
  if (_0x259e9e <= 0x0) {
    this._anglePlus.current = this._anglePlus.target;
  }
};
VisuMZ.CoreEngine.Game_Picture_updateRotation = Game_Picture.prototype.updateRotation;
Game_Picture.prototype.updateRotation = function () {
  VisuMZ.CoreEngine.Game_Picture_updateRotation.call(this);
  this.updateAnglePlus();
};
Game_Picture.prototype.updateAnglePlus = function () {
  if (this._anglePlus === undefined) {
    this.initRotationCoreEngine();
  }
  const _0x1684d7 = this._anglePlus;
  if (_0x1684d7.duration <= 0x0) {
    return;
  }
  _0x1684d7.current = this.applyEasingAnglePlus(_0x1684d7.current, _0x1684d7.target);
  _0x1684d7.duration--;
  if (_0x1684d7.duration <= 0x0) {
    _0x1684d7.current = _0x1684d7.target;
  }
};
Game_Picture.prototype.applyEasingAnglePlus = function (_0x43c4cd, _0x4b1803) {
  const _0x4189a0 = this._anglePlus;
  const _0x222ac0 = _0x4189a0.easingType;
  const _0x5a9f40 = _0x4189a0.duration;
  const _0x48e89d = _0x4189a0.wholeDuration;
  const _0x4aeb06 = VisuMZ.ApplyEasing((_0x48e89d - _0x5a9f40) / _0x48e89d, _0x222ac0);
  const _0x1c66d5 = VisuMZ.ApplyEasing((_0x48e89d - _0x5a9f40 + 0x1) / _0x48e89d, _0x222ac0);
  const _0x1a00cb = (_0x43c4cd - _0x4b1803 * _0x4aeb06) / (0x1 - _0x4aeb06);
  return _0x1a00cb + (_0x4b1803 - _0x1a00cb) * _0x1c66d5;
};
VisuMZ.CoreEngine.Game_Action_itemHit = Game_Action.prototype.itemHit;
Game_Action.prototype.itemHit = function (_0x39271d) {
  return VisuMZ.CoreEngine.Settings.QoL.ImprovedAccuracySystem ? this.itemHitImprovedAccuracy(_0x39271d) : VisuMZ.CoreEngine.Game_Action_itemHit.call(this, _0x39271d);
};
Game_Action.prototype.itemHitImprovedAccuracy = function (_0x4c833a) {
  const _0x45d028 = this.itemSuccessRate(_0x4c833a);
  const _0x31d56a = this.subjectHitRate(_0x4c833a);
  const _0x21fc8a = this.targetEvaRate(_0x4c833a);
  return _0x45d028 * (_0x31d56a - _0x21fc8a);
};
VisuMZ.CoreEngine.Game_Action_itemEva = Game_Action.prototype.itemEva;
Game_Action.prototype.itemEva = function (_0x2d32a7) {
  return VisuMZ.CoreEngine.Settings.QoL.ImprovedAccuracySystem ? 0x0 : VisuMZ.CoreEngine.Game_Action_itemEva.call(this, _0x2d32a7);
};
Game_Action.prototype.itemSuccessRate = function (_0x1a7b04) {
  return this.item().successRate * 0.01;
};
Game_Action.prototype.subjectHitRate = function (_0x46a5e1) {
  if (VisuMZ.CoreEngine.Settings.QoL.AccuracyBoost && this.isItem()) {
    return 0x1;
  }
  return this.isPhysical() ? VisuMZ.CoreEngine.Settings.QoL.AccuracyBoost && this.subject().isActor() ? this.subject().hit + 0.05 : this.subject().hit : 0x1;
};
Game_Action.prototype.targetEvaRate = function (_0x19d49e) {
  if (this.subject().isActor() === _0x19d49e.isActor()) {
    return 0x0;
  }
  if (this.isPhysical()) {
    return VisuMZ.CoreEngine.Settings.QoL.AccuracyBoost && _0x19d49e.isEnemy() ? _0x19d49e.eva - 0.05 : _0x19d49e.eva;
  } else {
    return this.isMagical() ? _0x19d49e.mev : 0x0;
  }
};
VisuMZ.CoreEngine.Game_Action_updateLastTarget = Game_Action.prototype.updateLastTarget;
Game_Action.prototype.updateLastTarget = function (_0x2cb9fd) {
  VisuMZ.CoreEngine.Game_Action_updateLastTarget.call(this, _0x2cb9fd);
  if (VisuMZ.CoreEngine.Settings.QoL.ImprovedAccuracySystem) {
    return;
  }
  const _0x476e0c = _0x2cb9fd.result();
  if (_0x476e0c.missed) {
    if (0x1 - this.itemEva(_0x2cb9fd) > this.itemHit(_0x2cb9fd)) {
      _0x476e0c.missed = false;
      _0x476e0c.evaded = true;
    }
  }
};
VisuMZ.CoreEngine.Game_BattlerBase_initMembers = Game_BattlerBase.prototype.initMembers;
Game_BattlerBase.prototype.initMembers = function () {
  this._cache = {};
  VisuMZ.CoreEngine.Game_BattlerBase_initMembers.call(this);
};
VisuMZ.CoreEngine.Game_BattlerBase_refresh = Game_BattlerBase.prototype.refresh;
Game_BattlerBase.prototype.refresh = function () {
  this._cache = {};
  VisuMZ.CoreEngine.Game_BattlerBase_refresh.call(this);
};
Game_BattlerBase.prototype.checkCacheKey = function (_0x1137e2) {
  this._cache = this._cache || {};
  return this._cache[_0x1137e2] !== undefined;
};
Game_BattlerBase.prototype.paramPlus = function (_0x18040e) {
  const _0x4e0861 = (_0x7d0960, _0x5665a9) => {
    if (!_0x5665a9) {
      return _0x7d0960;
    }
    if (_0x5665a9.note.match(VisuMZ.CoreEngine.RegExp.paramPlus[_0x18040e])) {
      var _0x5b726c = Number(RegExp.$1);
      _0x7d0960 += _0x5b726c;
    }
    if (_0x5665a9.note.match(VisuMZ.CoreEngine.RegExp.paramPlusJS[_0x18040e])) {
      var _0x3354dd = String(RegExp.$1);
      try {
        _0x7d0960 += eval(_0x3354dd);
      } catch (_0x11dae1) {
        if ($gameTemp.isPlaytest()) {
          console.log(_0x11dae1);
        }
      }
    }
    return _0x7d0960;
  };
  return this.traitObjects().reduce(_0x4e0861, this._paramPlus[_0x18040e]);
};
Game_BattlerBase.prototype.paramMax = function (_0x3e1881) {
  var _0x34931f = "Basic" + (this.isActor() ? 'Actor' : 'Enemy') + "ParamMax" + _0x3e1881;
  if (this.checkCacheKey(_0x34931f)) {
    return this._cache[_0x34931f];
  }
  this._cache[_0x34931f] = eval(VisuMZ.CoreEngine.Settings.Param[_0x34931f]);
  const _0x14ebf1 = (_0x4a1958, _0x5c3e41) => {
    if (!_0x5c3e41) {
      return _0x4a1958;
    }
    if (_0x5c3e41.note.match(VisuMZ.CoreEngine.RegExp.paramMax[_0x3e1881])) {
      var _0x225e3d = Number(RegExp.$1);
      if (_0x225e3d === 0x0) {
        _0x225e3d = Number.MAX_SAFE_INTEGER;
      }
      _0x4a1958 = Math.max(_0x4a1958, _0x225e3d);
    }
    if (_0x5c3e41.note.match(VisuMZ.CoreEngine.RegExp.paramMaxJS[_0x3e1881])) {
      var _0xe74417 = String(RegExp.$1);
      try {
        _0x4a1958 = Math.max(_0x4a1958, Number(eval(_0xe74417)));
      } catch (_0x4ad89c) {
        if ($gameTemp.isPlaytest()) {
          console.log(_0x4ad89c);
        }
      }
    }
    return _0x4a1958;
  };
  if (this._cache[_0x34931f] === 0x0) {
    this._cache[_0x34931f] = Number.MAX_SAFE_INTEGER;
  }
  this._cache[_0x34931f] = this.traitObjects().reduce(_0x14ebf1, this._cache[_0x34931f]);
  return this._cache[_0x34931f];
};
Game_BattlerBase.prototype.paramRate = function (_0x343669) {
  const _0xb00bbd = this.traitsPi(Game_BattlerBase.TRAIT_PARAM, _0x343669);
  const _0x295d94 = (_0x4c1b8a, _0x21677c) => {
    if (!_0x21677c) {
      return _0x4c1b8a;
    }
    if (_0x21677c.note.match(VisuMZ.CoreEngine.RegExp.paramRate1[_0x343669])) {
      var _0x26f0b7 = Number(RegExp.$1) / 0x64;
      _0x4c1b8a *= _0x26f0b7;
    }
    if (_0x21677c.note.match(VisuMZ.CoreEngine.RegExp.paramRate2[_0x343669])) {
      var _0x26f0b7 = Number(RegExp.$1);
      _0x4c1b8a *= _0x26f0b7;
    }
    if (_0x21677c.note.match(VisuMZ.CoreEngine.RegExp.paramRateJS[_0x343669])) {
      var _0x1d7771 = String(RegExp.$1);
      try {
        _0x4c1b8a *= eval(_0x1d7771);
      } catch (_0x17deaf) {
        if ($gameTemp.isPlaytest()) {
          console.log(_0x17deaf);
        }
      }
    }
    return _0x4c1b8a;
  };
  return this.traitObjects().reduce(_0x295d94, _0xb00bbd);
};
Game_BattlerBase.prototype.paramFlatBonus = function (_0x32341a) {
  const _0x5611d4 = (_0x4049eb, _0x5e0c41) => {
    if (!_0x5e0c41) {
      return _0x4049eb;
    }
    if (_0x5e0c41.note.match(VisuMZ.CoreEngine.RegExp.paramFlat[_0x32341a])) {
      var _0x1882c7 = Number(RegExp.$1);
      _0x4049eb += _0x1882c7;
    }
    if (_0x5e0c41.note.match(VisuMZ.CoreEngine.RegExp.paramFlatJS[_0x32341a])) {
      var _0x56ab5e = String(RegExp.$1);
      try {
        _0x4049eb += eval(_0x56ab5e);
      } catch (_0x1ee8db) {
        if ($gameTemp.isPlaytest()) {
          console.log(_0x1ee8db);
        }
      }
    }
    return _0x4049eb;
  };
  return this.traitObjects().reduce(_0x5611d4, 0x0);
};
Game_BattlerBase.prototype.param = function (_0x3c6dc3) {
  let _0x25f499 = 'param' + _0x3c6dc3 + 'Total';
  if (this.checkCacheKey(_0x25f499)) {
    return this._cache[_0x25f499];
  }
  this._cache[_0x25f499] = Math.round(VisuMZ.CoreEngine.Settings.Param.BasicParameterFormula.call(this, _0x3c6dc3));
  return this._cache[_0x25f499];
};
Game_BattlerBase.prototype.xparamPlus = function (_0x27bf1f) {
  const _0x57cd64 = (_0x1a3681, _0x1081ea) => {
    if (!_0x1081ea) {
      return _0x1a3681;
    }
    if (_0x1081ea.note.match(VisuMZ.CoreEngine.RegExp.xparamPlus1[_0x27bf1f])) {
      var _0x4dc6d9 = Number(RegExp.$1) / 0x64;
      _0x1a3681 += _0x4dc6d9;
    }
    if (_0x1081ea.note.match(VisuMZ.CoreEngine.RegExp.xparamPlus2[_0x27bf1f])) {
      var _0x4dc6d9 = Number(RegExp.$1);
      _0x1a3681 += _0x4dc6d9;
    }
    if (_0x1081ea.note.match(VisuMZ.CoreEngine.RegExp.xparamPlusJS[_0x27bf1f])) {
      var _0xe43866 = String(RegExp.$1);
      try {
        _0x1a3681 += eval(_0xe43866);
      } catch (_0x2ae99d) {
        if ($gameTemp.isPlaytest()) {
          console.log(_0x2ae99d);
        }
      }
    }
    return _0x1a3681;
  };
  return this.traitObjects().reduce(_0x57cd64, 0x0);
};
Game_BattlerBase.prototype.xparamRate = function (_0x453de4) {
  const _0x5e93ac = (_0x4a8cbc, _0x417988) => {
    if (!_0x417988) {
      return _0x4a8cbc;
    }
    if (_0x417988.note.match(VisuMZ.CoreEngine.RegExp.xparamRate1[_0x453de4])) {
      var _0x5d0433 = Number(RegExp.$1) / 0x64;
      _0x4a8cbc *= _0x5d0433;
    }
    if (_0x417988.note.match(VisuMZ.CoreEngine.RegExp.xparamRate2[_0x453de4])) {
      var _0x5d0433 = Number(RegExp.$1);
      _0x4a8cbc *= _0x5d0433;
    }
    if (_0x417988.note.match(VisuMZ.CoreEngine.RegExp.xparamRateJS[_0x453de4])) {
      var _0x39d52a = String(RegExp.$1);
      try {
        _0x4a8cbc *= eval(_0x39d52a);
      } catch (_0x4a560f) {
        if ($gameTemp.isPlaytest()) {
          console.log(_0x4a560f);
        }
      }
    }
    return _0x4a8cbc;
  };
  return this.traitObjects().reduce(_0x5e93ac, 0x1);
};
Game_BattlerBase.prototype.xparamFlatBonus = function (_0x160ed2) {
  const _0x472abe = (_0x3ea42f, _0x2e867d) => {
    if (!_0x2e867d) {
      return _0x3ea42f;
    }
    if (_0x2e867d.note.match(VisuMZ.CoreEngine.RegExp.xparamFlat1[_0x160ed2])) {
      var _0x5ca88a = Number(RegExp.$1) / 0x64;
      _0x3ea42f += _0x5ca88a;
    }
    if (_0x2e867d.note.match(VisuMZ.CoreEngine.RegExp.xparamFlat2[_0x160ed2])) {
      var _0x5ca88a = Number(RegExp.$1);
      _0x3ea42f += _0x5ca88a;
    }
    if (_0x2e867d.note.match(VisuMZ.CoreEngine.RegExp.xparamFlatJS[_0x160ed2])) {
      var _0x5433cb = String(RegExp.$1);
      try {
        _0x3ea42f += eval(_0x5433cb);
      } catch (_0x59d62e) {
        if ($gameTemp.isPlaytest()) {
          console.log(_0x59d62e);
        }
      }
    }
    return _0x3ea42f;
  };
  return this.traitObjects().reduce(_0x472abe, 0x0);
};
Game_BattlerBase.prototype.xparam = function (_0x2be4e1) {
  let _0x684048 = "xparam" + _0x2be4e1 + "Total";
  if (this.checkCacheKey(_0x684048)) {
    return this._cache[_0x684048];
  }
  this._cache[_0x684048] = VisuMZ.CoreEngine.Settings.Param.XParameterFormula.call(this, _0x2be4e1);
  return this._cache[_0x684048];
};
Game_BattlerBase.prototype.sparamPlus = function (_0x8c7bc7) {
  const _0x3ee591 = (_0x256b9e, _0x4b2bc1) => {
    if (!_0x4b2bc1) {
      return _0x256b9e;
    }
    if (_0x4b2bc1.note.match(VisuMZ.CoreEngine.RegExp.sparamPlus1[_0x8c7bc7])) {
      var _0x523ecb = Number(RegExp.$1) / 0x64;
      _0x256b9e += _0x523ecb;
    }
    if (_0x4b2bc1.note.match(VisuMZ.CoreEngine.RegExp.sparamPlus2[_0x8c7bc7])) {
      var _0x523ecb = Number(RegExp.$1);
      _0x256b9e += _0x523ecb;
    }
    if (_0x4b2bc1.note.match(VisuMZ.CoreEngine.RegExp.sparamPlusJS[_0x8c7bc7])) {
      var _0x24b6b6 = String(RegExp.$1);
      try {
        _0x256b9e += eval(_0x24b6b6);
      } catch (_0x5a10a3) {
        if ($gameTemp.isPlaytest()) {
          console.log(_0x5a10a3);
        }
      }
    }
    return _0x256b9e;
  };
  return this.traitObjects().reduce(_0x3ee591, 0x0);
};
Game_BattlerBase.prototype.sparamRate = function (_0x2d9f6a) {
  const _0x1bca45 = (_0x5b0a44, _0x202dab) => {
    if (!_0x202dab) {
      return _0x5b0a44;
    }
    if (_0x202dab.note.match(VisuMZ.CoreEngine.RegExp.sparamRate1[_0x2d9f6a])) {
      var _0x1e06b7 = Number(RegExp.$1) / 0x64;
      _0x5b0a44 *= _0x1e06b7;
    }
    if (_0x202dab.note.match(VisuMZ.CoreEngine.RegExp.sparamRate2[_0x2d9f6a])) {
      var _0x1e06b7 = Number(RegExp.$1);
      _0x5b0a44 *= _0x1e06b7;
    }
    if (_0x202dab.note.match(VisuMZ.CoreEngine.RegExp.sparamRateJS[_0x2d9f6a])) {
      var _0x16c674 = String(RegExp.$1);
      try {
        _0x5b0a44 *= eval(_0x16c674);
      } catch (_0x143f6c) {
        if ($gameTemp.isPlaytest()) {
          console.log(_0x143f6c);
        }
      }
    }
    return _0x5b0a44;
  };
  return this.traitObjects().reduce(_0x1bca45, 0x1);
};
Game_BattlerBase.prototype.sparamFlatBonus = function (_0x1a55c6) {
  const _0x52a2e6 = (_0x5c2242, _0x585763) => {
    if (!_0x585763) {
      return _0x5c2242;
    }
    if (_0x585763.note.match(VisuMZ.CoreEngine.RegExp.sparamFlat1[_0x1a55c6])) {
      var _0x2a47be = Number(RegExp.$1) / 0x64;
      _0x5c2242 += _0x2a47be;
    }
    if (_0x585763.note.match(VisuMZ.CoreEngine.RegExp.sparamFlat2[_0x1a55c6])) {
      var _0x2a47be = Number(RegExp.$1);
      _0x5c2242 += _0x2a47be;
    }
    if (_0x585763.note.match(VisuMZ.CoreEngine.RegExp.sparamFlatJS[_0x1a55c6])) {
      var _0x44a34b = String(RegExp.$1);
      try {
        _0x5c2242 += eval(_0x44a34b);
      } catch (_0x291bf9) {
        if ($gameTemp.isPlaytest()) {
          console.log(_0x291bf9);
        }
      }
    }
    return _0x5c2242;
  };
  return this.traitObjects().reduce(_0x52a2e6, 0x0);
};
Game_BattlerBase.prototype.sparam = function (_0x4a0779) {
  let _0x3d2f51 = 'sparam' + _0x4a0779 + "Total";
  if (this.checkCacheKey(_0x3d2f51)) {
    return this._cache[_0x3d2f51];
  }
  this._cache[_0x3d2f51] = VisuMZ.CoreEngine.Settings.Param.SParameterFormula.call(this, _0x4a0779);
  return this._cache[_0x3d2f51];
};
Game_BattlerBase.prototype.paramValueByName = function (_0x53909b, _0x5337ab) {
  if (typeof paramId === 'number') {
    return this.param(_0x53909b);
  }
  _0x53909b = String(_0x53909b || '').toUpperCase();
  if (_0x53909b === 'MAXHP') {
    return this.param(0x0);
  }
  if (_0x53909b === "MAXMP") {
    return this.param(0x1);
  }
  if (_0x53909b === "ATK") {
    return this.param(0x2);
  }
  if (_0x53909b === "DEF") {
    return this.param(0x3);
  }
  if (_0x53909b === "MAT") {
    return this.param(0x4);
  }
  if (_0x53909b === "MDF") {
    return this.param(0x5);
  }
  if (_0x53909b === 'AGI') {
    return this.param(0x6);
  }
  if (_0x53909b === 'LUK') {
    return this.param(0x7);
  }
  if (_0x53909b === "HIT") {
    return _0x5337ab ? String(Math.round(this.xparam(0x0) * 0x64)) + '%' : this.xparam(0x0);
  }
  if (_0x53909b === 'EVA') {
    return _0x5337ab ? String(Math.round(this.xparam(0x1) * 0x64)) + '%' : this.xparam(0x1);
  }
  if (_0x53909b === 'CRI') {
    return _0x5337ab ? String(Math.round(this.xparam(0x2) * 0x64)) + '%' : this.xparam(0x2);
  }
  if (_0x53909b === "CEV") {
    return _0x5337ab ? String(Math.round(this.xparam(0x3) * 0x64)) + '%' : this.xparam(0x3);
  }
  if (_0x53909b === 'MEV') {
    return _0x5337ab ? String(Math.round(this.xparam(0x4) * 0x64)) + '%' : this.xparam(0x4);
  }
  if (_0x53909b === "MRF") {
    return _0x5337ab ? String(Math.round(this.xparam(0x5) * 0x64)) + '%' : this.xparam(0x5);
  }
  if (_0x53909b === "CNT") {
    return _0x5337ab ? String(Math.round(this.xparam(0x6) * 0x64)) + '%' : this.xparam(0x6);
  }
  if (_0x53909b === "HRG") {
    return _0x5337ab ? String(Math.round(this.xparam(0x7) * 0x64)) + '%' : this.xparam(0x7);
  }
  if (_0x53909b === 'MRG') {
    return _0x5337ab ? String(Math.round(this.xparam(0x8) * 0x64)) + '%' : this.xparam(0x8);
  }
  if (_0x53909b === "TRG") {
    return _0x5337ab ? String(Math.round(this.xparam(0x9) * 0x64)) + '%' : this.xparam(0x9);
  }
  if (_0x53909b === "TGR") {
    return _0x5337ab ? String(Math.round(this.sparam(0x0) * 0x64)) + '%' : this.sparam(0x0);
  }
  if (_0x53909b === "GRD") {
    return _0x5337ab ? String(Math.round(this.sparam(0x1) * 0x64)) + '%' : this.sparam(0x1);
  }
  if (_0x53909b === "REC") {
    return _0x5337ab ? String(Math.round(this.sparam(0x2) * 0x64)) + '%' : this.sparam(0x2);
  }
  if (_0x53909b === 'PHA') {
    return _0x5337ab ? String(Math.round(this.sparam(0x3) * 0x64)) + '%' : this.sparam(0x3);
  }
  if (_0x53909b === "MCR") {
    return _0x5337ab ? String(Math.round(this.sparam(0x4) * 0x64)) + '%' : this.sparam(0x4);
  }
  if (_0x53909b === "TCR") {
    return _0x5337ab ? String(Math.round(this.sparam(0x5) * 0x64)) + '%' : this.sparam(0x5);
  }
  if (_0x53909b === 'PDR') {
    return _0x5337ab ? String(Math.round(this.sparam(0x6) * 0x64)) + '%' : this.sparam(0x6);
  }
  if (_0x53909b === "MDR") {
    return _0x5337ab ? String(Math.round(this.sparam(0x7) * 0x64)) + '%' : this.sparam(0x7);
  }
  if (_0x53909b === "FDR") {
    return _0x5337ab ? String(Math.round(this.sparam(0x8) * 0x64)) + '%' : this.sparam(0x8);
  }
  if (_0x53909b === "EXR") {
    return _0x5337ab ? String(Math.round(this.sparam(0x9) * 0x64)) + '%' : this.sparam(0x9);
  }
  if (VisuMZ.CoreEngine.CustomParamAbb[_0x53909b]) {
    const _0x4d816b = VisuMZ.CoreEngine.CustomParamAbb[_0x53909b];
    const _0x13ed55 = this[_0x4d816b];
    return VisuMZ.CoreEngine.CustomParamType[_0x53909b] === "integer" ? _0x13ed55 : _0x5337ab ? String(Math.round(_0x13ed55 * 0x64)) + '%' : _0x13ed55;
  }
  return '';
};
Game_BattlerBase.prototype.isDying = function () {
  return this.isAlive() && this._hp < this.mhp * VisuMZ.CoreEngine.Settings.Param.CrisisRate;
};
Game_Battler.prototype.performMiss = function () {
  SoundManager.playMiss();
  this.requestMotion("evade");
};
VisuMZ.CoreEngine.Game_Actor_paramBase = Game_Actor.prototype.paramBase;
Game_Actor.prototype.paramBase = function (_0x1ca927) {
  if (this.level > 0x63) {
    return this.paramBaseAboveLevel99(_0x1ca927);
  }
  return VisuMZ.CoreEngine.Game_Actor_paramBase.call(this, _0x1ca927);
};
Game_Actor.prototype.paramBaseAboveLevel99 = function (_0x1b56b8) {
  const _0x562c54 = this.currentClass().params[_0x1b56b8][0x63];
  const _0x5c0c26 = this.currentClass().params[_0x1b56b8][0x62];
  return _0x562c54 + (_0x562c54 - _0x5c0c26) * (this.level - 0x63);
};
VisuMZ.CoreEngine.Game_Actor_changeClass = Game_Actor.prototype.changeClass;
Game_Actor.prototype.changeClass = function (_0x25cc66, _0x1a6e7e) {
  $gameTemp._changingClass = true;
  VisuMZ.CoreEngine.Game_Actor_changeClass.call(this, _0x25cc66, _0x1a6e7e);
  $gameTemp._changingClass = undefined;
};
VisuMZ.CoreEngine.Game_Actor_levelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function () {
  VisuMZ.CoreEngine.Game_Actor_levelUp.call(this);
  if (!$gameTemp._changingClass) {
    this.levelUpRecovery();
  }
};
Game_Actor.prototype.levelUpRecovery = function () {
  this._cache = {};
  if (VisuMZ.CoreEngine.Settings.QoL.LevelUpFullHp) {
    this._hp = this.mhp;
  }
  if (VisuMZ.CoreEngine.Settings.QoL.LevelUpFullMp) {
    this._mp = this.mmp;
  }
};
Game_Actor.prototype.expRate = function () {
  if (this.isMaxLevel()) {
    return 0x1;
  }
  const _0x20c996 = this.nextLevelExp() - this.currentLevelExp();
  const _0x1869e9 = this.currentExp() - this.currentLevelExp();
  return (_0x1869e9 / _0x20c996).clamp(0x0, 0x1);
};
Game_Actor.prototype.traitObjects = function () {
  const _0x400394 = Game_Battler.prototype.traitObjects.call(this);
  for (const _0x266a2f of this.equips()) {
    if (_0x266a2f) {
      _0x400394.push(_0x266a2f);
    }
  }
  _0x400394.push(this.currentClass(), this.actor());
  return _0x400394;
};
VisuMZ.CoreEngine.Game_Actor_isPreserveTp = Game_Actor.prototype.isPreserveTp;
Game_Actor.prototype.isPreserveTp = function () {
  if (!$gameParty.inBattle()) {
    return true;
  }
  return VisuMZ.CoreEngine.Game_Actor_isPreserveTp.call(this);
};
VisuMZ.CoreEngine.Game_Unit_onBattleStart = Game_Unit.prototype.onBattleStart;
Game_Unit.prototype.onBattleStart = function (_0x44ef52) {
  this._inBattle = true;
  VisuMZ.CoreEngine.Game_Unit_onBattleStart.call(this, _0x44ef52);
};
VisuMZ.CoreEngine.Game_Unit_onBattleEnd = Game_Unit.prototype.onBattleEnd;
Game_Unit.prototype.onBattleEnd = function () {
  for (const _0x2b2120 of this.members()) {
    if (_0x2b2120 && !_0x2b2120.isPreserveTp()) {
      _0x2b2120.clearTp();
    }
  }
  VisuMZ.CoreEngine.Game_Unit_onBattleEnd.call(this);
};
Object.defineProperty(Game_Enemy.prototype, "level", {
  'get': function () {
    return this.getLevel();
  },
  'configurable': true
});
Game_Enemy.prototype.getLevel = function () {
  return this.enemy().level;
};
Game_Enemy.prototype.moveRelativeToResolutionChange = function () {
  if (!this._repositioned) {
    this._screenY += Math.round((Graphics.height - 0x270) / 0x2);
    this._screenY -= Math.floor((Graphics.height - Graphics.boxHeight) / 0x2);
    if ($gameSystem.isSideView()) {
      this._screenX -= Math.floor((Graphics.width - Graphics.boxWidth) / 0x2);
    } else {
      this._screenX += Math.round((Graphics.boxWidth - 0x330) / 0x2);
    }
  }
  this._repositioned = true;
};
Game_Party.prototype.maxGold = function () {
  return VisuMZ.CoreEngine.Settings.Gold.GoldMax;
};
VisuMZ.CoreEngine.Game_Party_consumeItem = Game_Party.prototype.consumeItem;
Game_Party.prototype.consumeItem = function (_0x352a63) {
  if (VisuMZ.CoreEngine.Settings.QoL.KeyItemProtect && DataManager.isKeyItem(_0x352a63)) {
    return;
  }
  VisuMZ.CoreEngine.Game_Party_consumeItem.call(this, _0x352a63);
};
Game_Party.prototype.setupBattleTestItems = function () {
  const _0x1278f8 = VisuMZ.CoreEngine.Settings.QoL;
  const _0x1b7e75 = _0x1278f8.BTestAddedQuantity ?? 0x63;
  let _0x32a47d = [];
  if (_0x1278f8.BTestItems ?? true) {
    _0x32a47d = _0x32a47d.concat($dataItems);
  }
  if (_0x1278f8.BTestWeapons ?? true) {
    _0x32a47d = _0x32a47d.concat($dataWeapons);
  }
  if (_0x1278f8.BTestArmors ?? true) {
    _0x32a47d = _0x32a47d.concat($dataArmors);
  }
  for (const _0xa5ee4e of _0x32a47d) {
    if (!_0xa5ee4e) {
      continue;
    }
    if (_0xa5ee4e.name.trim() <= 0x0) {
      continue;
    }
    if (_0xa5ee4e.name.match(/-----/i)) {
      continue;
    }
    this.gainItem(_0xa5ee4e, _0x1b7e75);
  }
};
VisuMZ.CoreEngine.Game_Troop_setup = Game_Troop.prototype.setup;
Game_Troop.prototype.setup = function (_0x34aab4) {
  $gameTemp.clearForcedGameTroopSettingsCoreEngine();
  $gameTemp.applyForcedGameTroopSettingsCoreEngine(_0x34aab4);
  VisuMZ.CoreEngine.Game_Troop_setup.call(this, _0x34aab4);
};
VisuMZ.CoreEngine.Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function (_0x57b291) {
  VisuMZ.CoreEngine.Game_Map_setup.call(this, _0x57b291);
  this.checkCoreEngineDisplayCenter();
  this.setupCoreEngine(_0x57b291);
  this.setupTileExtendTerrainTags();
};
Game_Map.prototype.setupCoreEngine = function () {
  this._hideTileShadows = VisuMZ.CoreEngine.Settings.QoL.NoTileShadows || false;
  const _0xe54b9 = VisuMZ.CoreEngine.Settings.ScreenResolution;
  const _0x4d7e38 = $dataMap ? $dataMap.note || '' : '';
  if (_0x4d7e38.match(/<SHOW TILE SHADOWS>/i)) {
    this._hideTileShadows = false;
  } else if (_0x4d7e38.match(/<HIDE TILE SHADOWS>/i)) {
    this._hideTileShadows = true;
  }
  if (_0x4d7e38.match(/<SCROLL LOCK X>/i)) {
    this.centerCameraCheckData().centerX = true;
    this.centerCameraCheckData().displayX = _0xe54b9.DisplayLockX;
  } else if (_0x4d7e38.match(/<SCROLL LOCK X: (.*?)>/i)) {
    this.centerCameraCheckData().centerX = true;
    this.centerCameraCheckData().displayX = Number(RegExp.$1);
  }
  if (_0x4d7e38.match(/<SCROLL LOCK Y>/i)) {
    this.centerCameraCheckData().centerY = true;
    this.centerCameraCheckData().displayY = _0xe54b9.DisplayLockY;
  } else if (_0x4d7e38.match(/<SCROLL LOCK Y: (.*?)>/i)) {
    this.centerCameraCheckData().centerY = true;
    this.centerCameraCheckData().displayY = Number(RegExp.$1);
  }
};
Game_Map.prototype.areTileShadowsHidden = function () {
  if (this._hideTileShadows === undefined) {
    this.setupCoreEngine();
  }
  return this._hideTileShadows;
};
Game_Map.prototype.checkCoreEngineDisplayCenter = function () {
  const _0x2d9434 = VisuMZ.CoreEngine.Settings.ScreenResolution;
  this._centerCameraCheck = {
    'centerX': false,
    'centerY': false,
    'displayX': 0x0,
    'displayY': 0x0
  };
  if (_0x2d9434.AutoScrollLockX) {
    const _0x4e157d = Graphics.width / this.tileWidth();
    if (_0x4e157d % 0x1 !== 0x0 && Math.ceil(_0x4e157d) === this.width() && !this.isLoopHorizontal()) {
      this._centerCameraCheck.centerX = true;
      this._centerCameraCheck.displayX = _0x2d9434.DisplayLockX || 0x0;
    }
  }
  if (_0x2d9434.AutoScrollLockY) {
    const _0x38a787 = Graphics.height / this.tileHeight();
    if (_0x38a787 % 0x1 !== 0x0 && Math.ceil(_0x38a787) === this.height() && !this.isLoopVertical()) {
      this._centerCameraCheck.centerY = true;
      this._centerCameraCheck.displayY = _0x2d9434.DisplayLockY || 0x0;
    }
  }
  if ($gameScreen.zoomScale() === 0x1) {
    if (this.centerCameraCheckData().centerX) {
      this._displayX = this.centerCameraCheckData().displayX;
    }
    if (this.centerCameraCheckData().centerY) {
      this._displayY = this.centerCameraCheckData().displayY;
    }
  }
};
VisuMZ.CoreEngine.Game_Map_setDisplayPos = Game_Map.prototype.setDisplayPos;
Game_Map.prototype.setDisplayPos = function (_0x2689aa, _0x33e3aa) {
  VisuMZ.CoreEngine.Game_Map_setDisplayPos.call(this, _0x2689aa, _0x33e3aa);
  if ($gameScreen.zoomScale() === 0x1) {
    if (!this.isLoopHorizontal() && this.centerCameraCheckData().centerX) {
      this._displayX = this.centerCameraCheckData().displayX;
    }
    if (!this.isLoopVertical() && this.centerCameraCheckData().centerY) {
      this._displayY = this.centerCameraCheckData().displayY;
    }
  }
};
Game_Map.prototype.centerCameraCheckData = function () {
  if (this._centerCameraCheck === undefined) {
    this.checkCoreEngineDisplayCenter();
  }
  return this._centerCameraCheck;
};
VisuMZ.CoreEngine.Game_Map_scrollDown = Game_Map.prototype.scrollDown;
Game_Map.prototype.scrollDown = function (_0x5c0066) {
  if (this.centerCameraCheckData().centerY && $gameScreen.zoomScale() === 0x1) {
    this._displayY = this.centerCameraCheckData().displayY;
    return;
  }
  VisuMZ.CoreEngine.Game_Map_scrollDown.call(this, _0x5c0066);
};
VisuMZ.CoreEngine.Game_Map_scrollLeft = Game_Map.prototype.scrollLeft;
Game_Map.prototype.scrollLeft = function (_0x3596b4) {
  if (this.centerCameraCheckData().centerX && $gameScreen.zoomScale() === 0x1) {
    this._displayX = this.centerCameraCheckData().displayX;
    return;
  }
  VisuMZ.CoreEngine.Game_Map_scrollLeft.call(this, _0x3596b4);
};
VisuMZ.CoreEngine.Game_Map_scrollRight = Game_Map.prototype.scrollRight;
Game_Map.prototype.scrollRight = function (_0x4d407a) {
  if (this.centerCameraCheckData().centerX && $gameScreen.zoomScale() === 0x1) {
    this._displayX = this.centerCameraCheckData().displayX;
    return;
  }
  VisuMZ.CoreEngine.Game_Map_scrollRight.call(this, _0x4d407a);
};
VisuMZ.CoreEngine.Game_Map_scrollUp = Game_Map.prototype.scrollUp;
Game_Map.prototype.scrollUp = function (_0x51078f) {
  if (this.centerCameraCheckData().centerY && $gameScreen.zoomScale() === 0x1) {
    this._displayY = this.centerCameraCheckData().displayY;
    return;
  }
  VisuMZ.CoreEngine.Game_Map_scrollUp.call(this, _0x51078f);
};
Game_Map.prototype.setupTileExtendTerrainTags = function () {
  this._tileExtendTerrainTags = {};
  const _0x20ff27 = this.tileset();
  if (!_0x20ff27) {
    return {};
  }
  const _0x47509a = _0x20ff27.note || '';
  const _0x2dd9cf = /<(?:TALLER|EXT|EXTEND|RAISE)[ ]BY[ ](\d+):[ ](.*)>/gi;
  let _0x1830af = {};
  const _0x1da196 = _0x47509a.match(_0x2dd9cf);
  if (_0x1da196) {
    for (const _0xc86854 of _0x1da196) {
      _0xc86854.match(_0x2dd9cf);
      const _0x4fa26e = Number(RegExp.$1).clamp(0x1, 0x10);
      const _0x4205d0 = String(RegExp.$2).split(',').map(_0xc9238b => Number(_0xc9238b).clamp(0x1, 0x7));
      for (const _0x94773e of _0x4205d0) {
        _0x1830af[_0x94773e] = _0x4fa26e;
      }
    }
  }
  this._tileExtendTerrainTags = _0x1830af;
};
Game_Map.prototype.getTileExtendTerrainTags = function () {
  if (this._tileExtendTerrainTags === undefined) {
    this.setupTileExtendTerrainTags();
  }
  return this._tileExtendTerrainTags;
};
Game_Map.prototype.isTileExtended = function (_0x28bc06) {
  if (_0x28bc06 >= 0x400) {
    return false;
  }
  const _0x25eda0 = $gameMap.getTileExtendTerrainTags();
  if (Object.keys(_0x25eda0).length <= 0x0) {
    return false;
  }
  const _0x358c0a = this.tilesetFlags();
  const _0x5723cf = _0x358c0a[_0x28bc06] >> 0xc;
  const _0xd1b167 = _0x25eda0[_0x5723cf] || 0x0;
  return _0xd1b167 > 0x0;
};
VisuMZ.CoreEngine.Game_Map_changeTileset = Game_Map.prototype.changeTileset;
Game_Map.prototype.changeTileset = function (_0x145a9c) {
  VisuMZ.CoreEngine.Game_Map_changeTileset.call(this, _0x145a9c);
  this.refreshSpritesetForExtendedTiles();
  SceneManager._scene._spriteset.update();
};
Game_Map.prototype.refreshSpritesetForExtendedTiles = function () {
  const _0x35fb6c = this.getTileExtendTerrainTags();
  if (Object.keys(_0x35fb6c).length <= 0x0) {
    return;
  }
  const _0x248223 = SceneManager._scene._spriteset;
  if (_0x248223) {
    if (_0x248223.removeTileExtendSprites) {
      _0x248223.removeTileExtendSprites();
    }
    if (_0x248223.createTileExtendSprites) {
      _0x248223.createTileExtendSprites();
    }
  }
};
VisuMZ.CoreEngine.Game_Character_processMoveCommand = Game_Character.prototype.processMoveCommand;
Game_Character.prototype.processMoveCommand = function (_0x53371d) {
  try {
    VisuMZ.CoreEngine.Game_Character_processMoveCommand.call(this, _0x53371d);
  } catch (_0x2d64ef) {
    if ($gameTemp.isPlaytest()) {
      console.log(_0x2d64ef);
    }
  }
};
Game_Player.prototype.makeEncounterCount = function () {
  const _0xc1d6b7 = $gameMap.encounterStep();
  this._encounterCount = Math.randomInt(_0xc1d6b7) + Math.randomInt(_0xc1d6b7) + this.encounterStepsMinimum();
};
Game_Player.prototype.encounterStepsMinimum = function () {
  return $dataMap && $dataMap.note && $dataMap.note.match(/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i) ? Number(RegExp.$1) : VisuMZ.CoreEngine.Settings.QoL.EncounterRateMinimum;
};
VisuMZ.CoreEngine.Game_Event_isCollidedWithEvents = Game_Event.prototype.isCollidedWithEvents;
Game_Event.prototype.isCollidedWithEvents = function (_0x232db6, _0x500fde) {
  return this.isSmartEventCollisionOn() ? this.checkSmartEventCollision(_0x232db6, _0x500fde) : VisuMZ.CoreEngine.Game_Event_isCollidedWithEvents.call(this, _0x232db6, _0x500fde);
};
Game_Event.prototype.isSmartEventCollisionOn = function () {
  return VisuMZ.CoreEngine.Settings.QoL.SmartEventCollisionPriority;
};
Game_Event.prototype.checkSmartEventCollision = function (_0x576c68, _0x318cec) {
  if (!this.isNormalPriority()) {
    return false;
  } else {
    const _0x4e5b94 = $gameMap.eventsXyNt(_0x576c68, _0x318cec).filter(_0x147084 => _0x147084.isNormalPriority());
    return _0x4e5b94.length > 0x0;
  }
};
VisuMZ.CoreEngine.Game_Interpreter_command105 = Game_Interpreter.prototype.command105;
Game_Interpreter.prototype.command105 = function (_0x4d7089) {
  const _0x54cc49 = this.getCombinedScrollingText();
  return _0x54cc49.match(/\/\/[ ]SCRIPT[ ]CALL/i) ? this.runCombinedScrollingTextAsCode(_0x54cc49) : VisuMZ.CoreEngine.Game_Interpreter_command105.call(this, _0x4d7089);
};
Game_Interpreter.prototype.getCombinedScrollingText = function () {
  let _0x13e90f = '';
  let _0x523f6e = this._index + 0x1;
  while (this._list[_0x523f6e] && this._list[_0x523f6e].code === 0x195) {
    _0x13e90f += this._list[_0x523f6e].parameters[0x0] + "\n";
    _0x523f6e++;
  }
  return _0x13e90f;
};
Game_Interpreter.prototype.runCombinedScrollingTextAsCode = function (_0x1aecc2) {
  try {
    eval(_0x1aecc2);
  } catch (_0x1dea0f) {
    if ($gameTemp.isPlaytest()) {
      console.log("Show Scrolling Text Script Error");
      console.log(_0x1dea0f);
    }
  }
  return true;
};
VisuMZ.CoreEngine.Game_Interpreter_command111 = Game_Interpreter.prototype.command111;
Game_Interpreter.prototype.command111 = function (_0x34366b) {
  try {
    VisuMZ.CoreEngine.Game_Interpreter_command111.call(this, _0x34366b);
  } catch (_0x1b743d) {
    if ($gameTemp.isPlaytest()) {
      console.log("Conditional Branch Script Error");
      console.log(_0x1b743d);
    }
    this.skipBranch();
  }
  return true;
};
VisuMZ.CoreEngine.Game_Interpreter_command122 = Game_Interpreter.prototype.command122;
Game_Interpreter.prototype.command122 = function (_0x478d49) {
  try {
    VisuMZ.CoreEngine.Game_Interpreter_command122.call(this, _0x478d49);
  } catch (_0xffb806) {
    if ($gameTemp.isPlaytest()) {
      console.log("Control Variables Script Error");
      console.log(_0xffb806);
    }
  }
  return true;
};
VisuMZ.CoreEngine.Game_Interpreter_command355 = Game_Interpreter.prototype.command355;
Game_Interpreter.prototype.command355 = function () {
  try {
    VisuMZ.CoreEngine.Game_Interpreter_command355.call(this);
  } catch (_0x5733f7) {
    if ($gameTemp.isPlaytest()) {
      console.log("Script Call Error");
      console.log(_0x5733f7);
    }
  }
  return true;
};
VisuMZ.CoreEngine.Game_Interpreter_PluginCommand = Game_Interpreter.prototype.command357;
Game_Interpreter.prototype.command357 = function (_0x53ce32) {
  $gameTemp.setLastPluginCommandInterpreter(this);
  return VisuMZ.CoreEngine.Game_Interpreter_PluginCommand.call(this, _0x53ce32);
};
Scene_Base.prototype.fadeSpeed = function () {
  return VisuMZ.CoreEngine.Settings.UI.FadeSpeed;
};
Scene_Base.prototype.isBottomHelpMode = function () {
  return VisuMZ.CoreEngine.Settings.UI.BottomHelp;
};
Scene_Base.prototype.isBottomButtonMode = function () {
  return VisuMZ.CoreEngine.Settings.UI.BottomButtons;
};
Scene_Base.prototype.isRightInputMode = function () {
  return VisuMZ.CoreEngine.Settings.UI.RightMenus;
};
Scene_Base.prototype.mainCommandWidth = function () {
  return VisuMZ.CoreEngine.Settings.UI.CommandWidth;
};
Scene_Base.prototype.buttonAreaHeight = function () {
  return VisuMZ.CoreEngine.Settings.UI.ButtonHeight;
};
Scene_Base.prototype.isWindowMaskingEnabled = function () {
  return VisuMZ.CoreEngine.Settings.Window.EnableMasking;
};
VisuMZ.CoreEngine.Scene_Base_createWindowLayer = Scene_Base.prototype.createWindowLayer;
Scene_Base.prototype.createWindowLayer = function () {
  VisuMZ.CoreEngine.Scene_Base_createWindowLayer.call(this);
  this.createButtonAssistWindow();
  this.createTextPopupWindow();
  this._windowLayer.x = Math.round(this._windowLayer.x);
  this._windowLayer.y = Math.round(this._windowLayer.y);
};
Scene_Base.prototype.createButtonAssistWindow = function () {};
Scene_Base.prototype.createTextPopupWindow = function () {
  this._textPopupWindow = new Window_TextPopup();
  this.addChild(this._textPopupWindow);
};
$textPopup = function (_0xd00936) {
  const _0x50a61c = SceneManager._scene._textPopupWindow;
  if (_0x50a61c) {
    _0x50a61c.addQueue(_0xd00936);
  }
};
Scene_Base.prototype.buttonAssistKey1 = function () {
  return TextManager.getInputMultiButtonStrings("pageup", 'pagedown');
};
Scene_Base.prototype.buttonAssistKey2 = function () {
  return TextManager.getInputButtonString('tab');
};
Scene_Base.prototype.buttonAssistKey3 = function () {
  return TextManager.getInputButtonString("shift");
};
Scene_Base.prototype.buttonAssistKey4 = function () {
  return TextManager.getInputButtonString('ok');
};
Scene_Base.prototype.buttonAssistKey5 = function () {
  return TextManager.getInputButtonString('cancel');
};
Scene_Base.prototype.buttonAssistText1 = function () {
  return this._pageupButton && this._pageupButton.visible ? TextManager.buttonAssistSwitch : '';
};
Scene_Base.prototype.buttonAssistText2 = function () {
  return '';
};
Scene_Base.prototype.buttonAssistText3 = function () {
  return '';
};
Scene_Base.prototype.buttonAssistText4 = function () {
  return TextManager.buttonAssistOk;
};
Scene_Base.prototype.buttonAssistText5 = function () {
  return TextManager.buttonAssistCancel;
};
Scene_Base.prototype.buttonAssistOffset1 = function () {
  return 0x0;
};
Scene_Base.prototype.buttonAssistOffset2 = function () {
  return 0x0;
};
Scene_Base.prototype.buttonAssistOffset3 = function () {
  return 0x0;
};
Scene_Base.prototype.buttonAssistOffset4 = function () {
  return 0x0;
};
Scene_Base.prototype.buttonAssistOffset5 = function () {
  return 0x0;
};
VisuMZ.CoreEngine.Scene_Boot_loadSystemImages = Scene_Boot.prototype.loadSystemImages;
Scene_Boot.prototype.loadSystemImages = function () {
  VisuMZ.CoreEngine.Scene_Boot_loadSystemImages.call(this);
  this.loadGameImagesCoreEngine();
};
Scene_Boot.prototype.loadGameImagesCoreEngine = function () {
  const _0x3c5d36 = ["animations", "battlebacks1", "battlebacks2", "characters", "enemies", "faces", "parallaxes", "pictures", "sv_actors", "sv_enemies", "system", "tilesets", 'titles1', "titles2"];
  for (const _0x3c80aa of _0x3c5d36) {
    const _0x354587 = VisuMZ.CoreEngine.Settings.ImgLoad[_0x3c80aa];
    const _0x58816d = "img/%1/".format(_0x3c80aa);
    for (const _0x2a8099 of _0x354587) {
      ImageManager.loadBitmap(_0x58816d, _0x2a8099);
    }
  }
};
VisuMZ.CoreEngine.Scene_Boot_startNormalGame = Scene_Boot.prototype.startNormalGame;
Scene_Boot.prototype.startNormalGame = function () {
  if (Utils.isOptionValid('test') && VisuMZ.CoreEngine.Settings.QoL.NewGameBoot) {
    this.startAutoNewGame();
  } else {
    VisuMZ.CoreEngine.Scene_Boot_startNormalGame.call(this);
  }
};
Scene_Boot.prototype.startAutoNewGame = function () {
  this.checkPlayerLocation();
  DataManager.setupNewGame();
  SceneManager.goto(Scene_Map);
};
Scene_Boot.prototype.adjustBoxSize = function () {
  const _0x212a44 = $dataSystem.advanced.uiAreaWidth;
  const _0x2446b1 = $dataSystem.advanced.uiAreaHeight;
  const _0x1115ec = VisuMZ.CoreEngine.Settings.UI.BoxMargin;
  Graphics.boxWidth = _0x212a44 - _0x1115ec * 0x2;
  Graphics.boxHeight = _0x2446b1 - _0x1115ec * 0x2;
  this.determineSideButtonLayoutValid();
};
VisuMZ.CoreEngine.Scene_Boot_updateDocumentTitle = Scene_Boot.prototype.updateDocumentTitle;
Scene_Boot.prototype.updateDocumentTitle = function () {
  if (this.isFullDocumentTitle()) {
    this.makeDocumentTitle();
  } else {
    VisuMZ.CoreEngine.Scene_Boot_updateDocumentTitle.call(this);
  }
};
Scene_Boot.prototype.isFullDocumentTitle = function () {
  if (Scene_Title.subtitle === '') {
    return false;
  }
  if (Scene_Title.subtitle === "Subtitle") {
    return false;
  }
  if (Scene_Title.version === '') {
    return false;
  }
  if (Scene_Title.version === '0.00') {
    return false;
  }
  return true;
};
Scene_Boot.prototype.makeDocumentTitle = function () {
  const _0x4449d8 = $dataSystem.gameTitle;
  const _0x4972fb = Scene_Title.subtitle || '';
  const _0x41d7db = Scene_Title.version || '';
  const _0x2c5fad = VisuMZ.CoreEngine.Settings.MenuLayout.Title.DocumentTitleFmt;
  const _0x3a03ff = _0x2c5fad.format(_0x4449d8, _0x4972fb, _0x41d7db);
  document.title = _0x3a03ff;
};
Scene_Boot.prototype.determineSideButtonLayoutValid = function () {
  if (VisuMZ.CoreEngine.Settings.UI.SideButtons) {
    const _0x31cd2d = Graphics.width - Graphics.boxWidth - VisuMZ.CoreEngine.Settings.UI.BoxMargin * 0x2;
    const _0x21eb39 = Sprite_Button.prototype.blockWidth.call(this) * 0x4;
    if (_0x31cd2d >= _0x21eb39) {
      SceneManager.setSideButtonLayout(true);
    }
  }
};
Scene_Title.subtitle = VisuMZ.CoreEngine.Settings.MenuLayout.Title.Subtitle;
Scene_Title.version = VisuMZ.CoreEngine.Settings.MenuLayout.Title.Version;
Scene_Title.pictureButtons = VisuMZ.CoreEngine.Settings.TitlePicButtons;
VisuMZ.CoreEngine.Scene_Title_drawGameTitle = Scene_Title.prototype.drawGameTitle;
Scene_Title.prototype.drawGameTitle = function () {
  VisuMZ.CoreEngine.Settings.MenuLayout.Title.drawGameTitle.call(this);
  if (Scene_Title.subtitle !== '' && Scene_Title.subtitle !== "Subtitle") {
    this.drawGameSubtitle();
  }
  if (Scene_Title.version !== '' && Scene_Title.version !== "0.00") {
    this.drawGameVersion();
  }
};
Scene_Title.prototype.drawGameSubtitle = function () {
  VisuMZ.CoreEngine.Settings.MenuLayout.Title.drawGameSubtitle.call(this);
};
Scene_Title.prototype.drawGameVersion = function () {
  VisuMZ.CoreEngine.Settings.MenuLayout.Title.drawGameVersion.call(this);
};
Scene_Title.prototype.createCommandWindow = function () {
  this.createTitleButtons();
  const _0x2c2d21 = $dataSystem.titleCommandWindow.background;
  const _0x81e923 = this.commandWindowRect();
  this._commandWindow = new Window_TitleCommand(_0x81e923);
  this._commandWindow.setBackgroundType(_0x2c2d21);
  const _0x4875dc = this.commandWindowRect();
  this._commandWindow.move(_0x4875dc.x, _0x4875dc.y, _0x4875dc.width, _0x4875dc.height);
  this._commandWindow.createContents();
  this._commandWindow.refresh();
  this._commandWindow.selectLast();
  this.addWindow(this._commandWindow);
};
Scene_Title.prototype.commandWindowRows = function () {
  return this._commandWindow ? this._commandWindow.maxItems() : VisuMZ.CoreEngine.Settings.TitleCommandList.length;
};
Scene_Title.prototype.commandWindowRect = function () {
  return VisuMZ.CoreEngine.Settings.MenuLayout.Title.CommandRect.call(this);
};
Scene_Title.prototype.createTitleButtons = function () {
  for (const _0xfd2c5a of Scene_Title.pictureButtons) {
    const _0x362753 = new Sprite_TitlePictureButton(_0xfd2c5a);
    this.addChild(_0x362753);
  }
};
VisuMZ.CoreEngine.Scene_Map_initialize = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function () {
  VisuMZ.CoreEngine.Scene_Map_initialize.call(this);
  $gameTemp.clearForcedGameTroopSettingsCoreEngine();
  this.clearOnceParallelInterpreters();
};
VisuMZ.CoreEngine.Scene_Map_updateMainMultiply = Scene_Map.prototype.updateMainMultiply;
Scene_Map.prototype.updateMainMultiply = function () {
  VisuMZ.CoreEngine.Scene_Map_updateMainMultiply.call(this);
  if ($gameTemp._playTestFastMode && !$gameMessage.isBusy()) {
    this.updateMain();
    SceneManager.updateEffekseer();
  }
};
Scene_Map.prototype.terminate = function () {
  Scene_Message.prototype.terminate.call(this);
  if (!SceneManager.isNextScene(Scene_Battle)) {
    this._spriteset.update();
    this._mapNameWindow.hide();
    this._windowLayer.visible = false;
    SceneManager.snapForBackground();
  }
  $gameScreen.clearZoom();
  this.clearOnceParallelInterpreters();
};
VisuMZ.CoreEngine.Scene_Map_createMenuButton = Scene_Map.prototype.createMenuButton;
Scene_Map.prototype.createMenuButton = function () {
  VisuMZ.CoreEngine.Scene_Map_createMenuButton.call(this);
  if (SceneManager.isSideButtonLayout()) {
    this.moveMenuButtonSideButtonLayout();
  }
};
Scene_Map.prototype.moveMenuButtonSideButtonLayout = function () {
  this._menuButton.x = Graphics.boxWidth + 0x4;
  this._menuButton.scale.set(3, 3);
  this._menuButton.x += 110;
  this._menuButton.y -= 50;
};
VisuMZ.CoreEngine.Scene_Map_updateScene = Scene_Map.prototype.updateScene;
Scene_Map.prototype.updateScene = function () {
  VisuMZ.CoreEngine.Scene_Map_updateScene.call(this);
  this.updateDashToggle();
};
Scene_Map.prototype.updateDashToggle = function () {
  if (Input.isTriggered("dashToggle")) {
    ConfigManager.alwaysDash = !ConfigManager.alwaysDash;
    ConfigManager.save();
  }
};
VisuMZ.CoreEngine.Scene_Map_updateMain = Scene_Map.prototype.updateMain;
Scene_Map.prototype.updateMain = function () {
  VisuMZ.CoreEngine.Scene_Map_updateMain.call(this);
  this.updateOnceParallelInterpreters();
};
Scene_Map.prototype.clearOnceParallelInterpreters = function () {
  this._onceParallelInterpreters = [];
};
Scene_Map.prototype.updateOnceParallelInterpreters = function () {
  if (!this._onceParallelInterpreters) {
    return;
  }
  for (const _0x1d1a77 of this._onceParallelInterpreters) {
    if (_0x1d1a77) {
      _0x1d1a77.update();
    }
  }
};
Scene_Map.prototype.playOnceParallelInterpreter = function (_0xff43f1, _0x4b893a) {
  const _0x3c22ad = $dataCommonEvents[_0xff43f1];
  if (!_0x3c22ad) {
    return;
  }
  const _0xd60432 = new Game_OnceParallelInterpreter();
  this.addOnceParallelInterpreter(_0xd60432);
  _0xd60432.setCommonEvent(_0xff43f1);
  _0xd60432.setEvent(_0x4b893a);
};
Scene_Map.prototype.addOnceParallelInterpreter = function (_0x30cf1d) {
  this._onceParallelInterpreters = this._onceParallelInterpreters || [];
  this._onceParallelInterpreters.push(_0x30cf1d);
};
Scene_Map.prototype.removeOnceParallelInterpreter = function (_0xf8e26e) {
  this._onceParallelInterpreters = this._onceParallelInterpreters || [];
  this._onceParallelInterpreters.remove(_0xf8e26e);
};
function Game_OnceParallelInterpreter() {
  this.initialize(...arguments);
}
Game_OnceParallelInterpreter.prototype = Object.create(Game_Interpreter.prototype);
Game_OnceParallelInterpreter.prototype.constructor = Game_OnceParallelInterpreter;
Game_OnceParallelInterpreter.prototype.setCommonEvent = function (_0x3d2263) {
  const _0x6d7946 = $dataCommonEvents[_0x3d2263];
  if (_0x6d7946) {
    this.setup(_0x6d7946.list, 0x0);
  } else {
    this.terminate();
  }
};
Game_OnceParallelInterpreter.prototype.setEvent = function (_0x32f30d) {
  this._eventId = _0x32f30d || 0x0;
};
Game_OnceParallelInterpreter.prototype.terminate = function () {
  if (!SceneManager.isSceneMap()) {
    return;
  }
  SceneManager._scene.removeOnceParallelInterpreter(this);
  Game_Interpreter.prototype.terminate.call(this);
};
VisuMZ.CoreEngine.Scene_MenuBase_helpAreaTop = Scene_MenuBase.prototype.helpAreaTop;
Scene_MenuBase.prototype.helpAreaTop = function () {
  let _0x557bdd = 0x0;
  if (SceneManager.areButtonsOutsideMainUI()) {
    _0x557bdd = this.helpAreaTopSideButtonLayout();
  } else {
    _0x557bdd = VisuMZ.CoreEngine.Scene_MenuBase_helpAreaTop.call(this);
  }
  return _0x557bdd;
};
Scene_MenuBase.prototype.helpAreaTopSideButtonLayout = function () {
  return this.isBottomHelpMode() ? this.mainAreaBottom() : 0x0;
};
VisuMZ.CoreEngine.Scene_MenuBase_mainAreaTop = Scene_MenuBase.prototype.mainAreaTop;
Scene_MenuBase.prototype.mainAreaTop = function () {
  return SceneManager.areButtonsOutsideMainUI() ? this.mainAreaTopSideButtonLayout() : VisuMZ.CoreEngine.Scene_MenuBase_mainAreaTop.call(this);
};
Scene_MenuBase.prototype.mainAreaTopSideButtonLayout = function () {
  if (!this.isBottomHelpMode()) {
    return this.helpAreaBottom();
  } else {
    return this.isMenuButtonAssistEnabled() && this.getButtonAssistLocation() === 'top' ? Window_ButtonAssist.prototype.lineHeight() : 0x0;
  }
};
VisuMZ.CoreEngine.Scene_MenuBase_mainAreaHeight = Scene_MenuBase.prototype.mainAreaHeight;
Scene_MenuBase.prototype.mainAreaHeight = function () {
  let _0x54adea = 0x0;
  if (SceneManager.areButtonsOutsideMainUI()) {
    _0x54adea = this.mainAreaHeightSideButtonLayout();
  } else {
    _0x54adea = VisuMZ.CoreEngine.Scene_MenuBase_mainAreaHeight.call(this);
  }
  if (this.isMenuButtonAssistEnabled() && this.getButtonAssistLocation() !== "button") {
    _0x54adea -= Window_ButtonAssist.prototype.lineHeight();
  }
  return _0x54adea;
};
Scene_MenuBase.prototype.mainAreaHeightSideButtonLayout = function () {
  return Graphics.boxHeight - this.helpAreaHeight();
};
VisuMZ.CoreEngine.Scene_MenuBase_createBackground = Scene_MenuBase.prototype.createBackground;
Scene_MenuBase.prototype.createBackground = function () {
  const _0x431916 = VisuMZ.CoreEngine.Settings.MenuBg.BlurStrength ?? 0x8;
  this._backgroundFilter = new PIXI.filters.BlurFilter(_0x431916);
  this._backgroundSprite = new Sprite();
  this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
  this._backgroundSprite.filters = [this._backgroundFilter];
  this.addChild(this._backgroundSprite);
  this.setBackgroundOpacity(0xc0);
  this.setBackgroundOpacity(this.getBackgroundOpacity());
  this.createCustomBackgroundImages();
};
Scene_MenuBase.prototype.getBackgroundOpacity = function () {
  const _0x554e43 = String(this.constructor.name);
  const _0x59cf70 = this.getCustomBackgroundSettings(_0x554e43);
  return _0x59cf70 ? _0x59cf70.SnapshotOpacity : 0xc0;
};
Scene_MenuBase.prototype.createCustomBackgroundImages = function () {
  const _0xdfcab4 = String(this.constructor.name);
  const _0x4a02f6 = this.getCustomBackgroundSettings(_0xdfcab4);
  if (_0x4a02f6 && (_0x4a02f6.BgFilename1 !== '' || _0x4a02f6.BgFilename2 !== '')) {
    this._backSprite1 = new Sprite(ImageManager.loadTitle1(_0x4a02f6.BgFilename1));
    this._backSprite2 = new Sprite(ImageManager.loadTitle2(_0x4a02f6.BgFilename2));
    this.addChild(this._backSprite1);
    this.addChild(this._backSprite2);
    this._backSprite1.bitmap.addLoadListener(this.adjustSprite.bind(this, this._backSprite1));
    this._backSprite2.bitmap.addLoadListener(this.adjustSprite.bind(this, this._backSprite2));
  }
};
Scene_MenuBase.prototype.getCustomBackgroundSettings = function (_0x4ddd3b) {
  return VisuMZ.CoreEngine.Settings.MenuBg[_0x4ddd3b] || VisuMZ.CoreEngine.Settings.MenuBg.Scene_Unlisted;
};
Scene_MenuBase.prototype.adjustSprite = function (_0x4d230e) {
  this.scaleSprite(_0x4d230e);
  this.centerSprite(_0x4d230e);
};
VisuMZ.CoreEngine.Scene_MenuBase_createCancelButton = Scene_MenuBase.prototype.createCancelButton;
Scene_MenuBase.prototype.createCancelButton = function () {
  VisuMZ.CoreEngine.Scene_MenuBase_createCancelButton.call(this);
  if (SceneManager.isSideButtonLayout()) {
    this.moveCancelButtonSideButtonLayout();
  }
};
Scene_MenuBase.prototype.moveCancelButtonSideButtonLayout = function () {
  this._cancelButton.x = Graphics.boxWidth + 0x4;
};
VisuMZ.CoreEngine.Scene_MenuBase_createPageButtons = Scene_MenuBase.prototype.createPageButtons;
Scene_MenuBase.prototype.createPageButtons = function () {
  VisuMZ.CoreEngine.Scene_MenuBase_createPageButtons.call(this);
  if (SceneManager.isSideButtonLayout()) {
    this.movePageButtonSideButtonLayout();
  }
};
Scene_MenuBase.prototype.movePageButtonSideButtonLayout = function () {
  this._pageupButton.x = -0x1 * (this._pageupButton.width + this._pagedownButton.width + 0x8);
  this._pagedownButton.x = -0x1 * (this._pagedownButton.width + 0x4);
};
Scene_MenuBase.prototype.isMenuButtonAssistEnabled = function () {
  return VisuMZ.CoreEngine.Settings.ButtonAssist.Enable;
};
Scene_MenuBase.prototype.getButtonAssistLocation = function () {
  return SceneManager.isSideButtonLayout() || SceneManager.areButtonsHidden() ? VisuMZ.CoreEngine.Settings.ButtonAssist.Location : "button";
};
Scene_MenuBase.prototype.createButtonAssistWindow = function () {
  if (!this.isMenuButtonAssistEnabled()) {
    return;
  }
  const _0x7d3986 = this.buttonAssistWindowRect();
  this._buttonAssistWindow = new Window_ButtonAssist(_0x7d3986);
  this.addWindow(this._buttonAssistWindow);
};
Scene_MenuBase.prototype.buttonAssistWindowRect = function () {
  return this.getButtonAssistLocation() === "button" ? this.buttonAssistWindowButtonRect() : this.buttonAssistWindowSideRect();
};
Scene_MenuBase.prototype.buttonAssistWindowButtonRect = function () {
  const _0x25e96b = ConfigManager.touchUI ? (Sprite_Button.prototype.blockWidth() + 0x6) * 0x2 : 0x0;
  const _0xc5202f = this.buttonY();
  const _0x220771 = Graphics.boxWidth - _0x25e96b * 0x2;
  const _0xeb7a56 = this.buttonAreaHeight();
  return new Rectangle(_0x25e96b, _0xc5202f, _0x220771, _0xeb7a56);
};
Scene_MenuBase.prototype.buttonAssistWindowSideRect = function () {
  const _0x4c0619 = Graphics.boxWidth;
  const _0x2e1669 = Window_ButtonAssist.prototype.lineHeight();
  let _0x1df100 = 0x0;
  if (this.getButtonAssistLocation() === "top") {
    _0x1df100 = 0x0;
  } else {
    _0x1df100 = Graphics.boxHeight - _0x2e1669;
  }
  return new Rectangle(0x0, _0x1df100, _0x4c0619, _0x2e1669);
};
Scene_Menu.layoutSettings = VisuMZ.CoreEngine.Settings.MenuLayout.MainMenu;
VisuMZ.CoreEngine.Scene_Menu_create = Scene_Menu.prototype.create;
Scene_Menu.prototype.create = function () {
  VisuMZ.CoreEngine.Scene_Menu_create.call(this);
  this.setCoreEngineUpdateWindowBg();
};
Scene_Menu.prototype.setCoreEngineUpdateWindowBg = function () {
  if (this._commandWindow) {
    this._commandWindow.setBackgroundType(Scene_Menu.layoutSettings.CommandBgType);
  }
  if (this._goldWindow) {
    this._goldWindow.setBackgroundType(Scene_Menu.layoutSettings.GoldBgType);
  }
  if (this._statusWindow) {
    this._statusWindow.setBackgroundType(Scene_Menu.layoutSettings.StatusBgType);
  }
};
Scene_Menu.prototype.commandWindowRect = function () {
  return Scene_Menu.layoutSettings.CommandRect.call(this);
};
Scene_Menu.prototype.goldWindowRect = function () {
  return Scene_Menu.layoutSettings.GoldRect.call(this);
};
Scene_Menu.prototype.statusWindowRect = function () {
  return Scene_Menu.layoutSettings.StatusRect.call(this);
};
Scene_Item.layoutSettings = VisuMZ.CoreEngine.Settings.MenuLayout.ItemMenu;
VisuMZ.CoreEngine.Scene_Item_create = Scene_Item.prototype.create;
Scene_Item.prototype.create = function () {
  VisuMZ.CoreEngine.Scene_Item_create.call(this);
  this.setCoreEngineUpdateWindowBg();
};
Scene_Item.prototype.setCoreEngineUpdateWindowBg = function () {
  if (this._helpWindow) {
    this._helpWindow.setBackgroundType(Scene_Item.layoutSettings.HelpBgType);
  }
  if (this._categoryWindow) {
    this._categoryWindow.setBackgroundType(Scene_Item.layoutSettings.CategoryBgType);
  }
  if (this._itemWindow) {
    this._itemWindow.setBackgroundType(Scene_Item.layoutSettings.ItemBgType);
  }
  if (this._actorWindow) {
    this._actorWindow.setBackgroundType(Scene_Item.layoutSettings.ActorBgType);
  }
};
Scene_Item.prototype.helpWindowRect = function () {
  return Scene_Item.layoutSettings.HelpRect.call(this);
};
Scene_Item.prototype.categoryWindowRect = function () {
  return Scene_Item.layoutSettings.CategoryRect.call(this);
};
Scene_Item.prototype.itemWindowRect = function () {
  return Scene_Item.layoutSettings.ItemRect.call(this);
};
Scene_Item.prototype.actorWindowRect = function () {
  return Scene_Item.layoutSettings.ActorRect.call(this);
};
Scene_Skill.layoutSettings = VisuMZ.CoreEngine.Settings.MenuLayout.SkillMenu;
VisuMZ.CoreEngine.Scene_Skill_create = Scene_Skill.prototype.create;
Scene_Skill.prototype.create = function () {
  VisuMZ.CoreEngine.Scene_Skill_create.call(this);
  this.setCoreEngineUpdateWindowBg();
};
Scene_Skill.prototype.setCoreEngineUpdateWindowBg = function () {
  if (this._helpWindow) {
    this._helpWindow.setBackgroundType(Scene_Skill.layoutSettings.HelpBgType);
  }
  if (this._skillTypeWindow) {
    this._skillTypeWindow.setBackgroundType(Scene_Skill.layoutSettings.SkillTypeBgType);
  }
  if (this._statusWindow) {
    this._statusWindow.setBackgroundType(Scene_Skill.layoutSettings.StatusBgType);
  }
  if (this._itemWindow) {
    this._itemWindow.setBackgroundType(Scene_Skill.layoutSettings.ItemBgType);
  }
  if (this._actorWindow) {
    this._actorWindow.setBackgroundType(Scene_Skill.layoutSettings.ActorBgType);
  }
};
Scene_Skill.prototype.helpWindowRect = function () {
  return Scene_Skill.layoutSettings.HelpRect.call(this);
};
Scene_Skill.prototype.skillTypeWindowRect = function () {
  return Scene_Skill.layoutSettings.SkillTypeRect.call(this);
};
Scene_Skill.prototype.statusWindowRect = function () {
  return Scene_Skill.layoutSettings.StatusRect.call(this);
};
Scene_Skill.prototype.itemWindowRect = function () {
  return Scene_Skill.layoutSettings.ItemRect.call(this);
};
Scene_Skill.prototype.actorWindowRect = function () {
  return Scene_Skill.layoutSettings.ActorRect.call(this);
};
Scene_Equip.layoutSettings = VisuMZ.CoreEngine.Settings.MenuLayout.EquipMenu;
VisuMZ.CoreEngine.Scene_Equip_create = Scene_Equip.prototype.create;
Scene_Equip.prototype.create = function () {
  VisuMZ.CoreEngine.Scene_Equip_create.call(this);
  this.setCoreEngineUpdateWindowBg();
};
Scene_Equip.prototype.setCoreEngineUpdateWindowBg = function () {
  if (this._helpWindow) {
    this._helpWindow.setBackgroundType(Scene_Equip.layoutSettings.HelpBgType);
  }
  if (this._statusWindow) {
    this._statusWindow.setBackgroundType(Scene_Equip.layoutSettings.StatusBgType);
  }
  if (this._commandWindow) {
    this._commandWindow.setBackgroundType(Scene_Equip.layoutSettings.CommandBgType);
  }
  if (this._slotWindow) {
    this._slotWindow.setBackgroundType(Scene_Equip.layoutSettings.SlotBgType);
  }
  if (this._itemWindow) {
    this._itemWindow.setBackgroundType(Scene_Equip.layoutSettings.ItemBgType);
  }
};
Scene_Equip.prototype.helpWindowRect = function () {
  return Scene_Equip.layoutSettings.HelpRect.call(this);
};
Scene_Equip.prototype.statusWindowRect = function () {
  return Scene_Equip.layoutSettings.StatusRect.call(this);
};
Scene_Equip.prototype.commandWindowRect = function () {
  return Scene_Equip.layoutSettings.CommandRect.call(this);
};
Scene_Equip.prototype.slotWindowRect = function () {
  return Scene_Equip.layoutSettings.SlotRect.call(this);
};
Scene_Equip.prototype.itemWindowRect = function () {
  return Scene_Equip.layoutSettings.ItemRect.call(this);
};
Scene_Status.layoutSettings = VisuMZ.CoreEngine.Settings.MenuLayout.StatusMenu;
VisuMZ.CoreEngine.Scene_Status_create = Scene_Status.prototype.create;
Scene_Status.prototype.create = function () {
  VisuMZ.CoreEngine.Scene_Status_create.call(this);
  this.setCoreEngineUpdateWindowBg();
};
Scene_Status.prototype.setCoreEngineUpdateWindowBg = function () {
  if (this._profileWindow) {
    this._profileWindow.setBackgroundType(Scene_Status.layoutSettings.ProfileBgType);
  }
  if (this._statusWindow) {
    this._statusWindow.setBackgroundType(Scene_Status.layoutSettings.StatusBgType);
  }
  if (this._statusParamsWindow) {
    this._statusParamsWindow.setBackgroundType(Scene_Status.layoutSettings.StatusParamsBgType);
  }
  if (this._statusEquipWindow) {
    this._statusEquipWindow.setBackgroundType(Scene_Status.layoutSettings.StatusEquipBgType);
  }
};
Scene_Status.prototype.profileWindowRect = function () {
  return Scene_Status.layoutSettings.ProfileRect.call(this);
};
Scene_Status.prototype.statusWindowRect = function () {
  return Scene_Status.layoutSettings.StatusRect.call(this);
};
Scene_Status.prototype.statusParamsWindowRect = function () {
  return Scene_Status.layoutSettings.StatusParamsRect.call(this);
};
Scene_Status.prototype.statusEquipWindowRect = function () {
  return Scene_Status.layoutSettings.StatusEquipRect.call(this);
};
Scene_Options.layoutSettings = VisuMZ.CoreEngine.Settings.MenuLayout.OptionsMenu;
VisuMZ.CoreEngine.Scene_Options_create = Scene_Options.prototype.create;
Scene_Options.prototype.create = function () {
  VisuMZ.CoreEngine.Scene_Options_create.call(this);
  this.setCoreEngineUpdateWindowBg();
};
Scene_Options.prototype.setCoreEngineUpdateWindowBg = function () {
  if (this._optionsWindow) {
    this._optionsWindow.setBackgroundType(Scene_Options.layoutSettings.OptionsBgType);
  }
};
Scene_Options.prototype.optionsWindowRect = function () {
  return Scene_Options.layoutSettings.OptionsRect.call(this);
};
Scene_Save.layoutSettings = VisuMZ.CoreEngine.Settings.MenuLayout.SaveMenu;
Scene_Save.prototype.create = function () {
  Scene_File.prototype.create.call(this);
  this.setCoreEngineUpdateWindowBg();
};
Scene_Save.prototype.setCoreEngineUpdateWindowBg = function () {
  if (this._helpWindow) {
    this._helpWindow.setBackgroundType(Scene_Save.layoutSettings.HelpBgType);
  }
  if (this._listWindow) {
    this._listWindow.setBackgroundType(Scene_Save.layoutSettings.ListBgType);
  }
};
Scene_Save.prototype.helpWindowRect = function () {
  return Scene_Save.layoutSettings.HelpRect.call(this);
};
Scene_Save.prototype.listWindowRect = function () {
  return Scene_Save.layoutSettings.ListRect.call(this);
};
Scene_Load.layoutSettings = VisuMZ.CoreEngine.Settings.MenuLayout.LoadMenu;
Scene_Load.prototype.create = function () {
  Scene_File.prototype.create.call(this);
  this.setCoreEngineUpdateWindowBg();
};
Scene_Load.prototype.setCoreEngineUpdateWindowBg = function () {
  if (this._helpWindow) {
    this._helpWindow.setBackgroundType(Scene_Load.layoutSettings.HelpBgType);
  }
  if (this._listWindow) {
    this._listWindow.setBackgroundType(Scene_Load.layoutSettings.ListBgType);
  }
};
Scene_Load.prototype.helpWindowRect = function () {
  return Scene_Load.layoutSettings.HelpRect.call(this);
};
Scene_Load.prototype.listWindowRect = function () {
  return Scene_Load.layoutSettings.ListRect.call(this);
};
function Scene_QuickLoad() {
  this.initialize(...arguments);
}
Scene_QuickLoad.prototype = Object.create(Scene_Load.prototype);
Scene_QuickLoad.prototype.constructor = Scene_QuickLoad;
Scene_QuickLoad.prototype.initialize = function () {
  Scene_Load.prototype.initialize.call(this);
};
Scene_QuickLoad.prototype.create = function () {
  this.executeLoad(this._saveFileID);
};
Scene_QuickLoad.prototype.prepare = function (_0x2d952e) {
  this._saveFileID = _0x2d952e;
};
Scene_QuickLoad.prototype.start = function () {
  Scene_MenuBase.prototype.start.call(this);
};
Scene_GameEnd.layoutSettings = VisuMZ.CoreEngine.Settings.MenuLayout.GameEnd;
VisuMZ.CoreEngine.Scene_GameEnd_createBackground = Scene_GameEnd.prototype.createBackground;
Scene_GameEnd.prototype.createBackground = function () {
  Scene_MenuBase.prototype.createBackground.call(this);
};
Scene_GameEnd.prototype.createCommandWindow = function () {
  const _0x584e3b = this.commandWindowRect();
  this._commandWindow = new Window_GameEnd(_0x584e3b);
  this._commandWindow.setHandler("cancel", this.popScene.bind(this));
  this.addWindow(this._commandWindow);
  this._commandWindow.setBackgroundType(Scene_GameEnd.layoutSettings.CommandBgType);
};
Scene_GameEnd.prototype.commandWindowRect = function () {
  return Scene_GameEnd.layoutSettings.CommandRect.call(this);
};
Scene_Shop.layoutSettings = VisuMZ.CoreEngine.Settings.MenuLayout.ShopMenu;
VisuMZ.CoreEngine.Scene_Shop_create = Scene_Shop.prototype.create;
Scene_Shop.prototype.create = function () {
  VisuMZ.CoreEngine.Scene_Shop_create.call(this);
  this.setCoreEngineUpdateWindowBg();
};
Scene_Shop.prototype.setCoreEngineUpdateWindowBg = function () {
  if (this._helpWindow) {
    this._helpWindow.setBackgroundType(Scene_Shop.layoutSettings.HelpBgType);
  }
  if (this._goldWindow) {
    this._goldWindow.setBackgroundType(Scene_Shop.layoutSettings.GoldBgType);
  }
  if (this._commandWindow) {
    this._commandWindow.setBackgroundType(Scene_Shop.layoutSettings.CommandBgType);
  }
  if (this._dummyWindow) {
    this._dummyWindow.setBackgroundType(Scene_Shop.layoutSettings.DummyBgType);
  }
  if (this._numberWindow) {
    this._numberWindow.setBackgroundType(Scene_Shop.layoutSettings.NumberBgType);
  }
  if (this._statusWindow) {
    this._statusWindow.setBackgroundType(Scene_Shop.layoutSettings.StatusBgType);
  }
  if (this._buyWindow) {
    this._buyWindow.setBackgroundType(Scene_Shop.layoutSettings.BuyBgType);
  }
  if (this._categoryWindow) {
    this._categoryWindow.setBackgroundType(Scene_Shop.layoutSettings.CategoryBgType);
  }
  if (this._sellWindow) {
    this._sellWindow.setBackgroundType(Scene_Shop.layoutSettings.SellBgType);
  }
};
Scene_Shop.prototype.helpWindowRect = function () {
  return Scene_Shop.layoutSettings.HelpRect.call(this);
};
Scene_Shop.prototype.goldWindowRect = function () {
  return Scene_Shop.layoutSettings.GoldRect.call(this);
};
Scene_Shop.prototype.commandWindowRect = function () {
  return Scene_Shop.layoutSettings.CommandRect.call(this);
};
Scene_Shop.prototype.dummyWindowRect = function () {
  return Scene_Shop.layoutSettings.DummyRect.call(this);
};
Scene_Shop.prototype.numberWindowRect = function () {
  return Scene_Shop.layoutSettings.NumberRect.call(this);
};
Scene_Shop.prototype.statusWindowRect = function () {
  return Scene_Shop.layoutSettings.StatusRect.call(this);
};
Scene_Shop.prototype.buyWindowRect = function () {
  return Scene_Shop.layoutSettings.BuyRect.call(this);
};
Scene_Shop.prototype.categoryWindowRect = function () {
  return Scene_Shop.layoutSettings.CategoryRect.call(this);
};
Scene_Shop.prototype.sellWindowRect = function () {
  return Scene_Shop.layoutSettings.SellRect.call(this);
};
Scene_Name.layoutSettings = VisuMZ.CoreEngine.Settings.MenuLayout.NameMenu;
VisuMZ.CoreEngine.Scene_Name_create = Scene_Name.prototype.create;
Scene_Name.prototype.create = function () {
  VisuMZ.CoreEngine.Scene_Name_create.call(this);
  this.setCoreEngineUpdateWindowBg();
};
Scene_Name.prototype.setCoreEngineUpdateWindowBg = function () {
  if (this._editWindow) {
    this._editWindow.setBackgroundType(Scene_Name.layoutSettings.EditBgType);
  }
  if (this._inputWindow) {
    this._inputWindow.setBackgroundType(Scene_Name.layoutSettings.InputBgType);
  }
};
Scene_Name.prototype.helpAreaHeight = function () {
  return 0x0;
};
Scene_Name.prototype.editWindowRect = function () {
  return Scene_Name.layoutSettings.EditRect.call(this);
};
Scene_Name.prototype.inputWindowRect = function () {
  return Scene_Name.layoutSettings.InputRect.call(this);
};
Scene_Name.prototype.EnableNameInput = function () {
  if (!this._inputWindow) {
    return false;
  }
  return VisuMZ.CoreEngine.Settings.KeyboardInput.EnableNameInput;
};
Scene_Name.prototype.buttonAssistKey1 = function () {
  if (this.EnableNameInput() && this._inputWindow._mode !== "keyboard") {
    return TextManager.getInputMultiButtonStrings('pageup', "pagedown");
  }
  return Scene_MenuBase.prototype.buttonAssistKey1.call(this);
};
Scene_Name.prototype.buttonAssistKey3 = function () {
  return this.EnableNameInput() ? TextManager.getInputButtonString("tab") : Scene_MenuBase.prototype.buttonAssistKey3.call(this);
};
Scene_Name.prototype.buttonAssistKey4 = function () {
  if (this.EnableNameInput() && this._inputWindow._mode === 'keyboard') {
    return TextManager.makeInputButtonString(["ENTER"]);
  }
  return Scene_MenuBase.prototype.buttonAssistKey4.call(this);
};
Scene_Name.prototype.buttonAssistKey5 = function () {
  if (this.EnableNameInput() && this._inputWindow._mode === 'keyboard') {
    return TextManager.makeInputButtonString(["BKSP"]);
  }
  return Scene_MenuBase.prototype.buttonAssistKey5.call(this);
};
Scene_Name.prototype.buttonAssistText1 = function () {
  if (this.EnableNameInput() && this._inputWindow._mode !== "keyboard") {
    const _0x3cde3d = VisuMZ.CoreEngine.Settings.KeyboardInput;
    return _0x3cde3d.PageChange || 'Page';
  }
  return Scene_MenuBase.prototype.buttonAssistText1.call(this);
};
Scene_Name.prototype.buttonAssistText3 = function () {
  if (this.EnableNameInput()) {
    const _0x19e4c7 = VisuMZ.CoreEngine.Settings.KeyboardInput;
    return this._inputWindow._mode === "keyboard" ? _0x19e4c7.Keyboard || "Keyboard" : _0x19e4c7.Manual || "Manual";
  } else {
    return Scene_MenuBase.prototype.buttonAssistText3.call(this);
  }
};
Scene_Name.prototype.buttonAssistText4 = function () {
  if (this.EnableNameInput()) {
    const _0x38bf6a = VisuMZ.CoreEngine.Settings.KeyboardInput;
    if (this._inputWindow._mode === "keyboard") {
      return _0x38bf6a.Finish || "Finish";
    }
  }
  return Scene_MenuBase.prototype.buttonAssistText4.call(this);
};
VisuMZ.CoreEngine.Scene_Name_onInputOk = Scene_Name.prototype.onInputOk;
Scene_Name.prototype.onInputOk = function () {
  if (this.doesNameContainBannedWords()) {
    this.onInputBannedWords();
  } else {
    VisuMZ.CoreEngine.Scene_Name_onInputOk.call(this);
  }
};
Scene_Name.prototype.doesNameContainBannedWords = function () {
  const _0x4ed284 = VisuMZ.CoreEngine.Settings.KeyboardInput;
  if (!_0x4ed284) {
    return false;
  }
  const _0x489748 = _0x4ed284.BannedWords;
  if (!_0x489748) {
    return false;
  }
  const _0xd951e3 = this._editWindow.name().toLowerCase();
  for (const _0x3e3d31 of _0x489748) {
    if (_0xd951e3.includes(_0x3e3d31.toLowerCase())) {
      return true;
    }
  }
  return false;
};
Scene_Name.prototype.onInputBannedWords = function () {
  SoundManager.playBuzzer();
};
VisuMZ.CoreEngine.Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function () {
  VisuMZ.CoreEngine.Scene_Battle_update.call(this);
  if ($gameTemp._playTestFastMode) {
    this.updatePlayTestF7();
  }
};
Scene_Battle.prototype.updatePlayTestF7 = function () {
  if (!BattleManager.isInputting() && !this._playtestF7Looping && !$gameMessage.isBusy()) {
    this._playtestF7Looping = true;
    this.update();
    SceneManager.updateEffekseer();
    this._playtestF7Looping = false;
  }
};
VisuMZ.CoreEngine.Scene_Battle_createCancelButton = Scene_Battle.prototype.createCancelButton;
Scene_Battle.prototype.createCancelButton = function () {
  VisuMZ.CoreEngine.Scene_Battle_createCancelButton.call(this);
  if (SceneManager.isSideButtonLayout()) {
    this.repositionCancelButtonSideButtonLayout();
  }
};
Scene_Battle.prototype.repositionCancelButtonSideButtonLayout = function () {
  this._cancelButton.x = Graphics.boxWidth + 0x4;
  if (this.isBottomButtonMode()) {
    this._cancelButton.y = Graphics.boxHeight - this.buttonAreaHeight();
  } else {
    this._cancelButton.y = 0x0;
  }
};
VisuMZ.CoreEngine.Sprite_Button_initialize = Sprite_Button.prototype.initialize;
Sprite_Button.prototype.initialize = function (_0x15004f) {
  VisuMZ.CoreEngine.Sprite_Button_initialize.call(this, _0x15004f);
  this.initButtonHidden();
};
Sprite_Button.prototype.initButtonHidden = function () {
  const _0x3ea903 = VisuMZ.CoreEngine.Settings.UI;
  this._isButtonHidden = false;
  switch (this._buttonType) {
    case 'cancel':
      this._isButtonHidden = !_0x3ea903.cancelShowButton;
      break;
    case "pageup":
    case 'pagedown':
      this._isButtonHidden = !_0x3ea903.pagedownShowButton;
      break;
    case "down":
    case 'up':
    case 'down2':
    case "up2":
    case 'ok':
      this._isButtonHidden = !_0x3ea903.numberShowButton;
      break;
    case 'menu':
      this._isButtonHidden = !_0x3ea903.menuShowButton;
      break;
  }
};
VisuMZ.CoreEngine.Sprite_Button_updateOpacity = Sprite_Button.prototype.updateOpacity;
Sprite_Button.prototype.updateOpacity = function () {
  if (SceneManager.areButtonsHidden() || this._isButtonHidden) {
    this.hideButtonFromView();
  } else {
    VisuMZ.CoreEngine.Sprite_Button_updateOpacity.call(this);
  }
};
Sprite_Button.prototype.hideButtonFromView = function () {
  this.visible = false;
  this.opacity = 0x0;
  this.x = Graphics.width * 0xa;
  this.y = Graphics.height * 0xa;
};
VisuMZ.CoreEngine.Sprite_Battler_startMove = Sprite_Battler.prototype.startMove;
Sprite_Battler.prototype.startMove = function (_0x4d69ba, _0x5c7155, _0x4a748c) {
  if (this._targetOffsetX !== _0x4d69ba || this._targetOffsetY !== _0x5c7155) {
    this.setMoveEasingType('Linear');
    this._movementWholeDuration = _0x4a748c;
  }
  VisuMZ.CoreEngine.Sprite_Battler_startMove.call(this, _0x4d69ba, _0x5c7155, _0x4a748c);
};
Sprite_Battler.prototype.setMoveEasingType = function (_0x5028a5) {
  this._moveEasingType = _0x5028a5;
};
Sprite_Battler.prototype.updateMove = function () {
  if (this._movementDuration <= 0x0) {
    return;
  }
  const _0xc6a9b5 = this._movementDuration;
  const _0x3f2568 = this._movementWholeDuration;
  const _0x5b0b4c = this._moveEasingType;
  this._offsetX = this.applyEasing(this._offsetX, this._targetOffsetX, _0xc6a9b5, _0x3f2568, _0x5b0b4c);
  this._offsetY = this.applyEasing(this._offsetY, this._targetOffsetY, _0xc6a9b5, _0x3f2568, _0x5b0b4c);
  this._movementDuration--;
  if (this._movementDuration <= 0x0) {
    this.onMoveEnd();
  }
};
Sprite_Battler.prototype.applyEasing = function (_0x298a15, _0x3f90d7, _0x2cfe8b, _0x3c75de, _0x2ad348) {
  const _0x2cdf89 = VisuMZ.ApplyEasing((_0x3c75de - _0x2cfe8b) / _0x3c75de, _0x2ad348 || "Linear");
  const _0x388b77 = VisuMZ.ApplyEasing((_0x3c75de - _0x2cfe8b + 0x1) / _0x3c75de, _0x2ad348 || "Linear");
  const _0x2900d3 = (_0x298a15 - _0x3f90d7 * _0x2cdf89) / (0x1 - _0x2cdf89);
  return _0x2900d3 + (_0x3f90d7 - _0x2900d3) * _0x388b77;
};
VisuMZ.CoreEngine.Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome;
Sprite_Actor.prototype.setActorHome = function (_0x20a784) {
  if (VisuMZ.CoreEngine.Settings.UI.RepositionActors) {
    this.setActorHomeRepositioned(_0x20a784);
  } else {
    VisuMZ.CoreEngine.Sprite_Actor_setActorHome.call(this, _0x20a784);
  }
};
Sprite_Actor.prototype.setActorHomeRepositioned = function (_0x31044a) {
  let _0x447e5a = Math.round(Graphics.width / 0x2 + 0xc0);
  _0x447e5a -= Math.floor((Graphics.width - Graphics.boxWidth) / 0x2);
  _0x447e5a += _0x31044a * 0x20;
  let _0x19102c = Graphics.height - 0xc8 - $gameParty.maxBattleMembers() * 0x30;
  _0x19102c -= Math.floor((Graphics.height - Graphics.boxHeight) / 0x2);
  _0x19102c += _0x31044a * 0x30;
  this.setHome(_0x447e5a, _0x19102c);
};
Sprite_Actor.prototype.retreat = function () {
  this.startMove(0x4b0, 0x0, 0x78);
};
Sprite_Animation.prototype.setMute = function (_0x3bfd4f) {
  this._muteSound = _0x3bfd4f;
};
VisuMZ.CoreEngine.Sprite_Animation_processSoundTimings = Sprite_Animation.prototype.processSoundTimings;
Sprite_Animation.prototype.processSoundTimings = function () {
  if (this._muteSound) {
    return;
  }
  VisuMZ.CoreEngine.Sprite_Animation_processSoundTimings.call(this);
};
VisuMZ.CoreEngine.Sprite_Animation_setViewport = Sprite_Animation.prototype.setViewport;
Sprite_Animation.prototype.setViewport = function (_0x194e2c) {
  if (this.isAnimationOffsetXMirrored()) {
    this.setViewportCoreEngineFix(_0x194e2c);
  } else {
    VisuMZ.CoreEngine.Sprite_Animation_setViewport.call(this, _0x194e2c);
  }
};
Sprite_Animation.prototype.isAnimationOffsetXMirrored = function () {
  if (!this._animation) {
    return false;
  }
  const _0x3fcea5 = this._animation.name || '';
  if (_0x3fcea5.match(/<MIRROR OFFSET X>/i)) {
    return true;
  }
  if (_0x3fcea5.match(/<NO MIRROR OFFSET X>/i)) {
    return false;
  }
  return VisuMZ.CoreEngine.Settings.QoL.AnimationMirrorOffset;
};
Sprite_Animation.prototype.setViewportCoreEngineFix = function (_0x4f234c) {
  const _0x1ce865 = this._viewportSize;
  const _0x42d1ea = this._viewportSize;
  const _0x9e3ecc = this._animation.offsetX * (this._mirror ? -0x1 : 0x1) - _0x1ce865 / 0x2;
  const _0x4d2777 = this._animation.offsetY - _0x42d1ea / 0x2;
  const _0x46263c = this.targetPosition(_0x4f234c);
  _0x4f234c.gl.viewport(_0x9e3ecc + _0x46263c.x, _0x4d2777 + _0x46263c.y, _0x1ce865, _0x42d1ea);
};
Sprite_Animation.prototype.targetSpritePosition = function (_0x35b0d1) {
  if (_0x35b0d1._mainSprite) {}
  const _0x4f0b79 = this._animation.name;
  let _0xe59926 = _0x35b0d1.height * _0x35b0d1.scale.y;
  let _0x3a05ea = 0x0;
  let _0x2a302d = -_0xe59926 / 0x2;
  if (_0x4f0b79.match(/<(?:HEAD|HEADER|TOP)>/i)) {
    _0x2a302d = -_0xe59926;
  }
  if (_0x4f0b79.match(/<(?:FOOT|FOOTER|BOTTOM)>/i)) {
    _0x2a302d = 0x0;
  }
  if (this._animation.alignBottom) {
    _0x2a302d = 0x0;
  }
  if (_0x4f0b79.match(/<(?:LEFT)>/i)) {
    _0x3a05ea = -_0x35b0d1.width / 0x2;
  }
  if (_0x4f0b79.match(/<(?:RIGHT)>/i)) {
    _0x3a05ea = _0x35b0d1.width / 0x2;
  }
  if (_0x4f0b79.match(/<ANCHOR X:[ ](\d+\.?\d*)>/i)) {
    _0x3a05ea = Number(RegExp.$1) * _0x35b0d1.width;
  }
  if (_0x4f0b79.match(/<ANCHOR Y:[ ](\d+\.?\d*)>/i)) {
    _0x2a302d = (0x1 - Number(RegExp.$1)) * -_0xe59926;
  }
  if (_0x4f0b79.match(/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)) {
    _0x3a05ea = Number(RegExp.$1) * _0x35b0d1.width;
    _0x2a302d = (0x1 - Number(RegExp.$2)) * -_0xe59926;
  }
  if (_0x4f0b79.match(/<OFFSET X:[ ]([\+\-]\d+)>/i)) {
    _0x3a05ea += Number(RegExp.$1);
  }
  if (_0x4f0b79.match(/<OFFSET Y:[ ]([\+\-]\d+)>/i)) {
    _0x2a302d += Number(RegExp.$1);
  }
  if (_0x4f0b79.match(/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)) {
    _0x3a05ea += Number(RegExp.$1);
    _0x2a302d += Number(RegExp.$2);
  }
  const _0x382132 = new Point(_0x3a05ea, _0x2a302d);
  _0x35b0d1.updateTransform();
  return _0x35b0d1.worldTransform.apply(_0x382132);
};
Sprite_AnimationMV.prototype.setupRate = function () {
  this._rate = VisuMZ.CoreEngine.Settings.QoL.MvAnimationRate ?? 0x4;
  this.setupCustomRateCoreEngine();
  this._rate = this._rate.clamp(0x1, 0xa);
};
Sprite_AnimationMV.prototype.setupCustomRateCoreEngine = function () {
  if (!this._animation) {
    ;
  }
  const _0x4097c1 = this._animation.name || '';
  if (_0x4097c1.match(/<RATE:[ ](\d+)>/i)) {
    this._rate = (Number(RegExp.$1) || 0x1).clamp(0x1, 0xa);
  }
};
Sprite_AnimationMV.prototype.setMute = function (_0x1b9800) {
  this._muteSound = _0x1b9800;
};
VisuMZ.CoreEngine.Sprite_AnimationMV_processTimingData = Sprite_AnimationMV.prototype.processTimingData;
Sprite_AnimationMV.prototype.processTimingData = function (_0x3d74da) {
  if (this._muteSound) {
    _0x3d74da = JsonEx.makeDeepCopy(_0x3d74da);
    if (_0x3d74da.se) {
      _0x3d74da.se.volume = 0x0;
    }
  }
  VisuMZ.CoreEngine.Sprite_AnimationMV_processTimingData.call(this, _0x3d74da);
};
VisuMZ.CoreEngine.Sprite_AnimationMV_updatePosition = Sprite_AnimationMV.prototype.updatePosition;
Sprite_AnimationMV.prototype.updatePosition = function () {
  VisuMZ.CoreEngine.Sprite_AnimationMV_updatePosition.call(this);
  if (this._animation.position === 0x3) {
    if (this.x === 0x0) {
      this.x = Math.round(Graphics.width / 0x2);
    }
    if (this.y === 0x0) {
      this.y = Math.round(Graphics.height / 0x2);
    }
  }
};
Sprite_Damage.prototype.createDigits = function (_0xffccb) {
  let _0x3c12cb = Math.abs(_0xffccb).toString();
  if (this.useDigitGrouping()) {
    _0x3c12cb = VisuMZ.GroupDigits(_0x3c12cb);
  }
  const _0x826db6 = this.fontSize();
  const _0x2e9722 = Math.floor(_0x826db6 * 0.75);
  for (let _0x471dd3 = 0x0; _0x471dd3 < _0x3c12cb.length; _0x471dd3++) {
    const _0x4797ed = this.createChildSprite(_0x2e9722, _0x826db6);
    _0x4797ed.bitmap.drawText(_0x3c12cb[_0x471dd3], 0x0, 0x0, _0x2e9722, _0x826db6, "center");
    _0x4797ed.x = (_0x471dd3 - (_0x3c12cb.length - 0x1) / 0x2) * _0x2e9722;
    _0x4797ed.dy = -_0x471dd3;
  }
};
Sprite_Damage.prototype.useDigitGrouping = function () {
  return VisuMZ.CoreEngine.Settings.QoL.DigitGroupingDamageSprites;
};
Sprite_Damage.prototype.valueOutlineColor = function () {
  return ColorManager.outlineColorDmg();
};
VisuMZ.CoreEngine.Sprite_Gauge_gaugeRate = Sprite_Gauge.prototype.gaugeRate;
Sprite_Gauge.prototype.gaugeRate = function () {
  return VisuMZ.CoreEngine.Sprite_Gauge_gaugeRate.call(this).clamp(0x0, 0x1);
};
VisuMZ.CoreEngine.Sprite_Gauge_currentValue = Sprite_Gauge.prototype.currentValue;
Sprite_Gauge.prototype.currentValue = function () {
  let _0x53e9fe = VisuMZ.CoreEngine.Sprite_Gauge_currentValue.call(this);
  return _0x53e9fe;
};
Sprite_Gauge.prototype.drawValue = function () {
  let _0x2a36cb = this.currentValue();
  if (this.useDigitGrouping()) {
    _0x2a36cb = VisuMZ.GroupDigits(_0x2a36cb);
  }
  const _0x1dbe80 = this.bitmapWidth() - 0x1;
  const _0x3eb905 = this.textHeight ? this.textHeight() : this.bitmapHeight();
  this.setupValueFont();
  this.bitmap.drawText(_0x2a36cb, 0x0, 0x0, _0x1dbe80, _0x3eb905, "right");
};
Sprite_Gauge.prototype.valueOutlineWidth = function () {
  return 0x3;
};
Sprite_Gauge.prototype.useDigitGrouping = function () {
  return VisuMZ.CoreEngine.Settings.QoL.DigitGroupingGaugeSprites;
};
Sprite_Gauge.prototype.valueOutlineColor = function () {
  return ColorManager.outlineColorGauge();
};
Sprite_StateIcon.NON_FRAME = VisuMZ.CoreEngine.Settings.UI.StateIconsNonFrame ?? true;
VisuMZ.CoreEngine.Sprite_StateIcon_loadBitmap = Sprite_StateIcon.prototype.loadBitmap;
Sprite_StateIcon.prototype.loadBitmap = function () {
  if (Sprite_StateIcon.NON_FRAME) {
    this.loadBitmapCoreEngine();
  } else {
    VisuMZ.CoreEngine.Sprite_StateIcon_loadBitmap.call(this);
  }
};
Sprite_StateIcon.prototype.loadBitmapCoreEngine = function () {
  this.bitmap = new Bitmap(ImageManager.iconWidth, ImageManager.iconHeight);
  this._srcBitmap = ImageManager.loadSystem('IconSet');
};
VisuMZ.CoreEngine.Sprite_StateIcon_updateFrame = Sprite_StateIcon.prototype.updateFrame;
Sprite_StateIcon.prototype.updateFrame = function () {
  if (Sprite_StateIcon.NON_FRAME) {
    this.updateFrameCoreEngine();
  } else {
    VisuMZ.CoreEngine.Sprite_StateIcon_updateFrame.call(this);
  }
};
Sprite_StateIcon.prototype.updateFrameCoreEngine = function () {
  if (this._lastIconIndex === this._iconIndex) {
    return;
  }
  this._lastIconIndex = this._iconIndex;
  const _0xc455f7 = ImageManager.iconWidth;
  const _0x110035 = ImageManager.iconHeight;
  const _0x5a5afa = this._iconIndex % 0x10 * _0xc455f7;
  const _0x188afc = Math.floor(this._iconIndex / 0x10) * _0x110035;
  const _0x17be4c = this._srcBitmap;
  const _0x2a31c1 = this.bitmap;
  _0x2a31c1.clear();
  _0x2a31c1.blt(_0x17be4c, _0x5a5afa, _0x188afc, _0xc455f7, _0x110035, 0x0, 0x0, _0x2a31c1.width, _0x2a31c1.height);
};
VisuMZ.CoreEngine.Sprite_Picture_loadBitmap = Sprite_Picture.prototype.loadBitmap;
Sprite_Picture.prototype.loadBitmap = function () {
  if (this._pictureName && this._pictureName.match(/VisuMZ CoreEngine PictureIcon (\d+)/i)) {
    this.loadIconBitmap(Number(RegExp.$1));
  } else {
    VisuMZ.CoreEngine.Sprite_Picture_loadBitmap.call(this);
  }
};
Sprite_Picture.prototype.loadIconBitmap = function (_0x1b02c4) {
  const _0x49e869 = ImageManager.iconWidth;
  const _0x2a97d6 = ImageManager.iconHeight;
  const _0x2d0722 = this._pictureName.match(/SMOOTH/i);
  this.bitmap = new Bitmap(_0x49e869, _0x2a97d6);
  const _0x8fc05c = ImageManager.loadSystem("IconSet");
  const _0x54a03f = _0x1b02c4 % 0x10 * _0x49e869;
  const _0x4f6707 = Math.floor(_0x1b02c4 / 0x10) * _0x2a97d6;
  this.bitmap.smooth = _0x2d0722;
  this.bitmap.blt(_0x8fc05c, _0x54a03f, _0x4f6707, _0x49e869, _0x2a97d6, 0x0, 0x0, _0x49e869, _0x2a97d6);
};
function Sprite_TitlePictureButton() {
  this.initialize(...arguments);
}
Sprite_TitlePictureButton.prototype = Object.create(Sprite_Clickable.prototype);
Sprite_TitlePictureButton.prototype.constructor = Sprite_TitlePictureButton;
Sprite_TitlePictureButton.prototype.initialize = function (_0x39da9d) {
  Sprite_Clickable.prototype.initialize.call(this);
  this._data = _0x39da9d;
  this._clickHandler = null;
  this.setup();
};
Sprite_TitlePictureButton.prototype.setup = function () {
  this.x = Graphics.width;
  this.y = Graphics.height;
  this.visible = false;
  this.setupButtonImage();
};
Sprite_TitlePictureButton.prototype.setupButtonImage = function () {
  this.bitmap = ImageManager.loadPicture(this._data.PictureFilename);
  this.bitmap.addLoadListener(this.onButtonImageLoad.bind(this));
};
Sprite_TitlePictureButton.prototype.onButtonImageLoad = function () {
  this._data.OnLoadJS.call(this);
  this._data.PositionJS.call(this);
  this.setClickHandler(this._data.CallHandlerJS.bind(this));
};
Sprite_TitlePictureButton.prototype.update = function () {
  Sprite_Clickable.prototype.update.call(this);
  this.updateOpacity();
  this.processTouch();
};
Sprite_TitlePictureButton.prototype.fadeSpeed = function () {
  return VisuMZ.CoreEngine.Settings.MenuLayout.Title.ButtonFadeSpeed;
};
Sprite_TitlePictureButton.prototype.updateOpacity = function () {
  if (this._pressed || this._hovered) {
    this.opacity = 0xff;
  } else {
    this.opacity += this.visible ? this.fadeSpeed() : -0x1 * this.fadeSpeed();
    this.opacity = Math.min(0xc0, this.opacity);
  }
};
Sprite_TitlePictureButton.prototype.setClickHandler = function (_0x544664) {
  this._clickHandler = _0x544664;
};
Sprite_TitlePictureButton.prototype.onClick = function () {
  if (this._clickHandler) {
    this._clickHandler();
  }
};
function Sprite_ExtendedTile() {
  this.initialize(...arguments);
}
Sprite_ExtendedTile.prototype = Object.create(Sprite.prototype);
Sprite_ExtendedTile.prototype.constructor = Sprite_ExtendedTile;
Sprite_ExtendedTile.prototype.initialize = function (_0x2e613b, _0x16021a, _0xd5eac3, _0x418a23) {
  this._shiftY = Game_CharacterBase.DEFAULT_SHIFT_Y || -0x6;
  this._mapX = _0x2e613b;
  this._mapY = _0x16021a;
  this._tile = _0xd5eac3;
  this._patternHeight = _0x418a23;
  Sprite.prototype.initialize.call(this);
  this.createSubSprite();
  this.loadTileBitmap();
  this.setTileFrame();
  this.update();
};
Sprite_ExtendedTile.prototype.createSubSprite = function () {
  this._tileSprite = new Sprite();
  this._tileSprite.anchor.x = 0.5;
  this._tileSprite.anchor.y = 0x1;
  this._tileSprite.y = -this._shiftY + 0x1;
  this.addChild(this._tileSprite);
};
Sprite_ExtendedTile.prototype.loadTileBitmap = function () {
  const _0x52fefc = $gameMap.tileset();
  const _0x4942b1 = 0x5 + Math.floor(this._tile / 0x100);
  this._tileSprite.bitmap = ImageManager.loadTileset(_0x52fefc.tilesetNames[_0x4942b1]);
};
Sprite_ExtendedTile.prototype.setTileFrame = function () {
  const _0x29700f = this._tile;
  const _0x5018b1 = $gameMap.tileWidth();
  const _0x378c4a = $gameMap.tileHeight();
  const _0x533c70 = (Math.floor(_0x29700f / 0x80) % 0x2 * 0x8 + _0x29700f % 0x8) * _0x5018b1;
  const _0x1d9cdd = Math.floor(_0x29700f % 0x100 / 0x8) % 0x10 * _0x378c4a;
  const _0x395a9f = this._patternHeight * _0x378c4a;
  this._tileSprite.setFrame(_0x533c70, _0x1d9cdd - _0x395a9f, _0x5018b1, _0x378c4a + _0x395a9f);
};
Sprite_ExtendedTile.prototype.update = function () {
  Sprite.prototype.update.call(this);
  this.updatePosition();
};
Sprite_ExtendedTile.prototype.updatePosition = function () {
  const _0x46af41 = $gameMap.tileWidth();
  const _0x4a5722 = $gameMap.tileHeight();
  const _0x53e78f = this._mapX;
  const _0x3c51ad = this._mapY;
  this.x = Math.floor(($gameMap.adjustX(_0x53e78f) + 0.5) * _0x46af41);
  this.y = Math.floor(($gameMap.adjustY(_0x3c51ad) + 0x1) * _0x4a5722) + this._shiftY - 0x1;
};
VisuMZ.CoreEngine.Spriteset_Base_initialize = Spriteset_Base.prototype.initialize;
Spriteset_Base.prototype.initialize = function () {
  VisuMZ.CoreEngine.Spriteset_Base_initialize.call(this);
  this.initMembersCoreEngine();
};
Spriteset_Base.prototype.initMembersCoreEngine = function () {
  this._fauxAnimationSprites = [];
  this._pointAnimationSprites = [];
  this._cacheScaleX = this.scale.x;
  this._cacheScaleY = this.scale.y;
};
VisuMZ.CoreEngine.Spriteset_Base_destroy = Spriteset_Base.prototype.destroy;
Spriteset_Base.prototype.destroy = function (_0x2df148) {
  this.removeAllFauxAnimations();
  this.removeAllPointAnimations();
  VisuMZ.CoreEngine.Spriteset_Base_destroy.call(this, _0x2df148);
};
VisuMZ.CoreEngine.Spriteset_Base_update = Spriteset_Base.prototype.update;
Spriteset_Base.prototype.update = function () {
  VisuMZ.CoreEngine.Spriteset_Base_update.call(this);
  this.updatePictureSettings();
  this.updatePictureAntiZoom();
  this.updateFauxAnimations();
  this.updatePointAnimations();
};
Spriteset_Base.prototype.updatePictureSettings = function () {};
Spriteset_Base.prototype.updatePictureAntiZoom = function () {
  if (!VisuMZ.CoreEngine.Settings.QoL.AntiZoomPictures) {
    return;
  }
  if (this._cacheScaleX === this.scale.x && this._cacheScaleY === this.scale.y) {
    return;
  }
  this.adjustPictureAntiZoom();
  this._cacheScaleX = this.scale.x;
  this._cacheScaleY = this.scale.y;
};
Spriteset_Base.prototype.adjustPictureAntiZoom = function () {
  if (SceneManager.isSceneMap() && Spriteset_Map.DETACH_PICTURE_CONTAINER) {
    return;
  } else {
    if (SceneManager.isSceneBattle() && Spriteset_Battle.DETACH_PICTURE_CONTAINER) {
      return;
    }
  }
  if (this.scale.x !== 0x0) {
    this._pictureContainer.scale.x = 0x1 / this.scale.x;
    this._pictureContainer.x = -(this.x / this.scale.x);
  }
  if (this.scale.y !== 0x0) {
    this._pictureContainer.scale.y = 0x1 / this.scale.y;
    this._pictureContainer.y = -(this.y / this.scale.y);
  }
};
VisuMZ.CoreEngine.Spriteset_Base_updatePosition = Spriteset_Base.prototype.updatePosition;
Spriteset_Base.prototype.updatePosition = function () {
  VisuMZ.CoreEngine.Spriteset_Base_updatePosition.call(this);
  this.updatePositionCoreEngine();
};
Spriteset_Base.prototype.updatePositionCoreEngine = function () {
  if (!$gameScreen) {
    return;
  }
  if ($gameScreen._shakeDuration <= 0x0) {
    return;
  }
  this.x -= Math.round($gameScreen.shake());
  switch ($gameScreen.getCoreEngineScreenShakeStyle()) {
    case "original":
      this.updatePositionCoreEngineShakeOriginal();
      break;
    case 'horizontal':
      this.updatePositionCoreEngineShakeHorz();
      break;
    case "vertical":
      this.updatePositionCoreEngineShakeVert();
      break;
    default:
      this.updatePositionCoreEngineShakeRand();
      break;
  }
};
Spriteset_Base.prototype.updatePositionCoreEngineShakeOriginal = function () {
  const _0x4ef6a8 = VisuMZ.CoreEngine.Settings.ScreenShake;
  if (_0x4ef6a8 && _0x4ef6a8.originalJS) {
    return _0x4ef6a8.originalJS.call(this);
  }
  this.x += Math.round($gameScreen.shake());
};
Spriteset_Base.prototype.updatePositionCoreEngineShakeRand = function () {
  const _0x47da5f = VisuMZ.CoreEngine.Settings.ScreenShake;
  if (_0x47da5f && _0x47da5f.randomJS) {
    return _0x47da5f.randomJS.call(this);
  }
  const _0x4abfaf = $gameScreen._shakePower * 0.75;
  const _0x28ef38 = $gameScreen._shakeSpeed * 0.6;
  const _0x9078d = $gameScreen._shakeDuration;
  this.x += Math.round(Math.randomInt(_0x4abfaf) - Math.randomInt(_0x28ef38)) * (Math.min(_0x9078d, 0x1e) * 0.5);
  this.y += Math.round(Math.randomInt(_0x4abfaf) - Math.randomInt(_0x28ef38)) * (Math.min(_0x9078d, 0x1e) * 0.5);
};
Spriteset_Base.prototype.updatePositionCoreEngineShakeHorz = function () {
  const _0x246b9b = VisuMZ.CoreEngine.Settings.ScreenShake;
  if (_0x246b9b && _0x246b9b.horzJS) {
    return _0x246b9b.horzJS.call(this);
  }
  const _0x6340ce = $gameScreen._shakePower * 0.75;
  const _0x4cf30f = $gameScreen._shakeSpeed * 0.6;
  const _0x45bee0 = $gameScreen._shakeDuration;
  this.x += Math.round(Math.randomInt(_0x6340ce) - Math.randomInt(_0x4cf30f)) * (Math.min(_0x45bee0, 0x1e) * 0.5);
};
Spriteset_Base.prototype.updatePositionCoreEngineShakeVert = function () {
  const _0x54dac1 = VisuMZ.CoreEngine.Settings.ScreenShake;
  if (_0x54dac1 && _0x54dac1.vertJS) {
    return _0x54dac1.vertJS.call(this);
  }
  const _0x11bfd9 = $gameScreen._shakePower * 0.75;
  const _0x5708f2 = $gameScreen._shakeSpeed * 0.6;
  const _0x5ec07b = $gameScreen._shakeDuration;
  this.y += Math.round(Math.randomInt(_0x11bfd9) - Math.randomInt(_0x5708f2)) * (Math.min(_0x5ec07b, 0x1e) * 0.5);
};
Spriteset_Base.prototype.updateFauxAnimations = function () {
  for (const _0x41f627 of this._fauxAnimationSprites) {
    if (!_0x41f627.isPlaying()) {
      this.removeFauxAnimation(_0x41f627);
    }
  }
  this.processFauxAnimationRequests();
};
Spriteset_Base.prototype.processFauxAnimationRequests = function () {
  for (;;) {
    const _0x14cedf = $gameTemp.retrieveFauxAnimation();
    if (_0x14cedf) {
      this.createFauxAnimation(_0x14cedf);
    } else {
      break;
    }
  }
};
Spriteset_Base.prototype.createFauxAnimation = function (_0x37dd4f) {
  const _0x1a68d4 = $dataAnimations[_0x37dd4f.animationId];
  const _0x50198a = _0x37dd4f.targets;
  const _0x312f1b = _0x37dd4f.mirror;
  const _0x316704 = _0x37dd4f.mute;
  let _0x516446 = this.animationBaseDelay();
  const _0x4194ec = this.animationNextDelay();
  if (this.isAnimationForEach(_0x1a68d4)) {
    for (const _0x9e584a of _0x50198a) {
      this.createFauxAnimationSprite([_0x9e584a], _0x1a68d4, _0x312f1b, _0x516446, _0x316704);
      _0x516446 += _0x4194ec;
    }
  } else {
    this.createFauxAnimationSprite(_0x50198a, _0x1a68d4, _0x312f1b, _0x516446, _0x316704);
  }
};
Spriteset_Base.prototype.createAnimationSprite = function (_0x10f6a0, _0x46a80a, _0x977c2d, _0xec4cec) {
  const _0x4e2a05 = this.isMVAnimation(_0x46a80a);
  const _0x46705d = new (_0x4e2a05 ? Sprite_AnimationMV : Sprite_Animation)();
  const _0x34d530 = this.makeTargetSprites(_0x10f6a0);
  const _0x15cc81 = this.animationBaseDelay();
  const _0x5cfe9e = _0xec4cec > _0x15cc81 ? this.lastAnimationSprite() : null;
  if (this.animationShouldMirror(_0x10f6a0[0x0])) {
    _0x977c2d = !_0x977c2d;
  }
  _0x46705d.targetObjects = _0x10f6a0;
  _0x46705d.setup(_0x34d530, _0x46a80a, _0x977c2d, _0xec4cec, _0x5cfe9e);
  this.addAnimationSpriteToContainer(_0x46705d);
  this._animationSprites.push(_0x46705d);
};
Spriteset_Base.prototype.createFauxAnimationSprite = function (_0x57aaa4, _0x2a24e8, _0x486324, _0x2cc698, _0x33f5c9) {
  const _0x4f151c = this.isMVAnimation(_0x2a24e8);
  const _0x12e6f5 = new (_0x4f151c ? Sprite_AnimationMV : Sprite_Animation)();
  const _0x46cb97 = this.makeTargetSprites(_0x57aaa4);
  if (this.animationShouldMirror(_0x57aaa4[0x0])) {
    _0x486324 = !_0x486324;
  }
  _0x12e6f5.targetObjects = _0x57aaa4;
  _0x12e6f5.setup(_0x46cb97, _0x2a24e8, _0x486324, _0x2cc698);
  _0x12e6f5.setMute(_0x33f5c9);
  this.addAnimationSpriteToContainer(_0x12e6f5);
  if (this._animationSprites) {
    this._animationSprites.remove(_0x12e6f5);
  }
  this._fauxAnimationSprites.push(_0x12e6f5);
};
Spriteset_Base.prototype.addAnimationSpriteToContainer = function (_0x549f59) {
  this._effectsContainer.addChild(_0x549f59);
};
Spriteset_Base.prototype.removeAnimation = function (_0x260406) {
  this._animationSprites.remove(_0x260406);
  this.removeAnimationFromContainer(_0x260406);
  for (const _0x4eeeb7 of _0x260406.targetObjects) {
    if (_0x4eeeb7.endAnimation) {
      _0x4eeeb7.endAnimation();
    }
  }
  _0x260406.destroy();
};
Spriteset_Base.prototype.removeFauxAnimation = function (_0x15af88) {
  this._fauxAnimationSprites.remove(_0x15af88);
  this.removeAnimationFromContainer(_0x15af88);
  for (const _0x11536e of _0x15af88.targetObjects) {
    if (_0x11536e.endAnimation) {
      _0x11536e.endAnimation();
    }
  }
  _0x15af88.destroy();
};
Spriteset_Base.prototype.removeAnimationFromContainer = function (_0xe9bd50) {
  this._effectsContainer.removeChild(_0xe9bd50);
};
Spriteset_Base.prototype.removeAllFauxAnimations = function () {
  for (const _0x518a60 of this._fauxAnimationSprites) {
    this.removeFauxAnimation(_0x518a60);
  }
};
Spriteset_Base.prototype.isFauxAnimationPlaying = function () {
  return this._fauxAnimationSprites.length > 0x0;
};
Spriteset_Base.prototype.updatePointAnimations = function () {
  for (const _0x3123ab of this._pointAnimationSprites) {
    if (!_0x3123ab.isPlaying()) {
      this.removePointAnimation(_0x3123ab);
    }
  }
  this.processPointAnimationRequests();
};
Spriteset_Base.prototype.processPointAnimationRequests = function () {
  for (;;) {
    const _0x30793d = $gameTemp.retrievePointAnimation();
    if (_0x30793d) {
      this.createPointAnimation(_0x30793d);
    } else {
      break;
    }
  }
};
Spriteset_Base.prototype.createPointAnimation = function (_0x2caa35) {
  const _0x4ba843 = $dataAnimations[_0x2caa35.animationId];
  const _0x5b1723 = this.createPointAnimationTargets(_0x2caa35);
  const _0x17bab4 = _0x2caa35.mirror;
  const _0x5bc5e9 = _0x2caa35.mute;
  let _0x29530b = this.animationBaseDelay();
  const _0x3c69a4 = this.animationNextDelay();
  if (this.isAnimationForEach(_0x4ba843)) {
    for (const _0xa41899 of _0x5b1723) {
      this.createPointAnimationSprite([_0xa41899], _0x4ba843, _0x17bab4, _0x29530b, _0x5bc5e9);
      _0x29530b += _0x3c69a4;
    }
  } else {
    this.createPointAnimationSprite(_0x5b1723, _0x4ba843, _0x17bab4, _0x29530b, _0x5bc5e9);
  }
};
Spriteset_Base.prototype.createPointAnimationTargets = function (_0x26194a) {
  const _0x238deb = new Sprite_Clickable();
  const _0x57879a = this.getPointAnimationLayer();
  _0x238deb.x = _0x26194a.x - _0x57879a.x;
  _0x238deb.y = _0x26194a.y - _0x57879a.y;
  _0x238deb.z = 0x64;
  const _0x52155d = this.getPointAnimationLayer();
  _0x52155d.addChild(_0x238deb);
  return [_0x238deb];
};
Spriteset_Base.prototype.getPointAnimationLayer = function () {
  return this;
};
Spriteset_Map.prototype.getPointAnimationLayer = function () {
  return this._tilemap || this;
};
Spriteset_Battle.prototype.getPointAnimationLayer = function () {
  return this._battleField || this;
};
Spriteset_Base.prototype.createPointAnimationSprite = function (_0x192057, _0x466be9, _0x4ddc84, _0x4c7beb, _0x505e01) {
  const _0x12e8d9 = this.isMVAnimation(_0x466be9);
  const _0x2b8a1c = new (_0x12e8d9 ? Sprite_AnimationMV : Sprite_Animation)();
  _0x2b8a1c.targetObjects = _0x192057;
  _0x2b8a1c.setup(_0x192057, _0x466be9, _0x4ddc84, _0x4c7beb);
  _0x2b8a1c.setMute(_0x505e01);
  this.addAnimationSpriteToContainer(_0x2b8a1c);
  this._pointAnimationSprites.push(_0x2b8a1c);
};
Spriteset_Base.prototype.removePointAnimation = function (_0x564450) {
  this._pointAnimationSprites.remove(_0x564450);
  this._effectsContainer.removeChild(_0x564450);
  for (const _0x20b1ef of _0x564450.targetObjects) {
    if (_0x20b1ef.endAnimation) {
      _0x20b1ef.endAnimation();
    }
    const _0xd9158b = this.getPointAnimationLayer();
    if (_0xd9158b) {
      _0xd9158b.removeChild(_0x20b1ef);
    }
  }
  _0x564450.destroy();
};
Spriteset_Base.prototype.removeAllPointAnimations = function () {
  for (const _0x27bf00 of this._pointAnimationSprites) {
    this.removePointAnimation(_0x27bf00);
  }
};
Spriteset_Base.prototype.isPointAnimationPlaying = function () {
  return this._pointAnimationSprites.length > 0x0;
};
VisuMZ.CoreEngine.Spriteset_Base_isAnimationPlaying = Spriteset_Base.prototype.isAnimationPlaying;
Spriteset_Base.prototype.isAnimationPlaying = function () {
  return VisuMZ.CoreEngine.Spriteset_Base_isAnimationPlaying.call(this) || this.isPointAnimationPlaying();
};
Spriteset_Map.DETACH_PICTURE_CONTAINER = VisuMZ.CoreEngine.Settings.QoL.DetachMapPictureContainer || false;
VisuMZ.CoreEngine.Scene_Map_createSpriteset_detach = Scene_Map.prototype.createSpriteset;
Scene_Map.prototype.createSpriteset = function () {
  VisuMZ.CoreEngine.Scene_Map_createSpriteset_detach.call(this);
  if (!Spriteset_Map.DETACH_PICTURE_CONTAINER) {
    return;
  }
  const _0x3e9690 = this._spriteset;
  if (!_0x3e9690) {
    return;
  }
  this._pictureContainer = _0x3e9690._pictureContainer;
  if (!this._pictureContainer) {
    return;
  }
  this.addChild(this._pictureContainer);
};
VisuMZ.CoreEngine.Spriteset_Map_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function () {
  VisuMZ.CoreEngine.Spriteset_Map_createTilemap.call(this);
  this.createTileExtendSprites();
};
Spriteset_Map.prototype.createTileExtendSprites = function () {
  const _0x3e0595 = $gameMap.tileset();
  if (!_0x3e0595) {
    return;
  }
  const _0x703e70 = $gameMap.getTileExtendTerrainTags();
  if (Object.keys(_0x703e70).length <= 0x0) {
    return;
  }
  const _0x1c5239 = $gameMap.tilesetFlags();
  this._tileExtendSprites = this._tileExtendSprites || [];
  for (let _0x3ef931 = 0x0; _0x3ef931 < $gameMap.height(); _0x3ef931++) {
    for (let _0x4c1624 = 0x0; _0x4c1624 < $gameMap.width(); _0x4c1624++) {
      for (const _0x55538b of $gameMap.layeredTiles(_0x4c1624, _0x3ef931)) {
        const _0x1e8245 = _0x1c5239[_0x55538b] >> 0xc;
        const _0xf0f93b = _0x703e70[_0x1e8245] || 0x0;
        if (_0xf0f93b <= 0x0) {
          continue;
        }
        this.createExtendedTileSprite(_0x4c1624, _0x3ef931, _0x55538b, _0xf0f93b);
      }
    }
  }
};
Spriteset_Map.prototype.removeTileExtendSprites = function () {
  this._tileExtendSprites = this._tileExtendSprites || [];
  for (const _0x45aab9 of this._tileExtendSprites) {
    this._tilemap.removeChild(_0x45aab9);
  }
  this._tileExtendSprites = [];
};
Spriteset_Map.prototype.createExtendedTileSprite = function (_0x55c7da, _0x575b3d, _0x49d594, _0x311179) {
  const _0x4df36a = new Sprite_ExtendedTile(_0x55c7da, _0x575b3d, _0x49d594, _0x311179);
  const _0x618180 = $gameMap.tilesetFlags();
  if (_0x618180[_0x49d594] & 0x10) {
    _0x4df36a.z = 0x4;
  } else {
    _0x4df36a.z = 0x3;
  }
  this._tilemap.addChild(_0x4df36a);
  this._tileExtendSprites.push(_0x4df36a);
};
VisuMZ.CoreEngine.Tilemap_addSpotTile = Tilemap.prototype._addSpotTile;
Tilemap.prototype._addSpotTile = function (_0x3fd0bd, _0x3d6ac6, _0x171b70) {
  if ($gameMap.isTileExtended(_0x3fd0bd)) {
    return;
  }
  VisuMZ.CoreEngine.Tilemap_addSpotTile.call(this, _0x3fd0bd, _0x3d6ac6, _0x171b70);
};
Spriteset_Battle.DETACH_PICTURE_CONTAINER = VisuMZ.CoreEngine.Settings.QoL.DetachBattlePictureContainer || false;
VisuMZ.CoreEngine.Scene_Battle_createSpriteset_detach = Scene_Battle.prototype.createSpriteset;
Scene_Battle.prototype.createSpriteset = function () {
  VisuMZ.CoreEngine.Scene_Battle_createSpriteset_detach.call(this);
  if (!Spriteset_Battle.DETACH_PICTURE_CONTAINER) {
    return;
  }
  const _0x1c239f = this._spriteset;
  if (!_0x1c239f) {
    return;
  }
  this._pictureContainer = _0x1c239f._pictureContainer;
  if (!this._pictureContainer) {
    return;
  }
  this.addChild(this._pictureContainer);
};
Spriteset_Battle.prototype.createBackground = function () {
  this._backgroundFilter = new PIXI.filters.BlurFilter(clamp = true);
  this._backgroundSprite = new Sprite();
  this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
  this._backgroundSprite.filters = [this._backgroundFilter];
  this._baseSprite.addChild(this._backgroundSprite);
};
VisuMZ.CoreEngine.Spriteset_Battle_createEnemies = Spriteset_Battle.prototype.createEnemies;
Spriteset_Battle.prototype.createEnemies = function () {
  if (this.coreEngineRepositionEnemies()) {
    this.repositionEnemiesByResolution();
  }
  VisuMZ.CoreEngine.Spriteset_Battle_createEnemies.call(this);
};
Spriteset_Battle.prototype.coreEngineRepositionEnemies = function () {
  const _0xb76425 = VisuMZ.CoreEngine.Settings.ScreenResolution;
  if (!_0xb76425) {
    return false;
  }
  if (Utils.RPGMAKER_VERSION >= '1.3.0' && !_0xb76425.RepositionEnemies130) {
    return false;
  }
  return _0xb76425.RepositionEnemies;
};
Spriteset_Battle.prototype.repositionEnemiesByResolution = function () {
  for (member of $gameTroop.members()) {
    member.moveRelativeToResolutionChange();
  }
};
VisuMZ.CoreEngine.Window_Base_initialize = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function (_0xea6720) {
  _0xea6720.x = Math.round(_0xea6720.x);
  _0xea6720.y = Math.round(_0xea6720.y);
  _0xea6720.width = Math.round(_0xea6720.width);
  _0xea6720.height = Math.round(_0xea6720.height);
  this.initDigitGrouping();
  VisuMZ.CoreEngine.Window_Base_initialize.call(this, _0xea6720);
  this.initCoreEasing();
};
Window_Base.prototype.initDigitGrouping = function () {
  this._digitGrouping = VisuMZ.CoreEngine.Settings.QoL.DigitGroupingStandardText;
  this._digitGroupingEx = VisuMZ.CoreEngine.Settings.QoL.DigitGroupingExText;
};
Window_Base.prototype.lineHeight = function () {
  return VisuMZ.CoreEngine.Settings.Window.LineHeight;
};
Window_Base.prototype.itemPadding = function () {
  return VisuMZ.CoreEngine.Settings.Window.ItemPadding;
};
Window_Base.prototype.updateBackOpacity = function () {
  if ($gameSystem.windowOpacity) {
    this.backOpacity = $gameSystem.windowOpacity();
  } else {
    this.backOpacity = VisuMZ.CoreEngine.Settings.Window.BackOpacity;
  }
};
Window_Base.prototype.translucentOpacity = function () {
  return VisuMZ.CoreEngine.Settings.Window.TranslucentOpacity;
};
Window_Base.prototype.openingSpeed = function () {
  return VisuMZ.CoreEngine.Settings.Window.OpenSpeed;
};
VisuMZ.CoreEngine.Window_Base_update = Window_Base.prototype.update;
Window_Base.prototype.update = function () {
  VisuMZ.CoreEngine.Window_Base_update.call(this);
  this.updateCoreEasing();
};
Window_Base.prototype.updateOpen = function () {
  if (this._opening) {
    this.openness += this.openingSpeed();
    if (this.isOpen()) {
      this._opening = false;
    }
  }
};
Window_Base.prototype.updateClose = function () {
  if (this._closing) {
    this.openness -= this.openingSpeed();
    if (this.isClosed()) {
      this._closing = false;
    }
  }
};
VisuMZ.CoreEngine.Window_Base_drawText = Window_Base.prototype.drawText;
Window_Base.prototype.drawText = function (_0x4b81a4, _0x5d0655, _0x378759, _0x203385, _0x206e3e) {
  if (this.useDigitGrouping()) {
    _0x4b81a4 = VisuMZ.GroupDigits(_0x4b81a4);
  }
  VisuMZ.CoreEngine.Window_Base_drawText.call(this, _0x4b81a4, _0x5d0655, _0x378759, _0x203385, _0x206e3e);
};
Window_Base.prototype.useDigitGrouping = function () {
  return this._digitGrouping;
};
VisuMZ.CoreEngine.Window_Base_createTextState = Window_Base.prototype.createTextState;
Window_Base.prototype.createTextState = function (_0x1824e2, _0x49e87b, _0x1181b1, _0x355711) {
  var _0x29f6fc = VisuMZ.CoreEngine.Window_Base_createTextState.call(this, _0x1824e2, _0x49e87b, _0x1181b1, _0x355711);
  if (this.useDigitGroupingEx()) {
    _0x29f6fc.text = String(VisuMZ.GroupDigits(_0x29f6fc.text)) || '';
  }
  return _0x29f6fc;
};
Window_Base.prototype.useDigitGroupingEx = function () {
  return this._digitGroupingEx;
};
Window_Base.prototype.enableDigitGrouping = function (_0x38304b) {
  this._digitGrouping = _0x38304b;
};
Window_Base.prototype.enableDigitGroupingEx = function (_0x45bd98) {
  this._digitGroupingEx = _0x45bd98;
};
VisuMZ.CoreEngine.Window_Base_drawIcon = Window_Base.prototype.drawIcon;
Window_Base.prototype.drawIcon = function (_0x42a305, _0x5c684a, _0x1d872c) {
  _0x5c684a = Math.round(_0x5c684a);
  _0x1d872c = Math.round(_0x1d872c);
  VisuMZ.CoreEngine.Window_Base_drawIcon.call(this, _0x42a305, _0x5c684a, _0x1d872c);
};
VisuMZ.CoreEngine.Window_Base_drawFace = Window_Base.prototype.drawFace;
Window_Base.prototype.drawFace = function (_0x14aa4e, _0x11130c, _0x2b3974, _0xd0e37f, _0x2689eb, _0x54dbb7) {
  _0x2689eb = _0x2689eb || ImageManager.faceWidth;
  _0x54dbb7 = _0x54dbb7 || ImageManager.faceHeight;
  _0x2b3974 = Math.round(_0x2b3974);
  _0xd0e37f = Math.round(_0xd0e37f);
  _0x2689eb = Math.round(_0x2689eb);
  _0x54dbb7 = Math.round(_0x54dbb7);
  VisuMZ.CoreEngine.Window_Base_drawFace.call(this, _0x14aa4e, _0x11130c, _0x2b3974, _0xd0e37f, _0x2689eb, _0x54dbb7);
};
VisuMZ.CoreEngine.Window_Base_drawCharacter = Window_Base.prototype.drawCharacter;
Window_Base.prototype.drawCharacter = function (_0x414541, _0x29a7bf, _0x2fe065, _0x2391ae) {
  _0x2fe065 = Math.round(_0x2fe065);
  _0x2391ae = Math.round(_0x2391ae);
  VisuMZ.CoreEngine.Window_Base_drawCharacter.call(this, _0x414541, _0x29a7bf, _0x2fe065, _0x2391ae);
};
VisuMZ.CoreEngine.Window_Selectable_itemRect = Window_Selectable.prototype.itemRect;
Window_Selectable.prototype.itemRect = function (_0xfab7f9) {
  let _0x58a17f = VisuMZ.CoreEngine.Window_Selectable_itemRect.call(this, _0xfab7f9);
  _0x58a17f.x = Math.round(_0x58a17f.x);
  _0x58a17f.y = Math.round(_0x58a17f.y);
  _0x58a17f.width = Math.round(_0x58a17f.width);
  _0x58a17f.height = Math.round(_0x58a17f.height);
  return _0x58a17f;
};
VisuMZ.CoreEngine.Window_StatusBase_drawActorSimpleStatus = Window_StatusBase.prototype.drawActorSimpleStatus;
Window_StatusBase.prototype.drawActorSimpleStatus = function (_0x531f2b, _0x5a748b, _0x10e79a) {
  _0x5a748b = Math.round(_0x5a748b);
  _0x10e79a = Math.round(_0x10e79a);
  VisuMZ.CoreEngine.Window_StatusBase_drawActorSimpleStatus.call(this, _0x531f2b, _0x5a748b, _0x10e79a);
};
Window_Base.prototype.initCoreEasing = function () {
  this._coreEasing = {
    'duration': 0x0,
    'wholeDuration': 0x0,
    'type': "LINEAR",
    'targetX': this.x,
    'targetY': this.y,
    'targetScaleX': this.scale.x,
    'targetScaleY': this.scale.y,
    'targetOpacity': this.opacity,
    'targetBackOpacity': this.backOpacity,
    'targetContentsOpacity': this.contentsOpacity
  };
};
Window_Base.prototype.updateCoreEasing = function () {
  if (!this._coreEasing) {
    return;
  }
  if (this._coreEasing.duration <= 0x0) {
    return;
  }
  this.x = this.applyCoreEasing(this.x, this._coreEasing.targetX);
  this.y = this.applyCoreEasing(this.y, this._coreEasing.targetY);
  this.scale.x = this.applyCoreEasing(this.scale.x, this._coreEasing.targetScaleX);
  this.scale.y = this.applyCoreEasing(this.scale.y, this._coreEasing.targetScaleY);
  this.opacity = this.applyCoreEasing(this.opacity, this._coreEasing.targetOpacity);
  this.backOpacity = this.applyCoreEasing(this.backOpacity, this._coreEasing.targetBackOpacity);
  this.contentsOpacity = this.applyCoreEasing(this.contentsOpacity, this._coreEasing.targetContentsOpacity);
  this._coreEasing.duration--;
};
Window_Base.prototype.applyCoreEasing = function (_0x580acb, _0x5f4750) {
  if (!this._coreEasing) {
    return _0x5f4750;
  }
  const _0x4bd31a = this._coreEasing.duration;
  const _0x383a33 = this._coreEasing.wholeDuration;
  const _0x13bf3c = this.calcCoreEasing((_0x383a33 - _0x4bd31a) / _0x383a33);
  const _0x56abee = this.calcCoreEasing((_0x383a33 - _0x4bd31a + 0x1) / _0x383a33);
  const _0x14bf9f = (_0x580acb - _0x5f4750 * _0x13bf3c) / (0x1 - _0x13bf3c);
  return _0x14bf9f + (_0x5f4750 - _0x14bf9f) * _0x56abee;
};
Window_Base.prototype.calcCoreEasing = function (_0x59e8f0) {
  if (!this._coreEasing) {
    return _0x59e8f0;
  }
  return VisuMZ.ApplyEasing(_0x59e8f0, this._coreEasing.type || 'LINEAR');
};
Window_Base.prototype.anchorCoreEasing = function (_0xbeb209, _0x24dc70) {
  if (!this._coreEasing) {
    return;
  }
  this.x = this._coreEasing.targetX;
  this.y = this._coreEasing.targetY;
  this.scale.x = this._coreEasing.targetScaleX;
  this.scale.y = this._coreEasing.targetScaleY;
  this.opacity = this._coreEasing.targetOpacity;
  this.backOpacity = this._coreEasing.targetBackOpacity;
  this.contentsOpacity = this._coreEasing.targetContentsOpacity;
  this.setupCoreEasing(_0xbeb209, _0x24dc70, this.x, this.y, this.scale.x, this.scale.y, this.opacity, this.backOpacity, this.contentsOpacity);
};
Window_Base.prototype.setupCoreEasing = function (_0x190cdb, _0x2ae548, _0x3bf4ff, _0x52c563, _0x5b630f, _0x229d78, _0x5b8ce3, _0x20e5be, _0x48b52d) {
  this._coreEasing = {
    'duration': _0x190cdb,
    'wholeDuration': _0x190cdb,
    'type': _0x2ae548,
    'targetX': _0x3bf4ff,
    'targetY': _0x52c563,
    'targetScaleX': _0x5b630f,
    'targetScaleY': _0x229d78,
    'targetOpacity': _0x5b8ce3,
    'targetBackOpacity': _0x20e5be,
    'targetContentsOpacity': _0x48b52d
  };
};
Window_Base.prototype.drawCurrencyValue = function (_0xa5f926, _0x3042d3, _0x436e74, _0x2417f2, _0x4b6392) {
  this.resetFontSettings();
  this.contents.fontSize = VisuMZ.CoreEngine.Settings.Gold.GoldFontSize;
  const _0x1b605a = VisuMZ.CoreEngine.Settings.Gold.GoldIcon;
  if (_0x1b605a > 0x0 && _0x3042d3 === TextManager.currencyUnit) {
    const _0x5dd03b = _0x2417f2 + (this.lineHeight() - ImageManager.iconHeight) / 0x2;
    this.drawIcon(_0x1b605a, _0x436e74 + (_0x4b6392 - ImageManager.iconWidth), _0x5dd03b);
    _0x4b6392 -= ImageManager.iconWidth + 0x4;
  } else {
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(_0x3042d3, _0x436e74, _0x2417f2, _0x4b6392, "right");
    _0x4b6392 -= this.textWidth(_0x3042d3) + 0x6;
  }
  this.resetTextColor();
  const _0x268c76 = this.textWidth(this._digitGrouping ? VisuMZ.GroupDigits(_0xa5f926) : _0xa5f926);
  if (_0x268c76 > _0x4b6392) {
    this.drawText(VisuMZ.CoreEngine.Settings.Gold.GoldOverlap, _0x436e74, _0x2417f2, _0x4b6392, "right");
  } else {
    this.drawText(_0xa5f926, _0x436e74, _0x2417f2, _0x4b6392, "right");
  }
  this.resetFontSettings();
};
Window_Base.prototype.drawIconBySize = function (_0x280867, _0x549aef, _0xf69b4c, _0x456c2a, _0x28ac47) {
  const _0x4b6ec5 = ImageManager.loadSystem("IconSet");
  const _0x103d2d = ImageManager.iconWidth;
  const _0x3b5751 = ImageManager.iconHeight;
  const _0x1c046b = _0x280867 % 0x10 * _0x103d2d;
  const _0x3e6995 = Math.floor(_0x280867 / 0x10) * _0x3b5751;
  this.contents._context.imageSmoothingEnabled = _0x28ac47;
  this.contents.blt(_0x4b6ec5, _0x1c046b, _0x3e6995, _0x103d2d, _0x3b5751, _0x549aef, _0xf69b4c, _0x456c2a, _0x456c2a);
  this.contents._context.imageSmoothingEnabled = true;
};
Window_Base.prototype.drawGauge = function (_0xdd76f7, _0x3cfe4a, _0x23a555, _0x1987c2, _0x587ad0, _0xb6709a) {
  const _0x2f2745 = Math.floor((_0x23a555 - 0x2) * _0x1987c2);
  const _0x5f6b1b = Sprite_Gauge.prototype.gaugeHeight.call(this);
  const _0x305ac2 = _0x3cfe4a + this.lineHeight() - _0x5f6b1b - 0x2;
  this.contents.fillRect(_0xdd76f7, _0x305ac2, _0x23a555, _0x5f6b1b, ColorManager.gaugeBackColor());
  this.contents.gradientFillRect(_0xdd76f7 + 0x1, _0x305ac2 + 0x1, _0x2f2745, _0x5f6b1b - 0x2, _0x587ad0, _0xb6709a);
};
Window_Scrollable.SCROLLBAR = {
  'enabled': VisuMZ.CoreEngine.Settings.Window.ShowScrollBar ?? true,
  'thickness': VisuMZ.CoreEngine.Settings.Window.BarThickness ?? 0x2,
  'offset': VisuMZ.CoreEngine.Settings.Window.BarOffset ?? 0x2,
  'bodyColor': VisuMZ.CoreEngine.Settings.Window.BarBodyColor ?? 0x0,
  'offColor': VisuMZ.CoreEngine.Settings.Window.OffBarColor ?? 0x7,
  'offOpacity': VisuMZ.CoreEngine.Settings.Window.OffBarOpacity ?? 0x80
};
Window_Base.prototype.isScrollBarVisible = function () {
  return Window_Scrollable.SCROLLBAR.enabled && Window_Scrollable.SCROLLBAR.thickness > 0x0;
};
VisuMZ.CoreEngine.Window_Base_createContents = Window_Base.prototype.createContents;
Window_Base.prototype.createContents = function () {
  VisuMZ.CoreEngine.Window_Base_createContents.call(this);
  this.createScrollBarSprites();
  this.setupScrollBarBitmap(true);
  this.setupScrollBarBitmap(false);
};
Window_Base.prototype.createScrollBarSprites = function () {
  if (!this.isScrollBarVisible()) {
    return;
  }
  if (this._scrollBarHorz || this._scrollBarVert) {
    return;
  }
  this._lastScrollBarValues = {
    'horz': null,
    'vert': null,
    'maxHorz': null,
    'maxVert': null
  };
  this._scrollBarHorz = new Sprite();
  this._scrollBarVert = new Sprite();
  this.addChild(this._scrollBarHorz);
  this.addChild(this._scrollBarVert);
};
Window_Base.prototype.setupScrollBarBitmap = function (_0x217aaf) {
  const _0x625f3c = _0x217aaf ? this._scrollBarHorz : this._scrollBarVert;
  if (!_0x625f3c) {
    return;
  }
  const _0x485fa1 = Window_Scrollable.SCROLLBAR;
  const _0x56bf0d = _0x485fa1.thickness;
  const _0x2fb3f7 = _0x217aaf ? this.innerWidth - _0x56bf0d * 0x2 : _0x56bf0d;
  const _0xea2e2c = _0x217aaf ? _0x56bf0d : this.innerHeight - _0x56bf0d * 0x2;
  _0x625f3c.bitmap = new Bitmap(_0x2fb3f7, _0xea2e2c);
  _0x625f3c.setFrame(0x0, 0x0, _0x2fb3f7, _0xea2e2c);
  this.updateScrollBarPosition(_0x217aaf);
};
VisuMZ.CoreEngine.Window_Base_destroyContents = Window_Base.prototype.destroyContents;
Window_Base.prototype.destroyContents = function () {
  VisuMZ.CoreEngine.Window_Base_destroyContents.call(this);
  this.destroyScrollBarBitmaps();
};
Window_Base.prototype.destroyScrollBarBitmaps = function () {
  const _0x33a194 = [this._scrollBarHorz, this._scrollBarVert];
  for (const _0x1e3142 of _0x33a194) {
    if (_0x1e3142 && _0x1e3142.bitmap) {
      _0x1e3142.bitmap.destroy();
    }
  }
};
VisuMZ.CoreEngine.Window_Scrollable_update = Window_Scrollable.prototype.update;
Window_Scrollable.prototype.update = function () {
  VisuMZ.CoreEngine.Window_Scrollable_update.call(this);
  this.updateScrollBars();
};
Window_Scrollable.prototype.updateScrollBars = function () {
  this.updateScrollBarVisibility();
  this.checkScrollBarBitmap(true);
  this.checkScrollBarBitmap(false);
  this.updateScrollBarPosition(true);
  this.updateScrollBarPosition(false);
};
Window_Scrollable.prototype.updateScrollBarVisibility = function () {
  const _0xf5ddc0 = [this._scrollBarHorz, this._scrollBarVert];
  for (const _0x2222a2 of _0xf5ddc0) {
    if (_0x2222a2) {
      _0x2222a2.visible = this.isScrollBarVisible() && this.isOpen();
    }
  }
};
Window_Scrollable.prototype.checkScrollBarBitmap = function (_0x2d6c85) {
  if (!this._lastScrollBarValues) {
    return;
  }
  const _0x526211 = this.scrollbar(_0x2d6c85);
  const _0xd1fad4 = this.maxScrollbar(_0x2d6c85);
  const _0x36ac16 = _0x2d6c85 ? "horz" : "vert";
  const _0x5a193d = _0x2d6c85 ? "maxHorz" : 'maxVert';
  if (this._lastScrollBarValues[_0x36ac16] !== _0x526211 || this._lastScrollBarValues[_0x5a193d] !== _0xd1fad4) {
    this._lastScrollBarValues[_0x36ac16] = _0x526211;
    this._lastScrollBarValues[_0x5a193d] = _0xd1fad4;
    this.refreshScrollBarBitmap(_0x2d6c85, _0x526211, _0xd1fad4);
  }
};
Window_Scrollable.prototype.scrollbar = function (_0x1c6507) {
  if (this._allTextHeight !== undefined) {
    return _0x1c6507 ? this.scrollX() : this.origin.y;
  }
  return _0x1c6507 ? this.scrollX() : this.scrollY();
};
Window_Scrollable.prototype.maxScrollbar = function (_0xe7d841) {
  if (this._allTextHeight !== undefined) {
    return _0xe7d841 ? this.maxScrollX() : Math.max(0x0, this._allTextHeight - this.innerHeight);
  }
  return _0xe7d841 ? this.maxScrollX() : this.maxScrollY();
};
Window_Scrollable.prototype.scrollbarHeight = function () {
  if (this._allTextHeight !== undefined) {
    return Math.max(0x0, this._allTextHeight);
  }
  return this.overallHeight();
};
Window_Scrollable.prototype.refreshScrollBarBitmap = function (_0x4845dc, _0x5e276f, _0x5af83d) {
  const _0x2bc1e9 = _0x4845dc ? this._scrollBarHorz : this._scrollBarVert;
  if (!_0x2bc1e9) {
    return;
  }
  if (!_0x2bc1e9.bitmap) {
    return;
  }
  const _0x2afa33 = _0x2bc1e9.bitmap;
  _0x2afa33.clear();
  if (_0x5af83d <= 0x0) {
    return;
  }
  const _0x167dea = _0x4845dc ? this.innerWidth / this.overallWidth() : this.innerHeight / this.scrollbarHeight();
  const _0xfc81f7 = _0x4845dc ? Math.round(_0x5e276f * _0x167dea) : 0x0;
  const _0x4db3ec = _0x4845dc ? 0x0 : Math.round(_0x5e276f * _0x167dea);
  const _0x48286f = _0x4845dc ? Math.round(_0x2afa33.width * _0x167dea) : _0x2afa33.width;
  const _0x3e7342 = _0x4845dc ? _0x2afa33.height : Math.round(_0x2afa33.height * _0x167dea);
  const _0x59b0ed = Window_Scrollable.SCROLLBAR;
  const _0x230d61 = ColorManager.getColor(_0x59b0ed.offColor);
  const _0x195fe4 = ColorManager.getColor(_0x59b0ed.bodyColor);
  const _0x3d46aa = _0x59b0ed.offOpacity;
  _0x2afa33.paintOpacity = _0x3d46aa;
  _0x2afa33.fillAll(_0x230d61);
  _0x2afa33.paintOpacity = 0xff;
  _0x2afa33.fillRect(_0xfc81f7, _0x4db3ec, _0x48286f, _0x3e7342, _0x195fe4);
};
Window_Base.prototype.updateScrollBarPosition = function (_0x431c2c) {
  const _0x580f2a = _0x431c2c ? this._scrollBarHorz : this._scrollBarVert;
  if (!_0x580f2a) {
    return;
  }
  const _0x48c634 = Window_Scrollable.SCROLLBAR;
  const _0x3ada0e = _0x48c634.thickness;
  const _0x15afb1 = _0x48c634.offset;
  if (!_0x580f2a.transform) {
    return;
  }
  _0x580f2a.x = this.padding + (_0x431c2c ? _0x3ada0e : this.innerWidth + _0x15afb1);
  _0x580f2a.y = this.padding + (_0x431c2c ? this.innerHeight + _0x15afb1 : _0x3ada0e);
};
Window_Selectable.prototype.cursorDown = function (_0x2e1935) {
  let _0x3e27f0 = this.index();
  const _0x5950e7 = this.maxItems();
  const _0x55533a = this.maxCols();
  if (this.isUseModernControls() && (_0x3e27f0 < _0x5950e7 || _0x2e1935 && _0x55533a === 0x1)) {
    _0x3e27f0 += _0x55533a;
    if (_0x3e27f0 >= _0x5950e7) {
      _0x3e27f0 = _0x5950e7 - 0x1;
    }
    this.smoothSelect(_0x3e27f0);
  } else if (!this.isUseModernControls()) {
    if (_0x3e27f0 < _0x5950e7 - _0x55533a || _0x2e1935 && _0x55533a === 0x1) {
      this.smoothSelect((_0x3e27f0 + _0x55533a) % _0x5950e7);
    }
  }
};
VisuMZ.CoreEngine.Window_Selectable_cursorDown = Window_Selectable.prototype.cursorDown;
Window_Selectable.prototype.cursorDown = function (_0x8ca5f6) {
  if (this.isUseModernControls() && _0x8ca5f6 && this.maxCols() === 0x1 && this.index() === this.maxItems() - 0x1) {
    this.smoothSelect(0x0);
  } else {
    VisuMZ.CoreEngine.Window_Selectable_cursorDown.call(this, _0x8ca5f6);
  }
};
Window_Selectable.prototype.cursorUp = function (_0x274f39) {
  let _0x428930 = Math.max(0x0, this.index());
  const _0x1af23c = this.maxItems();
  const _0x55c12f = this.maxCols();
  if (this.isUseModernControls() && _0x428930 > 0x0 || _0x274f39 && _0x55c12f === 0x1) {
    _0x428930 -= _0x55c12f;
    if (_0x428930 <= 0x0) {
      _0x428930 = 0x0;
    }
    this.smoothSelect(_0x428930);
  } else if (!this.isUseModernControls()) {
    if (_0x428930 >= _0x55c12f || _0x274f39 && _0x55c12f === 0x1) {
      this.smoothSelect((_0x428930 - _0x55c12f + _0x1af23c) % _0x1af23c);
    }
  }
};
VisuMZ.CoreEngine.Window_Selectable_cursorUp = Window_Selectable.prototype.cursorUp;
Window_Selectable.prototype.cursorUp = function (_0x4fbc72) {
  if (this.isUseModernControls() && _0x4fbc72 && this.maxCols() === 0x1 && this.index() === 0x0) {
    this.smoothSelect(this.maxItems() - 0x1);
  } else {
    VisuMZ.CoreEngine.Window_Selectable_cursorUp.call(this, _0x4fbc72);
  }
};
Window_Selectable.prototype.isUseModernControls = function () {
  return VisuMZ.CoreEngine.Settings.QoL.ModernControls;
};
VisuMZ.CoreEngine.Window_Selectable_processCursorMove = Window_Selectable.prototype.processCursorMove;
Window_Selectable.prototype.processCursorMove = function () {
  if (this.isUseModernControls()) {
    this.processCursorMoveModernControls();
    this.processCursorHomeEndTrigger();
  } else {
    VisuMZ.CoreEngine.Window_Selectable_processCursorMove.call(this);
  }
};
Window_Selectable.prototype.allowShiftScrolling = function () {
  return true;
};
Window_Selectable.prototype.processCursorMoveModernControls = function () {
  if (this.isCursorMovable()) {
    const _0x8732e8 = this.index();
    if (Input.isRepeated("down")) {
      if (Input.isPressed('shift') && this.allowShiftScrolling()) {
        this.cursorPagedown();
      } else {
        this.cursorDown(Input.isTriggered("down"));
      }
    }
    if (Input.isRepeated('up')) {
      if (Input.isPressed("shift") && this.allowShiftScrolling()) {
        this.cursorPageup();
      } else {
        this.cursorUp(Input.isTriggered('up'));
      }
    }
    if (Input.isRepeated("right")) {
      this.cursorRight(Input.isTriggered("right"));
    }
    if (Input.isRepeated("left")) {
      this.cursorLeft(Input.isTriggered('left'));
    }
    if (!this.isHandled("pagedown") && Input.isRepeated("pagedown")) {
      this.cursorPagedown();
    }
    if (!this.isHandled('pageup') && Input.isRepeated("pageup")) {
      this.cursorPageup();
    }
    if (this.index() !== _0x8732e8) {
      this.playCursorSound();
    }
  }
};
Window_Selectable.prototype.processCursorHomeEndTrigger = function () {
  if (this.isCursorMovable()) {
    const _0x362590 = this.index();
    if (Input.isTriggered("home")) {
      this.smoothSelect(Math.min(this.index(), 0x0));
    }
    if (Input.isTriggered('end')) {
      this.smoothSelect(Math.max(this.index(), this.maxItems() - 0x1));
    }
    if (this.index() !== _0x362590) {
      this.playCursorSound();
    }
  }
};
VisuMZ.CoreEngine.Window_Selectable_processTouch = Window_Selectable.prototype.processTouch;
Window_Selectable.prototype.processTouch = function () {
  if (this.isUseModernControls()) {
    this.processTouchModernControls();
  } else {
    VisuMZ.CoreEngine.Window_Selectable_processTouch.call(this);
  }
};
Window_Selectable.prototype.processTouchModernControls = function () {
  VisuMZ.CoreEngine.Window_Selectable_processTouch.call(this);
};
Window_Selectable.prototype.colSpacing = function () {
  return VisuMZ.CoreEngine.Settings.Window.ColSpacing;
};
Window_Selectable.prototype.rowSpacing = function () {
  return VisuMZ.CoreEngine.Settings.Window.RowSpacing;
};
Window_Selectable.prototype.itemHeight = function () {
  return Window_Scrollable.prototype.itemHeight.call(this) + VisuMZ.CoreEngine.Settings.Window.ItemHeight;
  ;
};
VisuMZ.CoreEngine.Window_Selectable_drawBackgroundRect = Window_Selectable.prototype.drawBackgroundRect;
Window_Selectable.prototype.drawBackgroundRect = function (_0x10a207) {
  const _0xc889b1 = VisuMZ.CoreEngine.Settings.Window;
  if (_0xc889b1.ShowItemBackground === false) {
    return;
  }
  if (_0xc889b1.DrawItemBackgroundJS) {
    _0xc889b1.DrawItemBackgroundJS.call(this, _0x10a207);
  } else {
    VisuMZ.CoreEngine.Window_Selectable_drawBackgroundRect.call(this, _0x10a207);
  }
};
VisuMZ.CoreEngine.Window_Gold_refresh = Window_Gold.prototype.refresh;
Window_Gold.prototype.refresh = function () {
  if (this.isItemStyle()) {
    this.drawGoldItemStyle();
  } else {
    VisuMZ.CoreEngine.Window_Gold_refresh.call(this);
  }
};
Window_Gold.prototype.isItemStyle = function () {
  if (TextManager.currencyUnit !== this.currencyUnit()) {
    return false;
  }
  return VisuMZ.CoreEngine.Settings.Gold.ItemStyle;
};
Window_Gold.prototype.drawGoldItemStyle = function () {
  this.resetFontSettings();
  this.contents.clear();
  this.contents.fontSize = VisuMZ.CoreEngine.Settings.Gold.GoldFontSize;
  const _0x4ae23b = VisuMZ.CoreEngine.Settings.Gold.GoldIcon;
  const _0x28436f = this.itemLineRect(0x0);
  if (_0x4ae23b > 0x0) {
    const _0x43602a = ImageManager.standardIconWidth || 0x20;
    const _0x582d43 = _0x43602a - ImageManager.iconWidth;
    const _0x10244d = _0x28436f.y + (this.lineHeight() - ImageManager.iconHeight) / 0x2;
    this.drawIcon(_0x4ae23b, _0x28436f.x + Math.ceil(_0x582d43 / 0x2), _0x10244d);
    const _0x39e1ac = _0x43602a + 0x4;
    _0x28436f.x += _0x39e1ac;
    _0x28436f.width -= _0x39e1ac;
  }
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(this.currencyUnit(), _0x28436f.x, _0x28436f.y, _0x28436f.width, "left");
  const _0x42f5a8 = this.textWidth(this.currencyUnit()) + 0x6;
  ;
  _0x28436f.x += _0x42f5a8;
  _0x28436f.width -= _0x42f5a8;
  this.resetTextColor();
  const _0x3530db = this.textWidth(this._digitGrouping ? VisuMZ.GroupDigits(this.value()) : this.value());
  if (_0x3530db > _0x28436f.width) {
    this.drawText(VisuMZ.CoreEngine.Settings.Gold.GoldOverlap, _0x28436f.x, _0x28436f.y, _0x28436f.width, "right");
  } else {
    this.drawText(this.value(), _0x28436f.x, _0x28436f.y, _0x28436f.width, "right");
  }
  this.resetFontSettings();
};
Window_StatusBase.prototype.drawParamText = function (_0x59dede, _0x312b5a, _0x13336b, _0x64b5e7, _0x990f) {
  _0x64b5e7 = String(_0x64b5e7 || '').toUpperCase();
  if (VisuMZ.CoreEngine.Settings.Param.DrawIcons) {
    const _0x1b7a2f = VisuMZ.GetParamIcon(_0x64b5e7);
    if (_0x990f) {
      this.drawIconBySize(_0x1b7a2f, _0x59dede, _0x312b5a, this.gaugeLineHeight());
      _0x13336b -= this.gaugeLineHeight() + 0x2;
      _0x59dede += this.gaugeLineHeight() + 0x2;
    } else {
      const _0x576c3e = ImageManager.standardIconWidth || 0x20;
      const _0x30f322 = ImageManager.standardIconHeight || 0x20;
      const _0x577e56 = _0x576c3e - ImageManager.iconWidth;
      const _0x192c1e = _0x30f322 - ImageManager.iconHeight;
      let _0x30cd16 = 0x2;
      if (this.lineHeight() !== 0x24) {
        _0x30cd16 = Math.floor((this.lineHeight() - _0x30f322) / 0x2);
      }
      const _0x446861 = _0x59dede + Math.floor(_0x577e56 / 0x2) + 0x2;
      const _0x1a5c7b = _0x312b5a + Math.floor(_0x192c1e / 0x2) + _0x30cd16;
      this.drawIcon(_0x1b7a2f, _0x446861, _0x1a5c7b);
      _0x13336b -= _0x576c3e + 0x4;
      _0x59dede += _0x576c3e + 0x4;
    }
  }
  const _0x22c41b = TextManager.param(_0x64b5e7);
  this.resetFontSettings();
  this.changeTextColor(ColorManager.systemColor());
  if (_0x990f) {
    this.contents.fontSize = this.smallParamFontSize();
    this.contents.drawText(_0x22c41b, _0x59dede, _0x312b5a, _0x13336b, this.gaugeLineHeight(), "left");
  } else {
    this.drawText(_0x22c41b, _0x59dede, _0x312b5a, _0x13336b);
  }
  this.resetFontSettings();
};
Window_StatusBase.prototype.smallParamFontSize = function () {
  return $gameSystem.mainFontSize() - 0x8;
};
Window_StatusBase.prototype.drawActorClass = function (_0x306918, _0x256829, _0x3fcb6d, _0x322a85) {
  _0x322a85 = _0x322a85 || 0xa8;
  this.resetTextColor();
  if (VisuMZ.CoreEngine.Settings.UI.TextCodeClassNames) {
    this.drawTextEx(_0x306918.currentClass().name, _0x256829, _0x3fcb6d, _0x322a85);
  } else {
    const _0xb50952 = _0x306918.currentClass().name.replace(/\\I\[(\d+)\]/gi, '');
    this.drawText(_0xb50952, _0x256829, _0x3fcb6d, _0x322a85);
  }
};
Window_StatusBase.prototype.drawActorNickname = function (_0xb9bd3c, _0x28a766, _0x5f5200, _0x2495f9) {
  _0x2495f9 = _0x2495f9 || 0x10e;
  this.resetTextColor();
  if (VisuMZ.CoreEngine.Settings.UI.TextCodeNicknames) {
    this.drawTextEx(_0xb9bd3c.nickname(), _0x28a766, _0x5f5200, _0x2495f9);
  } else {
    this.drawText(_0xb9bd3c.nickname(), _0x28a766, _0x5f5200, _0x2495f9);
  }
};
VisuMZ.CoreEngine.Window_StatusBase_drawActorLevel = Window_StatusBase.prototype.drawActorLevel;
Window_StatusBase.prototype.drawActorLevel = function (_0x514967, _0x160f8f, _0x2b5aa0) {
  if (VisuMZ.CoreEngine.Settings.Param.ShowActorLevel === false) {
    return;
  }
  if (this.isExpGaugeDrawn()) {
    this.drawActorExpGauge(_0x514967, _0x160f8f, _0x2b5aa0);
  }
  VisuMZ.CoreEngine.Window_StatusBase_drawActorLevel.call(this, _0x514967, _0x160f8f, _0x2b5aa0);
};
Window_StatusBase.prototype.isExpGaugeDrawn = function () {
  return VisuMZ.CoreEngine.Settings.UI.LvExpGauge;
};
Window_StatusBase.prototype.drawActorExpGauge = function (_0x1c7d8c, _0x449c81, _0x2c56ae) {
  if (!_0x1c7d8c) {
    return;
  }
  if (!_0x1c7d8c.isActor()) {
    return;
  }
  const _0x332b27 = _0x1c7d8c.expRate();
  let _0x1ea2ec = ColorManager.expGaugeColor1();
  let _0x260852 = ColorManager.expGaugeColor2();
  if (_0x332b27 >= 0x1) {
    _0x1ea2ec = ColorManager.maxLvGaugeColor1();
    _0x260852 = ColorManager.maxLvGaugeColor2();
  }
  this.drawGauge(_0x449c81, _0x2c56ae, 0x80, _0x332b27, _0x1ea2ec, _0x260852);
};
Window_EquipStatus.prototype.drawAllParams = function () {
  let _0x2afbb4 = 0x0;
  for (const _0x217246 of VisuMZ.CoreEngine.Settings.Param.DisplayedParams) {
    const _0x304811 = this.itemPadding();
    const _0x445eb6 = this.paramY(_0x2afbb4);
    this.drawItem(_0x304811, _0x445eb6, _0x217246);
    _0x2afbb4++;
  }
};
Window_EquipStatus.prototype.drawParamName = function (_0x5cc8af, _0x218f4b, _0x34da47) {
  const _0x106424 = this.paramX() - this.itemPadding() * 0x2;
  this.drawParamText(_0x5cc8af, _0x218f4b, _0x106424, _0x34da47, false);
};
Window_EquipStatus.prototype.drawCurrentParam = function (_0x536451, _0x5cf1ec, _0x598c56) {
  const _0x1f75fa = this.paramWidth();
  this.resetTextColor();
  this.drawText(this._actor.paramValueByName(_0x598c56, true), _0x536451, _0x5cf1ec, _0x1f75fa, "right");
};
Window_EquipStatus.prototype.drawRightArrow = function (_0x2c2092, _0x3cb5d5) {
  const _0x232bc4 = this.rightArrowWidth();
  this.changeTextColor(ColorManager.systemColor());
  const _0x5e0693 = VisuMZ.CoreEngine.Settings.UI.ParamArrow;
  this.drawText(_0x5e0693, _0x2c2092, _0x3cb5d5, _0x232bc4, "center");
};
Window_EquipStatus.prototype.drawNewParam = function (_0x18e51d, _0x301ef4, _0x39b865) {
  const _0x42bcf8 = this.paramWidth();
  const _0x4b4e32 = this._tempActor.paramValueByName(_0x39b865);
  const _0x3889fa = _0x4b4e32 - this._actor.paramValueByName(_0x39b865);
  this.changeTextColor(ColorManager.paramchangeTextColor(_0x3889fa));
  this.drawText(this._tempActor.paramValueByName(_0x39b865, true), _0x18e51d, _0x301ef4, _0x42bcf8, "right");
};
VisuMZ.CoreEngine.Window_EquipItem_isEnabled = Window_EquipItem.prototype.isEnabled;
Window_EquipItem.prototype.isEnabled = function (_0x313e81) {
  return _0x313e81 && this._actor ? this._actor.canEquip(_0x313e81) : VisuMZ.CoreEngine.Window_EquipItem_isEnabled.call(this, _0x313e81);
};
Window_StatusParams.prototype.maxItems = function () {
  return VisuMZ.CoreEngine.Settings.Param.DisplayedParams.length;
};
Window_StatusParams.prototype.drawItem = function (_0xda8eb3) {
  const _0x5a7159 = this.itemLineRect(_0xda8eb3);
  const _0x4b5f29 = VisuMZ.CoreEngine.Settings.Param.DisplayedParams[_0xda8eb3];
  const _0x27c5c1 = this._actor.paramValueByName(_0x4b5f29, true);
  this.drawParamText(_0x5a7159.x, _0x5a7159.y, 0xa0, _0x4b5f29, false);
  this.resetTextColor();
  this.drawText(_0x27c5c1, _0x5a7159.x + 0xa0, _0x5a7159.y, 0x3c, "right");
};
if (VisuMZ.CoreEngine.Settings.KeyboardInput.EnableNameInput) {
  if (VisuMZ.CoreEngine.Settings.KeyboardInput.QwertyLayout) {
    Window_NameInput.LATIN1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', "'", '`', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '~', 'z', 'x', 'c', 'v', 'b', 'n', 'm', "\"", ';', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '<', '>', '[', ']', '-', '_', '/', " ", "Page", 'OK'];
  }
  ;
  VisuMZ.CoreEngine.Window_NameInput_initialize = Window_NameInput.prototype.initialize;
  Window_NameInput.prototype.initialize = function (_0x44174f) {
    this._mode = this.defaultInputMode();
    VisuMZ.CoreEngine.Window_NameInput_initialize.call(this, _0x44174f);
    if (this._mode === "default") {
      this.select(0x0);
    } else {
      Input.clear();
      this.deselect();
    }
  };
  Window_NameInput.prototype.defaultInputMode = function () {
    if (Input.isGamepadConnected()) {
      return "default";
    }
    return VisuMZ.CoreEngine.Settings.KeyboardInput.DefaultMode || "keyboard";
  };
  VisuMZ.CoreEngine.Window_NameInput_processHandling = Window_NameInput.prototype.processHandling;
  Window_NameInput.prototype.processHandling = function () {
    if (!this.isOpen()) {
      return;
    }
    if (!this.active) {
      return;
    }
    if (this._mode === "keyboard" && Input.isGamepadTriggered()) {
      this.switchModes('default');
    } else {
      if (Input.isSpecialCode("backspace")) {
        Input.clear();
        this.processBack();
      } else {
        if (Input.isTriggered('tab')) {
          Input.clear();
          if (this._mode === "keyboard") {
            this.switchModes("default");
          } else {
            this.switchModes("keyboard");
          }
        } else {
          if (this._mode === "keyboard") {
            this.processKeyboardHandling();
          } else if (Input.isSpecialCode("escape")) {
            Input.clear();
            this.switchModes('keyboard');
          } else {
            VisuMZ.CoreEngine.Window_NameInput_processHandling.call(this);
          }
        }
      }
    }
  };
  VisuMZ.CoreEngine.Window_NameInput_processTouch = Window_NameInput.prototype.processTouch;
  Window_NameInput.prototype.processTouch = function () {
    if (!this.isOpenAndActive()) {
      return;
    }
    if (this._mode === "keyboard") {
      if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
        this.switchModes("default");
      } else if (TouchInput.isCancelled()) {
        this.switchModes('default');
      }
    } else {
      VisuMZ.CoreEngine.Window_NameInput_processTouch.call(this);
    }
  };
  Window_NameInput.prototype.processKeyboardHandling = function () {
    if (Input.isSpecialCode("enter")) {
      Input.clear();
      this.onNameOk();
    } else {
      if (Input._inputString !== undefined) {
        let _0xd08c57 = Input._inputString;
        let _0x4d8226 = _0xd08c57.length;
        for (let _0x7d4189 = 0x0; _0x7d4189 < _0x4d8226; ++_0x7d4189) {
          if (this._editWindow.add(_0xd08c57[_0x7d4189])) {
            SoundManager.playOk();
          } else {
            SoundManager.playBuzzer();
          }
        }
        Input.clear();
      }
    }
  };
  Window_NameInput.prototype.switchModes = function (_0x3ae9d1) {
    let _0x442f81 = this._mode;
    this._mode = _0x3ae9d1;
    if (_0x442f81 !== this._mode) {
      this.refresh();
      SoundManager.playOk();
      if (this._mode === "default") {
        this.select(0x0);
      } else {
        this.select(-0x1);
      }
    }
  };
  VisuMZ.CoreEngine.Window_NameInput_cursorDown = Window_NameInput.prototype.cursorDown;
  Window_NameInput.prototype.cursorDown = function (_0x459897) {
    if (this._mode === "keyboard" && !Input.isArrowPressed()) {
      return;
    }
    if (Input.isNumpadPressed()) {
      return;
    }
    VisuMZ.CoreEngine.Window_NameInput_cursorDown.call(this, _0x459897);
    this.switchModes("default");
  };
  VisuMZ.CoreEngine.Window_NameInput_cursorUp = Window_NameInput.prototype.cursorUp;
  Window_NameInput.prototype.cursorUp = function (_0x3b0131) {
    if (this._mode === "keyboard" && !Input.isArrowPressed()) {
      return;
    }
    if (Input.isNumpadPressed()) {
      return;
    }
    VisuMZ.CoreEngine.Window_NameInput_cursorUp.call(this, _0x3b0131);
    this.switchModes("default");
  };
  VisuMZ.CoreEngine.Window_NameInput_cursorRight = Window_NameInput.prototype.cursorRight;
  Window_NameInput.prototype.cursorRight = function (_0x22ee31) {
    if (this._mode === 'keyboard' && !Input.isArrowPressed()) {
      return;
    }
    if (Input.isNumpadPressed()) {
      return;
    }
    VisuMZ.CoreEngine.Window_NameInput_cursorRight.call(this, _0x22ee31);
    this.switchModes("default");
  };
  VisuMZ.CoreEngine.Window_NameInput_cursorLeft = Window_NameInput.prototype.cursorLeft;
  Window_NameInput.prototype.cursorLeft = function (_0x516e8e) {
    if (this._mode === "keyboard" && !Input.isArrowPressed()) {
      return;
    }
    if (Input.isNumpadPressed()) {
      return;
    }
    VisuMZ.CoreEngine.Window_NameInput_cursorLeft.call(this, _0x516e8e);
    this.switchModes("default");
  };
  VisuMZ.CoreEngine.Window_NameInput_cursorPagedown = Window_NameInput.prototype.cursorPagedown;
  Window_NameInput.prototype.cursorPagedown = function () {
    if (this._mode === "keyboard") {
      return;
    }
    if (Input.isNumpadPressed()) {
      return;
    }
    VisuMZ.CoreEngine.Window_NameInput_cursorPagedown.call(this);
    this.switchModes("default");
  };
  VisuMZ.CoreEngine.Window_NameInput_cursorPageup = Window_NameInput.prototype.cursorPageup;
  Window_NameInput.prototype.cursorPageup = function () {
    if (this._mode === 'keyboard') {
      return;
    }
    if (Input.isNumpadPressed()) {
      return;
    }
    VisuMZ.CoreEngine.Window_NameInput_cursorPageup.call(this);
    this.switchModes("default");
  };
  VisuMZ.CoreEngine.Window_NameInput_refresh = Window_NameInput.prototype.refresh;
  Window_NameInput.prototype.refresh = function () {
    if (this._mode === "keyboard") {
      this.contents.clear();
      this.contentsBack.clear();
      this.resetTextColor();
      let _0x224356 = VisuMZ.CoreEngine.Settings.KeyboardInput.NameInputMessage.split("\n");
      let _0x264653 = _0x224356.length;
      let _0x1ae673 = (this.innerHeight - _0x264653 * this.lineHeight()) / 0x2;
      for (let _0x453c78 = 0x0; _0x453c78 < _0x264653; ++_0x453c78) {
        let _0x1fa9b4 = _0x224356[_0x453c78];
        let _0x51214c = this.textSizeEx(_0x1fa9b4).width;
        let _0x1396cc = Math.floor((this.contents.width - _0x51214c) / 0x2);
        this.drawTextEx(_0x1fa9b4, _0x1396cc, _0x1ae673);
        _0x1ae673 += this.lineHeight();
      }
    } else {
      VisuMZ.CoreEngine.Window_NameInput_refresh.call(this);
    }
  };
}
;
VisuMZ.CoreEngine.Window_ShopSell_isEnabled = Window_ShopSell.prototype.isEnabled;
Window_ShopSell.prototype.isEnabled = function (_0x57f04a) {
  return VisuMZ.CoreEngine.Settings.QoL.KeyItemProtect && DataManager.isKeyItem(_0x57f04a) ? false : VisuMZ.CoreEngine.Window_ShopSell_isEnabled.call(this, _0x57f04a);
};
Window_NumberInput.prototype.isUseModernControls = function () {
  return false;
};
if (VisuMZ.CoreEngine.Settings.KeyboardInput.EnableNumberInput) {
  VisuMZ.CoreEngine.Window_NumberInput_start = Window_NumberInput.prototype.start;
  Window_NumberInput.prototype.start = function () {
    VisuMZ.CoreEngine.Window_NumberInput_start.call(this);
    this.select(this._maxDigits - 0x1);
    Input.clear();
  };
  VisuMZ.CoreEngine.Window_NumberInput_processDigitChange = Window_NumberInput.prototype.processDigitChange;
  Window_NumberInput.prototype.processDigitChange = function () {
    if (!this.isOpenAndActive()) {
      return;
    }
    if (Input.isNumpadPressed()) {
      this.processKeyboardDigitChange();
    } else {
      if (Input.isSpecialCode("backspace")) {
        this.processKeyboardBackspace();
      } else {
        if (Input._inputSpecialKeyCode === 0x2e) {
          this.processKeyboardDelete();
        } else {
          if (Input._inputSpecialKeyCode === 0x24) {
            this.processKeyboardHome();
          } else if (Input._inputSpecialKeyCode === 0x23) {
            this.processKeyboardEnd();
          } else {
            VisuMZ.CoreEngine.Window_NumberInput_processDigitChange.call(this);
          }
        }
      }
    }
  };
  Window_NumberInput.prototype.processCursorMove = function () {
    if (!this.isCursorMovable()) {
      return;
    }
    if (Input.isNumpadPressed()) {
      this.processKeyboardDigitChange();
    } else {
      Window_Selectable.prototype.processCursorMove.call(this);
    }
  };
  Window_NumberInput.prototype.processCursorHomeEndTrigger = function () {};
  Window_NumberInput.prototype.processKeyboardDigitChange = function () {
    if (String(this._number).length >= this._maxDigits) {
      return;
    }
    const _0x34549f = Number(String(this._number) + Input._inputString);
    if (isNaN(_0x34549f)) {
      return;
    }
    this._number = _0x34549f;
    const _0x2de71c = '9'.repeat(this._maxDigits);
    this._number = this._number.clamp(0x0, _0x2de71c);
    Input.clear();
    this.refresh();
    SoundManager.playCursor();
    this.select(this._maxDigits - 0x1);
  };
  Window_NumberInput.prototype.processKeyboardBackspace = function () {
    this._number = Number(String(this._number).slice(0x0, -0x1));
    this._number = Math.max(0x0, this._number);
    Input.clear();
    this.refresh();
    SoundManager.playCursor();
    this.select(this._maxDigits - 0x1);
  };
  Window_NumberInput.prototype.processKeyboardDelete = function () {
    this._number = Number(String(this._number).substring(0x1));
    this._number = Math.max(0x0, this._number);
    Input.clear();
    this.refresh();
    SoundManager.playCursor();
    this.select(this._maxDigits - 0x1);
  };
  Window_NumberInput.prototype.processKeyboardHome = function () {
    if (this.index() === 0x0) {
      return;
    }
    Input.clear();
    this.refresh();
    SoundManager.playCursor();
    this.select(0x0);
  };
  Window_NumberInput.prototype.processKeyboardEnd = function () {
    if (this.index() === this._maxDigits - 0x1) {
      return;
    }
    Input.clear();
    this.refresh();
    SoundManager.playCursor();
    this.select(this._maxDigits - 0x1);
  };
}
;
VisuMZ.CoreEngine.Window_MapName_refresh = Window_MapName.prototype.refresh;
Window_MapName.prototype.refresh = function () {
  if (VisuMZ.CoreEngine.Settings.QoL.MapNameTextCode) {
    this.refreshWithTextCodeSupport();
  } else {
    VisuMZ.CoreEngine.Window_MapName_refresh.call(this);
  }
};
Window_MapName.prototype.refreshWithTextCodeSupport = function () {
  this.contents.clear();
  if ($gameMap.displayName()) {
    const _0x461537 = this.innerWidth;
    this.drawBackground(0x0, 0x0, _0x461537, this.lineHeight());
    const _0x1da3f3 = this.textSizeEx($gameMap.displayName()).width;
    this.drawTextEx($gameMap.displayName(), Math.floor((_0x461537 - _0x1da3f3) / 0x2), 0x0);
  }
};
Window_TitleCommand._commandList = VisuMZ.CoreEngine.Settings.TitleCommandList;
Window_TitleCommand.prototype.makeCommandList = function () {
  this.makeCoreEngineCommandList();
};
Window_TitleCommand.prototype.makeCoreEngineCommandList = function () {
  for (const _0x14c706 of Window_TitleCommand._commandList) {
    if (_0x14c706.ShowJS.call(this)) {
      const _0x2fa973 = _0x14c706.Symbol;
      let _0x390872 = _0x14c706.TextStr;
      if (['', "Untitled"].includes(_0x390872)) {
        _0x390872 = _0x14c706.TextJS.call(this);
      }
      const _0x36cbcf = _0x14c706.EnableJS.call(this);
      const _0x13a448 = _0x14c706.ExtJS.call(this);
      this.addCommand(_0x390872, _0x2fa973, _0x36cbcf, _0x13a448);
      this.setHandler(_0x2fa973, _0x14c706.CallHandlerJS.bind(this, _0x13a448));
    }
  }
};
VisuMZ.CoreEngine.Window_TitleCommand_selectLast = Window_TitleCommand.prototype.selectLast;
Window_TitleCommand.prototype.selectLast = function () {
  VisuMZ.CoreEngine.Window_TitleCommand_selectLast.call(this);
  if (!Window_TitleCommand._lastCommandSymbol) {
    return;
  }
  const _0x491671 = this.findSymbol(Window_TitleCommand._lastCommandSymbol);
  const _0x2cc648 = Math.floor(this.maxVisibleItems() / 0x2) - 0x1;
  this.smoothSelect(_0x491671);
  if (this._scrollDuration > 0x1) {
    this._scrollDuration = 0x1;
    this.updateSmoothScroll();
  }
  this.setTopRow(_0x491671 - _0x2cc648);
};
Window_GameEnd._commandList = VisuMZ.CoreEngine.Settings.MenuLayout.GameEnd.CommandList;
Window_GameEnd.prototype.makeCommandList = function () {
  this.makeCoreEngineCommandList();
};
Window_GameEnd.prototype.makeCoreEngineCommandList = function () {
  for (const _0x2635ff of Window_GameEnd._commandList) {
    if (_0x2635ff.ShowJS.call(this)) {
      const _0x46c96d = _0x2635ff.Symbol;
      let _0x19f03c = _0x2635ff.TextStr;
      if (['', 'Untitled'].includes(_0x19f03c)) {
        _0x19f03c = _0x2635ff.TextJS.call(this);
      }
      const _0x4bdda7 = _0x2635ff.EnableJS.call(this);
      const _0x469b04 = _0x2635ff.ExtJS.call(this);
      this.addCommand(_0x19f03c, _0x46c96d, _0x4bdda7, _0x469b04);
      this.setHandler(_0x46c96d, _0x2635ff.CallHandlerJS.bind(this, _0x469b04));
    }
  }
};
function Window_ButtonAssist() {
  this.initialize(...arguments);
}
Window_ButtonAssist.prototype = Object.create(Window_Base.prototype);
Window_ButtonAssist.prototype.constructor = Window_ButtonAssist;
Window_ButtonAssist.prototype.initialize = function (_0x535be9) {
  this._data = {};
  Window_Base.prototype.initialize.call(this, _0x535be9);
  this.setBackgroundType(VisuMZ.CoreEngine.Settings.ButtonAssist.BgType || 0x0);
  this.refresh();
};
Window_ButtonAssist.prototype.lineHeight = function () {
  return this.innerHeight || Window_Base.prototype.lineHeight.call(this);
};
Window_ButtonAssist.prototype.makeFontBigger = function () {
  if (this.contents.fontSize <= 0x60) {
    this.contents.fontSize += 0x6;
  }
};
Window_ButtonAssist.prototype.makeFontSmaller = function () {
  if (this.contents.fontSize >= 0x18) {
    this.contents.fontSize -= 0x6;
  }
};
Window_ButtonAssist.prototype.update = function () {
  Window_Base.prototype.update.call(this);
  this.updateKeyText();
};
Window_ButtonAssist.prototype.updatePadding = function () {
  this.padding = SceneManager._scene.getButtonAssistLocation() !== "button" ? 0x0 : 0x8;
};
Window_ButtonAssist.prototype.updateKeyText = function () {
  const _0x42fdca = SceneManager._scene;
  for (let _0x2db9a9 = 0x1; _0x2db9a9 <= 0x5; _0x2db9a9++) {
    if (this._data["key%1".format(_0x2db9a9)] !== _0x42fdca["buttonAssistKey%1".format(_0x2db9a9)]()) {
      return this.refresh();
    }
    if (this._data["text%1".format(_0x2db9a9)] !== _0x42fdca["buttonAssistText%1".format(_0x2db9a9)]()) {
      return this.refresh();
    }
  }
};
Window_ButtonAssist.prototype.refresh = function () {
  this.contents.clear();
  for (let _0x18959d = 0x1; _0x18959d <= 0x5; _0x18959d++) {
    this.drawSegment(_0x18959d);
  }
};
Window_ButtonAssist.prototype.drawSegment = function (_0x37dc93) {
  const _0xe5cd0d = this.innerWidth / 0x5;
  const _0x42e1c3 = SceneManager._scene;
  const _0x2a49ea = _0x42e1c3["buttonAssistKey%1".format(_0x37dc93)]();
  const _0x2490f5 = _0x42e1c3["buttonAssistText%1".format(_0x37dc93)]();
  this._data['key%1'.format(_0x37dc93)] = _0x2a49ea;
  this._data["text%1".format(_0x37dc93)] = _0x2490f5;
  if (_0x2a49ea === '') {
    return;
  }
  if (_0x2490f5 === '') {
    return;
  }
  const _0x37b0fa = _0x42e1c3["buttonAssistOffset%1".format(_0x37dc93)]();
  const _0x6f5223 = this.itemPadding();
  const _0x1caeb1 = _0xe5cd0d * (_0x37dc93 - 0x1) + _0x6f5223 + _0x37b0fa;
  const _0x40f064 = VisuMZ.CoreEngine.Settings.ButtonAssist.TextFmt;
  this.drawTextEx(_0x40f064.format(_0x2a49ea, _0x2490f5), _0x1caeb1, 0x0, _0xe5cd0d - _0x6f5223 * 0x2);
};
VisuMZ.CoreEngine.Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
Game_Interpreter.prototype.updateWaitMode = function () {
  if ($gameTemp._pictureCoordinatesMode !== undefined) {
    return VisuMZ.CoreEngine.UpdatePictureCoordinates();
  }
  return VisuMZ.CoreEngine.Game_Interpreter_updateWaitMode.call(this);
};
VisuMZ.CoreEngine.UpdatePictureCoordinates = function () {
  const _0x189c9e = $gameTemp._pictureCoordinatesMode || 0x0;
  if (_0x189c9e < 0x0 || _0x189c9e > 0x64 || TouchInput.isCancelled() || Input.isTriggered("cancel")) {
    $gameTemp._pictureCoordinatesMode = undefined;
    Input.clear();
    TouchInput.clear();
  }
  const _0x14b1b9 = $gameScreen.picture(_0x189c9e);
  if (_0x14b1b9) {
    _0x14b1b9._x = TouchInput._x;
    _0x14b1b9._y = TouchInput._y;
  }
  VisuMZ.CoreEngine.updatePictureCoordinates();
  return $gameTemp._pictureCoordinatesMode !== undefined;
};
VisuMZ.CoreEngine.updatePictureCoordinates = function () {
  const _0x4117ca = SceneManager._scene;
  if (!_0x4117ca) {
    return;
  }
  if (!_0x4117ca._pictureCoordinatesWindow) {
    SoundManager.playLoad();
    _0x4117ca._pictureCoordinatesWindow = new Window_PictureCoordinates();
    _0x4117ca.addChild(_0x4117ca._pictureCoordinatesWindow);
  }
  if ($gameTemp._pictureCoordinatesMode === undefined) {
    SoundManager.playCancel();
    _0x4117ca.removeChild(_0x4117ca._pictureCoordinatesWindow);
    _0x4117ca._pictureCoordinatesWindow = undefined;
  }
};
function Window_PictureCoordinates() {
  this.initialize(...arguments);
}
Window_PictureCoordinates.prototype = Object.create(Window_Base.prototype);
Window_PictureCoordinates.prototype.constructor = Window_PictureCoordinates;
Window_PictureCoordinates.prototype.initialize = function () {
  this._lastOrigin = "nah";
  this._lastX = "nah";
  this._lastY = 'nah';
  const _0x54bbcb = this.windowRect();
  Window_Base.prototype.initialize.call(this, _0x54bbcb);
  this.setBackgroundType(0x2);
};
Window_PictureCoordinates.prototype.windowRect = function () {
  let _0x5e2a5d = Graphics.height - this.lineHeight();
  let _0x27933e = Graphics.width;
  let _0x532e4c = this.lineHeight();
  return new Rectangle(0x0, _0x5e2a5d, _0x27933e, _0x532e4c);
};
Window_PictureCoordinates.prototype.updatePadding = function () {
  this.padding = 0x0;
};
Window_PictureCoordinates.prototype.update = function () {
  Window_Base.prototype.update.call(this);
  this.updateData();
};
Window_PictureCoordinates.prototype.updateData = function () {
  if (!this.needsUpdate()) {
    return;
  }
  this.refresh();
};
Window_PictureCoordinates.prototype.needsUpdate = function () {
  const _0x133834 = $gameTemp._pictureCoordinatesMode;
  const _0x5cf0e4 = $gameScreen.picture(_0x133834);
  return _0x5cf0e4 ? this._lastOrigin !== _0x5cf0e4._origin || this._lastX !== _0x5cf0e4._x || this._lastY !== _0x5cf0e4._y : false;
};
Window_PictureCoordinates.prototype.refresh = function () {
  this.contents.clear();
  const _0x371a47 = $gameTemp._pictureCoordinatesMode;
  const _0xd8d924 = $gameScreen.picture(_0x371a47);
  if (!_0xd8d924) {
    return;
  }
  this._lastOrigin = _0xd8d924._origin;
  this._lastX = _0xd8d924._x;
  this._lastY = _0xd8d924._y;
  const _0x2e3b63 = ColorManager.itemBackColor1();
  this.contents.fillRect(0x0, 0x0, this.innerWidth, this.innerHeight, _0x2e3b63);
  const _0x2b8715 = " Origin: %1".format(_0xd8d924._origin === 0x0 ? "Upper Left" : "Center");
  const _0x4ef3da = "X: %1".format(_0xd8d924._x);
  const _0x4efcf6 = "Y: %1".format(_0xd8d924._y);
  const _0x549543 = "%1: Exit ".format(TextManager.getInputButtonString("cancel"));
  let _0x5698ad = Math.floor(this.innerWidth / 0x4);
  this.drawText(_0x2b8715, _0x5698ad * 0x0, 0x0, _0x5698ad);
  this.drawText(_0x4ef3da, _0x5698ad * 0x1, 0x0, _0x5698ad, "center");
  this.drawText(_0x4efcf6, _0x5698ad * 0x2, 0x0, _0x5698ad, "center");
  const _0x24f437 = this.textSizeEx(_0x549543).width;
  const _0x17e550 = this.innerWidth - _0x24f437;
  this.drawTextEx(_0x549543, _0x17e550, 0x0, _0x24f437);
};
function Window_TextPopup() {
  this.initialize(...arguments);
}
Window_TextPopup.prototype = Object.create(Window_Base.prototype);
Window_TextPopup.prototype.constructor = Window_TextPopup;
Window_TextPopup.SETTINGS = {
  'framesPerChar': VisuMZ.CoreEngine.Settings.Window.DurationPerChat ?? 1.5,
  'framesMin': VisuMZ.CoreEngine.Settings.Window.MinDuration ?? 0x5a,
  'framesMax': VisuMZ.CoreEngine.Settings.Window.MaxDuration ?? 0x12c
};
Window_TextPopup.prototype.initialize = function () {
  const _0x588ef5 = new Rectangle(0x0, 0x0, 0x1, 0x1);
  Window_Base.prototype.initialize.call(this, _0x588ef5);
  this.openness = 0x0;
  this._text = '';
  this._textQueue = [];
  this._timeDuration = 0x0;
};
Window_TextPopup.prototype.isAutoColorAffected = function () {
  return true;
};
Window_TextPopup.prototype.addQueue = function (_0x2d2f9b) {
  if (this._textQueue[this._textQueue.length - 0x1] === _0x2d2f9b) {
    return;
  }
  this._textQueue.push(_0x2d2f9b);
  SceneManager._scene.addChild(this);
};
Window_TextPopup.prototype.update = function () {
  Window_Base.prototype.update.call(this);
  this.updateText();
  this.updateDuration();
};
Window_TextPopup.prototype.updateText = function () {
  if (this._text !== '') {
    return;
  }
  if (this._textQueue.length <= 0x0) {
    return;
  }
  if (!this.isClosed()) {
    return;
  }
  this._text = this._textQueue.shift();
  const _0x28d7b5 = Window_TextPopup.SETTINGS;
  const _0x5d14c3 = Math.ceil(this._text.length * _0x28d7b5.framesPerChar);
  this._timeDuration = _0x5d14c3.clamp(_0x28d7b5.framesMin, _0x28d7b5.framesMax);
  const _0x1b5586 = this.textSizeEx(this._text);
  let _0x23cb40 = _0x1b5586.width + this.itemPadding() * 0x2;
  _0x23cb40 += $gameSystem.windowPadding() * 0x2;
  let _0xf07935 = Math.max(_0x1b5586.height, this.lineHeight());
  _0xf07935 += $gameSystem.windowPadding() * 0x2;
  const _0x133ffe = Math.round((Graphics.width - _0x23cb40) / 0x2);
  const _0x568fa2 = Math.round((Graphics.height - _0xf07935) / 0x2);
  const _0x574baa = new Rectangle(_0x133ffe, _0x568fa2, _0x23cb40, _0xf07935);
  this.move(_0x574baa.x, _0x574baa.y, _0x574baa.width, _0x574baa.height);
  this.createContents();
  this.refresh();
  this.open();
  SceneManager._scene.addChild(this);
};
Window_TextPopup.prototype.refresh = function () {
  const _0x2b1392 = this.baseTextRect();
  this.contents.clear();
  this.drawTextEx(this._text, _0x2b1392.x, _0x2b1392.y, _0x2b1392.width);
};
Window_TextPopup.prototype.updateDuration = function () {
  if (this.isOpening() || this.isClosing()) {
    return;
  }
  if (this._timeDuration <= 0x0) {
    return;
  }
  this._timeDuration--;
  if (this._timeDuration <= 0x0) {
    this.close();
    this._text = '';
  }
};
VisuMZ.ShowDevTools = function (_0x13df32) {
  if (Utils.isOptionValid('test')) {
    var _0x268380 = require("nw.gui").Window.get();
    SceneManager.showDevTools();
    if (_0x13df32) {
      setTimeout(_0x268380.focus.bind(_0x268380), 0x190);
    }
  }
};
VisuMZ.ApplyEasing = function (_0x4efd65, _0x38d875) {
  _0x38d875 = _0x38d875.toUpperCase();
  switch (_0x38d875) {
    case 'LINEAR':
      return _0x4efd65;
    case 'INSINE':
      return -0x1 * Math.cos(_0x4efd65 * (Math.PI / 0x2)) + 0x1;
    case "OUTSINE":
      return Math.sin(_0x4efd65 * (Math.PI / 0x2));
    case "INOUTSINE":
      return -0.5 * (Math.cos(Math.PI * _0x4efd65) - 0x1);
    case "INQUAD":
      return _0x4efd65 * _0x4efd65;
    case "OUTQUAD":
      return _0x4efd65 * (0x2 - _0x4efd65);
    case "INOUTQUAD":
      return _0x4efd65 < 0.5 ? 0x2 * _0x4efd65 * _0x4efd65 : -0x1 + (0x4 - 0x2 * _0x4efd65) * _0x4efd65;
    case "INCUBIC":
      return _0x4efd65 * _0x4efd65 * _0x4efd65;
    case 'OUTCUBIC':
      var _0x25f050 = _0x4efd65 - 0x1;
      return _0x25f050 * _0x25f050 * _0x25f050 + 0x1;
    case "INOUTCUBIC":
      return _0x4efd65 < 0.5 ? 0x4 * _0x4efd65 * _0x4efd65 * _0x4efd65 : (_0x4efd65 - 0x1) * (0x2 * _0x4efd65 - 0x2) * (0x2 * _0x4efd65 - 0x2) + 0x1;
    case "INQUART":
      return _0x4efd65 * _0x4efd65 * _0x4efd65 * _0x4efd65;
    case 'OUTQUART':
      var _0x25f050 = _0x4efd65 - 0x1;
      return 0x1 - _0x25f050 * _0x25f050 * _0x25f050 * _0x25f050;
    case "INOUTQUART":
      var _0x25f050 = _0x4efd65 - 0x1;
      return _0x4efd65 < 0.5 ? 0x8 * _0x4efd65 * _0x4efd65 * _0x4efd65 * _0x4efd65 : 0x1 - 0x8 * _0x25f050 * _0x25f050 * _0x25f050 * _0x25f050;
    case "INQUINT":
      return _0x4efd65 * _0x4efd65 * _0x4efd65 * _0x4efd65 * _0x4efd65;
    case 'OUTQUINT':
      var _0x25f050 = _0x4efd65 - 0x1;
      return 0x1 + _0x25f050 * _0x25f050 * _0x25f050 * _0x25f050 * _0x25f050;
    case "INOUTQUINT":
      var _0x25f050 = _0x4efd65 - 0x1;
      return _0x4efd65 < 0.5 ? 0x10 * _0x4efd65 * _0x4efd65 * _0x4efd65 * _0x4efd65 * _0x4efd65 : 0x1 + 0x10 * _0x25f050 * _0x25f050 * _0x25f050 * _0x25f050 * _0x25f050;
    case 'INEXPO':
      if (_0x4efd65 === 0x0) {
        return 0x0;
      }
      return Math.pow(0x2, 0xa * (_0x4efd65 - 0x1));
    case "OUTEXPO":
      if (_0x4efd65 === 0x1) {
        return 0x1;
      }
      return -Math.pow(0x2, -0xa * _0x4efd65) + 0x1;
    case 'INOUTEXPO':
      if (_0x4efd65 === 0x0 || _0x4efd65 === 0x1) {
        return _0x4efd65;
      }
      var _0x4da0d5 = _0x4efd65 * 0x2;
      var _0x1db19b = _0x4da0d5 - 0x1;
      if (_0x4da0d5 < 0x1) {
        return 0.5 * Math.pow(0x2, 0xa * _0x1db19b);
      }
      return 0.5 * (-Math.pow(0x2, -0xa * _0x1db19b) + 0x2);
    case "INCIRC":
      var _0x4da0d5 = _0x4efd65 / 0x1;
      return -0x1 * (Math.sqrt(0x1 - _0x4da0d5 * _0x4efd65) - 0x1);
    case "OUTCIRC":
      var _0x25f050 = _0x4efd65 - 0x1;
      return Math.sqrt(0x1 - _0x25f050 * _0x25f050);
    case "INOUTCIRC":
      var _0x4da0d5 = _0x4efd65 * 0x2;
      var _0x1db19b = _0x4da0d5 - 0x2;
      if (_0x4da0d5 < 0x1) {
        return -0.5 * (Math.sqrt(0x1 - _0x4da0d5 * _0x4da0d5) - 0x1);
      }
      return 0.5 * (Math.sqrt(0x1 - _0x1db19b * _0x1db19b) + 0x1);
    case "INBACK":
      return _0x4efd65 * _0x4efd65 * (2.70158 * _0x4efd65 - 1.70158);
    case "OUTBACK":
      var _0x4da0d5 = _0x4efd65 / 0x1 - 0x1;
      return _0x4da0d5 * _0x4da0d5 * (2.70158 * _0x4da0d5 + 1.70158) + 0x1;
      break;
    case 'INOUTBACK':
      var _0x4da0d5 = _0x4efd65 * 0x2;
      var _0x59c483 = _0x4da0d5 - 0x2;
      var _0x306b55 = 2.5949095;
      if (_0x4da0d5 < 0x1) {
        return 0.5 * _0x4da0d5 * _0x4da0d5 * ((_0x306b55 + 0x1) * _0x4da0d5 - _0x306b55);
      }
      return 0.5 * (_0x59c483 * _0x59c483 * ((_0x306b55 + 0x1) * _0x59c483 + _0x306b55) + 0x2);
    case "INELASTIC":
      if (_0x4efd65 === 0x0 || _0x4efd65 === 0x1) {
        return _0x4efd65;
      }
      var _0x4da0d5 = _0x4efd65 / 0x1;
      var _0x1db19b = _0x4da0d5 - 0x1;
      var _0x214fe4 = 0.30000000000000004;
      var _0x306b55 = _0x214fe4 / (0x2 * Math.PI) * Math.asin(0x1);
      return -(Math.pow(0x2, 0xa * _0x1db19b) * Math.sin((_0x1db19b - _0x306b55) * (0x2 * Math.PI) / _0x214fe4));
    case "OUTELASTIC":
      var _0x214fe4 = 0.30000000000000004;
      var _0x4da0d5 = _0x4efd65 * 0x2;
      if (_0x4efd65 === 0x0 || _0x4efd65 === 0x1) {
        return _0x4efd65;
      }
      var _0x306b55 = _0x214fe4 / (0x2 * Math.PI) * Math.asin(0x1);
      return Math.pow(0x2, -0xa * _0x4da0d5) * Math.sin((_0x4da0d5 - _0x306b55) * (0x2 * Math.PI) / _0x214fe4) + 0x1;
    case 'INOUTELASTIC':
      var _0x214fe4 = 0.30000000000000004;
      if (_0x4efd65 === 0x0 || _0x4efd65 === 0x1) {
        return _0x4efd65;
      }
      var _0x4da0d5 = _0x4efd65 * 0x2;
      var _0x1db19b = _0x4da0d5 - 0x1;
      var _0x306b55 = _0x214fe4 / (0x2 * Math.PI) * Math.asin(0x1);
      if (_0x4da0d5 < 0x1) {
        return -0.5 * (Math.pow(0x2, 0xa * _0x1db19b) * Math.sin((_0x1db19b - _0x306b55) * (0x2 * Math.PI) / _0x214fe4));
      }
      return Math.pow(0x2, -0xa * _0x1db19b) * Math.sin((_0x1db19b - _0x306b55) * (0x2 * Math.PI) / _0x214fe4) * 0.5 + 0x1;
    case "OUTBOUNCE":
      var _0x4da0d5 = _0x4efd65 / 0x1;
      if (_0x4da0d5 < 0.36363636363636365) {
        return 7.5625 * _0x4da0d5 * _0x4da0d5;
      } else {
        if (_0x4da0d5 < 0.7272727272727273) {
          var _0x59c483 = _0x4da0d5 - 0.5454545454545454;
          return 7.5625 * _0x59c483 * _0x59c483 + 0.75;
        } else {
          if (_0x4da0d5 < 0.9090909090909091) {
            var _0x59c483 = _0x4da0d5 - 0.8181818181818182;
            return 7.5625 * _0x59c483 * _0x59c483 + 0.9375;
          } else {
            var _0x59c483 = _0x4da0d5 - 0.9545454545454546;
            return 7.5625 * _0x59c483 * _0x59c483 + 0.984375;
          }
        }
      }
    case 'INBOUNCE':
      var _0x3470f2 = 0x1 - VisuMZ.ApplyEasing(0x1 - _0x4efd65, "outbounce");
      return _0x3470f2;
    case "INOUTBOUNCE":
      if (_0x4efd65 < 0.5) {
        var _0x3470f2 = VisuMZ.ApplyEasing(_0x4efd65 * 0x2, "inbounce") * 0.5;
      } else {
        var _0x3470f2 = VisuMZ.ApplyEasing(_0x4efd65 * 0x2 - 0x1, "outbounce") * 0.5 + 0.5;
      }
      return _0x3470f2;
    default:
      return _0x4efd65;
  }
};
VisuMZ.GetParamIcon = function (_0x40362c) {
  _0x40362c = String(_0x40362c).toUpperCase();
  const _0x1d3499 = VisuMZ.CoreEngine.Settings.Param;
  if (_0x40362c === 'MAXHP') {
    return _0x1d3499.IconParam0;
  }
  if (_0x40362c === "MAXMP") {
    return _0x1d3499.IconParam1;
  }
  if (_0x40362c === "ATK") {
    return _0x1d3499.IconParam2;
  }
  if (_0x40362c === "DEF") {
    return _0x1d3499.IconParam3;
  }
  if (_0x40362c === "MAT") {
    return _0x1d3499.IconParam4;
  }
  if (_0x40362c === "MDF") {
    return _0x1d3499.IconParam5;
  }
  if (_0x40362c === "AGI") {
    return _0x1d3499.IconParam6;
  }
  if (_0x40362c === "LUK") {
    return _0x1d3499.IconParam7;
  }
  if (_0x40362c === "HIT") {
    return _0x1d3499.IconXParam0;
  }
  if (_0x40362c === "EVA") {
    return _0x1d3499.IconXParam1;
  }
  if (_0x40362c === "CRI") {
    return _0x1d3499.IconXParam2;
  }
  if (_0x40362c === "CEV") {
    return _0x1d3499.IconXParam3;
  }
  if (_0x40362c === 'MEV') {
    return _0x1d3499.IconXParam4;
  }
  if (_0x40362c === "MRF") {
    return _0x1d3499.IconXParam5;
  }
  if (_0x40362c === "CNT") {
    return _0x1d3499.IconXParam6;
  }
  if (_0x40362c === "HRG") {
    return _0x1d3499.IconXParam7;
  }
  if (_0x40362c === "MRG") {
    return _0x1d3499.IconXParam8;
  }
  if (_0x40362c === "TRG") {
    return _0x1d3499.IconXParam9;
  }
  if (_0x40362c === "TGR") {
    return _0x1d3499.IconSParam0;
  }
  if (_0x40362c === "GRD") {
    return _0x1d3499.IconSParam1;
  }
  if (_0x40362c === "REC") {
    return _0x1d3499.IconSParam2;
  }
  if (_0x40362c === 'PHA') {
    return _0x1d3499.IconSParam3;
  }
  if (_0x40362c === "MCR") {
    return _0x1d3499.IconSParam4;
  }
  if (_0x40362c === 'TCR') {
    return _0x1d3499.IconSParam5;
  }
  if (_0x40362c === 'PDR') {
    return _0x1d3499.IconSParam6;
  }
  if (_0x40362c === 'MDR') {
    return _0x1d3499.IconSParam7;
  }
  if (_0x40362c === "FDR") {
    return _0x1d3499.IconSParam8;
  }
  if (_0x40362c === "EXR") {
    return _0x1d3499.IconSParam9;
  }
  if (VisuMZ.CoreEngine.CustomParamIcons[_0x40362c]) {
    return VisuMZ.CoreEngine.CustomParamIcons[_0x40362c] || 0x0;
  }
  return 0x0;
};
VisuMZ.ConvertNumberToString = function (_0x29b142, _0x3d0583, _0x1462be) {
  if (_0x1462be === undefined && _0x29b142 % 0x1 === 0x0) {
    return _0x29b142;
  }
  if (_0x1462be !== undefined && ["MAXHP", "MAXMP", 'ATK', "DEF", "MAT", "MDF", 'AGI', "LUK"].includes(String(_0x1462be).toUpperCase().trim())) {
    return _0x29b142;
  }
  _0x3d0583 = _0x3d0583 || 0x0;
  if (VisuMZ.CoreEngine.CustomParamAbb[_0x1462be]) {
    return VisuMZ.CoreEngine.CustomParamType[_0x1462be] === "integer" ? _0x29b142 : String((_0x29b142 * 0x64).toFixed(_0x3d0583)) + '%';
  }
  return String((_0x29b142 * 0x64).toFixed(_0x3d0583)) + '%';
};
VisuMZ.GroupDigits = function (_0x15c8ff) {
  _0x15c8ff = String(_0x15c8ff);
  if (!_0x15c8ff) {
    return _0x15c8ff;
  }
  if (typeof _0x15c8ff !== "string") {
    return _0x15c8ff;
  }
  const _0x358b3b = VisuMZ.CoreEngine.Settings.QoL.DigitGroupingLocale || 'en-US';
  const _0x4c6a42 = {
    'maximumFractionDigits': 0x6
  };
  _0x15c8ff = _0x15c8ff.replace(/\[(.*?)\]/g, (_0x10ba27, _0x31fb4a) => {
    return VisuMZ.PreserveNumbers(_0x31fb4a, '[', ']');
  });
  _0x15c8ff = _0x15c8ff.replace(/<(.*?)>/g, (_0x2576d0, _0x5c1bc4) => {
    return VisuMZ.PreserveNumbers(_0x5c1bc4, '<', '>');
  });
  _0x15c8ff = _0x15c8ff.replace(/\{\{(.*?)\}\}/g, (_0x42a140, _0x280a22) => {
    return VisuMZ.PreserveNumbers(_0x280a22, '', '');
  });
  _0x15c8ff = _0x15c8ff.replace(/(\d+\.?\d*)/g, (_0xf6c847, _0x2ab63b) => {
    if (_0x2ab63b[0x0] === '0') {
      return _0x2ab63b;
    }
    if (_0x2ab63b[_0x2ab63b.length - 0x1] === '.') {
      return Number(_0x2ab63b).toLocaleString(_0x358b3b, _0x4c6a42) + '.';
    } else {
      return _0x2ab63b[_0x2ab63b.length - 0x1] === ',' ? Number(_0x2ab63b).toLocaleString(_0x358b3b, _0x4c6a42) + ',' : Number(_0x2ab63b).toLocaleString(_0x358b3b, _0x4c6a42);
    }
  });
  let _0x37ac8 = 0x3;
  while (_0x37ac8--) {
    _0x15c8ff = VisuMZ.RevertPreserveNumbers(_0x15c8ff);
  }
  return _0x15c8ff;
};
VisuMZ.PreserveNumbers = function (_0x3c363a, _0x141923, _0x47bb1c) {
  _0x3c363a = _0x3c363a.replace(/(\d)/gi, (_0x5d53b5, _0x34e01c) => "PRESERVCONVERSION(%1)".format(Number(_0x34e01c)));
  return "%2%1%3".format(_0x3c363a, _0x141923, _0x47bb1c);
};
VisuMZ.RevertPreserveNumbers = function (_0x3a5b12) {
  _0x3a5b12 = _0x3a5b12.replace(/PRESERVCONVERSION\((\d+)\)/gi, (_0x2cb93b, _0x1b00a5) => Number(parseInt(_0x1b00a5)));
  return _0x3a5b12;
};
VisuMZ.openURL = function (_0x1dd0dc) {
  SoundManager.playOk();
  if (!Utils.isNwjs()) {} else {
    const _0x4f523b = process.platform == 'darwin' ? "open" : process.platform == "win32" ? 'start' : 'xdg-open';
    require("child_process").exec(_0x4f523b + " " + _0x1dd0dc);
  }
};
VisuMZ.createKeyJS = function (_0x174d24, _0x8bf247) {
  if (!_0x174d24) {
    return '';
  }
  const _0x11790a = _0x174d24.baseId || _0x174d24.id;
  let _0x53b0d4 = '';
  if (_0x174d24.initialLevel !== undefined && _0x174d24.nickname !== undefined) {
    _0x53b0d4 = "Actor-%1-%2".format(_0x11790a, _0x8bf247);
  }
  if (_0x174d24.expParams !== undefined && _0x174d24.learnings !== undefined) {
    _0x53b0d4 = "Class-%1-%2".format(_0x11790a, _0x8bf247);
  }
  if (_0x174d24.stypeId !== undefined && _0x174d24.requiredWtypeId1 !== undefined) {
    _0x53b0d4 = 'Skill-%1-%2'.format(_0x11790a, _0x8bf247);
  }
  if (_0x174d24.itypeId !== undefined && _0x174d24.consumable !== undefined) {
    _0x53b0d4 = "Item-%1-%2".format(_0x11790a, _0x8bf247);
  }
  if (_0x174d24.wtypeId !== undefined && _0x174d24.etypeId === 0x1) {
    _0x53b0d4 = "Weapon-%1-%2".format(_0x11790a, _0x8bf247);
  }
  if (_0x174d24.atypeId !== undefined && _0x174d24.etypeId > 0x1) {
    _0x53b0d4 = 'Armor-%1-%2'.format(_0x11790a, _0x8bf247);
  }
  if (_0x174d24.dropItems !== undefined && _0x174d24.battlerHue !== undefined) {
    _0x53b0d4 = 'Enemy-%1-%2'.format(_0x11790a, _0x8bf247);
  }
  if (_0x174d24.autoRemovalTiming !== undefined && _0x174d24.maxTurns !== undefined) {
    _0x53b0d4 = 'State-%1-%2'.format(_0x11790a, _0x8bf247);
  }
  return _0x53b0d4;
};
Window_Base.prototype.processDrawIcon = function (_0x52962c, _0x421c97) {
  const _0x193d16 = ImageManager.standardIconWidth || 0x20;
  const _0x425588 = ImageManager.standardIconHeight || 0x20;
  if (_0x421c97.drawing) {
    const _0x3807ba = _0x193d16 - ImageManager.iconWidth;
    const _0x12d437 = _0x425588 - ImageManager.iconHeight;
    let _0x511281 = 0x2;
    if (this.lineHeight() !== 0x24) {
      _0x511281 = Math.floor((this.lineHeight() - _0x425588) / 0x2);
    }
    const _0x40ecaf = _0x421c97.x + Math.floor(_0x3807ba / 0x2) + 0x2;
    const _0x5db8dd = _0x421c97.y + Math.floor(_0x12d437 / 0x2) + _0x511281;
    this.drawIcon(_0x52962c, _0x40ecaf, _0x5db8dd);
  }
  _0x421c97.x += _0x193d16 + 0x4;
};
Window_StatusBase.prototype.drawActorIcons = function (_0x432368, _0x4758ea, _0x10d08d, _0x5701e4) {
  _0x5701e4 = _0x5701e4 || 0x90;
  const _0x2bce65 = ImageManager.standardIconWidth || 0x20;
  const _0x241394 = ImageManager.standardIconHeight || 0x20;
  const _0x12b31f = _0x2bce65 - ImageManager.iconWidth;
  const _0x1a06bb = _0x241394 - ImageManager.iconHeight;
  const _0x48fca1 = _0x432368.allIcons().slice(0x0, Math.floor(_0x5701e4 / _0x2bce65));
  let _0x4338f3 = _0x4758ea + Math.ceil(_0x12b31f / 0x2);
  let _0x1e1fab = _0x10d08d + Math.ceil(_0x1a06bb / 0x2);
  for (const _0x33a29f of _0x48fca1) {
    this.drawIcon(_0x33a29f, _0x4338f3, _0x1e1fab);
    _0x4338f3 += _0x2bce65;
  }
};
Game_Picture.prototype.anchor = function () {
  return this._anchor;
};
VisuMZ.CoreEngine.Game_Picture_initBasic = Game_Picture.prototype.initBasic;
Game_Picture.prototype.initBasic = function () {
  VisuMZ.CoreEngine.Game_Picture_initBasic.call(this);
  this._anchor = {
    'x': 0x0,
    'y': 0x0
  };
  this._targetAnchor = {
    'x': 0x0,
    'y': 0x0
  };
};
VisuMZ.CoreEngine.Game_Picture_updateMove = Game_Picture.prototype.updateMove;
Game_Picture.prototype.updateMove = function () {
  this.updateAnchor();
  const _0x44981d = this._duration;
  VisuMZ.CoreEngine.Game_Picture_updateMove.call(this);
  if (_0x44981d > 0x0 && this._duration <= 0x0) {
    this._x = this._targetX;
    this._y = this._targetY;
    this._scaleX = this._targetScaleX;
    this._scaleY = this._targetScaleY;
    this._opacity = this._targetOpacity;
    if (this._anchor) {
      this._anchor.x = this._targetAnchor.x;
      this._anchor.y = this._targetAnchor.y;
    }
  }
};
VisuMZ.CoreEngine.Game_Picture_show = Game_Picture.prototype.show;
Game_Picture.prototype.show = function (_0x210374, _0x1b3f02, _0x553e40, _0x5bc0ee, _0x303d2a, _0x1d46bd, _0x3ace8f, _0x38a1c7) {
  VisuMZ.CoreEngine.Game_Picture_show.call(this, _0x210374, _0x1b3f02, _0x553e40, _0x5bc0ee, _0x303d2a, _0x1d46bd, _0x3ace8f, _0x38a1c7);
  this.setAnchor([{
    'x': 0x0,
    'y': 0x0
  }, {
    'x': 0.5,
    'y': 0.5
  }][_0x1b3f02] || {
    'x': 0x0,
    'y': 0x0
  });
};
VisuMZ.CoreEngine.Game_Picture_move = Game_Picture.prototype.move;
Game_Picture.prototype.move = function (_0x3c8fc2, _0x20a74c, _0x205faa, _0x50f883, _0x1f6425, _0x3dcabc, _0x2123fe, _0x49e32b, _0x197ca4) {
  VisuMZ.CoreEngine.Game_Picture_move.call(this, _0x3c8fc2, _0x20a74c, _0x205faa, _0x50f883, _0x1f6425, _0x3dcabc, _0x2123fe, _0x49e32b, _0x197ca4);
  this.setTargetAnchor([{
    'x': 0x0,
    'y': 0x0
  }, {
    'x': 0.5,
    'y': 0.5
  }][_0x3c8fc2] || {
    'x': 0x0,
    'y': 0x0
  });
};
Game_Picture.prototype.updateAnchor = function () {
  if (this._duration > 0x0) {
    this._anchor.x = this.applyEasing(this._anchor.x, this._targetAnchor.x);
    this._anchor.y = this.applyEasing(this._anchor.y, this._targetAnchor.y);
  }
};
Game_Picture.prototype.setAnchor = function (_0x553b77) {
  this._anchor = _0x553b77;
  this._targetAnchor = JsonEx.makeDeepCopy(this._anchor);
};
Game_Picture.prototype.setTargetAnchor = function (_0x2e7910) {
  this._targetAnchor = _0x2e7910;
};
VisuMZ.CoreEngine.Sprite_Picture_updateOrigin = Sprite_Picture.prototype.updateOrigin;
Sprite_Picture.prototype.updateOrigin = function () {
  const _0x5e9305 = this.picture();
  if (!_0x5e9305.anchor()) {
    VisuMZ.CoreEngine.Sprite_Picture_updateOrigin.call(this);
  } else {
    this.anchor.x = _0x5e9305.anchor().x;
    this.anchor.y = _0x5e9305.anchor().y;
  }
};
Game_Action.prototype.setEnemyAction = function (_0x5bec01) {
  if (_0x5bec01) {
    const _0x5a9ba3 = _0x5bec01.skillId;
    if (_0x5a9ba3 === 0x1 && this.subject().attackSkillId() !== 0x1) {
      this.setAttack();
    } else if (_0x5a9ba3 === 0x2 && this.subject().guardSkillId() !== 0x2) {
      this.setGuard();
    } else {
      this.setSkill(_0x5a9ba3);
    }
  } else {
    this.clear();
  }
};
Game_Actor.prototype.usableSkills = function () {
  return this.skills().filter(_0x548a64 => this.canUse(_0x548a64) && this.skillTypes().includes(_0x548a64.stypeId));
};
Window_Base.prototype.createDimmerSprite = function () {
  this._dimmerSprite = new Sprite();
  this._dimmerSprite.bitmap = new Bitmap(0x0, 0x0);
  this._dimmerSprite.x = 0x0;
  this.addChildToBack(this._dimmerSprite);
};
Window_Base.prototype.refreshDimmerBitmap = function () {
  if (this._dimmerSprite) {
    const _0x3b71be = this._dimmerSprite.bitmap;
    const _0x107265 = this.width;
    const _0x4dd62d = this.height;
    const _0x4c3573 = this.padding;
    const _0x24fb83 = ColorManager.dimColor1();
    const _0x517aab = ColorManager.dimColor2();
    _0x3b71be.resize(_0x107265, _0x4dd62d);
    _0x3b71be.gradientFillRect(0x0, 0x0, _0x107265, _0x4c3573, _0x517aab, _0x24fb83, true);
    _0x3b71be.fillRect(0x0, _0x4c3573, _0x107265, _0x4dd62d - _0x4c3573 * 0x2, _0x24fb83);
    _0x3b71be.gradientFillRect(0x0, _0x4dd62d - _0x4c3573, _0x107265, _0x4c3573, _0x24fb83, _0x517aab, true);
    this._dimmerSprite.setFrame(0x0, 0x0, _0x107265, _0x4dd62d);
  }
};
Game_Actor.prototype.makeAutoBattleActions = function () {
  for (let _0x342355 = 0x0; _0x342355 < this.numActions(); _0x342355++) {
    const _0x5433b3 = this.makeActionList();
    let _0x2ac309 = Number.MIN_SAFE_INTEGER;
    this.setAction(_0x342355, _0x5433b3[0x0]);
    for (const _0x426882 of _0x5433b3) {
      const _0x13fb99 = _0x426882.evaluate();
      if (_0x13fb99 > _0x2ac309) {
        _0x2ac309 = _0x13fb99;
        this.setAction(_0x342355, _0x426882);
      }
    }
  }
  this.setActionState("waiting");
};
Window_BattleItem.prototype.isEnabled = function (_0x1a0bed) {
  return BattleManager.actor() ? BattleManager.actor().canUse(_0x1a0bed) : Window_ItemList.prototype.isEnabled.call(this, _0x1a0bed);
};
VisuMZ.CoreEngine.Scene_Map_createSpritesetFix = Scene_Map.prototype.createSpriteset;
Scene_Map.prototype.createSpriteset = function () {
  VisuMZ.CoreEngine.Scene_Map_createSpritesetFix.call(this);
  const _0x1ca220 = this._spriteset._timerSprite;
  if (_0x1ca220) {
    this.addChild(_0x1ca220);
  }
};
VisuMZ.CoreEngine.Scene_Battle_createSpritesetFix = Scene_Battle.prototype.createSpriteset;
Scene_Battle.prototype.createSpriteset = function () {
  VisuMZ.CoreEngine.Scene_Battle_createSpritesetFix.call(this);
  const _0x3513eb = this._spriteset._timerSprite;
  if (_0x3513eb) {
    this.addChild(_0x3513eb);
  }
};
Sprite_Actor.prototype.update = function () {
  Sprite_Battler.prototype.update.call(this);
  this.updateShadow();
  if (this._actor) {
    this.updateMotion();
  } else if (this._battlerName !== '') {
    this._battlerName = '';
  }
};
Window.prototype._refreshArrows = function () {
  const _0x15e818 = this._width;
  const _0x3a78c7 = this._height;
  this._downArrowSprite.bitmap = this._windowskin;
  this._downArrowSprite.anchor.x = 0.5;
  this._downArrowSprite.anchor.y = 0.5;
  this._downArrowSprite.setFrame(132, 60, 0x18, 12);
  this._downArrowSprite.move(Math.round(_0x15e818 / 0x2), Math.round(_0x3a78c7 - 12));
  this._upArrowSprite.bitmap = this._windowskin;
  this._upArrowSprite.anchor.x = 0.5;
  this._upArrowSprite.anchor.y = 0.5;
  this._upArrowSprite.setFrame(132, 24, 0x18, 12);
  this._upArrowSprite.move(Math.round(_0x15e818 / 0x2), Math.round(12));
};
Window.prototype._refreshPauseSign = function () {
  this._pauseSignSprite.bitmap = this._windowskin;
  this._pauseSignSprite.anchor.x = 0.5;
  this._pauseSignSprite.anchor.y = 0x1;
  this._pauseSignSprite.move(Math.round(this._width / 0x2), this._height);
  this._pauseSignSprite.setFrame(0x90, 0x60, 0x18, 0x18);
  this._pauseSignSprite.alpha = 0xff;
};
Window.prototype._updateFilterArea = function () {
  const _0x1b7c63 = this._clientArea.worldTransform.apply(new Point(0x0, 0x0));
  const _0x236665 = this._clientArea.filterArea;
  _0x236665.x = _0x1b7c63.x + this.origin.x;
  _0x236665.y = _0x1b7c63.y + this.origin.y;
  _0x236665.width = Math.ceil(this.innerWidth * this.scale.x);
  _0x236665.height = Math.ceil(this.innerHeight * this.scale.y);
};
VisuMZ.CoreEngine.Window_refreshBack = Window.prototype._refreshBack;
Window.prototype._refreshBack = function () {
  const _0x54bc06 = VisuMZ.CoreEngine.Settings.Window.CorrectSkinBleeding ?? true;
  if (!_0x54bc06) {
    return VisuMZ.CoreEngine.Window_refreshBack.call(this);
  }
  const _0x59af01 = this._margin;
  const _0x41f228 = Math.max(0x0, this._width - _0x59af01 * 0x2);
  const _0x851f22 = Math.max(0x0, this._height - _0x59af01 * 0x2);
  const _0x3bacb1 = this._backSprite;
  const _0x340152 = _0x3bacb1.children[0x0];
  _0x3bacb1.bitmap = this._windowskin;
  _0x3bacb1.setFrame(0x0, 0x0, 0x60, 0x60);
  _0x3bacb1.move(_0x59af01, _0x59af01);
  _0x3bacb1.scale.x = _0x41f228 / 0x60;
  _0x3bacb1.scale.y = _0x851f22 / 0x60;
  _0x340152.bitmap = this._windowskin;
  _0x340152.setFrame(0x0, 0x60, 0x60, 0x60);
  _0x340152.move(0x0, 0x0, _0x41f228, _0x851f22);
  _0x340152.scale.x = 0x1 / _0x3bacb1.scale.x;
  _0x340152.scale.y = 0x1 / _0x3bacb1.scale.y;
  _0x3bacb1.setColorTone(this._colorTone);
};
Game_Temp.prototype.sceneTerminationClearEffects = function () {
  this._animationQueue = [];
  this._fauxAnimationQueue = [];
  this._pointAnimationQueue = [];
  this._balloonQueue = [];
};
VisuMZ.CoreEngine.Scene_Base_terminateAnimationClearBugFix = Scene_Base.prototype.terminate;
Scene_Base.prototype.terminate = function () {
  if ($gameTemp) {
    $gameTemp.sceneTerminationClearEffects();
  }
  VisuMZ.CoreEngine.Scene_Base_terminateAnimationClearBugFix.call(this);
};
Bitmap.prototype.measureTextWidthNoRounding = function (_0x1b3892) {
  const _0x534ac7 = this.context;
  _0x534ac7.save();
  _0x534ac7.font = this._makeFontNameText();
  const _0x57638d = _0x534ac7.measureText(_0x1b3892).width;
  _0x534ac7.restore();
  return _0x57638d;
};
Window_Message.prototype.textWidth = function (_0x315e11) {
  return this.useFontWidthFix() ? this.contents.measureTextWidthNoRounding(_0x315e11) : Window_Base.prototype.textWidth.call(this, _0x315e11);
};
Window_Message.prototype.useFontWidthFix = function () {
  return VisuMZ.CoreEngine.Settings.QoL.FontWidthFix ?? true;
};
VisuMZ.CoreEngine.Game_Action_numRepeats = Game_Action.prototype.numRepeats;
Game_Action.prototype.numRepeats = function () {
  return this.item() ? VisuMZ.CoreEngine.Game_Action_numRepeats.call(this) : 0x0;
};
VisuMZ.CoreEngine.Game_Action_setAttack = Game_Action.prototype.setAttack;
Game_Action.prototype.setAttack = function () {
  if (this.subject() && this.subject().canAttack()) {
    VisuMZ.CoreEngine.Game_Action_setAttack.call(this);
  } else if (BattleManager._bypassCanCounterCheck) {
    VisuMZ.CoreEngine.Game_Action_setAttack.call(this);
  } else {
    this.clear();
  }
};
VisuMZ.CoreEngine.BattleManager_invokeCounterAttack = BattleManager.invokeCounterAttack;
BattleManager.invokeCounterAttack = function (_0x1fbb39, _0x2cc3a8) {
  this._bypassCanCounterCheck = true;
  VisuMZ.CoreEngine.BattleManager_invokeCounterAttack.call(this, _0x1fbb39, _0x2cc3a8);
  this._bypassCanCounterCheck = undefined;
};
Sprite_Name.prototype.bitmapHeight = function () {
  return 0x24;
};
Sprite_Name.prototype.redraw = function () {
  const _0x55866a = this.name();
  const _0x171f22 = this.bitmapWidth();
  const _0x535451 = this.bitmapHeight();
  this.setupFont();
  this.bitmap.clear();
  this.bitmap.drawTextTopAligned(_0x55866a, 0x4, 0x0, _0x171f22 - 0xa, _0x535451, "left");
};
Bitmap.prototype.drawTextTopAligned = function (_0x36f783, _0x32b6c0, _0x221226, _0x51e8fa, _0x12c25f, _0x4f6b1a) {
  const _0xaef6c1 = this.context;
  const _0x4e78cf = _0xaef6c1.globalAlpha;
  _0x51e8fa = _0x51e8fa || 0xffffffff;
  let _0x41cd84 = _0x32b6c0;
  let _0x34494a = Math.round(_0x221226 + 12 + this.fontSize * 0.35);
  if (_0x4f6b1a === 'center') {
    _0x41cd84 += _0x51e8fa / 0x2;
  }
  if (_0x4f6b1a === 'right') {
    _0x41cd84 += _0x51e8fa;
  }
  _0xaef6c1.save();
  _0xaef6c1.font = this._makeFontNameText();
  _0xaef6c1.textAlign = _0x4f6b1a;
  _0xaef6c1.textBaseline = "alphabetic";
  _0xaef6c1.globalAlpha = 0x1;
  this._drawTextOutline(_0x36f783, _0x41cd84, _0x34494a, _0x51e8fa);
  _0xaef6c1.globalAlpha = _0x4e78cf;
  this._drawTextBody(_0x36f783, _0x41cd84, _0x34494a, _0x51e8fa);
  _0xaef6c1.restore();
  this._baseTexture.update();
};
VisuMZ.CoreEngine.BattleManager_checkSubstitute = BattleManager.checkSubstitute;
BattleManager.checkSubstitute = function (_0xb3369a) {
  if (this._action.isForFriend()) {
    return false;
  }
  return VisuMZ.CoreEngine.BattleManager_checkSubstitute.call(this, _0xb3369a);
};
BattleManager.endAction = function () {
  if (this._subject) {
    this._logWindow.endAction(this._subject);
  }
  this._phase = "turn";
  if (this._subject && this._subject.numActions() === 0x0) {
    this.endBattlerActions(this._subject);
    this._subject = null;
  }
};
Bitmap.prototype._startLoading = function () {
  this._image = new Image();
  this._image.onload = this._onLoad.bind(this);
  this._image.onerror = this._onError.bind(this);
  this._destroyCanvas();
  this._loadingState = "loading";
  if (Utils.hasEncryptedImages()) {
    this._startDecrypting();
  } else {
    this._image.src = this._url;
    if (false && this._image.width > 0x0) {
      this._image.onload = null;
      this._onLoad();
    }
  }
};
Scene_Skill.prototype.onActorChange = function () {
  Scene_MenuBase.prototype.onActorChange.call(this);
  this.refreshActor();
  this._itemWindow.deactivate();
  this._itemWindow.deselect();
  this._skillTypeWindow.activate();
};
Scene_Skill.prototype.arePageButtonsEnabled = function () {
  return this._skillTypeWindow && this._skillTypeWindow.active;
};
Game_Map.prototype.checkPassage = function (_0x272ef7, _0x454bbc, _0x3f4edb) {
  const _0x577269 = this.tilesetFlags();
  const _0x222d09 = this.allTiles(_0x272ef7, _0x454bbc);
  for (const _0x3a0ed4 of _0x222d09) {
    const _0x1c34a4 = _0x577269[_0x3a0ed4];
    if (_0x1c34a4 === undefined || _0x1c34a4 === null) {
      if ($gameTemp.isPlaytest() && !DataManager.isEventTest()) {
        let _0x2e577c = "Current tileset has incomplete flag data.\n";
        _0x2e577c += "Click \"Copy Page\" from another tileset's pages\n";
        _0x2e577c += "and add it onto this one.";
        if (this.showIncompleteTilesetError()) {
          alert(_0x2e577c);
          SceneManager.exit();
        } else {
          if (!this._displayedPassageError) {
            console.log(_0x2e577c);
          }
          this._displayedPassageError = true;
        }
      }
    }
    if ((_0x1c34a4 & 0x10) !== 0x0) {
      continue;
    }
    if ((_0x1c34a4 & _0x3f4edb) === 0x0) {
      return true;
    }
    if ((_0x1c34a4 & _0x3f4edb) === _0x3f4edb) {
      return false;
    }
  }
  return false;
};
Game_Map.prototype.showIncompleteTilesetError = function () {
  if (Imported.VisuMZ_3_EventChainReact) {
    return true;
  }
  if (Imported.VisuMZ_4_UniqueTileEffects) {
    return true;
  }
  return false;
};
Sprite_Animation.prototype.saveViewport = function (_0x188342) {
  if (!this._originalViewport) {
    this._originalViewport = _0x188342.gl.getParameter(_0x188342.gl.VIEWPORT);
  }
};
VisuMZ.CoreEngine.Scene_Map_shouldAutosave = Scene_Map.prototype.shouldAutosave;
Scene_Map.prototype.shouldAutosave = function () {
  const _0x42e36e = SceneManager._previousClass.name;
  if (["Scene_Title", "Scene_Load", "Scene_TitleTransition", "Scene_SingleLoadTransition"].includes(_0x42e36e)) {
    return false;
  }
  return VisuMZ.CoreEngine.Scene_Map_shouldAutosave.call(this);
};
VisuMZ.CoreEngine.Window_SkillList_includes = Window_SkillList.prototype.includes;
Window_SkillList.prototype.includes = function (_0x13c2bc) {
  if (this._stypeId <= 0x0) {
    return false;
  }
  return VisuMZ.CoreEngine.Window_SkillList_includes.call(this, _0x13c2bc);
};