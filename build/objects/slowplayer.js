import { Speed } from '../types/index.js';
import { Board, Canvas } from '../ux/index.js';
export class SlowPlayer {
    constructor() {
        this.color = "#3366FF";
        this.index = SlowPlayer.items_index++;
        SlowPlayer.items_active++;
    }
    handle_collision(snake) {
        snake.set_speed(Speed.SLOW);
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
        delete SlowPlayer.instances[this.index];
        SlowPlayer.items_active--;
    }
}
SlowPlayer.instances = {};
SlowPlayer.items_index = 0;
SlowPlayer.items_active = 0;
