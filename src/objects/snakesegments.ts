import { IGameObject } from '../types/gameobjects.js'
import { Position } from '../types/position.js'
import { Canvas } from '../ux/canvas.js'
import { Board } from '../ux/board.js'
import { Snake } from './snake.js'

export class SnakeSegment implements IGameObject {

	public position: Position
	public color_index = 0

	constructor(position: Position) {
		this.position = position
	}

	public color(): string {
		const colors = [
			 "#66FF66",
		]

		this.color_index = (this.color_index + 1) % colors.length
		return colors[this.color_index]
	}

	public draw(): void {
		const boardX = this.position.x * Board.tileSize
		const boardY = this.position.y * Board.tileSize
		const size = Board.tileSize

		Canvas.fillRect(boardX, boardY, size, size, this.color())
	}

	public handle_collision(snake: Snake): void {
		snake.die()
	}
}
