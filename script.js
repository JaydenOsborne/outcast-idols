const symbols = ["🌙","🔥","🌿","🌊","🗿","🪶"];
const correct = ["🌙","🔥","🌿","🌊","🗿","🪶"];

const boxes = document.querySelectorAll(".box");
const puzzle = document.getElementById("idol-puzzle");
const message = document.getElementById("message");
const drum = document.getElementById("drumSound");

let fails = 0;

// Cycle symbols
boxes.forEach(box => {
  const symbol = box.querySelector(".symbol");

  box.querySelector(".up").onclick = () => {
    let i = symbols.indexOf(symbol.textContent);
    symbol.textContent = symbols[(i + 1) % symbols.length];
    tick(symbol);
  };

  box.querySelector(".down").onclick = () => {
    let i = symbols.indexOf(symbol.textContent);
    symbol.textContent = symbols[(i - 1 + symbols.length) % symbols.length];
    tick(symbol);
  };
});

function tick(el) {
  el.classList.remove("tick");
  void el.offsetWidth;
  el.classList.add("tick");
}

// Submit
document.getElementById("submitPuzzle").onclick = () => {
  const attempt = [...boxes].map(b => b.querySelector(".symbol").textContent);

  if (attempt.join("") === correct.join("")) {
    message.textContent = "You found the Hidden Immunity Idol!";
    drum.currentTime = 0;
    drum.play();
    return;
  }

  fails++;
  shake();

  if (fails === 7) {
    message.textContent = "SIX SEVENNNNNN!!!";
    message.className = "message big flash";
  } else {
    message.textContent = `Incorrect. Attempts: ${fails}`;
    message.className = "message";
  }
};

function shake() {
  puzzle.classList.remove("shake");
  void puzzle.offsetWidth;
  puzzle.classList.add("shake");
}
