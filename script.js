document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // CONFIG
  // =========================
  const symbols = ["🌙", "🔥", "🌿", "🌊", "🗿", "🪶"];

  // ✅ CHANGE THIS to your real solution
  const correctSequence = ["🌙", "🔥", "🌿", "🌊", "🗿", "🪶"];

  const claimCodeText = "OUTCAST-S6-IDOL";

  // =========================
  // ELEMENTS
  // =========================
  const puzzle = document.getElementById("idol-puzzle");
  const boxes = document.querySelectorAll("#idol-puzzle .box");
  const msg = document.getElementById("message");

  const overlay = document.getElementById("revealOverlay");
  const closeBtn = document.getElementById("closeReveal");
  const copyBtn = document.getElementById("copyCode");
  const claimCode = document.getElementById("claimCode");
  claimCode.textContent = claimCodeText;

  // =========================
  // MESSAGE
  // =========================
  function setMessage(text, big = false, flash = false) {
    msg.textContent = text;
    msg.classList.toggle("big", big);

    // re-trigger flash animation reliably
    msg.classList.remove("flash");
    void msg.offsetWidth; // reflow
    if (flash) msg.classList.add("flash");
  }

  setMessage("Enter the correct sequence to claim the idol.");

  // =========================
  // SHAKE (force retrigger)
  // =========================
  function shakePuzzle() {
    puzzle.classList.remove("shake");
    void puzzle.offsetWidth; // reflow
    puzzle.classList.add("shake");
  }

  // =========================
  // TICK animation on symbol change
  // =========================
  function tickSymbol(el) {
    el.classList.remove("tick");
    void el.offsetWidth;
    el.classList.add("tick");
    setTimeout(() => el.classList.remove("tick"), 140);
  }

  // =========================
  // AUDIO (unlock on first interaction)
  // =========================
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  const audioCtx = AudioCtx ? new AudioCtx() : null;
  let audioUnlocked = false;

  async function unlockAudio() {
    if (!audioCtx || audioUnlocked) return;
    try {
      await audioCtx.resume();
      audioUnlocked = true;
    } catch {
      // ignore
    }
  }

  function playClick() {
    if (!audioCtx || !audioUnlocked) return;

    const t = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "square";
    osc.frequency.setValueAtTime(1600, t);
    osc.frequency.exponentialRampToValueAtTime(950, t + 0.03);

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.06, t + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(t);
    osc.stop(t + 0.07);
  }

  function playDrum() {
    if (!audioCtx || !audioUnlocked) return;

    const t = audioCtx.currentTime;

    // Low sine thump
    const osc = audioCtx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(90, t);
    osc.frequency.exponentialRampToValueAtTime(55, t + 0.18);

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.85, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.26);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    // Short noise “tap”
    const noise = audioCtx.createBufferSource();
    const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.12, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    noise.buffer = buffer;

    const noiseFilter = audioCtx.createBiquadFilter();
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.setValueAtTime(750, t);

    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.0001, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.18, t + 0.01);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(audioCtx.destination);

    osc.start(t);
    osc.stop(t + 0.27);

    noise.start(t);
    noise.stop(t + 0.13);
  }

  // =========================
  // MODAL
  // =========================
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

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeReveal();
  });

  closeBtn.addEventListener("click", closeReveal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("show")) closeReveal();
  });

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

  // =========================
  // ATTEMPT TRACKING
  // =========================
  let failCount = 0;

  // =========================
  // SYMBOL CYCLING + CLICK SOUND
  // =========================
  boxes.forEach((box) => {
    const symbolDiv = box.querySelector(".symbol");
    const up = box.querySelector(".up");
    const down = box.querySelector(".down");

    up.addEventListener("click", async () => {
      await unlockAudio();
      let i = symbols.indexOf(symbolDiv.textContent);
      symbolDiv.textContent = symbols[(i + 1) % symbols.length];
      tickSymbol(symbolDiv);
      playClick();
    });

    down.addEventListener("click", async () => {
      await unlockAudio();
      let i = symbols.indexOf(symbolDiv.textContent);
      symbolDiv.textContent = symbols[(i - 1 + symbols.length) % symbols.length];
      tickSymbol(symbolDiv);
      playClick();
    });
  });

  // =========================
  // SUBMIT
  // =========================
  document.getElementById("submitPuzzle").addEventListener("click", async () => {
    await unlockAudio();

    const attempt = Array.from(boxes).map((b) => b.querySelector(".symbol").textContent);

    if (attempt.join("") === correctSequence.join("")) {
      setMessage("You found something...", false);
      playDrum();
      openReveal();
      return;
    }

    // Wrong
    failCount += 1;
    shakePuzzle();

    if (failCount === 7) {
      setMessage("SIX SEVENNNNNN!!!", true, true); // big + flash
    } else {
      setMessage(`Incorrect. Attempts: ${failCount}`, false);
    }
  });
});
