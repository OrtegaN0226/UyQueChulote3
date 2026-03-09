/*:
 * @target MZ
 * @plugindesc v1.0 Simple fast-travel prompt with predefined destinations.
 * @author JackHoffx
 *
 * @param PromptText
 * @text Prompt Text
 * @type string
 * @default Where do you want to go?
 *
 * @param ShowPromptText
 * @text Show Prompt Text
 * @type boolean
 * @on Yes
 * @off No
 * @default true
 * @desc If false, show only the destination choices (no prompt text).
 *
 * @param Destinations
 * @text Destinations
 * @type struct<Destination>[]
 * @default []
 *
 * @command ShowFastTravel
 * @text Show Fast Travel
 * @desc Show the fast travel list and warp the player.
 *
 * @arg promptOverride
 * @text Prompt Override
 * @type string
 * @default
 *
 * @arg allowCancel
 * @text Allow Cancel
 * @type boolean
 * @on Yes
 * @off No
 * @default true
 *
 * @command AddFastTravelLocation
 * @text Add Fast Travel Location
 * @desc Add a destination at runtime (e.g., after a milestone).
 *
 * @arg name
 * @text Display Name
 * @type string
 * @default
 *
 * @arg mapId
 * @text Map ID
 * @type number
 * @min 1
 * @default 1
 *
 * @arg x
 * @text X
 * @type number
 * @min 0
 * @default 0
 *
 * @arg y
 * @text Y
 * @type number
 * @min 0
 * @default 0
 *
 * @arg direction
 * @text Direction
 * @type select
 * @option Retain @value 0
 * @option Down @value 2
 * @option Left @value 4
 * @option Right @value 6
 * @option Up @value 8
 * @default 2
 *
 * @arg fade
 * @text Fade Type
 * @type select
 * @option Black @value 0
 * @option White @value 1
 * @option None @value 2
 * @default 0
 *
 * @arg allowDuplicate
 * @text Allow Duplicate
 * @type boolean
 * @on Yes
 * @off No
 * @default false
 */

/*~struct~Destination:
 * @param name
 * @text Display Name
 * @type string
 * @default
 *
 * @param mapId
 * @text Map ID
 * @type number
 * @min 1
 * @default 1
 *
 * @param x
 * @text X
 * @type number
 * @min 0
 * @default 0
 *
 * @param y
 * @text Y
 * @type number
 * @min 0
 * @default 0
 *
 * @param direction
 * @text Direction
 * @type select
 * @option Retain @value 0
 * @option Down @value 2
 * @option Left @value 4
 * @option Right @value 6
 * @option Up @value 8
 * @default 2
 *
 * @param fade
 * @text Fade Type
 * @type select
 * @option Black @value 0
 * @option White @value 1
 * @option None @value 2
 * @default 0
 */

