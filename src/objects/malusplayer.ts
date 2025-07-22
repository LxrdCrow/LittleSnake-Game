import { IGameObject, Position } from '../types/index.js';
import { Board } from '../ux/board.js';
import { Canvas } from '../ux/canvas.js';
import { Snake } from './snake.js';

export class MalusPlayer implements IGameObject {
  public position!: Position;
  public color = '#FF6666';  // rosso chiaro per distinguersi

  constructor(position?: Position) {
    if (position) {
      this.position = position;
    }
  }

  // Collisione: ad esempio toglie una vita o rallenta
  handle_collision(snake: Snake): void {
    snake.hearts -= 1;    // malus vita
    snake.max_length -= 5; //malus accorcia serpente
    //aggiungere malus bordo letale per 20 secondi
    this.destroy();
  }

  draw(): void {
    if (!this.position) return;
    const x = this.position.x * Board.tileSize;
    const y = this.position.y * Board.tileSize;
    const size = Board.tileSize;
    Canvas.context.fillStyle = this.color;
    Canvas.context.fillRect(x, y, size, size);
  }

  destroy(): void {
    Board.removeObjectAt(this.position);
  }
}
