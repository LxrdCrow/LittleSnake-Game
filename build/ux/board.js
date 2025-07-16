import { Position } from '../types/position.js';
import { Canvas } from './canvas.js';
export class Board {
    static init() {
        if (!Canvas.width || !Canvas.height) {
            throw new Error("Canvas must be initialized before Board.");
        }
        Board.width = Math.floor(Canvas.width / Board.tileSize);
        Board.height = Math.floor(Canvas.height / Board.tileSize);
        Board.grid = Array.from({ length: Board.width }, () => new Array(Board.height).fill(null));
    }
    static clear() {
        for (let x = 0; x < Board.width; x++) {
            for (let y = 0; y < Board.height; y++) {
                Board.grid[x][y] = null;
            }
        }
    }
    static placeObject(object, position) {
        Board.grid[position.x][position.y] = object;
        object.position = Position.copy(position);
    }
    static removeObjectAt(position) {
        Board.grid[position.x][position.y] = null;
    }
    static moveObject(object, newPosition) {
        Board.removeObjectAt(object.position);
        Board.placeObject(object, newPosition);
    }
    static placeAtRandom(object) {
        const pos = Board.generateRandomPosition();
        if (pos) {
            Board.placeObject(object, pos);
        }
    }
    static moveToRandom(object) {
        const pos = Board.generateRandomPosition();
        if (pos) {
            Board.moveObject(object, pos);
        }
    }
    static generateRandomPosition() {
        const maxAttempts = Board.width * Board.height;
        let attempts = 0;
        while (attempts < maxAttempts) {
            const x = Math.floor(Math.random() * Board.width);
            const y = Math.floor(Math.random() * Board.height);
            if (!Board.grid[x][y]) {
                return new Position(x, y);
            }
            attempts++;
        }
        return null; // All tiles are occupied
    }
    static draw() {
        Canvas.fill(Board.bgColor);
        for (let x = 0; x < Board.width; x++) {
            for (let y = 0; y < Board.height; y++) {
                const obj = Board.grid[x][y];
                if (obj) {
                    obj.draw();
                }
            }
        }
    }
}
Board.bgColor = "#000A1F";
Board.gridColor = "#001F5C";
Board.tileSize = 8;
Board.width = 0;
Board.height = 0;
Board.grid = [];
