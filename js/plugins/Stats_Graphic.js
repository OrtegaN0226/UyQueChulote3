/*:
 * @target MZ
 * @plugindesc Custom two-pane stat display helper (INT/STEALTH/SEXJUTSU/LOCKPICKING/NINJUTSU) + tips. v1.0
 * @help
 * Provides a global helper: drawCustomStatDisplay.call(windowInstance)
 * Use inside any Window_Base descendant (after this plugin is loaded).
 *
 * Example (inside a Window_* subclass):
 *   refresh() {
 *       Window_Base.prototype.refresh.call(this);
 *       drawCustomStatDisplay.call(this);
 *   }
 *
 * No plugin parameters. No commands.
 */

(() => {
    window.drawCustomStatDisplay = function() {
        // Clear previous contents
        this.contents.clear();
        if (this.contentsBack) this.contentsBack.clear();

        // Constants
        const lh = this.lineHeight();
        const pad = this.itemPadding();
        const innerW = this.innerWidth;
        const innerH = this.innerHeight;
        const leftW = Math.floor(innerW * 0.52);
        const rightW = innerW - leftW;

        // Pane rects
        const leftRect = new Rectangle(0, 0, leftW, innerH);
        const rightRect = new Rectangle(leftW, 0, rightW, innerH);

        // Backgrounds
        const fillPane = (rect, color) => {
            if (this.contentsBack) this.contentsBack.fillRect(rect.x, rect.y, rect.width, rect.height, color);
            this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
        };
        fillPane(leftRect, ColorManager.gaugeBackColor());
        fillPane(rightRect, ColorManager.dimColor1());

        // Stats data
        const stats = [
            { label: 'INT',         value: $gameVariables.value(6) },
            { label: 'NINJUTSU',    value: $gameVariables.value(10) },
            { label: 'STEALTH',     value: $gameVariables.value(7) },
            { label: 'SEXJUTSU',    value: $gameVariables.value(8) },
            {
                label: 'LOCKPICKING',
                value: ($gameVariables.value(9) > 0 ? 'Unlocked' : 'Locked') + ` (Level: ${$gameVariables.value(19)})`,
            },
        ];

        // Draw left pane (stats + values)
        const labelWidth = this.textWidth('LOCKPICKING:') + pad;
        const valueWidth = leftRect.width - (labelWidth + pad * 2);
        let y = leftRect.y + pad;
        for (const stat of stats) {
            this.changeTextColor(ColorManager.textColor(6)); // cyan
            this.drawText(stat.label + ':', leftRect.x + pad, y, labelWidth, 'left');
            this.resetTextColor();
            this.drawText(String(stat.value), leftRect.x + pad + labelWidth, y, valueWidth, 'left');
            y += lh;
        }

        // Tips data (right pane)
        const tips = [
            { label: 'INT',         text: 'Attend class on Monday-Wednesday' },
            { label: 'NINJUTSU',    text: 'Attend class on Thursday–Saturday' },
            { label: 'STEALTH',     text: 'Train with Anko during afternoons in the forest east of North Konoha' },
            { label: 'SEXJUTSU',    text: 'Attend class on Sunday' },
            { label: 'LOCKPICKING', text: 'Speak with Rock Lee at academy then meet him at night in South Konoha' },
        ];

        // Simple word-wrap helper (uses this.textWidth)
        const wrapText = (text, width) => {
            const words = text.split(' ');
            const lines = [];
            let line = '';
            for (const w of words) {
                const next = line ? `${line} ${w}` : w;
                if (this.textWidth(next) <= width) {
                    line = next;
                } else {
                    if (line) lines.push(line);
                    line = w;
                }
            }
            if (line) lines.push(line);
            return lines;
        };

        // Draw right pane (tips) with 30% smaller font and colored labels
        const originalFontSize = this.contents.fontSize;
        const smallFontSize = Math.max(10, Math.floor(originalFontSize * 0.8));
        this.contents.fontSize = smallFontSize;
        const tipLineHeight = this.lineHeight();
        const totalTipWidth = rightRect.width - pad * 2;
        const labelColor = ColorManager.textColor(17); // yellow

        const wrapBodyWithLeadingLabel = (body, firstLineWidth, lineWidth) => {
            if (firstLineWidth <= 0) firstLineWidth = lineWidth;
            const words = body.split(' ');
            const lines = [];
            let currentWidth = firstLineWidth;
            let current = '';
            let firstLine = true;
            for (const w of words) {
                const next = current ? `${current} ${w}` : w;
                if (this.textWidth(next) <= currentWidth) {
                    current = next;
                } else {
                    if (current) lines.push(current);
                    current = w;
                    if (firstLine) {
                        currentWidth = lineWidth;
                        firstLine = false;
                    }
                }
            }
            if (current) lines.push(current);
            return lines;
        };

        y = rightRect.y + pad;
        for (const tip of tips) {
            const labelText = `${tip.label}:`;
            const labelWidth = Math.min(this.textWidth(labelText), totalTipWidth);
            const bodyLines = wrapBodyWithLeadingLabel(tip.text, totalTipWidth - labelWidth, totalTipWidth);

            // First line: label (yellow) + first body line
            const firstBody = bodyLines.shift() || '';
            this.changeTextColor(labelColor);
            this.drawText(labelText, rightRect.x + pad, y, labelWidth, 'left');
            this.resetTextColor();
            this.drawText(firstBody, rightRect.x + pad + labelWidth, y, totalTipWidth - labelWidth, 'left');
            y += tipLineHeight;

            // Remaining lines: body only
            for (const line of bodyLines) {
                this.drawText(line, rightRect.x + pad, y, totalTipWidth, 'left');
                y += tipLineHeight;
            }

            y += Math.max(0, Math.floor(tipLineHeight / 4)); // tighter spacing (~50% reduction)
        }

        // Restore font size
        this.contents.fontSize = originalFontSize;
    };
})();

