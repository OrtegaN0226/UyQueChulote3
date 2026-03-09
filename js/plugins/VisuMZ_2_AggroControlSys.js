//=============================================================================
// VisuStella MZ - Aggro Control System
// VisuMZ_2_AggroControlSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_AggroControlSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AggroControlSystem = VisuMZ.AggroControlSystem || {};
VisuMZ.AggroControlSystem.version = 1.20;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.20] [AggroControlSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Aggro_Control_System_VisuStella_MZ
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * A common mechanic found in many RPG's nowadays is the ability to steer the
 * way enemies target party members. This can be in the form of provocations, 
 * taunts, and aggro.
 *
 * Provocations come in the form of states, where when a unit applies a provoke
 * state on a target, the target must attack the provoker when using single
 * target skills. This plugin provides support for multiple provocations and
 * such provocations will be given focus based on the state's priority value.
 *
 * Taunts are a third way to steer an opponent to focus on a party member. The
 * taunt effects can be split up into global, physical, magical, or certain hit
 * only taunts and these can be applied to almost any trait object.
 *
 * Aggro is a numeric value that determines the likelihood and/or priority
 * level of how often a target party member is to be attacked by an enemy unit.
 * The higher the aggro value, the more likely the chances of being targeted.
 * A option can be turned on (or through notetags) to set enemies to always
 * target the party member with the highest aggro.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Three different ways to influencing which targets enemies should attack:
 *   Provoke, taunt, and aggro.
 * * Provoke and taunt effects work both ways for actors and enemies.
 * * Aggro effects accumulate through battle and can be manipulated through
 *   notetag values, Plugin Commands, and/or Plugin Parameters.
 * * Provoked battlers can have provoke lines displayed to indicate which
 *   unit has provoked them.
 * * Taunting units can have animations played on them repeatedly to quickly
 *   relay information to the player about their taunt properties.
 * * Gauges that can be displayed over the heads of actor sprites to display
 *   how much aggro that actor holds in comparison to the other actors.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_0_CoreEngine
 * VisuMZ_1_BattleCore
 *
 * - Provoke Priority Lines and Taunt animations become available if these
 *   plugins are installed.
 *
 * ---
 *
 * ============================================================================
 * How Aggro, Provoke, and Taunts Work
 * ============================================================================
 *
 * This section will explain how aggro, provoke, and taunts work.
 *
 * ---
 *
 * Provoke
 *
 * - Provocations come in the form of states, where when a unit applies a
 * provoke state on a target, the target must attack the provoker when using
 * single target skills. This plugin provides support for multiple provocations
 * and such provocations will be given focus based on the state's database
 * priority value.
 *
 * - The provoke will last only as long as the duration of the state itself. If
 * the state's duration is refreshed by reapplying the Provoke state, then the
 * provoker of that state will then switch over to the one applying the newly
 * added state.
 *
 * - When an actor selects a target for an action and the actor is provoked by
 * an enemy on the other team, the player's choice selection becomes limited to
 * only the provoker.
 *
 * - Provoke can be bypassed through the <Bypass Provoke> notetag.
 *
 * ---
 *
 * Taunts
 *
 * - Taunts are a third way to steer an opponent to focus on a party member.
 * The taunt effects can be split up into global, physical, magical, or certain
 * hit only taunts and these can be applied to almost any trait object.
 *
 * - When an actor selects a target and the enemy team has a taunting unit,
 * the player's choice selection becomes limited to only the targets with the
 * associated taunt type.
 *
 * - Taunts can be bypassed through the <Bypass Taunt> notetag.
 *
 * ---
 *
 * Aggro
 *
 * - Aggro is a numeric value that determines the likelihood and/or priority
 * level of how often a target party member is to be attacked by an enemy unit.
 * The higher the aggro value, the more likely the chances of being targeted.
 * A option can be turned on (or through notetags) to set enemies to always
 * target the party member with the highest aggro.
 *
 * - Skills and items can raise its user's aggro value through notetags and/or
 * how much damage they've dealt or healed. Skills and items can also change a
 * target's aggro value through notetags, too.
 *
 * - Through the Plugin Parameters, you can set Aggro to automatically raised
 * based on how much damage or healing dealt by a user.
 *
 * - Some enemies can be bypass forced aggro target through the <Bypass Aggro>
 * notetag while other enemies can be forced to target the highest aggro target
 * through the <Target Highest Aggro> notetag;
 *
 * ---
 *
 * Priorities
 *
 * - Priority will be given in the order of provokes, taunts, and then aggro.
 * This means if an enemy is provoked, the opposing side has a taunt, and there
 * is a member with high aggro, then the enemy will always attack the provoker
 * first before targeting a taunting unit before targeting the unit with high
 * aggro values.
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
 * === Provoke-Related Notetags ===
 *
 * The following notetags enable you to utilize the Provoke effects added by
 * this plugin. Provoked targets can only attack the provoking unit for single
 * target actions.
 *
 * ---
 *
 * <Provoke>
 *
 * - Used for: State Notetags
 * - Causes the state affected unit to be able to only attack the caster of the
 *   provoke state for single target actions.
 * - If multiple provoke states are applied, then the provoker is the one who
 *   applied the highest priority provoke state.
 *
 * ---
 *
 * <Bypass Provoke>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Makes the affected unit to ignore any and all provoke effects applied by
 *   any provoke states, allowing them to target foes as if they are unaffected
 *   by provoke states altogether.
 *
 * ---
 * 
 * <Bypass Provoke>
 * - Used for: Skill and Item Notetags
 * - Makes the action bypass provoke effects applied by any provoke states,
 *   allowing this action to target foes as if the user is unaffected by any
 *   provoke effects altogether.
 * 
 * ---
 * 
 * <Provoke Height Origin: x%>
 * 
 * - Used for: Actor, Enemy Notetags
 * - Sets the provoke height origin point to x% of the sprite's height.
 * - This is the landing point for the provoke trails.
 * - Replace 'x' with a number presenting what rate of the sprite's height to
 *   set as the provoke height origin point.
 * 
 * ---
 *
 * === Taunt-Related Notetags ===
 *
 * ---
 *
 * <Taunt>
 * <All Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the taunting unit to become the target of the opposing team's
 *   single target actions for physical, magical, and certain hit actions.
 * - If multiple taunters exist, then the opposing team can select between any
 *   of the taunters for targets.
 *
 * ---
 *
 * <Physical Taunt>
 * <Magical Taunt>
 * <Certain Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the taunting unit to become the target of the opposing team's
 *   single target actions for physical, magical, and certain hit actions
 *   respectively.
 * - Add/remove any combination of the above to cause the affected unit to
 *   become the target of those types of actions.
 * - If multiple taunters exist, then the opposing team can select between any
 *   of the taunters for targets.
 *
 * ---
 *
 * <Bypass Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The affected unit will ignore any and all taunt effects created by the
 *   opposing team, allowing them to use single target actions as if no
 *   taunters exist on the opposing team.
 *
 * ---
 * 
 * <Bypass Taunt>
 * - Used for: Skill and Item Notetags
 * - Makes the action bypass taunt effects created by the opposing team,
 *   allowing the user to use single target actions as if no taunters exist on
 *   the opposing team.
 * 
 * ---
 *
 * === Aggro-Related Notetags ===
 *
 * ---
 *
 * <User Aggro: +x>
 * <User Aggro: -x>
 *
 * - Used for: Skill, Item
 * - Upon using this action, raise the user's battle aggro value by 'x'.
 * - Replace 'x' with the amount of battle aggro to increase/decrease by.
 * - This effect will only apply once per usage regardless of the number of
 *   successful hits landed by the action.
 *
 * ---
 *
 * <Target Aggro: +x>
 * <Target Aggro: -x>
 *
 * - Used for: Skill, Item
 * - Upon using this action, raise the target's battle aggro value by 'x'.
 * - Replace 'x' with the amount of battle aggro to increase/decrease by.
 * - This effect will apply multiple times based on the number of successful
 *   hits landed by the action.
 *
 * ---
 *
 * <Aggro: +x>
 * <Aggro: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected unit to passively have increased/decreased aggro
 *   values independent of the amount of aggro it earns in battle.
 * - Replace 'x' with the amount of aggro this object increases/decreases by.
 *
 * ---
 *
 * <Aggro Multiplier: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected unit to increase the amount of perceived aggro it has
 *   by the aggro multiplier.
 * - Replace 'x' with a number representing the percentage to increase/decrease
 *   the perceived aggro by.
 * - If multiple of these traits exist across different trait objects, the
 *   effects are increased multiplicatively.
 *
 * ---
 *
 * <Bypass Highest Aggro>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills or items, the action will decide targets by aggro weight
 *   instead of always picking the highest aggro unit(s).
 * - If used on trait objects, the affected unit will decide targets by aggro
 *   weight instead of always picking the highest aggro unit(s).
 * - This is used for enemy A.I. or Actor auto battle A.I.
 *
 * ---
 * 
 * <Bypass Highest Aggro>
 * - Used for: Skill and Item Notetags
 * - Makes the action bypass highest aggro effects and instead focuses on
 *   targets by aggro weight instead.
 * - This is used for enemy A.I. or Actor auto battle A.I.
 * 
 * ---
 *
 * <Target Highest Aggro>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills or items, the action will always decide its targets by
 *   the highest aggro value.
 * - If used on trait objects, the affected unit will always decide on targets
 *   by the highest aggro value.
 * - If the <Bypass Highest Aggro> notetag exists, this effect is ignored.
 * - This is used for enemy A.I. or Actor auto battle A.I.
 *
 * ---
 *
 * === JavaScript Notetags: Aggro-Related ===
 *
 * ---
 *
 * <JS User Aggro>
 *  code
 *  code
 *  value = code
 * </JS User Aggro>
 *
 * - Used for: Skill, Item
 * - Replace 'code' with JavaScript code to determine the final 'value' to
 *   change the user's battle aggro to upon using this skill.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 * - This effect will only apply once per usage regardless of the number of
 *   successful hits landed by the action.
 *
 * ---
 *
 * <JS Target Aggro>
 *  code
 *  code
 *  value = code
 * </JS Target Aggro>
 *
 * - Used for: Skill, Item
 * - Replace 'code' with JavaScript code to determine the final 'value' to
 *   change target's battle aggro to upon using this skill.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 * - This effect will apply multiple times based on the number of successful
 *   hits landed by the action.
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Aggro
 * - Changes target actor's aggro value.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *   Change Aggro By:
 *   - Change aggro by this amount.
 *   - Use negative numbers to reduce aggro.
 *
 * ---
 *
 * Actor: Set Aggro
 * - Set target actor's aggro value.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *   Set Aggro To:
 *   - Sets target's aggro to this amount.
 *   - Aggro must be at least a value of 1.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change Aggro
 * - Changes target enemy's aggro value.
 *
 *   Enemy Index:
 *   - Select which Enemy Index to affect.
 *
 *   Change Aggro By:
 *   - Change aggro by this amount.
 *   - Use negative numbers to reduce aggro.
 *
 * ---
 *
 * Enemy: Set Aggro
 * - Set target enemy's aggro value.
 *
 *   Enemy Index:
 *   - Select which Enemy Index to affect.
 *
 *   Set Aggro To:
 *   - Sets target's aggro to this amount.
 *   - Aggro must be at least a value of 1.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Provoke Settings
 * ============================================================================
 *
 * The Provoke Settings Plugin Parameters adjust the visual aspects related to
 * the provoke effect. These settings will require VisuMZ_1_BattleCore to be
 * installed in order for them to work due to dependencies. 
 *
 * ---
 *
 * VisuMZ_1_BattleCore
 * 
 *   Show Priority Lines?:
 *   - Show priority target lines for this plugin?
 *   - Requires VisuMZ_1_BattleCore.
 *
 * ---
 *
 * Line Settings
 * 
 *   Arc Height:
 *   - How tall should the line arc in pixels?
 * 
 *   Blend Mode:
 *   - The blend mode used for the sprite.
 * 
 *   Height Origin:
 *   - The rate from the battler's sprite base to determine where the line
 *     starts from.
 * 
 *   Line Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Opacity:
 *   - The highest possible opacity for active provoke lines.
 * 
 *   Opacity Speed:
 *   - The speed at which opacity fluctuates for the line sprite.
 * 
 *   Parts:
 *   - The number of joint parts to split up the sprite as.
 * 
 *   Parts Size:
 *   - The number in pixels for the diameter of each part.
 *
 * ---
 * 
 * Options
 * 
 *   Add Provoke Option?
 *   - Add the 'Show Provoke Origin' option to the Options menu?
 * 
 *   Adjust Window Height
 *   - Automatically adjust the options window height?
 * 
 *   Option Name
 *   - Command name of the option.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Taunt Settings
 * ============================================================================
 *
 * Battlers with specific taunt types can have animations playing on them over
 * and over to relay information to the player. These settings require you to
 * have both VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore installed in your
 * project's plugin list in order to use.
 *
 * ---
 *
 * VisuMZ_0_CoreEngine & VisuMZ_1_BattleCore
 * 
 *   Show Animations?:
 *   - Show animations for each of the taunt effects?
 *   - Requires VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore.
 *
 * ---
 *
 * Animation ID's
 * 
 *   Physical Taunt:
 *   - The animation ID used for physical taunts.
 *   - Use 0 or 'None' to bypass this type.
 * 
 *   Magical Taunt:
 *   - The animation ID used for magical taunts.
 *   - Use 0 or 'None' to bypass this type.
 * 
 *   Certain Hit Taunt:
 *   - The animation ID used for certain hit taunts.
 *   - Use 0 or 'None' to bypass this type.
 *
 * ---
 *
 * Animation Settings
 * 
 *   Cycle Time:
 *   - The amount of frames to wait before each animation cycle.
 *   - WARNING: Lower numbers can jeopardize game performance.
 * 
 *   Mirror Actor Ani?:
 *   - Mirror animations played on actors?
 * 
 *   Mute Animation SFX?:
 *   - Mute sounds played by animations?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Aggro Settings
 * ============================================================================
 *
 * This lets you adjust the settings for this plugin's Aggro mechanics. Most of
 * these settings focus on the visual gauge display of the Aggro gauge, but you
 * can also change up the settings for how aggro is utilized.
 *
 * ---
 *
 * General
 * 
 *   Priority: Highest TGR:
 *   - When enemies target actors for an single target attack, always target
 *     the highest members or make it weighted?
 *
 *   Aggro Per Damage:
 *   - The amount of aggro generated per point of HP damage dealt to an enemy.
 *
 *   Aggro Per Heal:
 *   - The amount of aggro generated per point of HP recovered to an ally.
 *
 * ---
 *
 * Gauge
 * 
 *   Visible Battler Gauge:
 *   - Display an aggro gauge over an SV actor's head to show current aggro
 *     level compared to other party members.
 * 
 *   Visible Status Gauge:
 *   - Display an aggro gauge in the Battle Status Window to show the current
 *     aggro level compared to others.
 * 
 *   Gauge Color 1:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Gauge Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Gauge Width:
 *   - Width in pixels you want the gauge to be.
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the Aggro Gauge sprite's anchor X/Y to be?
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the Aggro Gauge to be scaled?
 * 
 *   Battler Gauge
 * 
 *     Offset X:
 *     Offset Y:
 *     - How many pixels to offset the Aggro Gauge's X/Y by?
 * 
 *   Battle Status Gauge
 * 
 *     Offset X:
 *     Offset Y:
 *     - How many pixels to offset the Aggro Gauge's X/Y by?
 *
 * ---
 * 
 * Options
 * 
 *   Add Provoke Option?
 *   - Add the 'Show Aggro Gauge' option to the Options menu?
 * 
 *   Adjust Window Height
 *   - Automatically adjust the options window height?
 * 
 *   Option Name
 *   - Command name of the option.
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
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
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
 * Version 1.20: July 17, 2025
 * * Bug Fixes!
 * ** Fixed a bug where if a party member who provoked an enemy decided to
 *    switch out, the provoke effect would be retained and cause the enemy to
 *    bug out and crash the game. Fix made by Arisu.
 * 
 * Version 1.19: April 18, 2024
 * * Feature Update!
 * ** Altered TGR and Aggro-related stats so that they cannot dip too deep into
 *    the negatives and prevent randomized targeting altogether. Update made
 *    by Olivia.
 * 
 * Version 1.18: March 14, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for other plugins.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.17: August 17, 2023
 * * Compatibility Update!
 * ** When enemies use skills with VisuStella MZ Battle A.I. installed, aggro
 *    settings will no longer automatically target "highest aggro targets" if
 *    there are <AI Targets: x> notetags.
 * 
 * Version 1.16: July 13, 2023
 * * Bug Fixes!
 * ** Fixed an issue with non-weighted aggro selected actions that will cause
 *    actors (instead of just enemies) to also target highest TGR enemies.
 *    Fix made by Irina.
 * 
 * Version 1.15: May 18, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused <All Taunt> to not work properly.
 *    Fix made by Irina.
 * 
 * Version 1.14: March 16, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause cached battlers from a previous save file to
 *    not load up properly when actions are used for highest aggro actors.
 *    Fix made by Irina.
 * 
 * Version 1.13: February 16, 2023
 * * Bug Fixes!
 * ** Fixed a problem that would cause a crash when exiting the Options menu in
 *    battle when used with specific battle systems. Fix made by Irina.
 * 
 * Version 1.12: January 20, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for Battle Core updated version 1.73
 *    new features.
 * 
 * Version 1.11: November 17, 2022
 * * Bug Fixes!
 * ** <JS User Aggro> and <JS Target Aggro> should now work properly.
 *    Fix made by Arisu.
 * 
 * Version 1.10: August 25, 2022
 * * Documentation Update!
 * ** Added note to the <Provoke> notetag:
 * *** States with <Provoke> on them will automatically remove themselves if
 *     the provoker dies. Update made by Arisu.
 * * Feature Update!
 * ** States with <Provoke> on them will automatically remove themselves if the
 *    provoker dies. Update made by Arisu.
 * 
 * Version 1.09: June 2, 2022
 * * Bug Fixes!
 * ** Filename has been shortened from VisuMZ_2_AggroControlSystem.js to
 *    VisuMZ_2_AggroControlSys.js due to deployment reasons. For some mobile
 *    devices, keeping the name as long as VisuMZ_2_AggroControlSystem.js
 *    causes problems, but VisuMZ_2_AggroControlSys.js is fine. Take note of
 *    this while you are updating.
 * ** 'user' and 'target' now works properly with the JS notetags.
 *    Fix made by Irina.
 * 
 * Version 1.08: April 16, 2021
 * * Feature Update!
 * ** Highest and lowest TGR members are now cached on an action by action
 *    basis for reduce needed computations. Update made by Irina.
 * 
 * Version 1.07: April 9, 2021
 * * Bug Fixes!
 * ** Provoke effect now takes into consideration when Provoke is applied by
 *    a weapon effect that comes off a counter attack from an actor. Fix made
 *    by Olivia.
 * 
 * Version 1.06: March 12, 2021
 * * Bug Fixes!
 * ** Subsequent battles or changing scenes should no longer clear the custom
 *    rendered bitmap used for the provoke trail. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for the Skill and Item versions of the following
 *    notetags into the help file and wiki:
 * *** <Bypass Provoke>
 * *** <Bypass Taunt>
 * *** <Bypass Highest Aggro>
 * 
 * Version 1.05: March 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > Aggro Settings > Battle Status Gauge
 * **** These settings allow you to offset the Aggro Gauge in the Battle Status
 *      Window from its original position.
 * 
 * Version 1.04: February 26, 2021
 * * Bug Fixes!
 * ** Fixed positioning of gauge for List Style battle layouts without faces.
 *    Fix made by Olivia.
 * 
 * Version 1.03: February 5, 2021
 * * Feature Update!
 * ** Aggro is now cleared at the end of each battle in addition to the start
 *    of each battle. Update made by Olivia.
 *
 * Version 1.02: November 1, 2020
 * * Compatibility Update!
 * ** Plugin is made more compatible with other plugins.
 * 
 * Version 1.01: October 4, 2020
 * * Bug Fixes!
 * ** Provoke lines should now be placed correctly if the UI area is smaller
 *    than the resolution area.
 * ** The Plugin Commands should no longer cause crashes. Fix made by Irina.
 *
 * Version 1.00: September 28, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeAggro
 * @text Actor: Change Aggro
 * @desc Changes target actor's aggro value.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Aggro:num
 * @text Change Aggro By
 * @desc Change aggro by this amount.
 * Use negative numbers to reduce aggro.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorSetAggro
 * @text Actor: Set Aggro
 * @desc Set target actor's aggro value.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Aggro:num
 * @text Set Aggro To
 * @desc Sets target's aggro to this amount.
 * Aggro must be at least a value of 1.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyChangeAggro
 * @text Enemy: Change Aggro
 * @desc Changes target enemy's aggro value.
 *
 * @arg EnemyIndex:num
 * @text Enemy Index
 * @type actor
 * @desc Select which Enemy Index to affect.
 * @default 0
 *
 * @arg Aggro:num
 * @text Change Aggro By
 * @desc Change aggro by this amount.
 * Use negative numbers to reduce aggro.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemySetAggro
 * @text Enemy: Set Aggro
 * @desc Set target enemy's aggro value.
 *
 * @arg EnemyIndex:num
 * @text Enemy Index
 * @type actor
 * @desc Select which Enemy Index to affect.
 * @default 0
 *
 * @arg Aggro:num
 * @text Set Aggro To
 * @desc Sets target's aggro to this amount.
 * Aggro must be at least a value of 1.
 * @default 1
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
 * @param AggroControl
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Provoke:struct
 * @text Provoke Settings
 * @type struct<Provoke>
 * @desc Settings related to the Provoke mechanic.
 * These settings require VisuMZ_1_BattleCore.
 * @default {"VisuMZ_1_BattleCore":"","ShowLines:eval":"true","LineSettings":"","ArcHeight:num":"125","BlendMode:num":"1","HeightOrigin:num":"0.8","LineColor:str":"#ff0000","Opacity:num":"255","OpacitySpeed:num":"4","Parts:num":"256","PartsSize:num":"5","Options":"","AddOption:eval":"true","AdjustOptionsRect:eval":"true","OptionName:str":"Show Provoke Origin"}
 *
 * @param Taunt:struct
 * @text Taunt Settings
 * @type struct<Taunt>
 * @desc Settings related to the Taunt mechanic.
 * @default {"Dependency":"VisuMZ_1_BattleCore","ShowAnimation:eval":"true","AnimationID":"","AniPhysical:num":"1","AniMagical:num":"2","AniCertain:num":"3","AnimationSettings":"","CycleTime:num":"60","MirrorActorAni:eval":"true","MuteAnimations:eval":"true"}
 *
 * @param Aggro:struct
 * @text Aggro Settings
 * @type struct<Aggro>
 * @desc Settings related to the Aggro mechanic.
 * @default {"General":"","PriorityHighest:eval":"true","AggroPerDmg:num":"0.1","AggroPerHeal:num":"0.5","Gauge":"","VisibleGauge:eval":"false","StatusGauge:eval":"true","GaugeColor1:str":"#959595","GaugeColor2:str":"#ffffff","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"+0","OffsetY:num":"+2","Options":"","AddOption:eval":"true","AdjustOptionsRect:eval":"true","OptionName:str":"Show Aggro Gauge"}
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
 * Provoke Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Provoke:
 *
 * @param VisuMZ_1_BattleCore
 *
 * @param ShowLines:eval
 * @text Show Priority Lines?
 * @parent VisuMZ_1_BattleCore
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show priority target lines for this plugin?
 * Requires VisuMZ_1_BattleCore.
 * @default true
 *
 * @param LineSettings
 * @text Line Settings
 *
 * @param ArcHeight:num
 * @text Arc Height
 * @parent LineSettings
 * @type number
 * @desc How tall should the line arc in pixels?
 * @default 125
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent LineSettings
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @desc The blend mode used for the sprite.
 * @default 1
 *
 * @param HeightOrigin:num
 * @text Height Origin
 * @parent LineSettings
 * @desc The rate from the battler's sprite base to determine where the line starts from.
 * @default 0.8
 *
 * @param LineColor:str
 * @text Line Color
 * @parent LineSettings
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ff0000
 *
 * @param Opacity:num
 * @text Opacity
 * @parent LineSettings
 * @type number
 * @min 1
 * @max 255
 * @desc The highest possible opacity for active provoke lines.
 * @default 255
 *
 * @param OpacitySpeed:num
 * @text Opacity Speed
 * @parent Opacity:num
 * @type number
 * @min 1
 * @desc The speed at which opacity fluctuates for the line sprite.
 * @default 4
 *
 * @param Parts:num
 * @text Parts
 * @parent LineSettings
 * @type number
 * @min 1
 * @desc The number of joint parts to split up the sprite as.
 * @default 256
 *
 * @param PartsSize:num
 * @text Parts Size
 * @parent Parts:num
 * @type number
 * @min 1
 * @desc The number in pixels for the diameter of each part.
 * @default 5
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Provoke Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Provoke Origin' option to the Options menu?
 * @default true
 *
 * @param AdjustOptionsRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param OptionName:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show Provoke Origin
 *
 */
/* ----------------------------------------------------------------------------
 * Taunt Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Taunt:
 *
 * @param Dependency
 * @text VisuMZ_0_CoreEngine
 * @default VisuMZ_1_BattleCore
 *
 * @param ShowAnimation:eval
 * @text Show Animations?
 * @parent Dependency
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show animations for each of the taunt effects?
 * Requires VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore.
 * @default true
 *
 * @param AnimationID
 * @text Animation ID's
 *
 * @param AniPhysical:num
 * @text Physical Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for physical taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 13
 *
 * @param AniMagical:num
 * @text Magical Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for magical taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 14
 *
 * @param AniCertain:num
 * @text Certain Hit Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for certain hit taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 15
 *
 * @param AnimationSettings
 * @text Animation Settings
 *
 * @param CycleTime:num
 * @text Cycle Time
 * @parent AnimationSettings
 * @type number
 * @min 1
 * @desc The amount of frames to wait before each animation cycle.
 * WARNING: Lower numbers can jeopardize game performance.
 * @default 60
 *
 * @param MirrorActorAni:eval
 * @text Mirror Actor Ani?
 * @parent AnimationSettings
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror animations played on actors?
 * @default true
 *
 * @param MuteAnimations:eval
 * @text Mute Animation SFX?
 * @parent AnimationSettings
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute sounds played by animations?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Aggro Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Aggro:
 *
 * @param General
 *
 * @param PriorityHighest:eval
 * @text Priority: Highest TGR
 * @parent General
 * @type boolean
 * @on Always
 * @off Weighted
 * @desc When enemies target actors for an single target attack,
 * always target the highest members or make it weighted?
 * @default true
 *
 * @param AggroPerDmg:num
 * @text Aggro Per Damage
 * @parent General
 * @desc The amount of aggro generated per point of HP damage dealt to an enemy.
 * @default 0.1
 *
 * @param AggroPerHeal:num
 * @text Aggro Per Heal
 * @parent General
 * @desc The amount of aggro generated per point of HP recovered to an ally.
 * @default 0.5
 *
 * @param Gauge
 *
 * @param VisibleGauge:eval
 * @text Visible Battler Gauge
 * @parent Gauge
 * @type boolean
 * @on Visible
 * @off None
 * @desc Display an aggro gauge over an SV actor's head to show
 * current aggro level compared to other party members.
 * @default false
 *
 * @param StatusGauge:eval
 * @text Visible Status Gauge
 * @parent Gauge
 * @type boolean
 * @on Visible
 * @off None
 * @desc Display an aggro gauge in the Battle Status Window
 * to show the current aggro level compared to others.
 * @default true
 *
 * @param GaugeColor1:str
 * @text Gauge Color 1
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #959595
 *
 * @param GaugeColor2:str
 * @text Gauge Color 2
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent Gauge
 * @desc Where do you want the Aggro Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent Gauge
 * @desc Where do you want the Aggro Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent Gauge
 * @desc How large/small do you want the Aggro Gauge to be scaled?
 * @default 0.5
 * 
 * @param BattlerGauge
 * @text Battler Gauge
 * @parent Gauge
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent BattlerGauge
 * @desc How many pixels to offset the Aggro Gauge's X by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent BattlerGauge
 * @desc How many pixels to offset the Aggro Gauge's Y by?
 * Negative goes up. Positive goes down.
 * @default +2
 * 
 * @param BattleStatus
 * @text Battle Status Gauge
 * @parent Gauge
 *
 * @param BattleStatusOffsetX:num
 * @text Offset X
 * @parent BattleStatus
 * @desc How many pixels to offset the Aggro Gauge's X by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param BattleStatusOffsetY:num
 * @text Offset Y
 * @parent BattleStatus
 * @desc How many pixels to offset the Aggro Gauge's Y by?
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Aggro Gauge' option to the Options menu?
 * @default true
 *
 * @param AdjustOptionsRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param OptionName:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show Aggro Gauge
 *
 */
//=============================================================================

function _0x1ffe(_0x437fce,_0x40c0f2){const _0x53f0a6=_0x53f0();return _0x1ffe=function(_0x1ffe13,_0x4213be){_0x1ffe13=_0x1ffe13-0xb5;let _0x1e7fa9=_0x53f0a6[_0x1ffe13];return _0x1e7fa9;},_0x1ffe(_0x437fce,_0x40c0f2);}const _0x21d79f=_0x1ffe;(function(_0x43956c,_0xc4bc22){const _0x100f78=_0x1ffe,_0x418b5d=_0x43956c();while(!![]){try{const _0x270a85=-parseInt(_0x100f78(0xd8))/0x1+-parseInt(_0x100f78(0xb8))/0x2+parseInt(_0x100f78(0x174))/0x3+-parseInt(_0x100f78(0x1ca))/0x4+parseInt(_0x100f78(0x1cc))/0x5+-parseInt(_0x100f78(0x19f))/0x6+-parseInt(_0x100f78(0x20b))/0x7*(-parseInt(_0x100f78(0x1f4))/0x8);if(_0x270a85===_0xc4bc22)break;else _0x418b5d['push'](_0x418b5d['shift']());}catch(_0x5ed03f){_0x418b5d['push'](_0x418b5d['shift']());}}}(_0x53f0,0x7a27b));var label=_0x21d79f(0x193),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x21d79f(0x22a)](function(_0x4b4505){const _0x2ef66c=_0x21d79f;return _0x4b4505[_0x2ef66c(0x14e)]&&_0x4b4505['description'][_0x2ef66c(0xec)]('['+label+']');})[0x0];VisuMZ[label][_0x21d79f(0x1fa)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x21d79f(0xca)]=function(_0x398980,_0x4af1b3){const _0xb00573=_0x21d79f;for(const _0x489af0 in _0x4af1b3){if(_0x489af0[_0xb00573(0x190)](/(.*):(.*)/i)){const _0x8b7e3=String(RegExp['$1']),_0x69524=String(RegExp['$2'])[_0xb00573(0x21a)]()['trim']();let _0xd8170a,_0x2f258c,_0x21db82;switch(_0x69524){case _0xb00573(0x22c):_0xd8170a=_0x4af1b3[_0x489af0]!==''?Number(_0x4af1b3[_0x489af0]):0x0;break;case'ARRAYNUM':_0x2f258c=_0x4af1b3[_0x489af0]!==''?JSON[_0xb00573(0x182)](_0x4af1b3[_0x489af0]):[],_0xd8170a=_0x2f258c[_0xb00573(0x210)](_0x206aa5=>Number(_0x206aa5));break;case _0xb00573(0x117):_0xd8170a=_0x4af1b3[_0x489af0]!==''?eval(_0x4af1b3[_0x489af0]):null;break;case'ARRAYEVAL':_0x2f258c=_0x4af1b3[_0x489af0]!==''?JSON[_0xb00573(0x182)](_0x4af1b3[_0x489af0]):[],_0xd8170a=_0x2f258c[_0xb00573(0x210)](_0x130975=>eval(_0x130975));break;case _0xb00573(0x21e):_0xd8170a=_0x4af1b3[_0x489af0]!==''?JSON['parse'](_0x4af1b3[_0x489af0]):'';break;case _0xb00573(0x230):_0x2f258c=_0x4af1b3[_0x489af0]!==''?JSON[_0xb00573(0x182)](_0x4af1b3[_0x489af0]):[],_0xd8170a=_0x2f258c[_0xb00573(0x210)](_0x1f8a33=>JSON[_0xb00573(0x182)](_0x1f8a33));break;case _0xb00573(0x199):_0xd8170a=_0x4af1b3[_0x489af0]!==''?new Function(JSON[_0xb00573(0x182)](_0x4af1b3[_0x489af0])):new Function('return\x200');break;case'ARRAYFUNC':_0x2f258c=_0x4af1b3[_0x489af0]!==''?JSON[_0xb00573(0x182)](_0x4af1b3[_0x489af0]):[],_0xd8170a=_0x2f258c[_0xb00573(0x210)](_0x2355e5=>new Function(JSON['parse'](_0x2355e5)));break;case _0xb00573(0xd1):_0xd8170a=_0x4af1b3[_0x489af0]!==''?String(_0x4af1b3[_0x489af0]):'';break;case'ARRAYSTR':_0x2f258c=_0x4af1b3[_0x489af0]!==''?JSON['parse'](_0x4af1b3[_0x489af0]):[],_0xd8170a=_0x2f258c[_0xb00573(0x210)](_0x17a3f4=>String(_0x17a3f4));break;case'STRUCT':_0x21db82=_0x4af1b3[_0x489af0]!==''?JSON[_0xb00573(0x182)](_0x4af1b3[_0x489af0]):{},_0xd8170a=VisuMZ[_0xb00573(0xca)]({},_0x21db82);break;case _0xb00573(0x212):_0x2f258c=_0x4af1b3[_0x489af0]!==''?JSON['parse'](_0x4af1b3[_0x489af0]):[],_0xd8170a=_0x2f258c[_0xb00573(0x210)](_0x5bd70d=>VisuMZ[_0xb00573(0xca)]({},JSON[_0xb00573(0x182)](_0x5bd70d)));break;default:continue;}_0x398980[_0x8b7e3]=_0xd8170a;}}return _0x398980;},(_0x38d11c=>{const _0x1c67e3=_0x21d79f,_0x5b782c=_0x38d11c[_0x1c67e3(0x141)];for(const _0x5a0844 of dependencies){if(!Imported[_0x5a0844]){alert(_0x1c67e3(0x140)[_0x1c67e3(0x19c)](_0x5b782c,_0x5a0844)),SceneManager[_0x1c67e3(0x132)]();break;}}const _0xbafb5f=_0x38d11c[_0x1c67e3(0x1f6)];if(_0xbafb5f[_0x1c67e3(0x190)](/\[Version[ ](.*?)\]/i)){const _0x2370aa=Number(RegExp['$1']);_0x2370aa!==VisuMZ[label][_0x1c67e3(0x154)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x1c67e3(0x19c)](_0x5b782c,_0x2370aa)),SceneManager['exit']());}if(_0xbafb5f[_0x1c67e3(0x190)](/\[Tier[ ](\d+)\]/i)){const _0x32dfbe=Number(RegExp['$1']);_0x32dfbe<tier?(alert(_0x1c67e3(0x164)['format'](_0x5b782c,_0x32dfbe,tier)),SceneManager[_0x1c67e3(0x132)]()):tier=Math[_0x1c67e3(0x1e7)](_0x32dfbe,tier);}VisuMZ[_0x1c67e3(0xca)](VisuMZ[label][_0x1c67e3(0x1fa)],_0x38d11c[_0x1c67e3(0xfd)]);})(pluginData),PluginManager[_0x21d79f(0x21b)](pluginData[_0x21d79f(0x141)],_0x21d79f(0x1c6),_0x368706=>{const _0x3a1d23=_0x21d79f;if(!$gameParty[_0x3a1d23(0x10f)]())return;VisuMZ['ConvertParams'](_0x368706,_0x368706);const _0x1ca189=$gameActors[_0x3a1d23(0x1d1)](_0x368706[_0x3a1d23(0x1e1)]),_0x229a69=_0x368706[_0x3a1d23(0x194)];if(_0x1ca189)_0x1ca189[_0x3a1d23(0x223)](_0x229a69);}),PluginManager[_0x21d79f(0x21b)](pluginData[_0x21d79f(0x141)],_0x21d79f(0xde),_0x5618ee=>{const _0x11b3f7=_0x21d79f;if(!$gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x5618ee,_0x5618ee);const _0x1524ac=$gameActors['actor'](_0x5618ee[_0x11b3f7(0x1e1)]),_0x398ae8=_0x5618ee[_0x11b3f7(0x194)];if(_0x1524ac)_0x1524ac['setAggro'](_0x398ae8);}),PluginManager[_0x21d79f(0x21b)](pluginData['name'],_0x21d79f(0x13f),_0x540936=>{const _0x44395e=_0x21d79f;if(!$gameParty[_0x44395e(0x10f)]())return;VisuMZ[_0x44395e(0xca)](_0x540936,_0x540936);const _0xa8654b=$gameTroop[_0x44395e(0x149)]()[_0x540936[_0x44395e(0x145)]],_0x2bd93b=_0x540936['Aggro'];if(_0xa8654b)_0xa8654b[_0x44395e(0x223)](_0x2bd93b);}),PluginManager['registerCommand'](pluginData[_0x21d79f(0x141)],_0x21d79f(0xba),_0x3eb368=>{const _0x321cf3=_0x21d79f;if(!$gameParty['inBattle']())return;VisuMZ[_0x321cf3(0xca)](_0x3eb368,_0x3eb368);const _0x28df24=$gameTroop[_0x321cf3(0x149)]()[_0x3eb368[_0x321cf3(0x145)]],_0xcf3698=_0x3eb368[_0x321cf3(0x194)];if(_0x28df24)_0x28df24[_0x321cf3(0xf2)](_0xcf3698);}),DataManager[_0x21d79f(0x1a9)]=function(_0x330c21){const _0x1aef9d=_0x21d79f;if(!_0x330c21)return![];return _0x330c21[_0x1aef9d(0x211)][_0x1aef9d(0x190)](/<PROVOKE>/i);},DataManager[_0x21d79f(0x156)]=function(_0x2bcd29){const _0x58aa43=_0x21d79f;if(!_0x2bcd29)return![];return _0x2bcd29[_0x58aa43(0x211)]['match'](/<BYPASS PROVOKE>/i);},DataManager[_0x21d79f(0x1ed)]=function(_0x47250b){const _0x2c1590=_0x21d79f;if(!_0x47250b)return![];return _0x47250b[_0x2c1590(0x211)][_0x2c1590(0x190)](/<BYPASS TAUNT>/i);},DataManager[_0x21d79f(0xf5)]=function(_0x37a737){const _0x26e583=_0x21d79f;if(!_0x37a737)return![];return _0x37a737['note'][_0x26e583(0x190)](/<BYPASS HIGHEST (?:AGGRO|ENMITY|THREAT)>/i);},DataManager[_0x21d79f(0x130)]=function(_0x521096){const _0x53fd3e=_0x21d79f;if(!_0x521096)return![];return _0x521096[_0x53fd3e(0x211)][_0x53fd3e(0x190)](/<TARGET HIGHEST (?:AGGRO|ENMITY|THREAT)>/i);},ImageManager[_0x21d79f(0x12a)]=function(){const _0x5a19a1=_0x21d79f;if(this[_0x5a19a1(0x11f)])return this['_provokeBitmap'];return this[_0x5a19a1(0x11f)]=new Bitmap(0x64,0x64),this['_provokeBitmap']['drawCircle'](0x32,0x32,0x32,ColorManager['provokeLineColor']()),this['_provokeBitmap'][_0x5a19a1(0xe9)]=![],this[_0x5a19a1(0x11f)];},ConfigManager['aggroGauge']=!![],ConfigManager[_0x21d79f(0x160)]=!![],VisuMZ['AggroControlSystem']['ConfigManager_makeData']=ConfigManager['makeData'],ConfigManager[_0x21d79f(0x21f)]=function(){const _0x413207=_0x21d79f,_0x5bf89a=VisuMZ['AggroControlSystem'][_0x413207(0x19a)][_0x413207(0x1bb)](this);return _0x5bf89a[_0x413207(0xe7)]=this[_0x413207(0xe7)],_0x5bf89a[_0x413207(0x160)]=this[_0x413207(0x160)],_0x5bf89a;},VisuMZ[_0x21d79f(0x193)][_0x21d79f(0x191)]=ConfigManager[_0x21d79f(0x1aa)],ConfigManager[_0x21d79f(0x1aa)]=function(_0x49f36c){const _0x2a5803=_0x21d79f;VisuMZ[_0x2a5803(0x193)][_0x2a5803(0x191)][_0x2a5803(0x1bb)](this,_0x49f36c),_0x2a5803(0xe7)in _0x49f36c?this[_0x2a5803(0xe7)]=_0x49f36c[_0x2a5803(0xe7)]:this[_0x2a5803(0xe7)]=!![],_0x2a5803(0x160)in _0x49f36c?this['provokeOrigin']=_0x49f36c['provokeOrigin']:this[_0x2a5803(0x160)]=!![];},TextManager['aggroGauge']=VisuMZ[_0x21d79f(0x193)]['Settings']['Aggro'][_0x21d79f(0xf3)],TextManager[_0x21d79f(0x160)]=VisuMZ[_0x21d79f(0x193)][_0x21d79f(0x1fa)]['Provoke']['OptionName'],ColorManager['getColorDataFromPluginParameters']=function(_0x4a1b28,_0x41cf60){const _0x1af18d=_0x21d79f;return _0x41cf60=String(_0x41cf60),this[_0x1af18d(0xcb)]=this[_0x1af18d(0xcb)]||{},_0x41cf60[_0x1af18d(0x190)](/#(.*)/i)?this[_0x1af18d(0xcb)][_0x4a1b28]=_0x1af18d(0xcf)[_0x1af18d(0x19c)](String(RegExp['$1'])):this['_colorCache'][_0x4a1b28]=this['textColor'](Number(_0x41cf60)),this['_colorCache'][_0x4a1b28];},ColorManager[_0x21d79f(0x178)]=function(_0x3bc519){const _0x18c8d3=_0x21d79f;return _0x3bc519=String(_0x3bc519),_0x3bc519[_0x18c8d3(0x190)](/#(.*)/i)?'#%1'[_0x18c8d3(0x19c)](String(RegExp['$1'])):this['textColor'](Number(_0x3bc519));},ColorManager[_0x21d79f(0xf8)]=function(){const _0x301304=_0x21d79f,_0x39f3b9=_0x301304(0x214);this[_0x301304(0xcb)]=this[_0x301304(0xcb)]||{};if(this[_0x301304(0xcb)][_0x39f3b9])return this[_0x301304(0xcb)][_0x39f3b9];const _0x25b9b7=VisuMZ[_0x301304(0x193)][_0x301304(0x1fa)][_0x301304(0x10a)]['LineColor'];return this[_0x301304(0x134)](_0x39f3b9,_0x25b9b7);},ColorManager[_0x21d79f(0x107)]=function(){const _0xfad6c=_0x21d79f,_0x14b0b5=_0xfad6c(0xb9);this[_0xfad6c(0xcb)]=this['_colorCache']||{};if(this['_colorCache'][_0x14b0b5])return this['_colorCache'][_0x14b0b5];const _0x3c3551=VisuMZ[_0xfad6c(0x193)][_0xfad6c(0x1fa)][_0xfad6c(0x194)]['GaugeColor1'];return this[_0xfad6c(0x134)](_0x14b0b5,_0x3c3551);},ColorManager[_0x21d79f(0x13d)]=function(){const _0x13c9c3=_0x21d79f,_0x431f62=_0x13c9c3(0x163);this['_colorCache']=this['_colorCache']||{};if(this[_0x13c9c3(0xcb)][_0x431f62])return this['_colorCache'][_0x431f62];const _0xbcc88a=VisuMZ[_0x13c9c3(0x193)][_0x13c9c3(0x1fa)]['Aggro'][_0x13c9c3(0x1ff)];return this[_0x13c9c3(0x134)](_0x431f62,_0xbcc88a);},SceneManager['isSceneBattle']=function(){const _0x5f5938=_0x21d79f;return this[_0x5f5938(0xd2)]&&this[_0x5f5938(0xd2)]['constructor']===Scene_Battle;},BattleManager[_0x21d79f(0xc6)]=function(_0x2e22f7){const _0x2dd708=_0x21d79f;let _0x19ccb5=this[_0x2dd708(0x15c)];this[_0x2dd708(0x1a4)]&&(_0x19ccb5=this[_0x2dd708(0x1a4)]);if(!_0x19ccb5)return null;if(_0x19ccb5[_0x2dd708(0x228)]()&&_0x2e22f7[_0x2dd708(0x1eb)]())return _0x2dd708(0x202)[_0x2dd708(0x19c)](_0x19ccb5['actorId']());else{if(_0x19ccb5['isEnemy']()&&_0x2e22f7[_0x2dd708(0x228)]())return _0x2dd708(0x207)[_0x2dd708(0x19c)](_0x19ccb5['index']());}return null;},BattleManager['convertStringToBattleTarget']=function(_0x45d75a){const _0x3f7296=_0x21d79f;if(!_0x45d75a)return null;if(_0x45d75a[_0x3f7296(0x190)](/BATTLE ACTOR (\d+)/i))return $gameActors[_0x3f7296(0x1d1)](Number(RegExp['$1']));else{if(_0x45d75a[_0x3f7296(0x190)](/BATTLE ENEMY (\d+)/i))return $gameTroop[_0x3f7296(0x149)]()[Number(RegExp['$1'])];}return null;},BattleManager[_0x21d79f(0x1b3)]=function(){const _0x972d9a=_0x21d79f;return VisuMZ[_0x972d9a(0x193)]['Settings'][_0x972d9a(0x194)][_0x972d9a(0xef)];},VisuMZ['AggroControlSystem'][_0x21d79f(0x205)]=Game_Action[_0x21d79f(0x1d8)][_0x21d79f(0x15f)],Game_Action['prototype'][_0x21d79f(0x15f)]=function(){const _0x301b41=_0x21d79f;let _0x5eac95=VisuMZ[_0x301b41(0x193)][_0x301b41(0x205)][_0x301b41(0x1bb)](this);if(this[_0x301b41(0x13b)])return _0x5eac95;this['_checkingAggroTarget']=!![];if(_0x5eac95&&_0x5eac95[_0x301b41(0x228)]()!==this['subject']()['isActor']()){this[_0x301b41(0xf6)]=-0x1;if(this[_0x301b41(0xda)]())_0x5eac95=this[_0x301b41(0xf9)]()['provoker']();else{if(this[_0x301b41(0x115)]()){this[_0x301b41(0x13b)]=![];const _0x596dc8=this[_0x301b41(0x1e4)]()['hitType'],_0x5e7166=this[_0x301b41(0x20f)]()[_0x301b41(0x142)](_0x596dc8);!_0x5e7166['includes'](_0x5eac95)&&(_0x5eac95=_0x5e7166[Math[_0x301b41(0x204)](_0x5e7166[_0x301b41(0x16b)])]);}else this['isAggroAffected']()&&(this[_0x301b41(0x13b)]=![],_0x5eac95=this[_0x301b41(0x20f)]()[_0x301b41(0x157)]());}}return this[_0x301b41(0x13b)]=![],_0x5eac95;},VisuMZ[_0x21d79f(0x193)][_0x21d79f(0x1f0)]=Game_Action[_0x21d79f(0x1d8)][_0x21d79f(0x1cd)],Game_Action[_0x21d79f(0x1d8)][_0x21d79f(0x1cd)]=function(_0x2a6cf2){const _0x4832be=_0x21d79f;if(this[_0x4832be(0xda)]())return this[_0x4832be(0x16d)]();else{if(this[_0x4832be(0x115)]())return this['tauntTargetsForAlive'](_0x2a6cf2);else return this[_0x4832be(0x200)]()?(_0x2a6cf2[_0x4832be(0x112)](),[_0x2a6cf2[_0x4832be(0x157)]()]):VisuMZ[_0x4832be(0x193)]['Game_Action_targetsForAlive']['call'](this,_0x2a6cf2);}},Game_Action['prototype'][_0x21d79f(0x1a2)]=function(){const _0x4d2276=_0x21d79f;if(this[_0x4d2276(0xb5)]&&this['isForAnyone']()&&this[_0x4d2276(0xeb)]()){const _0x5b87d5=this[_0x4d2276(0x1e5)]();return _0x5b87d5['length']>=0x1&&_0x5b87d5[0x0]&&_0x5b87d5[0x0][_0x4d2276(0x228)]()===this[_0x4d2276(0xf9)]()[_0x4d2276(0x228)]();}else{if(this[_0x4d2276(0x1e4)]()[_0x4d2276(0x120)]!==0x1)return!![];}return![];},Game_Action[_0x21d79f(0x1d8)]['isProvokeAffected']=function(){const _0x41d51e=_0x21d79f;if(!$gameParty[_0x41d51e(0x10f)]())return![];if(!this[_0x41d51e(0x1e4)]())return![];if(this['isNotEnemySelectAction']())return![];if(!this[_0x41d51e(0xeb)]())return![];if(DataManager[_0x41d51e(0x156)](this[_0x41d51e(0x1e4)]()))return![];if(this['subject']()[_0x41d51e(0x1c3)]())return![];if(!this[_0x41d51e(0xf9)]()[_0x41d51e(0xda)]())return![];const _0x256fe0=this['subject']()[_0x41d51e(0x1f8)]();if(_0x256fe0['isDead']())return![];return!![];},Game_Action[_0x21d79f(0x1d8)]['makeProvokeTarget']=function(){const _0x5c52c6=_0x21d79f;return[this['subject']()[_0x5c52c6(0x1f8)]()];},Game_Action[_0x21d79f(0x1d8)][_0x21d79f(0x115)]=function(){const _0x47e02b=_0x21d79f;if(!$gameParty[_0x47e02b(0x10f)]())return![];if(!this[_0x47e02b(0x1e4)]())return![];if(this['isNotEnemySelectAction']())return![];if(!this['needsSelection']())return![];if(DataManager[_0x47e02b(0x1ed)](this[_0x47e02b(0x1e4)]()))return![];if(this[_0x47e02b(0xf9)]()[_0x47e02b(0xb7)]())return![];const _0x4ce9ba=this[_0x47e02b(0x20f)]();let _0x5c128b=![];if(this[_0x47e02b(0x111)]()&&_0x4ce9ba[_0x47e02b(0x1c1)]()['length']>0x0)_0x5c128b=!![];if(this[_0x47e02b(0x1b0)]()&&_0x4ce9ba[_0x47e02b(0x22d)]()[_0x47e02b(0x16b)]>0x0)_0x5c128b=!![];if(this[_0x47e02b(0x10d)]()&&_0x4ce9ba[_0x47e02b(0xdd)]()[_0x47e02b(0x16b)]>0x0)_0x5c128b=!![];return _0x5c128b;},Game_Action['prototype'][_0x21d79f(0x221)]=function(_0x1077d7){const _0x7533e5=_0x21d79f;if(this[_0x7533e5(0xf6)]<0x0)return[_0x1077d7['randomTauntTarget'](this[_0x7533e5(0x1e4)]()[_0x7533e5(0x231)])];else{const _0x5545cc=_0x1077d7['smoothTarget'](this[_0x7533e5(0xf6)]);return _0x5545cc['matchTauntType'](this[_0x7533e5(0x1e4)]()[_0x7533e5(0x231)])?[_0x5545cc]:[_0x1077d7[_0x7533e5(0xc9)]()];}},Game_Action['prototype']['isAggroAffected']=function(){const _0x524a4d=_0x21d79f;if(!$gameParty[_0x524a4d(0x10f)]())return![];if(this[_0x524a4d(0x1a2)]())return![];if(this['_targetIndex']>=0x0)return![];if(Imported[_0x524a4d(0x14f)]&&this['subject']()['isEnemy']()){const _0x11eb43=this['item']()['note']||'',_0x4fd343=AIManager[_0x524a4d(0x102)];if(_0x11eb43['match'](_0x4fd343['aiTarget']))return![];}if(DataManager[_0x524a4d(0xf5)](this[_0x524a4d(0x1e4)]()))return![];if(this[_0x524a4d(0xf9)]()['bypassHighestAggro']())return![];if(DataManager['alwaysTargetHighestAggro'](this[_0x524a4d(0x1e4)]()))return!![];if(this[_0x524a4d(0xf9)]()[_0x524a4d(0x130)]())return!![];if(this['subject']()['isActor']())return![];return BattleManager[_0x524a4d(0x1b3)]();},VisuMZ[_0x21d79f(0x193)][_0x21d79f(0x1f2)]=Game_Action['prototype'][_0x21d79f(0x1d3)],Game_Action[_0x21d79f(0x1d8)]['applyGlobal']=function(){const _0x64db6b=_0x21d79f;VisuMZ[_0x64db6b(0x193)][_0x64db6b(0x1f2)][_0x64db6b(0x1bb)](this),this[_0x64db6b(0x158)]();},Game_Action['prototype']['applySubjectAggro']=function(){const _0x4f39e3=_0x21d79f,_0x37758a=this['item']()[_0x4f39e3(0x211)];if(_0x37758a[_0x4f39e3(0x190)](/<(?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT): ([\+\-]\d+)>/i)){const _0x334734=Number(RegExp['$1']);this[_0x4f39e3(0xf9)]()[_0x4f39e3(0x223)](_0x334734);}if(_0x37758a['match'](/<JS (?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT)>\s*([\s\S]*)\s*<\/JS (?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT)>/i)){const _0x2efd46=String(RegExp['$1']);window[_0x4f39e3(0x189)]=this[_0x4f39e3(0xf9)](),window[_0x4f39e3(0x1e4)]=this[_0x4f39e3(0x1e4)](),window['a']=this[_0x4f39e3(0xf9)](),window['b']=a,window['value']=user[_0x4f39e3(0x1ad)]();try{eval(_0x2efd46);}catch(_0x55aab2){if($gameTemp[_0x4f39e3(0x14b)]())console[_0x4f39e3(0x11c)](_0x55aab2);}user[_0x4f39e3(0xf2)](window[_0x4f39e3(0x203)]),window[_0x4f39e3(0x189)]=undefined,window[_0x4f39e3(0x14c)]=undefined,window[_0x4f39e3(0x1e4)]=undefined,window['a']=undefined,window['b']=undefined,window['value']=undefined;}},VisuMZ[_0x21d79f(0x193)]['Game_Action_applyItemUserEffect']=Game_Action['prototype']['applyItemUserEffect'],Game_Action[_0x21d79f(0x1d8)][_0x21d79f(0x1c9)]=function(_0x365195){const _0x47d5b7=_0x21d79f;VisuMZ[_0x47d5b7(0x193)][_0x47d5b7(0x18f)][_0x47d5b7(0x1bb)](this,_0x365195),this['applyItemUserEffectAggroControl'](_0x365195);},Game_Action[_0x21d79f(0x1d8)][_0x21d79f(0x131)]=function(_0xab70f8){const _0x92d05f=_0x21d79f;if(!this[_0x92d05f(0x1e4)]())return;if(!SceneManager[_0x92d05f(0x12b)]())return;const _0x68228d=this[_0x92d05f(0x1e4)]()[_0x92d05f(0x211)];if(_0x68228d[_0x92d05f(0x190)](/<TARGET (?:AGGRO|ENMITY|THREAT): ([\+\-]\d+)>/i)){const _0x54d58a=Number(RegExp['$1']);_0xab70f8[_0x92d05f(0x223)](_0x54d58a);}if(_0x68228d[_0x92d05f(0x190)](/<JS TARGET (?:AGGRO|ENMITY|THREAT)>\s*([\s\S]*)\s*<\/JS TARGET (?:AGGRO|ENMITY|THREAT)>/i)){const _0x1a77c9=String(RegExp['$1']);window[_0x92d05f(0x189)]=this[_0x92d05f(0xf9)](),window['target']=_0xab70f8,window['item']=this[_0x92d05f(0x1e4)](),window['a']=this['subject'](),window['b']=_0xab70f8,window[_0x92d05f(0x203)]=_0xab70f8['battleAggro']();try{eval(_0x1a77c9);}catch(_0x49b0a7){if($gameTemp[_0x92d05f(0x14b)]())console['log'](_0x49b0a7);}_0xab70f8[_0x92d05f(0xf2)](window['value']),window['user']=undefined,window[_0x92d05f(0x14c)]=undefined,window[_0x92d05f(0x1e4)]=undefined,window['a']=undefined,window['b']=undefined,window[_0x92d05f(0x203)]=undefined;}},VisuMZ[_0x21d79f(0x193)][_0x21d79f(0x1af)]=Game_Action[_0x21d79f(0x1d8)][_0x21d79f(0x1c7)],Game_Action[_0x21d79f(0x1d8)][_0x21d79f(0x1c7)]=function(_0x41e117,_0x2ef0b4){const _0x1128e4=_0x21d79f;VisuMZ[_0x1128e4(0x193)][_0x1128e4(0x1af)][_0x1128e4(0x1bb)](this,_0x41e117,_0x2ef0b4),this[_0x1128e4(0x138)](_0x41e117,_0x2ef0b4);},Game_Action[_0x21d79f(0x1d8)][_0x21d79f(0x138)]=function(_0x50dd6d,_0x4e5f00){const _0x32ea76=_0x21d79f,_0x150496=VisuMZ['AggroControlSystem']['Settings'][_0x32ea76(0x194)];if(_0x4e5f00>0x0&&_0x50dd6d[_0x32ea76(0x228)]()!==this[_0x32ea76(0xf9)]()['isActor']()){const _0x2b5e9b=_0x150496[_0x32ea76(0x206)];this['subject']()['gainAggro'](_0x2b5e9b*_0x4e5f00);}if(_0x4e5f00<0x0&&_0x50dd6d[_0x32ea76(0x228)]()===this[_0x32ea76(0xf9)]()[_0x32ea76(0x228)]()){const _0x36689c=_0x150496[_0x32ea76(0xe2)];this[_0x32ea76(0xf9)]()[_0x32ea76(0x223)](_0x36689c*Math[_0x32ea76(0x13c)](_0x4e5f00));}},VisuMZ['AggroControlSystem'][_0x21d79f(0x1c5)]=Game_BattlerBase[_0x21d79f(0x1d8)][_0x21d79f(0x17c)],Game_BattlerBase['prototype'][_0x21d79f(0x17c)]=function(){const _0x37cacb=_0x21d79f;this['_cache']={},VisuMZ[_0x37cacb(0x193)][_0x37cacb(0x1c5)][_0x37cacb(0x1bb)](this),this[_0x37cacb(0x12f)]();},Game_BattlerBase['prototype']['initAggroControl']=function(){const _0x534f16=_0x21d79f;this[_0x534f16(0x17e)](),this['clearAggro']();},Game_BattlerBase[_0x21d79f(0x1d8)][_0x21d79f(0x17e)]=function(){this['_provoker']={};},VisuMZ[_0x21d79f(0x193)][_0x21d79f(0x188)]=Game_BattlerBase['prototype'][_0x21d79f(0x155)],Game_BattlerBase['prototype'][_0x21d79f(0x155)]=function(){const _0x388c14=_0x21d79f;this['_cache']={},VisuMZ[_0x388c14(0x193)][_0x388c14(0x188)][_0x388c14(0x1bb)](this),this[_0x388c14(0x1ba)]();},Game_BattlerBase[_0x21d79f(0x1d8)][_0x21d79f(0xc2)]=function(_0x4009a4){const _0x1ca1e5=_0x21d79f;return this[_0x1ca1e5(0x19e)]=this['_cache']||{},this[_0x1ca1e5(0x19e)][_0x4009a4]!==undefined;},Game_BattlerBase[_0x21d79f(0x1d8)][_0x21d79f(0x1f8)]=function(){const _0x411a54=_0x21d79f;for(const _0x473381 of this[_0x411a54(0xc8)]()){if(DataManager[_0x411a54(0x1a9)](_0x473381)){if(this[_0x411a54(0x18c)]===undefined)this[_0x411a54(0x17e)]();const _0x291bc8=this[_0x411a54(0x18c)][_0x473381['id']],_0x52a11f=BattleManager[_0x411a54(0x21c)](_0x291bc8);if(!_0x52a11f)continue;if(_0x52a11f[_0x411a54(0x228)]()&&!$gameParty['battleMembers']()['includes'](_0x52a11f)){this[_0x411a54(0x171)](_0x473381['id']);continue;}if(_0x52a11f[_0x411a54(0xe4)]())return _0x52a11f;}}return null;},Game_BattlerBase[_0x21d79f(0x1d8)][_0x21d79f(0xda)]=function(){const _0x29f870=_0x21d79f;return!!this[_0x29f870(0x1f8)]();},Game_BattlerBase['prototype'][_0x21d79f(0x1c3)]=function(){const _0xb73b80=_0x21d79f;return this[_0xb73b80(0x136)]()['some'](_0x52a5de=>_0x52a5de&&_0x52a5de[_0xb73b80(0x211)][_0xb73b80(0x190)](/<BYPASS PROVOKE>/i));},Game_BattlerBase[_0x21d79f(0x1d8)][_0x21d79f(0xdf)]=function(){const _0x151c86=_0x21d79f;let _0x4c04ea=_0x151c86(0xdf);if(this['checkCacheKey'](_0x4c04ea))return this[_0x151c86(0x19e)][_0x4c04ea];return this[_0x151c86(0x19e)][_0x4c04ea]=this[_0x151c86(0x1cf)](),this['_cache'][_0x4c04ea];},Game_BattlerBase['prototype']['createProvokeHeightOrigin']=function(){const _0x447bc0=_0x21d79f,_0xb1c968=this['isActor']()?this[_0x447bc0(0x1d1)]()[_0x447bc0(0x211)]:this[_0x447bc0(0x1eb)]()?this[_0x447bc0(0xea)]()['note']:'';if(_0xb1c968[_0x447bc0(0x190)](/<PROVOKE HEIGHT ORIGIN: (\d+)([%％])>/i))return Number(RegExp['$1'])*0.01;return VisuMZ[_0x447bc0(0x193)][_0x447bc0(0x1fa)][_0x447bc0(0x10a)]['HeightOrigin'];},Game_BattlerBase[_0x21d79f(0x1d8)][_0x21d79f(0x1ba)]=function(){const _0x55ee35=_0x21d79f;for(const _0x171d5a of this[_0x55ee35(0xc8)]()){if(DataManager['stateHasProvoke'](_0x171d5a)){if(this[_0x55ee35(0x18c)]===undefined)this[_0x55ee35(0x17e)]();const _0x3fd095=this['_provoker'][_0x171d5a['id']],_0x37a886=BattleManager['convertStringToBattleTarget'](_0x3fd095);if(!_0x37a886)continue;_0x37a886[_0x55ee35(0x228)]()&&!$gameParty[_0x55ee35(0x116)]()[_0x55ee35(0xec)](_0x37a886)&&this[_0x55ee35(0x171)](_0x171d5a['id']),_0x37a886['isDead']()&&this['removeState'](_0x171d5a['id']);}}},Game_BattlerBase[_0x21d79f(0x1d8)][_0x21d79f(0x12d)]=function(_0x3c558c){const _0x56c4b0=_0x21d79f;switch(_0x3c558c){case Game_Action['HITTYPE_PHYSICAL']:return this[_0x56c4b0(0xd5)]();break;case Game_Action['HITTYPE_MAGICAL']:return this[_0x56c4b0(0x1d9)]();break;case Game_Action['HITTYPE_CERTAIN']:return this[_0x56c4b0(0x137)]();break;}},Game_BattlerBase['prototype'][_0x21d79f(0xfc)]=function(){const _0x4e3c4e=_0x21d79f;return this[_0x4e3c4e(0xd5)]()||this['magicalTaunt']()||this[_0x4e3c4e(0x137)]();},Game_BattlerBase['prototype'][_0x21d79f(0xd5)]=function(){const _0x2d979a=_0x21d79f;return this['traitObjects']()[_0x2d979a(0x1a1)](_0x2b04e5=>_0x2b04e5&&_0x2b04e5[_0x2d979a(0x211)][_0x2d979a(0x190)](/<(?:TAUNT|PHYSICAL TAUNT|ALL TAUNT)>/i));},Game_BattlerBase[_0x21d79f(0x1d8)][_0x21d79f(0x1d9)]=function(){const _0xadf29a=_0x21d79f;return this['traitObjects']()[_0xadf29a(0x1a1)](_0x3d78d0=>_0x3d78d0&&_0x3d78d0[_0xadf29a(0x211)]['match'](/<(?:TAUNT|MAGICAL TAUNT|ALL TAUNT)>/i));},Game_BattlerBase['prototype']['certainHitTaunt']=function(){const _0x491116=_0x21d79f;return this[_0x491116(0x136)]()[_0x491116(0x1a1)](_0x4f3c17=>_0x4f3c17&&_0x4f3c17['note']['match'](/<(?:TAUNT|CERTAIN TAUNT|CERTAIN HIT TAUNT|ALL TAUNT)>/i));},Game_BattlerBase[_0x21d79f(0x1d8)]['bypassTaunt']=function(){const _0x49eef8=_0x21d79f;return this[_0x49eef8(0x136)]()[_0x49eef8(0x1a1)](_0x37d6db=>_0x37d6db&&_0x37d6db[_0x49eef8(0x211)][_0x49eef8(0x190)](/<BYPASS TAUNT>/i));},Game_BattlerBase['prototype'][_0x21d79f(0x1fe)]=function(){const _0x897e8b=_0x21d79f;this[_0x897e8b(0x16e)]=0x1;},VisuMZ[_0x21d79f(0x193)][_0x21d79f(0x208)]=Game_BattlerBase[_0x21d79f(0x1d8)][_0x21d79f(0x16a)],Game_BattlerBase[_0x21d79f(0x1d8)][_0x21d79f(0x16a)]=function(_0x59f825){const _0x10353f=_0x21d79f;let _0x4919f7=VisuMZ['AggroControlSystem'][_0x10353f(0x208)][_0x10353f(0x1bb)](this,_0x59f825);if(_0x59f825===0x0){if(this[_0x10353f(0x16e)]===undefined)this[_0x10353f(0x1fe)]();_0x4919f7*=this[_0x10353f(0x20e)](),_0x4919f7=Math[_0x10353f(0x1e7)](_0x4919f7,0x0);}return _0x4919f7;},Game_BattlerBase[_0x21d79f(0x1d8)][_0x21d79f(0xf2)]=function(_0x9949a0){const _0x3ab94a=_0x21d79f;if(this['_aggro']===undefined)this['clearAggro']();this['_aggro']=Math[_0x3ab94a(0x1e7)](0x1,Math[_0x3ab94a(0x220)](this[_0x3ab94a(0x16e)]));},Game_BattlerBase['prototype'][_0x21d79f(0x223)]=function(_0x238e8a){const _0x462646=_0x21d79f;if(this['_aggro']===undefined)this[_0x462646(0x1fe)]();this['_aggro']=Math[_0x462646(0x1e7)](0x1,this[_0x462646(0x16e)]+Math[_0x462646(0x220)](_0x238e8a));},Game_BattlerBase[_0x21d79f(0x1d8)][_0x21d79f(0x1bc)]=function(_0x12ad3e){const _0x23d025=_0x21d79f;this[_0x23d025(0x223)](-_0x12ad3e);},Game_BattlerBase[_0x21d79f(0x1d8)][_0x21d79f(0x20e)]=function(){const _0x2abda1=_0x21d79f;if(this[_0x2abda1(0x17f)]())return 0x0;return this['baseAggro']()*this[_0x2abda1(0x110)]();},Game_BattlerBase['prototype'][_0x21d79f(0x1ad)]=function(){const _0x24b76f=_0x21d79f;return this[_0x24b76f(0x16e)]===undefined&&this[_0x24b76f(0x1fe)](),this[_0x24b76f(0x16e)];},Game_BattlerBase[_0x21d79f(0x1d8)]['baseAggro']=function(){const _0xbcc558=_0x21d79f;return this[_0xbcc558(0x136)]()[_0xbcc558(0x213)]((_0x40196d,_0xd7181f)=>{const _0x53cf15=_0xbcc558;return _0xd7181f&&_0xd7181f['note'][_0x53cf15(0x190)](/<(?:AGGRO|ENMITY|THREAT): ([\+\-]\d+)>/i)?_0x40196d+Number(RegExp['$1'])/0x64:_0x40196d;},this['battleAggro']());},Game_BattlerBase['prototype']['aggroMultiplier']=function(){return this['traitObjects']()['reduce']((_0x46984d,_0x39ec40)=>{const _0x1c6007=_0x1ffe;return _0x39ec40&&_0x39ec40[_0x1c6007(0x211)]['match'](/<(?:AGGRO|ENMITY|THREAT) MULTIPLIER: (\d+)%>/i)?_0x46984d+Number(RegExp['$1'])/0x64:_0x46984d;},0x1);},Game_BattlerBase['prototype'][_0x21d79f(0xce)]=function(){const _0x4e75e8=_0x21d79f;return this['traitObjects']()[_0x4e75e8(0x1a1)](_0x5a291f=>_0x5a291f&&_0x5a291f[_0x4e75e8(0x211)][_0x4e75e8(0x190)](/<BYPASS HIGHEST (?:AGGRO|ENMITY|THREAT)>/i));},Game_BattlerBase[_0x21d79f(0x1d8)][_0x21d79f(0x130)]=function(){const _0x3ddac2=_0x21d79f;return this[_0x3ddac2(0x136)]()[_0x3ddac2(0x1a1)](_0x45b9df=>_0x45b9df&&_0x45b9df[_0x3ddac2(0x211)]['match'](/<TARGET HIGHEST (?:AGGRO|ENMITY|THREAT)>/i));},VisuMZ[_0x21d79f(0x193)]['Game_Battler_onBattleStart']=Game_Battler[_0x21d79f(0x1d8)][_0x21d79f(0x101)],Game_Battler[_0x21d79f(0x1d8)][_0x21d79f(0x101)]=function(_0x59b053){const _0x1c521e=_0x21d79f;VisuMZ[_0x1c521e(0x193)]['Game_Battler_onBattleStart'][_0x1c521e(0x1bb)](this,_0x59b053),this['clearAggro']();},VisuMZ[_0x21d79f(0x193)][_0x21d79f(0xd6)]=Game_Battler[_0x21d79f(0x1d8)]['onBattleEnd'],Game_Battler[_0x21d79f(0x1d8)][_0x21d79f(0x1d2)]=function(){const _0x3a62c3=_0x21d79f;VisuMZ[_0x3a62c3(0x193)][_0x3a62c3(0xd6)][_0x3a62c3(0x1bb)](this),this['clearAggro']();},VisuMZ[_0x21d79f(0x193)][_0x21d79f(0x1a5)]=Game_Battler[_0x21d79f(0x1d8)]['addState'],Game_Battler[_0x21d79f(0x1d8)][_0x21d79f(0xc1)]=function(_0x1da4c1){const _0x54868e=_0x21d79f;VisuMZ[_0x54868e(0x193)][_0x54868e(0x1a5)]['call'](this,_0x1da4c1),this[_0x54868e(0x128)](_0x1da4c1);},Game_Battler['prototype']['applyProvokeEffect']=function(_0x3220c9){const _0x4b867d=_0x21d79f;if(this['isStateAffected'](_0x3220c9)){if(this[_0x4b867d(0x18c)]===undefined)this[_0x4b867d(0x17e)]();const _0x3fb2f3=BattleManager[_0x4b867d(0xc6)](this);this[_0x4b867d(0x18c)][_0x3220c9]=_0x3fb2f3,!this['_provoker'][_0x3220c9]&&delete this[_0x4b867d(0x18c)][_0x3220c9];}},VisuMZ[_0x21d79f(0x193)]['BattleManager_invokeCounterAttack']=BattleManager[_0x21d79f(0x216)],BattleManager[_0x21d79f(0x216)]=function(_0x329606,_0x178564){const _0x167ab7=_0x21d79f;this[_0x167ab7(0x1a4)]=_0x178564,VisuMZ['AggroControlSystem'][_0x167ab7(0x1a8)][_0x167ab7(0x1bb)](this,_0x329606,_0x178564),this[_0x167ab7(0x1a4)]=undefined;},VisuMZ[_0x21d79f(0x193)][_0x21d79f(0x1b1)]=BattleManager[_0x21d79f(0xe3)],BattleManager['invokeMagicReflection']=function(_0x58b5ad,_0x827a05){const _0x2e35d9=_0x21d79f;this['_counterAttackingTarget']=_0x827a05,VisuMZ[_0x2e35d9(0x193)][_0x2e35d9(0x1b1)][_0x2e35d9(0x1bb)](this,_0x58b5ad,_0x827a05),this[_0x2e35d9(0x1a4)]=undefined;},VisuMZ[_0x21d79f(0x193)]['Game_Unit_onBattleStart']=Game_Unit[_0x21d79f(0x1d8)][_0x21d79f(0x101)],Game_Unit[_0x21d79f(0x1d8)][_0x21d79f(0x101)]=function(_0x1c6be2){const _0x19526c=_0x21d79f;this[_0x19526c(0x112)](),VisuMZ['AggroControlSystem'][_0x19526c(0x12e)][_0x19526c(0x1bb)](this,_0x1c6be2);},Game_Unit[_0x21d79f(0x1d8)][_0x21d79f(0x1c1)]=function(){const _0x247867=_0x21d79f;return this[_0x247867(0x17a)]()[_0x247867(0x22a)](_0x7828a2=>_0x7828a2&&_0x7828a2[_0x247867(0xd5)]());},Game_Unit[_0x21d79f(0x1d8)][_0x21d79f(0x22d)]=function(){const _0x58df24=_0x21d79f;return this[_0x58df24(0x17a)]()['filter'](_0x443142=>_0x443142&&_0x443142[_0x58df24(0x1d9)]());},Game_Unit[_0x21d79f(0x1d8)][_0x21d79f(0xdd)]=function(){const _0x1d846e=_0x21d79f;return this[_0x1d846e(0x17a)]()[_0x1d846e(0x22a)](_0x1c49f7=>_0x1c49f7&&_0x1c49f7[_0x1d846e(0x137)]());},Game_Unit['prototype']['getTauntMembers']=function(_0x2d7e09){const _0xa34a38=_0x21d79f;switch(_0x2d7e09){case Game_Action[_0xa34a38(0x232)]:return this['physicalTauntMembers']();break;case Game_Action[_0xa34a38(0xd7)]:return this[_0xa34a38(0x22d)]();break;case Game_Action[_0xa34a38(0x1b6)]:return this['certainHitTauntMembers']();break;}return[];},Game_Unit[_0x21d79f(0x1d8)][_0x21d79f(0xc9)]=function(_0x1270b0){const _0x318361=_0x21d79f;let _0x5ddd2c=[];switch(_0x1270b0){case Game_Action[_0x318361(0x232)]:_0x5ddd2c=this['physicalTauntMembers']();break;case Game_Action['HITTYPE_MAGICAL']:_0x5ddd2c=this[_0x318361(0x22d)]();break;case Game_Action[_0x318361(0x1b6)]:_0x5ddd2c=this['certainHitTauntMembers']();break;}let _0x8c9870=Math[_0x318361(0x17b)]()*this['tgrSumFromGroup'](_0x5ddd2c),_0x2f57e6=null;if(BattleManager[_0x318361(0x1b3)]()){const _0x131014=!![];return this['findTgrMember'](_0x5ddd2c,_0x131014);}else{for(const _0x42a03a of _0x5ddd2c){_0x8c9870-=_0x42a03a[_0x318361(0x1fc)],_0x8c9870<=0x0&&!_0x2f57e6&&(_0x2f57e6=_0x42a03a);}return _0x2f57e6||this['randomTarget']();}},Game_Unit[_0x21d79f(0x1d8)][_0x21d79f(0x1a7)]=function(_0x49add9){const _0x558f73=_0x21d79f;return _0x49add9['reduce']((_0x38408f,_0x219cb2)=>_0x38408f+_0x219cb2[_0x558f73(0x1fc)],0x0);},Game_Unit['prototype'][_0x21d79f(0x20c)]=function(){const _0x27f792=_0x21d79f,_0x7d084b=this[_0x27f792(0x17a)]()[_0x27f792(0x210)](_0x2199e3=>_0x2199e3[_0x27f792(0x1fc)]);return Math[_0x27f792(0x1e7)](..._0x7d084b);},Game_Unit['prototype'][_0x21d79f(0x168)]=function(){const _0x541a36=_0x21d79f,_0x19c18f=this['aliveMembers']()[_0x541a36(0x210)](_0x1225d7=>_0x1225d7[_0x541a36(0x1fc)]);return Math[_0x541a36(0x127)](..._0x19c18f);},Game_Unit['prototype'][_0x21d79f(0x112)]=function(){const _0x57c6ae=_0x21d79f;this[_0x57c6ae(0x1d5)]=undefined,this['_lowestTgrMember']=undefined;},Game_Unit['prototype'][_0x21d79f(0x157)]=function(){const _0x525c3e=_0x21d79f;if(!this[_0x525c3e(0x1d5)]){const _0x1c8c6b=this[_0x525c3e(0x20c)](),_0x44cda8=this[_0x525c3e(0x17a)]()['filter'](_0x1d02ef=>_0x1d02ef['tgr']===_0x1c8c6b);this['_highestTgrMember']=_0x44cda8[Math[_0x525c3e(0x204)](_0x44cda8[_0x525c3e(0x16b)])]||this[_0x525c3e(0x1b4)]();}return this['_highestTgrMember'];},Game_Unit[_0x21d79f(0x1d8)][_0x21d79f(0x153)]=function(){const _0xd58854=_0x21d79f;if(!this['_lowestTgrMember']){const _0x51713c=this[_0xd58854(0x168)](),_0x266660=this[_0xd58854(0x17a)]()['filter'](_0x2c285b=>_0x2c285b[_0xd58854(0x1fc)]===_0x51713c);this[_0xd58854(0xbb)]=_0x266660[Math[_0xd58854(0x204)](_0x266660[_0xd58854(0x16b)])]||this['randomTarget']();}return this['_lowestTgrMember'];},VisuMZ[_0x21d79f(0x193)][_0x21d79f(0xfe)]=BattleManager[_0x21d79f(0x169)],BattleManager[_0x21d79f(0x169)]=function(){const _0xd87eb0=_0x21d79f;VisuMZ['AggroControlSystem'][_0xd87eb0(0xfe)][_0xd87eb0(0x1bb)](this),$gameParty['clearTgrCache'](),$gameTroop[_0xd87eb0(0x112)]();},VisuMZ[_0x21d79f(0x193)][_0x21d79f(0xe1)]=BattleManager[_0x21d79f(0x179)],BattleManager[_0x21d79f(0x179)]=function(_0x268c90){const _0x2af44a=_0x21d79f;VisuMZ[_0x2af44a(0x193)][_0x2af44a(0xe1)][_0x2af44a(0x1bb)](this,_0x268c90),$gameParty['clearTgrCache'](),$gameTroop[_0x2af44a(0x112)]();},Game_Unit[_0x21d79f(0x1d8)][_0x21d79f(0xdb)]=function(_0xda206f,_0x2d22d4){const _0x6d61a3=_0x21d79f,_0x55684d=_0xda206f[_0x6d61a3(0x210)](_0x4f6202=>_0x4f6202[_0x6d61a3(0x1fc)]),_0x1eb812=_0x2d22d4?Math[_0x6d61a3(0x1e7)](..._0x55684d):Math[_0x6d61a3(0x127)](..._0x55684d),_0x20a4b5=_0xda206f[_0x6d61a3(0x22a)](_0x57e794=>_0x57e794[_0x6d61a3(0x1fc)]===_0x1eb812);return _0x20a4b5[Math[_0x6d61a3(0x204)](_0x20a4b5[_0x6d61a3(0x16b)])]||this[_0x6d61a3(0x1b4)]();},VisuMZ[_0x21d79f(0x193)]['Scene_Options_maxCommands']=Scene_Options[_0x21d79f(0x1d8)][_0x21d79f(0xc7)],Scene_Options['prototype'][_0x21d79f(0xc7)]=function(){const _0x1cb5b4=_0x21d79f;let _0x3f4d42=VisuMZ[_0x1cb5b4(0x193)][_0x1cb5b4(0xbd)][_0x1cb5b4(0x1bb)](this);const _0xa8f5c2=VisuMZ[_0x1cb5b4(0x193)][_0x1cb5b4(0x1fa)];if(_0xa8f5c2[_0x1cb5b4(0x10a)][_0x1cb5b4(0x11d)]&&_0xa8f5c2['Provoke'][_0x1cb5b4(0x1a3)])_0x3f4d42++;if(_0xa8f5c2[_0x1cb5b4(0x194)][_0x1cb5b4(0x11d)]&&_0xa8f5c2[_0x1cb5b4(0x194)][_0x1cb5b4(0x1a3)])_0x3f4d42++;return _0x3f4d42;},Sprite_Battler[_0x21d79f(0x1e0)]=VisuMZ['AggroControlSystem'][_0x21d79f(0x1fa)][_0x21d79f(0x185)]['CycleTime'],Sprite_Battler[_0x21d79f(0xd0)]=VisuMZ['AggroControlSystem']['Settings'][_0x21d79f(0x185)][_0x21d79f(0x108)],Sprite_Battler[_0x21d79f(0x1d6)]=VisuMZ[_0x21d79f(0x193)][_0x21d79f(0x1fa)][_0x21d79f(0x185)]['AniMagical'],Sprite_Battler['_certainHitTauntAnimation']=VisuMZ[_0x21d79f(0x193)][_0x21d79f(0x1fa)][_0x21d79f(0x185)]['AniCertain'],Sprite_Battler[_0x21d79f(0x1c8)]=VisuMZ['AggroControlSystem'][_0x21d79f(0x1fa)][_0x21d79f(0x185)][_0x21d79f(0x1bf)],Sprite_Battler[_0x21d79f(0x124)]=VisuMZ[_0x21d79f(0x193)][_0x21d79f(0x1fa)][_0x21d79f(0x185)][_0x21d79f(0x218)],VisuMZ[_0x21d79f(0x193)][_0x21d79f(0x113)]=Sprite_Battler[_0x21d79f(0x1d8)][_0x21d79f(0x143)],Sprite_Battler['prototype'][_0x21d79f(0x143)]=function(_0xb3f95c){const _0x2e3071=_0x21d79f;VisuMZ[_0x2e3071(0x193)]['Sprite_Battler_initialize'][_0x2e3071(0x1bb)](this,_0xb3f95c),this[_0x2e3071(0x139)]()&&setTimeout(this[_0x2e3071(0x1ab)]['bind'](this),0x3e8);},VisuMZ[_0x21d79f(0x193)][_0x21d79f(0x1da)]=Sprite_Battler['prototype'][_0x21d79f(0x17c)],Sprite_Battler[_0x21d79f(0x1d8)][_0x21d79f(0x17c)]=function(){const _0x10462f=_0x21d79f;VisuMZ[_0x10462f(0x193)]['Sprite_Battler_initMembers'][_0x10462f(0x1bb)](this),this[_0x10462f(0x1e8)]();},Sprite_Battler['prototype'][_0x21d79f(0x1e8)]=function(){const _0x4d0d5e=_0x21d79f;this[_0x4d0d5e(0x147)]=VisuMZ[_0x4d0d5e(0x193)][_0x4d0d5e(0x1fa)][_0x4d0d5e(0x185)][_0x4d0d5e(0xf7)],this[_0x4d0d5e(0x16c)]=['physical','magical','certainHit'];},Sprite_Battler[_0x21d79f(0x1d8)][_0x21d79f(0x139)]=function(){const _0x360815=_0x21d79f;if(!Imported[_0x360815(0x121)])return![];if(![Sprite_Actor,Sprite_Enemy][_0x360815(0xec)](this[_0x360815(0x100)]))return![];return ConfigManager[_0x360815(0x160)]&&VisuMZ[_0x360815(0x193)][_0x360815(0x1fa)][_0x360815(0x10a)]['ShowLines'];},Sprite_Battler['prototype'][_0x21d79f(0x1ab)]=function(){const _0x270458=_0x21d79f;if(!SceneManager['isSceneBattle']())return;this[_0x270458(0xe5)]=new Sprite_ProvokeTrail(this),this[_0x270458(0xe5)][_0x270458(0xfa)]()[_0x270458(0x133)](this[_0x270458(0xe5)]);},VisuMZ[_0x21d79f(0x193)][_0x21d79f(0x15b)]=Sprite_Battler[_0x21d79f(0x1d8)][_0x21d79f(0x22f)],Sprite_Battler[_0x21d79f(0x1d8)][_0x21d79f(0x22f)]=function(_0xea3f13){const _0x531f20=_0x21d79f;VisuMZ[_0x531f20(0x193)][_0x531f20(0x15b)][_0x531f20(0x1bb)](this,_0xea3f13);if(this[_0x531f20(0x18e)])this[_0x531f20(0x18e)]['_battler']=_0xea3f13;},VisuMZ[_0x21d79f(0x193)][_0x21d79f(0x225)]=Sprite_Battler['prototype'][_0x21d79f(0xe8)],Sprite_Battler[_0x21d79f(0x1d8)]['update']=function(){const _0x294bdc=_0x21d79f;VisuMZ[_0x294bdc(0x193)][_0x294bdc(0x225)][_0x294bdc(0x1bb)](this),this[_0x294bdc(0x144)]();},Sprite_Battler[_0x21d79f(0x1d8)][_0x21d79f(0x144)]=function(){const _0x25abb4=_0x21d79f;if(!Imported[_0x25abb4(0xbe)])return;if(!Imported[_0x25abb4(0x121)])return;if(!VisuMZ['AggroControlSystem'][_0x25abb4(0x1fa)]['Taunt'][_0x25abb4(0x1b5)])return;if(!this[_0x25abb4(0x172)])return;this['_tauntAnimationTimer']--,this[_0x25abb4(0x147)]<=0x0&&this['startNewTauntAnimation']();},Sprite_Battler[_0x21d79f(0x1d8)]['startNewTauntAnimation']=function(){const _0x16598e=_0x21d79f;this[_0x16598e(0x147)]=Sprite_Battler[_0x16598e(0x1e0)];if(!this[_0x16598e(0x172)])return;if(!this['_battler']['taunting']())return;const _0x104faa=[this[_0x16598e(0x172)]],_0x254dfa=this[_0x16598e(0x1c4)](),_0x3c5265=this[_0x16598e(0x172)][_0x16598e(0x228)]()&&Sprite_Battler[_0x16598e(0x1c8)],_0x31e70f=Sprite_Battler[_0x16598e(0x124)];$gameTemp[_0x16598e(0xe6)](_0x104faa,_0x254dfa,_0x3c5265,_0x31e70f);},Sprite_Battler['prototype'][_0x21d79f(0x1c4)]=function(){const _0x14de81=_0x21d79f;let _0x1ec389=this['_tauntAnimationCycle'][_0x14de81(0x16b)];while(_0x1ec389){const _0x1c46a8=this[_0x14de81(0x16c)][_0x14de81(0x186)]();this['_tauntAnimationCycle'][_0x14de81(0xf4)](_0x1c46a8);const _0x14b880=_0x14de81(0x1f1)['format'](_0x1c46a8);if(this[_0x14de81(0x172)][_0x14b880]()){const _0x2b6202=_0x14de81(0x170)[_0x14de81(0x19c)](_0x1c46a8),_0x539580=Sprite_Battler[_0x2b6202];if(_0x539580)return _0x539580;}_0x1ec389--;}return Sprite_Battler['_certainHitTauntAnimation'];},VisuMZ[_0x21d79f(0x193)]['Sprite_Actor_createStateSprite']=Sprite_Actor['prototype']['createStateSprite'],Sprite_Actor[_0x21d79f(0x1d8)][_0x21d79f(0x123)]=function(){const _0x157552=_0x21d79f;VisuMZ[_0x157552(0x193)][_0x157552(0x21d)][_0x157552(0x1bb)](this),this[_0x157552(0xd4)]();},Sprite_Actor[_0x21d79f(0x1d8)][_0x21d79f(0xd4)]=function(){const _0x4742ac=_0x21d79f;if(this['constructor']!==Sprite_Actor)return;if(!this[_0x4742ac(0xfb)]())return;if(!SceneManager[_0x4742ac(0x12b)]())return;const _0x384078=VisuMZ[_0x4742ac(0x193)]['Settings']['Aggro'],_0x105edf=new Sprite_Gauge();_0x105edf['anchor']['x']=_0x384078[_0x4742ac(0xcc)],_0x105edf[_0x4742ac(0x11e)]['y']=_0x384078[_0x4742ac(0x222)];const _0x490016=Sprite_Gauge[_0x4742ac(0x1d8)][_0x4742ac(0x1d0)]();_0x105edf['scale']['x']=_0x105edf[_0x4742ac(0xd9)]['y']=_0x384078[_0x4742ac(0x1f5)],this[_0x4742ac(0x18e)]=_0x105edf,this[_0x4742ac(0x133)](_0x105edf);},Sprite_Actor[_0x21d79f(0x1d8)][_0x21d79f(0xfb)]=function(){const _0x1c8447=_0x21d79f;if(Imported['VisuMZ_1_BattleCore']&&this[_0x1c8447(0x100)]===Sprite_SvEnemy)return![];return ConfigManager['aggroGauge']&&VisuMZ[_0x1c8447(0x193)][_0x1c8447(0x1fa)][_0x1c8447(0x194)][_0x1c8447(0x173)];},VisuMZ[_0x21d79f(0x193)][_0x21d79f(0x119)]=Sprite_Actor[_0x21d79f(0x1d8)][_0x21d79f(0xe8)],Sprite_Actor[_0x21d79f(0x1d8)][_0x21d79f(0xe8)]=function(){const _0x41fcc4=_0x21d79f;VisuMZ['AggroControlSystem'][_0x41fcc4(0x119)]['call'](this),this[_0x41fcc4(0x161)]();},Sprite_Actor['prototype'][_0x21d79f(0x161)]=function(){const _0x47788f=_0x21d79f;if(!this['_battler'])return;if(!this['_aggroGaugeSprite'])return;const _0x3e56de=VisuMZ['AggroControlSystem'][_0x47788f(0x1fa)][_0x47788f(0x194)],_0x5f5caf=this[_0x47788f(0x18e)];let _0x1da8f5=_0x3e56de[_0x47788f(0xff)];this[_0x47788f(0x172)]['battleUIOffsetX']&&(_0x1da8f5+=this[_0x47788f(0x172)][_0x47788f(0x219)]());let _0x3acab0=_0x3e56de['OffsetY'];this[_0x47788f(0x172)]['battleUIOffsetY']&&(_0x3acab0+=this['_battler'][_0x47788f(0x1e6)]()),_0x5f5caf['x']=_0x1da8f5,_0x5f5caf['y']=-this[_0x47788f(0x11a)]+_0x3acab0,this['_battler']&&_0x5f5caf[_0x47788f(0x18d)]!=='aggro'&&(_0x5f5caf['visible']=!![],_0x5f5caf['setup'](this[_0x47788f(0x172)],_0x47788f(0x20e))),this[_0x47788f(0xd9)]['x']<0x0&&(_0x5f5caf[_0x47788f(0xd9)]['x']=-Math[_0x47788f(0x13c)](_0x5f5caf[_0x47788f(0xd9)]['x']));},Sprite_Gauge[_0x21d79f(0x1d8)]['isAggroType']=function(){const _0x300aba=_0x21d79f;return this[_0x300aba(0x172)]&&this[_0x300aba(0x18d)]==='aggro';},VisuMZ[_0x21d79f(0x193)][_0x21d79f(0x118)]=Sprite_Gauge[_0x21d79f(0x1d8)][_0x21d79f(0x20d)],Sprite_Gauge[_0x21d79f(0x1d8)]['gaugeX']=function(){const _0x4886e4=_0x21d79f;return this[_0x4886e4(0x1f3)]()?0x0:VisuMZ['AggroControlSystem']['Sprite_Gauge_gaugeX']['call'](this);},VisuMZ[_0x21d79f(0x193)][_0x21d79f(0x198)]=Sprite_Gauge['prototype'][_0x21d79f(0x1fb)],Sprite_Gauge[_0x21d79f(0x1d8)][_0x21d79f(0x1fb)]=function(){const _0xcc36f8=_0x21d79f;let _0x4f073a=VisuMZ[_0xcc36f8(0x193)][_0xcc36f8(0x198)][_0xcc36f8(0x1bb)](this);if(this[_0xcc36f8(0x1f3)]()&&this[_0xcc36f8(0x172)]){if(this[_0xcc36f8(0x172)]['isDead']())return 0x0;if(this[_0xcc36f8(0x172)]['isAlive']()&&this['_battler'][_0xcc36f8(0x1f7)]()[_0xcc36f8(0x17a)]()[_0xcc36f8(0x16b)]===0x1)return 0x1;}return _0x4f073a[_0xcc36f8(0x177)](0x0,0x1);},VisuMZ[_0x21d79f(0x193)][_0x21d79f(0x184)]=Sprite_Gauge[_0x21d79f(0x1d8)][_0x21d79f(0x13a)],Sprite_Gauge[_0x21d79f(0x1d8)][_0x21d79f(0x13a)]=function(){const _0x4575cf=_0x21d79f;return this[_0x4575cf(0x1f3)]()?this['currentValueAggroControl']():VisuMZ['AggroControlSystem'][_0x4575cf(0x184)][_0x4575cf(0x1bb)](this);},Sprite_Gauge[_0x21d79f(0x1d8)][_0x21d79f(0x146)]=function(){const _0x1b9ccc=_0x21d79f,_0x14ca42=this[_0x1b9ccc(0x172)][_0x1b9ccc(0x1f7)](),_0x4d0a1a=this[_0x1b9ccc(0x172)][_0x1b9ccc(0x1fc)]-_0x14ca42['tgrMin'](),_0x22d76a=_0x14ca42[_0x1b9ccc(0x20c)]()-_0x14ca42['tgrMin']();if(_0x4d0a1a>=_0x22d76a)return 0x64;return _0x4d0a1a/Math['max'](_0x22d76a,0x1)*0x64;},VisuMZ[_0x21d79f(0x193)][_0x21d79f(0x126)]=Sprite_Gauge['prototype']['currentMaxValue'],Sprite_Gauge[_0x21d79f(0x1d8)][_0x21d79f(0x187)]=function(){const _0xf5ee74=_0x21d79f;return this[_0xf5ee74(0x1f3)]()?this[_0xf5ee74(0x1c2)]():VisuMZ[_0xf5ee74(0x193)][_0xf5ee74(0x126)][_0xf5ee74(0x1bb)](this);},Sprite_Gauge[_0x21d79f(0x1d8)]['currentMaxValueAggroControl']=function(){return 0x64;},VisuMZ[_0x21d79f(0x193)][_0x21d79f(0xc0)]=Sprite_Gauge[_0x21d79f(0x1d8)][_0x21d79f(0x181)],Sprite_Gauge[_0x21d79f(0x1d8)]['gaugeColor1']=function(){const _0x2ca9fb=_0x21d79f;return this[_0x2ca9fb(0x1f3)]()?ColorManager['aggroGaugeColor1']():VisuMZ[_0x2ca9fb(0x193)][_0x2ca9fb(0xc0)][_0x2ca9fb(0x1bb)](this);},VisuMZ[_0x21d79f(0x193)][_0x21d79f(0x1c0)]=Sprite_Gauge['prototype'][_0x21d79f(0x11b)],Sprite_Gauge[_0x21d79f(0x1d8)][_0x21d79f(0x11b)]=function(){const _0x383112=_0x21d79f;return this[_0x383112(0x1f3)]()?ColorManager['aggroGaugeColor2']():VisuMZ['AggroControlSystem']['Sprite_Gauge_gaugeColor2'][_0x383112(0x1bb)](this);},VisuMZ['AggroControlSystem'][_0x21d79f(0x15a)]=Sprite_Gauge['prototype'][_0x21d79f(0xe8)],Sprite_Gauge['prototype'][_0x21d79f(0xe8)]=function(){const _0x3edf57=_0x21d79f;VisuMZ[_0x3edf57(0x193)][_0x3edf57(0x15a)][_0x3edf57(0x1bb)](this),this[_0x3edf57(0x166)]();},Sprite_Gauge[_0x21d79f(0x1d8)][_0x21d79f(0x166)]=function(){const _0x32b6ea=_0x21d79f;if(!this[_0x32b6ea(0x1f3)]())return;if(!Imported[_0x32b6ea(0x121)])return;const _0x558e3b=this['_battler'][_0x32b6ea(0x159)]();if(this['_menuAggroType'])this['opacity']=0xff;else _0x558e3b&&_0x558e3b[_0x32b6ea(0x180)]>0x0?this[_0x32b6ea(0x180)]=0xff:this[_0x32b6ea(0x180)]=0x0;},VisuMZ[_0x21d79f(0x193)][_0x21d79f(0x125)]=Sprite_Gauge[_0x21d79f(0x1d8)]['drawValue'],Sprite_Gauge[_0x21d79f(0x1d8)][_0x21d79f(0x105)]=function(){const _0xfd996b=_0x21d79f;if(this[_0xfd996b(0x1f3)]())return;VisuMZ[_0xfd996b(0x193)][_0xfd996b(0x125)][_0xfd996b(0x1bb)](this);};function Sprite_ProvokeTrail(){const _0x3cbc40=_0x21d79f;this[_0x3cbc40(0x143)](...arguments);}function _0x53f0(){const _0x3bdfef=['ARRAYSTRUCT','reduce','provoke-line-color','addChildAt','invokeCounterAttack','Spriteset_Battle_update','MuteAnimations','battleUIOffsetX','toUpperCase','registerCommand','convertStringToBattleTarget','Sprite_Actor_createStateSprite','JSON','makeData','round','tauntTargetsForAlive','AnchorY','gainAggro','children','Sprite_Battler_update','optDisplayTp','battleLayoutStyle','isActor','_homeX','filter','applyTauntFilters','NUM','magicalTauntMembers','_sprites','setBattler','ARRAYJSON','hitType','HITTYPE_PHYSICAL','isForAnyone','_mainSprite','bypassTaunt','945056hakXQH','aggro-gauge-color-1','EnemySetAggro','_lowestTgrMember','aggroGaugeY','Scene_Options_maxCommands','VisuMZ_0_CoreEngine','updateBattlerPositions','Sprite_Gauge_gaugeColor1','addState','checkCacheKey','createBattleField','boxWidth','Window_Options_addGeneralOptions','convertBattleTargetToString','maxCommands','states','randomTauntTarget','ConvertParams','_colorCache','AnchorX','updateChildrenOpacity','bypassHighestAggro','#%1','_physicalTauntAnimation','STR','_scene','concat','createAggroGauge','physicalTaunt','Game_Battler_onBattleEnd','HITTYPE_MAGICAL','601232sbXyTu','scale','isProvokeAffected','findTgrMember','bind','certainHitTauntMembers','ActorSetAggro','provokeHeightOrigin','canSingleOrMultipleSelect','BattleManager_endBattle','AggroPerHeal','invokeMagicReflection','isAlive','_provokeSprite','requestFauxAnimation','aggroGauge','update','_customModified','enemy','needsSelection','includes','sortEnemies','inputtingAction','PriorityHighest','Spriteset_Battle_createBattleField','createBattleFieldAggroControl','setAggro','OptionName','push','isBypassHighestAggro','_targetIndex','CycleTime','provokeLineColor','subject','parentContainer','isAggroGaugeVisible','taunting','parameters','BattleManager_endAction','OffsetX','constructor','onBattleStart','_regexp','isSideView','PartsSize','drawValue','actorId','aggroGaugeColor1','AniPhysical','OpacitySpeed','Provoke','blendMode','setFrame','isCertainHit','_damageContainer','inBattle','aggroMultiplier','isPhysical','clearTgrCache','Sprite_Battler_initialize','drawAggroGauge','isTauntAffected','battleMembers','EVAL','Sprite_Gauge_gaugeX','Sprite_Actor_update','height','gaugeColor2','log','AddOption','anchor','_provokeBitmap','scope','VisuMZ_1_BattleCore','_battleField','createStateSprite','_muteTauntAnimations','Sprite_Gauge_drawValue','Sprite_Gauge_currentMaxValue','min','applyProvokeEffect','Window_BattleEnemy_refresh','provokeBitmap','isSceneBattle','arcHeight','matchTauntType','Game_Unit_onBattleStart','initAggroControl','alwaysTargetHighestAggro','applyItemUserEffectAggroControl','exit','addChild','getColorDataFromPluginParameters','ShowFacesListStyle','traitObjects','certainHitTaunt','executeHpDamageAggroControl','isShowPriorityLines','currentValue','_checkingAggroTarget','abs','aggroGaugeColor2','_menuAggroType','EnemyChangeAggro','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','name','getTauntMembers','initialize','updateTauntAnimations','EnemyIndex','currentValueAggroControl','_tauntAnimationTimer','_spriteset','members','Parts','isPlaytest','target','boxHeight','status','VisuMZ_3_BattleAI','width','updateAggroControl','maxOpacity','lowestTgrMember','version','refresh','isBypassProvoke','highestTgrMember','applySubjectAggro','battler','Sprite_Gauge_update','Sprite_Battler_setBattler','_subject','itemRect','_opacitySpeed','getSpecificBattlerKeyTarget','provokeOrigin','updateAggroGaugeSprite','isAtbGaugeVisible','aggro-gauge-color-2','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','bitmapHeight','updateOpacityAggroControl','setHandler','tgrMin','endAction','sparam','length','_tauntAnimationCycle','makeProvokeTarget','_aggro','nameY','_%1TauntAnimation','removeState','_battler','VisibleGauge','1230552EQzTCe','aggroGaugeX','leftwardAnimation','clamp','getColor','endBattle','aliveMembers','random','initMembers','BattleStatusOffsetX','clearProvokers','isDead','opacity','gaugeColor1','parse','heightOrigin','Sprite_Gauge_currentValue','Taunt','shift','currentMaxValue','Game_BattlerBase_refresh','user','indexOf','addAggroControlSystemProvokeCommand','_provoker','_statusType','_aggroGaugeSprite','Game_Action_applyItemUserEffect','match','ConfigManager_applyData','Opacity','AggroControlSystem','Aggro','addAggroControlSystemCommands','bitmap','Window_StatusBase_placeActorName','Sprite_Gauge_gaugeRate','FUNC','ConfigManager_makeData','iconWidth','format','pow','_cache','3111750qstXlY','createInnerSprite','some','isNotEnemySelectAction','AdjustOptionsRect','_counterAttackingTarget','Game_Battler_addState','BlendMode','tgrSumFromGroup','BattleManager_invokeCounterAttack','stateHasProvoke','applyData','createProvokeSprite','itemRectWithPadding','battleAggro','index','Game_Action_executeHpDamage','isMagical','BattleManager_invokeMagicReflection','addCommand','isTargetHighestTGR','randomTarget','ShowAnimation','HITTYPE_CERTAIN','BattleCore','_statusWindow','isAggroGaugeShown','removeDeadProvokerStates','call','loseAggro','_homeY','partsSize','MirrorActorAni','Sprite_Gauge_gaugeColor2','physicalTauntMembers','currentMaxValueAggroControl','bypassProvoke','getNextTauntAnimation','Game_BattlerBase_initMembers','ActorChangeAggro','executeHpDamage','_mirrorActorTauntAnimations','applyItemUserEffect','3157408GBrxFN','BattleLayout','1412410DMeObC','targetsForAlive','isTpb','createProvokeHeightOrigin','bitmapWidth','actor','onBattleEnd','applyGlobal','placeActorName','_highestTgrMember','_magicalTauntAnimation','_targetY','prototype','magicalTaunt','Sprite_Battler_initMembers','gaugeHeight','pagedown','create','_enemies','updateOpacity','_animationCycleTime','ActorID','HeightOrigin','_provokeContainer','item','getBattlerKeyTargets','battleUIOffsetY','max','initTauntAnimations','ArcHeight','_targetX','isEnemy','addAggroControlSystemAggroCommand','isBypassTaunt','selectAllActors','placeAggroGauge','Game_Action_targetsForAlive','%1Taunt','Game_Action_applyGlobal','isAggroType','32496NLALNs','Scale','description','friendsUnit','provoker','faceWidth','Settings','gaugeRate','tgr','createChildSprites','clearAggro','GaugeColor2','isAggroAffected','maxSprites','Battle\x20Actor\x20%1','value','randomInt','Game_Action_getSpecificBattlerKeyTarget','AggroPerDmg','Battle\x20Enemy\x20%1','Game_BattlerBase_sparam','nameX','StatusGauge','3773keaXAD','tgrMax','gaugeX','aggro','opponentsUnit','map','note'];_0x53f0=function(){return _0x3bdfef;};return _0x53f0();}Sprite_ProvokeTrail[_0x21d79f(0x1d8)]=Object[_0x21d79f(0x1dd)](Sprite[_0x21d79f(0x1d8)]),Sprite_ProvokeTrail[_0x21d79f(0x1d8)][_0x21d79f(0x100)]=Sprite_ProvokeTrail,Sprite_ProvokeTrail['prototype']['initialize']=function(_0x42fcd6){const _0x135a4a=_0x21d79f;this['_mainSprite']=_0x42fcd6,Sprite[_0x135a4a(0x1d8)][_0x135a4a(0x143)][_0x135a4a(0x1bb)](this),this[_0x135a4a(0x17c)](),this[_0x135a4a(0x1fd)]();},Sprite_ProvokeTrail[_0x21d79f(0x1d8)][_0x21d79f(0x17c)]=function(){const _0x1bae79=_0x21d79f,_0x32368c=VisuMZ[_0x1bae79(0x193)][_0x1bae79(0x1fa)]['Provoke'];this[_0x1bae79(0x11e)]['x']=0.5,this[_0x1bae79(0x11e)]['y']=0.5,this[_0x1bae79(0x229)]=0x0,this[_0x1bae79(0x1bd)]=0x0,this[_0x1bae79(0x1ea)]=0x0,this[_0x1bae79(0x1d7)]=0x0,this['opacity']=0x0,this['_opacitySpeed']=_0x32368c[_0x1bae79(0x109)],this[_0x1bae79(0x10b)]=_0x32368c[_0x1bae79(0x1a6)];},Sprite_ProvokeTrail[_0x21d79f(0x1d8)][_0x21d79f(0x201)]=function(){const _0x3ce3ec=_0x21d79f;return VisuMZ[_0x3ce3ec(0x193)][_0x3ce3ec(0x1fa)][_0x3ce3ec(0x10a)][_0x3ce3ec(0x14a)];},Sprite_ProvokeTrail[_0x21d79f(0x1d8)]['partsSize']=function(){const _0x3f64ab=_0x21d79f;return VisuMZ[_0x3f64ab(0x193)][_0x3f64ab(0x1fa)]['Provoke'][_0x3f64ab(0x104)]/0x64;},Sprite_ProvokeTrail[_0x21d79f(0x1d8)][_0x21d79f(0x1fd)]=function(){const _0x5cdb2d=_0x21d79f;this[_0x5cdb2d(0x22e)]=[];let _0x4aa43c=0x0;for(let _0x45c9aa=0x0;_0x45c9aa<=this[_0x5cdb2d(0x201)]();_0x45c9aa++){const _0x2b89b9=new Sprite();_0x2b89b9[_0x5cdb2d(0x196)]=ImageManager[_0x5cdb2d(0x12a)](),_0x2b89b9[_0x5cdb2d(0x11e)]['x']=0.5,_0x2b89b9[_0x5cdb2d(0x11e)]['y']=0.5,_0x2b89b9[_0x5cdb2d(0xd9)]['x']=_0x2b89b9[_0x5cdb2d(0xd9)]['y']=this[_0x5cdb2d(0x1be)](),_0x2b89b9[_0x5cdb2d(0x180)]=_0x4aa43c,_0x2b89b9[_0x5cdb2d(0x10b)]=this[_0x5cdb2d(0x10b)],this[_0x5cdb2d(0x133)](_0x2b89b9),this['_sprites'][_0x5cdb2d(0xf4)](_0x2b89b9),_0x4aa43c+=this[_0x5cdb2d(0x15e)];if(_0x4aa43c>=0xff)_0x4aa43c=0x0;}},Sprite_ProvokeTrail[_0x21d79f(0x1d8)][_0x21d79f(0x176)]=function(){const _0x2b5ef0=_0x21d79f;return this[_0x2b5ef0(0xb6)][_0x2b5ef0(0x100)]===Sprite_Actor;},Sprite_ProvokeTrail[_0x21d79f(0x1d8)][_0x21d79f(0xfa)]=function(){const _0x4336e0=_0x21d79f;return SceneManager[_0x4336e0(0xd2)][_0x4336e0(0x148)][_0x4336e0(0x1e3)];},Sprite_ProvokeTrail[_0x21d79f(0x1d8)][_0x21d79f(0xe8)]=function(){const _0x2accce=_0x21d79f;Sprite[_0x2accce(0x1d8)]['update']['call'](this),this[_0x2accce(0xbf)](),this['updateSubPositions'](),this[_0x2accce(0x1df)](),this[_0x2accce(0xcd)]();},Sprite_ProvokeTrail[_0x21d79f(0x1d8)][_0x21d79f(0x183)]=function(){const _0x2e0495=_0x21d79f;return VisuMZ[_0x2e0495(0x193)][_0x2e0495(0x1fa)]['Provoke'][_0x2e0495(0x1e2)];},Sprite_ProvokeTrail['prototype']['updateBattlerPositions']=function(){const _0x1c900b=_0x21d79f;if(!this[_0x1c900b(0xb6)][_0x1c900b(0x172)])return;if(!this[_0x1c900b(0xb6)][_0x1c900b(0x172)]['provoker']())return;const _0xb0742c=this[_0x1c900b(0xb6)][_0x1c900b(0x172)]['provoker']()[_0x1c900b(0x159)]();if(!_0xb0742c)return;const _0x4ff637=this['_mainSprite'][_0x1c900b(0x172)][_0x1c900b(0xdf)](),_0x1425b4=this[_0x1c900b(0xb6)]['_battler'][_0x1c900b(0x1f8)]()[_0x1c900b(0xdf)]();this[_0x1c900b(0x229)]=this[_0x1c900b(0xb6)]['x'],this[_0x1c900b(0x1bd)]=this[_0x1c900b(0xb6)]['y']-this[_0x1c900b(0xb6)][_0x1c900b(0x11a)]*_0x4ff637,this['_targetX']=_0xb0742c['x'],this[_0x1c900b(0x1d7)]=_0xb0742c['y']-_0xb0742c[_0x1c900b(0x11a)]*_0x1425b4,this[_0x1c900b(0x229)]+=Math[_0x1c900b(0x220)]((Graphics[_0x1c900b(0x150)]-Graphics[_0x1c900b(0xc4)])/0x2),this[_0x1c900b(0x1bd)]+=Math[_0x1c900b(0x220)]((Graphics[_0x1c900b(0x11a)]-Graphics[_0x1c900b(0x14d)])/0x2),this[_0x1c900b(0x1ea)]+=Math['round']((Graphics[_0x1c900b(0x150)]-Graphics[_0x1c900b(0xc4)])/0x2),this[_0x1c900b(0x1d7)]+=Math[_0x1c900b(0x220)]((Graphics[_0x1c900b(0x11a)]-Graphics[_0x1c900b(0x14d)])/0x2);if(!$gameSystem[_0x1c900b(0x103)]()){if(_0xb0742c[_0x1c900b(0x172)][_0x1c900b(0x228)]())visible=!![],this[_0x1c900b(0x1ea)]+=SceneManager[_0x1c900b(0xd2)][_0x1c900b(0x1b8)]['x'],this['_targetY']+=SceneManager[_0x1c900b(0xd2)][_0x1c900b(0x1b8)]['y'];else _0xb0742c[_0x1c900b(0x172)][_0x1c900b(0x1eb)]()&&(visible=!![],this[_0x1c900b(0x229)]+=SceneManager[_0x1c900b(0xd2)]['_statusWindow']['x'],this[_0x1c900b(0x1bd)]+=SceneManager[_0x1c900b(0xd2)][_0x1c900b(0x1b8)]['y']);}},Sprite_ProvokeTrail[_0x21d79f(0x1d8)]['arcHeight']=function(){const _0x31c8b0=_0x21d79f;return VisuMZ[_0x31c8b0(0x193)][_0x31c8b0(0x1fa)][_0x31c8b0(0x10a)][_0x31c8b0(0x1e9)];},Sprite_ProvokeTrail[_0x21d79f(0x1d8)]['updateSubPositions']=function(){const _0x254aa4=_0x21d79f;if(!this['_mainSprite'][_0x254aa4(0x172)])return;if(!this[_0x254aa4(0xb6)]['_battler'][_0x254aa4(0x1f8)]())return;if(!this[_0x254aa4(0x22e)])return;if(this[_0x254aa4(0x22e)][_0x254aa4(0x16b)]<=0x0)return;const _0x48ebf6=(this[_0x254aa4(0x1ea)]-this['_homeX'])/this[_0x254aa4(0x201)](),_0x3b5013=(this[_0x254aa4(0x1d7)]-this[_0x254aa4(0x1bd)])/this[_0x254aa4(0x201)]();for(let _0x4e39f0=0x0;_0x4e39f0<=this[_0x254aa4(0x201)]();_0x4e39f0++){const _0x4ab8e8=this['_sprites'][_0x4e39f0];if(!_0x4ab8e8)continue;_0x4ab8e8['x']=this[_0x254aa4(0x229)]+_0x48ebf6*_0x4e39f0;const _0x1f7bd2=this[_0x254aa4(0x201)]()-_0x4e39f0,_0x18e55e=this[_0x254aa4(0x201)]()/0x2,_0x5b53d5=this[_0x254aa4(0x12c)](),_0x51cfa1=-_0x5b53d5/Math['pow'](_0x18e55e,0x2),_0xf7350b=_0x51cfa1*Math[_0x254aa4(0x19d)](_0x1f7bd2-_0x18e55e,0x2)+_0x5b53d5;_0x4ab8e8['y']=this[_0x254aa4(0x1bd)]+_0x3b5013*_0x4e39f0-_0xf7350b;}},Sprite_ProvokeTrail['prototype'][_0x21d79f(0x152)]=function(){const _0xf9077=_0x21d79f;return VisuMZ['AggroControlSystem']['Settings'][_0xf9077(0x10a)][_0xf9077(0x192)];},Sprite_ProvokeTrail[_0x21d79f(0x1d8)][_0x21d79f(0x1df)]=function(){const _0x9f2822=_0x21d79f,_0x4e2490=this[_0x9f2822(0xb6)][_0x9f2822(0x172)];if(!_0x4e2490)this[_0x9f2822(0x180)]=0x0;else _0x4e2490[_0x9f2822(0xe4)]()&&_0x4e2490[_0x9f2822(0x1f8)]()?this[_0x9f2822(0x180)]=0xff:this[_0x9f2822(0x180)]=0x0;},Sprite_ProvokeTrail['prototype'][_0x21d79f(0xcd)]=function(){const _0x167690=_0x21d79f;if(!this[_0x167690(0xb6)]['_battler'])return;if(!this[_0x167690(0xb6)]['_battler']['provoker']())return;if(!this['_sprites'])return;if(this[_0x167690(0x22e)]['length']<=0x0)return;for(let _0x3bbdf4=0x0;_0x3bbdf4<=this['maxSprites']();_0x3bbdf4++){const _0x44565b=this[_0x167690(0x22e)][this[_0x167690(0x176)]()?this[_0x167690(0x201)]()-_0x3bbdf4:_0x3bbdf4];if(!_0x44565b)continue;_0x44565b[_0x167690(0x180)]-=this[_0x167690(0x15e)];if(_0x44565b[_0x167690(0x180)]<=0x0)_0x44565b[_0x167690(0x180)]=0xff;}},VisuMZ[_0x21d79f(0x193)][_0x21d79f(0xf0)]=Spriteset_Battle[_0x21d79f(0x1d8)]['createBattleField'],Spriteset_Battle[_0x21d79f(0x1d8)][_0x21d79f(0xc3)]=function(){const _0x5008b3=_0x21d79f;VisuMZ[_0x5008b3(0x193)][_0x5008b3(0xf0)][_0x5008b3(0x1bb)](this),this['createBattleFieldAggroControl']();},Spriteset_Battle['prototype'][_0x21d79f(0xf1)]=function(){const _0x478b50=_0x21d79f;if(!Imported[_0x478b50(0x121)])return;const _0x647935=this['_battleField']['x'],_0x3de4f4=this[_0x478b50(0x122)]['y'],_0x82c0e5=this[_0x478b50(0x122)][_0x478b50(0x150)],_0x457fe6=this[_0x478b50(0x122)][_0x478b50(0x11a)];this[_0x478b50(0x1e3)]=new Sprite(),this[_0x478b50(0x1e3)][_0x478b50(0x10c)](0x0,0x0,_0x82c0e5,_0x457fe6),this['_provokeContainer']['x']=_0x647935,this[_0x478b50(0x1e3)]['y']=_0x3de4f4;if(Imported['VisuMZ_1_BattleCore']){const _0x32d0c8=this[_0x478b50(0x224)][_0x478b50(0x18a)](this[_0x478b50(0x10e)]);this[_0x478b50(0x215)](this['_provokeContainer'],_0x32d0c8);}else this[_0x478b50(0x133)](this[_0x478b50(0x1e3)]);},VisuMZ['AggroControlSystem'][_0x21d79f(0x217)]=Spriteset_Battle[_0x21d79f(0x1d8)]['update'],Spriteset_Battle[_0x21d79f(0x1d8)][_0x21d79f(0xe8)]=function(){const _0x37ec40=_0x21d79f;VisuMZ[_0x37ec40(0x193)][_0x37ec40(0x217)][_0x37ec40(0x1bb)](this),this['updateAggroControl']();},Spriteset_Battle[_0x21d79f(0x1d8)][_0x21d79f(0x151)]=function(){const _0x35484c=_0x21d79f;if(!this[_0x35484c(0x1e3)])return;if(!this[_0x35484c(0x10e)])return;this[_0x35484c(0x1e3)]['x']=this[_0x35484c(0x10e)]['x'],this[_0x35484c(0x1e3)]['y']=this[_0x35484c(0x10e)]['y'];},VisuMZ[_0x21d79f(0x193)][_0x21d79f(0x129)]=Window_BattleEnemy['prototype'][_0x21d79f(0x155)],Window_BattleEnemy[_0x21d79f(0x1d8)][_0x21d79f(0x155)]=function(){const _0x3b6aa0=_0x21d79f;if(this['applyProvokeFilters']())Imported[_0x3b6aa0(0x121)]&&this[_0x3b6aa0(0xed)](),Window_Selectable['prototype']['refresh'][_0x3b6aa0(0x1bb)](this);else this[_0x3b6aa0(0x22b)]()?(Imported['VisuMZ_1_BattleCore']&&this[_0x3b6aa0(0xed)](),Window_Selectable[_0x3b6aa0(0x1d8)][_0x3b6aa0(0x155)][_0x3b6aa0(0x1bb)](this)):VisuMZ['AggroControlSystem']['Window_BattleEnemy_refresh'][_0x3b6aa0(0x1bb)](this);},Window_BattleEnemy[_0x21d79f(0x1d8)]['applyProvokeFilters']=function(){const _0x563551=_0x21d79f,_0x505347=BattleManager[_0x563551(0xee)](),_0x23030f=BattleManager['actor']();if(!_0x505347)return![];if(!_0x23030f)return![];if(DataManager[_0x563551(0x156)](_0x505347[_0x563551(0x1e4)]()))return![];if(_0x23030f[_0x563551(0x1c3)]())return![];if(!_0x505347['isProvokeAffected']())return![];if(_0x23030f[_0x563551(0xda)]()){this[_0x563551(0x1de)]=[_0x23030f[_0x563551(0x1f8)]()];if(_0x505347['isForAnyone']&&_0x505347[_0x563551(0xb5)]()){const _0x2af1c1=$gameParty[_0x563551(0x17a)]();this[_0x563551(0x1de)]=this[_0x563551(0x1de)][_0x563551(0xd3)](_0x2af1c1),_0x505347[_0x563551(0xe0)]&&_0x505347[_0x563551(0xe0)]()&&_0x2af1c1[_0x563551(0x16b)]>0x1&&this[_0x563551(0x167)](_0x563551(0x1dc),this[_0x563551(0x1ee)][_0x563551(0xdc)](this));}return!![];}else return![];},Window_BattleEnemy[_0x21d79f(0x1d8)][_0x21d79f(0x22b)]=function(){const _0xf27d3d=_0x21d79f,_0x4c923b=BattleManager['inputtingAction'](),_0x4d708e=BattleManager[_0xf27d3d(0x1d1)](),_0x559bc5=$gameTroop;if(!_0x4c923b)return![];if(!_0x4d708e)return![];if(!_0x4c923b['item']())return![];if(DataManager[_0xf27d3d(0x1ed)](_0x4c923b[_0xf27d3d(0x1e4)]()))return![];if(_0x4d708e['bypassTaunt']())return![];if(!_0x4c923b[_0xf27d3d(0x115)]())return![];if(_0x4c923b['isPhysical']()&&_0x559bc5['physicalTauntMembers']()[_0xf27d3d(0x16b)]>0x0)this[_0xf27d3d(0x1de)]=_0x559bc5[_0xf27d3d(0x1c1)]();else{if(_0x4c923b[_0xf27d3d(0x1b0)]()&&_0x559bc5[_0xf27d3d(0x22d)]()[_0xf27d3d(0x16b)]>0x0)this[_0xf27d3d(0x1de)]=_0x559bc5['magicalTauntMembers']();else{if(_0x4c923b['isCertainHit']()&&_0x559bc5[_0xf27d3d(0xdd)]()['length']>0x0)this['_enemies']=_0x559bc5['certainHitTauntMembers']();else return![];}}if(_0x4c923b[_0xf27d3d(0xb5)]&&_0x4c923b[_0xf27d3d(0xb5)]()){const _0x3b3847=$gameParty[_0xf27d3d(0x17a)]();this[_0xf27d3d(0x1de)]=this[_0xf27d3d(0x1de)][_0xf27d3d(0xd3)](_0x3b3847),_0x4c923b[_0xf27d3d(0xe0)]&&_0x4c923b[_0xf27d3d(0xe0)]()&&_0x3b3847[_0xf27d3d(0x16b)]>0x1&&this['setHandler'](_0xf27d3d(0x1dc),this[_0xf27d3d(0x1ee)][_0xf27d3d(0xdc)](this));}return!![];},VisuMZ[_0x21d79f(0x193)][_0x21d79f(0xc5)]=Window_Options[_0x21d79f(0x1d8)]['addGeneralOptions'],Window_Options[_0x21d79f(0x1d8)]['addGeneralOptions']=function(){const _0x2d83f3=_0x21d79f;VisuMZ[_0x2d83f3(0x193)][_0x2d83f3(0xc5)][_0x2d83f3(0x1bb)](this),this[_0x2d83f3(0x195)]();},Window_Options[_0x21d79f(0x1d8)]['addAggroControlSystemCommands']=function(){const _0x33fc3b=_0x21d79f;VisuMZ[_0x33fc3b(0x193)][_0x33fc3b(0x1fa)]['Provoke'][_0x33fc3b(0x11d)]&&this[_0x33fc3b(0x18b)](),VisuMZ[_0x33fc3b(0x193)][_0x33fc3b(0x1fa)][_0x33fc3b(0x194)]['AddOption']&&this[_0x33fc3b(0x1ec)]();},Window_Options[_0x21d79f(0x1d8)][_0x21d79f(0x18b)]=function(){const _0xcae640=_0x21d79f,_0x5f1c9a=TextManager['provokeOrigin'],_0x119ef6='provokeOrigin';this[_0xcae640(0x1b2)](_0x5f1c9a,_0x119ef6);},Window_Options[_0x21d79f(0x1d8)]['addAggroControlSystemAggroCommand']=function(){const _0x35dc2e=_0x21d79f,_0x24a949=TextManager[_0x35dc2e(0xe7)],_0x592d3c='aggroGauge';this[_0x35dc2e(0x1b2)](_0x24a949,_0x592d3c);},VisuMZ[_0x21d79f(0x193)][_0x21d79f(0x197)]=Window_StatusBase[_0x21d79f(0x1d8)][_0x21d79f(0x1d4)],Window_StatusBase['prototype'][_0x21d79f(0x1d4)]=function(_0x5c7527,_0x1ab207,_0x53af4d){const _0x43c18d=_0x21d79f;if(this[_0x43c18d(0x1b9)]())this[_0x43c18d(0x114)](_0x5c7527[_0x43c18d(0x1ae)]());VisuMZ['AggroControlSystem'][_0x43c18d(0x197)][_0x43c18d(0x1bb)](this,_0x5c7527,_0x1ab207,_0x53af4d);},Window_StatusBase[_0x21d79f(0x1d8)][_0x21d79f(0x1b9)]=function(){const _0x213580=_0x21d79f;if(![Window_BattleActor,Window_BattleStatus][_0x213580(0xec)](this['constructor']))return![];if(!SceneManager[_0x213580(0x12b)]())return![];return ConfigManager['aggroGauge']&&VisuMZ[_0x213580(0x193)][_0x213580(0x1fa)][_0x213580(0x194)][_0x213580(0x20a)];},Window_StatusBase[_0x21d79f(0x1d8)][_0x21d79f(0x1ef)]=function(_0x27aafb,_0x1c83d0,_0x8888aa){const _0x48ac68=_0x21d79f;this['placeGauge'](_0x27aafb,_0x48ac68(0x20e),_0x1c83d0,_0x8888aa);},Window_BattleStatus[_0x21d79f(0x1d8)][_0x21d79f(0x114)]=function(_0x24d0fd){const _0x8d6960=_0x21d79f,_0xcedb4e=this[_0x8d6960(0x1d1)](_0x24d0fd),_0x22c76d=this[_0x8d6960(0x175)](_0x24d0fd),_0x58a74d=this[_0x8d6960(0xbc)](_0x24d0fd),_0x4cedc6='actor%1-gauge-aggro'[_0x8d6960(0x19c)](_0xcedb4e[_0x8d6960(0x106)]()),_0x495963=this[_0x8d6960(0x1a0)](_0x4cedc6,Sprite_Gauge),_0x5059bd=VisuMZ['AggroControlSystem']['Settings'][_0x8d6960(0x194)];_0x495963['x']=_0x22c76d+(_0x5059bd[_0x8d6960(0x17d)]||0x0),_0x495963['y']=_0x58a74d+(_0x5059bd['BattleStatusOffsetY']||0x0),_0x495963[_0x8d6960(0x13e)]=!![],_0x495963['setup'](_0xcedb4e,_0x8d6960(0x20e)),_0x495963['visible']=!![];},Window_BattleStatus[_0x21d79f(0x1d8)]['aggroGaugeX']=function(_0x26ed0b){const _0x518672=_0x21d79f;let _0x34835f=this[_0x518672(0x1ac)](_0x26ed0b),_0xb916a4=this[_0x518672(0x209)](_0x34835f);if(Imported['VisuMZ_1_BattleCore']){let _0x238c69=this[_0x518672(0x15d)](_0x26ed0b);if(this[_0x518672(0x227)]()==='list'){const _0x48fc33=$dataSystem[_0x518672(0x226)]?0x4:0x3,_0xe6b57=_0x48fc33*0x80+(_0x48fc33-0x1)*0x8+0x4,_0x34e51d=this[_0x518672(0x1d1)](_0x26ed0b);let _0x2b9f73=_0x238c69['x']+this['padding'];VisuMZ[_0x518672(0x1b7)][_0x518672(0x1fa)][_0x518672(0x1cb)][_0x518672(0x135)]?_0x2b9f73=_0x238c69['x']+ImageManager[_0x518672(0x1f9)]+0x8:_0x2b9f73+=ImageManager[_0x518672(0x19b)],_0xb916a4=Math[_0x518672(0x220)](Math['min'](_0x238c69['x']+_0x238c69[_0x518672(0x150)]-_0xe6b57,_0x2b9f73)),_0xb916a4-=0x4;}else _0xb916a4=Math[_0x518672(0x220)](_0x238c69['x']+(_0x238c69[_0x518672(0x150)]-0x80)/0x2);}return _0xb916a4;},Window_BattleStatus[_0x21d79f(0x1d8)]['aggroGaugeY']=function(_0xa9bfda){const _0x3ab455=_0x21d79f,_0x4ece9d=this[_0x3ab455(0x15d)](_0xa9bfda);let _0x595768=this[_0x3ab455(0x16f)](_0x4ece9d);if(Imported['VisuMZ_1_BattleCore']){if(this[_0x3ab455(0x227)]()==='list'){let _0xfd8380=this['itemRect'](_0xa9bfda);_0x595768=Math['round'](_0xfd8380['y']+(_0xfd8380[_0x3ab455(0x11a)]-Sprite_Name[_0x3ab455(0x1d8)][_0x3ab455(0x165)]())/0x2);}}if(this[_0x3ab455(0x162)]())_0x595768-=Sprite_Gauge[_0x3ab455(0x1d8)][_0x3ab455(0x1db)]()-0x1;return _0x595768;},Window_BattleStatus['prototype'][_0x21d79f(0x162)]=function(){const _0x5e8ff3=_0x21d79f;if(!BattleManager[_0x5e8ff3(0x1ce)]())return![];if(Imported['VisuMZ_2_BattleSystemATB'])return this['showVisualAtbGauge']('time');return!![];};