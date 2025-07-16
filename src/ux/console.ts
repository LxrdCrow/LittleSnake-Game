import { Game } from '../game.js';

interface IButtons {
    start: HTMLButtonElement;
    pause: HTMLButtonElement;
    reset: HTMLButtonElement;
}

export class Console {
    static buttons: IButtons;

    static init(): void {
        const startBtn = document.querySelector("#start") as HTMLButtonElement;
        const pauseBtn = document.querySelector("#pause") as HTMLButtonElement;
        const resetBtn = document.querySelector("#reset") as HTMLButtonElement;

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
