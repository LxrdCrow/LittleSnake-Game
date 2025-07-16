import { Game } from '../game.js'

export abstract class GUI {

    static header: HTMLElement            
    static lives: HTMLElement 
    static score: HTMLElement
    static build: HTMLElement

    static init() {
    GUI.header = <HTMLElement>document.querySelector("header")
    GUI.score = <HTMLElement>document.querySelector("#player-score")
    GUI.lives = <HTMLElement>document.querySelector("#player-lives")
    GUI.build = <HTMLElement>document.querySelector("#build")
}


    static draw() {

        GUI.lives.innerText = Game.is_running
            ? "Hearts: " + Game.player.hearts
            : "Press Start"

        GUI.score.innerText = Game.is_running
            ? "Score: " + Game.player.points
            : "Hi Score: " + Game.hi_score            
    }
}