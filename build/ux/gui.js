import { Game } from '../game.js';
export class GUI {
    static init() {
        GUI.header = document.querySelector("header");
        GUI.score = document.querySelector("#player-score");
        GUI.lives = document.querySelector("#player-lives");
        GUI.build = document.querySelector("#build");
    }
    static draw() {
        GUI.lives.innerText = Game.is_running
            ? "Hearts: " + Game.player.hearts
            : "Press Start";
        GUI.score.innerText = Game.is_running
            ? "Score: " + Game.player.points
            : "Hi Score: " + Game.hi_score;
    }
}
