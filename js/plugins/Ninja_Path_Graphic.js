/*:
 * @target MZ
 * @plugindesc Ninja Path quest log display: top intro pane + 4x4 grid of quest categories. v1.0
 * @help
 * Provides a global helper: drawNinjaPathDisplay.call(windowInstance)
 * Use inside any Window_Base descendant (after this plugin is loaded).
 *
 * Layout:
 * - Top pane (~20% height): intro text.
 * - Bottom pane: 4 columns x 4 rows (16 cells). Shows quest categories and
 *   unlocked/total counts (using $gameSystem.getQuestStats()).
 *   If fewer than 16 categories, remaining cells are left blank for future use.
 *
 * Example (inside a Window_* subclass):
 *   refresh() {
 *     Window_Base.prototype.refresh.call(this);
 *     drawNinjaPathDisplay.call(this);
 *   }
 *
 * No plugin parameters. No commands.
 */

(() => {
    window.drawNinjaPathDisplay = function() {
        // Clear previous contents
        this.contents.clear();
        if (this.contentsBack) this.contentsBack.clear();

        const pad = this.itemPadding();
        const lh = this.lineHeight();
        const innerW = this.innerWidth;
        const innerH = this.innerHeight;

        // Backgrounds
        const bgColor = ColorManager.gaugeBackColor();
        if (this.contentsBack) this.contentsBack.fillRect(0, 0, innerW, innerH, bgColor);
        this.contents.fillRect(0, 0, innerW, innerH, bgColor);

        // Top pane (~20% height) with progress summary
        const topH = Math.max(lh * 3, Math.floor(innerH * 0.2));
        const introRect = new Rectangle(0, 0, innerW, topH);
        const stats = ($gameSystem && $gameSystem.getQuestStats)
            ? $gameSystem.getQuestStats()
            : { totalUnlocked: 0, totalTotal: 0, owners: {} };

        const unlocked = stats.totalUnlocked || 0;
        const total = stats.totalTotal || 0;
        const mainStats = (stats.owners && stats.owners.Main) || { unlocked: 0, total: 0 };

        let y = introRect.y + pad;
        const originalFontSize = this.contents.fontSize;
        const largeFontSize = Math.max(originalFontSize + 8, Math.floor(originalFontSize * 1.4));
        this.contents.fontSize = largeFontSize;
        this.changeTextColor(ColorManager.textColor(6)); // cyan headline
        this.drawText(
            `Total quests unlocked: ${unlocked}/${total}`,
            introRect.x + pad,
            y,
            introRect.width - pad * 2,
            "left"
        );
        this.resetTextColor();
        this.contents.fontSize = originalFontSize;
        y += this.lineHeight();

        // Main summary beneath title
        this.drawText(
            `Main quests: ${mainStats.unlocked || 0}/${mainStats.total || 0}`,
            introRect.x + pad,
            y,
            introRect.width - pad * 2,
            "left"
        );

        // Quest stats
        const owners = Object.keys(stats.owners || {})
            .filter(k => k !== "Main")
            .sort();

        const cells = [];
        owners.forEach(owner => {
            const o = stats.owners[owner];
            cells.push({
                header: owner,
                body: `${o.unlocked}/${o.total}`
            });
        });

        // Ensure 16 cells, padding with blanks
        const maxCells = 16;
        if (cells.length > maxCells) cells.length = maxCells;
        while (cells.length < maxCells) cells.push({ header: "", body: "" });

        // Grid layout: 4 columns x 4 rows
        const cols = 4;
        const rows = 4;
        const gridRect = new Rectangle(0, topH, innerW, innerH - topH);
        const cellW = Math.floor(gridRect.width / cols);
        const cellH = Math.floor(gridRect.height / rows);

        for (let i = 0; i < maxCells; i++) {
            const cell = cells[i];
            const col = i % cols;
            const row = Math.floor(i / cols);
            const cx = gridRect.x + col * cellW;
            const cy = gridRect.y + row * cellH;

            // Cell background
            this.contents.gradientFillRect(
                cx + 1,
                cy + 1,
                cellW - 2,
                cellH - 2,
                ColorManager.dimColor1(),
                ColorManager.gaugeBackColor(),
                true
            );

            if (!cell.header && !cell.body) continue;

            // Header (cyan)
            if (cell.header === "Main") {
                this.changeTextColor(ColorManager.textColor(17)); // yellow for Main
            } else {
                this.changeTextColor(ColorManager.textColor(27)); // pink for others
            }
            this.drawText(cell.header, cx + pad, cy + pad, cellW - pad * 2, "left");
            this.resetTextColor();

            // Body (unlocked/total)
            this.drawText(cell.body, cx + pad, cy + pad + lh, cellW - pad * 2, "left");
        }
    };
})();

