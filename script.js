document.addEventListener("DOMContentLoaded", () => {

  // All available symbols
  const symbols = [
    "🌋",
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

  // Correct sequence
  const correctSequence = ["⚡", "🐍", "🔥", "🌋", "🗿", "🌙"];

  // Success message
  const claimCodeText =
    "Screenshot this window and send to your Production Chat!";

  // Elements
  const boxes = document.querySelectorAll("#idol-puzzle .box");
  const overlay = document.getElementById("revealOverlay");
  const closeBtn = document.getElementById("closeReveal");
  const copyBtn = document.getElementById("copyCode");
  const claimCode = document.getElementById("claimCode");
  const submitBtn = document.getElementById("submitPuzzle");

  // Set success text
  claimCode.textContent = claimCodeText;

  // Start every reel on volcano
  boxes.forEach((box) => {

    const symbolDiv = box.querySelector(".symbol");

    symbolDiv.textContent = "🌋";

  });

  // Reel controls
  boxes.forEach((box) => {

    const symbolDiv = box.querySelector(".symbol");

    // Up button
    box.querySelector(".up").addEventListener("click", () => {

      let i = symbols.indexOf(symbolDiv.textContent);

      symbolDiv.textContent =
        symbols[(i + 1) % symbols.length];

    });

    // Down button
    box.querySelector(".down").addEventListener("click", () => {

      let i = symbols.indexOf(symbolDiv.textContent);

      symbolDiv.textContent =
        symbols[(i - 1 + symbols.length) % symbols.length];

    });

  });

  // Open reveal modal
  function openReveal() {

    overlay.classList.add("show");

    overlay.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

  }

  // Close reveal modal
  function closeReveal() {

    overlay.classList.remove("show");

    overlay.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

  }

  // Close when clicking background
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

  // Copy button
  copyBtn.addEventListener("click", async () => {

    try {

      await navigator.clipboard.writeText(claimCodeText);

      copyBtn.textContent = "Copied!";

      setTimeout(() => {

        copyBtn.textContent = "Copy Message";

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

        copyBtn.textContent = "Copy Message";

      }, 1200);

    }

  });

  // Submit check
  submitBtn.addEventListener("click", () => {

    const attempt = Array.from(boxes).map((box) => {

      return box.querySelector(".symbol").textContent;

    });

    console.log("Attempt:", attempt);

    console.log("Correct:", correctSequence);

    if (attempt.join("") === correctSequence.join("")) {

      openReveal();

    } else {

      alert("Incorrect sequence. Keep trying!");

    }

  });

});
