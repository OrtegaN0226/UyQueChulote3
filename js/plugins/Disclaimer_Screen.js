(() => {
  const _Scene_Boot_start = Scene_Boot.prototype.start;
  Scene_Boot.prototype.start = function() {
    SceneManager.goto(Scene_Splash); // custom splash scene
  };

  function Scene_Splash() {
    this.initialize(...arguments);
  }

  Scene_Splash.prototype = Object.create(Scene_Base.prototype);
  Scene_Splash.prototype.constructor = Scene_Splash;

  Scene_Splash.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
  };

  Scene_Splash.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this._splashSprite = new Sprite(ImageManager.loadPicture("disclaimer"));
    this.addChild(this._splashSprite);
  };

  Scene_Splash.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    this._splashDuration = 300; // 120 frames = 2 seconds
  };

  Scene_Splash.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
    if (--this._splashDuration <= 0) {
      SceneManager.goto(Scene_Title);
    }
  };
})();
