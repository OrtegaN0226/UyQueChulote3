//=============================================================================
// VisuStella MZ - Skill Stealer
// VisuMZ_4_SkillStealer.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_SkillStealer = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillStealer = VisuMZ.SkillStealer || {};
VisuMZ.SkillStealer.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.00] [SkillStealer]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skill_Stealer_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin enables actors to be able to use skills and/or items that have
 * skill stealing properties to acquire new skills from enemies, permanently or
 * temporarily. Only certain types of skills can be stolen. Only one skill is
 * stolen at a time.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Give items and/or skills unique properties skill stealing.
 * * When used on enemies that have skills that can be stolen, the actor will
 *   learn one of those skills, either permanently or temporarily.
 * * Notetags to determine if the stolen skills acquired are permanent or
 *   temporary, their success rate, and what classes can steal those skills.
 * * Those using other VisuStella MZ plugins will have extended features that
 *   display positive feedback effects to confirm the acquisition of the
 *   stolen skills.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
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
 *
 * When stealing skills, animations can be played as positive feedback to let
 * the player know the success of having stolen a skill.
 *
 * ---
 *
 * VisuMZ_1_BattleCore
 *
 * When stealing skills, popups can be displayed as positive feedback to let
 * the player know the success of having stolen a skill.
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
 * === Stealable Skills-Related Notetags ===
 * 
 * ---
 *
 * <Stealable Skill>
 *
 * - Used for: Skill Notetags
 * - Marks this skill as a stealable skill. If this skill is found in the
 *   enemy's action list, actors can steal it with the proper skills/items.
 *
 * ---
 * 
 * <Stealable Skill: x%>
 *
 * - Used for: Skill Notetags
 * - Marks this skill as a stealable skill with a 'x' percent change to be
 *   successfully stolen. If this skill is found in the enemy's action list,
 *   actors can steal it with the proper skills/items.
 * - Replace 'x' with a number representing the percent chance to successfully
 *   steal this skill.
 * 
 * ---
 * 
 * <Stealable For Class: id>
 * <Stealable For Classes: id, id, id>
 * 
 * <Stealable For Class: name>
 * <Stealable For Classes: name, name, name>
 * 
 * - Used for: Skill Notetags
 * - Used together with <Stealable Skill>.
 * - This skill only becomes a valid steal target if the actor using it is one
 *   of the listed classes.
 * - For 'id' variant, replace 'id' with a number representing the class.
 * - For 'name' variant, replace 'name' with the name of the class.
 * 
 * ---
 * 
 * === Stealing Skills-Related Notetags ===
 * 
 * ---
 *
 * <Steal Skills>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used by an actor to target an enemy, and if that
 *   enemy has stealable skills, the actor can learn one of those skills
 *   permanently.
 * - If an enemy has multiple stealable skills, the skill to be stolen will be
 *   picked randomly out of available learnable skills.
 * - Stealable skills that have already been learned or not valid for learning
 *   are automatically filtered out.
 *
 * ---
 * 
 * <Steal stype Skills>
 * 
 * - Used for: Skill, Item Notetags
 * - Allows the actor to steal specific 'stype' skills from the target enemy
 *   as along as the enemy has skills of the matching skill type permanently.
 * - Replace 'stype' with the name of the Skill Type.
 * - If an enemy has multiple stealable skills, the skill to be stolen will be
 *   picked randomly out of available learnable skills.
 * - Stealable skills that have already been learned or not valid for learning
 *   are automatically filtered out.
 * 
 * ---
 *
 * <Temporary Steal Skills>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used by an actor to target an enemy, and if that
 *   enemy has stealable skills, the actor can learn one of those skills
 *   temporarily for the battle.
 * - If an enemy has multiple stealable skills, the skill to be stolen will be
 *   picked randomly out of available learnable skills.
 * - Stealable skills that have already been learned or not valid for learning
 *   are automatically filtered out.
 * - At the end of the battle, the actor will have forgotten the skill.
 *
 * ---
 * 
 * <Temporary Steal stype Skills>
 * 
 * - Used for: Skill, Item Notetags
 * - Allows the actor to steal specific 'stype' skills from the target enemy
 *   as along as the enemy has skills of the matching skill type temporarily
 *   for the battle.
 * - Replace 'stype' with the name of the Skill Type.
 * - If an enemy has multiple stealable skills, the skill to be stolen will be
 *   picked randomly out of available learnable skills.
 * - Stealable skills that have already been learned or not valid for learning
 *   are automatically filtered out.
 * - At the end of the battle, the actor will have forgotten the skill.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Effects Settings
 * ============================================================================
 *
 * Used with VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore!
 * Displays popups to determine success and failure.
 *
 * ---
 *
 * Permanent Skill Steal
 * 
 *   Animation:
 * 
 *     Animation ID:
 *     - Play this animation when the effect activates.
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 *     Mirror Animation:
 *     - Mirror the effect animation?
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 *     Mute Animation:
 *     - Mute the effect animation?
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 *   Popups:
 * 
 *     Text:
 *     - Text displayed upon the effect activating.
 *     - Requires VisuMZ_1_BattleCore.
 * 
 *     Text Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 *     - Requires VisuMZ_1_BattleCore.
 * 
 *     Flash Color:
 *     - Adjust the popup's flash color.
 *     - Format: [red, green, blue, alpha]
 *     - Requires VisuMZ_1_BattleCore.
 * 
 *     Flash Duration:
 *     - What is the frame duration of the flash effect?
 *     - Requires VisuMZ_1_BattleCore.
 *
 * ---
 *
 * Temporary Skill Steal
 * 
 *   Animation:
 * 
 *     Animation ID:
 *     - Play this animation when the effect activates.
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 *     Mirror Animation:
 *     - Mirror the effect animation?
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 *     Mute Animation:
 *     - Mute the effect animation?
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 *   Popups:
 * 
 *     Text:
 *     - Text displayed upon the effect activating.
 *     - Requires VisuMZ_1_BattleCore.
 * 
 *     Text Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 *     - Requires VisuMZ_1_BattleCore.
 * 
 *     Flash Color:
 *     - Adjust the popup's flash color.
 *     - Format: [red, green, blue, alpha]
 *     - Requires VisuMZ_1_BattleCore.
 * 
 *     Flash Duration:
 *     - What is the frame duration of the flash effect?
 *     - Requires VisuMZ_1_BattleCore.
 *
 * ---
 *
 * Failure to Steal
 * 
 *   Animation:
 * 
 *     Animation ID:
 *     - Play this animation when the effect activates.
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 *     Mirror Animation:
 *     - Mirror the effect animation?
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 *     Mute Animation:
 *     - Mute the effect animation?
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 *   Popups:
 * 
 *     Text:
 *     - Text displayed upon the effect activating.
 *     - Requires VisuMZ_1_BattleCore.
 * 
 *     Text Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 *     - Requires VisuMZ_1_BattleCore.
 * 
 *     Flash Color:
 *     - Adjust the popup's flash color.
 *     - Format: [red, green, blue, alpha]
 *     - Requires VisuMZ_1_BattleCore.
 * 
 *     Flash Duration:
 *     - What is the frame duration of the flash effect?
 *     - Requires VisuMZ_1_BattleCore.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Success Sound Settings
 * ============================================================================
 *
 * These settings let you adjust the success sound effect used when a skill
 * is stolen.
 *
 * ---
 *
 * Settings
 * 
 *   Filename:
 *   - Filename of the sound effect played.
 * 
 *   Volume:
 *   - Volume of the sound effect played.
 * 
 *   Pitch:
 *   - Pitch of the sound effect played.
 * 
 *   Pan:
 *   - Pan of the sound effect played.
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
 * Battle Log Window
 * 
 *   Learned Skill:
 *   - If enabled Log Window, displays this text.
 *   - %1 - User, %2 - Target, %3 - Skill Name
 * 
 *   Temporary Skill:
 *   - If enabled Log Window, displays this text.
 *   - %1 - User, %2 - Target, %3 - Skill Name
 * 
 *   Nothing To Steal:
 *   - If enabled Log Window, displays this text.
 *   - %1 - User, %2 - Target
 * 
 *   Failure To Steal:
 *   - If enabled Log Window, displays this text.
 *   - %1 - User, %2 - Target
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
 * Version 1.00 Official Release Date: June 30, 2023
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SkillStealer
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Effect:struct
 * @text Effects Settings
 * @type struct<Effect>
 * @desc Used with VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore!
 * Displays popups to determine success and failure.
 * @default {"Permanent":"","PermAnimation":"","PermAnimationID:num":"58","PermMirror:eval":"false","PermMute:eval":"false","PermPopups":"","PermPopupText:str":"%1 Stolen","PermTextColor:str":"0","PermFlashColor:eval":"[255, 255, 255, 160]","PermFlashDuration:num":"60","Temporary":"","TempAnimation":"","TempAnimationID:num":"58","TempMirror:eval":"false","TempMute:eval":"false","TempPopups":"","TempPopupText:str":"%1 Borrowed","TempTextColor:str":"0","TempFlashColor:eval":"[255, 255, 255, 160]","TempFlashDuration:num":"60","Failure":"","FailAnimation":"","FailAnimationID:num":"0","FailMirror:eval":"false","FailMute:eval":"false","FailPopups":"","FailPopupText:str":"Failed","FailTextColor:str":"0","FailFlashColor:eval":"[255, 0, 0, 160]","FailFlashDuration:num":"60"}
 *
 * @param Sound:struct
 * @text Success Sound Settings
 * @type struct<Sound>
 * @desc These settings let you adjust the success sound effect used when a skill is stolen.
 * @default {"name:str":"Absorb2","volume:num":"90","pitch:num":"130","pan:num":"0"}
 *
 * @param Vocab:struct
 * @text Vocabulary Settings
 * @type struct<Vocab>
 * @desc These settings let you adjust the text displayed for this plugin.
 * @default {"LogWindow":"","learnFmt:str":"%1 learns %3 from %2!","tempFmt:str":"%1 borrows %3 from %2!","nothingFmt:str":"%1 could not learn anything from %2.","failureFmt:str":"%1 failed to steal a skill from %2."}
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
 * Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Effect:
 *
 * @param Permanent
 * @text Permanent Skill Steal
 * 
 * @param PermAnimation
 * @text Animation
 * @parent Permanent
 *
 * @param PermAnimationID:num
 * @text Animation ID
 * @parent PermAnimation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Requires VisuMZ_0_CoreEngine.
 * @default 58
 *
 * @param PermMirror:eval
 * @text Mirror Animation
 * @parent PermAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param PermMute:eval
 * @text Mute Animation
 * @parent PermAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param PermPopups
 * @text Popups
 * @parent Permanent
 *
 * @param PermPopupText:str
 * @text Text
 * @parent PermPopups
 * @desc Text displayed upon the effect activating.
 * Requires VisuMZ_1_BattleCore. %1 - Skill Name
 * @default %1 Stolen
 *
 * @param PermTextColor:str
 * @text Text Color
 * @parent PermPopups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param PermFlashColor:eval
 * @text Flash Color
 * @parent PermPopups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 160]
 * 
 * @param PermFlashDuration:num
 * @text Flash Duration
 * @parent PermPopups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Temporary
 * @text Temporary Skill Steal
 * 
 * @param TempAnimation
 * @text Animation
 * @parent Temporary
 *
 * @param TempAnimationID:num
 * @text Animation ID
 * @parent TempAnimation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Requires VisuMZ_0_CoreEngine.
 * @default 58
 *
 * @param TempMirror:eval
 * @text Mirror Animation
 * @parent TempAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param TempMute:eval
 * @text Mute Animation
 * @parent TempAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param TempPopups
 * @text Popups
 * @parent Temporary
 *
 * @param TempPopupText:str
 * @text Text
 * @parent TempPopups
 * @desc Text displayed upon the effect activating.
 * Requires VisuMZ_1_BattleCore. %1 - Skill Name
 * @default %1 Borrowed
 *
 * @param TempTextColor:str
 * @text Text Color
 * @parent TempPopups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param TempFlashColor:eval
 * @text Flash Color
 * @parent TempPopups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 160]
 * 
 * @param TempFlashDuration:num
 * @text Flash Duration
 * @parent TempPopups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Failure
 * @text Failure to Steal
 * 
 * @param FailAnimation
 * @text Animation
 * @parent Failure
 *
 * @param FailAnimationID:num
 * @text Animation ID
 * @parent FailAnimation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Requires VisuMZ_0_CoreEngine.
 * @default 0
 *
 * @param FailMirror:eval
 * @text Mirror Animation
 * @parent FailAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param FailMute:eval
 * @text Mute Animation
 * @parent FailAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param FailPopups
 * @text Popups
 * @parent Failure
 *
 * @param FailPopupText:str
 * @text Text
 * @parent FailPopups
 * @desc Text displayed upon the effect activating.
 * Requires VisuMZ_1_BattleCore.
 * @default Failed
 *
 * @param FailTextColor:str
 * @text Text Color
 * @parent FailPopups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param FailFlashColor:eval
 * @text Flash Color
 * @parent FailPopups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param FailFlashDuration:num
 * @text Flash Duration
 * @parent FailPopups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Sound Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Sound:
 *
 * @param name:str
 * @text Filename
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc Filename of the sound effect played.
 * @default Absorb2
 *
 * @param volume:num
 * @text Volume
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param pitch:num
 * @text Pitch
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 130
 *
 * @param pan:num
 * @text Pan
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Vocabulary Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 *
 * @param LogWindow
 * @text Battle Log Window
 *
 * @param learnFmt:str
 * @text Learned Skill
 * @parent LogWindow
 * @desc If enabled Log Window, displays this text.
 * %1 - User, %2 - Target, %3 - Skill Name
 * @default %1 learns %3 from %2!
 *
 * @param tempFmt:str
 * @text Temporary Skill
 * @parent LogWindow
 * @desc If enabled Log Window, displays this text.
 * %1 - User, %2 - Target, %3 - Skill Name
 * @default %1 borrows %3 from %2!
 *
 * @param nothingFmt:str
 * @text Nothing To Steal
 * @parent LogWindow
 * @desc If enabled Log Window, displays this text.
 * %1 - User, %2 - Target
 * @default %1 could not learn anything from %2.
 *
 * @param failureFmt:str
 * @text Failure To Steal
 * @parent LogWindow
 * @desc If enabled Log Window, displays this text.
 * %1 - User, %2 - Target
 * @default %1 failed to steal a skill from %2.
 *
 */
