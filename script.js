document.addEventListener("DOMContentLoaded", () => {
  const symbols = ["🌙", "🔥", "🌿", "🌊", "🗿", "🪶"];
  const correct = ["🌙", "🔥", "🌿", "🌊", "🗿", "🪶"];

  const boxes = document.querySelectorAll(".box");

  boxes.forEach(box => {
    const symbol = box.querySelector(".symbol");

    box.querySelector(".up").onclick = () => {
      let i = symbols.indexOf(symbol.textContent);
      symbol.textContent = symbols[(i + 1) % symbols.length];
    };

    box.querySelector(".down").onclick = () => {
      let i = symbols.indexOf(symbol.textContent);
      symbol.textContent = symbols[(i - 1 + symbols.length) % symbols.length];
    };
  });

  document.getElementById("submitPuzzle").onclick = () => {
    const attempt = [...boxes].map(b => b.querySelector(".symbol").textContent);
    if (attempt.join("") === correct.join("")) {
      alert("🎉 Congratulations! You found the Hidden Immunity Idol! 🎉");
    } else {
      alert("Incorrect sequence. Keep trying!");
    }
  };
});
