import { Speed } from '../types/index.js';
import { Board, Canvas } from '../ux/index.js';
export class FastPlayer {
    constructor() {
        this.color = "#3366FF";
        this.index = FastPlayer.items_index++;
        FastPlayer.items_active++;
    }
    handle_collision(snake) {
        snake.set_speed(Speed.FAST);
        this.destroy();
    }
    draw() {
        if (!this.position)
            return;
        const x = (this.position.x * Board.tileSize) + 2;
        const y = (this.position.y * Board.tileSize) + 2;
        const size = Board.tileSize - 4;
        Canvas.drawRect(x, y, size, size, this.color);
    }
    destroy() {
        if (this.position) {
            Board.removeObjectAt(this.position);
        }
        delete FastPlayer.instances[this.index];
        FastPlayer.items_active--;
    }
}
FastPlayer.instances = {};
FastPlayer.items_index = 0;
FastPlayer.items_active = 0;
