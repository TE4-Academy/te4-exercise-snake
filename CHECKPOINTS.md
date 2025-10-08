# Checkpoints - Milstolpar för Snake

Bocka av varje checkpoint när den är klar. Arbeta i ordning för bäst resultat!

---

## ✅ Checkpoint 1: Game Loop Fungerar (30 min)

**Mål:** Få spelet att "ticka" automatiskt.

- [ ] Game loop körs och loggar "tick" varje 200ms
- [ ] Kan se i konsolen att loopen körs
- [ ] Loopen stoppar när `isGameOver = true`
- [ ] Förstår skillnaden mellan `setTimeout` och `setInterval`

**Test i konsolen:**

```javascript
game.startGame();
// Ska logga "tick" varje 200ms
```

**Redo för nästa checkpoint när:** Du ser "tick" i konsolen varje 200ms.

---

## ✅ Checkpoint 2: Orm i Rörelse (45 min)

**Mål:** Ormen rör sig automatiskt åt ett håll.

- [ ] `moveSnake()` fungerar (testa med console.log)
- [ ] Ormen rör sig åt rätt håll (RIGHT som default)
- [ ] Nytt huvud läggs till med `unshift()`
- [ ] Svansen tas bort med `pop()`
- [ ] Ormen "glider" framåt på griden

**Test i konsolen:**

```javascript
console.log(game.snake);
game.moveSnake();
console.log(game.snake);
// Huvudet ska ha flyttat sig ett steg RIGHT
```

**Visuell test:**

```
Före:  │🟩🟩🟢│ │ │
Efter: │ │🟩🟩🟢│ │
```

**Redo för nästa checkpoint när:** Du kan logga snake-arrayen och se att huvudet flyttar sig korrekt.

---

## ✅ Checkpoint 3: Styrning (30 min)

**Mål:** Kunna styra ormen med piltangenter.

- [ ] Lyssnar på `keydown`-event
- [ ] `changeDirection()` uppdaterar `game.direction`
- [ ] Kan INTE svänga 180° direkt (RIGHT → LEFT blockeras)
- [ ] Ormen byter riktning nästa "tick"

**Test:**

```javascript
// Tryck ArrowUp
console.log(game.direction); // Ska bli 'UP'

// Om direction är 'UP', tryck ArrowDown
console.log(game.direction); // Ska INTE ändras (motsatt riktning)
```

**Redo för nästa checkpoint när:** Du kan styra ormen åt alla fyra håll utan buggar.

---

## ✅ Checkpoint 4: Äpplen (45 min)

**Mål:** Ormen kan äta äpplen och växa.

- [ ] `spawnApple()` skapar äppel på slumpmässig position
- [ ] Äpplet spawnar INTE på ormen
- [ ] `checkAppleCollision()` upptäcker när huvudet är på äpplet
- [ ] Ormen växer med 1 segment när den äter
- [ ] Score ökar med 10
- [ ] Nytt äppel spawnar direkt efter

**Test i konsolen:**

```javascript
console.log("Snake length:", game.snake.length); // t.ex. 3
console.log("Apple:", game.apple); // { x: 8, y: 7 }

// Styr ormen till äpplet...

console.log("Snake length:", game.snake.length); // Ska vara 4
console.log("Score:", game.score); // Ska vara 10
console.log("Apple:", game.apple); // Nytt äppel på ny position
```

**Redo för nästa checkpoint när:** Ormen växer varje gång den äter ett äppel.

---

## ✅ Checkpoint 5: Visualisering (1h)

**Mål:** Se spelet på skärmen, inte bara i konsolen.

- [ ] 20x20 grid syns på skärmen (CSS Grid)
- [ ] `renderGame()` fungerar
- [ ] Ormen renderas som gröna rutor
- [ ] Huvudet är visuellt annorlunda (t.ex. 🐍)
- [ ] Äpplet renderas (t.ex. 🍎)
- [ ] Score-display uppdateras
- [ ] Allt uppdateras när spelet körs

**Visuell struktur:**

```javascript
function renderGame() {
  // 1. Rensa grid
  // 2. Rita alla segment i snake-arrayen
  // 3. Rita äpplet
  // 4. Uppdatera score-text
}
```

**Test:**

- Öppna sidan i webbläsaren
- Ska se ett 20x20 grid
- Ormen ska synas som gröna rutor
- Äpplet ska synas som röd/röd emoji
- Ormen ska röra sig live

**Redo för nästa checkpoint när:** Du kan spela spelet visuellt på skärmen! 🎉

---

## ✅ Checkpoint 6: Game Over (30 min)

**Mål:** Spelet slutar när ormen kör i väggen.

- [ ] `checkWallCollision()` upptäcker när huvudet är utanför gridet
- [ ] `isGameOver` sätts till `true`
- [ ] Game loop stoppar
- [ ] Meddelande visas (alert eller overlay)
- [ ] Kan starta om spelet

**Test:**

```javascript
// Styr ormen mot väggen...
// När den krockar:
console.log(game.isGameOver); // true
// Alert ska visas: "Game Over! Score: X"
```

**Redo att fira när:** Spelet stoppar och visar meddelande vid väggkollision! 🏆

---

## 🎉 GRATTIS - MVP ÄR KLART!

Du har nu ett fullt fungerande Snake-spel!

**Nästa steg:**

1. Testa spelet ordentligt
2. Fixa eventuella buggar
3. Förbättra styling
4. Prova bonusfunktioner

---

## 🌟 Bonusfunktioner

### Bonus 1: Självkollision ⭐

- [ ] Ormen dör om den biter sig själv
- [ ] Använd `slice(1).some()` för att kolla kroppen

### Bonus 2: Hastighetsökning ⭐⭐

- [ ] Hastighet ökar varje 5 poäng
- [ ] Minska `game.speed` gradvis

### Bonus 3: Highscore ⭐⭐

- [ ] Spara bästa score i localStorage
- [ ] Visa highscore på skärmen
- [ ] "New Record!"-meddelande

### Bonus 4: Pause-funktion ⭐

- [ ] Tryck mellanslag för att pausa
- [ ] Visa "PAUSED" på skärmen
- [ ] Tryck mellanslag igen för att fortsätta

### Bonus 5: Styling & Polish ⭐⭐

- [ ] Snygg färgpalett
- [ ] Animationer när ormen äter
- [ ] Smooth transitions
- [ ] Responsiv design
