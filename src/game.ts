import { ClockTick, Timer, Direction } from './types/index.js';
import { Coin, Snake, Obstacle } from './objects/index.js';
import { Board, Canvas, Console, Controls, GUI } from './ux/index.js';

enum GameDifficulty {
    EASY = 300,
    MEDIUM = 150,
    DIFFICULT = 50
}

export class Game {
    static clock: Timer;
    static player: Snake;
    static hi_score: number = 0;
    static is_running: boolean = false;
    static coinCounter: number = 0; 

    static init(): void {
        const canvas = document.querySelector("canvas") as HTMLCanvasElement;
        if (!canvas) throw new Error("Canvas element not found!");

        Canvas.init(canvas);

        const body = document.querySelector("body")!;
        body.onkeydown = Controls.on_key_down;


        Game.ready();
    }

    static ready(): void {
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


    static start(): void {
        if (Game.is_running) return;
        if (Game.clock.is_paused) {
            return Game.pause();
        }

        Game.is_running = true;
        Game.clock.start();
    }

    static pause(): void {
        if (Game.clock.is_paused) {
            Game.is_running = true;
            return Game.clock.resume();
        }

        Game.clock.pause();
        Game.is_running = false;
        GUI.draw();
    }

    static reset(): void {
        
        Game.clock?.stop();
        Game.is_running = false;
        Game.is_game_over = false; 
        Game.coinCounter = 0;

        // reset objects
        Coin.instances = {};
        Coin.coins_active = 0;
        Game.ready();
    }
    static is_game_over: boolean = false;

    static game_over(): void {
        Game.is_game_over = true;
        Game.reset();
    }

    static on_clock_tick(): void {
        if (Game.is_game_over) {
            return;
        }

        Controls.process_input();
        Game.player.process_turn();

        if (Game.player.hearts < 0) {
            Game.is_game_over = true;
            Game.is_running   = false;
            Game.clock.stop();

            Board.draw();
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

Game.init();
