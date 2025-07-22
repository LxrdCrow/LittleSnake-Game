import { IGameObject, Position } from '../types/index.js'
import { Canvas, Board } from '../ux/index.js'
import { Snake } from './snake.js'

export class Coin implements IGameObject {

	public static values: number[] = [5000, 10000, 15000, 20000, 25000]
	public static instances: { [index: number]: Coin } = {}
	public static coins_index: number = 0
	public static coins_active: number = 0

	public index: number
	public value: number
	public position!: Position

	constructor(value: number) {
		this.value = value
		this.index = Coin.coins_index++
		Coin.coins_active++
	}

	public static create_random(): Coin {
		const value = Coin.values[Math.floor(Math.random() * Coin.values.length)]
		const coin = new Coin(value)
		return coin
	}

	public handle_collision(snake: Snake): void {
		snake.points += this.value
		snake.max_length += 8
		this.destroy()
	}

	public draw(): void {
		if (!this.position) return

		const x = (this.position.x * Board.tileSize) + (Board.tileSize / 2)
		const y = (this.position.y * Board.tileSize) + (Board.tileSize / 2)
		const r = Board.tileSize * 0.8 / 2;

		Canvas.context.beginPath()
		Canvas.context.arc(x, y, r, 0, 2 * Math.PI, false)
		Canvas.context.lineWidth = 2
		Canvas.context.strokeStyle = "#FFFF00"
		Canvas.context.fillStyle = "#CCCC00"
		Canvas.context.stroke()
		Canvas.context.fill()
	}

	public destroy(): void {
		if (this.position) {
			Board.removeObjectAt(this.position)
		}
		delete Coin.instances[this.index]
		Coin.coins_active--
	}
}
