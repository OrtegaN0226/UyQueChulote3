/*:
 * @target MZ
 * @plugindesc v1.0 Terms & Privacy gate for free build
 * @author JackHoffx
 *
 * @param PrivacyUrl
 * @text Privacy Policy URL
 * @type string
 * @default https://www.dropbox.com/scl/fi/u3hqalhgadi013e5tlo0k/Privacy-Policy-Living-With-Tsunade.paper?rlkey=bc9plkvhh05qq6ns0aie8akle&st=myycyiwc&dl=0
 *
 * @param TermsUrl
 * @text Terms of Service URL
 * @type string
 * @default https://www.dropbox.com/scl/fi/a6cfzad0csgsdl9svjr49/Terms-of-Service-Living-With-Tsunade.paper?rlkey=nv16xvabxvigswt9ap97sqmlj&st=65thz7pp&dl=0
 *
 * @help
 * Shows the Terms/Privacy consent screen.
 * After accepting, the game proceeds to the Title screen.
 */

(() => {
  const pluginName = "JackHoffx_Terms";
  const params = PluginManager.parameters(pluginName);
  const PRIVACY_URL = String(params.PrivacyUrl || "");
  const TERMS_URL = String(params.TermsUrl || "");

  const isNWjs = () => typeof require === "function" && typeof process === "object";

  function openUrlSafe(url) {
    if (!url) return;
    const safeUrl = String(url);
    if (isNWjs()) {
      try {
        if (typeof nw !== "undefined" && nw.Shell && nw.Shell.openExternal) {
          nw.Shell.openExternal(safeUrl);
          return;
        }
      } catch {}
      try {
        const child = require("child_process");
        const os = require("os").platform();
        if (os === "win32") {
          child.execFile("cmd", ["/c", "start", "", safeUrl]);
        } else if (os === "darwin") {
          child.execFile("open", [safeUrl]);
        } else {
          child.execFile("xdg-open", [safeUrl]);
        }
        return;
      } catch {}
    }
    try {
      window.open(safeUrl, "_blank");
    } catch {}
  }

  function hasAcceptedPrivacy() {
    try { return localStorage.getItem("privacy_accepted") === "true"; }
    catch { return false; }
  }

  function setPrivacyAccepted() {
    try { localStorage.setItem("privacy_accepted", "true"); }
    catch {}
  }

  class Scene_Privacy extends Scene_Base {
    create() {
      super.create();
      this.createWindowLayer();
      this.createWindows();
      this.createButtons();
      this.createLinkButtons();
      this.drawAll();
    }

    createWindows() {
      const margin = 40;
      const w = Math.min(620, Graphics.boxWidth - margin * 2);
      const disclaimerH = 72;
      const consentH = Math.min(290, Graphics.boxHeight - margin * 2 - disclaimerH - 8);
      const totalH = disclaimerH + 8 + consentH;
      const y = Math.max((Graphics.boxHeight - totalH) / 2, margin);
      const x = Math.max((Graphics.boxWidth - w) / 2, margin);

      this._disclaimer = new Window_Base(new Rectangle(x, y, w, disclaimerH));
      this._consent = new Window_Base(new Rectangle(x, y + disclaimerH + 8, w, consentH));
      this.addWindow(this._disclaimer);
      this.addWindow(this._consent);
    }

    drawAll() {
      this._disclaimer.contents.clear();
      this._consent.contents.clear();

      this._disclaimer.drawText(
        "Disclaimer: All characters in this game are fictional and 18+.",
        8, 8, this._disclaimer.contentsWidth()
      );

      let y = 12;
      const lines = [
        "Before continuing, you certify that:",
        "• You are 18+ years of age.",
        "• You are legally allowed to view adult content.",
        "• You will not allow minors to access the game.",
        "",
        "You have read and accepted our Privacy Policy and Terms."
      ];

      for (const line of lines) {
        this._consent.drawText(line, 12, y, this._consent.contentsWidth() - 24);
        y += 28;
      }
    }

    createButtons() {
      const y = this._consent.y + this._consent.height + 69;

      const makeButton = (label, x, handler, options = {}) => {
        const { width = 120, height = 48, baseColor = "#2b2b2b", overColor = "#3a3a3a", downColor = "#2e7d32" } = options;
        const sprite = new Sprite_Clickable();
        const bmp = new Bitmap(width, height);
        const drawState = (colorA, colorB) => {
          bmp.clear();
          bmp.fillRect(0, 0, width, height, colorA);
          bmp.gradientFillRect(0, 0, width, height, colorA, colorB, true);
          bmp.fontFace = Window_Base.prototype.standardFontFace ? Window_Base.prototype.standardFontFace() : bmp.fontFace;
          bmp.fontSize = 20;
          bmp.textColor = "#ffffff";
          bmp.drawText(label, 0, 0, width, height, "center");
        };
        drawState(baseColor, overColor);
        bmp.fontFace = Window_Base.prototype.standardFontFace ? Window_Base.prototype.standardFontFace() : bmp.fontFace;
        bmp.fontSize = 20;
        bmp.textColor = "#ffffff";
        bmp.drawText(label, 0, 0, width, height, "center");
        sprite.bitmap = bmp;
        sprite.x = x;
        sprite.y = y;
        sprite._baseColor = baseColor;
        sprite._overColor = overColor;
        sprite._downColor = downColor;
        sprite.onMouseEnter = () => drawState(sprite._overColor, sprite._baseColor);
        sprite.onMouseExit = () => drawState(sprite._baseColor, sprite._overColor);
        sprite.onPress = () => drawState(sprite._downColor, sprite._downColor);
        sprite.onRelease = () => drawState(sprite._overColor, sprite._baseColor);
        sprite.onClick = handler;
        return sprite;
      };

      const ok = makeButton("OK", Graphics.boxWidth / 2 + 290, () => {
        SoundManager.playOk();
        setPrivacyAccepted();
        SceneManager.goto(Scene_Title);
      }, { downColor: "#2e7d32" });

      const cancel = makeButton("Cancel", Graphics.boxWidth / 2 + 145, () => {
        SoundManager.playCancel();
        SceneManager.exit();
      }, { downColor: "#c62828" });

      this.addChild(ok);
      this.addChild(cancel);
    }

    createLinkButtons() {
      const createTextButton = (label, url) => {
        const measure = this._consent?.textWidth(label) ?? 0;
        const sprite = new Sprite_Clickable();
        const padding = 12;
        const h = 32;
        const w = Math.max(140, measure + padding * 2);
        const bmp = new Bitmap(w, h);
        bmp.fontSize = 18;
        bmp.textColor = "#00bfff";
        bmp.drawText(label, 0, 0, w, h, "center");
        sprite.bitmap = bmp;
        sprite.onClick = () => openUrlSafe(url);
        return sprite;
      };

      const baseX = this._consent.x + 16;
      const y = this._consent.y + this._consent.height - 20;

      this._privacyBtn = createTextButton("Privacy Policy", PRIVACY_URL);
      this._privacyBtn.x = baseX * 4.5;
      this._privacyBtn.y = y;

      this._termsBtn = createTextButton("Terms of Service", TERMS_URL);
      this._termsBtn.x = baseX * 4.4 + this._privacyBtn.width + 16;
      this._termsBtn.y = y;

      this.addChild(this._privacyBtn);
      this.addChild(this._termsBtn);
    }
  }

  const _bootStart = Scene_Boot.prototype.start;
  Scene_Boot.prototype.start = function () {
    _bootStart.call(this);
    SceneManager.goto(hasAcceptedPrivacy() ? Scene_Title : Scene_Privacy);
  };
})();
