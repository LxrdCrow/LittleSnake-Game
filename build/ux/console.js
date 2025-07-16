import { Game } from '../game.js';
export class Console {
    static init() {
        const startBtn = document.querySelector("#start");
        const pauseBtn = document.querySelector("#pause");
        const resetBtn = document.querySelector("#reset");
        if (!startBtn || !pauseBtn || !resetBtn) {
            throw new Error("Uno o più pulsanti non trovati nel DOM.");
        }
        Console.buttons = {
            start: startBtn,
            pause: pauseBtn,
            reset: resetBtn
        };
        Console.buttons.start.onclick = Game.start;
        Console.buttons.pause.onclick = Game.pause;
        Console.buttons.reset.onclick = Game.reset;
    }
}
