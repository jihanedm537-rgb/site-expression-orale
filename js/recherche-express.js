// Jeu "Recherche Express" : tirage → 15 min de recherche → présentation chronométrée → récap.

(() => {
  const RESEARCH_DURATION = 15 * 60; // en secondes

  const screens = {
    draw: document.getElementById("screen-draw"),
    research: document.getElementById("screen-research"),
    present: document.getElementById("screen-present"),
    end: document.getElementById("screen-end"),
  };

  const drawCategory = document.getElementById("draw-category");
  const drawText = document.getElementById("draw-text");
  const drawBtn = document.getElementById("draw-btn");
  const redrawBtn = document.getElementById("redraw-btn");

  const researchDisplay = document.getElementById("research-display");
  const researchBar = document.getElementById("research-bar");
  const researchMessage = document.getElementById("research-message");
  const pauseBtn = document.getElementById("pause-btn");
  const doneBtn = document.getElementById("done-btn");

  const presentMessage = document.getElementById("present-message");
  const presentDisplay = document.getElementById("present-display");
  const finishBtn = document.getElementById("finish-btn");

  const resultCard = document.getElementById("result-card");
  const endTopic = document.getElementById("end-topic");
  const endResearch = document.getElementById("end-research");
  const endPresent = document.getElementById("end-present");
  const endDetail = document.getElementById("end-detail");
  const replayBtn = document.getElementById("replay-btn");

  const deck = createTopicDeck();
  let currentTopic = null;
  let researchUsed = 0;

  function showScreen(name) {
    Object.entries(screens).forEach(([key, el]) => {
      el.hidden = key !== name;
    });
    window.scrollTo(0, 0);
  }

  function fillTopic(prefix, topic) {
    const cat = CATEGORIES[topic.categorie];
    const category = document.getElementById(`${prefix}-category`);
    category.textContent = `${cat.emoji} ${cat.label}`;
    category.hidden = false;
    document.getElementById(`${prefix}-text`).textContent = topic.texte;
  }

  // --- Étape 0 : tirage ---

  function drawTopic() {
    currentTopic = deck.draw();
    fillTopic("draw", currentTopic);
    drawBtn.textContent = "Lancer les 15 minutes";
    redrawBtn.hidden = false;
  }

  drawBtn.addEventListener("click", () => {
    if (currentTopic === null) {
      drawTopic();
    } else {
      startResearch();
    }
  });

  redrawBtn.addEventListener("click", drawTopic);

  // --- Étape 1 : recherche (compte à rebours) ---

  const researchTimer = createTimer({
    mode: "down",
    duration: RESEARCH_DURATION,
    onTick: (secondsLeft) => {
      researchDisplay.textContent = formatTime(secondsLeft);
      researchBar.style.width = `${(1 - secondsLeft / RESEARCH_DURATION) * 100}%`;
      if (secondsLeft === 60) researchMessage.textContent = "Plus qu'une minute ! Prépare ta conclusion 🏁";
    },
    onEnd: () => {
      beep();
      startPresentation("Temps écoulé ! Pose tes notes, c'est à toi 🎤");
    },
  });

  function startResearch() {
    fillTopic("research", currentTopic);
    researchTimer.reset();
    researchMessage.textContent = "Fouille, note, prépare. Je garde l'œil sur l'heure ⏳";
    pauseBtn.textContent = "Pause";
    showScreen("research");
    researchTimer.start();
  }

  pauseBtn.addEventListener("click", () => {
    if (researchTimer.isRunning()) {
      researchTimer.pause();
      pauseBtn.textContent = "Reprendre";
      researchMessage.textContent = "Pause ☕ Reviens quand tu veux.";
    } else {
      researchTimer.start();
      pauseBtn.textContent = "Pause";
      researchMessage.textContent = "C'est reparti !";
    }
  });

  doneBtn.addEventListener("click", () => {
    researchTimer.pause();
    startPresentation("Déjà prêt·e ? Bien joué. Vas-y, présente !");
  });

  // --- Étape 2 : présentation (chrono qui monte) ---

  const presentTimer = createTimer({
    mode: "up",
    onTick: (seconds) => {
      presentDisplay.textContent = formatTime(seconds);
    },
  });

  function startPresentation(message) {
    researchUsed = RESEARCH_DURATION - researchTimer.seconds();
    fillTopic("present", currentTopic);
    presentMessage.textContent = message;
    presentTimer.reset();
    showScreen("present");
    presentTimer.start();
    finishBtn.focus();
  }

  finishBtn.addEventListener("click", () => {
    presentTimer.pause();
    showEnd(presentTimer.seconds());
  });

  // --- Étape 3 : récap ---

  function showEnd(presentSeconds) {
    endTopic.textContent = currentTopic.texte;
    endResearch.textContent = formatTime(researchUsed);
    endPresent.textContent = formatTime(presentSeconds);
    endDetail.textContent = feedbackFor(presentSeconds);

    showScreen("end");
    resultCard.classList.remove("is-landed");
    void resultCard.offsetWidth; // relance l'animation
    resultCard.classList.add("is-landed");
    replayBtn.focus();
  }

  function feedbackFor(seconds) {
    if (seconds < 30) return "Court et efficace ! La prochaine fois, essaie de développer un exemple de plus.";
    if (seconds < 120) return "Belle présentation ! Tu peux viser 2 minutes en ajoutant une anecdote perso.";
    if (seconds < 300) return "Très solide : tu as tenu la distance, comme dans un vrai oral 👏";
    return "Waouh, une vraie conférence ! Pense à garder un fil clair pour ne pas perdre ton public.";
  }

  replayBtn.addEventListener("click", () => {
    drawTopic();
    showScreen("draw");
  });
})();
