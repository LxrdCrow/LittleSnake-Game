
import { IGameObject } from '../types/gameobjects.js';
import { Position } from '../types/position.js';
import { Board } from '../ux/board.js';
import { Snake } from './snake.js';

export class MalusPlayer extends Snake {
    constructor(position: Position) {
        super(position)
        this.position = Position.copy(position)
        this.segments[0] = this
        this.is_alive = true
        Board.placeObject(this, this.position)
    }
}