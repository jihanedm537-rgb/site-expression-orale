// Jeu "Parle ou Perds" : sujet aléatoire, chrono qui monte, record en localStorage.

(() => {
  const RECORD_KEY = "parleOuPerds.record"; // stocké en secondes

  const screens = {
    ready: document.getElementById("screen-ready"),
    play: document.getElementById("screen-play"),
    result: document.getElementById("screen-result"),
  };

  const recordBanner = document.getElementById("record-banner");
  const readyBtn = document.getElementById("ready-btn");

  const topicCategory = document.getElementById("topic-category");
  const topicText = document.getElementById("topic-text");
  const display = document.getElementById("stopwatch-display");
  const hint = document.getElementById("stopwatch-hint");
  const stopBtn = document.getElementById("stop-btn");

  const resultCard = document.getElementById("result-card");
  const resultTime = document.getElementById("result-time");
  const resultFeedback = document.getElementById("result-feedback");
  const resultDetail = document.getElementById("result-detail");
  const replayBtn = document.getElementById("replay-btn");
  const retryBtn = document.getElementById("retry-btn");

  const deck = createTopicDeck();
  let currentTopic = null;
  let recordBeatenLive = false;

  // --- Record ---

  function getRecord() {
    const value = storage.get(RECORD_KEY, null);
    return Number.isFinite(value) ? value : null;
  }

  function renderRecordBanner() {
    const record = getRecord();
    recordBanner.textContent = record === null
      ? "🏆 Pas encore de record : à toi de poser le premier !"
      : `🏆 Ton record : ${formatDuration(record)}`;
  }

  // "1min32", "45 s" : plus parlant qu'un affichage de chrono dans les phrases
  function formatDuration(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    if (minutes === 0) return `${secs} s`;
    return `${minutes}min${String(secs).padStart(2, "0")}`;
  }

  // --- Écrans ---

  function showScreen(name) {
    Object.entries(screens).forEach(([key, el]) => {
      el.hidden = key !== name;
    });
  }

  // --- Partie ---

  const stopwatch = createTimer({
    mode: "up",
    onTick: (seconds) => {
      display.textContent = formatTime(seconds);
      const record = getRecord();
      if (!recordBeatenLive && record !== null && record > 0 && seconds > record) {
        recordBeatenLive = true;
        hint.textContent = "Record battu ! Continue, tu es en feu 🔥";
        display.classList.add("is-record");
        beep(1046, 0.3);
      }
    },
  });

  function startRound(topic) {
    currentTopic = topic;
    const cat = CATEGORIES[topic.categorie];
    topicCategory.textContent = `${cat.emoji} ${cat.label}`;
    topicText.textContent = topic.texte;

    stopwatch.reset();
    recordBeatenLive = false;
    display.classList.remove("is-record");
    hint.textContent = "Lis ton sujet…";
    stopBtn.disabled = true;
    showScreen("play");
    countdown();
  }

  // 3, 2, 1, Go ! (bip grave puis aigu) avant de lancer le chrono
  function countdown() {
    const steps = ["3", "2", "1"];
    display.classList.add("is-countdown");

    const next = () => {
      if (steps.length > 0) {
        pulse(steps.shift());
        beep(523, 0.15);
        setTimeout(next, 1000);
        return;
      }
      pulse("Go !");
      beep(880, 0.4);
      setTimeout(() => {
        display.classList.remove("is-countdown");
        display.textContent = formatTime(0);
        hint.textContent = "Parle, parle, parle !";
        stopBtn.disabled = false;
        stopBtn.focus();
        stopwatch.start();
      }, 600);
    };
    next();
  }

  function pulse(text) {
    display.textContent = text;
    display.classList.remove("is-pulse");
    void display.offsetWidth; // relance l'animation
    display.classList.add("is-pulse");
  }

  function stopRound() {
    stopwatch.pause();
    const seconds = stopwatch.seconds();
    const previousRecord = getRecord();
    const isNewRecord = previousRecord === null || seconds > previousRecord;

    if (isNewRecord) storage.set(RECORD_KEY, seconds);

    showResult(seconds, previousRecord, isNewRecord);
    renderRecordBanner();
  }

  function showResult(seconds, previousRecord, isNewRecord) {
    const { title, detail } = feedbackFor(seconds, previousRecord, isNewRecord);

    resultTime.textContent = formatTime(seconds);
    resultFeedback.textContent = title;
    resultDetail.textContent = detail;
    resultCard.classList.toggle("is-record", isNewRecord && previousRecord !== null);

    showScreen("result");
    resultCard.classList.remove("is-landed");
    void resultCard.offsetWidth;
    resultCard.classList.add("is-landed");
    replayBtn.focus();
  }

  function feedbackFor(seconds, previousRecord, isNewRecord) {
    if (previousRecord === null) {
      return {
        title: "Premier record posé ! 🎯",
        detail: `${formatDuration(seconds)}, c'est ta référence. Maintenant, à toi de la battre.`,
      };
    }
    if (isNewRecord) {
      return {
        title: "Nouveau record ! 🔥",
        detail: `Tu as tenu ${formatDuration(seconds - previousRecord)} de plus que ton ancien record (${formatDuration(previousRecord)}). Respect.`,
      };
    }
    if (seconds === previousRecord) {
      return {
        title: "Pile ton record ! 😏",
        detail: "Une seule seconde de plus et il tombait. Tu retentes ?",
      };
    }
    if (seconds < 5) {
      return {
        title: "Ouch, départ difficile 😅",
        detail: "Ça arrive à tout le monde. Respire un coup et relance-toi : commence par « Pour moi… ».",
      };
    }
    const gap = previousRecord - seconds;
    if (seconds >= previousRecord * 0.8) {
      return {
        title: "Si près ! 💪",
        detail: `Il t'a manqué ${formatDuration(gap)} pour battre ton record (${formatDuration(previousRecord)}).`,
      };
    }
    return {
      title: "Pas mal, essaie de faire mieux ! 🔥",
      detail: `Ton record est à ${formatDuration(previousRecord)}. Il te reste ${formatDuration(gap)} à aller chercher.`,
    };
  }

  // --- Boutons ---

  readyBtn.addEventListener("click", () => startRound(deck.draw()));
  stopBtn.addEventListener("click", stopRound);
  replayBtn.addEventListener("click", () => startRound(deck.draw()));
  retryBtn.addEventListener("click", () => startRound(currentTopic));

  renderRecordBanner();
})();
