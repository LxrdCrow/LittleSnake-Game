import { Position } from '../types/position.js';
import { Canvas } from './canvas.js';
import { Game } from '../game.js';
export class Board {
    static init() {
        if (!Canvas.width || !Canvas.height) {
            throw new Error("Canvas must be initialized before Board.");
        }
        Board.width = Math.floor(Canvas.width / Board.tileSize);
        Board.height = Math.floor(Canvas.height / Board.tileSize);
        Board.grid = Array.from({ length: Board.width }, () => new Array(Board.height).fill(null));
    }
    static placeObject(obj, pos) {
        Board.grid[pos.x][pos.y] = obj;
        obj.position = Position.copy(pos);
    }
    static removeObjectAt(pos) {
        Board.grid[pos.x][pos.y] = null;
    }
    static moveObject(obj, newPos) {
        Board.removeObjectAt(obj.position);
        Board.placeObject(obj, newPos);
    }
    static placeAtRandom(obj) {
        const p = Board.generateRandomPosition();
        if (p)
            Board.placeObject(obj, p);
    }
    static generateRandomPosition() {
        const max = Board.width * Board.height;
        let attempts = 0;
        while (attempts < max) {
            const x = Math.floor(Math.random() * Board.width);
            const y = Math.floor(Math.random() * Board.height);
            if (!Board.grid[x][y])
                return new Position(x, y);
            attempts++;
        }
        return null;
    }
    static draw() {
        Canvas.fill(Board.bgColor);
        for (let x = 0; x < Board.width; x++) {
            for (let y = 0; y < Board.height; y++) {
                const obj = Board.grid[x][y];
                if (obj)
                    obj.draw();
            }
        }
        if (Game.is_game_over) {
            Canvas.drawGameOverMessage();
            return;
        }
    }
}
Board.bgColor = "#000A1F";
Board.tileSize = 8;
Board.width = 0;
Board.height = 0;
Board.grid = [];
