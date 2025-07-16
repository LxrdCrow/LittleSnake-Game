import { IDrawable } from '../types/gameobjects.js';
import { Position } from '../types/position.js';
import { Canvas } from './canvas.js';

export class Board {

    public static bgColor: string = "#000A1F";
    public static gridColor: string = "#001F5C";

    public static tileSize: number = 8;
    public static width: number = 0;
    public static height: number = 0;

    public static grid: (IDrawable | null)[][] = [];

    public static init(): void {
        if (!Canvas.width || !Canvas.height) {
            throw new Error("Canvas must be initialized before Board.");
        }

        Board.width = Math.floor(Canvas.width / Board.tileSize);
        Board.height = Math.floor(Canvas.height / Board.tileSize);


        Board.grid = Array.from({ length: Board.width }, () =>
            new Array<IDrawable | null>(Board.height).fill(null)
        );
    }

    public static clear(): void {
        for (let x = 0; x < Board.width; x++) {
            for (let y = 0; y < Board.height; y++) {
                Board.grid[x][y] = null;
            }
        }
    }

    public static placeObject(object: IDrawable, position: Position): void {
        Board.grid[position.x][position.y] = object;
        object.position = Position.copy(position);
    }

    public static removeObjectAt(position: Position): void {
        Board.grid[position.x][position.y] = null;
    }

    public static moveObject(object: IDrawable, newPosition: Position): void {
        Board.removeObjectAt(object.position);
        Board.placeObject(object, newPosition);
    }

    public static placeAtRandom(object: IDrawable): void {
        const pos = Board.generateRandomPosition();
        if (pos) {
            Board.placeObject(object, pos);
        }
    }

    public static moveToRandom(object: IDrawable): void {
        const pos = Board.generateRandomPosition();
        if (pos) {
            Board.moveObject(object, pos);
        }
    }

    public static generateRandomPosition(): Position | null {
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

    public static draw(): void {
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