(() => {
  const PLUGIN_NAME = "JackHoffx_Fast_Travel";
  const params = PluginManager.parameters(PLUGIN_NAME);
  const DEBUG = true; // set false to silence console logging

  const promptText = String(params.PromptText || "Where do you want to go?");
  const showPromptText = String(params.ShowPromptText ?? "true") === "true";

  const baseDestinations = JSON.parse(params.Destinations || "[]").map((raw) => {
    const d = JSON.parse(raw || "{}");
    return {
      name: String(d.name || "").trim(),
      mapId: Number(d.mapId || 0),
      x: Number(d.x || 0),
      y: Number(d.y || 0),
      direction: Number(d.direction || 0),
      fade: Number(d.fade || 0),
    };
  });

  function validDestinations(list) { return list.filter((d) => d.mapId > 0); }

  function runtimeDestinations() {
    if (!$gameSystem._jackFastTravelDestinations) {
      $gameSystem._jackFastTravelDestinations = baseDestinations.slice();
    }
    return $gameSystem._jackFastTravelDestinations;
  }

  function addDestination(dest, allowDuplicate) {
    const list = runtimeDestinations();
    const key = (d) => `${d.mapId}:${d.x}:${d.y}:${d.direction}:${d.name}`;
    if (!allowDuplicate) {
      const has = list.some((d) => key(d) === key(dest));
      if (has) return false;
    }
    list.push(dest);
    return true;
  }

  PluginManager.registerCommand(PLUGIN_NAME, "ShowFastTravel", function (args) {
    const prompt = (args.promptOverride || "").trim() || promptText;
    const allowCancel = String(args.allowCancel ?? "true") === "true";
    const dests = validDestinations(runtimeDestinations());
    if (DEBUG) {
      console.log(`[${PLUGIN_NAME}] ShowFastTravel called`, {
        prompt,
        allowCancel,
        destCount: dests.length,
        dests,
      });
    }

    if (dests.length === 0) {
      console.warn(`${PLUGIN_NAME}: No destinations configured.`);
      $gameMessage.add(prompt);
      $gameMessage.add("(No destinations available)");
      return;
    }

    $gameTemp._jackFastTravelHidePrompt = !showPromptText;
    $gameTemp._jackFastTravelForceChoiceLeft = true;

    // Allow the interpreter to wait for the choice UI to finish
    if (this && this.setWaitMode) this.setWaitMode("message");

    const choices = dests.map((d) => d.name || `Map ${d.mapId}`);
    const defaultIndex = 0;
    const cancelType = allowCancel ? choices.length : -1; // any non -1 enables cancel
    if (DEBUG) {
      console.log(`[${PLUGIN_NAME}] setChoices`, { choices, defaultIndex, cancelType });
    }

    $gameMessage.setChoices(choices, defaultIndex, cancelType);
    // Compatibility: some plugins (e.g., HIME Hidden Choice Conditions) call backup/restore
    // around makeCommandList. They rely on _oldChoices being populated via setupChoices,
    // but we're using setChoices directly. Mirror the expected backup to avoid losing choices.
    $gameMessage._oldChoices = ($gameMessage._choices || []).slice();
    if (showPromptText && prompt) {
      $gameMessage.add(prompt);
    } else {
      // Empty message still allows choices to display without prompt text.
      $gameMessage.add("");
    }
    $gameMessage.setChoiceCallback((index) => {
      $gameTemp._jackFastTravelHidePrompt = false;
      $gameTemp._jackFastTravelForceChoiceLeft = false;
      if (index < 0 || index >= dests.length) return; // cancelled or invalid
      const d = dests[index];
      if (DEBUG) console.log(`[${PLUGIN_NAME}] choice selected`, { index, dest: d });
      // Stop current BGM before transferring to avoid carry-over
      if (AudioManager && AudioManager.stopBgm) {
        AudioManager.stopBgm();
      }
      $gamePlayer.reserveTransfer(d.mapId, d.x, d.y, d.direction, d.fade);
    });
  });

  PluginManager.registerCommand(PLUGIN_NAME, "AddFastTravelLocation", function (args) {
    const dest = {
      name: String(args.name || "").trim(),
      mapId: Number(args.mapId || 0),
      x: Number(args.x || 0),
      y: Number(args.y || 0),
      direction: Number(args.direction || 0),
      fade: Number(args.fade || 0),
    };
    const allowDuplicate = String(args.allowDuplicate ?? "false") === "true";
    if (!dest.mapId) {
      console.warn(`${PLUGIN_NAME}: Ignoring add with mapId=0`);
      return;
    }
    const added = addDestination(dest, allowDuplicate);
    if (DEBUG) {
      console.log(
        `[${PLUGIN_NAME}] AddFastTravelLocation`,
        { dest, allowDuplicate, added, total: runtimeDestinations().length }
      );
    }
  });

  // Expose a safe open helper for menu/plugin calls.
  // It queues the fast-travel UI to run on Scene_Map (where the message window exists).
  const FastTravelAPI = {
    requestOpen(options = {}) {
      const payload = {
        promptOverride: options.promptOverride || "",
        allowCancel: String(options.allowCancel ?? "true"),
      };
      if (DEBUG) console.log(`[${PLUGIN_NAME}] requestOpen`, payload);
      $gameTemp._jackFastTravelRequest = payload;
    },
  };
  window.JackHoffxFastTravel = FastTravelAPI;

  // Hide prompt window when configured to do so.
  const _JFT_WindowMessage_startMessage = Window_Message.prototype.startMessage;
  Window_Message.prototype.startMessage = function () {
    if ($gameTemp && $gameTemp._jackFastTravelHidePrompt) {
      this._jackFastTravelPrevOpacity = this.opacity;
      this._jackFastTravelPrevContentsOpacity = this.contentsOpacity;
      this.opacity = 0;
      this.contentsOpacity = 0;
    }
    _JFT_WindowMessage_startMessage.call(this);
  };

  const _JFT_WindowMessage_terminateMessage = Window_Message.prototype.terminateMessage;
  Window_Message.prototype.terminateMessage = function () {
    _JFT_WindowMessage_terminateMessage.call(this);
    if (this._jackFastTravelPrevOpacity != null) {
      this.opacity = this._jackFastTravelPrevOpacity;
      this._jackFastTravelPrevOpacity = null;
    }
    if (this._jackFastTravelPrevContentsOpacity != null) {
      this.contentsOpacity = this._jackFastTravelPrevContentsOpacity;
      this._jackFastTravelPrevContentsOpacity = null;
    }
  };

  // Force the fast-travel choice list to the left side.
  const _JFT_WindowChoiceList_updatePlacement =
    Window_ChoiceList.prototype.updatePlacement;
  Window_ChoiceList.prototype.updatePlacement = function () {
    _JFT_WindowChoiceList_updatePlacement.call(this);
    if ($gameTemp && $gameTemp._jackFastTravelForceChoiceLeft) {
      this.x = 0;
    }
  };

  // Scene_Map hook to process queued requests (e.g., from main menu).
  const _JFT_SceneMap_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function () {
    _JFT_SceneMap_update.call(this);
    const req = $gameTemp._jackFastTravelRequest;
    if (req) {
      $gameTemp._jackFastTravelRequest = null;
      if (DEBUG) console.log(`[${PLUGIN_NAME}] processing queued request`, req);
      PluginManager.callCommand(
        $gameMap._interpreter || new Game_Interpreter(),
        PLUGIN_NAME,
        "ShowFastTravel",
        req
      );
    }
  };
})();
