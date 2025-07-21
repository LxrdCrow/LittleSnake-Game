# Little Snake

## About Game

## Repository

/build

/css
    style.css

/src
    /object
        coin.ts
        bonusplayer.ts
        index.ts
        malusplayer.ts
        snake.ts
        snakesegments.ts
        obstacle.ts

    /types
        enums.ts
        gameobjects.ts
        index.ts
        position.ts
        timer.ts

    /ux
        board.ts
        canvas.ts
        console.ts
        controls.ts
        gui.ts
        index.ts
        levelmanager.ts

    game.ts
    index.ts
    



### Work in progress

- Next task: Sistema a livelli -> Liv1 + struttura 

- Logica di gioco:

    - Types -> Dati/classi e costanti, il vocabolario del gioco
    - UX -> Grafica e interfaccia del gioco
    - Objects -> Tutte le entità interattive e gli oggetti di gioco

Possibili patch:
<br>

- Sistema a livelli
    - liv1: Il player arrivato a 25.000 punti vince -> + ostacoli
    - liv2 Il player arrivato a 50.000 vince -> +1nemico+ostacoli
    - liv3: Il player arrivato a 75.000 vince -> 2nemici+ostacoli+bonus/malus
    - liv4: Il player arrivato a 100.000 vince -> 3 nemici+ostacoli+bonus/malus

- Effetti Sonori
  - effetto sonoro tasti, effetto sonoro gioco, effetto sonoro cuore, effetto game over

- Vita unica con possibili vite extra
   - compaiono dopo un certo punteggio una vita exta (es. dopo 10.000 è un cuore in più) e deve essere raccolta entro 10 secondi

- Sistema bonus/malus
   - Bonus -> oggetto bonus per vite, super velocità 10 secondi, immortale per 10 secondi
   - Malus -> oggetto malus inverti comandi per 10 secondi, oggetto per rallentamento per 10 secondi, bordo letale per 20 secondi

- Nemico:
   - Insegue il player per ucciderlo, è completamente invulnerabile, se lo tocca è immediato game over o vita in meno, non racoglie nessun oggetto
   - Di colore bianco (per distinguersi)


- Quando è invincibile usare questi colori:
   - "#FF0000", "#FF9966", "#FFFA66", "#66FF66", "#66FFFD", "#6699FF", "#7966FF", "#F366FF"