import { IDrawable } from '../types/gameobjects.js';
import { Position } from '../types/position.js';
import { Canvas } from './canvas.js';
import { Game } from '../game.js';

export class Board {
    public static bgColor = "#000A1F";
    public static tileSize = 8;
    public static width = 0;
    public static height = 0;
    public static grid: (IDrawable | null)[][] = [];

    public static init(): void {
        if (!Canvas.width || !Canvas.height) {
            throw new Error("Canvas must be initialized before Board.");
        }
        Board.width  = Math.floor(Canvas.width  / Board.tileSize);
        Board.height = Math.floor(Canvas.height / Board.tileSize);

        Board.grid = Array.from({ length: Board.width }, () =>
            new Array<IDrawable | null>(Board.height).fill(null)
        );
    }

    public static placeObject(obj: IDrawable, pos: Position): void {
        Board.grid[pos.x][pos.y] = obj;
        obj.position = Position.copy(pos);
    }

    public static removeObjectAt(pos: Position): void {
        Board.grid[pos.x][pos.y] = null;
    }

    public static moveObject(obj: IDrawable, newPos: Position): void {
        Board.removeObjectAt(obj.position);
        Board.placeObject(obj, newPos);
    }

    public static placeAtRandom(obj: IDrawable): void {
        const p = Board.generateRandomPosition();
        if (p) Board.placeObject(obj, p);
    }

    public static generateRandomPosition(): Position | null {
        const max = Board.width * Board.height;
        let attempts = 0;
        while (attempts < max) {
            const x = Math.floor(Math.random() * Board.width);
            const y = Math.floor(Math.random() * Board.height);
            if (!Board.grid[x][y]) return new Position(x, y);
            attempts++;
        }
        return null;
    }

    public static draw(): void {
        Canvas.fill(Board.bgColor);

        for (let x = 0; x < Board.width; x++) {
            for (let y = 0; y < Board.height; y++) {
                const obj = Board.grid[x][y];
                if (obj) obj.draw();
            }
        }

        if (Game.is_game_over) {
            Canvas.drawGameOverMessage();
            return;
        }
    }
}

