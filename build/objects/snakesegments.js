import { Canvas } from '../ux/canvas.js';
import { Board } from '../ux/board.js';
export class SnakeSegment {
    constructor(position) {
        this.color_index = 0;
        this.position = position;
    }
    color() {
        const colors = [
            "#66FF66",
        ];
        this.color_index = (this.color_index + 1) % colors.length;
        return colors[this.color_index];
    }
    draw() {
        const boardX = this.position.x * Board.tileSize;
        const boardY = this.position.y * Board.tileSize;
        const size = Board.tileSize;
        Canvas.fillRect(boardX, boardY, size, size, this.color());
    }
    handle_collision(snake) {
        snake.die();
    }
}
