export class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static copy(position) {
        return new Position(position.x, position.y);
    }
}
