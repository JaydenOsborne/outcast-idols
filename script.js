document.addEventListener("DOMContentLoaded", () => {

  // All available symbols
  const symbols = [
    "🌋", // volcano
    "🌙",
    "🔥",
    "🌿",
    "🌊",
    "🗿",
    "🪶",
    "☀️",
    "🐍",
    "💀",
    "⚡"
  ];

  // Randomly generate the correct sequence
  // Number = how many boxes/reels you have
  const correctSequenceLength = 6;

  const correctSequence = [];

  for (let i = 0; i < correctSequenceLength; i++) {
    const randomSymbol =
      symbols[Math.floor(Math.random() * symbols.length)];

    correctSequence.push(randomSymbol);
  }

  console.log("Correct Sequence:", correctSequence);

  // Claim code shown on success
  const claimCodeText = "OUTCAST-S6-IDOL";

  const boxes = document.querySelectorAll("#idol-puzzle .box");
  const overlay = document.getElementById("revealOverlay");
  const closeBtn = document.getElementById("closeReveal");
  const copyBtn = document.getElementById("copyCode");
  const claimCode = document.getElementById("claimCode");
  const submitBtn = document.getElementById("submitPuzzle");

  // Set claim code text
  claimCode.textContent = claimCodeText;

  // Start all reels on volcano
  boxes.forEach((box) => {
    const symbolDiv = box.querySelector(".symbol");
    symbolDiv.textContent = "🌋";
  });

  // Reel controls
  boxes.forEach((box) => {

    const symbolDiv = box.querySelector(".symbol");

    box.querySelector(".up").addEventListener("click", () => {

      let i = symbols.indexOf(symbolDiv.textContent);

      symbolDiv.textContent =
        symbols[(i + 1) % symbols.length];

    });

    box.querySelector(".down").addEventListener("click", () => {

      let i = symbols.indexOf(symbolDiv.textContent);

      symbolDiv.textContent =
        symbols[(i - 1 + symbols.length) % symbols.length];

    });

  });

  // Open success modal
  function openReveal() {

    overlay.classList.add("show");
    overlay.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
  }

  // Close modal
  function closeReveal() {

    overlay.classList.remove("show");
    overlay.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
  }

  // Close by clicking background
  overlay.addEventListener("click", (e) => {

    if (e.target === overlay) {
      closeReveal();
    }

  });

  // Close button
  closeBtn.addEventListener("click", closeReveal);

  // Escape key closes modal
  document.addEventListener("keydown", (e) => {

    if (
      e.key === "Escape" &&
      overlay.classList.contains("show")
    ) {
      closeReveal();
    }

  });

  // Copy claim code
  copyBtn.addEventListener("click", async () => {

    try {

      await navigator.clipboard.writeText(claimCodeText);

      copyBtn.textContent = "Copied!";

      setTimeout(() => {
        copyBtn.textContent = "Copy Claim Code";
      }, 1200);

    } catch {

      const temp = document.createElement("textarea");

      temp.value = claimCodeText;

      document.body.appendChild(temp);

      temp.select();

      document.execCommand("copy");

      document.body.removeChild(temp);

      copyBtn.textContent = "Copied!";

      setTimeout(() => {
        copyBtn.textContent = "Copy Claim Code";
      }, 1200);

    }

  });

  // Submit check
  submitBtn.addEventListener("click", () => {

    const attempt = Array.from(boxes).map((box) => {

      return box.querySelector(".symbol").textContent;

    });

    if (attempt.join("") === correctSequence.join("")) {

      openReveal();

    } else {

      alert("Incorrect sequence. Keep trying!");

    }

  });

});
