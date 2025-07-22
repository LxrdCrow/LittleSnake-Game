import { Board } from "./board.js";
import { Coin } from "../objects/coin.js";
import { Obstacle } from "../objects/obstacle.js";
import { BonusPlayer } from "../objects/bonusplayer.js";
import { MalusPlayer } from "../objects/malusplayer.js";




export class LevelManager {
  static onLevelUp(level: number) {
    switch (level) {
      case 1:
        break;

      case 2:
        // Livello 2: +1 nemico + ostacoli
        for (let i = 0; i < 5; i++) {
          const o = new Obstacle();
          Board.placeAtRandom(o);
        }
        const e = new BonusPlayer();
        Board.placeAtRandom(e);
        break;

      case 3:
        // Livello 3: +2 nemici + ostacoli + bonus/malus (esempio: spawn 2 slow)
        for (let i = 0; i < 5; i++) {
          const o = new Obstacle();
          Board.placeAtRandom(o);
        }
        for (let i = 0; i < 2; i++) {
          const en = new BonusPlayer();
          Board.placeAtRandom(en);
        }
        // Bonus: appare una vita extra come moneta
        const life = Coin.create_random(); // o una classe HeartBonus
        Board.placeAtRandom(life);
        break;

      case 4:
        // Livello 4: +3 nemici + ostacoli + bonus/malus
        for (let i = 0; i < 5; i++) {
          const o = new Obstacle();
          Board.placeAtRandom(o);
        }
        for (let i = 0; i < 3; i++) {
          const en = new BonusPlayer();
          Board.placeAtRandom(en);
        }
        // Esempio malus: spawn 2 MalusPlayer
        for (let i = 0; i < 2; i++) {
          const randomPosition = Board.generateRandomPosition();
          if (randomPosition !== null) {
            const m = new MalusPlayer(randomPosition);
            Board.placeAtRandom(m);
          }
        }
        break;

      default:
        console.warn(`LevelManager: level ${level} not implemented`);
    }
  }
}