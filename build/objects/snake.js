import { Speed, Direction, Position, ScreenEdge, ClockTick } from '../types/index.js';
import { SnakeSegment } from './snakesegments.js';
import { Board } from '../ux/index.js';
import { Game } from '../game.js';
export class Snake extends SnakeSegment {
    constructor(position) {
        super(position);
        this.jump_distance = 5;
        this.skip_next_turn = false;
        this.hit_detected = false;
        this.is_alive = false;
        this.speed = Speed.FAST;
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
    }
    die() {
        this.hit_detected = true;
        if (this.points > this.hi_score)
            this.hi_score = this.points;
        if (this.hi_score > Game.hi_score)
            Game.hi_score = this.hi_score;
        this.hearts -= 1;
        if (this.hearts < 0) {
            this.is_alive = false;
            Game.is_game_over = true;
            return;
        }
        this.destroy();
        this.position = new Position(0, 0);
        this.direction = Direction.NONE;
    }
    set_speed(speed) {
        this.speed = speed;
    }
    process_turn() {
        if (!this.is_alive)
            return;
        // SUPERFAST: doppio movimento per tick
        if (this.speed === Speed.SUPERFAST) {
            this.moveOne();
            this.moveOne();
            return;
        }
        // SLOW: muove solo su tick pari (ogni 2 tick)
        if (this.speed === Speed.NORMAL && Game.clock.tick === ClockTick.ODD) {
            return;
        }
        // FAST (base): muove sempre una volta per tick
        this.moveOne();
    }
    moveOne() {
        var _a;
        this.hit_detected = false;
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
            case Direction.NONE: return;
        }
        // wrapping
        if (pos.x < 0)
            pos.x = Board.width - 1;
        else if (pos.x >= Board.width)
            pos.x = 0;
        if (pos.y < 0)
            pos.y = Board.height - 1;
        else if (pos.y >= Board.height)
            pos.y = 0;
        // collision
        const obj = (_a = Board.grid[pos.x]) === null || _a === void 0 ? void 0 : _a[pos.y];
        if (obj)
            obj.handle_collision(this);
        if (!this.is_alive) {
            this.destroy();
            return;
        }
        if (!this.hit_detected) {
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
            if (segment.position)
                Board.removeObjectAt(segment.position);
        }
        this.segments = [this];
        this.max_length = Snake.default_length;
    }
}
Snake.default_length = 48;
