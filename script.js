document.addEventListener("DOMContentLoaded", () => {

  // Symbols available in the lock
  const symbols = ["🌙", "🔥", "🌿", "🌊", "🗿", "🪶"];

  // ✅ CHANGE THIS to your real solution
  const correctSequence = ["🌙", "🔥", "🌿", "🌊", "🗿", "🪶"];

  // What appears in the reveal modal
  const claimCodeText = "OUTCAST-S6-IDOL"; // change this if you want

  const boxes = document.querySelectorAll("#idol-puzzle .box");
  const overlay = document.getElementById("revealOverlay");
  const closeBtn = document.getElementById("closeReveal");
  const copyBtn = document.getElementById("copyCode");
  const claimCode = document.getElementById("claimCode");

  claimCode.textContent = claimCodeText;

  // Cycle symbols
  boxes.forEach((box) => {
    const symbolDiv = box.querySelector(".symbol");

    box.querySelector(".up").addEventListener("click", () => {
      let i = symbols.indexOf(symbolDiv.textContent);
      symbolDiv.textContent = symbols[(i + 1) % symbols.length];
    });

    box.querySelector(".down").addEventListener("click", () => {
      let i = symbols.indexOf(symbolDiv.textContent);
      symbolDiv.textContent = symbols[(i - 1 + symbols.length) % symbols.length];
    });
  });

  function openReveal() {
    overlay.classList.add("show");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeReveal() {
    overlay.classList.remove("show");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Close on click outside the modal
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeReveal();
  });

  // Close button
  closeBtn.addEventListener("click", closeReveal);

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("show")) closeReveal();
  });

  // Copy claim code
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(claimCodeText);
      copyBtn.textContent = "Copied!";
      setTimeout(() => (copyBtn.textContent = "Copy Claim Code"), 1200);
    } catch {
      const temp = document.createElement("textarea");
      temp.value = claimCodeText;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      document.body.removeChild(temp);
      copyBtn.textContent = "Copied!";
      setTimeout(() => (copyBtn.textContent = "Copy Claim Code"), 1200);
    }
  });

  // Submit check
  document.getElementById("submitPuzzle").addEventListener("click", () => {
    const attempt = Array.from(boxes).map((b) => b.querySelector(".symbol").textContent);

    if (attempt.join("") === correctSequence.join("")) {
      openReveal();
    } else {
      alert("Incorrect sequence. Keep trying!");
    }
  });

});
