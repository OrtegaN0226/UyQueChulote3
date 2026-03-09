/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/eventnames/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Name labels above events
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: Alpha R5
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.9.0
 * ----------------------------------------------------------------------------
 * Description: Add name labels above your events, to let the player know what
 * the event does or that they can interact with the event. Labels can change
 * opacity by distance to the player.
 * ----------------------------------------------------------------------------
 * Documentation:
 * -----------------------------Alpha Notes------------------------------------
 * Planned features to be added:
 * 1) Add a way to draw a background behind text
 * 2) Plugin command to hide / show specific event name
 * 3) Hue rotation option
 *
 * Want additional features not already present/listed above? Make suggestions
 * on the Patreon Post, Itch.io Page, or in my discord under the #suggestions
 * channel!
 * https://discord.gg/Gbx7JXP
 * ------------------------------Event Setup-----------------------------------
 * You can add an event name by adding a comment to your event page such as:
 * CGMZ EVENTNAME label
 * The label will be what appears above the event. It supports text codes.
 * An example might be something like:
 * CGMZ EVENTNAME \c[1]Town Greeter\c[0]
 *
 * You can also add a float to the event name. You do this by adding an
 * additional line to your comment, such as this:
 * Float: 5 60
 * The first number will be the float amount, and the second number will be the
 * time taken to complete one cycle (up/down) of the float.
 *
 * You can also add a local offset to the event name. You do this by adding an
 * additional line to your comment, such as this:
 * Offset: 5 10
 * The first number will be the x offset, the second the y offset. These can
 * be negative if you want negative offsets. A positive X will move it right,
 * and a positive y will move the name down.
 *
 * You can also add a blink effect. You do this by adding an additional line
 * to your comment, such as this:
 * Blink: 60 15
 * The first number will be how long the event name spends visible, and the
 * second number will be how long the event name spends invisible. The times
 * are in frames (60f = 1sec)
 *
 * Together, your event comment may look something like this:
 * CGMZ EVENTNAME \c[1]Town Greeter\c[0]
 * Float: 5 60
 * Offset: 5 10
 * Blink: 60 15
 *
 * You can also add the word "horizontal" on the end of your float command,
 * this will make it float horizontally instead of vertically. Example:
 * Float: 5 60 horizontal
 *
 * Text Codes: You can also add the special text code <CGMZFULLWINDOW> to your
 * event name. If this text code is added, the name will have a full window
 * background. It must be in all caps.
 * -----------------------------Custom Option----------------------------------
 * If you are using a plugin that can add custom options such as [CGMZ]
 * Options, you can create a boolean option with the symbol cgmz_eventnames
 * which will allow your player to turn event names on/off. This can be a
 * helpful feature, but some players may want this to be OFF to help with
 * immersion or for some other reason.
 * ----------------------------Plugin Commands---------------------------------
 * This plugin currently does not have any plugin commands.
 * ------------------------------Saved Games-----------------------------------
 * This plugin is fully compatible with saved games
 *
 * This means the following will work in saved games:
 * ✓ Add this plugin to your game
 * ✓ Modify plugin parameters
 * ✓ Remove this plugin from your game
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_EventNames.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * -----------------------------Latest Version---------------------------------
 * Hi all, this version adds a blink effect to event names. You specify in the
 * comment how long you want it to be visible and invisible for, and then it
 * will blink on and off for those intervals (in frames). You can combine this
 * with the other effects, such as floating text.
 *
 * This update also added a way to allow the player to turn event names on or
 * off via the Options menu (requires plugin to add custom options such as
 * [CGMZ] Options). To set this up, make a custom option that checks for the
 * symbol cgmz_eventnames that stores a boolean value.
 *
 * Alpha R5
 * - Added blink effect to event names
 * - Added Option for controlling event name visibility globally
 *
 * @param Global Options
 *
 * @param Visibility Switch
 * @parent Global Options
 * @type switch
 * @default 0
 * @desc Switch that controls if event names are visible or not (on = visible)
 *
 * @param Y Offset
 * @parent Global Options
 * @type number
 * @min -9999
 * @default 48
 * @desc The global y offset for all event names
 *
 * @param X Offset
 * @parent Global Options
 * @type number
 * @min -9999
 * @default 0
 * @desc The global x offset for all event names
 *
 * @param Opacity By Distance
 * @parent Global Options
 * @type boolean
 * @default false
 * @desc Determine if opacity will change by distance to the player
 *
 * @param Opacity Change Amount
 * @parent Global Options
 * @type number
 * @default 10
 * @desc Maximum amount of opacity to change per frame
 *
 * @param Invisible Distance
 * @parent Global Options
 * @type number
 * @default 8
 * @desc Distance from player after which the name will be invisible
 *
 * @param Visible Distance
 * @parent Global Options
 * @type number
 * @default 3
 * @desc Distance from player under which the name will be full opacity
