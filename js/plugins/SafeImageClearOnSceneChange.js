// plugin: SafeImageClearOnSceneChange.js
(() => {
  let _pending = false;

  window.requestSafeImageClear = function() { _pending = true; };

  const _SceneManager_changeScene = SceneManager.changeScene;
  SceneManager.changeScene = function() {
    _SceneManager_changeScene.call(this);
    if (_pending) {
      _pending = false;
      ImageManager.clear(); // cache is cleared while building the new scene
    }
  };
})();