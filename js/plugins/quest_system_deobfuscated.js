var tier = tier || 0x0;
var dependencies = [];
var pluginData = $plugins.filter(function (_0x504797) {
  return _0x504797.status && _0x504797.description.includes("[QuestSystem]");
})[0x0];
VisuMZ.QuestSystem.Settings = VisuMZ.QuestSystem.Settings || {};
VisuMZ.ConvertParams = function (_0x12c958, _0x209e7e) {
  for (const _0x4d57ca in _0x209e7e) {
    if (_0x4d57ca.match(/(.*):(.*)/i)) {
      const _0x3e7f42 = String(RegExp.$1);
      const _0x1776ff = String(RegExp.$2).toUpperCase().trim();
      let _0x5e139a;
      let _0x4910b1;
      let _0x358715;
      switch (_0x1776ff) {
        case "NUM":
          _0x5e139a = _0x209e7e[_0x4d57ca] !== '' ? Number(_0x209e7e[_0x4d57ca]) : 0x0;
          break;
        case "ARRAYNUM":
          _0x4910b1 = _0x209e7e[_0x4d57ca] !== '' ? JSON.parse(_0x209e7e[_0x4d57ca]) : [];
          _0x5e139a = _0x4910b1.map(_0x55da5c => Number(_0x55da5c));
          break;
        case "EVAL":
          _0x5e139a = _0x209e7e[_0x4d57ca] !== '' ? eval(_0x209e7e[_0x4d57ca]) : null;
          break;
        case "ARRAYEVAL":
          _0x4910b1 = _0x209e7e[_0x4d57ca] !== '' ? JSON.parse(_0x209e7e[_0x4d57ca]) : [];
          _0x5e139a = _0x4910b1.map(_0x2c2ace => eval(_0x2c2ace));
          break;
        case 'JSON':
          _0x5e139a = _0x209e7e[_0x4d57ca] !== '' ? JSON.parse(_0x209e7e[_0x4d57ca]) : '';
          break;
        case "ARRAYJSON":
          _0x4910b1 = _0x209e7e[_0x4d57ca] !== '' ? JSON.parse(_0x209e7e[_0x4d57ca]) : [];
          _0x5e139a = _0x4910b1.map(_0x92047f => JSON.parse(_0x92047f));
          break;
        case "FUNC":
          _0x5e139a = _0x209e7e[_0x4d57ca] !== '' ? new Function(JSON.parse(_0x209e7e[_0x4d57ca])) : new Function("return 0");
          break;
        case "ARRAYFUNC":
          _0x4910b1 = _0x209e7e[_0x4d57ca] !== '' ? JSON.parse(_0x209e7e[_0x4d57ca]) : [];
          _0x5e139a = _0x4910b1.map(_0x445d04 => new Function(JSON.parse(_0x445d04)));
          break;
        case "STR":
          _0x5e139a = _0x209e7e[_0x4d57ca] !== '' ? String(_0x209e7e[_0x4d57ca]) : '';
          break;
        case "ARRAYSTR":
          _0x4910b1 = _0x209e7e[_0x4d57ca] !== '' ? JSON.parse(_0x209e7e[_0x4d57ca]) : [];
          _0x5e139a = _0x4910b1.map(_0x2d1be9 => String(_0x2d1be9));
          break;
        case "STRUCT":
          _0x358715 = _0x209e7e[_0x4d57ca] !== '' ? JSON.parse(_0x209e7e[_0x4d57ca]) : {};
          _0x5e139a = VisuMZ.ConvertParams({}, _0x358715);
          break;
        case "ARRAYSTRUCT":
          _0x4910b1 = _0x209e7e[_0x4d57ca] !== '' ? JSON.parse(_0x209e7e[_0x4d57ca]) : [];
          _0x5e139a = _0x4910b1.map(_0x5dd0b3 => VisuMZ.ConvertParams({}, JSON.parse(_0x5dd0b3)));
          break;
        default:
          continue;
      }
      _0x12c958[_0x3e7f42] = _0x5e139a;
    }
  }
  return _0x12c958;
};
(_0x1d8b38 => {
  const _0x5c7280 = _0x1d8b38.name;
  for (const _0x3b7e8b of dependencies) {
    if (!Imported[_0x3b7e8b]) {
      alert("%1 is missing a required plugin.\nPlease install %2 into the Plugin Manager.".format(_0x5c7280, _0x3b7e8b));
      SceneManager.exit();
      break;
    }
  }
  const _0x5cc005 = _0x1d8b38.description;
  if (_0x5cc005.match(/\[Version[ ](.*?)\]/i)) {
    const _0x29033c = Number(RegExp.$1);
    if (_0x29033c !== VisuMZ.QuestSystem.version) {
      alert("%1's version does not match plugin's. Please update it in the Plugin Manager.".format(_0x5c7280, _0x29033c));
      SceneManager.exit();
    }
  }
  if (_0x5cc005.match(/\[Tier[ ](\d+)\]/i)) {
    const _0x54522d = Number(RegExp.$1);
    if (_0x54522d < tier) {
      alert("%1 is incorrectly placed on the plugin list.\nIt is a Tier %2 plugin placed over other Tier %3 plugins.\nPlease reorder the plugin list from smallest to largest tier numbers.".format(_0x5c7280, _0x54522d, tier));
      SceneManager.exit();
    } else {
      tier = Math.max(_0x54522d, tier);
    }
  }
  VisuMZ.ConvertParams(VisuMZ.QuestSystem.Settings, _0x1d8b38.parameters);
})(pluginData);
PluginManager.registerCommand(pluginData.name, "LabelAddQuestLabel", _0x5bd3a0 => {
  VisuMZ.ConvertParams(_0x5bd3a0, _0x5bd3a0);
  const _0x4dd6d3 = _0x5bd3a0.ItemIDs;
  const _0x31b776 = _0x5bd3a0.WeaponIDs;
  const _0x57ddda = _0x5bd3a0.ArmorIDs;
  for (const _0x16b406 of _0x4dd6d3) {
    const _0x2c7529 = $dataItems[_0x16b406];
    if (_0x2c7529) {
      $gameParty.setQuestLabelItem(_0x2c7529);
    }
  }
  for (const _0x267736 of _0x31b776) {
    const _0x584ab7 = $dataWeapons[_0x267736];
    if (_0x584ab7) {
      $gameParty.setQuestLabelItem(_0x584ab7);
    }
  }
  for (const _0x48c46e of _0x57ddda) {
    const _0x19b72b = $dataArmors[_0x48c46e];
    if (_0x19b72b) {
      $gameParty.setQuestLabelItem(_0x19b72b);
    }
  }
});
PluginManager.registerCommand(pluginData.name, "LabelClearQuestLabel", _0x562519 => {
  VisuMZ.ConvertParams(_0x562519, _0x562519);
  const _0x576b9a = _0x562519.ItemIDs;
  const _0x400cbb = _0x562519.WeaponIDs;
  const _0xfb19b4 = _0x562519.ArmorIDs;
  for (const _0x2c513d of _0x576b9a) {
    const _0x20e398 = $dataItems[_0x2c513d];
    if (_0x20e398) {
      $gameParty.clearQuestLabelItem(_0x20e398);
    }
  }
  for (const _0x5a019d of _0x400cbb) {
    const _0x531af2 = $dataWeapons[_0x5a019d];
    if (_0x531af2) {
      $gameParty.clearQuestLabelItem(_0x531af2);
    }
  }
  for (const _0xbb8a3e of _0xfb19b4) {
    const _0x2d3c5f = $dataArmors[_0xbb8a3e];
    if (_0x2d3c5f) {
      $gameParty.clearQuestLabelItem(_0x2d3c5f);
    }
  }
});
PluginManager.registerCommand(pluginData.name, "QuestSet", _0x50647f => {
  VisuMZ.ConvertParams(_0x50647f, _0x50647f);
  const _0x154c72 = _0x50647f.Keys;
  const _0x3a6156 = _0x50647f.Status;
  for (const _0x47dfb6 of _0x154c72) {
    $gameSystem.setQuestStatus(_0x47dfb6, _0x3a6156);
  }
  if (SceneManager.isSceneMap()) {
    SceneManager._scene.refreshQuestTrackerWindow();
  }
});
PluginManager.registerCommand(pluginData.name, 'QuestDescription', _0x29a38c => {
  VisuMZ.ConvertParams(_0x29a38c, _0x29a38c);
  const _0x5b10d6 = _0x29a38c.Keys;
  const _0x4c2ddf = _0x29a38c.TargetID;
  for (const _0x440b5a of _0x5b10d6) {
    $gameSystem.setQuestDescription(_0x440b5a, _0x4c2ddf);
  }
  if (SceneManager.isSceneMap()) {
    SceneManager._scene.refreshQuestTrackerWindow();
  }
});
PluginManager.registerCommand(pluginData.name, "QuestObjectives", _0x139030 => {
  VisuMZ.ConvertParams(_0x139030, _0x139030);
  const _0x1bb595 = _0x139030.Keys;
  const _0x516595 = _0x139030.TargetIDs;
  const _0x5c3537 = _0x139030.Status;
  for (const _0x1e0bd9 of _0x1bb595) {
    $gameSystem.setQuestObjectives(_0x1e0bd9, _0x516595, _0x5c3537);
  }
  if (SceneManager.isSceneMap()) {
    SceneManager._scene.refreshQuestTrackerWindow();
  }
});
PluginManager.registerCommand(pluginData.name, "QuestQuote", _0x33e9dd => {
  VisuMZ.ConvertParams(_0x33e9dd, _0x33e9dd);
  const _0x419e25 = _0x33e9dd.Keys;
  const _0x5a7e11 = _0x33e9dd.TargetID;
  for (const _0x2f6505 of _0x419e25) {
    $gameSystem.setQuestQuote(_0x2f6505, _0x5a7e11);
  }
  if (SceneManager.isSceneMap()) {
    SceneManager._scene.refreshQuestTrackerWindow();
  }
});
PluginManager.registerCommand(pluginData.name, "QuestRewards", _0x5406b6 => {
  VisuMZ.ConvertParams(_0x5406b6, _0x5406b6);
  const _0x634874 = _0x5406b6.Keys;
  const _0x403687 = _0x5406b6.TargetIDs;
  const _0x2dd521 = _0x5406b6.Status;
  for (const _0x3f490a of _0x634874) {
    $gameSystem.setQuestRewards(_0x3f490a, _0x403687, _0x2dd521);
  }
  if (SceneManager.isSceneMap()) {
    SceneManager._scene.refreshQuestTrackerWindow();
  }
});
PluginManager.registerCommand(pluginData.name, "QuestSubtext", _0x888cc6 => {
  VisuMZ.ConvertParams(_0x888cc6, _0x888cc6);
  const _0x422ffe = _0x888cc6.Keys;
  const _0x5d54fb = _0x888cc6.TargetID;
  for (const _0x3d86c0 of _0x422ffe) {
    $gameSystem.setQuestSubtext(_0x3d86c0, _0x5d54fb);
  }
  if (SceneManager.isSceneMap()) {
    SceneManager._scene.refreshQuestTrackerWindow();
  }
});
PluginManager.registerCommand(pluginData.name, "TrackerChangeQuest", _0x1fd674 => {
  VisuMZ.ConvertParams(_0x1fd674, _0x1fd674);
  const _0x34c0a1 = _0x1fd674.Key;
  $gameSystem.setTrackedQuest(_0x34c0a1);
  if (SceneManager.isSceneMap()) {
    SceneManager._scene.refreshQuestTrackerWindow();
  }
});
PluginManager.registerCommand(pluginData.name, 'TrackerRefreshWindow', _0x173526 => {
  if (!SceneManager.isSceneMap()) {
    return;
  }
  SceneManager._scene.refreshQuestTrackerWindow();
});
PluginManager.registerCommand(pluginData.name, "TrackerShowHide", _0x4a446f => {
  VisuMZ.ConvertParams(_0x4a446f, _0x4a446f);
  $gameSystem.setQuestTrackerVisible(_0x4a446f.Show);
  if (SceneManager.isSceneMap()) {
    SceneManager._scene.refreshQuestTrackerWindow();
  }
});
PluginManager.registerCommand(pluginData.name, 'SystemCallSceneQuest', _0x25c5f4 => {
  if ($gameParty.inBattle()) {
    return;
  }
  SceneManager.push(Scene_Quest);
});
PluginManager.registerCommand(pluginData.name, "SystemEnableQuestMenu", _0x350e2f => {
  VisuMZ.ConvertParams(_0x350e2f, _0x350e2f);
  $gameSystem.questData().enabled = _0x350e2f.Enable;
});
PluginManager.registerCommand(pluginData.name, "SystemShowQuestMenu", _0x1ef4ef => {
  VisuMZ.ConvertParams(_0x1ef4ef, _0x1ef4ef);
  $gameSystem.questData().shown = _0x1ef4ef.Show;
});
VisuMZ.QuestSystem.Scene_Boot_onDatabaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
Scene_Boot.prototype.onDatabaseLoaded = function () {
  VisuMZ.QuestSystem.Scene_Boot_onDatabaseLoaded.call(this);
  this.process_VisuMZ_QuestSystem_Data();
};
VisuMZ.QuestSystem.QuestOrder = [];
VisuMZ.QuestSystem.QuestData = {};
Scene_Boot.prototype.process_VisuMZ_QuestSystem_Data = function () {
  for (const _0xb844be of VisuMZ.QuestSystem.Settings.Categories) {
    if (!_0xb844be) {
      continue;
    }
    for (const _0x401ee6 of _0xb844be.Quests) {
      if (!_0x401ee6) {
        continue;
      }
      _0x401ee6.category = _0xb844be;
      _0x401ee6.Description.unshift('');
      _0x401ee6.Objectives.unshift('');
      _0x401ee6.Rewards.unshift('');
      _0x401ee6.Subtext.unshift('');
      _0x401ee6.Quotes.unshift('');
      const _0x363f39 = _0x401ee6.Key.toUpperCase().trim();
      VisuMZ.QuestSystem.QuestOrder.push(_0x363f39);
      VisuMZ.QuestSystem.QuestData[_0x363f39] = _0x401ee6;
    }
  }
};
ConfigManager.questTrackerShow = true;
ConfigManager.questTrackerPosition = true;
VisuMZ.QuestSystem.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function () {
  const _0x113d6a = VisuMZ.QuestSystem.ConfigManager_makeData.call(this);
  _0x113d6a.questTrackerShow = this.questTrackerShow;
  _0x113d6a.questTrackerPosition = this.questTrackerPosition;
  return _0x113d6a;
};
VisuMZ.QuestSystem.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function (_0xc9e766) {
  VisuMZ.QuestSystem.ConfigManager_applyData.call(this, _0xc9e766);
  if ("questTrackerShow" in _0xc9e766) {
    this.questTrackerShow = _0xc9e766.questTrackerShow;
  } else {
    this.questTrackerShow = true;
  }
  if ("questTrackerPosition" in _0xc9e766) {
    this.questTrackerPosition = _0xc9e766.questTrackerPosition;
  } else {
    this.questTrackerPosition = true;
  }
};
ImageManager.questKnownIcon = VisuMZ.QuestSystem.Settings.General.CommandWindow_Known_Icon;
ImageManager.questCompletedIcon = VisuMZ.QuestSystem.Settings.General.CommandWindow_Completed_Icon;
ImageManager.questFailedIcon = VisuMZ.QuestSystem.Settings.General.CommandWindow_Failed_Icon;
TextManager.questCommandName = VisuMZ.QuestSystem.Settings.MainMenu.Name;
TextManager.questKnownCmd = VisuMZ.QuestSystem.Settings.General.CommandWindow_Known_Text;
TextManager.questCompletedCmd = VisuMZ.QuestSystem.Settings.General.CommandWindow_Completed_Text;
TextManager.questFailedCmd = VisuMZ.QuestSystem.Settings.General.CommandWindow_Failed_Text;
TextManager.questCategoryOpenedFmt = VisuMZ.QuestSystem.Settings.General.ListWindowCategoryOpenFmt;
TextManager.questCategoryClosedFmt = VisuMZ.QuestSystem.Settings.General.ListWindowCategoryCloseFmt;
TextManager.noQuestsLabel = VisuMZ.QuestSystem.Settings.General.EmptyTitleLabel;
TextManager.noQuestsListed = VisuMZ.QuestSystem.Settings.General.NoQuestListed;
TextManager.questLogFmt = VisuMZ.QuestSystem.Settings.General.LogFmt;
TextManager.questEmptyText = VisuMZ.QuestSystem.Settings.General.LogEmpty;
TextManager.questObjectiveNormalFmt = VisuMZ.QuestSystem.Settings.General.Objective_Normal_Fmt;
TextManager.questObjectiveClearedFmt = VisuMZ.QuestSystem.Settings.General.Objective_Completed_Fmt;
TextManager.questObjectiveFailedFmt = VisuMZ.QuestSystem.Settings.General.Objective_Failed_Fmt;
TextManager.questRewardsNormalFmt = VisuMZ.QuestSystem.Settings.General.Reward_Normal_Fmt;
TextManager.questRewardsClaimedFmt = VisuMZ.QuestSystem.Settings.General.Reward_Completed_Fmt;
TextManager.questRewardsDeniedFmt = VisuMZ.QuestSystem.Settings.General.Reward_Failed_Fmt;
TextManager.questButtonAssistPageUpDn = VisuMZ.QuestSystem.Settings.General.ButtonAssistPageUpDown;
TextManager.questButtonAssistActive = VisuMZ.QuestSystem.Settings.General.questButtonAssistActive;
TextManager.questButtonAssistExpand = VisuMZ.QuestSystem.Settings.General.ButtonAssistExpand;
TextManager.questButtonAssistCollapse = VisuMZ.QuestSystem.Settings.General.ButtonAssistCollapse;
TextManager.defaultQuestTrackerFmt = "\n\\{[[Title]]\\}\n[[Objectives]]\n";
TextManager.questTrackerFmt = VisuMZ.QuestSystem.Settings.Tracker.TrackerFmt || TextManager.defaultQuestTrackerFmt;
TextManager.questTrackedQuestFmt = VisuMZ.QuestSystem.Settings.General.ListWindowTrackedQuest;
TextManager.questTrackerShow = VisuMZ.QuestSystem.Settings.Tracker.ShowName;
TextManager.questTrackerPosition = VisuMZ.QuestSystem.Settings.Tracker.PositionName;
TextManager.questTrackerPosOff = VisuMZ.QuestSystem.Settings.Tracker.PositionOff;
TextManager.questTrackerPosOn = VisuMZ.QuestSystem.Settings.Tracker.PositionOn;
SceneManager.isSceneMap = function () {
  return this._scene && this._scene.constructor === Scene_Map;
};
VisuMZ.QuestSystem.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function () {
  VisuMZ.QuestSystem.Game_System_initialize.call(this);
  this.initQuestSystem();
};
Game_System.prototype.initQuestSystem = function () {
  const _0x28cf20 = VisuMZ.QuestSystem.Settings.General;
  const _0x113c32 = VisuMZ.QuestSystem.Settings.MainMenu;
  this._quests = {
    'shown': _0x113c32.ShowMainMenu,
    'enabled': _0x113c32.EnableMainMenu,
    'known': [],
    'completed': [],
    'failed': [],
    'description': {},
    'objectives': {},
    'objectivesCompleted': {},
    'objectivesFailed': {},
    'rewards': {},
    'rewardsClaimed': {},
    'rewardsDenied': {},
    'subtext': {},
    'quotes': {},
    'tracked': _0x28cf20.TrackedQuest.toUpperCase().trim(),
    'showTracker': true
  };
  for (const _0x54097d of _0x28cf20.KnownQuests) {
    this.setQuestStatus(_0x54097d, "known");
  }
  for (const _0x139ef1 of _0x28cf20.CompletedQuests) {
    this.setQuestStatus(_0x139ef1, "completed");
  }
  for (const _0x343af6 of _0x28cf20.FailedQuests) {
    this.setQuestStatus(_0x343af6, "failed");
  }
};
Game_System.prototype.quest = function (_0x59ff50) {
  _0x59ff50 = _0x59ff50.toUpperCase().trim();
  return VisuMZ.QuestSystem.QuestData[_0x59ff50];
};
Game_System.prototype.questData = function () {
  if (this._quests === undefined) {
    this.initQuestSystem();
  }
  return this._quests;
};
Game_System.prototype.isquestMenuShown = function () {
  return this.questData().shown;
};
Game_System.prototype.isquestMenuEnabled = function () {
  return this.questData().enabled;
};
Game_System.prototype.setQuestStatus = function (_0x466d1a, _0x2208f1) {
  _0x466d1a = _0x466d1a.toUpperCase().trim();
  if (!VisuMZ.QuestSystem.QuestData[_0x466d1a]) {
    return;
  }
  const _0x1b9648 = this.questData();
  _0x1b9648.known = _0x1b9648.known || [];
  _0x1b9648.completed = _0x1b9648.completed || [];
  _0x1b9648.failed = _0x1b9648.failed || [];
  _0x1b9648.known.remove(_0x466d1a);
  _0x1b9648.completed.remove(_0x466d1a);
  _0x1b9648.failed.remove(_0x466d1a);
  if (_0x2208f1 !== 'remove') {
    _0x1b9648[_0x2208f1].push(_0x466d1a);
  }
  if (_0x466d1a === _0x1b9648.tracked.toUpperCase().trim()) {
    if (_0x2208f1 !== "known") {
      this.setTrackedQuest('');
    }
  }
};
Game_System.prototype.questsKnown = function () {
  const _0x52ecfd = this.questData();
  _0x52ecfd.known = _0x52ecfd.known || [];
  return _0x52ecfd.known.map(_0x209597 => this.quest(_0x209597)).remove(null);
};
Game_System.prototype.isQuestKnown = function (_0x4499f5) {
  const _0x517ff8 = this.questData();
  _0x517ff8.known = _0x517ff8.known || [];
  _0x4499f5 = _0x4499f5.toUpperCase().trim();
  return _0x517ff8.known.includes(_0x4499f5);
};
Game_System.prototype.questsCompleted = function () {
  const _0x588184 = this.questData();
  _0x588184.completed = _0x588184.completed || [];
  return _0x588184.completed.map(_0x5d55fe => this.quest(_0x5d55fe)).remove(null);
};
Game_System.prototype.isQuestCompleted = function (_0x169cd3) {
  const _0x2fba3d = this.questData();
  _0x2fba3d.completed = _0x2fba3d.completed || [];
  _0x169cd3 = _0x169cd3.toUpperCase().trim();
  return _0x2fba3d.completed.includes(_0x169cd3);
};
Game_System.prototype.questsFailed = function () {
  const _0x315641 = this.questData();
  _0x315641.failed = _0x315641.failed || [];
  return _0x315641.failed.map(_0x16af16 => this.quest(_0x16af16)).remove(null);
};
Game_System.prototype.isQuestFailed = function (_0x570554) {
  const _0x5d7b43 = this.questData();
  _0x5d7b43.failed = _0x5d7b43.failed || [];
  _0x570554 = _0x570554.toUpperCase().trim();
  return _0x5d7b43.failed.includes(_0x570554);
};
Game_System.prototype.questDescription = function (_0x51c091) {
  _0x51c091 = _0x51c091.toUpperCase().trim();
  const _0x27cf62 = this.quest(_0x51c091);
  if (!_0x27cf62) {
    return '';
  }
  const _0x1716ba = this.questData().description;
  _0x1716ba[_0x51c091] = _0x1716ba[_0x51c091] || 0x1;
  const _0x43a706 = _0x1716ba[_0x51c091];
  return _0x27cf62.Description[_0x43a706] || '';
};
Game_System.prototype.setQuestDescription = function (_0x3cbe3c, _0xcd0802) {
  _0x3cbe3c = _0x3cbe3c.toUpperCase().trim();
  const _0x181581 = this.quest(_0x3cbe3c);
  if (!_0x181581) {
    return '';
  }
  const _0x14e83f = this.questData().description;
  _0x14e83f[_0x3cbe3c] = _0xcd0802;
};
Game_System.prototype.questObjectives = function (_0x5ca5f2) {
  _0x5ca5f2 = _0x5ca5f2.toUpperCase().trim();
  const _0x2f666d = this.quest(_0x5ca5f2);
  if (!_0x2f666d) {
    return '';
  }
  const _0x3bb187 = this.questData();
  _0x3bb187.objectives = _0x3bb187.objectives || {};
  if (!_0x3bb187.objectives[_0x5ca5f2]) {
    _0x3bb187.objectives[_0x5ca5f2] = JsonEx.makeDeepCopy(_0x2f666d.VisibleObjectives);
  }
  return _0x3bb187.objectives[_0x5ca5f2].sort((_0x4bb592, _0x2861bd) => _0x4bb592 - _0x2861bd);
};
Game_System.prototype.setQuestObjectives = function (_0x382b04, _0x54b3ad, _0x3181f2) {
  _0x382b04 = _0x382b04.toUpperCase().trim();
  const _0x131681 = this.quest(_0x382b04);
  if (!_0x131681) {
    return '';
  }
  const _0x3fbd8e = this.questData();
  _0x3fbd8e.objectives = _0x3fbd8e.objectives || {};
  if (!_0x3fbd8e.objectives[_0x382b04]) {
    _0x3fbd8e.objectives[_0x382b04] = JsonEx.makeDeepCopy(_0x131681.VisibleObjectives);
  }
  _0x3fbd8e.objectives[_0x382b04] = _0x3fbd8e.objectives[_0x382b04] || [];
  _0x3fbd8e.objectivesCompleted[_0x382b04] = _0x3fbd8e.objectivesCompleted[_0x382b04] || [];
  _0x3fbd8e.objectivesFailed[_0x382b04] = _0x3fbd8e.objectivesFailed[_0x382b04] || [];
  for (const _0x1a6ff7 of _0x54b3ad) {
    _0x3fbd8e.objectives[_0x382b04].remove(_0x1a6ff7);
    _0x3fbd8e.objectivesCompleted[_0x382b04].remove(_0x1a6ff7);
    _0x3fbd8e.objectivesFailed[_0x382b04].remove(_0x1a6ff7);
    switch (_0x3181f2) {
      case "show":
      case 'known':
        _0x3fbd8e.objectives[_0x382b04].push(_0x1a6ff7);
        break;
      case 'complete':
      case "completed":
        _0x3fbd8e.objectivesCompleted[_0x382b04].push(_0x1a6ff7);
        break;
      case 'fail':
      case 'failed':
        _0x3fbd8e.objectivesFailed[_0x382b04].push(_0x1a6ff7);
        break;
      case "remove":
      case "removed":
        break;
    }
  }
};
Game_System.prototype.questObjectivesCompleted = function (_0x362016) {
  _0x362016 = _0x362016.toUpperCase().trim();
  const _0x56566a = this.quest(_0x362016);
  if (!_0x56566a) {
    return '';
  }
  const _0x3e269a = this.questData();
  _0x3e269a.objectivesCompleted = _0x3e269a.objectivesCompleted || {};
  _0x3e269a.objectivesCompleted[_0x362016] = _0x3e269a.objectivesCompleted[_0x362016] || [];
  return _0x3e269a.objectivesCompleted[_0x362016].sort((_0x2968a4, _0x1609d8) => _0x2968a4 - _0x1609d8);
};
Game_System.prototype.questObjectivesFailed = function (_0x313bef) {
  _0x313bef = _0x313bef.toUpperCase().trim();
  const _0x272f7b = this.quest(_0x313bef);
  if (!_0x272f7b) {
    return '';
  }
  const _0x50307a = this.questData();
  _0x50307a.objectivesFailed = _0x50307a.objectivesFailed || {};
  _0x50307a.objectivesFailed[_0x313bef] = _0x50307a.objectivesFailed[_0x313bef] || [];
  return _0x50307a.objectivesFailed[_0x313bef].sort((_0x5dacb3, _0x52f9ea) => _0x5dacb3 - _0x52f9ea);
};
Game_System.prototype.questRewards = function (_0x4cf907) {
  _0x4cf907 = _0x4cf907.toUpperCase().trim();
  const _0x3e22e9 = this.quest(_0x4cf907);
  if (!_0x3e22e9) {
    return '';
  }
  const _0x4913af = this.questData();
  _0x4913af.rewards = _0x4913af.rewards || {};
  if (!_0x4913af.rewards[_0x4cf907]) {
    _0x4913af.rewards[_0x4cf907] = JsonEx.makeDeepCopy(_0x3e22e9.VisibleRewards);
  }
  return _0x4913af.rewards[_0x4cf907].sort((_0x2d406a, _0x3e569c) => _0x2d406a - _0x3e569c);
};
Game_System.prototype.setQuestRewards = function (_0x2b5542, _0x18232e, _0x18eaa8) {
  _0x2b5542 = _0x2b5542.toUpperCase().trim();
  const _0x6035b0 = this.quest(_0x2b5542);
  if (!_0x6035b0) {
    return '';
  }
  const _0x13720c = this.questData();
  _0x13720c.rewards = _0x13720c.rewards || {};
  if (!_0x13720c.rewards[_0x2b5542]) {
    _0x13720c.rewards[_0x2b5542] = JsonEx.makeDeepCopy(_0x6035b0.VisibleRewards);
  }
  _0x13720c.rewards[_0x2b5542] = _0x13720c.rewards[_0x2b5542] || [];
  _0x13720c.rewardsClaimed[_0x2b5542] = _0x13720c.rewardsClaimed[_0x2b5542] || [];
  _0x13720c.rewardsDenied[_0x2b5542] = _0x13720c.rewardsDenied[_0x2b5542] || [];
  for (const _0x2aa13d of _0x18232e) {
    _0x13720c.rewards[_0x2b5542].remove(_0x2aa13d);
    _0x13720c.rewardsClaimed[_0x2b5542].remove(_0x2aa13d);
    _0x13720c.rewardsDenied[_0x2b5542].remove(_0x2aa13d);
    switch (_0x18eaa8) {
      case "show":
      case 'known':
        _0x13720c.rewards[_0x2b5542].push(_0x2aa13d);
        break;
      case "claim":
      case "claimed":
        _0x13720c.rewardsClaimed[_0x2b5542].push(_0x2aa13d);
        break;
      case "deny":
      case "denied":
        _0x13720c.rewardsDenied[_0x2b5542].push(_0x2aa13d);
        break;
      case "remove":
      case "removed":
        break;
    }
  }
};
Game_System.prototype.questRewardsClaimed = function (_0x4ec4fb) {
  _0x4ec4fb = _0x4ec4fb.toUpperCase().trim();
  const _0x5d66bb = this.quest(_0x4ec4fb);
  if (!_0x5d66bb) {
    return '';
  }
  const _0x5638d2 = this.questData();
  _0x5638d2.rewardsClaimed = _0x5638d2.rewardsClaimed || {};
  _0x5638d2.rewardsClaimed[_0x4ec4fb] = _0x5638d2.rewardsClaimed[_0x4ec4fb] || [];
  return _0x5638d2.rewardsClaimed[_0x4ec4fb].sort((_0x2dd3e7, _0x4f6580) => _0x2dd3e7 - _0x4f6580);
};
Game_System.prototype.questRewardsDenied = function (_0xbf7cfd) {
  _0xbf7cfd = _0xbf7cfd.toUpperCase().trim();
  const _0x91643 = this.quest(_0xbf7cfd);
  if (!_0x91643) {
    return '';
  }
  const _0x122aeb = this.questData();
  _0x122aeb.rewardsDenied = _0x122aeb.rewardsDenied || {};
  _0x122aeb.rewardsDenied[_0xbf7cfd] = _0x122aeb.rewardsDenied[_0xbf7cfd] || [];
  return _0x122aeb.rewardsDenied[_0xbf7cfd].sort((_0x32464e, _0x26c4ae) => _0x32464e - _0x26c4ae);
};
Game_System.prototype.questSubtext = function (_0x2e273d) {
  _0x2e273d = _0x2e273d.toUpperCase().trim();
  const _0x2a2f79 = this.quest(_0x2e273d);
  if (!_0x2a2f79) {
    return '';
  }
  const _0x1b28d2 = this.questData().subtext;
  _0x1b28d2[_0x2e273d] = _0x1b28d2[_0x2e273d] || 0x1;
  const _0x4159e4 = _0x1b28d2[_0x2e273d];
  return _0x2a2f79.Subtext[_0x4159e4] || '';
};
Game_System.prototype.setQuestSubtext = function (_0x3e99eb, _0x145c59) {
  _0x3e99eb = _0x3e99eb.toUpperCase().trim();
  const _0x45aa15 = this.quest(_0x3e99eb);
  if (!_0x45aa15) {
    return '';
  }
  const _0x436e13 = this.questData().subtext;
  _0x436e13[_0x3e99eb] = _0x145c59;
};
Game_System.prototype.questQuote = function (_0x47599a) {
  _0x47599a = _0x47599a.toUpperCase().trim();
  const _0x3c0063 = this.quest(_0x47599a);
  if (!_0x3c0063) {
    return '';
  }
  const _0x205720 = this.questData().quotes;
  _0x205720[_0x47599a] = _0x205720[_0x47599a] || 0x1;
  const _0x4008aa = _0x205720[_0x47599a];
  return _0x3c0063.Quotes[_0x4008aa] || '';
};
Game_System.prototype.setQuestQuote = function (_0xeddc58, _0x156a63) {
  _0xeddc58 = _0xeddc58.toUpperCase().trim();
  const _0xa4612c = this.quest(_0xeddc58);
  if (!_0xa4612c) {
    return '';
  }
  const _0x4ea00e = this.questData().quotes;
  _0x4ea00e[_0xeddc58] = _0x156a63;
};
Game_System.prototype.trackedQuest = function () {
  const _0x1149ce = this.questData();
  return this.quest(_0x1149ce.tracked);
};
Game_System.prototype.setTrackedQuest = function (_0x15b757, _0x261f8e) {
  const _0x4f6aaf = this.questData();
  if (_0x261f8e && _0x4f6aaf.tracked === _0x15b757) {
    _0x15b757 = '';
  }
  _0x4f6aaf.tracked = _0x15b757;
  if (SceneManager.isSceneMap()) {
    SceneManager._scene.setQuestForQuestTrackerWindow(_0x15b757);
  }
};
Game_System.prototype.isQuestTrackerVisible = function () {
  const _0x32fe90 = this.questData();
  return _0x32fe90.showTracker;
};
Game_System.prototype.setQuestTrackerVisible = function (_0x51739c) {
  const _0x3a581d = this.questData();
  _0x3a581d.showTracker = _0x51739c;
};
VisuMZ.QuestSystem.Game_BattlerBase_addNewState = Game_BattlerBase.prototype.addNewState;
Game_BattlerBase.prototype.addNewState = function (_0x4bfd8a) {
  const _0x1ed148 = this.isAlive();
  VisuMZ.QuestSystem.Game_BattlerBase_addNewState.call(this, _0x4bfd8a);
  this.questJournalSystemAddDeath(_0x4bfd8a, _0x1ed148);
};
Game_BattlerBase.prototype.questJournalSystemAddDeath = function (_0x226c8, _0x7fa0c3) {
  if (_0x226c8 !== this.deathStateId()) {
    return;
  }
  if (!this.isEnemy()) {
    return;
  }
  if (!_0x7fa0c3) {
    return;
  }
  if (!this.isDead()) {
    return;
  }
  if (this._hasDiedBefore) {
    return;
  }
  this._hasDiedBefore = true;
  const _0x3ff463 = this.enemy().note;
  const _0x5e4169 = _0x3ff463.match(/<VARIABLE (\d+) ON DEATH: ([\+\-]\d+)>/gi);
  if (_0x5e4169) {
    for (const _0x51eb42 of _0x5e4169) {
      _0x51eb42.match(/<VARIABLE (\d+) ON DEATH: ([\+\-]\d+)>/i);
      const _0x4d5761 = Number(RegExp.$1);
      const _0x5439a3 = Number(RegExp.$2);
      const _0x54ce6d = $gameVariables.value(_0x4d5761);
      $gameVariables.setValue(_0x4d5761, _0x54ce6d + _0x5439a3);
    }
  }
};
VisuMZ.QuestSystem.Game_Battler_useItem = Game_Battler.prototype.useItem;
Game_Battler.prototype.useItem = function (_0x58419b) {
  VisuMZ.QuestSystem.Game_Battler_useItem.call(this, _0x58419b);
  this.questJournalSystemUseItem(_0x58419b);
};
Game_Battler.prototype.questJournalSystemUseItem = function (_0x3d5ec0) {
  if (!_0x3d5ec0) {
    return;
  }
  if (!this.isActor()) {
    return;
  }
  const _0x4f408d = _0x3d5ec0.note;
  const _0x651424 = _0x4f408d.match(/<VARIABLE (\d+) ON USE: ([\+\-]\d+)>/gi);
  if (_0x651424) {
    for (const _0x2c619e of _0x651424) {
      _0x2c619e.match(/<VARIABLE (\d+) ON USE: ([\+\-]\d+)>/i);
      const _0x110455 = Number(RegExp.$1);
      const _0x5e2925 = Number(RegExp.$2);
      const _0x601694 = $gameVariables.value(_0x110455);
      $gameVariables.setValue(_0x110455, _0x601694 + _0x5e2925);
    }
  }
};
VisuMZ.QuestSystem.Game_Actor_tradeItemWithParty = Game_Actor.prototype.tradeItemWithParty;
Game_Actor.prototype.tradeItemWithParty = function (_0x414270, _0x3b9803) {
  $gameTemp._tradeItemWithParty = true;
  const _0x3ed023 = VisuMZ.QuestSystem.Game_Actor_tradeItemWithParty.call(this, _0x414270, _0x3b9803);
  $gameTemp._tradeItemWithParty = undefined;
  return _0x3ed023;
};
VisuMZ.QuestSystem.Game_Party_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function (_0x3b882f, _0x59e12f, _0x1a34cf) {
  VisuMZ.QuestSystem.Game_Party_gainItem.call(this, _0x3b882f, _0x59e12f, _0x1a34cf);
  this.questJournalSystemGainItem(_0x3b882f, _0x59e12f);
};
Game_Party.prototype.questJournalSystemGainItem = function (_0x111435, _0x3d6bb2) {
  if (!_0x111435) {
    return;
  }
  if ($gameTemp._tradeItemWithParty) {
    return;
  }
  const _0x7682b2 = _0x111435.note;
  if (_0x3d6bb2 > 0x0) {
    const _0x413a7f = _0x7682b2.match(/<VARIABLE (\d+) ON GAIN: ([\+\-]\d+)>/gi);
    if (_0x413a7f) {
      for (const _0x1a89c6 of _0x413a7f) {
        _0x1a89c6.match(/<VARIABLE (\d+) ON GAIN: ([\+\-]\d+)>/i);
        const _0x10cf44 = Number(RegExp.$1);
        const _0x344160 = Number(RegExp.$2) * _0x3d6bb2;
        const _0x1cdeb7 = $gameVariables.value(_0x10cf44);
        $gameVariables.setValue(_0x10cf44, _0x1cdeb7 + _0x344160);
      }
    }
  } else {
    if (_0x3d6bb2 < 0x0) {
      const _0x5507c6 = _0x7682b2.match(/<VARIABLE (\d+) ON LOSE: ([\+\-]\d+)>/gi);
      if (_0x5507c6) {
        for (const _0x3aaf81 of _0x5507c6) {
          _0x3aaf81.match(/<VARIABLE (\d+) ON LOSE: ([\+\-]\d+)>/i);
          const _0x1aa255 = Number(RegExp.$1);
          const _0x3302a4 = Number(RegExp.$2) * _0x3d6bb2;
          const _0x30193d = $gameVariables.value(_0x1aa255);
          $gameVariables.setValue(_0x1aa255, _0x30193d + _0x3302a4);
        }
      }
    }
  }
  const _0x155c3f = _0x7682b2.match(/<TRACK WITH VARIABLE (\d+)>/gi);
  if (_0x155c3f) {
    for (const _0x319371 of _0x155c3f) {
      _0x319371.match(/<TRACK WITH VARIABLE (\d+)>/i);
      const _0x2e361c = Number(RegExp.$1);
      const _0x2497a5 = $gameParty.numItems(_0x111435);
      $gameVariables.setValue(_0x2e361c, _0x2497a5);
    }
  }
};
VisuMZ.QuestSystem.Game_Party_initialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function () {
  VisuMZ.QuestSystem.Game_Party_initialize.call(this);
  this.initQuestLabelItemsList();
};
Game_Party.prototype.initQuestLabelItemsList = function () {
  this._questLabelItemsList = [];
};
Game_Party.prototype.isQuestItem = function (_0x541c3c) {
  if (this._questLabelItemsList === undefined) {
    this.initQuestLabelItemsList();
  }
  let _0xf5b55e = '';
  if (DataManager.isItem(_0x541c3c)) {
    _0xf5b55e = "item-%1".format(_0x541c3c.id);
  } else {
    if (DataManager.isWeapon(_0x541c3c)) {
      _0xf5b55e = "weapon-%1".format(_0x541c3c.id);
    } else {
      if (DataManager.isArmor(_0x541c3c)) {
        _0xf5b55e = 'armor-%1'.format(_0x541c3c.id);
      } else {
        return;
      }
    }
  }
  return this._questLabelItemsList.includes(_0xf5b55e);
};
Game_Party.prototype.setQuestLabelItem = function (_0x2f1743) {
  if (this._questLabelItemsList === undefined) {
    this.initQuestLabelItemsList();
  }
  let _0x2b3a27 = '';
  if (DataManager.isItem(_0x2f1743)) {
    _0x2b3a27 = "item-%1".format(_0x2f1743.id);
  } else {
    if (DataManager.isWeapon(_0x2f1743)) {
      _0x2b3a27 = "weapon-%1".format(_0x2f1743.id);
    } else {
      if (DataManager.isArmor(_0x2f1743)) {
        _0x2b3a27 = "armor-%1".format(_0x2f1743.id);
      } else {
        return;
      }
    }
  }
  if (!this._questLabelItemsList.includes(_0x2b3a27)) {
    this._questLabelItemsList.push(_0x2b3a27);
  }
};
Game_Party.prototype.clearQuestLabelItem = function (_0x56ce83) {
  if (!$gameTemp.newLabelEnabled()) {
    return;
  }
  if (this._questLabelItemsList === undefined) {
    this.initQuestLabelItemsList();
  }
  let _0x2bf97f = '';
  if (DataManager.isItem(_0x56ce83)) {
    _0x2bf97f = "item-%1".format(_0x56ce83.id);
  } else {
    if (DataManager.isWeapon(_0x56ce83)) {
      _0x2bf97f = "weapon-%1".format(_0x56ce83.id);
    } else {
      if (DataManager.isArmor(_0x56ce83)) {
        _0x2bf97f = "armor-%1".format(_0x56ce83.id);
      } else {
        return;
      }
    }
  }
  if (this._questLabelItemsList.includes(_0x2bf97f)) {
    this._questLabelItemsList.splice(this._questLabelItemsList.indexOf(_0x2bf97f), 0x1);
  }
};
VisuMZ.QuestSystem.Game_Map_requestRefresh = Game_Map.prototype.requestRefresh;
Game_Map.prototype.requestRefresh = function () {
  VisuMZ.QuestSystem.Game_Map_requestRefresh.call(this);
  if (SceneManager.isSceneMap() && !this._isRefreshingQuestTrackerWindow) {
    this._isRefreshingQuestTrackerWindow = true;
  }
};
VisuMZ.QuestSystem.Game_Map_refresh = Game_Map.prototype.refresh;
Game_Map.prototype.refresh = function () {
  VisuMZ.QuestSystem.Game_Map_refresh.call(this);
  if (SceneManager.isSceneMap() && this._isRefreshingQuestTrackerWindow) {
    SceneManager._scene.refreshQuestTrackerWindow();
    this._isRefreshingQuestTrackerWindow = false;
  }
};
VisuMZ.QuestSystem.Scene_Map_createSpriteset = Scene_Map.prototype.createSpriteset;
Scene_Map.prototype.createSpriteset = function () {
  VisuMZ.QuestSystem.Scene_Map_createSpriteset.call(this);
  this.createQuestTrackerWindow();
};
Scene_Map.prototype.createQuestTrackerWindow = function () {
  if (!SceneManager.isSceneMap()) {
    return;
  }
  const _0x11e3bc = this.questTrackerWindow();
  const _0x47916e = new Window_QuestTracker(_0x11e3bc);
  this.addChild(_0x47916e);
  this._questTrackerWindow = _0x47916e;
};
Scene_Map.prototype.questTrackerOnRight = function () {
  return ConfigManager.questTrackerPosition;
};
Scene_Map.prototype.questTrackerWindow = function () {
  return VisuMZ.QuestSystem.Settings.Window.TrackerWindow_Rect.call(this);
};
Scene_Map.prototype.refreshQuestTrackerWindow = function () {
  if (!this._questTrackerWindow) {
    return;
  }
  this._questTrackerWindow.refresh();
};
Scene_Map.prototype.setQuestForQuestTrackerWindow = function (_0x29ae18) {
  if (!this._questTrackerWindow) {
    return;
  }
  _0x29ae18 = _0x29ae18.toUpperCase().trim();
  const _0x585724 = $gameSystem.quest(_0x29ae18);
  this._questTrackerWindow.setQuest(_0x585724);
};
VisuMZ.QuestSystem.Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function () {
  VisuMZ.QuestSystem.Scene_Menu_createCommandWindow.call(this);
  this._commandWindow.setHandler('quest', this.commandQuest.bind(this));
};
Scene_Menu.prototype.commandQuest = function () {
  SceneManager.push(Scene_Quest);
};
VisuMZ.QuestSystem.Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
Scene_Options.prototype.maxCommands = function () {
  let _0x1578ae = VisuMZ.QuestSystem.Scene_Options_maxCommands.call(this);
  if (VisuMZ.QuestSystem.Settings.Tracker.AdjustRect) {
    if (VisuMZ.QuestSystem.Settings.Tracker.AddShowOption) {
      _0x1578ae++;
    }
    if (VisuMZ.QuestSystem.Settings.Tracker.AddPositionOption) {
      _0x1578ae++;
    }
  }
  return _0x1578ae;
};
function Scene_Quest() {
  this.initialize(...arguments);
}
Scene_Quest.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Quest.prototype.constructor = Scene_Quest;
Scene_Quest.prototype.initialize = function () {
  Scene_MenuBase.prototype.initialize.call(this);
};
Scene_Quest.prototype.helpAreaHeight = function () {
  return 0x0;
};
Scene_Quest.prototype.isRightInputMode = function () {
  if (ConfigManager.uiMenuStyle && ConfigManager.uiInputPosition !== undefined) {
    return ConfigManager.uiInputPosition;
  } else {
    if (ConfigManager.uiMenuStyle === false) {
      return false;
    } else {
      return Scene_MenuBase.prototype.isRightInputMode.call(this);
    }
  }
};
Scene_Quest.prototype.mainCommandWidth = function () {
  return (Graphics.boxWidth - 0x230).clamp(0xf0, Math.floor(Graphics.boxWidth / 0x2));
};
Scene_Quest.prototype.create = function () {
  Scene_MenuBase.prototype.create.call(this);
  this.createCommandWindow();
  this.createQuestLabelWindow();
  this.createQuestLogWindow();
  this.createQuestListWindow();
};
Scene_Quest.prototype.createCommandWindow = function () {
  const _0x5a7378 = this.commandWindowRect();
  const _0x78ee2d = new Window_QuestCommand(_0x5a7378);
  _0x78ee2d.setHandler("known", this.onCommandOk.bind(this));
  _0x78ee2d.setHandler("completed", this.onCommandOk.bind(this));
  _0x78ee2d.setHandler("failed", this.onCommandOk.bind(this));
  _0x78ee2d.setHandler('cancel', this.popScene.bind(this));
  this.addWindow(_0x78ee2d);
  this._commandWindow = _0x78ee2d;
  _0x78ee2d.setBackgroundType(VisuMZ.QuestSystem.Settings.Window.CommandWindow_BgType);
};
Scene_Quest.prototype.commandWindowRect = function () {
  return VisuMZ.QuestSystem.Settings.Window.CommandWindow_Rect.call(this);
};
Scene_Quest.prototype.createQuestLabelWindow = function () {
  const _0x459d05 = this.questLabelWindowRect();
  const _0x397ed0 = new Window_Base(_0x459d05);
  this.addWindow(_0x397ed0);
  this._labelWindow = _0x397ed0;
  _0x397ed0.setBackgroundType(VisuMZ.QuestSystem.Settings.Window.QuestLabel_BgType);
};
Scene_Quest.prototype.questLabelWindowRect = function () {
  return VisuMZ.QuestSystem.Settings.Window.QuestLabel_Rect.call(this);
};
Scene_Quest.prototype.createQuestLogWindow = function () {
  const _0x39b594 = this.questLogWindowRect();
  const _0x301f1a = new Window_QuestLog(_0x39b594);
  this.addWindow(_0x301f1a);
  this._logWindow = _0x301f1a;
  _0x301f1a.setBackgroundType(VisuMZ.QuestSystem.Settings.Window.LogWindow_BgType);
};
Scene_Quest.prototype.questLogWindowRect = function () {
  return VisuMZ.QuestSystem.Settings.Window.LogWindow_Rect.call(this);
};
Scene_Quest.prototype.createQuestListWindow = function () {
  const _0x1c6d4b = this.questListWindowRect();
  const _0x177700 = new Window_QuestList(_0x1c6d4b);
  _0x177700.setHandler("category", this.onListCategory.bind(this));
  _0x177700.setHandler("quest", this.onListQuest.bind(this));
  _0x177700.setHandler("cancel", this.onListCancel.bind(this));
  this.addWindow(_0x177700);
  this._listWindow = _0x177700;
  _0x177700.setBackgroundType(VisuMZ.QuestSystem.Settings.Window.ListWindow_BgType);
  this._commandWindow.setListWindow(this._listWindow);
  this._listWindow.setLabelWindow(this._labelWindow);
  this._listWindow.setLogWindow(this._logWindow);
};
Scene_Quest.prototype.questListWindowRect = function () {
  return VisuMZ.QuestSystem.Settings.Window.ListWindow_Rect.call(this);
};
Scene_Quest.prototype.onCommandOk = function () {
  this._listWindow.activate();
  this._listWindow.smoothSelect(0x0);
};
Scene_Quest.prototype.onListCategory = function () {
  this._listWindow.openCloseCurrentCategory();
  this._listWindow.activate();
};
Scene_Quest.prototype.onListQuest = function () {
  const _0x4f2fc5 = this._listWindow.currentQuest();
  const _0x2ea42d = _0x4f2fc5.Key.toUpperCase().trim();
  $gameSystem.setTrackedQuest(_0x2ea42d, true);
  this._listWindow.refresh();
  this._listWindow.activate();
};
Scene_Quest.prototype.onListCancel = function () {
  this._listWindow.deselect();
  this._commandWindow.activate();
};
Scene_Quest.prototype.buttonAssistText1 = function () {
  return TextManager.questButtonAssistPageUpDn;
};
Scene_Quest.prototype.buttonAssistText4 = function () {
  if (this._listWindow && this._listWindow.active) {
    if (this._listWindow.currentQuest()) {
      return this._listWindow.isOkEnabled() ? TextManager.questButtonAssistActive : '';
    } else {
      return this._listWindow.isCurrentCategoryOpen() ? TextManager.questButtonAssistCollapse : TextManager.questButtonAssistExpand;
    }
  }
  return Scene_MenuBase.prototype.buttonAssistText4.call(this);
};
Scene_Quest.prototype.createBackground = function () {
  Scene_MenuBase.prototype.createBackground.call(this);
  this.setBackgroundOpacity(this.getBackgroundOpacity());
  this.createCustomBackgroundImages();
};
Scene_Quest.prototype.getBackgroundOpacity = function () {
  return VisuMZ.QuestSystem.Settings.BgSettings.SnapshotOpacity;
};
Scene_Quest.prototype.createCustomBackgroundImages = function () {
  const _0x1e37e2 = {
    'BgFilename1': VisuMZ.QuestSystem.Settings.BgSettings.BgFilename1,
    'BgFilename2': VisuMZ.QuestSystem.Settings.BgSettings.BgFilename2
  };
  if (_0x1e37e2 && (_0x1e37e2.BgFilename1 !== '' || _0x1e37e2.BgFilename2 !== '')) {
    this._backSprite1 = new Sprite(ImageManager.loadTitle1(_0x1e37e2.BgFilename1));
    this._backSprite2 = new Sprite(ImageManager.loadTitle2(_0x1e37e2.BgFilename2));
    this.addChild(this._backSprite1);
    this.addChild(this._backSprite2);
    this._backSprite1.bitmap.addLoadListener(this.adjustSprite.bind(this, this._backSprite1));
    this._backSprite2.bitmap.addLoadListener(this.adjustSprite.bind(this, this._backSprite2));
  }
};
Scene_Quest.prototype.adjustSprite = function (_0x1cf541) {
  this.scaleSprite(_0x1cf541);
  this.centerSprite(_0x1cf541);
};
function Sprite_QuestLabel() {
  this.initialize(...arguments);
}
Sprite_QuestLabel.prototype = Object.create(Sprite.prototype);
Sprite_QuestLabel.prototype.constructor = Sprite_QuestLabel;
Sprite_QuestLabel.prototype.initialize = function () {
  Sprite.prototype.initialize.call(this);
  this.createBitmap();
};
Sprite_QuestLabel.prototype.createBitmap = function () {
  const _0x5c57b7 = ImageManager.iconWidth;
  const _0x30b27a = ImageManager.iconHeight;
  this.bitmap = new Bitmap(_0x5c57b7, _0x30b27a);
  this.drawNewLabelIcon();
  this.drawNewLabelText();
};
Sprite_QuestLabel.prototype.drawNewLabelIcon = function () {
  const _0x22a226 = VisuMZ.QuestSystem.Settings.Label.Icon;
  if (_0x22a226 <= 0x0) {
    return;
  }
  const _0x17bbea = ImageManager.loadSystem("IconSet");
  const _0x18a371 = ImageManager.iconWidth;
  const _0x571527 = ImageManager.iconHeight;
  const _0xf96aa9 = _0x22a226 % 0x10 * _0x18a371;
  const _0x161cb8 = Math.floor(_0x22a226 / 0x10) * _0x571527;
  this.bitmap.blt(_0x17bbea, _0xf96aa9, _0x161cb8, _0x18a371, _0x571527, 0x0, 0x0);
};
Sprite_QuestLabel.prototype.drawNewLabelText = function () {
  const _0x42abe9 = VisuMZ.QuestSystem.Settings.Label;
  const _0x575ebe = _0x42abe9.Text;
  if (_0x575ebe === '') {
    return;
  }
  const _0x2eaa5a = ImageManager.iconWidth;
  const _0x2c9ce7 = ImageManager.iconHeight;
  this.bitmap.fontFace = _0x42abe9.FontFace || $gameSystem.mainFontFace();
  this.bitmap.textColor = this.getTextColor();
  this.bitmap.fontSize = _0x42abe9.FontSize;
  this.bitmap.drawText(_0x575ebe, 0x0, _0x2c9ce7 / 0x2, _0x2eaa5a, _0x2c9ce7 / 0x2, "center");
};
Sprite_QuestLabel.prototype.getTextColor = function () {
  const _0x17d135 = VisuMZ.QuestSystem.Settings.Label.FontColor;
  return _0x17d135.match(/#(.*)/i) ? '#' + String(RegExp.$1) : ColorManager.textColor(_0x17d135);
};
VisuMZ.QuestSystem.Window_Selectable_initialize = Window_Selectable.prototype.initialize;
Window_Selectable.prototype.initialize = function (_0x182257) {
  this.initiQuestLabelSprites();
  VisuMZ.QuestSystem.Window_Selectable_initialize.call(this, _0x182257);
};
Window_Selectable.prototype.initiQuestLabelSprites = function () {
  this._questLabelSprites = {};
  this._questLabelOpacity = 0xff;
  this._questLabelOpacityChange = VisuMZ.QuestSystem.Settings.Label.FadeSpeed;
  this._questLabelOpacityUpperLimit = VisuMZ.QuestSystem.Settings.Label.FadeLimit;
};
Window_Selectable.prototype.isShowQuest = function () {
  return true;
};
VisuMZ.QuestSystem.Window_Selectable_refresh = Window_Selectable.prototype.refresh;
Window_Selectable.prototype.refresh = function () {
  this.hideQuestLabelSprites();
  VisuMZ.QuestSystem.Window_Selectable_refresh.call(this);
};
Window_Selectable.prototype.hideQuestLabelSprites = function () {
  for (const _0x5a9a85 of Object.values(this._questLabelSprites)) {
    _0x5a9a85.hide();
  }
};
VisuMZ.QuestSystem.Window_Selectable_update = Window_Selectable.prototype.update;
Window_Selectable.prototype.update = function () {
  this.updateQuestLabelOpacity();
  VisuMZ.QuestSystem.Window_Selectable_update.call(this);
};
Window_Selectable.prototype.updateQuestLabelOpacity = function () {
  if (!this.isShowQuest()) {
    return;
  }
  const _0x4f72aa = this._questLabelOpacityUpperLimit;
  this._questLabelOpacity += this._questLabelOpacityChange;
  if (this._questLabelOpacity >= _0x4f72aa || this._questLabelOpacity <= 0x0) {
    this._questLabelOpacityChange *= -0x1;
  }
  this._questLabelOpacity = this._questLabelOpacity.clamp(0x0, _0x4f72aa);
  for (const _0x2e31b3 of Object.values(this._questLabelSprites)) {
    _0x2e31b3.opacity = this._questLabelOpacity;
  }
};
Window_Selectable.prototype.createQuestLabelSprite = function (_0x1c1636) {
  const _0x29d4ec = this._questLabelSprites;
  if (_0x29d4ec[_0x1c1636]) {
    return _0x29d4ec[_0x1c1636];
  } else {
    const _0x402c42 = new Sprite_QuestLabel();
    _0x29d4ec[_0x1c1636] = _0x402c42;
    this.addInnerChild(_0x402c42);
    return _0x402c42;
  }
};
Window_Selectable.prototype.placeQuestLabel = function (_0x362d53, _0x537062, _0x24c7fc) {
  let _0x13f096 = '';
  if (DataManager.isItem(_0x362d53)) {
    _0x13f096 = "item-%1".format(_0x362d53.id);
  } else {
    if (DataManager.isWeapon(_0x362d53)) {
      _0x13f096 = "weapon-%1".format(_0x362d53.id);
    } else {
      if (DataManager.isArmor(_0x362d53)) {
        _0x13f096 = "armor-%1".format(_0x362d53.id);
      } else {
        return;
      }
    }
  }
  const _0x3434a6 = this.createQuestLabelSprite(_0x13f096);
  _0x3434a6.move(_0x537062, _0x24c7fc);
  _0x3434a6.show();
  _0x3434a6.opacity = this._questLabelOpacity;
};
VisuMZ.QuestSystem.Window_ItemList_drawItem = Window_ItemList.prototype.drawItem;
Window_ItemList.prototype.drawItem = function (_0x75b803) {
  VisuMZ.QuestSystem.Window_ItemList_drawItem.call(this, _0x75b803);
  this.placeItemQuestLabel(_0x75b803);
};
Window_ItemList.prototype.placeItemQuestLabel = function (_0x35965b) {
  const _0x1f5df2 = this.itemAt(_0x35965b);
  if (!_0x1f5df2 || !this.isShowQuest()) {
    return;
  }
  if (!$gameParty.isQuestItem(_0x1f5df2)) {
    return;
  }
  const _0x12e1d0 = this.itemLineRect(_0x35965b);
  const _0x3ac3aa = _0x12e1d0.x;
  const _0x58d296 = _0x12e1d0.y + (this.lineHeight() - ImageManager.iconHeight) / 0x2;
  const _0xdafb3c = VisuMZ.QuestSystem.Settings.Label.OffsetX;
  const _0x7da674 = VisuMZ.QuestSystem.Settings.Label.OffsetY;
  this.placeQuestLabel(_0x1f5df2, _0x3ac3aa + _0xdafb3c, _0x58d296 + _0x7da674);
};
VisuMZ.QuestSystem.Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function () {
  VisuMZ.QuestSystem.Window_MenuCommand_addOriginalCommands.call(this);
  this.addQuestCommand();
};
Window_MenuCommand.prototype.addQuestCommand = function () {
  if (!this.addQuestCommandAutomatically()) {
    return;
  }
  if (!this.isQuestCommandVisible()) {
    return;
  }
  const _0x41d529 = TextManager.questCommandName;
  const _0x33eef1 = this.isQuestCommandEnabled();
  this.addCommand(_0x41d529, "quest", _0x33eef1);
};
Window_MenuCommand.prototype.addQuestCommandAutomatically = function () {
  return !Imported.VisuMZ_1_MainMenuCore;
};
Window_MenuCommand.prototype.isQuestCommandVisible = function () {
  return $gameSystem.isquestMenuShown();
};
Window_MenuCommand.prototype.isQuestCommandEnabled = function () {
  return $gameSystem.isquestMenuEnabled();
};
VisuMZ.QuestSystem.Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function () {
  VisuMZ.QuestSystem.Window_Options_addGeneralOptions.call(this);
  this.addQuestSystemCommands();
};
Window_Options.prototype.addQuestSystemCommands = function () {
  if (VisuMZ.QuestSystem.Settings.Tracker.AddShowOption) {
    this.addQuestSystemquestTrackerShowCommand();
  }
  if (VisuMZ.QuestSystem.Settings.Tracker.AddPositionOption) {
    this.addQuestSystemquestTrackerPositionCommand();
  }
};
Window_Options.prototype.addQuestSystemquestTrackerShowCommand = function () {
  const _0x583ac5 = TextManager.questTrackerShow;
  this.addCommand(_0x583ac5, 'questTrackerShow');
};
Window_Options.prototype.addQuestSystemquestTrackerPositionCommand = function () {
  const _0xf60721 = TextManager.questTrackerPosition;
  this.addCommand(_0xf60721, "questTrackerPosition");
};
VisuMZ.QuestSystem.Window_Options_statusText = Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function (_0x5c1743) {
  const _0x315187 = this.commandSymbol(_0x5c1743);
  if (_0x315187 === 'questTrackerPosition') {
    const _0xc00166 = this.getConfigValue(_0x315187);
    return _0xc00166 ? TextManager.questTrackerPosOn : TextManager.questTrackerPosOff;
  }
  return VisuMZ.QuestSystem.Window_Options_statusText.call(this, _0x5c1743);
};
function Window_QuestCommand() {
  this.initialize(...arguments);
}
Window_QuestCommand.prototype = Object.create(Window_Command.prototype);
Window_QuestCommand.prototype.constructor = Window_QuestCommand;
Window_QuestCommand.prototype.initialize = function (_0x1b736b) {
  Window_Command.prototype.initialize.call(this, _0x1b736b);
  this.createCommandNameWindow(_0x1b736b);
};
Window_QuestCommand.prototype.createCommandNameWindow = function (_0x2aadc9) {
  const _0x432e0d = new Rectangle(0x0, 0x0, _0x2aadc9.width, _0x2aadc9.height);
  this._commandNameWindow = new Window_Base(_0x432e0d);
  this._commandNameWindow.opacity = 0x0;
  this.addChild(this._commandNameWindow);
  this.updateCommandNameWindow();
};
Window_QuestCommand.prototype.callUpdateHelp = function () {
  Window_Command.prototype.callUpdateHelp.call(this);
  if (this._commandNameWindow) {
    this.updateCommandNameWindow();
  }
  if (this._listWindow) {
    this._listWindow.setCategoryFilter(this.currentSymbol());
  }
};
Window_QuestCommand.prototype.updateCommandNameWindow = function () {
  const _0x2190ed = this._commandNameWindow;
  _0x2190ed.contents.clear();
  const _0x21e497 = this.commandStyleCheck(this.index());
  if (_0x21e497 === 'icon') {
    const _0x137ea0 = this.itemLineRect(this.index());
    let _0x34d864 = this.commandName(this.index());
    _0x34d864 = _0x34d864.replace(/\\I\[(\d+)\]/gi, '');
    _0x2190ed.resetFontSettings();
    this.commandNameWindowDrawBackground(_0x34d864, _0x137ea0);
    this.commandNameWindowDrawText(_0x34d864, _0x137ea0);
    this.commandNameWindowCenter(_0x34d864, _0x137ea0);
  }
};
Window_QuestCommand.prototype.commandNameWindowDrawBackground = function (_0x5e2292, _0x56f32b) {};
Window_QuestCommand.prototype.commandNameWindowDrawText = function (_0x171a9b, _0x3017f6) {
  const _0x4d49a5 = this._commandNameWindow;
  _0x4d49a5.drawText(_0x171a9b, 0x0, _0x3017f6.y, _0x4d49a5.innerWidth, "center");
};
Window_QuestCommand.prototype.commandNameWindowCenter = function (_0x4d70ed, _0x1e5175) {
  const _0x1b6e15 = this._commandNameWindow;
  const _0x4a81b4 = $gameSystem.windowPadding();
  const _0x4dcbf0 = _0x1e5175.x + Math.floor(_0x1e5175.width / 0x2) + _0x4a81b4;
  _0x1b6e15.x = _0x1b6e15.width / -0x2 + _0x4dcbf0;
  _0x1b6e15.y = Math.floor(_0x1e5175.height / 0x2);
};
Window_QuestCommand.prototype.makeCommandList = function () {
  this.addKnownQuestsCommand();
  this.addCompletedQuestsCommand();
  this.addFailedQuestsCommand();
};
Window_QuestCommand.prototype.addKnownQuestsCommand = function () {
  const _0x564afb = ImageManager.questKnownIcon;
  let _0x4d32aa = TextManager.questKnownCmd;
  if (_0x564afb > 0x0 && this.commandStyle() !== 'text') {
    _0x4d32aa = "\\I[%1]%2".format(_0x564afb, _0x4d32aa);
  }
  const _0x296ebd = this.isKnownQuestsEnabled();
  this.addCommand(_0x4d32aa, 'known', _0x296ebd);
};
Window_QuestCommand.prototype.isKnownQuestsEnabled = function () {
  return $gameSystem.questsKnown().length > 0x0;
};
Window_QuestCommand.prototype.addCompletedQuestsCommand = function () {
  const _0x200b36 = ImageManager.questCompletedIcon;
  let _0x38a6d9 = TextManager.questCompletedCmd;
  if (_0x200b36 > 0x0 && this.commandStyle() !== "text") {
    _0x38a6d9 = "\\I[%1]%2".format(_0x200b36, _0x38a6d9);
  }
  const _0xe06607 = this.isCompletedQuestsEnabled();
  this.addCommand(_0x38a6d9, "completed", _0xe06607);
};
Window_QuestCommand.prototype.isCompletedQuestsEnabled = function () {
  return $gameSystem.questsCompleted().length > 0x0;
};
Window_QuestCommand.prototype.addFailedQuestsCommand = function () {
  if (!this.isFailedQuestsVisible()) {
    return;
  }
  const _0x4c7882 = ImageManager.questFailedIcon;
  let _0x3746e3 = TextManager.questFailedCmd;
  if (_0x4c7882 > 0x0 && this.commandStyle() !== "text") {
    _0x3746e3 = "\\I[%1]%2".format(_0x4c7882, _0x3746e3);
  }
  const _0x504f5b = this.isFailedQuestsEnabled();
  this.addCommand(_0x3746e3, "failed", _0x504f5b);
};
Window_QuestCommand.prototype.isFailedQuestsVisible = function () {
  return VisuMZ.QuestSystem.Settings.Window.ShowFailed;
};
Window_QuestCommand.prototype.isFailedQuestsEnabled = function () {
  return $gameSystem.questsFailed().length > 0x0;
};
Window_QuestCommand.prototype.totalCommands = function () {
  return this.isFailedQuestsVisible() ? 0x3 : 0x2;
};
Window_QuestCommand.prototype.itemTextAlign = function () {
  return VisuMZ.QuestSystem.Settings.Window.CmdTextAlign;
};
Window_QuestCommand.prototype.drawItem = function (_0x31e982) {
  const _0x4d8018 = this.commandStyleCheck(_0x31e982);
  if (_0x4d8018 === "iconText") {
    this.drawItemStyleIconText(_0x31e982);
  } else if (_0x4d8018 === "icon") {
    this.drawItemStyleIcon(_0x31e982);
  } else {
    Window_HorzCommand.prototype.drawItem.call(this, _0x31e982);
  }
};
Window_QuestCommand.prototype.commandStyle = function () {
  return VisuMZ.QuestSystem.Settings.Window.CmdStyle;
};
Window_QuestCommand.prototype.commandStyleCheck = function (_0x215dbb) {
  if (_0x215dbb < 0x0) {
    return "text";
  }
  const _0x283a62 = this.commandStyle();
  if (_0x283a62 !== "auto") {
    return _0x283a62;
  } else {
    if (this.maxItems() > 0x0) {
      const _0x6a39ab = this.commandName(_0x215dbb);
      if (_0x6a39ab.match(/\\I\[(\d+)\]/i)) {
        const _0x3e7ce5 = this.itemLineRect(_0x215dbb);
        const _0x14c800 = this.textSizeEx(_0x6a39ab).width;
        if (_0x14c800 <= _0x3e7ce5.width) {
          return "iconText";
        } else {
          return "icon";
        }
      }
    }
  }
  return "text";
};
Window_QuestCommand.prototype.drawItemStyleIconText = function (_0x54d6d0) {
  const _0xfe1101 = this.itemLineRect(_0x54d6d0);
  const _0x3085cb = this.commandName(_0x54d6d0);
  const _0xa9fd80 = this.textSizeEx(_0x3085cb).width;
  this.changePaintOpacity(this.isCommandEnabled(_0x54d6d0));
  const _0x717cae = this.itemTextAlign();
  if (_0x717cae === "right") {
    this.drawTextEx(_0x3085cb, _0xfe1101.x + _0xfe1101.width - _0xa9fd80, _0xfe1101.y, _0xa9fd80);
  } else {
    if (_0x717cae === "center") {
      const _0x889249 = _0xfe1101.x + Math.floor((_0xfe1101.width - _0xa9fd80) / 0x2);
      this.drawTextEx(_0x3085cb, _0x889249, _0xfe1101.y, _0xa9fd80);
    } else {
      this.drawTextEx(_0x3085cb, _0xfe1101.x, _0xfe1101.y, _0xa9fd80);
    }
  }
};
Window_QuestCommand.prototype.drawItemStyleIcon = function (_0x6a9cd1) {
  this.commandName(_0x6a9cd1).match(/\\I\[(\d+)\]/i);
  const _0x461a0b = Number(RegExp.$1) || 0x0;
  const _0x2317c4 = this.itemLineRect(_0x6a9cd1);
  const _0x314294 = _0x2317c4.x + Math.floor((_0x2317c4.width - ImageManager.iconWidth) / 0x2);
  const _0x2b199b = _0x2317c4.y + (_0x2317c4.height - ImageManager.iconHeight) / 0x2;
  this.drawIcon(_0x461a0b, _0x314294, _0x2b199b);
};
Window_QuestCommand.prototype.setListWindow = function (_0x345ca4) {
  this._listWindow = _0x345ca4;
  this.callUpdateHelp();
};
function Window_QuestList() {
  this.initialize(...arguments);
}
Window_QuestList.categoryList = VisuMZ.QuestSystem.Settings.Categories;
Window_QuestList.prototype = Object.create(Window_Command.prototype);
Window_QuestList.prototype.constructor = Window_QuestList;
Window_QuestList.prototype.initialize = function (_0x4f14bf) {
  this.initCategories();
  Window_Command.prototype.initialize.call(this, _0x4f14bf);
  this.createCommandNameWindow(_0x4f14bf);
  this.deactivate();
  this.deselect();
};
Window_QuestList.prototype.initCategories = function () {
  this._categoryStatus = {};
  for (const _0x54a4b1 of VisuMZ.QuestSystem.Settings.Categories) {
    this._categoryStatus[_0x54a4b1.CategoryName] = true;
  }
  this._categoryFilter = "known";
};
Window_QuestList.prototype.setCategoryFilter = function (_0x2b49d5) {
  if (this._categoryFilter === _0x2b49d5) {
    return;
  }
  this._categoryFilter = _0x2b49d5;
  this.refresh();
};
Window_QuestList.prototype.openCloseCurrentCategory = function () {
  const _0x11859d = this.currentCategory();
  this._categoryStatus[_0x11859d.CategoryName] = !this._categoryStatus[_0x11859d.CategoryName];
  this.refresh();
  this.callUpdateHelp();
};
Window_QuestList.prototype.isCurrentCategoryOpen = function () {
  const _0x3e68ec = this.currentCategory();
  return _0x3e68ec && this._categoryStatus[_0x3e68ec.CategoryName];
};
Window_QuestList.prototype.createCommandNameWindow = function (_0x1938ca) {
  const _0x5d24c0 = new Rectangle(0x0, 0x0, _0x1938ca.width, _0x1938ca.height);
  this._commandNameWindow = new Window_Base(_0x5d24c0);
  this._commandNameWindow.opacity = 0x0;
  this.addChild(this._commandNameWindow);
  this.updateCommandNameWindow();
};
Window_QuestList.prototype.callUpdateHelp = function () {
  Window_Command.prototype.callUpdateHelp.call(this);
  if (this._commandNameWindow) {
    this.updateCommandNameWindow();
  }
  if (this._labelWindow) {
    this.updateLabelWindow();
  }
  if (this._logWindow) {
    this.updateLogWindow();
  }
};
Window_QuestList.prototype.updateCommandNameWindow = function () {
  const _0x1b7be3 = this._commandNameWindow;
  _0x1b7be3.contents.clear();
  const _0xec53fd = this.commandStyleCheck(this.index());
  if (_0xec53fd === "icon") {
    const _0x3dcba4 = this.itemLineRect(this.index());
    let _0x47a1c8 = this.commandName(this.index());
    _0x47a1c8 = _0x47a1c8.replace(/\\I\[(\d+)\]/gi, '');
    _0x1b7be3.resetFontSettings();
    this.commandNameWindowDrawBackground(_0x47a1c8, _0x3dcba4);
    this.commandNameWindowDrawText(_0x47a1c8, _0x3dcba4);
    this.commandNameWindowCenter(_0x47a1c8, _0x3dcba4);
  }
};
Window_QuestList.prototype.commandNameWindowDrawBackground = function (_0xa7f000, _0x1ccfb4) {};
Window_QuestList.prototype.commandNameWindowDrawText = function (_0x211647, _0x1b145a) {
  const _0x4632be = this._commandNameWindow;
  _0x4632be.drawText(_0x211647, 0x0, _0x1b145a.y, _0x4632be.innerWidth, "center");
};
Window_QuestList.prototype.commandNameWindowCenter = function (_0x1300e9, _0x4c4ead) {
  const _0x10ba0a = this._commandNameWindow;
  const _0x27cc8c = $gameSystem.windowPadding();
  const _0x35bb04 = _0x4c4ead.x + Math.floor(_0x4c4ead.width / 0x2) + _0x27cc8c;
  _0x10ba0a.x = _0x10ba0a.width / -0x2 + _0x35bb04;
  _0x10ba0a.y = Math.floor(_0x4c4ead.height / 0x2);
};
Window_QuestList.prototype.makeCommandList = function () {
  for (const _0x25e438 of Window_QuestList.categoryList) {
    if (!_0x25e438) {
      continue;
    }
    if (!this.doesCategoryHaveQuestsAvailable(_0x25e438)) {
      continue;
    }
    this.addCategoryCommand(_0x25e438);
    this.makeQuestList(_0x25e438);
  }
  if (this._list.length <= 0x0) {
    this.addNoQuestsListedCommand();
  }
};
Window_QuestList.prototype.addNoQuestsListedCommand = function () {
  this.addCommand(TextManager.noQuestsListed, "cancel", false);
};
Window_QuestList.prototype.doesCategoryHaveQuestsAvailable = function (_0x333f24) {
  for (const _0x5b95ad of _0x333f24.Quests) {
    if (!_0x5b95ad) {
      continue;
    }
    switch (this._categoryFilter) {
      case 'known':
        if ($gameSystem.isQuestKnown(_0x5b95ad.Key)) {
          return true;
        }
        break;
      case 'completed':
        if ($gameSystem.isQuestCompleted(_0x5b95ad.Key)) {
          return true;
        }
        break;
      case 'failed':
        if ($gameSystem.isQuestFailed(_0x5b95ad.Key)) {
          return true;
        }
        break;
    }
  }
  return false;
};
Window_QuestList.prototype.addCategoryCommand = function (_0x3346b6) {
  const _0x290f2f = this.isCategoryOpen(_0x3346b6) ? TextManager.questCategoryOpenedFmt : TextManager.questCategoryClosedFmt;
  const _0x3668b0 = this.getTotalCategoryQuests(_0x3346b6).length;
  const _0x4a2e51 = _0x290f2f.format(_0x3346b6.CategoryName, _0x3668b0);
  this.addCommand(_0x4a2e51, "category", true, _0x3346b6);
};
Window_QuestList.prototype.getTotalCategoryQuests = function (_0x36fd79) {
  switch (this._categoryFilter) {
    case "known":
      return $gameSystem.questsKnown().filter(_0x553b60 => _0x553b60.category === _0x36fd79);
      break;
    case "completed":
      return $gameSystem.questsCompleted().filter(_0x126cbb => _0x126cbb.category === _0x36fd79);
      break;
    case "failed":
      return $gameSystem.questsFailed().filter(_0x4da6ef => _0x4da6ef.category === _0x36fd79);
      break;
  }
  return [];
};
Window_QuestList.prototype.makeQuestList = function (_0x48a105) {
  if (!this.isCategoryOpen(_0x48a105)) {
    return;
  }
  for (const _0x1f5207 of _0x48a105.Quests) {
    if (!_0x1f5207) {
      continue;
    }
    switch (this._categoryFilter) {
      case "known":
        if ($gameSystem.isQuestKnown(_0x1f5207.Key)) {
          this.addQuestCommand(_0x1f5207);
        }
        break;
      case "completed":
        if ($gameSystem.isQuestCompleted(_0x1f5207.Key)) {
          this.addQuestCommand(_0x1f5207);
        }
        break;
      case "failed":
        if ($gameSystem.isQuestFailed(_0x1f5207.Key)) {
          this.addQuestCommand(_0x1f5207);
        }
        break;
    }
  }
};
Window_QuestList.prototype.isCategoryOpen = function (_0xc278f2) {
  return this._categoryStatus[_0xc278f2.CategoryName];
};
Window_QuestList.prototype.addQuestCommand = function (_0xdedfab) {
  let _0x3fd704 = _0xdedfab.Title;
  if (_0xdedfab === $gameSystem.trackedQuest()) {
    _0x3fd704 = TextManager.questTrackedQuestFmt.format(_0x3fd704);
  }
  this.addCommand(_0x3fd704, "quest", true, _0xdedfab);
};
Window_QuestList.prototype.itemTextAlign = function () {
  return "left";
};
Window_QuestList.prototype.drawItem = function (_0x190730) {
  const _0x30096b = this.commandStyleCheck(_0x190730);
  if (_0x30096b === 'iconText') {
    this.drawItemStyleIconText(_0x190730);
  } else if (_0x30096b === "icon") {
    this.drawItemStyleIcon(_0x190730);
  } else {
    Window_HorzCommand.prototype.drawItem.call(this, _0x190730);
  }
};
Window_QuestList.prototype.commandStyle = function () {
  return "iconText";
};
Window_QuestList.prototype.commandStyleCheck = function (_0x3387d9) {
  if (_0x3387d9 < 0x0) {
    return "text";
  }
  const _0x1defc5 = this.commandStyle();
  if (_0x1defc5 !== 'auto') {
    return _0x1defc5;
  } else {
    if (this.maxItems() > 0x0) {
      const _0x843ae9 = this.commandName(_0x3387d9);
      if (_0x843ae9.match(/\\I\[(\d+)\]/i)) {
        const _0x40ec41 = this.itemLineRect(_0x3387d9);
        const _0x5efe67 = this.textSizeEx(_0x843ae9).width;
        return _0x5efe67 <= _0x40ec41.width ? "iconText" : "icon";
      }
    }
  }
  return 'text';
};
Window_QuestList.prototype.drawItemStyleIconText = function (_0x5bacdd) {
  const _0x2f7481 = this.itemLineRect(_0x5bacdd);
  const _0xea1a21 = this.commandName(_0x5bacdd);
  const _0x3db496 = this.textSizeEx(_0xea1a21).width;
  this.changePaintOpacity(this.isCommandEnabled(_0x5bacdd));
  const _0x2edaa3 = this.itemTextAlign();
  if (_0x2edaa3 === "right") {
    this.drawTextEx(_0xea1a21, _0x2f7481.x + _0x2f7481.width - _0x3db496, _0x2f7481.y, _0x3db496);
  } else {
    if (_0x2edaa3 === "center") {
      const _0x1a5d3a = _0x2f7481.x + Math.floor((_0x2f7481.width - _0x3db496) / 0x2);
      this.drawTextEx(_0xea1a21, _0x1a5d3a, _0x2f7481.y, _0x3db496);
    } else {
      this.drawTextEx(_0xea1a21, _0x2f7481.x, _0x2f7481.y, _0x3db496);
    }
  }
};
Window_QuestList.prototype.drawItemStyleIcon = function (_0x190807) {
  this.commandName(_0x190807).match(/\\I\[(\d+)\]/i);
  const _0x2a5e44 = Number(RegExp.$1) || 0x0;
  const _0x127d2d = this.itemLineRect(_0x190807);
  const _0x1539a2 = _0x127d2d.x + Math.floor((_0x127d2d.width - ImageManager.iconWidth) / 0x2);
  const _0x557dc2 = _0x127d2d.y + (_0x127d2d.height - ImageManager.iconHeight) / 0x2;
  this.drawIcon(_0x2a5e44, _0x1539a2, _0x557dc2);
};
Window_QuestList.prototype.currentCategory = function () {
  return this.currentSymbol() === "category" ? this.currentExt() : null;
};
Window_QuestList.prototype.currentQuest = function () {
  return this.currentSymbol() === 'quest' ? this.currentExt() : null;
};
Window_QuestList.prototype.setLabelWindow = function (_0x65ba9) {
  this._labelWindow = _0x65ba9;
  this.callUpdateHelp();
};
Window_QuestList.prototype.updateLabelWindow = function () {
  const _0x4a55bc = this.currentQuest();
  const _0x268dbe = this._labelWindow;
  _0x268dbe.contents.clear();
  const _0x2af0c7 = _0x4a55bc ? _0x4a55bc.Title : TextManager.noQuestsLabel;
  const _0x5879e6 = _0x268dbe.textSizeEx(_0x2af0c7).width;
  const _0x5823bf = _0x268dbe.itemPadding() + Math.round((_0x268dbe.innerWidth - _0x5879e6) / 0x2);
  _0x268dbe.drawTextEx(_0x2af0c7, _0x5823bf, 0x0, _0x268dbe.innerWidth);
};
Window_QuestList.prototype.setLogWindow = function (_0x3ade17) {
  this._logWindow = _0x3ade17;
  this.callUpdateHelp();
};
Window_QuestList.prototype.updateLogWindow = function () {
  const _0x5896d5 = this.currentQuest();
  const _0x41c894 = this._logWindow;
  _0x41c894.setQuest(_0x5896d5);
};
Window_QuestList.prototype.cursorPagedown = function () {};
Window_QuestList.prototype.cursorPageup = function () {};
Window_QuestList.prototype.isOkEnabled = function () {
  if (this.currentQuest()) {
    return this._categoryFilter === "known";
  } else {
    return Window_Command.prototype.isOkEnabled.call(this);
  }
};
function Window_QuestLog() {
  this.initialize(...arguments);
}
Window_QuestLog.wordWrapSupport = VisuMZ.QuestSystem.Settings.Window.LogWindow_Auto_WordWrap;
Window_QuestLog.scrollSpeed = VisuMZ.QuestSystem.Settings.Window.LogWindow_ScrollSpeed;
Window_QuestLog.prototype = Object.create(Window_Scrollable.prototype);
Window_QuestLog.prototype.constructor = Window_QuestLog;
Window_QuestLog._delayDraw = 0x19;
Window_QuestLog.prototype.initialize = function (_0x4df07f) {
  this._textHeight = 0x0;
  this._delayDraw = 0x0;
  Window_Scrollable.prototype.initialize.call(this, _0x4df07f);
  this._quest = null;
  this.refresh();
};
Window_QuestLog.prototype.contentsHeight = function () {
  return Math.max(this._textHeight, 0x1);
};
Window_QuestLog.prototype.overallHeight = function () {
  return this.contentsHeight();
};
Window_QuestLog.prototype.update = function () {
  Window_Scrollable.prototype.update.call(this);
  this.updateDelayRefresh();
};
Window_QuestLog.prototype.updateDelayRefresh = function () {
  if (this._delayDraw-- === 0x0) {
    this.refresh();
  }
};
Window_QuestLog.prototype.updateOrigin = function () {
  const _0x17ab98 = this.scrollBlockWidth() || 0x1;
  const _0x5c9117 = this.scrollBlockHeight() || 0x1;
  const _0x3f9a7c = this._scrollX - this._scrollX % _0x17ab98;
  const _0x3bd579 = this._scrollY - this._scrollY % _0x5c9117;
  if (_0x3f9a7c !== this._scrollBaseX || _0x3bd579 !== this._scrollBaseY) {
    this.updateScrollBase(_0x3f9a7c, _0x3bd579);
    this.paint();
  }
  this.origin.x = this._scrollX;
  this.origin.y = this._scrollY;
};
Window_QuestLog.prototype.processWheelScroll = function () {
  Window_Scrollable.prototype.processWheelScroll.call(this);
  this.updatePageUpDownScroll();
};
Window_QuestLog.prototype.updatePageUpDownScroll = function () {
  if (Input.isPressed("pagedown")) {
    this.smoothScrollDown(Window_QuestLog.scrollSpeed);
  }
  if (Input.isPressed("pageup")) {
    this.smoothScrollUp(Window_QuestLog.scrollSpeed);
  }
};
Window_QuestLog.prototype.setQuest = function (_0x547747) {
  if (this._quest === _0x547747) {
    return;
  }
  this._quest = _0x547747;
  this._delayDraw = Window_QuestLog._delayDraw;
};
Window_QuestLog.prototype.refresh = function () {
  this.contents.clear();
  this.calculateTextHeight();
  this.createContents();
  this.drawAllText();
};
Window_QuestLog.prototype.calculateTextHeight = function () {
  const _0x5ef64c = this._quest ? this.createQuestText() : this.createEmptyText();
  this._textHeight = this.textSizeEx(_0x5ef64c.trim()).height;
};
Window_QuestLog.prototype.drawAllText = function () {
  const _0x3b588b = this._quest ? this.createQuestText() : this.createEmptyText();
  this.drawTextEx(_0x3b588b, 0x0, 0x0, this.innerWidth);
  this._scrollY = 0x0;
  this.origin.y = 0x0;
};
Window_QuestLog.prototype.createEmptyText = function () {
  VisuMZ.QuestSystem.Settings.General.OnLoadQuestJS();
  let _0x248859 = this.getEmptyLogFmt();
  _0x248859 = VisuMZ.QuestSystem.applyWordWrap(_0x248859);
  _0x248859 = VisuMZ.QuestSystem.finalizeWordWrapSupport(_0x248859);
  return _0x248859;
};
Window_QuestLog.prototype.getEmptyLogFmt = function () {
  return TextManager.questEmptyText;
};
Window_QuestLog.prototype.createQuestText = function () {
  const _0x586f8e = this._quest;
  const _0x3e1b39 = _0x586f8e.Key.toUpperCase().trim();
  if (_0x586f8e.OnLoadQuestJS) {
    _0x586f8e.OnLoadQuestJS.call(this);
  }
  let _0x49bd41 = this.getQuestLogFmt();
  _0x49bd41 = VisuMZ.QuestSystem.convertLineBreaksForWordWrap(_0x49bd41);
  _0x49bd41 = _0x49bd41.replace(/\[\[RAWTITLE\]\]/gi, _0x586f8e.Title);
  _0x49bd41 = _0x49bd41.replace(/\[\[TITLE\]\]/gi, _0x586f8e.Title.replace(/\\I\[(\d+)\]/gi, '').trim());
  _0x49bd41 = _0x49bd41.replace(/\[\[DIFFICULTY\]\]/gi, _0x586f8e.Difficulty.trim());
  _0x49bd41 = _0x49bd41.replace(/\[\[FROM\]\]/gi, _0x586f8e.From.trim());
  _0x49bd41 = _0x49bd41.replace(/\[\[LOCATION\]\]/gi, _0x586f8e.Location.trim());
  _0x49bd41 = _0x49bd41.replace(/\[\[DESCRIPTION\]\]/gi, this.createQuestDescription(_0x3e1b39));
  _0x49bd41 = _0x49bd41.replace(/\[\[OBJECTIVES\]\]/gi, this.createQuestObjectives(_0x586f8e, _0x3e1b39));
  _0x49bd41 = _0x49bd41.replace(/\[\[REWARDS\]\]/gi, this.createQuestRewards(_0x586f8e, _0x3e1b39));
  _0x49bd41 = _0x49bd41.replace(/\[\[SUBTEXT\]\]/gi, this.createQuestSubtext(_0x3e1b39));
  _0x49bd41 = _0x49bd41.replace(/\[\[QUOTE\]\]/gi, this.createQuestQuote(_0x3e1b39));
  _0x49bd41 = VisuMZ.QuestSystem.finalizeWordWrapSupport(_0x49bd41);
  _0x49bd41 = VisuMZ.QuestSystem.noMessageCoreRemoveEscapeCodes(_0x49bd41);
  return _0x49bd41.trim();
};
Window_QuestLog.prototype.getQuestLogFmt = function () {
  return TextManager.questLogFmt;
};
Window_QuestLog.prototype.createQuestDescription = function (_0x523898) {
  let _0x2d78c4 = $gameSystem.questDescription(_0x523898);
  _0x2d78c4 = VisuMZ.QuestSystem.finalizeWordWrapSupport(_0x2d78c4);
  return _0x2d78c4.trim();
};
Window_QuestLog.prototype.createQuestObjectives = function (_0x4f9ebe, _0x21f445) {
  const _0x33a68d = [];
  const _0x3fdf96 = $gameSystem.questObjectives(_0x21f445);
  const _0x516fad = $gameSystem.questObjectivesCompleted(_0x21f445);
  const _0x5b7b9c = $gameSystem.questObjectivesFailed(_0x21f445);
  const _0x504fe0 = _0x3fdf96.concat(_0x516fad).concat(_0x5b7b9c).sort((_0x3badd1, _0x1bd486) => _0x3badd1 - _0x1bd486);
  for (const _0x17e4a9 of _0x504fe0) {
    if (!_0x4f9ebe.Objectives[_0x17e4a9]) {
      continue;
    }
    const _0x2ba389 = _0x4f9ebe.Objectives[_0x17e4a9];
    let _0x2d5206 = TextManager.questObjectiveNormalFmt;
    if (_0x516fad.includes(_0x17e4a9)) {
      _0x2d5206 = TextManager.questObjectiveClearedFmt;
    }
    if (_0x5b7b9c.includes(_0x17e4a9)) {
      _0x2d5206 = TextManager.questObjectiveFailedFmt;
    }
    _0x33a68d.push(VisuMZ.QuestSystem.applyWordWrapEntry(_0x2d5206.format(_0x2ba389).trim()));
  }
  let _0x3f7fdc = VisuMZ.QuestSystem.joinQuestEntries(_0x33a68d);
  return _0x3f7fdc;
};
Window_QuestLog.prototype.createQuestRewards = function (_0x570d68, _0x4df834) {
  const _0x4ad361 = [];
  const _0x3d7e2f = $gameSystem.questRewards(_0x4df834);
  const _0xfc3784 = $gameSystem.questRewardsClaimed(_0x4df834);
  const _0x5e86cf = $gameSystem.questRewardsDenied(_0x4df834);
  const _0x1eb78b = _0x3d7e2f.concat(_0xfc3784).concat(_0x5e86cf).sort((_0x2f8108, _0x3ff635) => _0x2f8108 - _0x3ff635);
  for (const _0x5f47cc of _0x1eb78b) {
    if (!_0x570d68.Rewards[_0x5f47cc]) {
      continue;
    }
    const _0x1a502d = _0x570d68.Rewards[_0x5f47cc];
    let _0xf7b08c = TextManager.questRewardsNormalFmt;
    if (_0xfc3784.includes(_0x5f47cc)) {
      _0xf7b08c = TextManager.questRewardsClaimedFmt;
    }
    if (_0x5e86cf.includes(_0x5f47cc)) {
      _0xf7b08c = TextManager.questRewardsDeniedFmt;
    }
    _0x4ad361.push(VisuMZ.QuestSystem.applyWordWrapEntry(_0xf7b08c.format(_0x1a502d).trim()));
  }
  let _0x5ac480 = VisuMZ.QuestSystem.joinQuestEntries(_0x4ad361);
  return _0x5ac480;
};
Window_QuestLog.prototype.createQuestSubtext = function (_0x2398a7) {
  let _0x3f79ec = $gameSystem.questSubtext(_0x2398a7);
  _0x3f79ec = VisuMZ.QuestSystem.finalizeWordWrapSupport(_0x3f79ec);
  return _0x3f79ec.trim();
};
Window_QuestLog.prototype.createQuestQuote = function (_0x264e28) {
  let _0x55e72a = $gameSystem.questQuote(_0x264e28);
  _0x55e72a = VisuMZ.QuestSystem.finalizeWordWrapSupport(_0x55e72a);
  return _0x55e72a.trim();
};
function Window_QuestTracker() {
  this.initialize(...arguments);
}
Window_QuestTracker.prototype = Object.create(Window_QuestLog.prototype);
Window_QuestTracker.prototype.constructor = Window_QuestTracker;
Window_QuestTracker.scale = VisuMZ.QuestSystem.Settings.Window.TrackerWindow_Scale;
Window_QuestTracker.activeBgType = VisuMZ.QuestSystem.Settings.Window.TrackerWindow_BgType;
Window_QuestTracker.CLOSE_MINIMUM_OPACITY = VisuMZ.QuestSystem.Settings.Tracker.MinTrackerOpacity ?? 0x80;
Window_QuestTracker.CLOSE_FADE_SPEED = VisuMZ.QuestSystem.Settings.Tracker.CompassFadeSpeed ?? 0x10;
Window_QuestTracker.prototype.initialize = function (_0x5c9fd7) {
  Window_QuestLog.prototype.initialize.call(this, _0x5c9fd7);
  this.setQuest($gameSystem.trackedQuest());
  this.scale.x = this.scale.y = Window_QuestTracker.scale;
  this.updateVisibility();
};
Window_QuestTracker.prototype.contentsHeight = function () {
  return Math.max(this._textHeight, 0x1);
};
Window_QuestTracker.prototype.getEmptyLogFmt = function () {
  return '';
};
Window_QuestTracker.prototype.getQuestLogFmt = function () {
  return TextManager.questTrackerFmt;
};
Window_QuestTracker.prototype.createContents = function () {
  this.height = this.contentsHeight() + $gameSystem.windowPadding() * 0x2;
  Window_QuestLog.prototype.createContents.call(this);
};
Window_QuestTracker.prototype.setQuest = function (_0x3d1ed2) {
  if (this._quest === _0x3d1ed2) {
    return;
  }
  this._quest = _0x3d1ed2;
  this.refresh();
};
Window_QuestTracker.prototype.refresh = function () {
  if ($gameTemp._questTrackerRefresh) {
    return;
  }
  $gameTemp._questTrackerRefresh = true;
  Window_QuestLog.prototype.refresh.call(this);
  this.setBackgroundType(this._quest ? Window_QuestTracker.activeBgType : 0x2);
  $gameTemp._questTrackerRefresh = false;
};
Window_QuestTracker.prototype.update = function () {
  Window_QuestLog.prototype.update.call(this);
  this.updateOpacity();
  this.updateVisibility();
};
Window_QuestTracker.prototype.updateOpacity = function () {
  let _0x3fbc5b = this.contentsOpacity;
  const _0x3a4c47 = Window_QuestTracker.CLOSE_FADE_SPEED;
  if (this.isCloseToQuestTrackerScreenPosition()) {
    const _0xc854b9 = Window_QuestTracker.CLOSE_MINIMUM_OPACITY;
    _0x3fbc5b = (_0x3fbc5b - _0x3a4c47).clamp(_0xc854b9, 0xff);
  } else {
    _0x3fbc5b += _0x3a4c47;
  }
  this.contentsOpacity = _0x3fbc5b;
  this.backOpacity = _0x3fbc5b;
};
Window_QuestTracker.prototype.isCloseToQuestTrackerScreenPosition = function () {
  if (!SceneManager.isSceneMap()) {
    return false;
  }
  const _0x36ebd2 = $gameMap.tileHeight();
  const _0x2eb034 = $gameScreen.zoomScale();
  const _0x1398c5 = $gamePlayer.screenX() * _0x2eb034;
  const _0x4475df = ($gamePlayer.screenY() - Math.floor(_0x36ebd2 / 0x2 * _0x2eb034)) * _0x2eb034;
  const _0x5b802c = new Point(_0x1398c5, _0x4475df);
  const _0x3e54eb = this.worldTransform.applyInverse(_0x5b802c);
  return this.innerRect.contains(_0x3e54eb.x, _0x3e54eb.y);
};
Window_QuestTracker.prototype.updateVisibility = function () {
  const _0x4e8b2d = this.visibilityLevel();
  this.openness = _0x4e8b2d;
};
Window_QuestTracker.prototype.visibilityLevel = function () {
  if (!ConfigManager.questTrackerShow) {
    return 0x0;
  }
  if ($gameTemp._doodadEditorMode) {
    return 0x0;
  }
  const _0x1026bb = SceneManager._scene;
  if (_0x1026bb && _0x1026bb._messageWindow) {
    if (_0x1026bb._messageWindow.openness > 0x0) {
      return 0x0;
    }
  }
  if (!this._quest) {
    return 0x0;
  }
  if ($gamePlayer.isTransferring()) {
    return 0x0;
  }
  if ($gameParty.inBattle()) {
    return 0x0;
  }
  if (SceneManager.isSceneChanging()) {
    return 0x0;
  }
  return $gameSystem.isQuestTrackerVisible() ? 0xff : 0x0;
};
VisuMZ.QuestSystem.finalizeWordWrapSupport = function (_0x31173c) {
  if (!Window_QuestLog.wordWrapSupport) {
    return _0x31173c;
  }
  if (!Imported.VisuMZ_1_MessageCore) {
    return _0x31173c;
  }
  _0x31173c = "<WORDWRAP>%1".format(_0x31173c);
  return _0x31173c;
};
VisuMZ.QuestSystem.noMessageCoreRemoveEscapeCodes = function (_0x35b9a8) {
  if (Imported.VisuMZ_1_MessageCore) {
    return _0x35b9a8;
  }
  _0x35b9a8 = _0x35b9a8.replace(/<COLORLOCK>/gi, '');
  _0x35b9a8 = _0x35b9a8.replace(/<\/COLORLOCK>/gi, '');
  return _0x35b9a8;
};
VisuMZ.QuestSystem.applyWordWrap = function (_0x4404d1) {
  if (!Window_QuestLog.wordWrapSupport) {
    return _0x4404d1.replace(/<(?:BR|LINEBREAK)>/gi, '');
  }
  if (!Imported.VisuMZ_1_MessageCore) {
    return _0x4404d1.replace(/<(?:BR|LINEBREAK)>/gi, '');
  }
  if (VisuMZ.MessageCore.Settings.WordWrap.LineBreakSpace) {
    _0x4404d1 = _0x4404d1.replace(/[\n\r]+/g, "WrapBreak[0]");
  } else {
    _0x4404d1 = _0x4404d1.replace(/[\n\r]+/g, '');
  }
  return _0x4404d1;
};
VisuMZ.QuestSystem.convertLineBreaksForWordWrap = function (_0x4d6ec6) {
  if (!Window_QuestLog.wordWrapSupport) {
    return _0x4d6ec6;
  }
  if (!Imported.VisuMZ_1_MessageCore) {
    return _0x4d6ec6;
  }
  return _0x4d6ec6.trim().replace(/[\n\r]/g, "<BR>");
};
VisuMZ.QuestSystem.applyWordWrapEntry = function (_0x3d5309) {
  if (!Window_QuestLog.wordWrapSupport) {
    return _0x3d5309;
  }
  if (!Imported.VisuMZ_1_MessageCore) {
    return _0x3d5309;
  }
  return VisuMZ.QuestSystem.applyWordWrap(_0x3d5309.trim());
};
VisuMZ.QuestSystem.joinQuestEntries = function (_0x209f8c) {
  if (!Window_QuestLog.wordWrapSupport) {
    return _0x209f8c.join("\n").trim();
  }
  if (!Imported.VisuMZ_1_MessageCore) {
    return _0x209f8c.join("\n").trim();
  }
  return _0x209f8c.join("<BR>").trim();
};
totalQuestsAvailable = function () {
  return $gameSystem.questData().known.length;
};
totalQuestsCompleted = function () {
  return $gameSystem.questData().completed.length;
};
totalQuestsFailed = function () {
  return $gameSystem.questData().failed.length;
};
totalQuestsRevealed = function () {
  return totalQuestsAvailable() + totalQuestsCompleted() + totalQuestsFailed();
};
totalQuestsInGame = function () {
  return VisuMZ.QuestSystem.QuestOrder.length;
};
getQuestDescriptionIndex = function (_0x36f464) {
  _0x36f464 = _0x36f464.toUpperCase().trim();
  const _0x11aa3b = $gameSystem.quest(_0x36f464);
  if (!_0x11aa3b) {
    return -0x1;
  }
  $gameSystem.questDescription(_0x36f464);
  const _0x57f8e0 = $gameSystem.questData().description;
  return _0x57f8e0[_0x36f464] || 0x0;
};
totalVisibleQuestObjectives = function (_0x439e4a) {
  _0x439e4a = _0x439e4a.toUpperCase().trim();
  const _0x57ed91 = $gameSystem.quest(_0x439e4a);
  if (!_0x57ed91) {
    return -0x1;
  }
  $gameSystem.questObjectives(_0x439e4a);
  const _0x6332c = $gameSystem.questData().objectives || {};
  if (!_0x6332c[_0x439e4a]) {
    return 0x0;
  }
  return _0x6332c[_0x439e4a].length;
};
totalQuestObjectives = function (_0x323925) {
  _0x323925 = _0x323925.toUpperCase().trim();
  const _0x48c053 = $gameSystem.quest(_0x323925);
  return _0x48c053 ? _0x48c053.Objectives.length - 0x1 : 0x0;
};
totalVisibleQuestRewards = function (_0x422ca5) {
  _0x422ca5 = _0x422ca5.toUpperCase().trim();
  const _0x5a138d = $gameSystem.quest(_0x422ca5);
  if (!_0x5a138d) {
    return -0x1;
  }
  $gameSystem.questRewards(_0x422ca5);
  const _0x2046f6 = $gameSystem.questData().rewards || {};
  if (!_0x2046f6[_0x422ca5]) {
    return 0x0;
  }
  return _0x2046f6[_0x422ca5].length;
};
totalQuestRewards = function (_0x198b5d) {
  _0x198b5d = _0x198b5d.toUpperCase().trim();
  const _0x98974f = $gameSystem.quest(_0x198b5d);
  return _0x98974f ? _0x98974f.Rewards.length - 0x1 : 0x0;
};
getQuestSubtextIndex = function (_0x47235b) {
  _0x47235b = _0x47235b.toUpperCase().trim();
  const _0xdf9856 = $gameSystem.quest(_0x47235b);
  if (!_0xdf9856) {
    return -0x1;
  }
  $gameSystem.questSubtext(_0x47235b);
  const _0x4ba74d = $gameSystem.questData().subtext;
  return _0x4ba74d[_0x47235b] || 0x0;
};
getQuestQuoteIndex = function (_0x3e6cbc) {
  _0x3e6cbc = _0x3e6cbc.toUpperCase().trim();
  const _0x13f11a = $gameSystem.quest(_0x3e6cbc);
  if (!_0x13f11a) {
    return -0x1;
  }
  $gameSystem.questQuote(_0x3e6cbc);
  const _0x574cdd = $gameSystem.questData().quotes;
  return _0x574cdd[_0x3e6cbc] || 0x0;
};
isQuestObjectiveCompleted = function (_0x13eab2, _0x43e637) {
  _0x13eab2 = _0x13eab2.toUpperCase().trim();
  const _0x378cb8 = $gameSystem.quest(_0x13eab2);
  if (!_0x378cb8) {
    return false;
  }
  $gameSystem.questObjectives(_0x13eab2);
  const _0x354388 = $gameSystem.questData().objectivesCompleted;
  if (!_0x354388[_0x13eab2]) {
    return false;
  }
  return _0x354388[_0x13eab2].includes(_0x43e637);
};
isQuestObjectiveFailed = function (_0x28780f, _0x18b59e) {
  _0x28780f = _0x28780f.toUpperCase().trim();
  const _0x3a9814 = $gameSystem.quest(_0x28780f);
  if (!_0x3a9814) {
    return false;
  }
  $gameSystem.questObjectives(_0x28780f);
  const _0xa79bc4 = $gameSystem.questData().objectivesFailed;
  if (!_0xa79bc4[_0x28780f]) {
    return false;
  }
  return _0xa79bc4[_0x28780f].includes(_0x18b59e);
};
isQuestObjectiveUncleared = function (_0x1f98da, _0x29f257) {
  _0x1f98da = _0x1f98da.toUpperCase().trim();
  const _0xf734d7 = $gameSystem.quest(_0x1f98da);
  if (!_0xf734d7) {
    return false;
  }
  $gameSystem.questObjectives(_0x1f98da);
  const _0x2959f8 = $gameSystem.questData().objectives;
  if (!_0x2959f8[_0x1f98da]) {
    return false;
  }
  return _0x2959f8[_0x1f98da].includes(_0x29f257);
};
isQuestRewardClaimed = function (_0x5c4c8b, _0x462998) {
  _0x5c4c8b = _0x5c4c8b.toUpperCase().trim();
  const _0x797c9c = $gameSystem.quest(_0x5c4c8b);
  if (!_0x797c9c) {
    return false;
  }
  $gameSystem.questRewards(_0x5c4c8b);
  const _0x1a78a4 = $gameSystem.questData().rewardsClaimed;
  if (!_0x1a78a4[_0x5c4c8b]) {
    return false;
  }
  return _0x1a78a4[_0x5c4c8b].includes(_0x462998);
};
isQuestRewardDenied = function (_0x39a377, _0x28764b) {
  _0x39a377 = _0x39a377.toUpperCase().trim();
  const _0x6748ed = $gameSystem.quest(_0x39a377);
  if (!_0x6748ed) {
    return false;
  }
  $gameSystem.questRewards(_0x39a377);
  const _0x6c9521 = $gameSystem.questData().rewardsDenied;
  if (!_0x6c9521[_0x39a377]) {
    return false;
  }
  return _0x6c9521[_0x39a377].includes(_0x28764b);
};
isQuestRewardUnclaimed = function (_0x2c1da0, _0x8d6d91) {
  _0x2c1da0 = _0x2c1da0.toUpperCase().trim();
  const _0x1d9d04 = $gameSystem.quest(_0x2c1da0);
  if (!_0x1d9d04) {
    return false;
  }
  $gameSystem.questRewards(_0x2c1da0);
  const _0x21c40f = $gameSystem.questData().rewards;
  if (!_0x21c40f[_0x2c1da0]) {
    return false;
  }
  return _0x21c40f[_0x2c1da0].includes(_0x8d6d91);
};