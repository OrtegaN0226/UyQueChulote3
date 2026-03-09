//=============================================================================
// VisuStella MZ - Equip Battle Skills
// VisuMZ_2_EquipBattleSkills.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_EquipBattleSkills = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EquipBattleSkills = VisuMZ.EquipBattleSkills || {};
VisuMZ.EquipBattleSkills.version = 1.11;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.11] [EquipBattleSkills]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Equip_Battle_Skills_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin creates a new gameplay mechanic where players have to choose
 * which skills to bring into battle. They can select what skills to bring from
 * the skill menu. In addition to being able to do that, equipped skills can
 * also add bonuses such as stats and/or passive states. This plugin can also
 * impose a limit upon actors to limit what skills can be equipped based on
 * skill tiers.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Limit the amount of skills actors can bring into battle. They can choose
 *   which to equip and which they cannot equip.
 * * Skill tiers can be used to further limit the strength of the skills they
 *   can bring into battle.
 * * Add and/or customize the skill tiers to your liking. Choose their name,
 *   their appearance, the associated skill name color, and the number of slots
 *   that actors can utilize.
 * * Equipped skills can bestow stat bonuses or passive states when equipped.
 * * Plugin Commands can increase or decrease the maximum amount of battle
 *   skill slots an actor can have.
 * * Plugin Commands can also increase or decrease the skill tier limitations
 *   regarding equipped battle skills.
 * * Trait objects such as weapons and armors can also have an influence on the
 *   maximum number of equipped battle skills and the skill tier limitations.
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
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_BattleCore
 * * VisuMZ_1_SkillsStatesCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Battle Command > Skill Types Substitute
 * 
 * If an actor uses equipped battle skills, skill types added by the Battle
 * Command 'skills' will be substituted for a single category, 'battle skills'.
 * Here, only the equipped skills for battle will be listed.
 * 
 * However, any uses of 'SType: x' or 'SType: name' will still enable those
 * specific skill types to be fully usable. This is also how to imitate Yanfly
 * Engine Plugins' version of "Allowed Types" for Equip Battle Skills.
 * 
 * This does NOT mean that if you use 'SType: x' that only the equipped skills
 * will appear in there and the non-equipped skills will be unavailable. This
 * means that for 'SType: x' skill access, ALL of the skills for that skill
 * type linked to the actor will become available regardless of what is
 * equipped for the battle skills or not.
 *
 * ---
 *
 * Battle Command > All Skills Substitute
 * 
 * If an actor uses equipped battle skills, the Battle Command 'all skills'
 * will only list the skills currently equipped for battle. Empty slots will be
 * bypassed in favor of keeping the Battle Command Window condensed.
 * 
 * You can still use 'Skill: x' or 'Skill: name' to manually add specific
 * single skills to the Battle Command Window.
 * 
 * ---
 * 
 * Skills with Multiple Skill Types
 *
 * If you are using the Skills and States Core and add multiple skill types to
 * a skill, if one of them belongs to a 'SType: x' battle command, that skill
 * will appear in the skill type while also appearing in the equipped battle
 * skills listing.
 *
 * ---
 * 
 * Battle Test
 * 
 * For the sake of better play testing, battle tests will have this equipped
 * battle skills disabled. This is because there's no way to properly prepare a
 * skill loadout through RPG Maker MZ's battle test preparation window.
 * 
 * ---
 *
 * Skill Name Colors
 * 
 * If equip skill tiers are enabled, then skill name colors will be based on
 * their equip skill tier settings.
 *
 * ---
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
 * VisuMZ_1_ItemsEquipsCore
 *
 * When equipping battle skills have that parameter changes that affect MaxHP
 * or MaxMP, the changes will be affected by the "Equip-Adjust HP/MP" plugin
 * parameter where the game will adjust HP/MP differences after equipping any
 * skills with MaxHP/MaxMP values.
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
 * === Max Slots-Related Notetags ===
 * 
 * ---
 *
 * <Equip Skill Base Slots: x>
 *
 * - Used for: Actor, Class Notetags
 * - Determines the base equip battle skill slots an actor can have.
 * - Priority will be given to the actor notetag over the class notetag if both
 *   notetags are present.
 * - Replace 'x' with a number representing the base slots amount.
 * - If this notetag is not used, use the Plugin Parameters default value.
 *
 * ---
 *
 * <Equip Skill Slots: +x>
 * <Equip Skill Slots: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Alters the maximum amount of equip battle skill slots an actor can have on
 *   top of the base value.
 * - Replace 'x' with a number representing the increase or decrease in maximum
 *   equip battle skill slots.
 *
 * ---
 * 
 * === Skill Tier-Related Notetags ===
 * 
 * ---
 * 
 * <Skill Tier: key>
 * 
 * - Used for: Skill Notetags
 * - Determines the skill tier the skill belongs to.
 * - Replace 'key' with the 'Tier ID Key' of the tier. You can find this data
 *   in the 'Skill Tiers' Plugin Parameters.
 * 
 * ---
 *
 * <Skill Tier key Base Slots: x>
 *
 * - Used for: Actor, Class Notetags
 * - Determines the base skill slots associated with the 'key' skill tier that
 *   an actor can have.
 * - Priority will be given to the actor notetag over the class notetag if both
 *   notetags are present.
 * - Replace 'key' with the 'Tier ID Key' of the tier. You can find this data
 *   in the 'Skill Tiers' Plugin Parameters.
 * - Replace 'x' with a number representing the base slots amount.
 * - Insert multiple copies of this notetag to provide different base amounts
 *   for different skill tiers.
 *
 * ---
 *
 * <Skill Tier key Slots: +x>
 * <Skill Tier key Slots: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Alters the maximum amount of skill slots associated with the 'key' skill
 *   tier that an actor can have.
 * - Replace 'key' with the 'Tier ID Key' of the tier. You can find this data
 *   in the 'Skill Tiers' Plugin Parameters.
 * - Replace 'x' with a number representing the increase or decrease in maximum
 *   equip battle skill slots.
 * - Insert multiple copies of this notetag to provide different bonus amounts
 *   for different skill tiers.
 *
 * ---
 * 
 * === Equip Bonuses-Related Notetags ===
 * 
 * ---
 * 
 * <Equip param: +x>
 * <Equip param: -x>
 * 
 * - Used for: Skill Notetags
 * - If this skill is equipped as a battle skill, it will also provide a flat
 *   stat increase/decrease to 'param' by 'x' amount.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 * - Replace 'x' with an integer to determine the flat increase or decrease to
 *   the designated parameter.
 * - Insert multiple copies of this notetag to provide different bonus amounts
 *   for different parameters.
 * 
 * ---
 * 
 * <Equip State: id>
 * <Equip States: id, id, id>
 * <Equip State: name>
 * <Equip States: name, name, name>
 * 
 * - Used for: Skill Notetags
 * - If this skill is equipped as a battle skill, it will also provide the
 *   designated state(s) as passive state(s) as long as the skill is equipped.
 * - This notetag requires the skill to be equipped in order to work.
 * - Replace 'id' with a number representing the ID of the state to add as a
 *   passive state that is only active while this equipped as a battle skill.
 * - Replace 'name' with the name of the state to add as a passive state that
 *   is only active while this equipped as a battle skill.
 *   - Separate multiple names with commas. Case is not sensitive.
 * - This differs from <Passive State: x> in how <Passive State: x> will always
 *   be providing the passive state regardless if the skill is equipped or not.
 * 
 * ---
 * 
 * === Actor Restriction-Related Notetags ===
 * 
 * ---
 *
 * <Can Equip Battle Skills>
 * <Cannot Equip Battle Skills>
 *
 * - Used for: Class Notetags
 * - Determines if certain classes can equip battle skills or not.
 * - If a class can equip battle skills, then the actor can utilize the equip
 *   battle skill mechanics.
 * - If a class cannot, then they will behave as normally.
 *
 * ---
 * 
 * === Skill Restriction-Related Notetags ===
 * 
 * ---
 *
 * <Cannot Equip>
 *
 * - Used for: Skill Notetags
 * - This skill cannot be equipped as a battle skill.
 *
 * ---
 * 
 * <Hide Equippable>
 * - Used for: Skill Notetags
 * - This skill cannot be equipped as a battle skill and will also be hidden
 *   from the equip skill list.
 * 
 * ---
 *
 * <Access Equippable>
 * <Access Only Equippable>
 *
 * - Used for: Skill Notetags
 * - This skill can only be equipped as a battle skill if the actor would
 *   normally have access to its skill type(s).
 * - The notetag variants do the same thing. Which you choose to use is
 *   entirely up to personal preference.
 *
 * ---
 *
 * <Always Equippable>
 * <All Access Equippable>
 *
 * - Used for: Skill Notetags
 * - This skill can always be equipped as a battle skill regardless if the
 *   actor would normally have access to its skill type(s).
 * - The notetag variants do the same thing. Which you choose to use is
 *   entirely up to personal preference.
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
 * Actor: Change Max Skill Slots
 * - Changes maximum skill slots for target actor(s).
 * - Cannot be used in battle.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Change Amount:
 *   - Changes the maximum skill slots by this amount.
 *   - Max slots cannot go below 1 or above hard cap.
 *
 * ---
 *
 * Actor: Change Skill Tier Slots
 * - Changes skill tier slots for target actor(s).
 * - Cannot be used in battle.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Tiers(s):
 *   - Enter in the Tier ID Key to alter the skill slots for.
 *
 *   Change Amount:
 *   - Changes the maximum skill slots by this amount.
 *   - Max slots cannot go below 1 or above hard cap.
 *
 * ---
 * 
 * === Party Plugin Commands ===
 * 
 * ---
 *
 * Party: Change Max Skill Slots
 * - Changes maximum skill slots for target party member(s).
 * - Cannot be used in battle.
 *
 *   Party Index(es):
 *   - Select which party member(s) to affect.
 *   - Index values start at 0.
 *
 *   Change Amount:
 *   - Changes the maximum skill slots by this amount.
 *   - Max slots cannot go below 1 or above hard cap.
 *
 * ---
 *
 * Party: Change Skill Tier Slots
 * - Changes skill tier slots for target party member(s).
 * - Cannot be used in battle.
 *
 *   Party Index(es):
 *   - Select which party member(s) to affect.
 *   - Index values start at 0.
 *
 *   Tiers(s):
 *   - Enter in the Tier ID Key to alter the skill slots for.
 *
 *   Change Amount:
 *   - Changes the maximum skill slots by this amount.
 *   - Max slots cannot go below 1 or above hard cap.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings for Equip Battle Skills.
 *
 * ---
 *
 * General
 * 
 *   Default Enable?:
 *   - Enable Equip Battle Skills for all actors by default?
 *   - Bypassed by <Can Equip Battle Skills> and
 *     <Cannot Equip Battle Skills> notetags.
 * 
 *   All Type Access?:
 *   - Can actors equip skills from all skill types or just the skill types
 *     they have access to?
 * 
 * ---
 * 
 * Skill Slots
 * 
 *   Default Base Slots:
 *   - What is the default amount of equip battle skill slots available for
 *     each actor?
 * 
 *   Maximum Slots:
 *   - What is the maximum number of equip battle skill slots that an actor can
 *     achieve?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Tier Settings
 * ============================================================================
 *
 * A list of the skill tiers available in this game and the various settings
 * used for it. Add more skill tiers or edit the available tiers to your needs.
 *
 * ---
 *
 * Plugin Parameters
 * 
 *   Enable Tier System?:
 *   - Enable the Equip Tier System for Equip Battle Skills?
 *
 * ---
 *
 * Skill Tier Entries
 * 
 *   Tier ID Key:
 *   - What is this skill tier's ID key?
 *
 * ---
 *
 * Skill Tier Entries > Display
 * 
 *   Display Name:
 *   - What is the text used to display this skill tier in the
 *     Skill Status Window?
 * 
 *   Display Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Display Icon:
 *   - Select an icon to display for this skill tier.
 *   - This icon will be used in the Skill Status Window.
 * 
 *   Marker Abbreviation:
 *   - What is the text used to display this skill tier as an abbreviation
 *     marker in the equip skill list?
 *
 * ---
 *
 * Skill Tier Entries > Tier Slots
 * 
 *   Base Slots:
 *   - What is the default amount of skill tier slots available for this
 *     skill tier type?
 * 
 *   Maximum Slots:
 *   - What is the maximum number of skill tier slots that can be achieved?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Vocabulary Settings
 * ============================================================================
 *
 * These settings let you adjust the text displayed for this plugin.
 *
 * ---
 *
 * Command Windows
 * 
 *   Battle Command:
 *   - Command name used for the Battle Command Window.
 * 
 *   Skill Type Command:
 *   - Command name used for the Skill Type Window.
 *
 * ---
 *
 * Equip Window
 * 
 *   Marker Format:
 *   - Format used when showing skills in equip list.
 *   - %1 - Skill Name, %2 - Equip Marker, %3 - Tier Marker
 * 
 *   Equipped:
 *   - Text used when displaying skill is currently equipped.
 * 
 *   Tier Format:
 *   - Format used when displaying tier name.
 *   - %1 - Tier Name
 * 
 *   Available Format:
 *   - Format used to display available slots.
 *   - %1 - Current Used, %2 - Max Slots
 *
 * ---
 *
 * Help Window
 * 
 *   Empty List:
 *   - Description used for picking a slot to equip.
 *   - Text codes allowed.
 * 
 *   Empty Equip:
 *   - Description used for picking a skill to equip.
 *   - Text codes allowed.
 * 
 * ---
 * 
 * Button Assist Window
 * 
 *   Unequip Text:
 *   - Text used for unequip skill shortcut.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * These settings let you adjust the windows displayed for this plugin.
 *
 * ---
 *
 * Empty Slot
 * 
 *   Empty Icon:
 *   - Icon used for empty slots.
 * 
 *   Empty Slot Name:
 *   - Text used for an empty slot.
 * 
 *   Empty Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 * ---
 * 
 * Skill Type Window
 * 
 *   Above Skill Types:
 *   - Do you want the "Equip" command above skill types or below them in the
 *     skill type command window?
 * 
 *   Battle Skills Icon:
 *   - Icon used for "Equip" command and "Battle Skills" in the battle
 *     command window.
 * 
 * ---
 * 
 * Equip Skill Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 * ---
 * 
 * Skill Status Window
 * 
 *   Show Skill Tiers?:
 *   - Show skill tiers in the Skill Status Window?
 *   - There needs to be enough space for this to work.
 * 
 *   Normal Slots Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Full Slots Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Slots Font Size:
 *   - Font size used for skill tier slots available.
 * 
 *   JS: Draw Status:
 *   - JavaScript code used to draw in Window_SkillStatus to display Equip
 *     Battle Skill Tiers.
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
 * Version 1.11: October 16, 2025
 * * Compatibility Update!
 * ** Added better compatibility with Equip Battle Skills when used together
 *    with enemy reference ID's. Update made by Olivia.
 * 
 * Version 1.10: September 18, 2025
 * * Compatibility Update!
 * ** Added better compatibility with Skills & States Core's new <Toggle>
 *    functionality. <Equip State: x> can now have the passive state be toggled
 *    on and off. Update made by Arisu.
 * 
 * Version 1.09: June 12, 2025
 * * Bug Fixes!
 * ** Fixed a bug where Skill & States Core's <Hide in Battle> is bypassed if
 *    used together with "All Skills" in the Battle Command controller. Fix
 *    made by Arisu.
 * 
 * Version 1.08: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Better compatibility with different icon sizes.
 * 
 * Version 1.07: July 18, 2024
 * * Compatibility Update!
 * ** Compatibility with Option Core's Auto-Battle + Attack Only should now
 *    work together with this plugin. Update made by Olivia.
 * 
 * Version 1.06: May 16, 2024
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.05: April 18, 2024
 * * Bug Fixes!
 * ** Auto battle now limits the skill pool to the equipped battle skills list
 *    rather than giving access to unequipped skills. Fix made by Irina.
 * ** Plugin now works better with Command Remember. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Irina:
 * *** <Hide Equippable>
 * **** This skill cannot be equipped as a battle skill and will also be hidden
 *      from the equip skill list.
 * 
 * Version 1.04: January 18, 2024
 * * Bug Fixes!
 * ** Fixed a problem where no skills would show at all. Fixed made by Olivia.
 * 
 * Version 1.03: December 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug where <Hide in Battle> did not apply to equipped battle
 *    skills during battle. Fix made by Olivia.
 * 
 * Version 1.02: August 17, 2023
 * * Documentation Update!
 * ** Explanation for Battle Command > Skill Types Substitute updated.
 * *** If an actor uses equipped battle skills, skill types added by the Battle
 *     Command 'skills' will be substituted for a single category, 'battle
 *     skills'. Here, only the equipped skills for battle will be listed.
 * *** However, any uses of 'SType: x' or 'SType: name' will still enable those
 *     specific skill types to be fully usable. This is also how to imitate
 *     Yanfly Engine Plugins' version of "Allowed Types" for Equip Battle
 *     Skills.
 * *** This does NOT mean that if you use 'SType: x' that only the equipped
 *     skills will appear in there and the non-equipped skills will be
 *     unavailable. This means that for 'SType: x' skill access, ALL of the
 *     skills for that skill type linked to the actor will become available
 *     regardless of what is equipped for the battle skills or not.
 * 
 * Version 1.01: June 15, 2023
 * * Documentation Update!
 * ** Added a section to "Major Changes"
 * *** Skills with Multiple Skill Types
 * **** If you are using the Skills and States Core and add multiple skill
 *      types to a skill, if one of them belongs to a 'SType: x' battle
 *      command, that skill will appear in the skill type while also appearing
 *      in the equipped battle skills listing.
 * * Feature Update!
 * ** If equipped battle skills are hidden by <Hide in Battle> notetags, they
 *    will become disabled and unusable for those who want to use them as
 *    equippable passives. Update made by Irina.
 * 
 * Version 1.00 Official Release Date: June 26, 2023
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeMaxSkillSlots
 * @text Actor: Change Max Skill Slots
 * @desc Changes maximum skill slots for target actor(s).
 * Cannot be used in battle.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Change:eval
 * @text Change Amount
 * @desc Changes the maximum skill slots by this amount.
 * Max slots cannot go below 1 or above hard cap.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeSkillTierSlots
 * @text Actor: Change Skill Tier Slots
 * @desc Changes skill tier slots for target actor(s).
 * Cannot be used in battle.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Tiers:arraystr
 * @text Tiers(s)
 * @type string[]
 * @desc Enter in the Tier ID Key to alter the skill slots for.
 * @default ["Untitled"]
 *
 * @arg Change:eval
 * @text Change Amount
 * @desc Changes the skill tier slots by this amount.
 * Skill slots cannot go below 1 or above hard cap.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Party
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PartyChangeMaxSkillSlots
 * @text Party: Change Max Skill Slots
 * @desc Changes maximum skill slots for target party member(s).
 * Cannot be used in battle.
 *
 * @arg PartyIndex:arraynum
 * @text Party Index(es)
 * @type actor[]
 * @desc Select which party member(s) to affect.
 * Index values start at 0.
 * @default ["0"]
 *
 * @arg Change:eval
 * @text Change Amount
 * @desc Changes the maximum skill slots by this amount.
 * Max slots cannot go below 1 or above hard cap.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PartyChangeSkillTierSlots
 * @text Party: Change Skill Tier Slots
 * @desc Changes skill tier slots for target party member(s).
 * Cannot be used in battle.
 *
 * @arg PartyIndex:arraynum
 * @text Party Index(es)
 * @type actor[]
 * @desc Select which party member(s) to affect.
 * Index values start at 0.
 * @default ["0"]
 *
 * @arg Tiers:arraystr
 * @text Tiers(s)
 * @type string[]
 * @desc Enter in the Tier ID Key to alter the skill slots for.
 * @default ["Untitled"]
 *
 * @arg Change:eval
 * @text Change Amount
 * @desc Changes the skill tier slots by this amount.
 * Skill slots cannot go below 1 or above hard cap.
 * @default +1
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
 * @param EquipBattleSkills
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings for Equip Battle Skills.
 * @default {"General":"","defaultEnable:eval":"true","accessAllTypes:eval":"false","Slots":"","defaultBase:num":"8","absoluteMax:num":"16"}
 *
 * @param enableTierSys:eval
 * @text Enable Tier System?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the Equip Tier System for Equip Battle Skills?
 * @default true
 *
 * @param Tiers:arraystruct
 * @text Skill Tiers
 * @parent enableTierSys:eval
 * @type struct<SkillTier>[]
 * @desc A list of the skill tiers available in this game and the
 * various settings used for it.
 * @default ["{\"tierKey:str\":\"Uncommon\",\"Display\":\"\",\"displayName:str\":\"Uncommon\",\"displayColor:str\":\"6\",\"displayIcon:num\":\"310\",\"markerAbbr:str\":\"U\",\"Slots\":\"\",\"defaultBase:num\":\"4\",\"absoluteMax:num\":\"8\"}","{\"tierKey:str\":\"Rare\",\"Display\":\"\",\"displayName:str\":\"Rare\",\"displayColor:str\":\"5\",\"displayIcon:num\":\"308\",\"markerAbbr:str\":\"R\",\"Slots\":\"\",\"defaultBase:num\":\"2\",\"absoluteMax:num\":\"5\"}","{\"tierKey:str\":\"Legendary\",\"Display\":\"\",\"displayName:str\":\"Legendary\",\"displayColor:str\":\"24\",\"displayIcon:num\":\"311\",\"markerAbbr:str\":\"L\",\"Slots\":\"\",\"defaultBase:num\":\"1\",\"absoluteMax:num\":\"3\"}"]
 *
 * @param Vocab:struct
 * @text Vocabulary Settings
 * @type struct<Vocab>
 * @desc These settings let you adjust the text displayed for this plugin.
 * @default {"CommandWindows":"","battleCommandName:str":"Skills","skillCommandName:str":"Battle","EquipWindow":"","markerFmt:str":"%2%1%3","equipMarker:str":"【E】","tierFmt:str":"《%1》","slotsAvailableFmt:str":"%1/%2","HelpWindow":"","emptyListDesc:json":"\"No skill is currently equipped in this battle skill slot.\"","emptyEquipDesc:json":"\"Choose to equip no skill.\"","ButtonAssist":"","unequipAssist:str":"Remove"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc These settings let you adjust the windows displayed for this plugin.
 * @default {"EmptySlot":"","emptyIcon:num":"307","emptyName:str":"Empty","emptyColor:str":"7","Window_SkillType":"","topEquipCommand:eval":"true","commandIcon:num":"312","Window_EquipBattleSkillList":"","Window_EquipBattleSkillList_BgType:num":"0","Window_SkillStatus":"","statusDrawTiers:eval":"true","tierNormalColor:str":"0","tierFullColor:str":"17","tierFontSize:str":"20","StatusWindowDrawJS:func":"\"// Draw Face\\nconst fx = this.colSpacing() / 2;\\nconst fh = this.innerHeight;\\nconst fy = fh / 2 - this.lineHeight() * 1.5;\\nthis.drawActorFace(this._actor, fx + 1, 0, 144, fh);\\nthis.drawActorSimpleStatus(this._actor, fx + 180, fy);\\n\\n// Return if Window Size is Too Small\\nlet sx = (this.colSpacing() / 2) + 180 + 180 + 180;\\nlet sw = this.innerWidth - sx - 2;\\nif (sw < 300) return;\\n\\n// Draw Skill Tier Types\\nconst tiers = DataManager.getEquipSkillTiers();\\nconst maxEntries = Math.floor(this.innerHeight / this.lineHeight());\\nconst maxCol = Math.ceil(tiers.length / maxEntries);\\nlet cx = sx;\\nlet cy = Math.max(Math.round((this.innerHeight - (this.lineHeight() * Math.ceil(tiers.length / maxCol))) / 2), 0);\\nconst by = cy;\\nlet cw = (this.innerWidth - cx - (this.itemPadding() * 2 * maxCol)) / maxCol;\\nif (maxCol === 1) {\\n    cw = Math.min(ImageManager.faceWidth * 2, cw);\\n    cx += Math.round((this.innerWidth - cx - (this.itemPadding() * 2) - cw) / 2);\\n}\\nfor (const tier of tiers) {\\n    this.drawEquipBattleSkillTierData(this._actor, tier, cx, cy, cw);\\n    cy += this.lineHeight();\\n    if (cy + this.lineHeight() > this.innerHeight) {\\n        cy = by;\\n        cx += cw + (this.itemPadding() * 2);\\n    }\\n}\""}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param General
 *
 * @param defaultEnable:eval
 * @text Default Enable?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable Equip Battle Skills for all actors by default?
 * Bypassed by <Can/Cannot Equip Battle Skills> notetag.
 * @default true
 *
 * @param accessAllTypes:eval
 * @text All Type Access?
 * @parent General
 * @type boolean
 * @on All Skill Types
 * @off Available Types
 * @desc Can actors equip skills from all skill types or just the
 * skill types they have access to?
 * @default false
 *
 * @param Slots
 * @text Skill Slots
 * 
 * @param defaultBase:num
 * @text Default Base Slots
 * @parent Slots
 * @type number
 * @min 1
 * @desc What is the default amount of equip battle skill slots
 * available for each actor?
 * @default 8
 * 
 * @param absoluteMax:num
 * @text Maximum Slots
 * @parent Slots
 * @type number
 * @min 1
 * @desc What is the maximum number of equip battle skill slots
 * that an actor can achieve?
 * @default 16
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Tier Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillTier:
 *
 * @param tierKey:str
 * @text Tier ID Key
 * @desc What is this skill tier's ID key?
 * @default Untitled
 * 
 * @param Display
 *
 * @param displayName:str
 * @text Display Name
 * @parent Display
 * @desc What is the text used to display this skill tier in
 * the Skill Status Window?
 * @default Untitled
 *
 * @param displayColor:str
 * @text Display Color
 * @parent Display
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param displayIcon:num
 * @text Display Icon
 * @parent Display
 * @desc Select an icon to display for this skill tier.
 * This icon will be used in the Skill Status Window.
 * @default 0
 *
 * @param markerAbbr:str
 * @text Marker Abbreviation
 * @parent Display
 * @desc What is the text used to display this skill tier as
 * an abbreviation marker in the equip skill list?
 * @default ???
 *
 * @param Slots
 * @text Tier Slots
 * 
 * @param defaultBase:num
 * @text Base Slots
 * @parent Slots
 * @type number
 * @min 1
 * @desc What is the default amount of skill tier slots
 * available for this skill tier type?
 * @default 1
 * 
 * @param absoluteMax:num
 * @text Maximum Slots
 * @parent Slots
 * @type number
 * @min 1
 * @desc What is the maximum number of skill tier slots
 * that can be achieved?
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Vocabulary Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 *
 * @param CommandWindows
 * @text Command Windows
 *
 * @param battleCommandName:str
 * @text Battle Command
 * @parent CommandWindows
 * @desc Command name used for the Battle Command Window.
 * @default Skills
 *
 * @param skillCommandName:str
 * @text Skill Type Command
 * @parent CommandWindows
 * @desc Command name used for the Skill Type Window.
 * @default Battle
 *
 * @param EquipWindow
 * @text Equip Window
 *
 * @param markerFmt:str
 * @text Marker Format
 * @parent EquipWindow
 * @desc Format used when showing skills in equip list.
 * %1 - Skill Name, %2 - Equip Marker, %3 - Tier Marker
 * @default %2%1%3
 *
 * @param equipMarker:str
 * @text Equipped
 * @parent EquipWindow
 * @desc Text used when displaying skill is currently equipped.
 * @default 【E】
 *
 * @param tierFmt:str
 * @text Tier Format
 * @parent EquipWindow
 * @desc Format used when displaying tier name.
 * %1 - Tier Name
 * @default 《%1》
 *
 * @param slotsAvailableFmt:str
 * @text Available Format
 * @parent EquipWindow
 * @desc Format used to display available slots.
 * %1 - Current Used, %2 - Max Slots
 * @default %1/%2
 * 
 * @param HelpWindow
 * @text Help Window
 *
 * @param emptyListDesc:json
 * @text Empty List
 * @parent HelpWindow
 * @type note
 * @desc Description used for picking a slot to equip.
 * Text codes allowed.
 * @default "No skill is currently equipped in this battle skill slot."
 *
 * @param emptyEquipDesc:json
 * @text Empty Equip
 * @parent HelpWindow
 * @type note
 * @desc Description used for picking a skill to equip.
 * Text codes allowed.
 * @default "Choose to equip no skill."
 * 
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param unequipAssist:str
 * @text Unequip Text
 * @parent ButtonAssist
 * @desc Text used for unequip skill shortcut.
 * @default Remove
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param EmptySlot
 * @text Empty Slot
 *
 * @param emptyIcon:num
 * @text Empty Icon
 * @parent EmptySlot
 * @desc Icon used for empty slots.
 * @default 307
 *
 * @param emptyName:str
 * @text Empty Slot Name
 * @parent EmptySlot
 * @desc Text used for an empty slot.
 * @default Empty
 *
 * @param emptyColor:str
 * @text Empty Color
 * @parent EmptySlot
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param Window_SkillType
 * @text Skill Type Window
 *
 * @param topEquipCommand:eval
 * @text Above Skill Types
 * @parent Window_SkillType
 * @type boolean
 * @on Above Skill Types
 * @off Below Skill Types
 * @desc Do you want the "Equip" command above skill types or below
 * them in the skill type command window?
 * @default true
 *
 * @param commandIcon:num
 * @text Battle Skills Icon
 * @parent Window_SkillType
 * @desc Icon used for "Equip" command and "Battle Skills" in the
 * battle command window.
 * @default 312
 *
 * @param Window_EquipBattleSkillList
 * @text Equip Skill Window
 *
 * @param Window_EquipBattleSkillList_BgType:num
 * @text Background Type
 * @parent Window_EquipBattleSkillList
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
 * @param Window_SkillStatus
 * @text Skill Status Window
 *
 * @param statusDrawTiers:eval
 * @text Show Skill Tiers?
 * @parent Window_SkillStatus
 * @type boolean
 * @on Show Skill Tiers
 * @off Show Default
 * @desc Show skill tiers in the Skill Status Window?
 * There needs to be enough space for this to work.
 * @default true
 *
 * @param tierNormalColor:str
 * @text Normal Slots Color
 * @parent Window_SkillStatus
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param tierFullColor:str
 * @text Full Slots Color
 * @parent Window_SkillStatus
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param tierFontSize:str
 * @text Slots Font Size
 * @parent Window_SkillStatus
 * @desc Font size used for skill tier slots available.
 * @default 20
 *
 * @param StatusWindowDrawJS:func
 * @text JS: Draw Status
 * @parent Window_SkillStatus
 * @type note
 * @desc JavaScript code used to draw in Window_SkillStatus
 * to display Equip Battle Skill Tiers.
 * @default "// Draw Face\nconst fx = this.colSpacing() / 2;\nconst fh = this.innerHeight;\nconst fy = fh / 2 - this.lineHeight() * 1.5;\nthis.drawActorFace(this._actor, fx + 1, 0, 144, fh);\nthis.drawActorSimpleStatus(this._actor, fx + 180, fy);\n\n// Return if Window Size is Too Small\nlet sx = (this.colSpacing() / 2) + 180 + 180 + 180;\nlet sw = this.innerWidth - sx - 2;\nif (sw < 300) return;\n\n// Draw Skill Tier Types\nconst tiers = DataManager.getEquipSkillTiers();\nconst maxEntries = Math.floor(this.innerHeight / this.lineHeight());\nconst maxCol = Math.ceil(tiers.length / maxEntries);\nlet cx = sx;\nlet cy = Math.max(Math.round((this.innerHeight - (this.lineHeight() * Math.ceil(tiers.length / maxCol))) / 2), 0);\nconst by = cy;\nlet cw = (this.innerWidth - cx - (this.itemPadding() * 2 * maxCol)) / maxCol;\nif (maxCol === 1) {\n    cw = Math.min(ImageManager.faceWidth * 2, cw);\n    cx += Math.round((this.innerWidth - cx - (this.itemPadding() * 2) - cw) / 2);\n}\nfor (const tier of tiers) {\n    this.drawEquipBattleSkillTierData(this._actor, tier, cx, cy, cw);\n    cy += this.lineHeight();\n    if (cy + this.lineHeight() > this.innerHeight) {\n        cy = by;\n        cx += cw + (this.itemPadding() * 2);\n    }\n}"
 *
 */
//=============================================================================

function _0x1f42(_0x417daf,_0x540ba1){const _0x3126dd=_0x3126();return _0x1f42=function(_0x1f4249,_0x1ad39a){_0x1f4249=_0x1f4249-0x1e1;let _0x3f8925=_0x3126dd[_0x1f4249];return _0x3f8925;},_0x1f42(_0x417daf,_0x540ba1);}const _0x3d4eb1=_0x1f42;(function(_0x4bd974,_0x307d2a){const _0x3e4377=_0x1f42,_0x1dbfa9=_0x4bd974();while(!![]){try{const _0x1cc186=-parseInt(_0x3e4377(0x344))/0x1+-parseInt(_0x3e4377(0x310))/0x2*(parseInt(_0x3e4377(0x2cb))/0x3)+-parseInt(_0x3e4377(0x2d6))/0x4+parseInt(_0x3e4377(0x24e))/0x5+-parseInt(_0x3e4377(0x21e))/0x6+-parseInt(_0x3e4377(0x30e))/0x7+-parseInt(_0x3e4377(0x2ce))/0x8*(-parseInt(_0x3e4377(0x244))/0x9);if(_0x1cc186===_0x307d2a)break;else _0x1dbfa9['push'](_0x1dbfa9['shift']());}catch(_0x33e7f0){_0x1dbfa9['push'](_0x1dbfa9['shift']());}}}(_0x3126,0xc866f));var label=_0x3d4eb1(0x2dd),tier=tier||0x0,dependencies=['VisuMZ_0_CoreEngine',_0x3d4eb1(0x2e7),_0x3d4eb1(0x2b7)],pluginData=$plugins[_0x3d4eb1(0x215)](function(_0x501941){const _0x29e681=_0x3d4eb1;return _0x501941[_0x29e681(0x294)]&&_0x501941['description'][_0x29e681(0x256)]('['+label+']');})[0x0];VisuMZ[label][_0x3d4eb1(0x274)]=VisuMZ[label][_0x3d4eb1(0x274)]||{},VisuMZ[_0x3d4eb1(0x1fd)]=function(_0x78bb2f,_0x3ff910){const _0x461349=_0x3d4eb1;for(const _0x797542 in _0x3ff910){if(_0x797542[_0x461349(0x24b)](/(.*):(.*)/i)){const _0xa16116=String(RegExp['$1']),_0x581f45=String(RegExp['$2'])['toUpperCase']()[_0x461349(0x22b)]();let _0xe78d7a,_0xe4639e,_0x15062d;switch(_0x581f45){case _0x461349(0x28e):_0xe78d7a=_0x3ff910[_0x797542]!==''?Number(_0x3ff910[_0x797542]):0x0;break;case'ARRAYNUM':_0xe4639e=_0x3ff910[_0x797542]!==''?JSON[_0x461349(0x231)](_0x3ff910[_0x797542]):[],_0xe78d7a=_0xe4639e[_0x461349(0x278)](_0x1ce69d=>Number(_0x1ce69d));break;case'EVAL':_0xe78d7a=_0x3ff910[_0x797542]!==''?eval(_0x3ff910[_0x797542]):null;break;case'ARRAYEVAL':_0xe4639e=_0x3ff910[_0x797542]!==''?JSON[_0x461349(0x231)](_0x3ff910[_0x797542]):[],_0xe78d7a=_0xe4639e[_0x461349(0x278)](_0x3c0451=>eval(_0x3c0451));break;case'JSON':_0xe78d7a=_0x3ff910[_0x797542]!==''?JSON[_0x461349(0x231)](_0x3ff910[_0x797542]):'';break;case _0x461349(0x29b):_0xe4639e=_0x3ff910[_0x797542]!==''?JSON[_0x461349(0x231)](_0x3ff910[_0x797542]):[],_0xe78d7a=_0xe4639e[_0x461349(0x278)](_0x401298=>JSON[_0x461349(0x231)](_0x401298));break;case _0x461349(0x25a):_0xe78d7a=_0x3ff910[_0x797542]!==''?new Function(JSON[_0x461349(0x231)](_0x3ff910[_0x797542])):new Function(_0x461349(0x217));break;case _0x461349(0x257):_0xe4639e=_0x3ff910[_0x797542]!==''?JSON[_0x461349(0x231)](_0x3ff910[_0x797542]):[],_0xe78d7a=_0xe4639e[_0x461349(0x278)](_0x465c9a=>new Function(JSON[_0x461349(0x231)](_0x465c9a)));break;case _0x461349(0x300):_0xe78d7a=_0x3ff910[_0x797542]!==''?String(_0x3ff910[_0x797542]):'';break;case _0x461349(0x224):_0xe4639e=_0x3ff910[_0x797542]!==''?JSON[_0x461349(0x231)](_0x3ff910[_0x797542]):[],_0xe78d7a=_0xe4639e[_0x461349(0x278)](_0x12d8ff=>String(_0x12d8ff));break;case _0x461349(0x24c):_0x15062d=_0x3ff910[_0x797542]!==''?JSON[_0x461349(0x231)](_0x3ff910[_0x797542]):{},_0xe78d7a=VisuMZ[_0x461349(0x1fd)]({},_0x15062d);break;case'ARRAYSTRUCT':_0xe4639e=_0x3ff910[_0x797542]!==''?JSON[_0x461349(0x231)](_0x3ff910[_0x797542]):[],_0xe78d7a=_0xe4639e['map'](_0x5be2f1=>VisuMZ['ConvertParams']({},JSON[_0x461349(0x231)](_0x5be2f1)));break;default:continue;}_0x78bb2f[_0xa16116]=_0xe78d7a;}}return _0x78bb2f;},(_0x5ef4f2=>{const _0x73fcf5=_0x3d4eb1,_0x1f5b92=_0x5ef4f2['name'];for(const _0x4bce88 of dependencies){if(!Imported[_0x4bce88]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x1f5b92,_0x4bce88)),SceneManager[_0x73fcf5(0x262)]();break;}}const _0x50c98d=_0x5ef4f2[_0x73fcf5(0x243)];if(_0x50c98d['match'](/\[Version[ ](.*?)\]/i)){const _0x46e031=Number(RegExp['$1']);_0x46e031!==VisuMZ[label][_0x73fcf5(0x22d)]&&(alert(_0x73fcf5(0x290)[_0x73fcf5(0x2ed)](_0x1f5b92,_0x46e031)),SceneManager[_0x73fcf5(0x262)]());}if(_0x50c98d[_0x73fcf5(0x24b)](/\[Tier[ ](\d+)\]/i)){const _0x564193=Number(RegExp['$1']);_0x564193<tier?(alert(_0x73fcf5(0x291)['format'](_0x1f5b92,_0x564193,tier)),SceneManager[_0x73fcf5(0x262)]()):tier=Math[_0x73fcf5(0x33c)](_0x564193,tier);}VisuMZ[_0x73fcf5(0x1fd)](VisuMZ[label][_0x73fcf5(0x274)],_0x5ef4f2['parameters']);})(pluginData),PluginManager['registerCommand'](pluginData[_0x3d4eb1(0x2c9)],_0x3d4eb1(0x264),_0x170844=>{const _0x493118=_0x3d4eb1;if(SceneManager[_0x493118(0x2ea)]())return;VisuMZ[_0x493118(0x1fd)](_0x170844,_0x170844);const _0x23e264=_0x170844[_0x493118(0x31c)]['map'](_0xef51d9=>$gameActors['actor'](_0xef51d9)),_0x4bfa02=_0x170844[_0x493118(0x2ca)]||0x0;for(const _0x9ea97d of _0x23e264){if(!_0x9ea97d)continue;_0x9ea97d[_0x493118(0x1e4)](_0x4bfa02);}}),PluginManager[_0x3d4eb1(0x1f1)](pluginData['name'],_0x3d4eb1(0x323),_0x4fe9bf=>{const _0x137e0c=_0x3d4eb1;if(SceneManager[_0x137e0c(0x2ea)]())return;VisuMZ[_0x137e0c(0x1fd)](_0x4fe9bf,_0x4fe9bf);const _0x4f8cf9=_0x4fe9bf[_0x137e0c(0x31c)]['map'](_0x5636c7=>$gameActors[_0x137e0c(0x253)](_0x5636c7)),_0x54fffa=_0x4fe9bf[_0x137e0c(0x1ee)][_0x137e0c(0x278)](_0x3a16f4=>_0x3a16f4[_0x137e0c(0x203)]()[_0x137e0c(0x22b)]()),_0x50acd9=_0x4fe9bf[_0x137e0c(0x2ca)]||0x0;for(const _0x4935eb of _0x4f8cf9){if(!_0x4935eb)continue;for(const _0x2c99b4 of _0x54fffa){if(VisuMZ[_0x137e0c(0x2dd)][_0x137e0c(0x1ee)][_0x2c99b4]===undefined)continue;_0x4935eb[_0x137e0c(0x333)](_0x2c99b4,_0x50acd9);}}}),PluginManager[_0x3d4eb1(0x1f1)](pluginData[_0x3d4eb1(0x2c9)],'PartyChangeMaxSkillSlots',_0x8f8862=>{const _0x3550e9=_0x3d4eb1;if(SceneManager[_0x3550e9(0x2ea)]())return;VisuMZ['ConvertParams'](_0x8f8862,_0x8f8862);const _0x223738=_0x8f8862[_0x3550e9(0x21c)]['map'](_0x245015=>$gameParty[_0x3550e9(0x2b1)]()[_0x245015]),_0x3d35d7=_0x8f8862['Change']||0x0;for(const _0x2412ba of _0x223738){if(!_0x2412ba)continue;_0x2412ba[_0x3550e9(0x1e4)](_0x3d35d7);}}),PluginManager['registerCommand'](pluginData[_0x3d4eb1(0x2c9)],'PartyChangeSkillTierSlots',_0xa4c88b=>{const _0x3e4347=_0x3d4eb1;if(SceneManager[_0x3e4347(0x2ea)]())return;VisuMZ[_0x3e4347(0x1fd)](_0xa4c88b,_0xa4c88b);const _0x3fccb0=_0xa4c88b[_0x3e4347(0x21c)]['map'](_0x48b882=>$gameParty[_0x3e4347(0x2b1)]()[_0x48b882]),_0x9bf388=_0xa4c88b[_0x3e4347(0x1ee)][_0x3e4347(0x278)](_0x41c2b8=>_0x41c2b8[_0x3e4347(0x203)]()['trim']()),_0x33a9e2=_0xa4c88b[_0x3e4347(0x2ca)]||0x0;for(const _0x2c0fde of _0x3fccb0){if(!_0x2c0fde)continue;for(const _0x461024 of _0x9bf388){if(VisuMZ[_0x3e4347(0x2dd)][_0x3e4347(0x1ee)][_0x461024]===undefined)continue;_0x2c0fde[_0x3e4347(0x333)](_0x461024,_0x33a9e2);}}}),VisuMZ[_0x3d4eb1(0x2dd)][_0x3d4eb1(0x2a6)]={'BaseSlots':/<EQUIP SKILL BASE SLOTS:[ ](\d+)>/i,'TypeBaseSlots':/<(?:EQUIP |)SKILL TIER (.*?) BASE SLOTS:[ ](\d+)>/gi,'CanEquipBattleSkills':/<CAN EQUIP BATTLE SKILLS>/i,'CannotEquipBattleSkills':/<CANNOT EQUIP BATTLE SKILLS>/i,'BonusSlots':/<EQUIP SKILL SLOTS:[ ]([\+\-]\d+)>/i,'tierBonusSlots':/<(?:EQUIP |)SKILL TIER (.*?) SLOTS:[ ]([\+\-]\d+)>/gi,'cannotEquip':/<(?:CANNOT EQUIP|UNEQUIPPABLE)>/i,'hideEquip':/<HIDE (?:EQUIP|EQUIPPABLE)>/i,'accessEquip':/<(?:ACCESS|ACCESS ONLY) EQUIPPABLE>/i,'alwaysEquip':/<(?:ALWAYS|ALL ACCESS) EQUIPPABLE>/i,'skillTierType':/<(?:EQUIP |)SKILL TIER:[ ](.*?)>/i,'skillParamPlus':/<EQUIP (.*?):[ ]([\+\-]\d+)>/gi,'equipPassives':/<EQUIP (?:PASSIVE |)(?:STATE|STATES):[ ](.*?)>/i},VisuMZ[_0x3d4eb1(0x2dd)][_0x3d4eb1(0x2b8)]=Scene_Boot['prototype'][_0x3d4eb1(0x24a)],Scene_Boot[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x24a)]=function(){const _0x52a610=_0x3d4eb1;VisuMZ[_0x52a610(0x2dd)][_0x52a610(0x2b8)][_0x52a610(0x32c)](this),this[_0x52a610(0x218)]();},VisuMZ[_0x3d4eb1(0x2dd)][_0x3d4eb1(0x1ee)]={},Scene_Boot[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x218)]=function(){const _0x316d19=_0x3d4eb1;if(!Game_System[_0x316d19(0x2c0)][_0x316d19(0x28c)])return;const _0x53a3e4=VisuMZ[_0x316d19(0x2dd)][_0x316d19(0x274)]['Tiers'];for(const _0x2943f6 of _0x53a3e4){if(!_0x2943f6)continue;const _0x10624f=_0x2943f6[_0x316d19(0x30a)][_0x316d19(0x203)]()[_0x316d19(0x22b)]();if(_0x10624f==='untitled')continue;if(_0x2943f6['displayName'][_0x316d19(0x203)]()[_0x316d19(0x22b)]()==='untitled')continue;if(_0x2943f6['markerAbbr'][_0x316d19(0x203)]()['trim']()===_0x316d19(0x2b6))continue;VisuMZ['EquipBattleSkills']['Tiers'][_0x10624f]=_0x2943f6;}},DataManager[_0x3d4eb1(0x303)]=function(_0x131c00){const _0x1af8c9=_0x3d4eb1;if(!$gameSystem['isEquipSkillTierSystemEnabled']())return'';if(!this[_0x1af8c9(0x2f9)](_0x131c00))return'';this[_0x1af8c9(0x332)]=this[_0x1af8c9(0x332)]||{};if(this['_skillTierTypes'][_0x131c00['id']]!==undefined)return this[_0x1af8c9(0x332)][_0x131c00['id']];this[_0x1af8c9(0x332)][_0x131c00['id']]='';const _0x14657d=VisuMZ[_0x1af8c9(0x2dd)]['RegExp'],_0x2045c3=_0x131c00[_0x1af8c9(0x2c3)]||'';if(_0x2045c3[_0x1af8c9(0x24b)](_0x14657d[_0x1af8c9(0x219)])){const _0x4410a1=String(RegExp['$1'])[_0x1af8c9(0x203)]()[_0x1af8c9(0x22b)]();VisuMZ['EquipBattleSkills'][_0x1af8c9(0x1ee)][_0x4410a1]!==undefined&&(this['_skillTierTypes'][_0x131c00['id']]=_0x4410a1);}return this[_0x1af8c9(0x332)][_0x131c00['id']];},DataManager[_0x3d4eb1(0x1e6)]=function(_0x4c6ff1){const _0x258588=_0x3d4eb1;if(!$gameSystem[_0x258588(0x275)]())return{};if(!this[_0x258588(0x2f9)](_0x4c6ff1))return{};const _0x38b26a=this['getEquipSkillTierType'](_0x4c6ff1);return VisuMZ['EquipBattleSkills'][_0x258588(0x1ee)][_0x38b26a]||{};},DataManager[_0x3d4eb1(0x23c)]=function(_0xc58464,_0x2d817b){const _0x59a09d=_0x3d4eb1;this['_actorEquipSkillTierBaseSlots']=this[_0x59a09d(0x209)]||{},this[_0x59a09d(0x209)][_0xc58464[_0x59a09d(0x25e)]()]=this['_actorEquipSkillTierBaseSlots'][_0xc58464[_0x59a09d(0x25e)]()]||{};if(this[_0x59a09d(0x209)][_0xc58464[_0x59a09d(0x25e)]()][_0x2d817b]!==undefined)return this[_0x59a09d(0x209)][_0xc58464['actorId']()][_0x2d817b];this[_0x59a09d(0x209)][_0xc58464['actorId']()][_0x2d817b]=-0x1;const _0x441f6b=VisuMZ[_0x59a09d(0x2dd)][_0x59a09d(0x2a6)],_0x4f6c36=_0xc58464[_0x59a09d(0x253)]()?_0xc58464[_0x59a09d(0x253)]()['note']||'':'',_0x4b320d=_0x4f6c36[_0x59a09d(0x24b)](_0x441f6b[_0x59a09d(0x2a0)]);if(_0x4b320d)for(const _0x5c16dd of _0x4b320d){_0x5c16dd[_0x59a09d(0x24b)](_0x441f6b[_0x59a09d(0x2a0)]);const _0x36922b=String(RegExp['$1'])[_0x59a09d(0x203)]()['trim'](),_0x1d11f0=Number(RegExp['$2'])||0x1;VisuMZ[_0x59a09d(0x2dd)][_0x59a09d(0x1ee)][_0x36922b]!==undefined&&(this[_0x59a09d(0x209)][_0xc58464[_0x59a09d(0x25e)]()][_0x36922b]=_0x1d11f0);}return this[_0x59a09d(0x209)][_0xc58464[_0x59a09d(0x25e)]()][_0x2d817b];},DataManager[_0x3d4eb1(0x23c)]=function(_0x349f38,_0x2319ab){const _0x23584e=_0x3d4eb1;this['_actorEquipSkillTierBaseSlots']=this[_0x23584e(0x209)]||{},this['_actorEquipSkillTierBaseSlots'][_0x349f38[_0x23584e(0x25e)]()]=this[_0x23584e(0x209)][_0x349f38['actorId']()]||{};if(this[_0x23584e(0x209)][_0x349f38['actorId']()][_0x2319ab]!==undefined)return this[_0x23584e(0x209)][_0x349f38[_0x23584e(0x25e)]()][_0x2319ab];const _0x50ffd1=VisuMZ['EquipBattleSkills'][_0x23584e(0x1ee)][_0x2319ab][_0x23584e(0x26d)];this[_0x23584e(0x209)][_0x349f38[_0x23584e(0x25e)]()][_0x2319ab]=_0x50ffd1;const _0x25f2ad=VisuMZ[_0x23584e(0x2dd)][_0x23584e(0x2a6)],_0x4f210a=_0x349f38['actor']()?_0x349f38[_0x23584e(0x253)]()[_0x23584e(0x2c3)]||'':'',_0x4042b6=_0x4f210a[_0x23584e(0x24b)](_0x25f2ad[_0x23584e(0x2a0)]);if(_0x4042b6)for(const _0x2ce70d of _0x4042b6){_0x2ce70d[_0x23584e(0x24b)](_0x25f2ad[_0x23584e(0x2a0)]);const _0x485fd6=String(RegExp['$1'])[_0x23584e(0x203)]()[_0x23584e(0x22b)](),_0x48ebf1=Number(RegExp['$2'])||0x1;VisuMZ[_0x23584e(0x2dd)]['Tiers'][_0x485fd6]!==undefined&&(this['_actorEquipSkillTierBaseSlots'][_0x349f38['actorId']()][_0x485fd6]=_0x48ebf1);}return this['_actorEquipSkillTierBaseSlots'][_0x349f38[_0x23584e(0x25e)]()][_0x2319ab];},DataManager[_0x3d4eb1(0x201)]=function(_0xe65ede,_0x590dd6){const _0x507854=_0x3d4eb1;this[_0x507854(0x232)]=this['_classEquipSkillTierBaseSlots']||{},this['_classEquipSkillTierBaseSlots'][_0xe65ede['id']]=this[_0x507854(0x232)][_0xe65ede['id']]||{};if(this['_classEquipSkillTierBaseSlots'][_0xe65ede['id']][_0x590dd6]!==undefined)return this['_classEquipSkillTierBaseSlots'][_0xe65ede['id']][_0x590dd6];const _0x2b1a32=VisuMZ[_0x507854(0x2dd)]['Tiers'][_0x590dd6][_0x507854(0x26d)];this[_0x507854(0x232)][_0xe65ede['id']][_0x590dd6]=_0x2b1a32;const _0x86098d=VisuMZ[_0x507854(0x2dd)][_0x507854(0x2a6)],_0x452425=_0xe65ede[_0x507854(0x2c3)]||'',_0x18812b=_0x452425['match'](_0x86098d['TypeBaseSlots']);if(_0x18812b)for(const _0x13e4e8 of _0x18812b){_0x13e4e8[_0x507854(0x24b)](_0x86098d[_0x507854(0x2a0)]);const _0x3c3c7d=String(RegExp['$1'])[_0x507854(0x203)]()[_0x507854(0x22b)](),_0xa7e72e=Number(RegExp['$2'])||0x1;VisuMZ['EquipBattleSkills'][_0x507854(0x1ee)][_0x3c3c7d]!==undefined&&(this[_0x507854(0x232)][_0xe65ede['id']][_0x3c3c7d]=_0xa7e72e);}return this[_0x507854(0x232)][_0xe65ede['id']][_0x590dd6];},DataManager[_0x3d4eb1(0x317)]=function(_0x3ee50d,_0x46635a){const _0x316181=_0x3d4eb1,_0x524aae=VisuMZ[_0x316181(0x2dd)][_0x316181(0x2c4)](_0x3ee50d,_0x316181(0x296));this[_0x316181(0x276)]=this[_0x316181(0x276)]||{},this[_0x316181(0x276)][_0x524aae]=this[_0x316181(0x276)][_0x524aae]||{};if(this[_0x316181(0x276)][_0x524aae][_0x46635a]!==undefined)return this[_0x316181(0x276)][_0x524aae][_0x46635a];this['_objEquipSkillTierBonusSlots'][_0x524aae][_0x46635a]=0x0;const _0x37d5f1=VisuMZ[_0x316181(0x2dd)][_0x316181(0x2a6)],_0x59c32b=_0x3ee50d[_0x316181(0x2c3)]||'',_0x5deb5a=_0x59c32b[_0x316181(0x24b)](_0x37d5f1[_0x316181(0x293)]);if(_0x5deb5a)for(const _0x3e78e4 of _0x5deb5a){_0x3e78e4[_0x316181(0x24b)](_0x37d5f1['tierBonusSlots']);const _0x97401=String(RegExp['$1'])[_0x316181(0x203)]()[_0x316181(0x22b)](),_0x1e4b8c=Number(RegExp['$2'])||0x0;this['_objEquipSkillTierBonusSlots'][_0x524aae][_0x97401]=_0x1e4b8c;}return this[_0x316181(0x276)][_0x524aae][_0x46635a];},VisuMZ[_0x3d4eb1(0x2dd)][_0x3d4eb1(0x2c4)]=function(_0x511151,_0x264cbe){const _0x2d7e73=_0x3d4eb1;if(VisuMZ['createKeyJS'])return VisuMZ[_0x2d7e73(0x2c4)](_0x511151,_0x264cbe);let _0x6cef47='';if($dataActors['includes'](_0x511151))_0x6cef47=_0x2d7e73(0x336)[_0x2d7e73(0x2ed)](_0x511151['id'],_0x264cbe);if($dataClasses[_0x2d7e73(0x256)](_0x511151))_0x6cef47=_0x2d7e73(0x2aa)[_0x2d7e73(0x2ed)](_0x511151['id'],_0x264cbe);if($dataSkills[_0x2d7e73(0x256)](_0x511151))_0x6cef47=_0x2d7e73(0x213)[_0x2d7e73(0x2ed)](_0x511151['id'],_0x264cbe);if($dataItems[_0x2d7e73(0x256)](_0x511151))_0x6cef47='Item-%1-%2'['format'](_0x511151['id'],_0x264cbe);if($dataWeapons[_0x2d7e73(0x256)](_0x511151))_0x6cef47=_0x2d7e73(0x2b2)['format'](_0x511151['id'],_0x264cbe);if($dataArmors['includes'](_0x511151))_0x6cef47=_0x2d7e73(0x2a3)['format'](_0x511151['id'],_0x264cbe);if($dataEnemies['includes'](_0x511151))_0x6cef47='Enemy-%1-%2'[_0x2d7e73(0x2ed)](_0x511151['id'],_0x264cbe);if($dataStates[_0x2d7e73(0x256)](_0x511151))_0x6cef47=_0x2d7e73(0x2f0)['format'](_0x511151['id'],_0x264cbe);return _0x6cef47;},DataManager['equipBattleSkillParamPlus']=function(_0x1b41e8,_0x1b7212){const _0x5c877c=_0x3d4eb1;if(!_0x1b41e8)return 0x0;this[_0x5c877c(0x2d4)]=this[_0x5c877c(0x2d4)]||{},this[_0x5c877c(0x2d4)][_0x1b41e8['id']]=this[_0x5c877c(0x2d4)][_0x1b41e8['id']]||{};if(this[_0x5c877c(0x2d4)][_0x1b41e8['id']][_0x1b7212]!==undefined)return this[_0x5c877c(0x2d4)][_0x1b41e8['id']][_0x1b7212];this[_0x5c877c(0x2d4)][_0x1b41e8['id']][_0x1b7212]=0x0;const _0x196a54=VisuMZ[_0x5c877c(0x2dd)][_0x5c877c(0x2a6)],_0x6adebe=_0x1b41e8['note']||'',_0x2ffb67=_0x6adebe[_0x5c877c(0x24b)](_0x196a54[_0x5c877c(0x229)]);if(_0x2ffb67)for(const _0x47feab of _0x2ffb67){_0x47feab['match'](_0x196a54[_0x5c877c(0x229)]);const _0x41f84a=String(RegExp['$1'])['toUpperCase']()[_0x5c877c(0x22b)](),_0x231f04=Number(RegExp['$2']),_0x1ab725=[_0x5c877c(0x29d),_0x5c877c(0x1f7),'ATK',_0x5c877c(0x2ef),'MAT',_0x5c877c(0x2d0),_0x5c877c(0x227),_0x5c877c(0x331)]['indexOf'](_0x41f84a);_0x1ab725>=0x0&&(this[_0x5c877c(0x2d4)][_0x1b41e8['id']][_0x1ab725]=_0x231f04);}return this['_equipBattleSkillParamPlus'][_0x1b41e8['id']][_0x1b7212];},DataManager['equipBattleSkillPassiveStates']=function(_0x1fb9ac){const _0x24f4fb=_0x3d4eb1;if(!_0x1fb9ac)return[];this[_0x24f4fb(0x32f)]=this[_0x24f4fb(0x32f)]||{};if(this[_0x24f4fb(0x32f)][_0x1fb9ac['id']]!==undefined)return this[_0x24f4fb(0x32f)][_0x1fb9ac['id']];this['_equipBattleSkillPassiveStates'][_0x1fb9ac['id']]=[];const _0x22974c=VisuMZ['EquipBattleSkills']['RegExp'],_0x3c63ab=_0x1fb9ac['note']||'';if(_0x3c63ab['match'](_0x22974c['equipPassives'])){const _0x344643=String(RegExp['$1'])[_0x24f4fb(0x2cc)](',')[_0x24f4fb(0x278)](_0x255be4=>_0x255be4[_0x24f4fb(0x22b)]());for(const _0x5ccb59 of _0x344643){const _0x3dcb14=/^\d+$/[_0x24f4fb(0x322)](_0x5ccb59);let _0x3f24e3=0x0;_0x3dcb14?_0x3f24e3=Number(_0x5ccb59):_0x3f24e3=DataManager[_0x24f4fb(0x30d)](_0x5ccb59),_0x3f24e3&&this['_equipBattleSkillPassiveStates'][_0x1fb9ac['id']][_0x24f4fb(0x20f)](_0x3f24e3);}}return this[_0x24f4fb(0x32f)][_0x1fb9ac['id']];},TextManager[_0x3d4eb1(0x2c0)]={'battleCommandName':VisuMZ[_0x3d4eb1(0x2dd)][_0x3d4eb1(0x274)][_0x3d4eb1(0x25d)]['battleCommandName']??_0x3d4eb1(0x2da),'skillCommandName':VisuMZ[_0x3d4eb1(0x2dd)][_0x3d4eb1(0x274)][_0x3d4eb1(0x25d)][_0x3d4eb1(0x31f)]??_0x3d4eb1(0x2d7),'helpWindow':{'emptyList':VisuMZ[_0x3d4eb1(0x2dd)]['Settings'][_0x3d4eb1(0x25d)][_0x3d4eb1(0x30b)]??'','emptyEquip':VisuMZ[_0x3d4eb1(0x2dd)][_0x3d4eb1(0x274)][_0x3d4eb1(0x25d)][_0x3d4eb1(0x240)]??''},'buttonAssist':{'unequip':VisuMZ[_0x3d4eb1(0x2dd)]['Settings'][_0x3d4eb1(0x25d)][_0x3d4eb1(0x222)]??''},'marker':{'fmt':VisuMZ[_0x3d4eb1(0x2dd)][_0x3d4eb1(0x274)][_0x3d4eb1(0x25d)][_0x3d4eb1(0x1f5)]??'%2%1%3','equipped':VisuMZ[_0x3d4eb1(0x2dd)]['Settings'][_0x3d4eb1(0x25d)][_0x3d4eb1(0x31b)]??_0x3d4eb1(0x2e1),'tierFmt':VisuMZ['EquipBattleSkills'][_0x3d4eb1(0x274)][_0x3d4eb1(0x25d)][_0x3d4eb1(0x297)]??_0x3d4eb1(0x277)},'skillTierFmt':VisuMZ['EquipBattleSkills']['Settings'][_0x3d4eb1(0x25d)][_0x3d4eb1(0x279)]??'%1/%2'},VisuMZ['EquipBattleSkills'][_0x3d4eb1(0x26e)]=ColorManager[_0x3d4eb1(0x311)],ColorManager[_0x3d4eb1(0x311)]=function(_0x1844bb){const _0x3b960b=_0x3d4eb1;return DataManager[_0x3b960b(0x2f9)](_0x1844bb)&&$gameSystem[_0x3b960b(0x275)]()?this[_0x3b960b(0x272)](_0x1844bb):VisuMZ['EquipBattleSkills'][_0x3b960b(0x26e)]['call'](this,_0x1844bb);},ColorManager['getEquipBattleSkillColor']=function(_0x53bec2){const _0xd8833d=_0x3d4eb1;if(!_0x53bec2)return this['normalColor']();return $gameSystem[_0xd8833d(0x275)]()?this[_0xd8833d(0x24f)](_0x53bec2):this[_0xd8833d(0x2a2)]();},ColorManager[_0x3d4eb1(0x24f)]=function(_0x368059){const _0x50e8b8=_0x3d4eb1,_0x1bf378=DataManager[_0x50e8b8(0x1e6)](_0x368059);return ColorManager[_0x50e8b8(0x238)](_0x1bf378[_0x50e8b8(0x1ff)]??0x0);},Game_System['EQUIP_BATTLE_SKILLS']={'tierSystem':VisuMZ[_0x3d4eb1(0x2dd)]['Settings']['enableTierSys']??!![]},Game_System[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x275)]=function(){const _0x18d723=_0x3d4eb1;return Game_System[_0x18d723(0x2c0)][_0x18d723(0x28c)];},Game_Actor[_0x3d4eb1(0x2c0)]={'defaultEnable':VisuMZ[_0x3d4eb1(0x2dd)][_0x3d4eb1(0x274)][_0x3d4eb1(0x1ea)][_0x3d4eb1(0x1ed)]??!![],'accessAllTypes':VisuMZ[_0x3d4eb1(0x2dd)][_0x3d4eb1(0x274)][_0x3d4eb1(0x1ea)][_0x3d4eb1(0x2f6)]??![],'defaultBase':VisuMZ['EquipBattleSkills']['Settings'][_0x3d4eb1(0x1ea)][_0x3d4eb1(0x26d)]??0x8,'absoluteMax':VisuMZ[_0x3d4eb1(0x2dd)][_0x3d4eb1(0x274)]['General'][_0x3d4eb1(0x2e6)]??0x10},Game_Actor[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x2f1)]=function(){const _0xc4fd65=_0x3d4eb1;if(DataManager['isBattleTest']())return![];const _0x19b9d3=VisuMZ[_0xc4fd65(0x2dd)][_0xc4fd65(0x2a6)],_0x416d66=this[_0xc4fd65(0x26b)]()[_0xc4fd65(0x2c3)]||'';if(_0x416d66['match'](_0x19b9d3[_0xc4fd65(0x30c)]))return!![];else{if(_0x416d66['match'](_0x19b9d3[_0xc4fd65(0x282)]))return![];}return Game_Actor[_0xc4fd65(0x2c0)][_0xc4fd65(0x1ed)];},Game_Actor['prototype'][_0x3d4eb1(0x263)]=function(){const _0x1cb2ff=_0x3d4eb1;if(this[_0x1cb2ff(0x269)]!==undefined)return this[_0x1cb2ff(0x269)];this[_0x1cb2ff(0x269)]=Game_Actor['EQUIP_BATTLE_SKILLS'][_0x1cb2ff(0x26d)];const _0x566b15=VisuMZ[_0x1cb2ff(0x2dd)][_0x1cb2ff(0x2a6)];if((this['actor']()[_0x1cb2ff(0x2c3)]||'')[_0x1cb2ff(0x24b)](_0x566b15[_0x1cb2ff(0x281)]))this['_maxBattleSkills']=Number(RegExp['$1']);else(this['currentClass']()[_0x1cb2ff(0x2c3)]||'')[_0x1cb2ff(0x24b)](_0x566b15['BaseSlots'])&&(this[_0x1cb2ff(0x269)]=Number(RegExp['$1']));for(const _0x5edc5a of this[_0x1cb2ff(0x259)]()){if(!_0x5edc5a)continue;(_0x5edc5a[_0x1cb2ff(0x2c3)]||'')[_0x1cb2ff(0x24b)](_0x566b15[_0x1cb2ff(0x313)])&&(this[_0x1cb2ff(0x269)]+=Number(RegExp['$1']));}this[_0x1cb2ff(0x269)]+=this[_0x1cb2ff(0x267)]();const _0x5c9b1e=Game_Actor['EQUIP_BATTLE_SKILLS']['absoluteMax'];return this[_0x1cb2ff(0x269)]=this[_0x1cb2ff(0x269)][_0x1cb2ff(0x2db)](0x1,_0x5c9b1e),this[_0x1cb2ff(0x269)];},Game_Actor['prototype'][_0x3d4eb1(0x267)]=function(){const _0x1c4a8a=_0x3d4eb1;return this[_0x1c4a8a(0x236)]=this[_0x1c4a8a(0x236)]||0x0,this[_0x1c4a8a(0x236)];},Game_Actor[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x211)]=function(_0x47f0b1){const _0x489113=_0x3d4eb1;if($gameParty[_0x489113(0x309)]())return;this['_maxBattleSkillsPlus']=this[_0x489113(0x236)]||0x0,this['_maxBattleSkillsPlus']=_0x47f0b1,this[_0x489113(0x269)]=undefined,this[_0x489113(0x2fc)](),this[_0x489113(0x260)]();},Game_Actor[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x1e4)]=function(_0x142129){const _0x442742=_0x3d4eb1,_0xfece21=this[_0x442742(0x267)]();this[_0x442742(0x211)](_0xfece21+_0x142129);},VisuMZ[_0x3d4eb1(0x2dd)]['Game_Actor_refresh']=Game_Actor['prototype'][_0x3d4eb1(0x260)],Game_Actor[_0x3d4eb1(0x1e9)]['refresh']=function(){const _0x3d4502=_0x3d4eb1;!$gameParty[_0x3d4502(0x309)]()&&(this['_maxBattleSkills']=undefined,this[_0x3d4502(0x2fc)]()),VisuMZ[_0x3d4502(0x2dd)][_0x3d4502(0x1eb)][_0x3d4502(0x32c)](this);},VisuMZ[_0x3d4eb1(0x2dd)][_0x3d4eb1(0x27d)]=Game_Battler[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x266)],Game_Battler[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x266)]=function(){const _0x23ea5c=_0x3d4eb1;VisuMZ['EquipBattleSkills']['Game_Battler_onBattleEnd']['call'](this),this[_0x23ea5c(0x2bf)]()&&(this['_maxBattleSkills']=undefined,this['clearUnequippableBattleSkills']());},VisuMZ['EquipBattleSkills']['Game_Actor_learnSkill']=Game_Actor[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x271)],Game_Actor[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x271)]=function(_0x474e4e){const _0x57d190=_0x3d4eb1;VisuMZ[_0x57d190(0x2dd)][_0x57d190(0x325)][_0x57d190(0x32c)](this,_0x474e4e);const _0x23d885=$dataSkills[_0x474e4e];this[_0x57d190(0x2b4)](_0x23d885)&&this[_0x57d190(0x29a)](_0x474e4e,-0x1);},VisuMZ['EquipBattleSkills'][_0x3d4eb1(0x2cf)]=Game_Actor[_0x3d4eb1(0x1e9)]['forgetSkill'],Game_Actor['prototype'][_0x3d4eb1(0x2fd)]=function(_0x52c941){const _0x4464f6=_0x3d4eb1;VisuMZ[_0x4464f6(0x2dd)]['Game_Actor_forgetSkill'][_0x4464f6(0x32c)](this,_0x52c941),this['unequipBattleSkill'](_0x52c941);},VisuMZ['EquipBattleSkills'][_0x3d4eb1(0x2e4)]=Game_Actor[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x304)],Game_Actor[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x304)]=function(){const _0x381453=_0x3d4eb1;this[_0x381453(0x32e)](),VisuMZ[_0x381453(0x2dd)][_0x381453(0x2e4)][_0x381453(0x32c)](this);},Game_Actor[_0x3d4eb1(0x1e9)]['clearEquipBattleSkills']=function(){const _0x44bf2c=_0x3d4eb1;this[_0x44bf2c(0x28d)]=[];let _0x3834c0=this['maxBattleSkills']();while(_0x3834c0--)this[_0x44bf2c(0x28d)][_0x44bf2c(0x20f)](0x0);},Game_Actor[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x1f9)]=function(){const _0x5c2db4=_0x3d4eb1;if(DataManager[_0x5c2db4(0x200)]())return[];if(!this[_0x5c2db4(0x2f1)]())return[];if(this[_0x5c2db4(0x28d)]===undefined)this['clearEquipBattleSkills']();while(this[_0x5c2db4(0x28d)][_0x5c2db4(0x2ec)]!==this[_0x5c2db4(0x263)]()){this['_battleSkill_IDs'][_0x5c2db4(0x2ec)]>this[_0x5c2db4(0x263)]()?this[_0x5c2db4(0x28d)]['pop']():this[_0x5c2db4(0x28d)][_0x5c2db4(0x20f)](0x0);}return this[_0x5c2db4(0x28d)][_0x5c2db4(0x278)](_0x321810=>$dataSkills[_0x321810]);},VisuMZ[_0x3d4eb1(0x2dd)]['Game_Actor_usableSkills']=Game_Actor['prototype'][_0x3d4eb1(0x1f0)],Game_Actor[_0x3d4eb1(0x1e9)]['usableSkills']=function(){const _0x3c44e9=_0x3d4eb1;return $gameParty[_0x3c44e9(0x309)]()?this[_0x3c44e9(0x329)]()['filter'](_0x3b438d=>this[_0x3c44e9(0x33b)](_0x3b438d)):VisuMZ[_0x3c44e9(0x2dd)][_0x3c44e9(0x22c)][_0x3c44e9(0x32c)](this);},VisuMZ[_0x3d4eb1(0x2dd)][_0x3d4eb1(0x20b)]=Game_Actor[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x33b)],Game_Actor[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x33b)]=function(_0x57108d){const _0x2c6dc6=_0x3d4eb1;if(!VisuMZ[_0x2c6dc6(0x2dd)]['Game_Actor_isSkillUsableForAutoBattle'][_0x2c6dc6(0x32c)](this,_0x57108d))return![];if(!this[_0x2c6dc6(0x2f1)]())return![];if(this[_0x2c6dc6(0x1f9)]()['includes'](_0x57108d))return!![];const _0x5971cf=this[_0x2c6dc6(0x23f)](),_0x36508b=DataManager[_0x2c6dc6(0x1e7)](_0x57108d);for(const _0x280e19 of _0x5971cf){if(_0x280e19[_0x2c6dc6(0x24b)](/SKILL: (\d+)/i)){const _0x556473=Number(RegExp['$1']);if(_0x57108d['id']===_0x556473)return!![];}if(_0x280e19[_0x2c6dc6(0x24b)](/SKILL: (.*)/i)){const _0x785783=DataManager[_0x2c6dc6(0x1e1)](RegExp['$1']);if(_0x57108d['id']===_0x785783)return!![];}if(_0x280e19['match'](/STYPE: (\d+)/i)){const _0x23e41a=Number(RegExp['$1']);if(_0x36508b[_0x2c6dc6(0x256)](_0x23e41a))return!![];}if(_0x280e19[_0x2c6dc6(0x24b)](/STYPE: (.*)/i)){const _0x3a287b=DataManager['getStypeIdWithName'](RegExp['$1']);if(_0x36508b[_0x2c6dc6(0x256)](_0x3a287b))return!![];}}return![];},Game_Actor[_0x3d4eb1(0x1e9)]['clearUnequippableBattleSkills']=function(){const _0x5589a2=_0x3d4eb1;if(this['_battleSkill_IDs']===undefined)this['clearEquipBattleSkills']();while(this['maxBattleSkills']()<this['_battleSkill_IDs'][_0x5589a2(0x2ec)]){this['_battleSkill_IDs'][_0x5589a2(0x1f8)]();}for(const _0x4773d8 of this[_0x5589a2(0x28d)][_0x5589a2(0x204)]()[_0x5589a2(0x23a)]()){if(_0x4773d8<=0x0)continue;const _0x27df0f=$dataSkills[_0x4773d8];if(!this[_0x5589a2(0x2b4)](_0x27df0f)){const _0x154701=this[_0x5589a2(0x28d)][_0x5589a2(0x251)](_0x4773d8);this[_0x5589a2(0x28d)][_0x154701]=0x0;}}},Game_Actor[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x2b4)]=function(_0xe642db,_0x1d4001){const _0x3301c1=_0x3d4eb1;if(!_0xe642db)return![];if(!this[_0x3301c1(0x329)]()[_0x3301c1(0x256)](_0xe642db))return![];if(this[_0x3301c1(0x234)](_0xe642db))return![];const _0x54c62a=VisuMZ[_0x3301c1(0x2dd)][_0x3301c1(0x2a6)],_0x46b9e6=_0xe642db[_0x3301c1(0x2c3)]||'';if($gameSystem[_0x3301c1(0x275)]()){const _0x899d52=DataManager[_0x3301c1(0x303)](_0xe642db);if(_0x899d52!==''){const _0x562c79=DataManager[_0x3301c1(0x303)](_0x1d4001);if(!this[_0x3301c1(0x1f9)]()['includes'](_0xe642db)&&_0x899d52!==_0x562c79){const _0x22e8b8=this[_0x3301c1(0x339)](_0x899d52),_0x24d7f8=this[_0x3301c1(0x230)](_0x899d52);if(_0x22e8b8>=_0x24d7f8)return![];}}}const _0x459e38=this[_0x3301c1(0x27a)](),_0x42cc8c=DataManager['getSkillTypes'](_0xe642db);if(_0x46b9e6['match'](_0x54c62a[_0x3301c1(0x28b)]))return![];else{if(_0x46b9e6[_0x3301c1(0x24b)](_0x54c62a[_0x3301c1(0x295)]))return![];else{if(_0x46b9e6[_0x3301c1(0x24b)](_0x54c62a['alwaysEquip']))return!![];else{if(_0x46b9e6[_0x3301c1(0x24b)](_0x54c62a[_0x3301c1(0x249)]))return _0x459e38[_0x3301c1(0x2be)](_0xa9bf32=>_0x42cc8c[_0x3301c1(0x256)](_0xa9bf32));}}}if(Game_Actor[_0x3301c1(0x2c0)][_0x3301c1(0x2f6)])return!![];return _0x459e38[_0x3301c1(0x2be)](_0x2d489a=>_0x42cc8c['includes'](_0x2d489a));},Game_Actor[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x29a)]=function(_0x56b59e,_0x4a7582){const _0x365b3f=_0x3d4eb1;if(this['_battleSkill_IDs']===undefined)this[_0x365b3f(0x32e)]();_0x4a7582<0x0&&(_0x4a7582=this[_0x365b3f(0x28d)][_0x365b3f(0x251)](0x0));if(_0x4a7582<0x0)return;if(this[_0x365b3f(0x28d)][_0x365b3f(0x256)](_0x56b59e)){const _0x291cc4=this[_0x365b3f(0x28d)]['indexOf'](_0x56b59e);this[_0x365b3f(0x28d)][_0x291cc4]=0x0;}this['_battleSkill_IDs'][_0x4a7582]=_0x56b59e;if(!this[_0x365b3f(0x1e3)]&&Imported[_0x365b3f(0x341)]){const _0x3e103e=JsonEx['makeDeepCopy'](this);_0x3e103e[_0x365b3f(0x1e3)]=!![],this[_0x365b3f(0x260)](),this[_0x365b3f(0x29c)](_0x3e103e);}else this[_0x365b3f(0x260)]();},Game_Actor[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x205)]=function(_0x56121f){const _0x4e558=_0x3d4eb1;if(this[_0x4e558(0x28d)]===undefined)this[_0x4e558(0x32e)]();const _0x340041=this[_0x4e558(0x28d)][_0x4e558(0x251)](_0x56121f);if(_0x340041<0x0)return;this[_0x4e558(0x28d)][_0x340041]=0x0,this['refresh']();},Game_Actor['prototype']['maxEquipSkillTierSlots']=function(_0x15182b){const _0x1c4896=_0x3d4eb1;_0x15182b=_0x15182b[_0x1c4896(0x203)]()[_0x1c4896(0x22b)]();if(VisuMZ['EquipBattleSkills'][_0x1c4896(0x1ee)][_0x15182b]===undefined)return Number[_0x1c4896(0x29f)];const _0x1de891=VisuMZ[_0x1c4896(0x2dd)]['Tiers'][_0x15182b],_0x4a4561=DataManager[_0x1c4896(0x23c)](this,_0x15182b),_0x31ce7e=DataManager[_0x1c4896(0x201)](this[_0x1c4896(0x26b)](),_0x15182b),_0xc226c=_0x4a4561>0x0?_0x4a4561:_0x31ce7e,_0x316204=this['maxEquipSkillTierSlotsBonus'](_0x15182b),_0x134372=this['maxEquipSkillTierSlotsPlus'](_0x15182b);return(_0xc226c+_0x316204+_0x134372)[_0x1c4896(0x2db)](0x1,_0x1de891[_0x1c4896(0x2e6)]);},Game_Actor[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x2dc)]=function(_0x4db9d9){const _0x1ab880=_0x3d4eb1;let _0xb5f6e1=0x0;for(const _0x1c8fd3 of this[_0x1ab880(0x259)]()){if(!_0x1c8fd3)continue;_0xb5f6e1+=DataManager[_0x1ab880(0x317)](_0x1c8fd3,_0x4db9d9);}return _0xb5f6e1;},Game_Actor[_0x3d4eb1(0x1e9)]['maxEquipSkillTierSlotsPlus']=function(_0x1ba20f){const _0x5c7860=_0x3d4eb1;return _0x1ba20f=_0x1ba20f[_0x5c7860(0x203)]()['trim'](),this[_0x5c7860(0x21a)]=this['_maxEquipSkillTierSlotsPlus']||{},this[_0x5c7860(0x21a)][_0x1ba20f]=this[_0x5c7860(0x21a)][_0x1ba20f]||0x0,this[_0x5c7860(0x21a)][_0x1ba20f];},Game_Actor[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x206)]=function(_0x23ae20,_0x1088b8){const _0xb9467=_0x3d4eb1;if($gameParty['inBattle']())return;_0x23ae20=_0x23ae20[_0xb9467(0x203)]()[_0xb9467(0x22b)](),this['_maxEquipSkillTierSlotsPlus']=this[_0xb9467(0x21a)]||{},this['_maxEquipSkillTierSlotsPlus'][_0x23ae20]=_0x1088b8,this[_0xb9467(0x2fc)](),this['refresh']();},Game_Actor[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x333)]=function(_0x3316ae,_0x5e637c){const _0x31cb41=_0x3d4eb1,_0x5dfdfd=this[_0x31cb41(0x20e)](_0x3316ae);this[_0x31cb41(0x206)](_0x3316ae,_0x5dfdfd+_0x5e637c);},Game_Actor[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x339)]=function(_0x165aee){const _0x4db7fa=_0x3d4eb1;_0x165aee=_0x165aee['toLowerCase']()[_0x4db7fa(0x22b)]();if(VisuMZ[_0x4db7fa(0x2dd)][_0x4db7fa(0x1ee)][_0x165aee]===undefined)return 0x0;let _0x3b0a0e=0x0;for(const _0x9a9151 of this[_0x4db7fa(0x1f9)]()){if(!_0x9a9151)continue;if(DataManager[_0x4db7fa(0x303)](_0x9a9151)===_0x165aee)_0x3b0a0e++;}return _0x3b0a0e;},VisuMZ[_0x3d4eb1(0x2dd)]['Game_Actor_paramPlus']=Game_Actor[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x27f)],Game_Actor['prototype']['paramPlus']=function(_0x31d59c){const _0x23e1f8=_0x3d4eb1;let _0x44bdc1=VisuMZ[_0x23e1f8(0x2dd)]['Game_Actor_paramPlus'][_0x23e1f8(0x32c)](this,_0x31d59c);return this[_0x23e1f8(0x2f1)]()&&(_0x44bdc1+=this['equipBattleSkillsParamPlus'](_0x31d59c)),_0x44bdc1;},Game_Actor[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x2b5)]=function(_0x47724f){const _0x4a4145=_0x3d4eb1;let _0x34a3d1=0x0;for(const _0x21e674 of this['battleSkills']()){if(!_0x21e674)continue;_0x34a3d1+=DataManager[_0x4a4145(0x23e)](_0x21e674,_0x47724f);}return _0x34a3d1;},VisuMZ['EquipBattleSkills'][_0x3d4eb1(0x2bc)]=Game_BattlerBase[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x301)],Game_BattlerBase[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x301)]=function(){const _0x4d658d=_0x3d4eb1;VisuMZ[_0x4d658d(0x2dd)]['Game_BattlerBase_addPassiveStatesFromOtherPlugins'][_0x4d658d(0x32c)](this),this[_0x4d658d(0x2e2)]();},Game_BattlerBase[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x2e2)]=function(){},Game_Actor[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x2e2)]=function(){const _0x467e0c=_0x3d4eb1;if(!this[_0x467e0c(0x2f1)]())return;const _0x56f42f=this[_0x467e0c(0x261)][_0x467e0c(0x1f6)];for(const _0x15579a of this['battleSkills']()){if(!_0x15579a)continue;if(DataManager['isToggleSkill']&&DataManager['isToggleSkill'](_0x15579a)){if(!this['isSkillToggled'](_0x15579a))continue;}const _0x34590a=DataManager[_0x467e0c(0x2d3)](_0x15579a);for(const _0x218f9 of _0x34590a){_0x56f42f[_0x467e0c(0x20f)](_0x218f9);}}},VisuMZ[_0x3d4eb1(0x2dd)][_0x3d4eb1(0x26a)]=Game_Actor[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x284)],Game_Actor[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x284)]=function(){const _0x53da58=_0x3d4eb1;if(BattleManager[_0x53da58(0x2d1)]&&!ConfigManager[_0x53da58(0x334)])return this[_0x53da58(0x316)]();else return this[_0x53da58(0x2f1)]()?this[_0x53da58(0x2c5)]():VisuMZ[_0x53da58(0x2dd)][_0x53da58(0x26a)][_0x53da58(0x32c)](this);},Game_Actor[_0x3d4eb1(0x1e9)]['makeActionListForEquipBattleSkills']=function(){const _0xb32403=_0x3d4eb1,_0x3946da=[],_0x51d25f=new Game_Action(this);_0x51d25f[_0xb32403(0x337)](),_0x3946da[_0xb32403(0x20f)](_0x51d25f);let _0x26f47d=this[_0xb32403(0x1f9)]();_0x26f47d=_0x26f47d[_0xb32403(0x215)](_0x170352=>this['canUse'](_0x170352));for(const _0x4a4b5c of _0x26f47d){const _0x430866=new Game_Action(this);_0x430866[_0xb32403(0x233)](_0x4a4b5c['id']),_0x3946da[_0xb32403(0x20f)](_0x430866);}return _0x3946da;},VisuMZ[_0x3d4eb1(0x2dd)][_0x3d4eb1(0x2bb)]=Scene_Skill[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x318)],Scene_Skill[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x318)]=function(){const _0x11bb60=_0x3d4eb1;VisuMZ[_0x11bb60(0x2dd)][_0x11bb60(0x2bb)][_0x11bb60(0x32c)](this),this['createEquipBattleSkillWindow']();},Scene_Skill[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x1f4)]=function(){const _0xc72c7c=_0x3d4eb1,_0x57756b=this['itemWindowRect'](),_0x41f1e8=new Window_EquipBattleSkillList(_0x57756b);_0x41f1e8['hide'](),this['addWindow'](_0x41f1e8),this[_0xc72c7c(0x212)]=_0x41f1e8,_0x41f1e8[_0xc72c7c(0x2f5)]('ok',this[_0xc72c7c(0x324)][_0xc72c7c(0x24d)](this)),_0x41f1e8['setHandler'](_0xc72c7c(0x27b),this[_0xc72c7c(0x247)][_0xc72c7c(0x24d)](this)),_0x41f1e8[_0xc72c7c(0x235)](this[_0xc72c7c(0x338)]);if(this[_0xc72c7c(0x207)])_0x41f1e8['setStatusWindow'](this[_0xc72c7c(0x207)]);_0x41f1e8['setBackgroundType'](Window_EquipBattleSkillList[_0xc72c7c(0x2f4)]);},VisuMZ['EquipBattleSkills'][_0x3d4eb1(0x330)]=Scene_Skill[_0x3d4eb1(0x1e9)]['onItemOk'],Scene_Skill[_0x3d4eb1(0x1e9)]['onItemOk']=function(){const _0x2c08ff=_0x3d4eb1;this[_0x2c08ff(0x210)]['isEquipBattleSkillMode']()?this[_0x2c08ff(0x33a)]():VisuMZ[_0x2c08ff(0x2dd)][_0x2c08ff(0x330)][_0x2c08ff(0x32c)](this);},Scene_Skill['prototype']['startEquipBattleSkills']=function(){const _0x4994cf=_0x3d4eb1;this[_0x4994cf(0x210)]['hide'](),this['_itemWindow']['deactivate'](),this['_equipBattleSkillsWindow'][_0x4994cf(0x1ef)](this[_0x4994cf(0x253)]()),this[_0x4994cf(0x212)][_0x4994cf(0x328)](this[_0x4994cf(0x210)][_0x4994cf(0x302)]()),this[_0x4994cf(0x212)]['refresh'](),this[_0x4994cf(0x212)][_0x4994cf(0x2ae)](),this[_0x4994cf(0x212)][_0x4994cf(0x2e5)](),this[_0x4994cf(0x212)]['selectLast']();},Scene_Skill[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x2fe)]=function(){const _0x16acf2=_0x3d4eb1;this[_0x16acf2(0x210)][_0x16acf2(0x2e5)](),this['_itemWindow'][_0x16acf2(0x2ae)](),this[_0x16acf2(0x212)][_0x16acf2(0x2cd)](),this['_equipBattleSkillsWindow'][_0x16acf2(0x27c)](),this[_0x16acf2(0x212)][_0x16acf2(0x239)]();},Scene_Skill[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x29e)]=function(){const _0x4d8f85=_0x3d4eb1,_0x30a1d1=this[_0x4d8f85(0x212)][_0x4d8f85(0x302)](),_0x4d9d26=this['_itemWindow'][_0x4d8f85(0x216)]();this[_0x4d8f85(0x299)][_0x4d8f85(0x29a)](_0x30a1d1?_0x30a1d1['id']:0x0,_0x4d9d26),this[_0x4d8f85(0x210)]['refresh'](),this[_0x4d8f85(0x2f8)]['refresh']();},Scene_Skill[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x324)]=function(){const _0x1afeda=_0x3d4eb1;this[_0x1afeda(0x29e)](),this[_0x1afeda(0x2fe)]();},Scene_Skill['prototype']['onEquipBattleSkillsCancel']=function(){const _0x33c5d7=_0x3d4eb1;this[_0x33c5d7(0x2fe)]();},VisuMZ[_0x3d4eb1(0x2dd)][_0x3d4eb1(0x312)]=Scene_Skill['prototype']['buttonAssistText3'],Scene_Skill['prototype']['buttonAssistText3']=function(){const _0x123e8b=_0x3d4eb1;return this[_0x123e8b(0x210)]&&this['_itemWindow'][_0x123e8b(0x2a1)]&&this[_0x123e8b(0x210)][_0x123e8b(0x246)]()?TextManager[_0x123e8b(0x2c0)][_0x123e8b(0x2d2)][_0x123e8b(0x2ba)]:VisuMZ[_0x123e8b(0x2dd)][_0x123e8b(0x312)][_0x123e8b(0x32c)](this);},Window_Base['EQUIP_BATTLE_SKILLS']={'emptyIcon':VisuMZ['EquipBattleSkills'][_0x3d4eb1(0x274)][_0x3d4eb1(0x2ee)][_0x3d4eb1(0x2f7)]??0x133,'emptyName':VisuMZ[_0x3d4eb1(0x2dd)][_0x3d4eb1(0x274)][_0x3d4eb1(0x2ee)]['emptyName']??_0x3d4eb1(0x288),'emptyColor':VisuMZ[_0x3d4eb1(0x2dd)]['Settings'][_0x3d4eb1(0x2ee)][_0x3d4eb1(0x1ec)]??0x7,'tierNormalColor':VisuMZ[_0x3d4eb1(0x2dd)][_0x3d4eb1(0x274)][_0x3d4eb1(0x2ee)][_0x3d4eb1(0x1fb)]??0x0,'tierFullColor':VisuMZ[_0x3d4eb1(0x2dd)][_0x3d4eb1(0x274)][_0x3d4eb1(0x2ee)][_0x3d4eb1(0x2ac)]??0x11,'tierFontSize':VisuMZ['EquipBattleSkills'][_0x3d4eb1(0x274)][_0x3d4eb1(0x2ee)]['tierFontSize']??0x14},Window_Base[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x2bd)]=function(_0x1fc788,_0x1916e9,_0x234274){const _0x414db1=_0x3d4eb1,_0x576c32=ImageManager[_0x414db1(0x25f)]||0x20,_0x36c456=_0x576c32-ImageManager[_0x414db1(0x2ff)],_0x23f1d8=_0x576c32+0x4,_0x4424be=_0x1916e9+(this['lineHeight']()-ImageManager[_0x414db1(0x327)])/0x2,_0x424939=Math[_0x414db1(0x33c)](0x0,_0x234274-_0x23f1d8),_0x1417fa=ColorManager['getColor'](Window_Base[_0x414db1(0x2c0)][_0x414db1(0x1ec)]);this['changeTextColor'](_0x1417fa);const _0x39ba60=Window_Base[_0x414db1(0x2c0)][_0x414db1(0x2f7)];this[_0x414db1(0x283)](_0x39ba60,_0x1fc788+Math[_0x414db1(0x2e3)](_0x36c456/0x2),_0x4424be);const _0x406508=Window_Base['EQUIP_BATTLE_SKILLS'][_0x414db1(0x314)];this['drawText'](_0x406508,_0x1fc788+_0x23f1d8,_0x1916e9,_0x424939),this[_0x414db1(0x202)]();},Window_Base[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x20d)]=function(_0x18fe2c,_0x2965ed,_0x121cf0,_0xb0dc96){const _0x2304d6=_0x3d4eb1;if(!_0x18fe2c)return;const _0x35c1df=ImageManager[_0x2304d6(0x25f)]||0x20,_0x85e4ab=_0x35c1df-ImageManager[_0x2304d6(0x2ff)],_0xc88b66=_0x35c1df+0x4,_0x55243b=_0x121cf0+(this['lineHeight']()-ImageManager[_0x2304d6(0x327)])/0x2,_0x19af46=Math['max'](0x0,_0xb0dc96-_0xc88b66);this[_0x2304d6(0x22e)](ColorManager[_0x2304d6(0x272)](_0x18fe2c)),this[_0x2304d6(0x283)](_0x18fe2c['iconIndex'],_0x2965ed+Math[_0x2304d6(0x2e3)](_0x85e4ab/0x2),_0x55243b),this[_0x2304d6(0x2a7)](_0x18fe2c['name'],_0x2965ed+_0xc88b66,_0x121cf0,_0x19af46),this[_0x2304d6(0x202)]();},Window_Base[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x343)]=function(_0x1a5662,_0x2d7d52,_0x3728d8,_0x3b7fc1,_0x8b0055){const _0x30c629=_0x3d4eb1,_0x36e369=VisuMZ[_0x30c629(0x2dd)]['Tiers'][_0x2d7d52];if(!_0x36e369)return;if(!_0x1a5662)return;this[_0x30c629(0x285)]();const _0x35e608=_0x36e369[_0x30c629(0x32b)]||0x0;if(_0x35e608>0x0){const _0x22377e=ImageManager[_0x30c629(0x25f)]||0x20,_0x548dd5=_0x22377e-ImageManager[_0x30c629(0x2ff)],_0x57e37f=_0x22377e+0x4,_0x4504f3=_0x3b7fc1+(this['lineHeight']()-ImageManager[_0x30c629(0x327)])/0x2;this[_0x30c629(0x283)](_0x35e608,_0x3728d8+Math['ceil'](_0x548dd5/0x2),_0x4504f3),_0x3728d8+=_0x57e37f,_0x8b0055-=_0x57e37f;}const _0x39f2a3=_0x36e369[_0x30c629(0x2e0)],_0x5a995d=ColorManager[_0x30c629(0x238)](_0x36e369[_0x30c629(0x1ff)]??0x0);this['changeTextColor'](_0x5a995d),this[_0x30c629(0x2a7)](_0x39f2a3,_0x3728d8,_0x3b7fc1,_0x8b0055,_0x30c629(0x252));const _0x84eb29=_0x1a5662[_0x30c629(0x339)](_0x2d7d52),_0x3fc206=_0x1a5662[_0x30c629(0x230)](_0x2d7d52),_0x311b6a=TextManager[_0x30c629(0x2c0)][_0x30c629(0x25c)],_0x1531b4=_0x311b6a['format'](_0x84eb29,_0x3fc206);if(_0x84eb29>=_0x3fc206){const _0x16583c=ColorManager[_0x30c629(0x238)](Window_Base[_0x30c629(0x2c0)][_0x30c629(0x2ac)]);this[_0x30c629(0x22e)](_0x16583c);}else{const _0x4a4a3c=ColorManager['getColor'](Window_Base[_0x30c629(0x2c0)]['tierNormalColor']);this[_0x30c629(0x22e)](_0x4a4a3c);}this[_0x30c629(0x305)]['fontSize']=Window_Base[_0x30c629(0x2c0)]['tierFontSize'],this['drawText'](_0x1531b4,_0x3728d8,_0x3b7fc1,_0x8b0055,_0x30c629(0x28f)),this['resetFontSettings']();},VisuMZ[_0x3d4eb1(0x2dd)]['Window_Selectable_processCursorMove']=Window_Selectable[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x321)],Window_Selectable[_0x3d4eb1(0x1e9)]['processCursorMove']=function(){const _0x43a3a1=_0x3d4eb1;if(this[_0x43a3a1(0x2d5)]===Window_SkillList&&this[_0x43a3a1(0x246)]()&&this[_0x43a3a1(0x1e2)]()){if(Input[_0x43a3a1(0x228)](_0x43a3a1(0x220))){this[_0x43a3a1(0x214)]();return;}}VisuMZ[_0x43a3a1(0x2dd)][_0x43a3a1(0x2ad)][_0x43a3a1(0x32c)](this);},Window_SkillType[_0x3d4eb1(0x2c0)]={'top':VisuMZ[_0x3d4eb1(0x2dd)][_0x3d4eb1(0x274)][_0x3d4eb1(0x2ee)][_0x3d4eb1(0x315)]??!![],'icon':VisuMZ['EquipBattleSkills'][_0x3d4eb1(0x274)]['Window']['commandIcon']??0x138},VisuMZ[_0x3d4eb1(0x2dd)][_0x3d4eb1(0x308)]=Window_SkillType[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x208)],Window_SkillType[_0x3d4eb1(0x1e9)]['makeCommandList']=function(){const _0x45b6ab=_0x3d4eb1,_0x1d97d8=Window_SkillType[_0x45b6ab(0x2c0)][_0x45b6ab(0x268)];if(_0x1d97d8)this[_0x45b6ab(0x32a)]();VisuMZ[_0x45b6ab(0x2dd)][_0x45b6ab(0x308)]['call'](this);if(!_0x1d97d8)this[_0x45b6ab(0x32a)]();},Window_SkillType[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x32a)]=function(){const _0x3e0800=_0x3d4eb1;if(!this[_0x3e0800(0x299)])return;if(!this[_0x3e0800(0x299)][_0x3e0800(0x2f1)]())return;const _0x3a9e93=this[_0x3e0800(0x273)]();this[_0x3e0800(0x2ab)](_0x3a9e93,'skill',!![],_0x3e0800(0x23d));},Window_SkillType[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x273)]=function(){const _0x54ed5f=_0x3d4eb1;let _0x1b699c=TextManager[_0x54ed5f(0x2c0)][_0x54ed5f(0x31f)];if(_0x1b699c[_0x54ed5f(0x24b)](/\\I\[(\d+)\]/i))return _0x1b699c;if(this[_0x54ed5f(0x2c8)]()===_0x54ed5f(0x286))return _0x1b699c;const _0x81d57b=Window_SkillType[_0x54ed5f(0x2c0)][_0x54ed5f(0x25b)];return _0x54ed5f(0x340)[_0x54ed5f(0x2ed)](_0x81d57b,_0x1b699c);},Window_SkillStatus[_0x3d4eb1(0x2c0)]={'drawTiers':VisuMZ[_0x3d4eb1(0x2dd)][_0x3d4eb1(0x274)][_0x3d4eb1(0x2ee)][_0x3d4eb1(0x2a9)]??!![]},VisuMZ[_0x3d4eb1(0x2dd)][_0x3d4eb1(0x289)]=Window_SkillStatus['prototype'][_0x3d4eb1(0x260)],Window_SkillStatus[_0x3d4eb1(0x1e9)]['refresh']=function(){const _0xf45ca6=_0x3d4eb1;this[_0xf45ca6(0x285)](),this['isEquipBattleSkillMode']()&&$gameSystem[_0xf45ca6(0x275)]()?this[_0xf45ca6(0x2a8)]():VisuMZ['EquipBattleSkills']['Window_SkillStatus_refresh'][_0xf45ca6(0x32c)](this);},Window_SkillStatus[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x246)]=function(){const _0x733120=_0x3d4eb1;if(!Window_SkillStatus[_0x733120(0x2c0)][_0x733120(0x2c1)])return![];const _0x548a3f=SceneManager['_scene'];if(!_0x548a3f)return![];const _0x56b831=_0x548a3f['_itemWindow'];if(!_0x56b831)return![];return _0x56b831['isEquipBattleSkillMode']&&_0x56b831['isEquipBattleSkillMode']();},Window_SkillStatus[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x2a8)]=function(){const _0x45e1db=_0x3d4eb1;if(!this[_0x45e1db(0x299)])return;Window_StatusBase[_0x45e1db(0x1e9)][_0x45e1db(0x260)]['call'](this);if(VisuMZ[_0x45e1db(0x2dd)][_0x45e1db(0x274)][_0x45e1db(0x2ee)][_0x45e1db(0x335)])return VisuMZ[_0x45e1db(0x2dd)][_0x45e1db(0x274)][_0x45e1db(0x2ee)][_0x45e1db(0x335)][_0x45e1db(0x32c)](this);const _0x3a7828=this[_0x45e1db(0x2b0)]()/0x2,_0xc17e81=this[_0x45e1db(0x33e)],_0x3b05bb=_0xc17e81/0x2-this['lineHeight']()*1.5;this[_0x45e1db(0x2a5)](this[_0x45e1db(0x299)],_0x3a7828+0x1,0x0,0x90,_0xc17e81),this[_0x45e1db(0x255)](this['_actor'],_0x3a7828+0xb4,_0x3b05bb);let _0x4fc5e2=this[_0x45e1db(0x2b0)]()/0x2+0xb4+0xb4+0xb4,_0x450b11=this[_0x45e1db(0x2c7)]-_0x4fc5e2-0x2;if(_0x450b11<0x12c)return;const _0x42d764=DataManager['getEquipSkillTiers'](),_0x2228b7=Math[_0x45e1db(0x1e8)](this[_0x45e1db(0x33e)]/this[_0x45e1db(0x307)]()),_0x55a516=Math[_0x45e1db(0x2e3)](_0x42d764[_0x45e1db(0x2ec)]/_0x2228b7);let _0x5f01f6=_0x4fc5e2,_0x180dae=Math[_0x45e1db(0x33c)](Math[_0x45e1db(0x225)]((this[_0x45e1db(0x33e)]-this['lineHeight']()*Math[_0x45e1db(0x2e3)](_0x42d764[_0x45e1db(0x2ec)]/_0x55a516))/0x2),0x0);const _0x4855ed=_0x180dae;let _0xbae5d1=(this['innerWidth']-_0x5f01f6-this[_0x45e1db(0x2a4)]()*0x2*_0x55a516)/_0x55a516;_0x55a516===0x1&&(_0xbae5d1=Math[_0x45e1db(0x2f2)](ImageManager[_0x45e1db(0x270)]*0x2,_0xbae5d1),_0x5f01f6+=Math['round']((this[_0x45e1db(0x2c7)]-_0x5f01f6-this['itemPadding']()*0x2-_0xbae5d1)/0x2));for(const _0x2c3e27 of _0x42d764){this['drawEquipBattleSkillTierData'](this['_actor'],_0x2c3e27,_0x5f01f6,_0x180dae,_0xbae5d1),_0x180dae+=this[_0x45e1db(0x307)](),_0x180dae+this[_0x45e1db(0x307)]()>this['innerHeight']&&(_0x180dae=_0x4855ed,_0x5f01f6+=_0xbae5d1+this[_0x45e1db(0x2a4)]()*0x2);}},DataManager[_0x3d4eb1(0x2f3)]=function(){const _0x4587d4=_0x3d4eb1;if(this['_getEquipSkillTiers']!==undefined)return this['_getEquipSkillTiers'];this[_0x4587d4(0x2c6)]=[];const _0x25cd3c=VisuMZ[_0x4587d4(0x2dd)]['Settings'][_0x4587d4(0x1ee)];for(const _0x5ae07d of _0x25cd3c){if(!_0x5ae07d)continue;const _0x48c0df=_0x5ae07d[_0x4587d4(0x30a)][_0x4587d4(0x203)]()[_0x4587d4(0x22b)]();if(_0x48c0df==='untitled')continue;if(_0x5ae07d[_0x4587d4(0x2e0)][_0x4587d4(0x203)]()[_0x4587d4(0x22b)]()===_0x4587d4(0x250))continue;if(_0x5ae07d[_0x4587d4(0x31a)][_0x4587d4(0x203)]()['trim']()===_0x4587d4(0x2b6))continue;this['_getEquipSkillTiers'][_0x4587d4(0x20f)](_0x48c0df);}return this['_getEquipSkillTiers'];},Window_SkillList[_0x3d4eb1(0x1e9)]['isEquipBattleSkillMode']=function(){const _0x3e783f=_0x3d4eb1;if($gameParty['inBattle']()&&this[_0x3e783f(0x22f)]===0x0)return!![];return this['_stypeId']===_0x3e783f(0x23d);},VisuMZ[_0x3d4eb1(0x2dd)][_0x3d4eb1(0x1fe)]=Window_SkillList[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x1fa)],Window_SkillList[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x1fa)]=function(_0x3290d9){const _0x2e2ab4=_0x3d4eb1,_0x128617=this[_0x2e2ab4(0x246)]();VisuMZ['EquipBattleSkills']['Window_SkillList_setStypeId'][_0x2e2ab4(0x32c)](this,_0x3290d9);if(_0x128617!==this['isEquipBattleSkillMode']()){const _0x5bec3b=SceneManager['_scene'];if(!_0x5bec3b)return;const _0x40f7c5=_0x5bec3b[_0x2e2ab4(0x2f8)];if(_0x40f7c5)_0x40f7c5[_0x2e2ab4(0x260)]();}},VisuMZ[_0x3d4eb1(0x2dd)][_0x3d4eb1(0x2df)]=Window_SkillList[_0x3d4eb1(0x1e9)]['selectLast'],Window_SkillList['prototype'][_0x3d4eb1(0x2fb)]=function(){const _0x402389=_0x3d4eb1;if(this[_0x402389(0x246)]()){const _0x4a34aa=this[_0x402389(0x299)]['lastBattleSkill']();if(_0x4a34aa&&this[_0x402389(0x299)]['battleSkills']()[_0x402389(0x256)](_0x4a34aa)){const _0x2733ce=this['_actor']['battleSkills']()[_0x402389(0x251)](_0x4a34aa);this['forceSelect'](_0x2733ce);}else this[_0x402389(0x258)](0x0);}else VisuMZ['EquipBattleSkills'][_0x402389(0x2df)][_0x402389(0x32c)](this);},VisuMZ['EquipBattleSkills'][_0x3d4eb1(0x33f)]=Window_SkillList[_0x3d4eb1(0x1e9)]['updateHelp'],Window_SkillList[_0x3d4eb1(0x1e9)]['updateHelp']=function(){const _0x3aa884=_0x3d4eb1;VisuMZ[_0x3aa884(0x2dd)]['Window_SkillList_updateHelp'][_0x3aa884(0x32c)](this);if(this[_0x3aa884(0x246)]()&&this['item']()===null){if(this[_0x3aa884(0x338)]){const _0x377836=TextManager[_0x3aa884(0x2c0)]['helpWindow'][_0x3aa884(0x320)];this['_helpWindow'][_0x3aa884(0x319)](_0x377836);}}},VisuMZ['EquipBattleSkills'][_0x3d4eb1(0x28a)]=Window_SkillList[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x1f2)],Window_SkillList[_0x3d4eb1(0x1e9)]['makeItemList']=function(){const _0x5820cb=_0x3d4eb1;this[_0x5820cb(0x299)]&&this[_0x5820cb(0x246)]()?this[_0x5820cb(0x30f)]():VisuMZ[_0x5820cb(0x2dd)][_0x5820cb(0x28a)][_0x5820cb(0x32c)](this);},Window_SkillList['prototype'][_0x3d4eb1(0x30f)]=function(){const _0x371ca0=_0x3d4eb1;this[_0x371ca0(0x23b)]=this[_0x371ca0(0x299)]['battleSkills']()['filter'](_0x5c7d32=>this[_0x371ca0(0x256)](_0x5c7d32));},VisuMZ['EquipBattleSkills'][_0x3d4eb1(0x292)]=Window_SkillList[_0x3d4eb1(0x1e9)]['includes'],Window_SkillList['prototype'][_0x3d4eb1(0x256)]=function(_0x70073a){const _0x3f548e=_0x3d4eb1;return this[_0x3f548e(0x246)]()?$gameParty['inBattle']()?this[_0x3f548e(0x21b)](_0x70073a):!![]:VisuMZ[_0x3f548e(0x2dd)][_0x3f548e(0x292)]['call'](this,_0x70073a);},VisuMZ[_0x3d4eb1(0x2dd)][_0x3d4eb1(0x226)]=Window_SkillList[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x26f)],Window_SkillList['prototype'][_0x3d4eb1(0x26f)]=function(_0x4bc9f3){const _0x2d42b2=_0x3d4eb1;if(this['isEquipBattleSkillMode']())return!![];return VisuMZ[_0x2d42b2(0x2dd)][_0x2d42b2(0x226)]['call'](this,_0x4bc9f3);},VisuMZ[_0x3d4eb1(0x2dd)][_0x3d4eb1(0x1fc)]=Window_SkillList[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x21f)],Window_SkillList[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x21f)]=function(_0xacb0c7){const _0x41380e=_0x3d4eb1;if(this['_actor']&&this[_0x41380e(0x246)]()&&!$gameParty[_0x41380e(0x309)]())return!![];else return this['_actor']&&$gameParty[_0x41380e(0x309)]()&&_0xacb0c7&&!VisuMZ[_0x41380e(0x20c)][_0x41380e(0x298)](this[_0x41380e(0x299)],_0xacb0c7)?![]:VisuMZ[_0x41380e(0x2dd)]['Window_SkillList_isEnabled'][_0x41380e(0x32c)](this,_0xacb0c7);},VisuMZ[_0x3d4eb1(0x2dd)]['Window_SkillList_drawItem']=Window_SkillList[_0x3d4eb1(0x1e9)]['drawItem'],Window_SkillList[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x221)]=function(_0x47ac68){const _0x1926ac=_0x3d4eb1;this[_0x1926ac(0x299)]&&this['_actor']['canEquipBattleSkills']()&&this[_0x1926ac(0x246)]()?this['drawEquipBattleSkillsItem'](_0x47ac68):VisuMZ[_0x1926ac(0x2dd)][_0x1926ac(0x245)]['call'](this,_0x47ac68);},Window_SkillList['prototype'][_0x3d4eb1(0x242)]=function(_0x899ff3){const _0x377a6f=_0x3d4eb1;if(this[_0x377a6f(0x246)]()&&this[_0x377a6f(0x27e)](_0x899ff3)===null){this[_0x377a6f(0x2bd)](_0x899ff3);return;}const _0x2a4f83=this[_0x377a6f(0x27e)](_0x899ff3);if(!_0x2a4f83)return;const _0x4e39d3=_0x2a4f83?_0x2a4f83[_0x377a6f(0x2c9)]:'';this['alterSkillName'](_0x2a4f83);const _0x23751f=this[_0x377a6f(0x254)](),_0x1986b3=this[_0x377a6f(0x20a)](_0x899ff3);this['changePaintOpacity'](this['isEnabled'](_0x2a4f83)),this['drawEquipBattleSkillName'](_0x2a4f83,_0x1986b3['x'],_0x1986b3['y'],_0x1986b3[_0x377a6f(0x265)]-_0x23751f),this['drawSkillCost'](_0x2a4f83,_0x1986b3['x'],_0x1986b3['y'],_0x1986b3[_0x377a6f(0x265)]),this['changePaintOpacity'](!![]),_0x2a4f83['name']=_0x4e39d3;},Window_SkillList['prototype'][_0x3d4eb1(0x2bd)]=function(_0x5b78e3){const _0x5d80d0=_0x3d4eb1,_0x225b84=this[_0x5d80d0(0x20a)](_0x5b78e3);this[_0x5d80d0(0x33d)](![]),Window_Selectable[_0x5d80d0(0x1e9)][_0x5d80d0(0x2bd)]['call'](this,_0x225b84['x'],_0x225b84['y'],_0x225b84[_0x5d80d0(0x265)]),this[_0x5d80d0(0x33d)](!![]);},Window_SkillList[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x214)]=function(){const _0x249c49=_0x3d4eb1;if(!this[_0x249c49(0x299)])return;if(!this['itemAt'](this['index']()))return;this['_actor']['equipBattleSkill'](0x0,this[_0x249c49(0x216)]()),this[_0x249c49(0x260)](),this[_0x249c49(0x2d8)]();if(SceneManager[_0x249c49(0x2b9)][_0x249c49(0x2f8)])SceneManager[_0x249c49(0x2b9)][_0x249c49(0x2f8)]['refresh']();SoundManager[_0x249c49(0x2e8)]();},VisuMZ[_0x3d4eb1(0x2dd)][_0x3d4eb1(0x287)]=Window_ActorCommand[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x31e)],Window_ActorCommand[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x31e)]=function(){const _0x3365cd=_0x3d4eb1;this['_actor']&&this[_0x3365cd(0x299)][_0x3365cd(0x2f1)]()?this[_0x3365cd(0x32a)]():VisuMZ['EquipBattleSkills'][_0x3365cd(0x287)][_0x3365cd(0x32c)](this);},Window_ActorCommand[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x32a)]=function(){const _0x5b2731=_0x3d4eb1;let _0x3596bf=TextManager[_0x5b2731(0x2c0)]['battleCommandName'];const _0x4c3978=this[_0x5b2731(0x2c8)]();if(_0x4c3978===_0x5b2731(0x286))_0x3596bf=_0x3596bf[_0x5b2731(0x237)](/\x1I\[(\d+)\]/gi,''),_0x3596bf=_0x3596bf['replace'](/\\I\[(\d+)\]/gi,'');else{if(!_0x3596bf['match'](/\\I\[(\d+)\]/i)){const _0x13b7d8=Window_SkillType['EQUIP_BATTLE_SKILLS']['icon'];_0x3596bf=_0x5b2731(0x340)[_0x5b2731(0x2ed)](_0x13b7d8,_0x3596bf);}}this[_0x5b2731(0x2ab)](_0x3596bf,_0x5b2731(0x280),!![],'equipBattleSkills');},VisuMZ[_0x3d4eb1(0x2dd)][_0x3d4eb1(0x1e5)]=Window_ActorCommand[_0x3d4eb1(0x1e9)]['addSingleSkillCommands'],Window_ActorCommand[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x241)]=function(){const _0x1f5179=_0x3d4eb1;this[_0x1f5179(0x299)]&&this['_actor']['canEquipBattleSkills']()?this[_0x1f5179(0x342)]():VisuMZ['EquipBattleSkills'][_0x1f5179(0x1e5)]['call'](this);},Window_ActorCommand['prototype']['addEquipBattleSingleSkillsCommand']=function(){const _0x40852e=_0x3d4eb1,_0x154037=this['_actor'][_0x40852e(0x1f9)]();for(const _0x556158 of _0x154037){if(!_0x556158)continue;if(!this[_0x40852e(0x2b3)](_0x556158))continue;this[_0x40852e(0x32d)](_0x556158);}},Window_ActorCommand[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x2b3)]=function(_0x3e643e){const _0x5d1847=_0x3d4eb1;if(Imported[_0x5d1847(0x2b7)]){if(this[_0x5d1847(0x326)](_0x3e643e))return![];}return!![];},VisuMZ['EquipBattleSkills']['Window_ActorCommand_selectLast']=Window_ActorCommand[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x2fb)],Window_ActorCommand[_0x3d4eb1(0x1e9)]['selectLast']=function(){const _0x1ffa67=_0x3d4eb1;VisuMZ[_0x1ffa67(0x2dd)]['Window_ActorCommand_selectLast'][_0x1ffa67(0x32c)](this);if(this[_0x1ffa67(0x299)]&&ConfigManager[_0x1ffa67(0x31d)]){const _0x143b7f=this[_0x1ffa67(0x299)][_0x1ffa67(0x2af)]();if(_0x143b7f===_0x1ffa67(0x280)){const _0xa23d99=this[_0x1ffa67(0x299)]['lastBattleSkill']();_0xa23d99&&this[_0x1ffa67(0x299)][_0x1ffa67(0x1f9)]()[_0x1ffa67(0x256)](_0xa23d99)&&this[_0x1ffa67(0x1f3)](_0x1ffa67(0x23d));}}if(this['index']()<0x0)this[_0x1ffa67(0x2de)](0x0);};function Window_EquipBattleSkillList(){const _0x1e8456=_0x3d4eb1;this[_0x1e8456(0x2d9)](...arguments);}Window_EquipBattleSkillList['prototype']=Object[_0x3d4eb1(0x318)](Window_SkillList[_0x3d4eb1(0x1e9)]),Window_EquipBattleSkillList[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x2d5)]=Window_EquipBattleSkillList,Window_EquipBattleSkillList['BG_TYPE']=VisuMZ['EquipBattleSkills'][_0x3d4eb1(0x274)][_0x3d4eb1(0x2ee)]['Window_EquipBattleSkillList_BgType']??0x0,Window_EquipBattleSkillList[_0x3d4eb1(0x1e9)]['initialize']=function(_0xcc6a9){const _0x36fff9=_0x3d4eb1;Window_SkillList[_0x36fff9(0x1e9)]['initialize']['call'](this,_0xcc6a9);},Window_EquipBattleSkillList['prototype'][_0x3d4eb1(0x22a)]=function(){return 0x1;},Window_EquipBattleSkillList[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x328)]=function(_0x43f625){this['_currentSelectedSkill']=_0x43f625;},Window_EquipBattleSkillList['prototype'][_0x3d4eb1(0x26c)]=function(){const _0x1029c7=_0x3d4eb1;return this[_0x1029c7(0x2e9)]||null;},Window_EquipBattleSkillList[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x2fb)]=function(){const _0x56ab95=_0x3d4eb1;let _0x101c47=0x0;const _0x47891e=this[_0x56ab95(0x26c)]();this[_0x56ab95(0x23b)][_0x56ab95(0x256)](_0x47891e)&&(_0x101c47=this[_0x56ab95(0x23b)]['indexOf'](_0x47891e)),this[_0x56ab95(0x258)](Math[_0x56ab95(0x33c)](0x0,_0x101c47)),this['update']();},Window_EquipBattleSkillList['prototype'][_0x3d4eb1(0x2d8)]=function(){const _0x348d5b=_0x3d4eb1;Window_SkillList[_0x348d5b(0x1e9)]['updateHelp'][_0x348d5b(0x32c)](this);if(this[_0x348d5b(0x302)]()===null){if(this[_0x348d5b(0x338)]){const _0x254cad=TextManager[_0x348d5b(0x2c0)]['helpWindow'][_0x348d5b(0x223)];this[_0x348d5b(0x338)]['setText'](_0x254cad);}}},Window_EquipBattleSkillList[_0x3d4eb1(0x1e9)]['playOkSound']=function(){const _0x24a965=_0x3d4eb1;SoundManager[_0x24a965(0x2e8)]();},Window_EquipBattleSkillList[_0x3d4eb1(0x1e9)]['makeItemList']=function(){const _0x47c784=_0x3d4eb1;this['_actor']?(this[_0x47c784(0x23b)]=this[_0x47c784(0x299)][_0x47c784(0x329)]()[_0x47c784(0x215)](_0x593066=>this[_0x47c784(0x256)](_0x593066)),this['_data']['unshift'](null),this[_0x47c784(0x23b)][_0x47c784(0x2ec)]>this[_0x47c784(0x2c2)]()&&this[_0x47c784(0x23b)][_0x47c784(0x20f)](null)):this[_0x47c784(0x23b)]=[];},Window_EquipBattleSkillList['prototype']['includes']=function(_0x162c39){const _0x466629=_0x3d4eb1;if(this[_0x466629(0x299)][_0x466629(0x234)](_0x162c39))return![];if(_0x162c39){const _0x452964=VisuMZ['EquipBattleSkills']['RegExp'];if(_0x162c39[_0x466629(0x2c3)][_0x466629(0x24b)](_0x452964[_0x466629(0x295)]))return![];}return!![];},Window_EquipBattleSkillList[_0x3d4eb1(0x1e9)]['isEnabled']=function(_0x35896f){const _0x5ba391=_0x3d4eb1;if(_0x35896f===null)return!![];if(_0x35896f){const _0x5104b5=VisuMZ[_0x5ba391(0x2dd)][_0x5ba391(0x2a6)];if(_0x35896f['note'][_0x5ba391(0x24b)](_0x5104b5[_0x5ba391(0x295)]))return![];}return this[_0x5ba391(0x299)]['canEquipBattleSkill'](_0x35896f,this['currentSelectedSkill']());},Window_EquipBattleSkillList[_0x3d4eb1(0x1e9)][_0x3d4eb1(0x221)]=function(_0x143879){const _0xdfcf83=_0x3d4eb1;this['itemAt'](_0x143879)===null?this[_0xdfcf83(0x2bd)](_0x143879):Window_SkillList[_0xdfcf83(0x1e9)][_0xdfcf83(0x221)][_0xdfcf83(0x32c)](this,_0x143879);},Window_EquipBattleSkillList['prototype'][_0x3d4eb1(0x2bd)]=function(_0x26425e){const _0x2a3e8c=_0x3d4eb1,_0x4a74ba=this[_0x2a3e8c(0x20a)](_0x26425e);Window_Selectable[_0x2a3e8c(0x1e9)][_0x2a3e8c(0x2bd)]['call'](this,_0x4a74ba['x'],_0x4a74ba['y'],_0x4a74ba[_0x2a3e8c(0x265)]);},Window_EquipBattleSkillList[_0x3d4eb1(0x1e9)]['alterSkillName']=function(_0x5f53ce){const _0xb6404e=_0x3d4eb1;Window_SkillList['prototype'][_0xb6404e(0x248)][_0xb6404e(0x32c)](this,_0x5f53ce);if(!_0x5f53ce)return;this[_0xb6404e(0x2fa)](_0x5f53ce);},Window_EquipBattleSkillList['prototype'][_0x3d4eb1(0x2fa)]=function(_0x205ec8){const _0x589c94=_0x3d4eb1,_0x49cc9f=TextManager[_0x589c94(0x2c0)][_0x589c94(0x2eb)],_0x261619=_0x49cc9f[_0x589c94(0x306)],_0x356688=this['_actor'][_0x589c94(0x1f9)]()[_0x589c94(0x256)](_0x205ec8)?_0x49cc9f[_0x589c94(0x21d)]:'';let _0x217938='';const _0x5a01e0=DataManager[_0x589c94(0x1e6)](_0x205ec8);if(_0x5a01e0['markerAbbr']!==undefined){const _0x1b93f7=_0x49cc9f[_0x589c94(0x297)];_0x217938=_0x1b93f7[_0x589c94(0x2ed)](_0x5a01e0[_0x589c94(0x31a)]);}_0x205ec8['name']=_0x261619['format'](_0x205ec8['name'],_0x356688,_0x217938);};function _0x3126(){const _0x276680=['_data','actorEquipSkillTierBaseSlots','equipBattleSkills','equipBattleSkillParamPlus','battleCommands','emptyEquipDesc','addSingleSkillCommands','drawEquipBattleSkillsItem','description','48212055rGzBfg','Window_SkillList_drawItem','isEquipBattleSkillMode','onEquipBattleSkillsCancel','alterSkillName','accessEquip','onDatabaseLoaded','match','STRUCT','bind','2804765alFWng','getEquipBattleSkillTierColor','untitled','indexOf','left','actor','costWidth','drawActorSimpleStatus','includes','ARRAYFUNC','forceSelect','traitObjects','FUNC','icon','skillTierFmt','Vocab','actorId','standardIconWidth','refresh','_cache','exit','maxBattleSkills','ActorChangeMaxSkillSlots','width','onBattleEnd','maxBattleSkillsPlus','top','_maxBattleSkills','Game_Actor_makeActionList','currentClass','currentSelectedSkill','defaultBase','ColorManager_getItemColor','checkSkillTypeMatch','faceWidth','learnSkill','getEquipBattleSkillColor','equipBattleSkillsCommandName','Settings','isEquipSkillTierSystemEnabled','_objEquipSkillTierBonusSlots','《%1》','map','slotsAvailableFmt','skillTypes','cancel','deselect','Game_Battler_onBattleEnd','itemAt','paramPlus','skill','BaseSlots','CannotEquipBattleSkills','drawIcon','makeActionList','resetFontSettings','text','Window_ActorCommand_addSkillCommands','Empty','Window_SkillStatus_refresh','Window_SkillList_makeItemList','cannotEquip','tierSystem','_battleSkill_IDs','NUM','right','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Window_SkillList_includes','tierBonusSlots','status','hideEquip','bonusSlots','tierFmt','CheckVisibleBattleNotetags','_actor','equipBattleSkill','ARRAYJSON','equipAdjustHpMp','MAXHP','performEquipBattleSkill','MAX_SAFE_INTEGER','TypeBaseSlots','active','normalColor','Armor-%1-%2','itemPadding','drawActorFace','RegExp','drawText','refreshEquipBattleSkills','statusDrawTiers','Class-%1-%2','addCommand','tierFullColor','Window_Selectable_processCursorMove','activate','lastCommandSymbol','colSpacing','members','Weapon-%1-%2','canAddEquipBattleSingleSkill','canEquipBattleSkill','equipBattleSkillsParamPlus','???','VisuMZ_1_SkillsStatesCore','Scene_Boot_onDatabaseLoaded','_scene','unequip','Scene_Skill_create','Game_BattlerBase_addPassiveStatesFromOtherPlugins','drawEquipBattleSkillsNullItem','some','isActor','EQUIP_BATTLE_SKILLS','drawTiers','maxVisibleItems','note','createKeyJS','makeActionListForEquipBattleSkills','_getEquipSkillTiers','innerWidth','commandStyle','name','Change','6sFWJWL','split','deactivate','8YwoGSz','Game_Actor_forgetSkill','MDF','_autoBattle','buttonAssist','equipBattleSkillPassiveStates','_equipBattleSkillParamPlus','constructor','2877620uePkjT','Equip','updateHelp','initialize','Skills','clamp','maxEquipSkillTierSlotsBonus','EquipBattleSkills','select','Window_SkillList_selectLast','displayName','【E】','addPassiveStatesFromEquippedBattleSkills','ceil','Game_Actor_initSkills','show','absoluteMax','VisuMZ_1_BattleCore','playEquip','_currentSelectedSkill','isSceneBattle','marker','length','format','Window','DEF','State-%1-%2','canEquipBattleSkills','min','getEquipSkillTiers','BG_TYPE','setHandler','accessAllTypes','emptyIcon','_statusWindow','isSkill','addEquipBattleSkillsMarkers','selectLast','clearUnequippableBattleSkills','forgetSkill','stopEquipBattleSkills','iconWidth','STR','addPassiveStatesFromOtherPlugins','item','getEquipSkillTierType','initSkills','contents','fmt','lineHeight','Window_SkillType_makeCommandList','inBattle','tierKey','emptyListDesc','CanEquipBattleSkills','getStateIdWithName','7852838jzsyyU','makeEquipBattleSkillsList','701296jCleyW','getItemColor','Scene_Skill_buttonAssistText3','BonusSlots','emptyName','topEquipCommand','makeActionListAutoAttack','objEquipSkillTierBonusSlots','create','setText','markerAbbr','equipMarker','ActorIDs','commandRemember','addSkillCommands','skillCommandName','emptyList','processCursorMove','test','ActorChangeSkillTierSlots','onEquipBattleSkillsOk','Game_Actor_learnSkill','isHiddenSkill','iconHeight','setCurrentSelectedSkill','skills','addEquipBattleSkillsCommand','displayIcon','call','addSingleSkillCommand','clearEquipBattleSkills','_equipBattleSkillPassiveStates','Scene_Skill_onItemOk','LUK','_skillTierTypes','addMaxEquipSkillTierSlotsPlus','autoBattleUseSkills','StatusWindowDrawJS','Actor-%1-%2','setAttack','_helpWindow','currentEquipSkillTierSlots','startEquipBattleSkills','isSkillUsableForAutoBattle','max','changePaintOpacity','innerHeight','Window_SkillList_updateHelp','\x5cI[%1]%2','VisuMZ_1_ItemsEquipsCore','addEquipBattleSingleSkillsCommand','drawEquipBattleSkillTierData','1576611zsuTYg','getSkillIdWithName','isCursorMovable','_tempActor','addMaxBattleSkillsPlus','Window_ActorCommand_addSingleSkillCommands','getEquipSkillTierData','getSkillTypes','floor','prototype','General','Game_Actor_refresh','emptyColor','defaultEnable','Tiers','setActor','usableSkills','registerCommand','makeItemList','selectExt','createEquipBattleSkillWindow','markerFmt','passiveStates','MAXMP','pop','battleSkills','setStypeId','tierNormalColor','Window_SkillList_isEnabled','ConvertParams','Window_SkillList_setStypeId','displayColor','isBattleTest','classEquipSkillTierBaseSlots','resetTextColor','toLowerCase','slice','unequipBattleSkill','setMaxEquipSkillTierSlotsPlus','_shopStatusWindow','makeCommandList','_actorEquipSkillTierBaseSlots','itemLineRect','Game_Actor_isSkillUsableForAutoBattle','SkillsStatesCore','drawEquipBattleSkillName','maxEquipSkillTierSlotsPlus','push','_itemWindow','setMaxBattleSkillsPlus','_equipBattleSkillsWindow','Skill-%1-%2','processEquipBattleSkillsShiftRemoveShortcut','filter','index','return\x200','process_VisuMZ_EquipBattleSkillTiers','skillTierType','_maxEquipSkillTierSlotsPlus','includesSkillsStatesCore','PartyIndex','equipped','5867130slOVGv','isEnabled','shift','drawItem','unequipAssist','emptyEquip','ARRAYSTR','round','Window_SkillList_checkSkillTypeMatch','AGI','isTriggered','skillParamPlus','maxCols','trim','Game_Actor_usableSkills','version','changeTextColor','_stypeId','maxEquipSkillTierSlots','parse','_classEquipSkillTierBaseSlots','setSkill','isSkillHidden','setHelpWindow','_maxBattleSkillsPlus','replace','getColor','hide','reverse'];_0x3126=function(){return _0x276680;};return _0x3126();}