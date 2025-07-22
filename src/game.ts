import { ClockTick, Timer, Direction } from './types/index.js';
import { Coin, Snake, Obstacle } from './objects/index.js';
import { Board, Canvas, Console, Controls, GUI } from './ux/index.js';
import { LevelManager } from './ux/levelmanager.js';

enum GameDifficulty {
    EASY = 300,
    MEDIUM = 150,
    DIFFICULT = 50
}

export class Game {
    static level: number = 1;
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
        // Se sono in Game Over => ignoro il tasto Start
        if (Game.is_game_over) {
            return;
        }

        if (Game.is_running) return;
        if (Game.clock.is_paused) {
            return Game.pause();
        }

        Game.is_running = true;
        Game.clock.start();

        GUI.showLevel(Game.level);
        Console.writeLine(`Level ${Game.level}`);
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
        Game.level = 1;

        // reset objects
        Coin.instances = {};
        Coin.coins_active = 0;

        Console.writeLine("Start Level ${Game.level}");
        GUI.showLevel(Game.level);
        Game.ready();
    }
    static is_game_over: boolean = false;

    static game_over(): void {
        Game.is_game_over = true;
        Game.reset();
    }

    static checkLevelUP(): void {
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



        

    static on_clock_tick(): void {
        if (Game.is_game_over) {
            return;
        }

        Controls.process_input();
        Game.player.process_turn();
        Game.checkLevelUP();

        if (Game.player.hearts < 0) {
            Game.is_game_over = true;
            Game.is_running   = false;
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

Game.init();