*/
Imported.CGMZ_EventNames = true;
CGMZ.Versions["Event Names"] = "Alpha R5";
CGMZ.EventNames = {};
CGMZ.EventNames.parameters = PluginManager.parameters('CGMZ_EventNames');
CGMZ.EventNames.YOffset = Number(CGMZ.EventNames.parameters["Y Offset"]);
CGMZ.EventNames.XOffset = Number(CGMZ.EventNames.parameters["X Offset"]);
CGMZ.EventNames.OpacityChangeAmount = Number(CGMZ.EventNames.parameters["Opacity Change Amount"]);
CGMZ.EventNames.InvisibleDistance = Number(CGMZ.EventNames.parameters["Invisible Distance"]);
CGMZ.EventNames.VisibleDistance = Number(CGMZ.EventNames.parameters["Visible Distance"]);
CGMZ.EventNames.VisibilitySwitch = Number(CGMZ.EventNames.parameters["Visibility Switch"]);
CGMZ.EventNames.OpacityByDistance = (CGMZ.EventNames.parameters["Opacity By Distance"] === 'true');
//=============================================================================
// Spriteset_Map
//-----------------------------------------------------------------------------
// Add sprites of event names
//=============================================================================
//-----------------------------------------------------------------------------
// Also create event name sprites
//-----------------------------------------------------------------------------
const alias_CGMZ_EventNames_Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
Spriteset_Map.prototype.createLowerLayer = function() {
	alias_CGMZ_EventNames_Spriteset_Map_createLowerLayer.call(this);
	this._CGMZ_nameSpriteContainer = new Sprite();
	for(const event of $gameMap.events()) {
		const sprite = new CGMZ_Sprite_EventName(event);
		this._CGMZ_nameSpriteContainer.addChild(sprite);
	}
	this.addChild(this._CGMZ_nameSpriteContainer);
};
//=============================================================================
// CGMZ_Sprite_EventName
//-----------------------------------------------------------------------------
// Sprite class for event names
//=============================================================================
function CGMZ_Sprite_EventName() {
	this.initialize(...arguments);
}
CGMZ_Sprite_EventName.prototype = Object.create(Sprite.prototype);
CGMZ_Sprite_EventName.prototype.constructor = CGMZ_Sprite_EventName;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Sprite_EventName.prototype.initialize = function(event) {
	Sprite.prototype.initialize.call(this);
	this.visible = false;
	this.bitmap = new Bitmap(1, 1);
	this._event = event;
	this.initMembers();
	this.drawEventName();
};
//-----------------------------------------------------------------------------
// Initialize data
//-----------------------------------------------------------------------------
CGMZ_Sprite_EventName.prototype.initMembers = function() {
	this.anchor.x = 0.5;
	this.anchor.y = 1;
	this._floatOffset = 0;
	this._floatAmount = 0;
	this._floatTotalTime = 0;
	this._floatTime = 0;
	this._floatCounter = 0;
	this._floatDirection = 1;
	this._floatHorizontal = false;
	this._opacityCounter = 0;
	this._targetOpacity = -1;
	this._blinkOn = 0;
	this._blinkOff = 0;
	this._blinkTimer = 0;
	this._blinkPhase = 'on';
	this._initialOpacitySet = false;
	this._localOffset = new Point(0, 0);
	this._name = "";
};
//-----------------------------------------------------------------------------
// Set up the sprite properties from the event
//-----------------------------------------------------------------------------
CGMZ_Sprite_EventName.prototype.setupNameProperties = function(properties) {
	if(properties.Float && properties.FloatTimer) {
		this._floatAmount = properties.Float;
		this._floatTotalTime = properties.FloatTimer;
		this._floatHorizontal = properties.FloatHorizontal;
		this._floatTime = this._floatTotalTime / 2;
		this._floatCounter = 0;
		this._floatOffset = 0;
		this._floatDirection = 1;
	}
	if(properties.xOffset || properties.yOffset) {
		this._localOffset.x = properties.xOffset;
		this._localOffset.y = properties.yOffset;
	}
	if(properties.blinkOn || properties.blinkOff) {
		this._blinkOn = properties.blinkOn;
		this._blinkOff = properties.blinkOff;
	}
};
//-----------------------------------------------------------------------------
// Update sprite
//-----------------------------------------------------------------------------
CGMZ_Sprite_EventName.prototype.update = function() {
	Sprite.prototype.update.call(this);
	this.updateName();
	this.performVisibilityCheck();
	if(this.visible) {
		this.updatePosition();
		this.updateOpacity();
		this.updateFloat();
		this.updateBlink();
	}
};
//-----------------------------------------------------------------------------
// Update the name
//-----------------------------------------------------------------------------
CGMZ_Sprite_EventName.prototype.updateName = function() {
	const eventName = this._event.CGMZ_getEventName();
	if(this._name !== eventName) {
		this.setupNameProperties(this._event.CGMZ_getEventNameProperties());
		this._name = eventName;
		this.drawEventName();
	}
};
//-----------------------------------------------------------------------------
// Perform a visibility check
//-----------------------------------------------------------------------------
CGMZ_Sprite_EventName.prototype.performVisibilityCheck = function() {
	this._hidden = false;
	if(!this._name) this._hidden = true;
	if(CGMZ.EventNames.VisibilitySwitch && !$gameSwitches.value(CGMZ.EventNames.VisibilitySwitch)) this._hidden = true;
	if(ConfigManager.hasOwnProperty('cgmz_eventnames') && !ConfigManager.cgmz_eventnames) this._hidden = true;
	this.updateVisibility();
};
//-----------------------------------------------------------------------------
// Update position of name
//-----------------------------------------------------------------------------
CGMZ_Sprite_EventName.prototype.updatePosition = function() {
	this.x = this._event.screenX() + CGMZ.EventNames.XOffset + this._localOffset.x + (this._floatOffset * this._floatHorizontal);
	this.y = this._event.screenY() - CGMZ.EventNames.YOffset + this._localOffset.y + (this._floatOffset * !this._floatHorizontal);
};
//-----------------------------------------------------------------------------
// Update opacity of the sprite
//-----------------------------------------------------------------------------
CGMZ_Sprite_EventName.prototype.updateOpacity = function() {
	if(this._blinkPhase !== 'on') return;
	if(!CGMZ.EventNames.OpacityByDistance) {
		this.opacity = 255;
		return;
	}
	if(this._opacityCounter-- <= 0) {
		this._opacityCounter = 5;
		this._targetOpacity = this.calculateOpacityForDistance();
	}
	if(this._targetOpacity !== this._opacity) {
		if(this._initialOpacitySet) {
			const canSet = (Math.abs(this._targetOpacity - this.opacity) < CGMZ.EventNames.OpacityChangeAmount);
			const changeAmount = (this.opacity > this._targetOpacity) ? -CGMZ.EventNames.OpacityChangeAmount : CGMZ.EventNames.OpacityChangeAmount;
			this.opacity = (canSet) ? this._targetOpacity : this.opacity + changeAmount;
		} else {
			this._initialOpacitySet = true;
			this.opacity = this._targetOpacity;
		}
	}
};
//-----------------------------------------------------------------------------
// Update position of name
//-----------------------------------------------------------------------------
CGMZ_Sprite_EventName.prototype.calculateOpacityForDistance = function() {
	if(!CGMZ.EventNames.OpacityByDistance) return 255;
	const distance = this._event.CGMZ_getDistanceFromPlayer();
	if(distance > CGMZ.EventNames.InvisibleDistance) {
		return 0;
	} else if(distance < CGMZ.EventNames.VisibleDistance) {
		return 255;
	} else {
		const rate = (CGMZ.EventNames.VisibleDistance/distance).clamp(0, 1);
		return (255 * rate).clamp(0, 255);
	}
};
//-----------------------------------------------------------------------------
// Update float effect
//-----------------------------------------------------------------------------
CGMZ_Sprite_EventName.prototype.updateFloat = function() {
	if(this._floatAmount === 0) return;
	this._floatCounter++;
	this._floatTime += this._floatDirection;
	if(this._floatCounter >= 3) {
		if(this._floatTime >= this._floatTotalTime) this._floatTime = this._floatTotalTime;
		if(this._floatTime <= 0) this._floatTime = 0;
		this._floatCounter = 0;
		const percent = this._floatTime / this._floatTotalTime;
		this._floatOffset = CGMZ_Utils.lerp(-this._floatAmount, this._floatAmount, CGMZ_Utils.lerpEaseInOut(percent));
		if(this._floatTime === 0) this._floatDirection = 1;
		if(this._floatTime === this._floatTotalTime) this._floatDirection = -1;
	}
};
//-----------------------------------------------------------------------------
// Update blink effect
//-----------------------------------------------------------------------------
CGMZ_Sprite_EventName.prototype.updateBlink = function() {
	if(this._blinkOff === 0 && this._blinkOn === 0) return;
	this._blinkTimer++;
	if(this._blinkPhase === 'on') {
		if(this._blinkTimer > this._blinkOn) {
			this._blinkTimer = 0;
			this._blinkPhase = 'off';
			this.opacity = 0;
			this._targetOpacity = 0;
		}
	} else {
		if(this._blinkTimer > this._blinkOff) {
			this._blinkTimer = 0;
			this._blinkPhase = 'on';
			const opacity = this.calculateOpacityForDistance();
			this.opacity = opacity;
			this._targetOpacity = opacity;
		}
	}
};
//-----------------------------------------------------------------------------
// Draw the event name
//-----------------------------------------------------------------------------
CGMZ_Sprite_EventName.prototype.drawEventName = function() {
	if(!this._name) return;
	let string = this._name;
	const w = new CGMZ_Window_BitmapDummy();
	if(string.includes("<CGMZFULLWINDOW>")) {
		string = string.replace("<CGMZFULLWINDOW>", "");
		this.bitmap = w.getFullWindowTextCodeBitmap(string);
	} else {
		this.bitmap = w.getTextCodeBitmap(string);
	}
};
//=============================================================================
// Game_Event
//-----------------------------------------------------------------------------
// Change the event name
//=============================================================================
const alias_CGMZ_EventNames_Game_Event_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	alias_CGMZ_EventNames_Game_Event_initMembers.call(this);
	this._cgmz_eventName = "";
	this._cgmz_eventNameProperties = {};
};
//-----------------------------------------------------------------------------
// Check if page identifies itself as gathering node
//-----------------------------------------------------------------------------
const alias_CGMZ_EventNames_Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
	alias_CGMZ_EventNames_Game_Event_setupPageSettings.call(this);
	this._cgmz_eventName = "";
	this._cgmz_eventNameProperties = {};
	const page = this.page();
	let readingEventName = false;
	for(const command of page.list) {
		if(readingEventName && (command.code !== 108 && command.code !== 408)) {
			break;
		}
		if(readingEventName && command.code === 108 && !command.parameters[0].trim().includes("CGMZ EVENTNAME ")) {
			break;
		}
		if(command.code === 108 && command.parameters[0].trim().includes("CGMZ EVENTNAME ")) {
			this._cgmz_eventName = command.parameters[0].substring(15);
			readingEventName = true;
		}
		if(command.code === 408 && readingEventName) {
			const param = command.parameters[0].trim();
			if(param.includes("Float: ")) {
				const floatArray = param.split(" ");
				if(floatArray.length < 3 || floatArray.length > 4) continue;
				this._cgmz_eventNameProperties["Float"] = Number(floatArray[1]);
				this._cgmz_eventNameProperties["FloatTimer"] = Number(floatArray[2]);
				this._cgmz_eventNameProperties["FloatHorizontal"] = (floatArray[3] === 'horizontal');
			}
			if(param.includes("Offset: ")) {
				const floatArray = param.split(" ");
				if(floatArray.length !== 3) continue;
				this._cgmz_eventNameProperties["xOffset"] = Number(floatArray[1]);
				this._cgmz_eventNameProperties["yOffset"] = Number(floatArray[2]);
			}
			if(param.includes("Blink: ")) {
				const floatArray = param.split(" ");
				if(floatArray.length !== 3) continue;
				this._cgmz_eventNameProperties["blinkOn"] = Number(floatArray[1]);
				this._cgmz_eventNameProperties["blinkOff"] = Number(floatArray[2]);
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Get the event name
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_getEventName = function() {
	return this._cgmz_eventName;
};
//-----------------------------------------------------------------------------
// Get the event name properties
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_getEventNameProperties = function() {
	return this._cgmz_eventNameProperties;
};