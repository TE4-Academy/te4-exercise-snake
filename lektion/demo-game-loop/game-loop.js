// game-loop.js
// Demo: Enkel game loop

const game = {
  snake: [{ x: 5, y: 5 }],
  direction: "RIGHT",
  apple: { x: 8, y: 7 },
  score: 0,
  isGameOver: false,
  speed: 200,
  tickCount: 0,
};

let loopRunning = false;

// Hjälpfunktion för att logga till både console och sidan
function log(message, emoji = "") {
  console.log(emoji, message);

  const output = document.getElementById("console-output");
  const entry = document.createElement("div");
  entry.className = "log-entry";
  entry.textContent = `${emoji} ${message}`;
  output.appendChild(entry);
  output.scrollTop = output.scrollHeight;
}

function moveSnake() {
  log("Ormen rör sig!", "🐍");
}

function checkCollisions() {
  log("Kollar kollisioner...", "🔍");
}

function renderGame() {
  log("Ritar spelet...", "🎨");
}

function gameLoop() {
  game.tickCount++;
  log(`Tick #${game.tickCount}`, "⏱️");

  // Är spelet över? Stoppa!
  if (game.isGameOver) {
    log(`Game Over! Score: ${game.score}`, "💀");
    log("Loop stannad!", "⏹️");
    loopRunning = false;
    return;
  }

  // Kör spelets logik
  moveSnake();
  checkCollisions();
  renderGame();

  log("---", "");

  // Fortsätt loopen
  setTimeout(gameLoop, game.speed);
}

// Event listeners
document.getElementById("start-btn").addEventListener("click", () => {
  if (!loopRunning && !game.isGameOver) {
    loopRunning = true;
    log("Startar game loop!", "🚀");
    log("---", "");
    gameLoop();
  }
});

document.getElementById("stop-btn").addEventListener("click", () => {
  if (loopRunning) {
    game.isGameOver = true;
    log("Sätter isGameOver = true", "⚠️");
  }
});

document.getElementById("reset-btn").addEventListener("click", () => {
  game.isGameOver = false;
  game.score = 0;
  game.tickCount = 0;
  loopRunning = false;
  document.getElementById("console-output").innerHTML = "";
  log("Spelet återställt!", "🔄");
});

// Initial log
log('Demo laddad! Klicka "Starta Loop" för att börja.', "✅");
log("Öppna också DevTools Console (F12) för att se loggarna där!", "💡");
