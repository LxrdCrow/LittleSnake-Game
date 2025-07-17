import { Canvas, Board } from '../ux/index.js';
export class Coin {
    constructor(value) {
        this.value = value;
        this.index = Coin.coins_index++;
        Coin.coins_active++;
    }
    static create_random() {
        const value = Coin.values[Math.floor(Math.random() * Coin.values.length)];
        const coin = new Coin(value);
        return coin;
    }
    handle_collision(snake) {
        snake.points += this.value;
        snake.max_length += 8;
        this.destroy();
    }
    draw() {
        if (!this.position)
            return;
        const x = (this.position.x * Board.tileSize) + (Board.tileSize / 2);
        const y = (this.position.y * Board.tileSize) + (Board.tileSize / 2);
        const r = (Board.tileSize / 2) - 1;
        Canvas.context.beginPath();
        Canvas.context.arc(x, y, r, 0, 2 * Math.PI, false);
        Canvas.context.strokeStyle = "#FFFF00";
        Canvas.context.fillStyle = "#CCCC00";
        Canvas.context.stroke();
        Canvas.context.fill();
    }
    destroy() {
        if (this.position) {
            Board.removeObjectAt(this.position);
        }
        delete Coin.instances[this.index];
        Coin.coins_active--;
    }
}
Coin.values = [200, 400, 600, 800, 1000];
Coin.instances = {};
Coin.coins_index = 0;
Coin.coins_active = 0;
