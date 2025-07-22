import { Game } from '../game.js';

export abstract class GUI {
    static header: HTMLElement;
    static hearts: HTMLElement;
    static score: HTMLElement;

    static init(): void {
        GUI.header = document.querySelector("header")!;
        GUI.hearts = document.querySelector("#player-lives")!;
        GUI.score  = document.querySelector("#player-score")!;
    }

    static showLevel(level: number): void {
        const consoleElement = document.getElementById("console");
        if (consoleElement) {
            consoleElement.innerText = `Level ${level}`;
        }
    }

    static draw(): void {
        if (Game.is_game_over) {
            GUI.hearts.innerText = "GAME OVER";
            GUI.score.innerText  = `Score: ${Game.player.points}`;
            return;
        }

        GUI.hearts.innerText = Game.is_running
            ? `Hearts: ${Game.player.hearts}`
            : "Press Start";

        GUI.score.innerText = Game.is_running
            ? `Score: ${Game.player.points}`
            : `Hi Score: ${Game.hi_score}`;
    }
}

