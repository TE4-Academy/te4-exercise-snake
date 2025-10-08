# Snake - Bygg Ditt Första Kompletta Spel!

## Översikt

En heldagsövning där du bygger ett komplett Snake-spel från grunden med minimal guidning. Du använder allt du lärt dig från Grid-Bot Navigator och Hoover Challenge, men nu jobbar du mer självständigt.

## Målgrupp

- **Nivå:** Medel
- **Förkunskaper:** Grid-Bot Navigator och Hoover Challenge slutförda
- **Tid:** Ca 4-5 timmar

## Syfte

**Från att följa instruktioner till att skapa själv!**

Du har lärt dig:

- ✅ State management (Grid-Bot)
- ✅ Collision detection (Hoover Nivå 2-1)
- ✅ Game loops och timers (Hoover Nivå 2-2)
- ✅ Olika item-typer (Hoover Nivå 2-3)

Nu ska du **kombinera** allt detta och bygga något EGET med mer självständighet!

## Struktur

### 📚 Lektion

Diskussionspunkter:

- Spelanalys och nedbrytning
- State vs Actions diskussion
- Demo: Game loop skeleton
- Arbetsplan och prioritering

### 🎯 Övning (5 timmar)

Innehållsplanering:

- Kravspecifikation (MVP)
- Skeleton-kod med TODOs
- Tips och ledtrådar (ingen steg-för-steg guide!)
- Checkpoints att bocka av

### 🏆 Mål

Ett fungerande Snake-spel med:

- Orm som rör sig automatiskt
- Styrning med piltangenter
- Äpplen som spawnar och ger poäng
- Ormen växer när den äter
- Game Over vid väggkollision
- Visuellt grid

## Kom Igång

1. Läs kravspecifikationen nedan
2. Studera "Ormens Anatomi" noga
3. Börja koda! Använd `CHECKPOINTS.md` för att hålla koll på framsteg

---

## 📋 Kravspecifikation (MVP)

### State Management

- [ ] Snake-arrayen håller koll på alla segment
- [ ] Direction uppdateras när användaren trycker piltangent
- [ ] Apple spawnar på slumpmässig position
- [ ] Score ökar när äpplen äts
- [ ] isGameOver flagga kontrollerar spelets status

### Game Logic

- [ ] moveSnake() flyttar hela ormen ett steg
- [ ] Ormen växer när den äter äpplen (svansen försvinner inte)
- [ ] Game Over vid väggkollision
- [ ] Game loop körs automatiskt med setTimeout eller setInterval
- [ ] changeDirection() hanterar piltangenter

### UI

- [ ] 20x20 grid med CSS Grid
- [ ] Orm renderas som gröna rutor
- [ ] Huvudet är visuellt annorlunda (t.ex. emoji 🐍)
- [ ] Äpple renderas som röd ruta (t.ex. emoji 🍎)
- [ ] Score visas
- [ ] Game Over-meddelande

---

## 🐍 Ormens Anatomi - VIKTIGT ATT FÖRSTÅ!

### Grundkonceptet - Array av Segment

```javascript
snake: [
  { x: 5, y: 5 }, // ← Segment 0 (HUVUDET)
  { x: 4, y: 5 }, // ← Segment 1 (KROPP)
  { x: 3, y: 5 }, // ← Segment 2 (SVANSEN)
];
```

**Varje segment = En position `{x, y}` på gridet**

---

### Visualisering på Gridet

```
Grid (10x10 exempel):

┌─┬─┬─┬─┬─┬─┬─┬─┬─┬─┐
│ │ │ │ │ │ │ │ │ │ │
├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
│ │ │ │ │ │ │ │ │ │ │
├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
│ │ │ │ │ │ │ │ │ │ │
├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
│ │ │ │ │ │ │ │ │ │ │
├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
│ │ │ │ │ │ │ │ │ │ │
├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
│ │ │🟩🟩🟩🟢│ │ │ │  ← Rad 5
├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
│ │ │ │ │ │ │ │ │ │ │
└─┴─┴─┴─┴─┴─┴─┴─┴─┴─┘
      ↑ ↑ ↑ ↑
      3 4 5 6

🟢 = Huvud (x:6, y:5) - snake[0]
🟩 = Kropp (x:5, y:5) - snake[1]
🟩 = Kropp (x:4, y:5) - snake[2]
🟩 = Svans (x:3, y:5) - snake[3]
```

**Varje emoji = ett segment i arrayen!**

---

### Hur Ormen "Rör Sig"

**FÖRE rörelse (direction = 'RIGHT'):**

```javascript
snake: [
  { x: 5, y: 5 }, // Huvud
  { x: 4, y: 5 }, // Kropp
  { x: 3, y: 5 }, // Svans
];
```

