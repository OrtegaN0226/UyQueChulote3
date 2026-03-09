/*:
 * @target MZ
 * @plugindesc v1.0 Shows a Patreon supporter splash with link and return button.
 * @author JackHoffx
 *
 * @param PatreonUrl
 * @text Patreon URL
 * @type string
 * @desc External URL to open when the user clicks "Visit Patreon".
 * @default https://www.patreon.com/Bitawastaken
 *
 * @param AdImage
 * @text Ad Image
 * @type file
 * @dir img/pictures
 * @desc Image to display in the supporter scene (usually a splash/banner).
 * @default
 *
 * @command ShowSupporterAd
 * @text Show Supporter Ad
 * @desc Open the supporter splash scene.
 *
 * @help
 * JackHoffx_Supporter_Plugin.js
 *
 * Shows a Patreon ad image with two buttons:
 *   - "Visit Patreon": opens the configured PatreonUrl.
 *   - "Return": closes the scene.
 *
 * Usage:
 *   - Plugin command: Show Supporter Ad
 *   - Script call: JackHoffxSupporter.requestOpen();
 *
 * Notes:
 *   - The image scales to fit the game viewport while preserving aspect ratio.
 *   - Buttons are custom sprites; they don't rely on other UI plugins.
 */

(() => {
  const PLUGIN_NAME = "JackHoffx_Supporter_Plugin";
  const params = PluginManager.parameters(PLUGIN_NAME);

  const PATREON_URL = String(params.PatreonUrl || "https://www.patreon.com/Bitawastaken");
  const AD_IMAGE = String(params.AdImage || "");

  //--------------------------------------------------------------------------
  // Helpers
  //--------------------------------------------------------------------------
  function openUrlSafe(url) {
    if (!url) return;
    try {
      if (Utils.isNwjs()) {
        const gui = require("nw.gui");
        gui.Shell.openExternal(url);
      } else {
        window.open(url, "_blank");
      }
    } catch (e) {
      console.error(`[${PLUGIN_NAME}] Failed to open URL`, url, e);
    }
  }

  function makeButton(label, x, y, colors, handler, width = 140, height = 48) {
    const sprite = new Sprite_Clickable();
    const bmp = new Bitmap(width, height);
    const drawState = (c1, c2) => {
      bmp.clear();
      bmp.fillRect(0, 0, width, height, c1);
      bmp.gradientFillRect(0, 0, width, height, c1, c2, true);
      bmp.fontFace = Window_Base.prototype.standardFontFace
        ? Window_Base.prototype.standardFontFace()
        : bmp.fontFace;
      bmp.fontSize = 20;
      bmp.textColor = "#ffffff";
      bmp.drawText(label, 0, 0, width, height, "center");
    };
    drawState(colors.base, colors.over);
    sprite.bitmap = bmp;
    sprite.x = x;
    sprite.y = y;
    sprite.onMouseEnter = () => drawState(colors.over, colors.base);
    sprite.onMouseExit = () => drawState(colors.base, colors.over);
    sprite.onPress = () => drawState(colors.down, colors.down);
    sprite.onRelease = () => drawState(colors.over, colors.base);
    sprite.onClick = handler;
    return sprite;
  }

  //--------------------------------------------------------------------------
  // Scene_SupporterAd
  //--------------------------------------------------------------------------
  class Scene_SupporterAd extends Scene_Base {
    create() {
      super.create();
      this.createWindowLayer(); // maintain menu-like stack ordering
      this.createAdSprite();
      this.createButtons();
      this._closing = false;
    }

    createAdSprite() {
      this._adSprite = new Sprite();
      this._adSprite.anchor.set(0.5, 0.5);
      this.addChild(this._adSprite);
      if (!AD_IMAGE) return;
      const bmp = ImageManager.loadPicture(AD_IMAGE);
      bmp.addLoadListener(() => {
        this._adSprite.bitmap = bmp;
        this.fitAdToScreen();
      });
    }

    fitAdToScreen() {
      const bmp = this._adSprite.bitmap;
      if (!bmp) return;
      const maxW = Graphics.width;
      const maxH = Graphics.height;
      const scale = Math.min(maxW / bmp.width, maxH / bmp.height);
      this._adSprite.scale.set(scale, scale);
      this._adSprite.x = maxW / 2;
      this._adSprite.y = maxH / 2; // slight lift for buttons
    }

    createButtons() {
      const y = Graphics.height - 80;
      const btnWidth = 160;
      const spacing = 24;
      const totalWidth = btnWidth * 2 + spacing;
      const baseX = (Graphics.width - totalWidth) / 2;

      const visit = makeButton(
        "Visit Patreon",
        baseX + btnWidth + spacing,
        y,
        { base: "#2b2b2b", over: "#3a3a3a", down: "#2e7d32" },
        () => {
          SoundManager.playOk();
          openUrlSafe(PATREON_URL);
        },
        btnWidth
      );

      const back = makeButton(
        "Return",
        baseX,
        y,
        { base: "#2b2b2b", over: "#3a3a3a", down: "#c62828" },
        () => {
          this.doCancel();
        },
        btnWidth
      );

      this.addChild(visit);
      this.addChild(back);
    }

    // Ensure background clear (optional black)
    start() {
      super.start();
      this.createBackground();
    }

    createBackground() {
      this._backgroundSprite = new Sprite();
      this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
      this.addChildAt(this._backgroundSprite, 0);
    }

    update() {
      super.update();
      // If resolution changes mid-scene, refit image
      this.fitAdToScreen();
      if (!this._closing && (Input.isTriggered("cancel") || TouchInput.isCancelled())) {
        this.doCancel();
      }
    }

    doCancel() {
      if (this._closing) return;
      this._closing = true;
      SoundManager.playCancel();
      SceneManager.pop();
    }
  }

  //--------------------------------------------------------------------------
  // Plugin command & API
  //--------------------------------------------------------------------------
  PluginManager.registerCommand(PLUGIN_NAME, "ShowSupporterAd", () => {
    SceneManager.push(Scene_SupporterAd);
  });

  const SupporterAPI = {
    requestOpen() {
      SceneManager.push(Scene_SupporterAd);
    },
  };
  window.JackHoffxSupporter = SupporterAPI;
})();

