import { Board } from "./board";
import { Coin } from "../objects/coin";
import { Obstacle } from "../objects/obstacle";
import { BonusPlayer } from "../objects/bonusplayer";
import { MalusPlayer } from "../objects/malusplayer";




export class LevelManager {
  static onLevelUp(level: number) {
    switch (level) {
      case 1:
        // Livello 1: solo ostacoli extra
        for (let i = 0; i < 5; i++) {
          const o = new Obstacle();
          Board.placeAtRandom(o);
        }
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
          const m = new MalusPlayer(randomPosition);
          Board.placeAtRandom(m);
        }
        break;

      default:
        console.log('Hai vinto il gioco!');
    }
  }
}