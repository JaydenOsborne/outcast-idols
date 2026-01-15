const symbols = ["🌙", "🔥", "🌿", "🌊", "🗿", "🪶"];
const correctSequence = ["🌙", "🔥", "🌿", "🌊", "🗿", "🪶"];

const boxes = document.querySelectorAll(".box");
const result = document.getElementById("result");

// Cycle symbols
boxes.forEach(box => {
  const symbolDiv = box.querySelector(".symbol");

  box.querySelector(".up").onclick = () => {
    let index = symbols.indexOf(symbolDiv.textContent);
    symbolDiv.textContent = symbols[(index + 1) % symbols.length];
  };

  box.querySelector(".down").onclick = () => {
    let index = symbols.indexOf(symbolDiv.textContent);
    symbolDiv.textContent =
      symbols[(index - 1 + symbols.length) % symbols.length];
  };
});

// Submit check
document.getElementById("submitPuzzle").onclick = () => {
  const attempt = Array.from(boxes).map(
    box => box.querySelector(".symbol").textContent
  );

  if (attempt.join("") === correctSequence.join("")) {
    result.textContent = "🎉 Congratulations! You found the Hidden Immunity Idol!";
  } else {
    result.textContent = "Incorrect combination. Try again.";
  }
};
