import { Speed, Direction, Position, ScreenEdge, ClockTick } from '../types/index.js';
import { SnakeSegment } from './snakesegments.js';
import { Board } from '../ux/index.js';
import { Game } from '../game.js';
export class Snake extends SnakeSegment {
    constructor(position) {
        super(position);
        this.jump_distance = 8;
        this.skip_next_turn = false;
        this.hit_detected = false;
        this.is_alive = false;
        this.speed = Speed.NORMAL;
        this.direction = Direction.NONE;
        this.hi_score = 0;
        this.points = 0;
        this.hearts = 1;
        this.segments = [];
        this.max_length = Snake.default_length;
        this.position = Position.copy(position);
        this.segments[0] = this;
        this.is_alive = true;
        Board.placeObject(this, this.position);
    }
    jump() {
        const pos = Position.copy(this.position);
        switch (this.direction) {
            case Direction.UP:
                pos.y -= this.jump_distance;
                break;
            case Direction.DOWN:
                pos.y += this.jump_distance;
                break;
            case Direction.LEFT:
                pos.x -= this.jump_distance;
                break;
            case Direction.RIGHT:
                pos.x += this.jump_distance;
                break;
            default: return;
        }
        this.update_board(pos);
    }
    on_hit_screen_edge(edge) {
        console.warn(`Hit screen edge: ${ScreenEdge[edge]}`);
        // Comportamento attuale: wrapping gestito in process_turn()
    }
    die() {
        this.hit_detected = true;
        if (this.points > this.hi_score) {
            this.hi_score = this.points;
        }
        if (this.hi_score > Game.hi_score) {
            Game.hi_score = this.hi_score;
        }
        if (this.hearts === 0) {
            this.is_alive = false;
            Game.reset();
            return;
        }
        this.hearts -= 1;
        this.destroy();
        this.position = new Position(0, 0);
        this.direction = Direction.NONE;
    }
    set_speed(speed) {
        this.speed = speed;
        this.skip_next_turn = (speed === Speed.SLOW);
    }
    process_turn() {
        var _a;
        if (!this.is_alive)
            return;
        if (this.speed !== Speed.FAST && Game.clock.tick === ClockTick.ODD)
            return;
        if (this.speed === Speed.SLOW && Game.clock.tick === ClockTick.EVEN) {
            this.skip_next_turn = !this.skip_next_turn;
            if (this.skip_next_turn)
                return;
        }
        this.hit_detected = false;
        let is_moving = true;
        const pos = Position.copy(this.position);
        switch (this.direction) {
            case Direction.UP:
                pos.y -= 1;
                break;
            case Direction.DOWN:
                pos.y += 1;
                break;
            case Direction.LEFT:
                pos.x -= 1;
                break;
            case Direction.RIGHT:
                pos.x += 1;
                break;
            case Direction.NONE:
                is_moving = false;
                break;
            default: is_moving = false;
        }
        if (is_moving) {
            // Wrapping (toroidale)
            if (pos.x < 0) {
                pos.x = Board.width - 1;
                this.on_hit_screen_edge(ScreenEdge.WEST);
            }
            else if (pos.x >= Board.width) {
                pos.x = 0;
                this.on_hit_screen_edge(ScreenEdge.EAST);
            }
            if (pos.y < 0) {
                pos.y = Board.height - 1;
                this.on_hit_screen_edge(ScreenEdge.NORTH);
            }
            else if (pos.y >= Board.height) {
                pos.y = 0;
                this.on_hit_screen_edge(ScreenEdge.SOUTH);
            }
            if ((_a = Board.grid[pos.x]) === null || _a === void 0 ? void 0 : _a[pos.y]) {
                const object = Board.grid[pos.x][pos.y];
                object.handle_collision(this);
            }
        }
        if (!this.is_alive) {
            this.destroy();
        }
        else if (!this.hit_detected) {
            this.update_board(pos);
        }
    }
    update_board(pos) {
        let lastPosition = Position.copy(this.position);
        for (let i = 0; i < this.segments.length; i++) {
            const segment = this.segments[i];
            const newPosition = (i === 0) ? pos : lastPosition;
            lastPosition = segment.position;
            Board.moveObject(segment, newPosition);
        }
        if (this.segments.length <= this.max_length) {
            const newSegment = new SnakeSegment(lastPosition);
            this.segments.push(newSegment);
            Board.placeObject(newSegment, lastPosition);
        }
    }
    destroy() {
        for (const segment of this.segments) {
            if (segment && segment.position) {
                Board.removeObjectAt(segment.position);
            }
        }
        this.segments = [this];
        this.max_length = Snake.default_length;
    }
}
Snake.default_length = 48;
