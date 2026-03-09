(() => {
  const alias_drawActorTp = Window_Base.prototype.drawActorTp;
  Window_Base.prototype.drawActorTp = function(actor, x, y, width) {
    if (actor._allocationPoints !== undefined) {
      const available = actor._allocationPoints;
      const total = actor._allocationTotal || 0; // if you track total elsewhere
      const text = `AP: ${available}/${total}`;
      this.changeTextColor(ColorManager.systemColor());
      this.drawText(text, x, y, width, 'left');
    } else {
      alias_drawActorTp.call(this, actor, x, y, width);
    }
  };
})();