```
Grid: │ │ │🟩🟩🟢│ │ │
```

**Steg 1: Lägg till nytt huvud**

```javascript
const newHead = { x: 6, y: 5 }; // Ett steg RIGHT
snake.unshift(newHead);

snake: [
  { x: 6, y: 5 }, // NYTT huvud
  { x: 5, y: 5 }, // Gamla huvudet (nu kropp)
  { x: 4, y: 5 }, // Kropp
  { x: 3, y: 5 }, // Svans
];
// Nu 4 segment - för långt!
```

**Steg 2: Ta bort svansen (om vi INTE åt äppel)**

```javascript
snake.pop(); // Ta bort sista

snake: [
  { x: 6, y: 5 }, // Huvud
  { x: 5, y: 5 }, // Kropp
  { x: 4, y: 5 }, // Svans
];
// Tillbaka till 3 segment!
```

```
Grid: │ │ │ │🟩🟩🟢│ │
```

**Ormen har "rört sig" ett steg åt höger! ✅**

---

### Hur Ormen Växer (när den äter äpplet)

```javascript
// När collision med äpplet:
const newHead = { x: appleX, y: appleY };
snake.unshift(newHead); // Lägg till nytt huvud

// SKIPPA pop()! Låt svansen vara kvar!
// Nu har ormen 1 segment mer = den växte!
```

**FÖRE äppel:**

```
│ │ │🟩🟩🟢│🍎│ │
3 segment + äpplet på x:7
```

**EFTER äppel:**

```
│ │ │🟩🟩🟩🟢│ │ │
4 segment - ormen växte!
```

---

## 💡 Tips och Ledtrådar

### Tankenöt: Hur flyttar man en orm?

**Tänk på det så här:**

1. Skapa ett nytt huvud (baserat på direction)
2. Lägg till det i början av arrayen (`unshift`)
3. Ta bort svansen från slutet (`pop`)

**Resultat:** Ormen ser ut att "glida" framåt!

**Pseudo-kod:**

```javascript
function moveSnake() {
  // 1. Hitta nuvarande huvud
  const head = game.snake[0];

  // 2. Beräkna var nästa huvud ska vara
  let newX = head.x;
  let newY = head.y;

  if (game.direction === "RIGHT") newX++;
  // ... resten av riktningarna

  // 3. Skapa nytt huvud-segment
  const newHead = { x: newX, y: newY };

  // 4. Lägg till i början
  game.snake.unshift(newHead);

  // 5. Ta bort svansen (om inte äppel åts)
  if (!ateApple) {
    game.snake.pop();
  }
}
```

---

### Tankenöt: Hur kollar man kollisioner?

**Array-metoder är dina vänner!**

**Äpple-kollision:**

```javascript
const head = game.snake[0];
if (head.x === game.apple.x && head.y === game.apple.y) {
  // Kollision!
}
```

**Vägg-kollision:**

```javascript
const head = game.snake[0];
if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
  // Utanför gridet!
  game.isGameOver = true;
}
```

**Själv-kollision (BONUS):**

```javascript
const head = game.snake[0];
const hitSelf = game.snake
  .slice(1)
  .some((segment) => segment.x === head.x && segment.y === head.y);
```

---

### Tankenöt: Hur spawnar man ett äppel?

**Du behöver:**

1. Slumpa x mellan 0-19
2. Slumpa y mellan 0-19
3. Kolla att positionen inte är på ormen

**Hjälp-kod:**

```javascript
function spawnApple() {
  let x, y;
  let positionOk = false;

  while (!positionOk) {
    x = Math.floor(Math.random() * 20);
    y = Math.floor(Math.random() * 20);

    // Är positionen ledig?
    positionOk = !game.snake.some(
      (segment) => segment.x === x && segment.y === y
    );
  }

  game.apple = { x, y };
}
```

---

### Tankenöt: Hur förhindrar man 180° svängar?

Ormen ska inte kunna svänga **direkt bakåt** (RIGHT → LEFT eller UP → DOWN).

**Tips:**

```javascript
function changeDirection(newDirection) {
  // Kolla motsatta riktningar
  const opposites = {
    UP: "DOWN",
    DOWN: "UP",
    LEFT: "RIGHT",
    RIGHT: "LEFT",
  };

  // Om ny riktning är motsatt nuvarande: ignorera!
  if (opposites[game.direction] !== newDirection) {
    game.direction = newDirection;
  }
}
```

---

## 🚀 Rekommenderad Arbetsordning

### **Fas 1: Logik Först (2h)**

**Fokus:** Få spelet att fungera i konsolen innan UI

1. **Implementera moveSnake()**

   - Testa med `console.log(game.snake)` efter varje steg
   - Se till att ormen faktiskt rör sig

2. **Lägg till changeDirection()**

   - Lyssna på piltangenter
   - Förhindra 180° svängar

