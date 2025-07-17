export class Canvas {
    static init(el) {
        el.height = Canvas.height;
        el.width = Canvas.width;
        const ctx = el.getContext("2d");
        if (!ctx) {
            throw new Error("Impossibile inizializzare il contesto 2D del canvas.");
        }
        Canvas.context = ctx;
    }
    static fill(color) {
        Canvas.context.fillStyle = color;
        Canvas.context.fillRect(0, 0, Canvas.width, Canvas.height);
    }
    static fillRect(x, y, w, h, color) {
        Canvas.context.fillStyle = color;
        Canvas.context.fillRect(x, y, w, h);
    }
    static drawRect(x, y, w, h, color) {
        Canvas.context.strokeStyle = color;
        Canvas.context.lineWidth = 1;
        Canvas.context.strokeRect(x, y, w, h);
    }
    static drawGameOverMessage() {
        const message = "GAME OVER";
        const fontSize = 40;
        Canvas.context.font = `${fontSize}px 'Courier New', monospace`;
        Canvas.context.fillStyle = "#00FF00";
        Canvas.context.textAlign = "center";
        Canvas.context.textBaseline = "middle";
        Canvas.context.fillText(message, Canvas.width / 2, Canvas.height / 2);
    }
}
Canvas.width = 1400;
Canvas.height = 700;
