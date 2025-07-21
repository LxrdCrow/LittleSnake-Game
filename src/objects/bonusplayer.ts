import { IGameObject } from '../types/gameobjects.js';
import { Position } from '../types/position.js';
import { Board } from '../ux/board.js';
import { Snake } from './snake.js';

export class BonusPlayer implements IGameObject {
  public position!: Position;
  handle_collision(s: Snake): void { /* … */ }
  draw(): void { /* … */ }
}