import { 
	Speed, Direction, Position, ScreenEdge, ClockTick, 
	IPlayerObject, IGameObject 
} from '../types/index.js'
import { SnakeSegment } from './snakesegments.js'
import { Board } from '../ux/index.js'
import { Game } from '../game.js'
import { IDrawable } from '../types/gameobjects.js'

export class Snake extends SnakeSegment implements IPlayerObject {

	public static default_length = 48
	public jump_distance: number = 8

	public skip_next_turn: boolean = false
	public hit_detected: boolean = false
	public is_alive: boolean = false

	public speed: Speed = Speed.NORMAL
	public direction: Direction = Direction.NONE
	public position: Position

	public hi_score: number = 0
	public points: number = 0
	public hearts: number = 1

	public segments: SnakeSegment[] = []
	public max_length: number = Snake.default_length

	constructor(position: Position) {
		super(position)
		this.position = Position.copy(position)
		this.segments[0] = this
		this.is_alive = true

		Board.placeObject(this, this.position)
	}

	public jump() {
		const pos = Position.copy(this.position)

		switch (this.direction) {
			case Direction.UP:    pos.y -= this.jump_distance; break
			case Direction.DOWN:  pos.y += this.jump_distance; break
			case Direction.LEFT:  pos.x -= this.jump_distance; break
			case Direction.RIGHT: pos.x += this.jump_distance; break
			default: return 
		}

		this.update_board(pos)
	}

	public on_hit_screen_edge(edge: ScreenEdge) {
		console.warn(`Hit screen edge: ${ScreenEdge[edge]}`)

		// Comportamento attuale: wrapping gestito in process_turn()
	}

	public die() {
		this.hit_detected = true

		if (this.points > this.hi_score) {
			this.hi_score = this.points
		}
		if (this.hi_score > Game.hi_score) {
			Game.hi_score = this.hi_score
		}

		if (this.hearts === 0) {
			this.is_alive = false
			Game.reset()
			return
		}

		this.hearts -= 1
		this.destroy()

		this.position = new Position(0, 0)
		this.direction = Direction.NONE
	}

	public set_speed(speed: Speed) {
		this.speed = speed
		this.skip_next_turn = (speed === Speed.SLOW)
	}

	public process_turn() {
		if (!this.is_alive) return

		if (this.speed !== Speed.FAST && Game.clock.tick === ClockTick.ODD) return

		if (this.speed === Speed.SLOW && Game.clock.tick === ClockTick.EVEN) {
			this.skip_next_turn = !this.skip_next_turn
			if (this.skip_next_turn) return
		}

		this.hit_detected = false

		let is_moving = true
		const pos = Position.copy(this.position)

		switch (this.direction) {
			case Direction.UP:    pos.y -= 1; break
			case Direction.DOWN:  pos.y += 1; break
			case Direction.LEFT:  pos.x -= 1; break
			case Direction.RIGHT: pos.x += 1; break
			case Direction.NONE:  is_moving = false; break
			default:              is_moving = false
		}

		if (is_moving) {
			// Wrapping (toroidale)
			if (pos.x < 0) {
				pos.x = Board.width - 1
				this.on_hit_screen_edge(ScreenEdge.WEST)
			} else if (pos.x >= Board.width) {
				pos.x = 0
				this.on_hit_screen_edge(ScreenEdge.EAST)
			}

			if (pos.y < 0) {
				pos.y = Board.height - 1
				this.on_hit_screen_edge(ScreenEdge.NORTH)
			} else if (pos.y >= Board.height) {
				pos.y = 0
				this.on_hit_screen_edge(ScreenEdge.SOUTH)
			}

			if (Board.grid[pos.x]?.[pos.y]) {
				const object = Board.grid[pos.x][pos.y] as IGameObject
				object.handle_collision(this)
			}
		}

		if (!this.is_alive) {
			this.destroy()
		} else if (!this.hit_detected) {
			this.update_board(pos)
		}
	}

	private update_board(pos: Position) {
		let lastPosition = Position.copy(this.position)

		for (let i = 0; i < this.segments.length; i++) {
			const segment = this.segments[i]
			const newPosition = (i === 0) ? pos : lastPosition

			lastPosition = segment.position
			Board.moveObject(segment, newPosition)
		}

		if (this.segments.length <= this.max_length) {
			const newSegment = new SnakeSegment(lastPosition)
			this.segments.push(newSegment)
			Board.placeObject(newSegment, lastPosition)
		}
	}

	private destroy() {
		for (const segment of this.segments) {
			if (segment && segment.position) {
				Board.removeObjectAt(segment.position)
			}
		}

		this.segments = [this]
		this.max_length = Snake.default_length
	}
}
