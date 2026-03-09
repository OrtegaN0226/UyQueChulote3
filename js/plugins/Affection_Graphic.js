/*:
 * @target MZ
 * @plugindesc Single-pane affection display helper with title and romance stats. v1.0
 * @help
 * Provides a global helper: drawAffectionDisplay.call(windowInstance)
 * Use inside any Window_Base descendant (after this plugin is loaded).
 *
 * Example (inside a Window_* subclass):
 *   refresh() {
 *       Window_Base.prototype.refresh.call(this);
 *       drawAffectionDisplay.call(this);
 *   }
 *
 * No plugin parameters. No commands.
 */

(() => {
    window.drawAffectionDisplay = function() {
        // Clear previous contents
        this.contents.clear();
        if (this.contentsBack) this.contentsBack.clear();

        const pad = this.itemPadding();
        const lh = this.lineHeight();
        const innerW = this.innerWidth;
        const innerH = this.innerHeight;

        // Background (match the dark blueish left pane from stats plugin)
        const bgColor = ColorManager.gaugeBackColor();
        if (this.contentsBack) this.contentsBack.fillRect(0, 0, innerW, innerH, bgColor);
        this.contents.fillRect(0, 0, innerW, innerH, bgColor);

        // Title
        const title = '♥ Girls! Affection ♥';
        const originalFontSize = this.contents.fontSize;
        this.contents.fontSize = Math.max(originalFontSize * 1.69, originalFontSize + 12); // ~1.69x
        this.changeTextColor(ColorManager.textColor(27)); // pink
        this.drawText(title, 0, pad, innerW, 'center');
        this.resetTextColor();
        this.contents.fontSize = originalFontSize;

        // Affection entries
        const entries = [
            { label: 'Tsunade', value: $gameVariables.value(41) },
            { label: 'Hinata',   value: $gameVariables.value(42) },
            { label: 'Sakura',   value: $gameVariables.value(43) },
            { label: 'Shizune',   value: $gameVariables.value(44) },
            { label: 'Ino',   value: $gameVariables.value(45) },
            { label: 'Tenten',   value: $gameVariables.value(46) },
            { label: 'Anko',   value: $gameVariables.value(47) },
        ];

        const labelWidth = this.textWidth('Tsunade: ') + pad;
        const valueWidth = innerW - (labelWidth + pad * 2);
        let y = pad + lh; // start below title

        for (const entry of entries) {
            this.changeTextColor(ColorManager.textColor(6)); // cyan labels
            this.drawText(entry.label + ':', pad, y, labelWidth, 'left');
            this.resetTextColor();
            this.drawText(String(entry.value), pad + labelWidth, y, valueWidth, 'left');
            y += lh;
        }
    };
})();

