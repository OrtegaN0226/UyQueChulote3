//=============================================================================
// VisuStella MZ - Limited Skill Uses
// VisuMZ_3_LimitedSkillUses.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_LimitedSkillUses = true;

var VisuMZ = VisuMZ || {};
VisuMZ.LimitedSkillUses = VisuMZ.LimitedSkillUses || {};
VisuMZ.LimitedSkillUses.version = 1.05;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.05] [LimitedSkillUses]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Limited_Skill_Uses_VisuStella_MZ
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin enables you to set a limited amount of times certain skills (or
 * all skills) can be used per battle or ever. This adds a different type of
 * skill currency and balance mechanic in limiting the amount of times a skill
 * can be used without directly having to alter MP, TP, or the like.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Determine globally or individually how many skill uses a battler can use
 *   per battle (does not apply to basic attack and guard skills).
 * * Determine how many uses are restored per battle.
 * * Use notetag effects to alter the amount of uses a user or target has
 *   globally, for specific skill types, or for specific individual skills.
 * * Adjust how the limited uses are displayed in-game.
 * * Equipment, class types, states, etc. can all affect the maximum quantity
 *   of uses for skills, too.
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
 * * VisuMZ_1_SkillsStatesCore
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
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === Basic Limited Use-Related Notetags ===
 * 
 * ---
 *
 * <Limited Uses: x>
 *
 * - Used for: Skill Notetags
 * - Sets the limited use maximum base amount for this skill.
 * - This value will override the Plugin Parameter settings for a base value if
 *   "All Skills Limited?" is turned on.
 * - Replace 'x' with a number value representing the base maximum uses this
 *   skill can have.
 *
 * ---
 *
 * <Unlimited Use>
 *
 * - Used for: Skill Notetags
 * - If the Plugin Parameter "All Skills Limited?" is turned on, this will
 *   disable limited uses for this skill, allowing it to be used in unlimited
 *   amounts independent of the Limited Use base.
 *
 * ---
 * 
 * === Use Recovery-Related Notetags ===
 * 
 * ---
 *
 * <Victory Uses Recover: x>
 * <Escape Uses Recover: x>
 * <Defeat Uses Recover: x>
 * <After Battle Uses Recover: x>
 *
 * - Used for: Skill Notetags
 * - Determines how many limited uses are recovered at the end of each battle
 *   depending on the result.
 *   - Victory notetag variant requires winning the battle.
 *   - Escape notetag variant requires escaping the battle.
 *   - Defeat notetag variant requires losing the battle.
 *   - After Battle notetag variant applies to all cases.
 * - Replace 'x' with how many uses are restored upon completing a battle.
 *
 * ---
 *
 * <Bypass Recover All Uses>
 *
 * - Used for: Skill Notetags
 * - This prevents the skill from recovering all uses with the "Recover All"
 *   event command.
 *
 * ---
 *
 * <Allow Recover All Uses>
 *
 * - Used for: Skill Notetags
 * - This allows the skill to recover all uses with the "Recover All" event
 *   command when the "Recover All?" plugin parameter is disabled.
 *
 * ---
 * 
 * === Use Alteration-Related Notetags ===
 * 
 * ---
 *
 * <User Global Uses: +x>
 * <User Global Uses: -x>
 *
 * <User SType id Uses: +x>
 * <User SType id Uses: -x>
 * <User SType name Uses: +x>
 * <User SType name Uses: -x>
 *
 * <User Skill id Uses: +x>
 * <User Skill id Uses: -x>
 * <User Skill name Uses: +x>
 * <User Skill name Uses: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the limited use amounts for the action's user.
 *   - Global notetag variant affects all limited uses.
 *   - SType notetag variant effects all skills with a matching type.
 *   - Skill notetag viarant effects a specific matching skill.
 * - This effect will only trigger once per action even if there are
 *   multiple hits as long as it successfully hits one target.
 * - Replace 'id' with the ID of the skill type.
 * - Replace 'name' with the name of the skill type (without text codes).
 * - Replace 'x' with the amount to alter the remaining uses by. Positive
 *   values restore uses while negative values reduce remaining uses.
 *
 * ---
 *
 * <Target Global Uses: +x>
 * <Target Global Uses: -x>
 *
 * <Target SType id Uses: +x>
 * <Target SType id Uses: -x>
 * <Target SType name Uses: +x>
 * <Target SType name Uses: -x>
 *
 * <Target Skill id Uses: +x>
 * <Target Skill id Uses: -x>
 * <Target Skill name Uses: +x>
 * <Target Skill name Uses: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the limited use amounts for the action's target.
 *   - Global notetag variant affects all limited uses.
 *   - SType notetag variant effects all skills with a matching type.
 *     - Replace 'id' with the ID of the skill type.
 *     - Replace 'name' with the name of the skill type (without text codes).
 *   - Skill notetag viarant effects a specific matching skill.
 *     - Replace 'id' with the ID of the skill.
 *     - Replace 'name' with the name of the skill.
 * - This effect will trigger with each successful hit against its target.
 * - Replace 'x' with the amount to alter the remaining uses by. Positive
 *   values restore uses while negative values reduce remaining uses.
 *
 * ---
 * 
 * === Trait Based-Related Notetags ===
 * 
 * ---
 *
 * <Gloal Use Max: +x>
 * <Gloal Use Max: -x>
 * 
 * <SType id Use Max: +x>
 * <SType id Use Max: -x>
 * <SType name Use Max: +x>
 * <SType name Use Max: -x>
 * 
 * <Skill id Use Max: +x>
 * <Skill id Use Max: -x>
 * <Skill name Use Max: +x>
 * <Skill name Use Max: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes the maximum limited uses for all skills, skills of a particular
 *   type, or individual skills.
 *   - Global notetag variant affects all limited uses.
 *   - SType notetag variant effects all skills with a matching type.
 *     - Replace 'id' with the ID of the skill type.
 *     - Replace 'name' with the name of the skill type (without text codes).
 *   - Skill notetag viarant effects a specific matching skill.
 *     - Replace 'id' with the ID of the skill.
 *     - Replace 'name' with the name of the skill.
 * - Replace 'x' with the amount to adjust the maximum uses by. Positive values
 *   increase the maximum uses while negative values decrease them.
 *   - These will be hard capped by the settings found in the Plugin Parmeters.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings regarding Limited Skill Uses.
 *
 * ---
 *
 * General
 * 
 *   Limited Use Icon:
 *   - Icon used for representing Limited Uses in the cost.
 * 
 *   Cost Format:
 *   - Format for Limited Use cost display.
 *   - %1 - Remaining, %2 - Max Uses, %3 - Times Used, %4 - Icon
 * 
 *   Empty Format:
 *   - Format for Limited Use cost display when empty.
 *   - %1 - Remaining, %2 - Max Uses, %3 - Times Used, %4 - Icon
 * 
 *   Cost Position Front?:
 *   - Put the Limited Uses at the front of skill/item costs?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanical settings regarding Limited Skill Uses.
 *
 * ---
 *
 * All Limited
 * 
 *   All Skills Limited?:
 *   - Make all skills have limited uses?
 *   - Does not apply to basic attack and guard.
 * 
 *     Default Max:
 *     - If all skills are limited, what is the default maximum uses?
 *
 * ---
 *
 * Hard Caps
 * 
 *   Maximum:
 *   - What is the maximum hardcap for limited uses?
 * 
 *   Minimum:
 *   - What is the minimum hardcap for limited uses?
 *
 * ---
 *
 * Recovery
 * 
 *   Battle Victory:
 *   - How many uses for each skill does a victory restore by default?
 * 
 *   Battle Escape:
 *   - How many uses for each skill does an escape restore by default?
 * 
 *   Battle Defeat:
 *   - How many uses for each skill does a defeat restore by default?
 * 
 *   Recover All?:
 *   - Does the "Recover All" command restore Limited Skill Uses?
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
 * Version 1.05: April 17, 2025
 * * Compatibility Update!
 * ** Added better compatibility with Skills & States Core's new Skill Toggles.
 * 
 * Version 1.04: May 5, 2022
 * * Documentation Update
 * ** Added a line for the <User Global Uses: +x>, <User SType id Uses: +x>,
 *    and <User Skill id Uses: +x> line of notetag effects:
 * *** This effect will only trigger once per action even if there are
 *     multiple hits as long as it successfully hits one target.
 * ** Added a line for the <Target Global Uses: +x>, <Target SType id Uses: +x>
 *    and <Target Skill id Uses: +x> line of notetag effects:
 * *** This effect will trigger with each successful hit against its target.
 * * Feature Update!
 * ** The user-based limited use change notetag effect will now only trigger
 *    once per action regardless of multiple hits or multiple targets. This
 *    will be different from the target-based limited use change where it will
 *    remain an effect that procs each time the target is hit.
 * 
 * Version 1.03: April 14, 2022
 * * Bug Fixes!
 * ** Limited uses will now recover for battle commands that are not a part of
 *    any learned skill sets. Fix made by Arisu.
 * 
 * Version 1.02: January 13, 2022
 * * Feature Update!
 * ** Removed unused template plugin commands. Update made by Arisu.
 * 
 * Version 1.01: March 26, 2021
 * * Compatibility Update!
 * ** Skill type limited uses now affect all skill types with skills that have
 *    multiple skill types declared through the Skills and States Core.
 * 
 * Version 1.00 Official Release Date: March 10, 2021
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
 * @param LimitedSkillUses
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
 * @desc General settings regarding Limited Skill Uses.
 * @default {"Icon:num":"160","CostFmt:str":"\\FS[22]\\C[8]%1/%2\\C[0]","EmptyFmt:str":"\\FS[22]\\C[8]Empty\\C[0]","CostPosition:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Mechanical settings regarding Limited Skill Uses.
 * @default {"AllLimited":"","AllLimited:eval":"false","DefaultMax:num":"2","HardCaps":"","Maximum:num":"100","Minimum:num":"1","Recovery":"","BattleVictory:num":"10","BattleEscape:num":"5","BattleDefeat:num":"5","RecoverAll:eval":"true"}
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
 * @param Icon:num
 * @text Limited Use Icon
 * @desc Icon used for representing Limited Uses in the cost.
 * @default 160
 *
 * @param CostFmt:str
 * @text Cost Format
 * @desc Format for Limited Use cost display.
 * %1 - Remaining, %2 - Max Uses, %3 - Times Used, %4 - Icon
 * @default \FS[22]\C[8]%1/%2\C[0]
 *
 * @param EmptyFmt:str
 * @text Empty Format
 * @desc Format for Limited Use cost display when empty.
 * %1 - Remaining, %2 - Max Uses, %3 - Times Used, %4 - Icon
 * @default \FS[22]\C[8]Empty\C[0]
 *
 * @param CostPosition:eval
 * @text Cost Position Front?
 * @type boolean
 * @on Front
 * @off Back
 * @desc Put the Limited Uses at the front of skill/item costs?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param AllLimited
 * @text All Limited
 *
 * @param AllLimited:eval
 * @text All Skills Limited?
 * @parent AllLimited
 * @type boolean
 * @on Limited
 * @off Normal
 * @desc Make all skills have limited uses?
 * Does not apply to basic attack and guard.
 * @default false
 *
 * @param DefaultMax:num
 * @text Default Max
 * @parent AllLimited:eval
 * @type number
 * @min 1
 * @desc If all skills are limited, what is the default maximum uses?
 * @default 2
 *
 * @param HardCaps
 * @text Hard Caps
 *
 * @param Maximum:num
 * @text Maximum
 * @parent HardCaps
 * @type number
 * @desc What is the maximum hardcap for limited uses?
 * @default 100
 *
 * @param Minimum:num
 * @text Minimum
 * @parent HardCaps
 * @type number
 * @desc What is the minimum hardcap for limited uses?
 * @default 1
 *
 * @param Recovery
 *
 * @param BattleVictory:num
 * @text Battle Victory
 * @parent Recovery
 * @type number
 * @desc How many uses for each skill does a victory restore by default?
 * @default 10
 *
 * @param BattleEscape:num
 * @text Battle Escape
 * @parent Recovery
 * @type number
 * @desc How many uses for each skill does an escape restore by default?
 * @default 5
 *
 * @param BattleDefeat:num
 * @text Battle Defeat
 * @parent Recovery
 * @type number
 * @desc How many uses for each skill does a defeat restore by default?
 * @default 5
 *
 * @param RecoverAll:eval
 * @text Recover All?
 * @parent Recovery
 * @type boolean
 * @on Recovers
 * @off Does Not
 * @desc Does the "Recover All" command restore Limited Skill Uses?
 * @default true
 *
 */
//=============================================================================

const _0x255838=_0x185f;function _0x4064(){const _0xb6a983=['skills','_triggeredLimitedUseUserChange','limitedUseIcon','JSON','trim','RecoverEscape','3984218KLsjiT','limitedUseEmptyFmt','Minimum','filter','Window_Base_makeAdditionalSkillCostText','LIMITED_SKILL_USE_RECOVERY','getSkillIdWithName','CostFmt','applyItemUserEffect','2nJvwNR','isSkillLimitedUse','applyLimitedSkillUsesUserEffect','SkillLimitedUses','Game_Action_applyItemUserEffect','match','guardSkillId','status','name','limitedUseFmt','STypeLimitedUses','defeat','LIMITED_SKILL_USE_RECOVER_ALL','9nOgXzy','isSkillToggled','map','Game_Action_testItemEffect','allMembers','skillLimitedUseMax','LimitedSkillUses','LIMITED_SKILL_USE_ALL_LIMITED','UserSkillLimitedUses','canRecoverAllLimitedSkillUses','parameters','traitObjects','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','DefaultMax','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','273932QsyoOs','_stypeIDs','parse','Mechanics','alterLimitedSkillUses','ARRAYNUM','format','UnlimitedUse','366740iHCeHZ','meetsSkillConditions','version','Maximum','makeAdditionalCostTextLimitedSkillUses','EVAL','_cache_SkillLimitedUseMax','VisuMZ_1_SkillsStatesCore','ARRAYFUNC','LimitedUse','TargetSTypeLimitedUses','ConvertParams','AllLimited','replace','exit','STR','skillLimitedUseTimes','includes','_skillIDs','recoverAll','skillTypes','test','refresh','RegExp','TargetSkillLimitedUses','max','prototype','BattleManager_endBattle','attackSkillId','368704XoZSxo','paySkillLimitedUse','5AWIuaZ','stypeId','call','skillCostSeparator','50OBEyUb','21oPNHKB','6642132jXJcVB','subject','clamp','recoverAllLimitedSkillUses','setSkillLimitedUseTimes','General','endBattleRecoveryLimitedSkillUses','endBattle','description','ARRAYJSON','395196eSXqkF','recoverLimitedSkillUses','isAttackOrGuardSkill','_skillLimitedUseTimes','getSkillTypes','escape','FUNC','Game_BattlerBase_paySkillCost','BypassRecoverAll','makeAdditionalSkillCostText','ARRAYSTR','item','Game_BattlerBase_refresh','isToggleSkill','recoverLimitedSkillUsesBattle','GlobalLimitedUses','toUpperCase','LIMITED_SKILL_USE_BASE','\x5cI[%1]','RecoverAll','_inBattle','ARRAYSTRUCT','note','LIMITED_SKILL_USE_HARDCAP_MAX','getStypeIdWithName','AllowRecoverAll','UserGlobalLimitedUses','522878jLHxoR','UserSTypeLimitedUses','LIMITED_SKILL_USE_HARDCAP_MIN','calcSkillLimitedUseMax','ARRAYEVAL','Settings','testItemEffect','STRUCT'];_0x4064=function(){return _0xb6a983;};return _0x4064();}function _0x185f(_0x1b0b69,_0x4a5416){const _0x406492=_0x4064();return _0x185f=function(_0x185fce,_0x312d24){_0x185fce=_0x185fce-0x19b;let _0x5d9a7e=_0x406492[_0x185fce];return _0x5d9a7e;},_0x185f(_0x1b0b69,_0x4a5416);}(function(_0x2b675f,_0x1df130){const _0x2009d0=_0x185f,_0x521812=_0x2b675f();while(!![]){try{const _0x5cf7a5=-parseInt(_0x2009d0(0x1c0))/0x1*(parseInt(_0x2009d0(0x1d7))/0x2)+parseInt(_0x2009d0(0x21f))/0x3*(-parseInt(_0x2009d0(0x1f3))/0x4)+parseInt(_0x2009d0(0x21a))/0x5*(parseInt(_0x2009d0(0x1a5))/0x6)+parseInt(_0x2009d0(0x1ce))/0x7+-parseInt(_0x2009d0(0x218))/0x8*(parseInt(_0x2009d0(0x1e4))/0x9)+-parseInt(_0x2009d0(0x21e))/0xa*(-parseInt(_0x2009d0(0x1fb))/0xb)+parseInt(_0x2009d0(0x19b))/0xc;if(_0x5cf7a5===_0x1df130)break;else _0x521812['push'](_0x521812['shift']());}catch(_0x180b44){_0x521812['push'](_0x521812['shift']());}}}(_0x4064,0x4aed8));var label='LimitedSkillUses',tier=tier||0x0,dependencies=[_0x255838(0x202)],pluginData=$plugins[_0x255838(0x1d1)](function(_0x5021e4){const _0x3df906=_0x255838;return _0x5021e4[_0x3df906(0x1de)]&&_0x5021e4[_0x3df906(0x1a3)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x255838(0x1c5)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x255838(0x206)]=function(_0x546959,_0x3b2f8f){const _0x1ba328=_0x255838;for(const _0x3666ef in _0x3b2f8f){if(_0x3666ef['match'](/(.*):(.*)/i)){const _0x4a7821=String(RegExp['$1']),_0x4d8bd7=String(RegExp['$2'])['toUpperCase']()[_0x1ba328(0x1cc)]();let _0x99d8ab,_0x45dea0,_0x39b20e;switch(_0x4d8bd7){case'NUM':_0x99d8ab=_0x3b2f8f[_0x3666ef]!==''?Number(_0x3b2f8f[_0x3666ef]):0x0;break;case _0x1ba328(0x1f8):_0x45dea0=_0x3b2f8f[_0x3666ef]!==''?JSON['parse'](_0x3b2f8f[_0x3666ef]):[],_0x99d8ab=_0x45dea0[_0x1ba328(0x1e6)](_0x166bd2=>Number(_0x166bd2));break;case _0x1ba328(0x200):_0x99d8ab=_0x3b2f8f[_0x3666ef]!==''?eval(_0x3b2f8f[_0x3666ef]):null;break;case _0x1ba328(0x1c4):_0x45dea0=_0x3b2f8f[_0x3666ef]!==''?JSON[_0x1ba328(0x1f5)](_0x3b2f8f[_0x3666ef]):[],_0x99d8ab=_0x45dea0[_0x1ba328(0x1e6)](_0x3b6db8=>eval(_0x3b6db8));break;case _0x1ba328(0x1cb):_0x99d8ab=_0x3b2f8f[_0x3666ef]!==''?JSON[_0x1ba328(0x1f5)](_0x3b2f8f[_0x3666ef]):'';break;case _0x1ba328(0x1a4):_0x45dea0=_0x3b2f8f[_0x3666ef]!==''?JSON[_0x1ba328(0x1f5)](_0x3b2f8f[_0x3666ef]):[],_0x99d8ab=_0x45dea0['map'](_0x426637=>JSON[_0x1ba328(0x1f5)](_0x426637));break;case _0x1ba328(0x1ab):_0x99d8ab=_0x3b2f8f[_0x3666ef]!==''?new Function(JSON[_0x1ba328(0x1f5)](_0x3b2f8f[_0x3666ef])):new Function('return\x200');break;case _0x1ba328(0x203):_0x45dea0=_0x3b2f8f[_0x3666ef]!==''?JSON[_0x1ba328(0x1f5)](_0x3b2f8f[_0x3666ef]):[],_0x99d8ab=_0x45dea0[_0x1ba328(0x1e6)](_0x27cae1=>new Function(JSON[_0x1ba328(0x1f5)](_0x27cae1)));break;case _0x1ba328(0x20a):_0x99d8ab=_0x3b2f8f[_0x3666ef]!==''?String(_0x3b2f8f[_0x3666ef]):'';break;case _0x1ba328(0x1af):_0x45dea0=_0x3b2f8f[_0x3666ef]!==''?JSON[_0x1ba328(0x1f5)](_0x3b2f8f[_0x3666ef]):[],_0x99d8ab=_0x45dea0['map'](_0x1a4fac=>String(_0x1a4fac));break;case _0x1ba328(0x1c7):_0x39b20e=_0x3b2f8f[_0x3666ef]!==''?JSON[_0x1ba328(0x1f5)](_0x3b2f8f[_0x3666ef]):{},_0x99d8ab=VisuMZ['ConvertParams']({},_0x39b20e);break;case _0x1ba328(0x1ba):_0x45dea0=_0x3b2f8f[_0x3666ef]!==''?JSON[_0x1ba328(0x1f5)](_0x3b2f8f[_0x3666ef]):[],_0x99d8ab=_0x45dea0[_0x1ba328(0x1e6)](_0x35c263=>VisuMZ[_0x1ba328(0x206)]({},JSON[_0x1ba328(0x1f5)](_0x35c263)));break;default:continue;}_0x546959[_0x4a7821]=_0x99d8ab;}}return _0x546959;},(_0x3a9bba=>{const _0xcae3ff=_0x255838,_0x5ea8f9=_0x3a9bba[_0xcae3ff(0x1df)];for(const _0x6b36dd of dependencies){if(!Imported[_0x6b36dd]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0xcae3ff(0x1f9)](_0x5ea8f9,_0x6b36dd)),SceneManager[_0xcae3ff(0x209)]();break;}}const _0x5c0ed4=_0x3a9bba[_0xcae3ff(0x1a3)];if(_0x5c0ed4['match'](/\[Version[ ](.*?)\]/i)){const _0x49aea5=Number(RegExp['$1']);_0x49aea5!==VisuMZ[label][_0xcae3ff(0x1fd)]&&(alert(_0xcae3ff(0x1f0)['format'](_0x5ea8f9,_0x49aea5)),SceneManager[_0xcae3ff(0x209)]());}if(_0x5c0ed4[_0xcae3ff(0x1dc)](/\[Tier[ ](\d+)\]/i)){const _0x55a683=Number(RegExp['$1']);_0x55a683<tier?(alert(_0xcae3ff(0x1f2)[_0xcae3ff(0x1f9)](_0x5ea8f9,_0x55a683,tier)),SceneManager[_0xcae3ff(0x209)]()):tier=Math[_0xcae3ff(0x214)](_0x55a683,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0xcae3ff(0x1c5)],_0x3a9bba[_0xcae3ff(0x1ee)]);})(pluginData),VisuMZ['LimitedSkillUses'][_0x255838(0x212)]={'LimitedUse':/<(?:LIMIT|LIMITED) (?:USE|USES):[ ](\d+)>/i,'UnlimitedUse':/<UNLIMITED (?:USE|USES)>/i,'RecoverVictory':/<(?:VICTORY|AFTER BATTLE|BATTLE) (?:USE|USES) (?:RECOVER|RECOVERY):[ ](\d+)>/i,'RecoverEscape':/<(?:ESCAPE|AFTER BATTLE|BATTLE) (?:USE|USES) (?:RECOVER|RECOVERY):[ ](\d+)>/i,'RecoverDefeat':/<(?:DEFEAT|AFTER BATTLE|BATTLE) (?:USE|USES) (?:RECOVER|RECOVERY):[ ](\d+)>/i,'BypassRecoverAll':/<BYPASS RECOVER ALL USES>/i,'AllowRecoverAll':/<ALLOW RECOVER ALL USES>/i,'UserGlobalLimitedUses':/<USER GLOBAL (?:USE|USES):[ ]([\+\-]\d+)>/gi,'UserSTypeLimitedUses':/<USER STYPE[ ](.*)[ ](?:USE|USES):[ ]([\+\-]\d+)>/gi,'UserSkillLimitedUses':/<USER SKILL[ ](.*)[ ](?:USE|USES):[ ]([\+\-]\d+)>/gi,'TargetGlobalLimitedUses':/<TARGET GLOBAL (?:USE|USES):[ ]([\+\-]\d+)>/gi,'TargetSTypeLimitedUses':/<TARGET STYPE[ ](.*)[ ](?:USE|USES):[ ]([\+\-]\d+)>/gi,'TargetSkillLimitedUses':/<TARGET SKILL[ ](.*)[ ](?:USE|USES):[ ]([\+\-]\d+)>/gi,'GlobalLimitedUses':/<GLOBAL USE (?:MAX|MAXIMUM):[ ]([\+\-]\d+)>/i,'STypeLimitedUses':/<STYPE[ ](.*)[ ]USE (?:MAX|MAXIMUM):[ ]([\+\-]\d+)>/gi,'SkillLimitedUses':/<SKILL[ ](.*)[ ]USE (?:MAX|MAXIMUM):[ ]([\+\-]\d+)>/gi},DataManager[_0x255838(0x1d4)]=function(_0x5b1e2c){const _0x3c08bf=_0x255838;_0x5b1e2c=_0x5b1e2c[_0x3c08bf(0x1b5)]()[_0x3c08bf(0x1cc)](),this[_0x3c08bf(0x20d)]=this['_skillIDs']||{};if(this[_0x3c08bf(0x20d)][_0x5b1e2c])return this[_0x3c08bf(0x20d)][_0x5b1e2c];for(const _0x128025 of $dataSkills){if(!_0x128025)continue;this[_0x3c08bf(0x20d)][_0x128025[_0x3c08bf(0x1df)][_0x3c08bf(0x1b5)]()['trim']()]=_0x128025['id'];}return this['_skillIDs'][_0x5b1e2c]||0x0;},DataManager[_0x255838(0x1bd)]=function(_0x3f2376){const _0x378fc8=_0x255838;_0x3f2376=_0x3f2376[_0x378fc8(0x1b5)]()[_0x378fc8(0x1cc)](),this[_0x378fc8(0x1f4)]=this[_0x378fc8(0x1f4)]||{};if(this['_stypeIDs'][_0x3f2376])return this['_stypeIDs'][_0x3f2376];for(let _0x5e72ee=0x1;_0x5e72ee<0x64;_0x5e72ee++){if(!$dataSystem[_0x378fc8(0x20f)][_0x5e72ee])continue;let _0x237db3=$dataSystem[_0x378fc8(0x20f)][_0x5e72ee][_0x378fc8(0x1b5)]()[_0x378fc8(0x1cc)]();_0x237db3=_0x237db3[_0x378fc8(0x208)](/\x1I\[(\d+)\]/gi,''),_0x237db3=_0x237db3[_0x378fc8(0x208)](/\\I\[(\d+)\]/gi,''),this['_stypeIDs'][_0x237db3]=_0x5e72ee;}return this['_stypeIDs'][_0x3f2376]||0x0;},DataManager[_0x255838(0x1d8)]=function(_0x1ea18d){const _0x4fd1ed=_0x255838;if(!_0x1ea18d)return![];const _0x1d8821=VisuMZ[_0x4fd1ed(0x1ea)][_0x4fd1ed(0x212)],_0x4a9293=_0x1ea18d['note'];if(_0x4a9293[_0x4fd1ed(0x1dc)](_0x1d8821[_0x4fd1ed(0x204)]))return!![];else{if(_0x4a9293[_0x4fd1ed(0x1dc)](_0x1d8821[_0x4fd1ed(0x1fa)]))return![];}return Game_BattlerBase['LIMITED_SKILL_USE_ALL_LIMITED'];},DataManager[_0x255838(0x1ed)]=function(_0x173628){const _0x275f3e=_0x255838;if(!_0x173628)return![];const _0x2b1fe0=VisuMZ[_0x275f3e(0x1ea)][_0x275f3e(0x212)],_0x1476d6=_0x173628[_0x275f3e(0x1bb)];if(Game_BattlerBase[_0x275f3e(0x1e3)]){if(_0x1476d6[_0x275f3e(0x1dc)](_0x2b1fe0[_0x275f3e(0x1ad)]))return![];return!![];}else{if(_0x1476d6[_0x275f3e(0x1dc)](_0x2b1fe0[_0x275f3e(0x1be)]))return!![];return![];}},ImageManager['limitedUseIcon']=VisuMZ[_0x255838(0x1ea)][_0x255838(0x1c5)][_0x255838(0x1a0)]['Icon'],TextManager['limitedUseFmt']=VisuMZ[_0x255838(0x1ea)][_0x255838(0x1c5)][_0x255838(0x1a0)][_0x255838(0x1d5)],TextManager[_0x255838(0x1cf)]=VisuMZ[_0x255838(0x1ea)][_0x255838(0x1c5)][_0x255838(0x1a0)]['EmptyFmt'],VisuMZ['LimitedSkillUses'][_0x255838(0x216)]=BattleManager[_0x255838(0x1a2)],BattleManager['endBattle']=function(_0x586e65){const _0x838450=_0x255838;VisuMZ[_0x838450(0x1ea)]['BattleManager_endBattle'][_0x838450(0x21c)](this,_0x586e65),$gameParty[_0x838450(0x1a6)](_0x586e65);},VisuMZ['LimitedSkillUses'][_0x255838(0x1db)]=Game_Action[_0x255838(0x215)][_0x255838(0x1d6)],Game_Action[_0x255838(0x215)][_0x255838(0x1d6)]=function(_0x4e858f){const _0xd8c52c=_0x255838;VisuMZ['LimitedSkillUses'][_0xd8c52c(0x1db)]['call'](this,_0x4e858f),this[_0xd8c52c(0x1d9)](_0x4e858f);},Game_Action[_0x255838(0x215)]['applyLimitedSkillUsesUserEffect']=function(_0x392bf0){const _0x1b4ae6=_0x255838;if(!this[_0x1b4ae6(0x1b0)]())return;const _0x5e94c0=VisuMZ[_0x1b4ae6(0x1ea)][_0x1b4ae6(0x212)];if(this[_0x1b4ae6(0x19c)]()&&!this[_0x1b4ae6(0x1c9)]){this[_0x1b4ae6(0x1c9)]=!![];const _0x58973b=_0x5e94c0[_0x1b4ae6(0x1bf)],_0x249917=_0x5e94c0[_0x1b4ae6(0x1c1)],_0x5c5300=_0x5e94c0[_0x1b4ae6(0x1ec)];this[_0x1b4ae6(0x19c)]()[_0x1b4ae6(0x1f7)](this[_0x1b4ae6(0x1b0)](),_0x58973b,_0x249917,_0x5c5300);}if(_0x392bf0){const _0x5c7f2e=_0x5e94c0['TargetGlobalLimitedUses'],_0x4d6e36=_0x5e94c0[_0x1b4ae6(0x205)],_0xaeef8=_0x5e94c0['TargetSkillLimitedUses'];_0x392bf0['alterLimitedSkillUses'](this['item'](),_0x5c7f2e,_0x4d6e36,_0xaeef8);}},VisuMZ[_0x255838(0x1ea)][_0x255838(0x1e7)]=Game_Action['prototype'][_0x255838(0x1c6)],Game_Action[_0x255838(0x215)][_0x255838(0x1c6)]=function(_0x1ae973,_0x48fc14){const _0x34bc0c=_0x255838,_0x16a756=VisuMZ[_0x34bc0c(0x1ea)][_0x34bc0c(0x212)],_0x2a5a14=this[_0x34bc0c(0x1b0)]()[_0x34bc0c(0x1bb)],_0x3c71d2=['UserGlobalLimitedUses',_0x34bc0c(0x1c1),'UserSkillLimitedUses','TargetGlobalLimitedUses',_0x34bc0c(0x205),_0x34bc0c(0x213)];for(const _0x42dca6 of _0x3c71d2){if(_0x2a5a14[_0x34bc0c(0x1dc)](_0x16a756[_0x42dca6]))return!![];}return VisuMZ[_0x34bc0c(0x1ea)][_0x34bc0c(0x1e7)][_0x34bc0c(0x21c)](this,_0x1ae973,_0x48fc14);},Game_BattlerBase[_0x255838(0x1eb)]=VisuMZ[_0x255838(0x1ea)][_0x255838(0x1c5)][_0x255838(0x1f6)][_0x255838(0x207)],Game_BattlerBase[_0x255838(0x1b6)]=VisuMZ[_0x255838(0x1ea)][_0x255838(0x1c5)][_0x255838(0x1f6)][_0x255838(0x1f1)],Game_BattlerBase[_0x255838(0x1bc)]=VisuMZ[_0x255838(0x1ea)][_0x255838(0x1c5)][_0x255838(0x1f6)][_0x255838(0x1fe)],Game_BattlerBase[_0x255838(0x1c2)]=VisuMZ[_0x255838(0x1ea)]['Settings'][_0x255838(0x1f6)][_0x255838(0x1d0)],Game_BattlerBase[_0x255838(0x1e3)]=VisuMZ['LimitedSkillUses']['Settings'][_0x255838(0x1f6)][_0x255838(0x1b8)],VisuMZ[_0x255838(0x1ea)]['Game_BattlerBase_meetsSkillConditions']=Game_BattlerBase[_0x255838(0x215)]['meetsSkillConditions'],Game_BattlerBase[_0x255838(0x215)][_0x255838(0x1fc)]=function(_0x365ef6){const _0x2a7573=_0x255838;if(DataManager[_0x2a7573(0x1d8)](_0x365ef6)&&!this[_0x2a7573(0x1a7)](_0x365ef6)){const _0x43f1b8=this['skillLimitedUseMax'](_0x365ef6['id']),_0x39f244=this[_0x2a7573(0x20b)](_0x365ef6['id']);if(_0x39f244>=_0x43f1b8)return![];}return VisuMZ['LimitedSkillUses']['Game_BattlerBase_meetsSkillConditions']['call'](this,_0x365ef6);},Game_BattlerBase[_0x255838(0x215)][_0x255838(0x1a7)]=function(_0x48906e){const _0x2c77fd=_0x255838;if(!_0x48906e)return![];return _0x48906e['id']===this[_0x2c77fd(0x217)]()||_0x48906e['id']===this[_0x2c77fd(0x1dd)]();},VisuMZ[_0x255838(0x1ea)][_0x255838(0x1b1)]=Game_BattlerBase[_0x255838(0x215)][_0x255838(0x211)],Game_BattlerBase[_0x255838(0x215)][_0x255838(0x211)]=function(){const _0x48309b=_0x255838;this['_cache_SkillLimitedUseMax']={},VisuMZ[_0x48309b(0x1ea)][_0x48309b(0x1b1)][_0x48309b(0x21c)](this);},VisuMZ[_0x255838(0x1ea)][_0x255838(0x1ac)]=Game_BattlerBase[_0x255838(0x215)]['paySkillCost'],Game_BattlerBase[_0x255838(0x215)]['paySkillCost']=function(_0x2af9f5){const _0x4f1efd=_0x255838;VisuMZ[_0x4f1efd(0x1ea)][_0x4f1efd(0x1ac)][_0x4f1efd(0x21c)](this,_0x2af9f5),DataManager[_0x4f1efd(0x1d8)](_0x2af9f5)&&!this[_0x4f1efd(0x1a7)](_0x2af9f5)&&this[_0x4f1efd(0x219)](_0x2af9f5['id'],0x1);},Game_BattlerBase[_0x255838(0x215)][_0x255838(0x1e9)]=function(_0xcef1e9){const _0x2ec416=_0x255838;this[_0x2ec416(0x201)]=this[_0x2ec416(0x201)]||{};if(this[_0x2ec416(0x201)][_0xcef1e9])return this[_0x2ec416(0x201)][_0xcef1e9];return this[_0x2ec416(0x201)][_0xcef1e9]=this[_0x2ec416(0x1c3)](_0xcef1e9),this[_0x2ec416(0x201)][_0xcef1e9];},Game_BattlerBase[_0x255838(0x215)][_0x255838(0x1c3)]=function(_0x355177){const _0x31104c=_0x255838,_0x4ed9fd=$dataSkills[_0x355177];if(!_0x4ed9fd)return 0x0;const _0x2709b8=VisuMZ[_0x31104c(0x1ea)][_0x31104c(0x212)],_0x58dadb=_0x4ed9fd[_0x31104c(0x1bb)];let _0x54862e=Game_BattlerBase[_0x31104c(0x1b6)];_0x58dadb[_0x31104c(0x1dc)](_0x2709b8[_0x31104c(0x204)])&&(_0x54862e=Number(RegExp['$1']));const _0x28bd0d=this[_0x31104c(0x1ef)]();for(const _0x767aee of _0x28bd0d){if(!_0x767aee)continue;_0x767aee[_0x31104c(0x1bb)][_0x31104c(0x1dc)](_0x2709b8[_0x31104c(0x1b4)])&&(_0x54862e+=Number(RegExp['$1']));const _0x45c87b=_0x767aee[_0x31104c(0x1bb)][_0x31104c(0x1dc)](_0x2709b8[_0x31104c(0x1e1)]);if(_0x45c87b)for(const _0x4b73d8 of _0x45c87b){if(!_0x4b73d8)continue;_0x4b73d8[_0x31104c(0x1dc)](_0x2709b8[_0x31104c(0x1e1)]);let _0x561f03=String(RegExp['$1']);const _0x4c3959=Number(RegExp['$2']);_0x561f03=(String(_0x561f03)||'')['trim']();const _0xdc4fd3=/^\d+$/[_0x31104c(0x210)](_0x561f03),_0x4364ae=_0xdc4fd3?Number(_0x561f03):DataManager[_0x31104c(0x1bd)](_0x561f03);if(_0x4364ae===_0x4ed9fd[_0x31104c(0x21b)])_0x54862e+=_0x4c3959;}const _0x32f158=_0x767aee[_0x31104c(0x1bb)][_0x31104c(0x1dc)](_0x2709b8[_0x31104c(0x1da)]);if(_0x32f158)for(const _0x47d832 of _0x32f158){if(!_0x47d832)continue;_0x47d832[_0x31104c(0x1dc)](_0x2709b8[_0x31104c(0x1da)]);let _0x3cc9c0=String(RegExp['$1']);const _0x4290da=Number(RegExp['$2']);_0x3cc9c0=(String(_0x3cc9c0)||'')[_0x31104c(0x1cc)]();const _0x54b5dd=/^\d+$/[_0x31104c(0x210)](_0x3cc9c0),_0xd068f6=_0x54b5dd?Number(_0x3cc9c0):DataManager[_0x31104c(0x1d4)](_0x3cc9c0);if(_0xd068f6===_0x355177)_0x54862e+=_0x4290da;}}_0x54862e=_0x54862e||0x0;const _0x412d79=Game_BattlerBase[_0x31104c(0x1c2)],_0xe62f0f=Game_BattlerBase['LIMITED_SKILL_USE_HARDCAP_MAX'];return _0x54862e[_0x31104c(0x19d)](_0x412d79,_0xe62f0f);},Game_BattlerBase[_0x255838(0x215)][_0x255838(0x20b)]=function(_0x315798){const _0x37834f=_0x255838,_0x43fdd8=$dataSkills[_0x315798];if(DataManager[_0x37834f(0x1b2)]&&DataManager[_0x37834f(0x1b2)](_0x43fdd8)){if(this[_0x37834f(0x1e5)](_0x43fdd8))return 0x0;}const _0x2a74ac=this['skillLimitedUseMax'](_0x315798);this[_0x37834f(0x1a8)]=this['_skillLimitedUseTimes']||{};if(this[_0x37834f(0x1a8)][_0x315798])return this[_0x37834f(0x1a8)][_0x315798];return this['_skillLimitedUseTimes'][_0x315798]=0x0,Math[_0x37834f(0x214)](0x0,this['_skillLimitedUseTimes'][_0x315798]);},Game_BattlerBase[_0x255838(0x215)][_0x255838(0x219)]=function(_0x12bc49,_0x4280c4){const _0x2493ac=_0x255838;_0x4280c4=_0x4280c4||0x0,this[_0x2493ac(0x1a8)]=this[_0x2493ac(0x1a8)]||{},this['_skillLimitedUseTimes'][_0x12bc49]=this[_0x2493ac(0x1a8)][_0x12bc49]||0x0,this[_0x2493ac(0x1a8)][_0x12bc49]+=_0x4280c4,this[_0x2493ac(0x1a8)][_0x12bc49]=Math[_0x2493ac(0x214)](0x0,this[_0x2493ac(0x1a8)][_0x12bc49]);},Game_BattlerBase['prototype'][_0x255838(0x19f)]=function(_0x11fb00,_0x3a3b54){const _0x19420d=_0x255838;_0x3a3b54=_0x3a3b54||0x0,this[_0x19420d(0x1a8)]=this[_0x19420d(0x1a8)]||{},this[_0x19420d(0x1a8)][_0x11fb00]=this[_0x19420d(0x1a8)][_0x11fb00]||0x0,this[_0x19420d(0x1a8)][_0x11fb00]=_0x3a3b54,this[_0x19420d(0x1a8)][_0x11fb00]=Math['max'](0x0,this[_0x19420d(0x1a8)][_0x11fb00]);},VisuMZ[_0x255838(0x1ea)]['Game_BattlerBase_recoverAll']=Game_BattlerBase['prototype'][_0x255838(0x20e)],Game_BattlerBase['prototype'][_0x255838(0x20e)]=function(){const _0x282698=_0x255838;VisuMZ[_0x282698(0x1ea)]['Game_BattlerBase_recoverAll'][_0x282698(0x21c)](this),this[_0x282698(0x19e)]();},Game_BattlerBase[_0x255838(0x215)][_0x255838(0x19e)]=function(){const _0xdf900=_0x255838;this['_skillLimitedUseTimes']=this[_0xdf900(0x1a8)]||{};for(const _0x57ff1f in this[_0xdf900(0x1a8)]){if(!this['_skillLimitedUseTimes'][_0x57ff1f])continue;const _0x23e41e=Number(_0x57ff1f)||0x0,_0x1d4117=$dataSkills[_0x23e41e];if(!_0x1d4117)continue;DataManager[_0xdf900(0x1ed)](_0x1d4117)&&this[_0xdf900(0x19f)](_0x23e41e,0x0);}},Game_Battler[_0x255838(0x1d3)]={'victory':VisuMZ[_0x255838(0x1ea)][_0x255838(0x1c5)]['Mechanics']['BattleVictory'],'escape':VisuMZ['LimitedSkillUses']['Settings'][_0x255838(0x1f6)]['BattleEscape'],'defeat':VisuMZ['LimitedSkillUses'][_0x255838(0x1c5)]['Mechanics']['BattleDefeat']},Game_Battler[_0x255838(0x215)][_0x255838(0x1b3)]=function(_0x30672a){const _0x48eac1=_0x255838;this['_skillLimitedUseTimes']=this[_0x48eac1(0x1a8)]||{};for(const _0x53e39f in this['_skillLimitedUseTimes']){const _0x4a85c1=$dataSkills[Number(_0x53e39f)];_0x4a85c1&&this[_0x48eac1(0x1a1)](_0x4a85c1,_0x30672a);}},Game_Battler[_0x255838(0x215)]['endBattleRecoveryLimitedSkillUses']=function(_0x5487c3,_0x35bdf5){const _0x279832=_0x255838;if(!_0x5487c3)return;if(!DataManager[_0x279832(0x1d8)](_0x5487c3))return;const _0x39f2a7=VisuMZ[_0x279832(0x1ea)][_0x279832(0x212)],_0x1ab2ce=_0x5487c3[_0x279832(0x1bb)];let _0x4b2bf8=0x0;if(_0x35bdf5===0x0)_0x1ab2ce[_0x279832(0x1dc)](_0x39f2a7['RecoverVictory'])?_0x4b2bf8=Number(RegExp['$1']):_0x4b2bf8=Game_Battler[_0x279832(0x1d3)]['victory'];else _0x35bdf5===0x1?_0x1ab2ce[_0x279832(0x1dc)](_0x39f2a7[_0x279832(0x1cd)])?_0x4b2bf8=Number(RegExp['$1']):_0x4b2bf8=Game_Battler[_0x279832(0x1d3)][_0x279832(0x1aa)]:_0x1ab2ce[_0x279832(0x1dc)](_0x39f2a7['RecoverDefeat'])?_0x4b2bf8=Number(RegExp['$1']):_0x4b2bf8=Game_Battler['LIMITED_SKILL_USE_RECOVERY'][_0x279832(0x1e2)];this[_0x279832(0x219)](_0x5487c3['id'],-_0x4b2bf8);},Game_Battler[_0x255838(0x215)][_0x255838(0x1f7)]=function(_0xf50c0b,_0x127984,_0x27bc23,_0xe9819a){const _0x429ba5=_0x255838;for(const _0x43d58b of this[_0x429ba5(0x1c8)]()){if(!_0x43d58b)continue;if(!DataManager[_0x429ba5(0x1d8)](_0x43d58b))continue;if(this['isAttackOrGuardSkill'](_0x43d58b))continue;const _0x394b6e=_0xf50c0b[_0x429ba5(0x1bb)];let _0x21c7c3=0x0;_0x394b6e[_0x429ba5(0x1dc)](_0x127984)&&(_0x21c7c3+=Number(RegExp['$1'])||0x0);const _0x142cbc=_0x394b6e[_0x429ba5(0x1dc)](_0x27bc23);if(_0x142cbc)for(const _0x29a0f3 of _0x142cbc){if(!_0x29a0f3)continue;_0x29a0f3['match'](_0x27bc23);let _0x56f3f2=String(RegExp['$1']);const _0x58714e=Number(RegExp['$2']);_0x56f3f2=(String(_0x56f3f2)||'')['trim']();const _0x115db8=/^\d+$/[_0x429ba5(0x210)](_0x56f3f2),_0x569fc9=_0x115db8?Number(_0x56f3f2):DataManager[_0x429ba5(0x1bd)](_0x56f3f2),_0x3624d7=DataManager[_0x429ba5(0x1a9)](_0x43d58b)||[_0x43d58b[_0x429ba5(0x21b)]];if(_0x3624d7[_0x429ba5(0x20c)](_0x569fc9))_0x21c7c3+=_0x58714e;}const _0x38f632=_0x394b6e[_0x429ba5(0x1dc)](_0xe9819a);if(_0x38f632)for(const _0x5ea8d4 of _0x38f632){if(!_0x5ea8d4)continue;_0x5ea8d4[_0x429ba5(0x1dc)](_0xe9819a);let _0x2d352a=String(RegExp['$1']);const _0x3a9452=Number(RegExp['$2']);_0x2d352a=(String(_0x2d352a)||'')[_0x429ba5(0x1cc)]();const _0x120d06=/^\d+$/[_0x429ba5(0x210)](_0x2d352a),_0x6e5be1=_0x120d06?Number(_0x2d352a):DataManager['getSkillIdWithName'](_0x2d352a);if(_0x6e5be1===_0x43d58b['id'])_0x21c7c3+=_0x3a9452;}this[_0x429ba5(0x219)](_0x43d58b['id'],-_0x21c7c3);}},Game_Party['prototype'][_0x255838(0x1a6)]=function(_0x5a8ef5){const _0x252e88=_0x255838,_0x59aa34=this[_0x252e88(0x1b9)];this[_0x252e88(0x1b9)]=![];for(const _0x34ad54 of this[_0x252e88(0x1e8)]()){if(!_0x34ad54)continue;_0x34ad54[_0x252e88(0x1b3)](_0x5a8ef5);}this['_inBattle']=_0x59aa34;},VisuMZ[_0x255838(0x1ea)][_0x255838(0x1d2)]=Window_Base['prototype'][_0x255838(0x1ae)],Window_Base[_0x255838(0x215)]['makeAdditionalSkillCostText']=function(_0x39c921,_0x5b4e26,_0x554314){const _0x213750=_0x255838;return _0x554314=VisuMZ[_0x213750(0x1ea)][_0x213750(0x1d2)][_0x213750(0x21c)](this,_0x39c921,_0x5b4e26,_0x554314),_0x554314=this[_0x213750(0x1ff)](_0x39c921,_0x5b4e26,_0x554314),_0x554314;},Window_Base[_0x255838(0x215)][_0x255838(0x1ff)]=function(_0x4a5de8,_0x4f4975,_0x29afb9){const _0x2c5e3c=_0x255838;if(!_0x4a5de8)return _0x29afb9;if(!_0x4f4975)return _0x29afb9;if(!DataManager['isSkillLimitedUse'](_0x4f4975))return _0x29afb9;if(_0x4a5de8[_0x2c5e3c(0x1a7)](_0x4f4975))return _0x29afb9;const _0x1a1962=VisuMZ['LimitedSkillUses'][_0x2c5e3c(0x1c5)][_0x2c5e3c(0x1a0)]['CostPosition'],_0x91206b=_0x4a5de8[_0x2c5e3c(0x1e9)](_0x4f4975['id']),_0x562432=_0x4a5de8[_0x2c5e3c(0x20b)](_0x4f4975['id']),_0x1a9261=Math[_0x2c5e3c(0x214)](0x0,_0x91206b-_0x562432),_0x43f46a=_0x2c5e3c(0x1b7)[_0x2c5e3c(0x1f9)](ImageManager[_0x2c5e3c(0x1ca)]),_0x5303e5=_0x1a9261>0x0?TextManager[_0x2c5e3c(0x1e0)]:TextManager['limitedUseEmptyFmt'];let _0x255d8c=_0x5303e5[_0x2c5e3c(0x1f9)](_0x1a9261,_0x91206b,_0x562432,_0x43f46a);if(_0x29afb9==='')_0x29afb9+=_0x255d8c;else _0x1a1962?_0x29afb9=_0x255d8c+this[_0x2c5e3c(0x21d)]()+_0x29afb9:_0x29afb9=_0x29afb9+this[_0x2c5e3c(0x21d)]()+_0x255d8c;return _0x29afb9;};