import { ClockTick, Timer, Direction } from './types/index.js';
import { Coin, Snake, SlowPlayer, FastPlayer } from './objects/index.js';
import { Board, Canvas, Console, Controls, GUI } from './ux/index.js';
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
    }
    static start() {
        if (Game.is_running)
            return;
        if (Game.clock.is_paused) {
            return Game.pause();
        }
        Game.is_running = true;
        Game.clock.start();
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
        Game.ready();
    }
    static on_clock_tick() {
        Controls.process_input();
        Game.player.process_turn();
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
                        else {
                            if (Math.random() < 0.5) {
                                const slowPlayer = new SlowPlayer();
                                Board.placeAtRandom(slowPlayer);
                            }
                            else {
                                const fastPlayer = new FastPlayer();
                                Board.placeAtRandom(fastPlayer);
                            }
                        }
                    }
                }
            }
        }
        Board.draw();
        GUI.draw();
    }
}
Game.hi_score = 0;
Game.is_running = false;
Game.coinCounter = 0; // TODO: move to item randomizer class
Game.init();