3. **Implementera checkAppleCollision()**

   - Kolla om huvudet är på äpplet
   - Öka score
   - Låt ormen växa
   - Spawna nytt äppel

4. **Implementera checkWallCollision()**

   - Kolla om huvudet är utanför gridet
   - Sätt isGameOver = true

5. **Implementera gameLoop()**
   - Använd setTimeout
   - Anropa moveSnake() varje 200ms
   - Stoppa om isGameOver

**Checkpoint:** Spelet fungerar i konsolen! Du kan logga state och se att allt uppdateras korrekt.

---

### **Fas 2: Visualisering (1.5h)**

**Fokus:** Rita spelet på skärmen

6. **Skapa grid i HTML/CSS**

   - 20x20 grid med CSS Grid
   - Varje cell ska vara lika stor

7. **Skriv renderGame()**

   - Rensa gamla element
   - Loopa genom `snake` och rita varje segment
   - Rita äpplet
   - Uppdatera score-display

8. **Koppla renderGame() till gameLoop()**
   - Anropa efter varje moveSnake()
   - Nu ser du spelet live!

**Checkpoint:** Spelet är spelbart! Du ser ormen röra sig och kan styra den.

---

### **Fas 3: Polish (30min-1h)**

**Fokus:** Gör det komplett och snyggt

9. **Lägg till Game Over-meddelande**

   - Alert eller overlay när isGameOver = true
   - Visa slutresultat

10. **Lägg till Restart-knapp**

    - Återställ all state
    - Starta gameLoop igen

11. **Styling med Tailwind**
    - Färger, typografi, spacing
    - Responsiv layout

**Checkpoint:** Spelet är färdigt och snyggt! 🎉

---

## ❓ Vanliga Fallgropar

### Problem: "Ormen försvinner!"

**Möjlig orsak:** Du glömde anropa `renderGame()` i game loopen.  
**Lösning:** Se till att rita om efter varje moveSnake().

### Problem: "Kan styra ormen bakåt och den 'äter sig själv'"

**Möjlig orsak:** Du tillåter 180° svängar.  
**Lösning:** Kolla att newDirection inte är motsatt current direction.

### Problem: "Äpplet spawnar på ormen"

**Möjlig orsak:** Din spawnApple() kollar inte om positionen är ledig.  
**Lösning:** Använd `some()` för att kolla om position redan används.

### Problem: "Game Over händer inte vid väggkollision"

**Möjlig orsak:** Du glömde anropa checkWallCollision().  
**Lösning:** Anropa den i gameLoop() före moveSnake().

### Problem: "Ormen rör sig konstigt"

**Möjlig orsak:** Du använder `push()` istället för `unshift()`.  
**Lösning:** Nytt huvud ska läggas FÖRST (`unshift`), svans tas bort SIST (`pop`).

### Problem: "Ormen växer inte när den äter"

**Möjlig orsak:** Du anropar `pop()` även när äppel åts.  
**Lösning:** Skippa `pop()` när kollision med äppel.

---

## 🌟 Bonusfunktioner (Om Tid Finns)

När MVP är klar, prova dessa:

### **Nivå 1 (Enkla):**

- [ ] Självkollision - Game Over om ormen biter sig själv
- [ ] Pause-funktion (mellanslag-tangent)
- [ ] Visa "Tryck mellanslag för att starta"
- [ ] Bättre styling med animationer

### **Nivå 2 (Medelsvåra):**

- [ ] Hastighetsökning varje 5 poäng
- [ ] Highscore med localStorage
- [ ] Ljudeffekter (när ormen äter, game over)
- [ ] Olika äppel-typer (bonus-poäng)

### **Nivå 3 (Svåra):**

- [ ] Hinder på spelplanen
- [ ] Flera äpplen samtidigt
- [ ] Multiplayer (två ormar, olika tangenter)
- [ ] Power-ups (gå genom väggar, slow-motion, etc.)

---

## 📊 Specifikation

| Feature         | Värde                         |
| --------------- | ----------------------------- |
| Spelplan        | 20x20 rutnät                  |
| Startlängd orm  | 3 segment                     |
| Hastighet       | 200ms per steg                |
| Poäng per äppel | 10                            |
| Win condition   | Ingen (spela tills Game Over) |

---

## 🎓 Slutmål

När du är klar ska du kunna:

- ✅ Bygga ett komplett spel från grunden
- ✅ Planera och strukturera kod självständigt
- ✅ Använda state management för komplex logik
- ✅ Kombinera game loops, collision detection och user input
- ✅ Felsöka och lösa problem utan steg-för-steg guide
- ✅ Känna dig trygg att börja på DITT eget spelprojekt!

**Lycka till och ha kul! 🐍🎮**
