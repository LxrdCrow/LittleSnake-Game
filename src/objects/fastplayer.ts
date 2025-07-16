import { Speed, Position, IGameObject } from '../types/index.js'
import { Board, Canvas } from '../ux/index.js'
import { Snake } from './snake.js'

export class FastPlayer implements IGameObject {

	public static instances: { [index: number]: FastPlayer } = {}
	public static items_index: number = 0
	public static items_active: number = 0

	public index: number
	public color = "#3366FF"
	public position: Position

	constructor() {
		this.index = FastPlayer.items_index++
		FastPlayer.items_active++
	}

	public handle_collision(snake: Snake): void {
		snake.set_speed(Speed.FAST)
		this.destroy()
	}

	public draw(): void {
		if (!this.position) return

		const x = (this.position.x * Board.tileSize) + 2
		const y = (this.position.y * Board.tileSize) + 2
		const size = Board.tileSize - 4

		Canvas.drawRect(x, y, size, size, this.color)
	}

	public destroy(): void {
		if (this.position) {
			Board.removeObjectAt(this.position)
		}
		delete FastPlayer.instances[this.index]
		FastPlayer.items_active--
	}
}
