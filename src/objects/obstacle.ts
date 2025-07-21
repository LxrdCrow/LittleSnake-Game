import { IGameObject } from '../types/gameobjects.js'
import { Position } from '../types/position.js'
import { Board, Canvas } from '../ux/index.js'
import { Snake } from './snake.js'

/**
 * Represents a static obstacle that damages the snake on collision.
 */
export class Obstacle implements IGameObject {
  public position!: Position

  constructor() {
    // Generate a random position
    this.position = new Position(
      Math.floor(Math.random() * Board.width),
      Math.floor(Math.random() * Board.height)
    )
  }

  handle_collision(snake: Snake): void {
    // On collision, kill the snake segment
    snake.die()
  }

  draw(): void {
    if (!this.position) return
    const x = this.position.x * Board.tileSize
    const y = this.position.y * Board.tileSize
    const size = Board.tileSize

    Canvas.context.fillStyle = '#FFFFFF'
    Canvas.context.fillRect(x, y, size, size)
  }
}
