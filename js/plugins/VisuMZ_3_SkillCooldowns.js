//=============================================================================
// VisuStella MZ - Skill Cooldowns
// VisuMZ_3_SkillCooldowns.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_SkillCooldowns = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillCooldowns = VisuMZ.SkillCooldowns || {};
VisuMZ.SkillCooldowns.version = 1.08;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.08] [SkillCooldowns]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skill_Cooldowns_VisuStella_MZ
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Skill Cooldowns are a mechanic added by the game to prevent repeated skill
 * usage (or as some gamers call it, skill spamming). Upon usage in battle, a
 * skill with a cooldown will become unselectable for a duration of time set by
 * either notetags and/or Plugin Commands. This duration would have to pass in
 * order for the skill to become usable once again.
 *
 * Skill Warmups are another addition by this plugin. Skills with warmups will
 * start the battle unusable until a certain duration has passed. This can help
 * prevent strong skills from being used from the very start of battle.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Add cooldowns and warmups to skills.
 * * Control the way they're displayed in game through the Plugin Parameters.
 * * Create trait object effects that alter the finalized values of cooldowns
 *   and warmups applied to skills.
 * * Create action effects that alter the existing durations of cooldowns and
 *   warmups applied to skills.
 * * Create cooldowns for skills that are linked to other skills, skill types,
 *   and/or affect all skills globally.
 * * Plugin Commands that let you alter cooldowns and warmups as you like.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * - VisuMZ_1_SkillsStatesCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * New Mechanics: Cooldowns and Warmups
 * ============================================================================
 *
 * This section will explain the key points behind cooldowns and warmups.
 *
 * ---
 *
 * Cooldowns:
 *
 * - At the start and end of battle, any and all cooldowns are cleared.
 * - Cooldowns are applied upon usage only during battle.
 * - Upon usage, skills can affect the cooldowns of an entire skill type or all
 *   of a unit's skills at once.
 *
 * ---
 *
 * Warmups:
 *
 * - Upon the start of battle, Warmups will be applied to affected skills.
 * - Upon the end of battle, any and all warmups are cleared.
 * - If the unit in battle has an advantageous start (ie. preemptive strike),
 *   then the warmup duration can be reduced. This value can be changed in the
 *   plugin parameters.
 *
 * ---
 * 
 * Both Cooldowns and Warmups:
 *
 * - While a skill is on CD/WU, it cannot be used.
 * - CD/WU are updated once per turn for each unit.
 * - CD/WU cannot be applied to Attack and Guard skills.
 * - CD/WU cannot be applied to skills with the <Bypass CD/WU> notetag.
 * - CD/WU can be affected by notetag traits found in various database objects.
 * - CD/WU can be altered by skills and items with notetag effects.
 * - CD/WU have a maximum duration that can be set in the Plugin Parameters.
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
 * === Skill-Only Notetags ===
 *
 * The following notetags are used for skills and are related to setting the
 * primary uses of Cooldowns and Warmups.
 *
 * ---
 *
 * <Bypass Cooldowns>
 * <Bypass Warmups>
 *
 * - Used for: Skill Notetags
 * - Lets the skill bypass cooldowns and/or warmups.
 *
 * ---
 *
 * <Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will gain a cooldown upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 *
 * ---
 *
 * <Skill id Cooldown: x>
 * <Skill name Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will cause listed skills to gain a cooldown upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Stype id Cooldown: x>
 * <Stype name Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will cause all skills with the skill type to gain a cooldown
 *   upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Global Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will cause all skills to gain a cooldown upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 *
 * ---
 *
 * <Warmup: x>
 *
 * - Used for: Skill Notetags
 * - The skill will gain a warmup upon the start of battle.
 * - Replace 'x' with the number of turns to set the warmup to.
 *
 * ---
 * 
 * <Once Per Turn>
 * 
 * - Used for: Skill Notetags
 * - Makes the skill only usable once per turn.
 *   - Cannot be used in TPB, ATB, or CTB.
 *   - Does not apply outside of battle.
 * - The skill cannot be used while the character's turn count is the same
 *   number as the skill's last used turn count.
 * - Best used with actors/enemies that perform multiple actions per turn.
 * 
 * ---
 *
 * === JavaScript Notetags: Skill-Only ===
 *
 * The following are notetags made for users with JavaScript knowledge to give
 * skills dynamic cooldown or warmup durations.
 *
 * ---
 *
 * <JS Cooldown>
 *  code
 *  code
 *  turns = code
 * </JS Cooldown>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code used to determine the base cooldown
 *   for this skill.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized cooldown value.
 *
 * ---
 * 
 * <JS On Cooldown Update>
 *  code
 *  code
 *  code
 * </JS On Cooldown Update>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's cooldown updates.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized cooldown value.
 * 
 * ---
 * 
 * <JS On Cooldown Ready>
 *  code
 *  code
 *  code
 * </JS On Cooldown Ready>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's cooldown hits 0 and becomes ready.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * 
 * ---
 *
 * <JS Warmup>
 *  code
 *  code
 *  turns = code
 * </JS Warmup>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code used to determine the base warmup
 *   for this skill.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized warmup value.
 *
 * ---
 * 
 * <JS On Warmup Update>
 *  code
 *  code
 *  code
 * </JS On Warmup Update>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's warmup updates.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized warmup value.
 * 
 * ---
 * 
 * <JS On Warmup Ready>
 *  code
 *  code
 *  code
 * </JS On Warmup Ready>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's warmup hits 0 and becomes ready.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * 
 * ---
 *
 * === Cooldown/Warmup Notetag Traits ===
 *
 * These Notetag Traits help modify the finalized value of a cooldown/warmup.
 * The final cooldown/warmup duration is calculated by the following formula:
 * 
 * (base + plus) * rate + flat
 *
 * The base value is the amount calculated through the <Cooldown: x> and
 * <Warmup: x> notetags found in the section above.
 *
 * ---
 *
 * <Skill id Cooldown Plus: +x>
 * <Skill id Cooldown Plus: -x>
 *
 * <Skill name Cooldown Plus: +x>
 * <Skill name Cooldown Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Cooldown Rate: x%>
 * <Skill id Cooldown Rate: x.x>
 *
 * <Skill name Cooldown Rate: x%>
 * <Skill name Cooldown Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards this specific skill.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Cooldown Flat: +x>
 * <Skill id Cooldown Flat: -x>
 *
 * <Skill name Cooldown Flat: +x>
 * <Skill name Cooldown Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Stype id Cooldown Plus: +x>
 * <Stype id Cooldown Plus: -x>
 *
 * <Stype name Cooldown Plus: +x>
 * <Stype name Cooldown Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Cooldown Rate: x%>
 * <Stype id Cooldown Rate: x.x>
 *
 * <Stype name Cooldown Rate: x%>
 * <Stype name Cooldown Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards skills with this skill type.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Cooldown Flat: +x>
 * <Stype id Cooldown Flat: -x>
 *
 * <Stype name Cooldown Flat: +x>
 * <Stype name Cooldown Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Global Cooldown Plus: +x>
 * <Global Cooldown Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * <Global Cooldown Rate: x%>
 * <Global Cooldown Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards all skills.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 *
 * ---
 *
 * <Global Cooldown Flat: +x>
 * <Global Cooldown Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * <Skill id Warmup Plus: +x>
 * <Skill id Warmup Plus: -x>
 *
 * <Skill name Warmup Plus: +x>
 * <Skill name Warmup Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Warmup Rate: x%>
 * <Skill id Warmup Rate: x.x>
 *
 * <Skill name Warmup Rate: x%>
 * <Skill name Warmup Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards this specific skill.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Warmup Flat: +x>
 * <Skill id Warmup Flat: -x>
 *
 * <Skill name Warmup Flat: +x>
 * <Skill name Warmup Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Stype id Warmup Plus: +x>
 * <Stype id Warmup Plus: -x>
 *
 * <Stype name Warmup Plus: +x>
 * <Stype name Warmup Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Warmup Rate: x%>
 * <Stype id Warmup Rate: x.x>
 *
 * <Stype name Warmup Rate: x%>
 * <Stype name Warmup Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards skills with this skill type.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Warmup Flat: +x>
 * <Stype id Warmup Flat: -x>
 *
 * <Stype name Warmup Flat: +x>
 * <Stype name Warmup Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Global Warmup Plus: +x>
 * <Global Warmup Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * <Global Warmup Rate: x%>
 * <Global Warmup Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards all skills.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 *
 * ---
 *
 * <Global Warmup Flat: +x>
 * <Global Warmup Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * === Cooldown/Warmup Notetag Actions ===
 *
 * The following notetags are actively altering effects that target cooldowns
 * and/or warmups. Cooldown effects may be applied at any moment through these
 * while warmup effects will only affect skills on warmup currently.
 *
 * ---
 *
 * <Clear User Cooldowns>
 * <Clear Target Cooldowns>
 *
 * - Used for: Skill, Item Notetags
 * - Clears all cooldowns for the user/target.
 *
 * ---
 *
 * <Clear User Warmups>
 * <Clear Target Warmups>
 *
 * - Used for: Skill, Item Notetags
 * - Clears all warmups for the user/target.
 *
 * ---
 *
 * <User Skill id Cooldown: +x>
 * <User Skill id Cooldown: -x>
 *
 * <User Skill name Cooldown: +x>
 * <User Skill name Cooldown: -x>
 *
 * <Target Skill id Cooldown: +x>
 * <Target Skill id Cooldown: -x>
 *
 * <Target Skill name Cooldown: +x>
 * <Target Skill name Cooldown: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's cooldown duration for this specific skill.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <User Stype id Cooldown: +x>
 * <User Stype id Cooldown: -x>
 *
 * <User Stype name Cooldown: +x>
 * <User Stype name Cooldown: -x>
 *
 * <Target Stype id Cooldown: +x>
 * <Target Stype id Cooldown: -x>
 *
 * <Target Stype name Cooldown: +x>
 * <Target Stype name Cooldown: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's cooldown duration for all skills with this type.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <User Global Cooldown: +x>
 * <User Global Cooldown: -x>
 *
 * <Target Global Cooldown: +x>
 * <Target Global Cooldown: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's cooldown duration for all skills.
 * - Replace 'x' with the amount to change the duration by.
 *
 * ---
 *
 * <User Skill id Warmup: +x>
 * <User Skill id Warmup: -x>
 *
 * <User Skill name Warmup: +x>
 * <User Skill name Warmup: -x>
 *
 * <Target Skill id Warmup: +x>
 * <Target Skill id Warmup: -x>
 *
 * <Target Skill name Warmup: +x>
 * <Target Skill name Warmup: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's warmup duration for this specific skill.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 * - NOTE: Warmup changes only apply to skills that are still in warmup.
 *
 * ---
 *
 * <User Stype id Warmup: +x>
 * <User Stype id Warmup: -x>
 *
 * <User Stype name Warmup: +x>
 * <User Stype name Warmup: -x>
 *
 * <Target Stype id Warmup: +x>
 * <Target Stype id Warmup: -x>
 *
 * <Target Stype name Warmup: +x>
 * <Target Stype name Warmup: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's warmup duration for all skills with this type.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 * - NOTE: Warmup changes only apply to skills that are still in warmup.
 *
 * ---
 *
 * <User Global Warmup: +x>
 * <User Global Warmup: -x>
 *
 * <Target Global Warmup: +x>
 * <Target Global Warmup: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's warmup duration for all skills.
 * - Replace 'x' with the amount to change the duration by.
 * - NOTE: Warmup changes only apply to skills that are still in warmup.
 *
 * ---
 *
 * ============================================================================
 * Script Calls
 * ============================================================================
 *
 * The following are Script Calls that can be used with this plugin. These are
 * made for JavaScript proficient users. We are not responsible if you use them
 * incorrectly or for unintended usage.
 *
 * ---
 * 
 * === Actor-Related Script Calls ===
 * 
 * ---
 *
 * $actorGetSkillCooldown(actorID, skillID)
 * 
 * - Gets the target actor's cooldown turns for a specific skill.
 * - Replace 'actorID' with a number representing the ID of the target actor.
 * - Replace 'skillID' with a number representing the ID of the target skill.
 * - This will return a number value.
 * 
 *   Example: 
 * 
 *   $actorGetSkillCooldown(1, 172)
 *   $actorGetSkillCooldown(7, 52)
 *
 * ---
 *
 * $actorSetSkillCooldown(actorID, skillID, turns)
 * 
 * - Sets the target actor's cooldown turns for a specific skill to a value.
 * - Replace 'actorID' with a number representing the ID of the target actor.
 * - Replace 'skillID' with a number representing the ID of the target skill.
 * - Replace 'turns' with a number representing the number of turns to set the
 *   target skill's cooldown to.
 * 
 *   Example:
 * 
 *   $actorSetSkillCooldown(1, 172, 5)
 *   $actorSetSkillCooldown(7, 52, 10)
 *
 * ---
 *
 * $actorGetSkillWarmup(actorID, skillID)
 * 
 * - Gets the target actor's warmup turns for a specific skill.
 * - Replace 'actorID' with a number representing the ID of the target actor.
 * - Replace 'skillID' with a number representing the ID of the target skill.
 * - This will return a number value.
 * 
 *   Example: 
 * 
 *   $actorGetSkillWarmup(1, 172)
 *   $actorGetSkillWarmup(7, 52)
 *
 * ---
 *
 * $actorSetSkillWarmup(actorID, skillID, turns)
 * 
 * - Sets the target actor's warmup turns for a specific skill to a value.
 * - Replace 'actorID' with a number representing the ID of the target actor.
 * - Replace 'skillID' with a number representing the ID of the target skill.
 * - Replace 'turns' warmup a number representing the number of turns to set
 *   the target skill's warmup to.
 * 
 *   Example:
 * 
 *   $actorSetSkillWarmup(1, 172, 5)
 *   $actorSetSkillWarmup(7, 52, 10)
 *
 * ---
 * 
 * === Enemy-Related Script Calls ===
 * 
 * ---
 *
 * $enemyGetSkillCooldown(enemyIndex, skillID)
 * 
 * - Gets the target enemy's cooldown turns for a specific skill.
 * - Replace 'enemyIndex' with a number representing the index position of the
 *   target enemy within its troop. Index values start at 0 and go up to 7.
 * - Replace 'skillID' with a number representing the ID of the target skill.
 * - This will return a number value.
 * 
 *   Example: 
 * 
 *   $enemyGetSkillCooldown(0, 172)
 *   $enemyGetSkillCooldown(7, 52)
 *
 * ---
 *
 * $enemySetSkillCooldown(enemyIndex, skillID, turns)
 * 
 * - Sets the target enemy's cooldown turns for a specific skill to a value.
 * - Replace 'enemyIndex' with a number representing the index position of the
 *   target enemy within its troop. Index values start at 0 and go up to 7.
 * - Replace 'skillID' with a number representing the ID of the target skill.
 * - Replace 'turns' with a number representing the number of turns to set the
 *   target skill's cooldown to.
 * 
 *   Example:
 * 
 *   $enemySetSkillCooldown(0, 172, 5)
 *   $enemySetSkillCooldown(7, 52, 10)
 *
 * ---
 *
 * $enemyGetSkillWarmup(enemyIndex, skillID)
 * 
 * - Gets the target enemy's warmup turns for a specific skill.
 * - Replace 'enemyIndex' with a number representing the index position of the
 *   target enemy within its troop. Index values start at 0 and go up to 7.
 * - Replace 'skillID' with a number representing the ID of the target skill.
 * - This will return a number value.
 * 
 *   Example: 
 * 
 *   $enemyGetSkillWarmup(0, 172)
 *   $enemyGetSkillWarmup(7, 52)
 *
 * ---
 *
 * $enemySetSkillWarmup(enemyIndex, skillID, turns)
 * 
 * - Sets the target enemy's warmup turns for a specific skill to a value.
 * - Replace 'enemyIndex' with a number representing the index position of the
 *   target enemy within its troop. Index values start at 0 and go up to 7.
 * - Replace 'skillID' with a number representing the ID of the target skill.
 * - Replace 'turns' warmup a number representing the number of turns to set
 *   the target skill's warmup to.
 * 
 *   Example:
 * 
 *   $enemySetSkillWarmup(0, 172, 5)
 *   $enemySetSkillWarmup(7, 52, 10)
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
 * Actor: Skill Cooldown
 * - Change cooldowns for a specific skill(s).
 *
 *   Step 1: Actor ID(s):
 *   - Select which Actor Target ID(s) to affect.
 *
 *   Step 2: Skill ID(s):
 *   - Select which Skill ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Actor: SType Cooldown
 * - Change cooldowns for all skills of a skill type(s).
 *
 *   Step 1: Actor ID(s):
 *   - Select which Actor Target ID(s) to affect.
 *
 *   Step 2: Skill Type ID(s):
 *   - Select which Skill Type ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Actor: Global Cooldown
 * - Change cooldowns for all skills for target(s).
 *
 *   Step 1: Actor ID(s):
 *   - Select which Actor Target ID(s) to affect.
 *
 *   Step 2: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 3: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Skill Cooldown
 * - Change cooldowns for a specific skill(s).
 *
 *   Step 1: Enemy Index(es):
 *   - Select which Enemy Index(es) to affect.
 *
 *   Step 2: Skill ID(s):
 *   - Select which Skill ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Enemy: SType Cooldown
 * - Change cooldowns for all skills of a skill type(s).
 *
 *   Step 1: Enemy Index(es):
 *   - Select which Enemy Index(es) to affect.
 *
 *   Step 2: Skill Type ID(s):
 *   - Select which Skill Type ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Enemy: Global Cooldown
 * - Change cooldowns for all skills for target(s).
 *
 *   Step 1: Enemy Index(es):
 *   - Select which Enemy Index(es) to affect.
 *
 *   Step 2: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 3: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Cooldown Settings
 * ============================================================================
 *
 * These are the general settings pertaining to cooldowns in-game.
 *
 * ---
 *
 * Settings
 * 
 *   Icon:
 *   - Icon used for Skill Cooldowns.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display Skill Cooldowns.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display Skill Cooldowns.
 *
 * ---
 *
 * Window Display
 * 
 *   Show Cooldowns?:
 *   - Display Skill Cooldowns?
 * 
 *   Text Format:
 *   - Text format for displaying Skill Cooldowns.
 *   - %1 - Turns, %2 - Icon
 *
 * ---
 *
 * Mechanics
 * 
 *   Max Cooldown:
 *   - Maximum turns that cooldowns can be.
 * 
 *   JS: On Cooldown Update:
 *   - Code ran when a skill's cooldown updates.
 * 
 *   JS: On Cooldown Ready:
 *   - Code ran when a skill's cooldown reaches 0.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Warmup Settings
 * ============================================================================
 *
 * These are the general settings pertaining to warmups in-game.
 *
 * ---
 *
 * Settings
 * 
 *   Icon:
 *   - Icon used for Skill Warmups.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display Skill Warmups.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display Skill Warmups.
 *
 * ---
 *
 * Window Display
 * 
 *   Show Warmups?:
 *   - Display Skill Warmups?
 * 
 *   Text Format:
 *   - Text format for displaying Skill Warmups.
 *   - %1 - Turns, %2 - Icon
 *
 * ---
 *
 * Mechanics
 * 
 *   Preemptive Bonus:
 *   - How many turns should be dropped off Warmups on a Preemptive attack?
 * 
 *   Max Warmup:
 *   - Maximum turns that warmups can be.
 * 
 *   JS: On Warmup Update:
 *   - Code ran when a skill's warmup updates.
 * 
 *   JS: On Warmup Ready:
 *   - Code ran when a skill's warmup reaches 0.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.08: April 17, 2025
 * * Compatibility Update!
 * ** Added better compatibility with Skills & States Core's new Skill Toggles.
 * 
 * Version 1.07: November 14, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Irina:
 * *** <Once Per Turn>
 * **** Makes the skill only usable once per turn. Cannot be used in TPB, ATB,
 *      or CTB. Does not apply outside of battle.
 * **** Best used with actors/enemies that perform multiple actions per turn.
 * 
 * Version 1.06: February 15, 2024
 * * Bug Fixes!
 * ** Fixed a bug where Battle System - OTB causes consistency issues with
 *    warmup turns. Fixed by Olivia.
 * 
 * Version 1.05: December 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug where the warmup turns do not properly reflect for certain
 *    types of battle systems. Fixed by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New script calls added by Arisu:
 * *** $actorGetSkillCooldown
 * *** $actorSetSkillCooldown
 * *** $actorGetSkillWarmup
 * *** $actorSetSkillWarmup
 * *** $enemyGetSkillCooldown
 * *** $enemySetSkillCooldown
 * *** $enemyGetSkillWarmup
 * *** $enemySetSkillWarmup
 * **** Please refer to the help file on how to use these script calls.
 * 
 * Version 1.04: February 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * ** Added compatibility for Chain Battles. Cooldowns will be carried across
 *    chained battles.
 * 
 * Version 1.03: June 4, 2021
 * * Bug Fixes!
 * ** <JS Cooldowns> should now be working properly.
 * 
 * Version 1.02: November 8, 2020
 * * Feature Update!
 * ** Cooldown updating has been changed from the start of an action to the
 *    start of a new turn processing for battlers to ensure accuracy.
 *    Update by Arisu.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** Global and SType Cooldown modifiers should not cause crashes with
 *    specific numbers. Fix made by Yanfly.
 *
 * Version 1.00: September 9, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorSkillCooldown
 * @text Actor: Skill Cooldown
 * @desc Change cooldowns for a specific skill(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill ID(s)
 * @type skill[]
 * @desc Select which Skill ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorStypeCooldown
 * @text Actor: SType Cooldown
 * @desc Change cooldowns for all skills of a skill type(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill Type ID(s)
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which Skill Type ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorGlobalCooldown
 * @text Actor: Global Cooldown
 * @desc Change cooldowns for all skills for target(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Step 2: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step3:eval
 * @text Step 3: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemySkillCooldown
 * @text Enemy: Skill Cooldown
 * @desc Change cooldowns for a specific skill(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Enemy Index(es)
 * @type actor[]
 * @desc Select which Enemy Index(es) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill ID(s)
 * @type skill[]
 * @desc Select which Skill ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyStypeCooldown
 * @text Enemy: SType Cooldown
 * @desc Change cooldowns for all skills of a skill type(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Enemy Index(es)
 * @type actor[]
 * @desc Select which Enemy Index(es) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill Type ID(s)
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which Skill Type ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyGlobalCooldown
 * @text Enemy: Global Cooldown
 * @desc Change cooldowns for all skills for target(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Enemy Index(es)
 * @type actor[]
 * @desc Select which Enemy Index(es) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Step 2: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step3:eval
 * @text Step 3: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
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
 * @param SkillCooldowns
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Cooldown:struct
 * @text Skill Cooldowns
 * @type struct<Cooldown>
 * @desc Adjust cooldown settings here.
 * @default {"Settings":"","Icon:num":"0","FontColor:str":"5","FontSize:num":"22","Windows":"","Show:eval":"true","TextFmt:str":"Ready in %1T%2","Mechanics":"","MaxTurns:num":"50","OnUpdateJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\"","OnReadyJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Warmup:struct
 * @text Skill Warmups
 * @type struct<Warmup>
 * @desc Adjust warmup settings here.
 * @default {"Settings":"","Icon:num":"0","FontColor:str":"5","FontSize:num":"22","Windows":"","Show:eval":"true","TextFmt:str":"Prepared in %1T%2","Mechanics":"","Preemptive:num":"10","MaxTurns:num":"50","OnUpdateJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\"","OnReadyJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\""}
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
 * Cooldown Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cooldown:
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for Skill Cooldowns.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display Skill Cooldowns.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 5
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display Skill Cooldowns.
 * @default 22
 *
 * @param Windows
 * @text Window Display
 *
 * @param Show:eval
 * @text Show Cooldowns?
 * @parent Windows
 * @type boolean
 * @on YES
 * @off NO
 * @desc Display Skill Cooldowns?
 * @default true
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent  Windows
 * @desc Text format for displaying Skill Cooldowns.
 * %1 - Turns, %2 - Icon
 * @default Ready in %1T%2
 *
 * @param Mechanics
 *
 * @param MaxTurns:num
 * @text Max Cooldown
 * @parent Mechanics
 * @type number
 * @min 1
 * @desc Maximum turns that cooldowns can be.
 * @default 50
 *
 * @param OnUpdateJS:func
 * @text JS: On Cooldown Update
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's cooldown updates.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 * @param OnReadyJS:func
 * @text JS: On Cooldown Ready
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's cooldown reaches 0.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Warmup Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Warmup:
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for Skill Warmups.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display Skill Warmups.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 5
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display Skill Warmups.
 * @default 22
 *
 * @param Windows
 * @text Window Display
 *
 * @param Show:eval
 * @text Show Warmups?
 * @parent Windows
 * @type boolean
 * @on YES
 * @off NO
 * @desc Display Skill Warmups?
 * @default true
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent  Windows
 * @desc Text format for displaying Skill Warmups.
 * %1 - Turns, %2 - Icon
 * @default Prepared in %1T%2
 *
 * @param Mechanics
 *
 * @param Preemptive:num
 * @text Preemptive Bonus
 * @parent Mechanics
 * @type number
 * @min 0
 * @desc How many turns should be dropped off Warmups on a Preemptive attack?
 * @default 10
 *
 * @param MaxTurns:num
 * @text Max Warmup
 * @parent Mechanics
 * @type number
 * @min 1
 * @desc Maximum turns that warmups can be.
 * @default 50
 *
 * @param OnUpdateJS:func
 * @text JS: On Warmup Update
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's warmup updates.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 * @param OnReadyJS:func
 * @text JS: On Warmup Ready
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's warmup reaches 0.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 */
//=============================================================================

const _0x1cd7d3=_0x2568;(function(_0x4e0844,_0x10de21){const _0x159d87=_0x2568,_0x508d2c=_0x4e0844();while(!![]){try{const _0x5c0ee6=parseInt(_0x159d87(0x190))/0x1*(parseInt(_0x159d87(0x243))/0x2)+parseInt(_0x159d87(0x239))/0x3+parseInt(_0x159d87(0x201))/0x4+-parseInt(_0x159d87(0x18f))/0x5*(-parseInt(_0x159d87(0x19f))/0x6)+parseInt(_0x159d87(0x225))/0x7+parseInt(_0x159d87(0x20c))/0x8*(-parseInt(_0x159d87(0x218))/0x9)+parseInt(_0x159d87(0x182))/0xa*(-parseInt(_0x159d87(0x1f5))/0xb);if(_0x5c0ee6===_0x10de21)break;else _0x508d2c['push'](_0x508d2c['shift']());}catch(_0xe7695d){_0x508d2c['push'](_0x508d2c['shift']());}}}(_0x5f0b,0x664eb));var label=_0x1cd7d3(0x23c),tier=tier||0x0,dependencies=['VisuMZ_1_SkillsStatesCore'],pluginData=$plugins['filter'](function(_0x1493a1){const _0x17c7b7=_0x1cd7d3;return _0x1493a1[_0x17c7b7(0x1c3)]&&_0x1493a1['description'][_0x17c7b7(0x1e0)]('['+label+']');})[0x0];VisuMZ[label][_0x1cd7d3(0x222)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x1cd7d3(0x1ca)]=function(_0x5bbdae,_0x7e1fb5){const _0x93e1dd=_0x1cd7d3;for(const _0x2387a8 in _0x7e1fb5){if(_0x2387a8[_0x93e1dd(0x185)](/(.*):(.*)/i)){const _0xe0429f=String(RegExp['$1']),_0x4235cf=String(RegExp['$2'])[_0x93e1dd(0x21c)]()[_0x93e1dd(0x1dd)]();let _0x13a3d7,_0x45bca9,_0x3ebf3a;switch(_0x4235cf){case _0x93e1dd(0x209):_0x13a3d7=_0x7e1fb5[_0x2387a8]!==''?Number(_0x7e1fb5[_0x2387a8]):0x0;break;case _0x93e1dd(0x1c4):_0x45bca9=_0x7e1fb5[_0x2387a8]!==''?JSON['parse'](_0x7e1fb5[_0x2387a8]):[],_0x13a3d7=_0x45bca9[_0x93e1dd(0x208)](_0x32a055=>Number(_0x32a055));break;case _0x93e1dd(0x1ad):_0x13a3d7=_0x7e1fb5[_0x2387a8]!==''?eval(_0x7e1fb5[_0x2387a8]):null;break;case _0x93e1dd(0x227):_0x45bca9=_0x7e1fb5[_0x2387a8]!==''?JSON[_0x93e1dd(0x1d8)](_0x7e1fb5[_0x2387a8]):[],_0x13a3d7=_0x45bca9['map'](_0xf5d00a=>eval(_0xf5d00a));break;case'JSON':_0x13a3d7=_0x7e1fb5[_0x2387a8]!==''?JSON[_0x93e1dd(0x1d8)](_0x7e1fb5[_0x2387a8]):'';break;case'ARRAYJSON':_0x45bca9=_0x7e1fb5[_0x2387a8]!==''?JSON[_0x93e1dd(0x1d8)](_0x7e1fb5[_0x2387a8]):[],_0x13a3d7=_0x45bca9['map'](_0x24f4aa=>JSON['parse'](_0x24f4aa));break;case _0x93e1dd(0x1be):_0x13a3d7=_0x7e1fb5[_0x2387a8]!==''?new Function(JSON[_0x93e1dd(0x1d8)](_0x7e1fb5[_0x2387a8])):new Function('return\x200');break;case _0x93e1dd(0x1a2):_0x45bca9=_0x7e1fb5[_0x2387a8]!==''?JSON[_0x93e1dd(0x1d8)](_0x7e1fb5[_0x2387a8]):[],_0x13a3d7=_0x45bca9[_0x93e1dd(0x208)](_0x2acab8=>new Function(JSON['parse'](_0x2acab8)));break;case _0x93e1dd(0x1e3):_0x13a3d7=_0x7e1fb5[_0x2387a8]!==''?String(_0x7e1fb5[_0x2387a8]):'';break;case'ARRAYSTR':_0x45bca9=_0x7e1fb5[_0x2387a8]!==''?JSON['parse'](_0x7e1fb5[_0x2387a8]):[],_0x13a3d7=_0x45bca9['map'](_0x1f1194=>String(_0x1f1194));break;case _0x93e1dd(0x1e1):_0x3ebf3a=_0x7e1fb5[_0x2387a8]!==''?JSON[_0x93e1dd(0x1d8)](_0x7e1fb5[_0x2387a8]):{},_0x13a3d7=VisuMZ[_0x93e1dd(0x1ca)]({},_0x3ebf3a);break;case _0x93e1dd(0x186):_0x45bca9=_0x7e1fb5[_0x2387a8]!==''?JSON[_0x93e1dd(0x1d8)](_0x7e1fb5[_0x2387a8]):[],_0x13a3d7=_0x45bca9['map'](_0x51c8bd=>VisuMZ['ConvertParams']({},JSON['parse'](_0x51c8bd)));break;default:continue;}_0x5bbdae[_0xe0429f]=_0x13a3d7;}}return _0x5bbdae;},(_0x2ec6d6=>{const _0x49940e=_0x1cd7d3,_0xe810d8=_0x2ec6d6[_0x49940e(0x19b)];for(const _0x5e917e of dependencies){if(!Imported[_0x5e917e]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x49940e(0x187)](_0xe810d8,_0x5e917e)),SceneManager[_0x49940e(0x1f4)]();break;}}const _0x5beac9=_0x2ec6d6[_0x49940e(0x1a5)];if(_0x5beac9[_0x49940e(0x185)](/\[Version[ ](.*?)\]/i)){const _0x3e535f=Number(RegExp['$1']);_0x3e535f!==VisuMZ[label][_0x49940e(0x1ec)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x49940e(0x187)](_0xe810d8,_0x3e535f)),SceneManager[_0x49940e(0x1f4)]());}if(_0x5beac9[_0x49940e(0x185)](/\[Tier[ ](\d+)\]/i)){const _0xe2088d=Number(RegExp['$1']);_0xe2088d<tier?(alert(_0x49940e(0x1f9)[_0x49940e(0x187)](_0xe810d8,_0xe2088d,tier)),SceneManager[_0x49940e(0x1f4)]()):tier=Math[_0x49940e(0x220)](_0xe2088d,tier);}VisuMZ[_0x49940e(0x1ca)](VisuMZ[label][_0x49940e(0x222)],_0x2ec6d6[_0x49940e(0x20b)]);})(pluginData),VisuMZ['OperateValues']=function(_0x58933b,_0x213d2b,_0x266e27){switch(_0x266e27){case'=':return _0x213d2b;break;case'+':return _0x58933b+_0x213d2b;break;case'-':return _0x58933b-_0x213d2b;break;case'*':return _0x58933b*_0x213d2b;break;case'/':return _0x58933b/_0x213d2b;break;case'%':return _0x58933b%_0x213d2b;break;}return _0x58933b;},PluginManager[_0x1cd7d3(0x1d4)](pluginData[_0x1cd7d3(0x19b)],_0x1cd7d3(0x1c0),_0x40bc98=>{const _0x590e05=_0x1cd7d3;if(!$gameParty['inBattle']())return;VisuMZ[_0x590e05(0x1ca)](_0x40bc98,_0x40bc98);const _0x3dcea7=_0x40bc98[_0x590e05(0x22a)],_0x5cdf0e=_0x40bc98[_0x590e05(0x1bc)],_0x5b530c=_0x40bc98[_0x590e05(0x1a8)],_0x5b4158=_0x40bc98[_0x590e05(0x1a1)];for(const _0x5935d5 of _0x3dcea7){const _0x404f27=$gameActors[_0x590e05(0x1d9)](_0x5935d5);if(!_0x404f27)continue;for(const _0x5a13bc of _0x5cdf0e){let _0x479e61=_0x404f27[_0x590e05(0x237)](_0x5a13bc);_0x479e61=VisuMZ[_0x590e05(0x19c)](_0x479e61,_0x5b4158,_0x5b530c),_0x404f27[_0x590e05(0x1dc)](_0x5a13bc,_0x479e61);}}}),PluginManager[_0x1cd7d3(0x1d4)](pluginData[_0x1cd7d3(0x19b)],'ActorStypeCooldown',_0x3df997=>{const _0x149579=_0x1cd7d3;if(!$gameParty[_0x149579(0x1e7)]())return;VisuMZ['ConvertParams'](_0x3df997,_0x3df997);const _0x4efca8=_0x3df997[_0x149579(0x22a)],_0x1dde43=_0x3df997[_0x149579(0x1bc)],_0x5d98da=_0x3df997[_0x149579(0x1a8)],_0x3ad645=_0x3df997['Step4'];for(const _0xc47390 of _0x4efca8){const _0x3874aa=$gameActors[_0x149579(0x1d9)](_0xc47390);if(!_0x3874aa)continue;for(const _0x55ff32 of _0x1dde43){for(const _0x3222f5 of _0x3874aa[_0x149579(0x219)]()){if(!_0x3222f5)continue;if(!DataManager[_0x149579(0x174)](_0x3222f5)[_0x149579(0x1e0)](_0x55ff32))continue;const _0x54e5af=_0x3222f5['id'];let _0x4b269c=_0x3874aa[_0x149579(0x237)](_0x54e5af);_0x4b269c=VisuMZ['OperateValues'](_0x4b269c,_0x3ad645,_0x5d98da),_0x3874aa[_0x149579(0x1dc)](_0x54e5af,_0x4b269c);}}}}),PluginManager[_0x1cd7d3(0x1d4)](pluginData['name'],_0x1cd7d3(0x1e8),_0x1da5f9=>{const _0x4c12e1=_0x1cd7d3;if(!$gameParty[_0x4c12e1(0x1e7)]())return;VisuMZ[_0x4c12e1(0x1ca)](_0x1da5f9,_0x1da5f9);const _0x3e7399=_0x1da5f9[_0x4c12e1(0x22a)],_0x39049e=_0x1da5f9[_0x4c12e1(0x1bc)],_0x47ae46=_0x1da5f9[_0x4c12e1(0x1a8)];for(const _0x1aa0bc of _0x3e7399){const _0x86c8b8=$gameActors['actor'](_0x1aa0bc);if(!_0x86c8b8)continue;for(const _0x8e1180 of _0x86c8b8['skills']()){if(!_0x8e1180)continue;const _0x388645=_0x8e1180['id'];let _0x46907d=_0x86c8b8[_0x4c12e1(0x237)](_0x388645);_0x46907d=VisuMZ[_0x4c12e1(0x19c)](_0x46907d,_0x47ae46,_0x39049e),_0x86c8b8[_0x4c12e1(0x1dc)](_0x388645,_0x46907d);}}}),PluginManager[_0x1cd7d3(0x1d4)](pluginData[_0x1cd7d3(0x19b)],_0x1cd7d3(0x1d2),_0x1c6ce1=>{const _0x5b8b73=_0x1cd7d3;if(!$gameParty[_0x5b8b73(0x1e7)]())return;VisuMZ[_0x5b8b73(0x1ca)](_0x1c6ce1,_0x1c6ce1);const _0x5c7221=_0x1c6ce1[_0x5b8b73(0x22a)],_0x2a37fe=_0x1c6ce1[_0x5b8b73(0x1bc)],_0x4711b6=_0x1c6ce1[_0x5b8b73(0x1a8)],_0x37ce52=_0x1c6ce1[_0x5b8b73(0x1a1)];for(const _0x142962 of _0x5c7221){const _0x1e6b7b=$gameTroop[_0x5b8b73(0x17b)]()[_0x142962];if(!_0x1e6b7b)continue;for(const _0x37b459 of _0x2a37fe){let _0x4ec39e=_0x1e6b7b[_0x5b8b73(0x237)](_0x37b459);_0x4ec39e=VisuMZ[_0x5b8b73(0x19c)](_0x4ec39e,_0x37ce52,_0x4711b6),_0x1e6b7b[_0x5b8b73(0x1dc)](_0x37b459,_0x4ec39e);}}}),PluginManager[_0x1cd7d3(0x1d4)](pluginData[_0x1cd7d3(0x19b)],_0x1cd7d3(0x1d6),_0x4ac9ce=>{const _0x3797a0=_0x1cd7d3;if(!$gameParty[_0x3797a0(0x1e7)]())return;VisuMZ[_0x3797a0(0x1ca)](_0x4ac9ce,_0x4ac9ce);const _0x3f9093=_0x4ac9ce[_0x3797a0(0x22a)],_0x476546=_0x4ac9ce[_0x3797a0(0x1bc)],_0x123007=_0x4ac9ce[_0x3797a0(0x1a8)],_0x3130d5=_0x4ac9ce[_0x3797a0(0x1a1)];for(const _0x2bd188 of _0x3f9093){const _0x360769=$gameTroop['members']()[_0x2bd188];if(!_0x360769)continue;for(const _0x27f362 of _0x476546){for(const _0x4cdd0b of _0x360769[_0x3797a0(0x219)]()){if(!_0x4cdd0b)continue;if(!DataManager['getSkillTypes'](_0x4cdd0b)[_0x3797a0(0x1e0)](_0x27f362))continue;const _0x269986=_0x4cdd0b['id'];let _0x1a51d9=_0x360769[_0x3797a0(0x237)](_0x269986);_0x1a51d9=VisuMZ[_0x3797a0(0x19c)](_0x1a51d9,_0x3130d5,_0x123007),_0x360769[_0x3797a0(0x1dc)](_0x269986,_0x1a51d9);}}}}),PluginManager[_0x1cd7d3(0x1d4)](pluginData['name'],_0x1cd7d3(0x21d),_0x2ab875=>{const _0x1fe04a=_0x1cd7d3;if(!$gameParty[_0x1fe04a(0x1e7)]())return;VisuMZ[_0x1fe04a(0x1ca)](_0x2ab875,_0x2ab875);const _0x25f45d=_0x2ab875[_0x1fe04a(0x22a)],_0x21da78=_0x2ab875['Step2'],_0x232aef=_0x2ab875[_0x1fe04a(0x1a8)];for(const _0x439b96 of _0x25f45d){const _0xaede33=$gameTroop[_0x1fe04a(0x17b)]()[_0x439b96];if(!_0xaede33)continue;for(const _0x5ab677 of _0xaede33[_0x1fe04a(0x219)]()){if(!_0x5ab677)continue;const _0x4ccae1=_0x5ab677['id'];let _0x2e7f57=_0xaede33[_0x1fe04a(0x237)](_0x4ccae1);_0x2e7f57=VisuMZ[_0x1fe04a(0x19c)](_0x2e7f57,_0x232aef,_0x21da78),_0xaede33['setCooldown'](_0x4ccae1,_0x2e7f57);}}}),VisuMZ['SkillCooldowns'][_0x1cd7d3(0x224)]={},VisuMZ[_0x1cd7d3(0x23c)][_0x1cd7d3(0x1e2)]={},VisuMZ[_0x1cd7d3(0x23c)]['onCooldownUpdateJS']={},VisuMZ[_0x1cd7d3(0x23c)][_0x1cd7d3(0x1ea)]={},VisuMZ['SkillCooldowns'][_0x1cd7d3(0x183)]={},VisuMZ[_0x1cd7d3(0x23c)]['onWarmupReadyJS']={},VisuMZ[_0x1cd7d3(0x23c)][_0x1cd7d3(0x198)]=VisuMZ[_0x1cd7d3(0x1a0)]['Parse_Notetags_Skill_JS'],VisuMZ['SkillsStatesCore'][_0x1cd7d3(0x22d)]=function(_0x3bd7b8){const _0x17481c=_0x1cd7d3;VisuMZ[_0x17481c(0x23c)][_0x17481c(0x198)][_0x17481c(0x21a)](this,_0x3bd7b8);const _0x1b0e95=_0x3bd7b8[_0x17481c(0x179)],_0x21e11d='\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20id\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20$dataSkills[id];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.cooldown(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20',_0x14099e=_0x17481c(0x226);if(_0x1b0e95['match'](/<JS (?:COOLDOWN|COOLDOWNS)>\s*([\s\S]*)\s*<\/JS (?:COOLDOWN|COOLDOWNS)>/i)){const _0x469a80=String(RegExp['$1']),_0x3931de='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.cooldown(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20this.applyCooldown(skill.id,\x20turns);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x17481c(0x187)](_0x469a80);VisuMZ['SkillCooldowns'][_0x17481c(0x224)][_0x3bd7b8['id']]=new Function(_0x3931de);}if(_0x1b0e95[_0x17481c(0x185)](/<JS (?:WARMUP|WARMUPS)>\s*([\s\S]*)\s*<\/JS (?:WARMUP|WARMUPS)>/i)){const _0xddb13c=String(RegExp['$1']),_0x41d52d=_0x17481c(0x17e)[_0x17481c(0x187)](_0xddb13c);VisuMZ[_0x17481c(0x23c)][_0x17481c(0x1e2)][_0x3bd7b8['id']]=new Function(_0x41d52d);}if(_0x1b0e95[_0x17481c(0x185)](/<JS ON COOLDOWN UPDATE>\s*([\s\S]*)\s*<\/JS ON COOLDOWN UPDATE>/i)){const _0x43e265=String(RegExp['$1']),_0x37cd28=_0x21e11d['format'](_0x43e265);VisuMZ[_0x17481c(0x23c)][_0x17481c(0x1e9)][_0x3bd7b8['id']]=new Function(_0x37cd28);}if(_0x1b0e95[_0x17481c(0x185)](/<JS ON WARMUP UPDATE>\s*([\s\S]*)\s*<\/JS ON WARMUP UPDATE>/i)){const _0x3dfe01=String(RegExp['$1']),_0x2e0235=_0x14099e[_0x17481c(0x187)](_0x3dfe01);VisuMZ[_0x17481c(0x23c)][_0x17481c(0x1ea)][_0x3bd7b8['id']]=new Function(_0x2e0235);}if(_0x1b0e95[_0x17481c(0x185)](/<JS ON COOLDOWN READY>\s*([\s\S]*)\s*<\/JS ON COOLDOWN READY>/i)){const _0x1951e0=String(RegExp['$1']),_0x24f08e=_0x21e11d[_0x17481c(0x187)](_0x1951e0);VisuMZ['SkillCooldowns'][_0x17481c(0x183)][_0x3bd7b8['id']]=new Function(_0x24f08e);}if(_0x1b0e95[_0x17481c(0x185)](/<JS ON WARMUP READY>\s*([\s\S]*)\s*<\/JS ON WARMUP READY>/i)){const _0x42cc8b=String(RegExp['$1']),_0x5e9ca2=_0x14099e[_0x17481c(0x187)](_0x42cc8b);VisuMZ['SkillCooldowns'][_0x17481c(0x1b0)][_0x3bd7b8['id']]=new Function(_0x5e9ca2);}},VisuMZ[_0x1cd7d3(0x23c)]['BattleManager_processTurn']=BattleManager['processTurn'],BattleManager['processTurn']=function(){const _0x408e2b=_0x1cd7d3;if(this[_0x408e2b(0x189)])this[_0x408e2b(0x189)][_0x408e2b(0x1f7)]();VisuMZ[_0x408e2b(0x23c)][_0x408e2b(0x1a4)][_0x408e2b(0x21a)](this);},VisuMZ[_0x1cd7d3(0x23c)][_0x1cd7d3(0x18b)]=Game_Action['prototype']['applyItemUserEffect'],Game_Action[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x1b1)]=function(_0x478a24){const _0x3f2703=_0x1cd7d3;VisuMZ['SkillCooldowns'][_0x3f2703(0x18b)]['call'](this,_0x478a24),this['applySkillCooldownEffects'](_0x478a24);},Game_Action[_0x1cd7d3(0x1e5)]['applySkillCooldownEffects']=function(_0x1aa6e1){const _0x430507=_0x1cd7d3;this[_0x430507(0x197)](_0x1aa6e1),this[_0x430507(0x1df)](_0x1aa6e1),this[_0x430507(0x240)](_0x1aa6e1),this[_0x430507(0x1f6)](_0x1aa6e1),this['applyChangeWarmupEffects'](_0x1aa6e1),this['applyChangeStypeWarmupEffects'](_0x1aa6e1),this[_0x430507(0x1b8)](_0x1aa6e1);},Game_Action[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x197)]=function(_0x5b2552){const _0x32a324=_0x1cd7d3,_0x2b86e0=this[_0x32a324(0x223)]()['note'];_0x2b86e0[_0x32a324(0x185)](/<CLEAR USER COOLDOWNS>/i)&&this[_0x32a324(0x1e6)]()[_0x32a324(0x188)](),_0x2b86e0[_0x32a324(0x185)](/<CLEAR TARGET COOLDOWNS>/i)&&_0x5b2552[_0x32a324(0x188)](),_0x2b86e0[_0x32a324(0x185)](/<CLEAR USER WARMUPS>/i)&&this[_0x32a324(0x1e6)]()['clearWarmups'](),_0x2b86e0['match'](/<CLEAR TARGET WARMUPS>/i)&&_0x5b2552[_0x32a324(0x20a)]();},Game_Action[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x1df)]=function(_0x408656){const _0x3a8d54=_0x1cd7d3,_0x569a4a=this[_0x3a8d54(0x223)]()[_0x3a8d54(0x179)],_0x1eddc9=_0x569a4a['match'](/<USER SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0x1eddc9)for(const _0x354dc8 of _0x1eddc9){let _0x96382f=0x0,_0x4a2afd=0x0;if(_0x354dc8[_0x3a8d54(0x185)](/<USER SKILL[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0x96382f=Number(RegExp['$1']),_0x4a2afd=Number(RegExp['$2']);else _0x354dc8[_0x3a8d54(0x185)](/<USER SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)&&(_0x96382f=DataManager[_0x3a8d54(0x1ff)](RegExp['$1']),_0x4a2afd=Number(RegExp['$2']));this['subject']()[_0x3a8d54(0x1ed)](_0x96382f,_0x4a2afd);}const _0x460f9b=_0x569a4a['match'](/<TARGET SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0x460f9b)for(const _0x247a85 of _0x460f9b){let _0x3a2808=0x0,_0x12ae49=0x0;if(_0x247a85[_0x3a8d54(0x185)](/<TARGET SKILL[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0x3a2808=Number(RegExp['$1']),_0x12ae49=Number(RegExp['$2']);else _0x247a85[_0x3a8d54(0x185)](/<TARGET SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)&&(_0x3a2808=DataManager['getSkillIdWithName'](RegExp['$1']),_0x12ae49=Number(RegExp['$2']));_0x408656['addCooldown'](_0x3a2808,_0x12ae49);}},Game_Action[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x240)]=function(_0x5ad68f){const _0x1adadb=_0x1cd7d3,_0x128611=this[_0x1adadb(0x223)]()[_0x1adadb(0x179)],_0x3dbaa1=_0x128611['match'](/<USER STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0x3dbaa1)for(const _0x11495b of _0x3dbaa1){let _0x4b2294=0x0,_0x1b9279=0x0;if(_0x11495b[_0x1adadb(0x185)](/<USER STYPE[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0x4b2294=Number(RegExp['$1']),_0x1b9279=Number(RegExp['$2']);else _0x11495b[_0x1adadb(0x185)](/<USER STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)&&(_0x4b2294=DataManager['getSkillIdWithName'](RegExp['$1']),_0x1b9279=Number(RegExp['$2']));for(const _0x3c4de1 of this[_0x1adadb(0x1e6)]()[_0x1adadb(0x219)]()){if(_0x3c4de1){const _0x2380c0=DataManager[_0x1adadb(0x174)](_0x3c4de1);_0x2380c0[_0x1adadb(0x1e0)](_0x4b2294)&&this[_0x1adadb(0x1e6)]()[_0x1adadb(0x1ed)](_0x3c4de1['id'],_0x1b9279);}}}const _0x291d89=_0x128611[_0x1adadb(0x185)](/<TARGET STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0x291d89)for(const _0x2b8dc1 of _0x291d89){let _0x21fb1e=0x0,_0x354821=0x0;if(_0x2b8dc1[_0x1adadb(0x185)](/<TARGET STYPE[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0x21fb1e=Number(RegExp['$1']),_0x354821=Number(RegExp['$2']);else _0x2b8dc1[_0x1adadb(0x185)](/<TARGET STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)&&(_0x21fb1e=DataManager[_0x1adadb(0x1ff)](RegExp['$1']),_0x354821=Number(RegExp['$2']));for(const _0x45f584 of _0x5ad68f[_0x1adadb(0x219)]()){if(_0x45f584){const _0x8e5e95=DataManager[_0x1adadb(0x174)](_0x45f584);_0x8e5e95[_0x1adadb(0x1e0)](_0x21fb1e)&&_0x5ad68f['addCooldown'](_0x45f584['id'],_0x354821);}}}},Game_Action[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x1f6)]=function(_0x47827f){const _0xb0b2af=_0x1cd7d3,_0x45ebe4=this['item']()[_0xb0b2af(0x179)];if(_0x45ebe4[_0xb0b2af(0x185)](/<USER GLOBAL COOLDOWN:[ ]([\+\-]\d+)>/i)){const _0x5a8d4e=Number(RegExp['$1']);for(const _0x23359e of this['subject']()[_0xb0b2af(0x219)]()){_0x23359e&&this['subject']()['addCooldown'](_0x23359e['id'],_0x5a8d4e);}}if(_0x45ebe4[_0xb0b2af(0x185)](/<TARGET GLOBAL COOLDOWN:[ ]([\+\-]\d+)>/i)){const _0x13b06e=Number(RegExp['$1']);for(const _0x6bc422 of _0x47827f['skills']()){_0x6bc422&&_0x47827f['addCooldown'](_0x6bc422['id'],_0x13b06e);}}},Game_Action[_0x1cd7d3(0x1e5)]['applyChangeWarmupEffects']=function(_0x32a05d){const _0x2fe4cb=_0x1cd7d3,_0x7c89e8=this[_0x2fe4cb(0x223)]()[_0x2fe4cb(0x179)],_0xc2e34b=_0x7c89e8[_0x2fe4cb(0x185)](/<USER SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0xc2e34b)for(const _0x53365d of _0xc2e34b){let _0xfb9a3b=0x0,_0x42226f=0x0;if(_0x53365d[_0x2fe4cb(0x185)](/<USER SKILL[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i))_0xfb9a3b=Number(RegExp['$1']),_0x42226f=Number(RegExp['$2']);else _0x53365d[_0x2fe4cb(0x185)](/<USER SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&(_0xfb9a3b=DataManager[_0x2fe4cb(0x1ff)](RegExp['$1']),_0x42226f=Number(RegExp['$2']));this['subject']()[_0x2fe4cb(0x23e)](_0xfb9a3b,_0x42226f);}const _0x367a19=_0x7c89e8[_0x2fe4cb(0x185)](/<TARGET SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0x367a19)for(const _0xcc543d of _0x367a19){let _0x5b5efd=0x0,_0x1380aa=0x0;if(_0xcc543d['match'](/<TARGET SKILL[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i))_0x5b5efd=Number(RegExp['$1']),_0x1380aa=Number(RegExp['$2']);else _0xcc543d[_0x2fe4cb(0x185)](/<TARGET SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&(_0x5b5efd=DataManager[_0x2fe4cb(0x1ff)](RegExp['$1']),_0x1380aa=Number(RegExp['$2']));_0x32a05d[_0x2fe4cb(0x23e)](_0x5b5efd,_0x1380aa);}},Game_Action[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x1b2)]=function(_0x317c11){const _0x49ab7a=_0x1cd7d3,_0x24db53=this[_0x49ab7a(0x223)]()[_0x49ab7a(0x179)],_0x5a949c=_0x24db53[_0x49ab7a(0x185)](/<USER STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0x5a949c)for(const _0x5e1f27 of _0x5a949c){let _0x5c168a=0x0,_0x29e17e=0x0;if(_0x5e1f27[_0x49ab7a(0x185)](/<USER STYPE[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i))_0x5c168a=Number(RegExp['$1']),_0x29e17e=Number(RegExp['$2']);else _0x5e1f27[_0x49ab7a(0x185)](/<USER STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&(_0x5c168a=DataManager[_0x49ab7a(0x1ff)](RegExp['$1']),_0x29e17e=Number(RegExp['$2']));for(const _0x317b6b of this[_0x49ab7a(0x1e6)]()[_0x49ab7a(0x219)]()){if(_0x317b6b){const _0x109066=DataManager[_0x49ab7a(0x174)](_0x317b6b);_0x109066[_0x49ab7a(0x1e0)](_0x5c168a)&&this['subject']()['addWarmup'](_0x317b6b['id'],_0x29e17e);}}}const _0x12f038=_0x24db53[_0x49ab7a(0x185)](/<TARGET STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0x12f038)for(const _0x3a7f28 of _0x12f038){let _0x11e8fe=0x0,_0x23e08c=0x0;if(_0x3a7f28[_0x49ab7a(0x185)](/<TARGET STYPE[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i))_0x11e8fe=Number(RegExp['$1']),_0x23e08c=Number(RegExp['$2']);else _0x3a7f28[_0x49ab7a(0x185)](/<TARGET STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&(_0x11e8fe=DataManager[_0x49ab7a(0x1ff)](RegExp['$1']),_0x23e08c=Number(RegExp['$2']));for(const _0x207f4b of _0x317c11[_0x49ab7a(0x219)]()){if(_0x207f4b){const _0x158363=DataManager[_0x49ab7a(0x174)](_0x207f4b);_0x158363[_0x49ab7a(0x1e0)](_0x11e8fe)&&_0x317c11[_0x49ab7a(0x23e)](_0x207f4b['id'],_0x23e08c);}}}},Game_Action['prototype']['applyChangeGlobalWarmupEffects']=function(_0x472a27){const _0x45114e=_0x1cd7d3,_0x54be20=this[_0x45114e(0x223)]()[_0x45114e(0x179)];if(_0x54be20[_0x45114e(0x185)](/<USER GLOBAL WARMUP:[ ]([\+\-]\d+)>/i)){const _0x25b995=Number(RegExp['$1']);for(const _0x343a92 of this[_0x45114e(0x1e6)]()[_0x45114e(0x219)]()){_0x343a92&&this['subject']()[_0x45114e(0x23e)](_0x343a92['id'],_0x25b995);}}if(_0x54be20[_0x45114e(0x185)](/<TARGET GLOBAL WARMUP:[ ]([\+\-]\d+)>/i)){const _0x223bb8=Number(RegExp['$1']);for(const _0xc4db4b of _0x472a27['skills']()){_0xc4db4b&&_0x472a27[_0x45114e(0x23e)](_0xc4db4b['id'],_0x223bb8);}}},VisuMZ[_0x1cd7d3(0x23c)]['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x1d3)],Game_BattlerBase[_0x1cd7d3(0x1e5)]['initMembers']=function(){const _0x1c2dd5=_0x1cd7d3;VisuMZ[_0x1c2dd5(0x23c)][_0x1c2dd5(0x1a7)][_0x1c2dd5(0x21a)](this),this[_0x1c2dd5(0x1d1)]();},Game_BattlerBase['prototype'][_0x1cd7d3(0x1d1)]=function(){const _0xcd5285=_0x1cd7d3;this['clearCooldowns'](),this[_0xcd5285(0x20a)](),this[_0xcd5285(0x1cc)]();},Game_BattlerBase[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x188)]=function(){const _0x5e4830=_0x1cd7d3;this[_0x5e4830(0x202)]={};},Game_BattlerBase[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x237)]=function(_0x298be0){const _0x59c9e6=_0x1cd7d3;if(this[_0x59c9e6(0x202)]===undefined)this[_0x59c9e6(0x1d1)]();if(this[_0x59c9e6(0x234)]())return 0x0;const _0x438735=$dataSkills[_0x298be0];if(DataManager[_0x59c9e6(0x23b)]&&DataManager[_0x59c9e6(0x23b)](_0x438735)){if(this[_0x59c9e6(0x177)](_0x438735))return 0x0;}return this['_skillCooldowns'][_0x298be0]||0x0;},Game_BattlerBase['prototype']['isBypassCooldowns']=function(_0x3f067a){const _0xc391df=_0x1cd7d3;if(!$gameParty['inBattle']())return!![];if(this[_0xc391df(0x232)]()===_0x3f067a)return!![];if(this[_0xc391df(0x173)]()===_0x3f067a)return!![];const _0x5dafea=$dataSkills[_0x3f067a];if(_0x5dafea&&_0x5dafea[_0xc391df(0x179)][_0xc391df(0x185)](/<BYPASS COOLDOWNS>/i))return!![];if(_0x5dafea&&_0x5dafea[_0xc391df(0x19b)][_0xc391df(0x21c)]()===_0xc391df(0x1f3))return!![];return![];},Game_BattlerBase[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x231)]=function(_0x488bba){const _0x5cb3c2=_0x1cd7d3;if(!$gameParty[_0x5cb3c2(0x1e7)]())return;const _0x3ebe93=VisuMZ[_0x5cb3c2(0x23c)]['Settings']['Cooldown'];if(_0x3ebe93[_0x5cb3c2(0x18a)])_0x3ebe93[_0x5cb3c2(0x18a)][_0x5cb3c2(0x21a)](this,_0x488bba);VisuMZ[_0x5cb3c2(0x23c)][_0x5cb3c2(0x1e9)][_0x488bba]&&VisuMZ[_0x5cb3c2(0x23c)][_0x5cb3c2(0x1e9)][_0x488bba]['call'](this,_0x488bba);},Game_BattlerBase['prototype']['onCooldownReady']=function(_0x1ffdd9){const _0x34e93b=_0x1cd7d3;if(!$gameParty[_0x34e93b(0x1e7)]())return;const _0x179b78=VisuMZ[_0x34e93b(0x23c)][_0x34e93b(0x222)][_0x34e93b(0x23f)];if(_0x179b78[_0x34e93b(0x22e)])_0x179b78[_0x34e93b(0x22e)][_0x34e93b(0x21a)](this,_0x1ffdd9);VisuMZ[_0x34e93b(0x23c)][_0x34e93b(0x183)][_0x1ffdd9]&&VisuMZ[_0x34e93b(0x23c)][_0x34e93b(0x183)][_0x1ffdd9][_0x34e93b(0x21a)](this,_0x1ffdd9);},Game_BattlerBase[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x1dc)]=function(_0x16b59c,_0x490e48){const _0x5c28f8=_0x1cd7d3;if(this['_skillCooldowns']===undefined)this[_0x5c28f8(0x1d1)]();if(this['isBypassCooldowns'](_0x16b59c))return;_0x490e48=Math[_0x5c28f8(0x1fa)](_0x490e48),_0x490e48=_0x490e48['clamp'](0x0,VisuMZ[_0x5c28f8(0x23c)]['Settings']['Cooldown'][_0x5c28f8(0x1fe)]);const _0x4509c4=this[_0x5c28f8(0x237)](_0x16b59c);;this[_0x5c28f8(0x202)][_0x16b59c]=_0x490e48;if(this['_skillCooldowns'][_0x16b59c]<=0x0){if(_0x4509c4>0x0)this[_0x5c28f8(0x1c8)](_0x16b59c);delete this[_0x5c28f8(0x202)][_0x16b59c];}},Game_BattlerBase[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x1ed)]=function(_0x5b6834,_0x2b1939){const _0x52ebee=_0x1cd7d3;if(this[_0x52ebee(0x202)]===undefined)this[_0x52ebee(0x1d1)]();this[_0x52ebee(0x202)][_0x5b6834]=this[_0x52ebee(0x202)][_0x5b6834]||0x0,this['setCooldown'](_0x5b6834,this[_0x52ebee(0x202)][_0x5b6834]+_0x2b1939);},Game_BattlerBase[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x1ee)]=function(_0x26fa28,_0x8dc262){const _0x2bc787=_0x1cd7d3;_0x8dc262=this[_0x2bc787(0x217)](_0x26fa28,_0x8dc262,_0x2bc787(0x1cf)),this[_0x2bc787(0x1dc)](_0x26fa28,Math[_0x2bc787(0x220)](_0x8dc262,this[_0x2bc787(0x237)](_0x26fa28)));},Game_BattlerBase[_0x1cd7d3(0x1e5)]['applyStypeCooldowns']=function(_0x129e59,_0x26de52){const _0x44258b=_0x1cd7d3;for(const _0x419ed9 of this[_0x44258b(0x219)]()){if(_0x419ed9){const _0x8c70d=DataManager[_0x44258b(0x174)](_0x419ed9);_0x8c70d[_0x44258b(0x1e0)](_0x129e59)&&this[_0x44258b(0x1ee)](_0x419ed9['id'],_0x26de52);}}},Game_BattlerBase['prototype']['applyGlobalCooldowns']=function(_0x29672e){const _0xb5c5fa=_0x1cd7d3;for(const _0x5775e9 of this[_0xb5c5fa(0x219)]()){_0x5775e9&&this[_0xb5c5fa(0x1ee)](_0x5775e9['id'],_0x29672e);}},Game_BattlerBase[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x1b7)]=function(_0x5f3d63){const _0x50589d=_0x1cd7d3;_0x5f3d63=_0x5f3d63||0x1;for(const _0x1075da in this[_0x50589d(0x202)]){const _0x2c9cd2=this[_0x50589d(0x202)][_0x1075da]||0x0;this['_skillCooldowns'][_0x1075da]-=_0x5f3d63,this[_0x50589d(0x231)](_0x1075da);if(this[_0x50589d(0x202)][_0x1075da]<=0x0){if(_0x2c9cd2>0x0)this[_0x50589d(0x1c8)](_0x1075da);delete this[_0x50589d(0x202)][_0x1075da];}}},Game_BattlerBase[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x20a)]=function(){const _0x43588c=_0x1cd7d3;this[_0x43588c(0x1db)]={};},Game_BattlerBase[_0x1cd7d3(0x1e5)]['warmup']=function(_0x571740){return this['rawWarmup'](_0x571740)+this['cooldown'](_0x571740);},Game_BattlerBase['prototype']['rawWarmup']=function(_0xfc640f){const _0x5173be=_0x1cd7d3;if(this['_skillWarmups']===undefined)this[_0x5173be(0x1d1)]();if(this[_0x5173be(0x19a)]())return 0x0;const _0x287357=$dataSkills[_0xfc640f];if(DataManager[_0x5173be(0x23b)]&&DataManager['isToggleSkill'](_0x287357)){if(this['isSkillToggled'](_0x287357))return 0x0;}return this['_skillWarmups'][_0xfc640f]||0x0;},Game_BattlerBase[_0x1cd7d3(0x1e5)]['isBypassWarmups']=function(_0xbdefb2){const _0x2dc7eb=_0x1cd7d3;if(this['attackSkillId']()===_0xbdefb2)return!![];if(this['guardSkillId']()===_0xbdefb2)return!![];const _0x3771f0=$dataSkills[_0xbdefb2];if(_0x3771f0&&_0x3771f0[_0x2dc7eb(0x179)][_0x2dc7eb(0x185)](/<BYPASS WARMUPS>/i))return!![];if(_0x3771f0&&_0x3771f0[_0x2dc7eb(0x19b)]['toUpperCase']()===_0x2dc7eb(0x1f3))return!![];return![];},Game_BattlerBase[_0x1cd7d3(0x1e5)]['onWarmupUpdate']=function(_0x5d0dc1){const _0x3b40af=_0x1cd7d3;if(!$gameParty[_0x3b40af(0x1e7)]())return;const _0x27a7aa=VisuMZ['SkillCooldowns'][_0x3b40af(0x222)]['Warmup'];if(_0x27a7aa[_0x3b40af(0x18a)])_0x27a7aa[_0x3b40af(0x18a)][_0x3b40af(0x21a)](this,_0x5d0dc1);VisuMZ[_0x3b40af(0x23c)][_0x3b40af(0x1ea)][_0x5d0dc1]&&VisuMZ['SkillCooldowns'][_0x3b40af(0x1ea)][_0x5d0dc1][_0x3b40af(0x21a)](this,_0x5d0dc1);},Game_BattlerBase['prototype'][_0x1cd7d3(0x213)]=function(_0x296cbf){const _0x3a2b40=_0x1cd7d3;if(!$gameParty['inBattle']())return;const _0x4bb007=VisuMZ[_0x3a2b40(0x23c)][_0x3a2b40(0x222)][_0x3a2b40(0x21e)];if(_0x4bb007[_0x3a2b40(0x22e)])_0x4bb007[_0x3a2b40(0x22e)][_0x3a2b40(0x21a)](this,_0x296cbf);},Game_BattlerBase[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x1f0)]=function(_0x59de09,_0x68929a){const _0x1e435f=_0x1cd7d3;if(this['_skillWarmups']===undefined)this[_0x1e435f(0x1d1)]();if(this[_0x1e435f(0x19a)](_0x59de09))return;_0x68929a=Math[_0x1e435f(0x1fa)](_0x68929a),_0x68929a=_0x68929a[_0x1e435f(0x18c)](0x0,VisuMZ['SkillCooldowns'][_0x1e435f(0x222)][_0x1e435f(0x21e)][_0x1e435f(0x1fe)]);const _0xd17af7=this[_0x1e435f(0x204)](_0x59de09);;this[_0x1e435f(0x1db)][_0x59de09]=_0x68929a;if(this['_skillWarmups'][_0x59de09]<=0x0){if(_0xd17af7>0x0)this['onWarmupReady'](_0x59de09);delete this[_0x1e435f(0x1db)][_0x59de09];}},Game_BattlerBase[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x23e)]=function(_0x11c225,_0x4cda40){const _0x16df74=_0x1cd7d3;if(this[_0x16df74(0x1db)]===undefined)this[_0x16df74(0x1d1)]();this[_0x16df74(0x1db)][_0x11c225]=this[_0x16df74(0x1db)][_0x11c225]||0x0;if(this[_0x16df74(0x215)](_0x11c225)<=0x0)return;this[_0x16df74(0x1f0)](_0x11c225,this['_skillWarmups'][_0x11c225]+_0x4cda40);},Game_BattlerBase[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x1e4)]=function(_0x10a2ce,_0x55afe6){const _0x46dac6=_0x1cd7d3;_0x55afe6=this[_0x46dac6(0x217)](_0x10a2ce,_0x55afe6,_0x46dac6(0x238)),this[_0x46dac6(0x1f0)](_0x10a2ce,Math['max'](_0x55afe6,this[_0x46dac6(0x215)](_0x10a2ce)));},Game_BattlerBase[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x17a)]=function(_0xd61f4e){const _0xf6310b=_0x1cd7d3,_0x5f3c1c=Imported[_0xf6310b(0x17d)]&&VisuMZ[_0xf6310b(0x1ab)][_0xf6310b(0x222)][_0xf6310b(0x195)]['OnSpotAI'];if(Imported[_0xf6310b(0x230)]&&BattleManager[_0xf6310b(0x1ac)]()){if(this[_0xf6310b(0x207)]()<=(_0x5f3c1c?0x1:0x0))return;}else{if(Imported[_0xf6310b(0x236)]&&BattleManager[_0xf6310b(0x178)]()){if(this[_0xf6310b(0x207)]()<=(_0x5f3c1c?0x1:0x0))return;}else{if(Imported[_0xf6310b(0x1bf)]&&BattleManager[_0xf6310b(0x200)]()){if(this[_0xf6310b(0x207)]()<=(_0x5f3c1c?0x1:0x2))return;}else{if(this[_0xf6310b(0x207)]()<=0x0)return;}}}_0xd61f4e=_0xd61f4e||0x1;for(const _0x3c9346 in this[_0xf6310b(0x1db)]){const _0x573402=this[_0xf6310b(0x1db)][_0x3c9346]||0x0;this[_0xf6310b(0x1db)][_0x3c9346]-=_0xd61f4e;if(this['_skillWarmups'][_0x3c9346]<=0x0){if(_0x573402>0x0)this[_0xf6310b(0x213)](_0x3c9346);delete this[_0xf6310b(0x1db)][_0x3c9346];}}},Game_BattlerBase[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x1cc)]=function(){this['_skillOncePerTurns']={};},DataManager['isOncePerTurnSkill']=function(_0x2b2f70){const _0x4521d9=_0x1cd7d3;if(!_0x2b2f70)return![];this[_0x4521d9(0x1a3)]=this['_cache_isOncePerTurnSkill']||{};if(this[_0x4521d9(0x1a3)][_0x2b2f70['id']]!==undefined)return this[_0x4521d9(0x1a3)][_0x2b2f70['id']];const _0x54c2ab=_0x2b2f70['note']||'';let _0x1a9861=![];return _0x54c2ab['match'](/<ONCE PER TURN>/i)&&(_0x1a9861=!![]),this['_cache_isOncePerTurnSkill'][_0x2b2f70['id']]=_0x1a9861,this[_0x4521d9(0x1a3)][_0x2b2f70['id']];},Game_BattlerBase[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x172)]=function(_0x2e688f){const _0x280d89=_0x1cd7d3;if(!$gameParty[_0x280d89(0x1e7)]())return;if(BattleManager[_0x280d89(0x1d5)]())return;if(!_0x2e688f)return;if(DataManager[_0x280d89(0x1ba)](_0x2e688f)){if(this[_0x280d89(0x1a9)]===undefined)this[_0x280d89(0x1cc)]();this[_0x280d89(0x1a9)][_0x2e688f['id']]=this[_0x280d89(0x207)]();}},Game_BattlerBase['prototype']['isOncePerTurnRestricted']=function(_0x5e6a7d){const _0x3bfa1f=_0x1cd7d3;if(!$gameParty[_0x3bfa1f(0x1e7)]())return![];if(BattleManager['isTpb']())return![];if(!_0x5e6a7d)return![];if(DataManager[_0x3bfa1f(0x23b)]&&DataManager[_0x3bfa1f(0x23b)](_0x5e6a7d)){if(this[_0x3bfa1f(0x177)](_0x5e6a7d))return![];}if(this[_0x3bfa1f(0x1a9)]===undefined)this[_0x3bfa1f(0x1cc)]();return this['_skillOncePerTurns'][_0x5e6a7d['id']]===this['turnCount']();},VisuMZ[_0x1cd7d3(0x23c)]['Game_Enemy_selectAction']=Game_Enemy[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x1ef)],Game_Enemy[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x1ef)]=function(_0x1657e0,_0x41111e){const _0x43cfe9=_0x1cd7d3,_0x5aad61=VisuMZ[_0x43cfe9(0x23c)][_0x43cfe9(0x23a)][_0x43cfe9(0x21a)](this,_0x1657e0,_0x41111e);return this[_0x43cfe9(0x17f)](_0x5aad61,_0x1657e0),_0x5aad61;},Game_Battler[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x17f)]=function(_0x5160eb,_0x5c065a){const _0x78c4d7=_0x1cd7d3;if(!_0x5160eb)return;const _0x37087a=$dataSkills[_0x5160eb[_0x78c4d7(0x210)]];if(!_0x37087a)return;if(!DataManager[_0x78c4d7(0x1ba)](_0x37087a))return;const _0x55f365=_0x5c065a[_0x78c4d7(0x1da)](_0x3085e8=>_0x3085e8[_0x78c4d7(0x210)]===_0x5160eb[_0x78c4d7(0x210)]);for(const _0x2c321e of _0x55f365){_0x5c065a[_0x78c4d7(0x193)](_0x2c321e);}},VisuMZ[_0x1cd7d3(0x23c)][_0x1cd7d3(0x229)]=Game_BattlerBase[_0x1cd7d3(0x1e5)]['meetsSkillConditions'],Game_BattlerBase[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x17c)]=function(_0x1988d4){const _0x36c189=_0x1cd7d3;if(!VisuMZ[_0x36c189(0x23c)][_0x36c189(0x229)][_0x36c189(0x21a)](this,_0x1988d4))return![];if(DataManager[_0x36c189(0x23b)]&&DataManager['isToggleSkill'](_0x1988d4)){if(this[_0x36c189(0x20d)]()){if($gameParty[_0x36c189(0x1e7)]()){if(this[_0x36c189(0x180)]())return![];if(this['isConfused']())return![];}if(this[_0x36c189(0x177)](_0x1988d4))return!![];}else return![];}if(!this['areSkillWarmupsReady'](_0x1988d4))return![];if(!this[_0x36c189(0x241)](_0x1988d4))return![];if(this['isOncePerTurnRestricted'](_0x1988d4))return![];return!![];},Game_BattlerBase['prototype'][_0x1cd7d3(0x216)]=function(_0x2c5816){return this['rawWarmup'](_0x2c5816['id'])<=0x0;},Game_BattlerBase[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x241)]=function(_0x38c135){const _0x1bbd17=_0x1cd7d3;return this[_0x1bbd17(0x237)](_0x38c135['id'])<=0x0;},VisuMZ[_0x1cd7d3(0x23c)][_0x1cd7d3(0x1c2)]=Game_BattlerBase[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x221)],Game_BattlerBase[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x221)]=function(_0x3b5c8c){const _0x1a8a87=_0x1cd7d3;VisuMZ[_0x1a8a87(0x23c)][_0x1a8a87(0x1c2)]['call'](this,_0x3b5c8c),this[_0x1a8a87(0x1c1)](_0x3b5c8c),this[_0x1a8a87(0x172)](_0x3b5c8c);},Game_BattlerBase[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x21f)]=function(_0x4cc8ff,_0x590df9){const _0x3db718=_0x1cd7d3;return Imported[_0x3db718(0x235)]&&(_0x590df9=this[_0x3db718(0x214)](_0x4cc8ff,_0x590df9)),_0x590df9;},Game_BattlerBase['prototype'][_0x1cd7d3(0x1c1)]=function(_0x1d431a){const _0x5f414f=_0x1cd7d3;if(!$gameParty[_0x5f414f(0x1e7)]())return;const _0x1b0b99=_0x1d431a[_0x5f414f(0x179)];if(_0x1b0b99[_0x5f414f(0x185)](/<COOLDOWN:[ ](\d+)>/i)){let _0x47ff03=Number(RegExp['$1']);_0x47ff03=this[_0x5f414f(0x21f)](_0x1d431a,_0x47ff03),this[_0x5f414f(0x1ee)](_0x1d431a['id'],_0x47ff03);}VisuMZ[_0x5f414f(0x23c)]['cooldownJS'][_0x1d431a['id']]&&VisuMZ[_0x5f414f(0x23c)][_0x5f414f(0x224)][_0x1d431a['id']][_0x5f414f(0x21a)](this,_0x1d431a);const _0x30192a=_0x1b0b99[_0x5f414f(0x185)](/<SKILL[ ](.*)[ ]COOLDOWN:[ ](\d+)>/gi);if(_0x30192a)for(const _0x15ae5c of _0x30192a){let _0x2aa5ce=0x0,_0x663486=0x0;if(_0x15ae5c['match'](/<SKILL[ ](\d+)[ ]COOLDOWN:[ ](\d+)>/gi))_0x2aa5ce=Number(RegExp['$1']),_0x663486=Number(RegExp['$2']);else _0x15ae5c[_0x5f414f(0x185)](/<SKILL[ ](.*)[ ]COOLDOWN:[ ](\d+)>/gi)&&(_0x2aa5ce=DataManager[_0x5f414f(0x1ff)](RegExp['$1']),_0x663486=Number(RegExp['$2']));const _0x5a50d5=$dataSkills[_0x2aa5ce];_0x5a50d5&&(_0x663486=this['alterPaySkillCooldownModifier'](_0x1d431a,_0x663486),this[_0x5f414f(0x1ee)](_0x5a50d5['id'],_0x663486));}const _0x24d535=_0x1b0b99[_0x5f414f(0x185)](/<STYPE[ ](.*)[ ]COOLDOWN:[ ](\d+)>/gi);if(_0x24d535)for(const _0x3ff9a2 of _0x24d535){let _0x3345e3=0x0,_0x106643=0x0;if(_0x3ff9a2[_0x5f414f(0x185)](/<STYPE[ ](\d+)[ ]COOLDOWN:[ ](\d+)>/i))_0x3345e3=Number(RegExp['$1']),_0x106643=Number(RegExp['$2']);else _0x3ff9a2[_0x5f414f(0x185)](/<STYPE[ ](.*)[ ]COOLDOWN:[ ](\d+)>/i)&&(_0x3345e3=DataManager['getStypeIdWithName'](RegExp['$1']),_0x106643=Number(RegExp['$2']));_0x106643=this[_0x5f414f(0x21f)](_0x1d431a,_0x106643),this[_0x5f414f(0x1f2)](_0x3345e3,_0x106643);}if(_0x1b0b99[_0x5f414f(0x185)](/<GLOBAL COOLDOWN:[ ](\d+)>/i)){let _0x43e394=Number(RegExp['$1']);_0x43e394=this['alterPaySkillCooldownModifier'](_0x1d431a,_0x43e394),this['applyGlobalCooldowns'](_0x43e394);}},Game_BattlerBase[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x217)]=function(_0x24e76c,_0x2a68b9,_0x2077c3){const _0x15582c=_0x1cd7d3,_0x11aca2=$dataSkills[_0x24e76c];if(!_0x11aca2)return _0x2a68b9;const _0x4ea2f4=this[_0x15582c(0x1b9)](_0x11aca2,_0x2077c3,'PLUS'),_0x3d3d83=this['applyCDWUnotetagsRate'](_0x11aca2,_0x2077c3,_0x15582c(0x22f)),_0x250ecd=this['applyCDWUnotetagsFlat'](_0x11aca2,_0x2077c3,_0x15582c(0x1c9));return Math[_0x15582c(0x1fa)]((_0x2a68b9+_0x4ea2f4)*_0x3d3d83+_0x250ecd);},VisuMZ[_0x1cd7d3(0x23c)][_0x1cd7d3(0x1de)]={},Game_BattlerBase[_0x1cd7d3(0x1e5)]['applyCDWUnotetagsFlat']=function(_0x1a88e6,_0x42a8fd,_0x5d4a0f){const _0x5c1616=_0x1cd7d3,_0x1e9f71=_0x1a88e6['id'],_0x1f744a=_0x1a88e6[_0x5c1616(0x19b)][_0x5c1616(0x1dd)](),_0x53be8c=VisuMZ[_0x5c1616(0x23c)][_0x5c1616(0x1de)],_0x51e380=_0x5c1616(0x22b)[_0x5c1616(0x187)](_0x1e9f71,_0x42a8fd,_0x5d4a0f);_0x53be8c[_0x51e380]=_0x53be8c[_0x51e380]||{};const _0x26628b=_0x5c1616(0x1f1);_0x53be8c[_0x51e380][_0x5c1616(0x20e)]=_0x53be8c[_0x51e380][_0x5c1616(0x20e)]||new RegExp(_0x26628b[_0x5c1616(0x187)](_0x1e9f71,_0x42a8fd,_0x5d4a0f),'i'),_0x53be8c[_0x51e380][_0x5c1616(0x205)]=_0x53be8c[_0x51e380][_0x5c1616(0x205)]||new RegExp(_0x26628b[_0x5c1616(0x187)](_0x1f744a,_0x42a8fd,_0x5d4a0f),'i');const _0x5e2f10=DataManager['getSkillTypes'](_0x1a88e6);for(const _0x5293c3 of _0x5e2f10){const _0x2180d6=_0x5c1616(0x1b6)['format'](_0x5293c3,_0x42a8fd,_0x5d4a0f);let _0x433982=$dataSystem[_0x5c1616(0x1c7)][Number(_0x5293c3)][_0x5c1616(0x21c)]()['trim']();_0x433982=_0x433982[_0x5c1616(0x1cb)](/\x1I\[(\d+)\]/gi,''),_0x433982=_0x433982[_0x5c1616(0x1cb)](/\\I\[(\d+)\]/gi,''),_0x53be8c[_0x2180d6]=_0x53be8c[_0x2180d6]||{};const _0x2d4307=_0x5c1616(0x1eb);_0x53be8c[_0x2180d6][_0x5c1616(0x20e)]=_0x53be8c[_0x2180d6][_0x5c1616(0x20e)]||new RegExp(_0x2d4307['format'](_0x5293c3,_0x42a8fd,_0x5d4a0f),'i'),_0x53be8c[_0x2180d6][_0x5c1616(0x205)]=_0x53be8c[_0x2180d6][_0x5c1616(0x205)]||new RegExp(_0x2d4307[_0x5c1616(0x187)](_0x433982,_0x42a8fd,_0x5d4a0f),'i');}const _0x156624=_0x5c1616(0x228),_0x745adf=_0x5c1616(0x23d)['format'](_0x42a8fd,_0x5d4a0f);_0x53be8c[_0x745adf]=_0x53be8c[_0x745adf]||new RegExp(_0x156624[_0x5c1616(0x187)](_0x42a8fd,_0x5d4a0f),'i');const _0x2aab65=(_0x324dea,_0x3c03ba)=>{const _0x12bbda=_0x5c1616;if(!_0x3c03ba)return _0x324dea;const _0x2dbd51=_0x3c03ba[_0x12bbda(0x179)];if(_0x2dbd51[_0x12bbda(0x185)](_0x53be8c[_0x51e380][_0x12bbda(0x20e)])){var _0x1dcf41=Number(RegExp['$1']);_0x324dea+=_0x1dcf41;}if(_0x2dbd51[_0x12bbda(0x185)](_0x53be8c[_0x51e380][_0x12bbda(0x205)])){var _0x1dcf41=Number(RegExp['$1']);_0x324dea+=_0x1dcf41;}for(const _0x4b7d81 of _0x5e2f10){const _0x3af49a='Stype_%1_%2_%3'[_0x12bbda(0x187)](_0x4b7d81,_0x42a8fd,_0x5d4a0f);if(_0x2dbd51[_0x12bbda(0x185)](_0x53be8c[_0x3af49a][_0x12bbda(0x20e)])){var _0x1dcf41=Number(RegExp['$1']);_0x324dea+=_0x1dcf41;}if(_0x2dbd51['match'](_0x53be8c[_0x3af49a][_0x12bbda(0x205)])){var _0x1dcf41=Number(RegExp['$1']);_0x324dea+=_0x1dcf41;}}if(_0x2dbd51[_0x12bbda(0x185)](_0x53be8c[_0x745adf])){var _0x1dcf41=Number(RegExp['$1']);_0x324dea+=_0x1dcf41;}return _0x324dea;};return this['traitObjects']()[_0x5c1616(0x233)](_0x2aab65,0x0);},Game_BattlerBase[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x1bb)]=function(_0x185669,_0x3f702a,_0x1c1099){const _0x32c5a5=_0x1cd7d3,_0x5f40e0=_0x185669['id'],_0x517fe5=_0x185669[_0x32c5a5(0x19b)]['trim'](),_0x5d8c70=VisuMZ['SkillCooldowns'][_0x32c5a5(0x1de)],_0x53fc0c=_0x32c5a5(0x206),_0x548cde=_0x32c5a5(0x1a6),_0x130802=_0x32c5a5(0x22b)[_0x32c5a5(0x187)](_0x5f40e0,_0x3f702a,_0x1c1099);_0x5d8c70[_0x130802]=_0x5d8c70[_0x130802]||{};const _0x491ed6=_0x32c5a5(0x1ae);_0x5d8c70[_0x130802][_0x32c5a5(0x20e)]=_0x5d8c70[_0x130802][_0x32c5a5(0x20e)]||new RegExp(_0x491ed6[_0x32c5a5(0x187)](_0x5f40e0,_0x3f702a,_0x1c1099,_0x53fc0c),'i'),_0x5d8c70[_0x130802][_0x32c5a5(0x205)]=_0x5d8c70[_0x130802][_0x32c5a5(0x205)]||new RegExp(_0x491ed6[_0x32c5a5(0x187)](_0x517fe5,_0x3f702a,_0x1c1099,_0x53fc0c),'i'),_0x5d8c70[_0x130802]['notetag3']=_0x5d8c70[_0x130802][_0x32c5a5(0x242)]||new RegExp(_0x491ed6[_0x32c5a5(0x187)](_0x5f40e0,_0x3f702a,_0x1c1099,_0x548cde),'i'),_0x5d8c70[_0x130802]['notetag4']=_0x5d8c70[_0x130802][_0x32c5a5(0x1fb)]||new RegExp(_0x491ed6[_0x32c5a5(0x187)](_0x517fe5,_0x3f702a,_0x1c1099,_0x548cde),'i');const _0x371a7d=DataManager[_0x32c5a5(0x174)](_0x185669);for(const _0xfd03ec of _0x371a7d){const _0x28ff4a='Stype_%1_%2_%3'['format'](_0xfd03ec,_0x3f702a,_0x1c1099);let _0x3ef998=$dataSystem[_0x32c5a5(0x1c7)][Number(_0xfd03ec)]['toUpperCase']()['trim']();_0x3ef998=_0x3ef998[_0x32c5a5(0x1cb)](/\x1I\[(\d+)\]/gi,''),_0x3ef998=_0x3ef998['replace'](/\\I\[(\d+)\]/gi,''),_0x5d8c70[_0x28ff4a]=_0x5d8c70[_0x28ff4a]||{};const _0x20acfb=_0x32c5a5(0x196);_0x5d8c70[_0x28ff4a][_0x32c5a5(0x20e)]=_0x5d8c70[_0x28ff4a][_0x32c5a5(0x20e)]||new RegExp(_0x20acfb[_0x32c5a5(0x187)](_0xfd03ec,_0x3f702a,_0x1c1099,_0x53fc0c),'i'),_0x5d8c70[_0x28ff4a][_0x32c5a5(0x205)]=_0x5d8c70[_0x28ff4a][_0x32c5a5(0x205)]||new RegExp(_0x20acfb[_0x32c5a5(0x187)](_0x3ef998,_0x3f702a,_0x1c1099,_0x53fc0c),'i'),_0x5d8c70[_0x28ff4a]['notetag3']=_0x5d8c70[_0x28ff4a][_0x32c5a5(0x242)]||new RegExp(_0x20acfb[_0x32c5a5(0x187)](_0xfd03ec,_0x3f702a,_0x1c1099,_0x548cde),'i'),_0x5d8c70[_0x28ff4a][_0x32c5a5(0x1fb)]=_0x5d8c70[_0x28ff4a][_0x32c5a5(0x1fb)]||new RegExp(_0x20acfb['format'](_0x3ef998,_0x3f702a,_0x1c1099,_0x548cde),'i');}const _0x3ecae8=_0x32c5a5(0x212),_0x3176c4='Global_%1_%2'[_0x32c5a5(0x187)](_0x3f702a,_0x1c1099);_0x5d8c70[_0x3176c4]=_0x5d8c70[_0x3176c4]||{},_0x5d8c70[_0x3176c4][_0x32c5a5(0x20e)]=_0x5d8c70[_0x3176c4]['notetag1']||new RegExp(_0x3ecae8[_0x32c5a5(0x187)](_0x3f702a,_0x1c1099,_0x53fc0c),'i'),_0x5d8c70[_0x3176c4][_0x32c5a5(0x205)]=_0x5d8c70[_0x3176c4][_0x32c5a5(0x205)]||new RegExp(_0x3ecae8['format'](_0x3f702a,_0x1c1099,_0x548cde),'i');const _0x48701f=(_0x5545e6,_0x244c81)=>{const _0x11dcd3=_0x32c5a5;if(!_0x244c81)return _0x5545e6;const _0x4e1ebc=_0x244c81['note'];if(_0x4e1ebc['match'](_0x5d8c70[_0x130802][_0x11dcd3(0x20e)])){var _0x1efe5a=Number(RegExp['$1'])/0x64;_0x5545e6*=_0x1efe5a;}if(_0x4e1ebc[_0x11dcd3(0x185)](_0x5d8c70[_0x130802][_0x11dcd3(0x205)])){var _0x1efe5a=Number(RegExp['$1'])/0x64;_0x5545e6*=_0x1efe5a;}if(_0x4e1ebc[_0x11dcd3(0x185)](_0x5d8c70[_0x130802][_0x11dcd3(0x242)])){var _0x1efe5a=Number(RegExp['$1']);_0x5545e6*=_0x1efe5a;}if(_0x4e1ebc['match'](_0x5d8c70[_0x130802]['notetag4'])){var _0x1efe5a=Number(RegExp['$1']);_0x5545e6*=_0x1efe5a;}for(const _0x45ea24 of _0x371a7d){const _0x404472='Stype_%1_%2_%3'['format'](_0x45ea24,_0x3f702a,_0x1c1099);if(_0x4e1ebc[_0x11dcd3(0x185)](_0x5d8c70[_0x404472][_0x11dcd3(0x20e)])){var _0x1efe5a=Number(RegExp['$1'])/0x64;_0x5545e6*=_0x1efe5a;}if(_0x4e1ebc[_0x11dcd3(0x185)](_0x5d8c70[_0x404472][_0x11dcd3(0x205)])){var _0x1efe5a=Number(RegExp['$1'])/0x64;_0x5545e6*=_0x1efe5a;}if(_0x4e1ebc[_0x11dcd3(0x185)](_0x5d8c70[_0x404472][_0x11dcd3(0x242)])){var _0x1efe5a=Number(RegExp['$1']);_0x5545e6*=_0x1efe5a;}if(_0x4e1ebc['match'](_0x5d8c70[_0x404472][_0x11dcd3(0x1fb)])){var _0x1efe5a=Number(RegExp['$1']);_0x5545e6*=_0x1efe5a;}}if(_0x4e1ebc[_0x11dcd3(0x185)](_0x5d8c70[_0x3176c4]['notetag1'])){var _0x1efe5a=Number(RegExp['$1'])/0x64;_0x5545e6*=_0x1efe5a;}if(_0x4e1ebc['match'](_0x5d8c70[_0x3176c4][_0x11dcd3(0x205)])){var _0x1efe5a=Number(RegExp['$1']);_0x5545e6*=_0x1efe5a;}return _0x5545e6;};return this[_0x32c5a5(0x199)]()[_0x32c5a5(0x233)](_0x48701f,0x1);},VisuMZ[_0x1cd7d3(0x23c)][_0x1cd7d3(0x1bd)]=Game_Battler['prototype'][_0x1cd7d3(0x1b5)],Game_Battler['prototype'][_0x1cd7d3(0x1b5)]=function(_0x25653e){const _0x191b43=_0x1cd7d3;VisuMZ[_0x191b43(0x23c)]['Game_Battler_onBattleStart'][_0x191b43(0x21a)](this,_0x25653e);if(this[_0x191b43(0x18e)]){this[_0x191b43(0x18e)]=undefined;return;}this['clearCooldowns'](),this[_0x191b43(0x20a)](),this[_0x191b43(0x1cc)](),this[_0x191b43(0x181)](_0x25653e);},Game_Battler[_0x1cd7d3(0x1e5)]['prepareSkillWarmups']=function(_0x494c35){const _0x58fb03=_0x1cd7d3;for(const _0x43db9a of this[_0x58fb03(0x219)]()){if(!_0x43db9a)continue;const _0x3deeaf=_0x43db9a['id'],_0x803742=_0x43db9a[_0x58fb03(0x179)];_0x803742[_0x58fb03(0x185)](/<WARMUP:[ ](\d+)>/i)&&this[_0x58fb03(0x1e4)](_0x3deeaf,Number(RegExp['$1'])),VisuMZ[_0x58fb03(0x23c)]['warmupJS'][_0x43db9a['id']]&&VisuMZ[_0x58fb03(0x23c)][_0x58fb03(0x1e2)][_0x43db9a['id']][_0x58fb03(0x21a)](this,_0x43db9a);}if(_0x494c35){const _0xab9ca3=VisuMZ[_0x58fb03(0x23c)]['Settings'][_0x58fb03(0x21e)][_0x58fb03(0x1d0)]||0x0;this[_0x58fb03(0x17a)](_0xab9ca3);}},Game_Battler[_0x1cd7d3(0x1e5)]['prepareUpdateSkillCooldowns']=function(){const _0x36192f=_0x1cd7d3;if(this[_0x36192f(0x1d7)])return;if(this[_0x36192f(0x1fc)])return;this['_updatedSkillCooldowns']=!![],this[_0x36192f(0x1b7)]();if(Imported['VisuMZ_2_BattleSystemOTB']&&BattleManager[_0x36192f(0x211)]())return;this['updateWarmups']();},VisuMZ[_0x1cd7d3(0x23c)][_0x1cd7d3(0x1af)]=Game_Battler[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x1fd)],Game_Battler[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x1fd)]=function(){const _0x4bc30c=_0x1cd7d3;this[_0x4bc30c(0x1d7)]=![],VisuMZ[_0x4bc30c(0x23c)]['Game_Battler_onTurnEnd'][_0x4bc30c(0x21a)](this),Imported[_0x4bc30c(0x21b)]&&BattleManager[_0x4bc30c(0x211)]()&&this[_0x4bc30c(0x17a)](),this['clearOncePerTurns']();},VisuMZ[_0x1cd7d3(0x23c)]['Game_Battler_onBattleEnd']=Game_Battler[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x1b4)],Game_Battler[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x1b4)]=function(){const _0x32006c=_0x1cd7d3;VisuMZ[_0x32006c(0x23c)][_0x32006c(0x19e)][_0x32006c(0x21a)](this);if(Imported['VisuMZ_3_ChainBattles']&&$gameTemp[_0x32006c(0x1f8)]()){this[_0x32006c(0x18e)]=!![];return;}this[_0x32006c(0x188)](),this[_0x32006c(0x20a)](),this[_0x32006c(0x1cc)]();};var $actorGetSkillCooldown=function(_0x322cb9,_0x146139){const _0x20547d=_0x1cd7d3,_0xdd4b51=$gameActors['actor'](_0x322cb9);if(!_0xdd4b51)return 0x0;return _0xdd4b51[_0x20547d(0x237)](_0x146139)||0x0;},$actorSetSkillCooldown=function(_0x1fe715,_0x35bc59,_0x3b2cfd){const _0x1e1282=_0x1cd7d3,_0xe1f963=$gameActors[_0x1e1282(0x1d9)](_0x1fe715);if(!_0xe1f963)return;_0xe1f963[_0x1e1282(0x1dc)](_0x35bc59,_0x3b2cfd);},$actorGetSkillWarmup=function(_0x22d8ee,_0x926639){const _0x388ecd=_0x1cd7d3,_0x2acf08=$gameActors[_0x388ecd(0x1d9)](_0x22d8ee);if(!_0x2acf08)return 0x0;return _0x2acf08[_0x388ecd(0x215)](_0x926639)||0x0;},$actorSetSkillWarmup=function(_0xe384af,_0x1a2d51,_0x25007b){const _0x12772a=_0x1cd7d3,_0x14026a=$gameActors[_0x12772a(0x1d9)](_0xe384af);if(!_0x14026a)return;_0x14026a[_0x12772a(0x1f0)](_0x1a2d51,_0x25007b);},$enemyGetSkillCooldown=function(_0x6200ae,_0x9c5a9c){const _0x216ccc=_0x1cd7d3,_0x4cd6dd=$gameTroop[_0x216ccc(0x17b)]()[_0x6200ae];if(!_0x4cd6dd)return 0x0;return _0x4cd6dd['cooldown'](_0x9c5a9c)||0x0;},$enemySetSkillCooldown=function(_0x36dce7,_0x587ca9,_0x4bf12c){const _0x13faeb=_0x1cd7d3,_0x47082d=$gameTroop[_0x13faeb(0x17b)]()[_0x36dce7];if(!_0x47082d)return;_0x47082d['setCooldown'](_0x587ca9,_0x4bf12c);},$enemyGetSkillWarmup=function(_0x3b533b,_0x385010){const _0x427640=_0x1cd7d3,_0x4be89b=$gameTroop[_0x427640(0x17b)]()[_0x3b533b];if(!_0x4be89b)return 0x0;return _0x4be89b[_0x427640(0x215)](_0x385010)||0x0;},$enemySetSkillWarmup=function(_0x198844,_0xd2a43c,_0x223d2a){const _0x4bd573=_0x1cd7d3,_0x4e9cfa=$gameTroop[_0x4bd573(0x17b)]()[_0x198844];if(!_0x4e9cfa)return;_0x4e9cfa['setWarmup'](_0xd2a43c,_0x223d2a);};function _0x5f0b(){const _0x320ade=['members','meetsSkillConditions','VisuMZ_3_BattleAI','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.rawWarmup(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20this.applyWarmup(skill.id,\x20turns);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','removeOncePerTurnAction','isAutoBattle','prepareSkillWarmups','165930UtYypK','onCooldownReadyJS','FontSize','match','ARRAYSTRUCT','format','clearCooldowns','_subject','OnUpdateJS','Game_Action_applyItemUserEffect','clamp','drawTextEx','_previousBattleChain','10yxRXNA','11ncnIjV','drawSkillWarmup','\x5cFS[%1]','remove','Show','General','<STYPE\x20%1\x20%2\x20%3:[\x20]%4>','applyClearCooldownEffects','VisuMZ_SkillsStatesCore_Parse_Notetags_Skill_JS','traitObjects','isBypassWarmups','name','OperateValues','\x5cI[%1]','Game_Battler_onBattleEnd','1143390NnNcYQ','SkillsStatesCore','Step4','ARRAYFUNC','_cache_isOncePerTurnSkill','BattleManager_processTurn','description','(\x5cd+\x5c.?\x5cd+)','Game_BattlerBase_initMembers','Step3','_skillOncePerTurns','FontColor','BattleAI','isETB','EVAL','<SKILL\x20%1\x20%2\x20%3:[\x20]%4>','Game_Battler_onTurnEnd','onWarmupReadyJS','applyItemUserEffect','applyChangeStypeWarmupEffects','\x5cHexColor<%1>','onBattleEnd','onBattleStart','Stype_%1_%2_%3','updateCooldowns','applyChangeGlobalWarmupEffects','applyCDWUnotetagsFlat','isOncePerTurnSkill','applyCDWUnotetagsRate','Step2','Game_Battler_onBattleStart','FUNC','VisuMZ_2_BattleSystemSTB','ActorSkillCooldown','paySkillCooldown','Game_BattlerBase_paySkillCost','status','ARRAYNUM','Window_Base_drawSkillCost','Icon','skillTypes','onCooldownReady','FLAT','ConvertParams','replace','clearOncePerTurns','resetFontSettings','drawSkillCost','COOLDOWN','Preemptive','initSkillCooldowns','EnemySkillCooldown','initMembers','registerCommand','isTpb','EnemyStypeCooldown','_updatedSkillCooldowns','parse','actor','filter','_skillWarmups','setCooldown','trim','RegExp','applyChangeCooldownEffects','includes','STRUCT','warmupJS','STR','applyWarmup','prototype','subject','inBattle','ActorGlobalCooldown','onCooldownUpdateJS','onWarmupUpdateJS','<STYPE\x20%1\x20%2\x20%3:[\x20]([\x5c+\x5c-]\x5cd+)>','version','addCooldown','applyCooldown','selectAction','setWarmup','<SKILL\x20%1\x20%2\x20%3:[\x20]([\x5c+\x5c-]\x5cd+)>','applyStypeCooldowns','WAIT','exit','451eBxEGD','applyChangeGlobalCooldownEffects','prepareUpdateSkillCooldowns','getChainBattleSettings','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ceil','notetag4','_instantCast','onTurnEnd','MaxTurns','getSkillIdWithName','isSTB','3092012FGvlWF','_skillCooldowns','drawSkillCooldown','rawWarmup','notetag2','(\x5cd+)([%％])','turnCount','map','NUM','clearWarmups','parameters','4491944jJhPAi','isActor','notetag1','width','skillId','isOTB','<GLOBAL\x20%1\x20%2:[\x20]%3>','onWarmupReady','applyMasteryEffectCooldownTurns','warmup','areSkillWarmupsReady','applyCDWUmodifiers','9XcQhUL','skills','call','VisuMZ_2_BattleSystemOTB','toUpperCase','EnemyGlobalCooldown','Warmup','alterPaySkillCooldownModifier','max','paySkillCost','Settings','item','cooldownJS','2457826TkMiix','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20id\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20$dataSkills[id];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.rawWarmup(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','ARRAYEVAL','<GLOBAL\x20%1\x20%2:[\x20]([\x5c+\x5c-]\x5cd+)>','Game_BattlerBase_meetsSkillConditions','Step1','Skill_%1_%2_%3','isOncePerTurnRestricted','Parse_Notetags_Skill_JS','OnReadyJS','RATE','VisuMZ_2_BattleSystemETB','onCooldownUpdate','attackSkillId','reduce','isBypassCooldowns','VisuMZ_3_SkillMastery','VisuMZ_2_BattleSystemPTB','cooldown','WARMUP','71544IzfOSj','Game_Enemy_selectAction','isToggleSkill','SkillCooldowns','Global_%1_%2','addWarmup','Cooldown','applyChangeStypeCooldownEffects','areSkillCooldownsReady','notetag3','23956yvyrHH','registerOncePerTurn','guardSkillId','getSkillTypes','textSizeEx','\x5cC[%1]','isSkillToggled','isPTB','note','updateWarmups'];_0x5f0b=function(){return _0x320ade;};return _0x5f0b();}function _0x2568(_0x159c1,_0x525f68){const _0x5f0be9=_0x5f0b();return _0x2568=function(_0x2568da,_0xe6ecb){_0x2568da=_0x2568da-0x172;let _0x23412a=_0x5f0be9[_0x2568da];return _0x23412a;},_0x2568(_0x159c1,_0x525f68);}VisuMZ['SkillCooldowns'][_0x1cd7d3(0x1c5)]=Window_Base[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x1ce)],Window_Base['prototype'][_0x1cd7d3(0x1ce)]=function(_0x15ffe5,_0x61fb01,_0x2ffa3a,_0x352c9d,_0x1c9ca6){const _0x3176da=_0x1cd7d3,_0x262c1e=VisuMZ[_0x3176da(0x23c)][_0x3176da(0x222)];if(_0x262c1e[_0x3176da(0x21e)][_0x3176da(0x194)]&&_0x15ffe5[_0x3176da(0x204)](_0x61fb01['id'])>0x0)this['drawSkillWarmup'](_0x15ffe5,_0x61fb01,_0x2ffa3a,_0x352c9d,_0x1c9ca6);else{if(_0x262c1e['Cooldown'][_0x3176da(0x194)]&&_0x15ffe5[_0x3176da(0x237)](_0x61fb01['id'])>0x0)this['drawSkillCooldown'](_0x15ffe5,_0x61fb01,_0x2ffa3a,_0x352c9d,_0x1c9ca6);else _0x262c1e[_0x3176da(0x23f)]['Show']&&_0x15ffe5[_0x3176da(0x22c)](_0x61fb01)?this[_0x3176da(0x203)](_0x15ffe5,_0x61fb01,_0x2ffa3a,_0x352c9d,_0x1c9ca6):VisuMZ[_0x3176da(0x23c)][_0x3176da(0x1c5)][_0x3176da(0x21a)](this,_0x15ffe5,_0x61fb01,_0x2ffa3a,_0x352c9d,_0x1c9ca6);}},Window_Base[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x191)]=function(_0x1127e5,_0x2a4d71,_0xe63124,_0x4b7d26,_0xba2327){const _0x190a91=_0x1cd7d3,_0x48ccfe=VisuMZ[_0x190a91(0x23c)][_0x190a91(0x222)]['Warmup'];let _0x2159eb='';_0x2159eb+=_0x190a91(0x192)[_0x190a91(0x187)](_0x48ccfe['FontSize']);const _0x5b5ea0=_0x48ccfe['FontColor'];_0x5b5ea0[_0x190a91(0x185)](/#(.*)/i)&&Imported['VisuMZ_1_MessageCore']?_0x2159eb+=_0x190a91(0x1b3)[_0x190a91(0x187)](String(RegExp['$1'])):_0x2159eb+=_0x190a91(0x176)[_0x190a91(0x187)](_0x5b5ea0);const _0xcc820d=_0x1127e5[_0x190a91(0x215)](_0x2a4d71['id']),_0x30a4ac=_0x48ccfe[_0x190a91(0x1c6)]>0x0?_0x190a91(0x19d)['format'](_0x48ccfe[_0x190a91(0x1c6)]):'';_0x2159eb+=_0x48ccfe['TextFmt'][_0x190a91(0x187)](_0xcc820d,_0x30a4ac);const _0x598f14=this['textSizeEx'](_0x2159eb,_0xe63124,_0x4b7d26,_0xba2327),_0x33da2d=_0xe63124+_0xba2327-_0x598f14[_0x190a91(0x20f)];this[_0x190a91(0x18d)](_0x2159eb,_0x33da2d,_0x4b7d26,_0xba2327),this[_0x190a91(0x1cd)]();},Window_Base[_0x1cd7d3(0x1e5)][_0x1cd7d3(0x203)]=function(_0x70f003,_0x3d8ff0,_0x9318f,_0x1b4794,_0x2e8037){const _0x44d538=_0x1cd7d3,_0x43efe3=VisuMZ[_0x44d538(0x23c)][_0x44d538(0x222)]['Cooldown'];let _0x349623='';_0x349623+=_0x44d538(0x192)['format'](_0x43efe3[_0x44d538(0x184)]);const _0x58624a=_0x43efe3[_0x44d538(0x1aa)];_0x58624a[_0x44d538(0x185)](/#(.*)/i)&&Imported['VisuMZ_1_MessageCore']?_0x349623+=_0x44d538(0x1b3)[_0x44d538(0x187)](String(RegExp['$1'])):_0x349623+='\x5cC[%1]'[_0x44d538(0x187)](_0x58624a);const _0x843ecf=_0x70f003[_0x44d538(0x22c)](_0x3d8ff0)?0x1:_0x70f003[_0x44d538(0x237)](_0x3d8ff0['id']),_0x58bbb8=_0x43efe3['Icon']>0x0?'\x5cI[%1]'[_0x44d538(0x187)](_0x43efe3['Icon']):'';_0x349623+=_0x43efe3['TextFmt']['format'](_0x843ecf,_0x58bbb8);const _0xf71a20=this[_0x44d538(0x175)](_0x349623,_0x9318f,_0x1b4794,_0x2e8037),_0x595856=_0x9318f+_0x2e8037-_0xf71a20[_0x44d538(0x20f)];this[_0x44d538(0x18d)](_0x349623,_0x595856,_0x1b4794,_0x2e8037),this[_0x44d538(0x1cd)]();};