//=============================================================================

const _0x29edcb=_0xf1a3;(function(_0x2acef1,_0x35a3a6){const _0x5aa192=_0xf1a3,_0x102442=_0x2acef1();while(!![]){try{const _0x3ee29a=parseInt(_0x5aa192(0x185))/0x1*(parseInt(_0x5aa192(0x17c))/0x2)+-parseInt(_0x5aa192(0x1ac))/0x3+parseInt(_0x5aa192(0x1c1))/0x4+parseInt(_0x5aa192(0x1f1))/0x5+parseInt(_0x5aa192(0x195))/0x6+-parseInt(_0x5aa192(0x193))/0x7+parseInt(_0x5aa192(0x1db))/0x8*(parseInt(_0x5aa192(0x142))/0x9);if(_0x3ee29a===_0x35a3a6)break;else _0x102442['push'](_0x102442['shift']());}catch(_0x3b6997){_0x102442['push'](_0x102442['shift']());}}}(_0x2146,0x76f50));function _0xf1a3(_0x23914e,_0x3a2866){const _0x214677=_0x2146();return _0xf1a3=function(_0xf1a317,_0x59d8a6){_0xf1a317=_0xf1a317-0x13e;let _0x1625e8=_0x214677[_0xf1a317];return _0x1625e8;},_0xf1a3(_0x23914e,_0x3a2866);}var label=_0x29edcb(0x148),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x29edcb(0x17a)](function(_0x16b45a){const _0x1c20fb=_0x29edcb;return _0x16b45a[_0x1c20fb(0x146)]&&_0x16b45a[_0x1c20fb(0x16e)][_0x1c20fb(0x13e)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x29edcb(0x144)]||{},VisuMZ[_0x29edcb(0x1b6)]=function(_0x16ae2f,_0x23c9f1){const _0x4d790e=_0x29edcb;for(const _0x1cba8a in _0x23c9f1){if(_0x4d790e(0x1b3)===_0x4d790e(0x1b3)){if(_0x1cba8a['match'](/(.*):(.*)/i)){if(_0x4d790e(0x150)==='MxUXQ'){const _0x718208=_0x15a4ad[_0x3941b1[_0x4d790e(0x169)]];if(_0x718208&&!_0x24938e[_0x4d790e(0x13e)](_0x718208))_0x2091de[_0x4d790e(0x189)](_0x718208);}else{const _0xc0764e=String(RegExp['$1']),_0xbd35e5=String(RegExp['$2'])[_0x4d790e(0x1bc)]()[_0x4d790e(0x1ed)]();let _0x4c3b51,_0x5cb31e,_0x5c036d;switch(_0xbd35e5){case'NUM':_0x4c3b51=_0x23c9f1[_0x1cba8a]!==''?Number(_0x23c9f1[_0x1cba8a]):0x0;break;case _0x4d790e(0x1cf):_0x5cb31e=_0x23c9f1[_0x1cba8a]!==''?JSON[_0x4d790e(0x161)](_0x23c9f1[_0x1cba8a]):[],_0x4c3b51=_0x5cb31e[_0x4d790e(0x15f)](_0x2f4001=>Number(_0x2f4001));break;case'EVAL':_0x4c3b51=_0x23c9f1[_0x1cba8a]!==''?eval(_0x23c9f1[_0x1cba8a]):null;break;case'ARRAYEVAL':_0x5cb31e=_0x23c9f1[_0x1cba8a]!==''?JSON['parse'](_0x23c9f1[_0x1cba8a]):[],_0x4c3b51=_0x5cb31e[_0x4d790e(0x15f)](_0x21eb20=>eval(_0x21eb20));break;case _0x4d790e(0x14a):_0x4c3b51=_0x23c9f1[_0x1cba8a]!==''?JSON[_0x4d790e(0x161)](_0x23c9f1[_0x1cba8a]):'';break;case _0x4d790e(0x1e4):_0x5cb31e=_0x23c9f1[_0x1cba8a]!==''?JSON[_0x4d790e(0x161)](_0x23c9f1[_0x1cba8a]):[],_0x4c3b51=_0x5cb31e[_0x4d790e(0x15f)](_0xf51f16=>JSON[_0x4d790e(0x161)](_0xf51f16));break;case _0x4d790e(0x1d4):_0x4c3b51=_0x23c9f1[_0x1cba8a]!==''?new Function(JSON[_0x4d790e(0x161)](_0x23c9f1[_0x1cba8a])):new Function(_0x4d790e(0x1ab));break;case _0x4d790e(0x18d):_0x5cb31e=_0x23c9f1[_0x1cba8a]!==''?JSON[_0x4d790e(0x161)](_0x23c9f1[_0x1cba8a]):[],_0x4c3b51=_0x5cb31e['map'](_0x34503a=>new Function(JSON[_0x4d790e(0x161)](_0x34503a)));break;case _0x4d790e(0x1a9):_0x4c3b51=_0x23c9f1[_0x1cba8a]!==''?String(_0x23c9f1[_0x1cba8a]):'';break;case _0x4d790e(0x196):_0x5cb31e=_0x23c9f1[_0x1cba8a]!==''?JSON[_0x4d790e(0x161)](_0x23c9f1[_0x1cba8a]):[],_0x4c3b51=_0x5cb31e[_0x4d790e(0x15f)](_0x57db5=>String(_0x57db5));break;case'STRUCT':_0x5c036d=_0x23c9f1[_0x1cba8a]!==''?JSON[_0x4d790e(0x161)](_0x23c9f1[_0x1cba8a]):{},_0x4c3b51=VisuMZ[_0x4d790e(0x1b6)]({},_0x5c036d);break;case _0x4d790e(0x1dc):_0x5cb31e=_0x23c9f1[_0x1cba8a]!==''?JSON[_0x4d790e(0x161)](_0x23c9f1[_0x1cba8a]):[],_0x4c3b51=_0x5cb31e['map'](_0x375c70=>VisuMZ[_0x4d790e(0x1b6)]({},JSON[_0x4d790e(0x161)](_0x375c70)));break;default:continue;}_0x16ae2f[_0xc0764e]=_0x4c3b51;}}}else{const _0x34b1b3=_0x49791e(_0x450f30['$1']);_0x34b1b3!==_0x501b58[_0x49bd59][_0x4d790e(0x15b)]&&(_0x32ec73(_0x4d790e(0x177)[_0x4d790e(0x1a2)](_0x958a2c,_0x34b1b3)),_0x3d7037['exit']());}}return _0x16ae2f;},(_0x569bb4=>{const _0x5919cf=_0x29edcb,_0xe0d7d=_0x569bb4['name'];for(const _0x579277 of dependencies){if(_0x5919cf(0x1c9)==='xvDwJ'){if(!Imported[_0x579277]){if('GKwLH'!=='BiSLh'){alert(_0x5919cf(0x199)['format'](_0xe0d7d,_0x579277)),SceneManager['exit']();break;}else _0x55cf8e[_0x5919cf(0x160)](),this[_0x5919cf(0x178)](_0x5919cf(0x19e),_0x3daf57);}}else return this['_temporaryStolenSkillIDs']===_0x5e10e4&&this[_0x5919cf(0x175)](),this['_temporaryStolenSkillIDs'][_0x5919cf(0x13e)](_0x3eebdd);}const _0x1950ee=_0x569bb4[_0x5919cf(0x16e)];if(_0x1950ee[_0x5919cf(0x194)](/\[Version[ ](.*?)\]/i)){const _0x237274=Number(RegExp['$1']);_0x237274!==VisuMZ[label][_0x5919cf(0x15b)]&&(alert(_0x5919cf(0x177)[_0x5919cf(0x1a2)](_0xe0d7d,_0x237274)),SceneManager[_0x5919cf(0x1d5)]());}if(_0x1950ee['match'](/\[Tier[ ](\d+)\]/i)){const _0x547c97=Number(RegExp['$1']);if(_0x547c97<tier){if(_0x5919cf(0x15d)===_0x5919cf(0x1d7)){const _0x381c00=_0xce2489(_0x3d7627['$1'])*0.01;this[_0x5919cf(0x1d3)](_0x2ad1e8,_0x381c00,0x0,!![]);}else alert(_0x5919cf(0x179)[_0x5919cf(0x1a2)](_0xe0d7d,_0x547c97,tier)),SceneManager[_0x5919cf(0x1d5)]();}else tier=Math['max'](_0x547c97,tier);}VisuMZ[_0x5919cf(0x1b6)](VisuMZ[label]['Settings'],_0x569bb4[_0x5919cf(0x155)]);})(pluginData),VisuMZ[_0x29edcb(0x148)]['RegExp']={'StealSkills':/<STEAL (?:SKILL|SKILLS)>/i,'StealSkillsChance':/<STEAL (?:SKILL|SKILLS):[ ](\d+)([%％])>/i,'StealSkillsStype':/<STEAL (.*) (?:SKILL|SKILLS)>/gi,'StealSkillsStypeChance':/<STEAL (.*) (?:SKILL|SKILLS):[ ](\d+)([%％])>/gi,'TempStealSkills':/<(?:TEMP|TEMPORARY) STEAL (?:SKILL|SKILLS)>/i,'TempStealSkillsChance':/<<(?:TEMP|TEMPORARY) STEAL (?:SKILL|SKILLS):[ ](\d+)([%％])>/i,'TempStealSkillsStype':/<<(?:TEMP|TEMPORARY) STEAL (.*) (?:SKILL|SKILLS)>/gi,'TempStealSkillsStypeChance':/<<(?:TEMP|TEMPORARY) STEAL (.*) (?:SKILL|SKILLS):[ ](\d+)([%％])>/gi,'StealableSkill':/<STEALABLE SKILL>/i,'StealableSkillChance':/<STEALABLE SKILL:[ ](\d+)([%％])>/i,'StealableForClasses':/<STEALABLE FOR (?:CLASS|CLASSES):[ ](.*)>/i},DataManager['hasSkillStealerNotetag']=function(_0x3bbb66){const _0x36d41b=_0x29edcb;if(!_0x3bbb66)return![];const _0x522dc1=VisuMZ[_0x36d41b(0x148)]['RegExp'],_0xf6235a=_0x3bbb66[_0x36d41b(0x1ca)]||'';for(const _0x5c8e20 in _0x522dc1){if('ugruX'===_0x36d41b(0x1d9)){const _0x2783bb=_0x398851['$1'],_0x1d9727=_0x249d0f(_0x1e85a4['$2'])*0.01,_0x2694b3=/^\d+$/[_0x36d41b(0x1ef)](_0x2783bb),_0x1a085b=_0x2694b3?_0x2d4c49(_0x2783bb):_0x1e7979[_0x36d41b(0x14e)](_0x2783bb);this[_0x36d41b(0x1d3)](_0x190871,_0x1d9727,_0x1a085b,!![]);}else{if(_0xf6235a[_0x36d41b(0x194)](_0x522dc1[_0x5c8e20]))return!![];}}return![];},DataManager[_0x29edcb(0x15a)]=function(_0x1dfc33){const _0x531837=_0x29edcb;_0x1dfc33=_0x1dfc33[_0x531837(0x1bc)]()[_0x531837(0x1ed)](),this['_classIDs']=this[_0x531837(0x1a0)]||{};if(this['_classIDs'][_0x1dfc33])return this[_0x531837(0x1a0)][_0x1dfc33];for(const _0x18e43b of $dataClasses){if(!_0x18e43b)continue;let _0x39c165=_0x18e43b[_0x531837(0x152)];_0x39c165=_0x39c165[_0x531837(0x1e7)](/\x1I\[(\d+)\]/gi,''),_0x39c165=_0x39c165[_0x531837(0x1e7)](/\\I\[(\d+)\]/gi,''),this[_0x531837(0x1a0)][_0x39c165[_0x531837(0x1bc)]()[_0x531837(0x1ed)]()]=_0x18e43b['id'];}return this[_0x531837(0x1a0)][_0x1dfc33]||0x0;},DataManager[_0x29edcb(0x1bd)]=function(_0x21bc2f){const _0x5702ac=_0x29edcb;_0x21bc2f=_0x21bc2f[_0x5702ac(0x1bc)]()[_0x5702ac(0x1ed)](),this['_skillIDs']=this[_0x5702ac(0x163)]||{};if(this[_0x5702ac(0x163)][_0x21bc2f])return this[_0x5702ac(0x163)][_0x21bc2f];for(const _0x1bd957 of $dataSkills){if(_0x5702ac(0x16a)===_0x5702ac(0x16a)){if(!_0x1bd957)continue;this[_0x5702ac(0x163)][_0x1bd957[_0x5702ac(0x152)]['toUpperCase']()[_0x5702ac(0x1ed)]()]=_0x1bd957['id'];}else _0x199539[_0x5702ac(0x148)][_0x5702ac(0x1c2)][_0x5702ac(0x166)](this,_0x3d035c),this['applySkillStealerEffect'](_0x483651);}return this[_0x5702ac(0x163)][_0x21bc2f]||0x0;},DataManager[_0x29edcb(0x14e)]=function(_0x399a46){const _0x12e1c6=_0x29edcb;_0x399a46=_0x399a46[_0x12e1c6(0x1bc)]()[_0x12e1c6(0x1ed)](),this[_0x12e1c6(0x18f)]=this[_0x12e1c6(0x18f)]||{};if(this[_0x12e1c6(0x18f)][_0x399a46])return this['_stypeIDs'][_0x399a46];for(let _0x5511ec=0x1;_0x5511ec<0x64;_0x5511ec++){if('yKPNu'===_0x12e1c6(0x197))return _0x12e1c6(0x1a3)[_0x12e1c6(0x1a2)](_0x4aa58f(_0x2060e0['$1']));else{if(!$dataSystem[_0x12e1c6(0x168)][_0x5511ec])continue;let _0x22f8a9=$dataSystem[_0x12e1c6(0x168)][_0x5511ec][_0x12e1c6(0x1bc)]()[_0x12e1c6(0x1ed)]();_0x22f8a9=_0x22f8a9[_0x12e1c6(0x1e7)](/\x1I\[(\d+)\]/gi,''),_0x22f8a9=_0x22f8a9[_0x12e1c6(0x1e7)](/\\I\[(\d+)\]/gi,''),this[_0x12e1c6(0x18f)][_0x22f8a9]=_0x5511ec;}}return this['_stypeIDs'][_0x399a46]||0x0;},DataManager[_0x29edcb(0x1f0)]=function(_0x16f09f){const _0x3308ee=_0x29edcb;if(!this[_0x3308ee(0x183)](_0x16f09f))return![];const _0x54693f=_0x16f09f['id'];this[_0x3308ee(0x1aa)]=this[_0x3308ee(0x1aa)]||[];if(this['_isSkillStealable'][_0x3308ee(0x13e)](_0x54693f))return!![];const _0x2dcfa4=VisuMZ[_0x3308ee(0x148)][_0x3308ee(0x16c)],_0x282489=_0x16f09f[_0x3308ee(0x1ca)]||'';if(_0x282489[_0x3308ee(0x194)](_0x2dcfa4[_0x3308ee(0x140)]))'Xuqzc'!==_0x3308ee(0x1b2)?this[_0x3308ee(0x1aa)][_0x3308ee(0x189)](_0x54693f):this[_0x3308ee(0x1d3)](_0x177870,0x1,0x0,![]);else _0x282489[_0x3308ee(0x194)](_0x2dcfa4[_0x3308ee(0x1c6)])&&this[_0x3308ee(0x1aa)]['push'](_0x54693f);return this[_0x3308ee(0x1aa)][_0x3308ee(0x13e)](_0x54693f);},VisuMZ[_0x29edcb(0x148)][_0x29edcb(0x156)]=function(_0x482eaf,_0x50b3aa){const _0x2b8c2b=_0x29edcb;if(_0x482eaf===0x0)return!![];const _0x48f30b=Imported['VisuMZ_1_SkillsStatesCore']?DataManager[_0x2b8c2b(0x162)](_0x50b3aa):[_0x50b3aa[_0x2b8c2b(0x1dd)]];return _0x48f30b[_0x2b8c2b(0x13e)](_0x482eaf);},DataManager['skillStealableClasses']=function(_0xbe1e15){const _0x4bd83e=_0x29edcb;if(!this[_0x4bd83e(0x183)](_0xbe1e15))return[];const _0x4f0fba=_0xbe1e15['id'];this[_0x4bd83e(0x198)]=this[_0x4bd83e(0x198)]||{};if(this[_0x4bd83e(0x198)][_0x4f0fba]!==undefined)return this[_0x4bd83e(0x198)][_0x4f0fba];this[_0x4bd83e(0x198)][_0x4f0fba]=[];const _0x1fbdf1=VisuMZ[_0x4bd83e(0x148)][_0x4bd83e(0x16c)],_0x597347=_0xbe1e15['note']||'';if(_0x597347[_0x4bd83e(0x194)](_0x1fbdf1[_0x4bd83e(0x1e1)])){if(_0x4bd83e(0x1a6)===_0x4bd83e(0x1a6)){const _0x5e19fb=RegExp['$1']['split'](',')[_0x4bd83e(0x15f)](_0x508fe3=>_0x508fe3[_0x4bd83e(0x1ed)]());for(const _0xbbdc18 of _0x5e19fb){const _0x1cb366=/^\d+$/[_0x4bd83e(0x1ef)](_0xbbdc18);let _0x3c17cc=0x0;if(_0x1cb366){if(_0x4bd83e(0x159)!==_0x4bd83e(0x159)){const _0x2b749f=_0x57c3e3(_0x4a65e2['$1']);_0x2b749f<_0x479476?(_0x2544f6('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x4bd83e(0x1a2)](_0x1397aa,_0x2b749f,_0x4ca31a)),_0x82a42[_0x4bd83e(0x1d5)]()):_0x5461aa=_0x58a6e7['max'](_0x2b749f,_0x36745c);}else _0x3c17cc=Number(_0xbbdc18);}else _0x3c17cc=DataManager[_0x4bd83e(0x15a)](_0xbbdc18);if(_0x3c17cc){if(_0x4bd83e(0x1bb)!==_0x4bd83e(0x1bb)){if(!this['isSkill'](_0x5c0442))return![];const _0x122377=_0x22c983['id'];this[_0x4bd83e(0x1aa)]=this[_0x4bd83e(0x1aa)]||[];if(this['_isSkillStealable'][_0x4bd83e(0x13e)](_0x122377))return!![];const _0x3d22ac=_0x4b2165['SkillStealer'][_0x4bd83e(0x16c)],_0x4685d4=_0x30b104[_0x4bd83e(0x1ca)]||'';if(_0x4685d4[_0x4bd83e(0x194)](_0x3d22ac[_0x4bd83e(0x140)]))this[_0x4bd83e(0x1aa)]['push'](_0x122377);else _0x4685d4[_0x4bd83e(0x194)](_0x3d22ac[_0x4bd83e(0x1c6)])&&this['_isSkillStealable']['push'](_0x122377);return this['_isSkillStealable'][_0x4bd83e(0x13e)](_0x122377);}else this[_0x4bd83e(0x198)][_0x4f0fba]['push'](_0x3c17cc);}}}else this[_0x4bd83e(0x175)]();}if(this[_0x4bd83e(0x198)][_0x4f0fba][_0x4bd83e(0x16f)]<=0x0){if(_0x4bd83e(0x1d1)===_0x4bd83e(0x1d1))this[_0x4bd83e(0x198)][_0x4f0fba][_0x4bd83e(0x189)](0x0);else return this[_0x4bd83e(0x198)][_0xf6913f];}return this[_0x4bd83e(0x198)][_0x4f0fba];},SoundManager['playSkillSteal']=function(){const _0x97039b=_0x29edcb,_0x45d2b3=VisuMZ[_0x97039b(0x148)][_0x97039b(0x144)][_0x97039b(0x1b4)],_0x501679={'name':_0x45d2b3[_0x97039b(0x152)],'volume':_0x45d2b3[_0x97039b(0x16b)],'pitch':_0x45d2b3[_0x97039b(0x1eb)],'pan':_0x45d2b3['pan']};AudioManager['playSe'](_0x501679);},TextManager[_0x29edcb(0x1af)]={'learnFmt':VisuMZ[_0x29edcb(0x148)]['Settings'][_0x29edcb(0x13f)][_0x29edcb(0x180)]??'%1\x20learns\x20%3\x20from\x20%2!','tempFmt':VisuMZ[_0x29edcb(0x148)][_0x29edcb(0x144)][_0x29edcb(0x13f)]['tempFmt']??'%1\x20borrows\x20%3\x20from\x20%2!','nothingFmt':VisuMZ[_0x29edcb(0x148)][_0x29edcb(0x144)][_0x29edcb(0x13f)]['nothingFmt']??_0x29edcb(0x1b0),'failureFmt':VisuMZ[_0x29edcb(0x148)]['Settings'][_0x29edcb(0x13f)]['failureFmt']??_0x29edcb(0x176),'waitDuration':0x3c},ColorManager[_0x29edcb(0x173)]=function(_0x63b91e){const _0x58ba9b=_0x29edcb;return _0x63b91e=String(_0x63b91e),_0x63b91e['match'](/#(.*)/i)?_0x58ba9b(0x1a3)[_0x58ba9b(0x1a2)](String(RegExp['$1'])):this[_0x58ba9b(0x1e9)](Number(_0x63b91e));},SceneManager[_0x29edcb(0x1a4)]=function(){const _0x4d9e53=_0x29edcb;return this[_0x4d9e53(0x1d2)]&&this[_0x4d9e53(0x1d2)][_0x4d9e53(0x181)]===Scene_Battle;},VisuMZ[_0x29edcb(0x148)][_0x29edcb(0x1c2)]=Game_Action['prototype']['applyItemUserEffect'],Game_Action['prototype']['applyItemUserEffect']=function(_0x393c60){const _0x4afddf=_0x29edcb;VisuMZ[_0x4afddf(0x148)][_0x4afddf(0x1c2)][_0x4afddf(0x166)](this,_0x393c60),this[_0x4afddf(0x15c)](_0x393c60);},Game_Action[_0x29edcb(0x172)]['applySkillStealerEffect']=function(_0x62ccb7){const _0x706928=_0x29edcb;if(!this[_0x706928(0x19c)]())return;if(!_0x62ccb7||!this[_0x706928(0x1b9)]())return;if(_0x62ccb7[_0x706928(0x191)]()||this[_0x706928(0x1b9)]()[_0x706928(0x1b5)]())return;const _0x19b077=VisuMZ['SkillStealer'][_0x706928(0x16c)],_0x5f052f=this[_0x706928(0x19c)]()['note']||'';if(_0x5f052f[_0x706928(0x194)](_0x19b077[_0x706928(0x1ad)]))this[_0x706928(0x1d3)](_0x62ccb7,0x1,0x0,![]);else{if(_0x5f052f[_0x706928(0x194)](_0x19b077[_0x706928(0x1f2)])){if(_0x706928(0x1a7)!==_0x706928(0x1a7)){const _0x47bf52=_0x389cfc['_logWindow'];if(!_0x47bf52)return;if(!_0x46b88e||!this[_0x706928(0x1b9)]())return;const _0x3a7553=_0xd2ca41['SKILL_STEALER'][_0x1ec212];if(!_0x3a7553)return;const _0x3757c5=_0xde6c06?_0x315149[_0x706928(0x152)]:'',_0x17dbca=_0x3a7553[_0x706928(0x1a2)](this['subject']()[_0x706928(0x152)](),_0x1d76bc['name'](),_0x3757c5);_0x17dbca&&(_0x47bf52['addText'](_0x17dbca),_0x47bf52['waitForNewLine'](),_0x47bf52['_waitCount']=_0x102b85[_0x706928(0x1af)][_0x706928(0x1be)]);}else{const _0x368f98=Number(RegExp['$1'])*0.01;this[_0x706928(0x1d3)](_0x62ccb7,_0x368f98,0x0,![]);}}else{if(_0x5f052f[_0x706928(0x194)](_0x19b077[_0x706928(0x184)])){const _0x40b6a2=RegExp['$1'],_0x4176c7=/^\d+$/[_0x706928(0x1ef)](_0x40b6a2),_0x5247f9=_0x4176c7?Number(_0x40b6a2):DataManager[_0x706928(0x14e)](_0x40b6a2);this[_0x706928(0x1d3)](_0x62ccb7,0x1,_0x5247f9,![]);}else{if(_0x5f052f[_0x706928(0x194)](_0x19b077['StealSkillsStypeChance'])){const _0x5cce75=RegExp['$1'],_0x8757bf=Number(RegExp['$2'])*0.01,_0x37ea21=/^\d+$/[_0x706928(0x1ef)](_0x5cce75),_0x3168b0=_0x37ea21?Number(_0x5cce75):DataManager[_0x706928(0x14e)](_0x5cce75);this[_0x706928(0x1d3)](_0x62ccb7,_0x8757bf,_0x3168b0,![]);}else{if(_0x5f052f[_0x706928(0x194)](_0x19b077[_0x706928(0x1e6)]))this['processSkillStealEffect'](_0x62ccb7,0x1,0x0,!![]);else{if(_0x5f052f[_0x706928(0x194)](_0x19b077[_0x706928(0x14c)])){if(_0x706928(0x19a)===_0x706928(0x19d)){if(_0x16697d[_0x706928(0x194)](_0x56ecf5[_0x4f9616]))return!![];}else{const _0xfac78d=Number(RegExp['$1'])*0.01;this['processSkillStealEffect'](_0x62ccb7,_0xfac78d,0x0,!![]);}}else{if(_0x5f052f['match'](_0x19b077[_0x706928(0x1c8)])){if(_0x706928(0x192)!==_0x706928(0x16d)){const _0x34927f=RegExp['$1'],_0x1ced87=/^\d+$/[_0x706928(0x1ef)](_0x34927f),_0x2ceeda=_0x1ced87?Number(_0x34927f):DataManager['getStypeIdWithName'](_0x34927f);this[_0x706928(0x1d3)](_0x62ccb7,0x1,_0x2ceeda,!![]);}else return this[_0x706928(0x1b9)]()[_0x706928(0x19f)](),this[_0x706928(0x1b1)](_0x2aea74,_0x706928(0x188));}else{if(_0x5f052f[_0x706928(0x194)](_0x19b077[_0x706928(0x153)])){if(_0x706928(0x1ea)===_0x706928(0x1ba))_0x16eb6d(_0x706928(0x177)[_0x706928(0x1a2)](_0x1d4d9c,_0x323042)),_0x38988a[_0x706928(0x1d5)]();else{const _0x3520e2=RegExp['$1'],_0x1a1308=Number(RegExp['$2'])*0.01,_0x54415e=/^\d+$/['test'](_0x3520e2),_0x3100b3=_0x54415e?Number(_0x3520e2):DataManager['getStypeIdWithName'](_0x3520e2);this[_0x706928(0x1d3)](_0x62ccb7,_0x1a1308,_0x3100b3,!![]);}}}}}}}}}},Game_Action[_0x29edcb(0x172)][_0x29edcb(0x1d3)]=function(_0x93163f,_0x5c2faa,_0x53e777,_0x1d0297){const _0x75fc27=_0x29edcb;if(Math['random']()>_0x5c2faa){if('cGvls'!==_0x75fc27(0x186))return this[_0x75fc27(0x1b9)]()['onFailureStolenSkill'](),this['addLogWindowSkillStealEffectText'](_0x93163f,_0x75fc27(0x188));else{const _0x3aea73=_0x28c84f['$1'],_0xfbaf37=_0x7e2a8f(_0x8a2ca8['$2'])*0.01,_0x5be19a=/^\d+$/[_0x75fc27(0x1ef)](_0x3aea73),_0xfa4ce1=_0x5be19a?_0x49e1df(_0x3aea73):_0x1ebf03[_0x75fc27(0x14e)](_0x3aea73);this[_0x75fc27(0x1d3)](_0x3800e0,_0xfbaf37,_0xfa4ce1,![]);}}const _0x27aaee=_0x93163f[_0x75fc27(0x164)]()['filter'](_0x3c05e6=>!this[_0x75fc27(0x1b9)]()[_0x75fc27(0x1b8)](_0x3c05e6['id'])&&!this[_0x75fc27(0x1b9)]()[_0x75fc27(0x1d6)](_0x3c05e6['id']))[_0x75fc27(0x17a)](_0x401365=>VisuMZ[_0x75fc27(0x148)][_0x75fc27(0x156)](_0x53e777,_0x401365))[_0x75fc27(0x17a)](_0x3c70fd=>DataManager['skillStealableClasses'](_0x3c70fd)[_0x75fc27(0x13e)](0x0)||DataManager[_0x75fc27(0x154)](_0x3c70fd)[_0x75fc27(0x13e)](this['subject']()['currentClass']()['id']));if(_0x27aaee['length']<=0x0){if(_0x75fc27(0x15e)!==_0x75fc27(0x15e))this[_0x75fc27(0x1b9)]()[_0x75fc27(0x1d8)](_0x389377['id']),this[_0x75fc27(0x1b9)]()[_0x75fc27(0x17e)](_0x50a884),this[_0x75fc27(0x1b1)](_0x3b0f1c,_0x75fc27(0x1a8),_0x1909be);else return this[_0x75fc27(0x1b1)](_0x93163f,'nothingFmt');}const _0x4f96a2=_0x27aaee[Math[_0x75fc27(0x157)](_0x27aaee[_0x75fc27(0x16f)])];if(_0x4f96a2[_0x75fc27(0x1ca)][_0x75fc27(0x194)](VisuMZ[_0x75fc27(0x148)][_0x75fc27(0x16c)]['StealableSkillChance'])){const _0x2c3e8c=Number(RegExp['$1'])*0.01;if(Math[_0x75fc27(0x17b)]()>_0x2c3e8c){if(_0x75fc27(0x190)===_0x75fc27(0x14f))this[_0x75fc27(0x1c5)](_0x39e12b,_0x191104);else return this['subject']()[_0x75fc27(0x19f)](),this[_0x75fc27(0x1b1)](_0x93163f,_0x75fc27(0x188));}}this[_0x75fc27(0x1da)](_0x93163f),_0x1d0297?_0x75fc27(0x1c7)==='VLcoD'?(this['subject']()[_0x75fc27(0x1d8)](_0x4f96a2['id']),this[_0x75fc27(0x1b9)]()['onTemporaryStolenSkill'](_0x4f96a2),this[_0x75fc27(0x1b1)](_0x93163f,_0x75fc27(0x1a8),_0x4f96a2)):(_0x29210b['addText'](_0x5b01f8),_0x21d172[_0x75fc27(0x1c3)](),_0x44d53e[_0x75fc27(0x17d)]=_0x3ecdfa[_0x75fc27(0x1af)]['waitDuration']):_0x75fc27(0x1ce)!==_0x75fc27(0x1ce)?(this['subject']()[_0x75fc27(0x149)](_0x3e9314['id']),this[_0x75fc27(0x1b9)]()[_0x75fc27(0x18b)](_0x2ca5d7),this[_0x75fc27(0x1b1)](_0x55873f,_0x75fc27(0x180),_0x47b816)):(this[_0x75fc27(0x1b9)]()['learnSkill'](_0x4f96a2['id']),this[_0x75fc27(0x1b9)]()[_0x75fc27(0x18b)](_0x4f96a2),this[_0x75fc27(0x1b1)](_0x93163f,_0x75fc27(0x180),_0x4f96a2));},Game_Action[_0x29edcb(0x172)][_0x29edcb(0x1b1)]=function(_0x44f21e,_0x24c45f,_0x314dff){const _0x1e7f43=_0x29edcb,_0xb6d454=BattleManager['_logWindow'];if(!_0xb6d454)return;if(!_0x44f21e||!this[_0x1e7f43(0x1b9)]())return;const _0x3abc32=TextManager[_0x1e7f43(0x1af)][_0x24c45f];if(!_0x3abc32)return;const _0x17665e=_0x314dff?_0x314dff['name']:'',_0x2a59f0=_0x3abc32[_0x1e7f43(0x1a2)](this['subject']()[_0x1e7f43(0x152)](),_0x44f21e['name'](),_0x17665e);_0x2a59f0&&(_0xb6d454[_0x1e7f43(0x143)](_0x2a59f0),_0xb6d454[_0x1e7f43(0x1c3)](),_0xb6d454[_0x1e7f43(0x17d)]=TextManager[_0x1e7f43(0x1af)]['waitDuration']);},VisuMZ[_0x29edcb(0x148)][_0x29edcb(0x1de)]=Game_Battler['prototype']['onBattleStart'],Game_Battler[_0x29edcb(0x172)][_0x29edcb(0x1e2)]=function(_0x580821){const _0x56c1cf=_0x29edcb;this[_0x56c1cf(0x191)]()&&this['clearTemporaryStolenSkills'](),VisuMZ[_0x56c1cf(0x148)]['Game_Battler_onBattleStart'][_0x56c1cf(0x166)](this,_0x580821);},VisuMZ['SkillStealer'][_0x29edcb(0x19b)]=Game_Battler['prototype'][_0x29edcb(0x174)],Game_Battler[_0x29edcb(0x172)][_0x29edcb(0x174)]=function(){const _0x3baf9c=_0x29edcb;if(this['isActor']()){if(_0x3baf9c(0x1e8)!==_0x3baf9c(0x1e8)){const _0x166f51=_0x4c683b['SkillStealer'][_0x3baf9c(0x144)][_0x3baf9c(0x1b4)],_0x51ecd2={'name':_0x166f51['name'],'volume':_0x166f51[_0x3baf9c(0x16b)],'pitch':_0x166f51[_0x3baf9c(0x1eb)],'pan':_0x166f51[_0x3baf9c(0x1df)]};_0x5e4b13[_0x3baf9c(0x1ae)](_0x51ecd2);}else this[_0x3baf9c(0x175)]();}VisuMZ['SkillStealer'][_0x3baf9c(0x19b)][_0x3baf9c(0x166)](this);},Game_Actor[_0x29edcb(0x172)]['clearTemporaryStolenSkills']=function(){const _0xdbcd4=_0x29edcb;this[_0xdbcd4(0x182)]=[];},Game_Actor['prototype'][_0x29edcb(0x1c4)]=function(){const _0x579301=_0x29edcb;return this[_0x579301(0x182)]===undefined&&(_0x579301(0x1cd)==='UKMSe'?this[_0x579301(0x175)]():(_0x34226[_0x579301(0x18c)](),this[_0x579301(0x178)](_0x579301(0x1b7)))),this[_0x579301(0x182)][_0x579301(0x15f)](_0x110bdc=>$dataSkills[_0x110bdc]);},Game_Actor['prototype']['hasTemporaryStolenSkill']=function(_0xe52ccd){const _0x3377da=_0x29edcb;return this[_0x3377da(0x182)]===undefined&&this['clearTemporaryStolenSkills'](),this[_0x3377da(0x182)][_0x3377da(0x13e)](_0xe52ccd);},Game_Actor[_0x29edcb(0x172)][_0x29edcb(0x1d8)]=function(_0x45b6a8){const _0x29a2ce=_0x29edcb,_0x199bfd=$dataSkills[_0x45b6a8];if(!_0x199bfd)return;if(this[_0x29a2ce(0x151)]()['includes'](_0x199bfd))return;if(this[_0x29a2ce(0x182)]===undefined){if(_0x29a2ce(0x141)===_0x29a2ce(0x1e3))return this[_0x29a2ce(0x1b1)](_0x165bf0,_0x29a2ce(0x18a));else this[_0x29a2ce(0x175)]();}this[_0x29a2ce(0x182)][_0x29a2ce(0x189)](_0x45b6a8),this['_temporaryStolenSkillIDs'][_0x29a2ce(0x1e0)]((_0x2edb1f,_0x2cdf79)=>_0x2edb1f-_0x2cdf79);},VisuMZ[_0x29edcb(0x148)][_0x29edcb(0x171)]=Game_Actor[_0x29edcb(0x172)][_0x29edcb(0x151)],Game_Actor[_0x29edcb(0x172)]['skills']=function(){const _0x435ecd=_0x29edcb,_0x57ca19=VisuMZ[_0x435ecd(0x148)]['Game_Actor_skills'][_0x435ecd(0x166)](this);if($gameParty[_0x435ecd(0x147)]())return _0x57ca19[_0x435ecd(0x158)](this['temporaryStolenSkills']());else{if('GMGmS'===_0x435ecd(0x1cb))return _0x57ca19;else{const _0x187880=_0x5068a1[_0x162450];if(!_0x187880)return;if(this[_0x435ecd(0x151)]()[_0x435ecd(0x13e)](_0x187880))return;this[_0x435ecd(0x182)]===_0xdeeefc&&this[_0x435ecd(0x175)](),this[_0x435ecd(0x182)][_0x435ecd(0x189)](_0x287e8c),this[_0x435ecd(0x182)]['sort']((_0x45b49a,_0x2d9ee5)=>_0x45b49a-_0x2d9ee5);}}},Game_Actor[_0x29edcb(0x172)][_0x29edcb(0x19f)]=function(){const _0x5dfee0=_0x29edcb;SoundManager['playBuzzer'](),this[_0x5dfee0(0x178)](_0x5dfee0(0x1b7));},Game_Actor[_0x29edcb(0x172)][_0x29edcb(0x17e)]=function(_0x103af7){const _0x3b8f73=_0x29edcb;SoundManager['playSkillSteal'](),this[_0x3b8f73(0x178)](_0x3b8f73(0x19e),_0x103af7);},Game_Actor[_0x29edcb(0x172)][_0x29edcb(0x18b)]=function(_0x59360d){const _0x50783d=_0x29edcb;SoundManager[_0x50783d(0x160)](),this[_0x50783d(0x178)](_0x50783d(0x1ec),_0x59360d);},Game_Actor[_0x29edcb(0x172)][_0x29edcb(0x178)]=function(_0x566ed8,_0x4b8214){const _0x4071d2=_0x29edcb;if(!SceneManager[_0x4071d2(0x1a4)]())return![];const _0x405205=VisuMZ[_0x4071d2(0x148)][_0x4071d2(0x144)]['Effect'];if(!_0x405205)return;if(Imported[_0x4071d2(0x165)]){if(_0x405205[_0x4071d2(0x1d0)[_0x4071d2(0x1a2)](_0x566ed8)]>0x0){if(_0x4071d2(0x1c0)!==_0x4071d2(0x167)){const _0xf6b5d=[this],_0x46b261=_0x405205[_0x4071d2(0x1d0)[_0x4071d2(0x1a2)](_0x566ed8)],_0x2adbaa=_0x405205[_0x4071d2(0x1a5)],_0x2b2564=_0x405205[_0x4071d2(0x1a1)];$gameTemp[_0x4071d2(0x145)](_0xf6b5d,_0x46b261,_0x2adbaa,_0x2b2564);}else _0x34dce7(_0x4071d2(0x179)[_0x4071d2(0x1a2)](_0x2b2fde,_0xd78ead,_0x3a0487)),_0x1ad017[_0x4071d2(0x1d5)]();}}if(Imported[_0x4071d2(0x17f)]){if(_0x405205[_0x4071d2(0x1cc)[_0x4071d2(0x1a2)](_0x566ed8)]!==''){const _0x4476d2=_0x405205[_0x4071d2(0x1cc)[_0x4071d2(0x1a2)](_0x566ed8)],_0x371826=_0x4476d2[_0x4071d2(0x1a2)](_0x4b8214?_0x4b8214[_0x4071d2(0x152)]:''),_0x531812={'textColor':_0x405205['%1TextColor'[_0x4071d2(0x1a2)](_0x566ed8)],'flashColor':_0x405205[_0x4071d2(0x170)[_0x4071d2(0x1a2)](_0x566ed8)],'flashDuration':_0x405205[_0x4071d2(0x187)[_0x4071d2(0x1a2)](_0x566ed8)]};if(_0x4b8214){if(_0x4071d2(0x1bf)!==_0x4071d2(0x14b))this['setupIconTextPopup'](_0x4b8214[_0x4071d2(0x18e)],_0x371826,_0x531812);else{const _0x4509c1=_0x35f8d8(_0x90dc1f['$1'])*0.01;if(_0x1fe071[_0x4071d2(0x17b)]()>_0x4509c1)return this['subject']()[_0x4071d2(0x19f)](),this[_0x4071d2(0x1b1)](_0x5c8768,_0x4071d2(0x188));}}else _0x4071d2(0x1ee)!=='CiaBC'?(_0x281d12['playSkillSteal'](),this['playSkillStealEffect']('Perm',_0x323e47)):this[_0x4071d2(0x1c5)](_0x371826,_0x531812);}}},Game_Enemy[_0x29edcb(0x172)][_0x29edcb(0x151)]=function(){const _0x273fcd=_0x29edcb,_0x3dca68=[];for(const _0x872c0b of this[_0x273fcd(0x14d)]()[_0x273fcd(0x1e5)]){const _0x137411=$dataSkills[_0x872c0b['skillId']];if(_0x137411&&!_0x3dca68['includes'](_0x137411))_0x3dca68[_0x273fcd(0x189)](_0x137411);}return _0x3dca68;},Game_Enemy[_0x29edcb(0x172)][_0x29edcb(0x164)]=function(){const _0x559930=_0x29edcb;return this['skills']()[_0x559930(0x17a)](_0x8ea8a5=>DataManager[_0x559930(0x1f0)](_0x8ea8a5));};function _0x2146(){const _0x59a184=['RAhBw','volume','RegExp','BmTYo','description','length','%1FlashColor','Game_Actor_skills','prototype','getColor','onBattleEnd','clearTemporaryStolenSkills','%1\x20failed\x20to\x20steal\x20a\x20skill\x20from\x20%2.','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','playSkillStealEffect','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','filter','random','603478pdyutb','_waitCount','onTemporaryStolenSkill','VisuMZ_1_BattleCore','learnFmt','constructor','_temporaryStolenSkillIDs','isSkill','StealSkillsStype','3fCLlOI','wRgTs','%1FlashDuration','failureFmt','push','nothingFmt','onPermanentStolenSkill','playBuzzer','ARRAYFUNC','iconIndex','_stypeIDs','BTTHH','isActor','umHeC','5222378ugbNlH','match','1777140jaMeak','ARRAYSTR','nAiaU','_skillStealableClasses','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','uPWdE','Game_Battler_onBattleEnd','item','mLSbL','Temp','onFailureStolenSkill','_classIDs','Mute','format','#%1','isSceneBattle','Mirror','ZopoT','UkzAB','tempFmt','STR','_isSkillStealable','return\x200','2169621vrpRjw','StealSkills','playSe','SKILL_STEALER','%1\x20could\x20not\x20learn\x20anything\x20from\x20%2.','addLogWindowSkillStealEffectText','TivRZ','whMQe','Sound','isEnemy','ConvertParams','Fail','isLearnedSkill','subject','LZdgb','kxQlj','toUpperCase','getSkillIdWithName','waitDuration','ZYrgV','LoXwY','705112ZpZOOq','Game_Action_applyItemUserEffect','waitForNewLine','temporaryStolenSkills','setupTextPopup','StealableSkillChance','VLcoD','TempStealSkillsStype','xvDwJ','note','GMGmS','%1PopupText','UKMSe','nAAjt','ARRAYNUM','%1AnimationID','acRJd','_scene','processSkillStealEffect','FUNC','exit','hasTemporaryStolenSkill','heqpD','addTemporaryStolenSkill','iaUcJ','makeSuccess','55376uSHtBF','ARRAYSTRUCT','stypeId','Game_Battler_onBattleStart','pan','sort','StealableForClasses','onBattleStart','eOJtT','ARRAYJSON','actions','TempStealSkills','replace','XOVTB','textColor','GzSgJ','pitch','Perm','trim','CiaBC','test','isSkillStealable','2236530Tskzbw','StealSkillsChance','includes','Vocab','StealableSkill','MEkvN','171DSEFPZ','addText','Settings','requestFauxAnimation','status','inBattle','SkillStealer','learnSkill','JSON','vYBvt','TempStealSkillsChance','enemy','getStypeIdWithName','aBhju','mHoLh','skills','name','TempStealSkillsStypeChance','skillStealableClasses','parameters','HasMatchingSkillTypes','randomInt','concat','QKLAr','getClassIdWithName','version','applySkillStealerEffect','AgiCB','GxoBQ','map','playSkillSteal','parse','getSkillTypes','_skillIDs','stealableSkills','VisuMZ_0_CoreEngine','call','LiPvr','skillTypes','skillId'];_0x2146=function(){return _0x59a184;};return _0x2146();}