    export abstract class Canvas {
        public static width = 1400;
        public static height = 700;
        public static context: CanvasRenderingContext2D;

        public static init(el: HTMLCanvasElement): void {
            el.height = Canvas.height;
            el.width = Canvas.width;

            const ctx = el.getContext("2d");
            if (!ctx) {
                throw new Error("Impossibile inizializzare il contesto 2D del canvas.");
            }

            Canvas.context = ctx;
        }

        public static fill(color: string): void {
            Canvas.context.fillStyle = color;
            Canvas.context.fillRect(0, 0, Canvas.width, Canvas.height);
        }

        public static fillRect(x: number, y: number, w: number, h: number, color: string): void {
            Canvas.context.fillStyle = color;
            Canvas.context.fillRect(x, y, w, h);
        }

        public static drawRect(x: number, y: number, w: number, h: number, color: string): void {
            Canvas.context.strokeStyle = color;
            Canvas.context.lineWidth = 1;
            Canvas.context.strokeRect(x, y, w, h);
        }

        public static drawGameOverMessage(): void {
            const message = "GAME OVER";
            const fontSize = 40;
            Canvas.context.font = `${fontSize}px 'Courier New', monospace`;
            Canvas.context.fillStyle = "#00FF00";
            Canvas.context.textAlign = "center";
            Canvas.context.textBaseline = "middle";
            Canvas.context.fillText(message, Canvas.width / 2, Canvas.height / 2);
            
        }

    }
