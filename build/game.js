import { ClockTick, Timer, Direction } from './types/index.js';
import { Coin, Snake, Obstacle } from './objects/index.js';
import { Board, Canvas, Console, Controls, GUI } from './ux/index.js';
import { LevelManager } from './ux/levelmanager.js';
var GameDifficulty;
(function (GameDifficulty) {
    GameDifficulty[GameDifficulty["EASY"] = 300] = "EASY";
    GameDifficulty[GameDifficulty["MEDIUM"] = 150] = "MEDIUM";
    GameDifficulty[GameDifficulty["DIFFICULT"] = 50] = "DIFFICULT";
})(GameDifficulty || (GameDifficulty = {}));
export class Game {
    static init() {
        const canvas = document.querySelector("canvas");
        if (!canvas)
            throw new Error("Canvas element not found!");
        Canvas.init(canvas);
        const body = document.querySelector("body");
        body.onkeydown = Controls.on_key_down;
        Game.ready();
    }
    static ready() {
        Console.init();
        Board.init();
        Board.draw();
        GUI.init();
        GUI.draw();
        Game.player = new Snake({ x: 0, y: 0 });
        Game.player.direction = Direction.RIGHT;
        Game.clock = new Timer(GameDifficulty.DIFFICULT, 0, Game.on_clock_tick);
        // Aggiungi gli ostacoli statici
        const midY = Math.floor(Board.height / 2);
        const numObstacles = 25;
        for (let i = 0; i < numObstacles; i++) {
            const obs = new Obstacle();
            Board.placeAtRandom(obs);
        }
    }
    static start() {
        // Se sono in Game Over => ignoro il tasto Start
        if (Game.is_game_over) {
            return;
        }
        if (Game.is_running)
            return;
        if (Game.clock.is_paused) {
            return Game.pause();
        }
        Game.is_running = true;
        Game.clock.start();
        GUI.showLevel(Game.level);
        Console.writeLine(`Level ${Game.level}`);
    }
    static pause() {
        if (Game.clock.is_paused) {
            Game.is_running = true;
            return Game.clock.resume();
        }
        Game.clock.pause();
        Game.is_running = false;
        GUI.draw();
    }
    static reset() {
        var _a;
        (_a = Game.clock) === null || _a === void 0 ? void 0 : _a.stop();
        Game.is_running = false;
        Game.is_game_over = false;
        Game.coinCounter = 0;
        Game.level = 1;
        // reset objects
        Coin.instances = {};
        Coin.coins_active = 0;
        Console.writeLine("Start Level ${Game.level}");
        GUI.showLevel(Game.level);
        Game.ready();
    }
    static game_over() {
        Game.is_game_over = true;
        Game.reset();
    }
    static checkLevelUP() {
        const thresholds = [25000, 50000, 75000, 100000];
        // Se ho già completato il livello 4, non faccio nulla (o mostro “You win!”)
        if (Game.level > thresholds.length) {
            return;
        }
        // Soglia del livello in corso è thresholds[Game.level - 1]
        const target = thresholds[Game.level - 1];
        if (Game.player.points >= target) {
            // Messaggio di completamento
            Console.writeLine(`Level ${Game.level} completed!`);
            // Se era l’ultimo livello (4), vinci e blocchi il gioco
            if (Game.level === thresholds.length) {
                Console.writeLine(`🏆 You win the game!`);
                Game.is_running = false;
                Game.is_game_over = true;
                Game.clock.stop();
                return;
            }
            // Altrimenti, passo al livello successivo
            Game.level++;
            LevelManager.onLevelUp(Game.level);
            // Notifica start nuovo livello
            Console.writeLine(`Level ${Game.level}`);
            GUI.showLevel(Game.level);
        }
    }
    static on_clock_tick() {
        if (Game.is_game_over) {
            return;
        }
        Controls.process_input();
        Game.player.process_turn();
        Game.checkLevelUP();
        if (Game.player.hearts < 0) {
            Game.is_game_over = true;
            Game.is_running = false;
            Game.clock.stop();
            Board.draw();
            GUI.draw();
            return;
        }
        if (Game.clock.tick === ClockTick.EVEN) {
            Game.coinCounter++;
            if (Game.coinCounter >= 2) {
                Game.coinCounter = 0;
                if (Math.random() < 0.5) {
                    const probability = (Coin.coins_active + 0.5) / 5;
                    if (Math.random() > probability) {
                        if (Math.random() < 0.8) {
                            const coin = Coin.create_random();
                            Board.placeAtRandom(coin);
                        }
                    }
                }
            }
        }
        Board.draw();
        GUI.draw();
    }
}
Game.level = 1;
Game.hi_score = 0;
Game.is_running = false;
Game.coinCounter = 0;
Game.is_game_over = false;
Game.init();
