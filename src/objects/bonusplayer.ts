import { IGameObject, Position } from '../types/index.js';
import { Board } from '../ux/board.js';
import { Canvas } from '../ux/canvas.js';
import { Snake } from './snake.js';

export class BonusPlayer implements IGameObject {
  public position!: Position;
  public color = '#66FF66'; // verde chiaro per distinguersi

  constructor(position?: Position) {
    if (position) {
      this.position = position;
    }
  }

  // Collisione: ad esempio ripristina una vita
  handle_collision(snake: Snake): void {
    snake.hearts += 1;            // bonus vita deve essere rosso
    snake.max_length += 5;        // bonus lunghezza rimane verde
    //aggiungere bonus invincibilità per 20 secondi
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
